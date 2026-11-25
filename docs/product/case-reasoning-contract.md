# 案例—知识绑定与双向推理契约（L1 草案）

状态 DRAFT，Issue #3，待 L1/L2 独立审核。用户要求案例与具体领域/知识关联，服务 LLM 正反向消费。原案例计划是分类和综合场景；本文件补充知识关联、检索及验收要求，不冻结技术实现。

## 两个正交维度
- 推理方向：FORWARD（给定已知规则、条件和输入，计算/选择行动/预测结果）；REVERSE（给定现象、目标、错误、输出，找相关知识与解释、候选原因、辨别条件、下一步测量或行动）。反向检索不自动产生逻辑逆命题；相关/因果/必要/充分条件不同，存在多解时保留候选和 UNKNOWN。禁止由结果倒推唯一原因。
- 例证角色：POSITIVE（正确应用或支持在限定条件下的主张）；NEGATIVE（错误应用、明确反例、失败或拒绝）；BOUNDARY（条件改变、流派或范围差异，规则不适用或有不同解释）；UNKNOWN（证据不足）。负例必须说明为什么错，不能把错误答案当事实；真实反例只反驳明确范围的主张，不能反驳不适用的主张。
- 二者组合：正向正确/错误用法，反向正确/错误诊断，边界及证据缺失。案例可多视角复用，不强制无意义复制四份。最小完整对照组含 F+、F-、R+、R- 或有理由的 N/A，边界/UNKNOWN 对有风险或非单射关系必需；每视角有独立 prompt、期望可判定结果、理由及证据。
- 教学合成、计算推导、文献报告、真实观察、实际运行为不同来源种类；expected ≠ observed；来源支持某知识不等于观察到本项目执行结果；不得标记未执行样例为实测。

## 精确绑定
D1/D2 用于发现，D3 稳定 topic ID 和 D4 原子 claim/method/constraint/evaluation ID 用于正式关联。CaseGroup 是场景/对照组，CaseView 为具体问题/视角，CaseBinding 为有角色的关联（PRIMARY_TARGET、APPLIES、ILLUSTRATES、MISAPPLIES、REFUTES_WITHIN_SCOPE、OUT_OF_SCOPE、REQUIRES、MEASURES、DIAGNOSES、REVISES 等候选）。关系不可自动推理为全称；标记具体场景步骤、条件及来源定位。一个案例可跨域，主 owner 唯一，其他以精确 ID 引用；禁止只有 Kxx 泛关联，禁止为了覆盖计数关联无关知识。D3/D4 未冻结前使用明确 candidate 锚点并标 DRAFT；后续迁移到真实 ID。
- 知识→案例：按 topic/claim ID、适用条件、目标、能力、正反角色查对照组及视角，返回限定条件、反例、来源；知识未审核则不提升为可依赖真值。
- 案例→知识：按任务描述、观测、症状、错误、产物、限制和术语检索；定位候选视角与知识 ID、证据，保留多个解释；反向问题与答案分开投影。
- 关联权威只存一次；逆向索引由同一绑定生成，避免两份手工同步。L2 评估图谱属性、typed records、JSON-LD 或 RDF 表达，必须支持双向可查询、精确引用、版本/失效及约束。

## 面向 LLM 的案例记录需求
group_id、case_id、view_id、direction、polarity、domain_owner、topic/knowledge_bindings（role、condition、step、version）、CQ、capability、aliases/症状/意图、input、context、given_state、task_question、expected_answer、allowed_alternatives、prohibited_conclusions、reasoning_outline（可审计的简要推导/证据链而非私有思维链）、disambiguating_observations、tool/workflow refs、artifact/transition、metric/unit/criteria、negative explanation、revision/rollback/stop、source+locator、evidence_kind、expected/observed 区分、review status。允许多种正确音乐创作选择与文化偏好，不使用唯一文本匹配判定开放问题。按实际任务使用字段，不强制每例均有工程状态。
- LLM 检索材料：短知识摘要、前置条件、限制、正负/边界案例索引、来源；上下文预算下先返回最相关的已审核案例，保留证据状态，防止只召回正例。不得因反向检索命中而执行工具或授予权限。
- 评测材料：query/input、allowed context 与 answer/rubric 分离，保留独立未见案例；对比无 KG、知识无案例、知识+正例、知识+正负/双向案例，避免测试答案混入被检索的上下文。比较知识正确性、错误适用拒绝、歧义保留、证据追溯、质量及可操作性，不把主观审美简化为二值分数。

## 分阶段门禁
L1：每 D2 有候选组与 D3 目标、双向问题、正反需求；逐主题分配具体 D4 需求与适用性、来源、CQ、owner、风险；必要时补充多个案例，跨域 case slice 要精确引用。未来源校准保持 DRAFT。
L2：至少验证一个真实来源主张的 F+/F-/R+/R-，边界、缺证据、悬空 ID、角色不匹配、同一现象多原因、错误逆推、跨域多重绑定与版本失效；正负结果可复核；检索和评测分离。禁止将 synthetic fixture 当实际音频测试。
P3：每个核心可操作 D4 至少有对照案例组或有审核理由的共享/不适用；事实定义等不适合逆向诊断可用识别、解释、应用测试；每批提交绑定、来源、正反视角、覆盖/缺口；高风险声乐、版权、工具状态等要求负例/停止条件。P4：独立检查双向可发现、案例→主张→原始来源、非法反向推理拒绝、答案泄漏和跨域完整性；实际 LLM 消费对照实验在后期进行，不能声称本次完成。

## 当前材料
- [分支案例需求登记册](branch-case-inventory.md)：129 个 D2 分支的候选组，不是知识填充。
- [首批有来源的双向案例样稿](../research/linked-case-pilot.md)：六组样稿，供 L1 校准与 L2 设计；均未独立审核。
