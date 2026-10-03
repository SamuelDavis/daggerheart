import * as v from 'valibot'
import { list, Name, Text } from '../schema'
import { Feature } from './feature'

export const Ancestry = v.object({
  name: Name,
  description: Text,
  features: list(Feature),
})
export type Ancestry = v.InferOutput<typeof Ancestry>

export const Community = v.object({
  name: Name,
  description: Text,
  adjectives: list(Name),
  features: list(Feature),
})
export type Community = v.InferOutput<typeof Community>

export const Transformation = v.object({
  name: Name,
  description: Text,
  features: list(Feature),
  questions: list(Text),
})
export type Transformation = v.InferOutput<typeof Transformation>
