import { expect, test } from 'vitest'
import { beastbound } from '../data/srd/classes/ranger'
import { compose, chooseClass, chooseSubclass } from './changes'
import { classes } from '../data/srd/classes'
import { createCharacter } from './create'
import { fieldsOfKind } from './fields'

test('finds companion fields anywhere on a character', () => {
  const ranger = compose(chooseClass(classes.find(({ name }) => name === 'Ranger')!), chooseSubclass(beastbound))(createCharacter('Kael'))
  expect(fieldsOfKind(ranger, 'companion').map(({ name }) => name)).toEqual(['Companion'])
  expect(fieldsOfKind(createCharacter('Kael'), 'companion')).toEqual([])
})
