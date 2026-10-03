import { For, Show } from 'solid-js'
import { replace } from '../../character/changes'
import { fieldsOfKind } from '../../character/fields'
import { useMode } from '../../character/mode'
import { useCharacterSession } from '../../character/session'
import { CompanionEditor } from '../../content/CompanionEditor'
import { CompanionView } from '../../content/CompanionView'
import { TrackControl } from '../TrackControl'

export const hasCompanion = (root: unknown) => fieldsOfKind(root, 'companion').length > 0

export function CompanionSection() {
  const { character, change } = useCharacterSession()
  const mode = useMode()

  return (
    <For each={fieldsOfKind(character(), 'companion')}>
      {(field) => {
        const update = (value: typeof field.value) => change(replace(field, { ...field, value }))
        return (
          <Show when={mode() === 'edit'} fallback={
            <>
              <CompanionView companion={field.value} />
              <TrackControl label="Companion Stress" track={field.value.stress} onChange={(stress) => update({ ...field.value, stress })} />
            </>
          }>
            <CompanionEditor companion={field.value} onChange={update} />
          </Show>
        )
      }}
    </For>
  )
}
