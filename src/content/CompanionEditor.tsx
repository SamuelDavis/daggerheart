import { For } from 'solid-js'
import { ranges } from '../data/srd/ranges'
import { DamageType, Die, type Companion } from '../types/srd'
import { Field, Fieldset } from '../ui/form'
import { Section } from '../ui/layout'
import { NumberInput } from '../ui/NumberInput'
import { ExperienceEditor } from './ExperienceEditor'

const pick = <Option extends string>(options: readonly Option[], value: string, fallback: Option) =>
  options.find((option) => option === value) ?? fallback

export function CompanionEditor(props: { companion: Companion; onChange: (companion: Companion) => void }) {
  const set = <Key extends keyof Companion>(key: Key, value: Companion[Key]) =>
    props.onChange({ ...props.companion, [key]: value })
  const setAttack = <Key extends keyof Companion['attack']>(key: Key, value: Companion['attack'][Key]) =>
    set('attack', { ...props.companion.attack, [key]: value })

  return (
    <Section heading="Companion sheet">
      <Field label="Name">
        {(control) => (
          <input {...control} value={props.companion.name} onChange={(event) => set('name', event.currentTarget.value)} />
        )}
      </Field>
      <Field label="Kind of animal">
        {(control) => (
          <input {...control} value={props.companion.species} onChange={(event) => set('species', event.currentTarget.value)} />
        )}
      </Field>
      <Field label="Evasion">
        {(control) => (
          <NumberInput {...control} label="companion Evasion" value={props.companion.evasion} min={0} onChange={(value) => set('evasion', value)} />
        )}
      </Field>
      <Field label="Stress slots">
        {(control) => (
          <NumberInput
            {...control}
            label="companion Stress slots"
            value={props.companion.stress.max}
            min={0}
            onChange={(max) => set('stress', { ...props.companion.stress, max })}
          />
        )}
      </Field>
      <Fieldset legend="Attack & damage">
        <Field label="Standard attack">
          {(control) => (
            <input
              {...control}
              value={props.companion.attack.description}
              onChange={(event) => setAttack('description', event.currentTarget.value)}
            />
          )}
        </Field>
        <Field label="Damage die">
          {(control) => (
            <select
              {...control}
              value={props.companion.attack.die}
              onChange={(event) => setAttack('die', pick(Die.options, event.currentTarget.value, props.companion.attack.die))}
            >
              <For each={Die.options}>{(die) => <option value={die}>{die}</option>}</For>
            </select>
          )}
        </Field>
        <Field label="Range">
          {(control) => (
            <select {...control} value={props.companion.attack.range} onChange={(event) => setAttack('range', event.currentTarget.value)}>
              <For each={ranges}>{(range) => <option value={range.name}>{range.name}</option>}</For>
            </select>
          )}
        </Field>
        <Field label="Damage type">
          {(control) => (
            <select
              {...control}
              value={props.companion.attack.damageType}
              onChange={(event) =>
                setAttack('damageType', pick(DamageType.options, event.currentTarget.value, props.companion.attack.damageType))
              }
            >
              <For each={DamageType.options}>{(type) => <option value={type}>{type}</option>}</For>
            </select>
          )}
        </Field>
      </Fieldset>
      <ExperienceEditor
        legend="Companion Experiences"
        experiences={props.companion.experiences}
        onChange={(experiences) => set('experiences', experiences)}
      />
    </Section>
  )
}
