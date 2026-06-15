import Link from 'next/link'
import { Users, TrendingUp, CircleDollarSign, ArrowRight } from 'lucide-react'
import { getDashboardStats } from '@/lib/crm-data'
import { STATUS_LEAD } from '@/lib/constants'
import { COR_STATUS, rotulo, LABEL_TIPO_ATUACAO } from '@/lib/labels'

export const dynamic = 'force-dynamic'

export default async function CrmDashboard() {
  const stats = await getDashboardStats()

  const tiposOrdenados = Object.entries(stats.porTipo).sort((a, b) => b[1] - a[1])

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-azulEscuro">Dashboard</h1>
          <p className="mt-1 text-sm text-cinzaMedio">
            Visão geral dos leads captados pelo site.
          </p>
        </div>
        <Link
          href="/crm/leads"
          className="inline-flex items-center gap-2 rounded-full bg-azulEscuro px-5 py-2.5 text-sm font-semibold text-brancoFrio transition-transform hover:scale-[1.03]"
        >
          Ver todos os leads <ArrowRight size={16} />
        </Link>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          icon={<Users size={22} />}
          label="Total de leads"
          valor={String(stats.total)}
        />
        <KpiCard
          icon={<CircleDollarSign size={22} />}
          label="Convertidos"
          valor={String(stats.convertidos)}
        />
        <KpiCard
          icon={<TrendingUp size={22} />}
          label="Taxa de conversão"
          valor={`${stats.taxaConversao.toFixed(1)}%`}
        />
      </div>

      {/* Por status */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-cinzaMedio">
          Leads por status
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATUS_LEAD.map((status) => (
            <Link
              key={status}
              href={`/crm/leads?status=${encodeURIComponent(status)}`}
              className="rounded-xl border border-cinzaClaro bg-white p-4 transition-shadow hover:shadow-md"
            >
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  COR_STATUS[status] || 'bg-cinzaClaro text-cinzaMedio'
                }`}
              >
                {status}
              </span>
              <p className="mt-3 text-2xl font-extrabold text-azulEscuro">
                {stats.porStatus[status] || 0}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Por tipo de atuação */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-cinzaMedio">
          Leads por tipo de atuação
        </h2>
        <div className="mt-4 rounded-xl border border-cinzaClaro bg-white p-2">
          {tiposOrdenados.length === 0 ? (
            <p className="px-3 py-4 text-sm text-cinzaMedio">
              Nenhum lead registrado ainda.
            </p>
          ) : (
            <ul className="divide-y divide-cinzaClaro/70">
              {tiposOrdenados.map(([tipo, qtd]) => (
                <li
                  key={tipo}
                  className="flex items-center justify-between px-3 py-3"
                >
                  <span className="text-sm text-azulEscuro">
                    {rotulo(LABEL_TIPO_ATUACAO, tipo)}
                  </span>
                  <span className="rounded-full bg-azulEscuro/5 px-2.5 py-1 text-xs font-bold text-azulEscuro">
                    {qtd}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}

function KpiCard({
  icon,
  label,
  valor,
}: {
  icon: React.ReactNode
  label: string
  valor: string
}) {
  return (
    <div className="rounded-xl border border-cinzaClaro bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-cinzaMedio">{label}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-verde/10 text-verde">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold text-azulEscuro">{valor}</p>
    </div>
  )
}
