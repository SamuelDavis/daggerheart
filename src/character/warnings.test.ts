import { describe, expect, test } from 'vitest'
import { blade } from '../data/srd/domainCards/blade'
import { primaryWeapons } from '../data/srd/weapons/primary'
import { compose, assignTraits, chooseClass, addWeapon, toggleDomainCard } from './changes'
import { classes } from '../data/srd/classes'
import { findByName } from '../data/srd/lookup'
import { createCharacter } from './create'
import { warningsFor } from './warnings'

const wizard = findByName(classes, 'Wizard')!
const fresh = () => createCharacter('Test')
const messages = (change: Parameters<typeof compose>[0]) => warningsFor(change(fresh())).map(({ message }) => message)

describe('warnings', () => {
  test('a standard trait spread is quiet', () => {
    const spread = { Agility: 2, Strength: 1, Finesse: 1, Instinct: 0, Presence: 0, Knowledge: -1 }
    expect(messages(assignTraits(spread)).filter((message) => message.includes('traits'))).toEqual([])
  })

  test('an unusual trait spread is flagged', () => {
    expect(messages(assignTraits({ Agility: 3 }))).toContain('Starting traits are usually +2, +1, +1, +0, +0, −1.')
  })

  test('a class without a subclass is flagged', () => {
    expect(messages(chooseClass(wizard))).toContain('Wizard has no subclass yet.')
  })

  test('domain cards outside the class domains are flagged', () => {
    const card = blade[0]
    expect(messages(compose(chooseClass(wizard), toggleDomainCard(card)))).toContain(
      `${card.name} is from Blade, outside your class’s domains.`,
    )
  })

  test('too many hands are flagged', () => {
    const twoHanded = primaryWeapons.find(({ burden, tier }) => burden === 'two-handed' && tier === 1)!
    const other = primaryWeapons.find(({ tier, name }) => tier === 1 && name !== twoHanded.name)!
    expect(messages(compose(addWeapon(twoHanded, true), addWeapon(other, true)))).toContain(
      'Your equipped weapons need more than two hands.',
    )
  })
})
