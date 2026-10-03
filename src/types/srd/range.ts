import * as v from 'valibot'
import { Name, Text } from '../schema'

export const Range = v.object({
  name: Name,
  description: Text,
})
export type Range = v.InferOutput<typeof Range>
