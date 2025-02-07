import { Hono } from 'hono'
import { getTranslatedStatus } from '@/.server/crowdin'

export default new Hono<{ Bindings: Env }>().get('/status', async (c) => {
  const output = await getTranslatedStatus(c.env)
  return c.json(output, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
})
