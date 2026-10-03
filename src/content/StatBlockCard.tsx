import { A } from '@solidjs/router'
import { For, Show, splitProps, type JSX } from 'solid-js'
import { paths } from '../app/paths'
import { reference } from '../data/srd/reference'
import type { Adversary, Environment, StatBlockFeature } from '../types/srd'
import { Card, DescriptionList } from '../ui/layout'
import { formatModifier } from './format'
import { RichText } from './RichText'
import { titled } from './titled'
import './statBlock.css'

type CardProps = { href?: string; expanded?: boolean; children?: JSX.Element } & JSX.HTMLAttributes<HTMLElement>

const adversaryNames = reference.adversaries.entries.map(({ name }) => name).sort((a, b) => b.length - a.length)

const linkPattern = new RegExp(`(${adversaryNames.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`)

function LinkedAdversaries(props: { text: string }) {
  return (
    <For each={props.text.split(linkPattern)}>
      {(part) => (adversaryNames.includes(part) ? <A href={paths.entry('adversaries', part)}>{part}</A> : part)}
    </For>
  )
}

function Features(props: { features: readonly StatBlockFeature[]; expanded?: boolean }) {
  const list = () => (
    <For each={props.features}>
      {(feature) => (
        <div class="stat-feature">
          <p>
            <strong>{feature.name}</strong> <small>{feature.kind}</small>
          </p>
          <RichText text={feature.text} />
        </div>
      )}
    </For>
  )
  return (
    <Show
      when={props.expanded}
      fallback={
        <details>
          <summary>Features ({props.features.length})</summary>
          <div class="stack">{list()}</div>
        </details>
      }
    >
      <div class="stack">{list()}</div>
    </Show>
  )
}

const thresholds = ({ major, severe }: Adversary['thresholds']) => `${major ?? 'None'}/${severe ?? 'None'}`

export function AdversaryCard(props: CardProps & { adversary: Adversary }) {
  const [own, rest] = splitProps(props, ['adversary', 'href', 'expanded', 'children'])
  const adversary = () => own.adversary
  return (
    <Card {...rest} heading={titled(adversary().name, own.href)}>
      <p class="meta">
        Tier {adversary().tier} {adversary().type}
        {adversary().hordeSize ? ` (${adversary().hordeSize}/HP)` : ''}
      </p>
      <p>
        <em>{adversary().description}</em>
      </p>
      <p>
        <strong>Motives & Tactics:</strong> {adversary().motives}
      </p>
      <DescriptionList>
        <dt>Difficulty</dt>
        <dd>{adversary().difficulty}</dd>
        <dt>Thresholds</dt>
        <dd>{thresholds(adversary().thresholds)}</dd>
        <dt>HP</dt>
        <dd>{adversary().hitPoints}</dd>
        <dt>Stress</dt>
        <dd>{adversary().stress ?? 'None'}</dd>
        <dt>Attack</dt>
        <dd>
          {adversary().attack.modifier} · {adversary().attack.name}: {adversary().attack.range} ·{' '}
          {adversary().attack.damage}
        </dd>
        <Show when={adversary().experiences.length}>
          <dt>Experience</dt>
          <dd>{adversary().experiences.map(({ name, modifier }) => `${name} ${formatModifier(modifier)}`).join(', ')}</dd>
        </Show>
      </DescriptionList>
      <Features features={adversary().features} expanded={own.expanded} />
      {own.children}
    </Card>
  )
}

export function EnvironmentCard(props: CardProps & { environment: Environment }) {
  const [own, rest] = splitProps(props, ['environment', 'href', 'expanded', 'children'])
  const environment = () => own.environment
  return (
    <Card {...rest} heading={titled(environment().name, own.href)}>
      <p class="meta">
        Tier {environment().tier} {environment().type}
      </p>
      <p>
        <em>{environment().description}</em>
      </p>
      <p>
        <strong>Impulses:</strong> {environment().impulses}
      </p>
      <DescriptionList>
        <dt>Difficulty</dt>
        <dd>{environment().difficulty}</dd>
        <dt>Potential adversaries</dt>
        <dd>
          <LinkedAdversaries text={environment().potentialAdversaries} />
        </dd>
      </DescriptionList>
      <Features features={environment().features} expanded={own.expanded} />
      {own.children}
    </Card>
  )
}
