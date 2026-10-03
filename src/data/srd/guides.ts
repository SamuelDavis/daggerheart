import type { ClassGuide } from '../../types/srd'

export const guides = [
  {
    name: 'Assassin',
    tagline:
      'As an assassin, you blend expertise in stealth and a mastery over death, dealing fatal blows to the unwary with lethal accuracy.',
    suggestedTraits: {
      Agility: 2,
      Strength: -1,
      Finesse: 1,
      Instinct: 0,
      Presence: 0,
      Knowledge: 1,
    },
    suggestedPrimaryWeapon: 'Katana',
    suggestedArmor: 'Brigandine Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['finely tailored', 'hooded', 'incognito', 'padded for silence', 'sinister', 'weathered'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a butcher', 'a coiled viper', 'a hidden razor', 'a hunter', 'a judge', 'a merchant', 'an owl'],
      },
    ],
  },
  {
    name: 'Bard',
    tagline:
      'As a bard, you know how to get people to talk, bring attention to yourself, and use words or music to influence the world around you.',
    suggestedTraits: {
      Agility: 0,
      Strength: -1,
      Finesse: 1,
      Instinct: 0,
      Presence: 2,
      Knowledge: 1,
    },
    suggestedPrimaryWeapon: 'Rapier',
    suggestedSecondaryWeapon: 'Small Dagger',
    suggestedArmor: 'Gambeson Armor',
    spellFocus: {
      prompt: 'What you carry your spells in',
      suggestions: ['songbook', 'journal'],
    },
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['extravagant', 'fancy', 'loud', 'oversized', 'ragged', 'sleek', 'wild'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a barkeep', 'a magician', 'a ringmaster', 'a rock star', 'a swashbuckler'],
      },
    ],
  },
  {
    name: 'Brawler',
    tagline:
      'As a brawler, you’ve honed your body into a lethal weapon, allowing you to deliver powerful strikes that intimidate your foes.',
    suggestedTraits: {
      Agility: 1,
      Strength: 1,
      Finesse: 0,
      Instinct: 2,
      Presence: 0,
      Knowledge: -1,
    },
    suggestedArmor: 'Brigandine Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['bright', 'haphazard', 'practical', 'pristine', 'someone else’s', 'standard-issue'],
      },
      {
        prompt: 'Attitude like',
        suggestions: [
          'a flowing river',
          'a golden retriever',
          'a loose cannon',
          'a parent',
          'a protector',
          'a veteran',
        ],
      },
    ],
  },
  {
    name: 'Druid',
    tagline:
      'As a druid, you are a force of nature, preserving the balance of life and death by channeling the wilds themselves through you.',
    suggestedTraits: {
      Agility: 1,
      Strength: 0,
      Finesse: 1,
      Instinct: 2,
      Presence: -1,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Shortstaff',
    suggestedSecondaryWeapon: 'Round Shield',
    suggestedArmor: 'Leather Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['camouflaged', 'grown', 'loose', 'natural', 'patchwork', 'regal', 'scraps'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a firecracker', 'a fox', 'a guide', 'a hippie', 'a witch'],
      },
    ],
  },
  {
    name: 'Guardian',
    tagline:
      'As a guardian, you run into danger to protect your party, keeping watch over those who might not survive without you there.',
    suggestedTraits: {
      Agility: 1,
      Strength: 2,
      Finesse: -1,
      Instinct: 0,
      Presence: 1,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Battleaxe',
    suggestedArmor: 'Chainmail Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['casual', 'intricate', 'loose', 'padded', 'royal', 'tactical', 'weathered'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a captain', 'a caretaker', 'an elephant', 'a general', 'a wrestler'],
      },
    ],
  },
  {
    name: 'Ranger',
    tagline:
      'As a ranger, your keen eyes and graceful haste make you indispensable when tracking down enemies and navigating the wilds.',
    suggestedTraits: {
      Agility: 2,
      Strength: 0,
      Finesse: 1,
      Instinct: 1,
      Presence: -1,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Shortbow',
    suggestedArmor: 'Leather Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['flowing', 'muted', 'natural', 'stained', 'tactical', 'tight', 'woven'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a child', 'a ghost', 'a survivalist', 'a teacher', 'a watchdog'],
      },
    ],
  },
  {
    name: 'Rogue',
    tagline:
      'As a rogue, you have experience fighting with your blade as well as your wit, preferring to move quickly and fight quietly.',
    suggestedTraits: {
      Agility: 1,
      Strength: -1,
      Finesse: 2,
      Instinct: 0,
      Presence: 1,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Dagger',
    suggestedSecondaryWeapon: 'Small Dagger',
    suggestedArmor: 'Gambeson Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['clean', 'dark', 'inconspicuous', 'leather', 'scary', 'tactical', 'tight'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a bandit', 'a con artist', 'a gambler', 'a mob boss', 'a pirate'],
      },
    ],
  },
  {
    name: 'Seraph',
    tagline:
      'As a seraph, you’ve taken a vow to a god who helps you channel sacred arcane power to keep your party on their feet.',
    suggestedTraits: {
      Agility: 0,
      Strength: 2,
      Finesse: 0,
      Instinct: 1,
      Presence: 1,
      Knowledge: -1,
    },
    suggestedPrimaryWeapon: 'Hallowed Axe',
    suggestedSecondaryWeapon: 'Round Shield',
    suggestedArmor: 'Chainmail Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['glowing', 'rippling', 'ornate', 'tight', 'modest', 'strange', 'natural'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['an angel', 'a doctor', 'an evangelist', 'a monk', 'a priest'],
      },
    ],
  },
  {
    name: 'Sorcerer',
    tagline:
      'As a sorcerer, you were born with innate magical power, and you’ve learned how to wield that power to get what you want.',
    suggestedTraits: {
      Agility: 0,
      Strength: -1,
      Finesse: 1,
      Instinct: 2,
      Presence: 1,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Dualstaff',
    suggestedArmor: 'Gambeson Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['always moving', 'flamboyant', 'inconspicuous', 'layered', 'ornate', 'tight'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a celebrity', 'a commander', 'a politician', 'a prankster', 'a wolf in sheep’s clothing'],
      },
    ],
  },
  {
    name: 'Warlock',
    tagline: 'As a warlock, you’ve pledged your life to an otherworldly patron in exchange for extraordinary power.',
    suggestedTraits: {
      Agility: 1,
      Strength: -1,
      Finesse: 0,
      Instinct: 1,
      Presence: 2,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Scimitar',
    suggestedSecondaryWeapon: 'Fighting Cloak',
    suggestedArmor: 'Mage Robes',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['billowing', 'lavish', 'luminous', 'mended', 'neat', 'sacred', 'shadowy', 'smoking'],
      },
      {
        prompt: 'Attitude like',
        suggestions: [
          'a coming storm',
          'a devotee',
          'a hot mess',
          'a jester',
          'a live wire',
          'a monarch',
          'a soothsayer',
        ],
      },
    ],
  },
  {
    name: 'Warrior',
    tagline:
      'As a warrior, you run into battle without hesitation or caution, knowing you can strike down whatever enemy stands in your path.',
    suggestedTraits: {
      Agility: 2,
      Strength: 1,
      Finesse: 0,
      Instinct: 1,
      Presence: -1,
      Knowledge: 0,
    },
    suggestedPrimaryWeapon: 'Longsword',
    suggestedArmor: 'Chainmail Armor',
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['bold', 'patched', 'reinforced', 'royal', 'sleek', 'sparing', 'weathered'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a bull', 'a dedicated soldier', 'a gladiator', 'a hero', 'a hired hand'],
      },
    ],
  },
  {
    name: 'Witch',
    tagline:
      'As a witch, you use detailed knowledge of magical craft to weave spells that bolster your allies and hex your enemies.',
    suggestedTraits: {
      Agility: 0,
      Strength: -1,
      Finesse: 0,
      Instinct: 2,
      Presence: 1,
      Knowledge: 1,
    },
    suggestedPrimaryWeapon: 'Casting Dagger',
    suggestedSecondaryWeapon: 'Rune Shield',
    suggestedArmor: 'Mage Robes',
    spellFocus: {
      prompt: 'What you use for your craft',
      suggestions: ['a handwritten journal', 'runestones'],
    },
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['diaphanous', 'flowing', 'foreboding', 'ragged', 'stately', 'uniquely patterned'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['a candle flame', 'a cat', 'a doctor', 'an old tree', 'an oracle', 'a spider', 'a sunny day'],
      },
    ],
  },
  {
    name: 'Wizard',
    tagline:
      'As a wizard, you’ve become familiar with the arcane through the relentless study of grimoires and other tools of magic.',
    suggestedTraits: {
      Agility: -1,
      Strength: 0,
      Finesse: 0,
      Instinct: 1,
      Presence: 1,
      Knowledge: 2,
    },
    suggestedPrimaryWeapon: 'Greatstaff',
    suggestedArmor: 'Leather Armor',
    spellFocus: {
      prompt: 'What you carry your spells in',
      suggestions: ['large tomes', 'tarot cards'],
    },
    descriptionPrompts: [
      {
        prompt: 'Eyes like',
        suggestions: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
      },
      {
        prompt: 'Body that’s',
        suggestions: [
          'broad',
          'carved',
          'curvy',
          'lanky',
          'rotund',
          'short',
          'stocky',
          'tall',
          'thin',
          'tiny',
          'toned',
        ],
      },
      {
        prompt: 'Skin the color of',
        suggestions: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
      },
      {
        prompt: 'Clothes that are',
        suggestions: ['beautiful', 'clean', 'common', 'flowing', 'layered', 'patchwork', 'tight'],
      },
      {
        prompt: 'Attitude like',
        suggestions: ['an eccentric', 'a librarian', 'a lit fuse', 'a philosopher', 'a professor'],
      },
    ],
  },
] as const satisfies readonly ClassGuide[]
