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
import { supportedLanguages } from './constants'

const loaderSchema = v.object({
  locale: v.string(),
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
  return v.parse(loaderSchema, {
    locale,
    nonce: context.nonce,
    usecases: generateDynamicRoutes<Usecase>('usecases', routes, locale).sort(
      (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
    ),
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { locale, nonce, usecases } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()
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
              href={lang === 'en' ? '/' : `/${lang}/`}
            />
          )
        })}
        <link rel="alternate" hrefLang="x-default" href="/" />
        <Meta />
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
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
