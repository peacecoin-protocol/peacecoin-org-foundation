import type { UsecaseMaster } from '@/schemas'
import { UsecaseItem } from './usecase-item'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type UsecaseListProps = HTMLAttributes<HTMLUListElement> & {
  items: UsecaseMaster[]
}

export function UsecaseList({ items, className, ...rest }: UsecaseListProps) {
  return (
    <ul className={cn('flex flex-col gap-12', className)} {...rest}>
      {items.map((item) => (
        <li key={item.id}>
          <UsecaseItem {...item} />
        </li>
      ))}
    </ul>
  )
}
