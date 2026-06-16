# Relatorio de Auditoria de Seguranca - Immovi Site

Data da auditoria: 2026-06-15  
Escopo: codigo proprio rastreado pelo Git, arquivos de configuracao, `.env.local` com valores redigidos, migration Supabase, `package.json`/`package-lock.json`, build gerado e varredura de dependencias. `node_modules` e `.next` foram tratados como artefatos/dependencias via `npm audit`, build e busca por vazamento de segredos, nao por leitura manual linha a linha.

## Relatorio executivo

O projeto tem uma base pequena e compreensivel, com pontos positivos importantes: rotas `/crm` protegidas por middleware, rotas `/api/crm/*` chamando `requireApiSession`, cookies `HttpOnly`, `server-only` no cliente Supabase com service role, ausencia de `localStorage`/`sessionStorage` no codigo real e renderizacao React padrao para dados salvos.

Os principais riscos estao em quatro frentes:

1. Autenticacao propria do CRM com segredo JWT opcional e fallback conhecido.
2. Next.js 14.2.35 com advisories atuais de alta severidade no `npm audit`.
3. Ausencia de rate limiting/anti-abuso em login e captacao publica de leads.
4. RLS permitindo `insert` anonimo irrestrito em `leads_immovi` quando a Data API/grants permitirem acesso.

Nota geral de seguranca: **5.0/10** no estado atual do repositorio. Com `CRM_JWT_SECRET` forte e obrigatorio, upgrade do Next, rate limit e RLS revisado, a nota estimada sobe para **8.0/10**.

## Evidencias de verificacao

- `npm run lint`: sem erros.
- `npm run build`: build de producao concluido com sucesso.
- `npm audit --omit=dev --json`: 1 pacote direto de producao com severidade alta (`next`) e 1 transitive moderado (`postcss` embarcado em `next`).
- Busca por `localStorage`, `sessionStorage`, `document.cookie`, `eval`, `new Function`: sem uso perigoso no codigo real.
- Busca por segredos rastreados: nao encontrei service role key, JWT secret real ou chaves privadas em arquivos versionados.
- `.env.local` esta ignorado pelo Git, mas no estado local `CRM_JWT_SECRET` esta vazio e `CRM_ADMIN_SENHA` esta definido em texto claro.
- Supabase live: nao foi possivel associar um projeto real com seguranca, porque `NEXT_PUBLIC_SUPABASE_URL` esta vazio em `.env.local`. A analise de tabelas/RLS usa `supabase/migrations/001_initial.sql`.

## Ranking das vulnerabilidades mais criticas

1. **Critico** - Fallback de `CRM_JWT_SECRET` conhecido permite forjar cookie JWT se a env estiver ausente.
2. **Alto** - `next@14.2.35` vulneravel segundo `npm audit` em producao.
3. **Alto** - Login e endpoints publicos de leads sem rate limiting.
4. **Alto** - JWT stateless sem revogacao: logout nao invalida token ja roubado.
5. **Alto** - Operacoes destrutivas do CRM nao validam papel/permissao alem de "qualquer sessao".
6. **Alto** - RLS `insert_publico` com `with check (true)` permite insert anonimo irrestrito se a tabela estiver exposta.
7. **Medio** - Headers de seguranca ausentes, inclusive CSP/HSTS/frame protections.
8. **Medio** - Filtro `.or()` do PostgREST construido com string crua de usuario autenticado.
9. **Medio** - Webhook externo sem allowlist/timeout e com payload de PII.
10. **Baixo/Medio** - Mutacoes baseadas em cookie sem verificacao explicita de `Origin`.

## Achados detalhados

### 1. JWT aceita segredo padrao conhecido

Severidade: **Critico**  
Arquivo/linha: `lib/auth-shared.ts:16-19`, `.env.local:4`  
Explicacao tecnica: `getSecretString()` usa `dev-insecure-secret-change-me-immovi` quando `CRM_JWT_SECRET` nao existe. No `.env.local` auditado, `CRM_JWT_SECRET` esta vazio. Como o cookie `crm_token` e um JWT HS256, qualquer pessoa que conheca o fallback consegue assinar um token valido.  
Cenario de exploracao: atacante cria um JWT com `sub=admin-env`, `role=admin`, coloca no cookie `crm_token` e acessa `/crm` e `/api/crm/*`.  
Correcao recomendada: remover fallback, exigir segredo forte com pelo menos 32 bytes e rotacionar qualquer token emitido com o fallback.

