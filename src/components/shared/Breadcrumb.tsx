'use client'

import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

export function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname === '/' ? [] : pathname.replace('/', '').split('/')

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Finance Track</BreadcrumbLink>
        </BreadcrumbItem>
        {paths.length > 0 &&
          paths.map((path, index) => (
            <>
              <BreadcrumbSeparator />
              {index + 1 === paths.length ? (
                <BreadcrumbItem className="cursor-default select-none">
                  {path.charAt(0).toUpperCase().concat(path.slice(1))}
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${path}`}>
                    {path.charAt(0).toUpperCase().concat(path.slice(1))}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </>
          ))}
      </BreadcrumbList>
    </BreadcrumbComponent>
  )
}
