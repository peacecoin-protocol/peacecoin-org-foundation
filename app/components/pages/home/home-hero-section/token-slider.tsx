import {
  useRef,
  useEffect,
  useState,
  type ComponentProps,
  startTransition,
} from 'react'
import type { CommunityToken } from '@/schemas'
import { cn } from '@/lib/utils'

type TokenSliderProps = ComponentProps<'div'> & {
  tokens: CommunityToken[]
  autoScrolling?: boolean
  prerenderCount?: number
  duration?: number
  onActiveTokenChange?: (token: CommunityToken) => void
}

type TokenCofig = {
  size: number
  gap: number
  visibleArray: number[]
}

export function TokenSlider({
  tokens,
  autoScrolling = true,
  prerenderCount = 2,
  duration = 3000,
  onActiveTokenChange,
  className,
  ...rest
}: TokenSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tokenRefs = useRef<(HTMLDivElement | null)[]>([])
  const currentStartTokenIndexRef = useRef(0)
  const [tokenConfig, setTokenConfig] = useState<TokenCofig>({
    size: 0,
    gap: 0,
    visibleArray: [],
  })

  useEffect(() => {
    const root = rootRef.current

    if (!root) return

    const handler = () => {
      const containerWidth = root.offsetWidth
      const tokenSize = Math.ceil(root.offsetHeight / 2)
      const tokenGap = Math.ceil(tokenSize / 3)

      if (!containerWidth || !tokenSize || !tokenGap) {
        return
      }

      startTransition(() => {
        setTokenConfig((prev) => {
          const renderCount =
            Math.ceil(containerWidth / (tokenSize + tokenGap)) + prerenderCount
          if (
            renderCount === prev.visibleArray.length &&
            tokenSize === prev.size &&
            tokenGap === prev.gap
          ) {
            return prev
          }
          tokenRefs.current = []
          return {
            size: tokenSize,
            gap: tokenGap,
            visibleArray: Array.from({ length: renderCount }, (_, i) => i),
          }
        })
      })
    }

    window.addEventListener('resize', handler, { passive: true })
    handler()

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [prerenderCount])

  useEffect(() => {
    const { size, gap, visibleArray } = tokenConfig

    if (!visibleArray.length || !autoScrolling) {
      return
    }

    let rafId: number
    let visibleTokens: CommunityToken[]
    let startTimestamp = performance.now()

    function updateTokenIndex() {
      currentStartTokenIndexRef.current =
        (currentStartTokenIndexRef.current + 1) % tokens.length
    }

    function updateVisibleTokens() {
      const index = currentStartTokenIndexRef.current
      visibleTokens = visibleArray.map((_, i) => {
        const actualIndex = (index + i) % tokens.length
        return tokens[actualIndex]
      })
      onActiveTokenChange?.(visibleTokens[Math.floor(visibleTokens.length / 2)])
    }

    function tick(timestamp: number) {
      rafId = requestAnimationFrame(tick)

      const diff = timestamp - startTimestamp

      visibleTokens.forEach((token, index) => {
        const el = tokenRefs.current[index]

        if (!el) {
          return
        }

        const tokenTranslateX =
          (index - 1) * (size + gap) - (diff / duration) * (size + gap)
        el.style.transform = `translate3d(${tokenTranslateX}px, -50%, 0px)`
        el.style.backgroundImage = `url(/assets/images/tokens/${token.tokenAddress}.webp)`
      })

      if (diff > duration) {
        startTimestamp = timestamp
        updateTokenIndex()
        updateVisibleTokens()
      }
    }

    tokenRefs.current.forEach((el) => {
      if (el) {
        el.style.width = `${tokenConfig.size}px`
        el.style.height = `${tokenConfig.size}px`
      }
    })

    updateVisibleTokens()
    tick(startTimestamp)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [autoScrolling, duration, onActiveTokenChange, tokenConfig, tokens])

  return (
    <div
      {...rest}
      className={cn('relative overflow-hidden w-full bg-background', className)}
      ref={rootRef}
    >
      {tokenConfig.visibleArray.map((index) => (
        <div
          key={`${index}`}
          ref={(el) => {
            tokenRefs.current[index] = el
          }}
          className="bg-contain bg-center bg-no-repeat absolute top-1/2 left-0"
        />
      ))}
    </div>
  )
}
