import { For } from 'solid-js'
import { assign, modify } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { ExperienceEditor } from '../../content/ExperienceEditor'
import { creationGuidance, experienceExamples, startingValues } from '../../data/srd/characterCreation'
import { Section, Toolbar } from '../../ui/layout'
import { Guidance } from '../Guidance'

export function ExperiencesStep() {
  const { character, change } = useCharacterSession()
  const add = (name: string) =>
    change(modify('experiences', (experiences) => [...experiences, { name, modifier: startingValues.experienceModifier }]))

  return (
    <>
      <Guidance text={creationGuidance.experiences} />
      <ExperienceEditor
        legend="Your Experiences"
        experiences={character().experiences}
        onChange={(experiences) => change(assign('experiences', experiences))}
      />
      <Section heading="Examples">
        <For each={Object.entries(experienceExamples)}>
          {([category, examples]) => (
            <Section heading={category}>
              <Toolbar aria-label={`${category} examples`}>
                <For each={examples}>
                  {(example) => (
                    <button type="button" onClick={() => add(example)}>
                      {example}
                    </button>
                  )}
                </For>
              </Toolbar>
            </Section>
          )}
        </For>
      </Section>
    </>
  )
}
