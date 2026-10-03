import { expect, test } from 'vitest'
import { textBlocks } from './textBlocks'

test('splits paragraphs, bullets, and numbered lists', () => {
  expect(textBlocks('Intro.\n• One\n• Two: detail\nOutro.\n1. First\n2. Second')).toEqual([
    { kind: 'paragraph', line: { body: 'Intro.' } },
    { kind: 'bullets', lines: [{ body: 'One' }, { lead: 'Two', body: 'detail' }] },
    { kind: 'paragraph', line: { body: 'Outro.' } },
    { kind: 'numbered', lines: [{ body: 'First' }, { body: 'Second' }] },
  ])
})

test('treats a short label followed by a colon as a lead', () => {
  expect(textBlocks('Power Push: Make a Spellcast Roll.')).toEqual([
    { kind: 'paragraph', line: { lead: 'Power Push', body: 'Make a Spellcast Roll.' } },
  ])
})

test('does not treat sentences containing colons as leads', () => {
  expect(textBlocks('You gain the following. Choose one: a or b.')).toEqual([
    { kind: 'paragraph', line: { body: 'You gain the following. Choose one: a or b.' } },
  ])
})
