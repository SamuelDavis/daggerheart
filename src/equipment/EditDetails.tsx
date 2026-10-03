import type { JSX } from 'solid-js'
import './equipment.css'

export function EditDetails(props: { open?: boolean; children: JSX.Element }) {
  return (
    <details class="edit-details" open={props.open}>
      <summary>Edit details</summary>
      <div class="stack">{props.children}</div>
    </details>
  )
}
