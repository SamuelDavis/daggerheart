import { A, useNavigate } from '@solidjs/router'
import { createSignal, Show } from 'solid-js'
import { paths, useCharacterName } from '../app/paths'
import { LoadCharacter } from '../character/LoadCharacter'
import { ModeContext, type Mode } from '../character/mode'
import { NameField } from '../character/NameField'
import { characterRepository } from '../character/repository'
import { useCharacterSession } from '../character/session'
import { describeCharacter } from '../character/summary'
import { downloadCharacter } from '../character/transfer'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Page } from '../ui/layout'
import { notify } from '../ui/toasts'
import { ToggleButton } from '../ui/ToggleButton'
import { Sheet } from './Sheet'

function SheetView() {
  const { character, undo, redo, canUndo, canRedo } = useCharacterSession()
  const navigate = useNavigate()
  const [mode, setMode] = createSignal<Mode>('play')

  const remove = async () => {
    const removed = character()
    await characterRepository.remove(removed.name)
    navigate(paths.characters)
    notify({
      message: `Deleted ${removed.name}`,
      action: {
        label: 'Undo',
        run: async () => {
          await characterRepository.import(removed)
          navigate(paths.character(removed.name))
        },
      },
    })
  }

  return (
    <ModeContext.Provider value={mode}>
      <Page
        heading={character().name}
        actions={
          <>
            <ToggleButton pressed={mode() === 'edit'} onClick={() => setMode(mode() === 'edit' ? 'play' : 'edit')}>
              Edit
            </ToggleButton>
            <button type="button" onClick={undo} disabled={!canUndo()}>
              Undo
            </button>
            <button type="button" onClick={redo} disabled={!canRedo()}>
              Redo
            </button>
            <A href={paths.levelUp(character().name)} class="button">
              Level up
            </A>
            <A href={paths.build(character().name)} class="button">
              Builder
            </A>
            <A href={paths.print(character().name)} class="button">
              Print
            </A>
            <button type="button" onClick={() => downloadCharacter(character())}>
              Export JSON
            </button>
            <Show when={mode() === 'edit'}>
              <button type="button" onClick={remove}>
                Delete
              </button>
            </Show>
          </>
        }
      >
        <p>
          {describeCharacter(character())}
          {character().pronouns ? ` · ${character().pronouns}` : ''}
        </p>
        <Show when={mode() === 'edit'}>
          <NameField pathFor={paths.character} />
        </Show>
        <Sheet />
      </Page>
    </ModeContext.Provider>
  )
}

export function SheetPage() {
  const name = useCharacterName()
  return (
    <LoadCharacter name={name()} fallback={<NotFoundPage />}>
      <SheetView />
    </LoadCharacter>
  )
}
