import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { Fragment } from 'react/jsx-runtime'

export type BreakLineProps<T extends ElementType = 'div'> = {
  children?: string | null
  component?: T
} & Omit<ComponentPropsWithoutRef<T>, 'children'>

export function BreakLine<T extends ElementType = 'div'>({
  children: str,
  component,
  ...rest
}: BreakLineProps<T>) {
  if (!str) return null

  const children = str.split('\n').map((line, i, lines) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ))

  if (component) {
    const Component = component as ElementType
    return <Component {...rest}>{children}</Component>
  }

  return <>{children}</>
}
