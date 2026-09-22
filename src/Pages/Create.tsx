import {
  createEffect,
  createMemo,
  For,
  Index,
  Show,
  type JSX,
  type ParentProps,
} from "solid-js";
import {
  abilities,
  ancestries,
  armor,
  classes,
  communities,
  items,
  startingTraitModifiers,
  subclasses,
  traits,
  weapons,
  type Ability,
  type Ancestry,
  type Armor,
  type Class,
  type Community,
  type Experience,
  type Item,
  type NamedFeature,
  type Resource,
  type Subclass,
  type Weapon,
} from "@samueldavis/daggerheart-srd";
import {
  assert,
  HTMLIcon,
  isNonNullable,
  preventDefault,
  type Targeted,
} from "@samueldavis/solidlib";
import { createStore, produce } from "solid-js/store";

type PlayerCharacter = {
  class: Class["name"];
  subclass: Subclass["name"];
  ancestry: Ancestry["name"];
  community: Community["name"];
  level: number;
  evasion: number;
  hitPoints: Resource;
  stress: Resource;
  hope: Resource;
  weapons: Weapon["name"][];
  armor: Armor["name"];
  classItem: string;
  items: Item["name"][];
  abilities: Ability["name"][];
};

const BOLD = /\*\*(.+?)\*\*/g;
const ITALIC = /(?<!\w)_(.+?)_(?!\w)/g;

function RichText(props: { children: string }) {
  const getHTML = () => {
    const element = document.createElement("div");
    element.textContent = props.children;
    return element.innerHTML
      .replace(BOLD, "<b>$1</b>")
      .replace(ITALIC, "<em>$1</em>");
  };
  return <span innerHTML={getHTML()} />;
}

function Choice(props: ParentProps<{ id: string; label: string }>) {
  return (
    <section aria-labelledby={`${props.id}-label`}>
      <label id={`${props.id}-label`} for={props.id}>
        {props.label}
      </label>
      {props.children}
    </section>
  );
}

function Features(props: { features: readonly NamedFeature[] }) {
  return (
    <For each={props.features}>
      {(feature) => (
        <>
          <dt>{feature.name}</dt>
          <dd>
            <RichText>{feature.description}</RichText>
          </dd>
        </>
      )}
    </For>
  );
}

function Field(props: { name: string; children: JSX.Element }) {
  return (
    <>
      <dt>{props.name}</dt>
      <dd>{props.children}</dd>
    </>
  );
}

