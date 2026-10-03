export const traitModifiers = [2, 1, 1, 0, 0, -1] as const

export const startingValues = {
  level: 1,
  proficiency: 1,
  stress: 6,
  hope: 2,
  hopeSlots: 6,
  experienceModifier: 2,
  experienceCount: 2,
  domainCardCount: 2,
}

export const loadoutLimit = 5

export const startingItems = ['Torch', '50 feet of rope', 'Basic supplies'] as const

export const startingPotions = ['Minor Health Potion', 'Minor Stamina Potion'] as const

export const experienceExamples = {
  Backgrounds: [
    'Assassin',
    'Blacksmith',
    'Bodyguard',
    'Bounty Hunter',
    'Chef to the Royal Family',
    'Circus Performer',
    'Con Artist',
    'Fallen Monarch',
    'Field Medic',
    'High Priestess',
    'Merchant',
    'Noble',
    'Pirate',
    'Politician',
    'Runaway',
    'Scholar',
    'Sellsword',
    'Soldier',
    'Storyteller',
    'Thief',
    'World Traveler',
  ],
  Characteristics: [
    'Affable',
    'Battle-Hardened',
    'Bookworm',
    'Charming',
    'Cowardly',
    'Friend to All',
    'Helpful',
    'Intimidating Presence',
    'Leader',
    'Lone Wolf',
    'Loyal',
    'Observant',
    'Prankster',
    'Silver Tongue',
    'Sticky Fingers',
    'Stubborn to a Fault',
    'Survivor',
    'Young and Naive',
  ],
  Specialties: [
    'Acrobat',
    'Gambler',
    'Healer',
    'Inventor',
    'Magical Historian',
    'Mapmaker',
    'Master of Disguise',
    'Navigator',
    'Sharpshooter',
    'Survivalist',
    'Swashbuckler',
    'Tactician',
  ],
  Skills: [
    'Animal Whisperer',
    'Barter',
    'Deadly Aim',
    'Fast Learner',
    'Incredible Strength',
    'Liar',
    'Light Feet',
    'Negotiator',
    'Photographic Memory',
    'Quick Hands',
    'Repair',
    'Scavenger',
    'Tracker',
  ],
  Phrases: [
    'Catch Me If You Can',
    'Fake It Till You Make It',
    'First Time’s the Charm',
    'Hold the Line',
    'I Won’t Let You Down',
    'I’ll Catch You',
    'I’ve Got Your Back',
    'Knowledge Is Power',
    'Nature’s Friend',
    'Never Again',
    'No One Left Behind',
    'Pick on Someone Your Own Size',
    'The Show Must Go On',
    'This Is Not a Negotiation',
    'Wolf in Sheep’s Clothing',
  ],
}

export const creationGuidance = {
  identity:
    'You can fill in your character’s name, pronouns, and Character Description details at any point of the character creation process.',
  class:
    'Classes are role-based archetypes that determine which class features and domain cards a PC gains access to throughout the campaign.\nEvery class begins with one or more unique class feature(s). If your class feature prompts you to make a selection, do so now.\nSubclasses further refine a class archetype and reinforce its expression by granting access to unique subclass features. Each class comprises two subclasses. Select one of your class’s subclasses and take its Foundation card.',
  heritage:
    'Your character’s heritage combines two elements: ancestry and community.\nA character’s ancestry reflects their lineage, impacting their physicality and granting them two unique ancestry features.\nYour character’s community represents their culture or environment of origin and grants them a community feature.',
  mixedAncestry:
    'To create a Mixed Ancestry, take the top (first-listed) ancestry feature from one ancestry and the bottom (second-listed) ancestry feature from another.',
  transformation:
    'Transformations represent a fundamental shift in your character and how they interact with the world. These are optional aspects of a character’s identity that the GM can give out during a campaign as part of the narrative or, at their discretion, present as an option during character creation.\nA PC can’t have more than one transformation.',
  traits:
    'Your character has six traits that represent their physical, mental, and social aptitude. When you “roll with a trait,” that trait’s modifier is added to the roll’s total. Assign the modifiers +2, +1, +1, +0, +0, −1 to your character’s traits in any order you wish.',
  stats:
    'Characters start a new campaign at level 1.\nEvasion represents your character’s ability to avoid damage. Your character’s starting Evasion is determined by their class.\nHit Points (HP) are an abstract measure of your physical health. Your starting HP is determined by your class.\nStress reflects your ability to withstand the mental and emotional strain of dangerous situations and physical exertion. Every PC starts with 6 Stress slots.\nHope is a metacurrency that fuels special moves and certain abilities or features. Each PC starts with 2 Hope.',
  equipment:
    'Select from the Tier 1 Weapon Tables either a two-handed primary weapon or a one-handed primary weapon and a one-handed secondary weapon. At level 1, your Proficiency is 1. Proficiency only determines how many damage dice you roll, and does not affect any flat damage modifiers.\nChoose and equip one set of armor from the Tier 1 Armor Table. Add your character’s level to your equipped armor’s Base Thresholds. Your Armor Score is equal to your equipped armor’s Base Score plus any permanent bonuses your character has to their Armor Score from other abilities, features, or effects.\nAdd a torch, 50 feet of rope, basic supplies, and a handful of gold; EITHER a Minor Health Potion (clear 1d4 Hit Points) OR a Minor Stamina Potion (clear 1d4 Stress); one of the class-specific items listed on your character guide; if applicable, whichever class-specific item you selected to carry your spells; and any other GM-approved items you’d like to have at the start of the game.',
  background:
    'Develop your character’s background by answering the background questions in your character guide, modifying or replacing them if they don’t fit the character you want to play.\nYour background has no explicit mechanical effect, but it greatly affects the character you’ll play and the prep the GM will do. If you wish, you can leave your character’s past more ambiguous for the time being and discover their backstory through play.',
  experiences:
    'An Experience is a word or phrase used to encapsulate a specific set of skills, personality traits, or aptitudes your character has acquired over the course of their life. When your PC makes a move, they can spend a Hope to add a relevant Experience’s modifier to an action or reaction roll.\nYour PC gets two Experiences at character creation, each with a +2 modifier.\nAn Experience can’t be too broadly applicable and it can’t grant your character specific mechanical benefits, such as magic spells or special abilities.',
  domainCards:
    'Your class has access to two of the ten domains. Choose two level one cards from your class’s domains. You can take one card from each domain or two from a single domain, whichever you prefer.\nYou can have up to five domain cards in your loadout at one time. Your subclass, ancestry, and community cards don’t contribute to your loadout maximum and are always active and available.',
  connections:
    'Connections are the relationships between the PCs. Discuss potential connections between the PCs using the questions in your character guide as inspiration. Suggest at least one connection between your character and each other player’s PC. Accept any suggested connections you want to explore, reject any you don’t.\nA player can reject a suggested connection for any reason, and it’s okay if there isn’t an established connection between every pair of PCs—you can always discover and develop those relationships through play.',
}
