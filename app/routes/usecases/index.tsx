import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/index'

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'usecases')
  const title = t('metaTitle')
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
  return <main></main>
}
