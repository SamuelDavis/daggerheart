import { For, Match, Show, Switch } from 'solid-js'
import { textBlocks, type Line } from './textBlocks'

function LineText(props: { line: Line }) {
  return (
    <>
      <Show when={props.line.lead}>
        <strong>{props.line.lead}:</strong>{' '}
      </Show>
      {props.line.body}
    </>
  )
}

export function RichText(props: { text: string }) {
  return (
    <For each={textBlocks(props.text)}>
      {(block) => (
        <Switch>
          <Match when={block.kind === 'paragraph' && block}>
            {(paragraph) => (
              <p>
                <LineText line={paragraph().line} />
              </p>
            )}
          </Match>
          <Match when={block.kind === 'bullets' && block}>
            {(list) => (
              <ul>
                <For each={list().lines}>
                  {(line) => (
                    <li>
                      <LineText line={line} />
                    </li>
                  )}
                </For>
              </ul>
            )}
          </Match>
          <Match when={block.kind === 'numbered' && block}>
            {(list) => (
              <ol>
                <For each={list().lines}>
                  {(line) => (
                    <li>
                      <LineText line={line} />
                    </li>
                  )}
                </For>
              </ol>
            )}
          </Match>
        </Switch>
      )}
    </For>
  )
}
