import {
  type RouteConfig,
  layout,
  index,
  prefix,
  route,
} from '@react-router/dev/routes'

const REGX_CONTENT = /^\.\/content\/([^/]+)\/(.+)$/
const langSet = new Set<string>()
const contentRoutes = Object.keys(
  import.meta.glob('./content/**/*.{md,mdx}', {
    query: '?url',
    eager: true,
  }),
).map((file) =>
  route(
    file.replace(REGX_CONTENT, (...args) => {
      const [, lang, filePath] = args as string[]
      const path = filePath.replace(/\.(md|mdx)$/, '')
      const lowerLang = lang.toLowerCase()
      langSet.add(lowerLang)
      return lowerLang === 'en' ? `/${path}` : `/${lowerLang}/${path}`
    }),
    file,
  ),
)

const staticRoutes = [
  index('routes/home.tsx'),
  route('developers', 'routes/developers.tsx'),
  route('concept', 'routes/concept.tsx'),
  route('usecases', 'routes/usecases/index.tsx'),
  // route('about', 'routes/about.tsx'),
  // route('privacy-policy', 'routes/privacy-policy.tsx'),
  // route('terms-of-use', 'routes/terms-of-use.tsx'),
  // route('cookie-policy', 'routes/cookie-policy.tsx'),
] satisfies RouteConfig

export default [
  layout('routes/layout.tsx', [
    ...[...langSet].flatMap((lang) =>
      lang === 'en'
        ? staticRoutes
        : prefix(
            `/${lang}`,
            staticRoutes.map((route) => ({
              ...route,
              id: `${route.id ?? route.file}:${lang}`,
              children: [],
            })),
          ),
    ),
    ...prefix(':lang?', [
      route('usage-scenes', 'routes/usage-scenes/index.tsx'),
    ]),
    layout(
      'routes/usecases/layout.tsx',
      contentRoutes.filter((route) => route.path?.includes('/usecases/')),
    ),
    layout(
      'routes/usage-scenes/layout.tsx',
      contentRoutes.filter((route) => route.path?.includes('/usage-scenes/')),
    ),
  ]),
] satisfies RouteConfig
