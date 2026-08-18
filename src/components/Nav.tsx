import { useUi } from '../data/ui'
import { useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useLang } from '../lib/lang'
import { LanguageMenu } from './LanguageMenu'

const links = [
  { href: '#about', key: 'about' },
  { href: '#experience', key: 'experience' },
  { href: '#projects', key: 'projects' },
  { href: '#fyp', key: 'fyp' },
  { href: '#awards', key: 'awards' },
  { href: '#contact', key: 'contact' },
] as const

export function Nav() {
  const ui = useUi()
  const { dark, toggle } = useTheme()
  const { lang, rtl } = useLang()
  const [open, setOpen] = useState(false)

  // Spanish labels are long enough that the full bar does not fit a 768px tablet:
  // it wrapped onto two lines, which reads as broken. Spanish alone keeps the menu
  // button one breakpoint longer. English, Arabic and French all fit at md, French
  // because its bar label is the abbreviation PFE, as English uses FYP.
  const late = lang === 'es'
  const bar = late ? 'hidden items-center gap-4 lg:flex lg:gap-7' : 'hidden items-center gap-4 md:flex lg:gap-7'
  const sheet = late ? 'lg:hidden' : 'md:hidden'

  // Arabic mirrors the header, which sends the wordmark to the right and the
  // controls to the left, and on phones leaves the menu button in one corner
  // while the sheet it opens reads down the other. The row is held in visual
  // LTR order instead, so the wordmark, the theme toggle, the language pill and
  // the menu button each keep the corner English gives them, at every width:
  // mirroring only the compact header would have made the wordmark jump sides
  // as the layout crossed 768px.
  //
  // The row only. The links are grouped so they are not caught by the reversal
  // and still read right to left, and the dropdown under the language pill hangs
  // from whichever edge is the outer one for the row it sits in.
  const flip = rtl ? ' flex-row-reverse' : ''
  const clusterBase = late ? 'flex items-center gap-3 lg:hidden' : 'flex items-center gap-3 md:hidden'
  const cluster = clusterBase + flip
  const anchor = rtl ? 'start' : 'end'

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-md dark:border-nline/60 dark:bg-night/80">
      <nav className={`mx-auto flex h-16 max-w-wrap items-center justify-between px-5 md:px-8${flip}`}>
        {/* A Latin wordmark inside an RTL page: without dir the trailing full stop
            is treated as neutral and jumps to the front, reading ".Mahamat" */}
        <a href="#top" dir="ltr" className="font-display text-lg font-bold tracking-tight">
          Mahamat<span className="text-accentInk dark:text-accentSoft">.</span>
        </a>

        {/* Tighter at the first breakpoint, full spacing again at lg. */}
        <div className={bar + flip}>
          <div className="flex items-center gap-4 lg:gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-sm text-zinc-600 transition-colors hover:text-ink dark:text-zinc-400 dark:hover:text-white"
              >
                {ui.nav[l.key]}
              </a>
            ))}
          </div>
          <button
            onClick={toggle}
            aria-label={ui.nav.toggleTheme}
            className="rounded-full border border-line p-2 text-zinc-600 transition-colors hover:text-ink dark:border-nline dark:text-zinc-400 dark:hover:text-white"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <LanguageMenu anchor={anchor} />
        </div>

        <div className={cluster}>
          <button
            onClick={toggle}
            aria-label={ui.nav.toggleTheme}
            className="rounded-full border border-line p-2 text-zinc-600 dark:border-nline dark:text-zinc-400"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <LanguageMenu anchor={anchor} />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={ui.nav.menu}
            className="rounded-full border border-line p-2 text-zinc-600 dark:border-nline dark:text-zinc-400"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border-t border-line bg-paper dark:border-nline dark:bg-night ${sheet}`}
          >
            <div className="flex flex-col px-5 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  {ui.nav[l.key]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
