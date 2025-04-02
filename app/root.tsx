import * as v from 'valibot'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'
import { useChangeLanguage } from 'remix-i18next/react'
import { useTranslation } from 'react-i18next'

import i18next from '@/i18next.server'

import type { Route } from './+types/root'

import './app.css'
import { usecaseSchema, type Usecase } from './schemas'
import { UseCasesProvider } from './hooks/use-usecases'
import { generateDynamicRoutes } from './.server/route'
import { BASE_URL, LINKS, supportedLanguages } from './constants'
import { PageTransitionProvider } from './hooks/use-page-transition'
import { KVVideo } from './components/pages/common/kv-video'
import { GlobalHeader } from './components/pages/common/global-header'
import { GlobalFooter } from './components/pages/common/global-footer'

const loaderSchema = v.object({
  url: v.string(),
  nonce: v.optional(v.string()),
  usecases: v.array(usecaseSchema),
})

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export async function loader({ request, context }: Route.LoaderArgs) {
  const [locale, { routes }] = await Promise.all([
    i18next.getLocale(request),
    import('virtual:react-router/server-build'),
  ])
  const url = new URL(request.url)
  return v.parse(loaderSchema, {
    url: `${url.origin}${url.pathname}`,
    nonce: context.nonce,
    usecases: generateDynamicRoutes<Usecase>('usecases', routes, locale).sort(
      (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
    ),
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { nonce, usecases = [], url } = useLoaderData<typeof loader>() || {}
  const { i18n, t } = useTranslation()
  const siteName = t('siteName')
  const locale = i18n.language
  const xAccount = new URL(LINKS.x).pathname.replace(/^\//g, '')

  useChangeLanguage(locale)

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/assets/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicon/favicon.svg"
        />
        <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="PEACE COIN" />
        <link rel="manifest" href="/assets/favicon/webmanifest.json" />
        {nonce && <meta property="csp-nonce" nonce={nonce} />}
        <script src="https://www.youtube.com/iframe_api" async />
        {Object.keys(supportedLanguages).map((key) => {
          const lang = key.toLowerCase()
          return (
            <link
              key={lang}
              rel="alternate"
              hrefLang={lang}
              href={lang === 'en' ? BASE_URL : `${BASE_URL}/${lang}/`}
            />
          )
        })}
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <Meta />
        {url && (
          <>
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />
            <meta
              property="og:image"
              content={`${BASE_URL}/assets/images/og.png`}
            />
            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:image"
              content={`${BASE_URL}/assets/images/og.png`}
            />
            <meta property="twitter:site" content={`@${xAccount}`} />
            <meta property="twitter:url" content={url} />
          </>
        )}
        <Links />
      </head>
      <body>
        <UseCasesProvider value={usecases}>{children}</UseCasesProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <PageTransitionProvider>
      {({ state }) => (
        <>
          <KVVideo pathname="/error" />
          <GlobalHeader state={state} />
          <div className="relative flex flex-col min-h-screen gap-16 md:gap-[7.5rem] pt-(--gh)  md:pt-[calc(var(--gh)+3.5rem)]">
            <div className="flex-grow container mx-auto px-8 py-8 bg-card rounded-2xl">
              <h1 className="text-4xl font-bold text-red-400 mb-4">
                {message}
              </h1>
              <p>{details}</p>
              {stack && (
                <pre className="mt-6 w-full overflow-x-auto hidden-scrollbar text-red-500">
                  <code>{stack}</code>
                </pre>
              )}
            </div>
            <GlobalFooter />
          </div>
        </>
      )}
    </PageTransitionProvider>
  )
}
