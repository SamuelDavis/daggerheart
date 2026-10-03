import * as v from 'valibot'
import { Ordinal } from '../schema'
import { Feature } from './feature'

export const MartialStance = v.object({
  ...Feature.entries,
  tier: Ordinal,
})
export type MartialStance = v.InferOutput<typeof MartialStance>
