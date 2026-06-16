import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/auth'
import { assertSameOrigin } from '@/lib/security'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const csrf = assertSameOrigin(request)
  if (csrf) return csrf

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
