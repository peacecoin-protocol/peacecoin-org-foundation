import { Trans, useTranslation } from 'react-i18next'
import i18next from '@/i18next.server'
import type { Route } from './+types/concept'
import { SectionTitle } from '@/components/composite/section-title'
import { PageBreadcrumb } from '@/components/composite/page-breadcrumb'
import { BreakLine } from '@/components/functional/break-line'
import type { ComponentProps, PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { generateMeta } from 'scripts/seo'

function SubTitle({ children }: { children: string }) {
  return (
    <BreakLine
      component="h2"
      className="text-[1.375rem] md:text-4xl leading-relaxed font-medium text-center text-primary max-md:[&>br]:hidden"
    >
      {children}
    </BreakLine>
  )
}

function Description({
  children,
  className,
  ...rest
}: PropsWithChildren<ComponentProps<'p'>>) {
  return (
    <p
      className={cn(
        'text-sm leading-[2.6] md:text-lg md:text-center',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}

export async function loader({ request }: Route.LoaderArgs) {
  const [t] = await Promise.all([i18next.getFixedT(request, 'concept')])
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export function meta({ data: { title, description } }: Route.MetaArgs) {
  return generateMeta({
    title,
    description,
  })
}

export const handle = {
  i18n: ['common', 'concept'],
}

export default function Concept() {
  const { t } = useTranslation('concept')
  const { t: commonT } = useTranslation('common')
  return (
    <main className="pt-(--gh) grid gap-16 md:gap-[7.5rem] md:pt-[calc(var(--gh)+3.5rem)]">
      <PageBreadcrumb
        className="container mx-auto px-6"
        list={[
          { label: commonT('navigation.home'), href: '/' },
          { label: commonT('navigation.concept'), href: '/concept' },
        ]}
      />
      <section className="container mx-auto px-6 grid gap-10 md:gap-16">
        <SectionTitle subtitle="Concept">{t('title')}</SectionTitle>
        <Description>
          <BreakLine>{t('description1')}</BreakLine>
        </Description>
        <SubTitle>{t('subtitle1')}</SubTitle>
        <Description>
          <BreakLine>{t('description2')}</BreakLine>
        </Description>
        <Description>
          <BreakLine>{t('description3')}</BreakLine>
        </Description>
        <Description>
          <BreakLine>{t('description4')}</BreakLine>
        </Description>
        <div className="bg-primary/7 rounded-md px-6 py-8 md:p-16">
          <h2 className="text-lg md:text-5xl font-medium text-center mb-2 md:mb-16 [&>span]:text-primary">
            <Trans i18nKey="arigatoCreation.title" ns="concept" />
          </h2>
          <div className="flex flex-col gap-10 lg:relative lg:min-h-[32rem] lg:justify-center lg:pr-[32rem]">
            <BreakLine
              component="h3"
              className="text-2xl font-bold leading-relaxed text-center max-sm:[&>br]:hidden lg:text-2xl lg:leading-loose lg:text-left"
            >
              {t('arigatoCreation.subtitle')}
            </BreakLine>
            <img
              src="/assets/images/concept/what-is-arigato-creation.webp"
              width="836"
              height="940"
              alt="ARIGATO CREATION"
              className="block w-full h-auto lg:absolute lg:top-0 lg:right-0 lg:w-1/2 xl:w-auto xl:h-full"
              loading="lazy"
            />
            <p className="text-sm leading-[2.6]">
              {t('arigatoCreation.description1')}
            </p>
            <p className="text-sm leading-[2.6]">
              {t('arigatoCreation.description2')}
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Vision and Goals">
            {t('vision.title')}
          </SectionTitle>
        </div>
        <img
          src="/assets/images/concept/concept.gif"
          width="2400"
          height="588"
          alt={t('vision.altText')}
          className="w-full h-auto block my-16 max-md:hidden"
          loading="lazy"
        />
        <video
          className="w-full h-auto block aspect-square my-6 md:hidden"
          loop
          muted
          playsInline
          autoPlay
          width="580"
          height="580"
        >
          <source
            src="/assets/images/concept/concept_mobile.mp4"
            type="video/mp4"
          />
        </video>
        <div className="container mx-auto px-6 grid gap-10 md:gap-16">
          <Description>
            <BreakLine>{t('vision.description1')}</BreakLine>
          </Description>
          <Description>
            <BreakLine>{t('vision.description2')}</BreakLine>
          </Description>
          <SubTitle>{t('vision.subtitle1')}</SubTitle>
          <Description>
            <BreakLine>{t('vision.description3')}</BreakLine>
          </Description>
          <SubTitle>{t('vision.subtitle2')}</SubTitle>
          <Description>
            <BreakLine>{t('vision.description4')}</BreakLine>
          </Description>
        </div>
      </section>
    </main>
  )
}
