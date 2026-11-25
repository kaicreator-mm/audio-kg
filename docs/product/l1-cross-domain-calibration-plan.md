# L1 全域首轮细化结束后的校准任务（DRAFT）
Issue #3 / T01,T02；下文首轮统计与历史执行记录均以原15域为基线，D24已确认19域（见[编号登记](calibration/domain-scope-adoption.md)）。首轮结束后15个候选D1、129 D2、387 D3、774 D4需求，387主题案例需求，903能力适用性格。所有这些是库存/规划，不是内容通过数。初始每分支3主题×2需求的机械结构明显不足以作为专业完备性标准，下一阶段按专业证据重组与深化，而非继续追求同样的计数。不得提前T03或L2。

| 校准项 | 交付与完成条件 |
|---|---|
| CAL01 结构与覆盖核对 | 跨六波真实读取清单/案例/来源/CQ，查重、悬空、owner、ID语义、ID迁移、分支及能力缺漏；按精确SHA留结果。 |
| CAL02 领域边界与深度 | 以专业课程/教材/标准/学术与实际职业实践对照当前19域（原15域为历史首轮基线），重点音乐史/民族音乐与美学/心理学、乐器学/指挥、现场音频、无障碍、版权与数据治理；判断独立D1或现有分支扩展。证据驱动拆合，不按3×2。 |
| CAL03 来源资格 | 逐D3及核心D4标精确来源位置、版本、适用性、证据种类、权利及缺证据；发现/摘要不替代正文，不把厂商文档当效果证据；优先补非西方、声乐健康、模型、许可及教学。 |
| CAL04 语义复用 | MTO、Music Ontology、Polifonia、SKOS/PROV/SHACL等实际资产及许可/语义/CQ，形成reuse/map/extend/avoid矩阵；保持L2技术决策未冻结。 |
| CAL05 七能力及案例 | 每D2×A01–07明确P/S/C/N/A/UNKNOWN理由、唯一owner、具体需求与案例；核心D4明确F+/F-/R+/R-需求及边界、跨域精确关系、独立评测与检索隔离。至少一个有真实可核查来源的七能力跨域案例需求；未执行不标实测。 |
| CAL06 CQ及LLM发现 | 逐CQ01–26绑定精确主题/原子需求/证据和正负/未知案例；核对未覆盖与新CQ、前置关系、索引及术语别名，准备L1独立审查材料。 |
| CAL07 独立审核准备 | CAL01–06的发现和处理记录、剩余gap风险、exact candidate SHA；按Issue #3和ADS派独立T03，不自行声明PASS。 |

建议先CAL01与CAL02；CAL03/04可独立研究，CAL05/06在已校准范围更新；CAL07依赖前述交付。此为计划，不宣称native DAG已经物化。需实际读取和检查；当前仅首轮研究库存结束。

## 首轮校准执行记录
[CAL01基线核对](calibration/cal01-baseline-audit.md) 已进行结构读取和质量发现；[CAL02深度分析](calibration/cal02-domain-depth-analysis.md) 已完成第一轮学科对照及4个D1候选建议，未作冻结或ID迁移。已修15条D3来源/CQ范围及[历史案例锚点](calibration/legacy-case-anchor-map.md)，剩余语义/来源/能力等问题继续CAL02–06；以本轮实际证据更新计划，不机械扩数。CAL07/T03尚未启动。

## CAL02 第二个局部检查点
[19域分类提案](calibration/domain-taxonomy-proposal.md) 细化四候选D1、迁移和职责，保持原ID/权威范围不变；[K01深度示范](calibration/theory-depth-inventory.md) 新增17个D3、37个D4候选及[13组四视角案例](calibration/theory-depth-cases.md)，逐D4定位来源/待证/条件。下一轮优先补K01剩余分支及独立来源，推进四候选域研究与范围审核；CAL02–06未完成，不提前T03/L2。

