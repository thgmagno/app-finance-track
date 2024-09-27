'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavigationMenu() {
  const pathname = usePathname()

  const Item = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`)

    return (
      <div
        className={clsx('inline-flex border-b-2 border-transparent p-1', {
          'border-white': isActive,
        })}
      >
        <Link href={href}>{label}</Link>
      </div>
    )
  }

  return (
    <nav className="no-scrollbar flex space-x-3 overflow-x-scroll">
      <Item href="/" label="Home" />
      <Item href="/expenses" label="Expenses" />
      <Item href="/receipts" label="Receipts" />
      <Item href="/savings" label="Savings" />
      <Item href="/settings" label="Settings" />
    </nav>
  )
}
