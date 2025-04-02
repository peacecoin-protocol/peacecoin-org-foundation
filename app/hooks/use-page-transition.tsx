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

type NextState = {
  nextPath?: string
  isSamePathname: boolean
  args?: Parameters<NavigateFunction>
}

type PageTransitionState = {
  isTransitioning: boolean
  navigateWithTransition: NavigateFunction
  state: NextState
}

type PageTransitionProviderProps = {
  children(state: PageTransitionState): React.ReactNode
  duration?: number
}

const PageTransitionContext = createContext<PageTransitionState>({
  isTransitioning: false,
  state: {
    isSamePathname: false,
  },
  navigateWithTransition: () => {},
})

export function PageTransitionProvider({
  children,
  duration = 200,
}: PageTransitionProviderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [nextState, setNextState] = useState<NextState>({
    nextPath: location.pathname,
    isSamePathname: false,
  })
  const fromLinkPathRef = useRef(nextState.nextPath)
  const isTransitioning =
    location.pathname !== nextState.nextPath &&
    fromLinkPathRef.current === nextState.nextPath

  const navigateWithTransition: NavigateFunction = useCallback(
    async (...args) => {
      const to = args[0]

      switch (typeof to) {
        case 'string':
          fromLinkPathRef.current = to
          break
        case 'object':
          if (to.pathname) {
            fromLinkPathRef.current = to.pathname
          }
          break
        default:
          break
      }

      setNextState((prev) => ({
        nextPath: fromLinkPathRef.current,
        isSamePathname: prev.nextPath === fromLinkPathRef.current,
        args: args as Parameters<NavigateFunction>,
      }))
    },
    [],
  )

  // Handle browser back/forward navigation
  useEffect(() => {
    const handler = () => {
      const currentPath = window.location.pathname
      if (currentPath !== fromLinkPathRef.current) {
        fromLinkPathRef.current = currentPath
        setNextState({
          nextPath: currentPath,
          isSamePathname: false,
        })
      }
    }
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [])

  useEffect(() => {
    const { isSamePathname, args } = nextState

    if (isSamePathname) {
      document.scrollingElement?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    if (!args) {
      return
    }

    const timerId = setTimeout(navigate, duration, ...args)

    return () => {
      clearTimeout(timerId)
    }
  }, [duration, navigate, nextState])

  const contextValue = useMemo(
    () => ({
      state: nextState,
      isTransitioning,
      navigateWithTransition,
    }),
    [isTransitioning, navigateWithTransition, nextState],
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
