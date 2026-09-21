import { For, Index } from "solid-js";
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
  type PlayerCharacter,
  type Subclass,
  type Trait,
  type Weapon,
} from "@samueldavis/daggerheart-srd";
import { HTMLIcon, preventDefault } from "@samueldavis/solidlib";

export default function Create() {
  const getClasses = (): readonly Class[] => classes;
  const getSubClasses = (): readonly Subclass[] => subclasses;
  const getAncestries = (): readonly Ancestry[] => ancestries;
  const getCommunities = (): readonly Community[] => communities;
  const getTraits = (): readonly Trait[] => traits;
  const getAdditionalInformation = (): Pick<
    PlayerCharacter,
    "level" | "evasion" | "hitPoints" | "stress" | "hope"
  > => {
    return {
      level: 1,
      evasion: 0,
      hitPoints: [1, 1],
      stress: [0, 6],
      hope: [2, 6],
    };
  };
  const getWeapons = (): readonly Weapon[] => weapons;
  const getArmor = (): readonly Armor[] => armor;
  const getClassItems = (): readonly Class["classItems"][number][] =>
    classes.flatMap((i) => i.classItems);
  const getItems = (): readonly Item[] => items;
  const getExperiences = (): readonly Experience[] => [
    {
      name: "Example Experience",
      bonus: 2,
    },
  ];
  const getDomainCards = (): readonly Ability[] => abilities;
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
          <label for="class">Class</label>
          <select required name="class" id="class">
            <For each={getClasses()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
          <label for="subclass">Subclass</label>
          <select required name="subclass" id="subclass">
            <For each={getSubClasses()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
        </section>
        <section>
          <header>
            <strong>Step 2</strong>
            <h2>Choose Your Heritage</h2>
          </header>
          <label for="ancestry">Ancestry</label>
          <select required name="ancestry" id="ancestry">
            <For each={getAncestries()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
          <label for="community">Community</label>
          <select required name="community" id="community">
            <For each={getCommunities()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
        </section>
        <section>
          <header>
            <strong>Step 3</strong>
            <h2>Assign Character Traits</h2>
          </header>
          <Index each={getTraits()}>
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
              value={getAdditionalInformation().level}
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
              value={getAdditionalInformation().evasion}
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
                value={getAdditionalInformation().hitPoints[0]}
                min={0}
                max={getAdditionalInformation().hitPoints[1]}
              />
            </label>
            <label>
              Max
              <input
                required
                name="hitPoints[1]"
                type="number"
                value={getAdditionalInformation().hitPoints[1]}
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
                value={getAdditionalInformation().stress[0]}
                min={0}
                max={getAdditionalInformation().stress[1]}
              />
            </label>
            <label>
              Max
              <input
                required
                name="stress[1]"
                id="stress[1]"
                type="number"
                value={getAdditionalInformation().stress[1]}
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
                value={getAdditionalInformation().hope[0]}
                min={0}
                max={getAdditionalInformation().hope[1]}
              />
            </label>
            <label>
              Max
              <input
                required
                name="hope[1]"
                id="hope[1]"
                type="number"
                value={getAdditionalInformation().hope[1]}
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
          <label for="weapons">Weapons</label>
          <select required name="weapons" id="weapons" multiple>
            <For each={getWeapons()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
          <label for="armor">Armor</label>
          <select required name="armor" id="armor">
            <For each={getArmor()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
          <label for="class-item">Class Item</label>
          <select required name="class-item" id="class-item">
            <For each={getClassItems()}>
              {(value) => <option value={value}>{value}</option>}
            </For>
          </select>
          <label for="items">Items</label>
          <select required name="items" id="items" multiple>
            <For each={getItems()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
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
          <label for="domain-cards">Domain Cards</label>
          <select required name="domain-cards" id="domain-cards" multiple>
            <For each={getDomainCards()}>
              {(value) => <option value={value.name}>{value.name}</option>}
            </For>
          </select>
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
