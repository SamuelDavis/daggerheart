import { objectStore, requestPersistentStorage } from '../lib/database'
import { nextAvailableName } from '../lib/names'
import { Character } from '../types/app'
import { createCharacter, placeholderName } from './create'

const characters = objectStore('characters', Character)

export const characterRepository = {
  list: characters.all,
  load: characters.get,
  save: characters.put,
  remove: characters.delete,
  rename: (previousName: string, character: Character) => characters.replace(previousName, character),
  async import(character: Character) {
    await characters.add(character)
    void requestPersistentStorage()
  },
  async create() {
    const character = createCharacter(nextAvailableName(placeholderName, await characters.keys()))
    await characters.add(character)
    void requestPersistentStorage()
    return character
  },
}
