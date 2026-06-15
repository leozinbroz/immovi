'use client'

/**
 * Helpers de analytics para GA4 / GTM.
 * Os eventos são enviados via dataLayer (GTM) e, quando disponível, via gtag (GA4).
 * Funções seguras para SSR: não fazem nada fora do browser.
 */

export type AnalyticsEvent =
  | 'form_submit_consultoria'
  | 'whatsapp_click'
  | 'plano_click'
  | 'cta_hero_click'
  | 'cta_header_click'
  | 'cta_footer_click'
  | 'faq_open'
  | 'seo_page_cta_click'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === 'undefined') return

  // GTM dataLayer
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })

  // GA4 gtag (caso o GA esteja carregado diretamente)
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

/* Atalhos por evento, para uso direto nos componentes */

export const analytics = {
  formSubmitConsultoria: (params?: EventParams) =>
    trackEvent('form_submit_consultoria', params),
  whatsappClick: (origem: string) =>
    trackEvent('whatsapp_click', { origem }),
  planoClick: (plano: string, segmento: string) =>
    trackEvent('plano_click', { plano, segmento }),
  ctaHeroClick: () => trackEvent('cta_hero_click'),
  ctaHeaderClick: () => trackEvent('cta_header_click'),
  ctaFooterClick: (origem: string) =>
    trackEvent('cta_footer_click', { origem }),
  faqOpen: (pergunta: string) => trackEvent('faq_open', { pergunta }),
  seoPageCtaClick: (pagina: string) =>
    trackEvent('seo_page_cta_click', { pagina }),
}
