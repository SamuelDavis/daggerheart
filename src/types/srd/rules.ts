import type {
  AdversaryBenchmark,
  Advancement,
  CharacterCreationRules,
  Condition,
  CurrencyConversion,
  DeathMove,
  Difficulty,
  DowntimeMove,
  Level,
  ResourceLimits,
  RollOutcomeDefinition,
  TierAchievement,
  TierBenchmark,
  TierDefinition,
  TierScaled,
  TraitVerbs,
} from ".";

export const characterCreationRules = {
  startingLevel: 1,
  startingProficiency: 1,
  startingHope: 2,
  startingStressSlots: 6,
  startingDomainCards: 2,
  startingExperiences: 2,
  startingExperienceModifier: 2,
  traitModifiers: [2, 1, 1, 0, 0, -1],
  startingInventory: ["A torch", "50 feet of rope", "Basic supplies"],
  startingGold: { amount: 1, currency: "handful" },
  startingConsumableChoices: ["Minor Health Potion", "Minor Stamina Potion"],
} as const satisfies CharacterCreationRules;

export const resourceLimits = {
  maxHope: 6,
  maxFear: 12,
  maxHitPoints: 12,
  maxStress: 12,
  maxArmorScore: 12,
  maxLoadout: 5,
  maxBurden: 2,
  maxInventoryWeapons: 2,
  maxConsumablesOfEachType: 5,
  maxAdvantageDice: 1,
} as const satisfies ResourceLimits;

export const currencyConversions = [
  { from: "handful", to: "bag", rate: 10 },
  { from: "bag", to: "chest", rate: 10 },
] as const satisfies readonly CurrencyConversion[];

export const tierDefinitions = [
  { tier: 1, levels: [1] },
  { tier: 2, levels: [2, 3, 4] },
  { tier: 3, levels: [5, 6, 7] },
  { tier: 4, levels: [8, 9, 10] },
] as const satisfies readonly TierDefinition[];

export const tierAchievements = [
  {
    level: 2,
    newExperience: true,
    proficiencyIncrease: 1,
    clearMarkedTraits: false,
  },
  {
    level: 5,
    newExperience: true,
    proficiencyIncrease: 1,
    clearMarkedTraits: true,
  },
  {
    level: 8,
    newExperience: true,
    proficiencyIncrease: 1,
    clearMarkedTraits: true,
  },
] as const satisfies readonly TierAchievement[];

export const advancements = [
  {
    name: "Increase Character Traits",
    description:
      "Choose two unmarked character traits and gain a permanent +1 bonus to them. You can't increase these stats again until the next tier (when your tier achievement allows you to clear those marks).",
    cost: 1,
    tiers: [2, 3, 4],
    class: null,
  },
  {
    name: "Add Hit Point Slot",
    description: "Permanently add 1 or more Hit Point slots.",
    cost: 1,
    tiers: [2, 3, 4],
    class: null,
  },
  {
    name: "Add Stress Slot",
    description: "Permanently add 1 or more Stress slots.",
    cost: 1,
    tiers: [2, 3, 4],
    class: null,
  },
  {
    name: "Increase Experiences",
    description:
      "Choose two Experiences on your character sheet and gain a permanent +1 bonus to both.",
    cost: 1,
    tiers: [2, 3, 4],
    class: null,
  },
  {
    name: "Additional Domain Card",
    description:
      "You can choose an additional domain card at or below your level or from your class's domains. If you've multiclassed, you can instead select a card at or below half your level from your chosen multiclass domain.",
    cost: 1,
    tiers: [2, 3, 4],
    class: null,
  },
  {
    name: "Increase Evasion",
    description: "Gain a permanent +1 bonus to your Evasion.",
    cost: 1,
    tiers: [2, 3, 4],
    class: null,
  },
  {
    name: "Upgraded Subclass Card",
    description:
      "Take the next card for your subclass. If you have only the foundation card, take a specialization; if you have a specialization already, take a mastery. Then cross out this tier's multiclass option.",
    cost: 1,
    tiers: [3, 4],
    class: null,
  },
  {
    name: "Increase Proficiency",
    description:
      'Fill in one of the open circles in the "Proficiency" section of your character sheet, then increase your weapon\'s number of damage dice by 1.',
    cost: 2,
    tiers: [3, 4],
    class: null,
  },
  {
    name: "Multiclass",
    description:
      'Choose an additional class, select one of its domains, and gain its class feature. Add the appropriate multiclass module to your character sheet and take the foundation card from one of its subclasses. Then cross out the "upgraded subclass" advancement option in this tier and all other "multiclass" advancement options on your character sheet.',
    cost: 2,
    tiers: [3, 4],
    class: null,
  },
  {
    name: "Increase Combo Die",
    description:
      "Permanently increase your Combo Die by one step (d4 to d6, d6 to d8, etc.).",
    cost: 1,
    tiers: [2, 3, 4],
    class: "Brawler",
  },
] as const satisfies readonly Advancement[];

