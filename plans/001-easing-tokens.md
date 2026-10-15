# 001 - Consolidate easing curves into tokens

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (app/globals.css), ~10 lines

## Problem

The base curve is a mild ease-out and two near-identical overshoot curves are hand-typed:

```css
/* app/globals.css:36 - current */
--ease: cubic-bezier(0.25, 1, 0.5, 1);
/* app/globals.css:220 - current */
.countdown-value > span { display: block; animation: digit-step var(--t-step) cubic-bezier(0.3, 1.35, 0.5, 1); }
/* app/globals.css:327 - current */
transform var(--t-drop) cubic-bezier(0.3, 1.25, 0.5, 1),
```

## Target

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* strong ease-out for UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
  --ease-settle: cubic-bezier(0.3, 1.3, 0.5, 1);   /* brand "step and settle" overshoot */
  --ease: var(--ease-out);                         /* legacy alias: keeps every existing use */
  --t-press: 120ms;
  --t-hover: 280ms;
}
```
Both hand-typed overshoot curves become `var(--ease-settle)`.

## Steps

1. In `:root`, replace `--ease: cubic-bezier(0.25, 1, 0.5, 1);` with the six token lines above.
2. In `.countdown-value > span`, replace `cubic-bezier(0.3, 1.35, 0.5, 1)` with `var(--ease-settle)`.
3. In `.slot-piece` transition, replace `cubic-bezier(0.3, 1.25, 0.5, 1)` with `var(--ease-settle)`.

## Repo conventions to follow

- Motion tokens live in the `:root` block of `app/globals.css` (next to `--t-fast`, `--t-step`, `--t-drop`); motion JS lives in `components/Motion.tsx`.
- Exemplar of the state-attribute pattern: `.mobile-cta[data-visible="true"] { transform: none; }` (an attribute flips a transitioned property).

## Boundaries

- Do NOT touch files other than the ones named in the plan.
- Do NOT change copy, layout or colors; motion properties only (unless a step says otherwise).
- Do NOT add dependencies.
- If the current code does not match the excerpts (drift since commit 04aebfc), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit -p .` passes; `npx next build` succeeds.
- **Feel check**: run `npm run dev`, open http://localhost:3000 at 1440px and 390px, trigger the interaction, and in DevTools > Animations set playback to 10% to confirm the target values. Toggle `prefers-reduced-motion` in DevTools > Rendering and confirm movement is dropped while opacity feedback remains.
- **Done when**: every Target value is present verbatim and the feel check passes.
