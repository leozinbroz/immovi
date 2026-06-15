import { NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigurado } from '@/lib/supabase/server'
import { gerarTags } from '@/lib/tags'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CAMPOS_OBRIGATORIOS = [
  'nome',
  'whatsapp',
  'tipo_atuacao',
  'situacao_atual',
  'faturamento_mensal',
  'principal_necessidade',
] as const

function limpar(valor: unknown, max = 500): string {
  if (typeof valor !== 'string') return ''
  return valor.trim().slice(0, max)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Corpo da requisição inválido.' },
      { status: 400 }
    )
  }

  // Sanitização
  const lead = {
    nome: limpar(body.nome, 120),
    whatsapp: limpar(body.whatsapp, 20),
    email: limpar(body.email, 160) || null,
    tipo_atuacao: limpar(body.tipo_atuacao, 60),
    tipo_atuacao_outro: limpar(body.tipo_atuacao_outro, 120) || null,
    situacao_atual: limpar(body.situacao_atual, 60),
    faturamento_mensal: limpar(body.faturamento_mensal, 60),
    emite_nota: limpar(body.emite_nota, 40) || null,
    principal_necessidade: limpar(body.principal_necessidade, 60),
    mensagem: limpar(body.mensagem, 2000) || null,
  }

  // Validação backend
  const faltando = CAMPOS_OBRIGATORIOS.filter((c) => !lead[c])
  if (faltando.length > 0) {
    return NextResponse.json(
      { ok: false, error: 'Campos obrigatórios ausentes.', campos: faltando },
      { status: 400 }
    )
  }
  if (lead.tipo_atuacao === 'outro' && !lead.tipo_atuacao_outro) {
    return NextResponse.json(
      { ok: false, error: 'Descreva o tipo de atuação.' },
      { status: 400 }
    )
  }
  const digitosWhats = lead.whatsapp.replace(/\D/g, '')
  if (digitosWhats.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'WhatsApp inválido.' },
      { status: 400 }
    )
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json(
      { ok: false, error: 'E-mail inválido.' },
      { status: 400 }
    )
  }

  if (!isSupabaseConfigurado()) {
    return NextResponse.json(
      { ok: false, error: 'Serviço temporariamente indisponível.' },
      { status: 503 }
    )
  }

  // Tags automáticas
  const tags = gerarTags({
    tipo_atuacao: lead.tipo_atuacao,
    principal_necessidade: lead.principal_necessidade,
  })

  // Persistência
  const { data, error } = await supabaseAdmin
    .from('leads_immovi')
    .insert({
      ...lead,
      tags,
      status: 'Novo',
      origem: 'site_immovi',
    })
    .select('id')
    .single()

  if (error) {
    console.error('[api/leads] erro ao salvar lead:', error.message)
    return NextResponse.json(
      { ok: false, error: 'Não foi possível registrar sua solicitação.' },
      { status: 500 }
    )
  }

  // Webhook opcional (não bloqueia a resposta em caso de falha)
  const webhookUrl = process.env.WEBHOOK_WHATSAPP_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data.id, ...lead, tags }),
      })
    } catch (e) {
      console.error('[api/leads] webhook falhou:', e)
    }
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 })
}