### 2. Next.js vulneravel em producao

Severidade: **Alto**  
Arquivo/linha: `package.json:16`, `package-lock.json`  
Explicacao tecnica: `npm audit --omit=dev` apontou `next@14.2.35` afetado por advisories de DoS, cache poisoning, request smuggling e SSRF em faixas atuais.  
Cenario de exploracao: dependendo do hosting e das features usadas, um atacante pode explorar Server Components, image optimizer, cache ou upgrade WebSocket para degradar disponibilidade ou atingir recursos internos.  
Correcao recomendada: atualizar para uma versao corrigida. O audit sugeriu `next@16.2.9`; como e major, fazer upgrade em branch, rodar build, testar rotas dinamicas e revisar breaking changes.

### 3. Login e captacao publica sem rate limiting

Severidade: **Alto**  
Arquivo/linha: `app/api/auth/login/route.ts:9-63`, `app/api/leads/route.ts:22-98`, `app/api/leads/widget/route.ts:12-55`  
Explicacao tecnica: endpoints aceitam tentativas ilimitadas por IP/identidade. O login fica exposto a brute force, e leads publicos ficam expostos a spam/custo de banco/webhook.  
Cenario de exploracao: botnet testa senhas no CRM ou envia milhares de leads falsos, consumindo quota Supabase, enchendo CRM e acionando webhook.  
Correcao recomendada: rate limit por IP + chave logica, limite de body, captcha/hCaptcha/Turnstile para forms publicos e bloqueio progressivo no login.

### 4. Logout nao revoga JWT

Severidade: **Alto**  
Arquivo/linha: `lib/auth.ts:21-31`, `app/api/auth/logout/route.ts:7-16`  
Explicacao tecnica: logout apenas apaga o cookie do navegador. Como o JWT e stateless e valido por 7 dias, um token copiado antes do logout continua aceito ate expirar.  
Cenario de exploracao: token roubado via maquina comprometida/proxy/extensao continua acessando CRM mesmo apos usuario sair.  
Correcao recomendada: reduzir TTL, adicionar `jti`, persistir sessoes em `crm_sessions` ou `session_version` em `crm_users`, e verificar no `requireApiSession`.

### 5. Papel/permissao nao e aplicado nas APIs do CRM

Severidade: **Alto**  
Arquivo/linha: `lib/crm-session.ts:19-31`, `app/api/crm/leads/[id]/route.ts:35-90`, `app/api/crm/historico/route.ts:8-35`  
Explicacao tecnica: `requireApiSession()` valida apenas que ha sessao. O campo `role` existe em `crm_users`, mas nao limita leitura, edicao ou exclusao.  
Cenario de exploracao: se no futuro for criado usuario `viewer` ou `atendente`, ele ainda podera deletar leads ou alterar status por chamada direta na API.  
Correcao recomendada: criar `requireApiRole(['admin'])` para operacoes destrutivas e papeis explicitos para leitura/edicao.

### 6. RLS permite insert anonimo irrestrito

Severidade: **Alto** se a tabela estiver exposta ao Data API; **Medio** se grants/Data API estiverem revogados  
Arquivo/linha: `supabase/migrations/001_initial.sql:50-58`  
Explicacao tecnica: `create policy "insert_publico" ... for insert with check (true)` permite qualquer insert na tabela via Supabase Data API quando `anon` tiver grant. Como a aplicacao ja insere pelo server com service role, a policy publica nao e necessaria.  
Cenario de exploracao: atacante usa `NEXT_PUBLIC_SUPABASE_ANON_KEY` e chama REST diretamente para criar leads falsos com `status`, `origem` e `tags` manipulados.  
Correcao recomendada: revogar grants de `anon/authenticated` nas tabelas internas ou remover a policy publica e manter insert apenas via API Next validada/rate-limited.

### 7. Headers de seguranca ausentes

