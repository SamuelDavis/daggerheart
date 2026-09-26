import type { CompanionUpgrade } from ".";

export const companionUpgrades = [
  {
    name: "Intelligent",
    description:
      "Your companion gains a permanent +1 bonus to a Companion Experience of your choice.",
  },
  {
    name: "Light in the Dark",
    description: "Use this as an additional Hope slot your character can mark.",
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
  },
  {
    name: "Resilient",
    description: "Your companion gains an additional Stress slot.",
  },
  {
    name: "Bonded",
    description:
      "When you mark your last Hit Point, your companion rushes to your side to comfort you. Roll a number of d6s equal to the unmarked Stress slots they have and mark them. If any roll a 6, your companion helps you up. Clear your last Hit Point and return to the scene.",
  },
  {
    name: "Aware",
    description: "Your companion gains a permanent +2 bonus to their Evasion.",
  },
] satisfies CompanionUpgrade[];
