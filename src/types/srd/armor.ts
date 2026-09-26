import type { Armor } from ".";

export const armor = [
  {
    tier: 1,
    name: "Mage Robes",
    baseThresholds: { major: 4, severe: 10 },
    baseScore: 2,
    feature: {
      name: "Enchanted",
      description:
        "Gain a bonus to your damage thresholds equal to your Spellcast trait.",
    },
  },
  {
    tier: 1,
    name: "Gambeson Armor",
    baseThresholds: { major: 5, severe: 11 },
    baseScore: 3,
    feature: { name: "Flexible", description: "+1 to Evasion" },
  },
  {
    tier: 1,
    name: "Brigandine Armor",
    baseThresholds: { major: 6, severe: 12 },
    baseScore: 3,
    feature: {
      name: "Lined",
      description: "Mark a Stress to negate Minor damage.",
    },
  },
  {
    tier: 1,
    name: "Leather Armor",
    baseThresholds: { major: 6, severe: 13 },
    baseScore: 3,
    feature: null,
  },
  {
    tier: 1,
    name: "Scale Mail Armor",
    baseThresholds: { major: 7, severe: 14 },
    baseScore: 3,
    feature: { name: "Cumbersome", description: "-1 to Finesse" },
  },
  {
    tier: 1,
    name: "Chainmail Armor",
    baseThresholds: { major: 7, severe: 15 },
    baseScore: 4,
    feature: { name: "Heavy", description: "-1 to Evasion" },
  },
  {
    tier: 1,
    name: "Banded Armor",
    baseThresholds: { major: 8, severe: 16 },
    baseScore: 4,
    feature: {
      name: "Bulky",
      description:
        "-1 to Evasion; when you take Severe damage, you must mark a Stress.",
    },
  },
  {
    tier: 1,
    name: "Full Plate Armor",
    baseThresholds: { major: 8, severe: 17 },
    baseScore: 4,
    feature: {
      name: "Very Heavy",
      description: "-2 to Evasion; -1 to Agility",
    },
  },
  {
    tier: 2,
    name: "Improved Mage Robes",
    baseThresholds: { major: 6, severe: 15 },
    baseScore: 3,
    feature: {
      name: "Enchanted",
      description:
        "Gain a bonus to your damage thresholds equal to your Spellcast trait.",
    },
  },
  {
    tier: 2,
    name: "Improved Gambeson Armor",
    baseThresholds: { major: 7, severe: 16 },
    baseScore: 4,
    feature: { name: "Flexible", description: "+1 to Evasion" },
  },
  {
    tier: 2,
    name: "Improved Brigandine Armor",
    baseThresholds: { major: 9, severe: 19 },
    baseScore: 4,
    feature: {
      name: "Lined",
      description: "Mark a Stress to negate Minor damage.",
    },
  },
  {
    tier: 2,
    name: "Improved Leather Armor",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: null,
  },
  {
    tier: 2,
    name: "Improved Scale Mail Armor",
    baseThresholds: { major: 11, severe: 23 },
    baseScore: 4,
    feature: { name: "Cumbersome", description: "-1 to Finesse" },
  },
  {
    tier: 2,
    name: "Improved Chainmail Armor",
    baseThresholds: { major: 11, severe: 24 },
    baseScore: 5,
    feature: { name: "Heavy", description: "-1 to Evasion" },
  },
  {
    tier: 2,
    name: "Improved Banded Armor",
    baseThresholds: { major: 13, severe: 27 },
    baseScore: 5,
    feature: {
      name: "Bulky",
      description:
        "-1 to Evasion; when you take Severe damage, you must mark a Stress.",
    },
  },
  {
    tier: 2,
    name: "Improved Full Plate Armor",
    baseThresholds: { major: 13, severe: 28 },
    baseScore: 5,
    feature: {
      name: "Very Heavy",
      description: "-2 to Evasion; -1 to Agility",
    },
  },
  {
    tier: 2,
    name: "Enchanter's Robes",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: {
      name: "Mnemonic",
      description:
        "Once per scene, you can recall a domain card from your vault without paying its Recall Cost.",
    },
  },
  {
    tier: 2,
    name: "Hawkguard's Mantle",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: {
      name: "Gliding",
      description:
        "You can glide up to Far range and are immune to damage from falling.",
    },
  },
  {
    tier: 2,
    name: "Spidersilk Tunic",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: {
      name: "Wall-Crawling",
      description:
        "+1 Evasion; you can walk on walls as easily as on the ground.",
    },
  },
  {
    tier: 2,
    name: "Stormthread Habit",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: {
      name: "Absorbing",
      description:
        "Once per scene when you take magic damage, you can clear an Armor Slot.",
    },
  },
  {
    tier: 2,
    name: "Elundrian Chain Armor",
    baseThresholds: { major: 9, severe: 21 },
    baseScore: 4,
    feature: {
      name: "Warded",
      description:
        "You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds.",
    },
  },
  {
    tier: 2,
    name: "Harrowbone Armor",
    baseThresholds: { major: 9, severe: 21 },
    baseScore: 4,
    feature: {
      name: "Resilient",
      description:
        "Before you mark your last Armor Slot, roll a d6. On a result of 6, reduce the severity by one threshold without marking an Armor Slot.",
    },
  },
  {
    tier: 2,
    name: "Irontree Breastplate Armor",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: {
      name: "Reinforced",
      description:
        "When you mark your last Armor Slot, increase your damage thresholds by +2 until you clear at least 1 Armor Slot.",
    },
  },
  {
    tier: 2,
    name: "Runetan Floating Armor",
    baseThresholds: { major: 9, severe: 20 },
    baseScore: 4,
    feature: {
      name: "Shifting",
      description:
        "When you are targeted for an attack, you can mark an Armor Slot to give the attack roll against you disadvantage.",
    },
  },
  {
    tier: 2,
    name: "Tyris Soft Armor",
    baseThresholds: { major: 8, severe: 18 },
    baseScore: 5,
    feature: {
      name: "Quiet",
      description: "You gain a +2 bonus to rolls you make to move silently.",
    },
  },
  {
    tier: 2,
    name: "Wyrdwood Splint Armor",
    baseThresholds: { major: 10, severe: 21 },
    baseScore: 5,
    feature: {
      name: "Quick-Striding",
      description:
        "You can't be Restrained and can move up to Far range as part of an action roll.",
    },
  },
  {
    tier: 2,
    name: "Rosewild Armor",
    baseThresholds: { major: 11, severe: 23 },
    baseScore: 5,
    feature: {
      name: "Hopeful",
      description:
        "When you would spend a Hope, you can mark an Armor Slot instead.",
    },
  },
  {
    tier: 2,
    name: "Trollhide Cuirass",
    baseThresholds: { major: 11, severe: 23 },
    baseScore: 5,
    feature: {
      name: "Self-Healing",
      description: "When you take a rest, clear an Armor Slot.",
    },
  },
  {
    tier: 2,
    name: "Gilded Sunplate",
    baseThresholds: { major: 12, severe: 26 },
    baseScore: 5,
    feature: {
      name: "Resplendent",
      description:
        "Once per scene when you spend Hope, you can clear an Armor Slot.",
    },
  },
  {
    tier: 3,
    name: "Advanced Mage Robes",
    baseThresholds: { major: 8, severe: 22 },
    baseScore: 4,
    feature: {
      name: "Enchanted",
      description:
        "Gain a bonus to your damage thresholds equal to your Spellcast trait.",
    },
  },
  {
    tier: 3,
    name: "Advanced Gambeson Armor",
    baseThresholds: { major: 9, severe: 23 },
    baseScore: 5,
    feature: { name: "Flexible", description: "+1 to Evasion" },
  },
  {
    tier: 3,
    name: "Advanced Brigandine Armor",
    baseThresholds: { major: 11, severe: 26 },
    baseScore: 5,
    feature: {
      name: "Lined",
      description: "Mark a Stress to negate Minor damage.",
    },
  },
  {
    tier: 3,
    name: "Advanced Leather Armor",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 5,
    feature: null,
  },
  {
    tier: 3,
    name: "Advanced Scale Mail Armor",
    baseThresholds: { major: 13, severe: 30 },
    baseScore: 5,
    feature: { name: "Cumbersome", description: "-1 to Finesse" },
  },
  {
    tier: 3,
    name: "Advanced Chainmail Armor",
    baseThresholds: { major: 13, severe: 31 },
    baseScore: 6,
    feature: { name: "Heavy", description: "-1 to Evasion" },
  },
  {
    tier: 3,
    name: "Advanced Banded Armor",
    baseThresholds: { major: 15, severe: 34 },
    baseScore: 6,
    feature: {
      name: "Bulky",
      description:
        "-1 to Evasion; when you take Severe damage, you must mark a Stress.",
    },
  },
  {
    tier: 3,
    name: "Advanced Full Plate Armor",
    baseThresholds: { major: 15, severe: 35 },
    baseScore: 6,
    feature: {
      name: "Very Heavy",
      description: "-2 to Evasion; -1 to Agility",
    },
  },
  {
    tier: 3,
    name: "Granminster's Finery",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 2,
    feature: {
      name: "Magnificent",
      description: "Gain a bonus to your Armor Score equal to your Presence.",
    },
  },
  {
    tier: 3,
    name: "Spiked Plate Armor",
    baseThresholds: { major: 10, severe: 25 },
    baseScore: 5,
    feature: {
      name: "Sharp",
      description:
        "On a successful attack against a target within Melee range, add a d4 to the damage roll.",
    },
  },
  {
    tier: 3,
    name: "Astral Raiment",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 5,
    feature: {
      name: "Stellar",
      description: "Mark a Stress to gain advantage on a Spellcast roll.",
    },
  },
  {
    tier: 3,
    name: "Bellamoi Fine Armor",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 5,
    feature: { name: "Gilded", description: "+1 to Presence" },
  },
  {
    tier: 3,
    name: "Cloverweave Cloak",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 5,
    feature: {
      name: "Fortune-Favored",
      description:
        "Once per scene, you can change a failure with Hope into a success with Fear.",
    },
  },
  {
    tier: 3,
    name: "Dragonscale Armor",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 5,
    feature: {
      name: "Impenetrable",
      description:
        "Once per short rest, when you would mark your last Hit Point, you can instead mark a Stress.",
    },
  },
  {
    tier: 3,
    name: "Skywarden's Lamellar",
    baseThresholds: { major: 11, severe: 27 },
    baseScore: 5,
    feature: { name: "Vigilant", description: "+2 to Evasion" },
  },
  {
    tier: 3,
    name: "Bloodstone Plate Armor",
    baseThresholds: { major: 13, severe: 35 },
    baseScore: 6,
    feature: {
      name: "Bloodthirsty",
      description:
        "When you critically succeed on a weapon attack within Melee range, clear a Hit Point.",
    },
  },
  {
    tier: 3,
    name: "Deep-Forged Coral Armor",
    baseThresholds: { major: 13, severe: 35 },
    baseScore: 6,
    feature: {
      name: "Aquatic",
      description:
        "You can breathe underwater and gain advantage on Agility Rolls while submerged.",
    },
  },
  {
    tier: 3,
    name: "Bladefare Armor",
    baseThresholds: { major: 16, severe: 39 },
    baseScore: 6,
    feature: {
      name: "Physical",
      description: "You can't mark an Armor Slot to reduce magic damage.",
    },
  },
  {
    tier: 3,
    name: "Monett's Cloak",
    baseThresholds: { major: 16, severe: 39 },
    baseScore: 6,
    feature: {
      name: "Magic",
      description: "You can't mark an Armor Slot to reduce physical damage.",
    },
  },
  {
    tier: 3,
    name: "Runes of Fortification",
    baseThresholds: { major: 17, severe: 43 },
    baseScore: 6,
    feature: {
      name: "Painful",
      description: "Each time you mark an Armor Slot, you must mark a Stress.",
    },
  },
  {
    tier: 4,
    name: "Legendary Mage Robes",
    baseThresholds: { major: 10, severe: 31 },
    baseScore: 5,
    feature: {
      name: "Enchanted",
      description:
        "Gain a bonus to your damage thresholds equal to your Spellcast trait.",
    },
  },
  {
    tier: 4,
    name: "Legendary Gambeson Armor",
    baseThresholds: { major: 11, severe: 32 },
    baseScore: 6,
    feature: { name: "Flexible", description: "+1 to Evasion" },
  },
  {
    tier: 4,
    name: "Legendary Brigandine Armor",
    baseThresholds: { major: 13, severe: 35 },
    baseScore: 6,
    feature: {
      name: "Lined",
      description: "Mark a Stress to negate Minor damage.",
    },
  },
  {
    tier: 4,
    name: "Legendary Leather Armor",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 6,
    feature: null,
  },
  {
    tier: 4,
    name: "Legendary Scale Mail Armor",
    baseThresholds: { major: 15, severe: 39 },
    baseScore: 6,
    feature: { name: "Cumbersome", description: "-1 to Finesse" },
  },
  {
    tier: 4,
    name: "Legendary Chainmail Armor",
    baseThresholds: { major: 15, severe: 40 },
    baseScore: 7,
    feature: { name: "Heavy", description: "-1 to Evasion" },
  },
  {
    tier: 4,
    name: "Legendary Banded Armor",
    baseThresholds: { major: 17, severe: 43 },
    baseScore: 7,
    feature: {
      name: "Bulky",
      description:
        "-1 to Evasion; when you take Severe damage, you must mark a Stress.",
    },
  },
  {
    tier: 4,
    name: "Legendary Full Plate Armor",
    baseThresholds: { major: 17, severe: 44 },
    baseScore: 7,
    feature: {
      name: "Very Heavy",
      description: "-2 to Evasion; -1 to Agility",
    },
  },
  {
    tier: 4,
    name: "Full Fortified Armor",
    baseThresholds: { major: 15, severe: 40 },
    baseScore: 4,
    feature: {
      name: "Fortified",
      description:
        "When you mark an Armor Slot, you reduce the severity of an attack by two thresholds instead of one.",
    },
  },
  {
    tier: 4,
    name: "Channeling Armor",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 5,
    feature: { name: "Channeling", description: "+1 to Spellcast Rolls" },
  },
  {
    tier: 4,
    name: "Darkweave Shroud",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 5,
    feature: {
      name: "Ghostwalker",
      description:
        "Once per rest, mark a Stress to move up to Close range through solid objects.",
    },
  },
  {
    tier: 4,
    name: "Emberwoven Armor",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 6,
    feature: {
      name: "Burning",
      description:
        "When an adversary attacks you within Melee range, they mark a Stress.",
    },
  },
  {
    tier: 4,
    name: "Godbound Laminar",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 6,
    feature: {
      name: "Divine",
      description: "When you mark an Armor Slot, gain a Hope.",
    },
  },
  {
    tier: 4,
    name: "Veritas Opal Armor",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 6,
    feature: {
      name: "Truthseeking",
      description:
        "This armor glows when another creature within Close range tells a lie.",
    },
  },
  {
    tier: 4,
    name: "Circle-Forged Dreadplate",
    baseThresholds: { major: 14, severe: 38 },
    baseScore: 6,
    feature: {
      name: "Accursed",
      description:
        "When you mark any number of Hit Points from an attack, roll a d4. On a result of 4, the attacker must mark an equal number of Stress.",
    },
  },
  {
    tier: 4,
    name: "Rune-Forged Exosuit",
    baseThresholds: { major: 12, severe: 39 },
    baseScore: 7,
    feature: {
      name: "Attuned",
      description:
        "The maximum number of domain cards in your loadout is reduced by one, but you gain a bonus to your damage thresholds equal to your tier.",
    },
  },
  {
    tier: 4,
    name: "Dunamis Silkchain",
    baseThresholds: { major: 13, severe: 36 },
    baseScore: 7,
    feature: {
      name: "Timeslowing",
      description:
        "Mark an Armor Slot to roll a d4 and add its result as a bonus to your Evasion against an incoming attack.",
    },
  },
  {
    tier: 4,
    name: "Hallowed Heroplate",
    baseThresholds: { major: 13, severe: 35 },
    baseScore: 7,
    feature: {
      name: "Blessed",
      description:
        "Once per long rest, you can spend any number of Hope before you make the Risk It All death move. You gain a bonus to the result of your Hope Die equal to the number of Hope spent.",
    },
  },
  {
    tier: 4,
    name: "Resonant Harness",
    baseThresholds: { major: 15, severe: 40 },
    baseScore: 7,
    feature: {
      name: "Vitreous",
      description:
        "When you would take Severe or greater damage, you can mark 2 Armor Slots to negate that damage. If you do, you gain a -5 penalty to your damage thresholds until you choose to repair your armor as a downtime move.",
    },
  },
  {
    tier: 4,
    name: "Savior Chainmail",
    baseThresholds: { major: 18, severe: 48 },
    baseScore: 8,
    feature: {
      name: "Difficult",
      description: "-1 to all character traits and Evasion",
    },
  },
] satisfies Armor[];

