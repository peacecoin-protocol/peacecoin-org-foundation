import { cn } from '@/lib/utils'
import type { Usecase } from '@/schemas'
import type { ComponentProps } from 'react'

export type UsecaseTitleProps = ComponentProps<'div'> &
  Pick<Usecase, 'tokenName' | 'communityName' | 'title' | 'category'>

export function UsecaseTitle({
  tokenName,
  communityName,
  title,
  category,
  className,
  ...rest
}: UsecaseTitleProps) {
  return (
    <div className={cn('flex flex-col flex-1 gap-6', className)} {...rest}>
      <div className="border-b border-primary font-semibold pb-4 relative leading-none">
        <div className="text-lg lg:text-2xl text-primary">{tokenName}</div>
        <div className="text-sm lg:text-base">{communityName}</div>
        <i className="absolute left-0 bottom-[-1px] w-[5rem] h-[1px] bg-secondary" />
      </div>
      <h2 className="font-medium text-2xl leading-snug lg:text-4xl">{title}</h2>
      <div>
        <p className="inline-flex items-center justify-center px-9 h-9 text-sm text-primary font-bold bg-primary/7 border border-primary rounded-full">
          {category}
        </p>
      </div>
    </div>
  )
}
