import { A } from '@solidjs/router'
import { paths } from '../app/paths'
import { Page } from '../ui/layout'

export function NotFoundPage() {
  return (
    <Page heading="Not found">
      <p>
        Nothing lives at this address. <A href={paths.characters}>Back to characters</A>
      </p>
    </Page>
  )
}
