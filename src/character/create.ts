import { startingValues } from '../data/srd/characterCreation'
import { traitNames } from '../data/srd/traits'
import type { Character, TraitScore } from '../types/app'

export const placeholderName = 'Unnamed Hero'

const unmarkedTrait: TraitScore = { value: 0, marked: false }

export const createCharacter = (name: string): Character => ({
  schemaVersion: 1,
  name,
  pronouns: '',
  level: startingValues.level,
  classes: [],
  heritage: {},
  traits: Object.fromEntries(traitNames.map((trait) => [trait, unmarkedTrait])) as Character['traits'],
  evasion: 0,
  proficiency: startingValues.proficiency,
  thresholds: { major: 0, severe: 0 },
  hitPoints: { max: 0, marked: 0 },
  stress: { max: startingValues.stress, marked: 0 },
  hope: { max: startingValues.hopeSlots, marked: startingValues.hope },
  armorSlots: { max: 0, marked: 0 },
  experiences: [],
  domainCards: [],
  weapons: [],
  armor: [],
  inventory: [],
  gold: { handfuls: 0, bags: 0, chests: 0 },
  features: [],
  appearance: [],
  background: [],
  connections: [],
  notes: '',
  levelUps: [],
})
