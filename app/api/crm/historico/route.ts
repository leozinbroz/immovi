import { NextResponse } from 'next/server'
import { requireApiSession } from '@/lib/crm-session'
import { supabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const auth = await requireApiSession()
  if ('response' in auth) return auth.response

  let body: { lead_id?: string; observacao?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Requisição inválida.' }, { status: 400 })
  }

  const leadId = (body.lead_id || '').trim()
  const observacao = (body.observacao || '').trim()

  if (!leadId) {
    return NextResponse.json({ ok: false, error: 'lead_id é obrigatório.' }, { status: 400 })
  }
  if (!observacao) {
    return NextResponse.json({ ok: false, error: 'A observação não pode ser vazia.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('leads_immovi_historico').insert({
    lead_id: leadId,
    observacao: observacao.slice(0, 2000),
  })

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
