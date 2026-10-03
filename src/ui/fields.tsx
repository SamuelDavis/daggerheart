import { For, Show, type JSX } from 'solid-js'
import { Field } from './form'
import { NumberInput } from './NumberInput'

type Common = { label: string; description?: JSX.Element }

export function TextField(props: Common & { value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return (
    <Field label={props.label} description={props.description}>
      {(control) => (
        <Show
          when={props.multiline}
          fallback={<input {...control} value={props.value} onChange={(event) => props.onChange(event.currentTarget.value)} />}
        >
          <textarea {...control} value={props.value} onChange={(event) => props.onChange(event.currentTarget.value)} />
        </Show>
      )}
    </Field>
  )
}

export function NumberField(
  props: Common & { value: number; onChange: (value: number) => void; min?: number; max?: number },
) {
  return (
    <Field label={props.label} description={props.description}>
      {(control) => (
        <NumberInput
          {...control}
          label={props.label}
          value={props.value}
          min={props.min}
          max={props.max}
          onChange={props.onChange}
        />
      )}
    </Field>
  )
}

export function SelectField<Option extends string>(
  props: Common & { value: Option; options: readonly Option[]; onChange: (value: Option) => void; format?: (option: Option) => string },
) {
  return (
    <Field label={props.label} description={props.description}>
      {(control) => (
        <select
          {...control}
          value={props.value}
          onChange={(event) => {
            const chosen = props.options.find((option) => option === event.currentTarget.value)
            if (chosen !== undefined) props.onChange(chosen)
          }}
        >
          <For each={props.options}>{(option) => <option value={option}>{props.format?.(option) ?? option}</option>}</For>
        </select>
      )}
    </Field>
  )
}
