import { useEffect, useState, type PropsWithChildren } from 'react'

export function ClientOnly({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted ? children : null
}
