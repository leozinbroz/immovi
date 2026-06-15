import Header from '@/components/layout/Header'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <WhatsAppButton />
    </>
  )
}
