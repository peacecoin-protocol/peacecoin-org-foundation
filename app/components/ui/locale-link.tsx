import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, type LinkProps } from 'react-router'

export function LocaleLink({ children, to, ...props }: LinkProps) {
  const { i18n } = useTranslation()
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

  return (
    <Link {...props} to={completeTo} hrefLang={lang}>
      {children}
    </Link>
  )
}
