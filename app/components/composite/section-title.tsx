import type { PropsWithChildren, ReactNode } from 'react'

export type SectionTitleProps = PropsWithChildren<{
  subtitle?: ReactNode
}>

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div>
      {subtitle && (
        <div className="text-primary text-xl font-bold mb-3">{subtitle}</div>
      )}
      <h1 className="text-[3rem] font-bold">{children}</h1>
    </div>
  )
}
