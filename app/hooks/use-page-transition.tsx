import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocation, useNavigate, type NavigateFunction } from 'react-router'

type PageTransitionState = {
  isTransitioning: boolean
  nextPath?: string
  navigateWithTransition: NavigateFunction
}

type PageTransitionProviderProps = {
  children(state: PageTransitionState): React.ReactNode
  duration?: number
}

const PageTransitionContext = createContext<PageTransitionState>({
  isTransitioning: false,
  navigateWithTransition: () => {},
})

export function PageTransitionProvider({
  children,
  duration = 200,
}: PageTransitionProviderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [nextPath, setNextPath] = useState(location.pathname)
  const fromLinkPathRef = useRef(nextPath)
  const isTransitioning =
    location.pathname !== nextPath && fromLinkPathRef.current === nextPath

  const navigateWithTransition: NavigateFunction = useCallback(
    async (...args) => {
      const to = args[0]
      switch (typeof to) {
        case 'string':
          fromLinkPathRef.current = to
          setNextPath(to)
          break
        case 'object':
          if (to.pathname) {
            fromLinkPathRef.current = to.pathname
            setNextPath(to.pathname)
          }
          break
        default:
          break
      }

      await new Promise<void>((resolve) =>
        setTimeout(() => resolve(), duration),
      )
      await navigate(...(args as Parameters<NavigateFunction>))
    },
    [duration, navigate],
  )

  // Handle browser back/forward navigation
  useEffect(() => {
    const handler = () => {
      const currentPath = window.location.pathname
      if (currentPath !== fromLinkPathRef.current) {
        fromLinkPathRef.current = currentPath
        setNextPath(currentPath)
      }
    }
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      isTransitioning,
      nextPath,
      navigateWithTransition,
    }),
    [isTransitioning, nextPath, navigateWithTransition],
  )

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children(contextValue)}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error(
      'usePageTransition must be used within a PageTransitionProvider',
    )
  }
  return context
}
