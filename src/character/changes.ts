import { loadoutLimit } from '../data/srd/characterCreation'
import type { TraitName } from '../data/srd/traits'
import { removeAt, replaceAt, replaceNode } from '../lib/immutable'
import type { CardPlacement, Character, ClassProgress, OwnedItem } from '../types/app'
import type { Ancestry, Armor, CharacterClass, DomainCard, Item, Subclass, Weapon } from '../types/srd'

export type Change = (character: Character) => Character

export const assign =
  <Key extends keyof Character>(key: Key, value: Character[Key]): Change =>
  (character) => ({ ...character, [key]: value })

export const modify =
  <Key extends keyof Character>(key: Key, update: (value: Character[Key]) => Character[Key]): Change =>
  (character) => ({ ...character, [key]: update(character[key]) })

export const replace =
  <Node extends object>(target: Node, next: Node): Change =>
  (character) =>
    replaceNode(character, target, next)

export const compose =
  (...changes: Change[]): Change =>
  (character) =>
    changes.reduce((current, change) => change(current), character)

const modifyPrimaryClass = (update: (progress: ClassProgress) => ClassProgress) =>
  modify('classes', ([primary, ...others]) => (primary ? [update(primary), ...others] : others))

export const chooseClass = (characterClass: CharacterClass): Change =>
  compose(
    modify('classes', ([, ...others]) => [
      {
        name: characterClass.name,
        domains: characterClass.domains,
        hopeFeature: characterClass.hopeFeature,
        features: characterClass.features,
      },
      ...others,
    ]),
    assign('evasion', characterClass.startingEvasion),
    modify('hitPoints', (hitPoints) => ({ ...hitPoints, max: characterClass.startingHitPoints })),
  )

export const chooseSubclass = ({ name, description, spellcastTrait, foundation }: Subclass): Change =>
  modifyPrimaryClass((progress) => ({
    ...progress,
    subclass: { name, description, spellcastTrait, foundation, ranks: ['foundation'] },
  }))

export const chooseAncestry = (ancestry: Ancestry): Change =>
  modify('heritage', (heritage) => ({ ...heritage, ancestry }))

export const mixAncestries = (first: Ancestry, second: Ancestry): Change =>
  chooseAncestry({
    name: `${first.name}-${second.name}`,
    description: `${first.description}\n${second.description}`,
    features: [first.features[0], second.features[1]],
  })

export const setTrait = (trait: TraitName, value: number): Change =>
  modify('traits', (traits) => ({ ...traits, [trait]: { ...traits[trait], value } }))

export const assignTraits = (values: Readonly<Record<string, number>>): Change =>
  modify(
    'traits',
    (traits) =>
      Object.fromEntries(
        Object.entries(traits).map(([trait, score]) => [trait, { ...score, value: values[trait] ?? score.value }]),
      ) as Character['traits'],
  )


export const addWeapon = (weapon: Weapon, equipped: boolean): Change =>
  modify('weapons', (weapons) => [...weapons, { ...weapon, equipped }])

export const addWeaponToHand = (weapon: Weapon): Change =>
  modify('weapons', (weapons) => [
    ...weapons,
    { ...weapon, equipped: !weapons.some(({ equipped, category }) => equipped && category === weapon.category) },
  ])

export const removeWeapon = (index: number): Change => modify('weapons', (weapons) => removeAt(weapons, index))

export const setArmorEquipped =
  (index: number, equipped: boolean): Change =>
  (character) => {
    const armor = character.armor[index]
    if (!equipped) return { ...character, armor: replaceAt(character.armor, index, { ...armor, equipped }) }
    return {
      ...character,
      armor: character.armor.map((owned, position) => ({ ...owned, equipped: position === index })),
      armorSlots: { ...character.armorSlots, max: armor.score },
      thresholds: {
        major: armor.thresholds.major + character.level,
        severe: armor.thresholds.severe + character.level,
      },
    }
  }

export const addArmor = (armor: Armor): Change => (character) =>
  setArmorEquipped(character.armor.length, true)({ ...character, armor: [...character.armor, { ...armor, equipped: false }] })

export const setWeaponEquipped = (index: number, equipped: boolean): Change =>
  modify('weapons', (weapons) => replaceAt(weapons, index, { ...weapons[index], equipped }))

export const removeArmor = (index: number): Change => modify('armor', (armor) => removeAt(armor, index))

export const addItem = (item: Item, quantity = 1): Change =>
  modify('inventory', (inventory): readonly OwnedItem[] => {
    const index = inventory.findIndex(({ name }) => name === item.name)
    return index === -1
      ? [...inventory, { ...item, quantity }]
      : inventory.map((owned, position) => (position === index ? { ...owned, quantity: owned.quantity + quantity } : owned))
  })

export const removeItem = (index: number): Change => modify('inventory', (inventory) => removeAt(inventory, index))

export const setItemQuantity = (index: number, quantity: number): Change =>
  modify('inventory', (inventory) => replaceAt(inventory, index, { ...inventory[index], quantity }))

export const addDomainCard = (card: DomainCard): Change =>
  modify('domainCards', (cards) => [
    ...cards,
    {
      ...card,
      placement: cards.filter(({ placement }) => placement === 'loadout').length < loadoutLimit ? 'loadout' : 'vault',
    },
  ])

export const toggleDomainCard = (card: DomainCard): Change => (character) =>
  character.domainCards.some(({ name }) => name === card.name)
    ? { ...character, domainCards: character.domainCards.filter(({ name }) => name !== card.name) }
    : addDomainCard(card)(character)

export const setCardPlacement = (index: number, placement: CardPlacement): Change =>
  modify('domainCards', (cards) => replaceAt(cards, index, { ...cards[index], placement }))

export const removeDomainCard = (index: number): Change => modify('domainCards', (cards) => removeAt(cards, index))
