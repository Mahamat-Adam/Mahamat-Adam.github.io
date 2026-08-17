import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Horizontal scroller with a progress indicator underneath, shown on small
 * screens only: mobile browsers hide their scrollbars until you drag, so
 * there is otherwise no sign that the strip continues past the edge.
 */
export function ScrollStrip({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ width: 0, left: 0, needed: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const { scrollWidth, clientWidth, scrollLeft } = el
    const needed = scrollWidth > clientWidth + 4
    if (!needed) {
      setBar({ width: 0, left: 0, needed: false })
      return
    }
    const ratio = clientWidth / scrollWidth
    const maxScroll = scrollWidth - clientWidth
    setBar({
      width: Math.max(ratio * 100, 12),
      left: (scrollLeft / maxScroll) * (100 - Math.max(ratio * 100, 12)),
      needed: true,
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    // lazy images change the content width after mount, and a ResizeObserver
    // on the container never sees that: its own box does not change
    el.addEventListener('load', measure, true)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const settle = setTimeout(measure, 800)
    return () => {
      el.removeEventListener('scroll', measure)
      el.removeEventListener('load', measure, true)
      ro.disconnect()
      clearTimeout(settle)
    }
  }, [measure])

  // A mouse wheel only produces deltaY, and a horizontal scroller ignores it, so
  // on a desktop with an ordinary mouse these strips could not be scrolled at all.
  // Map the vertical wheel onto horizontal movement, but hand the event back to the
  // page once the strip reaches either end, otherwise the pointer gets trapped and
  // the page stops scrolling while the cursor is over a strip.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return // nothing to scroll
      if (e.deltaX !== 0) return // a trackpad is already sending horizontal intent
      const atStart = e.deltaY < 0 && el.scrollLeft <= 0
      const atEnd = e.deltaY > 0 && el.scrollLeft >= max - 1
      if (atStart || atEnd) return
      e.preventDefault()
      el.scrollLeft = Math.min(max, Math.max(0, el.scrollLeft + e.deltaY))
    }
    // passive: false, or preventDefault is ignored and the page scrolls anyway
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // The scroller is pinned LTR: screenshots carry no reading order, and under RTL
  // scrollLeft counts down from zero, which would run the progress bar below
  // backwards while the thumb is still positioned from the physical left.
  return (
    <div>
      <div ref={ref} dir="ltr" className={`strip-scroll ${className}`}>
        {children}
      </div>
      {bar.needed && (
        <div className="mt-3 h-1 w-full rounded-full bg-line md:hidden dark:bg-nline">
          <div
            className="h-full rounded-full bg-zinc-400 transition-[left,width] duration-150 dark:bg-zinc-500"
            style={{ width: `${bar.width}%`, marginLeft: `${bar.left}%` }}
          />
        </div>
      )}
    </div>
  )
}
