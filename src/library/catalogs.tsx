import { A } from '@solidjs/router'
import { For, type JSX } from 'solid-js'
import { paths } from '../app/paths'
import { capitalize } from '../content/format'
import { BeastformCard, ClassCard, FeatureCard, HeritageCard, SubclassCard } from '../content/ContentCards'
import { ArmorCard, DomainCardCard, ItemCard, WeaponCard } from '../content/EntityCards'
import { RichText } from '../content/RichText'
import { AdversaryCard, EnvironmentCard } from '../content/StatBlockCard'
import { srd } from '../data/srd'
import { reference } from '../data/srd/reference'
import { findAllByName } from '../data/srd/lookup'
import { Card, Grid, List, Section } from '../ui/layout'

type Named = { name: string }

export type Facet<Entry> = { key: string; label: string; values: (entry: Entry) => readonly (string | number)[] }

export type Catalog<Entry extends Named = Named> = {
  key: string
  title: string
  description: string
  entries: readonly Entry[]
  facets: readonly Facet<Entry>[]
  card: (entry: Entry, href: string) => JSX.Element
  detail?: (entry: Entry) => JSX.Element
}

const define = <Entry extends Named>(catalog: Catalog<Entry>) => catalog as unknown as Catalog

const tier = <Entry extends { tier: number }>(): Facet<Entry> => ({ key: 'tier', label: 'Tier', values: ({ tier }) => [tier] })

const ownerOf = (subclass: string) => srd.classes.entries.find(({ subclasses }) => subclasses.includes(subclass))

