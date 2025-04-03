import { UsecaseItem } from './usecase-item'
import { useMemo, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { useUseCases } from '@/hooks/use-usecases'

export type UsecaseListProps = ComponentProps<'ul'> & {
  limit?: number
}

export function UsecaseList({ limit, className, ...rest }: UsecaseListProps) {
  const usecases = useUseCases()
  const items = useMemo(
    () => (limit && limit > 0 ? usecases.slice(0, limit) : usecases),
    [usecases, limit],
  )
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
