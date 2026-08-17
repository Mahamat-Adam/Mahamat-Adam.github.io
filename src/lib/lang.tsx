import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

// Adding a language is one entry here plus its strings; nothing else is keyed to
// there being exactly two.
export const languages = [
  { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
] as const

export type LangCode = (typeof languages)[number]['code']

const STORAGE_KEY = 'lang'
const fallback = languages[0]

export const langMeta = (code: string) => languages.find((l) => l.code === code) ?? fallback

type Ctx = {
  lang: LangCode
  dir: 'ltr' | 'rtl'
  rtl: boolean
  setLang: (code: LangCode) => void
}

const LangContext = createContext<Ctx>({
  lang: fallback.code,
  dir: fallback.dir,
  rtl: false,
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  // The inline script in index.html has already resolved this onto <html> before
  // first paint, so read it back rather than deciding again and risking a flip.
  const [lang, setLangState] = useState<LangCode>(
    () => langMeta(document.documentElement.lang).code,
  )

  useEffect(() => {
    const meta = langMeta(lang)
    document.documentElement.lang = meta.code
    document.documentElement.dir = meta.dir
    try {
      localStorage.setItem(STORAGE_KEY, meta.code)
    } catch {
      /* storage may be blocked; the choice still holds for this visit */
    }
  }, [lang])

  const setLang = useCallback((code: LangCode) => setLangState(langMeta(code).code), [])
  const meta = langMeta(lang)

  return (
    <LangContext.Provider value={{ lang, dir: meta.dir, rtl: meta.dir === 'rtl', setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
