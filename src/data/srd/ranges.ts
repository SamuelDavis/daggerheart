import type { Range } from '../../types/srd'

export const ranges = [
  {
    name: 'Melee',
    description: 'Close enough to touch, up to a few feet away.',
  },
  {
    name: 'Very Close',
    description:
      'Close enough to see fine details, about 5–10 feet away. While in danger, a character can move, as part of their action, from Very Close range into Melee range. On a map: anything within the shortest length of a game card (2-3 inches).',
  },
  {
    name: 'Close',
    description:
      'Close enough to see prominent details, about 10–30 feet away. While in danger, a character can move, as part of their action, from Close range into Melee range. On a map: anything within the length of a pencil (5-6 inches).',
  },
  {
    name: 'Far',
    description:
      'Close enough to see very little detail, about 30–100 feet away. While in danger, a character must make an Agility Roll to safely move from Far range into Melee range. On a map: anything within the length of the long edge of a piece of copy paper (11–12 inches).',
  },
  {
    name: 'Very Far',
    description:
      'Too far to make out any details, about 100–300 feet away. While in danger, a character must make an Agility Roll to safely move from Very Far range into Melee range. On a map: anything beyond Far range, but still within the bounds of the conflict or scene.',
  },
] as const satisfies readonly Range[]
