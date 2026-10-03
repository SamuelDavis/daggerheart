import { For, Show } from 'solid-js'
import { modify, replace } from '../../character/changes'
import { useMode } from '../../character/mode'
import { useCharacterSession } from '../../character/session'
import { blankFeature } from '../../content/editors/FeatureEditor'
import { FeatureView } from '../../content/FeatureView'
import { removeAt } from '../../lib/immutable'
import type { Feature } from '../../types/srd'
import { List, Section } from '../../ui/layout'

type Labeled = { feature: Feature; label: string }

function FeatureList(props: { features: readonly Labeled[]; onRemove?: (feature: Feature) => void }) {
  const { change } = useCharacterSession()
  const mode = useMode()
  const replaceWith = (target: object, next: object) => change(replace(target, next))

  return (
    <List>
      <For each={props.features}>
        {({ feature, label }) => (
          <li class="stack">
            <FeatureView feature={feature} label={label} onFieldChange={replaceWith} onChange={(next) => replaceWith(feature, next)} />
            <Show when={mode() === 'edit' && props.onRemove}>
              {(onRemove) => (
                <div>
                  <button type="button" onClick={() => onRemove()(feature)}>
                    Remove {feature.name}
                  </button>
                </div>
              )}
            </Show>
          </li>
        )}
      </For>
    </List>
  )
}

const labeled = (features: readonly Feature[] | undefined, label: string): Labeled[] =>
  (features ?? []).map((feature) => ({ feature, label }))

export function FeaturesSection() {
  const { character, change } = useCharacterSession()
  const mode = useMode()
  const heritage = () =>
    [character().heritage.ancestry, character().heritage.community, character().heritage.transformation].flatMap((option) =>
      option ? labeled(option.features, option.name) : [],
    )

  return (
    <>
      <For each={character().classes}>
        {(progress, index) => (
          <Section heading={index() === 0 ? progress.name : `${progress.name} (multiclass)`}>
            <FeatureList
              features={[
                ...(progress.hopeFeature ? labeled([progress.hopeFeature], 'Hope feature') : []),
                ...labeled(progress.features, 'Class feature'),
                ...labeled(progress.subclass?.foundation, `${progress.subclass?.name} foundation`),
                ...labeled(progress.subclass?.specialization, `${progress.subclass?.name} specialization`),
                ...labeled(progress.subclass?.mastery, `${progress.subclass?.name} mastery`),
              ]}
            />
          </Section>
        )}
      </For>
      <Show when={heritage().length}>
        <Section heading="Heritage">
          <FeatureList features={heritage()} />
        </Section>
      </Show>
      <Section
        heading="Other features"
        actions={
          <Show when={mode() === 'edit'}>
            <button type="button" onClick={() => change(modify('features', (features) => [...features, blankFeature()]))}>
              Add custom feature
            </button>
          </Show>
        }
      >
        <Show when={character().features.length} fallback={<p class="meta">Grants, boons, and anything else your character gains.</p>}>
          <FeatureList
            features={labeled(character().features, '')}
            onRemove={(feature) =>
              change(
                modify('features', (features) => removeAt(features, features.indexOf(feature))),
                `Removed ${feature.name}`,
              )
            }
          />
        </Show>
      </Section>
    </>
  )
}
