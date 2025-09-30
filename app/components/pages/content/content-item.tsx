import type { Content } from '@/schemas'
import { ContentTitle } from './content-title'
import { LocaleLink } from '@/components/ui/locale-link'

export type ContentItemProps = Content

export function ContentItem({
  id,
  tokenName,
  communityName,
  title,
  category,
  thumbnailUrl,
}: ContentItemProps) {
  return (
    <LocaleLink
      to={`/content/${id}`}
      className="flex max-lg:flex-col lg:items-center lg:justify-between rounded-md bg-background p-6 md:p-12 items-center justify-between gap-8 lg:gap-12 transition-shadow duration-300 ease-out hover:shadow-hover"
    >
      <ContentTitle
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
        loading="lazy"
      />
    </LocaleLink>
  )
}
