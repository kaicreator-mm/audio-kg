# G07 R4 — K09/K14 bounded residual remediation

## Authority
Issue #133; parent #85; version branch version/v0.1.0.
Exact base: 166eedccf1175c02453dfb1bf36e8c6d3737bf8f (accepted R3 PR #130).
K09 review: #96 / PR #131, exact-head FAIL comment 7224813717.
K14 review: #95 / PR #132, exact-head FAIL comment 7224816008.

## Required fixes
- K09-R3-RECEIPT-01: cumulative suite arrays must include the accepted R3 K03/K06/K08 witness code and bind to the actual tested code/tree. Rerun all cumulative suites on the combined K09+K14 candidate.
- K09-RV01: HOLD automation changes at the reached keyframe, including the terminal keyframe; add exact-boundary and malformed-point tests.
- K09-RV02: tempo maps must reject gaps, overlaps, unsorted segments, missing beat-zero origin and malformed segments before partial integration; preserve contiguous piecewise integration.
- K14-R3-RECEIPT-01: same cumulative exact-test-subject requirement.
- K14-ED44-P2-01: align the synthetic score with explicit hard thresholds; carry the hard result separately from open-expression rater disagreement; do not infer outcomes from the ambiguous frozen source row.

## Scope
Only K09 automation/tempo witnesses and their tests, K14 ED44 authoring/ledger/candidate projection and semantic tests, and G07-R4 execution/validation evidence. Keep all claims unaccepted and rights UNKNOWN_NO_IMPORT. Do not change source anchors or frozen L1/L2 authority. Historical #49/#63 and split findings remain open.

## Validation
Run the full 15 distinct suites: F00, pilot, CQ, CQ2, legacy, K01-K08, K09 and K14. Record exact counts, result-array SHA256 values, test-subject commit/tree, final evidence commit/tree and the exact source-only delta. The independent Reviewer must rerun the 15 suites on the final PR HEAD and inspect both modules' full professional corpus.

## Completion
Builder may create a PR only after all scoped suites pass and receipts are pinned. No merge or issue closure until a separate non-writer Reviewer returns ACCEPT_SCOPED at the exact PR HEAD.
