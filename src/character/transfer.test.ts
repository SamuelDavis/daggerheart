import { expect, test } from 'vitest'
import { createCharacter } from './create'
import { InvalidCharacterFile, parseCharacter, serialize } from './transfer'

test('an exported character imports unchanged', () => {
  const character = createCharacter('Kael')
  expect(parseCharacter(serialize(character))).toEqual(character)
})

test('anything else is rejected', () => {
  expect(() => parseCharacter('{"name": "Kael"}')).toThrow(InvalidCharacterFile)
  expect(() => parseCharacter('not json')).toThrow(InvalidCharacterFile)
})
