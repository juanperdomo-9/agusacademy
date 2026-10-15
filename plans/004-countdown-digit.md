# 004 - Shorten the countdown digit step

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: MEDIUM
- **Category**: Purpose & frequency
- **Estimated scope**: 1 file, 1 line

## Problem

The seconds digit replays a 320ms overshoot every second next to the main CTA: it is in motion a third of the time.

```css
/* app/globals.css:220 - current */
.countdown-value > span { display: block; animation: digit-step var(--t-step) cubic-bezier(0.3, 1.35, 0.5, 1); }
```

## Target

```css
.countdown-value > span { display: block; animation: digit-step 200ms var(--ease-settle); }
```
Depends on plan 001 (`--ease-settle`). Keep the keyframe and the "no fill-mode" choice: if the animation never runs, the digit stays visible.

## Steps

1. Replace the declaration above.

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
