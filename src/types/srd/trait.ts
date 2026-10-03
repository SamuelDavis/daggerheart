import * as v from 'valibot'
import { list, Name, Text } from '../schema'

export const Trait = v.object({
  name: Name,
  verbs: list(Name),
  description: Text,
})
export type Trait = v.InferOutput<typeof Trait>
