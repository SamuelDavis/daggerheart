import { Show } from 'solid-js'
import { addArmor, addItem, addWeaponToHand, compose } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { srd } from '../../data/srd'
import { creationGuidance, startingItems, startingPotions } from '../../data/srd/characterCreation'
import { findByName } from '../../data/srd/lookup'
import { ArmorList } from '../../equipment/ArmorList'
import { GoldControl } from '../../equipment/GoldControl'
import { InventoryList } from '../../equipment/InventoryList'
import { WeaponList } from '../../equipment/WeaponList'
import type { Item } from '../../types/srd'
import { Section } from '../../ui/layout'
import { Suggestions } from '../../ui/Suggestions'
import { Guidance } from '../Guidance'

function StartingInventory() {
  const { character, change } = useCharacterSession()
  const definition = () => findByName(srd.classes.entries, character().classes[0]?.name)
  const guide = () => findByName(srd.guides.entries, character().classes[0]?.name)
  const owned = (name: string) => character().inventory.some((item) => item.name === name)
  const itemNamed = (name: string): Item => findByName(srd.consumables.entries, name) ?? { name, text: '' }
  const unowned = (names: readonly string[]) => names.filter((name) => !owned(name))
  const add = (name: string) => change(addItem(itemNamed(name)))

  return (
    <Section heading="Starting items">
      <p class="meta">
        Characters usually start with a torch, rope, basic supplies, a handful of gold, a potion, and a class item. Add
        any of these, or anything else your GM approves.
      </p>
      <Suggestions label="Common starting items" options={unowned([...startingItems, ...startingPotions])} onPick={add} />
      <Show when={definition()}>
        {(characterClass) => (
          <Suggestions label={`${characterClass().name} items`} options={unowned(characterClass().classItems)} onPick={add} />
        )}
      </Show>
      <Show when={guide()?.spellFocus}>
        {(focus) => <Suggestions label={focus().prompt} options={unowned(focus().suggestions)} onPick={add} />}
      </Show>
    </Section>
  )
}

function SuggestedGear() {
  const { character, change } = useCharacterSession()
  const guide = () => findByName(srd.guides.entries, character().classes[0]?.name)
  const suggestion = () => {
    const current = guide()
    if (!current) return
    const weapons = [current.suggestedPrimaryWeapon, current.suggestedSecondaryWeapon].flatMap(
      (name) => findByName(srd.weapons.entries, name) ?? [],
    )
    const armor = findByName(srd.armor.entries, current.suggestedArmor)
    return { name: current.name, weapons, armor }
  }

  return (
    <Show when={suggestion()}>
      {(gear) => (
        <aside class="guidance">
          <p>
            The {gear().name} guide suggests{' '}
            {[...gear().weapons, ...(gear().armor ? [gear().armor!] : [])].map(({ name }) => name).join(', ')}.
          </p>
          <button
            type="button"
            onClick={() =>
              change(compose(...gear().weapons.map(addWeaponToHand), ...(gear().armor ? [addArmor(gear().armor!)] : [])))
            }
          >
            Add the suggested gear
          </button>
        </aside>
      )}
    </Show>
  )
}

export function EquipmentStep() {
  return (
    <>
      <Guidance text={creationGuidance.equipment} />
      <SuggestedGear />
      <WeaponList />
      <ArmorList />
      <StartingInventory />
      <InventoryList />
      <GoldControl />
    </>
  )
}
