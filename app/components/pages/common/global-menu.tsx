import type { PropsWithChildren, ReactNode } from 'react'
import type { LinkProps } from 'react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'

import {
  GlobalMenuAccordion,
  GlobalMenuAccordionContent,
  GlobalMenuAccordionItem,
  GlobalMenuAccordionTrigger,
} from './global-menu-accordion'
import { LocaleMenu } from './locale-menu'
import { LocaleButton } from './locale-button'
import { useLocale } from '@/hooks/use-locale'
import { useUseCases } from '@/hooks/use-usecases'
import { LocaleLink } from '@/components/ui/locale-link'

function NavLink({ className, ...rest }: LinkProps) {
  return (
    <LocaleLink
      {...rest}
      className={cn('block py-1 text-foreground hover:text-primary', className)}
    />
  )
}

function NavLinkItem({ children }: PropsWithChildren) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-primary">-</span>
      {children}
    </li>
  )
}

type NavLinkListProps = {
  children: ReactNode
}

function NavLinkList({ children }: NavLinkListProps) {
  return <ul className="space-y-4">{children}</ul>
}

export type GlobalMenuProps = {
  open: boolean
}

export function GlobalMenu({ open }: GlobalMenuProps) {
  const { t } = useTranslation('common')
  const [isDesktop, setIsDesktop] = useState(false)
  const { load, list } = useLocale()
  const [isOpenLocale, setIsOpenLocale] = useState(false)
  const usecases = useUseCases()

  const handleTooggleLocaleMenu = useCallback(() => {
    setIsOpenLocale((prev) => !prev)
    load()
  }, [load])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 overflow-hidden z-10 w-full bg-background/80 backdrop-blur-sm transition-[height]',
          open
            ? 'h-dvh duration-300 delay-100 ease-out'
            : 'h-0 duration-250 ease-in',
        )}
      >
        <div className="flex flex-col container mx-auto p-6 pt-(--gh) h-full">
          <div className="overflow-y-auto hidden-scrollbar flex-grow md:flex md:justify-center md:space-x-24 md:pt-[9rem]">
            <GlobalMenuAccordion
              {...(isDesktop
                ? {
                    type: 'multiple',
                    defaultValue: ['learnAbout', 'useCase', 'participate'],
                  }
                : {
                    type: 'single',
                    defaultValue: 'learnAbout',
                    collapsible: true,
                  })}
              className="md:flex md:space-x-24"
            >
              <GlobalMenuAccordionItem
                value="learnAbout"
                className={cn(
                  'md:flex-1 transition-[translate,opacity] duration-500 transform',
                  open ? 'delay-200' : 'opacity-0 -translate-y-10',
                )}
              >
                <GlobalMenuAccordionTrigger>
                  {t('learnAbout')}
                </GlobalMenuAccordionTrigger>
                <GlobalMenuAccordionContent>
                  <NavLinkList>
                    <NavLinkItem>
                      <NavLink to="/concept">{t('navigation.concept')}</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                      <div className="flex items-center gap-1">
                        <LocaleLink
                          to="/usage-scenes/01"
                          className="hover:text-primary transition-colors"
                        >
                          {t('navigation.usageScene')} 01
                        </LocaleLink>
                        <span className="text-primary">・</span>
                        <LocaleLink
                          to="/usage-scenes/02"
                          className="hover:text-primary transition-colors"
                        >
                          02
                        </LocaleLink>
                        <span className="text-primary">・</span>
                        <LocaleLink
                          to="/usage-scenes/03"
                          className="hover:text-primary transition-colors"
                        >
                          03
                        </LocaleLink>
                      </div>
                    </NavLinkItem>
                  </NavLinkList>
                </GlobalMenuAccordionContent>
              </GlobalMenuAccordionItem>

              <GlobalMenuAccordionItem
                value="useCase"
                className={cn(
                  'md:flex-1 transition-[translate,opacity] duration-500 transform',
                  open ? 'delay-300' : 'opacity-0 -translate-y-10',
                )}
              >
                <GlobalMenuAccordionTrigger>
                  {t('navigation.useCase')}
                </GlobalMenuAccordionTrigger>
                <GlobalMenuAccordionContent>
                  <NavLinkList>
                    {usecases.map((usecase) => (
                      <NavLinkItem key={usecase.id}>
                        <NavLink to={`/usecases/${usecase.id}`}>
                          {usecase.tokenName}
                        </NavLink>
                      </NavLinkItem>
                    ))}
                  </NavLinkList>
                </GlobalMenuAccordionContent>
              </GlobalMenuAccordionItem>

              <GlobalMenuAccordionItem
                value="participate"
                className={cn(
                  'md:flex-1 transition-[translate,opacity] duration-500 transform',
                  open ? 'delay-400' : 'opacity-0 -translate-y-10',
                )}
              >
                <GlobalMenuAccordionTrigger>
                  {t('participate')}
                </GlobalMenuAccordionTrigger>
                <GlobalMenuAccordionContent>
                  <NavLinkList>
                    <NavLinkItem>
                      <NavLink to="/developers">
                        {t('navigation.developers')}
                      </NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                      <NavLink to="/usage-scenes">
                        {t('navigation.translationProgram')}
                      </NavLink>
                    </NavLinkItem>
                  </NavLinkList>
                </GlobalMenuAccordionContent>
              </GlobalMenuAccordionItem>
            </GlobalMenuAccordion>
          </div>
          <div
            className={cn(
              'md:hidden -ml-3 transition-[translate,opacity] duration-500',
              open ? 'delay-500' : 'opacity-0 translate-x-5',
            )}
          >
            <LocaleButton onClick={handleTooggleLocaleMenu} />
          </div>
        </div>
      </nav>
      <LocaleMenu
        className="fixed z-50 inset-0 pt-10"
        list={list}
        open={isOpenLocale}
        initTransform={{ translateY: '2rem' }}
        onClose={handleTooggleLocaleMenu}
      />
    </>
  )
}
