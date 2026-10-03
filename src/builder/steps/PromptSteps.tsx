import { assign } from '../../character/changes'
import { useCharacterSession } from '../../character/session'
import { PromptListEditor } from '../../content/PromptListEditor'
import { srd } from '../../data/srd'
import { creationGuidance } from '../../data/srd/characterCreation'
import { findByName } from '../../data/srd/lookup'
import type { CharacterClass } from '../../types/srd'
import { Guidance } from '../Guidance'

type PromptStepProps = {
  list: 'background' | 'connections'
  legend: string
  guidance: string
  questionsOf: (characterClass: CharacterClass) => readonly string[]
}

function PromptStep(props: PromptStepProps) {
  const { character, change } = useCharacterSession()
  const suggested = () => {
    const characterClass = findByName(srd.classes.entries, character().classes[0]?.name)
    return characterClass ? props.questionsOf(characterClass) : []
  }

  return (
    <>
      <Guidance text={props.guidance} />
      <PromptListEditor
        legend={props.legend}
        promptLabel="Question"
        prompts={character()[props.list]}
        suggestedPrompts={suggested()}
        onChange={(prompts) => change(assign(props.list, prompts))}
      />
    </>
  )
}

export function BackgroundStep() {
  return (
    <PromptStep
      list="background"
      legend="Background questions"
      guidance={creationGuidance.background}
      questionsOf={(characterClass) => characterClass.backgroundQuestions}
    />
  )
}

export function ConnectionsStep() {
  return (
    <PromptStep
      list="connections"
      legend="Connections"
      guidance={creationGuidance.connections}
      questionsOf={(characterClass) => characterClass.connectionQuestions}
    />
  )
}
