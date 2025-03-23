import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Link } from 'react-router'

const list = ['01', '02', '03']

export function HomeUsageSceneSection() {
  const { t } = useTranslation('home', {
    keyPrefix: 'usage-scene',
  })

  return (
    <section>
      <div className="container">
        <SectionTitle subtitle="Usage scene">{t('title')}</SectionTitle>
        <ul className="flex items-start justify-between gap-10">
          {list.map((key) => (
            <li key={key}>
              <Link
                to={`/usage-cases/${key}`}
                className="flex flex-col items-center gap-6"
              >
                <img
                  src={`/assets/images/usage-scenes/${key}/thumb.png`}
                  width="310"
                  height="310"
                  alt={t(`${key}.title`)}
                  className="size-[20rem]"
                />
                <h2 className="text-center">{t(`${key}.title`)}</h2>
                <p>{t(`${key}.description`)}</p>
                <i className="size-20 rounded-full border border-primary flex items-center justify-center">
                  <svg
                    viewBox="0 0 15 28"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[15px] h-[28px]"
                  >
                    <path
                      d="m.7 28-.7-.7 13.5-13.3-13.5-13.3.7-.7 14.3 14z"
                      className="fill-primary"
                    />
                  </svg>
                </i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
