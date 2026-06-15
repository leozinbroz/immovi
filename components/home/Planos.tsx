'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PLANOS, type Plano } from '@/lib/content'
import { whatsappLink, MENSAGENS_WHATSAPP } from '@/lib/constants'
import { analytics } from '@/lib/analytics'

type Segmento = 'profissionais' | 'empresas'

export default function Planos() {
  const [segmento, setSegmento] = useState<Segmento>('profissionais')
  const planos: Plano[] = PLANOS[segmento]

  return (
    <section id="planos" className="bg-brancoFrio py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            {PLANOS.titulo}
          </h2>
          <p className="mt-4 text-base text-cinzaMedio md:text-lg">
            {PLANOS.subtitulo}
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-cinzaClaro bg-white p-1">
            <button
              type="button"
              onClick={() => setSegmento('profissionais')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                segmento === 'profissionais'
                  ? 'bg-azulEscuro text-brancoFrio'
                  : 'text-cinzaMedio hover:text-azulEscuro'
              }`}
              aria-pressed={segmento === 'profissionais'}
            >
              {PLANOS.toggle.profissionais}
            </button>
            <button
              type="button"
              onClick={() => setSegmento('empresas')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                segmento === 'empresas'
                  ? 'bg-azulEscuro text-brancoFrio'
                  : 'text-cinzaMedio hover:text-azulEscuro'
              }`}
              aria-pressed={segmento === 'empresas'}
            >
              {PLANOS.toggle.empresas}
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {planos.map((plano) => (
            <div
              key={plano.nivel}
              className={`flex flex-col rounded-2xl border p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-azulEscuro/5 ${
                plano.destaque
                  ? 'border-verde bg-azulEscuro text-brancoFrio hover:border-verde/70'
                  : 'border-cinzaClaro bg-white hover:border-verde'
              }`}
            >
              <h3 className="flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-verde" aria-hidden="true" />
                <span
                  className={`text-2xl font-extrabold tracking-tight ${
                    plano.destaque ? 'text-brancoFrio' : 'text-azulEscuro'
                  }`}
                >
                  {plano.nivel}
                </span>
              </h3>
              <p
                className={`mt-3 text-3xl font-extrabold ${
                  plano.destaque ? 'text-brancoFrio' : 'text-azulEscuro'
                }`}
              >
                {plano.preco}
              </p>
              <p
                className={`mt-2 text-sm ${
                  plano.destaque ? 'text-brancoFrio/75' : 'text-cinzaMedio'
                }`}
              >
                {plano.resumo}
              </p>

              <ul className="mt-6 space-y-3">
                {plano.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-verde"
                    />
                    <span
                      className={
                        plano.destaque ? 'text-brancoFrio/85' : 'text-cinzaMedio'
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href={whatsappLink(MENSAGENS_WHATSAPP[plano.whatsappKey])}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.planoClick(plano.nivel, segmento)}
                  className={`block rounded-full px-6 py-3 text-center text-base font-semibold transition-transform hover:scale-[1.02] ${
                    plano.destaque
                      ? 'bg-verde text-azulEscuro'
                      : 'bg-azulEscuro text-brancoFrio'
                  }`}
                >
                  Quero este plano
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
