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
  { value: 'A+', label: 'final grade' },
  { value: '49/49', label: 'test cases passed' },
  { value: '31', label: 'UAT participants' },
  { value: '3', label: 'user roles served' },
]

const fypTech = ['Flutter (Dart)', 'Laravel (PHP)', 'MySQL', 'REST API', 'Firebase', 'Stripe']

export function Fyp() {
  return (
    <Section id="fyp" kicker="Final Year Project" title="Multi-Store Management System">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-5 text-sm leading-relaxed text-zinc-700 lg:col-span-3 dark:text-zinc-300">
          <Reveal>
            <p>
              My final year project solved a real problem for a real client: Sahel Retail Ltd, a
              multi-branch retailer in N&apos;Djamena, Chad, ran every store on paper records and
              spreadsheets, with no shared inventory view and no way for a customer to buy without
              walking into a branch.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              I designed and built a complete commerce platform around it: a Flutter mobile app
              where customers browse, pay by card, wallet or cash on delivery, and track orders on a
              live timeline, backed by Laravel admin and seller web panels on one MySQL backend,
              with role-based access control, seller approval gates, store activation, promo codes
              and revenue analytics.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p>
              The system passed all 49 test cases, went through user acceptance testing with 31
              respondents including the client&apos;s own management, and earned an A+. A research
              paper I co-authored on the system was accepted for publication in UTHM&apos;s Applied
              Information Technology and Computer Science (AITCS) journal.
            </p>
          </Reveal>
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
              <Reveal key={f.label} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 text-center dark:border-nline dark:bg-panel">
                  <span className="font-display text-3xl font-bold text-accentInk dark:text-accentSoft md:text-4xl">
                    {f.value}
                  </span>
                  <p className="mt-2 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {f.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <FypGallery />

      <Reveal className="mt-14 space-y-3">
        <PhotoMarquee images={rowA} heightClass="h-40 md:h-52" />
        <PhotoMarquee images={rowB} reverse heightClass="h-40 md:h-52" />
      </Reveal>
    </Section>
  )
}
