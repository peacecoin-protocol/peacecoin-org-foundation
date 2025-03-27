import { useState, useRef, useEffect, startTransition } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-is-mobile'

import { WorldMap } from './world-map'

type TooltipPosition = {
  x: number
  y: number
}

export type UsageCountryMap = {
  usageCountryNames: string[]
}

export function UsageCountryMap({ usageCountryNames }: UsageCountryMap) {
  const isMobile = useIsMobile()
  const [latesetCountry, setLatestCountry] = useState(usageCountryNames[0])
  const [visibleTooltip, setVisibleTooltip] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const mousePositionRef = useRef<TooltipPosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Tooltipの追随処理
  useEffect(() => {
    const el = tooltipRef.current
    let rafId: number

    if (!el || !isInteracting) {
      return
    }

    if (isMobile) {
      el.style.left = ''
      el.style.top = ''
      return
    }

    let currentX = 0
    let currentY = 0

    const animateTooltip = () => {
      rafId = requestAnimationFrame(animateTooltip)
      const { x, y } = mousePositionRef.current
      const diffX = x - currentX
      const diffY = y - currentY

      if (Math.abs(diffX) < 0.5 && Math.abs(diffY) < 0.5) {
        return
      }

      currentX += diffX * 0.05
      currentY += diffY * 0.05
      el.style.left = `${currentX}px`
      el.style.top = `${currentY}px`
    }

    rafId = requestAnimationFrame(animateTooltip)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isInteracting, isMobile])

  // Tooltipの表示処理
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const container = containerRef.current
    const usageCountryPaths = [
      ...container.querySelectorAll<SVGPathElement>(
        usageCountryNames.map((name) => `[data-name="${name}"]`).join(','),
      ),
    ]
    const observer = new IntersectionObserver((entries) => {
      setIsInteracting(entries.some((entry) => entry.isIntersecting))
    })
    const inactiveCountryClassName = 'fill-primary/50!'

    function activeCountry(countryName: string) {
      usageCountryPaths.forEach((path) => {
        if (path.getAttribute('data-name') === countryName) {
          path.classList.remove(inactiveCountryClassName)
        } else {
          path.classList.add(inactiveCountryClassName)
        }
      })
      startTransition(() => {
        setLatestCountry(countryName)
        setVisibleTooltip(true)
      })
    }

    function inactiveCountry() {
      usageCountryPaths.forEach((path) => {
        path.classList.remove(inactiveCountryClassName)
      })
      setVisibleTooltip(false)
    }

    function handleClickOutside(e: MouseEvent) {
      if (!usageCountryPaths.includes(e.target as SVGPathElement)) {
        inactiveCountry()
      }
    }

    function handlePointerEnter(e: PointerEvent) {
      const countryName = (e.currentTarget as SVGPathElement).getAttribute(
        'data-name',
      )
      if (countryName && usageCountryNames.includes(countryName)) {
        activeCountry(countryName)
      }
    }

    function handlePointerLeave() {
      inactiveCountry()
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      mousePositionRef.current.x = e.clientX - rect.left
      mousePositionRef.current.y = e.clientY - rect.top - 20
    }

    function handleClickCountry(e: MouseEvent) {
      const countryName = (e.currentTarget as SVGPathElement).getAttribute(
        'data-name',
      )
      if (countryName && usageCountryNames.includes(countryName)) {
        activeCountry(countryName)
        e.stopPropagation()
      }
    }

    usageCountryPaths.forEach((path) => {
      path.classList.add('active-country')
      if (isMobile) {
        path.addEventListener('click', handleClickCountry)
      } else {
        path.addEventListener('pointerenter', handlePointerEnter)
        path.addEventListener('pointerleave', handlePointerLeave)
      }
    })
    if (!isMobile) {
      container.addEventListener('pointermove', handlePointerMove)
    }
    document.addEventListener('click', handleClickOutside)
    observer.observe(container)

    return () => {
      usageCountryPaths.forEach((path) => {
        path.removeEventListener('pointerenter', handlePointerEnter)
        path.removeEventListener('pointerleave', handlePointerLeave)
        path.removeEventListener('click', handleClickCountry)
      })
      container.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('click', handleClickOutside)
      observer.disconnect()
    }
  }, [isMobile, usageCountryNames])

  // スマフォ時の地図スクロール処理
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Constants for better readability and optimization
    const FRICTION_COEFFICIENT = 0.95
    const VELOCITY_AMPLIFIER = 15
    const MIN_VELOCITY_THRESHOLD = 0.1
    const ANIMATION_DIVISOR = 15

    const container = containerRef.current
    const maps = [...container.querySelectorAll<SVGElement>('.world-map')]
    const { width: mapWidth, height: containerSize } =
      maps[0].getBoundingClientRect()
    const totalWidth = mapWidth * maps.length
    const centerX = (totalWidth - containerSize) / 2

    // State variables
    let positions = maps.map((_, i) => i * mapWidth - centerX)
    let velocity = 0
    let lastTimestamp = 0
    let animationFrameId: number | null = null
    let lastPointerX = 0
    let isPointerDown = false
    let isDragging = false

    function wrapPosition(pos: number): number {
      if (pos < -mapWidth) {
        return pos + totalWidth
      }
      if (pos > mapWidth * 2) {
        return pos - totalWidth
      }
      return pos
    }

    function updateMapPositions(deltaX: number = 0) {
      positions = positions.map((pos, i) => {
        const newPos = wrapPosition(pos + deltaX)
        maps[i].style.left = `${newPos}px`
        return newPos
      })
    }

    function handlePointerDown(e: PointerEvent) {
      // Cancel any ongoing animation
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }

      lastPointerX = e.clientX
      lastTimestamp = Date.now()
      isPointerDown = true
      isDragging = false
      velocity = 0

      // Set pointer capture to ensure events stay with this element
      if (typeof e.pointerId === 'number') {
        container.setPointerCapture(e.pointerId)
      }
    }

    function handlePointerMove(e: PointerEvent) {
      if (!isPointerDown) return

      const currentPointerX = e.clientX
      const deltaX = currentPointerX - lastPointerX

      // Start considering this a drag after small movement
      if (!isDragging && Math.abs(deltaX) > 5) {
        isDragging = true
      }

      if (isDragging) {
        // Prevent default to stop page scrolling when dragging the map
        e.preventDefault()

        const currentTimestamp = Date.now()
        const deltaTime = currentTimestamp - lastTimestamp

        // Update velocity (pixels per millisecond)
        if (deltaTime > 0) {
          velocity = (deltaX / deltaTime) * VELOCITY_AMPLIFIER
        }

        // Update positions
        updateMapPositions(deltaX)

        lastPointerX = currentPointerX
        lastTimestamp = currentTimestamp
      }
    }

    function handlePointerUp(e: PointerEvent) {
      isPointerDown = false
      if (typeof e.pointerId === 'number') {
        container.releasePointerCapture(e.pointerId)
      }

      // Only start animation if we were actually dragging
      if (isDragging && Math.abs(velocity) > MIN_VELOCITY_THRESHOLD) {
        startDecelerationAnimation()
      }

      isDragging = false
    }

    function startDecelerationAnimation() {
      let lastFrame = performance.now()

      function animate(timestamp: number) {
        const deltaTime = timestamp - lastFrame
        lastFrame = timestamp

        // Apply friction (deceleration)
        velocity *= FRICTION_COEFFICIENT

        // Stop animation when velocity becomes very small
        if (Math.abs(velocity) < MIN_VELOCITY_THRESHOLD) {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = null
          }
          return
        }

        // Move maps based on current velocity
        const deltaX = (velocity * deltaTime) / ANIMATION_DIVISOR
        updateMapPositions(deltaX)

        animationFrameId = requestAnimationFrame(animate)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Touch fallback for older devices
    function handleTouchStart(e: TouchEvent) {
      handlePointerDown({
        clientX: e.touches[0].clientX,
      } as PointerEvent)
    }

    function handleTouchMove(e: TouchEvent) {
      if (isDragging) {
        e.preventDefault()
      }

      handlePointerMove({
        clientX: e.touches[0].clientX,
        preventDefault: () => e.preventDefault(),
      } as unknown as PointerEvent)
    }

    function handleTouchEnd() {
      handlePointerUp({} as PointerEvent)
    }

    // Setup event listeners
    container.addEventListener('pointerdown', handlePointerDown)
    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerup', handlePointerUp)
    container.addEventListener('pointercancel', handlePointerUp)

    // Fallback for older devices that don't support pointer events
    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('touchcancel', handleTouchEnd)

    // Initialize map positions
    updateMapPositions()

    return () => {
      // Clean up event listeners and cancel any animations
      container.removeEventListener('pointerdown', handlePointerDown)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerup', handlePointerUp)
      container.removeEventListener('pointercancel', handlePointerUp)

      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden max-md:aspect-square [&_path]:transition-[fill] [&_path]:fill-secondary/50 [&_.active-country]:fill-primary"
    >
      {/* メインMap */}
      <WorldMap className="world-map max-md:absolute h-[100vw] w-auto md:w-full md:h-auto" />
      {/* SP用のダミーMap */}
      <WorldMap className="world-map absolute h-[100vw] w-auto md:hidden" />
      <WorldMap className="world-map absolute h-[100vw] w-auto md:hidden" />

      <div
        ref={tooltipRef}
        className={cn(
          'absolute pointer-events-none transition-opacity duration-200 bottom-4 left-1/2 -translate-x-1/2 md:-translate-y-1/2 md:bottom-auto',
          'border-primary bg-background text-primary px-3 py-1 rounded-md text-sm shadow-md whitespace-nowrap',
          visibleTooltip ? 'opacity-100' : 'opacity-0',
        )}
      >
        {latesetCountry}
      </div>
    </div>
  )
}
