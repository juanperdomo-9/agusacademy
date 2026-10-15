# 003 - Make the hiding header respond faster, asymmetric

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file, 2 lines

## Problem

The header slides on every scroll-direction change at 420ms; scrolling up to reach the nav feels laggy.

```css
/* app/globals.css:138 - current */
transition: translate 420ms var(--ease);
```

## Target

Showing is the response the user waits for, so it is faster than hiding:

```css
.header { transition: translate 200ms var(--ease-out); }
.header.is-hidden { translate: 0 -100%; transition-duration: 260ms; }
```

## Steps

1. Replace the `.header` transition with `transition: translate 200ms var(--ease-out);`.
2. Add `transition-duration: 260ms;` to `.header.is-hidden`.

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
