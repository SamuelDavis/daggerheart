import type { JSX } from 'solid-js'

export function ToggleButton(props: { pressed: boolean; onClick: () => void; children: JSX.Element; label?: string }) {
  return (
    <button type="button" class="toggle" aria-pressed={props.pressed} aria-label={props.label} onClick={() => props.onClick()}>
      {props.children}
    </button>
  )
}
