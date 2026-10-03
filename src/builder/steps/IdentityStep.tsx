import { paths } from '../../app/paths'
import { assign } from '../../character/changes'
import { NameField } from '../../character/NameField'
import { useCharacterSession } from '../../character/session'
import { descriptionPromptsFor } from '../../content/descriptionPrompts'
import { PromptListEditor } from '../../content/PromptListEditor'
import { creationGuidance } from '../../data/srd/characterCreation'
import { TextField } from '../../ui/fields'
import { Section } from '../../ui/layout'
import { Guidance } from '../Guidance'

export function IdentityStep() {
  const { character, change } = useCharacterSession()
  const prompts = () => descriptionPromptsFor(character().classes[0]?.name)

  return (
    <>
      <Guidance text={creationGuidance.identity} />
      <Section heading="Who are you?">
        <NameField pathFor={(name) => paths.build(name, 'identity')} />
        <TextField label="Pronouns" value={character().pronouns} onChange={(pronouns) => change(assign('pronouns', pronouns))} />
      </Section>
      <PromptListEditor
        legend="Character description"
        promptLabel="Detail"
        prompts={character().appearance}
        suggestedPrompts={prompts().map(({ prompt }) => prompt)}
        responseSuggestions={(prompt) => prompts().find((entry) => entry.prompt === prompt)?.suggestions}
        onChange={(appearance) => change(assign('appearance', appearance))}
      />
    </>
  )
}
