import * as v from 'valibot'
import { Count, list, Name, Text } from '../schema'
import { Feature } from './feature'

export const CharacterClass = v.object({
  name: Name,
  description: Text,
  domains: list(Name),
  startingEvasion: Count,
  startingHitPoints: Count,
  classItems: list(Name),
  hopeFeature: Feature,
  features: list(Feature),
  subclasses: list(Name),
  backgroundQuestions: list(Text),
  connectionQuestions: list(Text),
})
export type CharacterClass = v.InferOutput<typeof CharacterClass>

export const SubclassRank = v.picklist(['foundation', 'specialization', 'mastery'])
export type SubclassRank = v.InferOutput<typeof SubclassRank>

export const Subclass = v.object({
  name: Name,
  description: Text,
  spellcastTrait: v.optional(Name),
  foundation: list(Feature),
  specialization: list(Feature),
  mastery: list(Feature),
})
export type Subclass = v.InferOutput<typeof Subclass>