export const catalogs: readonly Catalog[] = [
  define({
    key: 'classes',
    title: 'Classes',
    description: 'Role-based archetypes that determine domains, starting Evasion and Hit Points, and class features.',
    entries: srd.classes.entries,
    facets: [{ key: 'domain', label: 'Domain', values: ({ domains }) => domains }],
    card: (characterClass, href) => <ClassCard characterClass={characterClass} href={href} />,
    detail: (characterClass) => (
      <>
        <ClassCard characterClass={characterClass} expanded />
        <Section heading="Subclasses">
          <Grid>
            <For each={findAllByName(srd.subclasses.entries, characterClass.subclasses)}>
              {(subclass) => (
                <li>
                  <SubclassCard subclass={subclass} href={paths.entry('subclasses', subclass.name)} />
                </li>
              )}
            </For>
          </Grid>
        </Section>
        <Section heading="Background questions">
          <List>
            <For each={characterClass.backgroundQuestions}>{(question) => <li>{question}</li>}</For>
          </List>
        </Section>
        <Section heading="Connections">
          <List>
            <For each={characterClass.connectionQuestions}>{(question) => <li>{question}</li>}</For>
          </List>
        </Section>
      </>
    ),
  }),
  define({
    key: 'subclasses',
    title: 'Subclasses',
    description: 'Each class divides into two subclasses with foundation, specialization, and mastery features.',
    entries: srd.subclasses.entries,
    facets: [
      { key: 'class', label: 'Class', values: ({ name }) => [ownerOf(name)?.name ?? ''] },
      { key: 'spellcast', label: 'Spellcast trait', values: ({ spellcastTrait }) => (spellcastTrait ? [spellcastTrait] : []) },
    ],
    card: (subclass, href) => <SubclassCard subclass={subclass} href={href} />,
    detail: (subclass) => (
      <>
        <p>
          A <A href={paths.entry('classes', ownerOf(subclass.name)?.name ?? '')}>{ownerOf(subclass.name)?.name}</A> subclass.
        </p>
        <SubclassCard subclass={subclass} expanded />
      </>
    ),
  }),
  define({
    key: 'domains',
    title: 'Domains',
    description: 'Ten collections of cards, each granting features or abilities around a theme.',
    entries: srd.domains.entries,
    facets: [],
    card: (domain, href) => (
      <Card heading={<A href={href}>{domain.name}</A>} data-domain={domain.name}>
        <RichText text={domain.description} />
        <p class="meta">
          Classes:{' '}
          {srd.classes.entries
            .filter(({ domains }) => domains.includes(domain.name))
            .map(({ name }) => name)
            .join(', ')}
        </p>
      </Card>
    ),
    detail: (domain) => (
      <>
        <RichText text={domain.description} />
        <p>
          <A href={paths.catalog('domainCards', { domain: domain.name })}>Browse {domain.name} cards</A>
        </p>
      </>
    ),
  }),
  define({
    key: 'domainCards',
    title: 'Domain cards',
    description: 'Abilities, spells, and grimoires from every domain, levels 1 to 10.',
    entries: srd.domainCards.entries,
    facets: [
      { key: 'domain', label: 'Domain', values: ({ domain }) => [domain] },
      { key: 'level', label: 'Level', values: ({ level }) => [level] },
      { key: 'type', label: 'Type', values: ({ type }) => [capitalize(type)] },
    ],
    card: (card, href) => <DomainCardCard card={card} href={href} />,
  }),
  define({
    key: 'ancestries',
    title: 'Ancestries',
    description: 'Lineages that shape physicality and grant two ancestry features.',
    entries: srd.ancestries.entries,
    facets: [],
    card: (ancestry, href) => <HeritageCard option={ancestry} href={href} />,
    detail: (ancestry) => <HeritageCard option={ancestry} expanded />,
  }),
  define({
    key: 'communities',
    title: 'Communities',
    description: 'Cultures and environments of origin, each granting a community feature.',
    entries: srd.communities.entries,
    facets: [],
    card: (community, href) => <HeritageCard option={community} href={href} />,
    detail: (community) => <HeritageCard option={community} expanded />,
  }),
  define({
    key: 'transformations',
    title: 'Transformations',
    description: 'Optional, GM-granted shifts with both a benefit and a drawback.',
    entries: srd.transformations.entries,
    facets: [],
    card: (transformation, href) => <HeritageCard option={transformation} href={href} />,
    detail: (transformation) => <HeritageCard option={transformation} expanded />,
  }),
  define({
    key: 'weapons',
    title: 'Weapons',
    description: 'Primary and secondary weapons for every tier, including combat wheelchairs.',
    entries: srd.weapons.entries,
    facets: [
      tier(),
      { key: 'category', label: 'Category', values: ({ category }) => [capitalize(category)] },
      { key: 'trait', label: 'Trait', values: ({ trait }) => [trait] },
      { key: 'range', label: 'Range', values: ({ range }) => [range] },
      { key: 'burden', label: 'Burden', values: ({ burden }) => [capitalize(burden)] },
      { key: 'damage', label: 'Damage type', values: ({ damage }) => [capitalize(damage.type)] },
    ],
    card: (weapon, href) => <WeaponCard weapon={weapon} href={href} />,
  }),
  define({
    key: 'armor',
    title: 'Armor',
    description: 'Armor for every tier, with base thresholds and Armor Score.',
    entries: srd.armor.entries,
    facets: [tier()],
    card: (armor, href) => <ArmorCard armor={armor} href={href} />,
  }),
  define({
    key: 'loot',
    title: 'Loot',
    description: 'Reusable items that can be used until sold, discarded, or lost.',
    entries: srd.loot.entries,
    facets: [],
    card: (item, href) => <ItemCard item={item} href={href} />,
  }),
  define({
    key: 'consumables',
    title: 'Consumables',
    description: 'Single-use loot. You can hold up to five of each consumable at a time.',
    entries: srd.consumables.entries,
    facets: [],
    card: (item, href) => <ItemCard item={item} href={href} />,
  }),
  define({
    key: 'beastforms',
    title: 'Beastforms',
    description: 'Creature categories a druid can transform into, by tier.',
    entries: srd.beastforms.entries,
    facets: [tier()],
    card: (beastform, href) => <BeastformCard beastform={beastform} href={href} />,
  }),
  define({
    key: 'martialStances',
    title: 'Martial stances',
    description: 'Stances a Martial Artist can learn and shift into by spending Focus.',
    entries: srd.martialStances.entries,
    facets: [tier()],
    card: (stance, href) => <FeatureCard feature={stance} meta={`Tier ${stance.tier}`} href={href} />,
  }),
  define({
    key: 'companionTraining',
    title: 'Companion training',
    description: 'Level-up options for a Beastbound ranger’s animal companion.',
    entries: srd.companionTraining.entries,
    facets: [],
    card: (training, href) => <FeatureCard feature={training} href={href} />,
  }),
  define({
    key: 'adversaries',
    title: 'Adversaries',
    description: 'Stat blocks for every adversary, by tier and type.',
    entries: reference.adversaries.entries,
    facets: [tier(), { key: 'type', label: 'Type', values: ({ type }) => [type] }],
    card: (adversary, href) => <AdversaryCard adversary={adversary} href={href} />,
    detail: (adversary) => <AdversaryCard adversary={adversary} expanded />,
  }),
  define({
    key: 'environments',
    title: 'Environments',
    description: 'Locations and events that challenge the party, by tier and type.',
    entries: reference.environments.entries,
    facets: [tier(), { key: 'type', label: 'Type', values: ({ type }) => [type] }],
    card: (environment, href) => <EnvironmentCard environment={environment} href={href} />,
    detail: (environment) => <EnvironmentCard environment={environment} expanded />,
  }),
]

export const findCatalog = (key: string) => catalogs.find((catalog) => catalog.key === key)

export const searchText = (entry: Named) => JSON.stringify(entry).toLowerCase()
