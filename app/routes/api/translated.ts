import { data } from 'react-router'

import type { Route } from '../+types'
import { getTranslatedStatus } from '@/.server/crowdin'

export async function loader({ context }: Route.LoaderArgs) {
  const output = await getTranslatedStatus(context.cloudflare.env)
  return data(output, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
