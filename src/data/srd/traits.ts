import type { Trait } from '../../types/srd'

export const traits = [
  {
    name: 'Agility',
    verbs: ['Sprint', 'Leap', 'Maneuver'],
    description:
      'A high Agility means you’re fast on your feet, nimble on difficult terrain, and quick to react to danger. You’ll make an Agility Roll to scurry up a rope, sprint to cover, or bound from rooftop to rooftop.',
  },
  {
    name: 'Strength',
    verbs: ['Lift', 'Smash', 'Grapple'],
    description:
      'A high Strength means you’re better at feats that test your physical prowess and stamina. You’ll make a Strength Roll to break through a door, lift heavy objects, or hold your ground against a charging foe.',
  },
  {
    name: 'Finesse',
    verbs: ['Control', 'Hide', 'Tinker'],
    description:
      'A high Finesse means you’re skilled at tasks that require accuracy, stealth, or the utmost control. You’ll make a Finesse Roll to use fine tools, escape notice, or strike with precision.',
  },
  {
    name: 'Instinct',
    verbs: ['Perceive', 'Sense', 'Navigate'],
    description:
      'A high Instinct means you have a keen sense of your surroundings and a natural intuition. You’ll make an Instinct Roll to sense danger, notice details in the world around you, or track an elusive foe.',
  },
  {
    name: 'Presence',
    verbs: ['Charm', 'Perform', 'Deceive'],
    description:
      'A high Presence means you have a strong force of personality and a facility for social situations. You’ll make a Presence Roll to plead your case, intimidate a foe, or capture the attention of a crowd.',
  },
  {
    name: 'Knowledge',
    verbs: ['Recall', 'Analyze', 'Comprehend'],
    description:
      'A high Knowledge means you know information others don’t and understand how to apply your mind through deduction and inference. You’ll make a Knowledge Roll to interpret facts, see the patterns clearly, or remember important information.',
  },
] as const satisfies readonly Trait[]

export type TraitName = (typeof traits)[number]['name']
export const traitNames = traits.map(({ name }) => name)

export const spellcastTrait = 'Spellcast'
