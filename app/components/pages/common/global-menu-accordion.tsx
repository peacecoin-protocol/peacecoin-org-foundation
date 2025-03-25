import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'

function GlobalMenuAccordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root className={cn('w-full', className)} {...props} />
  )
}

function GlobalMenuAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('py-4 md:py-6', className)}
      {...props}
    />
  )
}

function GlobalMenuAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 items-center justify-between text-left font-medium transition-all outline-none md:pointer-events-none md:cursor-default [&[data-state=open]>div>svg:first-child]:hidden [&[data-state=open]>div>svg:last-child]:block',
          className,
        )}
        {...props}
      >
        <div className="text-xl font-bold text-primary flex items-center justify-between group">
          {children}
        </div>
        <div className="size-6 bg-primary text-primary-foreground flex items-center justify-center rounded-full md:hidden">
          <PlusIcon className="size-4" />
          <MinusIcon className="size-4 hidden" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function GlobalMenuAccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down md:h-auto md:overflow-visible md:animate-none md:data-[state=closed]:animate-none',
        className,
      )}
      {...props}
    >
      <div className={cn('pt-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export {
  GlobalMenuAccordion,
  GlobalMenuAccordionItem,
  GlobalMenuAccordionTrigger,
  GlobalMenuAccordionContent,
}
