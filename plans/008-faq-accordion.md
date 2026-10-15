# 008 - Open and close FAQ answers smoothly

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Missed opportunity
- **Estimated scope**: 1 file, ~8 lines

## Problem

`components/sections/Faq.tsx` uses `<details>`; the answer teleports open and closed.

## Target

```css
:root { interpolate-size: allow-keywords; }
.faq-list details::details-content {
  block-size: 0; overflow: hidden;
  transition: block-size 250ms var(--ease-out), content-visibility 250ms allow-discrete;
}
.faq-list details[open]::details-content { block-size: auto; }
@media (prefers-reduced-motion: reduce) { .faq-list details::details-content { transition: none; } }
```
Browsers without `::details-content` keep the instant behavior (progressive enhancement).

## Steps

1. Add the rules above to `app/globals.css` (the `:root` line inside the existing `:root` block).

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
