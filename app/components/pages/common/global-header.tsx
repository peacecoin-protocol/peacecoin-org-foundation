import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from 'react'

import { cn } from '@/lib/utils'

import { GlobalMenu } from './global-menu'
import { LocaleMenu } from './locale-menu'
import { LocaleButton } from './locale-button'
import { MenuButton } from './menu-button'
import { LocaleLink } from '@/components/ui/locale-link'
import { PeaceCoinHorizontalIcon } from '@/components/ui/icon'

function DesktopLocaleMenu() {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpenLocale, setIsOpenLocale] = useState(false)

  const handleTooggle = useCallback(() => {
    setIsOpenLocale((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current?.contains(event.target as Node) === false) {
        setIsOpenLocale(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpenLocale])

  return (
    <div className="relative max-md:hidden -mr-4" ref={dropdownRef}>
      <LocaleButton onClick={handleTooggle} />
      <LocaleMenu
        className="absolute right-0 mt-2 rounded-md shadow-hover w-[22.5rem]"
        open={isOpenLocale}
        onClose={handleTooggle}
        initTransform={{ translateY: '-2rem' }}
      />
    </div>
  )
}

export type GlobalHeaderProps = ComponentProps<'header'> & {
  state?: {
    pathname?: string
    isSamePathname: boolean
  }
}

export function GlobalHeader({ className, state, ...rest }: GlobalHeaderProps) {
  const [scrolling, setScrolling] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const listener = () => {
      setScrolling(window.scrollY > 0)
    }
    window.addEventListener('scroll', listener, { passive: true })
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [state])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'hidden auto'
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed z-20 top-0 left-0 w-full bg-background transition-all duration-300 ease-out md:top-5 md:left-5 md:w-[calc(100%-2.5rem)] md:rounded-full',
          menuOpen
            ? 'bg-transparent duration-250 delay-100'
            : 'md:shadow-[0_0_2.5rem_0_rgba(0,0,0,0.09)] duration-150',
          scrolling &&
            !menuOpen &&
            `shadow-[0_0.25rem_0.5rem_-0.1rem_rgba(0,0,0,0.1)]`,
          className,
        )}
        {...rest}
      >
        <div className="container mx-auto flex items-center gap-2 justify-between h-(--gh) px-6 max-md:pr-3">
          <LocaleLink to="/">
            <PeaceCoinHorizontalIcon className="h-11 w-auto" />
          </LocaleLink>
          <div className="flex-1" />
          <MenuButton open={menuOpen} onClick={toggleMenu} />
          <DesktopLocaleMenu />
        </div>
      </header>
      <GlobalMenu open={menuOpen} />
    </>
  )
}
