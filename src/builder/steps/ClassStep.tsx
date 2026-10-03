import { For, Show } from 'solid-js'
import { chooseClass, chooseSubclass, replace } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { ClassCard, SubclassCard } from '../../content/ContentCards'
import { FeatureView } from '../../content/FeatureView'
import { srd } from '../../data/srd'
import { creationGuidance } from '../../data/srd/characterCreation'
import { findAllByName, findByName } from '../../data/srd/lookup'
import { List, Section } from '../../ui/layout'
import { Chooser } from '../Chooser'
import { Guidance } from '../Guidance'

export function ClassStep() {
  const { character, change } = useCharacterSession()
  const progress = () => character().classes[0]
  const definition = () => findByName(srd.classes.entries, progress()?.name)
  const editField = (field: object, next: object) => change(replace(field, next))

  return (
    <>
      <Guidance text={creationGuidance.class} />
      <Chooser
        id="choose-class"
        heading="Class"
        options={srd.classes.entries}
        selected={progress()?.name}
        onSelect={(characterClass) => change(chooseClass(characterClass))}
        card={(characterClass, actions) => <ClassCard characterClass={characterClass} actions={actions} />}
      />
      <Show when={definition()}>
        {(characterClass) => (
          <Chooser
            id="choose-subclass"
            heading={`${characterClass().name} subclass`}
            options={findAllByName(srd.subclasses.entries, characterClass().subclasses)}
            selected={progress()?.subclass?.name}
            onSelect={(subclass) => change(chooseSubclass(subclass))}
            card={(subclass, actions) => <SubclassCard subclass={subclass} actions={actions} />}
          />
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
                    <FeatureView feature={hopeFeature()} label="Hope feature" onFieldChange={editField} setup />
                  </li>
                )}
              </Show>
              <For each={chosen().features}>
                {(feature) => (
                  <li>
                    <FeatureView feature={feature} label="Class feature" onFieldChange={editField} setup />
                  </li>
                )}
              </For>
              <For each={chosen().subclass?.foundation}>
                {(feature) => (
                  <li>
                    <FeatureView feature={feature} label={`${chosen().subclass?.name} foundation`} onFieldChange={editField} setup />
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
