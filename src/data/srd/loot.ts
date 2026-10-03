import type { Item } from '../../types/srd'

export const loot = [
  {
    name: 'Premium Bedroll',
    text: 'During downtime, you automatically clear a Stress.',
  },
  {
    name: 'Piper Whistle',
    text: 'This handcrafted whistle has a distinctive sound. When you blow this whistle, its piercing tone can be heard within a 1-mile radius.',
  },
  {
    name: 'Charging Quiver',
    text: 'When you succeed on an attack with an arrow stored in this quiver, gain a bonus to the damage roll equal to your current tier.',
  },
  {
    name: 'Alistair’s Torch',
    text: 'You can light this magic torch at will. The flame’s light fills a much larger space than it should, enough to illuminate a cave bright as day.',
  },
  {
    name: 'Speaking Orbs',
    text: 'This pair of orbs allows any creatures holding them to communicate with each other across any distance.',
  },
  {
    name: 'Manacles',
    text: 'This pair of locking cuffs comes with a key.',
  },
  {
    name: 'Arcane Cloak',
    text: 'A creature with a Spellcast trait wearing this cloak can adjust its color, texture, and size at will.',
  },
  {
    name: 'Woven Net',
    text: 'You can make a Finesse Roll using this net to trap a small creature. A trapped target can break free with a successful Attack Roll (16).',
  },
  {
    name: 'Fire Jar',
    text: 'You can pour out the strange liquid contents of this jar to instantly produce fire. The contents regenerate when you take a long rest.',
  },
  {
    name: 'Suspended Rod',
    text: 'This flat rod is inscribed with runes. When you activate the rod, it is immediately suspended in place. Until the rod is deactivated, it can’t move, doesn’t abide by the rules of gravity, and remains in place.',
  },
  {
    name: 'Glamour Stone',
    text: 'Activate this pebble-sized stone to memorize the appearance of someone you can see. Spend a Hope to magically recreate this guise on yourself as an illusion.',
  },
  {
    name: 'Empty Chest',
    text: 'This magical chest appears empty. When you speak a specific trigger word or action and open the chest, you can see the items stored within it.',
  },
  {
    name: 'Companion Case',
    text: 'This case can fit a small animal companion. While the companion is inside, the animal and case are immune to all damage and harmful effects.',
  },
  {
    name: 'Piercing Arrows',
    text: 'Three times per rest when you succeed on an attack with one of these arrows, you can add your Proficiency to the damage roll.',
  },
  {
    name: 'Valorstone',
    text: 'You can attach this stone to armor that doesn’t already have a feature. The armor gains the following feature. Resilient: Before you mark your last Armor Slot, roll a d6. On a result of 6, reduce the severity by one threshold without marking an Armor Slot.',
  },
  {
    name: 'Skeleton Key',
    text: 'When you use this key to open a locked door, you gain advantage on the Finesse Roll.',
  },
  {
    name: 'Arcane Prism',
    text: 'Position this prism in a location of your choosing and activate it. All allies within Close range of it gain a +1 bonus to their Spellcast Rolls. While activated, the prism can’t be moved. Once the prism is deactivated, it can’t be activated again until your next long rest.',
  },
  {
    name: 'Minor Stamina Potion Recipe',
    text: 'As a downtime move, you can use the bone of a creature to craft a Minor Stamina Potion.',
  },
  {
    name: 'Minor Health Potion Recipe',
    text: 'As a downtime move, you can use a vial of blood to craft a Minor Health Potion.',
  },
  {
    name: 'Homing Compasses',
    text: 'These two compasses point toward each other no matter how far apart they are.',
  },
  {
    name: 'Corrector Sprite',
    text: 'This tiny sprite sits in the curve of your ear canal and whispers helpful advice during combat. Once per short rest, you can gain advantage on an attack roll.',
  },
  {
    name: 'Gecko Gloves',
    text: 'You can climb up vertical surfaces and across ceilings.',
  },
  {
    name: 'Lorekeeper',
    text: 'You can store the name and details of up to three hostile creatures inside this book. You gain a +1 bonus to action rolls against those creatures.',
  },
  {
    name: 'Vial of Darksmoke Recipe',
    text: 'As a downtime move, you can mark a Stress to craft a Vial of Darksmoke.',
  },
  {
    name: 'Bloodstone',
    text: 'You can attach this stone to a weapon that doesn’t already have a feature. The weapon gains the following feature. Brutal: When you roll the maximum value on a damage die, roll an additional damage die.',
  },
  {
    name: 'Greatstone',
    text: 'You can attach this stone to a weapon that doesn’t already have a feature. The weapon gains the following feature. Powerful: On a successful attack, roll an additional damage die and discard the lowest result.',
  },
  {
    name: 'Glider',
    text: 'While falling, you can mark a Stress to deploy this small parachute and glide safely to the ground.',
  },
  {
    name: 'Ring of Silence',
    text: 'Spend a Hope to activate this ring. Your footsteps are silent until your next rest.',
  },
  {
    name: 'Calming Pendant',
    text: 'When you would mark your last Stress, roll a d6. On a result of 5 or higher, don’t mark it.',
  },
  {
    name: 'Dual Flask',
    text: 'This flask can hold two different liquids. You can swap between them by flipping a small switch on the flask’s side.',
  },
  {
    name: 'Bag of Ficklesand',
    text: 'You can convince this small bag of sand to be much heavier or lighter with a successful Presence Roll (10). Additionally, on a successful Finesse Roll (10), you can blow a bit of sand into a target’s face to make them temporarily Vulnerable.',
  },
  {
    name: 'Ring of Resistance',
    text: 'Once per long rest, you can activate this ring after a successful attack against you to halve the damage.',
  },
  {
    name: 'Phoenix Feather',
    text: 'If you have at least one Phoenix Feather on you when you fall unconscious, you gain a +1 bonus to the roll you make to determine whether you gain a scar.',
  },
  {
    name: 'Box of Many Goods',
    text: 'Once per long rest, you can open this small box and roll a d12. On a result of 1–6, it’s empty. On a result of 7–10, it contains one random common consumable. On a result of 11–12, it contains two random common consumables.',
  },
  {
    name: 'Airblade Charm',
    text: 'You can attach this charm to a weapon with a Melee range. Three times per rest, you can activate the charm and attack a target within Close range.',
  },
  {
    name: 'Portal Seed',
    text: 'You can plant this seed in the ground to grow a portal in that spot. The portal is ready to use in 24 hours. You can use this portal to travel to any other location where you planted a portal seed. A portal can be destroyed by dealing any amount of magic damage to it.',
  },
  {
    name: 'Paragon’s Chain',
    text: 'As a downtime move, you can meditate on an ideal or principle you hold dear and focus your will into this chain. Once per long rest, you can spend a Hope to roll a d20 as your Hope Die for rolls that directly align with that principle.',
  },
  {
    name: 'Elusive Amulet',
    text: 'Once per long rest, you can activate this amulet to become Hidden until you move. While Hidden in this way, you remain unseen even if an adversary moves to where they would normally see you.',
  },
  {
    name: 'Hopekeeper Locket',
    text: 'During a long rest, if you have 6 Hope, you can spend a Hope to imbue this locket with your bountiful resolve. When you have 0 Hope, you can use the locket to immediately gain a Hope. The locket must be re-imbued before it can be used this way again.',
  },
  {
    name: 'Infinite Bag',
    text: 'When you store items in this bag, they are kept in a pocket dimension that never runs out of space. You can retrieve an item at any time.',
  },
  {
    name: 'Stride Relic',
    text: 'You gain a +1 bonus to your Agility. You can only carry one relic.',
  },
  {
    name: 'Bolster Relic',
    text: 'You gain a +1 bonus to your Strength. You can only carry one relic.',
  },
  {
    name: 'Control Relic',
    text: 'You gain a +1 bonus to your Finesse. You can only carry one relic.',
  },
  {
    name: 'Attune Relic',
    text: 'You gain a +1 bonus to your Instinct. You can only carry one relic.',
  },
  {
    name: 'Charm Relic',
    text: 'You gain a +1 bonus to your Presence. You can only carry one relic.',
  },
  {
    name: 'Enlighten Relic',
    text: 'You gain a +1 bonus to your Knowledge. You can only carry one relic.',
  },
  {
    name: 'Honing Relic',
    text: 'You gain a +1 bonus to an Experience of your choice. You can only carry one relic.',
  },
  {
    name: 'Flickerfly Pendant',
    text: 'While you carry this pendant, your weapons with a Melee range that deal physical damage have a gossamer sheen and can attack targets within Very Close range.',
  },
  {
    name: 'Lakestrider Boots',
    text: 'You can walk on the surface of water as if it were soft ground.',
  },
  {
    name: 'Clay Companion',
    text: 'When you sculpt this ball of clay into a clay animal companion, it behaves as that animal. For example, a clay spider can spin clay webs, while a clay bird can fly. The clay companion retains memory and identity across different shapes, but they can adopt new mannerisms with each form.',
  },
  {
    name: 'Mythic Dust Recipe',
    text: 'As a downtime move, you can use a handful of fine gold dust to craft Mythic Dust.',
  },
  {
    name: 'Shard of Memory',
    text: 'Once per long rest, you can spend 2 Hope to recall a domain card from your vault instead of paying its Recall Cost.',
  },
  {
    name: 'Gem of Alacrity',
    text: 'You can attach this gem to a weapon, allowing you to use your Agility when making an attack with that weapon.',
  },
  {
    name: 'Gem of Might',
    text: 'You can attach this gem to a weapon, allowing you to use your Strength when making an attack with that weapon.',
  },
  {
    name: 'Gem of Precision',
    text: 'You can attach this gem to a weapon, allowing you to use your Finesse when making an attack with that weapon.',
  },
  {
    name: 'Gem of Insight',
    text: 'You can attach this gem to a weapon, allowing you to use your Instinct when making an attack with that weapon.',
  },
  {
    name: 'Gem of Audacity',
    text: 'You can attach this gem to a weapon, allowing you to use your Presence when making an attack with that weapon.',
  },
  {
    name: 'Gem of Sagacity',
    text: 'You can attach this gem to a weapon, allowing you to use your Knowledge when making an attack with that weapon.',
  },
  {
    name: 'Ring of Unbreakable Resolve',
    text: 'Once per session, when the GM spends a Fear, you can spend 4 Hope to cancel the effects of that spent Fear.',
  },
  {
    name: 'Belt of Unity',
    text: 'Once per session, you can spend 5 Hope to lead a Tag Team Roll with three PCs instead of two.',
  },
  {
    name: 'Caltrops',
    text: 'You can spread these caltrops in a Very Close area around you. A creature hastening through that area must mark a Stress.',
  },
  {
    name: 'Grapnel',
    text: 'You gain advantage on action rolls to climb sheer surfaces.',
  },
  {
    name: 'Ball Bearings',
    text: 'This pouch contains perfectly smooth metal spheres.',
  },
  {
    name: 'Box of Dragon Dust',
    text: 'This snuffbox is filled with combustible powder.',
  },
  {
    name: 'Nighthawker’s Ring',
    text: 'Spend a Hope to activate the gemstone in this ring until the end of the scene. While active, the gemstone changes color to indicate the wearer’s proximity to hidden treasure: warm colors for near, cool colors for far.',
  },
  {
    name: 'Elven Spyglass',
    text: 'You can use this spyglass to magnify your vision a hundredfold.',
  },
  {
    name: 'Gourmet Granules',
    text: 'This savory powder makes any food it’s sprinkled on delicious and healthy, no matter how bland or rotten it is.',
  },
  {
    name: 'Collapsible Pole',
    text: 'You can break down this 18-foot pole into six interlinked 3-foot segments.',
  },
  {
    name: 'Blackwing Quill',
    text: 'This writing quill never runs out of ink or needs to be sharpened.',
  },
  {
    name: 'Silee’s Folding Knife',
    text: 'This 3-inch blade has an edge that easily cuts through anything except the handle it’s stored in.',
  },
  {
    name: 'Windup Toy',
    text: 'This small mechanical device is shaped like a strixwolf pup and can be programmed to perform simple tricks.',
  },
  {
    name: 'Loaded Dice',
    text: 'You can choose what result this set of weighted dice rolls with a successful Finesse Roll (14). If you roll with Fear, anyone watching knows the dice are loaded.',
  },
  {
    name: 'Hollowbark Horn',
    text: 'You can blow this horn to summon a small woodland creature to perform a simple task.',
  },
  {
    name: 'Self-Tying Rope',
    text: 'You can command this rope to tie or untie itself.',
  },
  {
    name: 'Thief’s Compass',
    text: 'This compass points the way toward the nearest exit while indoors and the closest entrance while outdoors.',
  },
  {
    name: 'Traveler’s Bell',
    text: 'Once per long rest, you can ring this bell to magically open the shortest safe path through rough terrain for 1 hour.',
  },
  {
    name: 'Mandragorian Torch',
    text: 'This torch gives off light only the bearer can see.',
  },
  {
    name: 'Boots of Supple Mystique',
    text: 'While wearing these boots, you don’t leave tracks or footprints.',
  },
  {
    name: 'Zephyr’s Jar',
    text: 'You can open this empty jar during inclement weather to capture the storm and leave behind clear skies. The storm remains inside until unleashed by reopening the jar.',
  },
  {
    name: 'Returning Ring',
    text: 'When you throw your primary weapon while wearing this ring, the weapon appears in your hand immediately after the attack.',
  },
  {
    name: 'Kingfisher’s Net',
    text: 'Once per long rest, you can use this net to scoop one live fish out of any amount of water, no matter how unlikely it is for that water to have fish in it.',
  },
  {
    name: 'Titan’s Girdle',
    text: 'Once per scene, you can activate this girdle to gain a +1 bonus to your Proficiency for your next attack.',
  },
  {
    name: 'Iron Veil',
    text: 'This chain-link head covering renders the wearer invisible to fey creatures.',
  },
  {
    name: 'Furball Bag',
    text: 'Once per rest, you can produce 2d20 harmless, cat-sized fur creatures of indeterminate origin and species from this bag.',
  },
  {
    name: 'Whisperstep Anklet',
    text: 'This anklet makes your steps silent as long as you don’t move faster than walking speed.',
  },
  {
    name: 'Enchanter’s Loupe',
    text: 'You can use this loupe to see through illusions and enchantments.',
  },
  {
    name: 'Escher’s Mirrorball',
    text: 'Once per long rest, you can command this fist-sized silver orb to capture an omnidirectional image of its surroundings on its surface. This image lasts until your next long rest.',
  },
  {
    name: 'Cheater’s Coin',
    text: 'When you flip this coin, you can spend a Hope to determine which side it lands on.',
  },
  {
    name: 'Gravewarden’s Bell',
    text: 'This bell rings when a ghost or undead creature moves within Far range of it.',
  },
  {
    name: 'Reliquary of the Sightless Saint',
    text: 'You gain a +1 bonus to your Hope Die when you make the Risk It All death move.',
  },
  {
    name: 'Map of Revelation',
    text: 'You can attune this map to one creature at a time. The map always shows the attuned creature’s location.',
  },
  {
    name: 'Dagginae’s Obsidian Slate',
    text: 'This wafer-thin sheet of volcanic glass is used by archivists to keep notes. Any information etched onto its surface disappears but can be recalled via a command you set.',
  },
  {
    name: 'Gadiman’s Backpack',
    text: 'Once per rest, you can spend a Hope to conjure a mundane item up to a cubic foot in size inside this satchel.',
  },
  {
    name: 'Eclipse Coin',
    text: 'Once per rest, flip a coin. On heads, you gain a +1 bonus to attack rolls until your next successful attack. On tails, you gain +1 to your Evasion until an attack fails against you.',
  },
  {
    name: 'Sorcerer’s Hat',
    text: 'This conical blue hat is covered in silver stars. Once per rest, you can cast a spell from your vault with a Recall Cost equal to or less than your tier. This doesn’t work for permanently vaulted cards.',
  },
  {
    name: 'Ghoulskin Gloves',
    text: 'When you attack with a physical weapon while wearing these gloves, the damage is considered both physical and magic.',
  },
  {
    name: 'Gloves of Alacrity',
    text: 'When you would mark a Stress to reload a weapon, you don’t mark it.',
  },
  {
    name: 'Insomniac’s Periapt',
    text: 'When you take a rest without clearing Hit Points or Stress, you gain a +2 bonus to attack and damage rolls until your next rest.',
  },
  {
    name: 'Wildrider’s Saddle',
    text: 'This saddle grants any animal it’s strapped onto the ability to understand their rider’s commands.',
  },
  {
    name: 'Soul-Twin Circlets',
    text: 'Two creatures can wear this pair of circlets. You can spend a Hope to switch places with whoever is wearing the other circlet.',
  },
  {
    name: 'Namer’s Oracle',
    text: 'Once per session, you can roll this set of runic dice to reveal the full name of the last person you touched.',
  },
  {
    name: 'Crucible Frames',
    text: 'These eyeglasses reveal weak points in objects and creatures. Three times per rest, you can spend a Hope to gain advantage on an attack roll.',
  },
  {
    name: 'Two-Faced Aegis Brooch',
    text: 'Once per rest, flip a coin. On heads, you become immune to the next physical damage you take. On tails, you become immune to the next magic damage you take.',
  },
  {
    name: 'Knockback Bracelets',
    text: 'On a successful weapon attack, you can knock your target back up to Close range from their location.',
  },
  {
    name: 'Force Disc',
    text: 'This shimmering two-dimensional disc of magical force has a 4-foot diameter and is magically tethered to a pebble. The disc always floats 3 feet north of, and at the same elevation as, the pebble. The pebble has a mass equal to one-hundredth of the total mass carried by the disc.',
  },
  {
    name: 'Molepaw Mittens',
    text: 'Spend a Hope to swim through earth as if it were water for the next 10 minutes.',
  },
  {
    name: 'Timekeeper’s Pendant',
    text: 'You can choose an additional downtime move each rest.',
  },
  {
    name: 'Iron Dagger Pendant',
    text: 'Once per long rest, you can spend a Hope to tell the pendant a creature’s name. The pendant gently pulls you toward that creature’s current location until your next long rest.',
  },
  {
    name: 'Collar of Ascendancy',
    text: 'An animal who wears this collar gains the ability to speak and understand common speech.',
  },
  {
    name: 'Temporal Sanctuary',
    text: 'A PC who takes a rest in the temporal sanctuary can choose an additional downtime move.',
  },
  {
    name: 'Hero’s Helm',
    text: 'When you critically succeed on an attack, all allies within Close range gain a Hope.',
  },
  {
    name: 'Rings of Friendship',
    text: 'Two creatures can wear this pair of rings shaped like coiled snakes. You can spend the Hope of whoever is wearing the other ring (with their permission) as if it were your own.',
  },
  {
    name: 'Rings of Camaraderie',
    text: 'Two creatures can wear this pair of wooden rings. You can mark the Stress of whoever is wearing the other ring (with their permission) as if it were your own.',
  },
  {
    name: 'Rings of Alliance',
    text: 'Two creatures can wear this pair of rose gold rings. Once per session, you can initiate a Tag Team Roll with whoever is wearing the other ring without spending Hope or counting against your session limit for Tag Team Rolls.',
  },
  {
    name: 'Phobophage’s Circlet',
    text: 'When the GM spends a Fear, roll a d4. Once per scene on a result of 4, you clear a Stress.',
  },
  {
    name: 'Quillshawl',
    text: 'If an adversary attacks you within Melee range, they must succeed on a Reaction Roll (12) or mark a Hit Point.',
  },
  {
    name: 'Warp Pendant',
    text: 'Once per rest, mark a Stress to teleport to a location you can clearly see.',
  },
  {
    name: 'Portal Frames',
    text: 'This pair of small ornate frames, one red and one blue, are connected. Anything that passes into one exits from the other.',
  },
  {
    name: 'Communion Relic',
    text: 'Once per rest, you can spend a Hope to use an ally’s Experience as if it were your own. You can carry only one relic.',
  },
  {
    name: 'Augur’s Relic',
    text: 'Once per long rest, you can activate your Hope feature without spending Hope. You can carry only one relic.',
  },
] as const satisfies readonly Item[]
