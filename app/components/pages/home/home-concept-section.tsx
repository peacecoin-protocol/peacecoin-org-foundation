import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/composite/section-title'
import { BreakLine } from '@/components/functional/break-line'
import { LocaleLink } from '@/components/ui/locale-link'

export function HomeConceptSection() {
  const { t } = useTranslation('home', {
    keyPrefix: 'concept',
  })

  return (
    <section className="flex flex-col items-center justify-center gap-12 md:gap-16 container mx-auto px-6">
      <SectionTitle
        subtitle={
          <>
            What is <span className="text-secondary">PEACE</span> COIN ?
          </>
        }
      >
        {t('title')}
      </SectionTitle>
      <BreakLine
        component="p"
        className="-mt-4 font-medium text-sm md:text-lg leading-[1.8] md:leading-[2.6] md:text-center"
      >
        {t('description')}
      </BreakLine>
      <Button asChild size="lg">
        <LocaleLink to="/concept">{t('detail')}</LocaleLink>
      </Button>
    </section>
  )
}
