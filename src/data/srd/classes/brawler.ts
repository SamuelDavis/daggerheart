import type { CharacterClass, Subclass } from '../../../types/srd'

export const juggernaut = {
  name: 'Juggernaut',
  description: 'Play the Juggernaut if you want to pulverize your opponents with crushing blows.',
  foundation: [
    { name: 'Rugged', text: 'Gain a permanent +3 bonus to your Severe damage threshold.' },
    {
      name: 'Overwhelm',
      text: 'When you succeed on an attack against a target, you can spend a Hope to throw the target within Close range or to force them to mark a Stress.',
    },
  ],
  specialization: [
    {
      name: 'Surrounded',
      text: 'When you make an attack with a Melee weapon, you can spend any number of Hope to target an equal number of additional creatures within Melee range.',
    },
    {
      name: 'Eye for an Eye',
      text: 'Once per rest when an adversary within Melee range forces you to mark any number of Hit Points, you can mark a Stress to force them to mark the same number of Hit Points.',
    },
  ],
  mastery: [
    {
      name: 'Pummeljoy',
      text: 'When you critically succeed on a Melee weapon attack, you gain an additional Hope, clear an additional Stress, and gain a +1 bonus to your Proficiency for that attack.',
    },
    { name: 'Not Done Yet', text: 'When you take Severe damage, you can gain a Hope or clear a Stress.' },
  ],
} as const satisfies Subclass

export const martialArtist = {
  name: 'Martial Artist',
  description: 'Play the Martial Artist if you want to use a variety of fighting styles to eliminate your foes.',
  foundation: [
    {
      name: 'Stance Fighter',
      text: 'You can channel your inner resolve to shift into martial stances that grant you special benefits in combat.\nTake the Martial Stances sheet and choose two martial stances from Tier 1. Each time you level up your character, choose an additional stance from your tier or lower.\nFocus represents your character’s poise, clarity, and control. Once per rest during a moment of calm, you can clear your mind and refocus your martial instincts. Clear your Focus track, then roll a number of d6s equal to your Instinct and gain Focus equal to the highest result rolled. You can hold a maximum of 6 Focus.\nYou can spend a Focus to shift into a martial stance and gain its effects. You can shift only into stances you’ve marked as known. When you shift into a stance, it’s considered your active stance until you drop out of it. You can’t shift into or have more than one active stance at a time. Until you shift into a stance, you are not considered to be in a stance or to have an active stance.\nIf you are already in a stance when you shift into a different stance, you automatically drop out of the previously active stance. You also drop out of your active stance when you take Severe damage or mark your last Hit Point. Otherwise, you drop out of your active stance at the end of the scene. When you drop out of a stance, you lose any ongoing benefits it provides.',
      fields: [
        { kind: 'pick', name: 'Known stances', collection: 'martialStances', value: [], count: 2 },
        { kind: 'text', name: 'Active stance', value: '' },
        { kind: 'counter', name: 'Focus', value: 0, max: 6 },
      ],
    },
  ],
  specialization: [
    {
      name: 'Keen Defenses',
      text: 'When you’re targeted by an attack, you can spend a Focus to gain a bonus to your Evasion equal to your tier against the attack.',
    },
    {
      name: 'Focus Cannon',
      text: 'Spend a Focus to make an Instinct Roll against an adversary within Far range. On a success, deal d20+3 magic damage using your Proficiency.',
    },
  ],
  mastery: [
    {
      name: 'Limit Breaker',
      text: 'Once per rest, you can perform an unbelievable feat of athletic prowess, such as running across water, leaping between distant rooftops, or scaling a building without needing to roll. When you do, gain a Hope and clear a Stress.',
    },
    {
      name: 'Flow State',
      text: 'You can mark a Stress instead of spending a Focus to shift into a different stance. Additionally, you can spend a Focus instead of marking a Stress to start a combo strike.',
    },
  ],
} as const satisfies Subclass

export const brawler = {
  name: 'Brawler',
  description:
    'Experts in unarmed combat, brawlers hone their bodies into lethal weapons. Whether they learned from formal training, studied with a mentor, or picked up their skills one fight at a time, the process is always rigorous as brawlers develop their body and mind to work as one. Brawlers are valued for their power and versatility and typically join a party or a cause when the need or desire arises. Because a brawler’s body is their strongest weapon, they typically seek out new challenges or consistent sparring partners so they can maintain their skills and add new techniques to their repertoire. Though they might appear unassuming to those accustomed to foes who are armed to the teeth, brawlers often accomplish more with bare knuckles than an average soldier with a sword.',
  domains: ['Valor', 'Bone'],
  startingEvasion: 10,
  startingHitPoints: 6,
  classItems: ['Hand wraps from a mentor', 'A book about your secret hobby'],
  hopeFeature: {
    name: 'Square Up',
    text: 'Spend 3 Hope to intimidate a target within Close range, making them temporarily Vulnerable.',
  },
  features: [
    {
      name: 'I Am the Weapon',
      text: 'Your barehanded attacks are as strong as any blade. You have a primary weapon called Brawler’s Strike equipped while you have no other Active Weapons. It uses a trait of your choice, has Melee range, and deals d8+d6 physical damage using your Proficiency (both the d8 and d6 scale off your Proficiency). While this weapon is active, you gain a +1 bonus to your Evasion.',
    },
    {
      name: 'Combo Strike',
      text: 'After rolling damage on a successful attack with a Melee weapon, you can mark a Stress to start a combo strike. When you do, roll your Combo Die and note the result, then continue rolling your Combo Die until the result of your latest roll is lower than the roll that preceded it. You deal extra damage equal to the total of all rolled Combo Die results on this attack. The results can’t be modified by any means.\nYour Combo Die starts as a d4. Once per tier, you can increase your Combo Die by one step as a level advancement option.',
      fields: [{ kind: 'die', name: 'Combo Die', value: 'd4' }],
    },
  ],
  subclasses: [juggernaut.name, martialArtist.name],
  backgroundQuestions: [
    'Where did you spend time during your formative years that taught you, directly or indirectly, how to fight in the style you use?',
    'What organization has vowed to kill you on sight, and what did you do to invoke their ire?',
    'Who did you recently lose a fight to that you’re desperate for a rematch against?',
  ],
  connectionQuestions: [
    'What is one thing we’re both afraid of?',
    'What do I rely on you for during our travels? How do you feel about it?',
    'I still haven’t forgiven you for something you said to me. What was it, and why did you say it?',
  ],
} as const satisfies CharacterClass
