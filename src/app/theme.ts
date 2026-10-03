import { createSignal } from 'solid-js'
import * as v from 'valibot'
import { Theme } from '../types/app'

const storageKey = 'theme'

const apply = (theme: Theme) => {
  if (theme === 'system') delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = theme
}

const stored = v.fallback(Theme, 'system')
const [theme, setThemeSignal] = createSignal(v.parse(stored, localStorage.getItem(storageKey)))
apply(theme())

export { theme }

export const setTheme = (next: Theme) => {
  localStorage.setItem(storageKey, next)
  apply(next)
  setThemeSignal(next)
}

export const themes = Theme.options
