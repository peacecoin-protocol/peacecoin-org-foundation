import * as v from 'valibot'
import {
  getTranslatedStatusOutputSchema,
  type GetTranslatedStatusOutput,
} from '@/schemas'
import {
  useCallback,
  createContext,
  useContext,
  useState,
  useTransition,
} from 'react'

type LocaleState = {
  list: GetTranslatedStatusOutput | null
  load: () => void
}

const LocaleContext = createContext<LocaleState>({
  list: null,
  load: () => {},
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<GetTranslatedStatusOutput | null>(null)
  const [pending, startTransaction] = useTransition()
  const load = useCallback(() => {
    if (pending || list?.length) {
      return
    }
    startTransaction(async () => {
      const json = await fetch('/api/locales').then((res) => res.json())
      const parsed = v.safeParse(getTranslatedStatusOutputSchema, json)
      if (parsed.success) {
        setList(parsed.output)
      }
    })
  }, [list?.length, pending])

  return (
    <LocaleContext.Provider value={{ list, load }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
