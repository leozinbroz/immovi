'use client'

import type { ReactNode } from 'react'
import { whatsappLink, MENSAGENS_WHATSAPP } from '@/lib/constants'
import { analytics } from '@/lib/analytics'

type WhatsAppKey = keyof typeof MENSAGENS_WHATSAPP

interface WhatsAppCTAProps {
  messageKey: WhatsAppKey
  origem: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}

export default function WhatsAppCTA({
  messageKey,
  origem,
  className,
  children,
  ariaLabel,
}: WhatsAppCTAProps) {
  return (
    <a
      href={whatsappLink(MENSAGENS_WHATSAPP[messageKey])}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.whatsappClick(origem)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
