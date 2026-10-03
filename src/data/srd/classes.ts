import type { CharacterClass } from '../../types/srd'
import { assassin } from './classes/assassin'
import { bard } from './classes/bard'
import { brawler } from './classes/brawler'
import { druid } from './classes/druid'
import { guardian } from './classes/guardian'
import { ranger } from './classes/ranger'
import { rogue } from './classes/rogue'
import { seraph } from './classes/seraph'
import { sorcerer } from './classes/sorcerer'
import { warlock } from './classes/warlock'
import { warrior } from './classes/warrior'
import { witch } from './classes/witch'
import { wizard } from './classes/wizard'

export const classes = [
  assassin,
  bard,
  brawler,
  druid,
  guardian,
  ranger,
  rogue,
  seraph,
  sorcerer,
  warlock,
  warrior,
  witch,
  wizard,
] as const satisfies readonly CharacterClass[]
