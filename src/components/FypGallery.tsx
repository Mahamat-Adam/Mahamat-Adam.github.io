import { useUi } from '../data/ui'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'
import { ScrollStrip } from './ScrollStrip'

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
  const ui = useUi()
  const closeRef = useRef<HTMLButtonElement>(null)
  // In RTL the sequence runs right to left, so "previous" is the right-pointing
  // chevron and the arrow keys swap with it.
  const { rtl } = useLang()
  const Prev = rtl ? ChevronRight : ChevronLeft
  const Next = rtl ? ChevronLeft : ChevronRight
  // Zoom by swapping the image to its natural size so the box genuinely
  // overflows: panning is then native scrolling, which one finger can drive.
  // Scaling with a transform instead would re-introduce the iOS tap offset.
  const [zoom, setZoom] = useState(false)

  useEffect(() => setZoom(false), [state.index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onMove(rtl ? 1 : -1)
      if (e.key === 'ArrowRight') onMove(rtl ? -1 : 1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onMove, rtl])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={ui.fyp.viewer}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Opens fitted so the whole screenshot is visible; tap it for actual size. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-auto overscroll-contain rounded-xl ${
          zoom ? 'h-[70svh] w-full sm:h-[85svh]' : 'max-h-[70svh] max-w-full sm:max-h-[85svh]'
        }`}
        // pan-x/pan-y lets one finger drag the zoomed image. pinch-zoom is
        // deliberately absent: the browser's pinch scales the whole PAGE, which
        // drags the backdrop and thumbnails along with it. Tapping for actual
        // size is the zoom here, so the gesture is not needed.
        style={{ touchAction: zoom ? 'pan-x pan-y' : 'none' }}
      >
        <img
          src={state.list[state.index]}
          data-probe="shot"
          alt={ui.fyp.systemAlt(state.index + 1)}
          onClick={() => setZoom((z) => !z)}
          className={
            zoom
              ? 'max-w-none cursor-zoom-out'
              : 'max-h-[70svh] max-w-full cursor-zoom-in object-contain sm:max-h-[85svh]'
          }
        />
      </div>

      {/* On phones the controls sit BELOW the screenshot: at this size a button
          centred on the image edge covers a real part of it, and it stays over
          the content while pinch-zoomed. Wide screens keep the side arrows. */}
      <div onClick={(e) => e.stopPropagation()} className="mt-5 flex items-center gap-6 sm:hidden">
        <button
          onClick={() => onMove(-1)}
          data-probe="gal-prev"
          aria-label={ui.fyp.prev}
          className="rounded-full bg-white/15 p-3 text-white ring-1 ring-white/25 backdrop-blur transition-colors active:bg-white/30"
        >
          <Prev size={22} />
        </button>
        <p className="min-w-16 text-center font-mono text-xs text-white/70">
          {state.index + 1} / {state.list.length}
        </p>
        <button
          onClick={() => onMove(1)}
          data-probe="gal-next"
          aria-label={ui.fyp.next}
          className="rounded-full bg-white/15 p-3 text-white ring-1 ring-white/25 backdrop-blur transition-colors active:bg-white/30"
        >
          <Next size={22} />
        </button>
      </div>
      <div className="pointer-events-none mt-3 sm:hidden">
        <p className="font-mono text-[11px] text-white/50">
          {zoom ? ui.zoom.toFit : ui.zoom.toActual}
        </p>
      </div>
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label={ui.fyp.closeViewer}
        className="absolute end-4 top-4 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/80"
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMove(-1)
        }}
        data-probe="gal-prev"
        aria-label={ui.fyp.prev}
        className="absolute start-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/80 sm:block"
      >
        <Prev size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMove(1)
        }}
        data-probe="gal-next"
        aria-label={ui.fyp.next}
        className="absolute end-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/80 sm:block"
      >
        <Next size={20} />
      </button>
      <p className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-mono text-xs text-white/70 sm:block">
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
  const ui = useUi()
  const [box, setBox] = useState<LightboxState>(null)

  const move = (d: number) =>
    setBox((b) => (b ? { ...b, index: (b.index + d + b.list.length) % b.list.length } : b))

  return (
    <div className="mt-14 space-y-12">
      <Reveal>
        <StripLabel kicker={ui.fyp.appKicker} note={ui.fyp.appNote} />
        <ScrollStrip className="flex gap-3 overflow-x-auto md:gap-4">
          {appShots.map((src, i) => (
            <button
              key={src}
              onClick={() => setBox({ list: appShots, index: i })}
              aria-label={ui.fyp.appScreenAria(i + 1)}
              className="shrink-0 overflow-hidden rounded-2xl border border-line transition-transform hover:-translate-y-1 dark:border-nline"
            >
              <img
                src={src}
                alt={ui.fyp.appScreenAlt(i + 1)}
                loading="lazy"
                className="h-72 w-auto md:h-80"
              />
            </button>
          ))}
        </ScrollStrip>
      </Reveal>

      <Reveal>
        <StripLabel kicker={ui.fyp.panelKicker} note={ui.fyp.panelNote} />
        <ScrollStrip className="flex snap-x snap-proximity gap-3 overflow-x-auto md:gap-4">
          {panelShots.map((src, i) => (
            <button
              key={src}
              onClick={() => setBox({ list: panelShots, index: i })}
              aria-label={ui.fyp.panelAria(i + 1)}
              className="shrink-0 snap-start overflow-hidden rounded-xl border border-line transition-transform hover:-translate-y-1 dark:border-nline"
            >
              <img
                src={src}
                alt={ui.fyp.panelAlt(i + 1)}
                loading="lazy"
                className="h-40 w-auto md:h-52"
              />
            </button>
          ))}
        </ScrollStrip>
      </Reveal>

      <AnimatePresence>
        {box && <Lightbox state={box} onClose={() => setBox(null)} onMove={move} />}
      </AnimatePresence>
    </div>
  )
}
