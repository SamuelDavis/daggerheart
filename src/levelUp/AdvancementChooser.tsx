import { createSignal, For, Match, Show, Switch } from 'solid-js'
import type { Change } from '../character/changes'
import { advancementEffects, domainCardLimit, nextSubclassRank } from '../character/levelUp'
import { useCharacterSession } from '../character/session'
import { DomainCardCard } from '../content/EntityCards'
import { srd } from '../data/srd'
import { findAllByName, findByName } from '../data/srd/lookup'
import { traitNames, type TraitName } from '../data/srd/traits'
import type { AdvancementKind } from '../types/srd'
import { SelectField } from '../ui/fields'
import { Fieldset } from '../ui/form'
import { Grid } from '../ui/layout'

export type Choice = { detail: string; effect: Change }

type Props = { level: number; onChoose: (choice: Choice) => void }

const simple: Partial<Record<AdvancementKind, Choice>> = {
  hitPoints: { detail: 'One Hit Point slot', effect: advancementEffects.hitPoints },
  stress: { detail: 'One Stress slot', effect: advancementEffects.stress },
  evasion: { detail: '+1 Evasion', effect: advancementEffects.evasion },
  proficiency: { detail: '+1 Proficiency', effect: advancementEffects.proficiency },
}

function PickTwo<Value>(props: {
  legend: string
  options: readonly { value: Value; label: string; disabled?: boolean }[]
  onConfirm: (values: Value[]) => void
}) {
  const [picked, setPicked] = createSignal<Value[]>([])
  const toggle = (value: Value) =>
    setPicked((current) => (current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]))

  return (
    <Fieldset legend={props.legend}>
      <For each={props.options}>
        {(option) => (
          <label class="checkbox">
            <input
              type="checkbox"
              disabled={option.disabled}
              checked={picked().includes(option.value)}
              onChange={() => toggle(option.value)}
            />
            {option.label}
          </label>
        )}
      </For>
      <div>
        <button type="button" disabled={picked().length !== 2} onClick={() => props.onConfirm(picked())}>
          Confirm
        </button>
      </div>
    </Fieldset>
  )
}

function TraitChoice(props: Props) {
  const { character } = useCharacterSession()
  return (
    <PickTwo
      legend="Choose two unmarked traits"
      options={traitNames.map((trait) => ({
        value: trait,
        label: `${trait}${character().traits[trait].marked ? ' (marked)' : ''}`,
        disabled: character().traits[trait].marked,
      }))}
      onConfirm={(traits: TraitName[]) =>
        props.onChoose({ detail: traits.join(', '), effect: advancementEffects.traits(traits) })
      }
    />
  )
}

function ExperienceChoice(props: Props) {
  const { character } = useCharacterSession()
  return (
    <PickTwo
      legend="Choose two Experiences"
      options={character().experiences.map((experience, index) => ({ value: index, label: experience.name || 'Unnamed Experience' }))}
      onConfirm={(indices: number[]) =>
        props.onChoose({
          detail: indices.map((index) => character().experiences[index]?.name).join(', '),
          effect: advancementEffects.experiences(indices),
        })
      }
    />
  )
}

export function EligibleDomainCards(props: { level: number; onTake: (card: (typeof srd.domainCards.entries)[number]) => void }) {
  const { character } = useCharacterSession()
  const [showAll, setShowAll] = createSignal(false)
  const eligible = () =>
    srd.domainCards.entries.filter(
      (card) =>
        !character().domainCards.some(({ name }) => name === card.name) &&
        (showAll() || card.level <= domainCardLimit(character(), props.level, card.domain)),
    )

  return (
    <>
      <label class="checkbox">
        <input type="checkbox" checked={showAll()} onChange={(event) => setShowAll(event.currentTarget.checked)} />
        Show every domain and level
      </label>
      <Grid>
        <For each={eligible()}>
          {(card) => (
            <li>
              <DomainCardCard
                card={card}
                actions={
                  <button type="button" onClick={() => props.onTake(card)}>
                    Take
                  </button>
                }
              />
            </li>
          )}
        </For>
      </Grid>
    </>
  )
}

function SubclassChoice(props: Props) {
  const { character } = useCharacterSession()
  const upgradable = () =>
    character()
      .classes.map((progress, index) => ({ progress, index, rank: nextSubclassRank(progress) }))
      .filter(({ rank, progress }) => rank && progress.subclass)

  return (
    <For each={upgradable()}>
      {({ progress, index, rank }) => (
        <button
          type="button"
          onClick={() => props.onChoose({ detail: `${progress.subclass?.name} ${rank}`, effect: advancementEffects.subclass(index) })}
        >
          Take the {progress.subclass?.name} {rank}
        </button>
      )}
    </For>
  )
}

function MulticlassChoice(props: Props) {
  const { character } = useCharacterSession()
  const others = () => srd.classes.entries.filter(({ name }) => !character().classes.some((progress) => progress.name === name))
  const [className, setClassName] = createSignal(others()[0]?.name ?? '')
  const characterClass = () => findByName(srd.classes.entries, className())
  const [domain, setDomain] = createSignal('')
  const [subclassName, setSubclassName] = createSignal('')
  const subclass = () => findByName(srd.subclasses.entries, subclassName())
  const chooseClass = (name: string) => {
    setClassName(name)
    setDomain(findByName(srd.classes.entries, name)?.domains[0] ?? '')
    setSubclassName(findByName(srd.classes.entries, name)?.subclasses[0] ?? '')
  }
  chooseClass(className())

  return (
    <Show when={characterClass()}>
      {(chosen) => (
        <div class="stack">
          <SelectField label="Class" value={className()} options={others().map(({ name }) => name)} onChange={chooseClass} />
          <SelectField label="Domain" value={domain()} options={chosen().domains} onChange={setDomain} />
          <SelectField
            label="Subclass foundation"
            value={subclassName()}
            options={findAllByName(srd.subclasses.entries, chosen().subclasses).map(({ name }) => name)}
            onChange={setSubclassName}
          />
          <div>
            <button
              type="button"
              disabled={!subclass() || !domain()}
              onClick={() =>
                props.onChoose({
                  detail: `${chosen().name} (${domain()}, ${subclassName()})`,
                  effect: advancementEffects.multiclass(chosen(), domain(), subclass()!),
                })
              }
            >
              Multiclass into {chosen().name}
            </button>
          </div>
        </div>
      )}
    </Show>
  )
}

export function AdvancementChooser(props: Props & { kind: AdvancementKind }) {
  return (
    <Switch>
      <Match when={simple[props.kind]}>
        {(choice) => (
          <button type="button" onClick={() => props.onChoose(choice())}>
            Confirm: {choice().detail}
          </button>
        )}
      </Match>
      <Match when={props.kind === 'traits'}>
        <TraitChoice {...props} />
      </Match>
      <Match when={props.kind === 'experiences'}>
        <ExperienceChoice {...props} />
      </Match>
      <Match when={props.kind === 'domainCard'}>
        <EligibleDomainCards level={props.level} onTake={(card) => props.onChoose({ detail: card.name, effect: advancementEffects.domainCard(card) })} />
      </Match>
      <Match when={props.kind === 'subclass'}>
        <SubclassChoice {...props} />
      </Match>
      <Match when={props.kind === 'multiclass'}>
        <MulticlassChoice {...props} />
      </Match>
    </Switch>
  )
}
