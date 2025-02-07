import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
import v1Route from './v1'

const app = new Hono()
  .use(
    secureHeaders({
      strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
      xContentTypeOptions: 'nosniff',
      xPermittedCrossDomainPolicies: 'none',
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginEmbedderPolicy: 'require-corp',
    }),
  )
  .get('/', (c) => c.json({ success: true }))
  .route('/v1', v1Route)

export type ApiApp = typeof app

export default app
