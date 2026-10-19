# DESIGN.md — SEER / Electric Foundation

## 1. The visual idea

Seer is presented as civic machinery: a deep violet-black field, precise hairline grids, and one repeating probability instrument — the dot matrix — carried across every surface. Marketing pages read like an engineering dossier; market pages read like an instrument panel, with data seated on visible foundations rather than floating in cards. Colour is reserved for signal: violet for live probability, one red for live status, neutrals for the apparatus, and a measured ramp for risk.

The family is deliberately quiet about "web3" and loud about legibility: every page answers a decision question, every number says what it is and when it closes, and every chart can be read without colour alone.

## 2. Colour tokens

### Dark (default)

| Token | Value | Usage |
| --- | --- | --- |
| `--bg` | `#101013` | Page background |
| `--hero` | `#0c0a16` | Home hero, dark feature surfaces |
| `--card` | `#1a1a1e` | Cards, panels |
| `--surface` | `#1f1f24` | Nested rows, fields |
| `--surface-2` | `#232329` | Chips, hover rows, quick-add |
| `--text` | `#ededf2` | Primary text |
| `--text-2` | `#a8a8b3` | Secondary text (7.37:1 on card) |
| `--muted` | `#86868e` | Meta, labels (4.8:1 on card; departure D1) |
| `--primary` | `#7d33ff` | Fills, bars, focus accents; never small text on dark |
| `--violet-text` | `#a98af5` | Violet small text / links on dark (6.31:1 on card; D3) |
| `--violet-soft` | `#241e33` | Secondary button, "No" surface |
| `--violet-2` | `#9c6ff2` | Text on secondary button (4.56:1) |
| `--live` | `#dc251c` | Live dot only |
| `--live-text` | `#ff8b82` | Live label (7.66:1; G1) |
| `--success` | `#7ad9b0` | Confirmed states only |
| `--warning` | `#f0b46a` | Attention, never risk severity |
| `--focus` | `#a98af5` | 2px ring, 2px offset |
| `--line` | `rgba(237,237,242,.11)` | Hairline rules |
| `--line-strong` | `rgba(237,237,242,.20)` | Emphasised rules |
| `--track` | `#242238` | Probability track |
| `--chart-1` | `#a98af5` | Primary series |
| `--chart-2` | `#7d33ff` | Contrast series |
| `--chart-3` | `#6f6b8f` | Neutral series |
| `--chart-4` | `#d8ccff` | Light series |

### Light

| Token | Value | Usage |
| --- | --- | --- |
| `--bg` | `#f7f7f9` | Page background |
| `--hero` | `#f0edf9` | Light-mode hero field |
| `--card` | `#ffffff` | Cards |
| `--surface` | `#f1f1f4` | Nested rows |
| `--surface-2` | `#e8e6ef` | Chips, hover rows |
| `--text` | `#17171c` | Primary text |
| `--text-2` | `#5c5c66` | Secondary text |
| `--muted` | `#6d6d78` | Meta (4.78:1 on page; D1) |
| `--primary` | `#7d33ff` | Fills, bars (5.54:1 on white) |
| `--violet-text` | `#6c2bd9` | Small violet text (5.94:1 on `#efe9fc`) |
| `--violet-soft` | `#efe9fc` | Secondary button |
| `--violet-2` | `#6c2bd9` | Text on secondary |
| `--live` | `#c21c14` | Live dot |
| `--live-text` | `#a11912` | Live label (7.89:1 on white) |
| `--focus` | `#6c2bd9` | Focus ring |
| `--line` | `rgba(23,23,28,.12)` | Hairline rules |
| `--line-strong` | `rgba(23,23,28,.22)` | Emphasised rules |
| `--track` | `#d9d7e2` | Probability track |
| `--chart-1` | `#6c2bd9` | Primary series |
| `--chart-2` | `#9b6bf0` | Contrast series |
| `--chart-3` | `#8e8a9c` | Neutral series |
| `--chart-4` | `#c9b6f7` | Light series |

