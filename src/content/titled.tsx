import { A } from '@solidjs/router'

export const titled = (name: string, href?: string) => (href ? <A href={href}>{name}</A> : name)
