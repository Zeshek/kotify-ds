# AGENTS.md — Kotify Design System

## Purpose

This file defines global implementation and AI-agent rules for Kotify.
The Figma library and its **Documentation** page are the source of truth
for component appearance, variants, properties, tokens, and documented
behavior. This file provides global guardrails; it does not replace or
duplicate the component contracts documented in Figma.

When working on Kotify screens or code:

1. Reuse existing components and patterns.
2. Follow the relevant component contract in the Figma Documentation page.
3. Preserve the existing product flow and behavior.
4. Ask for clarification when the design does not specify a behavior; do
   not invent one.

## Source of truth

- **Figma is always the source of truth.** The live variables in the
  Kotify DS file (`a2v6x5b3ALVaR5Us1fdNGB`) define token names, values,
  aliases, scopes, and code syntax.
- If any written document (this file, a project brief, a README, a
  prompt, a code comment) disagrees with a value in Figma, **Figma wins**.
  Report the discrepancy instead of "correcting" Figma to match the text.
- Known example: some older written briefs list different hex values for
  `neutral-50`, `neutral-100`, `orange-50`, and `orange-100`. Those briefs
  are outdated; use the values from Figma. Do not reorder or "fix" the
  orange scale because `orange-100` is lighter than `orange-50` — that is
  the current Figma state.
- Never hard-code token values copied from documentation. Generate them
  from a Figma export.

## Non-negotiable design-system rules

- Follow the token dependency direction: **Primitives → Semantics →
  Component**. (The Figma Documentation phrases the same rule as the
  reference direction, "Component → Semantics → Primitives": components
  reference semantics, which reference primitives. Both describe the same
  hierarchy.)
- Component tokens must reference semantic tokens, not primitive tokens
  directly.
- Prefer existing semantic tokens over raw values.
- Do not invent, rename, duplicate, or silently replace tokens,
  components, variants, sizes, states, or patterns.
- Do not introduce a new abstraction just to make one isolated case look
  more systematic.
- Do not infer behavior from appearance alone. A visual component does
  not automatically imply an interaction, navigation destination,
  validation rule, or data source.
- Keep localization in mind. Avoid fixed heights when padding and
  content-driven sizing work; do not allow longer translated text to clip
  or overlap.
- Preserve existing component hierarchy and independently actionable
  controls. Do not turn a whole card into one control when it contains
  separate actions.
- Use the component contract before applying general layout conventions.
- If requirements conflict with the existing library or are
  underspecified, explain the conflict and ask rather than improvising.

## Token architecture

### Collections

- **Primitives**: foundational raw values (single mode).
- **Semantics**: meaning-based roles for color, typography, spacing,
  radius, and other shared design decisions (mode `KDS`).
- **Component**: component-specific decisions that alias semantic tokens
  (single mode).

Use the existing variables in the Figma file. Do not recreate the
collections in code by guessing values or token names.

### Colors

- Use the established semantic roles such as canvas, surface,
  on-surface, primary, secondary, border, and feedback.
- Existing feedback roles are named **positive**, **negative**, and
  **warning**; do not rename them to success/destructive/error without an
  explicit design-system decision.
- Preserve foreground/background contrast and do not communicate status
  or selection through color alone.
- Do not assume that every surface has global hover or pressed tokens.
  Follow the actual component tokens and contract.
- `colors/black` is intentionally `#000011`, not pure black. Do not
  "correct" it to `#000000`.

### Typography

- Use the existing semantic typography roles (`display-1`, `display-2`,
  `display-3`, `h1`, `h2`, `h3`, `body-1`, `body-2`, `label-1`,
  `label-2`, and `caption`) and the existing component typography tokens.
- Inter is used for UI and precision; Lora is used for editorial
  character. Follow the actual token aliases rather than inferring font
  family from size alone.
- A semantic typography token represents a text role; a component
  typography token represents its concrete use in a component.
