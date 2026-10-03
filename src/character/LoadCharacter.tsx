import { createResource, Show, type JSX } from 'solid-js'
import { characterRepository } from './repository'
import { CharacterSession } from './session'

export function LoadCharacter(props: { name: string; fallback: JSX.Element; children: JSX.Element }) {
  const [character] = createResource(() => props.name, characterRepository.load)

  return (
    <Show when={!character.loading}>
      <Show when={character()} keyed fallback={props.fallback}>
        {(loaded) => <CharacterSession character={loaded}>{props.children}</CharacterSession>}
      </Show>
    </Show>
  )
}
