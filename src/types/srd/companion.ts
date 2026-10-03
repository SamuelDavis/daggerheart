import * as v from 'valibot'
import { Count, list, Name, Text } from '../schema'
import { DamageType, Die } from './dice'
import { Experience, Track } from './sheet'

export const Companion = v.object({
  name: Text,
  species: Text,
  evasion: Count,
  experiences: list(Experience),
  attack: v.object({
    description: Text,
    die: Die,
    range: Name,
    damageType: DamageType,
  }),
  stress: Track,
  training: list(Name),
})
export type Companion = v.InferOutput<typeof Companion>
