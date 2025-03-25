import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

function LangIcon() {
  return (
    <div className="relative size-6 text-[0.69rem] font-bold">
      <div className="size-4 bg-foreground text-background flex items-center justify-center rounded absolute right-0 bottom-0">
        文
      </div>
      <div className="size-4 bg-background border border-foreground text-foreground flex items-center justify-center rounded absolute left-0 top-0">
        A
      </div>
    </div>
  )
}

export type LocaleButtonProps = ComponentProps<'button'>

export function LocaleButton({ className, ...props }: LocaleButtonProps) {
  const { t } = useTranslation('common')
  return (
    <button
      className={cn(
        'flex items-center gap-1.5 font-medium py-2 px-4 rounded-full transition-colors hover:cursor-pointer hover:bg-primary/5',
        className,
      )}
      {...props}
    >
      <LangIcon />
      {t('language.label')}
    </button>
  )
}
