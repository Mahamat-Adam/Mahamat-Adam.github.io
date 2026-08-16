import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id: string
  kicker: string
  title: string
  children: ReactNode
  className?: string
  center?: boolean
}

export function Section({ id, kicker, title, children, className = '', center = false }: Props) {
  return (
    <section id={id} className={`scroll-mt-4 py-10 sm:py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <Reveal className={center ? 'text-center' : ''}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accentInk dark:text-accentSoft">
            {kicker}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,5.5vw,2.25rem)] font-bold">
            {title}
          </h2>
        </Reveal>
        <div className="mt-7 sm:mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}
