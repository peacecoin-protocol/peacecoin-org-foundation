import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { BreakLine } from '@/components/functional/break-line'
import { CircleArrowIcon } from '@/components/ui/icon'
import type { ComponentProps } from 'react'
import type { UsageScene } from '@/schemas'
import { cn } from '@/lib/utils'
import { LocaleLink } from '@/components/ui/locale-link'

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
            <LocaleLink
              to={`/usage-scenes/${item.id}`}
              className="flex flex-col items-center gap-2 md:gap-6 transition-all duration-300 ease-out hover:shadow-hover hover:bg-card md:p-6 rounded-2xl"
            >
              <img
                src={item.coverImageUrl}
                width="310"
                height="310"
                alt={item.title}
                className="w-[20rem] max-w-full h-auto"
                loading="lazy"
              />
              <BreakLine
                component="h2"
                className="text-primary font-bold text-center text-2xl"
              >
                {item.title}
              </BreakLine>
              <p className="text-sm leading-[1.8] my-2">{item.description}</p>
              <CircleArrowIcon />
            </LocaleLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
