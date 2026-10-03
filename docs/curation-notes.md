# Curation notes

Decisions made while transcribing `DH_SRD_2_2026_08_25.txt` into `src/data/srd/`. The SRD is authoritative; supplementary documents fill gaps it leaves.

## Sources

| Source | Use |
| --- | --- |
| `DH_SRD_2_2026_08_25.txt` | All mechanics and entity data |
| `Character-Sheets-and-Guides-*.txt`, `CharacterGuidesAndSheetsTile_HF_*.txt` | Class guides: suggested traits, gear, spell focus, description prompts |
| `Daggerheart-Hope-and-Fear-08-25-2026.txt` | Verified already applied in the SRD (Wolf Form, Darkfire, Summon Horror, Savor the Anguish, Invoke Torment) |
| `Daggerheart-Errata-September9th2025.txt` | Verified already applied in the SRD (Spear, Glowing Rings, Buckler, Knuckle Claws, Sweet Moss) |

## Judgment calls

- **Aetheris feature order**: the column layout is ambiguous; Celestial Wings is recorded first and Hallowed Aura second. This matters for Mixed Ancestry.
- **Ranger companion Stress**: neither the SRD nor the companion sheet states a starting number of Stress slots; the default is 3 and is editable.
- **Advancement slots**: the text exports list each tier’s options but not their checkbox counts. Slots follow the printed sheet layout: traits 3, Hit Points 2, Stress 2, Experiences 1, domain card 1, Evasion 1, upgraded subclass 1, Proficiency 2 and multiclass 2 (the last two are boxed, so one choice fills both). Subclass, Proficiency, and multiclass appear in tiers 3 and 4 only, matching the sheet text. Verify against the printed sheet.
- **Hedge mastery**: the SRD lists only Circle of Power under “Mastery Features”.
- **Item roll numbers** are omitted; the core and additional tables reuse the same numbers.
- **Brawler guide** suggests “Brawler’s Strike”, which is the “I Am the Weapon” class feature rather than a table weapon, so no primary weapon is suggested.
- **Sheet fields** (tokens, dice, choices, picks, companion) are app annotations on SRD features; their labels (e.g. “Known stances”, “Phase Die”) are not SRD text.

## Adversaries and environments

- Stat blocks were assembled from the SRD text by a review-driven script: each paragraph was assigned to its stat block by hand (the two-column layout interleaves blocks), then parsed. Every feature heading in the source appears exactly once, and every sentence was checked against the source.
- The PDF export encodes some digits as private-use glyphs (U+E53F for 0, U+E541–U+E549 for 1–9). These were decoded, recovering tier numbers, horde sizes (“5/HP”), Minion thresholds, and countdown values; decoded tiers match their sections.
- Environment feature prompts (the italic questions) are kept as a separate line after each feature’s rules text. Questions the column layout separated from their feature were reattached by topic.
- Campaign-frame adversaries (such as the Witherwild frame) are not included.

## Typos corrected

“temporararily” (Tempest), “particuarly” (Firbolg), “vampirisim” (Vampire), “indespensible” (Ranger guide), “hestation” (Warrior guide), “terain” (Terrible Lizard), doubled periods (Invoke Torment, Brave Face), missing periods (Wall Walk, Assassin description).
