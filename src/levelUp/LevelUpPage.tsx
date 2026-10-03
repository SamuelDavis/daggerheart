import { A } from '@solidjs/router'
import { paths, useCharacterName } from '../app/paths'
import { LoadCharacter } from '../character/LoadCharacter'
import { isLevelComplete, levelUpAt } from '../character/levelUp'
import { ModeContext } from '../character/mode'
import { useCharacterSession } from '../character/session'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Page } from '../ui/layout'
import { LevelUpFlow } from './LevelUpFlow'

function LevelUpView() {
  const { character } = useCharacterSession()
  const current = () => character().level
  const level = () =>
    levelUpAt(character(), current()) && !isLevelComplete(character(), current(), true) ? current() : current() + 1

  return (
    <ModeContext.Provider value={() => 'edit'}>
      <Page
        heading={`Level up to ${level()}`}
        actions={
          <A href={paths.character(character().name)} class="button">
            Back to sheet
          </A>
        }
      >
        <p>
          {character().name} is level {current()}. Every change here is applied to the sheet immediately and can be undone.
        </p>
        <LevelUpFlow level={level()} includeThresholds />
      </Page>
    </ModeContext.Provider>
  )
}

export function LevelUpPage() {
  const name = useCharacterName()
  return (
    <LoadCharacter name={name()} fallback={<NotFoundPage />}>
      <LevelUpView />
    </LoadCharacter>
  )
}
