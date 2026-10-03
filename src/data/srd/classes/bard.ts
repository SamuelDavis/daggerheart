import type { CharacterClass, Subclass } from '../../../types/srd'

export const troubadour = {
  name: 'Troubadour',
  description: 'Play the Troubadour if you want to play music to bolster your allies.',
  spellcastTrait: 'Presence',
  foundation: [
    {
      name: 'Gifted Performer',
      text: 'You can play three different types of songs, once each per long rest; describe how you perform for others to gain the listed benefit:\n• Relaxing Song: You and all allies within Close range clear a Hit Point.\n• Epic Song: Make a target within Close range temporarily Vulnerable.\n• Heartbreaking Song: You and all allies within Close range gain a Hope.',
    },
  ],
  specialization: [
    {
      name: 'Maestro',
      text: 'Your rallying songs steel the courage of those who listen. When you give a Rally Die to an ally, they can gain a Hope or clear a Stress.',
    },
  ],
  mastery: [
    {
      name: 'Virtuoso',
      text: 'You are among the greatest of your craft and your skill is boundless. You can perform each of your “Gifted Performer” feature’s songs twice per long rest.',
    },
  ],
} as const satisfies Subclass

export const wordsmith = {
  name: 'Wordsmith',
  description: 'Play the Wordsmith if you want to use clever wordplay and captivate crowds.',
  spellcastTrait: 'Presence',
  foundation: [
    {
      name: 'Rousing Speech',
      text: 'Once per long rest, you can give a heartfelt, inspiring speech. All allies within Far range clear 2 Stress.',
    },
    {
      name: 'Heart of a Poet',
      text: 'After you make an action roll to impress, persuade, or offend someone, you can spend a Hope to add a d4 to the roll.',
    },
  ],
  specialization: [
    {
      name: 'Eloquent',
      text: 'Your moving words boost morale. Once per session, when you encourage an ally, you can do one of the following:\n• Allow them to find a mundane object or tool they need.\n• Help an Ally without spending Hope.\n• Give them an additional downtime move during their next rest.',
    },
  ],
  mastery: [
    {
      name: 'Epic Poetry',
      text: 'Your Rally Die increases to a d10. Additionally, when you Help an Ally, you can narrate the moment as if you were writing the tale of their heroism in a memoir. When you do, roll a d10 as your advantage die.',
    },
  ],
} as const satisfies Subclass

export const bard = {
  name: 'Bard',
  description:
    'Bards are the most charismatic people in all the realms. Members of this class are masters of captivation and specialize in a variety of performance types, including singing, playing musical instruments, weaving tales, or telling jokes. Whether performing for an audience or speaking to an individual, bards thrive in social situations. Members of this profession bond and train at schools or guilds, but a current of egotism runs through those of the bardic persuasion. While they may be the most likely class to bring people together, a bard of ill temper can just as easily tear a party apart.',
  domains: ['Grace', 'Codex'],
  startingEvasion: 10,
  startingHitPoints: 5,
  classItems: ['A romance novel', 'A letter never opened'],
  hopeFeature: {
    name: 'Make a Scene',
    text: 'Spend 3 Hope to temporarily Distract a target within Close range, giving them a −2 penalty to their Difficulty.',
  },
  features: [
    {
      name: 'Rally',
      text: 'Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. At the end of each session, clear all unspent Rally Dice. At level 5, your Rally Die increases to a d8.',
      fields: [{ kind: 'die', name: 'Rally Die', value: 'd6' }],
    },
  ],
  subclasses: [troubadour.name, wordsmith.name],
  backgroundQuestions: [
    'Who from your community taught you to have such confidence in yourself?',
    'You were in love once. Who did you adore, and how did they hurt you?',
    'You’ve always looked up to another bard. Who are they, and why do you idolize them?',
  ],
  connectionQuestions: [
    'What made you realize we were going to be such good friends?',
    'What do I do that annoys you?',
    'Why do you grab my hand at night?',
  ],
} as const satisfies CharacterClass
