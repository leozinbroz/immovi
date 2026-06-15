import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signToken, COOKIE_NAME, TOKEN_MAX_AGE } from '@/lib/auth'
import { supabaseAdmin, isSupabaseConfigurado } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: { email?: string; senha?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requisição inválida.' },
      { status: 400 }
    )
  }

  const email = (body.email || '').trim().toLowerCase()
  const senha = body.senha || ''

  if (!email || !senha) {
    return NextResponse.json(
      { ok: false, error: 'Informe e-mail e senha.' },
      { status: 400 }
    )
  }

  let autenticado: { sub: string; email: string; nome?: string; role?: string } | null =
    null

  // 1) Admin de bootstrap via variáveis de ambiente
  const adminEmail = (process.env.CRM_ADMIN_EMAIL || '').trim().toLowerCase()
  const adminSenha = process.env.CRM_ADMIN_SENHA || ''
  if (adminEmail && adminSenha && email === adminEmail && senha === adminSenha) {
    autenticado = { sub: 'admin-env', email, nome: 'Administrador', role: 'admin' }
  }

  // 2) Usuário cadastrado na tabela crm_users (hash bcrypt)
  if (!autenticado && isSupabaseConfigurado()) {
    const { data: user } = await supabaseAdmin
      .from('crm_users')
      .select('id, email, nome, role, senha_hash, ativo')
      .eq('email', email)
      .eq('ativo', true)
      .maybeSingle()

    if (user?.senha_hash && bcrypt.compareSync(senha, user.senha_hash)) {
      autenticado = {
        sub: user.id,
        email: user.email,
        nome: user.nome ?? undefined,
        role: user.role ?? 'admin',
      }
    }
  }

  if (!autenticado) {
    return NextResponse.json(
      { ok: false, error: 'E-mail ou senha incorretos.' },
      { status: 401 }
    )
  }

  const token = await signToken(autenticado)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_MAX_AGE,
  })
  return res
}
