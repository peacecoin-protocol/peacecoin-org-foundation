import { Button } from '@/components/ui/button'
import { LocaleLink } from '@/components/ui/locale-link'
import { OuterLink } from '@/components/ui/outer-link'
import { cn } from '@/lib/utils'
import type { ComponentProps, PropsWithChildren } from 'react'
import type { LinkProps } from 'react-router'

const components = {
  h2({ children, ...props }: ComponentProps<'h2'>) {
    return (
      <h2
        className="text-primary font-medium text-2xl md:md:text-4xl mt-10 mb-8 md:mt-16 md:mb-12 first:mt-0 last:mb-0"
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3
      className="font-medium text-xl md:text-2xl mt-8 mb-6 md:mt-14 md:mb-10 first:mt-0 last:mb-0"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<'h4'>) => (
    <h4
      className="font-bold text-primary text-lg mt-7 mb-5 md:mt-12 md:mb-9 first:mt-0 last:mb-0"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: ComponentProps<'h5'>) => (
    <h5
      className="font-bold text-base mt-6 mb-4 md:mt-10 md:mb-8 first:mt-0 last:mb-0"
      {...props}
    >
      {children}
    </h5>
  ),
  p({ children, ...props }: ComponentProps<'p'>) {
    return (
      <p
        className="text-sm leading-loose my-4 md:my-8 first:mt-0 last:mb-0"
        {...props}
      >
        {children}
      </p>
    )
  },
  ul({ children, ...props }: ComponentProps<'ul'>) {
    return (
      <ul
        className="list-none pl-5 my-4 md:my-8 [&>li]:before:absolute [&>li]:before:top-1.5 [&>li]:before:translate-x-[-150%] [&>li]:before:size-3 [&>li]:before:bg-primary [&>li]:before:rounded-full first:mt-0 last:mb-0"
        {...props}
      >
        {children}
      </ul>
    )
  },
  ol({ children, ...props }: ComponentProps<'ol'>) {
    return (
      <ol
        className="list-decimal pl-5 my-4 md:my-8 first:mt-0 last:mb-0"
        {...props}
      >
        {children}
      </ol>
    )
  },
  li({ children, ...props }: ComponentProps<'li'>) {
    return (
      <li
        className="relative text-sm leading-relaxed mb-2 md:mb-4 first:mt-0 last:mb-0"
        {...props}
      >
        {children}
      </li>
    )
  },
  a({ children, href, ...props }: ComponentProps<'a'>) {
    if (!href) {
      return null
    }

    return href.startsWith('/') ? (
      <LocaleLink
        className="text-primary underline hover:no-underline"
        to={href}
        {...props}
      >
        {children}
      </LocaleLink>
    ) : (
      <OuterLink
        className="text-primary underline hover:no-underline"
        href={href}
        {...props}
      >
        {children}
      </OuterLink>
    )
  },
  Link(props: LinkProps) {
    return (
      <Button
        asChild
        className="border-primary border-1 text-primary bg-background hover:text-background"
      >
        {typeof props.to === 'string' && props.to.startsWith('https://') ? (
          <OuterLink href={props.to} {...props} />
        ) : (
          <LocaleLink {...props} />
        )}
      </Button>
    )
  },
  Col({ className, children, ...rest }: ComponentProps<'div'>) {
    return (
      <div
        className={cn(
          'flex max-md:flex-col md:flex-wrap gap-6 my-4 md:my-8 first:mt-0 last:mb-0',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    )
  },
  Flex({ className, children, ...rest }: ComponentProps<'div'>) {
    return (
      <div className={cn('flex-1', className)} {...rest}>
        {children}
      </div>
    )
  },
  PrimaryMat({ children }: PropsWithChildren) {
    return <div className="bg-primary/7 p-6 md:p-8 rounded-2xl">{children}</div>
  },
  AppIcon({ src, alt }: { src: string; alt: string }) {
    return (
      <div className="rounded-3xl overflow-clip shadow-md mx-auto size-24">
        <img
          className="w-full h-full block"
          width="256"
          height="256"
          src={src}
          alt={alt}
          loading="lazy"
        />
      </div>
    )
  },
}

export default components
