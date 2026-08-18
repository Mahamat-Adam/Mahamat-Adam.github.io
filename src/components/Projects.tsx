import { useUi } from '../data/ui'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { useProjects } from '../data/content'
import { type Project } from '../data/projects'
import { openExternal } from '../lib/openExternal'
import { Reveal } from './Reveal'
import { Section } from './Section'

function ProjectImage({ p, src, className }: { p: Project; src?: string; className: string }) {
  const ui = useUi()
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
      alt={ui.projects.shotAlt(p.title)}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} object-cover object-top`}
    />
  )
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const ui = useUi()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [idx, setIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  // Actual-size view inside the enlarged overlay. Sizing the image up makes the
  // box overflow, so one finger pans it as normal scrolling; a CSS transform
  // would scale it too but reintroduces the iOS tap offset we removed earlier.
  const [fullSize, setFullSize] = useState(false)
  const gallery = p.images ?? (p.image ? [p.image] : [])
  const many = gallery.length > 1
  const move = (d: number) => setIdx((i) => (i + d + gallery.length) % gallery.length)

  // Locking the page and taking focus happens once. Keeping it out of the key
  // effect below matters: that one re-binds as the view state changes, and
  // re-running this with it would steal focus back on every zoom toggle.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Escape steps back one level at a time: actual size, enlarged, then shut.
      if (e.key === 'Escape') {
        if (fullSize) setFullSize(false)
        else if (zoomed) setZoomed(false)
        else onClose()
      }
      if (e.key === 'ArrowLeft') move(-1)
      if (e.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, zoomed, fullSize, gallery.length])

  // A different screenshot should arrive fitted, not mid-pan at actual size.
  useEffect(() => setFullSize(false), [idx])

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
        {/* Pinned LTR: the gallery sequence is not mirrored, so its controls are
            not either. Without this the right-hand arrow stepped backwards, and the
            counter badge landed on top of the "tap to enlarge" pill. */}
        <div dir="ltr" className="relative">
          <button
            onClick={() => setZoomed(true)}
            data-probe="enlarge"
            aria-label={ui.projects.enlarge}
            className="block w-full cursor-zoom-in"
          >
            <ProjectImage key={idx} p={p} src={gallery[idx]} className="h-56 w-full sm:h-72" />
          </button>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={ui.projects.close}
            className="absolute end-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur transition-transform hover:scale-105"
          >
            <X size={18} />
          </button>
          {many && (
            <>
              <button
                onClick={() => move(-1)}
                data-probe="gal-prev"
                aria-label={ui.projects.prev}
                className="absolute start-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-3 text-white ring-1 ring-white/20 backdrop-blur transition-transform hover:scale-105 sm:block"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => move(1)}
                data-probe="gal-next"
                aria-label={ui.projects.next}
                className="absolute end-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-3 text-white ring-1 ring-white/20 backdrop-blur transition-transform hover:scale-105 sm:block"
              >
                <ChevronRight size={24} />
              </button>
              <span
                dir="ltr"
                className="absolute bottom-3 end-4 hidden rounded-full bg-black/50 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur sm:block"
              >
                {idx + 1} / {gallery.length}
              </span>
            </>
          )}
          <span className="pointer-events-none absolute bottom-3 start-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
            <Maximize2 size={11} /> {ui.projects.tapToEnlarge}
          </span>
        </div>

        {/* On phones the gallery controls sit BELOW the screenshot rather than on
            top of it: the image is only a couple of hundred pixels tall here, so
            a centred button hides a real part of whatever it is showing. */}
        {many && (
          <div
            dir="ltr"
            className="flex items-center justify-center gap-6 border-b border-line py-3 sm:hidden dark:border-nline"
          >
            <button
              onClick={() => move(-1)}
              data-probe="gal-prev"
              aria-label={ui.projects.prev}
              className="rounded-full border border-line p-2.5 text-zinc-600 transition-colors active:border-accent active:text-accentInk dark:border-nline dark:text-zinc-300 dark:active:text-accentSoft"
            >
              <ChevronLeft size={20} />
            </button>
            <span
              dir="ltr"
              className="min-w-14 text-center font-mono text-[11px] text-zinc-500 dark:text-zinc-400"
            >
              {idx + 1} / {gallery.length}
            </span>
            <button
              onClick={() => move(1)}
              data-probe="gal-next"
              aria-label={ui.projects.next}
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
                setFullSize(false)
              }}
              className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-3"
            >
              {/* Opens fitted so the whole screenshot is visible; tap it for
                  actual size, then one finger drags it around. */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`overflow-auto overscroll-contain ${
                  fullSize ? 'h-[88svh] w-full' : 'max-h-full max-w-full'
                }`}
                // pan-x/pan-y lets one finger drag the enlarged image. pinch-zoom
                // is deliberately absent: the browser's pinch scales the whole
                // PAGE, taking the backdrop with it. Tap is the zoom here.
                style={{ touchAction: fullSize ? 'pan-x pan-y' : 'none' }}
              >
                <img
                  src={gallery[idx]}
                  data-probe="shot-large"
                  alt={ui.projects.shotAltLarge(p.title)}
                  className={
                    fullSize
                      ? 'max-w-none cursor-zoom-out'
                      : 'max-h-[88svh] max-w-full cursor-zoom-in object-contain'
                  }
                  onClick={() => setFullSize((f) => !f)}
                />
              </div>
              <p className="pointer-events-none mt-3 font-mono text-[11px] text-white/50 sm:hidden">
                {fullSize ? ui.zoom.toFit : ui.zoom.toActual}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomed(false)
                  setFullSize(false)
                }}
                aria-label={ui.projects.closeEnlarged}
                className="absolute end-4 top-4 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition-colors hover:bg-white/25"
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
  const ui = useUi()
  const projects = useProjects()
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <Section id="projects" kicker={ui.projects.kicker} title={ui.projects.title}>
      <p className="-mt-6 mb-4 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
        {ui.projects.intro}
      </p>
      {/* Whose work this is. Once, above the grid: every card below has the same
          answer, so putting it on each of them would be seven copies of a paragraph
          nobody would read twice. */}
      <p className="mb-10 max-w-2xl rounded-xl border border-line bg-card/60 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:border-nline dark:bg-panel/50 dark:text-zinc-400">
        {ui.projects.notice}
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
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-card text-start dark:border-nline dark:bg-panel"
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
