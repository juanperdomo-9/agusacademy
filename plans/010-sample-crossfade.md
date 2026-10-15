# 010 - Fade the sample class video in on play

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Missed opportunity
- **Estimated scope**: 1 file, ~6 lines

## Problem

In `components/sections/SampleClass.tsx` the poster is replaced by the iframe instantly, and the play button has no press feedback.

## Target

```css
.sample-frame iframe { animation: sample-in 240ms var(--ease-out); }
@keyframes sample-in { from { opacity: 0; } to { opacity: 1; } }
.sample-play svg { transition: transform var(--t-step) var(--ease-out), scale var(--t-press) var(--ease-out); }
.sample-poster:not(:disabled):active .sample-play svg { scale: 0.96; }
```

## Steps

1. Add the rules above to the "Clase de muestra" block of `app/globals.css`, replacing the existing `.sample-play svg` transition.

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
