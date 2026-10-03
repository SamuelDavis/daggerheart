import { primaryWeapons } from './weapons/primary'
import { secondaryWeapons } from './weapons/secondary'

export const weapons = [...primaryWeapons, ...secondaryWeapons] as const
