import type { Item } from ".";

export const items = [
  {
    roll: 1,
    name: "Premium Bedroll",
    description: "During downtime, you automatically clear a Stress.",
    set: "Core Set",
  },
  {
    roll: 2,
    name: "Piper Whistle",
    description:
      "This handcrafted whistle has a distinctive sound. When you blow this whistle, its piercing tone can be heard within a 1-mile radius.",
    set: "Core Set",
  },
  {
    roll: 3,
    name: "Charging Quiver",
    description:
      "When you succeed on an attack with an arrow stored in this quiver, gain a bonus to the damage roll equal to your current tier.",
    set: "Core Set",
  },
  {
    roll: 4,
    name: "Alistair's Torch",
    description:
      "You can light this magic torch at will. The flame's light fills a much larger space than it should, enough to illuminate a cave bright as day.",
    set: "Core Set",
  },
  {
    roll: 5,
    name: "Speaking Orbs",
    description:
      "This pair of orbs allows any creatures holding them to communicate with each other across any distance.",
    set: "Core Set",
  },
  {
    roll: 6,
    name: "Manacles",
    description: "This pair of locking cuffs comes with a key.",
    set: "Core Set",
  },
  {
    roll: 7,
    name: "Arcane Cloak",
    description:
      "A creature with a Spellcast trait wearing this cloak can adjust its color, texture, and size at will.",
    set: "Core Set",
  },
  {
    roll: 8,
    name: "Woven Net",
    description:
      "You can make a Finesse Roll using this net to trap a small creature. A trapped target can break free with a successful Attack Roll (16).",
    set: "Core Set",
  },
  {
    roll: 9,
    name: "Fire Jar",
    description:
      "You can pour out the strange liquid contents of this jar to instantly produce fire. The contents regenerate when you take a long rest.",
    set: "Core Set",
  },
  {
    roll: 10,
    name: "Suspended Rod",
    description:
      "This flat rod is inscribed with runes. When you activate the rod, it is immediately suspended in place. Until the rod is deactivated, it can't move, doesn't abide by the rules of gravity, and remains in place.",
    set: "Core Set",
  },
  {
    roll: 11,
    name: "Glamour Stone",
    description:
      "Activate this pebble-sized stone to memorize the appearance of someone you can see. Spend a Hope to magically recreate this guise on yourself as an illusion.",
    set: "Core Set",
  },
  {
    roll: 12,
    name: "Empty Chest",
    description:
      "This magical chest appears empty. When you speak a specific trigger word or action and open the chest, you can see the items stored within it.",
    set: "Core Set",
  },
  {
    roll: 13,
    name: "Companion Case",
    description:
      "This case can fit a small animal companion. While the companion is inside, the animal and case are immune to all damage and harmful effects.",
    set: "Core Set",
  },
  {
    roll: 14,
    name: "Piercing Arrows",
    description:
      "Three times per rest when you succeed on an attack with one of these arrows, you can add your Proficiency to the damage roll.",
    set: "Core Set",
  },
  {
    roll: 15,
    name: "Valorstone",
    description:
      "You can attach this stone to armor that doesn't already have a feature. The armor gains the following feature. Resilient: Before you mark your last Armor Slot, roll a d6. On a result of 6, reduce the severity by one threshold without marking an Armor Slot.",
    set: "Core Set",
  },
  {
    roll: 16,
    name: "Skeleton Key",
    description:
      "When you use this key to open a locked door, you gain advantage on the Finesse Roll.",
    set: "Core Set",
  },
  {
    roll: 17,
    name: "Arcane Prism",
    description:
      "Position this prism in a location of your choosing and activate it. All allies within Close range of it gain a +1 bonus to their Spellcast Rolls. While activated, the prism can't be moved. Once the prism is deactivated, it can't be activated again until your next long rest.",
    set: "Core Set",
  },
  {
    roll: 18,
    name: "Minor Stamina Potion Recipe",
    description:
      "As a downtime move, you can use the bone of a creature to craft a Minor Stamina Potion.",
    set: "Core Set",
  },
  {
    roll: 19,
    name: "Minor Health Potion Recipe",
    description:
      "As a downtime move, you can use a vial of blood to craft a Minor Health Potion.",
    set: "Core Set",
  },
  {
    roll: 20,
    name: "Homing Compasses",
    description:
      "These two compasses point toward each other no matter how far apart they are.",
    set: "Core Set",
  },
  {
    roll: 21,
    name: "Corrector Sprite",
    description:
      "This tiny sprite sits in the curve of your ear canal and whispers helpful advice during combat. Once per short rest, you can gain advantage on an attack roll.",
    set: "Core Set",
  },
  {
    roll: 22,
    name: "Gecko Gloves",
    description: "You can climb up vertical surfaces and across ceilings.",
    set: "Core Set",
  },
  {
    roll: 23,
    name: "Lorekeeper",
    description:
      "You can store the name and details of up to three hostile creatures inside this book. You gain a +1 bonus to action rolls against those creatures.",
    set: "Core Set",
  },
  {
    roll: 24,
    name: "Vial of Darksmoke Recipe",
    description:
      "As a downtime move, you can mark a Stress to craft a Vial of Darksmoke.",
    set: "Core Set",
  },
  {
    roll: 25,
    name: "Bloodstone",
    description:
      "You can attach this stone to a weapon that doesn't already have a feature. The weapon gains the following feature. Brutal: When you roll the maximum value on a damage die, roll an additional damage die.",
    set: "Core Set",
  },
  {
    roll: 26,
    name: "Greatstone",
    description:
      "You can attach this stone to a weapon that doesn't already have a feature. The weapon gains the following feature. Powerful: On a successful attack, roll an additional damage die and discard the lowest result.",
    set: "Core Set",
  },
  {
    roll: 27,
    name: "Glider",
    description:
      "While falling, you can mark a Stress to deploy this small parachute and glide safely to the ground.",
    set: "Core Set",
  },
  {
    roll: 28,
    name: "Ring of Silence",
    description:
      "Spend a Hope to activate this ring. Your footsteps are silent until your next rest.",
    set: "Core Set",
  },
  {
    roll: 29,
    name: "Calming Pendant",
    description:
      "When you would mark your last Stress, roll a d6. On a result of 5 or higher, don't mark it.",
    set: "Core Set",
  },
  {
    roll: 30,
    name: "Dual Flask",
    description:
      "This flask can hold two different liquids. You can swap between them by flipping a small switch on the flask's side.",
    set: "Core Set",
  },
  {
    roll: 31,
    name: "Bag of Ficklesand",
    description:
      "You can convince this small bag of sand to be much heavier or lighter with a successful Presence Roll (10). Additionally, on a successful Finesse Roll (10), you can blow a bit of sand into a target's face to make them temporarily Vulnerable.",
    set: "Core Set",
  },
  {
    roll: 32,
    name: "Ring of Resistance",
    description:
      "Once per long rest, you can activate this ring after a successful attack against you to halve the damage.",
    set: "Core Set",
  },
  {
    roll: 33,
    name: "Phoenix Feather",
    description:
      "If you have at least one Phoenix Feather on you when you fall unconscious, you gain a +1 bonus to the roll you make to determine whether you gain a scar.",
    set: "Core Set",
  },
  {
    roll: 34,
    name: "Box of Many Goods",
    description:
      "Once per long rest, you can open this small box and roll a d12. On a result of 1-6, it's empty. On a result of 7-10, it contains one random common consumable. On a result of 11-12, it contains two random common consumables.",
    set: "Core Set",
  },
  {
    roll: 35,
    name: "Airblade Charm",
    description:
      "You can attach this charm to a weapon with a Melee range. Three times per rest, you can activate the charm and attack a target within Close range.",
    set: "Core Set",
  },
  {
    roll: 36,
    name: "Portal Seed",
    description:
      "You can plant this seed in the ground to grow a portal in that spot. The portal is ready to use in 24 hours. You can use this portal to travel to any other location where you planted a portal seed. A portal can be destroyed by dealing any amount of magic damage to it.",
    set: "Core Set",
  },
  {
    roll: 37,
    name: "Paragon's Chain",
    description:
      "As a downtime move, you can meditate on an ideal or principle you hold dear and focus your will into this chain. Once per long rest, you can spend a Hope to roll a d20 as your Hope Die for rolls that directly align with that principle.",
    set: "Core Set",
  },
  {
    roll: 38,
    name: "Elusive Amulet",
    description:
      "Once per long rest, you can activate this amulet to become Hidden until you move. While Hidden in this way, you remain unseen even if an adversary moves to where they would normally see you.",
    set: "Core Set",
  },
  {
    roll: 39,
    name: "Hopekeeper Locket",
    description:
      "During a long rest, if you have 6 Hope, you can spend a Hope to imbue this locket with your bountiful resolve. When you have 0 Hope, you can use the locket to immediately gain a Hope. The locket must be re-imbued before it can be used this way again.",
    set: "Core Set",
  },
  {
    roll: 40,
    name: "Infinite Bag",
    description:
      "When you store items in this bag, they are kept in a pocket dimension that never runs out of space. You can retrieve an item at any time.",
    set: "Core Set",
  },
  {
    roll: 41,
    name: "Stride Relic",
    description:
      "You gain a +1 bonus to your Agility. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 42,
    name: "Bolster Relic",
    description:
      "You gain a +1 bonus to your Strength. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 43,
    name: "Control Relic",
    description:
      "You gain a +1 bonus to your Finesse. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 44,
    name: "Attune Relic",
    description:
      "You gain a +1 bonus to your Instinct. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 45,
    name: "Charm Relic",
    description:
      "You gain a +1 bonus to your Presence. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 46,
    name: "Enlighten Relic",
    description:
      "You gain a +1 bonus to your Knowledge. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 47,
    name: "Honing Relic",
    description:
      "You gain a +1 bonus to an Experience of your choice. You can only carry one relic.",
    set: "Core Set",
  },
  {
    roll: 48,
    name: "Flickerfly Pendant",
    description:
      "While you carry this pendant, your weapons with a Melee range that deal physical damage have a gossamer sheen and can attack targets within Very Close range.",
    set: "Core Set",
  },
  {
    roll: 49,
    name: "Lakestrider Boots",
    description:
      "You can walk on the surface of water as if it were soft ground.",
    set: "Core Set",
  },
  {
    roll: 50,
    name: "Clay Companion",
    description:
      "When you sculpt this ball of clay into a clay animal companion, it behaves as that animal. For example, a clay spider can spin clay webs, while a clay bird can fly. The clay companion retains memory and identity across different shapes, but they can adopt new mannerisms with each form.",
    set: "Core Set",
  },
  {
    roll: 51,
    name: "Mythic Dust Recipe",
    description:
      "As a downtime move, you can use a handful of fine gold dust to craft Mythic Dust.",
    set: "Core Set",
  },
  {
    roll: 52,
    name: "Shard of Memory",
    description:
      "Once per long rest, you can spend 2 Hope to recall a domain card from your vault instead of paying its Recall Cost.",
    set: "Core Set",
  },
  {
    roll: 53,
    name: "Gem of Alacrity",
    description:
      "You can attach this gem to a weapon, allowing you to use your Agility when making an attack with that weapon.",
    set: "Core Set",
  },
  {
    roll: 54,
    name: "Gem of Might",
    description:
      "You can attach this gem to a weapon, allowing you to use your Strength when making an attack with that weapon.",
    set: "Core Set",
  },
  {
    roll: 55,
    name: "Gem of Precision",
    description:
      "You can attach this gem to a weapon, allowing you to use your Finesse when making an attack with that weapon.",
    set: "Core Set",
  },
  {
    roll: 56,
    name: "Gem of Insight",
    description:
      "You can attach this gem to a weapon, allowing you to use your Instinct when making an attack with that weapon.",
    set: "Core Set",
  },
  {
    roll: 57,
    name: "Gem of Audacity",
    description:
      "You can attach this gem to a weapon, allowing you to use your Presence when making an attack with that weapon.",
    set: "Core Set",
  },
  {
    roll: 58,
    name: "Gem of Sagacity",
    description:
      "You can attach this gem to a weapon, allowing you to use your Knowledge when making an attack with that weapon.",
    set: "Core Set",
  },
  {
    roll: 59,
    name: "Ring of Unbreakable Resolve",
    description:
      "Once per session, when the GM spends a Fear, you can spend 4 Hope to cancel the effects of that spent Fear.",
    set: "Core Set",
  },
  {
    roll: 60,
    name: "Belt of Unity",
    description:
      "Once per session, you can spend 5 Hope to lead a Tag Team Roll with three PCs instead of two.",
    set: "Core Set",
  },
  {
    roll: 1,
    name: "Caltrops",
    description:
      "You can spread these caltrops in a Very Close area around you. A creature hastening through that area must mark a Stress.",
    set: "Hope & Fear",
  },
  {
    roll: 2,
    name: "Grapnel",
    description: "You gain advantage on action rolls to climb sheer surfaces.",
    set: "Hope & Fear",
  },
  {
    roll: 3,
    name: "Ball Bearings",
    description: "This pouch contains perfectly smooth metal spheres.",
    set: "Hope & Fear",
  },
  {
    roll: 4,
    name: "Box of Dragon Dust",
    description: "This snuffbox is filled with combustible powder.",
    set: "Hope & Fear",
  },
  {
    roll: 5,
    name: "Nighthawker's Ring",
    description:
      "Spend a Hope to activate the gemstone in this ring until the end of the scene. While active, the gemstone changes color to indicate the wearer's proximity to hidden treasure: warm colors for near, cool colors for far.",
    set: "Hope & Fear",
  },
  {
    roll: 6,
    name: "Elven Spyglass",
    description:
      "You can use this spyglass to magnify your vision a hundredfold.",
    set: "Hope & Fear",
  },
  {
    roll: 7,
    name: "Gourmet Granules",
    description:
      "This savory powder makes any food it's sprinkled on delicious and healthy, no matter how bland or rotten it is.",
    set: "Hope & Fear",
  },
  {
    roll: 8,
    name: "Collapsible Pole",
    description:
      "You can break down this 18-foot pole into six interlinked 3-foot segments.",
    set: "Hope & Fear",
  },
  {
    roll: 9,
    name: "Blackwing Quill",
    description:
      "This writing quill never runs out of ink or needs to be sharpened.",
    set: "Hope & Fear",
  },
  {
    roll: 10,
    name: "Silee's Folding Knife",
    description:
      "This 3-inch blade has an edge that easily cuts through anything except the handle it's stored in.",
    set: "Hope & Fear",
  },
  {
    roll: 11,
    name: "Windup Toy",
    description:
      "This small mechanical device is shaped like a strixwolf pup and can be programmed to perform simple tricks.",
    set: "Hope & Fear",
  },
  {
    roll: 12,
    name: "Loaded Dice",
    description:
      "You can choose what result this set of weighted dice rolls with a successful Finesse Roll (14). If you roll with Fear, anyone watching knows the dice are loaded.",
    set: "Hope & Fear",
  },
  {
    roll: 13,
    name: "Hollowbark Horn",
    description:
      "You can blow this horn to summon a small woodland creature to perform a simple task.",
    set: "Hope & Fear",
  },
  {
    roll: 14,
    name: "Self-Tying Rope",
    description: "You can command this rope to tie or untie itself.",
    set: "Hope & Fear",
  },
  {
    roll: 15,
    name: "Thief's Compass",
    description:
      "This compass points the way toward the nearest exit while indoors and the closest entrance while outdoors.",
    set: "Hope & Fear",
  },
  {
    roll: 16,
    name: "Traveler's Bell",
    description:
      "Once per long rest, you can ring this bell to magically open the shortest safe path through rough terrain for 1 hour.",
    set: "Hope & Fear",
  },
  {
    roll: 17,
    name: "Mandragorian Torch",
    description: "This torch gives off light only the bearer can see.",
    set: "Hope & Fear",
  },
  {
    roll: 18,
    name: "Boots of Supple Mystique",
    description:
      "While wearing these boots, you don't leave tracks or footprints.",
    set: "Hope & Fear",
  },
  {
    roll: 19,
    name: "Zephyr's Jar",
    description:
      "You can open this empty jar during inclement weather to capture the storm and leave behind clear skies. The storm remains inside until unleashed by reopening the jar.",
    set: "Hope & Fear",
  },
  {
    roll: 20,
    name: "Returning Ring",
    description:
      "When you throw your primary weapon while wearing this ring, the weapon appears in your hand immediately after the attack.",
    set: "Hope & Fear",
  },
  {
    roll: 21,
    name: "Kingfisher's Net",
    description:
      "Once per long rest, you can use this net to scoop one live fish out of any amount of water, no matter how unlikely it is for that water to have fish in it.",
    set: "Hope & Fear",
  },
  {
    roll: 22,
    name: "Titan's Girdle",
    description:
      "Once per scene, you can activate this girdle to gain a +1 bonus to your Proficiency for your next attack.",
    set: "Hope & Fear",
  },
  {
    roll: 23,
    name: "Iron Veil",
    description:
      "This chain-link head covering renders the wearer invisible to fey creatures.",
    set: "Hope & Fear",
  },
  {
    roll: 24,
    name: "Furball Bag",
    description:
      "Once per rest, you can produce 2d20 harmless, cat-sized fur creatures of indeterminate origin and species from this bag.",
    set: "Hope & Fear",
  },
  {
    roll: 25,
    name: "Whisperstep Anklet",
    description:
      "This anklet makes your steps silent as long as you don't move faster than walking speed.",
    set: "Hope & Fear",
  },
  {
    roll: 26,
    name: "Enchanter's Loupe",
    description:
      "You can use this loupe to see through illusions and enchantments.",
    set: "Hope & Fear",
  },
  {
    roll: 27,
    name: "Escher's Mirrorball",
    description:
      "Once per long rest, you can command this fist-sized silver orb to capture an omnidirectional image of its surroundings on its surface. This image lasts until your next long rest.",
    set: "Hope & Fear",
  },
  {
    roll: 28,
    name: "Cheater's Coin",
    description:
      "When you flip this coin, you can spend a Hope to determine which side it lands on.",
    set: "Hope & Fear",
  },
  {
    roll: 29,
    name: "Gravewarden's Bell",
    description:
      "This bell rings when a ghost or undead creature moves within Far range of it.",
    set: "Hope & Fear",
  },
  {
    roll: 30,
    name: "Reliquary of the Sightless Saint",
    description:
      "You gain a +1 bonus to your Hope Die when you make the Risk It All death move.",
    set: "Hope & Fear",
  },
  {
    roll: 31,
    name: "Map of Revelation",
    description:
      "You can attune this map to one creature at a time. The map always shows the attuned creature's location.",
    set: "Hope & Fear",
  },
  {
    roll: 32,
    name: "Dagginae's Obsidian Slate",
    description:
      "This wafer-thin sheet of volcanic glass is used by archivists to keep notes. Any information etched onto its surface disappears but can be recalled via a command you set.",
    set: "Hope & Fear",
  },
  {
    roll: 33,
    name: "Gadiman's Backpack",
    description:
      "Once per rest, you can spend a Hope to conjure a mundane item up to a cubic foot in size inside this satchel.",
    set: "Hope & Fear",
  },
  {
    roll: 34,
    name: "Eclipse Coin",
    description:
      "Once per rest, flip a coin. On heads, you gain a +1 bonus to attack rolls until your next successful attack. On tails, you gain +1 to your Evasion until an attack fails against you.",
    set: "Hope & Fear",
  },
  {
    roll: 35,
    name: "Sorcerer's Hat",
    description:
      "This conical blue hat is covered in silver stars. Once per rest, you can cast a spell from your vault with a Recall Cost equal to or less than your tier. This doesn't work for permanently vaulted cards.",
    set: "Hope & Fear",
  },
  {
    roll: 36,
    name: "Ghoulskin Gloves",
    description:
      "When you attack with a physical weapon while wearing these gloves, the damage is considered both physical and magic.",
    set: "Hope & Fear",
  },
  {
    roll: 37,
    name: "Gloves of Alacrity",
    description:
      "When you would mark a Stress to reload a weapon, you don't mark it.",
    set: "Hope & Fear",
  },
  {
    roll: 38,
    name: "Insomniac's Periapt",
    description:
      "When you take a rest without clearing Hit Points or Stress, you gain a +2 bonus to attack and damage rolls until your next rest.",
    set: "Hope & Fear",
  },
  {
    roll: 39,
    name: "Wildrider's Saddle",
    description:
      "This saddle grants any animal it's strapped onto the ability to understand their rider's commands.",
    set: "Hope & Fear",
  },
  {
    roll: 40,
    name: "Soul-Twin Circlets",
    description:
      "Two creatures can wear this pair of circlets. You can spend a Hope to switch places with whoever is wearing the other circlet.",
    set: "Hope & Fear",
  },
  {
    roll: 41,
    name: "Namer's Oracle",
    description:
      "Once per session, you can roll this set of runic dice to reveal the full name of the last person you touched.",
    set: "Hope & Fear",
  },
  {
    roll: 42,
    name: "Crucible Frames",
    description:
      "These eyeglasses reveal weak points in objects and creatures. Three times per rest, you can spend a Hope to gain advantage on an attack roll.",
    set: "Hope & Fear",
  },
  {
    roll: 43,
    name: "Two-Faced Aegis Brooch",
    description:
      "Once per rest, flip a coin. On heads, you become immune to the next physical damage you take. On tails, you become immune to the next magic damage you take.",
    set: "Hope & Fear",
  },
  {
    roll: 44,
    name: "Knockback Bracelets",
    description:
      "On a successful weapon attack, you can knock your target back up to Close range from their location.",
    set: "Hope & Fear",
  },
  {
    roll: 45,
    name: "Force Disc",
    description:
      "This shimmering two-dimensional disc of magical force has a 4-foot diameter and is magically tethered to a pebble. The disc always floats 3 feet north of, and at the same elevation as, the pebble. The pebble has a mass equal to one-hundredth of the total mass carried by the disc.",
    set: "Hope & Fear",
  },
  {
    roll: 46,
    name: "Molepaw Mittens",
    description:
      "Spend a Hope to swim through earth as if it were water for the next 10 minutes.",
    set: "Hope & Fear",
  },
  {
    roll: 47,
    name: "Timekeeper's Pendant",
    description: "You can choose an additional downtime move each rest.",
    set: "Hope & Fear",
  },
  {
    roll: 48,
    name: "Iron Dagger Pendant",
    description:
      "Once per long rest, you can spend a Hope to tell the pendant a creature's name. The pendant gently pulls you toward that creature's current location until your next long rest.",
    set: "Hope & Fear",
  },
  {
    roll: 49,
    name: "Collar of Ascendancy",
    description:
      "An animal who wears this collar gains the ability to speak and understand common speech.",
    set: "Hope & Fear",
  },
  {
    roll: 50,
    name: "Temporal Sanctuary",
    description:
      "A PC who takes a rest in the temporal sanctuary can choose an additional downtime move.",
    set: "Hope & Fear",
  },
  {
    roll: 51,
    name: "Hero's Helm",
    description:
      "When you critically succeed on an attack, all allies within Close range gain a Hope.",
    set: "Hope & Fear",
  },
  {
    roll: 52,
    name: "Rings of Friendship",
    description:
      "Two creatures can wear this pair of rings shaped like coiled snakes. You can spend the Hope of whoever is wearing the other ring (with their permission) as if it were your own.",
    set: "Hope & Fear",
  },
  {
    roll: 53,
    name: "Rings of Camaraderie",
    description:
      "Two creatures can wear this pair of wooden rings. You can mark the Stress of whoever is wearing the other ring (with their permission) as if it were your own.",
    set: "Hope & Fear",
  },
  {
    roll: 54,
    name: "Rings of Alliance",
    description:
      "Two creatures can wear this pair of rose gold rings. Once per session, you can initiate a Tag Team Roll with whoever is wearing the other ring without spending Hope or counting against your session limit for Tag Team Rolls.",
    set: "Hope & Fear",
  },
  {
    roll: 55,
    name: "Phobophage's Circlet",
    description:
      "When the GM spends a Fear, roll a d4. Once per scene on a result of 4, you clear a Stress.",
    set: "Hope & Fear",
  },
  {
    roll: 56,
    name: "Quillshawl",
    description:
      "If an adversary attacks you within Melee range, they must succeed on a Reaction Roll (12) or mark a Hit Point.",
    set: "Hope & Fear",
  },
  {
    roll: 57,
    name: "Warp Pendant",
    description:
      "Once per rest, mark a Stress to teleport to a location you can clearly see.",
    set: "Hope & Fear",
  },
  {
    roll: 58,
    name: "Portal Frames",
    description:
      "This pair of small ornate frames, one red and one blue, are connected. Anything that passes into one exits from the other.",
    set: "Hope & Fear",
  },
  {
    roll: 59,
    name: "Communion Relic",
    description:
      "Once per rest, you can spend a Hope to use an ally's Experience as if it were your own. You can carry only one relic.",
    set: "Hope & Fear",
  },
  {
    roll: 60,
    name: "Augur's Relic",
    description:
      "Once per long rest, you can activate your Hope feature without spending Hope. You can carry only one relic.",
    set: "Hope & Fear",
  },
] satisfies Item[];
