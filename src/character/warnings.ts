import { loadoutLimit, traitModifiers } from '../data/srd/characterCreation'
import type { Character } from '../types/app'
import { tierOf } from './rules'

export type Topic = 'class' | 'heritage' | 'traits' | 'equipment' | 'domainCards'

export type Warning = { topic: Topic; message: string }

type Check = (character: Character) => Warning[]

const sorted = (values: readonly number[]) => [...values].sort((a, b) => a - b).join()

const traitArray: Check = (character) =>
  character.level === 1 &&
  sorted(Object.values(character.traits).map(({ value }) => value)) !== sorted(traitModifiers)
    ? [{ topic: 'traits', message: 'Starting traits are usually +2, +1, +1, +0, +0, −1.' }]
    : []

const subclassChosen: Check = (character) =>
  character.classes
    .filter((progress) => !progress.subclass)
    .map((progress) => ({ topic: 'class', message: `${progress.name} has no subclass yet.` }))

const domainAccess: Check = (character) => {
  const domains = new Set(character.classes.flatMap((progress) => progress.domains))
  return character.domainCards.flatMap((card) => [
    ...(domains.has(card.domain)
      ? []
      : [{ topic: 'domainCards' as const, message: `${card.name} is from ${card.domain}, outside your class’s domains.` }]),
    ...(card.level > character.level
      ? [{ topic: 'domainCards' as const, message: `${card.name} is level ${card.level}, above your level.` }]
      : []),
  ])
}

const loadoutSize: Check = (character) =>
  character.domainCards.filter(({ placement }) => placement === 'loadout').length > loadoutLimit
    ? [{ topic: 'domainCards', message: `Your loadout holds at most ${loadoutLimit} domain cards.` }]
    : []

const equipmentTier: Check = (character) =>
  [...character.weapons, ...character.armor]
    .filter(({ equipped, tier }) => equipped && tier > tierOf(character.level))
    .map(({ name }) => ({ topic: 'equipment', message: `${name} is above your tier.` }))

const hands: Check = (character) => {
  const equipped = character.weapons.filter(({ equipped }) => equipped)
  const used = equipped.reduce((total, { burden }) => total + (burden === 'two-handed' ? 2 : 1), 0)
  return [
    ...(used > 2 ? [{ topic: 'equipment' as const, message: 'Your equipped weapons need more than two hands.' }] : []),
    ...(['primary', 'secondary'] as const)
      .filter((category) => equipped.filter((weapon) => weapon.category === category).length > 1)
      .map((category) => ({ topic: 'equipment' as const, message: `You can equip only one ${category} weapon.` })),
  ]
}

const singleArmor: Check = (character) =>
  character.armor.filter(({ equipped }) => equipped).length > 1
    ? [{ topic: 'equipment', message: 'You can equip only one set of armor.' }]
    : []

const checks: Check[] = [traitArray, subclassChosen, domainAccess, loadoutSize, equipmentTier, hands, singleArmor]

export const warningsFor = (character: Character) => checks.flatMap((check) => check(character))
