import { For, Show } from 'solid-js'
import { assign } from '../../character/changes'
import { useMode } from '../../character/mode'
import { useCharacterSession } from '../../character/session'
import { ExperienceEditor } from '../../content/ExperienceEditor'
import { formatModifier } from '../../content/format'
import { PromptListEditor } from '../../content/PromptListEditor'
import type { Prompt } from '../../types/app'
import { TextField } from '../../ui/fields'
import { DescriptionList, List, Section } from '../../ui/layout'

type PromptKey = 'appearance' | 'background' | 'connections'

const promptSections: readonly { key: PromptKey; heading: string; promptLabel: string }[] = [
  { key: 'appearance', heading: 'Description', promptLabel: 'Detail' },
  { key: 'background', heading: 'Background', promptLabel: 'Question' },
  { key: 'connections', heading: 'Connections', promptLabel: 'Question' },
]

function Answers(props: { prompts: readonly Prompt[] }) {
  return (
    <Show when={props.prompts.length} fallback={<p class="meta">Nothing yet.</p>}>
      <DescriptionList class="answers">
        <For each={props.prompts}>
          {({ prompt, response }) => (
            <>
              <dt>{prompt}</dt>
              <dd>{response}</dd>
            </>
          )}
        </For>
      </DescriptionList>
    </Show>
  )
}

export function StorySection() {
  const { character, change } = useCharacterSession()
  const mode = useMode()

  return (
    <>
      <Section heading="Experiences">
        <Show
          when={mode() === 'edit'}
          fallback={
            <List>
              <For each={character().experiences} fallback={<li class="meta">No Experiences yet.</li>}>
                {(experience) => (
                  <li>
                    {experience.name} {formatModifier(experience.modifier)}
                  </li>
                )}
              </For>
            </List>
          }
        >
          <ExperienceEditor
            legend="Experiences"
            experiences={character().experiences}
            onChange={(experiences) => change(assign('experiences', experiences))}
          />
        </Show>
      </Section>
      <Show when={mode() === 'edit'}>
        <TextField label="Pronouns" value={character().pronouns} onChange={(pronouns) => change(assign('pronouns', pronouns))} />
      </Show>
      <For each={promptSections}>
        {({ key, heading, promptLabel }) => (
          <Section heading={heading}>
            <Show when={mode() === 'edit'} fallback={<Answers prompts={character()[key]} />}>
              <PromptListEditor
                legend={heading}
                promptLabel={promptLabel}
                prompts={character()[key]}
                onChange={(prompts) => change(assign(key, prompts))}
              />
            </Show>
          </Section>
        )}
      </For>
      <Section heading="Notes">
        <Show when={mode() !== 'print'} fallback={<p class="notes">{character().notes}</p>}>
          <TextField label="Notes" multiline value={character().notes} onChange={(notes) => change(assign('notes', notes))} />
        </Show>
      </Section>
    </>
  )
}
