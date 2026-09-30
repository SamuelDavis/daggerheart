# `srd/` — Daggerheart SRD building blocks

Composable types + authored constants describing everything in the Daggerheart SRD 2.0 (Aug 2026), its character guides/sheets, and Hope & Fear material. Meant for apps (character creators, sheets, GM tools) to model Daggerheart concepts safely without this module dictating game rules.

Source of truth, in priority order: SRD 2.0 → character guides/sheets → errata. SRD 2.0 postdates the errata, so SRD wins on conflicts (e.g. Buckler "available Armor Score").

## Core ideas

### Types describe shapes, constants provide data

- **Types** (`models.ts`, `primitives.ts`) say what a thing *is*: a `Class`, `Subclass`, `Ancestry`, `Weapon`, `RangerCompanion`, `WarlockPatron`, etc.
- **Constants** (every other file) are SRD-authored instances: `classes`, `subclasses`, `weapons`, `armor`, `classGuides`, …
- Constants use `as const satisfies readonly X[]`: checked against the generic type, but keep literal types.

```ts
type AnyClassName = Class["name"];
type SrdClassName = (typeof classes)[number]["name"];
```

`Class["name"]` is `string` — homebrew welcome. SRD literal unions are derived from constants only when an app wants them. Types never hardcode SRD names; `primitives.ts` holds core enumerations (traits, ranges, tiers, levels…) plus SRD lists like `domains` for narrowing, but generic types reference `DomainDefinition["name"]` (`string`) so homebrew domains work.

### Compositional, no god type

No `Character` type here. An app composes its own character from pieces:

```ts
type MyCharacter = {
  class: Class["name"];
  subclass: Subclass["name"];
  ancestries: Ancestry["name"][];
  community: Community["name"];
  weapons: Weapon["name"][];
  companion?: RangerCompanion;
  principles?: OrderbornePrinciple[];
};
```

App decides which pieces exist, which are required, how strict to be.

### Names are unique ids

Every top-level entity is unique by `name` within its kind, so names work as keys/references (`Weapon["name"]`, `DomainCard["name"]`). Where source material reused a name:

- Tiered Western / Monster Hunting gear follows the SRD's own convention: tier 1 plain, then `Improved` / `Advanced` / `Legendary` (e.g. `Revolver`, `Improved Revolver`, …).
- Downtime moves: `Prepare (Short Rest)`, `Prepare (Long Rest)`.

Feature names (`Feature["name"]`) are **not** unique (e.g. many weapons have "Quick"); features are always scoped to their owner.

### Rules are not enforced

Types don't encode business rules. Counts, limits, and defaults are data, not type constraints:

- No tuples fixing counts (principles, experiences, domain cards, class items…). Arrays everywhere.
- No narrowed numeric ranges for stats (HP, Evasion, traits, Proficiency). Homebrew kit calls these "usually"/"typically".
- Defaults/limits exist as constants (`characterCreationRules`, `resourceLimits`, grants) for apps to enforce, warn on, or ignore.

Example: Orderborne says "record three principles". `OrderbornePrinciple` is `string`; the "Dedicated" feature grants `{ kind: "record", name: "Principles", count: 3 }`. App may require exactly 3, warn, or allow any number.

Descriptions (`Feature["description"]`) are authoritative. Users/apps read text to judge validity; structured data is a best-effort machine-readable summary.

Structure *is* encoded where it's semantic, not a rule:

- `Ancestry.features: readonly [top, bottom]` — mixed ancestry takes one top + one bottom (`MixedAncestry`).
- `Subclass` has `foundation` / `specialization` / `mastery`.
- `Beastform` is a `Standard | Evolved` union.

### Grants: machine-readable feature effects

`Feature.grants?: readonly Grant[]` encodes character-sheet-affecting effects of a feature. Attached to the feature (not the class/ancestry), so grants travel with it: mixed ancestry picks, subclass card progression, multiclass foundations.

`Grant` is a closed discriminated union:

