import { For, splitProps } from 'solid-js'
import { Tags } from './layout'

type Props = {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  value: string
  suggestions: readonly string[]
  onChange: (value: string) => void
}

const separator = ', '

export function SuggestionInput(props: Props) {
  const [own, input] = splitProps(props, ['value', 'suggestions', 'onChange'])
  const chosen = () => own.value.split(separator).filter(Boolean)
  const toggle = (suggestion: string) =>
    own.onChange(
      (chosen().includes(suggestion) ? chosen().filter((value) => value !== suggestion) : [...chosen(), suggestion]).join(
        separator,
      ),
    )

  return (
    <>
      <input {...input} value={own.value} onChange={(event) => own.onChange(event.currentTarget.value.trim())} />
      <Tags aria-label="Suggestions">
        <For each={own.suggestions}>
          {(suggestion) => (
            <li>
              <button type="button" class="toggle chip" aria-pressed={chosen().includes(suggestion)} onClick={() => toggle(suggestion)}>
                {suggestion}
              </button>
            </li>
          )}
        </For>
      </Tags>
    </>
  )
}
