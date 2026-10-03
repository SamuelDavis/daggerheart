const tierStarts = [1, 2, 5, 8] as const

export const tierOf = (level: number) => tierStarts.filter((start) => level >= start).length
