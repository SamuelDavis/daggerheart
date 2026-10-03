import { domains } from '../../data/srd/domains'
import { ranges } from '../../data/srd/ranges'
import { spellcastTrait, traitNames } from '../../data/srd/traits'
import {
  Burden,
  DamageType,
  Die,
  DomainCardType,
  WeaponCategory,
  type Armor,
  type DomainCard,
  type Item,
  type Weapon,
} from '../../types/srd'
import { NumberField, SelectField, TextField } from '../../ui/fields'
import { Fieldset } from '../../ui/form'
import { capitalize } from '../format'
import { FeatureListEditor } from './FeatureEditor'
import { named } from './shared'

type Editor<Entity> = { value: Entity; onChange: (value: Entity) => void }

const set =
  <Entity,>(props: Editor<Entity>) =>
  <Key extends keyof Entity>(key: Key, value: Entity[Key]) =>
    props.onChange({ ...props.value, [key]: value })

function NameField<Entity extends { name: string }>(props: Editor<Entity>) {
  return (
    <TextField label="Name" value={props.value.name} onChange={(name) => set(props)('name', named(name, props.value.name))} />
  )
}

export function WeaponEditor(props: Editor<Weapon>) {
  const update = set(props)
  const setDamage = <Key extends keyof Weapon['damage']>(key: Key, value: Weapon['damage'][Key]) =>
    update('damage', { ...props.value.damage, [key]: value })

  return (
    <>
      <NameField {...props} />
      <NumberField label="Tier" value={props.value.tier} min={1} onChange={(tier) => update('tier', tier)} />
      <SelectField
        label="Category"
        value={props.value.category}
        options={WeaponCategory.options}
        format={capitalize}
        onChange={(category) => update('category', category)}
      />
      <SelectField
        label="Trait"
        value={props.value.trait}
        options={[...traitNames, spellcastTrait]}
        onChange={(trait) => update('trait', trait)}
      />
      <SelectField
        label="Range"
        value={props.value.range}
        options={ranges.map(({ name }) => name)}
        onChange={(range) => update('range', range)}
      />
      <Fieldset legend="Damage" class="cluster">
        <SelectField label="Die" value={props.value.damage.die} options={Die.options} onChange={(die) => setDamage('die', die)} />
        <NumberField
          label="Modifier"
          value={props.value.damage.modifier ?? 0}
          min={0}
          onChange={(modifier) => setDamage('modifier', modifier || undefined)}
        />
        <SelectField
          label="Type"
          value={props.value.damage.type}
          options={DamageType.options}
          format={capitalize}
          onChange={(type) => setDamage('type', type)}
        />
      </Fieldset>
      <SelectField
        label="Burden"
        value={props.value.burden}
        options={Burden.options}
        format={capitalize}
        onChange={(burden) => update('burden', burden)}
      />
      <FeatureListEditor features={props.value.features} onChange={(features) => update('features', features)} />
    </>
  )
}

export function ArmorEditor(props: Editor<Armor>) {
  const update = set(props)
  return (
    <>
      <NameField {...props} />
      <NumberField label="Tier" value={props.value.tier} min={1} onChange={(tier) => update('tier', tier)} />
      <Fieldset legend="Base thresholds" class="cluster">
        <NumberField
          label="Major"
          value={props.value.thresholds.major}
          min={0}
          onChange={(major) => update('thresholds', { ...props.value.thresholds, major })}
        />
        <NumberField
          label="Severe"
          value={props.value.thresholds.severe}
          min={0}
          onChange={(severe) => update('thresholds', { ...props.value.thresholds, severe })}
        />
      </Fieldset>
      <NumberField label="Base score" value={props.value.score} min={0} onChange={(score) => update('score', score)} />
      <FeatureListEditor features={props.value.features} onChange={(features) => update('features', features)} />
    </>
  )
}

export function ItemEditor(props: Editor<Item>) {
  return (
    <>
      <NameField {...props} />
      <TextField label="Description" multiline value={props.value.text} onChange={(text) => set(props)('text', text)} />
    </>
  )
}

export function DomainCardEditor(props: Editor<DomainCard>) {
  const update = set(props)
  return (
    <>
      <NameField {...props} />
      <SelectField
        label="Domain"
        value={props.value.domain}
        options={domains.map(({ name }) => name)}
        onChange={(domain) => update('domain', domain)}
      />
      <NumberField label="Level" value={props.value.level} min={1} onChange={(level) => update('level', level)} />
      <SelectField
        label="Type"
        value={props.value.type}
        options={DomainCardType.options}
        format={capitalize}
        onChange={(type) => update('type', type)}
      />
      <NumberField label="Recall cost" value={props.value.recallCost} min={0} onChange={(recallCost) => update('recallCost', recallCost)} />
      <TextField label="Text" multiline value={props.value.text} onChange={(text) => update('text', text)} />
    </>
  )
}

export const blankWeapon = (): Weapon => ({
  name: 'Custom weapon',
  tier: 1,
  category: 'primary',
  trait: 'Agility',
  range: 'Melee',
  damage: { die: 'd6', type: 'physical' },
  burden: 'one-handed',
  features: [],
})

export const blankArmor = (): Armor => ({ name: 'Custom armor', tier: 1, thresholds: { major: 5, severe: 10 }, score: 3, features: [] })

export const blankItem = (): Item => ({ name: 'Custom item', text: '' })

export const blankDomainCard = (domain: string): DomainCard => ({
  name: 'Custom card',
  domain,
  level: 1,
  type: 'ability',
  recallCost: 0,
  text: '',
})
