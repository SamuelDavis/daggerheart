import * as v from 'valibot'
import { Modifier } from '../schema'

export const Die = v.picklist(['d4', 'd6', 'd8', 'd10', 'd12', 'd20'])
export type Die = v.InferOutput<typeof Die>

export const DamageType = v.picklist(['physical', 'magic'])
export type DamageType = v.InferOutput<typeof DamageType>

export const Damage = v.object({
  die: Die,
  modifier: v.optional(Modifier),
  type: DamageType,
})
export type Damage = v.InferOutput<typeof Damage>
