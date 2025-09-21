import { ContentItem } from './content-item'
import { useMemo, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { useContent } from '@/hooks/use-content'

export type ContentListProps = ComponentProps<'ul'> & {
  limit?: number
}

export function ContentList({ limit, className, ...rest }: ContentListProps) {
  const content = useContent()
  const items = useMemo(
    () => (limit && limit > 0 ? content.slice(0, limit) : content),
    [content, limit],
  )
  return (
    <ul className={cn('flex flex-col gap-12', className)} {...rest}>
      {items.map((item) => (
        <li key={item.id}>
          <ContentItem {...item} />
        </li>
      ))}
    </ul>
  )
}
