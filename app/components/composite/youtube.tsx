/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, type HTMLAttributes } from 'react'

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export type YouTubeProps = HTMLAttributes<HTMLDivElement> & {
  videoId: string
  onLoaded?: () => void
}

export function YouTube({ videoId, onLoaded, ...rest }: YouTubeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    let player: any

    function init() {
      player = new window.YT.Player(ref.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          mute: 1,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target?.playVideo()
            onLoaded?.()
          },
        },
      })
    }

    if (window.YT) {
      window.YT.ready(init)
    } else {
      window.onYouTubeIframeAPIReady = init
    }

    return () => {
      player?.destroy()
    }
  }, [videoId, onLoaded])

  return <div ref={ref} {...rest} />
}
