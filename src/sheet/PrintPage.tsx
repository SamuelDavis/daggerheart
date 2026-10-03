import { A } from '@solidjs/router'
import { paths, useCharacterName } from '../app/paths'
import { LoadCharacter } from '../character/LoadCharacter'
import { ModeContext } from '../character/mode'
import { useCharacterSession } from '../character/session'
import { describeCharacter } from '../character/summary'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Page } from '../ui/layout'
import { Sheet } from './Sheet'

function PrintView() {
  const { character } = useCharacterSession()
  return (
    <ModeContext.Provider value={() => 'print'}>
      <Page
        heading={character().name}
        class="print-page"
        actions={
          <>
            <button type="button" onClick={() => window.print()}>
              Print
            </button>
            <A href={paths.character(character().name)} class="button">
              Back to sheet
            </A>
          </>
        }
      >
        <p>
          {describeCharacter(character())}
          {character().pronouns ? ` · ${character().pronouns}` : ''}
        </p>
        <Sheet />
      </Page>
    </ModeContext.Provider>
  )
}

export function PrintPage() {
  const name = useCharacterName()
  return (
    <LoadCharacter name={name()} fallback={<NotFoundPage />}>
      <PrintView />
    </LoadCharacter>
  )
}
