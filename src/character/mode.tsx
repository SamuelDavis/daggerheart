import { createContext, useContext } from 'solid-js'

export type Mode = 'play' | 'edit' | 'print'

const play = (): Mode => 'play'

export const ModeContext = createContext(play)

export const useMode = () => useContext(ModeContext)
