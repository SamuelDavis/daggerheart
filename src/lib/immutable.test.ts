import { expect, test } from 'vitest'
import { removeAt, replaceAt, replaceNode } from './immutable'

test('replaceNode swaps a nested node and shares untouched branches', () => {
  const target = { value: 1 }
  const untouched = { other: true }
  const root = { list: [untouched, { inner: target }] }
  const next = replaceNode(root, target, { value: 2 })
  expect(next).toEqual({ list: [{ other: true }, { inner: { value: 2 } }] })
  expect(next.list[0]).toBe(untouched)
  expect(root.list[1]).toEqual({ inner: { value: 1 } })
})

test('replaceNode returns the same root when the target is absent', () => {
  const root = { list: [{ a: 1 }] }
  expect(replaceNode(root, {}, {})).toBe(root)
})

test('list helpers return new lists', () => {
  expect(replaceAt(['a', 'b'], 1, 'c')).toEqual(['a', 'c'])
  expect(removeAt(['a', 'b'], 0)).toEqual(['b'])
})
