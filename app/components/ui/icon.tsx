import { cn } from '@/lib/utils'
import type { HTMLAttributes, SVGProps } from 'react'

export function CircleArrowIcon({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <i
      className={cn(
        'size-16 md:size-20 rounded-full border border-current text-primary flex items-center justify-center bg-background',
        className,
      )}
      {...rest}
    >
      <svg
        viewBox="0 0 15 28"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[12px] h-[22.4px] md:w-[15px] md:h-[28px]"
      >
        <path
          d="m.7 28-.7-.7 13.5-13.3-13.5-13.3.7-.7 14.3 14z"
          fill="currentColor"
        />
      </svg>
    </i>
  )
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m16 4.2c-6.6 0-12 5.4-12 12.1s3.4 9.9 8.2 11.5c.6.1.8-.3.8-.6s0-1.2 0-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6s.5-2.4 1.2-3.2c-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3s.2.7.8.6c4.8-1.6 8.2-6.1 8.2-11.5 0-6.7-5.4-12.1-12-12.1z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m23.8 8.9c-1.5-.7-3-1.2-4.6-1.4-.2.4-.4.8-.6 1.2-1.7-.3-3.4-.3-5.1 0-.2-.4-.4-.8-.6-1.2-1.6.3-3.2.8-4.6 1.4-2.9 4.3-3.7 8.6-3.3 12.7 1.7 1.3 3.6 2.2 5.7 2.8.5-.6.9-1.3 1.2-2-.7-.2-1.3-.6-1.9-.9.2-.1.3-.2.5-.4 3.6 1.7 7.8 1.7 11.3 0 .2.1.3.2.5.4-.6.4-1.3.7-1.9.9.4.7.8 1.3 1.2 2 2-.6 4-1.6 5.7-2.8.5-4.8-.8-9-3.3-12.7zm-11.5 10.2c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm7.4 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z"
        fill="currentColor"
      />
    </svg>
  )
}

export function WhitePaperIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m22.1 9.8h-5.5v1.5h5.5zm-11.2 14h11.2v-1.5h-11.2zm0-8.3h11.2v-1.5h-11.2zm0 4.1h11.2v-1.5h-11.2zm12.9-15.8h-8.9c-.7 0-1.4.3-1.9.8l-5.5 5.5c-.5.5-.8 1.2-.8 1.9v13.9c0 1.3 1.1 2.4 2.4 2.4h14.6c1.3 0 2.4-1.1 2.4-2.4v-19.7c0-1.3-1.1-2.4-2.4-2.4zm-9.9 2.3v4.3c0 .4 0 .5-.5.5h-4.3zm-5.4 6.4h5.6c.8 0 1.4-.6 1.4-1.4v-5.6h8.3c.4 0 .7.3.7.7v19.6c0 .4-.3.7-.7.7h-14.6c-.4 0-.7-.3-.7-.7z"
        fill="currentColor"
      />
    </svg>
  )
}