- Do not create a special heading token merely to bind one isolated
  component property. A token should represent a reusable design
  decision, not exist only to eliminate an unbound property.
- **Time Picker:** the token `time picker/container/number/font-weight`
  (600, aliasing `font/h1/font-weight`) applies **only to the selected
  time number**. Unselected numbers use regular weight 400, intentionally
  unbound in Figma. Preserve this treatment unless a deliberate reusable
  token decision is made. Do not apply the token to unselected numbers and
  do not convert the unselected weight into an H1 token. In code, mirror
  Figma: bind the selected state to the token and leave the unselected
  400 weight as the component's local default, without creating a new
  token.
- **Caption letter spacing:** `font/caption/letter spacing` (1 px)
  intentionally aliases the spacing primitive `spacing/0,25`. It is a
  deliberate optical adjustment, not a modelling error. Do not "fix" the
  alias or create a dedicated tracking token for it without an explicit
  design-system decision.

### Spacing and layout

- Use semantic spacing tokens rather than arbitrary raw values.
- For roomy layouts and desktop documentation, `space/md` (16 px) is the
  default internal gap.
- For compact, mobile-first layouts, `space/base` (12 px) is a useful
  starting point.
- Use 4–8 px for tightly related elements, 24 px between related content
  groups, 32 px between distinct sections, and 40 px for major page
  regions. Follow the documented vertical-rhythm guidance and existing
  Auto Layout.
- The spacing scale is not entirely a multiple of four; do not round
  existing values to a presumed 4 px grid.
- Avoid redundant outer margins and fixed heights that can clip content.

### Radii

- Use the existing semantic radius tokens (`radius/none`, `sm`, `md`,
  `lg`, `xl`, `2xl`, `3xl`, `4xl`, `full`) instead of ad hoc values.

## Component inventory and source of truth

The current library documents these component families. Use the existing
library node and its documented contract; do not assume extra variants or
properties.

- Badge
- Bubble
- Button
- IconButton
- Card family: product, order, time-slot, upsell, checkout, checkout
  item, reservation
- Checkbox
- Counter
- Input
- Order bar
- Page Header
- Pills
- Radio Button
- Text Field
- Time Picker

Not part of the MVP inventory: a standalone **Divider** (use the
container's stroke with existing border tokens), **Tabs** (Pills cover
the existing lightweight navigation/filtering needs), and **Avatar**. Do
not create them because a generic UI kit has them.

The **Documentation** page in Figma contains the global principles,
vertical-rhythm rules, and component contracts. Treat the latest edited
version of that page as authoritative.

## Interaction, state, and accessibility

- Preserve only the states and properties that exist in the Figma
  component.
- Implement keyboard operation and appropriate semantic HTML/ARIA in
  code.
- Keyboard focus is a code-only treatment with `:focus-visible` (no
  Figma focus variant). Every interactive component uses the semantic
  focus tokens: `color/focus/ring` (orange-500; ≥ 3:1 on canvas, surface,
  surface-subtle and the dark secondary background), `focus/ring-width`
  (2 px) and `focus/ring-offset` (2 px), drawn as an outline outside the
  component. Do not create per-component focus colours.
- The effect styles `focus/*` and `shadows/*` in the Figma file come from
  a third-party UI kit and point to variables outside the Kotify
  collections. They are **not** part of Kotify DS: do not use them.
- Buttons are sized with horizontal and vertical padding, not fixed
  heights.
- **Button motion (all buttons, every variant):** hover lifts the button
  2 px (`translateY(-2px)`) and pressed scales it to 0.98, with a
  ~120 ms ease-out transition, disabled under `prefers-reduced-motion`.
  It applies on top of the colour tokens. Disabled buttons do not move.
  The same treatment applies to IconButton when it is implemented.
- **Secondary and destructive buttons:** hover and pressed intentionally
  keep their default background (`color/surface/subtle` and
  `color/feedback/negative-subtle`); their state feedback is the motion
  above. Do not add hover/pressed surface tokens for these cases.
