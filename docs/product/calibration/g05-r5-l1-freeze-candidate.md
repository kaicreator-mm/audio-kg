# CAL07 / G05 R5 — L1 综合验收候选与剩余知识准入合同

#80 / #3 / #1；基线 d83915d61d6f53ed385db2f3d18ff908dc6889a1。状态 BUILDER_CANDIDATE / review:required / L1_NOT_FROZEN。G04 R9独立PASS exact d3fce7e1bdaeb70782f1b20d96d99a8e17dbc576，合并零差异；R9-RV02实际44/44，摘要修正。G05是T03独立全域研究验收，不是再做一轮G02/G03，也不能用模块计数代替覆盖充分性。拟冻结的是**需求范围、CQ、职责边界、质量/准入约束及保留缺口**，不是事实已accepted、正式图谱迁移完成或产品已发布。

## 1. L1候选基线和验收判据
| 对象 | 候选裁决 | 证据与剩余 |
|---|---|---|
| 目标与范围 | 19正式D1，全部专业模块具独立限定验收历史；当前范围以D24及现行路由为准 | [实际身份对账](g05-r1-module-evidence-reconciliation.md)，19 PR/回执/发现回读；不因1084行宣称学科完备 |
| 深度和学科覆盖 | 建议接受限定L1研究范围；不新拆D1 | [CAL02](g04-r4-domain-coverage-depth-audit.md)，R9独立裁定；乐器学/指挥当前K03/K04并由K16/K07支撑；无障碍横切。若出现独立无法归属的专业谓词或关键用途无有效分支，则重开范围，不凭条数 |
| 分类与关系 | 唯一主责按谓词，H/O方向与实际授权分离；新旧ID可追溯 | [D24](domain-scope-adoption.md)、[D24回读](g05-r4-d24-and-count-reconciliation.md)、[28拆分](g05-r3-split-disposition-candidate.md)；13迁移/13保留/28混合；5历史D2只lookup，28混合保持OPEN，L2正式映射不可强等价 |
| 来源与主张 | 来源资格与可接受主张分离，限定适用/反例/冲突/权利；不伪造未见原文 | G04 CAL03来源定位、72行独立回读、[36发现](g05-r2-historical-findings-residual-gates.md)；摘要/搜索/阻断保留原状态，须在受影响G07准入前实质核对 |
| 本体复用 | MTO/MO/Polifonia/SKOS/PROV/SHACL作为候选参考；不冻结技术栈或导入 | [CAL04](g04-r4-ontology-asset-audit.md)，MTO依赖待核，MO LICENSE_UNKNOWN，PON LICENSE_CONFLICT NO_IMPORT，标准机器资产/引擎未验；L2/T04做具体取舍及权利判定 |
| 七能力及双向案例 | A01–07为横切能力知识，不等工具可执行或权限 | 159活跃D2×7=1113登记格，[R8能力回读](g04-r8-role-semantics-readback.md)、[R9](g04-r9-cq25-full-evidence-trace.md)；P/S/C/N/A/UNKNOWN及F+/F-/R+/R-不得混同；R9仅固定七能力链 |
| CQ与LLM消费 | 保留26正式CQ；限定子问与宽题未证范围明确；暂不新增正式CQ | [26问逐问](g04-r8-formal-cq-scope-reconciliation.md)，CQ25以R9完整结果/支持链替代；当前无LLM实测，正式检索与独立评价隔离为L2/G07要求 |
| 安全、权利、状态 | 不授权真实运行；风险、无证与失败必须能阻断 | K05/K06健康转介、K07/K19听觉/现场、K15权利、K09/K12状态与权限、R9固定证据链；任何真实执行/健康/法律或发布均非L1结论 |

## 2. 明确遗留风险与消费门禁
- 非西方/缅甸：K16负责有据原生术语、时地社群与文化事实；K01/K07负责形式映射、测量条件；K13语言适配。S585、原生调律/曲式、K01.02.06.02 EVIDENCE_OPEN、K01.07.03.01 RESIDUAL_OPEN保留UNKNOWN；没有可追溯证据不建等价、不保证母语可唱/全文化覆盖。相关G07前必须逐项核。
- 声乐、教育、认知：K05/K06/K14/K17分工；代理测量不当真值，短期表现不当学习迁移，特定样本不推所有人，真实医疗/教学效果不作承诺。缺证拒答，涉及异常风险转介；真实测量/样本与授权不在当前阶段。
- 真实设备/模型/现场：K07–K12/K18/K19按任务绑定版本、接口、时间、单位、参考、状态及保护对象。文献机制不等权重能力/真实听感/设备安全/场地验收。Dante冲突保留UNKNOWN；模型权利与许可证由K15核，不以软件角色授予执行权。
- 历史36发现保留15 OPEN；逐发现边界见R2。R9独立固定CQ25的综合I解除，不把所有U变PASS；相关主张不得在G07前跳过现行源、条件与反例核验。28混合槽保持SPLIT_OPEN，L2明确关系与迁移合同后再逐谓词准入。
- D24两P2的当前实际修订/13案例定位见R4；R9计数P2修正。G05审查者判定是否可在限定范围关闭，不重开已确认的19域。专业课程/标准/职业实践的全量独立逐项复核、所有外部全文、所有1113格下游案例/来源仍未完整新验；不得声称全面专家完备。若具体未覆盖内容构成原L1必要专业范围，G05必须FAIL/BLOCKED并明确最小补救；不允许以本候选自动降级。
- 不做DAW、应用、模型训练、生产服务、临床治疗、文物修复制造或Domain Harness Runtime。L2只设计可读知识语义/验证，数据库为可重建投影的候选；尚无数据库选择。真实数据、实际音频、LLM、CI、许可均未运行或确认。

