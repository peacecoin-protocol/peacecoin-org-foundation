import type { ComponentProps } from 'react'

export type OuterLinkProps = Omit<ComponentProps<'a'>, 'target' | 'rel'>

export function OuterLink({ children, ...props }: OuterLinkProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
