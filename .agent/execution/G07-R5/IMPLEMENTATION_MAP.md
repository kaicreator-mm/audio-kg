# G07 R5 implementation map

| Finding | Source / implementation | Required witness |
|---|---|---|
| K14-LEGACY-ROUTE-PROJECTION-01 | cases/K14/frozen-input-ledger.json; tests/knowledge/K14/build-candidate.py; queries/K14/legacy-routes.json; tests/knowledge/K14/k14.test.mjs | Parse six exact source columns from each frozen anchor row; preserve inventory link, disposition, two route links/targets and two non-empty target claimRefs for all 48 rows; exact source-to-ledger-to-projection equality |
| K09-MP10-COMPRESSOR-INPUT-OUTPUT-01 | knowledge/K09/authoring.tsv; generated K09 candidate; tests/knowledge/K09/domain-witness.mjs; tests/knowledge/K09/k09.test.mjs | compressStatic(-9,-10,10) = -9.9, 0.9 dB gain reduction; original 0 -> -9 remains; active CaseView bound |
| K14-ED36-STRONG-BEAT-OVERCLAIM-01 | knowledge/K14/authoring.tsv; cases/K14/frozen-input-ledger.json; generated K14 candidate; K14 domain/test witnesses | [0.5,1.5) crosses beat boundary 1.0; no meter/accent map => strong-beat UNKNOWN; active CaseView bound |
