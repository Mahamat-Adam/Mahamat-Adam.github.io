import { Code2 } from 'lucide-react'
import { useContent } from '../data/content'
import { useUi } from '../data/ui'
import { FypGallery } from './FypGallery'
import { PhotoMarquee } from './PhotoMarquee'
import { Reveal } from './Reveal'
import { Section } from './Section'

const fypImages = Array.from(
  { length: 18 },
  (_, i) => `/img/fyp/f${String(i + 1).padStart(2, '0')}.jpg`,
)
const rowA = fypImages.filter((_, i) => i % 2 === 0)
const rowB = fypImages.filter((_, i) => i % 2 === 1)

const facts = [
  { value: 'A+', key: 'grade' },
  { value: '49/49', key: 'tests' },
  { value: '31', key: 'uat' },
  { value: '3', key: 'roles' },
] as const

const fypTech = ['Flutter (Dart)', 'Laravel (PHP)', 'MySQL', 'REST API', 'Firebase', 'Stripe']

export function Fyp() {
  const ui = useUi()
  const { fypIntro } = useContent()
  return (
    <Section id="fyp" kicker={ui.fyp.kicker} title={ui.fyp.title}>
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-5 text-sm leading-relaxed text-zinc-700 lg:col-span-3 dark:text-zinc-300">
          {fypIntro.map((t, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p>{t}</p>
            </Reveal>
          ))}
          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {fypTech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-1 text-xs text-zinc-600 dark:border-nline dark:text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 min-[340px]:grid-cols-2 min-[340px]:gap-6">
            {facts.map((f, i) => (
              <Reveal key={f.key} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 text-center dark:border-nline dark:bg-panel">
                  <span className="font-display text-3xl font-bold text-accentInk dark:text-accentSoft md:text-4xl">
                    {f.value}
                  </span>
                  <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {ui.fyp.facts[f.key]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <FypGallery />

      {/* The repository is not public yet, so the invitation stands in for it:
          better to offer a conversation than to leave the question unanswered. */}
      <Reveal className="mt-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-line bg-card/60 px-6 py-6 text-center dark:border-nline dark:bg-panel/60 sm:flex-row sm:text-start">
          <Code2 size={20} className="shrink-0 text-accentInk dark:text-accentSoft" />
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {ui.fyp.codeNote}
          </p>
          <a
            href="#contact"
            className="shrink-0 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {ui.fyp.codeCta}
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-14 space-y-3">
        <PhotoMarquee images={rowA} heightClass="h-40 md:h-52" />
        <PhotoMarquee images={rowB} reverse heightClass="h-40 md:h-52" />
      </Reveal>
    </Section>
  )
}
