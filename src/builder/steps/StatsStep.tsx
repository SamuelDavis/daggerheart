import { For, Show } from 'solid-js'
import { assign, modify } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { FeatureView } from '../../content/FeatureView'
import { creationGuidance } from '../../data/srd/characterCreation'
import { srd } from '../../data/srd'
import { findByName } from '../../data/srd/lookup'
import type { Character } from '../../types/app'
import type { Feature } from '../../types/srd'
import { Field } from '../../ui/form'
import { List, Section } from '../../ui/layout'
import { NumberInput } from '../../ui/NumberInput'
import { Guidance } from '../Guidance'

const adjustsStartingNumbers = /at character creation|permanent|additional (Hit Point|Stress) slot/i

const featuresOf = (character: Character): Feature[] => [
  ...character.classes.flatMap((progress) => [...progress.features, ...(progress.subclass?.foundation ?? [])]),
  ...[character.heritage.ancestry, character.heritage.community, character.heritage.transformation].flatMap(
    (option) => option?.features ?? [],
  ),
]

export function StatsStep() {
  const { character, change } = useCharacterSession()
  const definition = () => findByName(srd.classes.entries, character().classes[0]?.name)
  const relevant = () => featuresOf(character()).filter(({ text }) => adjustsStartingNumbers.test(text))

  return (
    <>
      <Guidance text={creationGuidance.stats} />
      <Section heading="Starting numbers">
        <Field label="Level">
          {(control) => (
            <NumberInput {...control} label="Level" value={character().level} min={1} onChange={(level) => change(assign('level', level))} />
          )}
        </Field>
        <Field label="Evasion" description={definition() ? `${definition()?.name}s start at ${definition()?.startingEvasion}.` : undefined}>
          {(control) => (
            <NumberInput {...control} label="Evasion" value={character().evasion} min={0} onChange={(evasion) => change(assign('evasion', evasion))} />
          )}
        </Field>
        <Field
          label="Hit Point slots"
          description={definition() ? `${definition()?.name}s start with ${definition()?.startingHitPoints}.` : undefined}
        >
          {(control) => (
            <NumberInput
              {...control}
              label="Hit Point slots"
              value={character().hitPoints.max}
              min={0}
              onChange={(max) => change(modify('hitPoints', (track) => ({ ...track, max })))}
            />
          )}
        </Field>
        <Field label="Stress slots" description="Every PC starts with 6.">
          {(control) => (
            <NumberInput
              {...control}
              label="Stress slots"
              value={character().stress.max}
              min={0}
              onChange={(max) => change(modify('stress', (track) => ({ ...track, max })))}
            />
          )}
        </Field>
        <Field label="Hope" description="Each PC starts with 2.">
          {(control) => (
            <NumberInput
              {...control}
              label="Hope"
              value={character().hope.marked}
              min={0}
              max={character().hope.max}
              onChange={(marked) => change(modify('hope', (track) => ({ ...track, marked })))}
            />
          )}
        </Field>
        <Field label="Proficiency" description="Proficiency is 1 at level 1.">
          {(control) => (
            <NumberInput
              {...control}
              label="Proficiency"
              value={character().proficiency}
              min={0}
              onChange={(proficiency) => change(assign('proficiency', proficiency))}
            />
          )}
        </Field>
      </Section>
      <Show when={relevant().length}>
        <Section heading="Features that may change these numbers">
          <p>Apply any of these that affect your starting numbers.</p>
          <List>
            <For each={relevant()}>
              {(feature) => (
                <li>
                  <FeatureView feature={feature} />
                </li>
              )}
            </For>
          </List>
        </Section>
      </Show>
    </>
  )
}
