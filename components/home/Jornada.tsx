import { JORNADA } from '@/lib/content'

export default function Jornada() {
  return (
    <section id="jornada" className="bg-azulEscuro py-20 text-brancoFrio md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {JORNADA.titulo}
          </h2>
          <p className="mt-4 text-base text-brancoFrio/75 md:text-lg">
            {JORNADA.subtitulo}
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* Linha conectora (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-verde/40 to-transparent md:block"
          />
          {JORNADA.etapas.map((etapa) => (
            <div key={etapa.numero} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-verde bg-azulEscuro text-lg font-bold text-verde">
                {etapa.numero}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brancoFrio/70">
                {etapa.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
