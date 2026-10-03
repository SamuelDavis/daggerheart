import { createUniqueId, Show, splitProps, type JSX } from 'solid-js'
import { classes } from './classes'
import './form.css'

type ControlProps = {
  id: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

export function Field(props: {
  label: JSX.Element
  description?: JSX.Element
  error?: JSX.Element
  children: (control: ControlProps) => JSX.Element
}) {
  const id = createUniqueId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const describedBy = () =>
    [props.description && descriptionId, props.error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div class="field stack">
      <label for={id}>{props.label}</label>
      <Show when={props.description}>
        <small id={descriptionId}>{props.description}</small>
      </Show>
      {props.children({
        id,
        get 'aria-describedby'() {
          return describedBy()
        },
        get 'aria-invalid'() {
          return Boolean(props.error)
        },
      })}
      <Show when={props.error}>
        <small id={errorId} role="alert">
          {props.error}
        </small>
      </Show>
    </div>
  )
}

export function Fieldset(props: JSX.FieldsetHTMLAttributes<HTMLFieldSetElement> & { legend: JSX.Element }) {
  const [own, rest] = splitProps(props, ['legend', 'children', 'class'])
  return (
    <fieldset {...rest} class={classes('stack', own.class)}>
      <legend>{own.legend}</legend>
      {own.children}
    </fieldset>
  )
}