export const additionalDomainCardMaxLevelByTier = [
  { tier: 2, value: 4 },
  { tier: 3, value: 7 },
  { tier: 4, value: 10 },
] as const satisfies TierScaled<Level>;

export const multiclassMinimumLevel = 5 satisfies Level;

export const multiclassDomainCardLevelDivisor = 2;

export const traitVerbs = {
  Agility: ["Sprint", "Leap", "Maneuver"],
  Strength: ["Lift", "Smash", "Grapple"],
  Finesse: ["Control", "Hide", "Tinker"],
  Instinct: ["Perceive", "Sense", "Navigate"],
  Presence: ["Charm", "Perform", "Deceive"],
  Knowledge: ["Recall", "Analyze", "Comprehend"],
} as const satisfies TraitVerbs;

export const difficulties = [
  { value: 5, label: "Very Easy" },
  { value: 10, label: "Easy" },
  { value: 15, label: "Average" },
  { value: 20, label: "Hard" },
  { value: 25, label: "Very Hard" },
  { value: 30, label: "Nearly Impossible" },
] as const satisfies readonly Difficulty[];

export const conditions = [
  {
    name: "Hidden",
    description:
      "While you're out of sight from all enemies and they don't otherwise know your location, you gain the Hidden condition. Any rolls against a Hidden creature have disadvantage. After an adversary moves to where they would see you, you move into their line of sight, or you make an attack, you are no longer Hidden.",
  },
  {
    name: "Restrained",
    description:
      "Restrained characters can't move, but you can still take actions from their current position.",
  },
  {
    name: "Vulnerable",
    description:
      "When a creature is Vulnerable, all rolls targeting them have advantage.",
  },
] as const satisfies readonly Condition[];

export const downtimeMoves = [
  {
    name: "Tend to Wounds",
    rest: "Short",
    description: "Clear 1d4+Tier Hit Points for yourself or an ally.",
  },
  {
    name: "Clear Stress",
    rest: "Short",
    description: "Clear 1d4+Tier Stress.",
  },
  {
    name: "Repair Armor",
    rest: "Short",
    description: "Clear 1d4+Tier Armor Slots from your or an ally's armor.",
  },
  {
    name: "Prepare (Short Rest)",
    rest: "Short",
    description:
      "Describe how you prepare yourself for the path ahead, then gain a Hope. If you choose to Prepare with one or more members of your party, you each gain 2 Hope.",
  },
  {
    name: "Tend to All Wounds",
    rest: "Long",
    description: "Clear all Hit Points for yourself or an ally.",
  },
  {
    name: "Clear All Stress",
    rest: "Long",
    description: "Clear all Stress.",
  },
  {
    name: "Repair All Armor",
    rest: "Long",
    description: "Clear all Armor Slots from your or an ally's armor.",
  },
  {
    name: "Prepare (Long Rest)",
    rest: "Long",
    description:
      "Describe how you prepare for the next day's adventure, then gain a Hope. If you choose to Prepare with one or more members of your party, you each gain 2 Hope.",
  },
  {
    name: "Work on a Project",
    rest: "Long",
    description:
      "With GM approval, a PC may pursue a long-term project, such as deciphering an ancient text or crafting a new weapon. The first time they start a new project, assign it a countdown. Each time a PC makes the Work on a Project move, they either advance their project's countdown automatically or make an action roll to advance it (GM's choice).",
  },
] as const satisfies readonly DowntimeMove[];

