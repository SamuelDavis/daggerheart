import { createSignal, For, Show } from 'solid-js'
import { addArmor, removeArmor, replace, setArmorEquipped } from '../character/changes'
import { useMode } from '../character/mode'
import { tierOf } from '../character/rules'
import { useCharacterSession } from '../character/session'
import { ArmorCard } from '../content/EntityCards'
import { ArmorEditor, blankArmor } from '../content/editors/EntityEditors'
import { srd } from '../data/srd'
import { List, Section } from '../ui/layout'
import { PickerDialog } from '../ui/PickerDialog'
import { ToggleButton } from '../ui/ToggleButton'
import { EditDetails } from './EditDetails'
import { TierFilter } from '../ui/TierFilter'

export function ArmorList() {
  const { character, change } = useCharacterSession()
  const mode = useMode()
  const [choosing, setChoosing] = createSignal(false)
  const [allTiers, setAllTiers] = createSignal(false)
  const [added, setAdded] = createSignal<number>()
  const available = () => srd.armor.entries.filter((armor) => allTiers() || armor.tier <= tierOf(character().level))

  return (
    <Section
      heading="Armor"
      actions={
        <Show when={mode() === 'edit'}>
          <button type="button" onClick={() => setChoosing(true)}>
            Add armor
          </button>
          <button
            type="button"
            onClick={() => {
              setAdded(character().armor.length)
              change(addArmor(blankArmor()))
            }}
          >
            Add custom
          </button>
        </Show>
      }
    >
      <Show when={mode() === 'edit'}>
        <p class="meta">Equipping armor sets your Armor Score and damage thresholds (base thresholds plus your level).</p>
      </Show>
      <Show when={character().armor.length} fallback={<p>No armor.</p>}>
        <List>
          <For each={character().armor}>
            {(armor, index) => (
              <li>
                <ArmorCard
                  armor={armor}
                  actions={
                    <Show when={mode() !== 'print'} fallback={<small>{armor.equipped ? 'Active' : 'Inventory'}</small>}>
                      <ToggleButton pressed={armor.equipped} onClick={() => change(setArmorEquipped(index(), !armor.equipped))}>
                        Active
                      </ToggleButton>
                      <Show when={mode() === 'edit'}>
                        <button type="button" onClick={() => change(removeArmor(index()), `Removed ${armor.name}`)}>
                          Remove
                        </button>
                      </Show>
                    </Show>
                  }
                >
                  <Show when={mode() === 'edit'}>
                    <EditDetails open={added() === index()}>
                      <ArmorEditor value={armor} onChange={(next) => change(replace(armor, next))} />
                    </EditDetails>
                  </Show>
                </ArmorCard>
              </li>
            )}
          </For>
        </List>
      </Show>
      <PickerDialog
        open={choosing()}
        onClose={() => setChoosing(false)}
        heading="Add armor"
        entries={available()}
        filters={<TierFilter allTiers={allTiers()} onChange={setAllTiers} />}
      >
        {(armor) => (
          <ArmorCard
            armor={armor}
            actions={
              <button
                type="button"
                onClick={() => {
                  change(addArmor(armor))
                  setChoosing(false)
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
