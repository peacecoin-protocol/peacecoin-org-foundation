import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  useLocation,
  useNavigate,
  useNavigation,
  type NavigateFunction,
} from 'react-router'

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
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [nextPath, setNextPath] = useState(location.pathname)
  const isTransitioning =
    Boolean(navigation.location) || location.pathname !== nextPath
  const navigateWithTransition: NavigateFunction = useCallback(
    async (...args) => {
      const to = args[0]
      switch (typeof to) {
        case 'string':
          setNextPath(to)
          break
        case 'object':
          if (to.pathname) {
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
