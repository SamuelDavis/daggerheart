import { For } from 'solid-js'
import { startingValues } from '../data/srd/characterCreation'
import { removeAt, replaceAt } from '../lib/immutable'
import type { Experience } from '../types/srd'
import { Field, Fieldset } from '../ui/form'
import { List } from '../ui/layout'
import { NumberInput } from '../ui/NumberInput'
import './editors.css'

export function ExperienceEditor(props: {
  legend: string
  experiences: readonly Experience[]
  onChange: (experiences: readonly Experience[]) => void
}) {
  const update = (index: number, experience: Experience) => props.onChange(replaceAt(props.experiences, index, experience))

  return (
    <Fieldset legend={props.legend}>
      <List>
        <For each={props.experiences}>
          {(experience, index) => (
            <li class="row">
              <Field label="Experience">
                {(control) => (
                  <input
                    {...control}
                    value={experience.name}
                    onChange={(event) => update(index(), { ...experience, name: event.currentTarget.value })}
                  />
                )}
              </Field>
              <Field label="Modifier">
                {(control) => (
                  <NumberInput
                    {...control}
                    label={`${experience.name || 'Experience'} modifier`}
                    value={experience.modifier}
                    onChange={(modifier) => update(index(), { ...experience, modifier })}
                  />
                )}
              </Field>
              <button type="button" onClick={() => props.onChange(removeAt(props.experiences, index()))}>
                Remove
              </button>
            </li>
          )}
        </For>
      </List>
      <div>
        <button
          type="button"
          onClick={() => props.onChange([...props.experiences, { name: '', modifier: startingValues.experienceModifier }])}
        >
          Add Experience
        </button>
      </div>
    </Fieldset>
  )
}
