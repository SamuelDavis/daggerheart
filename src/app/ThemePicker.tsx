import { For } from 'solid-js'
import * as v from 'valibot'
import { Theme } from '../types/app'
import { setTheme, theme, themes } from './theme'

const labels: Record<Theme, string> = { system: 'System theme', light: 'Light', dark: 'Dark' }

export function ThemePicker() {
  return (
    <select
      aria-label="Theme"
      value={theme()}
      onChange={(event) => setTheme(v.parse(Theme, event.currentTarget.value))}
    >
      <For each={themes}>{(option) => <option value={option}>{labels[option]}</option>}</For>
    </select>
  )
}
