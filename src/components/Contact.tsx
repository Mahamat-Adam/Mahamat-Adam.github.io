import { useUi } from '../data/ui'
import { Download, Linkedin, MapPin } from 'lucide-react'
import { useContent } from '../data/content'
import { profile } from '../data/profile'
import { openExternal } from '../lib/openExternal'
import { ContactForm } from './ContactForm'
import { GithubIcon } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  const ui = useUi()
  const { location } = useContent()
  return (
    <Section id="contact" kicker={ui.contact.kicker} title={ui.contact.title} center>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {ui.contact.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-line pt-8 dark:border-nline">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternal(e, profile.linkedin)}
                style={{ touchAction: 'manipulation' }}
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              {profile.github !== '#' && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => openExternal(e, profile.github)}
                  style={{ touchAction: 'manipulation' }}
                  className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
              )}
              <a
                href={profile.cvPath}
                download
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline"
              >
                <Download size={15} /> CV
              </a>
            </div>

            <p className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-500">
              <MapPin size={13} /> {location}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