## 3. 后续依赖和冻结边界
G05/T03独立PASS并整合后才允许T04语义设计→T05三领域最小pilot/跨域CQ、负例、逆向路径及检索评价隔离→T06/G06独立审核→G07a各域正式知识批次→T07/T08/G07b整体集成/验收。L1所述所有主张仍为候选，禁止数据准入或发布；本阶段不建生产库或应用。native GitHub Issue dependencies尚未实际物化，本表仅约束文档任务依赖，不能宣称DAG已冻结。

## 4. 实际回读
R1 19原PR/19独立回执/19发现；R2 15实际OPEN、36逐发现；R3 28旧槽与MX、28/51/16唯一目标；R4 13/13需求/发现/主案例及五历史CP、44/44实际历史输出；R5从当前提交读取四文件核19/36/28/13及26正式CQ行和唯一ID。无本轮全历史代码重放（R9独立实际70/70及44/44），不宣称静态检查是知识正确性验证。材料精确blob：
- [g05-r1-module-evidence-reconciliation.md](g05-r1-module-evidence-reconciliation.md) — 8f1a1a67b27240ea4ef2036e3d1b62d0d5828711
- [g05-r2-historical-findings-residual-gates.md](g05-r2-historical-findings-residual-gates.md) — 20fc53589c81a5f0a0b5ab46c1281f69102de774
- [g05-r3-split-disposition-candidate.md](g05-r3-split-disposition-candidate.md) — 2729189fa6b999527e1f84e198d643e7cdbf137c
- [g05-r4-d24-and-count-reconciliation.md](g05-r4-d24-and-count-reconciliation.md) — 752d9e917b6443ab34ba90a639527e27a84897e9
- [g04-r4-domain-coverage-depth-audit.md](g04-r4-domain-coverage-depth-audit.md) — 94d846cdc6b0c2637cdc2af78c984825a76e21f2
- [g04-r8-formal-cq-scope-reconciliation.md](g04-r8-formal-cq-scope-reconciliation.md) — ab85b9d60b03bcfa9dc19af518d76758b470daa1
- [g04-r4-ontology-asset-audit.md](g04-r4-ontology-asset-audit.md) — 172684205c9255e8985e7532032bc8b6422a7b3d
- [g04-r9-cq25-full-evidence-trace.md](g04-r9-cq25-full-evidence-trace.md) — 3c3f92c3fad4b43dd6884c8c005b59dd90d6b985
- [g04-r9-cumulative-review-candidate.md](g04-r9-cumulative-review-candidate.md) — 5060e556f036acaf421f6d1ae80a2638a5193356

## 5. 一次G05/T03 required独立审核合同
独立Reviewer先核原G04 R9回执、当前exact HEAD/base/变更、实际R1–R5及源身份，确认历史PASS使用范围和变更影响；读取原D24、L1范围/CQ、实施计划、CAL01–07、G01–04实际证据及上述残余表。按原任务T03的完整L1范围评估是否覆盖音乐领域而非仅歌曲生成，重点判断真实专业深度与归属、非西方及声乐安全、来源/关系/案例、七能力/发现性、36+28项的开放风险是否合理隔离、13迁移及R9 P2；继承确切已证不变范围，不机械重复19模块或用数量当充分。对每类风险说明是否阻断L1、对应owner/后续准入门禁；若仍有实际P0/P1或必要范围缺口，具体定位并FAIL/BLOCKED。核验L2交接不越界、旧15域及旧CQ25不再被当现行权威。仅PASS/ACCEPT_SCOPED可授权Builder合并并正式冻结声明范围，不等accepted claims/全部世界知识/正式迁移/生产运行。写回#80与对应PR，exact HEAD、P0/P1/P2、证据/未证/限制、T03门禁；只读不改文件、不合并、不关闭。最终HEAD及合同blob见任务派审。
