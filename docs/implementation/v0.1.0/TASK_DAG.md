# v0.1.0 — G07 frozen planning Task DAG (not live status)
#85 planning; exact L2 freeze 2bdb455ae423844f450ac41d05eb9070dd791237; [Task Packs](TASK_PACKS.json) rev1 at 01be1cc2c87364d1b91d85f4d21d79ccc5cd2e11. Original [implementation plan](../knowledge-graph-plan.md) and [L1 residuals](../../product/calibration/g05-r2-historical-findings-residual-gates.md) retain scope. 22 executable tasks, 60 direct dependencies including completed G06 (#83), acyclic topological sort verified. Risk/acceptance/required validation and write sets in task packs; one concern/complete domain per PR, JIT branches only, Web Builder + real scoped server tests; independent review required for all content, F00 affected gate and integrated acceptance. L3 exact-base evidence prepared when ready. This is planning checkpoint, not native DAG; native Issue IDs and edges verified separately via #85. No status edits to this file. Owner continuation and original plan route authorize decomposition, no new normative product or architecture change; planning review recommended SKIP (actual deterministic graph and coverage checks, mandatory per-task independent gates preserved).
| Task | Wave | Description | Direct predecessors | Risk |
|---|---|---|---|---|
| F00 | Foundation | G07-F00 资格隔离修复与正式知识最小验证入口 | G06 | high |
| K01 | W1 | G07-K01 乐理正式知识资产 | F00 | medium |
| K07 | W1 | G07-K07 声学与听觉正式知识资产 | F00 | medium |
| K05 | W2 | G07-K05 声乐科学正式知识资产 | K01, K07 | high |
| K08 | W2 | G07-K08 数字音频正式知识资产 | K01, K07 | medium |
| K02 | W3 | G07-K02 作曲创作正式知识资产 | K01 | medium |
| K03 | W3 | G07-K03 编曲配器正式知识资产 | K02 | medium |
| K04 | W3 | G07-K04 演奏表现正式知识资产 | K01 | medium |
| K06 | W4 | G07-K06 声乐训练正式知识资产 | K05, K04 | high |
| K14 | W4 | G07-K14 音乐教育正式知识资产 | K06, K02 | medium |
| K09 | W5 | G07-K09 音乐制作正式知识资产 | K08, K03, K04 | medium |
| K10 | W5 | G07-K10 音乐理解与评价正式知识资产 | K09, K05, K02 | medium |
| K15 | W6 | G07-K15 制作治理与权利正式知识资产 | K09 | high |
| K11 | W6 | G07-K11 AI音乐模型正式知识资产 | K10, K15 | high |
| K12 | W6 | G07-K12 工具与编排正式知识资产 | K11, K15 | high |
| K16 | W8 | G07-K16 音乐学与民族音乐学正式知识资产 | K01, K02, K15 | high |
| K17 | W8 | G07-K17 音乐心理与认知正式知识资产 | K07, K10, K14 | medium |
| K13 | W7 | G07-K13 语言与本地化正式知识资产 | K12, K16, K17, K06 | high |
| K18 | W9 | G07-K18 电子音乐与音色设计正式知识资产 | K12, K02 | medium |
| K19 | W9 | G07-K19 现场音频与扩声正式知识资产 | K12, K04, K07 | high |
| T07 | Integration | G07-T07 集成覆盖、真实LLM对照验证 | K01, K07, K05, K08, K02, K03, K04, K06, K14, K09, K10, K15, K11, K12, K16, K17, K13, K18, K19 | high |
| T08 | Closure | G07b-T08 最终独立集成验收与版本收口 | T07 | high |

## Rationale
F00 blocks qualification-dependent formal asset admission (RV04), not original bounded CLI research. K01/K07 independent foundation branches after F00. K02/K04 proceed after K01; K05/K08 after both foundations; later domains use only necessary completed content predecessors, optional references can point to pending sources but cannot imply qualification. K16/K17 before K13 for culture/cognition; no W7↔W8 cycle. T07 all nineteen modules, T08 T07. No native workflow claim or ready state merely from this document. K15 rights source research can be early but formal content requires K09 artifact/governance; no actual rights or public license. Historical 15/36 and 28 split remain affected admission gates, not blanket blockers for unrelated claims or tasks. Risk-specific dependency changes require logged rationale/native update; no automatic claim. Owner authorized limited DeepSeek access at T07, only bounded synthetic/eligible original knowledge; no secret exposure. No production DB/runtime.

Topological order: F00 → K01 → K07 → K05 → K08 → K02 → K03 → K04 → K06 → K14 → K09 → K10 → K15 → K11 → K12 → K16 → K17 → K13 → K18 → K19 → T07 → T08. Inventory 1084 discovery rows (K01 mixed historical), 159 active D2, 1113 capability cells, 26 CQ; not accepted claim counts. Full D4 disposition and actual professional depth reviewed rather than quantity goal. Integration evidence and final accepted identity must be reproducible, no release claim.
