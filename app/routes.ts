import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/index.tsx'),
  ...prefix('api', [
    index('routes/api/index.ts'),
    route('translated', 'routes/api/translated.ts'),
  ]),
] satisfies RouteConfig
