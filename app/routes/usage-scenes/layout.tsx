import * as v from 'valibot'
import { Outlet, useMatches } from 'react-router'
import { MDXProvider } from '@mdx-js/react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { usageSceneSchema } from '@/schemas'

import { PageBreadcrumb } from '@/components/composite/page-breadcrumb'
import { SectionTitle } from '@/components/composite/section-title'
import { ArrowIcon } from '@/components/ui/icon'
import { BreakLine } from '@/components/functional/break-line'
import baseComponents from '@/components/pages/common/mdx-components'
import { LocaleLink } from '@/components/ui/locale-link'

const itemSchema = v.omit(usageSceneSchema, ['id'])

const components = {
  ...baseComponents,
}

const paginationClassName = cn(
  'flex items-center gap-4 max-md:flex-1 md:p-6 md:rounded-2xl',
  'transition-all duration-300 ease-out md:hover:shadow-hover md:hover:bg-card',
)

export default function UsageScenesDetailLayout() {
  const { t } = useTranslation('common')
  const match = useMatches().at(-1)
  const parsed = v.safeParse(
    itemSchema,
    typeof match?.handle === 'function' ? match.handle() : match?.handle,
  )

  if (!parsed.success) {
    console.log(parsed.issues)
    throw new Error('Invalid usage scene data')
  }

  const data = parsed.output

  return (
    <main className="pt-(--gh) grid gap-16 md:pt-[calc(var(--gh)+3.5rem)]">
      <PageBreadcrumb
        className="container mx-auto px-6"
        list={[
          { label: t('navigation.home'), href: '/' },
          { label: data.subtitle, href: match!.pathname },
        ]}
      />
      <article className="container mx-auto px-6">
        <div className="flex items-center max-md:flex-col md:justify-between gap-10">
          <SectionTitle className="md:text-left" subtitle={data.subtitle}>
            {data.title}
          </SectionTitle>
          <img
            src={data.coverImageUrl}
            width="310"
            height="310"
            alt={data.title}
            className="w-[65%] md:w-[26rem] h-auto"
          />
        </div>
        <div className="my-10 md:my-16">
          <MDXProvider components={components}>
            <Outlet />
          </MDXProvider>
        </div>
        <footer className="flex items-center justify-between border-t pt-10 md:pt-16 gap-10 text-primary font-semibold leading-snug text-sm md:text-2xl md:-mx-6">
          <LocaleLink to={data.prevPath} className={paginationClassName}>
            <ArrowIcon className="w-4 h-auto rotate-180" />
            <BreakLine
              component="span"
              className="flex-1 md:px-6 max-md:[&>br]:hidden md:text-center"
            >
              {data.prevLabel}
            </BreakLine>
          </LocaleLink>
          <i className="max-md:hidden md:flex-1" />
          <LocaleLink to={data.nextPath} className={paginationClassName}>
            <BreakLine
              component="span"
              className="flex-1 md:px-6 max-md:[&>br]:hidden md:text-center"
            >
              {data.nextLabel}
            </BreakLine>
            <ArrowIcon className="w-4 h-auto" />
          </LocaleLink>
        </footer>
      </article>
    </main>
  )
}
