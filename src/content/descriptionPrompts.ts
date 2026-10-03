import { srd } from '../data/srd'
import { findByName } from '../data/srd/lookup'
import type { DescriptionPrompt } from '../types/srd'

const merged = (prompts: readonly DescriptionPrompt[]): DescriptionPrompt[] =>
  [...new Set(prompts.map(({ prompt }) => prompt))].map((prompt) => ({
    prompt,
    suggestions: [...new Set(prompts.filter((entry) => entry.prompt === prompt).flatMap(({ suggestions }) => suggestions))],
  }))

export const descriptionPromptsFor = (className: string | undefined) =>
  findByName(srd.guides.entries, className)?.descriptionPrompts ??
  merged(srd.guides.entries.flatMap(({ descriptionPrompts }) => descriptionPrompts))
