# 知识图谱建设计划 v0.1.0

状态 DRAFT；由研究背景和 L1 范围草案推导。未冻结、未宣称任务执行 DAG 已物化。执行环境以 ChatGPT Web 为主，只有需要真实程序执行/测试且 Web 无法完成时才交接有限本地任务。

## P0 分析固化（当前）
交付研究生态、来源发现、领域范围、规划草案、ADS pin。核验 GitHub 回读及路径；独立审核建议。后续 L1 对前序分析未验证线索逐项定性，不以其作为证据。

## P1 L1：细粒度知识范围与来源
- T01 现有本体、知识工程方法、AI/工具生态核验；形成 reuse/map/extend/avoid 矩阵与证据等级。
- T02 K01–K15 分层知识清单（章/主题/原子知识候选）、唯一 owner、依赖和遗漏/重叠分析；每域来源矩阵及 CQ 覆盖。T01/T02 可并行研究，整合时消除冲突。
- T02 补充交付：[D0–D4 细粒度清单](../product/fine-grained-inventory.md) 的逐主题来源和唯一 owner 校准；[A01–A07 能力覆盖](../product/capability-coverage.md)（含 CQ19–26）；[案例库](../product/case-library-plan.md) 的 D2 适用性、案例候选和真实来源矩阵。研究音乐史、审美、民族音乐、乐器学、现场音频等潜在缺口；不强行冻结 15 个一级分类。
- T02 补充：[精确案例绑定及双向推理](../product/case-reasoning-contract.md)、[129 分支案例需求](../product/branch-case-inventory.md)、[首批来源资格](../research/source-qualification-wave1.md)、[六组样稿](../research/linked-case-pilot.md)。逐知识点校准正/反例、正/反向推理、边界与 UNKNOWN；评测与检索分离，真实来源与合成例分离。补齐来源及原子主题矩阵后再审。
- T01 S004 原文阅读补充：[MTO 分析](../research/music-theory-ontology-analysis.md)；核验具体本体资产版本/许可、实际关系语义与 CQ 后才决定复用，表格疑点须专业来源校准。将音阶/和弦模式的确定性计算、拼写/根音歧义与反例纳入 T05 候选；不预先冻结实现技术。
- T02 第一波深化：[K01/K07 D3/D4 清单](../product/foundation/fine-grained-foundation.md)、[案例映射](../product/foundation/foundation-case-map.md)、[来源资格](../research/source-qualification-foundation.md)。其余 K02–K06/K08–K15 同步以具体专业主题、原子需求、能力适用性、案例及证据状态推进；不以需求计数替代知识验收。
- T02 第二波：[声乐与数字音频清单](../product/vocal-digital/fine-grained-vocal-digital.md)、[案例](../product/vocal-digital/vocal-digital-case-map.md)、[来源](../research/source-qualification-vocal-digital.md)。明确生理/教学/临床、原始表现/修音、数字技术/制作边界；后续逐主题校准，不以3×2为固定规则。
- T03 L1 独立审核；依赖 T01、T02；评估是否覆盖领域，不只服务歌曲生成，确认非西方音乐与声乐边界。P0/P1 修正后冻结 scope/CQ/acceptance。

