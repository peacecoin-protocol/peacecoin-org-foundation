import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Link } from 'react-router'
import { BreakLine } from '@/components/functional/break-line'
import { CircleArrowIcon } from '@/components/ui/icon'
import type { ComponentProps } from 'react'
import type { UsageScene } from '@/schemas'
import { cn } from '@/lib/utils'

export type HomeUsageSceneSectionProps = ComponentProps<'section'> & {
  items: UsageScene[]
}

export function HomeUsageSceneSection({
  items,
  className,
  ...rest
}: HomeUsageSceneSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'usage-scene',
  })

  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center gap-12 md:gap-16 container mx-auto px-6',
        className,
      )}
      {...rest}
    >
      <SectionTitle subtitle="Usage scene">{t('title')}</SectionTitle>
      <ul className="flex max-md:flex-col md:items-start md:justify-between gap-10 md:gap-8">
        {items.map((item) => (
          <li key={item.id} className="md:flex-1">
            <Link
              to={`/usage-scenes/${item.id}`}
              className="flex flex-col items-center gap-2 md:gap-6 transition-all hover:shadow-md hover:bg-primary/7 md:p-6 rounded-2xl"
            >
              <img
                src={item.coverImageUrl}
                width="310"
                height="310"
                alt={item.title}
                className="w-[20rem] max-w-full h-auto"
              />
              <BreakLine
                component="h2"
                className="text-primary font-bold text-center text-2xl"
              >
                {item.title}
              </BreakLine>
              <p className="text-sm leading-[1.8] my-2">{item.description}</p>
              <CircleArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
