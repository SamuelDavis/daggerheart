import { createContext, createSignal, onCleanup, untrack, useContext, type Accessor, type JSX } from 'solid-js'
import { emptyHistory, record, redo, undo, type History } from '../lib/history'
import type { Character } from '../types/app'
import { notify } from '../ui/toasts'
import type { Change } from './changes'
import { characterRepository } from './repository'

type Session = {
  character: Accessor<Character>
  change: (change: Change, announcement?: string) => void
  undo: () => void
  redo: () => void
  canUndo: Accessor<boolean>
  canRedo: Accessor<boolean>
  rename: (name: string) => Promise<void>
}

const SessionContext = createContext<Session>()

const saveDelay = 300
const historyLimit = 50

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

export function CharacterSession(props: { character: Character; children: JSX.Element }) {
  const [character, setCharacter] = createSignal(untrack(() => props.character))
  const [history, setHistory] = createSignal<History<Character>>(emptyHistory())
  let pending: ReturnType<typeof setTimeout> | undefined

  const saveNow = () => {
    clearTimeout(pending)
    pending = undefined
    return characterRepository.save(character())
  }

  const scheduleSave = () => {
    clearTimeout(pending)
    pending = setTimeout(saveNow, saveDelay)
  }

  const restore = (travel: typeof undo<Character>) => {
    const result = travel(history(), character())
    if (!result) return
    setHistory(result.history)
    setCharacter({ ...result.state, name: character().name })
    scheduleSave()
  }

  const session: Session = {
    character,
    change(change, announcement) {
      setHistory(record(history(), character(), historyLimit))
      setCharacter(change)
      scheduleSave()
      if (announcement) notify({ message: announcement, action: { label: 'Undo', run: session.undo } })
    },
    undo: () => restore(undo),
    redo: () => restore(redo),
    canUndo: () => history().past.length > 0,
    canRedo: () => history().future.length > 0,
    async rename(name) {
      await saveNow()
      const renamed = { ...character(), name }
      await characterRepository.rename(character().name, renamed)
      setCharacter(renamed)
    },
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (!(event.ctrlKey || event.metaKey) || isTyping(event.target)) return
    const key = event.key.toLowerCase()
    if (key === 'z' && !event.shiftKey) session.undo()
    else if (key === 'y' || (key === 'z' && event.shiftKey)) session.redo()
    else return
    event.preventDefault()
  }

  const flushWhenHidden = () => document.visibilityState === 'hidden' && pending !== undefined && void saveNow()
  document.addEventListener('visibilitychange', flushWhenHidden)
  document.addEventListener('keydown', onKeyDown)
  onCleanup(() => {
    document.removeEventListener('visibilitychange', flushWhenHidden)
    document.removeEventListener('keydown', onKeyDown)
    if (pending !== undefined) void saveNow()
  })

  return <SessionContext.Provider value={session}>{props.children}</SessionContext.Provider>
}

export const useCharacterSession = () => {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useCharacterSession must be used within a CharacterSession')
  return session
}