## P2 L2：语义契约与最小可用图谱
- T04 依赖 T03；比较 RDF/OWL+SKOS+PROV-O+SHACL 与 typed JSON/JSON-LD + schema/validator 等方案；分析 LLM 发现性、精确查询、跨语言、关系约束、版本化、可移植性、验证成本。Git 文本为建议权威，数据库/向量索引为可重建投影；不先绑定数据库。
- 候选节点：Concept、Principle、Method、Procedure、Constraint、Observation、Metric、FailureMode、Artifact、ToolVersion、ModelVersion、Source、Claim、Context、Example。主张可重述有条件的关系；与术语节点分离。稳定 ID，不依赖中文或英文标题；中英标签，缅语按来源证据逐步补齐。
- 候选关系：is_a、part_of、requires、prerequisite_for、measured_by、produces、consumes、applies_under、has_limitation、contradicts、supported_by、supersedes、mitigates。因果、相关、流程先后、定义严格区分；每种关系 domain/range、方向、基数/传递性、逆关系、适用条件和禁止推理明确。避免无意义 related_to；不能让依赖环绕过真实约束。
- Claim 候选字段：id、subject/predicate/object 或 proposition、kind（definition/norm/empirical/practice/preference/hypothesis）、conditions、exceptions、source refs + locator、status、review history、version；来源含作者、标题、版本、发布日期、访问日期、URI、许可、定位，证据不足或冲突不得 accepted。禁止无出处、自证循环、虚构来源。
- T05 pilot 依赖 T04：选择乐理/声乐/数字音频各一个最小主题，拟定 3–5 条跨域 CQ，构造真实来源主张、反例、争议/UNKNOWN、错误输入样例；测试导入、查询、追溯、拒绝非法 edge/悬空 ID/缺失证据、重复、非法推理；对比表达方案。数字为试验范围，不是完成量目标。
- T05 补充：为七类能力设计可检索语义和综合案例路径（步骤、工具能力、状态迁移、评价、可编辑产物、失败与最小修订/回滚）；验证非法迁移、能力不匹配、证据缺失；合成 fixture 不可声称真实音频效果。
- T05 补充验证：双向查找同一有角色的绑定，F+/F-/R+/R-、多解、反向误推、证据不足、非法绑定/失效及答案泄漏；精确 D3/D4 关联，禁止把 D2 泛标签当细粒度覆盖。
- T06 L2 独立审核，依赖 T05；冻结语义、验证入口、迁移规则、领域索引与 schema；没有实际执行结果不得宣称 pilot PASS。

## P3 按波次构建内容（均依赖 T06）
每批同步交付精确 D3/D4 双向案例绑定、细粒度知识、适用的 A01–A07 记录及案例切片/反例，填充可追溯覆盖矩阵，不把案例留到最终阶段。
每批流程：来源资格 → 细粒度 inventory → 抽取可审查主张 → 语义编码 → 正负例及关系 → 结构/来源/CQ 验证 → 独立审核 → 修正 → 合入版本分支。任务规模按主题及风险拆分。
| Wave | 子域 | 依赖 |
|---|---|---|
| W1 | K01 乐理、K07 声学听觉 | T06；可并行 |
| W2 | K05 声乐科学、K08 数字音频 | W1 对应基础 |
| W3 | K02 创作、K03 编曲、K04 表现 | W1；K03 接 K02 定义 |
| W4 | K06 声乐教学、K14 音乐教育 | W2/K05、W3/K04；声乐安全专项审核 |
| W5 | K09 制作后期、K10 理解与评价 | W2/K08；K10 引用 W1、W3 |
| W6 | K11 AI 模型、K12 软件工具、K15 生产管理权利 | W5；K15 可提前做独立来源研究；禁止未授权数据导入 |
| W7 | K13 跨文化与语言、跨域工作流 | 依赖相关 W1–W6；文化来源调查从 P1 并行 |
各 Wave 可拆多个独立 Task，具体依赖以审核后的 GitHub native dependency 为准。冻结前不得批量建长命实现分支。

## P4 集成与验收
T07 依赖全部内容批次：合并后的精确 SHA 上检查 D2×能力覆盖矩阵、案例重建、真实/合成证据区分、跨域 CQ、冲突/未知、孤立节点、所有关系和引用、重复、版本/许可、安全边界、LLM 检索发现性。用固定问题与人工/独立专家评判对照，比较无 KG、知识无案例、知识+正例、知识+正负/双向案例（不是只看 token 或节点数量）；保留独立未见案例，避免答案泄漏。负例应能拒绝过度推断。T08 依赖 T07：独立集成审核，P0/P1 清零；记录 P2、已知局限、复现命令与验证结果；方可考虑 v0.1.0 release。

## 建议目录（在有真实资产时创建）
- docs/：研究、scope、architecture、implementation、validation、release
- ontology/：schema、关系定义、外部映射
- knowledge/：按唯一领域 owner 划分可追踪知识
- sources/：来源注册、证据定位
- queries/：CQ 与推理例、正负样例
- cases/：可复用案例、综合案例及证据引用（具体结构由 L2 确定）
- tools/ 与 tests/：必要验证/导出工具与 fixture
单仓库原子变更；以上格式和路径需 L2 定稿；不建空目录。

## 质量标准
每一 accepted 主张证据定位、语义、适用范围及 reviewer 记录完整；每一引用可解析；禁止静默合并不同学派定义、文化或模型版本；机器验证不代替专家判断；未核验不标 PASS。明确不做：应用、DAW、训练模型、生产服务和 Domain Harness 实施。
