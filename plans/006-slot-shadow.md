# 006 - Animate the course piece shadow with opacity, not box-shadow

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 1 file, ~10 lines

## Problem

Six pieces transition `box-shadow` over 600ms on every drop, which repaints every frame.

```css
/* app/globals.css:326-329 - current */
transition: transform var(--t-drop) ..., opacity 220ms var(--ease), box-shadow var(--t-drop) var(--ease);
/* app/globals.css:350-353 - unplaced state */
transform: translateY(-115%) rotate(calc(var(--tilt) * -5)) scale(1.04); opacity: 0; box-shadow: var(--shadow-air);
```

## Target

```css
.slot-piece::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: -1;
  box-shadow: var(--shadow-air); opacity: 0; transition: opacity var(--t-drop) var(--ease-out);
}
.is-armed .slot:not([data-placed="true"]) .slot-piece::after { opacity: 1; }
```
`box-shadow` leaves both the transition list and the unplaced state; the resting shadow stays static.

## Steps

1. Remove `box-shadow var(--t-drop) var(--ease)` from the `.slot-piece` transition.
2. Remove `box-shadow: var(--shadow-air);` from the unplaced rule.
3. Add the two rules above.

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
