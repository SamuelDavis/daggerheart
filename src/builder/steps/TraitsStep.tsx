import { For, Show } from 'solid-js'
import { assignTraits, setTrait } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { formatModifier } from '../../content/format'
import { creationGuidance, traitModifiers } from '../../data/srd/characterCreation'
import { srd } from '../../data/srd'
import { findByName } from '../../data/srd/lookup'
import { traits } from '../../data/srd/traits'
import { Field } from '../../ui/form'
import { List, Section, Tags } from '../../ui/layout'
import { NumberInput } from '../../ui/NumberInput'
import { Guidance } from '../Guidance'

const unassigned = (values: readonly number[]) =>
  values.reduce<number[]>((remaining, value) => {
    const index = remaining.indexOf(value)
    return index === -1 ? remaining : remaining.toSpliced(index, 1)
  }, [...traitModifiers])

export function TraitsStep() {
  const { character, change } = useCharacterSession()
  const guide = () => findByName(srd.guides.entries, character().classes[0]?.name)
  const remaining = () => unassigned(Object.values(character().traits).map(({ value }) => value))

  return (
    <>
      <Guidance text={creationGuidance.traits} />
      <Section
        heading="Assign modifiers"
        actions={
          <Show when={guide()}>
            {(classGuide) => (
              <button type="button" onClick={() => change(assignTraits(classGuide().suggestedTraits))}>
                Use the {classGuide().name} suggestion
              </button>
            )}
          </Show>
        }
      >
        <Show when={remaining().length} fallback={<p>All six starting modifiers are assigned.</p>}>
          <p id="unassigned">Still to assign:</p>
          <Tags aria-labelledby="unassigned">
            <For each={remaining()}>{(value) => <li class="tag">{formatModifier(value)}</li>}</For>
          </Tags>
        </Show>
        <List>
          <For each={traits}>
            {(trait) => (
              <li>
                <Field label={trait.name} description={`${trait.verbs.join(', ')}. ${trait.description}`}>
                  {(control) => (
                    <NumberInput
                      {...control}
                      label={trait.name}
                      value={character().traits[trait.name].value}
                      onChange={(value) => change(setTrait(trait.name, value))}
                    />
                  )}
                </Field>
              </li>
            )}
          </For>
        </List>
      </Section>
    </>
  )
}
