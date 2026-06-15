import { NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigurado } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function limpar(valor: unknown, max = 500): string {
  if (typeof valor !== 'string') return ''
  return valor.trim().slice(0, max)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Requisição inválida.' }, { status: 400 })
  }

  const nome = limpar(body.nome, 120)
  const whatsapp = limpar(body.whatsapp, 20)
  const mensagem = limpar(body.mensagem, 1000) || null

  if (!nome) {
    return NextResponse.json({ ok: false, error: 'Nome é obrigatório.' }, { status: 400 })
  }

  const digitos = whatsapp.replace(/\D/g, '')
  if (digitos.length < 10) {
    return NextResponse.json({ ok: false, error: 'WhatsApp inválido.' }, { status: 400 })
  }

  if (!isSupabaseConfigurado()) {
    return NextResponse.json(
      { ok: false, error: 'Serviço temporariamente indisponível.' },
      { status: 503 }
    )
  }

  const { data, error } = await supabaseAdmin
    .from('leads_immovi')
    .insert({
      nome,
      whatsapp,
      mensagem,
      tipo_atuacao: 'nao_informado',
      situacao_atual: 'nao_informado',
      faturamento_mensal: 'nao_informado',
      principal_necessidade: 'nao_informado',
      status: 'Novo',
      origem: 'widget_whatsapp',
      tags: ['lead_site_immovi', 'widget_whatsapp'],
    })
    .select('id')
    .single()

  if (error) {
    console.error('[api/leads/widget] erro:', error.message)
    return NextResponse.json(
      { ok: false, error: 'Não foi possível registrar sua solicitação.' },
      { status: 500 }
    )
  }

  const webhookUrl = process.env.WEBHOOK_WHATSAPP_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data.id, nome, whatsapp, mensagem, origem: 'widget_whatsapp' }),
      })
    } catch (e) {
      console.error('[api/leads/widget] webhook falhou:', e)
    }
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 })
}
