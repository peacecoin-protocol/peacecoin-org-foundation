import type { Content } from '@/schemas'
import { createContext, useContext } from 'react'

type ContentState = Content[]

const ContentContext = createContext<ContentState>([])

export function ContentProvider({
  children,
  value,
}: {
  value: ContentState
  children: React.ReactNode
}) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
