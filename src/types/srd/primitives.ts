export const traits = [
  "Agility",
  "Strength",
  "Finesse",
  "Instinct",
  "Presence",
  "Knowledge",
] as const;
export type Trait = (typeof traits)[number];

export const traitModifierValues = [2, 1, 0, -1] as const;
export type TraitModifier = (typeof traitModifierValues)[number];

export const ranges = [
  "Melee",
  "Very Close",
  "Close",
  "Far",
  "Very Far",
] as const;
export type Range = (typeof ranges)[number];

export const damageTypes = ["phy", "mag"] as const;
export type DamageType = (typeof damageTypes)[number];

export const damageSeverities = ["Minor", "Major", "Severe"] as const;
export type DamageSeverity = (typeof damageSeverities)[number];

export const burdens = ["One-Handed", "Two-Handed"] as const;
export type Burden = (typeof burdens)[number];

export const weaponCategories = ["Primary", "Secondary"] as const;
export type WeaponCategory = (typeof weaponCategories)[number];

export const weaponKinds = ["Physical", "Magic"] as const;
export type WeaponKind = (typeof weaponKinds)[number];

export type Modifier = `+${number}` | `-${number}`;
export type Die = `d${number}`;
export type Dice = Die | `${number}${Die}`;
export type Roll = Dice | `${Dice}${Modifier}`;

export const tiers = [1, 2, 3, 4] as const;
export type Tier = (typeof tiers)[number];

export const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type Level = (typeof levels)[number];

export const currency = ["coin", "handful", "bag", "chest"] as const;
export type Currency = (typeof currency)[number];

export const domains = [
  "Arcana",
  "Blade",
  "Bone",
  "Codex",
  "Dread",
  "Grace",
  "Midnight",
  "Sage",
  "Splendor",
  "Valor",
] as const;
export type Domain = (typeof domains)[number];

export const domainCardTypes = ["Ability", "Spell", "Grimoire"] as const;
export type DomainCardType = (typeof domainCardTypes)[number];

export const subclassCardTypes = [
  "Foundation",
  "Specialization",
  "Mastery",
] as const;
export type SubclassCardType = (typeof subclassCardTypes)[number];

export const standardConditions = [
  "Hidden",
  "Restrained",
  "Vulnerable",
] as const;
export type StandardCondition = (typeof standardConditions)[number];

export const rollOutcomes = [
  "Critical Success",
  "Success with Hope",
  "Success with Fear",
  "Failure with Hope",
  "Failure with Fear",
] as const;
export type RollOutcome = (typeof rollOutcomes)[number];

export const restTypes = ["Short", "Long"] as const;
export type RestType = (typeof restTypes)[number];

export const lootRarities = [
  "Common",
  "Uncommon",
  "Rare",
  "Legendary",
] as const;
export type LootRarity = (typeof lootRarities)[number];

export const lootSets = ["Core Set", "Hope & Fear"] as const;
export type LootSet = (typeof lootSets)[number];

export const adversaryTypes = [
  "Bruiser",
  "Horde",
  "Leader",
  "Minion",
  "Ranged",
  "Skulk",
  "Social",
  "Solo",
  "Standard",
  "Support",
] as const;
export type AdversaryType = (typeof adversaryTypes)[number];

export const adversaryFeatureTypes = ["Action", "Reaction", "Passive"] as const;
export type AdversaryFeatureType = (typeof adversaryFeatureTypes)[number];

export const environmentTypes = [
  "Exploration",
  "Social",
  "Traversal",
  "Event",
] as const;
export type EnvironmentType = (typeof environmentTypes)[number];

export const countdownTypes = [
  "Standard",
  "Progress",
  "Consequence",
  "Loop",
  "Increasing",
  "Decreasing",
  "Long-Term",
] as const;
export type CountdownType = (typeof countdownTypes)[number];
