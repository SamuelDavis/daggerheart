import type { CharacterClass, Subclass } from '../../../types/srd'

export const beastbound = {
  name: 'Beastbound',
  description: 'Play the Beastbound if you want to form a deep bond with an animal ally.',
  spellcastTrait: 'Agility',
  foundation: [
    {
      name: 'Companion',
      text: 'You have an animal companion of your choice (at the GM’s discretion). They stay by your side unless you tell them otherwise.\nTake the Ranger Companion sheet. When you level up your character, choose a level-up option for your companion from this sheet as well.',
      fields: [
        {
          kind: 'companion',
          name: 'Companion',
          value: {
            name: '',
            species: '',
            evasion: 10,
            experiences: [],
            attack: { description: '', die: 'd6', range: 'Melee', damageType: 'physical' },
            stress: { max: 3, marked: 0 },
            training: [],
          },
        },
      ],
    },
  ],
  specialization: [
    { name: 'Expert Training', text: 'Choose an additional level-up option for your companion.' },
    {
      name: 'Battle-Bonded',
      text: 'When an adversary attacks you while they’re within your companion’s Melee range, you gain a +2 bonus to your Evasion against the attack.',
    },
  ],
  mastery: [
    { name: 'Advanced Training', text: 'Choose two additional level-up options for your companion.' },
    {
      name: 'Loyal Friend',
      text: 'Once per long rest, when the damage from an attack would mark your companion’s last Stress or your last Hit Point and you’re within Close range of each other, you or your companion can rush to the other’s side and take that damage instead.',
    },
  ],
} as const satisfies Subclass

export const wayfinder = {
  name: 'Wayfinder',
  description: 'Play the Wayfinder if you want to hunt your prey and strike with deadly force.',
  spellcastTrait: 'Agility',
  foundation: [
    {
      name: 'Ruthless Predator',
      text: 'When you make a damage roll, you can mark a Stress to gain a +1 bonus to your Proficiency. Additionally, when you deal Severe damage to an adversary, they must mark a Stress.',
    },
    {
      name: 'Path Forward',
      text: 'When you’re traveling to a place you’ve previously visited or you carry an object that has been at the location before, you can identify the shortest, most direct path to your destination.',
    },
  ],
  specialization: [
    {
      name: 'Elusive Predator',
      text: 'When your Focus makes an attack against you, you gain a +2 bonus to your Evasion against the attack.',
    },
  ],
  mastery: [
    {
      name: 'Apex Predator',
      text: 'Before you make an attack roll against your Focus, you can spend a Hope. On a successful attack, you remove a Fear from the GM’s Fear pool.',
    },
  ],
} as const satisfies Subclass

export const ranger = {
  name: 'Ranger',
  description:
    'Rangers are highly skilled hunters who, despite their martial abilities, rarely lend their skills to an army. Through mastery of the body and a deep understanding of the wilderness, rangers become sly tacticians, pursuing their quarry with cunning and patience. Many rangers track and fight alongside an animal companion with whom they’ve forged a powerful spiritual bond. By honing their skills in the wild, rangers become expert trackers, as likely to ensnare their foes in a trap as they are to assail them head-on.',
  domains: ['Bone', 'Sage'],
  startingEvasion: 12,
  startingHitPoints: 6,
  classItems: ['A trophy from your first kill', 'A seemingly broken compass'],
  hopeFeature: {
    name: 'Hold Them Off',
    text: 'Spend 3 Hope when you succeed on an attack with a weapon to use that same roll against two additional adversaries within range of the attack.',
  },
  features: [
    {
      name: 'Ranger’s Focus',
      text: 'Spend a Hope and make an attack against a target. On a success, deal your attack’s normal damage and temporarily make the attack’s target your Focus. Until this feature ends or you make a different creature your Focus, you gain the following benefits against your Focus:\n• You know precisely what direction they are in.\n• When you deal damage to them, they must mark a Stress.\n• When you fail an attack against them, you can end your Ranger’s Focus feature to reroll your Duality Dice.',
    },
  ],
  subclasses: [beastbound.name, wayfinder.name],
  backgroundQuestions: [
    'A terrible creature hurt your community, and you’ve vowed to hunt them down. What are they, and what unique trail or sign do they leave behind?',
    'Your first kill almost killed you, too. What was it, and what part of you was never the same after that event?',
    'You’ve traveled many dangerous lands, but what is the one place you refuse to go?',
  ],
  connectionQuestions: [
    'What friendly competition do we have?',
    'Why do you act differently when we’re alone than when others are around?',
    'What threat have you asked me to watch for, and why are you worried about it?',
  ],
} as const satisfies CharacterClass
