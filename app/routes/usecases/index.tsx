import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/index'
import { SectionTitle } from '@/components/composite/section-title'
import { UsecaseList } from '@/components/pages/usecase/usecase-list'
import { PageBreadcrumb } from '@/components/composite/page-breadcrumb'
import { generateMeta } from 'scripts/seo'

export async function loader({ request }: Route.LoaderArgs) {
  const [t] = await Promise.all([i18next.getFixedT(request, 'usecases')])
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export function meta({ data: { title, description } }: Route.MetaArgs) {
  return generateMeta({
    title,
    description,
  })
}

export const handle = {
  i18n: ['common', 'usecases'],
}

export default function UseCases() {
  const { t } = useTranslation('usecases')
  const { t: commonT } = useTranslation('common')
  return (
    <main className="pt-(--gh) grid gap-16 md:gap-[7.5rem] md:pt-[calc(var(--gh)+3.5rem)]">
      <PageBreadcrumb
        className="container mx-auto px-6"
        list={[
          { label: commonT('navigation.home'), href: '/' },
          { label: commonT('navigation.useCase'), href: '/usecases' },
        ]}
      />
      <section className="container mx-auto grid gap-10 md:gap-16">
        <SectionTitle subtitle="Use Case">{t('title')}</SectionTitle>
        <UsecaseList />
      </section>
    </main>
  )
}
