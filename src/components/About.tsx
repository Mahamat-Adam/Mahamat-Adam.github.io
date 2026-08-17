import { useUi } from '../data/ui'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useContent } from '../data/content'
import { PhotoMarquee } from './PhotoMarquee'
import { Reveal } from './Reveal'
import { Section } from './Section'

const aboutImages = Array.from(
  { length: 11 },
  (_, i) => `/img/about/a${String(i + 1).padStart(2, '0')}.jpg`,
)

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1100
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span
      ref={ref}
      className="font-display text-4xl font-bold text-accentInk dark:text-accentSoft md:text-5xl"
    >
      {n}
      {suffix && <span className="text-xl md:text-2xl">{suffix}</span>}
    </span>
  )
}

export function About() {
  const ui = useUi()
  const { aboutParagraphs, stats } = useContent()
  return (
    <Section id="about" kicker={ui.about.kicker} title={ui.about.title}>
      <div className="grid gap-10 md:grid-cols-5">
        <div className="space-y-5 text-base leading-relaxed text-zinc-700 md:col-span-3 dark:text-zinc-300">
          {aboutParagraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="md:col-span-2">
          {/* single column through the tablet range, where two cards leave the
 labels too narrow and long words split mid-word */}
          <div className="grid grid-cols-1 gap-4 min-[340px]:grid-cols-2 min-[340px]:gap-6 md:grid-cols-1 lg:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 dark:border-nline dark:bg-panel">
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mt-14">
        <PhotoMarquee images={aboutImages} />
      </Reveal>
    </Section>
  )
}
