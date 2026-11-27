# F00-R1 — direct/support-only CQ semantics

Owner: F00 follow-up #137. Consumers: K10 #97 and K15 #98. This is a shared-validator maintenance amendment, not a change to frozen L1/L2 or Task Pack rev1.

The validator now reads the exact frozen discovery contract for K10 and K15. K10 direct/support CQ columns are distinct. K15 D/S CQ matrix rows are distinct and O rows are not direct or support query assignments. Claim.cq must equal the exact D assignments; an empty array is valid only when the frozen D map for that D4 is empty. Support-only assignments never enter direct query results.

Regression suite: tests/knowledge/f00-module-cq-role.test.mjs (7 checks). It compares every K10/K15 D4 against frozen direct/support maps and verifies all 26 direct-CQ result sets per module, including no support-only leakage.

No source grades, claims, permissions, historical findings, rights status, or accepted-claim counts are changed.
