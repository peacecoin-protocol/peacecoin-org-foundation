import { RemixI18Next } from 'remix-i18next/server'
import Backend, { type HttpBackendOptions } from 'i18next-http-backend'
import i18n from '@/i18n'

export const backend = new Backend()

let baseUrl = 'https://peace-coin.org'

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    async findLocale(request) {
      baseUrl = request.url
      const { pathname } = new URL(request.url)
      const lang = pathname.split('/')[1]
      const index1 = i18n.supportedLngs.indexOf(lang)
      if (index1 !== -1) {
        return lang
      }
      const index2 = i18n.supportedLngs.indexOf(lang.split('-')[0])
      if (index2 !== -1) {
        return i18n.supportedLngs[index2]
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
