import { createSignal, For, Show } from 'solid-js'
import { toggleDomainCard } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { DomainCardCard } from '../../content/EntityCards'
import { srd } from '../../data/srd'
import { creationGuidance } from '../../data/srd/characterCreation'
import { Grid, Section } from '../../ui/layout'
import { ToggleButton } from '../../ui/ToggleButton'
import { Guidance } from '../Guidance'

export function DomainCardsStep() {
  const { character, change } = useCharacterSession()
  const [allLevels, setAllLevels] = createSignal(false)
  const domains = () => [...new Set(character().classes.flatMap((progress) => progress.domains))]
  const cardsIn = (domain: string) =>
    srd.domainCards.entries.filter((card) => card.domain === domain && (allLevels() || card.level <= character().level))
  const owned = (name: string) => character().domainCards.some((card) => card.name === name)

  return (
    <>
      <Guidance text={creationGuidance.domainCards} />
      <Show when={domains().length} fallback={<p>Choose a class first; your class determines your domains.</p>}>
        <p>
          {character().domainCards.length} chosen ·{' '}
          <label class="checkbox">
            <input type="checkbox" checked={allLevels()} onChange={(event) => setAllLevels(event.currentTarget.checked)} />
            Show cards above your level
          </label>
        </p>
        <For each={domains()}>
          {(domain) => (
            <Section heading={domain} data-domain={domain}>
              <Grid>
                <For each={cardsIn(domain)}>
                  {(card) => (
                    <li>
                      <DomainCardCard
                        card={card}
                        actions={
                          <ToggleButton pressed={owned(card.name)} onClick={() => change(toggleDomainCard(card))} label={`Take ${card.name}`}>
                            Take
                          </ToggleButton>
                        }
                      />
                    </li>
                  )}
                </For>
              </Grid>
            </Section>
          )}
        </For>
      </Show>
    </>
  )
}
