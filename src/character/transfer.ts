import * as v from 'valibot'
import { Character } from '../types/app'

export const exportFileName = (character: Character) => `${character.name}.daggerheart.json`

export const serialize = (character: Character) => JSON.stringify(character, null, 2)

export const downloadCharacter = (character: Character) => {
  const url = URL.createObjectURL(new Blob([serialize(character)], { type: 'application/json' }))
  const link = Object.assign(document.createElement('a'), { href: url, download: exportFileName(character) })
  link.click()
  URL.revokeObjectURL(url)
}

export class InvalidCharacterFile extends Error {}

export const parseCharacter = (json: string): Character => {
  try {
    return v.parse(Character, JSON.parse(json))
  } catch (cause) {
    throw new InvalidCharacterFile('This file isn’t a Daggerheart character export.', { cause })
  }
}
