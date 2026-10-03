import { createSignal, For, Show, type JSX } from 'solid-js'
import { Grid, Section } from '../ui/layout'
import { ToggleButton } from '../ui/ToggleButton'

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const reveal = (id: string) =>
  requestAnimationFrame(() => {
    const section = document.getElementById(id)
    const heading = section?.querySelector<HTMLElement>('h1, h2, h3, h4, h5, h6')
    section?.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
  })

export function Chooser<Option extends { name: string }>(props: {
  id: string
  heading: JSX.Element
  options: readonly Option[]
  selected?: string
  onSelect: (option: Option) => void
  card: (option: Option, actions?: JSX.Element) => JSX.Element
  actions?: JSX.Element
}) {
  const [browsing, setBrowsing] = createSignal(false)
  const selectedOption = () => props.options.find(({ name }) => name === props.selected)
  const choose = (option: Option) => {
    props.onSelect(option)
    setBrowsing(false)
    reveal(props.id)
  }

  return (
    <Section
      id={props.id}
      heading={props.heading}
      actions={
        <>
          {props.actions}
          <Show when={selectedOption()}>
            {(selected) => (
              <button type="button" aria-expanded={browsing()} onClick={() => setBrowsing(!browsing())}>
                {browsing() ? `Keep ${selected().name}` : 'Change'}
              </button>
            )}
          </Show>
        </>
      }
    >
      <Show when={!browsing() && selectedOption()} fallback={
        <Grid>
          <For each={props.options}>
            {(option) => (
              <li>
                {props.card(
                  option,
                  <ToggleButton pressed={props.selected === option.name} onClick={() => choose(option)} label={`Choose ${option.name}`}>
                    Select
                  </ToggleButton>,
                )}
              </li>
            )}
          </For>
        </Grid>
      }>
        {(selected) => props.card(selected())}
      </Show>
    </Section>
  )
}
