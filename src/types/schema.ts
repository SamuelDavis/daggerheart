import * as v from 'valibot'

export const list = <const Item extends v.GenericSchema>(item: Item) =>
  v.pipe(v.array(item), v.readonly())

export const keyed = <const Key extends string, Value extends v.GenericSchema>(
  keys: readonly Key[],
  value: Value,
) => v.object(Object.fromEntries(keys.map((key) => [key, value])) as Record<Key, Value>)

export const Name = v.pipe(v.string(), v.trim(), v.nonEmpty())
export const Text = v.string()
export const Count = v.pipe(v.number(), v.integer(), v.minValue(0))
export const Ordinal = v.pipe(v.number(), v.integer(), v.minValue(1))
export const Modifier = v.pipe(v.number(), v.integer())
