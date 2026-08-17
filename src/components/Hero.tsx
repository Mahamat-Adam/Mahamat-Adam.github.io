import { useUi } from '../data/ui'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, FileText, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { openExternal } from '../lib/openExternal'
import { DocViewer } from './DocViewer'
import { GithubIcon } from './icons'

export function Hero() {
  const ui = useUi()
  const [cvOpen, setCvOpen] = useState(false)
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="mx-auto flex min-h-[92svh] max-w-wrap flex-col justify-center px-5 py-14 sm:py-24 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[clamp(0.6rem,2.6vw,0.875rem)] uppercase tracking-[0.2em] text-accentInk dark:text-accentSoft sm:tracking-[0.3em] "
        >
          {ui.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-5 max-w-4xl font-display text-[clamp(1.45rem,8.5vw,4.5rem)] font-bold leading-[1.05]"
        >
          {ui.hero.greeting}
          <span className="text-accentInk dark:text-accentSoft">{ui.hero.name}</span>.
          <br />
          {ui.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400"
        >
          {ui.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
        >
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            {ui.hero.viewWork}
          </a>
          <button
            onClick={() => setCvOpen(true)}
            className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline"
          >
            <FileText size={15} /> {ui.hero.viewCv}
          </button>
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-start">
            <a
              href="#contact"
              aria-label={ui.hero.messageAria}
              className="rounded-full border border-line p-3 text-zinc-600 transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline dark:text-zinc-400"
            >
              <Mail size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternal(e, profile.linkedin)}
              style={{ touchAction: 'manipulation' }}
              aria-label="LinkedIn"
              className="rounded-full border border-line p-3 text-zinc-600 transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline dark:text-zinc-400"
            >
              <Linkedin size={16} />
            </a>
            {profile.github !== '#' && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternal(e, profile.github)}
                style={{ touchAction: 'manipulation' }}
                aria-label="GitHub"
                className="rounded-full border border-line p-3 text-zinc-600 transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline dark:text-zinc-400"
              >
                <GithubIcon size={16} />
              </a>
            )}
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 sm:mt-16 dark:text-zinc-500"
        >
          <ArrowDown size={14} className="animate-bounce" /> {ui.hero.scroll}
        </motion.a>
      </div>

      <AnimatePresence>
        {cvOpen && (
          <DocViewer
            title={ui.hero.cvTitle}
            image="/img/cv-preview.jpg"
            file={profile.cvPath}
            onClose={() => setCvOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
