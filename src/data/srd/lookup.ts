export const findByName = <Entry extends { name: string }>(entries: readonly Entry[], name: string | undefined) =>
  entries.find((entry) => entry.name === name)

export const findAllByName = <Entry extends { name: string }>(entries: readonly Entry[], names: readonly string[]) =>
  entries.filter((entry) => names.includes(entry.name))
