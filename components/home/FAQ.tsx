'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ as FAQ_CONTENT } from '@/lib/content'
import { analytics } from '@/lib/analytics'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_CONTENT.itens.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.resposta,
    },
  })),
}

export default function FAQ() {
  const [aberto, setAberto] = useState<number | null>(0)

  const toggle = (i: number, pergunta: string) => {
    setAberto((atual) => {
      const proximo = atual === i ? null : i
      if (proximo === i) analytics.faqOpen(pergunta)
      return proximo
    })
  }

  return (
    <section id="faq" className="bg-brancoFrio py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container max-w-3xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-azulEscuro md:text-4xl">
          {FAQ_CONTENT.titulo}
        </h2>

        <div className="mt-12 space-y-3">
          {FAQ_CONTENT.itens.map((item, i) => {
            const isOpen = aberto === i
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-cinzaClaro bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggle(i, item.pergunta)}
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
  )
}
