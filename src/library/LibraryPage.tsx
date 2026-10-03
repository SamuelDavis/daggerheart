import { A, useSearchParams } from '@solidjs/router'
import { createMemo, For, Show } from 'solid-js'
import { paths } from '../app/paths'
import { Field } from '../ui/form'
import { Card, Grid, List, Page, Section } from '../ui/layout'
import { catalogs } from './catalogs'

const minimumQuery = 2

export function LibraryPage() {
  const [search, setSearch] = useSearchParams<{ q?: string }>()
  const query = () => (search.q ?? '').trim().toLowerCase()
  const results = createMemo(() =>
    query().length < minimumQuery
      ? []
      : catalogs
          .map((catalog) => ({ catalog, matches: catalog.entries.filter(({ name }) => name.toLowerCase().includes(query())) }))
          .filter(({ matches }) => matches.length),
  )

  return (
    <Page heading="Library">
      <Field label="Search everything by name">
        {(control) => (
          <input
            {...control}
            type="search"
            value={search.q ?? ''}
            onInput={(event) => setSearch({ q: event.currentTarget.value || undefined }, { replace: true })}
          />
        )}
      </Field>
      <Show when={query().length >= minimumQuery}>
        <Section heading="Results">
          <Show when={results().length} fallback={<p>Nothing matches “{search.q}”.</p>}>
            <For each={results()}>
              {({ catalog, matches }) => (
                <Section heading={`${catalog.title} (${matches.length})`}>
                  <List>
                    <For each={matches}>
                      {(entry) => (
                        <li>
                          <A href={paths.entry(catalog.key, entry.name)}>{entry.name}</A>
                        </li>
                      )}
                    </For>
                  </List>
                </Section>
              )}
            </For>
          </Show>
        </Section>
      </Show>
      <Section heading="Browse">
        <Grid>
          <For each={catalogs}>
            {(catalog) => (
              <li>
                <Card heading={<A href={paths.catalog(catalog.key)}>{catalog.title}</A>}>
                  <p>{catalog.description}</p>
                  <p class="meta">{catalog.entries.length} entries</p>
                </Card>
              </li>
            )}
          </For>
        </Grid>
      </Section>
    </Page>
  )
}
