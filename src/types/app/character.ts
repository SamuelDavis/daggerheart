import * as v from 'valibot'
import { traitNames } from '../../data/srd/traits'
import { Count, keyed, list, Modifier, Name, Ordinal, Text } from '../schema'
import {
  AdvancementKind,
  Ancestry,
  Armor,
  Community,
  DomainCard,
  Experience,
  Feature,
  Item,
  Subclass,
  SubclassRank,
  Thresholds,
  Track,
  Transformation,
  Weapon,
} from '../srd'

export const TraitScore = v.object({
  value: Modifier,
  marked: v.boolean(),
})
export type TraitScore = v.InferOutput<typeof TraitScore>

export const Prompt = v.object({
  prompt: Text,
  response: Text,
})
export type Prompt = v.InferOutput<typeof Prompt>

export const CharacterSubclass = v.object({
  ...v.partial(Subclass, ['specialization', 'mastery']).entries,
  ranks: list(SubclassRank),
})
export type CharacterSubclass = v.InferOutput<typeof CharacterSubclass>

export const ClassProgress = v.object({
  name: Name,
  domains: list(Name),
  hopeFeature: v.optional(Feature),
  features: list(Feature),
  subclass: v.optional(CharacterSubclass),
})
export type ClassProgress = v.InferOutput<typeof ClassProgress>

export const Heritage = v.object({
  ancestry: v.optional(Ancestry),
  community: v.optional(Community),
  transformation: v.optional(Transformation),
})
export type Heritage = v.InferOutput<typeof Heritage>

export const CardPlacement = v.picklist(['loadout', 'vault'])
export type CardPlacement = v.InferOutput<typeof CardPlacement>

export const OwnedDomainCard = v.object({ ...DomainCard.entries, placement: CardPlacement })
export type OwnedDomainCard = v.InferOutput<typeof OwnedDomainCard>

export const OwnedWeapon = v.object({ ...Weapon.entries, equipped: v.boolean() })
export type OwnedWeapon = v.InferOutput<typeof OwnedWeapon>

export const OwnedArmor = v.object({ ...Armor.entries, equipped: v.boolean() })
export type OwnedArmor = v.InferOutput<typeof OwnedArmor>

export const OwnedItem = v.object({ ...Item.entries, quantity: Count })
export type OwnedItem = v.InferOutput<typeof OwnedItem>

export const Gold = v.object({
  handfuls: Count,
  bags: Count,
  chests: Count,
})
export type Gold = v.InferOutput<typeof Gold>

export const ChosenAdvancement = v.object({
  tier: Ordinal,
  kind: AdvancementKind,
  detail: Text,
})
export type ChosenAdvancement = v.InferOutput<typeof ChosenAdvancement>

export const LevelUpTask = v.picklist(['achievements', 'thresholds', 'domainCard', 'companion'])
export type LevelUpTask = v.InferOutput<typeof LevelUpTask>

export const LevelUp = v.object({
  level: Ordinal,
  done: list(LevelUpTask),
  advancements: list(ChosenAdvancement),
})
export type LevelUp = v.InferOutput<typeof LevelUp>

export const Character = v.object({
  schemaVersion: v.literal(1),
  name: Name,
  pronouns: Text,
  level: Ordinal,
  classes: list(ClassProgress),
  heritage: Heritage,
  traits: keyed(traitNames, TraitScore),
  evasion: Count,
  proficiency: Count,
  thresholds: Thresholds,
  hitPoints: Track,
  stress: Track,
  hope: Track,
  armorSlots: Track,
  experiences: list(Experience),
  domainCards: list(OwnedDomainCard),
  weapons: list(OwnedWeapon),
  armor: list(OwnedArmor),
  inventory: list(OwnedItem),
  gold: Gold,
  features: list(Feature),
  appearance: list(Prompt),
  background: list(Prompt),
  connections: list(Prompt),
  notes: Text,
  levelUps: list(LevelUp),
})
export type Character = v.InferOutput<typeof Character>
