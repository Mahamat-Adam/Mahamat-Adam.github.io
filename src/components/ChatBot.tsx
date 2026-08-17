import { useUi } from '../data/ui'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { useQaBank } from '../data/content'
import { starterChips, type QA } from '../data/qa'
import { useLang } from '../lib/lang'
import { BackToTop } from './BackToTop'

type Message = {
  role: 'bot' | 'user'
  text: string
  chips?: string[]
  /** characters currently shown (bot messages type themselves out) */
  shown: number
}

/**
 * Strips the definite article and the pronoun endings Arabic attaches directly to
 * words. Deliberately shallow, not a real stemmer: the suffix only comes off when
 * at least three characters remain, so short words are left intact rather than
 * being ground down into something that collides with everything.
 */
const stemWord = (w: string) => {
  const x = w.replace(/^(وال|فال|بال|كال|لل|ال)/, '')
  const suffix = x.match(/(هما|كما|هن|هم|كن|كم|نا|ها|ه|ك)$/)
  return suffix && x.length - suffix[0].length >= 3 ? x.slice(0, -suffix[0].length) : x
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    // Keep letters of ANY script plus digits. The previous version stripped
    // everything outside a-z0-9, which reduced an Arabic question to an empty
    // string, so it could never match a single keyword.
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    // Arabic diacritics and tatweel are decorative; drop them so a keyword matches
    // whether or not the visitor typed them.
    .replace(/[ً-ْـ]/g, '')
    // Fold the spellings Arabic writers mix freely, so one keyword covers them all:
    // the hamza forms of alef, alef maqsura, and ta marbuta.
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim()
    // Arabic glues the definite article and possessive pronouns onto the word, so
    // "مهاراته" and "المشاريع" would never equal the keywords "مهارات" and "مشاريع"
    // under whole-word matching. Both sides go through the same light stemmer.
    .split(' ')
    .map(stemWord)
    .join(' ')

function match(input: string, bank: QA[]): QA | null {
  // Whole-word/phrase matching only; substring matches produce false hits
  // ("intern" inside "international", "what are you" inside "what are your").
  const q = ` ${normalize(input)} `
  let best: QA | null = null
  let bestScore = 0
  for (const qa of bank) {
    let score = 0
    for (const kw of qa.keywords) {
      const k = normalize(kw)
      if (k && q.includes(` ${k} `)) score += k.length
    }
    if (score > bestScore) {
      bestScore = score
      best = qa
    }
  }
  return bestScore >= 2 ? best : null
}

const chipsFor = (bank: QA[], ids: string[]) => ids.filter((id) => bank.some((q) => q.id === id))

// Built from ui so it follows the language; a module const could not.
const makeGreeting = (text: string): Message => ({
  role: 'bot',
  text,
  chips: starterChips,
  shown: 0,
})

export function ChatBot() {
  const ui = useUi()
  const [open, setOpen] = useState(false)
  const { lang } = useLang()
  const { bank, fallback } = useQaBank()
  const [messages, setMessages] = useState<Message[]>(() => [makeGreeting(ui.chat.greeting)])

  // Switching language starts the conversation over: the answers already on
  // screen were written in the other language, so keeping them would leave a
  // half-and-half transcript.
  useEffect(() => {
    setMessages([makeGreeting(ui.chat.greeting)])
  }, [lang, ui.chat.greeting])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [inviteDismissed, setInviteDismissed] = useState(false)
  // the band of screen still visible above the keyboard
  const [band, setBand] = useState({ open: false, top: 0, height: 0 })
  // on phones the invite waits until the visitor has scrolled off the hero,
  // and goes away again when they return to the top
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const showInvite = !open && !inviteDismissed && (!isPhone || scrolledPastHero)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setIsPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // A fixed element is placed against the layout viewport, which does not
  // shrink when the keyboard opens. Rather than infer the keyboard height by
  // subtraction (iOS also moves its own toolbars, so that overshoots), pin
  // the panel to the visible band that visualViewport reports directly.
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const update = () => {
      const hidden = window.innerHeight - vv.height
      setBand({ open: hidden > 120, top: vv.offsetTop, height: vv.height })
    }
    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])

  // Type out unfinished bot messages (all of them, so an interrupted
  // answer still finishes instead of freezing mid-sentence).
  useEffect(() => {
    if (!messages.some((m) => m.role === 'bot' && m.shown < m.text.length)) return
    const t = setInterval(() => {
      setMessages((ms) =>
        ms.map((m) =>
          m.role === 'bot' && m.shown < m.text.length
            ? { ...m, shown: Math.min(m.text.length, m.shown + 3) }
            : m,
        ),
      )
    }, 18)
    return () => clearInterval(t)
  }, [messages])

  // Close the panel on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // On phones the panel covers most of the screen, so hold the page still
  // while it is open. Desktop keeps scrolling normally behind it.
  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 639px)').matches) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // The invite stays until the visitor actually opens the chat; after that it
  // has done its job and does not come back.
  useEffect(() => {
    if (open) setInviteDismissed(true)
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, busy])

  const respond = (userText: string, qa: QA | null) => {
    setMessages((ms) => [...ms, { role: 'user', text: userText, shown: userText.length }])
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      if (qa) {
        setMessages((ms) => [
          ...ms,
          { role: 'bot', text: qa.answer, chips: chipsFor(bank, qa.followups), shown: 0 },
        ])
      } else {
        setMessages((ms) => [
          ...ms,
          { role: 'bot', text: fallback, chips: chipsFor(bank, ['contact', 'who']), shown: 0 },
        ])
      }
    }, 650)
  }

  const send = () => {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    respond(text, match(text, bank))
  }

  const tapChip = (id: string) => {
    if (busy) return
    const qa = bank.find((q) => q.id === id)
    if (qa) respond(qa.chip, qa)
  }

  return (
    <>
      {/* the whole stack rides above the keyboard, so the button never ends
          up floating in the middle of the page */}
      <div
        className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3"
        style={band.open ? { top: band.top + band.height - 68, bottom: 'auto' } : undefined}
      >
        {!band.open && <BackToTop />}

        <AnimatePresence>
          {showInvite && (
            <motion.button
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              // exit needs its own timing: the entrance delay below would
              // otherwise apply on the way out too, leaving it on screen
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2, delay: 0 } }}
              transition={{
                opacity: { delay: 1.8, duration: 0.35 },
                scale: { delay: 1.8, duration: 0.35 },
              }}
              className={`rounded-2xl rounded-ee-md border border-line bg-card px-3.5 py-1.5 text-sm font-medium shadow-lg dark:border-nline dark:bg-panel ${
                reduced ? '' : 'float-bob'
              }`}
            >
              {ui.chat.invite}
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((o) => !o)}
          data-probe="chat"
          aria-label={ui.chat.launcher}
          aria-expanded={open}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            style={
              band.open
                ? {
                    // sit inside the visible band, leaving room for the button
                    top: band.top + 8,
                    bottom: 'auto',
                    height: Math.max(180, band.height - 84),
                    maxHeight: 'none',
                  }
                : undefined
            }
            data-probe="chat-panel"
            className="fixed bottom-24 end-4 start-4 z-40 flex h-[65svh] max-h-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl sm:start-auto sm:w-96 dark:border-nline dark:bg-panel"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 dark:border-nline">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white">
                M
              </div>
              <div>
                <p className="font-display text-sm font-bold">{ui.chat.title}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {ui.chat.subtitle}
                </p>
              </div>
            </div>

            <div
              ref={listRef}
              aria-live="polite"
              // contained on phones, where the panel covers the screen; on
              // desktop there is room, so the page keeps scrolling behind
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:overscroll-auto"
            >
              {messages.map((m, i) => (
                <div key={i}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'ms-auto w-fit max-w-[85%] rounded-2xl rounded-ee-md bg-accent px-3.5 py-2 text-sm text-white'
                        : 'w-fit max-w-[90%] rounded-2xl rounded-es-md bg-paper px-3.5 py-2 text-sm leading-relaxed text-zinc-800 dark:bg-night dark:text-zinc-200'
                    }
                  >
                    {m.role === 'bot' ? m.text.slice(0, m.shown) : m.text}
                  </div>
                  {m.role === 'bot' && m.chips && m.shown >= m.text.length && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.chips.map((id) => {
                        const qa = bank.find((q) => q.id === id)
                        if (!qa) return null
                        return (
                          <button
                            key={id}
                            onClick={() => tapChip(id)}
                            className="rounded-full border border-line px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline dark:text-zinc-400"
                          >
                            {qa.chip}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
              {busy && (
                <div className="w-fit rounded-2xl rounded-es-md bg-paper px-4 py-3 dark:bg-night">
                  <span className="typing-dot" />
                  <span className="typing-dot mx-1" />
                  <span className="typing-dot" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-line p-3 dark:border-nline">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && send()}
                placeholder={ui.chat.placeholder}
                aria-label={ui.chat.inputAria}
                // 16px minimum: below that, iOS Safari zooms the page on focus
                className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-base outline-none placeholder:text-zinc-400 focus:border-accent dark:border-nline dark:placeholder:text-zinc-500"
              />
              <button
                onClick={send}
                aria-label={ui.chat.send}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
                disabled={!input.trim() || busy}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
