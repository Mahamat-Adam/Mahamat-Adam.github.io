import type { ReactElement } from 'react'
import type { LangCode } from '../lib/lang'

/**
 * Inline SVG rather than emoji. Windows ships no flag glyphs, so an emoji flag
 * renders as its two-letter region code instead: a visitor on Windows, which is
 * most of them, would see "GB" and "FR" as plain text where the flags should be.
 * Verified in Chrome on this machine before choosing this route.
 *
 * Drawn at a 3:2 ratio and kept deliberately plain: at 16px nothing finer than a
 * band or a stripe survives, so detail would only turn to mush.
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
  // Saudi Arabia. The shahada is real calligraphy and no glyph of it survives at
  // 18px, so it is suggested here rather than spelled out: a connecting baseline
  // with ascenders, which is what the eye reads as Arabic script at this size.
  // The sword sits below it with the point to the hoist, as on the flag.
  ar: (
    <>
      <rect width="30" height="20" fill="#006C35" />
      <g fill="none" stroke="#fff" strokeWidth="1.05" strokeLinecap="round">
        <path d="M5 8.9c1.7.9 3.4.9 5.1 0s3.4-.9 5.1 0 3.4.9 5.1 0 3.4-.9 4.7 0" />
        <path d="M6.6 5.8v2.9M10.6 5.4v3.3M15 5.9v2.7M18.9 5.4v3.3M23.2 5.8v2.9" />
      </g>
      <path d="M4.4 13.6 8 12.3h13.2v2.6H8z" fill="#fff" />
      <rect x="21.8" y="11.8" width="1.1" height="3.6" rx="0.3" fill="#fff" />
      <rect x="23.3" y="13" width="2.6" height="1.2" rx="0.6" fill="#fff" />
    </>
  ),
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
