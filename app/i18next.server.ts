import { RemixI18Next } from 'remix-i18next/server'
import Backend, { type HttpBackendOptions } from 'i18next-http-backend'
import i18n from '@/i18n'
import { REGX_LANG_FROM_PATHNAME } from './constants'

export const backend = new Backend()

let baseUrl = 'https://peace-coin.org'

const lowerSupportedLngs = i18n.supportedLngs.map((lng) => lng.toLowerCase())

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    async findLocale(request) {
      baseUrl = request.url
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
  i18next: {
    ...i18n,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      request(_config, path, _payload, callback) {
        if (path.includes('translation.json')) {
          return callback(null, {
            status: 200,
            data: {},
          })
        }
        const url = new URL(path, baseUrl)
        fetch(url)
          .then(async (res) => {
            callback(null, {
              status: res.status,
              data: (await res.json()) as Record<string, string>,
            })
          })
          .catch((error) => {
            callback(error, null)
          })
      },
    } satisfies HttpBackendOptions,
  },
  plugins: [backend],
})

export default i18next
