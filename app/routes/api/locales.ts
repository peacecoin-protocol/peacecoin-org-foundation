import { getTranslatedStatus } from '@/.server/crowdin'
import { data } from 'react-router'
import type { Route } from '../+types/layout'

export async function loader({ context }: Route.LoaderArgs) {
  const output = await getTranslatedStatus(context.cloudflare.env)
  return data(output, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
