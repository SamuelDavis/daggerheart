import * as v from 'valibot'
import { Count, Modifier, Text } from '../schema'

export const Track = v.object({
  max: Count,
  marked: Count,
})
export type Track = v.InferOutput<typeof Track>

export const Experience = v.object({
  name: Text,
  modifier: Modifier,
})
export type Experience = v.InferOutput<typeof Experience>
