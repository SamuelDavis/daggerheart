import { A, useParams } from '@solidjs/router'
import { Show } from 'solid-js'
import { paths } from '../app/paths'
import { findByName } from '../data/srd/lookup'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Page } from '../ui/layout'
import { findCatalog } from './catalogs'

export function EntryPage() {
  const params = useParams<{ catalog: string; name: string }>()
  const catalog = () => findCatalog(params.catalog)
  const entry = () => {
    const current = catalog()
    return current && findByName(current.entries, decodeURIComponent(params.name))
  }

  return (
    <Show when={catalog() && entry()} fallback={<NotFoundPage />}>
      <Page
        heading={entry()!.name}
        actions={
          <A href={paths.catalog(catalog()!.key)} class="button">
            {catalog()!.title}
          </A>
        }
      >
        {catalog()!.detail?.(entry()!) ?? catalog()!.card(entry()!, '')}
      </Page>
    </Show>
  )
}
