import { describe, expect, test } from 'vitest'
import { advancementTiers } from '../data/srd/advancements'
import { classes } from '../data/srd/classes'
import { schoolOfKnowledge } from '../data/srd/classes/wizard'
import { warrior, callOfTheBrave } from '../data/srd/classes/warrior'
import { compose, chooseClass, chooseSubclass } from './changes'
import { createCharacter } from './create'
import {
  advancementEffects,
  advancementsSpent,
  applyAchievements,
  beginLevel,
  chooseAdvancement,
  domainCardLimit,
  isLevelComplete,
  raiseThresholds,
  slotsUsed,
  takeLevelCard,
  unavailableBecause,
} from './levelUp'
import { blade } from '../data/srd/domainCards/blade'

const wizard = classes.find(({ name }) => name === 'Wizard')!
const option = (tier: number, kind: string) => advancementTiers.find((entry) => entry.tier === tier)!.options.find((entry) => entry.kind === kind)!
const base = compose(chooseClass(wizard), chooseSubclass(schoolOfKnowledge))(createCharacter('Test'))

describe('level up', () => {
  test('beginning a level raises the level and records it once', () => {
    const leveled = compose(beginLevel(2), beginLevel(2))(base)
    expect(leveled.level).toBe(2)
    expect(leveled.levelUps).toEqual([{ level: 2, done: [], advancements: [] }])
  })

  test('tier achievements add an Experience and Proficiency', () => {
    const leveled = compose(beginLevel(2), applyAchievements(2))(base)
    expect(leveled.proficiency).toBe(2)
    expect(leveled.experiences).toEqual([{ name: '', modifier: 2 }])
    expect(leveled.levelUps[0].done).toEqual(['achievements'])
  })

  test('trait advancements raise and mark traits', () => {
    const leveled = compose(
      beginLevel(2),
      chooseAdvancement(2, 2, 'traits', 'Agility, Strength', advancementEffects.traits(['Agility', 'Strength'])),
    )(base)
    expect(leveled.traits.Agility).toEqual({ value: 1, marked: true })
    expect(slotsUsed(leveled, 2, 'traits')).toBe(1)
    expect(advancementsSpent(leveled, 2)).toBe(1)
  })

  test('two-slot advancements spend both advancements', () => {
    const leveled = compose(beginLevel(5), chooseAdvancement(5, 3, 'proficiency', '', advancementEffects.proficiency))(base)
    expect(advancementsSpent(leveled, 5)).toBe(2)
    expect(unavailableBecause(leveled, 5, 3, option(3, 'evasion'))).toBe('Not enough advancements left this level')
  })

  test('multiclassing is gated and crosses out the subclass upgrade', () => {
    expect(unavailableBecause(compose(beginLevel(4))(base), 4, 3, option(3, 'multiclass'))).toBe('Unlocks at tier 3')
    const multiclassed = compose(
      beginLevel(5),
      chooseAdvancement(5, 3, 'multiclass', 'Warrior', advancementEffects.multiclass(warrior, 'Blade', callOfTheBrave)),
    )(base)
    expect(multiclassed.classes.map(({ name, domains }) => [name, domains])).toEqual([
      ['Wizard', ['Codex', 'Splendor']],
      ['Warrior', ['Blade']],
    ])
    const next = beginLevel(6)(multiclassed)
    expect(unavailableBecause(next, 6, 3, option(3, 'subclass'))).toBe('Crossed out by multiclassing this tier')
    expect(unavailableBecause(next, 6, 3, option(3, 'multiclass'))).toBe('All slots are marked')
    expect(domainCardLimit(next, 6, 'Blade')).toBe(3)
    expect(domainCardLimit(next, 6, 'Codex')).toBe(6)
  })

  test('subclass upgrades add the next rank from the SRD', () => {
    const upgraded = compose(beginLevel(5), chooseAdvancement(5, 3, 'subclass', '', advancementEffects.subclass(0)))(base)
    expect(upgraded.classes[0].subclass?.ranks).toEqual(['foundation', 'specialization'])
    expect(upgraded.classes[0].subclass?.specialization?.map(({ name }) => name)).toEqual(['Accomplished', 'Perfect Recall'])
  })

  test('a level is complete once its tasks and advancements are done', () => {
    const leveled = compose(
      beginLevel(2),
      applyAchievements(2),
      raiseThresholds(2),
      takeLevelCard(2, blade[0]),
      chooseAdvancement(2, 2, 'hitPoints', '', advancementEffects.hitPoints),
      chooseAdvancement(2, 2, 'evasion', '', advancementEffects.evasion),
    )(base)
    expect(isLevelComplete(leveled, 2, true)).toBe(true)
    expect(isLevelComplete(leveled, 3, true)).toBe(false)
  })
})
