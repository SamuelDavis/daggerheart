import { createSignal, For, Show, type JSX } from 'solid-js'
import { replace } from '../character/changes'
import { fieldsOfKind } from '../character/fields'
import {
  achievementAt,
  advancementsPerLevel,
  advancementsSpent,
  applyAchievements,
  beginLevel,
  chooseAdvancement,
  levelUpAt,
  raiseThresholds,
  removeAdvancement,
  slotsUsed,
  takeLevelCard,
  trainCompanion,
  unavailableBecause,
} from '../character/levelUp'
import { tierOf } from '../character/rules'
import { useCharacterSession } from '../character/session'
import { FeatureView } from '../content/FeatureView'
import { formatThresholds } from '../content/format'
import { RichText } from '../content/RichText'
import { srd } from '../data/srd'
import { levelUpGuidance } from '../data/srd/advancements'
import type { LevelUpTask } from '../types/app'
import type { AdvancementOption, Feature } from '../types/srd'
import { Card, Grid, List, Section } from '../ui/layout'
import { AdvancementChooser, EligibleDomainCards } from './AdvancementChooser'
import './levelUp.css'

const mentionsLevels = (level: number) => new RegExp(`level up|leveling up|at level ${level}\\b`, 'i')

const featuresOf = (root: unknown): Feature[] => {
  if (Array.isArray(root)) return root.flatMap(featuresOf)
  if (!root || typeof root !== 'object') return []
  const own = 'text' in root && 'name' in root && typeof root.text === 'string' ? [root as Feature] : []
  return [...own, ...Object.values(root).flatMap(featuresOf)]
}

function Done(props: { children: string }) {
  return <p class="done">✓ {props.children}</p>
}

function Task(props: { heading: string; guidance: string; children: JSX.Element }) {
  return (
    <Section heading={props.heading}>
      <RichText text={props.guidance} />
      {props.children}
    </Section>
  )
}

function OptionCard(props: { level: number; tier: number; option: AdvancementOption }) {
  const { character, change } = useCharacterSession()
  const [choosing, setChoosing] = createSignal(false)
  const blocked = () => unavailableBecause(character(), props.level, props.tier, props.option)
  const used = () => slotsUsed(character(), props.tier, props.option.kind)

  return (
    <Card
      heading={props.option.text}
      actions={
        <button type="button" disabled={Boolean(blocked())} aria-expanded={choosing()} onClick={() => setChoosing(!choosing())}>
          Choose
        </button>
      }
    >
      <p class="meta">
        {used()} of {props.option.slots} slots marked{props.option.cost > 1 ? ` · uses ${props.option.cost} advancements` : ''}
        <Show when={blocked()}>{(reason) => ` · ${reason()}`}</Show>
      </p>
      <Show when={choosing() && !blocked()}>
        <AdvancementChooser
          kind={props.option.kind}
          level={props.level}
          onChoose={({ detail, effect }) => {
            change(chooseAdvancement(props.level, props.tier, props.option.kind, detail, effect))
            setChoosing(false)
          }}
        />
      </Show>
    </Card>
  )
}

function Advancements(props: { level: number }) {
  const { character, change } = useCharacterSession()
  const entry = () => levelUpAt(character(), props.level)
  const remaining = () => advancementsPerLevel - advancementsSpent(character(), props.level)
  const tiers = () => srd.advancementTiers.entries.filter(({ tier }) => tier <= tierOf(props.level))

  return (
    <Section heading={`Advancements (${remaining()} of ${advancementsPerLevel} left)`}>
      <RichText text={levelUpGuidance.advancements} />
      <Show when={entry()?.advancements.length}>
        <List aria-label="Chosen this level">
          <For each={entry()?.advancements}>
            {(advancement, index) => (
              <li class="row">
                <span>
                  ✓ Tier {advancement.tier}: {advancement.detail || advancement.kind}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    change(
                      removeAdvancement(props.level, index()),
                      'Removed the mark. Adjust any numbers it changed on your sheet.',
                    )
                  }
                >
                  Remove mark
                </button>
              </li>
            )}
          </For>
        </List>
      </Show>
      <For each={tiers()}>
        {(tier) => (
          <Section heading={tier.name}>
            <Grid>
              <For each={tier.options}>
                {(option) => (
                  <li>
                    <OptionCard level={props.level} tier={tier.tier} option={option} />
                  </li>
                )}
              </For>
            </Grid>
          </Section>
        )}
      </For>
    </Section>
  )
}

