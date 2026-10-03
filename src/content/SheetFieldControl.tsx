import { createSignal, For, Match, Show, Switch } from 'solid-js'
import { srd, type SrdCollection } from '../data/srd'
import { removeAt } from '../lib/immutable'
import { Die, type Beastform, type Excerpt, type SheetField } from '../types/srd'
import { Dialog } from '../ui/Dialog'
import { PickerDialog } from '../ui/PickerDialog'
import { TierFilter } from '../ui/TierFilter'
import { Field, Fieldset } from '../ui/form'
import { Card, Grid, List } from '../ui/layout'
import { NumberInput } from '../ui/NumberInput'
import { SuggestionInput } from '../ui/SuggestionInput'
import { tierOf } from '../character/rules'
import { useCharacterSession } from '../character/session'
import { CompanionEditor } from './CompanionEditor'
import { BeastformCard } from './ContentCards'
import { RichText } from './RichText'
import './editors.css'

type FieldOf<Kind extends SheetField['kind']> = Extract<SheetField, { kind: Kind }>
type Props<Field extends SheetField = SheetField> = { field: Field; onChange: (field: Field) => void; setup?: boolean }

const faces = (die: Die) => Number(die.slice(1))

function TextControl(props: Props<FieldOf<'text'>>) {
  const onChange = (value: string) => props.onChange({ ...props.field, value })
  return (
    <Field label={props.field.name}>
      {(control) => (
        <Show
          when={props.field.suggestions}
          fallback={<input {...control} value={props.field.value} onChange={(event) => onChange(event.currentTarget.value)} />}
        >
          {(suggestions) => (
            <SuggestionInput {...control} value={props.field.value} suggestions={suggestions()} onChange={onChange} />
          )}
        </Show>
      )}
    </Field>
  )
}

function CounterControl(props: Props<FieldOf<'counter'>>) {
  return (
    <Field label={props.field.name} description={props.field.max === undefined ? undefined : `Up to ${props.field.max}`}>
      {(control) => (
        <NumberInput
          {...control}
          label={props.field.name}
          value={props.field.value}
          min={0}
          max={props.field.max}
          onChange={(value) => props.onChange({ ...props.field, value })}
        />
      )}
    </Field>
  )
}

function DieControl(props: Props<FieldOf<'die'>>) {
  return (
    <Fieldset legend={props.field.name} class="cluster">
      <Field label="Die">
        {(control) => (
          <select
            {...control}
            value={props.field.value}
            onChange={(event) => props.onChange({ ...props.field, value: Die.options.find((die) => die === event.currentTarget.value) ?? props.field.value })}
          >
            <For each={Die.options}>{(die) => <option value={die}>{die}</option>}</For>
          </select>
        )}
      </Field>
      <Show when={!props.setup && props.field.face !== undefined}>
        <Field label="Showing" description="0 when inactive">
          {(control) => (
            <NumberInput
              {...control}
              label={`${props.field.name} face`}
              value={props.field.face ?? 0}
              min={0}
              max={faces(props.field.value)}
              onChange={(face) => props.onChange({ ...props.field, face })}
            />
          )}
        </Field>
      </Show>
    </Fieldset>
  )
}

function ChoiceControl(props: Props<FieldOf<'choice'>>) {
  const toggle = (option: string) =>
    props.onChange({
      ...props.field,
      value: props.field.value.includes(option)
        ? props.field.value.filter((chosen) => chosen !== option)
        : [...props.field.value, option],
    })

  return (
    <Fieldset legend={`${props.field.name} (choose ${props.field.count})`}>
      <For each={props.field.options}>
        {(option) => (
          <label class="checkbox">
            <input type="checkbox" checked={props.field.value.includes(option)} onChange={() => toggle(option)} />
            {option}
          </label>
        )}
      </For>
    </Fieldset>
  )
}

type Pickable = { name: string; text?: string; description?: string; tier?: number }

const excerptOf = ({ name, text, description }: Pickable): Excerpt => ({ name, text: text ?? description ?? '' })

