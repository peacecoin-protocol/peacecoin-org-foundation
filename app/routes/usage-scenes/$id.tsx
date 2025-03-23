import * as v from 'valibot'
import type { Route } from './+types/$id'
import { loadMDFile } from '@/.server/markdown'
import { usageSceneSchema } from '@/schemas'

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.lang ?? 'en'
  const content = await loadMDFile(locale, `usage-scenes/${params.id}`).catch(
    () => null,
  )

  if (!content) {
    throw new Response('Not found', { status: 404 })
  }

  const parsed = v.safeParse(usageSceneSchema, content)

  if (!parsed.success) {
    throw new Response('Invalid content', { status: 500 })
  }

  return parsed.output
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.title }]
}

// export const handle = {
//   i18n: ['common'],
// }

export default function UseCase({ loaderData }: Route.ComponentProps) {
  return <main>{JSON.stringify(loaderData)}</main>
}
