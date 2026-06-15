import type { Metadata } from 'next'
import PageInternaSEO from '@/components/seo/PageInternaSEO'
import { SEO_PAGES } from '@/lib/seo-content'

const data = SEO_PAGES.designers

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: data.slug },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: data.slug,
  },
}

export default function Page() {
  return <PageInternaSEO data={data} />
}
