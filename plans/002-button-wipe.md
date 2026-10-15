# 002 - Fix the button hover wipe, its timing and press feedback

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: HIGH
- **Category**: Easing & duration / Accessibility / Physicality
- **Estimated scope**: 5 files, ~30 lines

## Problem

On hover the label turns bone in 180ms while the coal fill takes 460ms to sweep across, so the right part of the label is bone-on-bone (invisible) for about 300ms. The wipe is also over the 300ms UI budget, is not gated to real pointers (a tap on touch triggers it), and the press scale snaps with no transition.

```css
/* app/globals.css:161 - current */
transition: background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
/* app/globals.css:165-172 - current */
.btn::before, .header-cta::before { ... transform: scaleX(0); transform-origin: right center; transition: transform 460ms var(--ease); }
.btn:hover, .header-cta:hover { background: var(--bone); color: var(--bone); }
.btn:hover::before, .header-cta:hover::before { transform: scaleX(1); transform-origin: left center; }
.btn:active { scale: 0.98; }
```

## Target

- The label is wrapped in `<span class="btn-label">` with `color: var(--bone); mix-blend-mode: difference;`: it reads dark over the bone ground and light over the coal fill, so the color flips exactly at the wipe edge. No color transition at all.
- Wipe: `transition: transform var(--t-hover) var(--ease-out)` (280ms); hover rules only inside `@media (hover: hover) and (pointer: fine)`.
- Press: `.btn:active, .header-cta:active { scale: 0.97; }` with `scale var(--t-press) var(--ease-out)` as the element transition.

## Steps

1. Wrap the visible text of every `.btn` and `.header-cta` in `<span className="btn-label">...</span>`: `components/sections/Hero.tsx`, `components/sections/Enrollment.tsx`, `components/MobileCta.tsx`, `components/Header.tsx`.
2. `app/globals.css`: `.btn` and `.header-cta` transition becomes `scale var(--t-press) var(--ease-out)` only.
3. Add `.btn-label { position: relative; color: var(--bone); mix-blend-mode: difference; }`.
4. Remove the color/background changes from `.btn:hover`, `.btn--dark:hover`, `.header-cta:hover`; the fill comes only from `::before`.
5. `::before` transition becomes `transform var(--t-hover) var(--ease-out)`; move the `:hover::before` rules into `@media (hover: hover) and (pointer: fine)`.
6. `.btn:active, .header-cta:active { scale: 0.97; }`.

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
