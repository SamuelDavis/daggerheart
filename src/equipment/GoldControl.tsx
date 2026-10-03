import { For } from 'solid-js'
import { modify } from '../character/changes'
import { useCharacterSession } from '../character/session'
import type { Gold } from '../types/app'
import { NumberField } from '../ui/fields'
import { Section } from '../ui/layout'

const units: readonly { key: keyof Gold; label: string }[] = [
  { key: 'handfuls', label: 'Handfuls' },
  { key: 'bags', label: 'Bags' },
  { key: 'chests', label: 'Chests' },
]

export function GoldControl() {
  const { character, change } = useCharacterSession()
  return (
    <Section heading="Gold">
      <div class="cluster">
        <For each={units}>
          {({ key, label }) => (
            <NumberField
              label={label}
              value={character().gold[key]}
              min={0}
              onChange={(value) => change(modify('gold', (gold) => ({ ...gold, [key]: value })))}
            />
          )}
        </For>
      </div>
    </Section>
  )
}
