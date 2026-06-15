'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics'

interface EventLinkProps {
  href: string
  event: AnalyticsEvent
  eventParams?: Record<string, string>
  className?: string
  children: ReactNode
}

/**
 * Link interno (âncora ou rota) que dispara um evento de analytics ao clicar.
 * Usado em CTAs de Hero, Header, Footer/CTA Final e páginas internas de SEO.
 */
export default function EventLink({
  href,
  event,
  eventParams,
  className,
  children,
}: EventLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent(event, eventParams)}
      className={className}
    >
      {children}
    </Link>
  )
}
