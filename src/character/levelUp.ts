import { advancementTiers, multiclassMinimumLevel } from '../data/srd/advancements'
import { startingValues } from '../data/srd/characterCreation'
import { findByName } from '../data/srd/lookup'
import { subclasses } from '../data/srd/subclasses'
import type { TraitName } from '../data/srd/traits'
import { replaceAt } from '../lib/immutable'
import type { Character, ClassProgress, LevelUp, LevelUpTask } from '../types/app'
import type { AdvancementKind, AdvancementOption, CharacterClass, DomainCard, Subclass, SubclassRank } from '../types/srd'
import { addDomainCard, compose, modify, type Change } from './changes'
import { tierOf } from './rules'

export const achievementAt = (level: number) =>
  advancementTiers.find(({ achievement }) => achievement?.level === level)?.achievement

export const levelUpAt = (character: Character, level: number) => character.levelUps.find((entry) => entry.level === level)

const optionOf = (tier: number, kind: AdvancementKind): AdvancementOption | undefined =>
  advancementTiers.find((entry) => entry.tier === tier)?.options.find((option) => option.kind === kind)

const chosen = (character: Character) => character.levelUps.flatMap(({ advancements }) => advancements)

export const slotsUsed = (character: Character, tier: number, kind: AdvancementKind) =>
  chosen(character).filter((entry) => entry.tier === tier && entry.kind === kind).length * (optionOf(tier, kind)?.cost ?? 1)

export const advancementsSpent = (character: Character, level: number) =>
  (levelUpAt(character, level)?.advancements ?? []).reduce(
    (total, { tier, kind }) => total + (optionOf(tier, kind)?.cost ?? 1),
    0,
  )

export const advancementsPerLevel = 2

export const nextSubclassRank = (progress: ClassProgress): SubclassRank | undefined =>
  (['specialization', 'mastery'] as const).find((rank) => !progress.subclass?.ranks.includes(rank))

export const unavailableBecause = (
  character: Character,
  level: number,
  tier: number,
  option: AdvancementOption,
): string | undefined => {
  const multiclassed = chosen(character).some(({ kind }) => kind === 'multiclass')
  const inTier = (kind: AdvancementKind) => chosen(character).some((entry) => entry.tier === tier && entry.kind === kind)
  if (tier > tierOf(level)) return `Unlocks at tier ${tier}`
  if (option.slots - slotsUsed(character, tier, option.kind) < option.cost) return 'All slots are marked'
  if (option.cost > advancementsPerLevel - advancementsSpent(character, level)) return 'Not enough advancements left this level'
  if (option.kind === 'multiclass' && level < multiclassMinimumLevel) return `Available from level ${multiclassMinimumLevel}`
  if (option.kind === 'multiclass' && multiclassed) return 'You have already multiclassed'
  if (option.kind === 'multiclass' && inTier('subclass')) return 'Crossed out by an upgraded subclass this tier'
  if (option.kind === 'subclass' && inTier('multiclass')) return 'Crossed out by multiclassing this tier'
  if (option.kind === 'subclass' && !character.classes.some(nextSubclassRank)) return 'Every subclass is fully upgraded'
  return undefined
}

export const domainCardLimit = (character: Character, level: number, domain: string) => {
  const [primary, ...multiclasses] = character.classes
  if (primary?.domains.includes(domain)) return level
  if (multiclasses.some(({ domains }) => domains.includes(domain))) return Math.ceil(level / 2)
  return 0
}

const modifyLevelUp = (level: number, update: (entry: LevelUp) => LevelUp): Change =>
  modify('levelUps', (levelUps) => levelUps.map((entry) => (entry.level === level ? update(entry) : entry)))

const completeTask = (level: number, task: LevelUpTask) =>
  modifyLevelUp(level, (entry) => ({ ...entry, done: entry.done.includes(task) ? entry.done : [...entry.done, task] }))

export const beginLevel =
  (level: number): Change =>
  (character) => ({
    ...character,
    level: Math.max(character.level, level),
    levelUps: levelUpAt(character, level)
      ? character.levelUps
      : [...character.levelUps, { level, done: [], advancements: [] }].sort((a, b) => a.level - b.level),
  })

