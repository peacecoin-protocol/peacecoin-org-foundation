import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/composite/section-title'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import type { UsecaseMaster } from '@/schemas'
import { UsecaseList } from '../usecase/usecase-list'

export type HomeUsecaseSectionProps = {
  items: UsecaseMaster[]
}

export function HomeUsecaseSection({ items }: HomeUsecaseSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'usecase',
  })

  return (
    <section className="bg-primary/7 py-16 md:py-[7.5rem]">
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16 container mx-auto px-6">
        <SectionTitle subtitle="Use Case">{t('title')}</SectionTitle>
        <UsecaseList items={items} />
        <Button asChild size="lg">
          <Link to="/usecases">{t('more')}</Link>
        </Button>
      </div>
    </section>
  )
}
