import type {
  AdversaryFeatureType,
  AdversaryType,
  Burden,
  Currency,
  DamageType,
  Die,
  DomainCardType,
  EnvironmentType,
  Level,
  LootSet,
  Range,
  RestType,
  Roll,
  RollOutcome,
  StandardCondition,
  Tier,
  Trait,
  WeaponCategory,
  WeaponKind,
} from ".";

export type Feature = {
  name: string;
  description: string;
};

export type Thresholds = {
  major: number;
  severe: number;
};

export type Damage = {
  roll: Roll;
  type: DamageType | readonly [DamageType, DamageType];
};

export type Weapon = {
  tier: Tier;
  name: string;
  category: WeaponCategory;
  kind: WeaponKind;
  trait: Trait | "Spellcast" | "Any";
  range: Range;
  damage: Damage;
  burden: Burden | null;
  feature: Feature | null;
};

export type Armor = {
  tier: Tier;
  name: string;
  baseThresholds: Thresholds;
  baseScore: number;
  feature: Feature | null;
};

export type Loot = {
  roll: number;
  name: string;
  description: string;
  set: LootSet;
};

export type Item = Loot;

export type Consumable = Loot;

export type DomainDefinition = {
  name: string;
  description: string;
  classes: readonly Class["name"][];
};

export type DomainCard = {
  name: string;
  level: Level;
  domain: DomainDefinition["name"];
  type: DomainCardType;
  recallCost: number;
  description: string;
};

export type Subclass = {
  name: string;
  class: Class["name"];
  description: string;
  spellcastTrait: Trait | null;
  foundation: readonly Feature[];
  specialization: readonly Feature[];
  mastery: readonly Feature[];
};

export type Class = {
  name: string;
  description: string;
  domains: readonly DomainDefinition["name"][];
  startingEvasion: number;
  startingHitPoints: number;
  classItems: readonly string[];
  hopeFeature: Feature;
  classFeatures: readonly Feature[];
  subclasses: readonly Subclass["name"][];
  backgroundQuestions: readonly string[];
  connectionQuestions: readonly string[];
};

export type Ancestry = {
  name: string;
  description: string;
  features: readonly [top: Feature, bottom: Feature];
};

export type MixedAncestry = {
  heritage: string;
  ancestries: readonly Ancestry["name"][];
  features: readonly [top: Feature["name"], bottom: Feature["name"]];
};

export type Community = {
  name: string;
  description: string;
  adjectives: readonly string[];
  feature: Feature;
};

export type Transformation = {
  name: string;
  description: string;
  features: readonly Feature[];
};

export type BeastformAttack = {
  range: Range;
  trait: Trait;
  damage: Damage;
};

export type StandardBeastform = {
  kind: "Standard";
  name: string;
  tier: Tier;
  examples: readonly string[];
  trait: Trait;
  traitBonus: number;
  evasionBonus: number;
  attack: BeastformAttack;
  advantages: readonly string[];
  features: readonly Feature[];
};

export type EvolvedBeastform = {
  kind: "Evolved";
  name: string;
  tier: Tier;
  examples: readonly string[];
  features: readonly Feature[];
};

export type Beastform = StandardBeastform | EvolvedBeastform;

export type MartialStance = {
  name: string;
  tier: Tier;
  description: string;
};

export type CompanionUpgrade = Feature;

export type CompanionAttack = {
  description: string;
  damageDie: Die;
  range: Range;
  damageType: DamageType;
};

export type RangerCompanion = {
  name: string;
  animal: string;
  evasion: number;
  stressSlots: number;
  experiences: readonly Experience[];
  attack: CompanionAttack;
  upgrades: readonly CompanionUpgrade["name"][];
};

export type WarlockPatron = {
  name: string;
  sphereOfInfluence: string;
};

export type PatronDie = Die;

export type PrayerDice = {
  die: Die;
  count: number;
};

export type RallyDie = Die;

export type UnstoppableDie = Die;

export type ComboDie = Die;

export type KnownMartialStances = readonly MartialStance["name"][];

export type SorcererElement = string;

export type StrangePatternsNumber = number;

export type OrderbornePrinciple = string;

export type PurposefulDesign = {
  maker: string;
  purpose: string;
  experience: Experience["name"];
};

export type DrakonaBreathElement = string;

export type UnfinishedBusiness = string;

export type OnlySkinDeepFeature = Feature["name"];

