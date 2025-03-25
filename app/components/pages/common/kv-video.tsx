import { YouTube } from '@/components/composite/youtube'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
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

export type KVVideoProps = HTMLAttributes<HTMLDivElement>

export function KVVideo({ className, style, ...rest }: KVVideoProps) {
  const location = useLocation()
  const [loaded, setLoaded] = useState(false)
  const [opacity, setOpacity] = useState(getOpacity(location.pathname))
  const rootRef = useRef<HTMLDivElement>(null)
  // const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setOpacity(getOpacity(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    // const video = videoRef.current

    // if (!root || !video || !opacity) {
    //   if (video?.paused === false) {
    //     video.pause()
    //   }
    //   return
    // }

    // const observer = new IntersectionObserver(
    //   ([entry]) => {
    //     if (entry.isIntersecting) {
    //       if (video.paused) {
    //         video.play()
    //       }
    //     } else if (!video.paused) {
    //       video.pause()
    //     }
    //   },
    //   {
    //     rootMargin: '0px',
    //     threshold: 0.5,
    //   },
    // )

    const listener = () => {
      const offset = Math.max(0, window.scrollY) * 0.5
      root.style.transform = `translateY(${offset}px)`
    }

    // observer.observe(root)
    window.addEventListener('scroll', listener, { passive: true })
    listener()

    return () => {
      window.removeEventListener('scroll', listener)
      // observer.disconnect()
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
      <YouTube
        className={cn(
          // common
          'aspect-video absolute outline-0',
          // sp
          'max-md:origin-bottom-left max-md:transform-(--sp-transform) max-md:h-[100vw] max-md:w-auto max-md:left-0 max-md:bottom-0',
          // desktop
          'md:w-auto md:h-full md:bottom-0 md:right-0',
        )}
        style={
          {
            '--sp-transform': 'rotate(90deg) translateX(-100%)',
          } as React.CSSProperties
        }
        videoId="w6Hjdms-DCI"
        onLoaded={() => setLoaded(true)}
      />
      {/* <video
        className="w-auto h-full absolute top-0 right-0"
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        poster="/assets/images/kv-video-poster.webp"
        ref={videoRef}
      >
        <source src="/assets/video/kv.mp4" type="video/mp4" />
      </video> */}
      <i className="absolute left-0 right-0 bottom-0 h-[25%] bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
