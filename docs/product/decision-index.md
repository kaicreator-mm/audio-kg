# 已讨论决策与研究结论索引

状态 DRAFT planning authority index，2026-11-26，Issue #1/#3。为跨对话 Agent/LLM 恢复工作提供入口，不是第二事实源；具体约束以链接文档为准，历史方案以 Git history 为准。本索引按用户确认与研究建议分别记录，未完成 L1/L2 freeze。

| ID | 来源性质 | 讨论结论 | 权威位置 |
|---|---|---|---|
| D01 | 用户方向 | 先分析与计划，再逐步建设音乐及声乐知识图谱；不提前开发应用或训练模型 | [领域范围](knowledge-scope.md)、[计划](../implementation/knowledge-graph-plan.md) |
| D02 | 研究分析 | 模型、工具、Agent/Harness、DAW 区分；知识资产不绑定具体 SDK、模型或数据库；历史模型线索需核验 | [生态分析](../research/music-vocal-ai-landscape.md) |
| D03 | 用户要求 | 每个子域细化，并建立专业主题与原子知识层；不能只计节点 | [多级清单](fine-grained-inventory.md) |
| D04 | 用户要求 | 知/流/工/态/评/编/循作为横切覆盖需求 | [能力契约](capability-coverage.md) |
| D05 | 用户要求 | 案例与具体领域、知识关联，支持 LLM 正反向使用 | [案例契约](case-reasoning-contract.md)、[案例库](case-library-plan.md) |
| D06 | 研究建议 | 正反向与正反例是独立维度；多解、边界、UNKNOWN；反向检索不自动产生逆命题 | [案例契约](case-reasoning-contract.md) |
| D07 | 研究建议 | 来源→主张→条件/规则→案例；可追溯证据；区分专业知识与工具版本事实、合成与实测 | [来源发现](../research/source-discovery.md)、[首批来源](../research/source-qualification-wave1.md) |
| D08 | 研究建议 | MTO 是部分西方基础乐理的参考，借鉴 CQ 与确定性规则；未证明本体许可/兼容性，不全域直接导入 | [MTO分析](../research/music-theory-ontology-analysis.md) |
| D09 | 研究建议 | 无 KG、知识、知识+正例、知识+正反双向案例对照，测试答案与检索材料隔离 | [案例契约](case-reasoning-contract.md)、[计划](../implementation/knowledge-graph-plan.md) |
| D10 | 研究建议 | 以基础 K01/K07 优先校准 D3/D4 后扩到声乐及数字音频；不冻结 15 子域或现有 ID 语义 | [基础领域清单](foundation/fine-grained-foundation.md) |

| D11 | 研究建议 | 声乐生理、声学测量与教学操作分离；特定研究不外推所有唱法；原始演唱与处理副本隔离；自动工具不作医疗诊断 | [第二波清单](vocal-digital/fine-grained-vocal-digital.md)、[案例](vocal-digital/vocal-digital-case-map.md) |

| D12 | 研究建议 | 创作与演奏保留多解；硬约束与审美偏好分离；书写音与实音、记谱与播放实现分离；配器与混音、表演与修音证据分离 | [第三波清单](creative-performance/fine-grained-creative-performance.md)、[案例](creative-performance/creative-performance-case-map.md) |

## 后续固化要求
每轮讨论中出现的可复用结论（新来源、知识范围/粒度、例证、约束、决策、方法、风险/缺口），写入对应权威文档；必要时补索引。不得只保留在 chat，也不得把未经核验的讨论当成专业事实。记录 source/locator、D3/D4/CQ/案例 ID、证据状态、冲突与未解决事项。重大决定注明用户明确要求、推导建议或待审核提案，不能静默提升为冻结要求。研究 checkpoint 在 Issue/PR 写回 exact SHA、验证状态和限制。
