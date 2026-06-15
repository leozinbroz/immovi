import { CTA_FINAL } from '@/lib/content'
import EventLink from '@/components/ui/EventLink'
import WhatsAppCTA from '@/components/ui/WhatsAppCTA'

export default function CTAFinal() {
  return (
    <section className="bg-brancoFrio py-20 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-azulEscuro via-azulEscuro to-[#0d2c40] px-7 py-14 text-center text-brancoFrio md:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-verde/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {CTA_FINAL.titulo}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brancoFrio/80 md:text-lg">
              {CTA_FINAL.subtitulo}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <EventLink
                href={CTA_FINAL.ctaPrimario.href}
                event="cta_footer_click"
                eventParams={{ origem: 'cta_final' }}
                className="rounded-full bg-verde px-7 py-3.5 text-base font-semibold text-azulEscuro transition-transform hover:scale-[1.03]"
              >
                {CTA_FINAL.ctaPrimario.label}
              </EventLink>
              <WhatsAppCTA
                messageKey={CTA_FINAL.ctaSecundario.whatsappKey}
                origem="cta_final"
                className="rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-brancoFrio transition-colors hover:border-verde hover:text-verde"
              >
                {CTA_FINAL.ctaSecundario.label}
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
