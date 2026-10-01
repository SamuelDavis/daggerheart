import {
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  ErrorBoundary,
  For,
  Index,
  Show,
  useContext,
  type JSX,
  type ParentProps,
} from "solid-js";
import {
  createStore,
  produce,
  reconcile,
  type SetStoreFunction,
} from "solid-js/store";
import { isNonNullable, persist, type Targeted } from "@samueldavis/solidlib";
import {
  ancestries,
  armor,
  characterCreationRules,
  characterDescriptionOptions,
  characterInspiration,
  classes,
  classFeatureWeapons,
  classGuides,
  communities,
  domainCards,
  exampleCompanionExperiences,
  martialStances,
  resourceLimits,
  subclasses,
  tierDefinitions,
  traitModifierValues,
  traits,
  traitVerbs,
  transformations,
  weapons,
  type Ancestry,
  type Armor,
  type Class,
  type ClassGuide,
  type Community,
  type DamageType,
  type DomainCard,
  type Experience,
  type Feature,
  type Grant,
  type GrantValue,
  type LevelScaled,
  type MartialStance,
  type Subclass,
  type Thresholds,
  type Trait,
  type Transformation,
  type Weapon,
} from "../types";

type Named = { name: string };

type Section =
  | "class"
  | "heritage"
  | "traits"
  | "equipment"
  | "experiences"
  | "domainCards"
  | "story"
  | "features";

type Companion = {
  name: string;
  animal: string;
  experiences: string[];
  attack: string;
  damageType: DamageType;
};

type Character = {
  name: string;
  pronouns: string;
  description: string;
  background: string;
  connections: string;
  subclass: Subclass["name"];
  ancestries: [top: Ancestry["name"], bottom: Ancestry["name"]];
  heritage: string;
  community: Community["name"];
  transformation: Transformation["name"] | null;
  traits: Record<Trait, number>;
  experiences: Experience[];
  domainCards: DomainCard["name"][];
  primaryWeapon: Weapon["name"] | null;
  secondaryWeapon: Weapon["name"] | null;
  armor: Armor["name"] | null;
  consumable: string;
  classItem: string;
  spellCarrier: string;
  inventory: string[];
  choices: Record<string, string[]>;
  stances: MartialStance["name"][];
  companion: Companion;
  customFeatures: Feature[];
  adjustments: Partial<Record<Stat, number>>;
};

const statLabels = {
  evasion: "Evasion",
  hitPoints: "Hit Points",
  stress: "Stress",
  hope: "Hope Slots",
  armorScore: "Armor Score",
  major: "Major",
  severe: "Severe",
  proficiency: "Proficiency",
} as const;
type CoreStat = keyof typeof statLabels;
type Stat = CoreStat | Trait;
const coreStats = Object.keys(statLabels) as CoreStat[];

type Part = { label: string; amount: number };
type StatLine = { value: number; parts: Part[] };
type Source = { label: string; section: Section; features: readonly Feature[] };
type ActiveGrant<G extends Grant = Grant> = {
  key: string;
  feature: Feature;
  grant: G;
};
type GrantOf<K extends Grant["kind"]> = Extract<Grant, { kind: K }>;
type Issue = { section: Section; message: string };
type Resource = { name: string; value: string; source: string };
type Attack = {
  weapon: Weapon;
  trait: string;
  modifier: number | null;
  damage: string;
};
type Option = { value: string; label: string; group?: string };
type Sheet = ReturnType<typeof deriveSheet>;

const classList: readonly Class[] = classes;
const subclassList: readonly Subclass[] = subclasses;
const ancestryList: readonly Ancestry[] = ancestries;
const communityList: readonly Community[] = communities;
const transformationList: readonly Transformation[] = transformations;
const guideList: readonly ClassGuide[] = classGuides;
const cardList: readonly DomainCard[] = domainCards;
const stanceList: readonly MartialStance[] = martialStances;
const weaponList: readonly Weapon[] = [...weapons, ...classFeatureWeapons];
const armorList: readonly Armor[] = armor;

const level = characterCreationRules.startingLevel;
const tier =
  tierDefinitions.find((t) => t.levels.some((l) => l === level))?.tier ?? 1;
const experienceIdeas = Object.values(
  characterInspiration.experiences,
).flat();

const modifierPattern =
  /(?:^|;\s*)([+-]\d+) to (Evasion|Armor Score|damage thresholds|Agility|Strength|Finesse|Instinct|Presence|Knowledge)\b/g;
const modifierTargets: Record<string, readonly Stat[]> = {
  Evasion: ["evasion"],
  "Armor Score": ["armorScore"],
  "damage thresholds": ["major", "severe"],
  ...Object.fromEntries(traits.map((t) => [t, [t]])),
};

const CharacterContext = createContext<{
  character: Character;
  setCharacter: SetStoreFunction<Character>;
  sheet: () => Sheet;
}>();

function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) throw new Error("useCharacter must be used in a character");
  return context;
}

function byName<T extends Named>(
  list: readonly T[],
  name: string | null,
): T | undefined {
  return list.find((item) => item.name === name);
}

function lookup<T extends Named>(list: readonly T[], name: string): T {
  const item = byName(list, name);
  if (!item) throw new Error(`Unknown selection: ${name}`);
  return item;
}

function sum(parts: readonly Part[]): number {
  return parts.reduce((total, part) => total + part.amount, 0);
}

function formatModifier(value: number): string {
  return value >= 0 ? `+${value}` : `−${Math.abs(value)}`;
}

function formatDamageType(weapon: Weapon): string {
  return typeof weapon.damage.type === "string"
    ? weapon.damage.type
    : weapon.damage.type.join("/");
}

function formatWeapon(weapon: Weapon): string {
  return `${weapon.name} — ${weapon.trait}, ${weapon.range}, ${weapon.damage.roll} ${formatDamageType(weapon)}${weapon.burden ? `, ${weapon.burden}` : ""}`;
}

function formatArmor(option: Armor): string {
  return `${option.name} — ${option.baseThresholds.major}/${option.baseThresholds.severe}, Score ${option.baseScore}`;
}

function atLevel<T>(scale: LevelScaled<T>): T | undefined {
  return scale.filter((s) => s.level <= level).at(-1)?.value;
}

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function grantKey(feature: Feature, grant: Grant): string {
  return `${feature.name}:${"name" in grant ? grant.name : grant.kind}`;
}

function parseModifiers(feature: Feature): { stat: Stat; amount: number }[] {
  return [...feature.description.matchAll(modifierPattern)].flatMap(
    ([, amount, target]) =>
      (modifierTargets[target] ?? []).map((stat) => ({
        stat,
        amount: Number(amount),
      })),
  );
}

function describeGrant(grant: Grant): string | null {
  switch (grant.kind) {
    case "hitPointSlots":
      return `${formatModifier(grant.amount)} Hit Point slot`;
    case "stressSlots":
      return `${formatModifier(grant.amount)} Stress slot`;
    case "hopeSlots":
      return `${formatModifier(grant.amount)} Hope slot`;
    case "evasion":
      return "Evasion bonus";
    case "armorScore":
      return "Armor Score bonus";
    case "damageThresholds":
      return `${grant.thresholds.join(" & ")} threshold bonus`;
    case "rollBonus":
      return `Bonus to ${grant.rolls.join(", ")} rolls`;
    case "domainCards":
      return `${formatModifier(grant.count)} domain card`;
    case "weapon":
      return `Weapon: ${grant.weapon}`;
    case "die":
    case "dicePool":
    case "tokens":
      return grant.name;
    default:
      return null;
  }
}

