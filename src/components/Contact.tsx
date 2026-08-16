import { useState } from 'react'
import { Copy, Download, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { openExternal } from '../lib/openExternal'
import { GithubIcon } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const address = `${profile.emailUser}@${profile.emailDomain}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable; the address is visible to copy manually */
    }
  }

  return (
    <Section id="contact" kicker="Contact" title="Let's talk" center>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Whether it&apos;s a role, a project or just a good conversation about the web, my inbox
            is open.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center gap-4">
            {revealed ? (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${address}`}
                  className="rounded-full bg-accent px-6 py-3 font-mono text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  {address}
                </a>
                <button
                  onClick={copy}
                  className="flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline"
                >
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <Mail size={15} /> Email me
              </button>
            )}

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

            <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-500">
              <MapPin size={13} /> {profile.location}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