export const applyAchievements = (level: number): Change =>
  compose(
    modify('proficiency', (proficiency) => proficiency + 1),
    modify('experiences', (experiences) => [...experiences, { name: '', modifier: startingValues.experienceModifier }]),
    level > 2
      ? modify(
          'traits',
          (traits) =>
            Object.fromEntries(Object.entries(traits).map(([trait, score]) => [trait, { ...score, marked: false }])) as Character['traits'],
        )
      : (character) => character,
    completeTask(level, 'achievements'),
  )

export const raiseThresholds = (level: number): Change =>
  compose(
    modify('thresholds', ({ major, severe }) => ({ major: major + 1, severe: severe + 1 })),
    completeTask(level, 'thresholds'),
  )

export const takeLevelCard = (level: number, card: DomainCard): Change =>
  compose(addDomainCard(card), completeTask(level, 'domainCard'))

export const trainCompanion = (level: number, train: Change): Change => compose(train, completeTask(level, 'companion'))

export const chooseAdvancement = (level: number, tier: number, kind: AdvancementKind, detail: string, effect: Change): Change =>
  compose(
    effect,
    modifyLevelUp(level, (entry) => ({ ...entry, advancements: [...entry.advancements, { tier, kind, detail }] })),
  )

export const removeAdvancement = (level: number, index: number): Change =>
  modifyLevelUp(level, (entry) => ({ ...entry, advancements: entry.advancements.filter((_, position) => position !== index) }))

export const advancementEffects = {
  traits: (names: readonly TraitName[]): Change =>
    modify(
      'traits',
      (traits) =>
        Object.fromEntries(
          Object.entries(traits).map(([trait, score]) => [
            trait,
            names.includes(trait as TraitName) ? { value: score.value + 1, marked: true } : score,
          ]),
        ) as Character['traits'],
    ),
  hitPoints: modify('hitPoints', (track) => ({ ...track, max: track.max + 1 })),
  stress: modify('stress', (track) => ({ ...track, max: track.max + 1 })),
  evasion: modify('evasion', (evasion) => evasion + 1),
  proficiency: modify('proficiency', (proficiency) => proficiency + 1),
  experiences: (indices: readonly number[]): Change =>
    modify('experiences', (experiences) =>
      experiences.map((experience, index) =>
        indices.includes(index) ? { ...experience, modifier: experience.modifier + 1 } : experience,
      ),
    ),
  domainCard: addDomainCard,
  subclass:
    (classIndex: number): Change =>
    (character) => {
      const progress = character.classes[classIndex]
      const rank = progress && nextSubclassRank(progress)
      const definition = findByName<Subclass>(subclasses, progress?.subclass?.name)
      if (!progress?.subclass || !rank || !definition) return character
      return {
        ...character,
        classes: replaceAt(character.classes, classIndex, {
          ...progress,
          subclass: { ...progress.subclass, [rank]: definition[rank], ranks: [...progress.subclass.ranks, rank] },
        }),
      }
    },
  multiclass: (characterClass: CharacterClass, domain: string, subclass: Subclass): Change =>
    modify('classes', (classes) => [
      ...classes,
      {
        name: characterClass.name,
        domains: [domain],
        features: characterClass.features,
        subclass: {
          name: subclass.name,
          description: subclass.description,
          spellcastTrait: subclass.spellcastTrait,
          foundation: subclass.foundation,
          ranks: ['foundation'],
        },
      },
    ]),
}

export const isLevelComplete = (character: Character, level: number, includeThresholds: boolean) => {
  const entry = levelUpAt(character, level)
  if (!entry) return false
  const required: LevelUpTask[] = [
    ...(achievementAt(level) ? (['achievements'] as const) : []),
    ...(includeThresholds ? (['thresholds'] as const) : []),
    'domainCard',
  ]
  return required.every((task) => entry.done.includes(task)) && advancementsSpent(character, level) >= advancementsPerLevel
}
