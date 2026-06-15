import { AlertCircle } from 'lucide-react'
import { DORES } from '@/lib/content'
import EventLink from '@/components/ui/EventLink'

export default function Dores() {
  return (
    <section id="dores" className="bg-brancoFrio py-20 md:py-24">
      <div className="container">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
          {DORES.titulo}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DORES.itens.map((dor, i) => (
            <div
              key={i}
              className="group flex items-start gap-3 rounded-xl border border-cinzaClaro bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-azulEscuro/5"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-verde/10 text-verde transition-colors group-hover:bg-verde group-hover:text-azulEscuro">
                <AlertCircle size={20} />
              </span>
              <p className="text-[15px] leading-relaxed text-cinzaMedio">{dor}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <EventLink
            href={DORES.cta.href}
            event="cta_hero_click"
            eventParams={{ origem: 'dores' }}
            className="inline-flex rounded-full bg-verde px-7 py-3.5 text-base font-semibold text-azulEscuro transition-transform hover:scale-[1.03]"
          >
            {DORES.cta.label}
          </EventLink>
        </div>
      </div>
    </section>
  )
}
