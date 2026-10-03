import * as v from 'valibot'
import { expect, test } from 'vitest'
import { Character } from '../types/app'
import { createCharacter } from './create'

test('a new character is a valid character', () => {
  expect(v.safeParse(Character, createCharacter('Kael')).issues).toBeUndefined()
})
