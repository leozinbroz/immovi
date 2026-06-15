import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/crm-session'
import CrmTopbar from '@/components/crm/CrmTopbar'

export const metadata: Metadata = {
  title: 'CRM Immovi',
  robots: { index: false, follow: false },
}

export default async function CrmLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-[#eef2f4]">
      <CrmTopbar email={session.email} nome={session.nome} />
      <main className="container py-8">{children}</main>
    </div>
  )
}
