import type {
  Ancestry,
  Armor,
  Community,
  CompanionUpgrade,
  DamageType,
  Die,
  DomainCard,
  Experience,
  MartialStance,
  Range,
  Subclass,
  Trait,
  TraitModifier,
  Transformation,
  Weapon,
} from ".";

export type ComboDie = "d4" | "d6" | "d8" | "d10" | "d12";

export type PrayerDie = 1 | 2 | 3 | 4;

export type DualityDieValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type SorcererElement = "air" | "earth" | "fire" | "lightning" | "water";

export type MartialArtistStances = {
  known: MartialStance["name"][];
  focus: number;
};

export type Patron = {
  name: string;
  sphereOfInfluence: string;
};

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
  experiences: Experience[];
  attack: CompanionAttack;
  stressSlots: number;
  markedStress: number;
  upgrades: CompanionUpgrade["name"][];
};

export type PurposefulDesign = {
  maker: string;
  purpose: string;
  experience: 0 | 1;
};

export type DedicatedPrinciples = [string, string, string];

export type PlayerCharacter = {
  name: string;
  pronouns: string;
  description: string;
  subclass: Subclass["name"];
  primaryAncestry: Ancestry["name"];
  secondaryAncestry: null | Ancestry["name"];
  heritage: string;
  community: Community["name"];
  transformation: null | Transformation["name"];
  traits: Record<Trait, TraitModifier>;
  primaryWeapon: Weapon["name"];
  secondaryWeapon: null | Weapon["name"];
  armor: Armor["name"];
  consumable: string;
  classItem: string;
  background: string;
  experiences: [string, string];
  domainCards: [DomainCard["name"], DomainCard["name"]];
  connections: string;
};
