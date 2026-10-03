import { createSignal, For, Show } from 'solid-js'
import { addDomainCard, removeDomainCard, replace, setCardPlacement } from '../../character/changes'
import { useMode } from '../../character/mode'
import { useCharacterSession } from '../../character/session'
import { blankDomainCard, DomainCardEditor } from '../../content/editors/EntityEditors'
import { DomainCardCard } from '../../content/EntityCards'
import { FieldValues } from '../../content/FieldValues'
import { SheetFieldControl } from '../../content/SheetFieldControl'
import { srd } from '../../data/srd'
import { loadoutLimit } from '../../data/srd/characterCreation'
import { EditDetails } from '../../equipment/EditDetails'
import type { CardPlacement, OwnedDomainCard } from '../../types/app'
import { List, Section } from '../../ui/layout'
import { PickerDialog } from '../../ui/PickerDialog'

const otherPlace = (placement: CardPlacement): CardPlacement => (placement === 'loadout' ? 'vault' : 'loadout')

function OwnedCard(props: { card: OwnedDomainCard; index: number }) {
  const { change } = useCharacterSession()
  const mode = useMode()
  const moveLabel = () =>
    props.card.placement === 'loadout' ? 'Move to vault' : `Move to loadout (recall ${props.card.recallCost} Stress)`

  return (
    <DomainCardCard
      card={props.card}
      actions={
        <Show when={mode() !== 'print'}>
          <button type="button" onClick={() => change(setCardPlacement(props.index, otherPlace(props.card.placement)))}>
            {moveLabel()}
          </button>
          <Show when={mode() === 'edit'}>
            <button type="button" onClick={() => change(removeDomainCard(props.index), `Removed ${props.card.name}`)}>
              Remove
            </button>
          </Show>
        </Show>
      }
    >
      <Show when={mode() === 'print'} fallback={
        <For each={props.card.fields}>
          {(field) => <SheetFieldControl field={field} onChange={(next) => change(replace(field, next))} />}
        </For>
      }>
        <Show when={props.card.fields}>{(fields) => <FieldValues fields={fields()} />}</Show>
      </Show>
      <Show when={mode() === 'edit'}>
        <EditDetails>
          <DomainCardEditor value={props.card} onChange={(next) => change(replace(props.card, { ...next, placement: props.card.placement }))} />
        </EditDetails>
      </Show>
    </DomainCardCard>
  )
}

export function CardsSection() {
  const { character, change } = useCharacterSession()
  const mode = useMode()
  const [choosing, setChoosing] = createSignal(false)
  const [allLevels, setAllLevels] = createSignal(false)
  const domains = () => [...new Set(character().classes.flatMap((progress) => progress.domains))]
  const available = () =>
    srd.domainCards.entries.filter(
      (card) =>
        (allLevels() || (domains().includes(card.domain) && card.level <= character().level)) &&
        !character().domainCards.some(({ name }) => name === card.name),
    )
  const placed = (placement: CardPlacement) =>
    character()
      .domainCards.map((card, index) => ({ card, index }))
      .filter(({ card }) => card.placement === placement)

  return (
    <>
      <Show when={mode() === 'play'}>
        <p class="meta">
          At the start of a rest you can move cards freely. Otherwise, mark Stress equal to a vault card’s Recall Cost to move it
          into your loadout.
        </p>
      </Show>
      <For each={['loadout', 'vault'] as const}>
        {(placement) => (
          <Section
            heading={placement === 'loadout' ? `Loadout (${placed('loadout').length}/${loadoutLimit})` : 'Vault'}
            actions={
              <Show when={mode() === 'edit' && placement === 'loadout'}>
                <button type="button" onClick={() => setChoosing(true)}>
                  Add domain card
                </button>
                <button
                  type="button"
                  onClick={() => change(addDomainCard(blankDomainCard(domains()[0] ?? srd.domains.entries[0].name)))}
                >
                  Add custom
                </button>
              </Show>
            }
          >
            <Show when={placed(placement).length} fallback={<p class="meta">No cards.</p>}>
              <List>
                <For each={placed(placement)}>
                  {({ card, index }) => (
                    <li>
                      <OwnedCard card={card} index={index} />
                    </li>
                  )}
                </For>
              </List>
            </Show>
          </Section>
        )}
      </For>
      <PickerDialog
        open={choosing()}
        onClose={() => setChoosing(false)}
        heading="Add a domain card"
        entries={available()}
        filters={
          <label class="checkbox">
            <input type="checkbox" checked={allLevels()} onChange={(event) => setAllLevels(event.currentTarget.checked)} />
            Show every domain and level
          </label>
        }
      >
        {(card) => (
          <DomainCardCard
            card={card}
            actions={
              <button
                type="button"
                onClick={() => {
                  change(addDomainCard(card))
                  setChoosing(false)
                }}
              >
                Add
              </button>
            }
          />
        )}
      </PickerDialog>
    </>
  )
}
