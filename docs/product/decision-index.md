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

| D25 | 用户明确决定 | 独立审核必要时或批量执行；日常研究/P2修复合并，完整模块批次及既有required门禁保留，禁止自审冒充独立PASS | [阶段门禁](calibration/stage-review-gates.md) |

| D26 | 研究建议 | 对位等课堂规范保留明确教材规则集及差异；原待证需求按限定子集补证，保留广义缺口；复节奏知觉实证与理想网格、真实表演分离 | [证据处置](calibration/theory-pending-evidence-disposition.md)、[来源](../research/source-qualification-theory-evidence-batch.md) |

| D27 | 研究建议 | 旧宽泛槽作限定发现路由不等于删除或同义；逐原子保留剩余语义、条件与跨域职责，具体规则和案例不证明整个上位范围已覆盖 | [54槽校准](calibration/theory-legacy-calibration-ledger.md) |

## 后续固化要求
每轮讨论中出现的可复用结论（新来源、知识范围/粒度、例证、约束、决策、方法、风险/缺口），写入对应权威文档；必要时补索引。不得只保留在 chat，也不得把未经核验的讨论当成专业事实。记录 source/locator、D3/D4/CQ/案例 ID、证据状态、冲突与未解决事项。重大决定注明用户明确要求、推导建议或待审核提案，不能静默提升为冻结要求。研究 checkpoint 在 Issue/PR 写回 exact SHA、验证状态和限制。

| D28 | 用户明确决定（阶段门禁文档D26） | 按完整D1模块连续建设、自检、一次独立专业审核、必要修订、合并，不在中间小增量派审；保留G02/G03/G04–07 required及exact-SHA。此处D28是决策登记编号，stage-review-gates中D26是局部门禁节奏编号，不覆盖本表既有D26语义。 | [完整模块节奏](calibration/stage-review-gates.md)、[校准计划](l1-cross-domain-calibration-plan.md) |


### G04 R9 构建者方法记录（待独立裁定）
CQ25完整追溯必须匹配所解释的实际结果、独立观察/估计/报告、上下文、必要权限和保护支持；七个主责角色不能替代支持证据。固定合成见证见[R9](calibration/g04-r9-cq25-full-evidence-trace.md)。不扩大为生产认证、真实权利或冻结决策。


### CAL07/G05 Builder候选（非新Owner决定）
G04 R9限定独立PASS已合入；实际44/44，不是摘要43。以[验收候选](calibration/g05-r5-l1-freeze-candidate.md)为当前完整范围/剩余风险/后续门禁入口；旧15域与旧CQ25为历史。19域D24范围不改变，L1待T03独立验收，L2/正式主张仍阻塞。


## 当前 L1 正式冻结
[G05/T03 冻结记录](calibration/l1-freeze-record.md) 为当前阶段权威；历史DRAFT/未冻结/阻塞记录仅表示原检查点。PR81 exact独立PASS并零差异合入。仅冻结已验收的19域范围、26 CQ、职责与接受条件；15 OPEN/28 SPLIT_OPEN继续约束正式准入。L2 T04/T05候选可推进，G06前不得正式填充。


## G06 / T04–T06 L2 语义契约与实际试点候选
#83；L1已正式冻结。当前[语义契约](../architecture/l2-semantic-contract-candidate.md)、[可执行试点](../research/l2-pilot/README.md)、[完整独立验收合同](../architecture/g06-review-candidate.md)。实际Linux Node24.21.0：127/127新试点断言，原70/70与44/44 nested replay，5独立于公开案例的评测输入，21记录42关系的有限合成证据图；真实LLM、音频、DB、实际授权及生产数据未验。候选Git typed JSON主权威，派生投影待具体资格；L2仍未冻结，G07阻塞。历史15 OPEN/28 SPLIT_OPEN保留，native DAG未物化。


## G06 R2 当前复审候选（替代原 G06 试点检查点）
原 G06 exact c394dbe34ef970a30293476418075ba158a689bd 独立 FAIL，2P1/1P2；保留 L1 冻结及 T04 表达方案候选。修复后 [R2 完整合同](../architecture/g06-r2-remediation-review.md)、[现行试点](../research/l2-pilot/README.md)、[实际回执](../research/l2-pilot/validation-result-rv.json)，185/185，原127项全部保留 +58；合成图21记录42关系；30案例绑定，11实际输入blob匹配 tested HEAD 58135efa5a617c0e4a813bc06d9083a15372844b。精确资格身份、必要跨域依赖、完整公共合成图重放已完成 Builder 验证；独立复审待定。未冻结L2，G07仍阻塞，不做真实LLM/音频/授权/生产DB，不关闭15 OPEN/28 SPLIT_OPEN。


## 当前正式建设阶段 G07
[L2 冻结](../architecture/l2-freeze-record.md)；G06 exact独立PASS合并后冻结有限架构；[规划DAG](../implementation/v0.1.0/TASK_DAG.md)、[Task Packs](../implementation/v0.1.0/TASK_PACKS.json) rev1；#85负责native materialization，#86 F00修复RV04并建立最小知识验证入口，#87–105十九域，#106综合真实LLM验证，#107最终验收。规划文件不表示当前live状态；以各Issue native依赖/metadata/claim/证据为准。历史“L2未冻结”仅对应旧检查点，G07不等于内容已接受。无生产DB/应用，15 OPEN/28 SPLIT_OPEN继续逐项约束准入。
