import type { AppLoadContext, EntryContext } from 'react-router'
import { ServerRouter } from 'react-router'
import { isbot } from 'isbot'
import { renderToReadableStream } from 'react-dom/server'
import type { HttpBackendOptions } from 'i18next-http-backend'
import { createInstance } from 'i18next'
import i18next, { backend } from './i18next.server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from './i18n'

const ABORT_DELAY = 5000

const contentSecurityPolicy = (nonce?: string) => ({
  'default-src': ["'self'"],
  'base-uri': ["'self'"],
  'child-src': ["'self'"],
  'connect-src': [
    "'self'",
    'https://sentry.io', // Sentry
    'https://www.google-analytics.com', // Google Analytics
  ],
  'font-src': [
    "'self'",
    'https://fonts.googleapis.com', // Google Fonts のスタイルシート
    'https://fonts.gstatic.com', // Google Fonts のフォントファイル
  ],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'img-src': [
    "'self'",
    'data:', // 必要なら Base64 埋め込み画像を許可
    'https://www.google-analytics.com', // Google Analytics
  ],
  'object-src': ["'none'"],
  'script-src': [
    "'self'",
    nonce ? `'nonce-${nonce}'` : "'unsafe-inline'",
    'https://www.googletagmanager.com', // Google Analytics 用スクリプト
    'https://www.youtube.com', // YouTube 埋め込み用スクリプト
  ],
  'frame-src': [
    "'self'",
    'https://www.youtube.com', // YouTube 埋め込み用フレーム
  ],
  'style-src': [
    "'self'",
    nonce ? `'nonce-${nonce}'` : "'unsafe-inline'",
    'https://fonts.googleapis.com', // Google Fonts のスタイルシート
  ],
  'style-src-elem': [
    "'self'",
    // FIXME: react(react-router?)内でstyleタグを追加する部分でnonceを指定してくれないため、一旦unsafe-inlineを許可
    // nonce ? `'nonce-${nonce}'` : "'unsafe-inline'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com', // Google Fonts のスタイルシート
  ],
  'upgrade-insecure-requests': [], // HTTPS を強制
})

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext,
) {
  let shellRendered = false
  const userAgent = request.headers.get('user-agent')
  const instance = createInstance()
  const lng = await i18next.getLocale(request)
  const ns = i18next.getRouteNamespaces(routerContext)

  await instance
    .use(initReactI18next)
    .use(backend)
    .init<HttpBackendOptions>({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        request(_config, path, _payload, callback) {
          if (path.includes('translation.json')) {
            return callback(null, {
              status: 200,
              data: {},
            })
          }
          const url = new URL(path, request.url)
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
      },
    })
  const nonce = loadContext.nonce
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY)
  const body = await renderToReadableStream(
    <I18nextProvider i18n={instance}>
      <ServerRouter context={routerContext} nonce={nonce} url={request.url} />
    </I18nextProvider>,
    {
      signal: controller.signal,
      onError(error: unknown) {
        responseStatusCode = 500
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error)
        }
      },
    },
  )
  shellRendered = true

  body.allReady.then(() => clearTimeout(timeoutId))

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  responseHeaders.set(
    'Content-Security-Policy',
    Object.entries(contentSecurityPolicy(nonce))
      .map(([key, value]) => `${key} ${value.join(' ')}`)
      .join('; '),
  )
  responseHeaders.set('Content-Language', lng)
  responseHeaders.delete('X-Powered-By')

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
