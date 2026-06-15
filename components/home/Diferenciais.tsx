import {
  Building2,
  Headphones,
  Calculator,
  Briefcase,
  Receipt,
  BarChart3,
  ClipboardCheck,
  Repeat,
  FolderKanban,
  Cpu,
  type LucideIcon,
} from 'lucide-react'
import { DIFERENCIAIS } from '@/lib/content'

const icones: LucideIcon[] = [
  Building2,
  Headphones,
  Calculator,
  Briefcase,
  Receipt,
  BarChart3,
  ClipboardCheck,
  Repeat,
  FolderKanban,
  Cpu,
]

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-azulEscuro py-20 text-brancoFrio md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {DIFERENCIAIS.titulo}
          </h2>
          <p className="mt-4 text-base text-brancoFrio/75 md:text-lg">
            {DIFERENCIAIS.subtitulo}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {DIFERENCIAIS.itens.map((item, i) => {
            const Icon = icones[i] ?? Building2
            return (
              <div
                key={item.titulo}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-verde/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-verde/15 text-verde">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-base font-semibold leading-snug">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brancoFrio/70">
                  {item.descricao}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
