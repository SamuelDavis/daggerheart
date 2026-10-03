import { For, Show } from 'solid-js'
import { assign, modify, setTrait, type Change } from '../../character/changes'
import { useMode } from '../../character/mode'
import { tierOf } from '../../character/rules'
import { useCharacterSession } from '../../character/session'
import { formatModifier } from '../../content/format'
import { traits } from '../../data/srd/traits'
import type { Character } from '../../types/app'
import type { Track } from '../../types/srd'
import { NumberField } from '../../ui/fields'
import { Section } from '../../ui/layout'
import { TrackControl } from '../TrackControl'

type Stat = { label: string; value: (character: Character) => number; change: (value: number) => Change; min?: number }

const stats: readonly Stat[] = [
  { label: 'Level', value: ({ level }) => level, change: (level) => assign('level', level), min: 1 },
  { label: 'Evasion', value: ({ evasion }) => evasion, change: (evasion) => assign('evasion', evasion) },
  {
    label: 'Armor Score',
    value: ({ armorSlots }) => armorSlots.max,
    change: (max) => modify('armorSlots', (track) => ({ max, marked: Math.min(track.marked, max) })),
  },
  {
    label: 'Major threshold',
    value: ({ thresholds }) => thresholds.major,
    change: (major) => modify('thresholds', (thresholds) => ({ ...thresholds, major })),
  },
  {
    label: 'Severe threshold',
    value: ({ thresholds }) => thresholds.severe,
    change: (severe) => modify('thresholds', (thresholds) => ({ ...thresholds, severe })),
  },
  { label: 'Proficiency', value: ({ proficiency }) => proficiency, change: (proficiency) => assign('proficiency', proficiency) },
]

const tracks: readonly { label: string; key: 'hitPoints' | 'stress' | 'hope' | 'armorSlots' }[] = [
  { label: 'Hit Points', key: 'hitPoints' },
  { label: 'Stress', key: 'stress' },
  { label: 'Hope', key: 'hope' },
  { label: 'Armor Slots', key: 'armorSlots' },
]

export function CoreSection() {
  const { character, change } = useCharacterSession()
  const mode = useMode()
  const spellcastTraits = () => character().classes.flatMap(({ subclass }) => subclass?.spellcastTrait ?? [])

  return (
    <>
      <Section heading="Traits">
        <ul class="traits">
          <For each={traits}>
            {(trait) => {
              const score = () => character().traits[trait.name]
              return (
                <li class="trait">
                  <strong>{trait.name}</strong>
                  <Show
                    when={mode() === 'edit'}
                    fallback={<output aria-label={`${trait.name} modifier`}>{formatModifier(score().value)}</output>}
                  >
                    <NumberField label="Modifier" value={score().value} onChange={(value) => change(setTrait(trait.name, value))} />
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        checked={score().marked}
                        onChange={(event) =>
                          change(modify('traits', (all) => ({ ...all, [trait.name]: { ...score(), marked: event.currentTarget.checked } })))
                        }
                      />
                      Marked
                    </label>
                  </Show>
                  <small>{trait.verbs.join(', ')}</small>
                  <Show when={mode() !== 'edit' && score().marked}>
                    <small>Marked</small>
                  </Show>
                  <Show when={spellcastTraits().includes(trait.name)}>
                    <small>Spellcast trait</small>
                  </Show>
                </li>
              )
            }}
          </For>
        </ul>
      </Section>
      <Section heading="Defense">
        <dl class="stats">
          <For each={stats}>
            {(stat) => (
              <Show
                when={mode() === 'edit'}
                fallback={
                  <div class="stat">
                    <dt>{stat.label}</dt>
                    <dd>{stat.value(character())}</dd>
                  </div>
                }
              >
                <div class="stat">
                  <dt class="visually-hidden">{stat.label}</dt>
                  <dd>
                    <NumberField
                      label={stat.label}
                      value={stat.value(character())}
                      min={stat.min ?? 0}
                      onChange={(value) => change(stat.change(value))}
                    />
                  </dd>
                </div>
              </Show>
            )}
          </For>
        </dl>
        <p class="meta">
          Tier {tierOf(character().level)} · Minor damage below {character().thresholds.major}, Major from{' '}
          {character().thresholds.major}, Severe from {character().thresholds.severe}.
        </p>
      </Section>
      <Section heading="Damage & health">
        <For each={tracks}>
          {({ label, key }) => (
            <TrackControl label={label} track={character()[key]} onChange={(track: Track) => change(assign(key, track))} />
          )}
        </For>
      </Section>
    </>
  )
}
