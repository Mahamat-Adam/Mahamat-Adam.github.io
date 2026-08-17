import { useUi } from '../data/ui'
import { useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
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
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-md dark:border-nline/60 dark:bg-night/80">
      <nav className="mx-auto flex h-16 max-w-wrap items-center justify-between px-5 md:px-8">
        {/* A Latin wordmark inside an RTL page: without dir the trailing full stop
            is treated as neutral and jumps to the front, reading ".Mahamat" */}
        <a href="#top" dir="ltr" className="font-display text-lg font-bold tracking-tight">
          Mahamat<span className="text-accentInk dark:text-accentSoft">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-600 transition-colors hover:text-ink dark:text-zinc-400 dark:hover:text-white"
            >
              {ui.nav[l.key]}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label={ui.nav.toggleTheme}
            className="rounded-full border border-line p-2 text-zinc-600 transition-colors hover:text-ink dark:border-nline dark:text-zinc-400 dark:hover:text-white"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <LanguageMenu />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            aria-label={ui.nav.toggleTheme}
            className="rounded-full border border-line p-2 text-zinc-600 dark:border-nline dark:text-zinc-400"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <LanguageMenu />
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
            className="overflow-hidden border-t border-line bg-paper md:hidden dark:border-nline dark:bg-night"
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
