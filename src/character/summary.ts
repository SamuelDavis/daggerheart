import type { Character } from '../types/app'

export const describeCharacter = (character: Character) =>
  [
    `Level ${character.level}`,
    character.classes.map(({ name, subclass }) => [subclass?.name, name].filter(Boolean).join(' ')).join(' / '),
    [character.heritage.ancestry?.name, character.heritage.community?.name].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(' · ')
