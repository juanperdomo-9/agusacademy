# Animation plans

Written by `improve-animations` at commit 04aebfc (tag `antes-auditoria-animaciones`).

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Consolidate easing curves into tokens](001-easing-tokens.md) | LOW | DONE |
| 002 | [Fix the button hover wipe, its timing and press feedback](002-button-wipe.md) | HIGH | DONE |
| 003 | [Make the hiding header respond faster, asymmetric](003-header-timing.md) | MEDIUM | DONE |
| 004 | [Shorten the countdown digit step](004-countdown-digit.md) | MEDIUM | DONE |
| 005 | [Batch parallax reads before writes](005-parallax-batching.md) | LOW | DONE |
| 006 | [Animate the course piece shadow with opacity, not box-shadow](006-slot-shadow.md) | LOW | DONE |
| 007 | [Keep gentle fades for reduced-motion users](007-reduced-motion.md) | LOW | DONE |
| 008 | [Open and close FAQ answers smoothly](008-faq-accordion.md) | LOW | DONE |
| 009 | [Stamp the 'Metodo completo' seal on completion](009-seal-stamp.md) | LOW | DONE |
| 010 | [Fade the sample class video in on play](010-sample-crossfade.md) | LOW | DONE |

## Execution order

1. **001** first: it defines `--ease-out`, `--ease-settle`, `--t-press` and `--t-hover`, used by 002, 003, 004, 006, 008, 009 and 010.
2. **002** (the only HIGH), then 003 and 004.
3. 005, 006 and 007 are independent of each other.
4. 008, 009 and 010 are additive opportunities: do them last.
