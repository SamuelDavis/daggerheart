import { For, Show } from 'solid-js'
import { useMode } from '../character/mode'
import type { Feature, SheetField } from '../types/srd'
import { Section } from '../ui/layout'
import { FeatureEditor } from './editors/FeatureEditor'
import { FieldValues } from './FieldValues'
import { RichText } from './RichText'
import { SheetFieldControl } from './SheetFieldControl'

export type FieldEditor = (field: SheetField, next: SheetField) => void

export function FeatureView(props: {
  feature: Feature
  label?: string
  onFieldChange?: FieldEditor
  onChange?: (feature: Feature) => void
  setup?: boolean
}) {
  const mode = useMode()
  const fields = () => (props.feature.fields ?? []).filter((field) => !(props.setup && field.play))
  return (
    <Section
      class="feature"
      heading={
        <>
          {props.feature.name}
          <Show when={props.label}>
            {' '}
            <small>{props.label}</small>
          </Show>
        </>
      }
    >
      <Show when={mode() === 'edit' && props.onChange} fallback={<RichText text={props.feature.text} />}>
        {(onChange) => <FeatureEditor feature={props.feature} onChange={onChange()} />}
      </Show>
      <Show when={mode() === 'print' && props.feature.fields}>{(fields) => <FieldValues fields={fields()} />}</Show>
      <Show when={mode() !== 'print' && props.onFieldChange}>
        {(onFieldChange) => (
          <For each={fields()}>
            {(field) => (
              <SheetFieldControl field={field} setup={props.setup} onChange={(next) => onFieldChange()(field, next)} />
            )}
          </For>
        )}
      </Show>
    </Section>
  )
}