function findGuide(className: string): ClassGuide | undefined {
  return guideList.find((g) => g.class === className);
}

function applyGuide(character: Character, guide: ClassGuide | undefined): void {
  if (!guide) return;
  character.traits = { ...guide.suggestedTraits };
  character.primaryWeapon = byName(weaponList, guide.suggestedPrimaryWeapon)
    ? guide.suggestedPrimaryWeapon
    : null;
  character.secondaryWeapon = guide.suggestedSecondaryWeapon;
  character.armor = byName(armorList, guide.suggestedArmor)
    ? guide.suggestedArmor
    : null;
}

function selectSubclass(character: Character, name: Subclass["name"]): void {
  const previous = lookup(
    classList,
    lookup(subclassList, character.subclass).class,
  );
  const next = lookup(classList, lookup(subclassList, name).class);
  character.subclass = name;
  character.domainCards = character.domainCards.filter((card) =>
    next.domains.includes(byName(cardList, card)?.domain ?? ""),
  );
  if (previous.classItems.includes(character.classItem))
    character.classItem = "";
}

function createCharacter(): Character {
  const characterClass = classList[0];
  const character: Character = {
    name: "",
    pronouns: "",
    description: "",
    background: "",
    connections: "",
    subclass: characterClass.subclasses[0],
    ancestries: [ancestryList[0].name, ancestryList[0].name],
    heritage: "",
    community: communityList[0].name,
    transformation: null,
    traits: {
      Agility: 2,
      Strength: 1,
      Finesse: 1,
      Instinct: 0,
      Presence: 0,
      Knowledge: -1,
    },
    experiences: Array.from(
      { length: characterCreationRules.startingExperiences },
      () => ({
        name: "",
        modifier: characterCreationRules.startingExperienceModifier,
      }),
    ),
    domainCards: [],
    primaryWeapon: null,
    secondaryWeapon: null,
    armor: null,
    consumable: characterCreationRules.startingConsumableChoices[0],
    classItem: "",
    spellCarrier: "",
    inventory: [
      ...characterCreationRules.startingInventory,
      `A ${characterCreationRules.startingGold.currency} of gold`,
    ],
    choices: {},
    stances: [],
    companion: {
      name: "",
      animal: "",
      experiences: [],
      attack: "",
      damageType: "phy",
    },
    customFeatures: [],
    adjustments: {},
  };
  applyGuide(character, findGuide(characterClass.name));
  return character;
}

function parseCharacter(json: string): Character {
  return { ...createCharacter(), ...JSON.parse(json) };
}

