import { reactRouter } from '@react-router/dev/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkBreaks from 'remark-breaks'
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReactRouerFrontmatter from './scripts/remark-react-router-frontmatter'
import { getTranslatedProgress } from './scripts/crowdin'
import { generateMeta } from './scripts/seo'

function toOneLine(str: string) {
  return str
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
}

export default defineConfig({
  plugins: [
    {
      name: 'run-getTranslatedProgress',
      buildStart: async () => {
        await getTranslatedProgress()
      },
    },
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          [remarkFrontmatter],
          [
            remarkReactRouerFrontmatter,
            {
              meta(frontmatter: Record<string, string>) {
                return generateMeta({
                  title: toOneLine(frontmatter.title),
                  description: toOneLine(frontmatter.description),
                  type: 'article',
                })
              },
              handle(frontmatter: Record<string, string>) {
                return frontmatter
              },
            },
          ],
          [remarkBreaks],
        ],
      }),
    },
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
})
