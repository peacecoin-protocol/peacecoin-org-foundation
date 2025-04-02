import { Outlet } from 'react-router'

import { PageTransitionProvider } from '@/hooks/use-page-transition'
import { KVVideo } from '@/components/pages/common/kv-video'
import { GlobalHeader } from '@/components/pages/common/global-header'
import { GlobalFooter } from '@/components/pages/common/global-footer'
import { cn } from '@/lib/utils'

export default function Layout() {
  return (
    <PageTransitionProvider>
      {({ isTransitioning, state }) => (
        <>
          <KVVideo pathname={state.nextPath} />
          <GlobalHeader state={state} />
          <div
            className={cn(
              'relative flex flex-col min-h-screen gap-16 md:gap-[7.5rem] transition-opacity duration-300 ease-in-out',
              isTransitioning ? 'opacity-0' : 'opacity-100',
            )}
          >
            <div className="flex-grow">
              <Outlet />
            </div>
            <GlobalFooter />
          </div>
        </>
      )}
    </PageTransitionProvider>
  )
}
