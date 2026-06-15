import type { MetadataRoute } from 'next'
import { EMPRESA } from '@/lib/constants'
import { SEO_PAGES_LIST } from '@/lib/seo-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = EMPRESA.dominio.replace(/\/$/, '')
  const agora = new Date()

  const home = {
    url: `${base}/`,
    lastModified: agora,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  const internas = SEO_PAGES_LIST.map((p) => ({
    url: `${base}${p.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [home, ...internas]
}
