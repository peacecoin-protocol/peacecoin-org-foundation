import { reactRouter } from '@react-router/dev/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
      }),
    },
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
})
