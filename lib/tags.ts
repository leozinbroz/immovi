/**
 * Geração de tags automáticas para leads do site Immovi.
 * As tags alimentam a segmentação do CRM e dos fluxos de atendimento.
 */

export interface LeadTagInput {
  tipo_atuacao: string
  principal_necessidade?: string
}

const TAGS_TIPO_ATUACAO: Record<string, string[]> = {
  // Perfil 1 — prioritário
  corretor: ['corretor_pj', 'perfil_1_prioritario'],
  imobiliaria: ['imobiliaria', 'perfil_1_prioritario'],
  arquiteto: ['arquiteto', 'perfil_1_prioritario'],
  designer_interiores: ['designer_interiores', 'perfil_1_prioritario'],
  engenheiro_pj: ['engenheiro_pj', 'perfil_1_prioritario'],
  advogado_imobiliario: ['advogado_imobiliario', 'perfil_1_prioritario'],
  correspondente_bancario: ['correspondente_bancario', 'perfil_1_prioritario'],
  // Perfil 2 — médio prazo
  construtora: ['construtora', 'perfil_2_medio_prazo'],
  incorporadora: ['incorporadora', 'perfil_2_medio_prazo'],
}

const TAGS_NECESSIDADE: Record<string, string[]> = {
  abrir_empresa: ['precisa_abrir_empresa'],
  trocar_contador: ['quer_trocar_contador'],
  planejamento_tributario: ['planejamento_tributario'],
  organizar_financeiro: ['organizar_financeiro'],
  emitir_nota: ['emitir_nota'],
  separar_pf_pj: ['separar_pf_pj'],
}

export function gerarTags(input: LeadTagInput): string[] {
  const tags = new Set<string>()

  // Sempre incluir
  tags.add('lead_site_immovi')
  tags.add('consultoria_gratuita')

  const porAtuacao = TAGS_TIPO_ATUACAO[input.tipo_atuacao]
  if (porAtuacao) porAtuacao.forEach((t) => tags.add(t))

  if (input.principal_necessidade) {
    const porNecessidade = TAGS_NECESSIDADE[input.principal_necessidade]
    if (porNecessidade) porNecessidade.forEach((t) => tags.add(t))
  }

  return Array.from(tags)
}
