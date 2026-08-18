import { useLang, type LangCode } from '../lib/lang'
import * as ar from './content.ar'
import { es } from './content.es'
import { fr } from './content.fr'
import {
  aboutParagraphs,
  deansList,
  education,
  experience,
  fieldRole,
  fypIntro,
  profile,
  skillGroups,
  spokenLanguages,
  stats,
} from './profile'
import { projects, type Project } from './projects'
import { fallbackAnswer, qaBank, type QA } from './qa'
import { fallbackAnswerAr, qaBankAr } from './qa.ar'
import { qaEs } from './qa.es'
import { qaFr } from './qa.fr'

// English is the base. Every other language supplies an overlay of ONLY the text
// that differs, matched by key rather than array position, so numbers, image
// paths, links, accents and technology names can never drift between languages.
//
// Adding a language is one overlay file plus one line in each registry below.
export type Overlay = {
  aboutParagraphs: string[]
  fypIntro: string[]
  spokenLanguages: string[]
  location: string
  statLabels: Record<string, string>
  statSuffixes?: Record<string, string>
  skillGroupNames: Record<string, string>
  skillItems?: Record<string, string>
  experience: { role: string; period: string; location: string; bullets: string[] }
  fieldRole: {
    role: string
    period: string
    location: string
    summary: string
    detail: string[]
    highlightLabels: Record<string, string>
  }
  education: { degree: string; period: string; gpa: string; note: string; coursework: string }
  deansList: { title: string; detail: string }
  projects: Record<string, { category: string; blurb: string; detail: string[]; linkLabel?: string }>
}

// Arabic keeps its original named exports: that file has been reviewed line by
// line and is not worth churning just to change its shape.
const arabic: Overlay = {
  aboutParagraphs: ar.aboutParagraphsAr,
  fypIntro: ar.fypIntroAr,
  spokenLanguages: ar.spokenLanguagesAr,
  location: ar.locationAr,
  statLabels: ar.statLabelsAr,
  statSuffixes: ar.statSuffixesAr,
  skillGroupNames: ar.skillGroupNamesAr,
  skillItems: ar.skillItemsAr,
  experience: ar.experienceAr,
  fieldRole: ar.fieldRoleAr,
  education: ar.educationAr,
  deansList: ar.deansListAr,
  projects: ar.projectsAr,
}

const overlays: Partial<Record<LangCode, Overlay>> = { ar: arabic, fr, es }

export function useContent() {
  const { lang } = useLang()
  const o = overlays[lang]

  if (!o) {
    return {
      aboutParagraphs,
      fypIntro,
      spokenLanguages,
      location: profile.location,
      stats,
      skillGroups,
      experience,
      fieldRole,
      education,
      deansList,
    }
  }

  return {
    aboutParagraphs: o.aboutParagraphs,
    fypIntro: o.fypIntro,
    spokenLanguages: o.spokenLanguages,
    location: o.location,

    stats: stats.map((s) => ({
      ...s,
      label: o.statLabels[s.key] ?? s.label,
      suffix: o.statSuffixes?.[s.key] ?? s.suffix,
    })),

    skillGroups: skillGroups.map((g) => ({
      ...g,
      name: o.skillGroupNames[g.key] ?? g.name,
      // a partial dictionary: product names fall through untranslated
      items: g.items.map((i) => o.skillItems?.[i] ?? i),
    })),

    experience: { ...experience, ...o.experience },

    fieldRole: {
      ...fieldRole,
      ...o.fieldRole,
      highlights: fieldRole.highlights.map((h) => ({
        ...h,
        label: o.fieldRole.highlightLabels[h.key] ?? h.label,
      })),
    },

    education: { ...education, ...o.education },
    deansList: { ...deansList, ...o.deansList },
  }
}

// Certificate titles are left exactly as the issuing body wrote them, in Latin
// script, so they stay verifiable against the certificates themselves.
export { certifications } from './profile'

export function useProjects(): Project[] {
  const { lang } = useLang()
  const o = overlays[lang]
  if (!o) return projects
  return projects.map((p) => {
    const overlay = o.projects[p.id]
    return overlay ? { ...p, ...overlay } : p
  })
}

// The assistant's bank. English owns the ids and followups; each language overlays
// chip, keywords and answer by id, so the banks cannot fall out of step.
export type QaOverlay = Record<string, { chip: string; keywords: string[]; answer: string }>

const qaOverlays: Partial<Record<LangCode, { bank: QaOverlay; fallback: string }>> = {
  ar: { bank: qaBankAr, fallback: fallbackAnswerAr },
  fr: qaFr,
  es: qaEs,
}

export function useQaBank(): { bank: QA[]; fallback: string } {
  const { lang } = useLang()
  const o = qaOverlays[lang]
  if (!o) return { bank: qaBank, fallback: fallbackAnswer }
  return {
    bank: qaBank.map((q) => {
      const overlay = o.bank[q.id]
      return overlay ? { ...q, ...overlay } : q
    }),
    fallback: o.fallback,
  }
}
