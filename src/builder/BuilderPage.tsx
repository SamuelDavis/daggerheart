import { A, useParams } from '@solidjs/router'
import { createMemo, For, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { paths, useCharacterName } from '../app/paths'
import { LoadCharacter } from '../character/LoadCharacter'
import { ModeContext } from '../character/mode'
import { useCharacterSession } from '../character/session'
import { warningsFor } from '../character/warnings'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Page, Section, Split } from '../ui/layout'
import { stepsFor, type BuildStep } from './steps'
import './builder.css'

function StepStatus(props: { step: BuildStep; warnings: number; complete: boolean }) {
  return (
    <span class="step-status" data-status={props.warnings ? 'attention' : props.complete ? 'complete' : 'incomplete'}>
      <span class="visually-hidden">
        {props.warnings ? `(${props.warnings} to review)` : props.complete ? '(complete)' : '(not started)'}
      </span>
    </span>
  )
}

function Builder(props: { stepId?: string }) {
  const { character } = useCharacterSession()
  const steps = createMemo(() => stepsFor(character()))
  const index = createMemo(() => Math.max(0, steps().findIndex(({ id }) => id === props.stepId)))
  const step = () => steps()[index()]
  const warnings = createMemo(() => warningsFor(character()))
  const warningsOf = (step: BuildStep) => warnings().filter(({ topic }) => topic === step.topic)
  const neighbor = (offset: number) => steps()[index() + offset]

  return (
    <Page
      heading={character().name}
      actions={
        <A href={paths.character(character().name)} class="button">
          Done
        </A>
      }
    >
      <Split class="builder">
        <nav aria-label="Character creation steps" class="stepper">
          <ol>
            <For each={steps()}>
              {(each, position) => (
                <li>
                  <A
                    href={paths.build(character().name, each.id)}
                    aria-current={each === step() ? 'step' : undefined}
                  >
                    <span class="step-number">{position() + 1}</span>
                    {each.title}
                    <StepStatus
                      step={each}
                      warnings={warningsOf(each).length}
                      complete={each.isComplete(character())}
                    />
                  </A>
                </li>
              )}
            </For>
          </ol>
        </nav>
        <Section heading={step().title} class="build-step">
          <Show when={warningsOf(step()).length}>
            <aside class="warnings" aria-label="Things to review">
              <ul>
                <For each={warningsOf(step())}>{(warning) => <li>{warning.message}</li>}</For>
              </ul>
            </aside>
          </Show>
          <Dynamic component={step().component} />
          <nav aria-label="Previous and next step" class="pager cluster">
            <Show when={neighbor(-1)}>
              {(previous) => (
                <A href={paths.build(character().name, previous().id)} rel="prev" class="button">
                  ← {previous().title}
                </A>
              )}
            </Show>
            <Show
              when={neighbor(1)}
              fallback={
                <A href={paths.character(character().name)} class="button">
                  Finish
                </A>
              }
            >
              {(next) => (
                <A href={paths.build(character().name, next().id)} rel="next" class="button">
                  {next().title} →
                </A>
              )}
            </Show>
          </nav>
        </Section>
      </Split>
    </Page>
  )
}

export function BuilderPage() {
  const name = useCharacterName()
  const params = useParams<{ step?: string }>()
  return (
    <LoadCharacter name={name()} fallback={<NotFoundPage />}>
      <ModeContext.Provider value={() => 'edit'}>
        <Builder stepId={params.step} />
      </ModeContext.Provider>
    </LoadCharacter>
  )
}
