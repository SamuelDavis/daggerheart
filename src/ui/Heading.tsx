import { createContext, useContext, type JSX, type ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

const HeadingLevel = createContext(1)

export function Heading(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const level = useContext(HeadingLevel)
  return <Dynamic component={`h${Math.min(level, 6)}`} {...props} />
}

export function Subordinate(props: ParentProps) {
  const level = useContext(HeadingLevel)
  return <HeadingLevel.Provider value={level + 1}>{props.children}</HeadingLevel.Provider>
}
