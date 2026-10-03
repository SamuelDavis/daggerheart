import type { AdvancementOption, AdvancementTier } from '../../types/srd'

const shared = (domainCardLimit: string): AdvancementOption[] => [
  { kind: 'traits', text: 'Gain a +1 bonus to two unmarked character traits and mark them.', slots: 3, cost: 1 },
  { kind: 'hitPoints', text: 'Permanently gain one Hit Point slot.', slots: 2, cost: 1 },
  { kind: 'stress', text: 'Permanently gain one Stress slot.', slots: 2, cost: 1 },
  { kind: 'experiences', text: 'Permanently gain a +1 bonus to two Experiences.', slots: 1, cost: 1 },
  {
    kind: 'domainCard',
    text: `Choose an additional domain card of your level or lower from a domain you have access to${domainCardLimit}.`,
    slots: 1,
    cost: 1,
  },
  { kind: 'evasion', text: 'Permanently gain a +1 bonus to your Evasion.', slots: 1, cost: 1 },
]

const upper: AdvancementOption[] = [
  {
    kind: 'subclass',
    text: 'Take an upgraded subclass card. Then cross out the multiclass option for this tier.',
    slots: 1,
    cost: 1,
  },
  { kind: 'proficiency', text: 'Increase your Proficiency by +1.', slots: 2, cost: 2 },
  {
    kind: 'multiclass',
    text: 'Multiclass: Choose an additional class for your character, then cross out an unused “Take an upgraded subclass card” and the other multiclass option on this sheet.',
    slots: 2,
    cost: 2,
  },
]

export const advancementTiers = [
  {
    name: 'Tier 2',
    tier: 2,
    levels: [2, 3, 4],
    achievement: { level: 2, text: 'At level 2, gain an additional Experience at +2 and gain a +1 bonus to your Proficiency.' },
    options: shared(' (up to level 4)'),
  },
  {
    name: 'Tier 3',
    tier: 3,
    levels: [5, 6, 7],
    achievement: {
      level: 5,
      text: 'At level 5, gain an additional Experience at +2 and clear all marks on character traits. Then gain a +1 bonus to your Proficiency.',
    },
    options: [...shared(' (up to level 7)'), ...upper],
  },
  {
    name: 'Tier 4',
    tier: 4,
    levels: [8, 9, 10],
    achievement: {
      level: 8,
      text: 'At level 8, gain an additional Experience at +2 and clear all marks on character traits. Then gain a +1 bonus to your Proficiency.',
    },
    options: [...shared(''), ...upper],
  },
] as const satisfies readonly AdvancementTier[]

export const levelUpGuidance = {
  advancements:
    'Choose any two advancements with at least one unmarked slot from your tier or below. Options with multiple slots can be chosen more than once. When you choose an advancement, mark one of its slots. Increasing Proficiency and multiclassing each require two advancements.',
  thresholds: 'Increase all damage thresholds by 1.',
  domainCard:
    'Acquire a new domain card at your level or lower from one of your class’s domains and add it to your loadout or vault. If your loadout is already full, you can’t add the new card to it until you move another into your vault. You can also exchange one domain card you’ve previously acquired for a different domain card of the same level or lower.',
  multiclass:
    'Starting at level 5, you can choose multiclassing as an option when leveling up. When you multiclass, you choose an additional class, gain access to one of its domains, and acquire its class feature. Choose a foundation card from one of its subclasses. If your foundation cards specify different Spellcast traits, you can choose which one to apply when making a Spellcast roll.\nWhenever you have the option to acquire a new domain card, you can choose from cards at or below half your current level (rounded up) from the domain you chose when you selected the multiclass advancement.',
  companion: 'When your character levels up, choose one available option for your companion.',
}

export const multiclassMinimumLevel = 5
