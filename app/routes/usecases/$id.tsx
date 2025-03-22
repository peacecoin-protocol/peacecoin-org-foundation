import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/$id'
import { LocaleMenu } from '@/components/composite/locale-menu'
import { useLoaderData, useParams } from 'react-router'

export async function loader({ request, params }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'usecases')
  // In a real implementation, you would fetch the specific use case data
  // based on the ID parameter from Crowdin or a database
  const title = `${t('title')} - ${params.id}`
  return { title, id: params.id }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'usecases'],
}

export default function UseCase() {
  const { t } = useTranslation('usecases')
  const { t: commonT } = useTranslation('common')
  const { id } = useParams()
  const { title } = useLoaderData<typeof loader>()

  return (
    <main className="container mx-auto p-4">
      <LocaleMenu />
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {/* Content will be loaded from Crowdin for this page */}
      <div className="markdown-content">
        {/* Markdown content will be rendered here based on the ID */}
        <p>Use case ID: {id}</p>
      </div>
    </main>
  )
}
