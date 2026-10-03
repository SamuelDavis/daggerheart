import { For, Show, splitProps, type JSX } from 'solid-js'
import { srd } from '../data/srd'
import { findByName } from '../data/srd/lookup'
import type { Ancestry, Beastform, CharacterClass, Community, Feature, Subclass, Transformation } from '../types/srd'
import { Card, Tags } from '../ui/layout'
import { FeatureView } from './FeatureView'
import { formatDamage, formatModifier } from './format'
import { RichText } from './RichText'
import { titled } from './titled'

type CardProps = { href?: string; actions?: JSX.Element; children?: JSX.Element } & JSX.HTMLAttributes<HTMLElement>

export function DomainTags(props: { domains: readonly string[] }) {
  return (
    <Tags>
      <For each={props.domains}>
        {(domain) => (
          <li class="tag" data-domain={domain}>
            {domain}
          </li>
        )}
      </For>
    </Tags>
  )
}

export function ClassCard(props: CardProps & { characterClass: CharacterClass; expanded?: boolean }) {
  const [own, rest] = splitProps(props, ['characterClass', 'href', 'children', 'expanded'])
  const guide = () => findByName(srd.guides.entries, own.characterClass.name)
  const details = () => (
    <>
      <RichText text={own.characterClass.description} />
      <FeatureView feature={own.characterClass.hopeFeature} label="Hope feature" />
      <For each={own.characterClass.features}>{(feature) => <FeatureView feature={feature} label="Class feature" />}</For>
    </>
  )
  return (
    <Card {...rest} heading={titled(own.characterClass.name, own.href)} data-domain={own.characterClass.domains[0]}>
      <DomainTags domains={own.characterClass.domains} />
      <p class="meta">
        Evasion {own.characterClass.startingEvasion} · Hit Points {own.characterClass.startingHitPoints}
      </p>
      <Show when={guide()?.tagline}>{(tagline) => <p>{tagline()}</p>}</Show>
      <Show
        when={own.expanded}
        fallback={
          <details>
            <summary>Description & features</summary>
            <div class="stack">{details()}</div>
          </details>
        }
      >
        {details()}
      </Show>
      {own.children}
    </Card>
  )
}

export function SubclassCard(props: CardProps & { subclass: Subclass; expanded?: boolean }) {
  const [own, rest] = splitProps(props, ['subclass', 'href', 'children', 'expanded'])
  const advanced = () => (
    <>
      <For each={own.subclass.specialization}>{(feature) => <FeatureView feature={feature} label="Specialization" />}</For>
      <For each={own.subclass.mastery}>{(feature) => <FeatureView feature={feature} label="Mastery" />}</For>
    </>
  )
  return (
    <Card {...rest} heading={titled(own.subclass.name, own.href)}>
      <p>{own.subclass.description}</p>
      <Show when={own.subclass.spellcastTrait}>{(trait) => <p class="meta">Spellcast trait: {trait()}</p>}</Show>
      <For each={own.subclass.foundation}>{(feature) => <FeatureView feature={feature} label="Foundation" />}</For>
      <Show
        when={own.expanded}
        fallback={
          <details>
            <summary>Specialization & mastery</summary>
            <div class="stack">{advanced()}</div>
          </details>
        }
      >
        {advanced()}
      </Show>
      {own.children}
    </Card>
  )
}

export function HeritageCard(
  props: CardProps & { option: Ancestry | Community | Transformation; expanded?: boolean },
) {
  const [own, rest] = splitProps(props, ['option', 'href', 'children', 'expanded'])
  return (
    <Card {...rest} heading={titled(own.option.name, own.href)}>
      <Show when={'adjectives' in own.option && own.option.adjectives}>
        {(adjectives) => <p class="meta">Often {adjectives().join(', ')}.</p>}
      </Show>
      <For each={own.option.features}>{(feature) => <FeatureView feature={feature} />}</For>
      <Show
        when={own.expanded}
        fallback={
          <details>
            <summary>Description</summary>
            <RichText text={own.option.description} />
          </details>
        }
      >
        <RichText text={own.option.description} />
      </Show>
      <Show when={own.expanded && 'questions' in own.option && own.option.questions}>
        {(questions) => (
          <ul>
            <For each={questions()}>{(question) => <li>{question}</li>}</For>
          </ul>
        )}
      </Show>
      {own.children}
    </Card>
  )
}

export function BeastformCard(props: CardProps & { beastform: Beastform }) {
  const [own, rest] = splitProps(props, ['beastform', 'href', 'children'])
  return (
    <Card {...rest} heading={titled(own.beastform.name, own.href)}>
      <p class="meta">
        Tier {own.beastform.tier} · {own.beastform.examples.join(', ')}
      </p>
      <Show when={own.beastform.stats}>
        {(stats) => (
          <p class="meta">
            {stats().trait} {formatModifier(stats().traitBonus)} · Evasion {formatModifier(stats().evasionBonus)} ·{' '}
            {stats().attack.range} {stats().attack.trait} {formatDamage(stats().attack.damage)}
          </p>
        )}
      </Show>
      <Show when={own.beastform.advantages.length}>
        <p>Gain advantage on: {own.beastform.advantages.join(', ')}</p>
      </Show>
      <For each={own.beastform.features}>{(feature) => <FeatureView feature={feature} />}</For>
      {own.children}
    </Card>
  )
}

export function FeatureCard(props: CardProps & { feature: Feature; meta?: string }) {
  const [own, rest] = splitProps(props, ['feature', 'href', 'children', 'meta'])
  return (
    <Card {...rest} heading={titled(own.feature.name, own.href)}>
      <Show when={own.meta}>
        <p class="meta">{own.meta}</p>
      </Show>
      <RichText text={own.feature.text} />
      {own.children}
    </Card>
  )
}
