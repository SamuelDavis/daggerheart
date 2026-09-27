import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  ErrorBoundary,
  For,
  Show,
} from "solid-js";
import {
  ancestries,
  armor,
  characterCreationRules,
  classes,
  communities,
  domainCards,
  subclasses,
  traitModifierValues,
  traits,
  transformations,
  weapons,
  type Ancestry,
  type Armor,
  type Class,
  type Community,
  type DomainCard,
  type Feature,
  type Subclass,
  type Trait,
  type TraitModifier,
  type Transformation,
  type Weapon,
} from "../types";
import {
  createStore,
  produce,
  reconcile,
  type SetStoreFunction,
} from "solid-js/store";
import {
  assert,
  isArray,
  isIn,
  isNonNullable,
  isOf,
  persist,
  type Targeted,
} from "@samueldavis/solidlib";

type PlayerCharacter = {
  name: string;
  pronouns: string;
  description: string;
  subclass: Subclass["name"];
  primaryAncestry: Ancestry["name"];
  secondaryAncestry: null | Ancestry["name"];
  heritage: string;
  community: Community["name"];
  transformation: null | Transformation["name"];
  traits: Record<Trait, TraitModifier>;
  primaryWeapon: Weapon["name"];
  secondaryWeapon: null | Weapon["name"];
  armor: Armor["name"];
  consumable: string;
  classItem: string;
  background: string;
  experiences: [string, string];
  domainCards: [DomainCard["name"], DomainCard["name"]];
  connections: string;
};

type WeaponGroup = { trait: Weapon["trait"]; weapons: Weapon[] };

const level = characterCreationRules.startingLevel;
const proficiency = characterCreationRules.startingProficiency;
const pairIndexes = [0, 1] as const;
const tierOneWeapons = weapons.filter((w) => w.tier === 1);
const tierOneArmor = armor.filter((a) => a.tier === 1);
const primaryWeaponGroups = groupWeaponsByTrait("Primary");
const secondaryWeaponGroups = groupWeaponsByTrait("Secondary");

function groupWeaponsByTrait(category: Weapon["category"]): WeaponGroup[] {
  return traits
    .map((trait) => ({
      trait,
      weapons: tierOneWeapons.filter(
        (w) => w.category === category && w.trait === trait,
      ),
    }))
    .filter((group) => group.weapons.length > 0);
}

function findClass(subclass: Subclass["name"]): Class {
  const characterClass = classes.find((c) => c.subclasses.includes(subclass));
  assert(isNonNullable, characterClass);
  return characterClass;
}

function findSubclass(name: Subclass["name"]): Subclass {
  const subclass = subclasses.find((s) => s.name === name);
  assert(isNonNullable, subclass);
  return subclass;
}

function findWeapon(name: Weapon["name"]): Weapon {
  const weapon = weapons.find((w) => w.name === name);
  assert(isNonNullable, weapon);
  return weapon;
}

function isWieldable(weapon: Weapon, subclass: Subclass): boolean {
  return weapon.kind === "Physical" || isNonNullable(subclass.spellcastTrait);
}

function getDefaultPrimaryWeapon(subclass: Subclass): Weapon {
  const weapon = tierOneWeapons.find(
    (w) => w.category === "Primary" && isWieldable(w, subclass),
  );
  assert(isNonNullable, weapon);
  return weapon;
}

function findDomainCardOptions(characterClass: Class): DomainCard[] {
  return domainCards.filter(
    (card) => card.level === 1 && characterClass.domains.includes(card.domain),
  );
}

function getDefaultDomainCards(
  characterClass: Class,
): PlayerCharacter["domainCards"] {
  const [first, second] = findDomainCardOptions(characterClass);
  return [first.name, second.name];
}

