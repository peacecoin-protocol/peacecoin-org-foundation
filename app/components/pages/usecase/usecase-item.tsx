import type { UsecaseMaster } from '@/schemas'
import { Link } from 'react-router'

export type UsecaseItemProps = UsecaseMaster

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
      className="rounded-md bg-background p-12 flex items-center justify-between gap-12 transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div className="border-b border-primary font-semibold pb-4 relative">
            <div className="text-2xl text-primary mb-4">{tokenName}</div>
            <div className="text-base">{communityName}</div>
            <i className="absolute left-0 bottom-0 w-[5rem] h-[1px] bg-secondary" />
          </div>
          <h2 className="text-4xl font-medium leading-[1.8]">{title}</h2>
          <p className="flex items-center justify-center px-9 h-9 text-sm text-primary font-bold bg-primary/7 border border-primary rounded-full">
            {category}
          </p>
        </div>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-[30rem] h-auto object-cover"
          width="480"
          height="360"
        />
      </div>
    </Link>
  )
}