export type LevelScaled<T> = readonly { level: Level; value: T }[];

export type TierScaled<T> = readonly { tier: Tier; value: T }[];

export type CharacterDescriptionOptions = {
  eyes: readonly string[];
  body: readonly string[];
  skin: readonly string[];
};

export type SpellCarrierPrompt = {
  prompt: string;
  examples: readonly string[];
};

export type ClassGuide = {
  class: Class["name"];
  summary: string;
  suggestedTraits: Readonly<Record<Trait, number>>;
  suggestedPrimaryWeapon: Weapon["name"];
  suggestedSecondaryWeapon: Weapon["name"] | null;
  suggestedArmor: Armor["name"];
  clothes: readonly string[];
  attitudes: readonly string[];
  spellCarrier: SpellCarrierPrompt | null;
};

export type StartingEquipmentOptions = {
  primaryWeapons: readonly Weapon["name"][];
  secondaryWeapons: readonly Weapon["name"][];
  armor: readonly Armor["name"][];
};

export type Difficulty = {
  value: number;
  label: string;
};

export type TraitVerbs = Readonly<Record<Trait, readonly string[]>>;

export type CharacterInspiration = {
  firstNames: readonly string[];
  familyNames: readonly string[];
  regionNames: readonly string[];
  placeNames: readonly string[];
  experiences: {
    backgrounds: readonly string[];
    characteristics: readonly string[];
    specialties: readonly string[];
    skills: readonly string[];
    phrases: readonly string[];
  };
};

export type Condition = {
  name: StandardCondition;
  description: string;
};

export type DowntimeMove = Feature & {
  rest: RestType;
};

export type DeathMove = Feature;

export type TierDefinition = {
  tier: Tier;
  levels: readonly Level[];
};

export type TierAchievement = {
  level: Level;
  newExperience: boolean;
  proficiencyIncrease: number;
  clearMarkedTraits: boolean;
};

export type Advancement = {
  name: string;
  description: string;
  cost: number;
  tiers: readonly Tier[];
  class: Class["name"] | null;
};

export type CharacterCreationRules = {
  startingLevel: Level;
  startingProficiency: number;
  startingHope: number;
  startingStressSlots: number;
  startingDomainCards: number;
  startingExperiences: number;
  startingExperienceModifier: number;
  traitModifiers: readonly number[];
  startingInventory: readonly string[];
  startingGold: { amount: number; currency: Currency };
  startingConsumableChoices: readonly string[];
};

export type ResourceLimits = {
  maxHope: number;
  maxFear: number;
  maxHitPoints: number;
  maxStress: number;
  maxArmorScore: number;
  maxLoadout: number;
  maxBurden: number;
  maxInventoryWeapons: number;
  maxConsumablesOfEachType: number;
  maxAdvantageDice: number;
};

export type CurrencyConversion = {
  from: Currency;
  to: Currency;
  rate: number;
};

export type RollOutcomeDefinition = {
  outcome: RollOutcome;
  description: string;
};

export type Experience = {
  name: string;
  modifier: number;
};

export type AdversaryAttack = {
  name: string;
  modifier: number;
  range: Range;
  damage: Damage;
};

export type AdversaryFeature = {
  name: string;
  type: AdversaryFeatureType;
  description: string;
};

export type Adversary = {
  name: string;
  tier: Tier;
  type: AdversaryType;
  description: string;
  motivesAndTactics: readonly string[];
  difficulty: number;
  thresholds: Thresholds | null;
  hitPoints: number;
  stress: number;
  attack: AdversaryAttack;
  experiences: readonly Experience[];
  features: readonly AdversaryFeature[];
  hordeSize?: number;
};

export type AdversaryReference = {
  name: string;
  tier: Tier;
};

export type EnvironmentFeature = AdversaryFeature & {
  questions: readonly string[];
};

export type Environment = {
  name: string;
  tier: Tier;
  type: EnvironmentType;
  description: string;
  impulses: readonly string[];
  difficulty: number;
  potentialAdversaries: readonly string[];
  features: readonly EnvironmentFeature[];
};

export type EnvironmentReference = {
  name: string;
  tier: Tier;
  type: EnvironmentType;
};

export type TierBenchmark = {
  tier: Tier;
  difficulty: number;
  damage: readonly Roll[];
};

export type AdversaryBenchmark = TierBenchmark & {
  attackModifier: number;
  thresholds: Thresholds;
};
