import type {
  AdversaryFeatureType,
  AdversaryType,
  AncestryName,
  Burden,
  ClassName,
  CommunityName,
  Currency,
  DamageType,
  Domain,
  DomainCardType,
  EnvironmentType,
  Level,
  LootSet,
  Range,
  RestType,
  Roll,
  RollOutcome,
  StandardCondition,
  SubclassName,
  Tier,
  Trait,
  TransformationName,
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
  trait: Trait | "Spellcast";
  range: Range;
  damage: Damage;
  burden: Burden;
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
  name: Domain;
  description: string;
  classes: readonly ClassName[];
};

export type DomainCard = {
  name: string;
  level: Level;
  domain: Domain;
  type: DomainCardType;
  recallCost: number;
  description: string;
};

export type Subclass = {
  name: SubclassName;
  class: ClassName;
  description: string;
  spellcastTrait: Trait | null;
  foundation: readonly Feature[];
  specialization: readonly Feature[];
  mastery: readonly Feature[];
};

export type Class = {
  name: ClassName;
  description: string;
  domains: readonly [Domain, Domain];
  startingEvasion: number;
  startingHitPoints: number;
  classItems: readonly [string, string];
  hopeFeature: Feature;
  classFeatures: readonly Feature[];
  subclasses: readonly [SubclassName, SubclassName];
};

export type Ancestry = {
  name: AncestryName;
  description: string;
  features: readonly [Feature, Feature];
};

export type Community = {
  name: CommunityName;
  description: string;
  adjectives: readonly [string, string, string, string, string, string];
  feature: Feature;
};

export type Transformation = {
  name: TransformationName;
  description: string;
  features: readonly [Feature, Feature];
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
  cost: 1 | 2;
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
  damage: readonly [Roll, Roll];
};

export type AdversaryBenchmark = TierBenchmark & {
  attackModifier: number;
  thresholds: Thresholds;
};
