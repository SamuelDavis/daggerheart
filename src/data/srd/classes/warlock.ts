import type { CharacterClass, Subclass } from '../../../types/srd'

export const pactOfTheEndless = {
  name: 'Pact of the Endless',
  description: 'Play the Pact of the Endless if you want to stand strong against enemies and avoid death.',
  spellcastTrait: 'Presence',
  foundation: [
    {
      name: 'Patron’s Mantle',
      text: 'Spend a Favor to cloak yourself in a terrifying aspect of your Patron that lasts until you take Severe damage or the scene ends. While this effect is active, you gain a bonus to your damage thresholds equal to your tier and have advantage on action rolls to intimidate a target.',
    },
    {
      name: 'Deathless Embrace',
      text: 'Once per rest, spend any number of Favor to roll an equal number of Patron Dice. For each result of 4 or higher, clear a Hit Point.',
    },
  ],
  specialization: [
    {
      name: 'Harrowing Invocation',
      text: 'When an adversary targets you or an ally within Very Close range with an attack, you can spend a Favor to give them disadvantage on the roll. If the adversary fails the roll, they must also mark a Stress.',
    },
    { name: 'Damage Sink', text: 'Once per rest, you can spend a Favor to halve incoming damage.' },
  ],
  mastery: [
    {
      name: 'Dark Aegis',
      text: 'Once per long rest when you would take damage, you can spend a Favor instead of marking Hit Points.',
    },
    {
      name: 'Draining Bane',
      text: 'When an adversary targets you or an ally within Very Close range with an attack, you can spend a Favor to Drain them. When you do, they must mark a Stress, and you can clear a Stress. While Drained, the target uses a d12 instead of a d20 for attack rolls (including for advantage or disadvantage) until they fail a roll.',
    },
  ],
} as const satisfies Subclass

export const pactOfTheWrathful = {
  name: 'Pact of the Wrathful',
  description: 'Play the Pact of the Wrathful if you want to destroy those who act against you.',
  spellcastTrait: 'Presence',
  foundation: [
    {
      name: 'Patron’s Fury',
      text: 'Spend a Favor to imbue your attacks with your Patron’s power until you deal Severe damage or the scene ends. When you roll damage while this effect is active, you also roll a number of Patron Dice equal to your tier and add their total to the damage dealt.',
    },
    {
      name: 'Deadly Vengeance',
      text: 'When you mark any number of Hit Points from an attack, you can spend a Favor to roll an equal number of Patron Dice. For each result of 4 or higher, the attacker marks a Hit Point.',
    },
  ],
  specialization: [
    {
      name: 'Menacing Reach',
      text: 'Spend a Favor to increase the range of your primary weapon by one step (such as Melee to Very Close or Very Close to Close) to a maximum of Very Far range. This effect ends when you make a successful attack with that weapon.',
    },
    {
      name: 'Diminish My Foes',
      text: 'When you succeed with Hope on an action roll against a target, you can spend any number of Favor to force the target to mark an equal number of Stress.',
    },
  ],
  mastery: [
    {
      name: 'Fearsome Attack',
      text: 'Spend a Favor to reroll any number of your damage dice. You can continue spending Favor to use this feature on the same damage roll.',
    },
    {
      name: 'Otherworldly Ire',
      text: 'Once per rest when you take damage, you can spend any number of Favor to roll that many Patron Dice and target a number of creatures within Close range equal to the highest result. Each target must mark a Hit Point.',
    },
  ],
} as const satisfies Subclass

export const warlock = {
  name: 'Warlock',
  description:
    'Those who’ve traded their lives—or perhaps even their souls—to an otherworldly patron in exchange for incredible power are known as warlocks. Often, these mortals have reached a point of desperation that leads them to make this sacrifice: they hope to protect themselves or a loved one, aid their community, seek vengeance, increase their status, or otherwise further their ambitions. The powerful entities they entreat are as varied as the warlocks themselves: gods, spirits, demons, or other beings unknown to even the mortal who makes the pact. The entities each have their own sphere of influence that defines their otherworldly power, and those that collect souls are rarely known for their benevolence. Thus, a warlock’s power is defined by the relationship they maintain with their benefactor. Despite their terrifying magic, warlocks might find that someone or something else is pulling their strings.',
  domains: ['Dread', 'Grace'],
  startingEvasion: 11,
  startingHitPoints: 5,
  classItems: ['A carving that symbolizes your patron', 'A ring you can’t remove'],
  hopeFeature: {
    name: 'Patron’s Boon',
    text: 'When you fail a roll, you can spend 3 Hope to reroll with advantage.',
  },
  features: [
    {
      name: 'Patron’s Pact',
      text: 'You have committed yourself to a supernatural entity—such as a god, fae, or demon—in exchange for power. Write their name on your character sheet, then work with your GM to determine their sphere of influence (such as Nature, Chaos, Wisdom, Mischief, Love, War, Justice, or Death). Before making an action roll that relates to your patron’s sphere of influence, you can spend a Favor to call upon their aid, rolling your Patron Die and adding its result to the total. Your Patron Die starts at a d6 and increases to a d8 at level 5.\nWhen building a warlock, choose their patron’s sphere of influence from the list below or work with the GM to make your own.',
      fields: [
        { kind: 'text', name: 'Patron', value: '' },
        {
          kind: 'text',
          name: 'Sphere of influence',
          value: '',
          suggestions: [
            'Ambition',
            'Artists',
            'Chaos',
            'Darkness',
            'Death',
            'Gamblers',
            'Honor',
            'Justice',
            'Leaders',
            'Love',
            'Mercy',
            'Mischief',
            'Nature',
            'Protectors',
            'Revenge',
            'Scholars',
            'Secrets',
            'Soldiers',
            'Strength',
            'Travelers',
            'Tricksters',
            'Truth',
            'War',
            'Wisdom',
          ],
        },
        { kind: 'die', name: 'Patron Die', value: 'd6' },
      ],
    },
    {
      name: 'Favor',
      text: 'You start with 3 Favor. You can use a downtime move to show tribute to your patron. Describe how and gain Favor equal to your Spellcast trait. Additionally, when you succeed on an action roll with Hope, you can choose to gain a Favor instead of a Hope.\nNote: The maximum Favor you can hold at one time is 6.',
      fields: [{ kind: 'counter', play: true, name: 'Favor', value: 3, max: 6 }],
    },
  ],
  subclasses: [pactOfTheEndless.name, pactOfTheWrathful.name],
  backgroundQuestions: [
    'Who from your community shunned you after you made a pact with your patron?',
    'What desperate situation led you to pledge your life to your patron?',
    'Your patron has given you one task you must accomplish above all else. What is it, and why does it worry you?',
  ],
  connectionQuestions: [
    'Why do you think I confide in you about what my patron says and does?',
    'Our relationship has changed since you saw me show tribute to my patron. What did you see, and how has it affected you?',
    'I once did something very foolish, and you’ve never let me live it down. What was it?',
  ],
} as const satisfies CharacterClass
