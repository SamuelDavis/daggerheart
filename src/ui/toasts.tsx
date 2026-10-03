import { createSignal, For, Show } from 'solid-js'
import './toasts.css'

type Toast = {
  id: number
  message: string
  action?: { label: string; run: () => void }
}

const visibleFor = 8000
const [toasts, setToasts] = createSignal<readonly Toast[]>([])
let nextId = 0

const dismiss = (id: number) => setToasts((current) => current.filter((toast) => toast.id !== id))

export const notify = (toast: Omit<Toast, 'id'>) => {
  const id = nextId++
  setToasts((current) => [...current, { ...toast, id }])
  setTimeout(() => dismiss(id), visibleFor)
}

export function Toaster() {
  return (
    <section class="toaster" aria-live="polite" aria-label="Notifications" data-print="hidden">
      <For each={toasts()}>
        {(toast) => (
          <div class="toast cluster">
            <p>{toast.message}</p>
            <Show when={toast.action}>
              {(action) => (
                <button
                  type="button"
                  onClick={() => {
                    action().run()
                    dismiss(toast.id)
                  }}
                >
                  {action().label}
                </button>
              )}
            </Show>
            <button type="button" aria-label="Dismiss" onClick={() => dismiss(toast.id)}>
              ×
            </button>
          </div>
        )}
      </For>
    </section>
  )
}
