export type History<State> = {
  readonly past: readonly State[]
  readonly future: readonly State[]
}

export const emptyHistory = <State>(): History<State> => ({ past: [], future: [] })

export const record = <State>(history: History<State>, previous: State, limit: number): History<State> => ({
  past: [...history.past, previous].slice(-limit),
  future: [],
})

export const undo = <State>(history: History<State>, current: State) => {
  const previous = history.past.at(-1)
  if (previous === undefined) return
  return { state: previous, history: { past: history.past.slice(0, -1), future: [current, ...history.future] } }
}

export const redo = <State>(history: History<State>, current: State) => {
  const [next, ...future] = history.future
  if (next === undefined) return
  return { state: next, history: { past: [...history.past, current], future } }
}
