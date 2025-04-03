import type { ServerBuild } from 'react-router'

export function generateDynamicRoutes<T>(
  targetRoute: string,
  routes: ServerBuild['routes'],
  locale: string,
) {
  return Object.entries(routes)
    .map(([key, route]) => {
      const handle = key.startsWith(`content/${locale}/${targetRoute}`)
        ? route?.module.handle
        : null
      return typeof handle === 'function'
        ? {
            ...handle(),
            id: route?.id.replace(`content/${locale}/${targetRoute}/`, ''),
          }
        : handle
    })
    .filter((data): data is T => !!data)
}
