import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18n'
import { Button } from '../ui/button'

export type LanguageMenuProps = {}

export function LanguageMenu() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-4">
      {i18nConfig.supportedLngs.map((lng) => (
        <div key={lng}>
          <Button onClick={() => i18n.changeLanguage(lng)}>{lng}</Button>
        </div>
      ))}
    </div>
  )
}
