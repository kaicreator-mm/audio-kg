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

| D13 | 研究建议 | 制作工程、共享快照、原素材、渲染、评价证据独立识别；编辑与版本变化触发依赖复核；MIR准确率、技术音质、演唱水平和审美不可互相替代 | [第四波清单](production-evaluation/fine-grained-production-evaluation.md)、[状态闭环](production-evaluation/production-evaluation-capability-slice.md) |

| D14 | 研究建议 | 模型原理与精确版本的工具能力分离；规划与声学渲染、参考与训练、生成与可编辑产物、作者报告与实测、调用与业务验收分别表达；权限及缺证据fail-closed | [第五波清单](ai-orchestration/fine-grained-ai-orchestration.md)、[模型工具证据](../research/model-tool-evidence.md) |

| D15 | 研究建议 | 保留音乐文化/语言原生语义与条件；口语证据不替代歌唱；学习即时表现不等于迁移；权利按对象/辖区/用途/版本核验，不以标识或生成成功推授权 | [第六波清单](culture-education-rights/fine-grained-culture-education-rights.md)、[缅甸专项](../research/myanmar-music-language-localization.md) |
| D16 | 研究建议 | 首轮全域库存后必须按专业证据校准深度/边界/证据/CQ/七能力及本体复用，再独立审核；3×2非固定规则 | [跨域校准计划](l1-cross-domain-calibration-plan.md) |

| D17 | 研究建议 | 依据专业分工将音乐学、音乐认知、电子音乐与声音设计、现场音频作为独立D1候选；先论证再迁移，现有ID不改，临床治疗不纳入 | [CAL02](calibration/cal02-domain-depth-analysis.md) |

| D18 | 研究建议 | 新域使用候选分类与显式迁移，旧ID保留；深度以独立语义、来源及条件/案例定义，允许不同原子数，形式计算与语境解释分开 | [分类提案](calibration/domain-taxonomy-proposal.md)、[K01示范](calibration/theory-depth-inventory.md) |

| D19 | 研究建议 | 频率比、律制与音名分别表示；节拍分组、名义时值、表演时间和视觉记谱/声音实现分开；引用独立教材需明确交叉证据覆盖，软件文档非理论证明 | [基础深化](calibration/theory-fundamentals-inventory.md)、[来源](../research/source-qualification-theory-fundamentals.md) |

| D20 | 研究执行决定（响应用户阶段审核问题） | 完整领域分类、专业模块、跨域校准、L1/L2、正式内容与最终集成均设置独立阶段审核；小增量自检不替代；Exact HEAD、P0/P1修复复审、结果回写 | [阶段审核门禁](calibration/stage-review-gates.md) |
| D21 | 研究建议 | 来源本身可能冲突，保留疑点与独立可复算见证；作者课堂约束与通用音乐事实分离 | [进阶来源](../research/source-qualification-theory-advanced.md) |

| D22 | 研究建议 | G01跨域唯一主责按原子谓词判断，条件性前置H/O、旧原子迁移账本与案例影响可追溯；批次和最终集成分别独立审核 | [边界契约](calibration/domain-boundary-contract.md)、[迁移账本](calibration/domain-atom-migration-ledger.md)、[阶段门禁](calibration/stage-review-gates.md) |

| D23 | 研究建议 | G02收口逐旧原子区分上位入口、部分重叠及独立剩余；精确案例主目标与泛关联、来源定位与内容接受分离；K01任务七能力按职责及适用性 | [语义路由](calibration/theory-legacy-consolidation.md)、[原子索引](calibration/theory-atom-discovery-index.md)、[能力](calibration/theory-capability-calibration.md) |

| D24 | 用户明确决定 | 采纳G01独立审核的19域方案；K16–K19正式编号，K13语言与文化适配，保留乐器学/指挥重审条件；旧ID可追溯，实际迁移须审核，混合语义OPEN | [编号登记](calibration/domain-scope-adoption.md)、[实施账本](calibration/domain-migration-implementation.md) |

## 后续固化要求
每轮讨论中出现的可复用结论（新来源、知识范围/粒度、例证、约束、决策、方法、风险/缺口），写入对应权威文档；必要时补索引。不得只保留在 chat，也不得把未经核验的讨论当成专业事实。记录 source/locator、D3/D4/CQ/案例 ID、证据状态、冲突与未解决事项。重大决定注明用户明确要求、推导建议或待审核提案，不能静默提升为冻结要求。研究 checkpoint 在 Issue/PR 写回 exact SHA、验证状态和限制。
