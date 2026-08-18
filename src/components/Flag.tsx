import { useId } from 'react'
import type { ReactElement } from 'react'
import type { LangCode } from '../lib/lang'
import { saudiArabia } from './saudiFlag'

/**
 * The union flag, which is the one flag here that is not symmetrical. The red
 * saltire is counterchanged: in each quarter it sits against one side of the
 * white behind it, not down the middle, and which side alternates around the
 * centre. Drawing it centred is the usual mistake and reads as wrong to anyone
 * who knows the flag, so the diagonals are clipped to the quarter-triangles that
 * produce the offset, exactly as the flag is specified.
 *
 * A component rather than a plain element because that clip needs an id, and the
 * flag is drawn twice at once, in the language button and again in the open list.
 * useId gives each instance its own; the colons it puts in the value are stripped
 * because a url() reference cannot carry them.
 *
 * Specified on a 2:1 field and used here on the 3:2 one the other flags share, so
 * it is scaled unevenly. Squashing is what every flag set does with this one, and
 * it keeps the offset intact; letterboxing it instead would leave the row ragged.
 */
function UnionFlag() {
  const uid = useId().replace(/:/g, '')
  const clip = `uk${uid}`
  return (
    <g transform="scale(.5 .666667)">
      <clipPath id={clip}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clip})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  )
}

/**
 * Inline SVG rather than emoji. Windows ships no flag glyphs, so an emoji flag
 * renders as its two-letter region code instead: a visitor on Windows, which is
 * most of them, would see "GB" and "FR" as plain text where the flags should be.
 * Verified in Chrome on this machine before choosing this route.
 *
 * Drawn at a 3:2 ratio. France and Spain are arrangements of bands and are drawn
 * here in full, at their own colours; Spain goes without its arms, which at 18px
 * would be a smudge on the yellow and which the flag is still unmistakable
 * without. The other two are not bands: the union flag is above, and Saudi
 * Arabia brings the real artwork rather than an impression of it, in its own
 * file because that artwork is a hundred lines long.
 *
 * Being inline, these cannot fail to load the way an image file can. The one
 * remaining gap is a code with no drawing, which returns null: the flag is always
 * a sibling of its label, never a replacement for it, so the language name stands
 * on its own and the row still reads correctly.
 */
const flags: Record<string, ReactElement> = {
  en: <UnionFlag />,
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