export const deathMoves = [
  {
    name: "Blaze of Glory",
    description:
      "Your character embraces death and goes out in a blaze of glory. Take one final action. It automatically critically succeeds (with GM approval), and then you cross through the veil of death.",
  },
  {
    name: "Avoid Death",
    description:
      "Your character avoids death and faces the consequences. They temporarily drop unconscious, and then you work with the GM to describe how the situation worsens. While unconscious, your character can't move or act, and they can't be targeted by an attack. They return to consciousness when an ally clears 1 or more of their marked Hit Points or when the party finishes a long rest. After your character falls unconscious, roll your Hope Die. If its value is equal to or less than your character's level, they gain a scar: permanently cross out a Hope slot and work with the GM to determine its lasting narrative impact and how, if possible, it can be restored. If you ever cross out your last Hope slot, your character's journey ends.",
  },
  {
    name: "Risk It All",
    description:
      "Roll your Duality Dice. If the Hope Die is higher, your character stays on their feet and clears a number of Hit Points or Stress equal to the value of the Hope Die (you can divide the Hope Die value between Hit Points and Stress however you'd prefer). If the Fear Die is higher, your character crosses through the veil of death. If the Duality Dice show matching results, your character stays up and clears all Hit Points and Stress.",
  },
] as const satisfies readonly DeathMove[];

export const rollOutcomeDefinitions = [
  {
    outcome: "Critical Success",
    description:
      'If the Duality Dice show matching results, you rolled a "Critical Success" ("Crit"). You automatically succeed with a bonus, gain a Hope, and clear a Stress. If this was an attack roll, you deal critical damage. A Critical Success counts as a roll "with Hope."',
  },
  {
    outcome: "Success with Hope",
    description:
      'If your total meets or beats the Difficulty AND your Hope Die shows a higher result than your Fear Die, you rolled a "Success with Hope." You succeed and gain a Hope, and the spotlight stays with the players.',
  },
  {
    outcome: "Success with Fear",
    description:
      'If your total meets or beats the Difficulty AND your Fear Die shows a higher result than your Hope Die, you rolled a "Success with Fear." You succeed with a cost or complication, but the GM gains a Fear, then takes the spotlight.',
  },
  {
    outcome: "Failure with Hope",
    description:
      'If your total is less than the Difficulty AND your Hope Die shows a higher result than your Fear Die, you rolled a "Failure with Hope." You fail with a minor consequence and gain a Hope, then the spotlight swings to the GM.',
  },
  {
    outcome: "Failure with Fear",
    description:
      'If your total is less than the Difficulty AND your Fear Die shows a higher result than your Hope Die, you rolled a "Failure with Fear." You fail with a major consequence and the GM gains a Fear, then the spotlight swings to the GM.',
  },
] as const satisfies readonly RollOutcomeDefinition[];

export const adversaryBenchmarks = [
  {
    tier: 1,
    attackModifier: 1,
    damage: ["1d6+2", "1d12+4"],
    difficulty: 11,
    thresholds: { major: 7, severe: 12 },
  },
  {
    tier: 2,
    attackModifier: 2,
    damage: ["2d6+3", "2d12+4"],
    difficulty: 14,
    thresholds: { major: 10, severe: 20 },
  },
  {
    tier: 3,
    attackModifier: 3,
    damage: ["3d8+3", "3d12+5"],
    difficulty: 17,
    thresholds: { major: 20, severe: 32 },
  },
  {
    tier: 4,
    attackModifier: 4,
    damage: ["4d8+10", "4d12+15"],
    difficulty: 20,
    thresholds: { major: 25, severe: 45 },
  },
] as const satisfies readonly AdversaryBenchmark[];

export const environmentBenchmarks = [
  { tier: 1, damage: ["1d6+1", "1d8+3"], difficulty: 11 },
  { tier: 2, damage: ["2d6+3", "2d10+2"], difficulty: 14 },
  { tier: 3, damage: ["3d8+3", "3d10+1"], difficulty: 17 },
  { tier: 4, damage: ["4d8+3", "4d10+10"], difficulty: 20 },
] as const satisfies readonly TierBenchmark[];
