import { A, useParams, useSearchParams } from '@solidjs/router'
import { createMemo, For, Show } from 'solid-js'
import { paths } from '../app/paths'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Field } from '../ui/form'
import { Grid, Page } from '../ui/layout'
import { findCatalog, searchText, type Catalog } from './catalogs'
import './library.css'

const sortedValues = (values: readonly (string | number)[]) =>
  [...new Set(values.map(String))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

function CatalogView(props: { catalog: Catalog }) {
  const [search, setSearch] = useSearchParams<Record<string, string>>()
  const text = createMemo(() => new Map(props.catalog.entries.map((entry) => [entry, searchText(entry)])))
  const query = () => (search.q ?? '').trim().toLowerCase()
  const visible = createMemo(() =>
    props.catalog.entries.filter(
      (entry) =>
        text().get(entry)?.includes(query()) &&
        props.catalog.facets.every(({ key, values }) => !search[key] || values(entry).map(String).includes(search[key])),
    ),
  )
  const setParam = (key: string, value: string) => setSearch({ [key]: value || undefined }, { replace: true })

  return (
    <Page
      heading={props.catalog.title}
      actions={
        <A href={paths.library} class="button">
          Library
        </A>
      }
    >
      <p>{props.catalog.description}</p>
      <div class="filters">
        <Field label="Search">
          {(control) => (
            <input {...control} type="search" value={search.q ?? ''} onInput={(event) => setParam('q', event.currentTarget.value)} />
          )}
        </Field>
        <For each={props.catalog.facets}>
          {(facet) => (
            <Field label={facet.label}>
              {(control) => (
                <select {...control} value={search[facet.key] ?? ''} onChange={(event) => setParam(facet.key, event.currentTarget.value)}>
                  <option value="">All</option>
                  <For each={sortedValues(props.catalog.entries.flatMap(facet.values))}>
                    {(value) => <option value={value}>{value}</option>}
                  </For>
                </select>
              )}
            </Field>
          )}
        </For>
      </div>
      <p role="status" class="meta">
        {visible().length} of {props.catalog.entries.length}
      </p>
      <Grid>
        <For each={visible()}>{(entry) => <li>{props.catalog.card(entry, paths.entry(props.catalog.key, entry.name))}</li>}</For>
      </Grid>
    </Page>
  )
}

export function CatalogPage() {
  const params = useParams<{ catalog: string }>()
  return (
    <Show when={findCatalog(params.catalog)} keyed fallback={<NotFoundPage />}>
      {(catalog) => <CatalogView catalog={catalog} />}
    </Show>
  )
}
