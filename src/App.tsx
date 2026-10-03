import { Route, Router } from '@solidjs/router'
import { lazy } from 'solid-js'
import { Shell } from './app/Shell'
import { routePatterns } from './app/paths'
import { CharactersPage } from './routes/CharactersPage'
import { NotFoundPage } from './routes/NotFoundPage'

const SheetPage = lazy(async () => ({ default: (await import('./sheet/SheetPage')).SheetPage }))
const PrintPage = lazy(async () => ({ default: (await import('./sheet/PrintPage')).PrintPage }))
const LevelUpPage = lazy(async () => ({ default: (await import('./levelUp/LevelUpPage')).LevelUpPage }))
const LibraryPage = lazy(async () => ({ default: (await import('./library/LibraryPage')).LibraryPage }))
const CatalogPage = lazy(async () => ({ default: (await import('./library/CatalogPage')).CatalogPage }))
const EntryPage = lazy(async () => ({ default: (await import('./library/EntryPage')).EntryPage }))
const BuilderPage = lazy(async () => ({ default: (await import('./builder/BuilderPage')).BuilderPage }))

export function App() {
  return (
    <Router root={Shell}>
      <Route path={routePatterns.characters} component={CharactersPage} />
      <Route path={routePatterns.character} component={SheetPage} />
      <Route path={routePatterns.print} component={PrintPage} />
      <Route path={routePatterns.levelUp} component={LevelUpPage} />
      <Route path={routePatterns.build} component={BuilderPage} />
      <Route path={routePatterns.library} component={LibraryPage} />
      <Route path={routePatterns.catalog} component={CatalogPage} />
      <Route path={routePatterns.entry} component={EntryPage} />
      <Route path="*" component={NotFoundPage} />
    </Router>
  )
}
