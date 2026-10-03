import { splitProps } from 'solid-js'
import './controls.css'

type Props = {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

const clamp = (value: number, min = -Infinity, max = Infinity) => Math.min(max, Math.max(min, value))

export function NumberInput(props: Props) {
  const [own, input] = splitProps(props, ['label', 'value', 'onChange', 'min', 'max'])
  const set = (value: number) => Number.isFinite(value) && own.onChange(clamp(Math.trunc(value), own.min, own.max))

  return (
    <div class="number-input">
      <button
        type="button"
        aria-label={`Decrease ${own.label}`}
        disabled={own.min !== undefined && own.value <= own.min}
        onClick={() => set(own.value - 1)}
      >
        −
      </button>
      <input
        {...input}
        type="number"
        inputmode="numeric"
        value={own.value}
        min={own.min}
        max={own.max}
        onChange={(event) => set(event.currentTarget.valueAsNumber)}
      />
      <button
        type="button"
        aria-label={`Increase ${own.label}`}
        disabled={own.max !== undefined && own.value >= own.max}
        onClick={() => set(own.value + 1)}
      >
        +
      </button>
    </div>
  )
}
