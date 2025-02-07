import handle from 'hono-react-router-adapter/cloudflare-workers'
import { getLoadContext } from 'load-context'
import server from 'server'

export default handle(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import('virtual:react-router/server-build'),
  server,
  { getLoadContext },
)
