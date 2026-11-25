# Audio-KG Agent 入口

1. 读取 .dev-standard/VERSION，按固定 revision 读取 ADS VERSION、AGENTS.md 及适用角色/流程规范；再读取 .dev-standard/PROJECT_OVERRIDES.md。
2. 读取 docs/README.md、主 Issue #1 和实际 Task Issue；GitHub 当前事实优先，聊天不可作为执行权威。
3. 禁止把未经核验的模型/论文/软件能力、来源候选、LLM 输出或示例提升为 accepted knowledge；禁止虚报验证/审核。
4. 一条知识主张至少有定位明确的来源、适用条件、审核状态；区分事实、规范、经验、假设、审美偏好和争议。
5. 领域知识与工具/模型版本事实分离；无证据不推出否定结论。声乐教学不做疾病诊断或处方。
6. 按已审核的领域 scope、schema 和任务边界写作；各模块唯一 owner、跨模块用 ID 引用；缺口写 Issue。提交前验证；独立审查绑定 exact HEAD 并写回 Issue/PR。
7. 初始阶段仅文档研究；不安装模型、不编写应用、不选择生产数据库、不创建空目录。

8. 每轮讨论得出的可复用分析和决定必须更新对应 GitHub 权威文档，并按 docs/product/decision-index.md 维护恢复入口；区分用户决定、研究建议和待证主张。不得将聊天结论直接提升为已核验专业知识。

9. 按 [阶段独立审核门禁](docs/product/calibration/stage-review-gates.md) 执行：完整阶段/专业模块必须进行独立Exact HEAD审核，P0/P1修复复审后才能合并要求审核的阶段候选PR、关闭或将其作为下游权威；小研究增量仍按适用ADS policy自检及记录。不得自审冒充独立审核。

10. 按D25合并低风险研究、普通P2修订及相邻完整模块的独立审核；必要/required阶段和阻断项保留，勿每个小增量重复派审。参见[门禁](docs/product/calibration/stage-review-gates.md)。
