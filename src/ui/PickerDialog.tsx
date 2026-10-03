import { createMemo, createSignal, For, Show, type JSX } from 'solid-js'
import { Dialog } from './Dialog'
import { Field } from './form'
import { Grid } from './layout'

type Searchable = { name: string; text?: string }

const matches = (entry: Searchable, query: string) =>
  [entry.name, entry.text ?? ''].some((value) => value.toLowerCase().includes(query.toLowerCase()))

export function PickerDialog<Entry extends Searchable>(props: {
  open: boolean
  onClose: () => void
  heading: JSX.Element
  entries: readonly Entry[]
  filters?: JSX.Element
  children: (entry: Entry) => JSX.Element
}) {
  const [query, setQuery] = createSignal('')
  const visible = createMemo(() => props.entries.filter((entry) => matches(entry, query())))

  return (
    <Dialog open={props.open} onClose={props.onClose} heading={props.heading}>
      <div class="cluster">
        <Field label="Search">
          {(control) => <input {...control} type="search" value={query()} onInput={(event) => setQuery(event.currentTarget.value)} />}
        </Field>
        {props.filters}
      </div>
      <Show when={visible().length} fallback={<p>Nothing matches.</p>}>
        <Grid>
          <For each={visible()}>{(entry) => <li>{props.children(entry)}</li>}</For>
        </Grid>
      </Show>
    </Dialog>
  )
}
