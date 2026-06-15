import 'server-only'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { COOKIE_NAME, verifyToken, type SessionPayload } from './auth'

/**
 * Lê e valida a sessão do CRM a partir do cookie HttpOnly.
 * Uso em Server Components e Route Handlers (Node runtime).
 */
export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

/**
 * Guarda para Route Handlers do CRM. Retorna a sessão ou uma resposta 401.
 */
export async function requireApiSession(): Promise<
  { session: SessionPayload } | { response: NextResponse }
> {
  const session = await getSession()
  if (!session) {
    return {
      response: NextResponse.json(
        { ok: false, error: 'Não autenticado.' },
        { status: 401 }
      ),
    }
  }
  return { session }
}
