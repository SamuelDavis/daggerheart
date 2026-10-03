import type { SheetField } from '../types/srd'

export const describeField = (field: SheetField): string => {
  switch (field.kind) {
    case 'text':
      return field.value || '—'
    case 'counter':
      return field.max === undefined ? `${field.value}` : `${field.value} / ${field.max}`
    case 'die':
      return field.face ? `${field.value} showing ${field.face}` : field.value
    case 'choice':
      return field.value.join(', ') || '—'
    case 'pick':
      return field.value.map(({ name }) => name).join(', ') || '—'
    case 'companion':
      return field.value.name || '—'
  }
}
