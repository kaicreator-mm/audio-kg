# G07 R4 implementation map

| Finding | Implementation | Witness |
|---|---|---|
| K09-RV01 | tests/knowledge/K09/domain-witness.mjs::envelope | exact first/intermediate/terminal HOLD points, LINEAR terminal and malformed/duplicate points |
| K09-RV02 | tests/knowledge/K09/domain-witness.mjs::tempoTime | contiguous valid map; gap, overlap, unsorted, missing origin and invalid trailing segment reject |
| K14-ED44-P2-01 | cases/K14/frozen-input-ledger.json, knowledge/K14/authoring.tsv, tests/knowledge/K14/build-candidate.py | explicit 2/2 and 4/4 hard thresholds; 3/4 pitch score; separate A/B ratings and frozen-source provenance note |
| K14 ED44 semantics | tests/knowledge/K14/domain-witness.mjs, tests/knowledge/K14/k14.test.mjs | hard gate and open-rater disagreement are independently represented and fail closed on malformed rubric |
| K09/K14 receipt P1 | docs/validation/G07-R4/** | full 15-suite arrays bound to exact code/test subject and final evidence tree |
