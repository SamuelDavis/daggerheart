import { Show, splitProps, type JSX } from 'solid-js'
import type { Armor, DomainCard, Feature, Item, Weapon } from '../types/srd'
import { Card } from '../ui/layout'
import { capitalize, formatDamage, formatThresholds } from './format'
import { RichText } from './RichText'
import { titled } from './titled'

type CardProps = { href?: string; actions?: JSX.Element; children?: JSX.Element } & JSX.HTMLAttributes<HTMLElement>

const featureText = (features: readonly Feature[]) => features.map(({ name, text }) => `${name}: ${text}`).join('\n')

function Meta(props: { children: JSX.Element }) {
  return <p class="meta">{props.children}</p>
}

export function DomainCardCard(props: CardProps & { card: DomainCard }) {
  const [own, rest] = splitProps(props, ['card', 'href', 'children'])
  return (
    <Card {...rest} heading={titled(own.card.name, own.href)} data-domain={own.card.domain}>
      <Meta>
        Level {own.card.level} {own.card.domain} {capitalize(own.card.type)} · Recall {own.card.recallCost}
      </Meta>
      <RichText text={own.card.text} />
      {own.children}
    </Card>
  )
}

export function WeaponCard(props: CardProps & { weapon: Weapon; proficiency?: number }) {
  const [own, rest] = splitProps(props, ['weapon', 'proficiency', 'href', 'children'])
  return (
    <Card {...rest} heading={titled(own.weapon.name, own.href)}>
      <Meta>
        Tier {own.weapon.tier} {capitalize(own.weapon.category)} · {own.weapon.trait} · {own.weapon.range} ·{' '}
        {formatDamage(own.weapon.damage, own.proficiency)} · {capitalize(own.weapon.burden)}
      </Meta>
      <Show when={own.weapon.features.length}>
        <RichText text={featureText(own.weapon.features)} />
      </Show>
      {own.children}
    </Card>
  )
}

export function ArmorCard(props: CardProps & { armor: Armor }) {
  const [own, rest] = splitProps(props, ['armor', 'href', 'children'])
  return (
    <Card {...rest} heading={titled(own.armor.name, own.href)}>
      <Meta>
        Tier {own.armor.tier} · Base thresholds {formatThresholds(own.armor.thresholds)} · Base score {own.armor.score}
      </Meta>
      <Show when={own.armor.features.length}>
        <RichText text={featureText(own.armor.features)} />
      </Show>
      {own.children}
    </Card>
  )
}

export function ItemCard(props: CardProps & { item: Item }) {
  const [own, rest] = splitProps(props, ['item', 'href', 'children'])
  return (
    <Card {...rest} heading={titled(own.item.name, own.href)}>
      <Show when={own.item.text}>
        <RichText text={own.item.text} />
      </Show>
      {own.children}
    </Card>
  )
}
