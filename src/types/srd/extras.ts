import type {
  ComboDie,
  DrakonaBreathElement,
  LevelScaled,
  PatronDie,
  PrayerDice,
  RallyDie,
  SorcererElement,
  UnstoppableDie,
} from ".";

export const rallyDieByLevel = [
  { level: 1, value: "d6" },
  { level: 5, value: "d8" },
] as const satisfies LevelScaled<RallyDie>;

export const comboDice = [
  "d4",
  "d6",
  "d8",
  "d10",
] as const satisfies readonly ComboDie[];

export const defaultComboDie = "d4" satisfies ComboDie;

export const unstoppableDieByLevel = [
  { level: 1, value: "d4" },
  { level: 5, value: "d6" },
] as const satisfies LevelScaled<UnstoppableDie>;

export const defaultPrayerDie = "d4" satisfies PrayerDice["die"];

export const patronDieByLevel = [
  { level: 1, value: "d6" },
  { level: 5, value: "d8" },
] as const satisfies LevelScaled<PatronDie>;

export const defaultStartingFavor = 3;

export const defaultMaxFavor = 6;

export const exampleSpheresOfInfluence = [
  "Ambition",
  "Artists",
  "Chaos",
  "Darkness",
  "Death",
  "Gamblers",
  "Honor",
  "Justice",
  "Leaders",
  "Love",
  "Mercy",
  "Mischief",
  "Nature",
  "Protectors",
  "Revenge",
  "Scholars",
  "Secrets",
  "Soldiers",
  "Strength",
  "Travelers",
  "Tricksters",
  "Truth",
  "War",
  "Wisdom",
] as const satisfies readonly string[];

export const defaultStartingMartialStanceCount = 2;

export const defaultStartingMartialStanceTier = 1;

export const defaultMartialStancesGainedPerLevel = 1;

export const defaultMaxFocus = 6;

export const sorcererElements = [
  "air",
  "earth",
  "fire",
  "lightning",
  "water",
] as const satisfies readonly SorcererElement[];

export const defaultOrderbornePrinciplesCount = 3;

export const defaultPurposefulDesignExperienceBonus = 1;

export const exampleDrakonaBreathElements = [
  "electricity",
  "fire",
  "ice",
] as const satisfies readonly DrakonaBreathElement[];
