import { useState } from 'react'
import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { contactTopics, profile } from '../data/profile'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

const field =
  'w-full rounded-xl border border-line bg-transparent px-4 py-3 text-base outline-none transition-colors placeholder:text-zinc-400 focus:border-accent dark:border-nline dark:placeholder:text-zinc-500'
const label = 'mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  // Radios carry no native `required` here: a visually hidden control cannot host
  // the browser's validation bubble, so the check is ours and the message is inline.
  const [topicError, setTopicError] = useState(false)

  // Only built when the service fails, so the address stays out of the page
  // in the normal case.
  const fallbackHref = () => {
    const address = `${profile.emailUser}@${profile.emailDomain}`
    const subject = topic ? `${topic} - ${name}` : `Portfolio message - ${name}`
    const body = `${message}\n\n--\n${name}\n${email}`
    return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!topic) {
      setTopicError(true)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.formKey,
          subject: `${topic} - ${name}`,
          from_name: name,
          replyto: email,
          name,
          email,
          topic,
          message,
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) setStatus('sent')
      else setStatus('failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div
        aria-live="polite"
        className="rounded-2xl border border-line px-6 py-10 text-center dark:border-nline"
      >
        <CheckCircle2 className="mx-auto text-accent" size={30} />
        <p className="mt-4 font-display text-lg text-ink dark:text-paper">Message sent</p>
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          Thanks {name.split(' ')[0]}, it landed in my inbox. I&apos;ll reply to {email}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="text-left">
      {/* Bots fill hidden fields; people never see this one. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
      </div>

      {/* Pills rather than a <select>: a native dropdown's hover highlight is drawn
          by the OS and cannot take the brand colour, and four fixed choices do not
          need a popup at all. Real radios keep arrow-key navigation for free. */}
      <fieldset className="mt-4">
        <legend className={label}>What is it about</legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t}
                checked={topic === t}
                onChange={() => {
                  setTopic(t)
                  setTopicError(false)
                }}
                className="peer sr-only"
              />
              <span className="block rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accentInk peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 dark:border-nline dark:hover:text-accentSoft dark:peer-checked:text-white dark:peer-focus-visible:ring-offset-night">
                {t}
              </span>
            </label>
          ))}
        </div>
        {topicError && (
          <p aria-live="polite" className="mt-2 text-xs text-accentInk dark:text-accentSoft">
            Pick one of these so I know what your message is about.
          </p>
        )}
      </fieldset>

      <div className="mt-4">
        <label className={label} htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me what you have in mind."
          className={`${field} resize-y`}
        />
      </div>

      <div className="mt-5 flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95 disabled:scale-100 disabled:opacity-60"
        >
          <Send size={15} /> {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>

        {status === 'failed' && (
          <div
            aria-live="polite"
            className="flex flex-col items-center gap-2 text-center text-sm text-zinc-600 dark:text-zinc-400"
          >
            <p className="flex items-center gap-1.5 text-accentInk dark:text-accentSoft">
              <AlertCircle size={15} aria-hidden="true" /> That didn&apos;t go through.
            </p>
            <a
              href={fallbackHref()}
              className="underline decoration-line underline-offset-4 transition-colors hover:text-accentInk dark:hover:text-accentSoft"
            >
              Send it by email instead
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
