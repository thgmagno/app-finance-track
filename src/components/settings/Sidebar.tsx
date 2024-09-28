'use client'

import Link from 'next/link'

export function Sidebar() {
  const Item = ({ href, label }: { href: string; label: string }) => {
    return (
      <Link href={href} className="p-2">
        {label}
      </Link>
    )
  }

  return (
    <aside className="mb-5 flex flex-row space-x-3 pr-3 md:flex-col md:space-x-0 md:space-y-1">
      <Item href="/settings" label="General" />
      <Item href="/settings/team" label="Team" />
      <Item href="/settings/profile" label="Profile" />
      <Item href="/settings/categories" label="Categories" />
      <Item href="/settings/methods" label="Methods" />
    </aside>
  )
}