function PickControl(props: Props<FieldOf<'pick'>>) {
  const [choosing, setChoosing] = createSignal(false)
  const entries = () => srd[props.field.collection as SrdCollection].entries as readonly Pickable[]
  const available = () => entries().filter(({ name }) => !props.field.value.some((picked) => picked.name === name))
  const add = (entry: Pickable) => props.onChange({ ...props.field, value: [...props.field.value, excerptOf(entry)] })

  return (
    <Fieldset legend={props.field.count ? `${props.field.name} (choose ${props.field.count})` : props.field.name}>
      <List>
        <For each={props.field.value}>
          {(picked, index) => (
            <li>
              <Card
                heading={picked.name}
                actions={
                  <button type="button" onClick={() => props.onChange({ ...props.field, value: removeAt(props.field.value, index()) })}>
                    Remove
                  </button>
                }
              >
                <RichText text={picked.text} />
              </Card>
            </li>
          )}
        </For>
      </List>
      <div>
        <button type="button" onClick={() => setChoosing(true)}>
          Add to {props.field.name.toLowerCase()}
        </button>
      </div>
      <Dialog open={choosing()} onClose={() => setChoosing(false)} heading={props.field.name}>
        <Grid>
          <For each={available()}>
            {(entry) => (
              <li>
                <Card
                  heading={entry.name}
                  actions={
                    <button type="button" onClick={() => add(entry)}>
                      Add
                    </button>
                  }
                >
                  <Show when={entry.tier}>{(tier) => <small>Tier {tier()}</small>}</Show>
                  <RichText text={excerptOf(entry).text} />
                </Card>
              </li>
            )}
          </For>
        </Grid>
      </Dialog>
    </Fieldset>
  )
}

function BeastformControl(props: Props<FieldOf<'beastform'>>) {
  const { character } = useCharacterSession()
  const [choosing, setChoosing] = createSignal(false)
  const [allTiers, setAllTiers] = createSignal(false)
  const available = () => srd.beastforms.entries.filter(({ tier }) => allTiers() || tier <= tierOf(character().level))
  const transform = (beastform: Beastform | undefined) => {
    props.onChange({ ...props.field, value: beastform })
    setChoosing(false)
  }

  return (
    <Fieldset legend={props.field.name}>
      <Show when={props.field.value} fallback={<p class="meta">Not transformed.</p>}>
        {(beastform) => (
          <BeastformCard
            beastform={beastform()}
            actions={
              <button type="button" onClick={() => transform(undefined)}>
                Drop out
              </button>
            }
          />
        )}
      </Show>
      <div>
        <button type="button" onClick={() => setChoosing(true)}>
          {props.field.value ? 'Change Beastform' : 'Choose a Beastform'}
        </button>
      </div>
      <PickerDialog
        open={choosing()}
        onClose={() => setChoosing(false)}
        heading="Choose a Beastform"
        entries={available()}
        filters={<TierFilter allTiers={allTiers()} onChange={setAllTiers} />}
      >
        {(beastform) => (
          <BeastformCard
            beastform={beastform}
            actions={
              <button type="button" onClick={() => transform(beastform)}>
                Transform
              </button>
            }
          />
        )}
      </PickerDialog>
    </Fieldset>
  )
}

const asKind = <Kind extends SheetField['kind']>(field: SheetField, kind: Kind) =>
  field.kind === kind ? (field as FieldOf<Kind>) : undefined

export function SheetFieldControl(props: Props) {
  return (
    <Switch>
      <Match when={asKind(props.field, 'text')}>{(field) => <TextControl field={field()} onChange={props.onChange} />}</Match>
      <Match when={asKind(props.field, 'counter')}>
        {(field) => <CounterControl field={field()} onChange={props.onChange} />}
      </Match>
      <Match when={asKind(props.field, 'die')}>
        {(field) => <DieControl field={field()} setup={props.setup} onChange={props.onChange} />}
      </Match>
      <Match when={asKind(props.field, 'choice')}>
        {(field) => <ChoiceControl field={field()} onChange={props.onChange} />}
      </Match>
      <Match when={asKind(props.field, 'pick')}>{(field) => <PickControl field={field()} onChange={props.onChange} />}</Match>
      <Match when={asKind(props.field, 'beastform')}>
        {(field) => <BeastformControl field={field()} onChange={props.onChange} />}
      </Match>
      <Match when={asKind(props.field, 'companion')}>
        {(field) => <CompanionEditor companion={field().value} onChange={(value) => props.onChange({ ...field(), value })} />}
      </Match>
    </Switch>
  )
}
