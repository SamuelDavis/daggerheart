import type { Transformation } from ".";

export const transformations = [
  {
    name: "Demigod",
    description:
      "Demigods are mortal creatures whose veins flow with the blood of the gods. They typically gain their power from divine parentage, accomplishing an incredible feat, or receiving a gift from a god. Many demigods appear as a typical member of their mortal ancestry, but all possess a subtle luminosity and a gleam in their eyes. They're also known to have pearlescent or metallic skin, and they might grow in size or gain physical features related to their power when it reveals itself. Because they share the blood of a Faint Divinity, a Forgotten God, a New God, or any other deity, no two demigods look the same.\nDemigods are bestowed with a fragment of deific power, but not everything a demigod inherits is a blessing. Though they often excel at tasks they're well suited for, the expectations set upon them are often difficult and costly to live up to.",
    features: [
      {
        name: "Gifted",
        description:
          "You gain a +1 bonus to action, reaction, and damage rolls.",
      },
      {
        name: "Weight of Divinity",
        description:
          "When you fail a roll, you must mark a Stress or the GM gains a Fear.",
      },
    ],
  },
  {
    name: "Ghost",
    description:
      "Ghosts are the spirits of the once-living who are bound to the Mortal Realm. They could be called forth after passing through the veil of death with necromantic rites, alchemical experimentation, the desperation of a loved one-or they may never have passed through the veil at all. Those who met a horrific end, were killed with a cursed weapon, or died in a place of power might have become trapped in the Mortal Realm instead of passing on.\nBecause they occupy the space between life and death, a ghost can shift between the physical and the spectral and, at times, pass through solid objects. While some ghosts are almost indistinguishable from the living, others emanate spectral auras, appear desaturated in color, or bear physical evidence of their cause of death. When a ghost becomes incorporeal-which can occur at will, due to heightened emotions, or seemingly at random-they might appear semitranslucent, like a breath of fog that could dissipate in the wind.\nSome ghosts return for revenge, some to save a loved one, and others to meet a goal or discover hidden knowledge. Their drive to accomplish this goal is the force that allows them to exist in the Mortal Realm. When they complete that goal, their work is done, and they immediately pass beyond the veil of death.",
    features: [
      {
        name: "Unfinished Business",
        description:
          "Work with your GM to decide what purpose or desire keeps you bound to the Mortal Realm. When you fulfill it, you cross through the veil of death.",
      },
      {
        name: "Ephemeral",
        description:
          "Your body wavers in and out of being corporeal. You are resistant to physical damage, take double magic damage, and can mark 2 Stress to momentarily pass through a solid object.",
      },
    ],
  },
  {
    name: "Reanimated",
    description:
      "Reanimated are corpses who have been brought back to life. Whether through a spell, a holy ritual, arcane experimentation, or other unnatural methods, these mortals have returned from beyond the veil of death as undead and are bound to their decaying bodies. Newly reanimated are more likely to look like a typical member of their ancestry, but as they go on, they must patch and repair their bodies with bones, flesh, and other materials harvested from the recently deceased. While some repair their wounds and decay with needle, thread, and herbs, others use magic to incorporate these materials into themselves.\nMany stories of the reanimated describe them as possessing increased durability or, in some cases, immunity to pain. This may be true for some reanimated, but many experience prolonged agony-whether from the physical echoes of their own demise, the discomfort of moving a decomposing body, the trouble controlling their amalgamated parts, or the mental anguish of being forcibly pulled back from death into a second life.",
    features: [
      {
        name: "Corpse",
        description:
          "During a rest, you can clear Hit Points only if you have access to remains from a recently deceased creature. Describe how you use these materials to maintain your corpse.",
      },
      {
        name: "Won't Stay Dead",
        description:
          "When you choose the Risk It All death move and fail, you can permanently mark a Hit Point to succeed instead. When you do, you still use the Hope Die's value to clear Hit Points and Stress. When you permanently mark your last Hit Point, you pass through the veil of death.",
      },
    ],
  },
  {
    name: "Shapeshifter",
    description:
      "Shapeshifters are creatures who can change their physical form. Whether they were born with this ability, gained it as a result of magical craft or a curse, or received this power from an otherworldly entity, shapeshifters have a unique relationship with their identity. Because shapeshifters can transform into any ancestry-one moment living as a small and nimble faerie and the next as a large and tough galapa-their experiences with the outside world can vary greatly from day to day.\nWhile a shapeshifter is typically indistinguishable from another member of the ancestry they transform into, each shapeshifter has one characteristic that doesn't change no matter their form, such as their eyes, their coloring, or a unique birthmark. They also can't mimic a specific person's appearance, as they become a different version of themselves in a new body.\nTaking on a new form also doesn't allow them to immediately have or use all the new form's characteristics-they must focus their efforts on the physical characteristics they most want to use. Shapeshifters might need time to learn how to embody a new form, sometimes leading to an uncanny appearance or behavior until they're accustomed to their body.",
    features: [
      {
        name: "Change Shape",
        description:
          "During a rest, you can use a downtime move to swap your current ancestry with another. When you do, describe how your appearance changes.",
      },
      {
        name: "Only Skin Deep",
        description:
          "You gain the benefit of only one of your chosen ancestry's features, which you select when you choose the ancestry. You can use a downtime move to choose a different feature from that ancestry.",
      },
    ],
  },
  {
    name: "Vampire",
    description:
      "Vampires are undead creatures with sharp fangs who feed on the blood of the living. They aren't born, but created-sired by another vampire through a bite and exchange of blood, transformed through an occult ritual, or changed through other mysterious methods. Because those who become vampires die and come back as supernatural entities, they must consume the blood-the life essence-of others to survive.\nAt first glance, many vampires are indistinguishable from typical members of their ancestry. Beyond their telltale fangs, they can be affected by their vampirism in myriad subtle or conspicuous ways, displaying traits such as sallow skin, visible veins, eyes that shine in the dark, or, in some cases, enhanced beauty. Depending on the nature of their vampiric origin, individuals may stop aging at the time of their transformation and remain vibrant and powerful long after their cohorts have succumbed to the ravages of time. No matter their appearance, all vampires possess enhanced abilities that can result in a terrifying end for their targets.",
    features: [
      {
        name: "Fangs",
        description:
          "Make an attack using a trait of your choice to bite a target within Melee range. On a success, deal d6 physical damage using your Proficiency.",
      },
      {
        name: "Feed",
        description:
          'On a successful "Fangs" attack against a creature that can bleed, you can mark a Stress to feed. Place a number of tokens on this card equal to the number of Hit Points the target marks. You can hold up to 6 tokens at a time. Before you make an action roll, you can spend a token to make your Fear Die a d20. When you take a long rest, remove a token. While there are no tokens on this card, you make action and reaction rolls with disadvantage.',
      },
    ],
  },
  {
    name: "Werewolf",
    description:
      "Werewolves are creatures who transform into large supernatural wolves. While some are born werewolves, others undergo this transformation because of a curse, an infection through another werewolf's bite, or another unnatural cause.\nWerewolves look like typical members of their ancestry until they shift, whereupon they transform into a massive otherworldly wolf. Some might even take on a shape that is an amalgamation of their ancestry and their wolf form. Stories describe werewolves shifting with the phases of the moon, though an individual's experience with this change varies based on the cause of their transformation.\nWerewolves often struggle to control their hunting instinct and violence while in their wolf form, and they must have immense self-discipline, use significant energy, or resort to fleeing or locking themselves away to avoid harming their loved ones. The longer a werewolf has experience with their condition, the more likely they are to have developed methods of controlling themselves.",
    features: [
      {
        name: "Wolf Form",
        description:
          'When you mark 1 or more Hit Points, you can mark a Stress to enter your Wolf Form. While in this form, you gain a 1d10 bonus to attack and damage rolls. When you roll with Hope while in Wolf Form, you must mark a Stress. Your Wolf Form lasts until you go into your "Howling Rampage" or take a rest.',
      },
      {
        name: "Howling Rampage",
        description:
          "When you mark your last Stress while in Wolf Form, you go into a rampage. Roll a number of d20s equal to your tier and deal that much physical damage to all creatures within Very Close range, then drop out of Wolf Form.",
      },
    ],
  },
] satisfies Transformation[];
