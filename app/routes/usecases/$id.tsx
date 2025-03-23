import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/$id'

export async function loader({ request, params }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'usecases')
  const title = `${t('metaTitle')} - ${params.id}`
  return { title, id: params.id }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'usecases'],
}

export default function UseCase({ params: { id } }: Route.ComponentProps) {
  const { t } = useTranslation('usecases')

  return <main />
}