export const everydayHeroArmor = [
  {
    tier: 1,
    name: "Quilted Clothing",
    baseThresholds: { major: 5, severe: 11 },
    baseScore: 3,
    feature: { name: "Flexible", description: "+1 to Evasion" },
  },
  {
    tier: 1,
    name: "Leather Apron",
    baseThresholds: { major: 6, severe: 13 },
    baseScore: 3,
    feature: null,
  },
  {
    tier: 1,
    name: "Tree Bark Armor",
    baseThresholds: { major: 7, severe: 15 },
    baseScore: 4,
    feature: { name: "Heavy", description: "-1 to Evasion" },
  },
  {
    tier: 1,
    name: "Baking Tray Breastplate",
    baseThresholds: { major: 8, severe: 17 },
    baseScore: 4,
    feature: {
      name: "Very Heavy",
      description: "-2 to Evasion; -1 to Agility",
    },
  },
] satisfies Armor[];

export const monsterHuntingArmor = [
  {
    tier: 1,
    name: "Coffinwood Armor",
    baseThresholds: { major: 4, severe: 10 },
    baseScore: 3,
    feature: {
      name: "Splintering",
      description:
        "Gain a bonus to your damage thresholds equal to your unmarked Armor Slots.",
    },
  },
  {
    tier: 1,
    name: "Leather Longcoat",
    baseThresholds: { major: 5, severe: 12 },
    baseScore: 3,
    feature: {
      name: "Quiet",
      description: "Gain a +2 bonus to rolls you make to move silently.",
    },
  },
  {
    tier: 1,
    name: "Silverweave Armor",
    baseThresholds: { major: 5, severe: 11 },
    baseScore: 3,
    feature: {
      name: "Warded",
      description:
        "You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds. TRANSFORMATIONS",
    },
  },
  {
    tier: 2,
    name: "Coffinwood Armor",
    baseThresholds: { major: 6, severe: 15 },
    baseScore: 4,
    feature: {
      name: "Splintering",
      description:
        "Gain a bonus to your damage thresholds equal to your unmarked Armor Slots.",
    },
  },
  {
    tier: 2,
    name: "Leather Longcoat",
    baseThresholds: { major: 8, severe: 18 },
    baseScore: 4,
    feature: {
      name: "Quiet",
      description: "Gain a +2 bonus to rolls you make to move silently.",
    },
  },
  {
    tier: 2,
    name: "Silverweave Armor",
    baseThresholds: { major: 7, severe: 16 },
    baseScore: 4,
    feature: {
      name: "Warded",
      description:
        "You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds. TRANSFORMATIONS",
    },
  },
  {
    tier: 3,
    name: "Coffinwood Armor",
    baseThresholds: { major: 8, severe: 22 },
    baseScore: 5,
    feature: {
      name: "Splintering",
      description:
        "Gain a bonus to your damage thresholds equal to your unmarked Armor Slots.",
    },
  },
  {
    tier: 3,
    name: "Leather Longcoat",
    baseThresholds: { major: 10, severe: 25 },
    baseScore: 5,
    feature: {
      name: "Quiet",
      description: "Gain a +2 bonus to rolls you make to move silently.",
    },
  },
  {
    tier: 3,
    name: "Silverweave Armor",
    baseThresholds: { major: 9, severe: 23 },
    baseScore: 5,
    feature: {
      name: "Warded",
      description:
        "You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds. TRANSFORMATIONS",
    },
  },
  {
    tier: 4,
    name: "Coffinwood Armor",
    baseThresholds: { major: 10, severe: 31 },
    baseScore: 6,
    feature: {
      name: "Splintering",
      description:
        "Gain a bonus to your damage thresholds equal to your unmarked Armor Slots.",
    },
  },
  {
    tier: 4,
    name: "Leather Longcoat",
    baseThresholds: { major: 12, severe: 34 },
    baseScore: 6,
    feature: {
      name: "Quiet",
      description: "Gain a +2 bonus to rolls you make to move silently.",
    },
  },
  {
    tier: 4,
    name: "Silverweave Armor",
    baseThresholds: { major: 11, severe: 32 },
    baseScore: 6,
    feature: {
      name: "Warded",
      description:
        "You reduce incoming magic damage by your Armor Score before applying it to your damage thresholds. TRANSFORMATIONS",
    },
  },
] satisfies Armor[];
