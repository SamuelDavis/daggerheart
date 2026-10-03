import type { Component } from 'solid-js'
import { startingValues } from '../data/srd/characterCreation'
import { placeholderName } from '../character/create'
import type { Topic } from '../character/warnings'
import { isLevelComplete } from '../character/levelUp'
import { LevelUpFlow } from '../levelUp/LevelUpFlow'
import type { Character } from '../types/app'
import { BackgroundStep, ConnectionsStep } from './steps/PromptSteps'
import { ClassStep } from './steps/ClassStep'
import { DomainCardsStep } from './steps/DomainCardsStep'
import { EquipmentStep } from './steps/EquipmentStep'
import { ExperiencesStep } from './steps/ExperiencesStep'
import { HeritageStep } from './steps/HeritageStep'
import { IdentityStep } from './steps/IdentityStep'
import { StatsStep } from './steps/StatsStep'
import { TraitsStep } from './steps/TraitsStep'

export type BuildStep = {
  id: string
  title: string
  topic?: Topic
  component: Component
  isComplete: (character: Character) => boolean
}

const baseSteps: readonly BuildStep[] = [
  {
    id: 'class',
    title: 'Class & subclass',
    topic: 'class',
    component: ClassStep,
    isComplete: (character) => Boolean(character.classes[0]?.subclass),
  },
  {
    id: 'heritage',
    title: 'Heritage',
    topic: 'heritage',
    component: HeritageStep,
    isComplete: ({ heritage }) => Boolean(heritage.ancestry && heritage.community),
  },
  {
    id: 'traits',
    title: 'Traits',
    topic: 'traits',
    component: TraitsStep,
    isComplete: ({ traits }) => Object.values(traits).some(({ value }) => value !== 0),
  },
  {
    id: 'stats',
    title: 'Evasion, HP & Hope',
    component: StatsStep,
    isComplete: ({ evasion, hitPoints }) => evasion > 0 && hitPoints.max > 0,
  },
  {
    id: 'equipment',
    title: 'Equipment',
    topic: 'equipment',
    component: EquipmentStep,
    isComplete: ({ weapons, armor }) => weapons.some(({ equipped }) => equipped) && armor.some(({ equipped }) => equipped),
  },
  {
    id: 'background',
    title: 'Background',
    component: BackgroundStep,
    isComplete: ({ background }) => background.length > 0,
  },
  {
    id: 'experiences',
    title: 'Experiences',
    component: ExperiencesStep,
    isComplete: ({ experiences }) =>
      experiences.filter(({ name }) => name.trim()).length >= startingValues.experienceCount,
  },
  {
    id: 'domain-cards',
    title: 'Domain cards',
    topic: 'domainCards',
    component: DomainCardsStep,
    isComplete: ({ domainCards }) => domainCards.length >= startingValues.domainCardCount,
  },
  {
    id: 'connections',
    title: 'Connections',
    component: ConnectionsStep,
    isComplete: ({ connections }) => connections.length > 0,
  },
  {
    id: 'identity',
    title: 'Name & description',
    component: IdentityStep,
    isComplete: ({ name }) => !name.startsWith(placeholderName),
  },
]

const levelSteps = new Map<number, BuildStep>()

const levelStep = (level: number): BuildStep => {
  const cached = levelSteps.get(level)
  if (cached) return cached
  const step: BuildStep = {
    id: `level-${level}`,
    title: `Level ${level}`,
    component: () => <LevelUpFlow level={level} includeThresholds={false} />,
    isComplete: (character) => isLevelComplete(character, level, false),
  }
  levelSteps.set(level, step)
  return step
}

export const stepsFor = (character: Character): readonly BuildStep[] => {
  const levels = Array.from({ length: Math.max(0, character.level - 1) }, (_, index) => levelStep(index + 2))
  const insertAt = baseSteps.findIndex(({ id }) => id === 'domain-cards') + 1
  return [...baseSteps.slice(0, insertAt), ...levels, ...baseSteps.slice(insertAt)]
}