- **IconButton:** `button[kdsIconButton]` with a required `label` input
  that becomes the accessible name. The icon is projected inline SVG with
  `fill="currentColor"`, sized by `iconbutton/size/*/icon-size`. Kotify
  icons are exported from Figma to `src/icons/`. The navigation variant
  keeps `surface/base` on hover and pressed (motion is its feedback) and
  uses the `elevation/raised` shadow.
- **Elevation:** Kotify has a single shadow, the effect style
  `elevation/raised` (`--elevation-raised` in code), used by the cards and
  the navigation IconButton. Use it for anything raised above the canvas;
  do not create per-component shadows or a size scale without a
  design-system decision. The `shadows/*` and `focus/*` effect styles in
  the file belong to the third-party kit and are not Kotify DS.
- **Primary disabled:** the label stays at 90 % opacity (other variants
  use 50 %) because 50 % did not meet legibility contrast on the disabled
  primary background. Do not "harmonise" it.
- Disabled controls must prevent their action and expose their disabled
  state semantically.
- Buttons need concise, action-oriented labels.
- Icon-only controls need an accessible name; add visible text or a
  tooltip when the action is not clear from context.
- Checkbox is for independent or multiple selection; Radio Button is for
  mutually exclusive selection.
- Pills are for the existing lightweight secondary navigation/filtering
  contexts, not a replacement for complex tabs or multi-step navigation.
- Do not rely on color alone to communicate selection, status, errors,
  or availability.
- Inputs and Text Fields need programmatic labels. Do not use placeholder
  text as the only label. Associate helper and validation messages
  semantically.
- Time Picker must expose the selected time and support keyboard
  operation in code. Do not invent intervals, availability, date rules,
  or selection patterns.
- Counter must respect limits supplied by the product/data flow. Do not
  invent minimums, maximums, stock, or quantity rules.
- Only interactive cards receive interactive behavior. Preserve
  independent actions inside cards. The pressed treatment is a scale to
  0.98 (≈100–150 ms ease-out), returning to 1.0, without shifting layout;
  respect `prefers-reduced-motion`.
- Do not infer payment, checkout, reservation, cancellation, or
  submission behavior from visual styling.

## Figma Make / AI implementation workflow

When rebuilding or extending a prototype:

1. Inspect the existing screen and identify the actual product flow
   before editing.
2. Map each visible element to an existing component or documented
   pattern.
3. Reuse the component and its existing properties; use semantic and
   component tokens from the library.
4. Preserve the established information hierarchy, responsive behavior,
   and product content.
5. Do not add decorative UI, extra components, sample data, unsupported
   actions, new states, or new token names unless explicitly requested.
6. When a required element has no documented component, report the gap
   and propose the smallest evidence-based change for approval before
   adding it.
7. After implementation, verify that components, states, token usage,
   keyboard behavior, and layout match the Figma source.
8. Report deviations and unresolved questions explicitly. Do not claim
   that a screen is fully compliant without checking it.

## Code implementation

### Stack

- **Framework:** Angular (the Kotify app will be built in Angular). The
  repository currently uses Angular 21 (LTS); moving to a newer major is
  a routine `ng update`.
- **Component workshop:** Storybook for Angular (`@storybook/angular-vite`).
- **Tokens:** CSS custom properties generated from a Figma variable
  export by `scripts/build-tokens.mjs` (see `tokens/README.md`). No
  Tailwind for now.
- **Components:** standalone Angular components with the `kds` prefix.
  Controls attach to native elements where one exists (Button is
  `button[kdsButton]`) so native semantics, keyboard behavior, and
  `disabled` keep working.
- **Scope order:** token pipeline and foundations first, then Button as
  the pilot component; validate before scaling to the other families.

### Token-to-code rules

- Generate CSS custom properties from the Figma export; never write
  token values by hand. After updating the export, run `npm run tokens`.
