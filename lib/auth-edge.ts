import { getSecretString, type SessionPayload } from './auth-shared'

/**
 * Verificação de JWT HS256 usando apenas Web Crypto — compatível com Edge
 * (middleware) sem importar o jose. Valida assinatura, algoritmo e expiração.
 */

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(buffer).set(bytes)
  return buffer
}

function base64UrlToBuffer(input: string): ArrayBuffer {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

function decodeJson(segment: string): Record<string, unknown> | null {
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlToBuffer(segment)))
  } catch {
    return null
  }
}

export async function verifyTokenEdge(
  token: string
): Promise<SessionPayload | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [headerB64, payloadB64, signatureB64] = parts

  const header = decodeJson(headerB64)
  if (!header || header.alg !== 'HS256') return null

  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    toArrayBuffer(enc.encode(getSecretString())),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const valido = await crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlToBuffer(signatureB64),
    toArrayBuffer(enc.encode(`${headerB64}.${payloadB64}`))
  )
  if (!valido) return null

  const payload = decodeJson(payloadB64)
  if (!payload) return null

  if (typeof payload.exp === 'number' && Date.now() / 1000 > payload.exp) {
    return null
  }

  return {
    sub: String(payload.sub ?? ''),
    email: String(payload.email ?? ''),
    nome: payload.nome ? String(payload.nome) : undefined,
    role: payload.role ? String(payload.role) : undefined,
  }
}
