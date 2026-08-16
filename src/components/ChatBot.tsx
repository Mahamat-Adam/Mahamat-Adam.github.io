import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { fallbackAnswer, qaBank, starterChips, type QA } from '../data/qa'
import { BackToTop } from './BackToTop'

type Message = {
  role: 'bot' | 'user'
  text: string
  chips?: string[]
  /** characters currently shown (bot messages type themselves out) */
  shown: number
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

function match(input: string): QA | null {
  // Whole-word/phrase matching only; substring matches produce false hits
  // ("intern" inside "international", "what are you" inside "what are your").
  const q = ` ${normalize(input)} `
  let best: QA | null = null
  let bestScore = 0
  for (const qa of qaBank) {
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

const chipsFor = (ids: string[]) => ids.filter((id) => qaBank.some((q) => q.id === id))

const greeting: Message = {
  role: 'bot',
  text: "Hi! I'm MahamatBot, Mahamat's scripted assistant. Ask me anything about him, or tap a question below.",
  chips: starterChips,
  shown: 0,
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [inviteDismissed, setInviteDismissed] = useState(false)
  // the band of screen still visible above the keyboard
  const [band, setBand] = useState({ open: false, top: 0, height: 0 })
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const showInvite = !open && !inviteDismissed

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
          { role: 'bot', text: qa.answer, chips: chipsFor(qa.followups), shown: 0 },
        ])
      } else {
        setMessages((ms) => [
          ...ms,
          { role: 'bot', text: fallbackAnswer, chips: chipsFor(['contact', 'who']), shown: 0 },
        ])
      }
    }, 650)
  }

  const send = () => {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    respond(text, match(text))
  }

  const tapChip = (id: string) => {
    if (busy) return
    const qa = qaBank.find((q) => q.id === id)
    if (qa) respond(qa.chip, qa)
  }

  return (
    <>
      {/* the whole stack rides above the keyboard, so the button never ends
          up floating in the middle of the page */}
      <div
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
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
              className={`rounded-2xl rounded-br-md border border-line bg-card px-3.5 py-1.5 text-sm font-medium shadow-lg dark:border-nline dark:bg-panel ${
                reduced ? '' : 'float-bob'
              }`}
            >
              Questions?
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label="Chat with MahamatBot"
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
            className="fixed bottom-24 right-4 left-4 z-40 flex h-[65svh] max-h-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl sm:left-auto sm:w-96 dark:border-nline dark:bg-panel"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 dark:border-nline">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white">
                M
              </div>
              <div>
                <p className="font-display text-sm font-bold">MahamatBot</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  scripted assistant
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
                        ? 'ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm text-white'
                        : 'w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-paper px-3.5 py-2 text-sm leading-relaxed text-zinc-800 dark:bg-night dark:text-zinc-200'
                    }
                  >
                    {m.role === 'bot' ? m.text.slice(0, m.shown) : m.text}
                  </div>
                  {m.role === 'bot' && m.chips && m.shown >= m.text.length && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.chips.map((id) => {
                        const qa = qaBank.find((q) => q.id === id)
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
                <div className="w-fit rounded-2xl rounded-bl-md bg-paper px-4 py-3 dark:bg-night">
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
                placeholder="Ask about Mahamat..."
                aria-label="Ask about Mahamat"
                // 16px minimum: below that, iOS Safari zooms the page on focus
                className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-base outline-none placeholder:text-zinc-400 focus:border-accent dark:border-nline dark:placeholder:text-zinc-500"
              />
              <button
                onClick={send}
                aria-label="Send"
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
