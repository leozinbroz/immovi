'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  Check,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { SeoPageData } from '@/lib/seo-content'
import EventLink from '@/components/ui/EventLink'
import WhatsAppCTA from '@/components/ui/WhatsAppCTA'

export default function PageInternaSEO({ data }: { data: SeoPageData }) {
  const [aberto, setAberto] = useState<number | null>(0)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-azulEscuro text-brancoFrio">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-verde/20 blur-3xl"
        />
        <div className="container relative py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-verde/40 bg-verde/10 px-4 py-1.5 text-sm font-medium text-verde">
            <Sparkles size={16} />
            {data.badge}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            {data.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brancoFrio/80 md:text-lg">
            {data.subtitulo}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EventLink
              href="/#consultoria"
              event="seo_page_cta_click"
              eventParams={{ pagina: data.chave, local: 'hero' }}
              className="rounded-full bg-verde px-7 py-3.5 text-center text-base font-semibold text-azulEscuro transition-transform hover:scale-[1.03]"
            >
              Solicitar Consultoria Gratuita
            </EventLink>
            <WhatsAppCTA
              messageKey={data.heroWhatsappKey}
              origem={`seo_${data.chave}_hero`}
              className="rounded-full border border-white/25 px-7 py-3.5 text-center text-base font-semibold text-brancoFrio transition-colors hover:border-verde hover:text-verde"
            >
              Falar com Especialista
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className="bg-brancoFrio py-20 md:py-24">
        <div className="container">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            {data.dores.titulo}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {data.dores.itens.map((dor, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-cinzaClaro bg-white p-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-verde/10 text-verde">
                  <AlertCircle size={20} />
                </span>
                <p className="text-[15px] leading-relaxed text-cinzaMedio">{dor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO AJUDA */}
      <section className="bg-azulEscuro py-20 text-brancoFrio md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {data.comoAjuda.titulo}
            </h2>
            <p className="mt-4 text-base text-brancoFrio/75 md:text-lg">
              {data.comoAjuda.subtitulo}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {data.comoAjuda.itens.map((item) => (
              <div
                key={item.titulo}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-semibold">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brancoFrio/70">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-brancoFrio py-20 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            {data.beneficios.titulo}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {data.beneficios.itens.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-xl border border-cinzaClaro bg-white p-5"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde/15 text-verde">
                  <Check size={18} />
                </span>
                <span className="text-[15px] text-cinzaMedio">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brancoFrio pb-20 md:pb-24">
        <div className="container max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
            Dúvidas frequentes
          </h2>
          <div className="mt-10 space-y-3">
            {data.faq.map((item, i) => {
              const isOpen = aberto === i
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-cinzaClaro bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setAberto(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-azulEscuro md:text-base">
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-verde transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-cinzaMedio">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-brancoFrio pb-20 md:pb-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-azulEscuro via-azulEscuro to-[#0d2c40] px-7 py-14 text-center text-brancoFrio md:px-12 md:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-verde/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Vamos organizar a contabilidade do seu negócio imobiliário?
              </h2>
              <p className="mt-4 text-base text-brancoFrio/80">
                Receba uma consultoria gratuita e descubra o melhor caminho
                contábil e tributário para você.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <EventLink
                  href="/#consultoria"
                  event="seo_page_cta_click"
                  eventParams={{ pagina: data.chave, local: 'cta_final' }}
                  className="rounded-full bg-verde px-7 py-3.5 text-base font-semibold text-azulEscuro transition-transform hover:scale-[1.03]"
                >
                  Consultoria Gratuita
                </EventLink>
                <WhatsAppCTA
                  messageKey={data.heroWhatsappKey}
                  origem={`seo_${data.chave}_cta_final`}
                  className="rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-brancoFrio transition-colors hover:border-verde hover:text-verde"
                >
                  Falar pelo WhatsApp
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINKS INTERNOS */}
      <section className="bg-azulEscuro py-16 text-brancoFrio">
        <div className="container">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-verde">
            Veja também
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {data.linksInternos.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-verde/40"
              >
                <h3 className="text-base font-semibold">{link.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-brancoFrio/70">
                  {link.descricao}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-verde">
                  Acessar <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
