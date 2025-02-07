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
import { apiClient } from '@/lib/api-client'

export function LocaleMenu() {
  const { i18n } = useTranslation()
  const langCode = i18n.language.split('-')[0].toUpperCase()
  const [translatedStatusItems, setTranslatedStatusItems] =
    useState<GetTranslatedStatusOutput>([])

  const handleLoad = useCallback(async (open: boolean) => {
    if (!open) {
      return
    }
    const response = await apiClient.v1.locales.status.$get()
    if (!response.ok) {
      return
    }
    setTranslatedStatusItems(await response.json())
  }, [])

  return (
    <DropdownMenu
      onOpenChange={translatedStatusItems.length ? undefined : handleLoad}
    >
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
