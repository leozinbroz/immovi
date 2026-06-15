import { FORM } from './content'

type Opcao = { value: string; label: string }

function toMap(arr: Opcao[]): Record<string, string> {
  return Object.fromEntries(arr.map((o) => [o.value, o.label]))
}

export const LABEL_TIPO_ATUACAO = toMap(FORM.opcoes.tipoAtuacao)
export const LABEL_SITUACAO_ATUAL = toMap(FORM.opcoes.situacaoAtual)
export const LABEL_FATURAMENTO = toMap(FORM.opcoes.faturamentoMensal)
export const LABEL_EMITE_NOTA = toMap(FORM.opcoes.emiteNota)
export const LABEL_NECESSIDADE = toMap(FORM.opcoes.principalNecessidade)

export const rotulo = (mapa: Record<string, string>, valor?: string | null) =>
  (valor && mapa[valor]) || valor || '—'

/** Cor do badge por status do lead (classes Tailwind). */
export const COR_STATUS: Record<string, string> = {
  Novo: 'bg-verde/15 text-verde',
  'Em atendimento': 'bg-azulAcinzentado/20 text-azulAcinzentado',
  'Consultoria agendada': 'bg-blue-100 text-blue-700',
  'Proposta enviada': 'bg-amber-100 text-amber-700',
  'Aguardando retorno': 'bg-orange-100 text-orange-700',
  Convertido: 'bg-emerald-100 text-emerald-700',
  Perdido: 'bg-red-100 text-red-700',
}
