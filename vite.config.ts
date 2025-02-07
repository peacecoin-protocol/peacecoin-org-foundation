import { reactRouter } from '@react-router/dev/vite'
// import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import serverAdapter from 'hono-react-router-adapter/vite'
import adapter from '@hono/vite-dev-server/cloudflare'
import { getLoadContext } from './load-context'

export default defineConfig(({ isSsrBuild, mode }) => ({
  build: {
    target: 'esnext',
    rollupOptions: isSsrBuild
      ? {
          input: './workers/app.ts',
        }
      : undefined,
  },
  ssr: {
    target: 'webworker',
    noExternal: true,
    external: ['node:path', 'node:crypto', 'node:fs'],
    resolve: {
      conditions: ['workerd', 'browser'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/server',
        'react-router',
        'react-i18next',
      ],
    },
  },
  plugins: [
    // cloudflareDevProxy({
    //   getLoadContext,
    // }),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
      }),
    },
    tailwindcss(),
    reactRouter(),
    serverAdapter({
      entry: './server/index.ts',
      adapter() {
        return adapter({ proxy: { environment: mode } })
      },
      getLoadContext,
    }),
    tsconfigPaths(),
  ],
}))
