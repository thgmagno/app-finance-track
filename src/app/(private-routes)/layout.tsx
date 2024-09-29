import { Navbar } from '@/components/navbar'
import { Providers } from './providers'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  )
}
