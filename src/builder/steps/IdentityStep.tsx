import { For } from 'solid-js'
import { paths } from '../../app/paths'
import { assign, setPrompt } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { NameField } from '../../character/NameField'
import { srd } from '../../data/srd'
import { creationGuidance } from '../../data/srd/characterCreation'
import { findByName } from '../../data/srd/lookup'
import type { DescriptionPrompt } from '../../types/srd'
import { Field } from '../../ui/form'
import { Section } from '../../ui/layout'
import { SuggestionInput } from '../../ui/SuggestionInput'
import { Guidance } from '../Guidance'

const sharedPrompts = (): readonly DescriptionPrompt[] => {
  const all = srd.guides.entries.flatMap(({ descriptionPrompts }) => descriptionPrompts)
  return [...new Set(all.map(({ prompt }) => prompt))].map((prompt) => ({
    prompt,
    suggestions: [...new Set(all.filter((entry) => entry.prompt === prompt).flatMap(({ suggestions }) => suggestions))],
  }))
}

export function IdentityStep() {
  const { character, change } = useCharacterSession()
  const prompts = () => findByName(srd.guides.entries, character().classes[0]?.name)?.descriptionPrompts ?? sharedPrompts()
  const responseTo = (prompt: string) => character().appearance.find((entry) => entry.prompt === prompt)?.response ?? ''

  return (
    <>
      <Guidance text={creationGuidance.identity} />
      <Section heading="Who are you?">
        <NameField pathFor={(name) => paths.build(name, 'identity')} />
        <Field label="Pronouns">
          {(control) => (
            <input {...control} value={character().pronouns} onChange={(event) => change(assign('pronouns', event.currentTarget.value))} />
          )}
        </Field>
      </Section>
      <Section heading="Character description">
        <p>Choose one (or more) from each line, or write your own description.</p>
        <For each={prompts()}>
          {({ prompt, suggestions }) => (
            <Field label={prompt}>
              {(control) => (
                <SuggestionInput
                  {...control}
                  value={responseTo(prompt)}
                  suggestions={suggestions}
                  onChange={(response) => change(setPrompt('appearance', prompt, response))}
                />
              )}
            </Field>
          )}
        </For>
      </Section>
    </>
  )
}