Severidade: **Medio**  
Arquivo/linha: `next.config.mjs:1-4`, `app/layout.tsx:70-91`  
Explicacao tecnica: nao ha CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy ou Permissions-Policy. O app tambem usa scripts inline para GTM/GA, entao uma CSP precisa ser desenhada com cuidado.  
Cenario de exploracao: qualquer XSS futuro tera menos contencao; paginas podem ser emolduradas em clickjacking; navegadores recebem menos sinais de hardening.  
Correcao recomendada: configurar `headers()` no Next, `poweredByHeader: false` e CSP inicial compatilvel com Next/GTM.

### 8. Filtro `.or()` do PostgREST usa string crua

Severidade: **Medio**  
Arquivo/linha: `app/api/crm/leads/route.ts:35`, `lib/crm-data.ts:81-84`  
Explicacao tecnica: `.or()` do Supabase/PostgREST recebe uma mini-linguagem de filtros. Inserir `q` diretamente dentro dessa string permite quebrar a sintaxe ou injetar condicoes adicionais. O endpoint exige sessao, entao impacto fica restrito a usuarios CRM.  
Cenario de exploracao: usuario autenticado manipula `q` com separadores da grammar PostgREST para causar erro, bypass de filtros combinados ou consultas caras.  
Correcao recomendada: sanitizar caracteres de grammar ou migrar busca para RPC SQL com parametros bindados.

### 9. Webhook externo sem allowlist e timeout

Severidade: **Medio**  
Arquivo/linha: `app/api/leads/route.ts:109-116`, `app/api/leads/widget/route.ts:65-72`  
Explicacao tecnica: `WEBHOOK_WHATSAPP_URL` e chamado sem validacao de host/protocolo e sem `AbortController`. Embora nao venha do request, uma configuracao errada exfiltra PII ou trava a request ate timeout da plataforma.  
Cenario de exploracao: variavel de ambiente alterada para host externo malicioso recebe nome, telefone, email e necessidade dos leads.  
Correcao recomendada: permitir apenas hosts esperados, exigir HTTPS e timeout curto.

### 10. CSRF sem checagem explicita de Origin

Severidade: **Baixo/Medio**  
Arquivo/linha: `app/api/auth/logout/route.ts:7-16`, `app/api/crm/leads/[id]/route.ts:35-90`, `app/api/crm/historico/route.ts:8-35`  
Explicacao tecnica: cookies `SameSite=Lax` ajudam bastante, e JSON/PATCH/DELETE reduzem CSRF classico. Ainda assim, mutacoes cookie-backed deveriam validar `Origin`/`Sec-Fetch-Site`, principalmente para defesa contra subdominios comprometidos ou futuras mudancas de content-type.  
Cenario de exploracao: pagina same-site comprometida dispara mutacoes contra APIs do CRM usando cookies do usuario.  
Correcao recomendada: helper `assertSameOrigin(request)` em todas as mutacoes autenticadas.

## Pontos sem vulnerabilidade critica encontrada

- Service role key nao aparece em componentes client-side; `lib/supabase/server.ts` usa `server-only`.
- Nao ha `localStorage` ou `sessionStorage` no codigo real.
- Nao ha upload de arquivos implementado.
- Nao ha SQL bruto; a maior preocupacao de query injection e o `.or()` raw.
- Dados salvos do CRM sao renderizados via JSX, sem `dangerouslySetInnerHTML`.
- `dangerouslySetInnerHTML` aparece apenas para JSON-LD estatico/interno; manter CSP e serializacao segura.
- Middleware de `/crm` evita open redirect porque grava `next` com `request.nextUrl.pathname`, e a tela de login so aceita `next` iniciado por `/crm`.

## Checklist de correcoes

- [ ] Definir `CRM_JWT_SECRET` forte em todos os ambientes e remover fallback.
- [ ] Rotacionar tokens/sessoes apos troca do segredo.
- [ ] Remover login bootstrap por senha em texto claro; usar hash ou usuario seedado no banco.
- [ ] Implementar rate limit no login e nos endpoints publicos de leads.
- [ ] Implementar captcha/Turnstile nos formularios publicos.
- [ ] Adicionar `jti`/tabela de sessoes ou `session_version` para revogacao de JWT.
- [ ] Aplicar `requireApiRole` nas rotas de CRM.
- [ ] Validar UUID de `params.id` e `lead_id`.
- [ ] Sanitizar/remover `.or()` raw com input.
- [ ] Remover policy `insert_publico` ou revogar grants anon/authenticated.
- [ ] Adicionar constraints de banco para `status`, `role`, tamanhos e campos obrigatorios.
- [ ] Validar allowlist/HTTPS/timeout do webhook.
- [ ] Adicionar security headers e CSP.
- [ ] Atualizar Next.js e `eslint-config-next`.
- [ ] Rodar `npm audit --omit=dev`, `npm run lint`, `npm run build` depois das mudancas.

