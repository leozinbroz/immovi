import type { MetadataRoute } from 'next'
import { EMPRESA } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  const base = EMPRESA.dominio.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/crm', '/login', '/api'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
