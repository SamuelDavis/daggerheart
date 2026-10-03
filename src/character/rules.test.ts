import { expect, test } from 'vitest'
import { tierOf } from './rules'

test.each([
  [1, 1],
  [2, 2],
  [4, 2],
  [5, 3],
  [7, 3],
  [8, 4],
  [10, 4],
])('level %i is tier %i', (level, tier) => {
  expect(tierOf(level)).toBe(tier)
})
