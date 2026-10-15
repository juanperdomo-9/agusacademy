# 007 - Keep gentle fades for reduced-motion users

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Accessibility
- **Estimated scope**: 2 files, ~25 lines

## Problem

With `prefers-reduced-motion: reduce`, `components/Motion.tsx:17` returns early: no entrance feedback at all. The mobile CTA bar still slides (`.mobile-cta` uses `transform: translateY(100%)` with a 320ms transition in `app/globals.css`) and the gallery hover still lifts.

## Target

- Reduced motion: no Lenis, no parallax, no header hide, no movement. Entrances become a 300ms opacity fade only (no translate, no clip-path, no pass line).
- `.mobile-cta` under reduced motion: no translate; it fades with `opacity 200ms var(--ease-out)` plus `visibility`.
- Gallery hover under reduced motion: no lift, no zoom.

## Steps

1. `Motion.tsx`: if reduced, add `motion` and `reduce-motion` to `<html>`, tag reveals as usual and run the reveal check from a passive `window` scroll listener; skip Lenis, parallax and header logic.
2. CSS: `html.reduce-motion [data-reveal]` transitions only `opacity 300ms var(--ease-out)`; `:not(.is-in)` keeps `opacity: 0` with `translate: none` and `clip-path: none`; the `::after` pass line is hidden.
3. CSS `@media (prefers-reduced-motion: reduce)` for `.mobile-cta` and `.work-item .piece:hover` as above.

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
