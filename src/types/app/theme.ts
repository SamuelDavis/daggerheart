import * as v from 'valibot'

export const Theme = v.picklist(['system', 'light', 'dark'])
export type Theme = v.InferOutput<typeof Theme>
