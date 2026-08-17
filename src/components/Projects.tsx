import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { openExternal } from '../lib/openExternal'
import { Reveal } from './Reveal'
import { Section } from './Section'

function ProjectImage({ p, src, className }: { p: Project; src?: string; className: string }) {
  const [failed, setFailed] = useState(false)
  const resolved = src ?? p.image
  if (!resolved || failed) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{ background: `linear-gradient(135deg, ${p.accent}26, ${p.accent}0D)` }}
      >
        <span className="font-display text-5xl font-bold" style={{ color: p.accent }}>
          {p.title
            .split(' ')
            .slice(0, 2)
            .map((w) => w[0])
            .join('')}
        </span>
      </div>
    )
  }
  return (
    <img
      src={resolved}
      alt={`${p.title} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} object-cover object-top`}
    />
  )
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [idx, setIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const gallery = p.images ?? (p.image ? [p.image] : [])
  const many = gallery.length > 1
  const move = (d: number) => setIdx((i) => (i + d + gallery.length) % gallery.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed((z) => (z ? false : (onClose(), false)))
      if (e.key === 'ArrowLeft') move(-1)
      if (e.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      {/* deliberately not a shared-element (layoutId) morph: that leaves a
          transform on this container, and iOS Safari then mis-places taps
          inside it, so the "Visit the site" link needed a long press */}
      <motion.div
        initial={{ y: 28, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 28, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-card sm:rounded-3xl dark:border-nline dark:bg-panel"
      >
        <div className="relative">
          <button
            onClick={() => setZoomed(true)}
            aria-label="Enlarge screenshot"
            className="block w-full cursor-zoom-in"
          >
            <ProjectImage key={idx} p={p} src={gallery[idx]} className="h-56 w-full sm:h-72" />
          </button>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur transition-transform hover:scale-105"
          >
            <X size={18} />
          </button>
          {many && (
            <>
              <button
                onClick={() => move(-1)}
                aria-label="Previous view"
                className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-3 text-white ring-1 ring-white/20 backdrop-blur transition-transform hover:scale-105 sm:block"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => move(1)}
                aria-label="Next view"
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-3 text-white ring-1 ring-white/20 backdrop-blur transition-transform hover:scale-105 sm:block"
              >
                <ChevronRight size={24} />
              </button>
              <span className="absolute bottom-3 right-4 hidden rounded-full bg-black/50 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur sm:block">
                {idx + 1} / {gallery.length}
              </span>
            </>
          )}
          <span className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
            <Maximize2 size={11} /> tap to enlarge
          </span>
        </div>

        {/* On phones the gallery controls sit BELOW the screenshot rather than on
            top of it: the image is only a couple of hundred pixels tall here, so
            a centred button hides a real part of whatever it is showing. */}
        {many && (
          <div className="flex items-center justify-center gap-6 border-b border-line py-3 sm:hidden dark:border-nline">
            <button
              onClick={() => move(-1)}
              aria-label="Previous view"
              className="rounded-full border border-line p-2.5 text-zinc-600 transition-colors active:border-accent active:text-accentInk dark:border-nline dark:text-zinc-300 dark:active:text-accentSoft"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="min-w-14 text-center font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              {idx + 1} / {gallery.length}
            </span>
            <button
              onClick={() => move(1)}
              aria-label="Next view"
              className="rounded-full border border-line p-2.5 text-zinc-600 transition-colors active:border-accent active:text-accentInk dark:border-nline dark:text-zinc-300 dark:active:text-accentSoft"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <AnimatePresence>
          {zoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation()
                setZoomed(false)
              }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-3"
            >
              {/* opens fitted so the whole screenshot is visible; pinch to
                  zoom in from there, and the box pans once zoomed */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full overflow-auto overscroll-contain"
                style={{ touchAction: 'pinch-zoom' }}
              >
                <img
                  src={gallery[idx]}
                  alt={`${p.title} screenshot, enlarged`}
                  className="max-h-[88svh] max-w-full cursor-zoom-out object-contain"
                  onClick={() => setZoomed(false)}
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomed(false)
                }}
                aria-label="Close enlarged view"
                className="absolute right-4 top-4 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* extra bottom padding keeps the visit link clear of the iOS home
            indicator strip, where taps get taken by the system gesture */}
        <div className="p-6 pb-16 md:p-8 md:pb-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accentInk dark:text-accentSoft">
            {p.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{p.title}</h3>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {p.detail.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 text-xs text-zinc-600 dark:border-nline dark:text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternal(e, p.link!)}
              style={{ touchAction: 'manipulation' }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {p.linkLabel ?? 'Visit site'} <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <Section id="projects" kicker="Projects" title="Selected work">
      <p className="-mt-6 mb-10 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
        A mix of live production sites and interactive 3D builds. Click any card for the full story.
      </p>
      <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const span =
            i === 0
              ? 'sm:col-span-2 lg:col-span-2'
              : i === projects.length - 1
                ? 'lg:col-span-2'
                : ''
          return (
            <Reveal key={p.id} delay={(i % 3) * 0.07} className={span}>
              <motion.button
                onClick={() => setOpenId(p.id)}
                whileHover={{ y: -5 }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-card text-left dark:border-nline dark:bg-panel"
              >
                <div className="overflow-hidden">
                  <ProjectImage
                    p={p}
                    className="h-44 w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accentInk dark:text-accentSoft">
                    {p.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {p.blurb}
                  </p>
                  <p className="mt-auto pt-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    {p.tech.slice(0, 3).join(' · ')}
                  </p>
                </div>
              </motion.button>
            </Reveal>
          )
        })}
      </div>

      <AnimatePresence>
        {open && <ProjectModal p={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </Section>
  )
}
