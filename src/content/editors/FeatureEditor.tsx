import { For } from 'solid-js'
import { removeAt, replaceAt } from '../../lib/immutable'
import type { Feature } from '../../types/srd'
import { TextField } from '../../ui/fields'
import { Fieldset } from '../../ui/form'
import { List } from '../../ui/layout'
import { named } from './shared'

export function FeatureEditor(props: { feature: Feature; onChange: (feature: Feature) => void }) {
  return (
    <>
      <TextField
        label="Name"
        value={props.feature.name}
        onChange={(name) => props.onChange({ ...props.feature, name: named(name, props.feature.name) })}
      />
      <TextField
        label="Text"
        multiline
        description="Start a line with “• ” for a bullet."
        value={props.feature.text}
        onChange={(text) => props.onChange({ ...props.feature, text })}
      />
    </>
  )
}

export const blankFeature = (): Feature => ({ name: 'New feature', text: '' })

export function FeatureListEditor(props: { features: readonly Feature[]; onChange: (features: readonly Feature[]) => void }) {
  return (
    <Fieldset legend="Features">
      <List>
        <For each={props.features}>
          {(feature, index) => (
            <li class="stack">
              <FeatureEditor feature={feature} onChange={(next) => props.onChange(replaceAt(props.features, index(), next))} />
              <div>
                <button type="button" onClick={() => props.onChange(removeAt(props.features, index()))}>
                  Remove feature
                </button>
              </div>
            </li>
          )}
        </For>
      </List>
      <div>
        <button type="button" onClick={() => props.onChange([...props.features, blankFeature()])}>
          Add feature
        </button>
      </div>
    </Fieldset>
  )
}
