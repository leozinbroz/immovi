import { SignJWT, jwtVerify } from 'jose'
import {
  COOKIE_NAME,
  TOKEN_MAX_AGE,
  getSecretString,
  type SessionPayload,
} from './auth-shared'

/**
 * Utilitários de JWT (jose) para uso em runtime Node (login, sessão server).
 * O middleware (Edge) usa `lib/auth-edge.ts` para não carregar o jose no bundle Edge.
 */

export { COOKIE_NAME, TOKEN_MAX_AGE }
export type { SessionPayload }

function getSecret(): Uint8Array {
  return new TextEncoder().encode(getSecretString())
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    nome: payload.nome,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return {
      sub: String(payload.sub),
      email: String(payload.email ?? ''),
      nome: payload.nome ? String(payload.nome) : undefined,
      role: payload.role ? String(payload.role) : undefined,
    }
  } catch {
    return null
  }
}