function deriveSheet(c: Character) {
  const subclass = lookup(subclassList, c.subclass);
  const characterClass = lookup(classList, subclass.class);
  const top = lookup(ancestryList, c.ancestries[0]);
  const bottom = lookup(ancestryList, c.ancestries[1]);
  const community = lookup(communityList, c.community);
  const transformation = byName(transformationList, c.transformation);
  const guide = findGuide(characterClass.name);
  const primary = byName(weaponList, c.primaryWeapon);
  const secondary = byName(weaponList, c.secondaryWeapon);
  const activeArmor = byName(armorList, c.armor);
  const mixed = top.name !== bottom.name;

  const sources: Source[] = [
    {
      label: `${characterClass.name} Hope Feature`,
      section: "class",
      features: [characterClass.hopeFeature],
    },
    {
      label: `${characterClass.name} Class Feature`,
      section: "class",
      features: characterClass.classFeatures,
    },
    {
      label: `${subclass.name} Foundation`,
      section: "class",
      features: subclass.foundation,
    },
    {
      label: mixed ? `${top.name} / ${bottom.name}` : top.name,
      section: "heritage",
      features: [top.features[0], bottom.features[1]],
    },
    {
      label: community.name,
      section: "heritage",
      features: [community.feature],
    },
    ...(transformation
      ? [
          {
            label: transformation.name,
            section: "heritage" as const,
            features: transformation.features,
          },
        ]
      : []),
    { label: "Custom", section: "features", features: c.customFeatures },
  ];

  const grants = sources.flatMap((source) =>
    source.features.flatMap((feature) =>
      (feature.grants ?? []).map((grant) => ({
        key: grantKey(feature, grant),
        section: source.section,
        feature,
        grant,
      })),
    ),
  );

  function ofKind<K extends Grant["kind"]>(kind: K) {
    return grants.filter(
      (g): g is ActiveGrant<GrantOf<K>> & { section: Section } =>
        g.grant.kind === kind,
    );
  }

  const gearParts = [primary, secondary, activeArmor]
    .filter(isNonNullable)
    .flatMap((item) =>
      item.feature
        ? parseModifiers(item.feature).map((m) => ({ ...m, label: item.name }))
        : [],
    );

  function line(stat: Stat, base: Part[]): StatLine {
    const parts = [
      ...base,
      ...gearParts
        .filter((p) => p.stat === stat)
        .map(({ label, amount }) => ({ label, amount })),
    ];
    const adjustment = c.adjustments[stat] ?? 0;
    if (adjustment) parts.push({ label: "Adjustment", amount: adjustment });
    return { value: sum(parts), parts };
  }

  const traitLines = Object.fromEntries(
    traits.map((t) => [t, line(t, [{ label: "Assigned", amount: c.traits[t] }])]),
  ) as Record<Trait, StatLine>;
  const proficiency = line("proficiency", [
    { label: "Starting", amount: characterCreationRules.startingProficiency },
  ]);
  const spellcastValue = subclass.spellcastTrait
    ? traitLines[subclass.spellcastTrait].value
    : 0;

  function resolve(value: GrantValue): number {
    if (typeof value === "number") return value;
    switch (value.equals) {
      case "spellcastTrait":
        return spellcastValue;
      case "proficiency":
        return proficiency.value;
      case "tier":
        return tier;
      case "level":
        return level;
    }
  }

  function amounts(
    kind: "evasion" | "armorScore" | "hitPointSlots" | "stressSlots" | "hopeSlots",
  ): Part[] {
    return grants.flatMap(({ feature, grant }) =>
      "amount" in grant && grant.kind === kind
        ? [{ label: feature.name, amount: resolve(grant.amount) }]
        : [],
    );
  }

  function thresholdParts(threshold: keyof Thresholds): Part[] {
    return ofKind("damageThresholds")
      .filter(({ grant }) => grant.thresholds.includes(threshold))
      .map(({ feature, grant }) => ({
        label: feature.name,
        amount: resolve(grant.amount),
      }));
  }

  const stats: Record<CoreStat, StatLine> = {
    evasion: line("evasion", [
      { label: characterClass.name, amount: characterClass.startingEvasion },
      ...amounts("evasion"),
    ]),
    hitPoints: line("hitPoints", [
      { label: characterClass.name, amount: characterClass.startingHitPoints },
      ...amounts("hitPointSlots"),
    ]),
    stress: line("stress", [
      { label: "Starting", amount: characterCreationRules.startingStressSlots },
      ...amounts("stressSlots"),
    ]),
    hope: line("hope", [
      { label: "Maximum", amount: resourceLimits.maxHope },
      ...amounts("hopeSlots"),
    ]),
    armorScore: line("armorScore", [
      activeArmor
        ? { label: activeArmor.name, amount: activeArmor.baseScore }
        : { label: "Unarmored", amount: 0 },
      ...amounts("armorScore"),
    ]),
    major: line("major", [
      ...(activeArmor
        ? [
            { label: activeArmor.name, amount: activeArmor.baseThresholds.major },
            { label: "Level", amount: level },
          ]
        : [{ label: "Unarmored", amount: level }]),
      ...thresholdParts("major"),
    ]),
    severe: line("severe", [
      ...(activeArmor
        ? [
            {
              label: activeArmor.name,
              amount: activeArmor.baseThresholds.severe,
            },
            { label: "Level", amount: level },
          ]
        : [{ label: "Unarmored", amount: 2 * level }]),
      ...thresholdParts("severe"),
    ]),
    proficiency,
  };

  function attack(weapon: Weapon): Attack {
    const trait =
      weapon.trait === "Spellcast"
        ? subclass.spellcastTrait
        : weapon.trait === "Any"
          ? null
          : weapon.trait;
    return {
      weapon,
      trait: trait ?? (weapon.trait === "Any" ? "Any trait" : "No Spellcast"),
      modifier: trait ? traitLines[trait].value : null,
      damage: `${weapon.damage.roll.replace(/(^|\+)d/g, `$1${proficiency.value}d`)} ${formatDamageType(weapon)}`,
    };
  }

  const bonusGrants = ofKind("experienceBonus");
  const experiences = c.experiences.map((experience, index) => {
    const parts = [
      { label: "Base", amount: experience.modifier },
      ...bonusGrants
        .filter(({ key }) => (c.choices[key] ?? []).includes(String(index)))
        .map(({ feature, grant }) => ({
          label: feature.name,
          amount: grant.amount,
        })),
    ];
    return { name: experience.name, value: sum(parts), parts };
  });

  const resources: Resource[] = grants.flatMap(({ feature, grant }) => {
    switch (grant.kind) {
      case "die":
        return [
          {
            name: grant.name,
            value: atLevel(grant.progression) ?? "—",
            source: feature.name,
          },
        ];
      case "dicePool":
        return [
          {
            name: grant.name,
            value: `${grant.count === null ? "" : resolve(grant.count)}${grant.die}${grant.max === null ? "" : ` (max ${resolve(grant.max)})`}`,
            source: feature.name,
          },
        ];
      case "tokens":
        return [
          {
            name: grant.name,
            value: `${grant.starting}${grant.max === null ? "" : ` / ${resolve(grant.max)}`}`,
            source: feature.name,
          },
        ];
      case "rollBonus":
        return [
          {
            name: `${grant.rolls.join(", ")} rolls`,
            value: formatModifier(resolve(grant.amount)),
            source: feature.name,
          },
        ];
      default:
        return [];
    }
  });

  const cardOptions = cardList.filter(
    (card) =>
      card.level <= level && characterClass.domains.includes(card.domain),
  );
  const selectedCards = c.domainCards
    .map((name) => byName(cardList, name))
    .filter(isNonNullable);
  const requiredCards =
    characterCreationRules.startingDomainCards +
    ofKind("domainCards").reduce((total, { grant }) => total + grant.count, 0);

  const grantedWeapons = ofKind("weapon")
    .map(({ grant }) => byName(weaponList, grant.weapon))
    .filter(isNonNullable);
  const companionGrant = ofKind("companion")[0];
  const stanceGrant = ofKind("martialStances")[0];

  const issues: Issue[] = [];
  const issue = (section: Section, message: string) =>
    issues.push({ section, message });

  const expectedTraits: number[] = [...characterCreationRules.traitModifiers];
  const extraTraits: number[] = [];
  for (const t of traits) {
    const index = expectedTraits.indexOf(c.traits[t]);
    if (index === -1) extraTraits.push(c.traits[t]);
    else expectedTraits.splice(index, 1);
  }
  if (expectedTraits.length)
    issue(
      "traits",
      `Unassigned modifiers: ${expectedTraits.map(formatModifier).join(", ")}`,
    );

  if (!primary && !secondary && !grantedWeapons.length)
    issue("equipment", "Choose a primary weapon");
  if (primary && primary.category !== "Primary")
    issue("equipment", `${primary.name} isn't a primary weapon`);
  if (secondary && secondary.category !== "Secondary")
    issue("equipment", `${secondary.name} isn't a secondary weapon`);
  if (primary?.burden === "Two-Handed" && secondary)
    issue("equipment", `${primary.name} is two-handed; drop the secondary`);
  for (const weapon of [primary, secondary].filter(isNonNullable)) {
    if (weapon.kind === "Magic" && !subclass.spellcastTrait)
      issue("equipment", `${weapon.name} needs a Spellcast trait`);
    if (weapon.tier > tier)
      issue("equipment", `${weapon.name} is above tier ${tier}`);
  }
  if (activeArmor && activeArmor.tier > tier)
    issue("equipment", `${activeArmor.name} is above tier ${tier}`);
  if (stats.armorScore.value > resourceLimits.maxArmorScore)
    issue("equipment", `Armor Score exceeds ${resourceLimits.maxArmorScore}`);

  if (c.experiences.length !== characterCreationRules.startingExperiences)
    issue(
      "experiences",
      `Start with ${characterCreationRules.startingExperiences} Experiences`,
    );
  if (c.experiences.some((e) => !e.name.trim()))
    issue("experiences", "Name every Experience");

  if (selectedCards.length !== requiredCards)
    issue(
      "domainCards",
      `Choose ${requiredCards} cards (${selectedCards.length} chosen)`,
    );
  for (const card of selectedCards) {
    if (!characterClass.domains.includes(card.domain))
      issue("domainCards", `${card.name} isn't in your class's domains`);
    if (card.level > level)
      issue("domainCards", `${card.name} is above level ${level}`);
  }

  if (!c.name.trim()) issue("story", "Name your character");

  for (const { key, section, grant } of ofKind("record")) {
    const filled = (c.choices[key] ?? []).filter((v) => v.trim()).length;
    if (grant.count !== null && filled < grant.count)
      issue(section, `Record ${grant.name} (${filled}/${grant.count})`);
  }
  for (const { key, section, grant, feature } of bonusGrants) {
    const chosen = (c.choices[key] ?? []).filter((v) => v !== "").length;
    if (chosen < grant.experiences)
      issue(section, `${feature.name}: choose an Experience`);
  }
  if (stanceGrant && c.stances.length !== stanceGrant.grant.count)
    issue("class", `Choose ${stanceGrant.grant.count} martial stances`);
  if (companionGrant) {
    if (!c.companion.name.trim() || !c.companion.animal.trim())
      issue("class", "Name your companion and its animal");
    if (
      c.companion.experiences.filter((e) => e.trim()).length <
      companionGrant.grant.experiences.count
    )
      issue(
        "class",
        `Give your companion ${companionGrant.grant.experiences.count} Experiences`,
      );
  }

  return {
    characterClass,
    subclass,
    top,
    bottom,
    mixed,
    community,
    transformation,
    guide,
    primary,
    secondary,
    armor: activeArmor,
    sources,
    grants,
    traits: traitLines,
    stats,
    attacks: [primary, secondary, ...(primary ? [] : grantedWeapons)]
      .filter(isNonNullable)
      .map(attack),
    grantedWeapons,
    experiences,
    resources,
    cardOptions,
    selectedCards,
    requiredCards,
    companionGrant,
    stanceGrant,
    extraTraits,
    unassignedTraits: expectedTraits,
    issues,
  };
}

