import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from './Reveal'

const appShots = Array.from(
  { length: 5 },
  (_, i) => `/img/fyp-app/app-${String(i + 1).padStart(2, '0')}.jpg`,
)

// Strongest screens lead; login pages and the database view close the strip.
const panelOrder = [3, 7, 16, 2, 14, 6, 17, 5, 13, 4, 10, 9, 12, 11, 8, 15, 18, 1]
const panelShots = panelOrder.map((n) => `/img/fyp-app/panel-${String(n).padStart(2, '0')}.jpg`)

type LightboxState = { list: string[]; index: number } | null

function Lightbox({
  state,
  onClose,
  onMove,
}: {
  state: NonNullable<LightboxState>
  onClose: () => void
  onMove: (d: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onMove(-1)
      if (e.key === 'ArrowRight') onMove(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onMove])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* opens fitted so the whole screenshot is visible; pinch to zoom in */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85svh] max-w-full overflow-auto overscroll-contain rounded-xl"
        style={{ touchAction: 'pinch-zoom' }}
      >
        <img
          src={state.list[state.index]}
          alt={`System screenshot ${state.index + 1}`}
          className="max-h-[85svh] max-w-full object-contain"
        />
      </div>
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/80"
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMove(-1)
        }}
        aria-label="Previous screenshot"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/80"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMove(1)
        }}
        aria-label="Next screenshot"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/80"
      >
        <ChevronRight size={20} />
      </button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/70">
        {state.index + 1} / {state.list.length}
      </p>
    </motion.div>
  )
}

function StripLabel({ kicker, note }: { kicker: string; note: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accentInk dark:text-accentSoft">
        {kicker}
      </p>
      <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">{note}</p>
    </div>
  )
}

export function FypGallery() {
  const [box, setBox] = useState<LightboxState>(null)

  const move = (d: number) =>
    setBox((b) => (b ? { ...b, index: (b.index + d + b.list.length) % b.list.length } : b))

  return (
    <div className="mt-14 space-y-12">
      <Reveal>
        <StripLabel kicker="Customer app · Flutter" note="tap any screen to enlarge" />
        <div className="strip-scroll flex gap-3 overflow-x-auto md:gap-4">
          {appShots.map((src, i) => (
            <button
              key={src}
              onClick={() => setBox({ list: appShots, index: i })}
              aria-label={`View app screen ${i + 1}`}
              className="shrink-0 overflow-hidden rounded-2xl border border-line transition-transform hover:-translate-y-1 dark:border-nline"
            >
              <img
                src={src}
                alt={`Customer app screen ${i + 1}`}
                loading="lazy"
                className="h-72 w-auto md:h-80"
              />
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <StripLabel
          kicker="Admin & seller panels · Laravel"
          note="scroll sideways · tap to enlarge"
        />
        <div className="strip-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto md:gap-4">
          {panelShots.map((src, i) => (
            <button
              key={src}
              onClick={() => setBox({ list: panelShots, index: i })}
              aria-label={`View panel screenshot ${i + 1}`}
              className="shrink-0 snap-start overflow-hidden rounded-xl border border-line transition-transform hover:-translate-y-1 dark:border-nline"
            >
              <img
                src={src}
                alt={`Web panel screenshot ${i + 1}`}
                loading="lazy"
                className="h-40 w-auto md:h-52"
              />
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {box && <Lightbox state={box} onClose={() => setBox(null)} onMove={move} />}
      </AnimatePresence>
    </div>
  )
}
