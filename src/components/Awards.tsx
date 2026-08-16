import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Award, BadgeCheck, Maximize2 } from 'lucide-react'
import { certifications, deansList, spokenLanguages } from '../data/profile'
import { DocViewer } from './DocViewer'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Awards() {
  const [certOpen, setCertOpen] = useState(false)
  return (
    <Section id="awards" kicker="Awards & Certifications" title="On the record">
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="min-w-0 lg:col-span-3">
          <article className="grid overflow-hidden rounded-2xl border border-line bg-card sm:grid-cols-2 dark:border-nline dark:bg-panel">
            <img
              src={deansList.photo}
              alt="Mahamat holding his Dean's List certificates at UTHM"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover object-[50%_28%] sm:aspect-auto sm:h-full"
            />
            <div className="flex flex-col p-6 md:p-7">
              <Award className="text-accentInk dark:text-accentSoft" size={26} />
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                {deansList.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {deansList.detail}
              </p>
              <button
                onClick={() => setCertOpen(true)}
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accentInk hover:underline dark:text-accentSoft"
              >
                View certificate <Maximize2 size={13} />
              </button>
            </div>
          </article>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-8 lg:col-span-2">
          <Reveal delay={0.1}>
            <article className="rounded-2xl border border-line bg-card p-5 sm:p-7 dark:border-nline dark:bg-panel">
              <h3 className="font-display text-lg font-bold">Certifications</h3>
              <ul className="mt-4 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-3">
                    <BadgeCheck
                      size={17}
                      className="mt-0.5 shrink-0 text-accentInk dark:text-accentSoft"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {c.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.18}>
            <article className="rounded-2xl border border-line bg-card p-5 sm:p-7 dark:border-nline dark:bg-panel">
              <h3 className="font-display text-lg font-bold">Spoken languages</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {spokenLanguages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-zinc-700 dark:border-nline dark:text-zinc-300"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {certOpen && (
          <DocViewer
            title="Dean's List certificate"
            image="/img/cert-preview.jpg"
            onClose={() => setCertOpen(false)}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
