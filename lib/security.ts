import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Rate limiting em memória (por IP + chave lógica)
// Em serverless, o estado é por instância — suficiente para frear ataques
// sequenciais no mesmo worker. Para proteção global, use Upstash/Redis.
// ---------------------------------------------------------------------------
const buckets = new Map<string, { count: number; resetAt: number }>()

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') || 'unknown'
}

export function rateLimit(
  request: Request,
  key: string,
  limit: number,
  windowMs: number
): NextResponse | null {
  const now = Date.now()
  const bucketKey = `${key}:${getClientIp(request)}`
  const current = buckets.get(bucketKey)

  if (!current || current.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs })
    return null
  }

  current.count += 1
  if (current.count > limit) {
    return NextResponse.json(
      { ok: false, error: 'Muitas tentativas. Tente novamente em instantes.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)),
        },
      }
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// CSRF — valida Origin em mutações autenticadas
// ---------------------------------------------------------------------------
export function assertSameOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get('origin')
  if (!origin) return null

  try {
    if (new URL(origin).origin !== new URL(request.url).origin) {
      return NextResponse.json(
        { ok: false, error: 'Origem inválida.' },
        { status: 403 }
      )
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Origem inválida.' },
      { status: 403 }
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// Leitura de JSON com limite de tamanho
// ---------------------------------------------------------------------------
export async function readJsonLimited<T>(
  request: Request,
  maxBytes = 16 * 1024
): Promise<{ data: T } | { response: NextResponse }> {
  const text = await request.text()
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    return {
      response: NextResponse.json(
        { ok: false, error: 'Payload muito grande.' },
        { status: 413 }
      ),
    }
  }

  try {
    return { data: JSON.parse(text) as T }
  } catch {
    return {
      response: NextResponse.json(
        { ok: false, error: 'Requisição inválida.' },
        { status: 400 }
      ),
    }
  }
}

// ---------------------------------------------------------------------------
// Validação de UUID v1-v5
// ---------------------------------------------------------------------------
export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  )
}

// ---------------------------------------------------------------------------
// Sanitização de termos de busca para evitar injeção na grammar PostgREST
// ---------------------------------------------------------------------------
export function safeSearch(value: string, max = 80): string {
  return value
    .trim()
    .slice(0, max)
    .replace(/[\\%_*(),.]/g, ' ')
    .replace(/\s+/g, ' ')
}

// ---------------------------------------------------------------------------
// Webhook externo — allowlist de hosts, HTTPS obrigatório, timeout 3s
// ---------------------------------------------------------------------------
export function getSafeWebhookUrl(): string | null {
  const raw = process.env.WEBHOOK_WHATSAPP_URL?.trim()
  if (!raw) return null

  const allowedHosts = (process.env.WEBHOOK_ALLOWED_HOSTS || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)

  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:') return null
    if (
      allowedHosts.length > 0 &&
      !allowedHosts.includes(url.hostname.toLowerCase())
    )
      return null
    return url.toString()
  } catch {
    return null
  }
}

export async function postWebhook(
  url: string,
  payload: unknown
): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 3000)
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }
}