function formatModifier(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function formatDamageType(weapon: Weapon): string {
  return isArray(weapon.damage.type)
    ? weapon.damage.type.join("/")
    : weapon.damage.type;
}

function formatWeapon(weapon: Weapon): string {
  return `${weapon.name}: ${weapon.trait}, ${weapon.range}, ${weapon.damage.roll} ${formatDamageType(weapon)}, ${weapon.burden}`;
}

function formatArmor(option: Armor): string {
  return `${option.name}: ${option.baseThresholds.major} / ${option.baseThresholds.severe}, score ${option.baseScore}`;
}

function formatDomainCard(card: DomainCard): string {
  return `${card.name}: ${card.domain} ${card.type}, Recall Cost ${card.recallCost}`;
}

function createCharacter(): PlayerCharacter {
  const subclass = subclasses[0];
  const characterClass = findClass(subclass.name);
  return {
    name: "",
    pronouns: "",
    description: "",
    subclass: subclass.name,
    primaryAncestry: ancestries[0].name,
    secondaryAncestry: null,
    heritage: "",
    community: communities[0].name,
    transformation: null,
    traits: {
      Agility: 2,
      Strength: 1,
      Finesse: 1,
      Instinct: 0,
      Presence: 0,
      Knowledge: -1,
    },
    primaryWeapon: getDefaultPrimaryWeapon(subclass).name,
    secondaryWeapon: null,
    armor: tierOneArmor[0].name,
    consumable: characterCreationRules.startingConsumableChoices[0],
    classItem: characterClass.classItems[0],
    background: "",
    experiences: ["", ""],
    domainCards: getDefaultDomainCards(characterClass),
    connections: "",
  };
}

async function readCharacterFile(file: File): Promise<PlayerCharacter> {
  return JSON.parse(await file.text());
}

function Features(props: { features: readonly Feature[] }) {
  return (
    <dl>
      <For each={props.features}>
        {(feature) => (
          <>
            <dt>{feature.name}</dt>
            <dd class="whitespace-pre-line">{feature.description}</dd>
          </>
        )}
      </For>
    </dl>
  );
}

export default function CharacterCreation() {
  const [character, setCharacter] = persist(
    createStore<PlayerCharacter>(createCharacter()),
    { key: "player-character" },
  );

  function renderFallback(error: unknown, reset: () => void) {
    function onStartOver(): void {
      setCharacter(reconcile(createCharacter()));
      reset();
    }

    return (
      <article>
        <header>
          <h1>Character Creation</h1>
        </header>
        <p>This character couldn't be loaded.</p>
        <p>
          <code>{String(error)}</code>
        </p>
        <button type="button" onClick={onStartOver}>
          Start over
        </button>
      </article>
    );
  }

  return (
    <ErrorBoundary fallback={renderFallback}>
      <CharacterSheet character={character} setCharacter={setCharacter} />
    </ErrorBoundary>
  );
}

function CharacterSheet(props: {
  character: PlayerCharacter;
  setCharacter: SetStoreFunction<PlayerCharacter>;
}) {
  const character = props.character;
  const setCharacter = props.setCharacter;
  const [getFile, setFile] = createSignal<File>();
  const [getLoaded] = createResource(getFile, readCharacterFile);

  const getSubclass = createMemo(() => findSubclass(character.subclass));
  const getClass = createMemo(() => findClass(character.subclass));
  const getPrimaryAncestry = createMemo(() => {
    const ancestry = ancestries.find(
      (a) => a.name === character.primaryAncestry,
    );
    assert(isNonNullable, ancestry);
    return ancestry;
  });
  const getSecondaryAncestry = createMemo(() =>
    ancestries.find((a) => a.name === character.secondaryAncestry),
  );
  const getSecondaryAncestryOptions = createMemo(() =>
    ancestries.filter((a) => a.name !== character.primaryAncestry),
  );
  const getAncestryFeatures = createMemo(() => [
    getPrimaryAncestry().features[0],
    (getSecondaryAncestry() ?? getPrimaryAncestry()).features[1],
  ]);
  const getCommunity = createMemo(() => {
    const community = communities.find((c) => c.name === character.community);
    assert(isNonNullable, community);
    return community;
  });
  const getTransformation = createMemo(() =>
    transformations.find((t) => t.name === character.transformation),
  );
  const getPrimaryWeapon = createMemo(() =>
    findWeapon(character.primaryWeapon),
  );
  const getSecondaryWeapon = createMemo(() =>
    weapons.find((w) => w.name === character.secondaryWeapon),
  );
  const getArmor = createMemo(() => {
    const characterArmor = armor.find((a) => a.name === character.armor);
    assert(isNonNullable, characterArmor);
    return characterArmor;
  });
  const getThresholds = createMemo(() => ({
    major: getArmor().baseThresholds.major + level,
    severe: getArmor().baseThresholds.severe + level,
  }));
  const getDomainCardOptions = createMemo(() =>
    findDomainCardOptions(getClass()),
  );
  const getSelectedDomainCards = createMemo(() =>
    character.domainCards.map((name) => {
      const card = domainCards.find((c) => c.name === name);
      assert(isNonNullable, card);
      return card;
    }),
  );

  createEffect(() => {
    if (getLoaded.state === "errored") throw getLoaded.error;
    if (getLoaded.state === "ready") setCharacter(reconcile(getLoaded()));
  });

  function onSetAttribute(
    event: Targeted<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    assert(isIn, name, character);
    setCharacter(
      produce((character) => {
        switch (name) {
          case "subclass": {
            const subclass = findSubclass(value);
            const characterClass = findClass(value);
            const cardOptions = findDomainCardOptions(characterClass).map(
              (card) => card.name,
            );
            character.subclass = value;
            if (!characterClass.classItems.includes(character.classItem))
              character.classItem = characterClass.classItems[0];
            if (!isWieldable(findWeapon(character.primaryWeapon), subclass))
              character.primaryWeapon = getDefaultPrimaryWeapon(subclass).name;
            if (
              character.secondaryWeapon !== null &&
              !isWieldable(findWeapon(character.secondaryWeapon), subclass)
            )
              character.secondaryWeapon = null;
            if (
              !character.domainCards.every((card) => cardOptions.includes(card))
            )
              character.domainCards = getDefaultDomainCards(characterClass);
            break;
          }
          case "primaryAncestry":
            character.primaryAncestry = value;
            if (character.secondaryAncestry === value) {
              character.secondaryAncestry = null;
              character.heritage = "";
            }
            break;
          case "secondaryAncestry":
            character.secondaryAncestry = value === "" ? null : value;
            if (value === "") character.heritage = "";
            break;
          case "primaryWeapon":
            character.primaryWeapon = value;
            if (findWeapon(value).burden === "Two-Handed")
              character.secondaryWeapon = null;
            break;
          case "secondaryWeapon":
          case "transformation":
            character[name] = value === "" ? null : value;
            break;
          case "name":
          case "pronouns":
          case "description":
          case "heritage":
          case "community":
          case "armor":
          case "consumable":
          case "classItem":
          case "background":
          case "connections":
            character[name] = value;
            break;
          default:
            throw new TypeError("Unhandled attribute", {
              cause: { name, value },
            });
        }
      }),
    );
  }

  function onSetTrait(event: Targeted<HTMLSelectElement>): void {
    const trait = event.currentTarget.name;
    const value = Number(event.currentTarget.value);
    assert(isOf, trait, traits);
    assert(isOf, value, traitModifierValues);
    setCharacter(
      produce((character) => {
        const swapped = traits.find(
          (t) => t !== trait && character.traits[t] === value,
        );
        if (swapped) character.traits[swapped] = character.traits[trait];
        character.traits[trait] = value;
      }),
    );
  }

  function onSetExperience(event: Targeted<HTMLInputElement>): void {
    const index = Number(event.currentTarget.dataset.index);
    assert(isOf, index, pairIndexes);
    setCharacter("experiences", index, event.currentTarget.value);
  }

  function onSetDomainCard(event: Targeted<HTMLSelectElement>): void {
    const index = Number(event.currentTarget.dataset.index);
    assert(isOf, index, pairIndexes);
    setCharacter("domainCards", index, event.currentTarget.value);
  }

  function onSave(): void {
    const json = JSON.stringify(character, null, 2);
    const url = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${character.name.trim() || "character"}.json`;
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function onLoad(): void {
    const input = document.createElement("input");
    const listeners = new AbortController();

    function onCleanup(): void {
      listeners.abort();
      input.remove();
    }

    function onChange(): void {
      const file = input.files?.item(0);
      if (file) setFile(file);
      onCleanup();
    }

    input.type = "file";
    input.accept = "application/json,.json";
    input.hidden = true;
    input.addEventListener("change", onChange, { signal: listeners.signal });
    input.addEventListener("cancel", onCleanup, { signal: listeners.signal });
    document.body.append(input);
    input.click();
  }

  return (
    <article>
      <header>
        <h1>Character Creation</h1>
        <button type="button" onClick={onSave}>
          Save
        </button>
        <button type="button" onClick={onLoad}>
          Load
        </button>
      </header>

      <section>
        <header>
          <strong>Step 1</strong>
          <h2>Choose a Class and Subclass</h2>
        </header>
        <label for="subclass">Class</label>
        <select name="subclass" id="subclass" onInput={onSetAttribute}>
          <For each={classes}>
            {(c) => (
              <optgroup label={c.name}>
                <For each={c.subclasses}>
                  {(s) => (
                    <option value={s} selected={s === character.subclass}>
                      {s} {c.name}
                    </option>
                  )}
                </For>
              </optgroup>
            )}
          </For>
        </select>
        <details open>
          <summary>Description</summary>
          <blockquote>{getClass().description}</blockquote>
          <blockquote>{getSubclass().description}</blockquote>
        </details>
        <dl>
          <dt>Domains</dt>
          <dd>{getClass().domains.join(" & ")}</dd>
          <dt>Spellcast Trait</dt>
          <dd>
            <Show when={getSubclass().spellcastTrait} fallback="None">
              {(getValue) => <>{getValue()}</>}
            </Show>
          </dd>
        </dl>
        <details open>
          <summary>Hope Feature</summary>
          <Features features={[getClass().hopeFeature]} />
        </details>
        <details open>
          <summary>Class Features</summary>
          <Features features={getClass().classFeatures} />
        </details>
        <details open>
          <summary>Foundation Features</summary>
          <Features features={getSubclass().foundation} />
        </details>
      </section>

      <section>
        <header>
          <strong>Step 2</strong>
          <h2>Choose Your Heritage</h2>
        </header>
        <label for="primaryAncestry">Ancestry</label>
        <select
          name="primaryAncestry"
          id="primaryAncestry"
          onInput={onSetAttribute}
        >
          <For each={ancestries}>
            {(a) => (
              <option
                value={a.name}
                selected={a.name === character.primaryAncestry}
              >
                {a.name}
              </option>
            )}
          </For>
        </select>
        <details open>
          <summary>Description</summary>
          <blockquote class="whitespace-pre-line">
            {getPrimaryAncestry().description}
          </blockquote>
        </details>
        <label for="secondaryAncestry">Mixed Ancestry</label>
        <select
          name="secondaryAncestry"
          id="secondaryAncestry"
          aria-describedby="secondaryAncestryHelp"
          onInput={onSetAttribute}
        >
          <option value="" selected={character.secondaryAncestry === null}>
            None
          </option>
          <For each={getSecondaryAncestryOptions()}>
            {(a) => (
              <option
                value={a.name}
                selected={a.name === character.secondaryAncestry}
              >
                {a.name}
              </option>
            )}
          </For>
        </select>
        <small id="secondaryAncestryHelp">
          Take the first feature from your ancestry and the second from this
          one.
        </small>
        <Show when={getSecondaryAncestry()}>
          {(getValue) => (
            <>
              <details open>
                <summary>Description</summary>
                <blockquote class="whitespace-pre-line">
                  {getValue().description}
                </blockquote>
              </details>
              <label for="heritage">Heritage</label>
              <input
                name="heritage"
                id="heritage"
                placeholder={`${character.primaryAncestry}-${getValue().name}`}
                value={character.heritage}
                onInput={onSetAttribute}
              />
            </>
          )}
        </Show>
        <details open>
          <summary>Ancestry Features</summary>
          <Features features={getAncestryFeatures()} />
        </details>
        <label for="community">Community</label>
        <select name="community" id="community" onInput={onSetAttribute}>
          <For each={communities}>
            {(c) => (
              <option value={c.name} selected={c.name === character.community}>
                {c.name}
              </option>
            )}
          </For>
        </select>
        <details open>
          <summary>Description</summary>
          <blockquote class="whitespace-pre-line">
            {getCommunity().description}
          </blockquote>
          <p>
            {getCommunity().name} are often{" "}
            {getCommunity().adjectives.join(", ")}.
          </p>
        </details>
        <details open>
          <summary>Community Feature</summary>
          <Features features={[getCommunity().feature]} />
        </details>
        <label for="transformation">Transformation</label>
        <select
          name="transformation"
          id="transformation"
          aria-describedby="transformationHelp"
          onInput={onSetAttribute}
        >
          <option value="" selected={character.transformation === null}>
            None
          </option>
          <For each={transformations}>
            {(t) => (
              <option
                value={t.name}
                selected={t.name === character.transformation}
              >
                {t.name}
              </option>
            )}
          </For>
        </select>
        <small id="transformationHelp">Optional; requires GM approval.</small>
        <Show when={getTransformation()}>
          {(getValue) => (
            <>
              <details open>
                <summary>Description</summary>
                <blockquote class="whitespace-pre-line">
                  {getValue().description}
                </blockquote>
              </details>
              <details open>
                <summary>Transformation Features</summary>
                <Features features={getValue().features} />
              </details>
            </>
          )}
        </Show>
      </section>

      <section>
        <header>
          <strong>Step 3</strong>
          <h2>Assign Character Traits</h2>
        </header>
        <p>
          Assign the modifiers{" "}
          {characterCreationRules.traitModifiers.map(formatModifier).join(", ")}{" "}
          to your traits in any order. Choosing a modifier another trait already
          has swaps them.
        </p>
        <div class="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
          <For each={traits}>
            {(trait) => (
              <div>
                <label for={trait}>{trait}</label>
                <select name={trait} id={trait} onInput={onSetTrait}>
                  <For each={traitModifierValues}>
                    {(value) => (
                      <option
                        value={value}
                        selected={character.traits[trait] === value}
                      >
                        {formatModifier(value)}
                      </option>
                    )}
                  </For>
                </select>
              </div>
            )}
          </For>
        </div>
      </section>

      <section>
        <header>
          <strong>Step 4</strong>
          <h2>Record Additional Character Information</h2>
        </header>
        <dl class="grid grid-cols-2 gap-x-4 sm:grid-cols-5">
          <div>
            <dt>Level</dt>
            <dd>{level}</dd>
          </div>
          <div>
            <dt>Evasion</dt>
            <dd>{getClass().startingEvasion}</dd>
          </div>
          <div>
            <dt>Hit Points</dt>
            <dd>{getClass().startingHitPoints}</dd>
          </div>
          <div>
            <dt>Stress</dt>
            <dd>{characterCreationRules.startingStressSlots}</dd>
          </div>
          <div>
            <dt>Hope</dt>
            <dd>{characterCreationRules.startingHope}</dd>
          </div>
        </dl>
      </section>

      <section>
        <header>
          <strong>Step 5</strong>
          <h2>Choose Your Starting Equipment</h2>
        </header>
        <label for="primaryWeapon">Primary Weapon</label>
        <select
          name="primaryWeapon"
          id="primaryWeapon"
          aria-describedby="primaryWeaponHelp"
          onInput={onSetAttribute}
        >
          <For each={primaryWeaponGroups}>
            {(group) => (
              <optgroup label={group.trait}>
                <For each={group.weapons}>
                  {(w) => (
                    <option
                      value={w.name}
                      selected={w.name === character.primaryWeapon}
                      disabled={!isWieldable(w, getSubclass())}
                    >
                      {formatWeapon(w)}
                    </option>
                  )}
                </For>
              </optgroup>
            )}
          </For>
        </select>
        <small id="primaryWeaponHelp">
          Magic weapons require a Spellcast trait.
        </small>
        <Show when={getPrimaryWeapon().feature}>
          {(getValue) => <Features features={[getValue()]} />}
        </Show>
        <label for="secondaryWeapon">Secondary Weapon</label>
        <select
          name="secondaryWeapon"
          id="secondaryWeapon"
          aria-describedby="secondaryWeaponHelp"
          disabled={getPrimaryWeapon().burden === "Two-Handed"}
          onInput={onSetAttribute}
        >
          <option value="" selected={character.secondaryWeapon === null}>
            None
          </option>
          <For each={secondaryWeaponGroups}>
            {(group) => (
              <optgroup label={group.trait}>
                <For each={group.weapons}>
                  {(w) => (
                    <option
                      value={w.name}
                      selected={w.name === character.secondaryWeapon}
                      disabled={!isWieldable(w, getSubclass())}
                    >
                      {formatWeapon(w)}
                    </option>
                  )}
                </For>
              </optgroup>
            )}
          </For>
        </select>
        <small id="secondaryWeaponHelp">
          Only available with a one-handed primary weapon.
        </small>
        <Show when={getSecondaryWeapon()?.feature}>
          {(getValue) => <Features features={[getValue()]} />}
        </Show>
        <label for="armor">Armor</label>
        <select name="armor" id="armor" onInput={onSetAttribute}>
          <For each={tierOneArmor}>
            {(a) => (
              <option value={a.name} selected={a.name === character.armor}>
                {formatArmor(a)}
              </option>
            )}
          </For>
        </select>
        <Show when={getArmor().feature}>
          {(getValue) => <Features features={[getValue()]} />}
        </Show>
        <dl class="grid grid-cols-2 gap-x-4 sm:grid-cols-4">
          <div>
            <dt>Proficiency</dt>
            <dd>{proficiency}</dd>
          </div>
          <div>
            <dt>Armor Score</dt>
            <dd>{getArmor().baseScore}</dd>
          </div>
          <div>
            <dt>Major Threshold</dt>
            <dd>{getThresholds().major}</dd>
          </div>
          <div>
            <dt>Severe Threshold</dt>
            <dd>{getThresholds().severe}</dd>
          </div>
          <div>
            <dt>Primary Damage</dt>
            <dd>
              {proficiency}
              {getPrimaryWeapon().damage.roll}{" "}
              {formatDamageType(getPrimaryWeapon())}
            </dd>
          </div>
          <Show when={getSecondaryWeapon()}>
            {(getValue) => (
              <div>
                <dt>Secondary Damage</dt>
                <dd>
                  {proficiency}
                  {getValue().damage.roll} {formatDamageType(getValue())}
                </dd>
              </div>
            )}
          </Show>
        </dl>
        <label for="consumable">Potion</label>
        <select name="consumable" id="consumable" onInput={onSetAttribute}>
          <For each={characterCreationRules.startingConsumableChoices}>
            {(c) => (
              <option value={c} selected={c === character.consumable}>
                {c}
              </option>
            )}
          </For>
        </select>
        <label for="classItem">Class Item</label>
        <select name="classItem" id="classItem" onInput={onSetAttribute}>
          <For each={getClass().classItems}>
            {(item) => (
              <option value={item} selected={item === character.classItem}>
                {item}
              </option>
            )}
          </For>
        </select>
        <h3>Inventory</h3>
        <ul>
          <For each={characterCreationRules.startingInventory}>
            {(item) => <li>{item}</li>}
          </For>
          <li>{character.consumable}</li>
          <li>{character.classItem}</li>
          <li>
            {characterCreationRules.startingGold.amount}{" "}
            {characterCreationRules.startingGold.currency} of gold
          </li>
        </ul>
      </section>

      <section>
        <header>
          <strong>Step 6</strong>
          <h2>Create Your Background</h2>
        </header>
        <label for="name">Name</label>
        <input
          name="name"
          id="name"
          autocomplete="off"
          value={character.name}
          onInput={onSetAttribute}
        />
        <label for="pronouns">Pronouns</label>
        <input
          name="pronouns"
          id="pronouns"
          autocomplete="off"
          value={character.pronouns}
          onInput={onSetAttribute}
        />
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={character.description}
          onInput={onSetAttribute}
        />
        <label for="background">Background</label>
        <textarea
          name="background"
          id="background"
          value={character.background}
          onInput={onSetAttribute}
        />
      </section>

      <section>
        <header>
          <strong>Step 7</strong>
          <h2>Create Your Experiences</h2>
        </header>
        <p>
          Each Experience starts at{" "}
          {formatModifier(characterCreationRules.startingExperienceModifier)}.
          It can't be too broadly applicable or grant specific mechanical
          benefits.
        </p>
        <For each={pairIndexes}>
          {(index) => (
            <>
              <label for={`experience${index}`}>Experience {index + 1}</label>
              <input
                id={`experience${index}`}
                data-index={index}
                autocomplete="off"
                value={character.experiences[index]}
                onInput={onSetExperience}
              />
            </>
          )}
        </For>
      </section>

      <section>
        <header>
          <strong>Step 8</strong>
          <h2>Choose Domain Cards</h2>
        </header>
        <p>
          Choose two level 1 cards from the {getClass().domains.join(" and ")}{" "}
          domains.
        </p>
        <For each={pairIndexes}>
          {(index) => (
            <>
              <label for={`domainCard${index}`}>Domain Card {index + 1}</label>
              <select
                id={`domainCard${index}`}
                data-index={index}
                onInput={onSetDomainCard}
              >
                <For each={getDomainCardOptions()}>
                  {(card) => (
                    <option
                      value={card.name}
                      selected={card.name === character.domainCards[index]}
                      disabled={character.domainCards.some(
                        (name, i) => i !== index && name === card.name,
                      )}
                    >
                      {formatDomainCard(card)}
                    </option>
                  )}
                </For>
              </select>
              <Show when={getSelectedDomainCards()[index]}>
                {(getCard) => (
                  <blockquote class="whitespace-pre-line">
                    {getCard().description}
                  </blockquote>
                )}
              </Show>
            </>
          )}
        </For>
      </section>

      <section>
        <header>
          <strong>Step 9</strong>
          <h2>Create Your Connections</h2>
        </header>
        <label for="connections">Connections</label>
        <textarea
          name="connections"
          id="connections"
          value={character.connections}
          onInput={onSetAttribute}
        />
      </section>
    </article>
  );
}
