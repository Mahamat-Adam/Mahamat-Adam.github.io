import { useLang } from '../lib/lang'
import * as ar from './content.ar'
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

// Single place the components ask for prose. The English files stay the source of
// truth for anything language-neutral (numbers, image paths, links, technology
// names); content.ar.ts only overlays the text that actually differs, matched by
// key rather than array position so the two cannot drift apart.
export function useContent() {
  const { rtl } = useLang()

  return {
    aboutParagraphs: rtl ? ar.aboutParagraphsAr : aboutParagraphs,
    fypIntro: rtl ? ar.fypIntroAr : fypIntro,
    spokenLanguages: rtl ? ar.spokenLanguagesAr : spokenLanguages,

    location: rtl ? ar.locationAr : profile.location,

    stats: stats.map((s) => ({
      ...s,
      label: rtl ? ar.statLabelsAr[s.key] : s.label,
      suffix: rtl ? (ar.statSuffixesAr[s.key] ?? s.suffix) : s.suffix,
    })),

    skillGroups: skillGroups.map((g) => ({
      ...g,
      name: rtl ? ar.skillGroupNamesAr[g.key as keyof typeof ar.skillGroupNamesAr] : g.name,
      items: rtl ? g.items.map((i) => ar.skillItemsAr[i] ?? i) : g.items,
    })),

    experience: rtl ? { ...experience, ...ar.experienceAr } : experience,

    fieldRole: rtl
      ? {
          ...fieldRole,
          ...ar.fieldRoleAr,
          highlights: fieldRole.highlights.map((h) => ({
            ...h,
            label:
              ar.fieldRoleAr.highlightLabels[h.key as keyof typeof ar.fieldRoleAr.highlightLabels],
          })),
        }
      : fieldRole,

    education: rtl ? { ...education, ...ar.educationAr } : education,
    deansList: rtl ? { ...deansList, ...ar.deansListAr } : deansList,
  }
}

// Certificate titles are left exactly as the issuing body wrote them, in Latin
// script, so they stay verifiable against the certificates themselves.
export { certifications } from './profile'

export function useProjects(): Project[] {
  const { rtl } = useLang()
  if (!rtl) return projects
  return projects.map((p) => {
    const overlay = ar.projectsAr[p.id]
    return overlay ? { ...p, ...overlay } : p
  })
}

// The assistant's bank. English entries own the ids and followups; the Arabic file
// overlays chip, keywords and answer by id, so the two can never fall out of step.
export function useQaBank(): { bank: QA[]; fallback: string } {
  const { rtl } = useLang()
  if (!rtl) return { bank: qaBank, fallback: fallbackAnswer }
  return {
    bank: qaBank.map((q) => {
      const overlay = qaBankAr[q.id]
      return overlay ? { ...q, ...overlay } : q
    }),
    fallback: fallbackAnswerAr,
  }
}
