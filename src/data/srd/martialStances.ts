import type { MartialStance } from '../../types/srd'

export const martialStances = [
  { name: 'Favored', tier: 1, text: 'Gain a bonus to damage rolls equal to a trait of your choice.' },
  { name: 'Invigorating', tier: 1, text: 'On a successful attack, roll a d4. On a result of 4, gain a Focus.' },
  {
    name: 'Quick',
    tier: 1,
    text: 'When you make an attack, you can spend a Focus or mark a Stress to target another creature within range with that attack.',
  },
  { name: 'Reliable', tier: 1, text: 'Gain a +1 bonus to your attack rolls.' },
  {
    name: 'Aggressive',
    tier: 2,
    text: 'Gain a −1 penalty to your Evasion. On a successful attack, roll an additional damage die and discard the lowest result.',
  },
  {
    name: 'Anchored',
    tier: 2,
    text: 'Gain a +2 bonus to your damage thresholds. While in this stance, you can’t be moved against your will.',
  },
  {
    name: 'Defensive',
    tier: 2,
    text: 'Attack rolls targeting you from within Melee range have disadvantage unless the attacker marks a Stress to negate the disadvantage.',
  },
  { name: 'Otherworldly', tier: 2, text: 'On a successful attack, you can deal physical or magic damage.' },
  {
    name: 'Grappling',
    tier: 3,
    text: 'On a successful attack within Melee range, you can spend a Focus or mark a Stress to temporarily Restrain the target or throw the target up to Close range.',
  },
  { name: 'Scary', tier: 3, text: 'On a successful attack, the target must mark a Stress.' },
  { name: 'Stable', tier: 3, text: 'You can spend a Focus instead of an Armor Slot to reduce damage.' },
  {
    name: 'Vigilant',
    tier: 3,
    text: 'When you are targeted by an attack, you can mark a Stress to gain a d6 bonus to your Evasion against the attack.',
  },
  {
    name: 'Crushing',
    tier: 4,
    text: 'When you deal Severe damage, you can spend a Hope to force the target to mark an additional Hit Point.',
  },
  {
    name: 'Exacting',
    tier: 4,
    text: 'When you roll a 1 on a damage die, you can treat it as the highest value on the die instead.',
  },
  {
    name: 'Honed',
    tier: 4,
    text: 'Spend a Focus before you make an attack roll to gain a +1 bonus to your Proficiency for that attack.',
  },
  {
    name: 'Isolating',
    tier: 4,
    text: 'Gain advantage on attack rolls when there are no other creatures within Very Close range of you or your target.',
  },
] as const satisfies readonly MartialStance[]
