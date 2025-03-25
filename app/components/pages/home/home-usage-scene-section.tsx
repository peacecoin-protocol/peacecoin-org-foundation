import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Link } from 'react-router'
import { BreakLine } from '@/components/functional/break-line'
import { CircleArrowIcon } from '@/components/ui/icon'

const list = ['01', '02', '03']

export function HomeUsageSceneSection() {
  const { t } = useTranslation('home', {
    keyPrefix: 'usage-scene',
  })

  return (
    <section className="flex flex-col items-center justify-center gap-12 md:gap-16 container mx-auto px-6">
      <SectionTitle subtitle="Usage scene">{t('title')}</SectionTitle>
      <ul className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-8">
        {list.map((key) => (
          <li key={key} className="md:flex-1">
            <Link
              to={`/usage-cases/${key}`}
              className="flex flex-col items-center gap-2 md:gap-6 transition-all hover:shadow-md hover:bg-primary/7 md:p-6 rounded-2xl"
            >
              <img
                src={`/assets/images/usage-scenes/${key}/thumb.png`}
                width="310"
                height="310"
                alt={t(`${key}.title`)}
                className="w-[20rem] max-w-full h-auto"
              />
              <BreakLine
                component="h2"
                className="text-primary font-bold text-center text-2xl"
              >
                {t(`${key}.title`)}
              </BreakLine>
              <p className="text-sm leading-[1.8] my-2">
                {t(`${key}.description`)}
              </p>
              <CircleArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
