import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { SectionTitle } from '@/components/composite/section-title'

export function HomeConceptSection() {
  const { t } = useTranslation('home', {
    keyPrefix: 'concept',
  })

  return (
    <section className="flex flex-col items-center justify-center gap-16 text-center">
      <SectionTitle
        subtitle={
          <>
            What is <span className="text-secondary">PEACE</span> COIN ?
          </>
        }
      >
        {t('title')}
      </SectionTitle>
      <p className="font-medium text-lg leading-[2.6]">{t('description')}</p>
      <Button asChild>
        <Link to="/concept">{t('detail')}</Link>
      </Button>
    </section>
  )
}
