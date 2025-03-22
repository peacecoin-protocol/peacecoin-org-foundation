import type { InitOptions } from 'i18next'
import { supportedLanguages } from './constants'

export default {
  supportedLngs: Object.keys(supportedLanguages),
  fallbackLng: 'en',
  defaultNS: 'common',
} satisfies InitOptions
