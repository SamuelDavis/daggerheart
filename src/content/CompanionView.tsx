import { For, Show } from 'solid-js'
import type { Companion } from '../types/srd'
import { DescriptionList, Section } from '../ui/layout'
import { formatModifier } from './format'

export function CompanionView(props: { companion: Companion }) {
  return (
    <Section heading={props.companion.name || 'Companion'}>
      <DescriptionList>
        <Show when={props.companion.species}>
          <dt>Animal</dt>
          <dd>{props.companion.species}</dd>
        </Show>
        <dt>Evasion</dt>
        <dd>{props.companion.evasion}</dd>
        <dt>Attack</dt>
        <dd>
          {[props.companion.attack.description, props.companion.attack.range, props.companion.attack.die, props.companion.attack.damageType]
            .filter(Boolean)
            .join(' · ')}
        </dd>
        <dt>Stress</dt>
        <dd>
          {props.companion.stress.marked} / {props.companion.stress.max} marked
        </dd>
        <For each={props.companion.experiences}>
          {(experience) => (
            <>
              <dt>{experience.name}</dt>
              <dd>{formatModifier(experience.modifier)}</dd>
            </>
          )}
        </For>
        <Show when={props.companion.training.length}>
          <dt>Training</dt>
          <dd>{props.companion.training.join(', ')}</dd>
        </Show>
      </DescriptionList>
    </Section>
  )
}
