import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import type { CommunityToken } from '@/schemas'

export type HomeHeroSectionProps = {
  tokens: CommunityToken[]
}

export function HomeHeroSection({ tokens }: HomeHeroSectionProps) {
  const { t } = useTranslation('home', {
    keyPrefix: 'hero',
  })
  const [activeToken, setActiveToken] = useState<CommunityToken>()
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
    <section ref={ref} className="h-screen md:min-h-[50rem] flex flex-col">
      <div className="flex-grow flex items-center">
        <h1 className="text-[5rem] font-bold mb-7">{t('title')}</h1>
        <div className="text-primary text-[2.5rem] font-bolc mb-10">
          {activeToken?.name ?? ' '}
        </div>
        <Button asChild>
          <Link to="">{t('forDeveloper')}</Link>
        </Button>
      </div>
      <div className="relative overflow-hidden w-full h-[11.5rem] bg-background">
        {tokens.map((token) => (
          <img
            key={token.tokenAddress}
            src={`/assets/images/tokens/${token.tokenAddress}.png`}
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
