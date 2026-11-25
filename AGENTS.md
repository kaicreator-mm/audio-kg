# Audio-KG Agent 入口

1. 读取 .dev-standard/VERSION，按固定 revision 读取 ADS VERSION、AGENTS.md 及适用角色/流程规范；再读取 .dev-standard/PROJECT_OVERRIDES.md。
2. 读取 docs/README.md、主 Issue #1 和实际 Task Issue；GitHub 当前事实优先，聊天不可作为执行权威。
3. 禁止把未经核验的模型/论文/软件能力、来源候选、LLM 输出或示例提升为 accepted knowledge；禁止虚报验证/审核。
4. 一条知识主张至少有定位明确的来源、适用条件、审核状态；区分事实、规范、经验、假设、审美偏好和争议。
5. 领域知识与工具/模型版本事实分离；无证据不推出否定结论。声乐教学不做疾病诊断或处方。
6. 按已审核的领域 scope、schema 和任务边界写作；各模块唯一 owner、跨模块用 ID 引用；缺口写 Issue。提交前验证；独立审查绑定 exact HEAD 并写回 Issue/PR。
7. 初始阶段仅文档研究；不安装模型、不编写应用、不选择生产数据库、不创建空目录。
