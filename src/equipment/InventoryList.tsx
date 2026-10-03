import { createSignal, For, Show } from 'solid-js'
import { addItem, removeItem, replace, setItemQuantity } from '../character/changes'
import { useMode } from '../character/mode'
import { useCharacterSession } from '../character/session'
import { ItemCard } from '../content/EntityCards'
import { blankItem, ItemEditor } from '../content/editors/EntityEditors'
import { srd } from '../data/srd'
import { NumberField } from '../ui/fields'
import { List, Section } from '../ui/layout'
import { PickerDialog } from '../ui/PickerDialog'
import { EditDetails } from './EditDetails'

export function InventoryList() {
  const { character, change } = useCharacterSession()
  const mode = useMode()
  const [choosing, setChoosing] = createSignal(false)
  const [added, setAdded] = createSignal<number>()

  return (
    <Section
      heading="Inventory"
      actions={
        <Show when={mode() === 'edit'}>
          <button type="button" onClick={() => setChoosing(true)}>
            Add loot or consumable
          </button>
          <button
            type="button"
            onClick={() => {
              setAdded(character().inventory.length)
              change(addItem(blankItem()))
            }}
          >
            Add custom
          </button>
        </Show>
      }
    >
      <Show when={character().inventory.length} fallback={<p>Nothing carried.</p>}>
        <List>
          <For each={character().inventory}>
            {(item, index) => (
              <li>
                <ItemCard
                  item={item}
                  actions={
                    <Show when={mode() === 'edit'}>
                      <button type="button" onClick={() => change(removeItem(index()), `Removed ${item.name}`)}>
                        Remove
                      </button>
                    </Show>
                  }
                >
                  <Show when={mode() !== 'print'} fallback={<p class="meta">Quantity {item.quantity}</p>}>
                    <NumberField
                      label="Quantity"
                      value={item.quantity}
                      min={0}
                      onChange={(quantity) => change(setItemQuantity(index(), quantity))}
                    />
                  </Show>
                  <Show when={mode() === 'edit'}>
                    <EditDetails open={added() === index()}>
                      <ItemEditor value={item} onChange={(next) => change(replace(item, { ...next, quantity: item.quantity }))} />
                    </EditDetails>
                  </Show>
                </ItemCard>
              </li>
            )}
          </For>
        </List>
      </Show>
      <PickerDialog
        open={choosing()}
        onClose={() => setChoosing(false)}
        heading="Add loot or a consumable"
        entries={[...srd.consumables.entries, ...srd.loot.entries]}
      >
        {(item) => (
          <ItemCard
            item={item}
            actions={
              <button type="button" onClick={() => change(addItem(item))}>
                Add
              </button>
            }
          />
        )}
      </PickerDialog>
    </Section>
  )
}
