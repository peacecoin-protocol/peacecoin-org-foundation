import i18next from '@/i18next.server'
import type { Route } from './+types/home'
import {
  HomeConceptSection,
  HomeHeroSection,
  HomeMapSection,
  HomeUsageSceneSection,
  HomeUsecaseSection,
} from '@/components/pages/home'
import { usageCountryNames, tokens, tokensJp } from '@/constants'
import { generateDynamicRoutes } from '@/.server/route'
import type { UsageScene } from '@/schemas'
import { generateMeta } from 'scripts/seo'

export async function loader({ request }: Route.LoaderArgs) {
  const [t, locale, { routes }] = await Promise.all([
    i18next.getFixedT(request, 'home'),
    i18next.getLocale(request),
    import('virtual:react-router/server-build'),
  ])
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    tokens: [...(locale.split('-')[0] === 'ja' ? tokensJp : tokens)].sort(
      () => Math.random() - 0.5,
    ),
    usageCountryNames,
    usageScenes: generateDynamicRoutes<UsageScene>(
      'usage-scenes',
      routes,
      locale,
    ).sort((a, b) => a.subtitle.localeCompare(b.subtitle)),
  }
}

export function meta({ data: { title, description } }: Route.MetaArgs) {
  return generateMeta({
    title,
    description,
  })
}

export const handle = {
  i18n: ['common', 'home'],
}

export default function Index({
  loaderData: { tokens, usageCountryNames, usageScenes },
}: Route.ComponentProps) {
  return (
    <main className="grid gap-16 md:gap-[7.5rem]">
      <HomeHeroSection tokens={tokens} />
      <HomeConceptSection />
      <HomeMapSection
        usageCountryNames={usageCountryNames}
        communitiesCount={tokens.length}
      />
      <HomeUsecaseSection />
      <HomeUsageSceneSection items={usageScenes} />
    </main>
  )
}
