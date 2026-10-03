import { For, Show } from 'solid-js'
import type { SheetField } from '../types/srd'
import { DescriptionList } from '../ui/layout'
import { CompanionView } from './CompanionView'
import { BeastformCard } from './ContentCards'
import { describeField } from './describeField'
import { RichText } from './RichText'

export function FieldValues(props: { fields: readonly SheetField[] }) {
  const listed = () => props.fields.filter(({ kind }) => kind !== 'companion')
  const beastforms = () => props.fields.flatMap((field) => (field.kind === 'beastform' && field.value ? [field.value] : []))
  const picks = () => props.fields.flatMap((field) => (field.kind === 'pick' ? field.value : []))
  const companions = () => props.fields.flatMap((field) => (field.kind === 'companion' ? [field.value] : []))

  return (
    <>
      <Show when={listed().length}>
        <DescriptionList>
          <For each={listed()}>
            {(field) => (
              <>
                <dt>{field.name}</dt>
                <dd>{describeField(field)}</dd>
              </>
            )}
          </For>
        </DescriptionList>
      </Show>
      <For each={picks()}>{(picked) => <RichText text={`${picked.name}: ${picked.text}`} />}</For>
      <For each={beastforms()}>{(beastform) => <BeastformCard beastform={beastform} />}</For>
      <For each={companions()}>{(companion) => <CompanionView companion={companion} />}</For>
    </>
  )
}
