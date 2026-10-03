export const replaceAt = <T>(list: readonly T[], index: number, item: T): readonly T[] =>
  list.map((existing, position) => (position === index ? item : existing))

export const removeAt = <T>(list: readonly T[], index: number): readonly T[] =>
  list.filter((_, position) => position !== index)

export const replaceNode = <T>(root: T, target: unknown, next: unknown): T => {
  if ((root as unknown) === target) return next as T
  if (Array.isArray(root)) {
    const mapped = root.map((item) => replaceNode(item, target, next))
    return (mapped.some((item, index) => item !== root[index]) ? mapped : root) as T
  }
  if (root && typeof root === 'object') {
    const entries = Object.entries(root)
    const mapped = entries.map(([key, value]) => [key, replaceNode(value, target, next)] as const)
    return (mapped.some(([, value], index) => value !== entries[index][1]) ? Object.fromEntries(mapped) : root) as T
  }
  return root
}
