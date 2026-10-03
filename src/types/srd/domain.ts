import * as v from 'valibot'
import { Count, Name, Ordinal, Text } from '../schema'
import { Feature } from './feature'

export const Domain = v.object({
  name: Name,
  description: Text,
})
export type Domain = v.InferOutput<typeof Domain>

export const DomainCardType = v.picklist(['ability', 'spell', 'grimoire'])
export type DomainCardType = v.InferOutput<typeof DomainCardType>

export const DomainCard = v.object({
  ...Feature.entries,
  domain: Name,
  level: Ordinal,
  type: DomainCardType,
  recallCost: Count,
})
export type DomainCard = v.InferOutput<typeof DomainCard>
