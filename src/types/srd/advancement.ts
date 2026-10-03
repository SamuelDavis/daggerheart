import * as v from 'valibot'
import { Count, list, Name, Ordinal, Text } from '../schema'

export const AdvancementKind = v.picklist([
  'traits',
  'hitPoints',
  'stress',
  'experiences',
  'domainCard',
  'evasion',
  'subclass',
  'proficiency',
  'multiclass',
])
export type AdvancementKind = v.InferOutput<typeof AdvancementKind>

export const AdvancementOption = v.object({
  kind: AdvancementKind,
  text: Text,
  slots: Count,
  cost: Ordinal,
})
export type AdvancementOption = v.InferOutput<typeof AdvancementOption>

export const AdvancementTier = v.object({
  name: Name,
  tier: Ordinal,
  levels: list(Ordinal),
  achievement: v.optional(v.object({ level: Ordinal, text: Text })),
  options: list(AdvancementOption),
})
export type AdvancementTier = v.InferOutput<typeof AdvancementTier>
