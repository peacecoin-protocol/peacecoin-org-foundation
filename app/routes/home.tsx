import i18next from '@/i18next.server'
import type { Route } from './+types/home'
import {
  HomeConceptSection,
  HomeHeroSection,
  HomeMapSection,
  HomeUsageSceneSection,
  HomeUsecaseSection,
} from '@/components/pages/home'
import { usageCountryCodes, tokens, tokensJp } from '@/constants'

export async function loader({ request }: Route.LoaderArgs) {
  const [t, locale] = await Promise.all([
    i18next.getFixedT(request, 'home'),
    i18next.getLocale(request),
  ])
  const title = t('metaTitle')
  return {
    title,
    tokens: [...(locale === 'ja' ? tokensJp : tokens)].sort(
      () => Math.random() - 0.5,
    ),
    usageCountryCodes,
  }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

export const handle = {
  i18n: ['common', 'home'],
}

export default function Index({
  loaderData: { tokens, usageCountryCodes },
}: Route.ComponentProps) {
  return (
    <main>
      <HomeHeroSection tokens={tokens} />
      <HomeConceptSection />
      <HomeMapSection
        usageCountryCodes={usageCountryCodes}
        communitiesCount={tokens.length}
      />
      <HomeUsecaseSection items={[]} />
      <HomeUsageSceneSection />
    </main>
  )
}
