import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState, type HTMLAttributes } from 'react'
import { LocaleMenu } from '@/components/pages/common/locale-menu'
// import { MobileNav } from '@/components/layout/mobile-nav'
import logoH from '@/assets/svg/logo-h.svg?url'
import { cn } from '@/lib/utils'

type MenuButtonProps = HTMLAttributes<HTMLButtonElement> & {
  open: boolean
}

const commonBarClassName = `absolute w-6 h-0.5 bg-current left-1/2 top-1/2 transform -translate-1/2 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full`

function MenuButton({ className, open, ...rest }: MenuButtonProps) {
  return (
    <button
      className={cn(
        'size-12 relative rounded-full transition-colors hover:cursor-pointer hover:bg-primary/5',
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

export function GlobalHeader() {
  const { t } = useTranslation('common')
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

  return (
    <header
      className={cn(
        'fixed z-50 top-0 left-0 right-0 bg-background transition-all duration-500 md:shadow-[0_0_2.5rem_0_rgba(0,0,0,0.09)] md:left-5 md:right-5 md:top-5 md:rounded-full',
        scrolling && `shadow-[0_0.25rem_0.5rem_-0.1rem_rgba(0,0,0,0.1)]`,
      )}
    >
      <div className="container mx-auto flex items-center gap-2 justify-between h-20 px-4 md:px-8">
        <Link to="/">
          <img
            src={logoH}
            alt="PEACE COIN"
            width="217"
            height="44"
            className="h-11 w-auto"
          />
        </Link>
        <div className="flex-1" />
        <MenuButton open={menuOpen} onClick={toggleMenu} />
        <LocaleMenu className="max-md:hidden -mr-4" />
      </div>
      {/* {menuOpen && (
        <MobileNav onClose={() => setMenuOpen(false)} logoH={logoH} />
      )} */}
    </header>
  )
}
