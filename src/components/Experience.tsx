import { education, experience, skillGroups } from '../data/profile'
import { FieldRoleCard } from './FieldRoleCard'
import { PhotoMarquee } from './PhotoMarquee'
import { Reveal } from './Reveal'
import { Section } from './Section'

const officeImages = Array.from(
  { length: 8 },
  (_, i) => `/img/awesomeree/aw${String(i + 1).padStart(2, '0')}.jpg`,
)

export function Experience() {
  return (
    <Section id="experience" kicker="Experience" title="Where I've been building">
      {/* min-w-0 on every grid child: without it a track stretches to the
 photo strip's full content width instead of the viewport. */}
      <div className="grid gap-8 lg:grid-cols-3">
        <Reveal className="order-1 min-w-0 lg:col-span-2">
          <article className="h-full rounded-2xl border border-line bg-card p-7 md:p-9 dark:border-nline dark:bg-panel">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-bold md:text-2xl">{experience.role}</h3>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {experience.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-accentInk dark:text-accentSoft">
              {experience.company} · {experience.location}
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {experience.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* stacked: strip follows the internship card it belongs to;
            desktop keeps education beside the internship card */}
        <Reveal delay={0.1} className="order-5 min-w-0 lg:order-2">
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card dark:border-nline dark:bg-panel">
            <div className="p-7">
              <h3 className="font-display text-lg font-bold">Education</h3>
              <p className="mt-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-accentInk dark:text-accentSoft">{education.school}</p>
              <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {education.period} · {education.gpa}
              </p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{education.note}</p>
              <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {education.coursework}
              </p>
            </div>
            <img
              src="/img/education/uthm.jpg"
              alt="Universiti Tun Hussein Onn Malaysia campus"
              loading="lazy"
              className="mt-auto h-48 w-full object-cover lg:h-56"
            />
          </article>
        </Reveal>

        <Reveal delay={0.14} className="order-2 min-w-0 lg:order-3 lg:col-span-3">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            At the office
          </p>
          <PhotoMarquee images={officeImages} heightClass="h-40 md:h-52" />
        </Reveal>

        <Reveal delay={0.16} className="order-3 min-w-0 lg:order-4 lg:col-span-3">
          <article className="rounded-2xl border border-line bg-card p-7 md:p-9 dark:border-nline dark:bg-panel">
            <h3 className="font-display text-lg font-bold">Toolbox</h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((g) => (
                <div key={g.name}>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {g.name}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-zinc-700 dark:border-nline dark:text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.18} className="order-4 min-w-0 lg:order-5 lg:col-span-3">
          <FieldRoleCard />
        </Reveal>
      </div>
    </Section>
  )
}
