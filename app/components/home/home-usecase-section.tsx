import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../composite/section-title'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import type { Usecase } from '@/schemas'
import { UsecaseList } from '../usecase/usecase-list'

export type HomeUsecaseSectionProps = {
  items: Usecase[]
}

export function HomeUsecaseSection({ items }: HomeUsecaseSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'usecase',
  })

  return (
    <section className="bg-primary/7 py-[7.5rem]">
      <div className="flex flex-col items-center gap-16 container">
        <SectionTitle subtitle="Use Case">{t('title')}</SectionTitle>
        <UsecaseList items={items} />
        <Button asChild>
          <Link to="/usecases">{t('more')}</Link>
        </Button>
      </div>
    </section>
  )
}
