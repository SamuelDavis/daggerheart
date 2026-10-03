import type { CharacterClass, Subclass } from '../../../types/srd'

export const executionersGuild = {
  name: 'Executioners Guild',
  description: 'Play the Executioners Guild if you want to strike down your targets with lethal precision.',
  spellcastTrait: 'Agility',
  foundation: [
    { name: 'First Strike', text: 'The first time in a scene you succeed on an attack, you deal double damage.' },
    { name: 'Ambush', text: 'Your “Marked for Death” feature uses d6s instead of d4s.' },
  ],
  specialization: [
    {
      name: 'Death Strike',
      text: 'When you deal Severe damage to a creature, you can mark a Stress to force them to mark an additional Hit Point.',
    },
    {
      name: 'Scorpion’s Poise',
      text: 'You gain a +2 bonus to your Evasion against attacks made by a creature you’ve Marked for Death.',
    },
  ],
  mastery: [
    {
      name: 'True Strike',
      text: 'Once per long rest when you fail an attack, you can spend a Hope to make it a success instead.',
    },
    { name: 'Backstab', text: 'Your “Marked for Death” feature uses d8s instead of d6s.' },
  ],
} as const satisfies Subclass

export const poisonersGuild = {
  name: 'Poisoners Guild',
  description: 'Play the Poisoners Guild if you want to debilitate your targets with punishing afflictions.',
  spellcastTrait: 'Knowledge',
  foundation: [
    {
      name: 'Toxic Concoctions',
      text: 'Mark a Stress to place 1d4+1 tokens on this card. When you make a successful weapon attack, you can spend a token to afflict the target with a poison. You know these poisons:\n• Ghost Petal: The target becomes temporarily Vulnerable.\n• Grave Spore: The target must also mark a Stress.\n• Leech Weed: You deal an extra 1d6 damage on this attack.\nWhen you take a long rest, clear all unspent tokens.',
      fields: [{ kind: 'counter', name: 'Tokens', value: 0 }],
    },
  ],
  specialization: [
    {
      name: 'Poison Compendium',
      text: 'You also know these poisons:\n• Midnight Vine: The target has disadvantage on attack rolls until it marks a Stress to clear this condition.\n• Gorgon Root: The target becomes temporarily Restrained.',
    },
    {
      name: 'Twin Fang',
      text: 'When you afflict a target Marked for Death with a poison you know, you can spend an additional token to also inflict the effect of a second poison you know.',
    },
  ],
  mastery: [
    {
      name: 'Venomancer',
      text: 'You also know these poisons:\n• Blight Seed: The target gains a −3 penalty to their damage thresholds until the end of the scene. This effect can’t stack.\n• Fear Leaf: You deal extra damage equal to the result of your Fear Die on this attack.\n• Corpse Thorn: The target gains disadvantage on reaction rolls until the end of the scene.',
    },
    { name: 'Adder’s Blessing', text: 'You are immune to poisons and other toxins.' },
  ],
} as const satisfies Subclass

export const assassin = {
  name: 'Assassin',
  description:
    'Assassins are masters at inflicting deadly injuries with precise strikes. Unlike those who wield violence as only a means to an end, assassins approach death as a profession. Many members of this class believe theirs is a worthy, if not sacred, trade, and some join guilds to hone their craft, define their beliefs, and earn money. People from all walks of life hire assassins for their skills: powerful rulers looking to avoid all-out war, business leaders seeking to eliminate the competition, and even average people hoping to settle a grudge. Often, an assassin is the last resort for killing those previously believed to be unkillable. While some of these deadly professionals will destroy anyone in their path for the right reasons or the right price, others hold strict moral codes or personal rules that dictate their targets. Those who end up the target of an assassin should count themselves among the dead.',
  domains: ['Blade', 'Midnight'],
  startingEvasion: 12,
  startingHitPoints: 5,
  classItems: ['A list of names with several marked off', 'A rusted blade inscribed with an insignia'],
  hopeFeature: { name: 'Deadly Determination', text: 'Spend 3 Hope to clear 2 Stress.' },
  features: [
    {
      name: 'Marked for Death',
      text: 'On a successful weapon attack, you can mark a Stress to make the target Marked for Death. When you deal damage to a target you’ve Marked for Death, add a number of d4s equal to your tier to the damage roll.\nYou can have only one adversary Marked for Death at a time. This condition lasts until you take a rest, the current adversary Marked for Death is defeated, or the GM spends a number of Fear equal to your tier to clear it.',
    },
    {
      name: 'Get In & Get Out',
      text: 'Spend a Hope to ask the GM for a quick or inconspicuous way into or out of a place you can see. The next roll you make that acts on this information has advantage.',
    },
  ],
  subclasses: [executionersGuild.name, poisonersGuild.name],
  backgroundQuestions: [
    'You once killed someone you were close to. What happened, and how did it change you?',
    'What organization trained you in the art of killing, and how did you become a member?',
    'Throughout your career, one target has eluded you. Who are they, and how have they slipped through your fingers?',
  ],
  connectionQuestions: [
    'I’ve killed someone for you. Who were they?',
    'How did you save me when I was on the brink of death? What have I promised you as repayment?',
    'What secret about myself did I tell you, and how did it change your view of me?',
  ],
} as const satisfies CharacterClass
