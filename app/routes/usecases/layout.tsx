import * as v from 'valibot'
import { useTranslation } from 'react-i18next'
import { Outlet, useMatches } from 'react-router'
import { usecaseSchema } from '@/schemas'
import { PageBreadcrumb } from '@/components/composite/page-breadcrumb'
import { MDXProvider } from '@mdx-js/react'
import baseComponents from '@/components/pages/common/mdx-components'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { UsecaseTitle } from '@/components/pages/usecase/usecase-title'

const itemSchema = v.omit(usecaseSchema, ['id'])

const components = {
  ...baseComponents,
  img({ src, alt, ...props }: ComponentProps<'img'>) {
    return (
      <img
        src={src}
        alt={alt}
        width="480"
        height="360"
        className="block object-cover bg-foreground/5 max-md:aspect-square w-full h-auto"
        {...props}
      />
    )
  },
  em({ children, ...props }: ComponentProps<'em'>) {
    return (
      <em className="not-italic" {...props}>
        {children}
      </em>
    )
  },
}

export default function UseCasesDetailLayout() {
  const { t: commonT } = useTranslation('common')
  const match = useMatches().at(-1)
  const parsed = v.safeParse(
    itemSchema,
    typeof match?.handle === 'function' ? match.handle() : match?.handle,
  )

  if (!parsed.success) {
    console.log(parsed.issues)
    throw new Error('Invalid usecase data')
  }

  const data = parsed.output

  return (
    <main className="pt-(--gh) grid gap-16 md:pt-[calc(var(--gh)+3.5rem)]">
      <PageBreadcrumb
        className="container mx-auto px-6"
        list={[
          { label: commonT('navigation.home'), href: '/' },
          { label: commonT('navigation.useCase'), href: '/usecases' },
          { label: data.tokenName, href: match!.pathname },
        ]}
      />
      <article className="container mx-auto px-6">
        <div className="flex max-md:flex-col items-center gap-10 md:justify-between">
          <UsecaseTitle
            tokenName={data.tokenName}
            communityName={data.communityName}
            title={data.title}
            category={data.category}
          />
          <img
            src={data.thumbnailUrl}
            width="480"
            height="360"
            alt={data.title}
            className="object-cover bg-foreground/5 max-md:rounded-tl-full max-md:rounded-bl-full -mr-12 w-full h-auto md:w-[50%] md:mr-0"
          />
        </div>
        <div
          className={cn(
            'my-10 md:my-16',
            // 画像キャプション
            '[&_img~br]:hidden [&_img~em]:block [&_img~em]:mt-2 [&_img~em]:text-right [&_img~em]:text-xs [&_img~em]:text-foreground/50',
          )}
        >
          <MDXProvider components={components}>
            <Outlet />
          </MDXProvider>
        </div>
      </article>
    </main>
  )
}
