import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import type { CommunityToken } from '@/schemas'
import { BreakLine } from '@/components/functional/break-line'

export type HomeHeroSectionProps = {
  tokens: CommunityToken[]
}

export function HomeHeroSection({ tokens }: HomeHeroSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'hero',
  })
  const [activeToken, setActiveToken] = useState<CommunityToken>(tokens[0])
  const [autoScrolling, setAutoScrolling] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current

    if (!root) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      setAutoScrolling(entry.isIntersecting)
    })

    observer.observe(root)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // TODO: 自動スクロール
    // TODO: 自動スクロールの位置に応じてactiveTokenを更新
  }, [autoScrolling])

  return (
    <section ref={ref}>
      <div className="container mx-auto flex flex-col justify-center gap-5 md:gap-7 px-6 h-[calc(100dvh-4.35rem)] md:h-[calc(100dvh-11.5rem)] pt-(--gh) max-md:pb-[50vw]">
        <BreakLine
          component="h1"
          className="text-[2.6rem] md:text-[5rem] font-bold leading-tight"
        >
          {t('title')}
        </BreakLine>
        <div className="text-primary text-2xl md:text-[2.5rem] font-bold">
          {activeToken.name}
        </div>
        <div>
          <Button asChild size="lg">
            <Link to="/developers">{t('forDeveloper')}</Link>
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden w-full h-[8.7rem] md:h-[11.5rem] bg-background">
        {tokens.map((token) => (
          <img
            key={token.tokenAddress}
            src={`/assets/images/tokens/${token.tokenAddress}.webp`}
            alt={token.name}
            width="90"
            height="90"
            className="size-[5.625rem] object-contain object-center absolute left-0 top-1/2 transform -translate-1/2"
          />
        ))}
      </div>
    </section>
  )
}
