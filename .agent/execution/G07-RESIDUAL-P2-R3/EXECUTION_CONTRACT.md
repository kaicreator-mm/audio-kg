# G07 supplemental R3 — finite witness repair contract

Exact base: 325d4205e609db0ecca09ebb051a03e5f7f487ee
Task: #129. One bounded PR covers only three residual P2 findings from independent reviews.

1. K06-R2-P2-01: compareSeries must reject null, undefined, primitive, array, and malformed series entries before property dereference. Preserve emergency/referral gate precedence. Return typed fail-closed results; no thrown TypeError.
2. K08-P2-R3-01: distinguish true orthogonality from a nonzero dot product lost through product or accumulation underflow. Use robust scaled accumulation if auditable; otherwise conservatively return NUMERIC_RANGE. Preserve true orthogonality NEGATIVE_INFINITY, zero vector UNDEFINED_ZERO, PERFECT, finite, and INVALID_INPUT.
3. K03-RV01: pitch/octave conversion must reject unsafe or nonfinite numeric intermediates; diatonic/written mapping must not propagate Infinity/unsafe integers. Retune must reject/mark UNKNOWN for nonfinite beat differences or derived seconds, including subtraction overflow of finite endpoints; preserve negative-gap rejection and valid exact-threshold pass.

No claim/source/case/relation/workflow corpus edits. Preserve all prior tests. Add independent counterexamples and boundary tests for each finding, test emergency precedence, distinguish product underflow from exact cancellation, and retain ordinary-range behavior. Re-run all applicable suites and shared pilot/F00/K07/CQ/K01/K04/CQ2/legacy regressions at the exact clean head. No actual human, audio, instrument, device, host, rights, clinical, or runtime claim. One independent batch review at exact SHA; no self-review/merge.
