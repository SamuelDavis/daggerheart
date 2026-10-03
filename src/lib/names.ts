export const nextAvailableName = (base: string, taken: readonly string[]) => {
  const names = new Set(taken)
  if (!names.has(base)) return base
  let suffix = 2
  while (names.has(`${base} ${suffix}`)) suffix++
  return `${base} ${suffix}`
}
