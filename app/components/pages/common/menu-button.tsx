import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

const commonBarClassName = `absolute w-6 h-0.5 bg-current left-1/2 top-1/2 transform -translate-1/2 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full`

export type MenuButtonProps = ComponentProps<'button'> & {
  open: boolean
}

export function MenuButton({ className, open, ...rest }: MenuButtonProps) {
  return (
    <button
      className={cn(
        'size-12 relative rounded-full transition-colors duration-300 ease-out hover:cursor-pointer hover:bg-primary/5',
        open ? 'text-primary' : 'text-foreground',
        className,
      )}
      aria-label="Menu"
      {...rest}
    >
      <i className={cn(commonBarClassName, open ? 'rotate-45' : '-mt-2')} />
      <i className={cn(commonBarClassName, open ? 'opacity-0' : '')} />
      <i className={cn(commonBarClassName, open ? '-rotate-45' : 'mt-2')} />
    </button>
  )
}