## Codigo corrigido recomendado

### `lib/auth-shared.ts`

```ts
export const COOKIE_NAME = 'crm_token'
export const TOKEN_MAX_AGE = 60 * 60 * 8 // 8 horas
export const TOKEN_ISSUER = 'immovi-crm'
export const TOKEN_AUDIENCE = 'immovi-crm-admin'

export type CrmRole = 'admin' | 'atendente' | 'viewer'

export interface SessionPayload {
  sub: string
  email: string
  nome?: string
  role?: CrmRole
  jti?: string
}

export function getSecretString(): string {
  const secret = process.env.CRM_JWT_SECRET?.trim()
  if (!secret || secret.length < 32) {
    throw new Error('CRM_JWT_SECRET deve ser definido com pelo menos 32 caracteres.')
  }
  return secret
}
```

### `lib/auth.ts`

```ts
import { randomUUID } from 'crypto'
import { SignJWT, jwtVerify } from 'jose'
import {
  COOKIE_NAME,
  TOKEN_AUDIENCE,
  TOKEN_ISSUER,
  TOKEN_MAX_AGE,
  getSecretString,
  type SessionPayload,
} from './auth-shared'

export { COOKIE_NAME, TOKEN_MAX_AGE }
export type { SessionPayload }

function getSecret(): Uint8Array {
  return new TextEncoder().encode(getSecretString())
}

export async function signToken(payload: SessionPayload): Promise<string> {
  const jti = payload.jti ?? randomUUID()

  return new SignJWT({
    email: payload.email,
    nome: payload.nome,
    role: payload.role ?? 'viewer',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setSubject(payload.sub)
    .setJti(jti)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE}s`)
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    })

    const sub = typeof payload.sub === 'string' ? payload.sub : ''
    const email = typeof payload.email === 'string' ? payload.email : ''
    if (!sub || !email) return null

    return {
      sub,
      email,
      nome: typeof payload.nome === 'string' ? payload.nome : undefined,
      role:
        payload.role === 'admin' || payload.role === 'atendente' || payload.role === 'viewer'
          ? payload.role
          : 'viewer',
      jti: typeof payload.jti === 'string' ? payload.jti : undefined,
    }
  } catch {
    return null
  }
}
```

### `lib/security.ts`

```ts
import { NextResponse } from 'next/server'

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
      { status: 429, headers: { 'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)) } }
    )
  }

  return null
}

export function assertSameOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get('origin')
  if (!origin) return null

  try {
    if (new URL(origin).origin !== new URL(request.url).origin) {
      return NextResponse.json({ ok: false, error: 'Origem invalida.' }, { status: 403 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Origem invalida.' }, { status: 403 })
  }

  return null
}

export async function readJsonLimited<T>(
  request: Request,
  maxBytes = 16 * 1024
): Promise<{ data: T } | { response: NextResponse }> {
  const text = await request.text()
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    return { response: NextResponse.json({ ok: false, error: 'Payload muito grande.' }, { status: 413 }) }
  }

  try {
    return { data: JSON.parse(text) as T }
  } catch {
    return { response: NextResponse.json({ ok: false, error: 'Requisicao invalida.' }, { status: 400 }) }
  }
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export function safeSearch(value: string, max = 80): string {
  return value
    .trim()
    .slice(0, max)
    .replace(/[\\%_*(),.]/g, ' ')
    .replace(/\s+/g, ' ')
}

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
    if (allowedHosts.length > 0 && !allowedHosts.includes(url.hostname.toLowerCase())) return null
    return url.toString()
  } catch {
    return null
  }
}

