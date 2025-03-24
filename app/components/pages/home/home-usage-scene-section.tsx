import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Link } from 'react-router'
import { BreakLine } from '@/components/functional/break-line'

const list = ['01', '02', '03']

function CicleArrowIcon() {
  return (
    <i className="size-16 md:size-20 rounded-full border border-primary flex items-center justify-center">
      <svg
        viewBox="0 0 15 28"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[12px] h-[22.4px] md:w-[15px] md:h-[28px]"
      >
        <path
          d="m.7 28-.7-.7 13.5-13.3-13.5-13.3.7-.7 14.3 14z"
          className="fill-primary"
        />
      </svg>
    </i>
  )
}

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
              <CicleArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
