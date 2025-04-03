import type { Config } from '@react-router/dev/config'
import { writeFile } from 'fs/promises'

const BASE_URL = process.env.VITE_BASE_URL

const REGX_LANG_FROM_PATHNAME = /^\/([a-z]{2}(?:-[a-z]{2})?)(?:\/|$)/i

export default {
  ssr: true,
  prerender: false,
  future: {
    unstable_viteEnvironmentApi: true,
  },
  async buildEnd({ buildManifest }) {
    const routes = buildManifest?.routes

    if (!routes || !BASE_URL) {
      console.warn('No routes found in build manifest')
      return
    }

    const urlSet = new Set<string>()
    const localeSet = new Set<string>([''])
    const dynamicRouteSet = new Set<string>()

    function addUrl(url: URL, locale?: string) {
      const changefreq = locale ? 'monthly' : 'weekly'
      const priority = locale ? `0.5` : `1.0`
      urlSet.add(
        `<url><loc>${url}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
      )
    }

    Object.values(routes).forEach((entry) => {
      if (!entry.path && !entry.index) {
        return
      }
      const pathname = entry.path ?? ''
      const locale = pathname.match(REGX_LANG_FROM_PATHNAME)?.[1]
      const url = new URL(pathname, BASE_URL)

      if (locale) {
        localeSet.add(locale)
      }

      if (pathname.includes(':lang?')) {
        dynamicRouteSet.add(pathname)
      } else {
        addUrl(url, locale)
      }
    })
    ;[...dynamicRouteSet].forEach((pathname) => {
      localeSet.forEach((locale) => {
        const url = new URL(pathname.replace(':lang?', locale), BASE_URL)
        addUrl(url, locale)
      })
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">${[...urlSet].join('')}</urlset>`
    const sitemapName = 'sitemap.xml'
    const buildDir = 'build/client'
    const sitemapPath = `${buildDir}/${sitemapName}`
    await writeFile(sitemapPath, sitemap, 'utf-8')
    console.log(`Sitemap generated Successfully at ${sitemapPath}`)

    const robotsTxt = `User-agent: *
Allow: /

Host: ${BASE_URL}

Sitemap: ${BASE_URL}/${sitemapName}
`
    const robotsTxtPath = `${buildDir}/robots.txt`
    await writeFile(robotsTxtPath, robotsTxt, 'utf-8')

    console.log(`Robots.txt generated Successfully at ${robotsTxtPath}`)
    console.log('Build end')
  },
} satisfies Config
