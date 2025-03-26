import type { Usecase } from '@/schemas'
import { Link } from 'react-router'
import { UsecaseTitle } from './usecase-title'

export type UsecaseItemProps = Usecase

export function UsecaseItem({
  id,
  tokenName,
  communityName,
  title,
  category,
  thumbnailUrl,
}: UsecaseItemProps) {
  return (
    <Link
      to={`/usecases/${id}`}
      className="flex max-lg:flex-col lg:items-center lg:justify-between rounded-md bg-background p-6 md:p-12 items-center justify-between gap-8 lg:gap-12 transition-shadow hover:shadow-lg"
    >
      <UsecaseTitle
        tokenName={tokenName}
        communityName={communityName}
        title={title}
        category={category}
      />
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-auto lg:w-1/3 lg:min-w-[25rem] object-cover bg-foreground/5"
        width="480"
        height="360"
      />
    </Link>
  )
}
