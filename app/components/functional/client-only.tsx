import { useSyncExternalStore, type PropsWithChildren } from 'react'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ClientOnly({ children }: PropsWithChildren) {
  const isMounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )
  return isMounted ? children : null
}
