import { Hono } from 'hono'
import webhookRoute from './webhook'
import localesRoute from './locales'

export default new Hono()
  .route('/webhook', webhookRoute)
  .route('/locales', localesRoute)
