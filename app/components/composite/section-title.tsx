import type { HTMLAttributes, ReactNode } from 'react'
import { BreakLine } from '../functional/break-line'
import { cn } from '@/lib/utils'

export type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  subtitle?: ReactNode
  children: string
}

export function SectionTitle({
  children,
  subtitle,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div {...props} className={cn('text-center', className)}>
      {subtitle && (
        <div className="text-primary text-lg md:text-xl font-bold mb-3">
          {subtitle}
        </div>
      )}
      <BreakLine
        component="h1"
        className="text-2xl md:text-5xl font-bold leading-relaxed"
      >
        {children}
      </BreakLine>
    </div>
  )
}
