import type { CharacterClass, Subclass } from '../../../types/srd'

const additionalDomainCard = 'Take an additional domain card of your level or lower from a domain you have access to.'

export const schoolOfKnowledge = {
  name: 'School of Knowledge',
  description: 'Play the School of Knowledge if you want a keen understanding of the world around you.',
  spellcastTrait: 'Knowledge',
  foundation: [
    { name: 'Prepared', text: additionalDomainCard },
    {
      name: 'Adept',
      text: 'When you Utilize an Experience, you can mark a Stress instead of spending a Hope. If you do, double your Experience modifier for that roll.',
    },
  ],
  specialization: [
    { name: 'Accomplished', text: additionalDomainCard },
    {
      name: 'Perfect Recall',
      text: 'Once per rest, when you recall a domain card in your vault, you can reduce its Recall Cost by 1.',
    },
  ],
  mastery: [
    { name: 'Brilliant', text: additionalDomainCard },
    {
      name: 'Honed Expertise',
      text: 'When you use an Experience, roll a d6. On a result of 5 or higher, you can use it without spending Hope.',
    },
  ],
} as const satisfies Subclass

export const schoolOfWar = {
  name: 'School of War',
  description: 'Play the School of War if you want to utilize trained magic for violence.',
  spellcastTrait: 'Knowledge',
  foundation: [
    {
      name: 'Battlemage',
      text: 'You’ve focused your studies on becoming an unconquerable force on the battlefield. Gain an additional Hit Point slot.',
    },
    { name: 'Face Your Fear', text: 'When you succeed with Fear on an attack roll, you deal an extra 1d10 magic damage.' },
  ],
  specialization: [
    {
      name: 'Conjure Shield',
      text: 'You can maintain a protective barrier of magic. While you have at least 2 Hope, you add your Proficiency to your Evasion.',
    },
    {
      name: 'Fueled by Fear',
      text: 'The extra magic damage from your “Face Your Fear” feature increases to 2d10.',
    },
  ],
  mastery: [
    {
      name: 'Thrive in Chaos',
      text: 'When you succeed on an attack, you can mark a Stress after rolling damage to force the target to mark an additional Hit Point.',
    },
    { name: 'Have No Fear', text: 'The extra magic damage from your “Face Your Fear” feature increases to 3d10.' },
  ],
} as const satisfies Subclass

export const wizard = {
  name: 'Wizard',
  description:
    'Whether through an institution or individual study, those known as wizards acquire and hone immense magical power over years of learning using a variety of tools, including books, stones, potions, and herbs. Some wizards dedicate their lives to mastering a particular school of magic, while others learn from a wide variety of disciplines. Many wizards become wise and powerful figures in their communities, advising rulers, providing medicines and healing, and even leading war councils. While these mages all work toward the common goal of collecting magical knowledge, wizards often have the most conflict within their own ranks, as the acquisition, keeping, and sharing of powerful secrets is a topic of intense debate that has resulted in innumerable deaths.',
  domains: ['Codex', 'Splendor'],
  startingEvasion: 11,
  startingHitPoints: 5,
  classItems: ['A book you’re trying to translate', 'A tiny, harmless elemental pet'],
  hopeFeature: {
    name: 'Not This Time',
    text: 'Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll.',
  },
  features: [
    {
      name: 'Prestidigitation',
      text: 'You can perform harmless, subtle magical effects at will. For example, you can change an object’s color, create a smell, light a candle, cause a tiny object to float, illuminate a room, or repair a small object.',
    },
    {
      name: 'Strange Patterns',
      text: 'Choose a number between 1 and 12. When you roll that number on a Duality Die, gain a Hope or clear a Stress.\nYou can change this number when you take a long rest.',
      fields: [{ kind: 'text', name: 'Number', value: '' }],
    },
  ],
  subclasses: [schoolOfKnowledge.name, schoolOfWar.name],
  backgroundQuestions: [
    'What responsibilities did your community once count on you for? How did you let them down?',
    'You’ve spent your life searching for a book or object of great significance. What is it, and why is it so important to you?',
    'You have a powerful rival. Who are they, and why are you so determined to defeat them?',
  ],
  connectionQuestions: [
    'What favor have I asked of you that you’re not sure you can fulfill?',
    'What weird hobby or strange fascination do we both share?',
    'What secret about yourself have you entrusted only to me?',
  ],
} as const satisfies CharacterClass
