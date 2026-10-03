import * as v from 'valibot'
import { list, Modifier, Name, Ordinal } from '../schema'
import { Damage } from './dice'
import { Excerpt } from './excerpt'

export const BeastformStats = v.object({
  trait: Name,
  traitBonus: Modifier,
  evasionBonus: Modifier,
  attack: v.object({
    range: Name,
    trait: Name,
    damage: Damage,
  }),
})
export type BeastformStats = v.InferOutput<typeof BeastformStats>

export const Beastform = v.object({
  name: Name,
  tier: Ordinal,
  examples: list(Name),
  stats: v.optional(BeastformStats),
  advantages: list(Name),
  features: list(Excerpt),
})
export type Beastform = v.InferOutput<typeof Beastform>
