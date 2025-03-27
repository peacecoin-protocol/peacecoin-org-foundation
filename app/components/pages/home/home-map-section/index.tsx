import { useTranslation } from 'react-i18next'
import { UsageCountryMap } from './usage-country-map'

export type HomeMapSectionProps = {
  usageCountryNames: string[]
  communitiesCount: number
}

export function HomeMapSection({
  usageCountryNames,
  communitiesCount,
}: HomeMapSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'map',
  })

  return (
    <section>
      <div className="flex items-center justify-center gap-12 mb-16 container mx-auto px-6">
        <div>
          <h2 className="text-foreground/60 text-sm md:text-lg font-bold mb-2">
            {t('countries.title')}
          </h2>
          <p className="font-bold boder-b border-current flex items-end gap-1 leading-none border-b-2 pb-1">
            <span className="text-5xl md:text-[5.625rem]">
              {usageCountryNames.length}
            </span>
            <span className="text-sm md:text-lg">{t('countries.unit')}</span>
          </p>
        </div>
        <div>
          <h2 className="text-foreground/60 text-sm md:text-lg font-bold mb-2">
            {t('communities.title')}
          </h2>
          <p className="font-bold boder-b border-current flex items-end gap-1 leading-none border-b-2 pb-1">
            <span className="text-5xl md:text-[5.625rem]">
              {communitiesCount}
            </span>
            <span className="text-sm md:text-lg">{t('communities.unit')}</span>
          </p>
        </div>
      </div>
      <UsageCountryMap usageCountryNames={usageCountryNames} />
      <p className="text-right p-5 text-xs text-foreground/50">
        {t('caption')}
      </p>
    </section>
  )
}