| kind | meaning |
| --- | --- |
| `hitPointSlots`, `stressSlots`, `hopeSlots` | extra slots |
| `evasion`, `armorScore` | flat or referenced bonus |
| `damageThresholds` | bonus to `major` and/or `severe` |
| `rollBonus` | bonus to action/reaction/attack/damage rolls |
| `experienceBonus` | +N to M chosen Experiences |
| `domainCards` | extra domain cards |
| `weapon` | grants a weapon by name (Brawler's Strike) |
| `die` | named die with level progression + optional step ladder (Rally, Combo, Unstoppable, Patron) |
| `dicePool` | dice pool with count and/or max (Prayer Dice, Slayer Dice) |
| `tokens` | tracked tokens with starting/max (Favor, Focus) |
| `record` | player writes/chooses values: name, count, options, allowCustom (Principles, Patron, Element, Strange Patterns…) |
| `companion` | companion + starting stats |
| `companionUpgrades`, `companionEvasion`, `companionStressSlots`, `companionExperienceBonus`, `companionAttackStep` | companion modifiers |
| `martialStances` | starting stances, per-level gain, max tier |

`GrantValue` is `number | { equals: "spellcastTrait" | "proficiency" | "tier" | "level" }` for character-dependent values.

`record` grants are generic enough to render a form without SRD knowledge. `options` + `allowCustom` distinguish fixed choices (Elementalist) from examples (Sphere of Influence).

`die.progression` levels are relative to having the feature: Epic Poetry's `{ level: 1, value: "d10" }` = "d10 once you have this".

Only static, sheet-affecting effects are encoded. Conditional/situational/in-play effects ("once per rest", "while in Beastform", "when you roll with Fear", natural attacks like Elemental Breath) stay text-only. Domain cards currently have no grants. `grants` is optional; homebrew may omit it.

```ts
const features = [
  ...ancestry.features,
  community.feature,
  ...subclass.foundation,
];
const grants = features.flatMap((f) => f.grants ?? []);
const needsCompanion = grants.some((g) => g.kind === "companion");
const bonusHp = grants
  .filter((g) => g.kind === "hitPointSlots")
  .reduce((sum, g) => sum + g.amount, 0);
```

### Guides and suggestions

Authored suggestions, never requirements:

- `classGuides`: per-class summary, suggested traits/primary/secondary/armor (by name), clothes + attitude options, spell carrier prompt (Bard, Wizard, Witch).
- `characterDescriptionOptions`: shared eyes/body/skin options.
- `characterInspiration`: first/family names, region/place names, Experience ideas.
- `hopeAndFearStartingEquipment`: H&F starting gear lists.
- `exampleCompanionExperiences`, `exampleSpheresOfInfluence`, `exampleDrakonaBreathElements`.
- Class `backgroundQuestions` / `connectionQuestions`.

Source typos preserved verbatim ("indespensible", "hestation").

### Level/tier-scaled data

- `LevelScaled<T>`: `{ level, value }[]` — value applies from that level on.
- `TierScaled<T>`: `{ tier, value }[]`.
- `tierDefinitions` maps levels → tiers.

```ts
const at = <T,>(scale: LevelScaled<T>, level: number) =>
  scale.filter((s) => s.level <= level).at(-1)?.value;
```

## Files

| file | contents |
| --- | --- |
| `primitives.ts` | enumerations: traits, ranges, damage types, dice/`Roll`, tiers, levels, currency, domains, card types, conditions… |
| `models.ts` | all generic types incl. `Feature`, `Grant`, entity types, guide types |
| `classes.ts`, `subclasses.ts` | classes (+ questions), subclasses (+ grants) |
| `classGuides.ts` | class guides, description options, inspiration, H&F starting gear |
| `ancestries.ts`, `communities.ts`, `transformations.ts` | heritage + transformations (+ grants) |
| `domains.ts`, `domainCards.ts` | domain definitions, all domain cards |
| `weapons.ts`, `armor.ts` | core tables + Everyday Hero, Western, Monster Hunting, combat wheelchairs, `classFeatureWeapons` |
| `items.ts`, `consumables.ts` | loot tables |
| `beastforms.ts`, `martialStances.ts`, `companion.ts` | Druid, Martial Artist, Beastbound resources |
| `extras.ts` | option lists referenced by grants (`comboDice`, `sorcererElements`, `strangePatternsNumbers`, …) |
| `rules.ts` | creation rules, limits, currency, tiers, advancements (+ tiers/class), downtime/death moves, conditions, trait verbs, difficulties, benchmarks |
| `adversaries.ts`, `environments.ts` | name/tier indexes only (stat blocks not yet encoded) |

## SRD rules not (meaningfully) encoded

Useful for apps; enforce as desired.

### Character creation
- Trait modifiers: distribute `+2, +1, +1, 0, 0, −1` (`characterCreationRules.traitModifiers`).
- Start: level 1, Proficiency 1, 2 Hope, 6 Stress slots, class HP + Evasion, 2 Experiences at +2, 2 level-1 domain cards from class domains.
- Weapons: from Tier 1 tables, either one two-handed primary, or one-handed primary + one-handed secondary.
- One Tier 1 armor.
- Inventory: torch, 50 ft rope, basic supplies, a handful of gold, one of Minor Health / Minor Stamina Potion, one class item, spell carrier if applicable.
- Heritage = ancestry + community. Mixed ancestry: one top feature from one ancestry, bottom from another; heritage name is freeform.

### Derived stats
- Damage thresholds = armor base thresholds + level (+ permanent bonuses).
- Unarmored: Armor Score 0, Major = level, Severe = 2 × level.
- Armor Score = armor base score + permanent bonuses; max 12.
- Evasion = class starting Evasion + bonuses (armor/weapon features like Heavy −1, Flexible +1).
- Damage: roll Proficiency × weapon die; flat modifier added once, not multiplied.
- Damage severity: Minor = 1 HP, Major = 2, Severe = 3.
- Hope max 6; HP and Stress max 12; Fear max 12 (`resourceLimits`).
- Rounding: always round up unless stated.

### Equipment
- Max burden 2 hands; at most one Primary and one Secondary equipped.
- Magic-damage weapons require a Spellcast trait (from subclass).
- Can't equip weapons/armor above your tier.
- Up to 2 inventory weapons; swap free during rest/calm, else mark a Stress.
- One active armor; can't carry armor in inventory; can't equip under pressure.
- Max 5 of each consumable.
- Currency: 10 handfuls = 1 bag, 10 bags = 1 chest.

### Domain cards
- Only from your class's domains, level ≤ your level.
- Loadout max 5; extras go to vault. Subclass/ancestry/community cards don't count.
- Vault → loadout outside a rest costs Stress equal to recall cost.
- On level up: gain one card ≤ level; may exchange one card for another of same level or lower.

### Leveling up
- Tiers: 1 = level 1; 2 = 2–4; 3 = 5–7; 4 = 8–10.
- Tier achievements at 2/5/8: new Experience at +2, +1 Proficiency; 5 and 8 also clear marked traits.
- Each level: choose 2 advancements from your tier or below (`advancements[].tiers`); cost-2 options use both.
- Advancement slot counts per tier appear only on sheet art (not encoded).
- Trait increases mark traits; marked traits can't increase until cleared.
- Every level: all thresholds +1.
- Upgraded subclass: foundation → specialization → mastery; crosses out that tier's multiclass option.
- Multiclass (level 5+): second class, one of its domains, its class feature, one foundation card; domain cards from that domain ≤ ceil(level / 2); crosses out that tier's upgraded subclass and all other multiclass options. Choose which Spellcast trait to use if they differ.
- Extra domain card advancement capped at level 4 (tier 2) / 7 (tier 3) (`additionalDomainCardMaxLevelByTier`).
- Brawler Combo Die: +1 step via advancement, once per tier, d4 → d10.

### Class/subclass resources
- Companion: gains an Experience (+2) whenever the character does; one companion upgrade per character level; marks Stress instead of taking damage; drops out at last Stress, returns on long rest.
- Martial stances: known stances from your tier or lower; one active at a time.
- Beastform: tier ≤ character tier.
- Warlock Favor, Slayer Dice, Prayer Dice, Focus: session/rest refresh rules in feature text.

### Death & scars
- Marking last HP → death move (Blaze of Glory, Avoid Death, Risk It All).
- Avoid Death: roll Hope Die ≤ level → scar (permanently cross out a Hope slot). Last Hope slot crossed out ends the character's journey.
