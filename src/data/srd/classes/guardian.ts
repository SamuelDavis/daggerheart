import type { CharacterClass, Subclass } from '../../../types/srd'

export const stalwart = {
  name: 'Stalwart',
  description: 'Play the Stalwart if you want to take heavy blows and keep fighting.',
  foundation: [
    { name: 'Unwavering', text: 'Gain a permanent +1 bonus to your damage thresholds.' },
    {
      name: 'Iron Will',
      text: 'When you take physical damage, you can mark an additional Armor Slot to reduce the severity.',
    },
  ],
  specialization: [
    { name: 'Unrelenting', text: 'Gain a permanent +2 bonus to your damage thresholds.' },
    {
      name: 'Partners-in-Arms',
      text: 'When an ally within Very Close range takes damage, you can mark an Armor Slot to reduce the severity by one threshold.',
    },
  ],
  mastery: [
    { name: 'Undaunted', text: 'Gain a permanent +3 bonus to your damage thresholds.' },
    {
      name: 'Loyal Protector',
      text: 'When an ally within Close range has 2 or fewer Hit Points and would take damage, you can mark a Stress to sprint to their side and take the damage instead.',
    },
  ],
} as const satisfies Subclass

export const vengeance = {
  name: 'Vengeance',
  description: 'Play the Vengeance if you want to strike down enemies who harm you or your allies.',
  foundation: [
    { name: 'At Ease', text: 'Gain an additional Stress slot.' },
    {
      name: 'Revenge',
      text: 'When an adversary within Melee range succeeds on an attack against you, you can mark 2 Stress to force the attacker to mark a Hit Point.',
    },
  ],
  specialization: [
    {
      name: 'Act of Reprisal',
      text: 'When an adversary damages an ally within Melee range, you gain a +1 bonus to your Proficiency for the next successful attack you make against that adversary.',
    },
  ],
  mastery: [
    {
      name: 'Nemesis',
      text: 'Spend 2 Hope to Prioritize an adversary until your next rest. When you make an attack against your Prioritized adversary, you can swap the results of your Hope and Fear Dice. You can only Prioritize one adversary at a time.',
    },
  ],
} as const satisfies Subclass

export const guardian = {
  name: 'Guardian',
  description:
    'The title of guardian represents an array of martial professions, speaking more to their moral compass and unshakeable fortitude than the means by which they fight. While many guardians join groups of militants for either a country or cause, they’re more likely to follow those few they truly care for, majority be damned. Guardians are known for fighting with remarkable ferocity even against overwhelming odds, defending their cohort above all else. Woe betide those who harm the ally of a guardian, as the guardian will answer this injury in kind.',
  domains: ['Valor', 'Blade'],
  startingEvasion: 9,
  startingHitPoints: 7,
  classItems: ['A totem from your mentor', 'A secret key'],
  hopeFeature: { name: 'Frontline Tank', text: 'Spend 3 Hope to clear 2 Armor Slots.' },
  features: [
    {
      name: 'Unstoppable',
      text: 'Once per long rest, you can become Unstoppable. You gain an Unstoppable Die. At level 1, your Unstoppable Die is a d4. Place it on your character sheet in the space provided, starting with the 1 value facing up. After you make a damage roll that deals 1 or more Hit Points to a target, increase the Unstoppable Die value by one. When the die’s value would exceed its maximum value or when the scene ends, remove the die and drop out of Unstoppable. At level 5, your Unstoppable Die increases to a d6.\nWhile Unstoppable, you gain the following benefits:\n• You reduce the severity of physical damage by one threshold (Severe to Major, Major to Minor, Minor to None).\n• You add the current value of the Unstoppable Die to your damage roll.\n• You can’t be Restrained or Vulnerable.\nTip: If your Unstoppable Die is a d4 and the 4 is currently facing up, you remove the die the next time you would increase it. However, if your Unstoppable Die has increased to a d6 and the 4 is currently facing up, you’ll turn it to 5 the next time you would increase it. In this case, you’ll remove the die after you would need to increase it higher than 6.',
      fields: [{ kind: 'die', name: 'Unstoppable Die', value: 'd4', face: 0 }],
    },
  ],
  subclasses: [stalwart.name, vengeance.name],
  backgroundQuestions: [
    'Who from your community did you fail to protect, and why do you still think of them?',
    'You’ve been tasked with protecting something important and delivering it somewhere dangerous. What is it, and where does it need to go?',
    'You consider an aspect of yourself to be a weakness. What is it, and how has it affected you?',
  ],
  connectionQuestions: [
    'How did I save your life the first time we met?',
    'What small gift did you give me that you notice I always carry with me?',
    'What lie have you told me about yourself that I absolutely believe?',
  ],
} as const satisfies CharacterClass
