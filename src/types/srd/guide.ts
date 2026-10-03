import * as v from 'valibot'
import { list, Modifier, Name, Text } from '../schema'

export const DescriptionPrompt = v.object({
  prompt: Name,
  suggestions: list(Name),
})
export type DescriptionPrompt = v.InferOutput<typeof DescriptionPrompt>

export const ClassGuide = v.object({
  name: Name,
  tagline: Text,
  suggestedTraits: v.record(Name, Modifier),
  suggestedPrimaryWeapon: v.optional(Name),
  suggestedSecondaryWeapon: v.optional(Name),
  suggestedArmor: v.optional(Name),
  spellFocus: v.optional(DescriptionPrompt),
  descriptionPrompts: list(DescriptionPrompt),
})
export type ClassGuide = v.InferOutput<typeof ClassGuide>
