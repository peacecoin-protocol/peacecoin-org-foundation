import { useTranslation } from 'react-i18next'
import {
  useCallback,
  useState,
  useEffect,
  useMemo,
  type ComponentProps,
  type ChangeEvent,
  startTransition,
} from 'react'
import { useLocation } from 'react-router'
import {
  LINKS,
  REGX_LANG_FROM_PATHNAME,
  supportedLanguages,
  translatedProgress,
} from '@/constants'
import { cn } from '@/lib/utils'
import { FilterIcon } from 'lucide-react'

import {
  motion,
  AnimatePresence,
  type TransformProperties,
} from 'framer-motion'
import { MenuButton } from './menu-button'
import { OuterLink } from '@/components/ui/outer-link'
import { usePageTransition } from '@/hooks/use-page-transition'

function isDefault(list: string[], locale: string) {
  return list.includes(locale) || list.includes(locale.split('-')[0])
}

export type LocaleMenuProps = Omit<
  ComponentProps<'div'>,
  'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'
> & {
  open?: boolean
  initTransform?: TransformProperties
  onClose?: () => void
}

export function LocaleMenu({
  className,
  open,
  initTransform,
  onClose,
  ...rest
}: LocaleMenuProps) {
  const { i18n, t } = useTranslation('common')
  const location = useLocation()
  const { navigateWithTransition } = usePageTransition()
  const [browserDefaults, setBrowserDefaults] = useState<string[]>([])
  const [filterText, setFilterText] = useState('')

  const locales = useMemo(() => {
    const searchTerm = filterText.toLowerCase()
    return translatedProgress
      .map(({ locale, progress, total }) => ({
        locale,
        progress,
        total,
        isBrowserDefault: isDefault(browserDefaults, locale),
      }))
      .filter(({ locale }) => {
        if (!filterText) return true

        const localeName = (
          supportedLanguages[locale as 'en'] || locale
        ).toLowerCase()
        const localeValue = locale.toLowerCase()

        return (
          localeName.includes(searchTerm) || localeValue.includes(searchTerm)
        )
      })
      .sort((a, b) => {
        if (a.isBrowserDefault && !b.isBrowserDefault) return -1
        if (!a.isBrowserDefault && b.isBrowserDefault) return 1
        return 0
      })
  }, [browserDefaults, filterText])

  const handleLanguageChange = useCallback(
    (locale: string) => {
      // First change the language
      i18n.changeLanguage(locale)

      // Then redirect to the localized path
      const currentPath = location.pathname

      // Extract the current locale prefix if it exists
      const pathWithoutLocale = currentPath.replace(
        REGX_LANG_FROM_PATHNAME,
        '/',
      )

      // Create the new path with the selected locale
      const localePart = locale === 'en' ? '' : `/${locale.toLowerCase()}`
      const newPath = `${localePart}${pathWithoutLocale || '/'}`

      // Navigate to the new path
      onClose?.()
      navigateWithTransition(newPath)
    },
    [i18n, location.pathname, navigateWithTransition, onClose],
  )

  const handleChangeFilterText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        setFilterText(e.target.value)
      })
    },
    [],
  )

  useEffect(() => {
    setBrowserDefaults([...navigator.languages])
  }, [])

  return (
    <AnimatePresence initial>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, ...initTransform }}
          animate={{
            opacity: 1,
            scale: 1,
            translateY: 0,
            transition: { ease: 'easeOut', duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { ease: 'easeIn', duration: 0.1 },
            ...initTransform,
          }}
          className={cn(
            'w-full bg-[#F9F9F9] dark:bg-[#1A1A1A] overflow-hidden flex flex-col origin-bottom-left md:origin-top-right',
            className,
          )}
          key="locale-menu"
          {...rest}
        >
          {onClose && (
            <MenuButton
              className="absolute top-4 right-3 md:hidden"
              open
              onClick={onClose}
            />
          )}
          <div className="pt-3 pb-0 px-6 md:px-3">
            <h3 className="text-sm">
              {t('language.filteredList', { val: locales.length })}
            </h3>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder={t('language.filterPlaceholder')}
                className="w-full text-sm pl-3 py-2 pr-10 bg-background border border-input rounded-sm"
                onChange={handleChangeFilterText}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FilterIcon className="size-4 text-foreground/50" />
              </div>
            </div>
          </div>

          <div className="flex-grow md:h-80 overflow-y-auto hidden-scrollbar">
            {locales?.length ? (
              <ul className="px-5 md:px-3 pt-0 pb-1">
                {locales.map(
                  ({ locale, progress, total, isBrowserDefault }) => (
                    <li
                      key={locale}
                      className="py-2 border-b-2 last:border-b-0"
                    >
                      <button
                        className="w-full p-2 rounded-sm hover:bg-background cursor-pointer text-left"
                        onClick={() => handleLanguageChange(locale)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleLanguageChange(locale)
                          }
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-primary text-lg">
                                {supportedLanguages[locale as 'en'] || locale}
                              </span>
                              {isBrowserDefault && (
                                <span className="border px-2 py-1.5 rounded-sm uppercase text-xs">
                                  {t('language.browserDefault')}
                                </span>
                              )}
                            </div>
                            <div>
                              {t(`language.locales.${locale}`) || locale}
                            </div>
                            <div>
                              {t('language.translated', {
                                val: progress,
                              })}
                              ・{t('language.words', { val: total })}
                            </div>
                          </div>
                          {locale === i18n.language && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-6 h-6 text-primary mr-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-primary">
                {t('language.loading')}
              </div>
            )}
          </div>

          <div className="px-6 md:px-5 py-4 border-t-2 border-primary bg-primary/7 text-foreground text-xs">
            <p>
              {t('language.footer')}
              <OuterLink
                href={LINKS.crowdin}
                className="underline text-primary ml-3 hover:no-underline"
              >
                {t('language.more')}
              </OuterLink>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
