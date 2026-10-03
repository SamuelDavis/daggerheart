import { createEffect, type JSX } from 'solid-js'
import { Section } from './layout'
import './controls.css'

export function Dialog(props: { open: boolean; onClose: () => void; heading: JSX.Element; children: JSX.Element }) {
  let dialog!: HTMLDialogElement

  createEffect(() => {
    if (props.open && !dialog.open) dialog.showModal()
    if (!props.open && dialog.open) dialog.close()
  })

  return (
    <dialog ref={dialog} class="dialog" onClose={() => props.onClose()}>
      <Section
        heading={props.heading}
        actions={
          <button type="button" onClick={() => props.onClose()}>
            Close
          </button>
        }
      >
        {props.children}
      </Section>
    </dialog>
  )
}
