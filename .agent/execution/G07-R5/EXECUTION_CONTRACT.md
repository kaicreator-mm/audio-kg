# G07 R5 — K09/K14 cumulative semantic and legacy-route remediation

## Authority
Task #135; parent/planning #1/#85; K09 owner #96; K14 owner #95.
R4 predecessor task #133 and PR #134. R4 exact review FAIL: Issue comment 7225733783; PR discussion comment 7225734406.
R4 exact head/tree: 84bda81d0ef27c2b5bf488b1d7e95065a3ad870d / 40fae0dd7ff63ab7efe2dcfee707e19733d070f7.
Start this successor from that exact head. Preserve all five R4 fixes and R4 evidence.

## R5 findings
- P1 K14-LEGACY-ROUTE-PROJECTION-01: recover the six columns of all 48 frozen R3 legacy Markdown rows from each exact anchored row; preserve inventory link separately; restore the exact ROUTER_CANDIDATE/BOUNDED_COMPOSITION disposition, two candidate route targets and claimRefs; strengthen tests against empty/vacuous projection.
- P2 K09-MP10-COMPRESSOR-INPUT-OUTPUT-01: input -9 dB is 1 dB above -10 dB threshold. With hard knee, 10:1, no makeup, static output is -9.9 dB and gain reduction 0.9 dB. Keep original frozen input 0 -> output -9 dB witness. Bind arithmetic to the active CaseView.
- P2 K14-ED36-STRONG-BEAT-OVERCLAIM-01: [0.5,1.5) crosses integer beat boundary 1.0, but strong-beat status remains UNKNOWN without meter/accent map. Bind positive and negative semantic tests to the active CaseView.

## Scope
Only K14 legacy ledger/projection, K09 MP10 active authoring and finite calculation, K14 ED36 active authoring/ledger and finite beat/accent semantics, generated candidate projections, tests, and G07-R5 evidence. Do not modify frozen source Markdown, source anchors, rights, historical statuses, L1/L2 contracts or unrelated modules.

## Validation
Run the 15 distinct cumulative suites: F00, pilot, CQ, CQ2, legacy, K01-K08, K09 and K14. Pin per-suite counts and raw result SHA256, tested implementation HEAD/tree, final PR HEAD/tree, 147+ input identities and R4 inherited evidence identity. Rerun all 15 suites on exact final PR HEAD. No local-only test reconstruction.

## Completion
One combined R5 PR targeting version/v0.1.0. One separate OTHER_CONVERSATION_INDEPENDENT_NON_WRITER exact-head cumulative review of both complete modules and all three R5 findings. No merge before ACCEPT_SCOPED. On acceptance, merge the successor PR and close/supersede #133/#134 with explicit provenance; then re-read native DAG before dispatching K10 #97 and K15 #98.