function CompanionTraining(props: { level: number }) {
  const { character, change } = useCharacterSession()
  return (
    <For each={fieldsOfKind(character(), 'companion')}>
      {(field) => (
        <Task heading="Companion training" guidance={levelUpGuidance.companion}>
          <Show when={field.value.training.length}>
            <p class="meta">Already trained: {field.value.training.join(', ')}</p>
          </Show>
          <Grid>
            <For each={srd.companionTraining.entries}>
              {(option) => (
                <li>
                  <Card
                    heading={option.name}
                    actions={
                      <button
                        type="button"
                        onClick={() =>
                          change(
                            trainCompanion(
                              props.level,
                              replace(field, { ...field, value: { ...field.value, training: [...field.value.training, option.name] } }),
                            ),
                          )
                        }
                      >
                        Choose
                      </button>
                    }
                  >
                    <RichText text={option.text} />
                  </Card>
                </li>
              )}
            </For>
          </Grid>
        </Task>
      )}
    </For>
  )
}

export function LevelUpFlow(props: { level: number; includeThresholds: boolean }) {
  const { character, change } = useCharacterSession()
  const entry = () => levelUpAt(character(), props.level)
  const done = (task: LevelUpTask) => entry()?.done.includes(task) ?? false
  const achievement = () => achievementAt(props.level)
  const revisit = () =>
    featuresOf([character().classes, character().heritage, character().features]).filter(({ text }) =>
      mentionsLevels(props.level).test(text),
    )

  return (
    <Show
      when={entry()}
      fallback={
        <Section heading={`Level ${props.level}`}>
          <p>
            Level {props.level} is in tier {tierOf(props.level)}. Beginning records this level so you can mark its choices.
          </p>
          <div>
            <button type="button" onClick={() => change(beginLevel(props.level))}>
              Begin level {props.level}
            </button>
          </div>
        </Section>
      }
    >
      <div class="stack level-up">
        <Show when={achievement()}>
          {(tierAchievement) => (
            <Task heading="Tier achievements" guidance={tierAchievement().text}>
              <Show when={!done('achievements')} fallback={<Done>Applied. Name your new Experience on your sheet.</Done>}>
                <div>
                  <button type="button" onClick={() => change(applyAchievements(props.level))}>
                    Apply tier achievements
                  </button>
                </div>
              </Show>
            </Task>
          )}
        </Show>
        <Advancements level={props.level} />
        <Show when={props.includeThresholds}>
          <Task heading="Damage thresholds" guidance={levelUpGuidance.thresholds}>
            <Show when={!done('thresholds')} fallback={<Done>{`Raised to ${formatThresholds(character().thresholds)}.`}</Done>}>
              <div>
                <button type="button" onClick={() => change(raiseThresholds(props.level))}>
                  Raise thresholds from {formatThresholds(character().thresholds)}
                </button>
              </div>
            </Show>
          </Task>
        </Show>
        <Task heading="New domain card" guidance={levelUpGuidance.domainCard}>
          <Show when={!done('domainCard')} fallback={<Done>New domain card taken.</Done>}>
            <EligibleDomainCards level={props.level} onTake={(card) => change(takeLevelCard(props.level, card))} />
          </Show>
        </Task>
        <Show when={!done('companion')} fallback={<Done>Companion trained.</Done>}>
          <CompanionTraining level={props.level} />
        </Show>
        <Show when={revisit().length}>
          <Section heading="Features to revisit">
            <p>These features mention leveling up. Update them if they apply.</p>
            <List>
              <For each={revisit()}>
                {(feature) => (
                  <li>
                    <FeatureView feature={feature} onFieldChange={(field, next) => change(replace(field, next))} setup />
                  </li>
                )}
              </For>
            </List>
          </Section>
        </Show>
      </div>
    </Show>
  )
}
