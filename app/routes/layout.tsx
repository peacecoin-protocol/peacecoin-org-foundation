import { Outlet } from 'react-router'
import { KVVideo } from '@/components/pages/common/kv-video'
import { GlobalHeader } from '@/components/pages/common/global-header'
import { GlobalFooter } from '@/components/pages/common/global-footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <KVVideo />
      <GlobalHeader />
      <div className="flex-grow relative mb-16 md:mb-[7.5rem]">
        <Outlet />
      </div>
      <GlobalFooter className="relative" />
    </div>
  )
}
