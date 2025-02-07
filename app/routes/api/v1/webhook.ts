import { Hono } from 'hono'
import * as v from 'valibot'
import { fileApprovedWebhookSchema } from 'schemas/crowdin'

export default new Hono<{ Bindings: Env }>().post('/crowdin', async (c) => {
  if (c.req.header('x-api-key') !== c.env.CROWDIN_WEBHOOK_API_KEY) {
    return c.json({ error: 'Invalid API Key' }, { status: 401 })
  }

  const parsed = v.safeParse(fileApprovedWebhookSchema, await c.req.json())

  if (!parsed.success) {
    console.log(parsed.issues)
    return c.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // TODO: Update record

  return c.body(null, 204)
})
