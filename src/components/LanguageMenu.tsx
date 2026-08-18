import { useUi } from '../data/ui'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { Flag } from './Flag'
import { languages, useLang } from '../lib/lang'

// Built as a real dropdown rather than a <select>: a native picker's open list is
// drawn by the OS, so it cannot take the site's colours, and it flashes light on a
// dark page. Same reason the contact topics became pills.
export function LanguageMenu() {
  const ui = useUi()
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = languages.find((l) => l.code === lang) ?? languages[0]

  return (
    <div ref={wrap} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        data-probe="lang"
        aria-label={ui.nav.changeLanguage}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-line py-2 pe-2 ps-2.5 text-zinc-600 transition-colors hover:text-ink dark:border-nline dark:text-zinc-400 dark:hover:text-white"
      >
        <Flag code={current.code} />
        {/* Named, not abbreviated: "EN" tells a French visitor nothing about
            whether their language is here, and the name is the part that has to
            survive if the flag ever does not draw. */}
        <span lang={current.code} className="text-[13px] leading-none">
          {current.native}
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14 }}
            role="menu"
            // end-anchored so it stays inside the viewport in both directions
            className="absolute end-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-line bg-card py-1 shadow-lg dark:border-nline dark:bg-panel"
          >
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  role="menuitemradio"
                  aria-checked={l.code === lang}
                  onClick={() => {
                    setLang(l.code)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-start text-sm text-zinc-700 transition-colors hover:bg-paper dark:text-zinc-300 dark:hover:bg-night"
                >
                  <span className="flex items-center gap-2.5">
                    <Flag code={l.code} />
                    <span lang={l.code}>{l.native}</span>
                  </span>
                  {l.code === lang && (
                    <Check size={14} className="shrink-0 text-accentInk dark:text-accentSoft" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
