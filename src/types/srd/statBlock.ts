import * as v from 'valibot'
import { Count, list, Name, Ordinal, Text } from '../schema'
import { Experience } from './sheet'

export const StatBlockFeatureKind = v.picklist(['Passive', 'Action', 'Reaction', 'Evolution'])
export type StatBlockFeatureKind = v.InferOutput<typeof StatBlockFeatureKind>

export const StatBlockFeature = v.object({
  name: Name,
  kind: StatBlockFeatureKind,
  text: Text,
})
export type StatBlockFeature = v.InferOutput<typeof StatBlockFeature>

export const AdversaryType = v.picklist([
  'Bruiser',
  'Horde',
  'Leader',
  'Minion',
  'Ranged',
  'Skulk',
  'Social',
  'Solo',
  'Standard',
  'Support',
])
export type AdversaryType = v.InferOutput<typeof AdversaryType>

export const Adversary = v.object({
  name: Name,
  tier: Ordinal,
  type: AdversaryType,
  hordeSize: v.optional(Ordinal),
  description: Text,
  motives: Text,
  difficulty: Count,
  thresholds: v.object({ major: v.nullable(Count), severe: v.nullable(Count) }),
  hitPoints: Count,
  stress: v.nullable(Count),
  attack: v.object({ modifier: Text, name: Name, range: Name, damage: Text }),
  experiences: list(Experience),
  features: list(StatBlockFeature),
})
export type Adversary = v.InferOutput<typeof Adversary>

export const EnvironmentType = v.picklist(['Event', 'Exploration', 'Social', 'Traversal'])
export type EnvironmentType = v.InferOutput<typeof EnvironmentType>

export const Environment = v.object({
  name: Name,
  tier: Ordinal,
  type: EnvironmentType,
  description: Text,
  impulses: Text,
  difficulty: Text,
  potentialAdversaries: Text,
  features: list(StatBlockFeature),
})
export type Environment = v.InferOutput<typeof Environment>
