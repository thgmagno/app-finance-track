'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()

  const Item = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        className={clsx('border-b-2 border-transparent p-2', {
          'border-white': isActive,
        })}
      >
        {label}
      </Link>
    )
  }

  return (
    <aside className="mb-5 flex flex-row space-x-3 pr-3 md:flex-col md:space-x-0 md:space-y-1">
      <Item href="/settings" label="General" />
      <Item href="/settings/categories" label="Categories" />
      <Item href="/settings/methods" label="Methods" />
    </aside>
  )
}
