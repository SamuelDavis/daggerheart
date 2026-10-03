import * as v from 'valibot'
import { Count, list, Name, Text } from '../schema'
import { Companion } from './companion'
import { Die } from './dice'

const TextField = v.object({
  kind: v.literal('text'),
  name: Name,
  value: Text,
  suggestions: v.optional(list(Name)),
})

const CounterField = v.object({
  kind: v.literal('counter'),
  name: Name,
  value: Count,
  max: v.optional(Count),
})

const DieField = v.object({
  kind: v.literal('die'),
  name: Name,
  value: Die,
  face: v.optional(Count),
})

const ChoiceField = v.object({
  kind: v.literal('choice'),
  name: Name,
  value: list(Name),
  options: list(Name),
  count: Count,
})

export const Excerpt = v.object({
  name: Name,
  text: Text,
})
export type Excerpt = v.InferOutput<typeof Excerpt>

const PickField = v.object({
  kind: v.literal('pick'),
  name: Name,
  collection: Name,
  value: list(Excerpt),
  count: v.optional(Count),
})

const CompanionField = v.object({
  kind: v.literal('companion'),
  name: Name,
  value: Companion,
})

export const SheetField = v.variant('kind', [TextField, CounterField, DieField, ChoiceField, PickField, CompanionField])
export type SheetField = v.InferOutput<typeof SheetField>

export const Feature = v.object({
  ...Excerpt.entries,
  fields: v.optional(list(SheetField)),
})
export type Feature = v.InferOutput<typeof Feature>
