# Implementation map
- tests/knowledge/K06/domain-witness.mjs: guard the complete four-stage series envelope before mapping; keep gate precedence.
- tests/knowledge/K08/domain-witness.mjs: calculate dot product with explicit product-underflow detection / conservative numeric state; preserve SI-SDR state distinctions.
- tests/knowledge/K03/domain-witness.mjs: safe pitch and diatonic integer conversions; safe written pitch arithmetic; finite retune gap derivation.
- Module tests: add null/undefined/malformed, underflow-vs-orthogonal, and unsafe-pitch/overflow-gap witnesses.
- Allowed write set: only the three listed witness/test files and docs/validation/{K06,K08,K03}/ review receipt/contract files. No knowledge/case/source changes.
