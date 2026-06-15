import {
  MonitorSmartphone,
  Wallet,
  MessageSquare,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'
import { TECNOLOGIA } from '@/lib/content'

const icones: LucideIcon[] = [
  MonitorSmartphone,
  Wallet,
  MessageSquare,
  BarChart3,
]

export default function Tecnologia() {
  return (
    <section id="tecnologia" className="bg-brancoFrio py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            {TECNOLOGIA.titulo}
          </h2>
          <p className="mt-4 text-base text-cinzaMedio md:text-lg">
            {TECNOLOGIA.subtitulo}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECNOLOGIA.cards.map((card, i) => {
            const Icon = icones[i] ?? MonitorSmartphone
            return (
              <div
                key={card}
                className="flex flex-col items-center rounded-2xl border border-cinzaClaro bg-white p-7 text-center transition-shadow hover:shadow-xl hover:shadow-azulEscuro/5"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-azulEscuro text-verde">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-azulEscuro">
                  {card}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
