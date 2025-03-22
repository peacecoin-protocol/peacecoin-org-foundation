import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LocaleMenu } from '@/components/composite/locale-menu'

interface MobileNavProps {
  onClose: () => void
  logoH: string
}

export function MobileNav({ onClose, logoH }: MobileNavProps) {
  const { t } = useTranslation('common')
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 z-50">
      {/* Mobile Menu */}
      <div className="md:hidden bg-background w-full h-full">
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-4 border-b border-muted">
            <div className="flex items-center">
              <img
                src={logoH}
                alt="PEACE COIN"
                width="217"
                height="44"
                className="h-10 w-auto"
              />
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full"
              onClick={onClose}
              aria-label={t('nav.close')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 px-6 py-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-2">
                PEACE COINを知る
              </h2>
              <nav className="space-y-4 ml-4">
                <Link
                  to="/concept"
                  className="block py-1 text-base font-medium text-foreground/75 hover:text-primary"
                  onClick={onClose}
                >
                  PEACE COINとは
                </Link>
                <Link
                  to="/usage-scenes"
                  className="block py-1 text-base font-medium text-foreground/75 hover:text-primary"
                  onClick={onClose}
                >
                  活用シーン
                </Link>
              </nav>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-2">導入事例</h2>
              <nav className="space-y-4 ml-4">
                <Link
                  to="/usecases"
                  className="block py-1 text-base font-medium text-foreground/75 hover:text-primary"
                  onClick={onClose}
                >
                  Somic coin
                </Link>
              </nav>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-2">
                PEACE COINへの参加
              </h2>
              <nav className="space-y-4 ml-4">
                <Link
                  to="/translation-program"
                  className="block py-1 text-base font-medium text-foreground/75 hover:text-primary"
                  onClick={onClose}
                >
                  翻訳プログラム
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <div className="fixed inset-x-0 top-20 mx-auto max-w-7xl px-8">
          <div className="bg-foreground rounded-[100px] shadow-[0_0_40px_0_rgba(0,0,0,0.09)] p-16">
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center space-x-4">
                <img
                  src={logoH}
                  alt="PEACE COIN"
                  width="217"
                  height="44"
                  className="h-12 w-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-16">
              <div>
                <h3 className="text-xl font-bold text-primary mb-6">
                  PEACE COINを知る
                </h3>
                <nav className="space-y-6">
                  <Link
                    to="/concept"
                    className="block py-1 text-lg font-medium text-foreground/75 hover:text-primary"
                    onClick={onClose}
                  >
                    PEACE COINとは
                  </Link>
                  <Link
                    to="/usage-scenes"
                    className="block py-1 text-lg font-medium text-foreground/75 hover:text-primary"
                    onClick={onClose}
                  >
                    活用シーン
                  </Link>
                </nav>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-6">
                  導入事例
                </h3>
                <nav className="space-y-6">
                  <Link
                    to="/usecases"
                    className="block py-1 text-lg font-medium text-foreground/75 hover:text-primary"
                    onClick={onClose}
                  >
                    Somic coin
                  </Link>
                </nav>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-6">
                  PEACE COINへの参加
                </h3>
                <nav className="space-y-6">
                  <Link
                    to="/translation-program"
                    className="block py-1 text-lg font-medium text-foreground/75 hover:text-primary"
                    onClick={onClose}
                  >
                    翻訳プログラム
                  </Link>
                </nav>
                <div className="mt-12">
                  <LocaleMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay for desktop */}
        <div
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClose()
            }
          }}
          aria-label={t('nav.close')}
          role="button"
          tabIndex={0}
        />
      </div>
    </div>
  )
}
