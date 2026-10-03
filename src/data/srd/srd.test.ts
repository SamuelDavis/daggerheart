import * as v from 'valibot'
import { describe, expect, test } from 'vitest'
import { srd, type SrdCollection } from '.'
import { reference } from './reference'
import { spellcastTrait } from './traits'

type Entry<Collection extends SrdCollection> = (typeof srd)[Collection]['entries'][number]

const relation = <From extends SrdCollection>(
  from: From,
  select: (entry: Entry<From>) => readonly (string | undefined)[],
  to: SrdCollection,
  alsoAllowed: readonly string[] = [],
) => ({ from, to, alsoAllowed, select: select as (entry: unknown) => readonly (string | undefined)[] })

const relations = [
  relation('domainCards', (card) => [card.domain], 'domains'),
  relation('classes', (characterClass) => characterClass.domains, 'domains'),
  relation('classes', (characterClass) => characterClass.subclasses, 'subclasses'),
  relation('subclasses', (subclass) => [subclass.spellcastTrait], 'traits'),
  relation('weapons', (weapon) => [weapon.trait], 'traits', [spellcastTrait]),
  relation('weapons', (weapon) => [weapon.range], 'ranges'),
  relation('beastforms', ({ stats }) => [stats?.trait, stats?.attack.trait], 'traits'),
  relation('beastforms', ({ stats }) => [stats?.attack.range], 'ranges'),
  relation('guides', (guide) => [guide.name], 'classes'),
  relation('guides', (guide) => Object.keys(guide.suggestedTraits), 'traits'),
  relation('guides', (guide) => [guide.suggestedPrimaryWeapon, guide.suggestedSecondaryWeapon], 'weapons'),
  relation('guides', (guide) => [guide.suggestedArmor], 'armor'),
]

const collections = Object.entries({ ...srd, ...reference }) as [string, { schema: v.GenericSchema; entries: readonly { name: string }[] }][]
const namesOf = (collection: SrdCollection) => new Set(srd[collection].entries.map(({ name }) => name))

describe.each(collections)('%s', (_, { schema, entries }) => {
  test('every entry matches its schema', () => {
    for (const entry of entries) expect(v.safeParse(schema, entry).issues).toBeUndefined()
  })

  test('names are unique', () => {
    const names = entries.map(({ name }) => name)
    expect(names.filter((name, index) => names.indexOf(name) !== index)).toEqual([])
  })
})

describe.each(relations)('$from → $to', ({ from, to, select, alsoAllowed }) => {
  test('every reference resolves', () => {
    const targets = new Set([...namesOf(to), ...alsoAllowed])
    const dangling = srd[from].entries.flatMap((entry) =>
      select(entry).filter((name) => name !== undefined && !targets.has(name)).map((name) => `${entry.name} → ${name}`),
    )
    expect(dangling).toEqual([])
  })
})

test('every subclass belongs to exactly one class', () => {
  const owners = srd.classes.entries.flatMap(({ subclasses }) => subclasses)
  const misowned = srd.subclasses.entries.filter(({ name }) => owners.filter((owner) => owner === name).length !== 1)
  expect(misowned.map(({ name }) => name)).toEqual([])
})

const sheetFieldsIn = (value: unknown): { kind: string; collection?: string }[] =>
  Array.isArray(value)
    ? value.flatMap(sheetFieldsIn)
    : value && typeof value === 'object'
      ? [
          ...('kind' in value ? [value as { kind: string; collection?: string }] : []),
          ...Object.values(value).flatMap(sheetFieldsIn),
        ]
      : []

test('every pick field draws from an SRD collection', () => {
  const collectionsUsed = sheetFieldsIn(Object.values(srd).map(({ entries }) => entries)).flatMap(({ kind, collection }) =>
    kind === 'pick' && collection ? [collection] : [],
  )
  expect(collectionsUsed.filter((collection) => !(collection in srd))).toEqual([])
})
