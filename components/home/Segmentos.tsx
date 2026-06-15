import Link from 'next/link'
import {
  KeyRound,
  Building2,
  PencilRuler,
  Palette,
  HardHat,
  Scale,
  Landmark,
  Building,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { SEGMENTOS } from '@/lib/content'

const icones: LucideIcon[] = [
  KeyRound,
  Building2,
  PencilRuler,
  Palette,
  HardHat,
  Scale,
  Landmark,
  Building,
]

export default function Segmentos() {
  return (
    <section id="segmentos" className="bg-brancoFrio py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            {SEGMENTOS.titulo}
          </h2>
          <p className="mt-4 text-base text-cinzaMedio md:text-lg">
            {SEGMENTOS.subtitulo}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTOS.itens.map((seg, i) => {
            const Icon = icones[i] ?? Building2
            return (
              <Link
                key={seg.href}
                href={seg.href}
                className="group flex flex-col rounded-xl border border-cinzaClaro bg-white p-6 transition-all hover:-translate-y-1 hover:border-verde hover:shadow-xl hover:shadow-azulEscuro/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-azulEscuro text-verde transition-colors group-hover:bg-verde group-hover:text-azulEscuro">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-azulEscuro">
                  {seg.nome}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-verde opacity-0 transition-opacity group-hover:opacity-100">
                  Ver soluções <ArrowRight size={15} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
