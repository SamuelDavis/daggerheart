import { For, Show } from 'solid-js'
import { removeAt, replaceAt } from '../lib/immutable'
import type { Prompt } from '../types/app'
import { TextField } from '../ui/fields'
import { Field, Fieldset } from '../ui/form'
import { List } from '../ui/layout'
import { SuggestionInput } from '../ui/SuggestionInput'
import { Suggestions } from '../ui/Suggestions'

export function PromptListEditor(props: {
  legend: string
  promptLabel: string
  prompts: readonly Prompt[]
  onChange: (prompts: readonly Prompt[]) => void
  suggestedPrompts?: readonly string[]
  responseSuggestions?: (prompt: string) => readonly string[] | undefined
}) {
  const update = (index: number, prompt: Prompt) => props.onChange(replaceAt(props.prompts, index, prompt))
  const add = (prompt: string) => props.onChange([...props.prompts, { prompt, response: '' }])
  const unused = () => (props.suggestedPrompts ?? []).filter((prompt) => !props.prompts.some((entry) => entry.prompt === prompt))

  return (
    <Fieldset legend={props.legend}>
      <List>
        <For each={props.prompts}>
          {(entry, index) => (
            <li class="stack">
              <TextField label={props.promptLabel} value={entry.prompt} onChange={(prompt) => update(index(), { ...entry, prompt })} />
              <Show
                when={props.responseSuggestions?.(entry.prompt)}
                fallback={
                  <TextField label="Answer" multiline value={entry.response} onChange={(response) => update(index(), { ...entry, response })} />
                }
              >
                {(suggestions) => (
                  <Field label="Answer">
                    {(control) => (
                      <SuggestionInput
                        {...control}
                        value={entry.response}
                        suggestions={suggestions()}
                        onChange={(response) => update(index(), { ...entry, response })}
                      />
                    )}
                  </Field>
                )}
              </Show>
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
        <button type="button" onClick={() => add('')}>
          Add your own
        </button>
      </div>
      <Suggestions label="Suggestions" options={unused()} onPick={add} />
    </Fieldset>
  )
}
