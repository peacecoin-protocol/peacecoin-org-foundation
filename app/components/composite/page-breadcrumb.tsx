import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ComponentProps } from 'react'
import { LocaleLink } from '../ui/locale-link'

type Item = {
  href: string
  label: string
}

export type PageBreadcrumbProps = ComponentProps<'nav'> & {
  list: [Item, ...Item[]]
}

export function PageBreadcrumb({ list, ...rest }: PageBreadcrumbProps) {
  const first = list[0]
  const dropMenuItems = list.slice(1, -2)
  const parent = list.slice(-2)[0]
  const last = list.slice(-1)[0]

  return (
    <Breadcrumb {...rest}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <LocaleLink to={first.href}>{first.label}</LocaleLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {dropMenuItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {dropMenuItems.map(({ href, label }) => (
                    <DropdownMenuItem key={href}>
                      <LocaleLink to={href}>{label}</LocaleLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {first !== parent && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <LocaleLink to={parent.href}>{parent.label}</LocaleLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{last.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
