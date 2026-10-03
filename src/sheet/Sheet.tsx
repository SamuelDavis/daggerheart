import { useLocation } from '@solidjs/router'
import { For, Show, type Component } from 'solid-js'
import { useMode } from '../character/mode'
import { useCharacterSession } from '../character/session'
import { ArmorList } from '../equipment/ArmorList'
import { GoldControl } from '../equipment/GoldControl'
import { InventoryList } from '../equipment/InventoryList'
import { WeaponList } from '../equipment/WeaponList'
import { Section } from '../ui/layout'
import { CardsSection } from './sections/CardsSection'
import { CompanionSection, hasCompanion } from './sections/CompanionSection'
import { CoreSection } from './sections/CoreSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { StorySection } from './sections/StorySection'
import './sheet.css'

type SheetSection = { id: string; title: string; component: Component; wide?: boolean; when?: (root: unknown) => boolean }

const sections: readonly SheetSection[] = [
  { id: 'core', title: 'Core', component: CoreSection, wide: true },
  {
    id: 'combat',
    title: 'Combat',
    component: () => (
      <>
        <WeaponList />
        <ArmorList />
      </>
    ),
  },
  { id: 'cards', title: 'Domain cards', component: CardsSection },
  { id: 'features', title: 'Features', component: FeaturesSection },
  {
    id: 'inventory',
    title: 'Inventory',
    component: () => (
      <>
        <InventoryList />
        <GoldControl />
      </>
    ),
  },
  { id: 'story', title: 'Story', component: StorySection },
  { id: 'companion', title: 'Companion', component: CompanionSection, when: hasCompanion },
]

export function Sheet() {
  const { character } = useCharacterSession()
  const mode = useMode()
  const location = useLocation()
  const visible = () => sections.filter(({ when }) => !when || when(character()))
  const active = () => visible().find(({ id }) => `#${id}` === location.hash)?.id ?? visible()[0].id

  return (
    <div class="sheet stack">
      <Show when={mode() !== 'print'}>
        <nav class="sheet-tabs" aria-label="Sheet sections" data-print="hidden">
          <ul class="cluster">
            <For each={visible()}>
              {({ id, title }) => (
                <li>
                  <a href={`#${id}`} aria-current={active() === id ? 'true' : undefined}>
                    {title}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </Show>
      <div class="sheet-sections">
        <For each={visible()}>
          {(section) => (
            <Section
              id={section.id}
              heading={section.title}
              class={section.wide ? 'wide' : undefined}
              data-active={mode() === 'print' || active() === section.id}
            >
              <section.component />
            </Section>
          )}
        </For>
      </div>
    </div>
  )
}
