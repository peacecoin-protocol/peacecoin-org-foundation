import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { UsecaseList } from '../usecase/usecase-list'

export function HomeUsecaseSection() {
  const { t } = useTranslation('home', {
    keyPrefix: 'usecase',
  })
  return (
    <section className="bg-primary/7 py-16 md:py-[7.5rem]">
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16 container mx-auto px-6">
        <SectionTitle subtitle="Use Case">{t('title')}</SectionTitle>
        <UsecaseList limit={3} />
        <Button asChild size="lg">
          <Link to="/usecases">{t('more')}</Link>
        </Button>
      </div>
    </section>
  )
}
