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
  const [duration, setDuration] = useState(60)
  const row = [...images, ...images]

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const compute = () => {
      const half = el.scrollWidth / 2
      if (half > 0) setDuration(half / speed)
    }
    compute()
    // Row width grows as lazy images load, so keep the speed constant.
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [speed, images])

  // dir is pinned LTR below: photos carry no reading order, and the row's
  // margin-right gutter is what makes translateX(-50%) land exactly one copy in.
  // Mirroring it would move the gutter to the wrong side and the loop would seam.
  return (
    <div dir="ltr" className="overflow-hidden">
      <div
        ref={rowRef}
        className={`marquee-row ${reverse ? 'reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
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
