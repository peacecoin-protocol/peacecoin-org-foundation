import { usePageTransition } from '@/hooks/use-page-transition'
import { useCallback, useMemo, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, type LinkProps } from 'react-router'

export function LocaleLink({ children, to, ...props }: LinkProps) {
  const { i18n } = useTranslation()
  const { navigateWithTransition } = usePageTransition()
  const lang = i18n.language
  const completeTo = useMemo(() => {
    const pathSet = new Set<string>()
    if (lang !== 'en') {
      pathSet.add(lang.toLowerCase())
    }
    if (typeof to === 'string') {
      to.split('/').forEach((path) => {
        if (path) {
          pathSet.add(path)
        }
      })
      return `/${[...pathSet].join('/')}`
    }

    to.pathname?.split('/').forEach((path) => {
      if (path) {
        pathSet.add(path)
      }
    })

    return {
      ...to,
      pathname: `/${[...pathSet].join('/')}${to.pathname}`,
    }
  }, [lang, to])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      navigateWithTransition(completeTo)
    },
    [completeTo, navigateWithTransition],
  )

  return (
    <Link
      {...props}
      to={completeTo}
      prefetch="viewport"
      hrefLang={lang}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
