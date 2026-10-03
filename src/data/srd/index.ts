import type * as v from 'valibot'
import * as schemas from '../../types/srd'
import { advancementTiers } from './advancements'
import { ancestries } from './ancestries'
import { armor } from './armor'
import { beastforms } from './beastforms'
import { classes } from './classes'
import { communities } from './communities'
import { companionTraining } from './companionTraining'
import { consumables } from './consumables'
import { domainCards } from './domainCards'
import { domains } from './domains'
import { guides } from './guides'
import { loot } from './loot'
import { martialStances } from './martialStances'
import { ranges } from './ranges'
import { subclasses } from './subclasses'
import { traits } from './traits'
import { transformations } from './transformations'
import { weapons } from './weapons'

export const collection = <Schema extends v.GenericSchema<unknown, { name: string }>>(
  schema: Schema,
  entries: readonly v.InferOutput<Schema>[],
) => ({ schema, entries })

export const srd = {
  traits: collection(schemas.Trait, traits),
  ranges: collection(schemas.Range, ranges),
  domains: collection(schemas.Domain, domains),
  domainCards: collection(schemas.DomainCard, domainCards),
  classes: collection(schemas.CharacterClass, classes),
  subclasses: collection(schemas.Subclass, subclasses),
  ancestries: collection(schemas.Ancestry, ancestries),
  communities: collection(schemas.Community, communities),
  transformations: collection(schemas.Transformation, transformations),
  weapons: collection(schemas.Weapon, weapons),
  armor: collection(schemas.Armor, armor),
  loot: collection(schemas.Item, loot),
  consumables: collection(schemas.Item, consumables),
  beastforms: collection(schemas.Beastform, beastforms),
  martialStances: collection(schemas.MartialStance, martialStances),
  guides: collection(schemas.ClassGuide, guides),
  advancementTiers: collection(schemas.AdvancementTier, advancementTiers),
  companionTraining: collection(schemas.Feature, companionTraining),
}

export type SrdCollection = keyof typeof srd
