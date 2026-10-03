import { Index, Show } from 'solid-js'
import { useMode } from '../character/mode'
import type { Track } from '../types/srd'
import { NumberField } from '../ui/fields'
import './sheet.css'

const slots = (count: number) => Array.from({ length: count }, (_, index) => index)

export function TrackControl(props: { label: string; track: Track; onChange: (track: Track) => void }) {
  const mode = useMode()
  const toggle = (slot: number) =>
    props.onChange({ ...props.track, marked: slot < props.track.marked ? slot : slot + 1 })

  return (
    <fieldset class="track">
      <legend>
        {props.label}{' '}
        <small>
          {props.track.marked} / {props.track.max} marked
        </small>
      </legend>
      <div class="boxes">
        <Index each={slots(props.track.max)}>
          {(slot) => (
            <button
              type="button"
              class="box"
              aria-label={`${props.label} ${slot() + 1}`}
              aria-pressed={slot() < props.track.marked}
              disabled={mode() === 'print'}
              onClick={() => toggle(slot())}
            />
          )}
        </Index>
      </div>
      <Show when={mode() === 'edit'}>
        <NumberField
          label={`${props.label} slots`}
          value={props.track.max}
          min={0}
          onChange={(max) => props.onChange({ max, marked: Math.min(props.track.marked, max) })}
        />
      </Show>
    </fieldset>
  )
}
