import { NextResponse } from 'next/server'
import { requireApiSession } from '@/lib/crm-session'
import { supabaseAdmin, isSupabaseConfigurado } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const POR_PAGINA = 20

export async function GET(request: Request) {
  const auth = await requireApiSession()
  if ('response' in auth) return auth.response

  if (!isSupabaseConfigurado()) {
    return NextResponse.json({ ok: true, leads: [], total: 0, pagina: 1, paginas: 0 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') || ''
  const tipo = searchParams.get('tipo_atuacao') || ''
  const necessidade = searchParams.get('principal_necessidade') || ''
  const origem = searchParams.get('origem') || ''
  const q = (searchParams.get('q') || '').trim()
  const pagina = Math.max(1, Number(searchParams.get('page') || '1') || 1)

  let query = supabaseAdmin
    .from('leads_immovi')
    .select('*', { count: 'exact' })
    .order('criado_em', { ascending: false })

  if (status) query = query.eq('status', status)
  if (tipo) query = query.eq('tipo_atuacao', tipo)
  if (necessidade) query = query.eq('principal_necessidade', necessidade)
  if (origem) query = query.eq('origem', origem)
  if (q) query = query.or(`nome.ilike.%${q}%,whatsapp.ilike.%${q}%,email.ilike.%${q}%`)

  const from = (pagina - 1) * POR_PAGINA
  query = query.range(from, from + POR_PAGINA - 1)

  const { data, error, count } = await query
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  const total = count ?? 0
  return NextResponse.json({
    ok: true,
    leads: data ?? [],
    total,
    pagina,
    paginas: Math.ceil(total / POR_PAGINA),
  })
}
