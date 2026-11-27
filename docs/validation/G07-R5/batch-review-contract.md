# G07 R5 combined K09/K14 exact-head independent review contract

Repository kaicreator-mm/audio-kg; remediation Issue #135; K09 owner task #96; K14 owner task #95.
R4 predecessor PR #134 exact head 84bda81d0ef27c2b5bf488b1d7e95065a3ad870d; R4 independent FAIL comment #133/7225733783 and PR discussion #134/7225734406.
The successor branch must descend from that exact R4 head and target version/v0.1.0.

Review the three findings in .agent/execution/G07-R5/FAILURE_MATRIX.yaml. Independently rerun all 15 suites in .agent/execution/G07-R5/TEST_MATRIX.yaml on exact final PR HEAD and compare every result array and SHA256. Inspect input identities, clean tree, test subject and final evidence-only delta. Verify inherited R4 fixes and evidence remain intact.

K14 legacy projection: read all 48 anchored rows in docs/product/calibration/music-education-r3-legacy-convergence.md through the exact frozen anchors; compare all six columns to cases/K14/frozen-input-ledger.json and queries/K14/legacy-routes.json. Require exact dispositions (24 ROUTER_CANDIDATE, 24 BOUNDED_COMPOSITION), exactly two valid route targets and two non-empty claimRefs per row, no missing/duplicate/dangling refs, and no empty-array vacuous pass. Keep all navigation conditional and non-equivalent; do not close historical finding #63.

K09 MP10: verify the active forward view is mathematically correct for -10 dB threshold, 10:1 hard knee, no makeup and -9 dB input: static output -9.9 dB, gain reduction 0.9 dB. Preserve frozen 0 dB -> -9 dB witness. Static curve is not real transient/plugin output.

K14 ED36: verify event interval [0.5,1.5) crosses integer beat boundary 1.0, but no strong-beat classification is possible without meter/accent map; strong-beat status remains UNKNOWN. The active question, expected result and ledger must agree.

Complete-module review must preserve the R4 boundaries: K09 historical finding #49 and seven split-open routes remain open; K14 historical finding #63 remains OPEN_GATE_NOT_CLOSED_BY_AUTHOR. All claims remain CANDIDATE; acceptedClaims=0; rights UNKNOWN_NO_IMPORT; external execution UNKNOWN_NOT_EXECUTED. No real audio, plugin, host, rights, learner, teacher efficacy, clinical or production claims.

Role: OTHER_CONVERSATION_INDEPENDENT_NON_WRITER, read-only. Return P0/P1/P2/P3 and exact ACCEPT_SCOPED or FAIL; no code edits, merge or automatic closure.
