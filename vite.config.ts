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
                return [
                  { title: `${frontmatter.title} | MySite` },
                  {
                    name: 'description',
                    content: frontmatter.description,
                  },
                  {
                    property: 'og:title',
                    content: `${frontmatter.title} | MySite`,
                  },
                ]
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
