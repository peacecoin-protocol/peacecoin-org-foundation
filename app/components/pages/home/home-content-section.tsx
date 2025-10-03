import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Button } from '@/components/ui/button'
import { ContentList } from '../content/content-list'
import { LocaleLink } from '@/components/ui/locale-link'

export function HomeContentSection() {
  const { t } = useTranslation('home', {
    keyPrefix: 'content',
  })
  return (
    <section className="bg-card py-16 md:py-[7.5rem]">
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16 container mx-auto px-6">
        <SectionTitle subtitle="Content">{t('title')}</SectionTitle>
        <ContentList limit={3} />
        <Button asChild size="lg">
          <LocaleLink to="/content">{t('more')}</LocaleLink>
        </Button>
      </div>
    </section>
  )
}
