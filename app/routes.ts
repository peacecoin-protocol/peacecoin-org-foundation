import {
  type RouteConfig,
  layout,
  index,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  layout(
    'routes/layout.tsx',
    prefix(':lang?', [
      index('routes/home.tsx'),
      route('developers', 'routes/developers.tsx'),
      route('concept', 'routes/concept.tsx'),
      ...prefix('usage-scenes', [
        index('routes/usage-scenes/index.tsx'),
        route(':id', 'routes/usage-scenes/$id.tsx'),
      ]),
      ...prefix('usecases', [
        index('routes/usecases/index.tsx'),
        route(':id', 'routes/usecases/$id.tsx'),
      ]),
      // route('about', 'routes/about.tsx'),
      // route('privacy-policy', 'routes/privacy-policy.tsx'),
      // route('terms-of-use', 'routes/terms-of-use.tsx'),
      // route('cookie-policy', 'routes/cookie-policy.tsx'),
    ]),
  ),
  ...prefix('api', [route('locales', 'routes/api/locales.ts')]),
] satisfies RouteConfig
