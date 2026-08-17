import { useUi } from '../data/ui'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import { useContent } from '../data/content'
import { PhotoMarquee } from './PhotoMarquee'

const stripImages = Array.from(
  { length: 19 },
  (_, i) => `/img/infofort/s${String(i + 1).padStart(2, '0')}.jpg`,
)

function FieldRoleModal({ onClose }: { onClose: () => void }) {
  const ui = useUi()
  const { fieldRole } = useContent()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
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
      role="dialog"
      aria-modal="true"
      aria-label={`${fieldRole.role} at ${fieldRole.company}`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      {/* not a shared-element (layoutId) morph: the transform it leaves on
          this container makes iOS Safari mis-place taps inside it */}
      <motion.div
        initial={{ y: 28, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 28, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-card sm:rounded-3xl dark:border-nline dark:bg-panel"
      >
        <div className="relative">
          <img
            src={fieldRole.lead}
            alt={ui.experience.hospitalAlt}
            className="h-56 w-full object-cover sm:h-72"
          />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={ui.experience.close}
            style={{ touchAction: 'manipulation' }}
            className="absolute end-4 top-4 rounded-full bg-black/50 p-2.5 text-white backdrop-blur transition-transform hover:scale-105"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accentInk dark:text-accentSoft">
            {fieldRole.period} · {fieldRole.location}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{fieldRole.role}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            <span dir="ltr">{fieldRole.company}</span>
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-3">
            {fieldRole.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-line px-3 py-4 text-center dark:border-nline"
              >
                <span className="font-display text-2xl font-bold text-accentInk dark:text-accentSoft">
                  {h.value}
                </span>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {h.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {fieldRole.detail.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>

        <div className="border-t border-line pb-6 pt-5 dark:border-nline">
          <p className="mb-3 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 md:px-8 dark:text-zinc-400">
            {ui.experience.onSite}
          </p>
          <PhotoMarquee images={stripImages} heightClass="h-36 md:h-44" speed={70} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FieldRoleCard() {
  const ui = useUi()
  const { fieldRole } = useContent()
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ y: -4 }}
        className="group grid w-full overflow-hidden rounded-2xl border border-line bg-card text-start sm:grid-cols-2 dark:border-nline dark:bg-panel"
      >
        <div className="overflow-hidden">
          <img
            src={fieldRole.lead}
            alt={ui.experience.hospitalAlt}
            loading="lazy"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-full"
          />
        </div>
        <div className="flex flex-col p-6 md:p-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accentInk dark:text-accentSoft">
            {fieldRole.period}
          </p>
          <h3 className="mt-2 font-display text-lg font-bold md:text-xl">{fieldRole.role}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            <span dir="ltr">{fieldRole.company}</span> · {fieldRole.location}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {fieldRole.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accentInk dark:text-accentSoft">
            {ui.experience.seeProject} <Maximize2 size={13} />
          </span>
        </div>
      </motion.button>

      <AnimatePresence>{open && <FieldRoleModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}
