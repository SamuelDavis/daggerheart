import type { Damage, Thresholds } from '../types/srd'

export const formatModifier = (value: number) => (value < 0 ? `−${Math.abs(value)}` : `+${value}`)

export const formatDamage = ({ die, modifier, type }: Damage, proficiency?: number) =>
  `${proficiency ?? ''}${die}${modifier ? `+${modifier}` : ''} ${type === 'physical' ? 'phy' : 'mag'}`

export const formatThresholds = ({ major, severe }: Thresholds) => `${major} / ${severe}`

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
