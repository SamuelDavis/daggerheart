import type { CharacterClass, Subclass } from '../../../types/srd'

export const elementalOrigin = {
  name: 'Elemental Origin',
  description: 'Play the Elemental Origin if you want to channel raw magic to take the shape of a particular element.',
  spellcastTrait: 'Instinct',
  foundation: [
    {
      name: 'Elementalist',
      text: 'Choose one of the following elements at character creation: air, earth, fire, lightning, water.\nYou can shape this element into harmless effects. Additionally, spend a Hope and describe how your control over this element helps an action roll you’re about to make, then either gain a +2 bonus to the roll or a +3 bonus to the roll’s damage.',
      fields: [
        {
          kind: 'choice',
          name: 'Element',
          value: [],
          options: ['Air', 'Earth', 'Fire', 'Lightning', 'Water'],
          count: 1,
        },
      ],
    },
  ],
  specialization: [
    {
      name: 'Natural Evasion',
      text: 'You can call forth your element to protect you from harm. When an attack roll against you succeeds, you can mark a Stress and describe how you use your element to defend you. When you do, roll a d6 and add its result to your Evasion against the attack.',
    },
  ],
  mastery: [
    {
      name: 'Transcendence',
      text: 'Once per long rest, you can transform into a physical manifestation of your element. When you do, describe your transformation and choose two of the following benefits to gain until your next rest:\n• +4 bonus to your Severe threshold\n• +1 bonus to a character trait of your choice\n• +1 bonus to your Proficiency\n• +2 bonus to your Evasion',
    },
  ],
} as const satisfies Subclass

export const primalOrigin = {
  name: 'Primal Origin',
  description: 'Play the Primal Origin if you want to extend the versatility of your spells in powerful ways.',
  spellcastTrait: 'Instinct',
  foundation: [
    {
      name: 'Manipulate Magic',
      text: 'Your primal origin allows you to modify the essence of magic itself. After you cast a spell or make an attack using a weapon that deals magic damage, you can mark a Stress to do one of the following:\n• Extend the spell or attack’s reach by one range\n• Gain a +2 bonus to the action roll’s result\n• Double a damage die of your choice\n• Hit an additional target within range',
    },
  ],
  specialization: [
    {
      name: 'Enchanted Aid',
      text: 'You can enhance the magic of others with your essence. When you Help an Ally with a Spellcast Roll, you can roll a d8 as your advantage die. Once per long rest, after an ally has made a Spellcast Roll with your help, you can swap the results of their Duality Dice.',
    },
  ],
  mastery: [
    {
      name: 'Arcane Charge',
      text: 'You can gather magical energy to enhance your capabilities. When you take magic damage, you become Charged. Alternatively, you can spend 2 Hope to become Charged. When you successfully make an attack that deals magic damage while Charged, you can clear your Charge to either gain a +10 bonus to the damage roll or gain a +3 bonus to the Difficulty of a reaction roll the spell causes the target to make. You stop being Charged at your next long rest.',
    },
  ],
} as const satisfies Subclass

export const sorcerer = {
  name: 'Sorcerer',
  description:
    'Not all innate magic users choose to hone their craft, but those who do can become powerful sorcerers. The gifts of these wielders are passed down through families, even if the family is unaware of or reluctant to practice them. A sorcerer’s abilities can range from the elemental to the illusionary and beyond, and many practitioners band together into collectives based on their talents. The act of becoming a formidable sorcerer is not the practice of acquiring power, but learning to cultivate and control the power one already possesses. The magic of a misguided or undisciplined sorcerer is a dangerous force indeed.',
  domains: ['Arcana', 'Midnight'],
  startingEvasion: 10,
  startingHitPoints: 6,
  classItems: ['A whispering orb', 'A family heirloom'],
  hopeFeature: {
    name: 'Volatile Magic',
    text: 'Spend 3 Hope to reroll any number of your damage dice on an attack that deals magic damage.',
  },
  features: [
    { name: 'Arcane Sense', text: 'You can sense the presence of magical people and objects within Close range.' },
    {
      name: 'Minor Illusion',
      text: 'Make a Spellcast Roll (10). On a success, you create a minor visual illusion no larger than yourself within Close range. This illusion is convincing to anyone at Close range or farther.',
    },
    {
      name: 'Channel Raw Power',
      text: 'Once per long rest, you can place a domain card from your loadout into your vault and choose to either:\n• Gain Hope equal to the level of the card.\n• Enhance a spell that deals damage, gaining a bonus to your damage roll equal to twice the level of the card.',
    },
  ],
  subclasses: [elementalOrigin.name, primalOrigin.name],
  backgroundQuestions: [
    'What did you do that made the people in your community wary of you?',
    'What mentor taught you to control your untamed magic, and why are they no longer able to guide you?',
    'You have a deep fear you hide from everyone. What is it, and why does it scare you?',
  ],
  connectionQuestions: [
    'Why do you trust me so deeply?',
    'What did I do that makes you cautious around me?',
    'Why do we keep our shared past a secret?',
  ],
} as const satisfies CharacterClass
