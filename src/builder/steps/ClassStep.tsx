import { For, Show } from 'solid-js'
import { chooseClass, chooseSubclass, replace } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { ClassCard, SubclassCard } from '../../content/ContentCards'
import { FeatureView } from '../../content/FeatureView'
import { srd } from '../../data/srd'
import { creationGuidance } from '../../data/srd/characterCreation'
import { findAllByName, findByName } from '../../data/srd/lookup'
import { Grid, List, Section } from '../../ui/layout'
import { ToggleButton } from '../../ui/ToggleButton'
import { Guidance } from '../Guidance'

export function ClassStep() {
  const { character, change } = useCharacterSession()
  const progress = () => character().classes[0]
  const definition = () => findByName(srd.classes.entries, progress()?.name)
  const editField = (field: object, next: object) => change(replace(field, next))

  return (
    <>
      <Guidance text={creationGuidance.class} />
      <Section heading="Class">
        <Grid>
          <For each={srd.classes.entries}>
            {(characterClass) => (
              <li>
                <ClassCard
                  characterClass={characterClass}
                  actions={
                    <ToggleButton
                      pressed={progress()?.name === characterClass.name}
                      onClick={() => change(chooseClass(characterClass))}
                      label={`Choose ${characterClass.name}`}
                    >
                      Select
                    </ToggleButton>
                  }
                />
              </li>
            )}
          </For>
        </Grid>
      </Section>
      <Show when={definition()}>
        {(characterClass) => (
          <Section heading={`${characterClass().name} subclass`}>
            <Grid>
              <For each={findAllByName(srd.subclasses.entries, characterClass().subclasses)}>
                {(subclass) => (
                  <li>
                    <SubclassCard
                      subclass={subclass}
                      actions={
                        <ToggleButton
                          pressed={progress()?.subclass?.name === subclass.name}
                          onClick={() => change(chooseSubclass(subclass))}
                          label={`Choose ${subclass.name}`}
                        >
                          Select
                        </ToggleButton>
                      }
                    />
                  </li>
                )}
              </For>
            </Grid>
          </Section>
        )}
      </Show>
      <Show when={progress()}>
        {(chosen) => (
          <Section heading="Your class features">
            <p>Make any selections your features ask for. You can change these values on your sheet at any time.</p>
            <List>
              <Show when={chosen().hopeFeature}>
                {(hopeFeature) => (
                  <li>
                    <FeatureView feature={hopeFeature()} label="Hope feature" onFieldChange={editField} />
                  </li>
                )}
              </Show>
              <For each={chosen().features}>
                {(feature) => (
                  <li>
                    <FeatureView feature={feature} label="Class feature" onFieldChange={editField} />
                  </li>
                )}
              </For>
              <For each={chosen().subclass?.foundation}>
                {(feature) => (
                  <li>
                    <FeatureView feature={feature} label={`${chosen().subclass?.name} foundation`} onFieldChange={editField} />
                  </li>
                )}
              </For>
            </List>
          </Section>
        )}
      </Show>
    </>
  )
}
