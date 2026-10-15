# 009 - Stamp the 'Metodo completo' seal on completion

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Missed opportunity
- **Estimated scope**: 1 file, ~6 lines

## Problem

Completing all six modules is the page's one rare, high-emotion moment, but `.spread-seal[data-complete="true"]` (app/globals.css:348) only crossfades colors.

## Target

A one-time stamp when it turns complete, only while motion is enabled:

```css
html.motion .is-armed .spread-seal[data-complete="true"] { animation: seal-stamp 360ms var(--ease-settle); }
@keyframes seal-stamp { from { scale: 1.16; rotate: -5deg; opacity: 0.5; } to { scale: 1; rotate: 0deg; opacity: 1; } }
```

## Steps

1. Add both rules after `.spread-seal[data-complete="true"]`.

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
