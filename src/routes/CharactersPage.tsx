import { A, useNavigate } from '@solidjs/router'
import { createResource, createSignal, For, Show, type JSX } from 'solid-js'
import { paths } from '../app/paths'
import { characterRepository } from '../character/repository'
import { describeCharacter } from '../character/summary'
import { parseCharacter } from '../character/transfer'
import { KeyTaken } from '../lib/database'
import { Card, Grid, Page } from '../ui/layout'

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)

export function CharactersPage() {
  const navigate = useNavigate()
  const [characters] = createResource(() => characterRepository.list().then((list) => list.toSorted(byName)))
  const [error, setError] = createSignal<JSX.Element>()
  const describe = (failure: unknown) => (failure instanceof Error ? failure.message : String(failure))

  const create = async () => {
    setError()
    try {
      navigate(paths.build((await characterRepository.create()).name))
    } catch (failure) {
      setError(describe(failure))
    }
  }

  const importFile = async (input: HTMLInputElement) => {
    const file = input.files?.[0]
    input.value = ''
    if (!file) return
    setError()
    try {
      const character = parseCharacter(await file.text())
      await characterRepository.import(character)
      navigate(paths.character(character.name))
    } catch (failure) {
      setError(
        failure instanceof KeyTaken ? (
          <>
            <A href={paths.character(failure.key)}>{failure.key}</A> already exists. Rename or delete that character, then
            import again.
          </>
        ) : (
          describe(failure)
        ),
      )
    }
  }

  return (
    <Page
      heading="Characters"
      actions={
        <>
          <button type="button" onClick={create}>
            New character
          </button>
          <label class="button">
            Import JSON
            <input
              type="file"
              accept="application/json,.json"
              class="visually-hidden"
              onChange={(event) => importFile(event.currentTarget)}
            />
          </label>
        </>
      }
    >
      <Show when={error()}>
        <p role="alert">{error()}</p>
      </Show>
      <Show when={characters()?.length} fallback={<p>No characters yet.</p>}>
        <Grid>
          <For each={characters()}>
            {(character) => (
              <li>
                <Card heading={<A href={paths.character(character.name)}>{character.name}</A>}>
                  <p>{describeCharacter(character)}</p>
                </Card>
              </li>
            )}
          </For>
        </Grid>
      </Show>
    </Page>
  )
}
