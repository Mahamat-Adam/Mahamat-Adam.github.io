import { useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#fyp', label: 'FYP' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const { dark, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-md dark:border-nline/60 dark:bg-night/80">
      <nav className="mx-auto flex h-16 max-w-wrap items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Mahamat<span className="text-accentInk dark:text-accentSoft">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-600 transition-colors hover:text-ink dark:text-zinc-400 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-line p-2 text-zinc-600 transition-colors hover:text-ink dark:border-nline dark:text-zinc-400 dark:hover:text-white"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-line p-2 text-zinc-600 dark:border-nline dark:text-zinc-400"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
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
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