- Component styles reference **Component** tokens (for example
  `--button-size-large-px`), not semantic or primitive tokens, wherever a
  component token exists.
- Figma aliases with opacity (for example a disabled background at 50 %)
  are output as `color-mix(in srgb, var(--token) N%, transparent)`.
- When a Figma component binds a different token than the one its name
  suggests, mirror the component binding and report the inconsistency so
  it can be fixed in Figma.
- Use the name in each variable's Figma **code syntax** (`WEB`) as the CSS
  custom property name. The pattern is the variable path in lowercase,
  with `/`, spaces, and commas replaced by `-` (for example
  `spacing/0,5` → `--spacing-0-5`,
  `color/on primary/default` → `--color-on-primary-default`).
- Preserve aliases in the output: semantic properties reference primitive
  properties (`var(--…)`) and component properties reference semantic
  properties. Do not flatten them into raw values.
- Do not assume that a Figma code syntax label automatically creates CSS
  variables. Inspect the generated CSS and confirm names, alias
  resolution, units, and value formats.
- Keep focus-visible behavior, semantic markup, responsive layout, and
  interaction logic in code, without adding unsupported design variants
  to Figma.

### Sequencing

- The design-system repository (tokens, components, Storybook) is built
  from the Figma library and can progress independently of the
  prototype.
- Integration with the product prototype and app screens waits until the
  prototype has been rebuilt with Kotify DS and validated.

## Definition of done

A change is ready for review when:

- It uses existing components, variants, properties, and tokens wherever
  possible.
- It follows the documented component contract and **Primitives →
  Semantics → Component** hierarchy.
- It preserves the existing user flow and does not invent behavior or
  data.
- Token values come from the Figma export, not from written
  documentation.
- Text remains readable and layouts tolerate localization and responsive
  widths.
- Keyboard operation, visible focus, accessible names/labels, and
  semantic states are addressed in code.
- Any unavoidable deviation is identified and explained.

## Change log

- **2026-10-19**
  - Figma declared the source of truth for all token values; outdated
    hex values in older briefs are superseded.
  - `colors/black` confirmed as intentionally `#000011` (not pure
    black); documented in its Figma description.
  - Time Picker weight token is named
    `time picker/container/number/font-weight` (no "selected"), matching
    its code syntax; its description now states it applies to the
    selected number only.
  - Caption letter-spacing alias to `spacing/0,25` documented as
    intentional, in Figma and here.
  - Code stack set: Angular, Storybook, CSS custom properties.
  - Code repository created (github.com/Zeshek/kotify-ds) with the token
    pipeline, Storybook foundations, and Button as the pilot component.
  - Semantic focus tokens created in Figma: `color/focus/ring`,
    `focus/ring-width`, `focus/ring-offset` (Semantics: 104 variables;
    total 593).
  - Ghost and destructive disabled states now bind their own
    `disabled-background` tokens in Figma.
  - Secondary button hover/pressed resolved with motion instead of new
    colour tokens; primary disabled label at 90 % documented as an
    accessibility decision.
  - Motion (hover lift 2 px, pressed scale 0.98) extended to every
    button variant, and to IconButton when it is built.
  - shadcncraft kit leftovers removed from the Figma file: the kit cover
    on Base Components and the "Get the full kit" frame were deleted, and
    the 32 kit Separator instances in the documentation frames were
    detached. Icon sets (Lucide, Tabler, Phosphor) and the payment/platform
    logos in Assets were kept.
  - Template subtitles from the kit replaced on every component page;
    Text Field resize icon bound to `input/default/foreground`.
  - IconButton implemented in code; Button and IconButton share the
    motion and focus mixins (`src/lib/styles/_motion.scss`).
  - Effect style `elevation/raised` created in Figma with the card shadow
    and applied to the cards and the navigation IconButton (whose shadow
    had drifted: second layer spread 0 instead of −1).
