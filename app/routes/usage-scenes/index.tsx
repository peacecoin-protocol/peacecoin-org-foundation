import { redirect } from 'react-router'
import type { Route } from './+types'

export async function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang ? `/${params.lang}` : ''
  return redirect(`${lang}/usage-scenes/01`)
}
