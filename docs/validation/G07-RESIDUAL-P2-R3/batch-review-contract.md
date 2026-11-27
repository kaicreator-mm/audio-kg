# G07 supplemental R3 — exact-head independent review contract

Repository kaicreator-mm/audio-kg; Task #129; exact base 325d4205e609db0ecca09ebb051a03e5f7f487ee; tested HEAD 8a23b3c726ac549d138e6e69012002afb993f9cc; tree ee0f9cdbcf721cc01ad012c8f85eecc25426ee70.

Independent review must verify the three exact residual findings and no broader corpus review:
- K06-R2-P2-01: null/undefined/primitive/array/malformed entries are rejected without throw before dereference; emergency and symptom gates dominate malformed input; valid four-phase sequence and distinct identities remain unchanged.
- K08-P2-R3-01: nonzero cross-dot underflow and compensation/accumulation loss cannot be returned as true orthogonality. Conservative NUMERIC_RANGE is acceptable. True exact cancellation remains NEGATIVE_INFINITY; zero vector UNDEFINED_ZERO; PERFECT/FINITE/INVALID_INPUT preserved. Reproduce t=1e-160/1e-170/1e-200/1e-250 and a representable-but-lost-small-addend case.
- K03-RV01: unsafe/nonfinite pitch and diatonic intermediates return null/UNKNOWN; written pitch mapping fails closed; finite endpoints whose difference overflows and finite derived time overflow return UNKNOWN; underflow-to-zero positive retune gap returns UNKNOWN; negative gap rejects; ordinary exact threshold passes.

Rerun 11 suites and compare exact result arrays to the receipt. Verify all input path identities, exact tested HEAD/tree, changed-path allowlist, clean tree, syntax and diff check. No edits to claims, sources, cases, relations, workflows or any historical finding. No actual performance/listening/learner/device/host/right/clinical/runtime claim. Report P0/P1/P2/P3, exact ACCEPT_SCOPED or FAIL, and do not auto-close historical issues.
