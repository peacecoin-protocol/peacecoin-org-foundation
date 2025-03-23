import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

function getOpacity(pathname: string) {
  switch (pathname) {
    case '/':
      return 1
    case '/developers':
    case '/concept':
      return 0.5
    default:
      return 0
  }
}

export function KVVideo() {
  const location = useLocation()
  const [loaded, setLoaded] = useState(false)
  const [opacity, setOpacity] = useState(getOpacity(location.pathname))
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setOpacity(getOpacity(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current

    if (!root || !video || !opacity) {
      if (video?.paused === false) {
        video.pause()
      }
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play()
          }
        } else if (!video.paused) {
          video.pause()
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.5,
      },
    )

    const listener = () => {
      const offset =
        Math.max(0, Math.min(window.scrollY, window.innerHeight)) * 0.5
      root.style.transform = `translateY(${offset}px)`
    }

    observer.observe(root)
    window.addEventListener('scroll', listener, { passive: true })
    listener()

    return () => {
      window.removeEventListener('scroll', listener)
      observer.disconnect()
    }
  }, [opacity])

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-lvh pointer-events-none opacity-0 transition-opacity duration-500',
      )}
      style={{
        opacity: `${loaded ? opacity : 0}`,
      }}
      ref={rootRef}
    >
      <video
        className="w-auto h-full absolute top-0 right-0"
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        poster="/assets/images/kv-video-poster.webp"
        ref={videoRef}
      >
        <source src="/assets/video/kv.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