export default function Create() {
  const [state, setState] = createStore<PlayerCharacter>({
    class: classes[0].name,
    subclass: subclasses[0].name,
    ancestry: ancestries[0].name,
    community: communities[0].name,
    level: 1,
    evasion: 0,
    hitPoints: [1, 1],
    stress: [0, 6],
    hope: [2, 6],
    weapons: [],
    armor: armor[0].name,
    classItem: classes[0].classItems[0],
    items: [],
    abilities: [],
  });

  const getData = createMemo(() => {
    const _class = classes.find((i) => i.name === state.class);
    assert(isNonNullable, _class);
    const _subclass = subclasses.find((i) => i.name === state.subclass);
    assert(isNonNullable, _subclass);
    const _ancestry = ancestries.find((i) => i.name === state.ancestry);
    assert(isNonNullable, _ancestry);
    const _community = communities.find((i) => i.name === state.community);
    assert(isNonNullable, _community);
    const _armor = armor.find((i) => i.name === state.armor);
    assert(isNonNullable, _armor);

    return {
      class: _class,
      subclass: _subclass,
      ancestry: _ancestry,
      community: _community,
      weapons: weapons.filter((i) => state.weapons.includes(i.name)),
      armor: _armor,
      items: items.filter((i) => state.items.includes(i.name)),
      abilities: abilities.filter((i) => state.abilities.includes(i.name)),
    } as const;
  });

  const getInput = createMemo(() => {
    return {
      classes,
      subclasses: subclasses.filter((i) =>
        getData().class?.subclasses.includes(i.name),
      ),
      ancestries,
      communities,
      traits,
      weapons: weapons.filter((i) => i.tier === 1),
      armor: armor.filter((i) => i.tier === 1),
      classItems: getData().class.classItems,
      items,
      abilities: abilities.filter(
        (i) => getData().class.domains.includes(i.domain) && i.level === 1,
      ),
    } as const;
  });

  createEffect(() => {
    console.debug(getData(), getInput());
  });

  function onSetAttribute<Attribute extends keyof PlayerCharacter>(
    attribute: Attribute,
    event: Targeted<HTMLSelectElement>,
  ) {
    const { value } = event.currentTarget;
    setState(
      produce((state) => {
        switch (attribute) {
          case "class": {
            state.class = value;
            const characterSubclass = classes.find((i) => i.name === value)
              ?.subclasses[0];
            assert(isNonNullable, characterSubclass);
            state.subclass = characterSubclass;
            state.abilities = [];
            break;
          }
          case "subclass": {
            state.subclass = value;
            break;
          }
          case "armor": {
            state.armor = value;
            break;
          }
          case "classItem": {
            state.classItem = value;
            break;
          }
        }
      }),
    );
  }

  function onSetSelection(
    attribute: "weapons" | "items" | "abilities",
    event: Targeted<HTMLSelectElement>,
  ) {
    const values = Array.from(
      event.currentTarget.selectedOptions,
      (option) => option.value,
    );
    setState(
      produce((state) => {
        state[attribute] = values;
      }),
    );
  }

  createEffect(() => {
    console.log(JSON.parse(JSON.stringify(state)));
  });

  const getExperiences = (): readonly Experience[] => [
    {
      name: "Example Experience",
      bonus: 2,
    },
  ];
  const getConnections = (): readonly string[] => ["Example connection."];

  return (
    <article>
      <header>
        <h1>Create</h1>
      </header>
      <form onSubmit={preventDefault}>
        <section>
          <header>
            <strong>Step 1</strong>
            <h2>Choose a Class and Subclass</h2>
          </header>
          <Choice id="class" label="Class">
            <select
              required
              name="class"
              id="class"
              onInput={[onSetAttribute, "class"]}
            >
              <For each={getInput().classes}>
                {(value) => (
                  <option
                    value={value.name}
                    selected={value.name === state.class}
                  >
                    {value.name}
                  </option>
                )}
              </For>
            </select>
            <blockquote>
              <RichText>{getData().class.description}</RichText>
            </blockquote>
            <dl>
              <Field name="Domains">{getData().class.domains.join(", ")}</Field>
              <Field name="Starting Evasion">
                {getData().class.startingEvasion}
              </Field>
              <Field name="Starting Hit Points">
                {getData().class.startingHitPoints}
              </Field>
              <Features features={[getData().class.hopeFeature]} />
              <Features features={getData().class.classFeatures} />
            </dl>
          </Choice>
          <Choice id="subclass" label="Subclass">
            <select
              required
              name="subclass"
              id="subclass"
              onInput={[onSetAttribute, "subclass"]}
            >
              <For each={getInput().subclasses}>
                {(value) => (
                  <option
                    value={value.name}
                    selected={value.name === state.subclass}
                  >
                    {value.name}
                  </option>
                )}
              </For>
            </select>
            <blockquote>
              <RichText>{getData().subclass.description}</RichText>
            </blockquote>
            <dl>
              <Show when={getData().subclass.spellcastTrait}>
                {(getTrait) => (
                  <Field name="Spellcast Trait">{getTrait()}</Field>
                )}
              </Show>
              <Features features={getData().subclass.foundationFeatures} />
            </dl>
          </Choice>
        </section>
        <section>
          <header>
            <strong>Step 2</strong>
            <h2>Choose Your Heritage</h2>
          </header>
          <Choice id="ancestry" label="Ancestry">
            <select required name="ancestry" id="ancestry">
              <For each={getInput().ancestries}>
                {(value) => <option value={value.name}>{value.name}</option>}
              </For>
            </select>
            <blockquote>
              <RichText>{getData().ancestry.description}</RichText>
            </blockquote>
            <dl>
              <Features features={getData().ancestry.features} />
            </dl>
          </Choice>
          <Choice id="community" label="Community">
            <select required name="community" id="community">
              <For each={getInput().communities}>
                {(value) => <option value={value.name}>{value.name}</option>}
              </For>
            </select>
            <blockquote>
              <RichText>{getData().community.description}</RichText>
            </blockquote>
            <dl>
              <Field name="Temperament">
                {getData().community.temperament.join(", ")}
              </Field>
              <Features features={[getData().community.feature]} />
            </dl>
          </Choice>
        </section>
        <section>
          <header>
            <strong>Step 3</strong>
            <h2>Assign Character Traits</h2>
          </header>
          <Index each={getInput().traits}>
            {(getValue, index) => (
              <label>
                {getValue()}
                <input
                  required
                  name={`traits[${getValue()}]`}
                  type="number"
                  value={startingTraitModifiers[index]}
                  min={-1}
                  max={2}
                  step={1}
                />
              </label>
            )}
          </Index>
        </section>
        <section>
          <header>
            <strong>Step 4</strong>
            <h2>Record Additional Character Information</h2>
          </header>
          <label>
            Level
            <input
              required
              name="level"
              id="level"
              type="number"
              value={state.level}
              min={1}
            />
          </label>
          <label>
            Evasion
            <input
              required
              name="evasion"
              id="evasion"
              type="number"
              value={state.evasion}
              min={0}
            />
          </label>
          <fieldset role="group">
            <legend>Hit Points</legend>
            <label>
              Current
              <input
                required
                name="hitPoints[0]"
                type="number"
                value={state.hitPoints[0]}
                min={0}
                max={state.hitPoints[1]}
              />
            </label>
            <label>
              Max
              <input
                required
                name="hitPoints[1]"
                type="number"
                value={state.hitPoints[1]}
                min={0}
              />
            </label>
          </fieldset>
          <fieldset role="group">
            <legend>Stress</legend>
            <label>
              Current
              <input
                required
                name="stress[0]"
                id="stress[0]"
                type="number"
                value={state.stress[0]}
                min={0}
                max={state.stress[1]}
              />
            </label>
            <label>
              Max
              <input
                required
                name="stress[1]"
                id="stress[1]"
                type="number"
                value={state.stress[1]}
                min={0}
              />
            </label>
          </fieldset>
          <fieldset role="group">
            <legend>Hope</legend>
            <label>
              Current
              <input
                required
                name="hope[0]"
                id="hope[0]"
                type="number"
                value={state.hope[0]}
                min={0}
                max={state.hope[1]}
              />
            </label>
            <label>
              Max
              <input
                required
                name="hope[1]"
                id="hope[1]"
                type="number"
                value={state.hope[1]}
                min={0}
              />
            </label>
          </fieldset>
        </section>
        <section>
          <header>
            <strong>Step 5</strong>
            <h2>Choose Your Starting Equipment</h2>
          </header>
          <Choice id="weapons" label="Weapons">
            <select
              required
              name="weapons"
              id="weapons"
              multiple
              onInput={[onSetSelection, "weapons"]}
            >
              <For each={getInput().weapons}>
                {(value) => (
                  <option
                    value={value.name}
                    selected={state.weapons.includes(value.name)}
                  >
                    {value.name}
                  </option>
                )}
              </For>
            </select>
            <ul>
              <For each={getData().weapons}>
                {(weapon) => (
                  <li>
                    <strong>{weapon.name}</strong>
                    <dl>
                      <Field name="Tier">{weapon.tier}</Field>
                      <Field name="Category">{weapon.category}</Field>
                      <Field name="Trait">{weapon.trait}</Field>
                      <Field name="Range">{weapon.range}</Field>
                      <Field name="Damage">
                        {weapon.damage} {weapon.damageType.join(", ")}
                      </Field>
                      <Field name="Burden">{weapon.burden}</Field>
                      <Show when={weapon.feature}>
                        {(getFeature) => <Features features={[getFeature()]} />}
                      </Show>
                    </dl>
                  </li>
                )}
              </For>
            </ul>
          </Choice>
          <Choice id="armor" label="Armor">
            <select
              required
              name="armor"
              id="armor"
              onInput={[onSetAttribute, "armor"]}
            >
              <For each={getInput().armor}>
                {(value) => (
                  <option
                    value={value.name}
                    selected={value.name === state.armor}
                  >
                    {value.name}
                  </option>
                )}
              </For>
            </select>
            <dl>
              <Field name="Tier">{getData().armor.tier}</Field>
              <Field name="Thresholds">
                {getData().armor.baseThresholds.join(" / ")}
              </Field>
              <Field name="Base Score">{getData().armor.baseScore}</Field>
              <Show when={getData().armor.feature}>
                {(getFeature) => <Features features={[getFeature()]} />}
              </Show>
            </dl>
          </Choice>
          <Choice id="class-item" label="Class Item">
            <select
              required
              name="class-item"
              id="class-item"
              onInput={[onSetAttribute, "classItem"]}
            >
              <For each={getInput().classItems}>
                {(value) => (
                  <option value={value} selected={value === state.classItem}>
                    {value}
                  </option>
                )}
              </For>
            </select>
          </Choice>
          <Choice id="items" label="Items">
            <select
              required
              name="items"
              id="items"
              multiple
              onInput={[onSetSelection, "items"]}
            >
              <For each={getInput().items}>
                {(value) => (
                  <option
                    value={value.name}
                    selected={state.items.includes(value.name)}
                  >
                    {value.name}
                  </option>
                )}
              </For>
            </select>
            <ul>
              <For each={getData().items}>
                {(item) => (
                  <li>
                    <strong>{item.name}</strong>
                    <blockquote>
                      <RichText>{item.description}</RichText>
                    </blockquote>
                  </li>
                )}
              </For>
            </ul>
          </Choice>
        </section>
        <section>
          <header>
            <strong>Step 6</strong>
            <h2>Create Your Background</h2>
          </header>
          <label for="background">Background</label>
          <textarea name="background" id="background"></textarea>
        </section>
        <section>
          <header>
            <strong>Step 7</strong>
            <h2>
              Create Your Experiences <HTMLIcon role="button" type="add" />
            </h2>
          </header>
          <ul>
            <For each={getExperiences()}>
              {(value, getIndex) => (
                <li role="group">
                  <label>
                    Name
                    <input
                      required
                      name={`experiences[${getIndex()}][name]`}
                      type="text"
                      value={value.name}
                    />
                  </label>
                  <label>
                    Bonus
                    <input
                      required
                      name={`experiences[${getIndex()}][bonus]`}
                      type="number"
                      value={value.bonus}
                    />
                  </label>
                  <HTMLIcon role="button" type="delete" />
                </li>
              )}
            </For>
          </ul>
        </section>
        <section>
          <header>
            <strong>Step 8</strong>
            <h2>Choose Domain Cards</h2>
          </header>
          <Choice id="domain-cards" label="Domain Cards">
            <select
              required
              name="domain-cards"
              id="domain-cards"
              multiple
              onInput={[onSetSelection, "abilities"]}
            >
              <For each={getInput().abilities}>
                {(value) => (
                  <option
                    value={value.name}
                    selected={state.abilities.includes(value.name)}
                  >
                    {value.name}
                  </option>
                )}
              </For>
            </select>
            <ul>
              <For each={getData().abilities}>
                {(ability) => (
                  <li>
                    <strong>{ability.name}</strong>
                    <blockquote>
                      <RichText>{ability.description}</RichText>
                    </blockquote>
                    <dl>
                      <Field name="Domain">{ability.domain}</Field>
                      <Field name="Type">{ability.cardType}</Field>
                      <Field name="Level">{ability.level}</Field>
                      <Field name="Recall Cost">{ability.recallCost}</Field>
                    </dl>
                  </li>
                )}
              </For>
            </ul>
          </Choice>
        </section>
        <section>
          <header>
            <strong>Step 9</strong>
            <h2>
              Create Your Connections <HTMLIcon role="button" type="add" />
            </h2>
          </header>
          <ul>
            <Index each={getConnections()}>
              {(getValue, index) => (
                <li role="group">
                  <label>
                    Connection
                    <input
                      required
                      name={`connections[${index}]`}
                      type="text"
                      value={getValue()}
                    />
                  </label>
                  <HTMLIcon role="button" type="delete" />
                </li>
              )}
            </Index>
          </ul>
        </section>
        <input type="submit" />
      </form>
    </article>
  );
}
