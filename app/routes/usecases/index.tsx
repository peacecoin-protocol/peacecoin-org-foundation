import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/index'
import { LocaleMenu } from '@/components/composite/locale-menu'

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'usecases')
  const title = t('title')
  return { title }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'usecases'],
}

export default function UseCases() {
  const { t } = useTranslation('usecases')
  const { t: commonT } = useTranslation('common')

  return (
    <main className="container mx-auto p-4">
      <LocaleMenu />
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="mb-4">{t('description')}</p>

      {/* List of use cases will be displayed here */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {/* Use case cards will be rendered here */}
      </div>
    </main>
  )
}
