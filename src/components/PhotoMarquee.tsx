import { useEffect, useRef, useState } from 'react'

type Props = {
  images: string[]
  /** scroll speed in px/s; duration is derived from the measured row width,
 so strips with different content move at the same visual speed */
  speed?: number
  reverse?: boolean
  heightClass?: string
}

export function PhotoMarquee({
  images,
  speed = 90,
  reverse = false,
  heightClass = 'h-52 md:h-64',
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  // null until the row has stopped growing: see the effect below for why it must
  // not start moving before then
  const [duration, setDuration] = useState<number | null>(null)
  const row = [...images, ...images]

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    let timer: number | undefined
    let waits = 0

    // Every width measured while the row is still filling is the wrong width. The
    // images are lazy, so the row starts near empty and grows as each one decodes,
    // and setting animation-duration on a RUNNING animation re-times it, which is
    // what was seen as a blink. Measured on the live site before this: seven changes
    // on one strip, 60s to 1.9s to 4.1s to 15.3s to 21.7s to 26.1s to 27.6s, and the
    // strips near the foot of the page were still settling eleven seconds in, which
    // is why it showed up while looking straight at them.
    //
    // So the row does not move until its final width is in. It is held on three
    // conditions, each of which a simpler version got wrong:
    //  - every image reports complete, because a strip below the fold measures its
    //    empty self long before it is near enough the viewport to start loading;
    //  - debounced, so a burst of images arriving together yields one width, not one
    //    per image;
    //  - paused until then, so there is no running animation to re-time and so
    //    nothing to see at the moment the real width lands.
    // A wall clock deadline was tried in place of the first and was worse: it
    // expires while the far strips are still untouched. The wait still gives up
    // eventually, since a strip frozen behind one image that never arrives would be
    // a worse bug than the blink.
    const measure = () => {
      const imgs = [...el.querySelectorAll('img')]
      if (imgs.length && !imgs.every((i) => i.complete) && waits++ < 60) return schedule()
      const half = el.scrollWidth / 2
      if (half > 0) setDuration(half / speed)
    }
    const schedule = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(measure, 500)
    }

    // Fires once on observe and again on every growth, so no separate first call.
    const ro = new ResizeObserver(schedule)
    ro.observe(el)
    return () => {
      window.clearTimeout(timer)
      ro.disconnect()
    }
  }, [speed, images])

  // dir is pinned LTR below: photos carry no reading order, and the row's
  // margin-right gutter is what makes translateX(-50%) land exactly one copy in.
  // Mirroring it would move the gutter to the wrong side and the loop would seam.
  return (
    <div dir="ltr" className="overflow-hidden">
      <div
        ref={rowRef}
        className={`marquee-row ${reverse ? 'reverse' : ''}`}
        style={{
          animationDuration: `${duration ?? 60}s`,
          animationPlayState: duration === null ? 'paused' : 'running',
        }}
      >
        {row.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className={`${heightClass} mr-3 w-auto select-none rounded-xl object-cover md:mr-4`}
          />
        ))}
      </div>
    </div>
  )
}