Usage rules: violet fill may carry white or `#ededf2` text; `--primary` is never used for body-size text on `#101013` (3.4:1); `--live` is a dot, not a label; the only red text is `--live-text`; risk severity uses the violet sequential ramp, not traffic-light red/green. Borders are always hairlines, never glows.

## 3. Type, spacing, shape, elevation, motion

**Family.** Display and UI: `Inter Tight` (fallback for the unavailable commercial PP Neue Montreal, D4), weights 400/500/600. Data labels and figures: `IBM Plex Mono`, weights 400/500. Numerals are tabular in tables and tickets.

**Scale.** Display 76/0.95/-0.045em; H1 56/0.98/-0.04em; H2 36/1.04/-0.035em; H3 22/1.15/-0.02em; title 16/1.25; body 15/1.55; small 13/1.5; meta 12/1.45; micro 10/1.2/+0.14em uppercase mono. Probability display 46–68 with tabular numerals. Ticket amount 32/-0.02em.

**Spacing.** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120. Page gutter `clamp(20px, 3.3vw, 48px)`; max content 1440; section rhythm 96 desktop / 64 tablet / 48 mobile. Grid: 12 columns, 24px gap.

**Radii.** Hero buttons 0; chips 4; rows/inputs 8; panels 16; market cards 22; feature cards 28; nav pills 32; status pills 999.

**Elevation.** E0 flat hairline; E1 `0 1px 0 rgba(255,255,255,.04) inset, 0 18px 40px -32px rgba(0,0,0,.9)`; E2 `0 30px 80px -48px rgba(0,0,0,.95)`. Elevation is structural, never glossy.

**Motion.** Micro 160ms; state 280ms; data reveal 600ms; `cubic-bezier(.2,.7,.2,1)`. Dot fields resolve once on entry; no looping motion except the live dot and chart cursor. All motion disabled under `prefers-reduced-motion: reduce`.

**Breakpoints.** 1180 (compact desktop), 900 (tablet), 680 (mobile), 390 reference width. No content is removed on mobile, only reflowed; nav becomes a scrollable product rail.

## 4. Component inventory

Reused from the EF kit: top bar, category tabs, market card, outcome row, Yes/No chips, binary card, three-way card, trade ticket (amount, quick-add, confirm, close), gradient probability bar, dot matrix, muted footer meta, 22px cards, 8px rows, 4px chips.

Added and owned by `shared/shared.css` / `shared/shared.js`: section header with index, protocol rail, metric strip, status tag, filter bar, segmented control, search field, data table, detail panel, side drawer, tooltip, line chart, bar chart, scatter plot, stacked bar, heatmap, sparkline, skeleton, empty state, toast, compare tray, theme toggle, footer.

All interactive components are native buttons/inputs/links, have `:focus-visible`, and never rely on hover alone. Charts expose an adjacent visually-hidden table of the same values.

## 5. Page concepts and signatures

| Page | One-line concept | Signature visual |
| --- | --- | --- |
| **Home** | The protocol beneath the products. | A layered foundation cutaway: five app strata seated on four protocol primitives, beside a dot-matrix probability field that resolves into a live market card. |
| **App** | Seer's Etherscan: every market, one precise index. | A split-pane explorer with a dense, keyboard-navigable market index on the left and an instrument-grade market record on the right; probability bars repeat as a vertical rhythm. |
| **Deep** | Thirty possible futures, read as one field. | A dot-matrix field where each proposal is a cluster sized by probability, with a ranked signal list and separate AI / human trade lanes. |
| **Futarchy** | One proposal, two conditional futures. | Twin "if passed / if rejected" trajectories with the gap between them filled as a measured band, not a verdict. |
| **Opportunity** | One market that allocates attention. | A single 100% stacked allocation bar with 14 outcomes, paired with a reviewer panel that keeps price beside judgement. |
| **Risk** | Risk expressed in comparable units. | A protocol × risk-type heatmap with an explicit 30/90/365-day horizon rail and a four-protocol compare tray. |

