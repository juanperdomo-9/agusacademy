# 005 - Batch parallax reads before writes

- **Status**: DONE
- **Commit**: 04aebfc
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 1 file, ~12 lines

## Problem

Each scroll frame interleaves a layout read and a style write per layer, forcing a style recalc per iteration.

```ts
// components/Motion.tsx:72-78 - current
for (const el of layers) {
  const r = el.parentElement!.getBoundingClientRect();
  if (r.bottom < -200 || r.top > vh + 200) continue;
  const speed = parseFloat(el.dataset.parallax || "0");
  const offset = (r.top + r.height / 2 - vh / 2) * speed;
  el.style.translate = `0 ${offset.toFixed(1)}px`;
}
```

## Target

Read every rect into an array first, then write every `translate` in a second loop. Same math, same speeds, same skip window.

## Steps

1. Rewrite the `parallax` function body as two loops (reads, then writes).

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
