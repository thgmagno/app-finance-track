import { Sidebar } from '@/components/settings/Sidebar'
import { PageTitle } from '@/components/shared/PageTitle'

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // return <>{children}</>
  return (
    <>
      <PageTitle title="Settings" />
      <main className="grid md:grid-cols-6">
        <Sidebar />
        <div className="md:col-span-5">{children}</div>
      </main>
    </>
  )
}