## 6. Departures, consolidated

The kit remains the visual source. These six groups collect every deliberate departure and the evidence behind it. No taste-only departures remain. The earlier numbering is retained here only where it is useful for tracing a decision.

### G1. Colour and contrast

The kit's muted `#86868e` / `#6d6d78` and small violet `#563e83` measure below AA for small text. Muted text is therefore `#86868e` dark / `#6d6d78` light; small violet text is `#a98af5` (6.31:1 on cards); the live label uses `#ff8b82` dark / `#a11912` light while the live dot stays kit red. Red is reserved for the live index dot; open is neutral, resolving violet, closing amber, resolved green. The risk ramp uses six quantile steps in the kit violet and was contrast-checked in both themes. Evidence: 0 contrast failures at 1440 in dark and light.

### G2. Type, spacing and shape

PP Neue Montreal is commercial and unavailable, so Inter Tight is the fallback and IBM Plex Mono carries technical figures. The kit's 10–16px sizes were too small on laptops: the root is rem-based at 112.5% (1024px), 125% (1440px) and 137.5% (1920px). At 1440 the floors are 18.75px body, 16px rows, 17px row titles, 16.8px controls, 15.6px mono/grey/chart labels. Display/h1/h2 tracking is capped at `-.02em` with 1.05 line-height. Stat strips use one cell padding token and a `.5rem` label gap. Evidence: 1280/1440 font audit reports 0 elements below 14px.

### G3. Brand assets and surfaces

The package supplied poster raster art, not SVG. The 345×96 lockup and 96×96 mark were extracted at full resolution from the 2160×2700 artboard, made alpha, and used through masks without redrawing. Square hero buttons and pill nav controls follow the landing sketch. The Home feature card stays dark in light mode as a deliberate brand object. The ray artwork is a low-opacity hero fade. Evidence: header/footer use the exact extracted lockup; no vector approximation remains.

### G4. Market semantics and content

All figures are invented but plausible and labelled illustrative. Risk is a matrix of market-implied estimates with liquidity bands, not a rating. Reviewer scores and notes remain separate from prices. Real regulators, companies, teams and protocols in market questions and tables were replaced with fictional counterparts (Federal Markets Board, Meridian Reserve, Aster CPI, Aurelia, Brine, Coil, Eidolon, and the rest). The same fictional grant round (Open Grants Round 7) now runs through Home, Deep, Opportunity and the Futarchy proposal. Evidence: no real protocol names in the datasets; Opportunity is a 14-of-30 subset of Deep with matching titles and teams.

### G5. Instruments and data display

Charts and the Deep dot field measure their container, use a 1:1 viewBox and redraw through ResizeObserver; text is sized in rem. App price charts add Fit/Full and volume bars. The risk heatmap has six quantile steps, an explicit six-swatch legend, a single 90D horizon label, and exact values in every cell. Trade impact is violet-only and empty at zero. Opportunity probability bars are normalised to the top outcome while exact percentages stay as text. Evidence: chart viewBox equals rendered width (820/820 at 1440); +N hidden-outcome rows use real counts and sums.

### G6. Interaction, accessibility and performance

Dark mode is the default with a persistent toggle on every page. The six-product header is the only sticky element; the App filter bar scrolls away. Mobile uses a scrollable product rail. Launch app is absent on the App page, including mobile. Touch targets are at least 44px on phone; focus rings are 2px with offset; chart tooltips are keyboard reachable; reduced-motion is respected; every page has one h1 and proper landmarks. The centre hairline behind prose was removed. Evidence: 390/768/1280/1440/1920 checks show no sideways scroll; focus ring visible; 44px targets; static page weight about 238 KB on Home and 184 KB on App.
