import type { CompanionUpgrade, Die } from ".";

export const companionUpgrades = [
  {
    name: "Intelligent",
    description:
      "Your companion gains a permanent +1 bonus to a Companion Experience of your choice.",
    grants: [{ kind: "companionExperienceBonus", amount: 1, experiences: 1 }],
  },
  {
    name: "Light in the Dark",
    description: "Use this as an additional Hope slot your character can mark.",
    grants: [{ kind: "hopeSlots", amount: 1 }],
  },
  {
    name: "Creature Comfort",
    description:
      "Once per rest, when you take time during a quiet moment to give your companion love and attention, you can gain a Hope or you can both clear a Stress.",
  },
  {
    name: "Armored",
    description:
      "When your companion takes damage, you can mark one of your Armor Slots instead of marking one of their Stress.",
  },
  {
    name: "Vicious",
    description:
      "Increase your companion's damage dice or range by one step (d6 to d8, Close to Far, etc.).",
    grants: [{ kind: "companionAttackStep", steps: 1 }],
  },
  {
    name: "Resilient",
    description: "Your companion gains an additional Stress slot.",
    grants: [{ kind: "companionStressSlots", amount: 1 }],
  },
  {
    name: "Bonded",
    description:
      "When you mark your last Hit Point, your companion rushes to your side to comfort you. Roll a number of d6s equal to the unmarked Stress slots they have and mark them. If any roll a 6, your companion helps you up. Clear your last Hit Point and return to the scene.",
  },
  {
    name: "Aware",
    description: "Your companion gains a permanent +2 bonus to their Evasion.",
    grants: [{ kind: "companionEvasion", amount: 2 }],
  },
] as const satisfies readonly CompanionUpgrade[];

export const companionDamageDice = [
  "d6",
  "d8",
  "d10",
  "d12",
] as const satisfies readonly Die[];

export const exampleCompanionExperiences = [
  "Bold Distraction",
  "Expert Climber",
  "Fetch",
  "Friendly",
  "Guardian of the Forest",
  "Horrifying",
  "Intimidating",
  "Loyal Until the End",
  "Navigation",
  "Nimble",
  "Nobody Left Behind",
  "On High Alert",
  "Protective",
  "Royal Companion",
  "Scout",
  "Service Animal",
  "Trusted Mount",
  "Vigilant",
  "We Always Find Them",
  "You Can't Hit What You Can't Find",
] as const satisfies readonly string[];
