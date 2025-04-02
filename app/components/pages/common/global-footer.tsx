import { useTranslation } from 'react-i18next'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { LINKS } from '@/constants'
import { OuterLink } from '@/components/ui/outer-link'
import { LocaleLink } from '@/components/ui/locale-link'
import { PeaceCoinVerticalIcon } from '@/components/ui/icon'

type SNSLink = {
  href: string
  label: string
  icon: ReactNode
}

const snsLinks: SNSLink[] = [
  {
    href: LINKS.x,
    label: 'X',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </svg>
    ),
  },
  {
    href: LINKS.facebook,
    label: 'Facebook',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: LINKS.linkdin,
    label: 'LinkedIn',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: LINKS.github,
    label: 'GitHub',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
]

export type FooterProps = ComponentProps<'footer'>

export function GlobalFooter({ className, ...rest }: FooterProps) {
  const { t } = useTranslation('common')
  const currentYear = new Date().getFullYear()
  const linkButtonClassName =
    'hover:text-primary transition-colors duration-300 ease-out'

  return (
    <footer className={cn('bg-background', className)} {...rest}>
      <div className="container mx-auto pt-12 pb-6 px-5">
        <div className="flex max-md:flex-col gap-8 md:gap-16">
          <div className="md:flex-1">
            <PeaceCoinVerticalIcon className="h-[6rem] w-auto mb-6 block" />
            <p className="text-xs md:text-base leading-[1.8]">
              ADVANCE CAPITALISM TO THE NEXT STAGE
              <br />
              BY USING BLOCKCHAIN TECHNOLOGY.
            </p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-4">{t('learnAbout')}</h3>
            <ul className="space-y-3">
              <li>
                <LocaleLink to="/concept" className={linkButtonClassName}>
                  {t('navigation.concept')}
                </LocaleLink>
              </li>
              <li className="flex items-center gap-1">
                <LocaleLink
                  to="/usage-scenes/01"
                  className={linkButtonClassName}
                >
                  {t('navigation.usageScene')} 01
                </LocaleLink>
                <span className="text-primary">・</span>
                <LocaleLink
                  to="/usage-scenes/02"
                  className={linkButtonClassName}
                >
                  02
                </LocaleLink>
                <span className="text-primary">・</span>
                <LocaleLink
                  to="/usage-scenes/03"
                  className={linkButtonClassName}
                >
                  03
                </LocaleLink>
              </li>
              <li>
                <LocaleLink to="/usecases" className={linkButtonClassName}>
                  {t('navigation.useCase')}
                </LocaleLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-4">{t('participate')}</h3>
            <ul className="space-y-3">
              <li>
                <LocaleLink to="/developers" className={linkButtonClassName}>
                  {t('navigation.developers')}
                </LocaleLink>
              </li>
              <li>
                <OuterLink href={LINKS.crowdin} className={linkButtonClassName}>
                  {t('navigation.translationProgram')}
                </OuterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-primary py-8 md:py-14">
        <div className="container mx-auto">
          <div className="flex justify-center gap-8">
            {snsLinks.map(({ href, label, icon }) => (
              <OuterLink
                key={href}
                href={href}
                className="text-primary-foreground hover:text-primary-foreground/50 transition-colors duration-300 ease-out"
                aria-label={label}
              >
                {icon}
              </OuterLink>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <div className="text-center text-xs md:text-base">
          &copy; {currentYear} {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
