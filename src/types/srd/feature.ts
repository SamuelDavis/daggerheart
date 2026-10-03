import * as v from 'valibot'
import { Count, list, Name, Text } from '../schema'
import { Beastform } from './beastform'
import { Companion } from './companion'
import { Die } from './dice'
import { Excerpt } from './excerpt'

const common = {
  name: Name,
  play: v.optional(v.boolean()),
}

const TextField = v.object({
  kind: v.literal('text'),
  ...common,
  value: Text,
  suggestions: v.optional(list(Name)),
})

const CounterField = v.object({
  kind: v.literal('counter'),
  ...common,
  value: Count,
  max: v.optional(Count),
})

const DieField = v.object({
  kind: v.literal('die'),
  ...common,
  value: Die,
  face: v.optional(Count),
})

const ChoiceField = v.object({
  kind: v.literal('choice'),
  ...common,
  value: list(Name),
  options: list(Name),
  count: Count,
})

const PickField = v.object({
  kind: v.literal('pick'),
  ...common,
  collection: Name,
  value: list(Excerpt),
  count: v.optional(Count),
})

const CompanionField = v.object({
  kind: v.literal('companion'),
  ...common,
  value: Companion,
})

const BeastformField = v.object({
  kind: v.literal('beastform'),
  ...common,
  value: v.optional(Beastform),
})

export const SheetField = v.variant('kind', [
  TextField,
  CounterField,
  DieField,
  ChoiceField,
  PickField,
  CompanionField,
  BeastformField,
])
export type SheetField = v.InferOutput<typeof SheetField>

export const Feature = v.object({
  ...Excerpt.entries,
  fields: v.optional(list(SheetField)),
})
export type Feature = v.InferOutput<typeof Feature>
