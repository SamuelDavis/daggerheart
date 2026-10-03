import { expect, test } from 'vitest'
import { nextAvailableName } from './names'

test('uses the base name when free', () => {
  expect(nextAvailableName('Unnamed Hero', ['Kael'])).toBe('Unnamed Hero')
})

test('numbers past taken names', () => {
  expect(nextAvailableName('Unnamed Hero', ['Unnamed Hero', 'Unnamed Hero 2'])).toBe('Unnamed Hero 3')
})
