import * as v from 'valibot'
import { Count, list, Name, Ordinal, Text } from '../schema'
import { Damage } from './dice'
import { Feature } from './feature'

export const WeaponCategory = v.picklist(['primary', 'secondary'])
export type WeaponCategory = v.InferOutput<typeof WeaponCategory>

export const Burden = v.picklist(['one-handed', 'two-handed'])
export type Burden = v.InferOutput<typeof Burden>

export const Weapon = v.object({
  name: Name,
  tier: Ordinal,
  category: WeaponCategory,
  trait: Name,
  range: Name,
  damage: Damage,
  burden: Burden,
  features: list(Feature),
})
export type Weapon = v.InferOutput<typeof Weapon>

export const Thresholds = v.object({
  major: Count,
  severe: Count,
})
export type Thresholds = v.InferOutput<typeof Thresholds>

export const Armor = v.object({
  name: Name,
  tier: Ordinal,
  thresholds: Thresholds,
  score: Count,
  features: list(Feature),
})
export type Armor = v.InferOutput<typeof Armor>

export const Item = v.object({
  name: Name,
  text: Text,
})
export type Item = v.InferOutput<typeof Item>
