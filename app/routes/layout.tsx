import { Outlet } from 'react-router'
import { KVVideo } from '@/components/layout/kv-video'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <KVVideo />
      <Header />
      <div className="flex-grow relative mb-[7rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