export default function CharacterCreation() {
  const [character, setCharacter] = persist(
    createStore<Character>(createCharacter()),
    { key: "character-draft", decode: parseCharacter },
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
      <Builder character={character} setCharacter={setCharacter} />
    </ErrorBoundary>
  );
}

function Builder(props: {
  character: Character;
  setCharacter: SetStoreFunction<Character>;
}) {
  const sheet = createMemo(() => deriveSheet(props.character));

  return (
    <CharacterContext.Provider
      value={{
        character: props.character,
        setCharacter: props.setCharacter,
        sheet,
      }}
    >
      <Toolbar />
      <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <ClassStep />
          <HeritageStep />
          <TraitsStep />
          <EquipmentStep />
          <ExperiencesStep />
          <DomainCardsStep />
          <StoryStep />
          <CustomFeaturesStep />
        </div>
        <aside class="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <SheetView />
        </aside>
      </div>
    </CharacterContext.Provider>
  );
}

function Toolbar() {
  const { character, setCharacter } = useCharacter();
  const [getError, setError] = createSignal<string>();
  let fileInput: HTMLInputElement | undefined;

  function onSave(): void {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(character, null, 2)], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${character.name.trim() || "character"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function onLoad(event: Targeted<HTMLInputElement>): void {
    const input = event.currentTarget;
    const file = input.files?.item(0);
    input.value = "";
    if (!file) return;
    file
      .text()
      .then((text) => {
        const loaded = parseCharacter(text);
        deriveSheet(loaded);
        setCharacter(reconcile(loaded));
        setError();
      })
      .catch((error) => setError(String(error)));
  }

  function onReset(): void {
    if (confirm("Discard this character and start over?"))
      setCharacter(reconcile(createCharacter()));
  }

  return (
    <header class="flex flex-wrap items-center gap-2">
      <h1 class="mb-0 grow">Character Creation</h1>
      <button type="button" onClick={onSave}>
        Save
      </button>
      <button type="button" class="secondary" onClick={() => fileInput?.click()}>
        Load
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={onLoad}
      />
      <button type="button" class="secondary" onClick={onReset}>
        Reset
      </button>
      <Show when={getError()}>
        {(getMessage) => (
          <p class="w-full">
            <mark>{getMessage()}</mark>
          </p>
        )}
      </Show>
    </header>
  );
}

function Step(
  props: ParentProps<{ section: Section; title: string; value: JSX.Element }>,
) {
  const { sheet } = useCharacter();
  const issues = () =>
    sheet().issues.filter((issue) => issue.section === props.section);

  return (
    <details open id={props.section}>
      <summary>
        <strong>{props.title}</strong>
        <span> · {props.value}</span>
        <Show when={issues().length}>
          {" "}
          <mark>{issues().length} to do</mark>
        </Show>
      </summary>
      <Show when={issues().length}>
        <ul>
          <For each={issues()}>
            {(issue) => (
              <li>
                <small>{issue.message}</small>
              </li>
            )}
          </For>
        </ul>
      </Show>
      {props.children}
      <hr />
    </details>
  );
}

function Select(props: {
  label: string;
  value: string | null;
  options: readonly Option[];
  onChange: (value: string | null) => void;
  none?: string;
  placeholder?: string;
  hint?: string;
}) {
  const groups = () => {
    const result: { label?: string; options: Option[] }[] = [];
    for (const option of props.options) {
      const last = result.at(-1);
      if (last && last.label === option.group) last.options.push(option);
      else result.push({ label: option.group, options: [option] });
    }
    return result;
  };
  const renderOption = (option: Option) => (
    <option value={option.value} selected={option.value === props.value}>
      {option.label}
    </option>
  );

  return (
    <label>
      {props.label}
      <select
        onChange={(event) =>
          props.onChange(event.currentTarget.value || null)
        }
      >
        <Show when={props.none ?? props.placeholder}>
          {(getLabel) => (
            <option
              value=""
              selected={props.value === null || props.value === ""}
              disabled={props.none === undefined}
            >
              {getLabel()}
            </option>
          )}
        </Show>
        <For each={groups()}>
          {(group) =>
            group.label === undefined ? (
              <For each={group.options}>{renderOption}</For>
            ) : (
              <optgroup label={group.label}>
                <For each={group.options}>{renderOption}</For>
              </optgroup>
            )
          }
        </For>
      </select>
      <Show when={props.hint}>
        <small>{props.hint}</small>
      </Show>
    </label>
  );
}

function namedOptions(list: readonly Named[]): Option[] {
  return list.map((item) => ({ value: item.name, label: item.name }));
}

function Prose(props: { text: string; summary?: string }) {
  return (
    <details>
      <summary>
        <small>{props.summary ?? "Description"}</small>
      </summary>
      <p class="whitespace-pre-line">{props.text}</p>
    </details>
  );
}

function FeatureCard(props: { feature: Feature; source?: string }) {
  return (
    <div class="mb-4">
      <strong>{props.feature.name}</strong>
      <Show when={props.source}>
        <small> · {props.source}</small>
      </Show>
      <p class="mb-2 whitespace-pre-line">{props.feature.description}</p>
      <For each={props.feature.grants ?? []}>
        {(grant) => <GrantControl feature={props.feature} grant={grant} />}
      </For>
    </div>
  );
}

function GrantControl(props: { feature: Feature; grant: Grant }) {
  const key = grantKey(props.feature, props.grant);
  const grant = props.grant;
  switch (grant.kind) {
    case "record":
      return <RecordControl key={key} grant={grant} />;
    case "experienceBonus":
      return <ExperienceBonusControl key={key} grant={grant} />;
    case "companion":
      return <CompanionControl grant={grant} />;
    case "martialStances":
      return <StanceControl grant={grant} />;
    default: {
      const description = describeGrant(grant);
      return description ? (
        <p class="mb-2">
          <small>
            <ins>Applied: {description}</ins>
          </small>
        </p>
      ) : null;
    }
  }
}

function RecordControl(props: { key: string; grant: GrantOf<"record"> }) {
  const { character, setCharacter } = useCharacter();
  const listId = createUniqueId();
  const values = () => character.choices[props.key] ?? [];
  const slots = () =>
    Array.from(
      { length: props.grant.count ?? values().length + 1 },
      (_, index) => values()[index] ?? "",
    );

  function onSet(index: number, value: string): void {
    setCharacter("choices", props.key, (prev = []) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  return (
    <fieldset>
      <legend>{props.grant.name}</legend>
      <Index each={slots()}>
        {(getValue, index) =>
          props.grant.options && !props.grant.allowCustom ? (
            <select
              onChange={(event) => onSet(index, event.currentTarget.value)}
            >
              <option value="" selected={getValue() === ""} disabled>
                Choose…
              </option>
              <For each={props.grant.options}>
                {(option) => (
                  <option value={option} selected={option === getValue()}>
                    {option}
                  </option>
                )}
              </For>
            </select>
          ) : (
            <input
              autocomplete="off"
              list={props.grant.options ? listId : undefined}
              placeholder={props.grant.options?.join(", ") ?? props.grant.name}
              value={getValue()}
              onInput={(event) => onSet(index, event.currentTarget.value)}
            />
          )
        }
      </Index>
      <Show when={props.grant.options}>
        {(getOptions) => (
          <datalist id={listId}>
            <For each={getOptions()}>{(option) => <option value={option} />}</For>
          </datalist>
        )}
      </Show>
    </fieldset>
  );
}

function ExperienceBonusControl(props: {
  key: string;
  grant: GrantOf<"experienceBonus">;
}) {
  const { character, setCharacter } = useCharacter();
  const slots = () =>
    Array.from(
      { length: props.grant.experiences },
      (_, index) => character.choices[props.key]?.[index] ?? "",
    );

  function onSet(index: number, value: string): void {
    setCharacter("choices", props.key, (prev = []) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  return (
    <Index each={slots()}>
      {(getValue, index) => (
        <Select
          label={`Experience gaining ${formatModifier(props.grant.amount)}`}
          value={getValue()}
          placeholder="Choose…"
          options={character.experiences.map((experience, i) => ({
            value: String(i),
            label: experience.name || `Experience ${i + 1}`,
          }))}
          onChange={(value) => onSet(index, value ?? "")}
        />
      )}
    </Index>
  );
}

function CompanionControl(props: { grant: GrantOf<"companion"> }) {
  const { character, setCharacter } = useCharacter();
  const listId = createUniqueId();
  const experienceSlots = () =>
    Array.from(
      { length: props.grant.experiences.count },
      (_, index) => character.companion.experiences[index] ?? "",
    );

  return (
    <fieldset>
      <legend>Companion</legend>
      <div class="grid gap-x-4 sm:grid-cols-2">
        <label>
          Name
          <input
            autocomplete="off"
            value={character.companion.name}
            onInput={(event) =>
              setCharacter("companion", "name", event.currentTarget.value)
            }
          />
        </label>
        <label>
          Animal
          <input
            autocomplete="off"
            value={character.companion.animal}
            onInput={(event) =>
              setCharacter("companion", "animal", event.currentTarget.value)
            }
          />
        </label>
        <Index each={experienceSlots()}>
          {(getValue, index) => (
            <label>
              Experience {index + 1} (
              {formatModifier(props.grant.experiences.modifier)})
              <input
                autocomplete="off"
                list={listId}
                value={getValue()}
                onInput={(event) =>
                  setCharacter(
                    "companion",
                    "experiences",
                    index,
                    event.currentTarget.value,
                  )
                }
              />
            </label>
          )}
        </Index>
        <label>
          Standard Attack
          <input
            autocomplete="off"
            placeholder="Bite, claws, a burst of fae light…"
            value={character.companion.attack}
            onInput={(event) =>
              setCharacter("companion", "attack", event.currentTarget.value)
            }
          />
        </label>
        <Select
          label="Damage Type"
          value={character.companion.damageType}
          options={props.grant.damageTypes.map((type) => ({
            value: type,
            label: type,
          }))}
          onChange={(value) => {
            const type = props.grant.damageTypes.find((t) => t === value);
            if (type) setCharacter("companion", "damageType", type);
          }}
        />
      </div>
      <small>
        Evasion {props.grant.evasion} · {props.grant.range}{" "}
        {props.grant.damageDie}
      </small>
      <datalist id={listId}>
        <For each={exampleCompanionExperiences}>
          {(option) => <option value={option} />}
        </For>
      </datalist>
    </fieldset>
  );
}

function StanceControl(props: { grant: GrantOf<"martialStances"> }) {
  const { character, setCharacter } = useCharacter();
  const options = () => stanceList.filter((s) => s.tier <= props.grant.maxTier);

  function onToggle(name: string, checked: boolean): void {
    setCharacter("stances", (prev) =>
      checked ? [...prev, name] : prev.filter((s) => s !== name),
    );
  }

  return (
    <fieldset>
      <legend>
        Martial Stances ({character.stances.length}/{props.grant.count})
      </legend>
      <For each={options()}>
        {(stance) => (
          <label>
            <input
              type="checkbox"
              checked={character.stances.includes(stance.name)}
              onChange={(event) =>
                onToggle(stance.name, event.currentTarget.checked)
              }
            />
            <strong>{stance.name}</strong>: {stance.description}
          </label>
        )}
      </For>
    </fieldset>
  );
}

const subclassOptions: Option[] = classList.flatMap((c) =>
  c.subclasses.map((name) => ({
    value: name,
    label: `${name} ${c.name}`,
    group: c.name,
  })),
);

function ClassStep() {
  const { character, setCharacter, sheet } = useCharacter();
  const classSources = () =>
    sheet().sources.filter((s) => s.section === "class");
  return (
    <Step
      section="class"
      title="Class"
      value={`${sheet().subclass.name} ${sheet().characterClass.name}`}
    >
      <Select
        label="Class & Subclass"
        value={character.subclass}
        options={subclassOptions}
        onChange={(value) =>
          value && setCharacter(produce((c) => selectSubclass(c, value)))
        }
        hint={`Domains ${sheet().characterClass.domains.join(" & ")} · Evasion ${sheet().characterClass.startingEvasion} · HP ${sheet().characterClass.startingHitPoints} · Spellcast ${sheet().subclass.spellcastTrait ?? "none"}`}
      />
      <p>
        <em>
          {[sheet().guide?.summary, sheet().subclass.description]
            .filter(Boolean)
            .join(" ")}
        </em>
      </p>
      <Prose text={sheet().characterClass.description} />
      <For each={classSources().flatMap((s) => s.features)}>
        {(feature) => (
          <FeatureCard
            feature={feature}
            source={
              classSources().find((s) => s.features.includes(feature))?.label
            }
          />
        )}
      </For>
    </Step>
  );
}

function HeritageStep() {
  const { character, setCharacter, sheet } = useCharacter();
  const heritageLabel = () =>
    sheet().mixed
      ? character.heritage || `${sheet().top.name}-${sheet().bottom.name}`
      : sheet().top.name;

  function onAncestry(value: string | null): void {
    if (!value) return;
    setCharacter("ancestries", (prev) =>
      prev[0] === prev[1] ? [value, value] : [value, prev[1]],
    );
  }

  function onMixed(checked: boolean): void {
    setCharacter("ancestries", (prev) => {
      const other = ancestryList.find((a) => a.name !== prev[0]);
      return checked && other ? [prev[0], other.name] : [prev[0], prev[0]];
    });
  }

  return (
    <Step
      section="heritage"
      title="Heritage"
      value={`${heritageLabel()} · ${sheet().community.name}${sheet().transformation ? ` · ${sheet().transformation?.name}` : ""}`}
    >
      <div class="grid gap-x-4 sm:grid-cols-2">
        <div>
          <Select
            label={sheet().mixed ? "First feature from" : "Ancestry"}
            value={character.ancestries[0]}
            options={namedOptions(ancestryList)}
            onChange={onAncestry}
          />
          <Prose text={sheet().top.description} />
        </div>
        <Show
          when={sheet().mixed}
          fallback={
            <label class="self-start sm:mt-9">
              <input
                type="checkbox"
                role="switch"
                checked={false}
                onChange={(event) => onMixed(event.currentTarget.checked)}
              />
              Mixed ancestry
            </label>
          }
        >
          <div>
            <Select
              label="Second feature from"
              value={character.ancestries[1]}
              options={namedOptions(ancestryList)}
              onChange={(value) => value && setCharacter("ancestries", 1, value)}
            />
            <Prose text={sheet().bottom.description} />
          </div>
        </Show>
      </div>
      <Show when={sheet().mixed}>
        <div class="grid gap-x-4 sm:grid-cols-2">
          <label>
            Heritage name
            <input
              autocomplete="off"
              placeholder={`${sheet().top.name}-${sheet().bottom.name}`}
              value={character.heritage}
              onInput={(event) =>
                setCharacter("heritage", event.currentTarget.value)
              }
            />
          </label>
          <label class="self-center">
            <input
              type="checkbox"
              role="switch"
              checked
              onChange={(event) => onMixed(event.currentTarget.checked)}
            />
            Mixed ancestry
          </label>
        </div>
      </Show>
      <FeatureCard feature={sheet().top.features[0]} source={sheet().top.name} />
      <FeatureCard
        feature={sheet().bottom.features[1]}
        source={sheet().bottom.name}
      />

      <Select
        label="Community"
        value={character.community}
        options={namedOptions(communityList)}
        onChange={(value) => value && setCharacter("community", value)}
        hint={`Often ${sheet().community.adjectives.join(", ")}.`}
      />
      <Prose text={sheet().community.description} />
      <FeatureCard
        feature={sheet().community.feature}
        source={sheet().community.name}
      />

      <Select
        label="Transformation"
        value={character.transformation}
        none="None"
        options={namedOptions(transformationList)}
        onChange={(value) => setCharacter("transformation", value)}
        hint="Optional; requires GM approval."
      />
      <Show when={sheet().transformation}>
        {(getTransformation) => (
          <>
            <Prose text={getTransformation().description} />
            <For each={getTransformation().features}>
              {(feature) => (
                <FeatureCard feature={feature} source={getTransformation().name} />
              )}
            </For>
          </>
        )}
      </Show>
    </Step>
  );
}

function TraitsStep() {
  const { character, setCharacter, sheet } = useCharacter();

  return (
    <Step
      section="traits"
      title="Traits"
      value={traits
        .map((t) => `${t.slice(0, 3)} ${formatModifier(sheet().traits[t].value)}`)
        .join(" ")}
    >
      <p>
        Assign{" "}
        {characterCreationRules.traitModifiers.map(formatModifier).join(", ")}{" "}
        in any order.
        <Show when={sheet().guide}>
          {" "}
          <a
            href="#traits"
            onClick={(event) => {
              event.preventDefault();
              const guide = sheet().guide;
              if (guide) setCharacter("traits", { ...guide.suggestedTraits });
            }}
          >
            Use {sheet().characterClass.name} suggestion
          </a>
        </Show>
      </p>
      <div class="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
        <For each={traits}>
          {(trait) => (
            <Select
              label={trait}
              value={String(character.traits[trait])}
              options={traitModifierValues.map((value) => ({
                value: String(value),
                label: formatModifier(value),
              }))}
              onChange={(value) => setCharacter("traits", trait, Number(value))}
              hint={traitVerbs[trait].join(", ")}
            />
          )}
        </For>
      </div>
      <Show when={sheet().extraTraits.length}>
        <small>
          Over-assigned: {sheet().extraTraits.map(formatModifier).join(", ")}
        </small>
      </Show>
    </Step>
  );
}

function weaponOptions(
  category: Weapon["category"],
  spellcaster: boolean,
): Option[] {
  return weaponList
    .filter((w) => w.tier <= tier && w.category === category)
    .filter((w) => !classFeatureWeapons.some((f) => f.name === w.name))
    .map((w) => ({
      value: w.name,
      group: w.trait,
      label: `${formatWeapon(w)}${w.kind === "Magic" && !spellcaster ? " (needs Spellcast)" : ""}`,
    }))
    .sort((a, b) => a.group.localeCompare(b.group));
}

function EquipmentStep() {
  const { character, setCharacter, sheet } = useCharacter();
  const spellcaster = () => isNonNullable(sheet().subclass.spellcastTrait);
  const primaryOptions = () => [
    ...sheet().grantedWeapons.map((w) => ({
      value: w.name,
      group: "Class",
      label: formatWeapon(w),
    })),
    ...weaponOptions("Primary", spellcaster()),
  ];
  const listId = createUniqueId();
  const classItemListId = createUniqueId();

  return (
    <Step
      section="equipment"
      title="Equipment"
      value={[
        sheet().primary?.name,
        sheet().secondary?.name,
        sheet().armor?.name ?? "Unarmored",
      ]
        .filter(isNonNullable)
        .join(" · ")}
    >
      <Show when={sheet().guide}>
        <p>
          <a
            href="#equipment"
            onClick={(event) => {
              event.preventDefault();
              const guide = sheet().guide;
              setCharacter(
                produce((c) => {
                  const traitsBefore = { ...c.traits };
                  applyGuide(c, guide);
                  c.traits = traitsBefore;
                }),
              );
            }}
          >
            Use {sheet().characterClass.name} suggested loadout
          </a>
        </p>
      </Show>
      <Select
        label="Primary Weapon"
        value={character.primaryWeapon}
        none="None"
        options={primaryOptions()}
        onChange={(value) => setCharacter("primaryWeapon", value)}
      />
      <Show when={sheet().primary?.feature}>
        {(getFeature) => <FeatureCard feature={getFeature()} />}
      </Show>
      <Select
        label="Secondary Weapon"
        value={character.secondaryWeapon}
        none="None"
        options={weaponOptions("Secondary", spellcaster())}
        onChange={(value) => setCharacter("secondaryWeapon", value)}
        hint="Only with a one-handed primary weapon."
      />
      <Show when={sheet().secondary?.feature}>
        {(getFeature) => <FeatureCard feature={getFeature()} />}
      </Show>
      <Select
        label="Armor"
        value={character.armor}
        none="None"
        options={armorList
          .filter((a) => a.tier <= tier)
          .map((a) => ({ value: a.name, label: formatArmor(a) }))}
        onChange={(value) => setCharacter("armor", value)}
      />
      <Show when={sheet().armor?.feature}>
        {(getFeature) => <FeatureCard feature={getFeature()} />}
      </Show>
      <div class="grid gap-x-4 sm:grid-cols-2">
        <Select
          label="Potion"
          value={character.consumable}
          options={characterCreationRules.startingConsumableChoices.map(
            (c) => ({ value: c, label: c }),
          )}
          onChange={(value) => value && setCharacter("consumable", value)}
        />
        <label>
          Class Item
          <input
            autocomplete="off"
            list={classItemListId}
            value={character.classItem}
            onInput={(event) =>
              setCharacter("classItem", event.currentTarget.value)
            }
          />
          <datalist id={classItemListId}>
            <For each={sheet().characterClass.classItems}>
              {(item) => <option value={item} />}
            </For>
          </datalist>
          <small>{sheet().characterClass.classItems.join(" · ")}</small>
        </label>
      </div>
      <Show when={sheet().guide?.spellCarrier}>
        {(getCarrier) => (
          <label>
            {getCarrier().prompt}…
            <input
              autocomplete="off"
              list={listId}
              value={character.spellCarrier}
              onInput={(event) =>
                setCharacter("spellCarrier", event.currentTarget.value)
              }
            />
            <datalist id={listId}>
              <For each={getCarrier().examples}>
                {(example) => <option value={example} />}
              </For>
            </datalist>
          </label>
        )}
      </Show>
      <StringList
        label="Inventory"
        values={character.inventory}
        placeholder="GM-approved item"
        onChange={(update) => setCharacter("inventory", update)}
      />
    </Step>
  );
}

function StringList(props: {
  label: string;
  values: readonly string[];
  placeholder: string;
  onChange: (update: (prev: string[]) => string[]) => void;
}) {
  return (
    <fieldset>
      <legend>{props.label}</legend>
      <Index each={props.values}>
        {(getValue, index) => (
          <div role="group">
            <input
              autocomplete="off"
              value={getValue()}
              onInput={(event) => {
                const value = event.currentTarget.value;
                props.onChange((prev) =>
                  prev.map((v, i) => (i === index ? value : v)),
                );
              }}
            />
            <button
              type="button"
              class="secondary"
              aria-label="Remove"
              onClick={() =>
                props.onChange((prev) => prev.filter((_, i) => i !== index))
              }
            >
              ×
            </button>
          </div>
        )}
      </Index>
      <button
        type="button"
        class="outline"
        onClick={() => props.onChange((prev) => [...prev, ""])}
      >
        Add {props.placeholder.toLowerCase()}
      </button>
    </fieldset>
  );
}

function ExperiencesStep() {
  const { character, setCharacter, sheet } = useCharacter();
  const listId = createUniqueId();

  return (
    <Step
      section="experiences"
      title="Experiences"
      value={
        sheet()
          .experiences.map(
            (e) => `${e.name || "?"} ${formatModifier(e.value)}`,
          )
          .join(", ") || "None"
      }
    >
      <p>
        <small>
          Specific skills, traits, or history. Not too broad (“Lucky”) and no
          special abilities (“Invulnerable”).
        </small>
      </p>
      <Index each={character.experiences}>
        {(getExperience, index) => (
          <div role="group">
            <input
              autocomplete="off"
              list={listId}
              placeholder={`Experience ${index + 1}`}
              value={getExperience().name}
              onInput={(event) =>
                setCharacter(
                  "experiences",
                  index,
                  "name",
                  event.currentTarget.value,
                )
              }
            />
            <input
              type="number"
              class="max-w-24"
              aria-label="Modifier"
              value={getExperience().modifier}
              onInput={(event) =>
                setCharacter(
                  "experiences",
                  index,
                  "modifier",
                  Number(event.currentTarget.value),
                )
              }
            />
            <button
              type="button"
              class="secondary"
              aria-label="Remove"
              onClick={() =>
                setCharacter("experiences", (prev) =>
                  prev.filter((_, i) => i !== index),
                )
              }
            >
              ×
            </button>
          </div>
        )}
      </Index>
      <button
        type="button"
        class="outline"
        onClick={() =>
          setCharacter("experiences", (prev) => [
            ...prev,
            {
              name: "",
              modifier: characterCreationRules.startingExperienceModifier,
            },
          ])
        }
      >
        Add Experience
      </button>
      <datalist id={listId}>
        <For each={experienceIdeas}>{(idea) => <option value={idea} />}</For>
      </datalist>
    </Step>
  );
}

function DomainCardsStep() {
  const { character, setCharacter, sheet } = useCharacter();
  const strays = () =>
    sheet().selectedCards.filter((card) => !sheet().cardOptions.includes(card));

  function onToggle(name: string, checked: boolean): void {
    setCharacter("domainCards", (prev) =>
      checked ? [...prev, name] : prev.filter((c) => c !== name),
    );
  }

  function renderCard(card: DomainCard) {
    return (
      <label class="block rounded border border-current/20 p-3">
        <input
          type="checkbox"
          checked={character.domainCards.includes(card.name)}
          onChange={(event) => onToggle(card.name, event.currentTarget.checked)}
        />
        <strong>{card.name}</strong>
        <br />
        <small>
          {card.domain} {card.type} · Level {card.level} · Recall{" "}
          {card.recallCost}
        </small>
        <p class="mb-0 whitespace-pre-line">
          <small>{card.description}</small>
        </p>
      </label>
    );
  }

  return (
    <Step
      section="domainCards"
      title={`Domain Cards (${sheet().selectedCards.length}/${sheet().requiredCards})`}
      value={sheet().selectedCards.map((c) => c.name).join(", ") || "None"}
    >
      <div class="grid gap-3 sm:grid-cols-2">
        <For each={sheet().cardOptions}>{renderCard}</For>
        <For each={strays()}>{renderCard}</For>
      </div>
    </Step>
  );
}

function StoryStep() {
  const { character, setCharacter, sheet } = useCharacter();

  function onRandomName(): void {
    setCharacter(
      "name",
      `${pick(characterInspiration.firstNames)} ${pick(characterInspiration.familyNames)}`,
    );
  }

  return (
    <Step
      section="story"
      title="Story"
      value={
        [character.name, character.pronouns].filter(Boolean).join(", ") ||
        "Unnamed"
      }
    >
      <div class="grid gap-x-4 sm:grid-cols-2">
        <label>
          Name
          <div role="group">
            <input
              autocomplete="off"
              value={character.name}
              onInput={(event) =>
                setCharacter("name", event.currentTarget.value)
              }
            />
            <button type="button" class="secondary" onClick={onRandomName}>
              Random
            </button>
          </div>
        </label>
        <label>
          Pronouns
          <input
            autocomplete="off"
            value={character.pronouns}
            onInput={(event) =>
              setCharacter("pronouns", event.currentTarget.value)
            }
          />
        </label>
      </div>
      <label>
        Description
        <textarea
          value={character.description}
          onInput={(event) =>
            setCharacter("description", event.currentTarget.value)
          }
        />
        <small>
          Eyes like {characterDescriptionOptions.eyes.join(", ")}. Body{" "}
          {characterDescriptionOptions.body.join(", ")}. Skin the color of{" "}
          {characterDescriptionOptions.skin.join(", ")}.
          <Show when={sheet().guide}>
            {(getGuide) => (
              <>
                {" "}
                Clothes {getGuide().clothes.join(", ")}. Attitude like{" "}
                {getGuide().attitudes.join(", ")}.
              </>
            )}
          </Show>
        </small>
      </label>
      <label>
        Background
        <textarea
          value={character.background}
          onInput={(event) =>
            setCharacter("background", event.currentTarget.value)
          }
        />
        <small>{sheet().characterClass.backgroundQuestions.join(" ")}</small>
      </label>
      <label>
        Connections
        <textarea
          value={character.connections}
          onInput={(event) =>
            setCharacter("connections", event.currentTarget.value)
          }
        />
        <small>{sheet().characterClass.connectionQuestions.join(" ")}</small>
      </label>
    </Step>
  );
}

function CustomFeaturesStep() {
  const { character, setCharacter } = useCharacter();

  return (
    <Step
      section="features"
      title="Custom Features"
      value={
        character.customFeatures.map((f) => f.name || "?").join(", ") ||
        "None"
      }
    >
      <p>
        <small>
          GM-approved features, homebrew, or anything the sheet doesn't cover.
          Use stat adjustments on the sheet for their numeric effects.
        </small>
      </p>
      <Index each={character.customFeatures}>
        {(getFeature, index) => (
          <fieldset>
            <div role="group">
              <input
                autocomplete="off"
                placeholder="Feature name"
                value={getFeature().name}
                onInput={(event) =>
                  setCharacter(
                    "customFeatures",
                    index,
                    "name",
                    event.currentTarget.value,
                  )
                }
              />
              <button
                type="button"
                class="secondary"
                aria-label="Remove"
                onClick={() =>
                  setCharacter("customFeatures", (prev) =>
                    prev.filter((_, i) => i !== index),
                  )
                }
              >
                ×
              </button>
            </div>
            <textarea
              placeholder="Description"
              value={getFeature().description}
              onInput={(event) =>
                setCharacter(
                  "customFeatures",
                  index,
                  "description",
                  event.currentTarget.value,
                )
              }
            />
          </fieldset>
        )}
      </Index>
      <button
        type="button"
        class="outline"
        onClick={() =>
          setCharacter("customFeatures", (prev) => [
            ...prev,
            { name: "", description: "" },
          ])
        }
      >
        Add feature
      </button>
    </Step>
  );
}

function StatCard(props: {
  stat: Stat;
  label: string;
  line: StatLine;
  signed?: boolean;
}) {
  const { character, setCharacter } = useCharacter();

  return (
    <details class="mb-0 rounded border border-current/20 px-2 py-1">
      <summary class="text-sm">
        {props.label}{" "}
        <strong>
          {props.signed
            ? formatModifier(props.line.value)
            : props.line.value}
        </strong>
      </summary>
      <ul class="mb-1 text-sm">
        <For each={props.line.parts}>
          {(part) => (
            <li>
              {formatModifier(part.amount)} {part.label}
            </li>
          )}
        </For>
      </ul>
      <label class="text-sm">
        Adjust
        <input
          type="number"
          value={character.adjustments[props.stat] ?? 0}
          onInput={(event) =>
            setCharacter(
              "adjustments",
              props.stat,
              Number(event.currentTarget.value) || undefined,
            )
          }
        />
      </label>
    </details>
  );
}

function SheetView() {
  const { character, sheet } = useCharacter();

  return (
    <article>
      <header>
        <h2 class="mb-0">{character.name || "Unnamed"}</h2>
        <small>
          {[
            character.pronouns,
            `Level ${level}`,
            sheet().mixed
              ? character.heritage || `${sheet().top.name}-${sheet().bottom.name}`
              : sheet().top.name,
            sheet().community.name,
            sheet().transformation?.name,
            `${sheet().subclass.name} ${sheet().characterClass.name}`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </small>
      </header>

      <div class="grid grid-cols-2 items-start gap-2">
        <For each={coreStats}>
          {(stat) => (
            <StatCard
              stat={stat}
              label={statLabels[stat]}
              line={sheet().stats[stat]}
            />
          )}
        </For>
      </div>
      <p class="mt-2 mb-0">
        <small>Hope {characterCreationRules.startingHope} to start</small>
      </p>

      <h3 class="mt-4">Traits</h3>
      <div class="grid grid-cols-3 items-start gap-2">
        <For each={traits}>
          {(trait) => (
            <StatCard
              stat={trait}
              label={trait.slice(0, 3)}
              line={sheet().traits[trait]}
              signed
            />
          )}
        </For>
      </div>

      <h3 class="mt-4">Attacks</h3>
      <For each={sheet().attacks} fallback={<p>None</p>}>
        {(attack) => (
          <p class="mb-2">
            <strong>{attack.weapon.name}</strong>
            <br />
            <small>
              {attack.trait}
              {attack.modifier === null
                ? ""
                : ` ${formatModifier(attack.modifier)}`}{" "}
              · {attack.weapon.range} · {attack.damage}
            </small>
          </p>
        )}
      </For>

      <h3>Experiences</h3>
      <ul>
        <For each={sheet().experiences}>
          {(experience) => (
            <li>
              {experience.name || "?"} {formatModifier(experience.value)}
            </li>
          )}
        </For>
      </ul>

      <Show when={sheet().resources.length}>
        <h3>Resources</h3>
        <ul>
          <For each={sheet().resources}>
            {(resource) => (
              <li>
                {resource.name}: <strong>{resource.value}</strong>{" "}
                <small>({resource.source})</small>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <Show when={sheet().grants.some((g) => g.grant.kind === "record")}>
        <h3>Records</h3>
        <ul>
          <For each={sheet().grants}>
            {({ key, grant }) =>
              grant.kind === "record" ? (
                <li>
                  {grant.name}:{" "}
                  {(character.choices[key] ?? [])
                    .filter((v) => v.trim())
                    .join(", ") || "—"}
                </li>
              ) : null
            }
          </For>
        </ul>
      </Show>

      <Show when={sheet().stanceGrant}>
        <h3>Stances</h3>
        <p>{character.stances.join(", ") || "—"}</p>
      </Show>

      <Show when={sheet().companionGrant}>
        {(getGrant) => (
          <>
            <h3>Companion</h3>
            <p>
              <strong>{character.companion.name || "Unnamed"}</strong>{" "}
              {character.companion.animal}
              <br />
              <small>
                Evasion {getGrant().grant.evasion} ·{" "}
                {character.companion.attack || "Attack"} ·{" "}
                {getGrant().grant.range} {sheet().stats.proficiency.value}
                {getGrant().grant.damageDie} {character.companion.damageType}
                <br />
                {character.companion.experiences
                  .filter((e) => e.trim())
                  .map(
                    (e) =>
                      `${e} ${formatModifier(getGrant().grant.experiences.modifier)}`,
                  )
                  .join(", ")}
              </small>
            </p>
          </>
        )}
      </Show>

      <h3>Domain Cards</h3>
      <For each={sheet().selectedCards} fallback={<p>None</p>}>
        {(card) => <Prose text={card.description} summary={card.name} />}
      </For>

      <h3>Features</h3>
      <For each={sheet().sources}>
        {(source) => (
          <For each={source.features}>
            {(feature) => (
              <Prose
                text={feature.description}
                summary={`${feature.name || "?"} · ${source.label}`}
              />
            )}
          </For>
        )}
      </For>

      <h3>Inventory</h3>
      <ul>
        <For
          each={[
            ...character.inventory,
            character.consumable,
            character.classItem,
            character.spellCarrier,
          ].filter((item) => item.trim())}
        >
          {(item) => <li>{item}</li>}
        </For>
      </ul>

      <Show when={sheet().issues.length}>
        <footer>
          <strong>To do</strong>
          <ul>
            <For each={sheet().issues}>
              {(issue) => (
                <li>
                  <a href={`#${issue.section}`}>{issue.message}</a>
                </li>
              )}
            </For>
          </ul>
        </footer>
      </Show>
    </article>
  );
}
