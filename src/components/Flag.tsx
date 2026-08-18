import type { ReactElement } from 'react'
import type { LangCode } from '../lib/lang'
import { saudiArabia } from './saudiFlag'

/**
 * Inline SVG rather than emoji. Windows ships no flag glyphs, so an emoji flag
 * renders as its two-letter region code instead: a visitor on Windows, which is
 * most of them, would see "GB" and "FR" as plain text where the flags should be.
 * Verified in Chrome on this machine before choosing this route.
 *
 * Drawn at a 3:2 ratio. The ones made of bands and crosses are drawn here and
 * kept plain, since at 18px nothing finer than a band survives. Saudi Arabia is
 * not one of those: its shahada and sword are specific shapes, so it brings the
 * real artwork rather than an impression of it, and lives in its own file
 * because that artwork is a hundred lines long.
 *
 * Being inline, these cannot fail to load the way an image file can. The one
 * remaining gap is a code with no drawing, which returns null: the flag is always
 * a sibling of its label, never a replacement for it, so the language name stands
 * on its own and the row still reads correctly.
 */
const flags: Record<string, ReactElement> = {
  en: (
    // United Kingdom
    <>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2" />
      <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6.5" />
      <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="4" />
    </>
  ),
  ar: saudiArabia,
  fr: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="10" height="20" fill="#000091" />
      <rect x="20" width="10" height="20" fill="#E1000F" />
    </>
  ),
  es: (
    <>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </>
  ),
}

export function Flag({ code, className = '' }: { code: LangCode; className?: string }) {
  const art = flags[code]
  if (!art) return null

  return (
    <svg
      width={18}
      height={12}
      viewBox="0 0 30 20"
      focusable="false"
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-[2px] ring-1 ring-black/10 dark:ring-white/15 ${className}`}
    >
      {art}
    </svg>
  )
}
