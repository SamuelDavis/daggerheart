import { A, useNavigate } from '@solidjs/router'
import { createSignal, type JSX } from 'solid-js'
import { paths } from '../app/paths'
import { KeyTaken } from '../lib/database'
import { Field } from '../ui/form'
import { useCharacterSession } from './session'

export function NameField(props: { pathFor: (name: string) => string }) {
  const { character, rename } = useCharacterSession()
  const navigate = useNavigate()
  const [error, setError] = createSignal<JSX.Element>()

  const submit = async (input: HTMLInputElement) => {
    const name = input.value.trim()
    setError()
    if (name === character().name) return
    if (!name) {
      setError('A name is required.')
      return
    }
    try {
      await rename(name)
      navigate(props.pathFor(name), { replace: true })
    } catch (failure) {
      if (!(failure instanceof KeyTaken)) throw failure
      setError(
        <>
          <A href={paths.character(failure.key)}>{failure.key}</A> already exists. Rename or delete that character
          first.
        </>,
      )
    }
  }

  return (
    <Field label="Name" error={error()}>
      {(control) => (
        <input {...control} value={character().name} autocomplete="off" onChange={(event) => submit(event.currentTarget)} />
      )}
    </Field>
  )
}
