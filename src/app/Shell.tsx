import { A, type RouteSectionProps } from '@solidjs/router'
import { ErrorBoundary } from 'solid-js'
import { Page } from '../ui/layout'
import { Toaster } from '../ui/toasts'
import { paths } from './paths'
import { ThemePicker } from './ThemePicker'
import { UpdateBanner } from './UpdateBanner'
import './shell.css'

export function Shell(props: RouteSectionProps) {
  return (
    <>
      <a class="skip-link" href="#main">
        Skip to content
      </a>
      <header class="app-header" data-print="hidden">
        <div class="center cluster">
          <nav aria-label="Primary">
            <ul class="cluster" role="list">
              <li>
                <A href={paths.characters} end>
                  Characters
                </A>
              </li>
              <li>
                <A href={paths.library}>Library</A>
              </li>
            </ul>
          </nav>
          <ThemePicker />
        </div>
      </header>
      <UpdateBanner />
      <ErrorBoundary
        fallback={(error: unknown, reset) => (
          <Page heading="Something went wrong">
            <p>{error instanceof Error ? error.message : String(error)}</p>
            <button type="button" onClick={reset}>
              Try again
            </button>
          </Page>
        )}
      >
        {props.children}
      </ErrorBoundary>
      <Toaster />
    </>
  )
}
