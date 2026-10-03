import { createSignal, For, Show } from 'solid-js'
import { addArmor, addItem, addWeaponToHand, compose, modify, removeItem, type Change } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { srd } from '../../data/srd'
import { creationGuidance, startingItems, startingPotions, startingValues } from '../../data/srd/characterCreation'
import { findByName } from '../../data/srd/lookup'
import { ArmorList } from '../../equipment/ArmorList'
import { GoldControl } from '../../equipment/GoldControl'
import { InventoryList } from '../../equipment/InventoryList'
import { WeaponList } from '../../equipment/WeaponList'
import type { Item } from '../../types/srd'
import { Field, Fieldset } from '../../ui/form'
import { Section, Toolbar } from '../../ui/layout'
import { ToggleButton } from '../../ui/ToggleButton'
import { Guidance } from '../Guidance'

const plainItem = (name: string): Item => ({ name, text: '' })

function QuickPicks(props: { legend: string; options: readonly Item[] }) {
  const { character, change } = useCharacterSession()
  const owned = (item: Item) => character().inventory.some(({ name }) => name === item.name)
  const toggle = (item: Item) =>
    change(owned(item) ? removeItem(character().inventory.findIndex(({ name }) => name === item.name)) : addItem(item))

  return (
    <Fieldset legend={props.legend}>
      <Toolbar>
        <For each={props.options}>
          {(item) => (
            <ToggleButton pressed={owned(item)} onClick={() => toggle(item)}>
              {item.name}
            </ToggleButton>
          )}
        </For>
      </Toolbar>
    </Fieldset>
  )
}

function CustomItem(props: { label: string; suggestions?: readonly string[] }) {
  const { change } = useCharacterSession()
  const [name, setName] = createSignal('')
  const listId = `${props.label.replace(/\W/g, '-')}-suggestions`
  const add = () => {
    if (!name().trim()) return
    change(addItem(plainItem(name().trim())))
    setName('')
  }

  return (
    <form
      class="row"
      onSubmit={(event) => {
        event.preventDefault()
        add()
      }}
    >
      <Field label={props.label}>
        {(control) => (
          <>
            <input
              {...control}
              list={props.suggestions ? listId : undefined}
              value={name()}
              onInput={(event) => setName(event.currentTarget.value)}
            />
            <Show when={props.suggestions}>
              <datalist id={listId}>
                <For each={props.suggestions}>{(suggestion) => <option value={suggestion} />}</For>
              </datalist>
            </Show>
          </>
        )}
      </Field>
      <button type="submit">Add</button>
    </form>
  )
}

function StartingInventory() {
  const { character, change } = useCharacterSession()
  const definition = () => findByName(srd.classes.entries, character().classes[0]?.name)
  const guide = () => findByName(srd.guides.entries, character().classes[0]?.name)
  const potions = () => startingPotions.flatMap((name) => findByName(srd.consumables.entries, name) ?? [])
  const addStartingItems: Change = compose(
    ...startingItems.map((name) => addItem(plainItem(name))),
    modify('gold', (gold) => ({ ...gold, handfuls: gold.handfuls + startingValues.goldHandfuls })),
  )

  return (
    <Section
      heading="Starting items"
      actions={
        <button type="button" onClick={() => change(addStartingItems)}>
          Add torch, rope, supplies & gold
        </button>
      }
    >
      <QuickPicks legend="Choose a potion" options={potions()} />
      <Show when={definition()}>
        {(characterClass) => (
          <QuickPicks legend={`Choose a ${characterClass().name} item`} options={characterClass().classItems.map(plainItem)} />
        )}
      </Show>
      <Show when={guide()?.spellFocus}>
        {(focus) => <CustomItem label={focus().prompt} suggestions={focus().suggestions} />}
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
