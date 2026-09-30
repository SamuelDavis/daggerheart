import type { ComboDie, DrakonaBreathElement, SorcererElement } from ".";

export const comboDice = [
  "d4",
  "d6",
  "d8",
  "d10",
] as const satisfies readonly ComboDie[];

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

export const sorcererElements = [
  "air",
  "earth",
  "fire",
  "lightning",
  "water",
] as const satisfies readonly SorcererElement[];

export const exampleDrakonaBreathElements = [
  "electricity",
  "fire",
  "ice",
] as const satisfies readonly DrakonaBreathElement[];

export const strangePatternsNumbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
] as const satisfies readonly string[];
