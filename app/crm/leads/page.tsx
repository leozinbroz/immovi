import Link from 'next/link'
import { Inbox } from 'lucide-react'
import { getLeadsList } from '@/lib/crm-data'
import FiltrosLead from '@/components/crm/FiltrosLead'
import LeadCard from '@/components/crm/LeadCard'

export const dynamic = 'force-dynamic'

interface SearchParams {
  status?: string
  tipo_atuacao?: string
  principal_necessidade?: string
  origem?: string
  q?: string
  page?: string
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = Math.max(1, Number(searchParams.page || '1') || 1)
  const { leads, total, pagina, paginas } = await getLeadsList({
    status: searchParams.status,
    tipo_atuacao: searchParams.tipo_atuacao,
    principal_necessidade: searchParams.principal_necessidade,
    origem: searchParams.origem,
    q: searchParams.q,
    page,
  })

  const qsBase = new URLSearchParams()
  if (searchParams.status) qsBase.set('status', searchParams.status)
  if (searchParams.tipo_atuacao) qsBase.set('tipo_atuacao', searchParams.tipo_atuacao)
  if (searchParams.principal_necessidade)
    qsBase.set('principal_necessidade', searchParams.principal_necessidade)
  if (searchParams.origem) qsBase.set('origem', searchParams.origem)
  if (searchParams.q) qsBase.set('q', searchParams.q)

  const linkPagina = (p: number) => {
    const params = new URLSearchParams(qsBase)
    params.set('page', String(p))
    return `/crm/leads?${params.toString()}`
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-azulEscuro">Leads</h1>
          <p className="mt-1 text-sm text-cinzaMedio">
            {total} {total === 1 ? 'lead encontrado' : 'leads encontrados'}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <FiltrosLead
          valores={{
            status: searchParams.status,
            tipo_atuacao: searchParams.tipo_atuacao,
            principal_necessidade: searchParams.principal_necessidade,
            origem: searchParams.origem,
            q: searchParams.q,
          }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-cinzaClaro bg-white py-16 text-center">
            <Inbox size={40} className="text-azulAcinzentado" />
            <p className="mt-4 font-semibold text-azulEscuro">
              Nenhum lead encontrado
            </p>
            <p className="mt-1 text-sm text-cinzaMedio">
              Ajuste os filtros ou aguarde novas solicitações pelo site.
            </p>
          </div>
        ) : (
          leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
        )}
      </div>

      {/* Paginação */}
      {paginas > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {pagina > 1 && (
            <Link
              href={linkPagina(pagina - 1)}
              className="rounded-lg border border-cinzaClaro bg-white px-4 py-2 text-sm font-medium text-azulEscuro hover:border-verde"
            >
              Anterior
            </Link>
          )}
          <span className="px-2 text-sm text-cinzaMedio">
            Página {pagina} de {paginas}
          </span>
          {pagina < paginas && (
            <Link
              href={linkPagina(pagina + 1)}
              className="rounded-lg border border-cinzaClaro bg-white px-4 py-2 text-sm font-medium text-azulEscuro hover:border-verde"
            >
              Próxima
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
