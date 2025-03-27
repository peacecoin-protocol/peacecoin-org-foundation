import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import type { CommunityToken } from '@/schemas'
import { BreakLine } from '@/components/functional/break-line'
import { LocaleLink } from '@/components/ui/locale-link'
import { TokenSlider } from './token-slider'
import { TokenNameDisplay } from './token-name-display'

export type HomeHeroSectionProps = {
  tokens: CommunityToken[]
}

export function HomeHeroSection({ tokens }: HomeHeroSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'hero',
  })
  const sectionRef = useRef<HTMLDivElement>(null)
  const [autoScrolling, setAutoScrolling] = useState(false)
  const [activeToken, setActiveToken] = useState<CommunityToken | null>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setAutoScrolling(entry.isIntersecting)
      },
      {
        rootMargin: '-10% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      },
    )

    observer.observe(root)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="h-dvh flex flex-col">
      <div className="flex-1 container mx-auto flex flex-col justify-center gap-5 md:gap-7 px-6 pt-(--gh) max-md:pb-[30vw]">
        <BreakLine
          component="h1"
          className="text-[2.6rem] md:text-[5rem] font-bold leading-tight"
        >
          {t('title')}
        </BreakLine>
        <TokenNameDisplay name={activeToken?.name ?? ''} />
        <div>
          <Button asChild size="lg">
            <LocaleLink to="/developers">{t('forDeveloper')}</LocaleLink>
          </Button>
        </div>
      </div>
      <TokenSlider
        tokens={tokens}
        onActiveTokenChange={setActiveToken}
        autoScrolling={autoScrolling}
        className="h-[7rem] md:h-[10rem]"
      />
    </section>
  )
}
