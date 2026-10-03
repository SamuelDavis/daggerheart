import { createSignal, For, Show } from 'solid-js'
import { addWeaponToHand, removeWeapon, replace, setWeaponEquipped } from '../character/changes'
import { useMode } from '../character/mode'
import { tierOf } from '../character/rules'
import { useCharacterSession } from '../character/session'
import { WeaponCard } from '../content/EntityCards'
import { blankWeapon, WeaponEditor } from '../content/editors/EntityEditors'
import { srd } from '../data/srd'
import type { WeaponCategory } from '../types/srd'
import { List, Section } from '../ui/layout'
import { PickerDialog } from '../ui/PickerDialog'
import { ToggleButton } from '../ui/ToggleButton'
import { EditDetails } from './EditDetails'
import { TierFilter } from './TierFilter'

export function WeaponList() {
  const { character, change } = useCharacterSession()
  const mode = useMode()
  const [category, setCategory] = createSignal<WeaponCategory>()
  const [allTiers, setAllTiers] = createSignal(false)
  const [added, setAdded] = createSignal<number>()
  const available = () =>
    srd.weapons.entries.filter(
      (weapon) => weapon.category === category() && (allTiers() || weapon.tier <= tierOf(character().level)),
    )

  return (
    <Section
      heading="Weapons"
      actions={
        <Show when={mode() === 'edit'}>
          <button type="button" onClick={() => setCategory('primary')}>
            Add primary
          </button>
          <button type="button" onClick={() => setCategory('secondary')}>
            Add secondary
          </button>
          <button
            type="button"
            onClick={() => {
              setAdded(character().weapons.length)
              change(addWeaponToHand(blankWeapon()))
            }}
          >
            Add custom
          </button>
        </Show>
      }
    >
      <Show when={mode() === 'play'}>
        <p class="meta">Swapping an active and inventory weapon is free during a rest or moment of calm; otherwise mark a Stress.</p>
      </Show>
      <Show when={character().weapons.length} fallback={<p>No weapons.</p>}>
        <List>
          <For each={character().weapons}>
            {(weapon, index) => (
              <li>
                <WeaponCard
                  weapon={weapon}
                  proficiency={character().proficiency}
                  actions={
                    <Show when={mode() !== 'print'} fallback={<small>{weapon.equipped ? 'Active' : 'Inventory'}</small>}>
                      <ToggleButton pressed={weapon.equipped} onClick={() => change(setWeaponEquipped(index(), !weapon.equipped))}>
                        Active
                      </ToggleButton>
                      <Show when={mode() === 'edit'}>
                        <button type="button" onClick={() => change(removeWeapon(index()), `Removed ${weapon.name}`)}>
                          Remove
                        </button>
                      </Show>
                    </Show>
                  }
                >
                  <Show when={mode() === 'edit'}>
                    <EditDetails open={added() === index()}>
                      <WeaponEditor value={weapon} onChange={(next) => change(replace(weapon, next))} />
                    </EditDetails>
                  </Show>
                </WeaponCard>
              </li>
            )}
          </For>
        </List>
      </Show>
      <PickerDialog
        open={category() !== undefined}
        onClose={() => setCategory(undefined)}
        heading={`Add a ${category() ?? ''} weapon`}
        entries={available()}
        filters={<TierFilter allTiers={allTiers()} onChange={setAllTiers} />}
      >
        {(weapon) => (
          <WeaponCard
            weapon={weapon}
            actions={
              <button
                type="button"
                onClick={() => {
                  change(addWeaponToHand(weapon))
                  setCategory(undefined)
                }}
              >
                Add
              </button>
            }
          />
        )}
      </PickerDialog>
    </Section>
  )
}
