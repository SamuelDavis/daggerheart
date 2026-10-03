import { createSignal, For, Show } from 'solid-js'
import { chooseAncestry, mixAncestries, modify, replace } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { HeritageCard } from '../../content/ContentCards'
import { FeatureView } from '../../content/FeatureView'
import { RichText } from '../../content/RichText'
import { creationGuidance } from '../../data/srd/characterCreation'
import { srd } from '../../data/srd'
import { findByName } from '../../data/srd/lookup'
import type { Ancestry, Feature } from '../../types/srd'
import { Field } from '../../ui/form'
import { List, Section } from '../../ui/layout'
import { ToggleButton } from '../../ui/ToggleButton'
import { Chooser } from '../Chooser'
import { Guidance } from '../Guidance'

function AncestrySelect(props: { label: string; value?: string; onChange: (ancestry: Ancestry) => void }) {
  return (
    <Field label={props.label}>
      {(control) => (
        <select
          {...control}
          value={props.value ?? ''}
          onChange={(event) => {
            const ancestry = findByName(srd.ancestries.entries, event.currentTarget.value)
            if (ancestry) props.onChange(ancestry)
          }}
        >
          <option value="" disabled>
            Choose an ancestry
          </option>
          <For each={srd.ancestries.entries}>
            {(ancestry) => <option value={ancestry.name}>{`${ancestry.name}: ${ancestry.features.map(({ name }) => name).join(' / ')}`}</option>}
          </For>
        </select>
      )}
    </Field>
  )
}

const providing = (feature: Feature | undefined, position: number) =>
  srd.ancestries.entries.find((ancestry) => ancestry.features[position]?.name === feature?.name)

function MixedAncestry(props: { current?: Ancestry; onMix: (first: Ancestry, second: Ancestry) => void }) {
  const [first, setFirst] = createSignal(providing(props.current?.features[0], 0))
  const [second, setSecond] = createSignal(providing(props.current?.features[1], 1))
  const mix = () => {
    const [top, bottom] = [first(), second()]
    if (top && bottom) props.onMix(top, bottom)
  }

  return (
    <div class="stack">
      <RichText text={creationGuidance.mixedAncestry} />
      <AncestrySelect label="First feature from" value={first()?.name} onChange={(ancestry) => {
          setFirst(ancestry)
          mix()
        }} />
      <AncestrySelect label="Second feature from" value={second()?.name} onChange={(ancestry) => {
          setSecond(ancestry)
          mix()
        }} />
    </div>
  )
}

export function HeritageStep() {
  const { character, change } = useCharacterSession()
  const heritage = () => character().heritage
  const [mixed, setMixed] = createSignal(
    Boolean(heritage().ancestry && !findByName(srd.ancestries.entries, heritage().ancestry?.name)),
  )
  const editField = (field: object, next: object) => change(replace(field, next))
  const mixedToggle = () => (
    <ToggleButton pressed={mixed()} onClick={() => setMixed(!mixed())}>
      Mixed ancestry
    </ToggleButton>
  )
  const chosen = () => [heritage().ancestry, heritage().community, heritage().transformation].filter((option) => !!option)

  return (
    <>
      <Guidance text={creationGuidance.heritage} />
      <Show
        when={mixed()}
        fallback={
          <Chooser
            id="choose-ancestry"
            heading="Ancestry"
            options={srd.ancestries.entries}
            selected={heritage().ancestry?.name}
            onSelect={(ancestry) => change(chooseAncestry(ancestry))}
            card={(ancestry, actions) => <HeritageCard option={ancestry} actions={actions} />}
            actions={mixedToggle()}
          />
        }
      >
        <Section heading="Ancestry" actions={mixedToggle()}>
          <MixedAncestry current={heritage().ancestry} onMix={(first, second) => change(mixAncestries(first, second))} />
        </Section>
      </Show>
      <Chooser
        id="choose-community"
        heading="Community"
        options={srd.communities.entries}
        selected={heritage().community?.name}
        onSelect={(community) => change(modify('heritage', (current) => ({ ...current, community })))}
        card={(community, actions) => <HeritageCard option={community} actions={actions} />}
      />
      <details class="guidance" open={Boolean(heritage().transformation)}>
        <summary>Transformation (optional, with your GM’s approval)</summary>
        <div class="stack">
          <RichText text={creationGuidance.transformation} />
          <Chooser
            id="choose-transformation"
            heading="Transformation"
            options={srd.transformations.entries}
            selected={heritage().transformation?.name}
            onSelect={(transformation) => change(modify('heritage', (current) => ({ ...current, transformation })))}
            card={(transformation, actions) => <HeritageCard option={transformation} actions={actions} />}
            actions={
              <Show when={heritage().transformation}>
                <button
                  type="button"
                  onClick={() => change(modify('heritage', (current) => ({ ...current, transformation: undefined })))}
                >
                  Remove
                </button>
              </Show>
            }
          />
        </div>
      </details>
      <Show when={chosen().length}>
        <Section heading="Your heritage features">
          <List>
            <For each={chosen()}>
              {(option) => (
                <For each={option.features}>
                  {(feature) => (
                    <li>
                      <FeatureView feature={feature} label={option.name} onFieldChange={editField} setup />
                    </li>
                  )}
                </For>
              )}
            </For>
          </List>
        </Section>
      </Show>
    </>
  )
}
