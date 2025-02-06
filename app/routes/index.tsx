import { useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types'
import { LocaleMenu } from '@/components/composite/locale-menu'

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request, 'home')
  const title = t('title')
  return { title }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'home'],
}

export default function Index() {
  const { t } = useTranslation('home')
  const { t: commonT } = useTranslation('common')
  return (
    <div>
      <LocaleMenu />
      <h1>{t('title')}</h1>
      <div>{commonT('welcome')}</div>
    </div>
  )
}
