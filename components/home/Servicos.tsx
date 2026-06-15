import {
  Rocket,
  Repeat,
  Calculator,
  PiggyBank,
  Receipt,
  Wallet,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { SERVICOS } from '@/lib/content'
import WhatsAppCTA from '@/components/ui/WhatsAppCTA'

const icones: LucideIcon[] = [
  Rocket,
  Repeat,
  Calculator,
  PiggyBank,
  Receipt,
  Wallet,
]

export default function Servicos() {
  return (
    <section id="servicos" className="bg-brancoFrio py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            {SERVICOS.titulo}
          </h2>
          <p className="mt-4 text-base text-cinzaMedio md:text-lg">
            {SERVICOS.subtitulo}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.itens.map((serv, i) => {
            const Icon = icones[i] ?? Calculator
            return (
              <div
                key={serv.titulo}
                className="flex flex-col rounded-2xl border border-cinzaClaro bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-azulEscuro/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-verde/10 text-verde">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-azulEscuro">
                  {serv.titulo}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cinzaMedio">
                  {serv.descricao}
                </p>
                <WhatsAppCTA
                  messageKey={serv.whatsappKey}
                  origem={`servico_${i + 1}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-verde transition-colors hover:text-azulEscuro"
                >
                  Falar com especialista <ArrowRight size={15} />
                </WhatsAppCTA>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
