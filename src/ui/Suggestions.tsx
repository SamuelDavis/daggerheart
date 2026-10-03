import { createUniqueId, For, Show } from 'solid-js'
import { Tags } from './layout'
import './controls.css'

export function Suggestions(props: { label: string; options: readonly string[]; onPick: (option: string) => void }) {
  const id = createUniqueId()
  return (
    <Show when={props.options.length}>
      <div class="suggestions stack">
        <p id={id} class="meta">
          {props.label}
        </p>
        <Tags aria-labelledby={id}>
          <For each={props.options}>
            {(option) => (
              <li>
                <button type="button" class="chip" onClick={() => props.onPick(option)}>
                  + {option}
                </button>
              </li>
            )}
          </For>
        </Tags>
      </div>
    </Show>
  )
}
