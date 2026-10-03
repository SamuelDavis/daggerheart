import { createSignal, For } from 'solid-js'
import { setPrompt } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { srd } from '../../data/srd'
import { creationGuidance } from '../../data/srd/characterCreation'
import { findByName } from '../../data/srd/lookup'
import type { CharacterClass } from '../../types/srd'
import { Field } from '../../ui/form'
import { List, Section } from '../../ui/layout'
import { Guidance } from '../Guidance'

type PromptStepProps = {
  list: 'background' | 'connections'
  guidance: string
  questionsOf: (characterClass: CharacterClass) => readonly string[]
}

function PromptStep(props: PromptStepProps) {
  const { character, change } = useCharacterSession()
  const [custom, setCustom] = createSignal('')
  const suggested = () => {
    const characterClass = findByName(srd.classes.entries, character().classes[0]?.name)
    return characterClass ? props.questionsOf(characterClass) : []
  }
  const prompts = () => [
    ...new Set([...suggested(), ...character()[props.list].map(({ prompt }) => prompt), ...(custom() ? [custom()] : [])]),
  ]
  const responseTo = (prompt: string) => character()[props.list].find((entry) => entry.prompt === prompt)?.response ?? ''

  return (
    <>
      <Guidance text={props.guidance} />
      <Section heading="Questions">
        <List>
          <For each={prompts()}>
            {(prompt) => (
              <li>
                <Field label={prompt}>
                  {(control) => (
                    <textarea
                      {...control}
                      value={responseTo(prompt)}
                      onChange={(event) => change(setPrompt(props.list, prompt, event.currentTarget.value.trim()))}
                    />
                  )}
                </Field>
              </li>
            )}
          </For>
        </List>
        <form
          class="row"
          onSubmit={(event) => {
            event.preventDefault()
            const input = event.currentTarget.elements.namedItem('question') as HTMLInputElement
            setCustom(input.value.trim())
            input.value = ''
          }}
        >
          <Field label="Your own question">{(control) => <input {...control} name="question" />}</Field>
          <button type="submit">Add question</button>
        </form>
      </Section>
    </>
  )
}

export function BackgroundStep() {
  return (
    <PromptStep
      list="background"
      guidance={creationGuidance.background}
      questionsOf={(characterClass) => characterClass.backgroundQuestions}
    />
  )
}

export function ConnectionsStep() {
  return (
    <PromptStep
      list="connections"
      guidance={creationGuidance.connections}
      questionsOf={(characterClass) => characterClass.connectionQuestions}
    />
  )
}
