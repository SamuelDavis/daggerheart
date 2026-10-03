import type { SheetField } from '../types/srd'

type FieldOf<Kind extends SheetField['kind']> = Extract<SheetField, { kind: Kind }>

const isField = (value: object): value is SheetField => 'kind' in value && 'name' in value && 'value' in value

export const fieldsOfKind = <Kind extends SheetField['kind']>(root: unknown, kind: Kind): FieldOf<Kind>[] => {
  if (Array.isArray(root)) return root.flatMap((item) => fieldsOfKind(item, kind))
  if (!root || typeof root !== 'object') return []
  const own = isField(root) && root.kind === kind ? [root as FieldOf<Kind>] : []
  return [...own, ...Object.values(root).flatMap((value) => fieldsOfKind(value, kind))]
}
