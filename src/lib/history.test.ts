import { expect, test } from 'vitest'
import { emptyHistory, record, redo, undo } from './history'

test('undo and redo walk through recorded states', () => {
  const history = record(record(emptyHistory<number>(), 1, 50), 2, 50)
  const undone = undo(history, 3)!
  expect(undone.state).toBe(2)
  const redone = redo(undone.history, undone.state)!
  expect(redone.state).toBe(3)
  expect(redone.history.past).toEqual([1, 2])
})

test('recording clears the redo stack', () => {
  const undone = undo(record(emptyHistory<number>(), 1, 50), 2)!
  expect(record(undone.history, 1, 50).future).toEqual([])
})

test('history keeps only the most recent states', () => {
  const history = [1, 2, 3, 4].reduce((current, state) => record(current, state, 3), emptyHistory<number>())
  expect(history.past).toEqual([2, 3, 4])
})

test('nothing to undo or redo returns undefined', () => {
  expect(undo(emptyHistory<number>(), 1)).toBeUndefined()
  expect(redo(emptyHistory<number>(), 1)).toBeUndefined()
})