## CAL02 第三个局部检查点
[K01基础深度](calibration/theory-fundamentals-inventory.md) 新增16 D3/37 D4及[15组案例](calibration/theory-fundamentals-cases.md)；[来源与交叉校准](../research/source-qualification-theory-fundamentals.md) 含15 READ_LOCATOR/4 SEARCH_ONLY及S022重读。原始与新增候选分别统计；K01仍需和声/对位/曲式/现代乐理补深及去重，CAL02–06未关闭。

## CAL02 第四个局部检查点与审核门禁
[阶段审核门禁 G01–07](calibration/stage-review-gates.md) 要求在完整专业阶段进行独立审核，当前G01分类候选进入required review，G02完整K01仍OPEN。[进阶清单](calibration/theory-advanced-inventory.md) 新增14 D3/28 D4、[13组案例](calibration/theory-advanced-cases.md)，[来源冲突](../research/source-qualification-theory-advanced.md) 需审。分类审核不替代全域T03；未获有效独立审核不合并本阶段收口PR、不迁移正式ID。

## G01 R1修订
G01审核FAIL（2P1/2P2），[四项修订记录](calibration/g01-r1-remediation.md) 已提交Builder候选，必须独立复审；G01仍HOLD，G02仍OPEN。

## G01 R2合并与G02准备
G01 R2独立PASS (#3 7173873821 / #16 7173874842)，PR #16 已合入 72682da8d76f6ccce8ec80d2777cbca7747897ea；Product范围决定仍OPEN（不分配新ID）。K01 [旧原子语义路由](calibration/theory-legacy-consolidation.md)、[原子发现索引](calibration/theory-atom-discovery-index.md)、[能力校准](calibration/theory-capability-calibration.md) 进入G02准备，156候选未正式去重；八组新增精确案例，49个深化主目标可定位，仍有53个未建精确四视角主目标。G02未达到派发门禁；继续TH-G01–07。CAL02–06及全L1未关闭。

## D24 Owner确认后实施
[登记](calibration/domain-scope-adoption.md)与[实施账本](calibration/domain-migration-implementation.md)建立K16–19、35 D2、54槽迁移（13一对一、13保留、28拆分OPEN），实施增量required review；CAL01/02扩展19域，CAL03–06按新范围校准。G02 TH-G01–07仍OPEN。

## D25 集中研究检查点
PR #18 exact PASS已合入 16b66ec0f81ad60ebab99732becf5d24e09c62f2；两项非阻塞P2修订纳入同批：[D24迁移需求](calibration/domain-migration-implementation.md)、[K01旧语义路由](calibration/theory-legacy-consolidation.md)及CP/CAL02导航。按[审核门禁D25](calibration/stage-review-gates.md)合并小增量及非阻塞修订，G02完整阶段审核不变。K01 [44组案例](calibration/theory-case-batch.md)补齐此前有候选规则而无主目标样稿的深化原子，93/102有精确四视角样稿，9项显式待证仍隔离。没有新增原始来源资格、未补完整旧槽和CQ、未完成G02；继续TH-G01–07及28项SPLIT。

## K01证据深化批次
[来源](../research/source-qualification-theory-evidence-batch.md) S234–S257 22正文定位/2检索；[9待证处置](calibration/theory-pending-evidence-disposition.md) 2限定候选、7仍OPEN；[新深度](calibration/theory-evidence-depth-inventory.md) 9 D3/14 D4，[27组案例](calibration/theory-evidence-batch-cases.md) 含11旧RETAIN、2限定补证及14新增。原102深化槽95有精确主目标，7待证；新增14另计。TH-G01–07未关闭，逐原子来源/适用性/权利及CQ仍需整批校准，D25不单独派审。

## K01旧槽语义与证据集中校准
[54槽当前账本](calibration/theory-legacy-calibration-ledger.md)逐项处置，旧槽完整保留，24 PARTIAL及19 INDEX均复核；[14新原子/9新D3](calibration/theory-legacy-cq-inventory.md)、[38组案例](calibration/theory-legacy-cq-cases.md)、[15来源条目](../research/source-qualification-theory-legacy-cq.md)。K01现92 D3/184 D4候选，未正式去重或独立验收；7个原广义待证仍OPEN，28项跨域混合迁移未变。继续逐原子CQ精度及全量发现索引、权利/版本资格；D25集中审核。
