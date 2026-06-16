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
    return {
      response: NextResponse.json(
        { ok: false, error: 'Não autenticado.' },
        { status: 401 }
      ),
    }
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
    return {
      response: NextResponse.json(
        { ok: false, error: 'Permissão insuficiente.' },
        { status: 403 }
      ),
    }
  }

  return auth
}
