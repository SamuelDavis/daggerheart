import { expect, test } from 'vitest'
import { describeField } from './describeField'

test.each([
  [{ kind: 'text', name: 'Patron', value: '' }, '—'],
  [{ kind: 'counter', name: 'Favor', value: 3, max: 6 }, '3 / 6'],
  [{ kind: 'counter', name: 'Tokens', value: 2 }, '2'],
  [{ kind: 'die', name: 'Rally Die', value: 'd6' }, 'd6'],
  [{ kind: 'die', name: 'Unstoppable Die', value: 'd4', face: 3 }, 'd4 showing 3'],
  [{ kind: 'choice', name: 'Element', value: ['Fire'], options: ['Fire', 'Air'], count: 1 }, 'Fire'],
] as const)('%o reads as %s', (field, expected) => {
  expect(describeField(field)).toBe(expected)
})
