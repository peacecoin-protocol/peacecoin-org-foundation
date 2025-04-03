import type { Usecase } from '@/schemas'
import { createContext, useContext } from 'react'

type UseCasesState = Usecase[]

const UseCasesContext = createContext<UseCasesState>([])

export function UseCasesProvider({
  children,
  value,
}: {
  value: UseCasesState
  children: React.ReactNode
}) {
  return (
    <UseCasesContext.Provider value={value}>
      {children}
    </UseCasesContext.Provider>
  )
}

export function useUseCases() {
  return useContext(UseCasesContext)
}
