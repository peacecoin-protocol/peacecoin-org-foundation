import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { type GetTranslatedStatusOutput } from 'schemas/crowdin'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export function LocaleMenu() {
  const { i18n } = useTranslation()
  const langCode = i18n.language.split('-')[0].toUpperCase()
  const [translatedStatusItems, setTranslatedStatusItems] =
    useState<GetTranslatedStatusOutput>([])

  const handleLoad = useCallback(async () => {
    if (translatedStatusItems.length) {
      return
    }
    const response = await fetch('/api/translated')
    if (!response.ok) {
      return
    }
    const data = await response.json()
    setTranslatedStatusItems(data as GetTranslatedStatusOutput)
  }, [translatedStatusItems])

  return (
    <DropdownMenu onOpenChange={handleLoad}>
      <DropdownMenuTrigger asChild>
        <Button>{langCode}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {translatedStatusItems.length ? (
          translatedStatusItems.map(({ locale, approvalProgress, words }) => (
            <DropdownMenuItem
              key={locale}
              onClick={() => i18n.changeLanguage(locale)}
            >
              {locale}
              <br />
              {approvalProgress}% 翻訳済み・{words.toLocaleString()} 単語
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>
            <DropdownMenuLabel>読み込み中...</DropdownMenuLabel>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
