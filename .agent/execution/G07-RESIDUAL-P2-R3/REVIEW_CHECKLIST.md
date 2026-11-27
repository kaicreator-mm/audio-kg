# Independent review checklist
- Exact base/head/tree; clean working tree; changed paths within allowed write set.
- Reproduce previous review repros exactly and prove each new P2 fixed.
- K06: null, undefined, primitive, array, missing records/events, duplicate IDs, valid series, emergency precedence.
- K08: t=1e-200 nonzero dot; t=1e-170/1e-160 boundaries; exact orthogonal nonzero products; zero vectors; perfect match; mixed scale and finite regular signals.
- K03: 400-digit octave; unsafe integer octave; valid C-1 and normal transposition; finite endpoints whose difference overflows; derived-seconds overflow; negative gap; exact threshold.
- Run full module and shared cumulative regression suites; compare exact result arrays.
- No actual audio, human, instrument, runtime or rights claims. Report P0/P1/P2/P3 and ACCEPT_SCOPED/FAIL separately.
