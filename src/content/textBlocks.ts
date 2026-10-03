export type Line = { lead?: string; body: string }

export type TextBlock =
  | { kind: 'paragraph'; line: Line }
  | { kind: 'bullets'; lines: Line[] }
  | { kind: 'numbered'; lines: Line[] }

const bullet = /^• /
const numbered = /^\d+\. /
const lead = /^([^:.]{1,40}): (.+)$/

const lineOf = (text: string): Line => {
  const match = lead.exec(text)
  return match ? { lead: match[1], body: match[2] } : { body: text }
}

export const textBlocks = (text: string): TextBlock[] =>
  text
    .split('\n')
    .filter(Boolean)
    .reduce<TextBlock[]>((blocks, raw) => {
      const kind = bullet.test(raw) ? 'bullets' : numbered.test(raw) ? 'numbered' : 'paragraph'
      const line = lineOf(raw.replace(kind === 'bullets' ? bullet : numbered, ''))
      const previous = blocks.at(-1)
      if (kind === 'paragraph') return [...blocks, { kind, line }]
      if (previous?.kind === kind) return [...blocks.slice(0, -1), { kind, lines: [...previous.lines, line] }]
      return [...blocks, { kind, lines: [line] }]
    }, [])
