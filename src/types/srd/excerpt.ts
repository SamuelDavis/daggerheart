import * as v from 'valibot'
import { Name, Text } from '../schema'

export const Excerpt = v.object({
  name: Name,
  text: Text,
})
export type Excerpt = v.InferOutput<typeof Excerpt>
