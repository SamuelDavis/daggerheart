import type { Subclass } from '../../types/srd'
import { executionersGuild, poisonersGuild } from './classes/assassin'
import { troubadour, wordsmith } from './classes/bard'
import { juggernaut, martialArtist } from './classes/brawler'
import { wardenOfRenewal, wardenOfTheElements } from './classes/druid'
import { stalwart, vengeance } from './classes/guardian'
import { beastbound, wayfinder } from './classes/ranger'
import { nightwalker, syndicate } from './classes/rogue'
import { divineWielder, wingedSentinel } from './classes/seraph'
import { elementalOrigin, primalOrigin } from './classes/sorcerer'
import { pactOfTheEndless, pactOfTheWrathful } from './classes/warlock'
import { callOfTheBrave, callOfTheSlayer } from './classes/warrior'
import { hedge, moon } from './classes/witch'
import { schoolOfKnowledge, schoolOfWar } from './classes/wizard'

export const subclasses = [
  executionersGuild,
  poisonersGuild,
  troubadour,
  wordsmith,
  juggernaut,
  martialArtist,
  wardenOfTheElements,
  wardenOfRenewal,
  stalwart,
  vengeance,
  beastbound,
  wayfinder,
  nightwalker,
  syndicate,
  divineWielder,
  wingedSentinel,
  elementalOrigin,
  primalOrigin,
  pactOfTheEndless,
  pactOfTheWrathful,
  callOfTheBrave,
  callOfTheSlayer,
  hedge,
  moon,
  schoolOfKnowledge,
  schoolOfWar,
] as const satisfies readonly Subclass[]
