import { Show } from 'solid-js'
import { useRegisterSW } from 'virtual:pwa-register/solid'
import { Toolbar } from '../ui/layout'

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  return (
    <Show when={needRefresh()}>
      <aside class="banner center cluster" role="status" data-print="hidden">
        <p>An update is available.</p>
        <Toolbar>
          <button type="button" onClick={() => updateServiceWorker()}>
            Reload
          </button>
          <button type="button" onClick={() => setNeedRefresh(false)}>
            Later
          </button>
        </Toolbar>
      </aside>
    </Show>
  )
}
