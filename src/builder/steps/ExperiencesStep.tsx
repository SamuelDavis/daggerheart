import { For } from 'solid-js'
import { assign, modify } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { ExperienceEditor } from '../../content/ExperienceEditor'
import { creationGuidance, experienceExamples, startingValues } from '../../data/srd/characterCreation'
import { Section } from '../../ui/layout'
import { Suggestions } from '../../ui/Suggestions'
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
      <Section heading="Suggestions">
        <For each={Object.entries(experienceExamples)}>
          {([category, examples]) => (
            <Suggestions
              label={category}
              options={examples.filter((example) => !character().experiences.some(({ name }) => name === example))}
              onPick={add}
            />
          )}
        </For>
      </Section>
    </>
  )
}
