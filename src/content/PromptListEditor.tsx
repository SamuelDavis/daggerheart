import { For } from 'solid-js'
import { removeAt, replaceAt } from '../lib/immutable'
import type { Prompt } from '../types/app'
import { TextField } from '../ui/fields'
import { Fieldset } from '../ui/form'
import { List } from '../ui/layout'

export function PromptListEditor(props: {
  legend: string
  promptLabel: string
  prompts: readonly Prompt[]
  onChange: (prompts: readonly Prompt[]) => void
}) {
  const update = (index: number, prompt: Prompt) => props.onChange(replaceAt(props.prompts, index, prompt))

  return (
    <Fieldset legend={props.legend}>
      <List>
        <For each={props.prompts}>
          {(entry, index) => (
            <li class="stack">
              <TextField label={props.promptLabel} value={entry.prompt} onChange={(prompt) => update(index(), { ...entry, prompt })} />
              <TextField label="Answer" multiline value={entry.response} onChange={(response) => update(index(), { ...entry, response })} />
              <div>
                <button type="button" onClick={() => props.onChange(removeAt(props.prompts, index()))}>
                  Remove
                </button>
              </div>
            </li>
          )}
        </For>
      </List>
      <div>
        <button type="button" onClick={() => props.onChange([...props.prompts, { prompt: '', response: '' }])}>
          Add
        </button>
      </div>
    </Fieldset>
  )
}
