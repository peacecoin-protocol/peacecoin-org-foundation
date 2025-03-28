import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from 'react'
import { cn } from '@/lib/utils'
import { ASSET_URL, REGX_LANG_FROM_PATHNAME } from '@/constants'

function getOpacity(pathname?: string) {
  const pathWithoutLocale = pathname?.replace(REGX_LANG_FROM_PATHNAME, '/')
  switch (pathWithoutLocale) {
    case '/':
      return 1
    case '/developers':
    case '/concept':
      return 0.5
    default:
      return 0
  }
}

export type KVVideoProps = ComponentProps<'div'> & {
  pathname?: string
}

export function KVVideo({ pathname, className, style, ...rest }: KVVideoProps) {
  const [loaded, setLoaded] = useState(false)
  const [opacity, setOpacity] = useState(getOpacity(pathname))
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleInitialized = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    setOpacity(getOpacity(pathname))
  }, [pathname])

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

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
      const offset = Math.max(0, window.scrollY) * 0.5
      root.style.transform = `translateY(${offset}px)`
    }

    setLoaded(video.readyState === 4)
    observer.observe(root)
    window.addEventListener('scroll', listener, { passive: true })
    listener()

    return () => {
      window.removeEventListener('scroll', listener)
      root.style.transform = ''
      observer.disconnect()
    }
  }, [opacity])

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-lvh overflow-hidden pointer-events-none opacity-0 transition-opacity duration-500',
        className,
      )}
      style={{
        opacity: `${loaded ? opacity : 0}`,
        ...style,
      }}
      {...rest}
      ref={rootRef}
    >
      <div
        className={cn(
          // common
          'aspect-video absolute',
          // sp
          'max-md:origin-bottom-left max-md:transform-(--sp-transform) max-md:h-[100vw] max-md:max-w-dvh max-md:w-auto max-md:left-0 max-md:bottom-0',
          // desktop
          'md:w-auto md:h-full md:bottom-0 md:right-0 md:max-w-dvw',
        )}
        style={
          {
            '--sp-transform': 'rotate(90deg) translateX(-100%)',
          } as CSSProperties
        }
      >
        <video
          className="block w-full h-full object-cover object-center outline-0"
          loop
          muted
          playsInline
          onLoadedData={handleInitialized}
          poster="/assets/images/kv-video-poster.webp"
          disablePictureInPicture
          disableRemotePlayback
          ref={videoRef}
        >
          <source src={`${ASSET_URL}/videos/kv.mp4`} type="video/mp4" />
        </video>
      </div>
      <i className="absolute left-0 right-0 bottom-0 h-[25%] bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