export async function postWebhook(url: string, payload: unknown): Promise<void> {
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
```

### `lib/crm-session.ts`

```ts
import 'server-only'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { COOKIE_NAME, verifyToken, type SessionPayload } from './auth'
import type { CrmRole } from './auth-shared'

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export async function requireApiSession(): Promise<
  { session: SessionPayload } | { response: NextResponse }
> {
  const session = await getSession()
  if (!session) {
    return { response: NextResponse.json({ ok: false, error: 'Nao autenticado.' }, { status: 401 }) }
  }
  return { session }
}

export async function requireApiRole(
  allowed: CrmRole[]
): Promise<{ session: SessionPayload } | { response: NextResponse }> {
  const auth = await requireApiSession()
  if ('response' in auth) return auth

  const role = auth.session.role ?? 'viewer'
  if (!allowed.includes(role)) {
    return { response: NextResponse.json({ ok: false, error: 'Permissao insuficiente.' }, { status: 403 }) }
  }

  return auth
}
```

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
      "frame-src https://www.googletagmanager.com",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
```

### `supabase/migrations/002_security_hardening.sql`

```sql
-- Remove exposicao publica direta; leads devem entrar pela API Next validada.
drop policy if exists "insert_publico" on public.leads_immovi;
drop policy if exists "select_bloqueado" on public.leads_immovi;

revoke select, insert, update, delete on public.leads_immovi from anon, authenticated;
revoke select, insert, update, delete on public.leads_immovi_historico from anon, authenticated;
revoke select, insert, update, delete on public.crm_users from anon, authenticated;

grant select, insert, update, delete on public.leads_immovi to service_role;
grant select, insert, update, delete on public.leads_immovi_historico to service_role;
grant select, insert, update, delete on public.crm_users to service_role;

alter table public.leads_immovi
  alter column status set not null,
  alter column origem set not null;

alter table public.leads_immovi
  add constraint leads_immovi_status_check
  check (status in (
    'Novo',
    'Em atendimento',
    'Consultoria agendada',
    'Proposta enviada',
    'Aguardando retorno',
    'Convertido',
    'Perdido'
  ));

alter table public.crm_users
  alter column role set not null,
  add constraint crm_users_role_check check (role in ('admin', 'atendente', 'viewer'));

create table if not exists public.crm_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.crm_users(id) on delete cascade,
  jti text unique not null,
  revoked_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

alter table public.crm_sessions enable row level security;
revoke select, insert, update, delete on public.crm_sessions from anon, authenticated;
grant select, insert, update, delete on public.crm_sessions to service_role;
```

### Padroes de rota a aplicar

Use estes helpers em todas as rotas:

```ts
const csrf = assertSameOrigin(request)
if (csrf) return csrf

const limited = rateLimit(request, 'login', 5, 60_000)
if (limited) return limited

const parsed = await readJsonLimited<MyBody>(request, 16 * 1024)
if ('response' in parsed) return parsed.response
const body = parsed.data
```

Para CRM destrutivo:

```ts
const auth = await requireApiRole(['admin'])
if ('response' in auth) return auth.response

if (!isUuid(params.id)) {
  return NextResponse.json({ ok: false, error: 'ID invalido.' }, { status: 400 })
}
```

Para busca:

```ts
const q = safeSearch(searchParams.get('q') || '')
if (q) {
  query = query.or(`nome.ilike.%${q}%,whatsapp.ilike.%${q}%,email.ilike.%${q}%`)
}
```

Para webhook:

```ts
const webhookUrl = getSafeWebhookUrl()
if (webhookUrl) {
  await postWebhook(webhookUrl, { id: data.id, ...lead, tags }).catch((error) => {
    console.error('[api/leads] webhook falhou:', error)
  })
}
```

Para dependencia:

```bash
npm install next@16.2.9 eslint-config-next@16.2.9 react@19 react-dom@19
npm audit --omit=dev
npm run lint
npm run build
```

Se preferir migracao menos agressiva, teste primeiro `next@15.5.16` e mantenha React 18 se o projeto aceitar.

## Fontes externas consultadas

- Supabase: Securing your API - https://supabase.com/docs/guides/api/securing-your-api
- Supabase changelog - https://supabase.com/changelog.md
- GitHub advisories retornados por `npm audit`, incluindo:
  - https://github.com/advisories/GHSA-c4j6-fc7j-m34r
  - https://github.com/advisories/GHSA-h25m-26qc-wcjf
  - https://github.com/advisories/GHSA-q4gf-8mx6-v5v3
  - https://github.com/advisories/GHSA-8h8q-6873-q5fj
  - https://github.com/advisories/GHSA-qx2v-qp2m-jg93
