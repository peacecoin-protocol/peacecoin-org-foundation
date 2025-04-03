import { RemixI18Next } from 'remix-i18next/server'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18n from '@/i18n'
import { REGX_LANG_FROM_PATHNAME } from './constants'
import type { ResourceKey, ResourceLanguage } from 'i18next'

const resourceMap = Object.entries(
  import.meta.glob('../public/locales/**/*.json', {
    eager: true,
    import: 'default',
  }),
).reduce((resourceMap, [file, data]) => {
  const path = file.replace('../public/locales/', '').replace('.json', '')
  const [language, namespace] = path.split('/')
  if (!resourceMap.has(language)) {
    resourceMap.set(language, {
      [namespace]: data as ResourceKey,
    })
  } else {
    resourceMap.get(language)![namespace] = data as ResourceKey
  }
  return resourceMap
}, new Map<string, ResourceLanguage>())

export const backend = resourcesToBackend(
  Object.fromEntries(resourceMap.entries()),
)

const lowerSupportedLngs = i18n.supportedLngs.map((lng) => lng.toLowerCase())

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    async findLocale(request) {
      const { pathname } = new URL(request.url)
      const langMatch = pathname.match(REGX_LANG_FROM_PATHNAME)

      if (langMatch) {
        const lang = langMatch[1].toLowerCase()

        if (lowerSupportedLngs.includes(lang)) {
          return lang
        }

        const baseLang = lang.split('-')[0]
        if (lowerSupportedLngs.includes(baseLang)) {
          return baseLang
        }
      }

      return 'en'
    },
  },
  i18next: i18n,
  plugins: [backend],
})

export default i18next
