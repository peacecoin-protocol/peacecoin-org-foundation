import { useEffect, useRef, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type TokenNameDisplayProps = ComponentProps<'div'> & {
  name: string
}

export function TokenNameDisplay({
  name,
  className,
  ...rest
}: TokenNameDisplayProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const prevNameRef = useRef('')

  useEffect(() => {
    const root = rootRef.current
    let mounted = true

    if (!root) return

    function deleteChars(duration: number) {
      return new Promise<void>((resolve) => {
        const timerId = setInterval(() => {
          if (typeof root?.textContent === 'string') {
            root.textContent = root.textContent.slice(0, -1)
          }
          if (!root?.textContent?.length || !mounted) {
            clearInterval(timerId)
            resolve()
          }
        }, duration)
      })
    }

    function inputChars(chars: string, duration: number) {
      return new Promise<void>((resolve) => {
        const charsArray = chars.split('')
        const timerId = setInterval(() => {
          if (typeof root?.textContent === 'string') {
            root.textContent += charsArray.shift()
          }
          if (!charsArray.length || !mounted) {
            clearInterval(timerId)
            resolve()
          }
        }, duration)
      })
    }

    ;(async () => {
      root.textContent = prevNameRef.current
      if (prevNameRef.current.length) {
        await deleteChars(300 / prevNameRef.current.length)
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
      await inputChars(name, 500 / name.length)
      prevNameRef.current = name
    })()

    return () => {
      mounted = false
    }
  }, [name])

  return (
    <div
      className={cn(
        'flex items-center gap-2 h-[2.5rem] md:h-[3.5rem] after:w-[1px] after:h-[80%] after:bg-primary after:animate-cursor-blink',
        className,
      )}
      {...rest}
    >
      <span
        className="text-primary text-2xl md:text-[2.5rem] font-bold"
        ref={rootRef}
      />
    </div>
  )
}
