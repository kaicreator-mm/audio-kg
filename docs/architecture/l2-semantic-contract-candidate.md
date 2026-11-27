# T04 — L2 语义契约候选（v0.1.0）
#83；基线 280d3be584ab717211b9b99925ac07705f2ab64c；[L1冻结](../product/calibration/l1-freeze-record.md)。DRAFT / G06 required，未冻结。目标：人和LLM共同消费的有条件专业知识包，非应用、运行时或真实授权系统。

## 表达方式决策（候选）
| Driver | RDF/OWL+SKOS+PROV+SHACL | typed JSON + 项目约束；可选JSON-LD投影 |
|---|---|---|
| 条件化主张/多值 | reification/n-ary node，开放世界，OWL推导须额外限定；SHACL检查结构 | claim、context、evidence、version显式字段；closed-world校验缺失不等事实为假 |
| 人类/LLM可读、审查 | Turtle可读但多跳/IRI/开放推理成本；语境需图查询 | 小文件UTF-8 JSON，Markdown导航及可生成摘要；关系精确ID，不嵌套重复权威 |
| 双向关系 | SPARQL/graph traversal成熟；推理层需隔离 | typed edge/binding单一记录，派生逆索引；显式有限查询，不推逻辑逆命题 |
| 版本/冲突/权利 | PROV可记派生，实际授权需领域语义 | immutable id@revision及源定位、冲突和审查记录，不把来源当授权 |
| 可移植/成本 | 标准互操作强；引擎、shape与ontology imports资格未核 | 标准JSON易读、Git diff；项目validator语义需实证；JSON-LD/RDF导出需无损映射试验后才承诺 |
| 选择 | 参考语义，不导入/不否定后续RDF投影 | 候选主权威，T05实测；不选生产DB、不开服务 |

引用[CAL04资产审计](../product/calibration/g04-r4-ontology-asset-audit.md) exact blob 172684205c9255e8985e7532032bc8b6422a7b3d。MTO上下文/单位、MO作品/表演/信号/track、PON LICENSE_CONFLICT NO_IMPORT，SKOS closeMatch非传递、PROV非真值、SHACL非专业证据。外部机器可读资产不复制；MO许可未知、MTO依赖未核。此比较为基于实际已读资产的架构判断，未运行OWL/SHACL，不声称性能优于RDF。

## 逻辑记录与权威
- D1/D2为领域发现，D3主题与D4精确原子需求独立于实际 Claim ID；D4不等事实。Concept（术语与多语标签/语言/语境）、Principle/Method/Procedure/Constraint/Metric/FailureMode（语义类对象）、Claim（具条件命题）、Context、Source、Evidence、Observation、Artifact、ToolVersion、ModelVersion、CaseGroup/CaseView/CaseBinding、Workflow/Step/Transition、Evaluation/Receipt、Grant 均分离。Knowledge kind definition/norm/empirical/practice/preference/hypothesis；不是所有类型都可做硬推理。专业owner唯一，D4前缀约束；支持域仅精确引用；不把Kxx泛标签当证据。
- stable id独立于标题；版本引用 id@revision 不可静默解析latest；同ID revision内容不可原地覆盖；改变源、输入、条件、保护范围等生成新revision，旧回执仅历史，受影响的派生闭包失效。Git文本是权威，索引由同一记录重建；release/accepted独立。
- Source metadata：作者/标题/版本/日期/URI/访问日/locator/资格/权利；未知字段显式UNKNOWN，禁止补造。Evidence区分原文定位、摘要/检索、合成、计算、文献报告、真实观察、实际执行；原始来源支持知识不等实测；有资格的证据要与具体谓词和范围绑定，非源ID集合即充分。
- Claim status DRAFT/CANDIDATE/UNKNOWN/DISPUTED/REJECTED/ACCEPTED/SUPERSEDED；独立资格、当前审查、适用条件、版本、正反案例、冲突处置、许可与具体G07 gate均需满足才可ACCEPTED。T05全为候选，validator无接受权限；UNKNOWN不等否定。Grant subject/action/object/scope/epoch/validity/issuer真实许可独立；fixture grant不授现实权限。医疗、真实现场、模型效果等仍由L1冻结边界约束。
- 语言：保存原文本、locale和字形，不从NFC等价推词义；同义标签有语境/来源，模糊检索非sameAs。人类阅读入口为领域目录、摘要、精确源链接、可选投影；LLM按任务、CQ、条件、反例、状态、预算取回，未审核显式标记。无任意自由文本作为命令。
- 权威目录候选：knowledge/<owner>、sources、cases、queries、ontology、tools/tests；T05仅research/l2-pilot，不创建正式数据目录；monorepo原子变更。先人工可读JSON、后派生JSON-LD/SQLite/向量索引；数据库选择未定。

## 类型化关系
关系记录包含唯一id、from/to精确revision、type、context/condition、evidence/ref、owner；可选反向名称仅检索。所有非明确允许的关系拒绝；无万能related_to。项目层不执行自动传递、反演或因果闭包。下列候选允许的节点类型（类族须在实际记录中显式type）；多对多除另述，需精确条件。
| type | from → to | 逆查/含义、禁止推断 |
|---|---|---|
| is_a | Concept → Concept | narrower查询；限定同体系，不做自动全局传递/等价 |
| part_of | Concept/Artifact → Concept/Artifact（同类） | has_part；不等因果/所有权 |
| requires | Claim/Method/Procedure/Step → Claim/Constraint | required_by；必要不充分，条件化，依赖不得自证循环 |
| prerequisite_for | Step → Step | prerequisite_of反查，流程先后而非因果，步骤DAG无环 |
| measured_by | Observation/Claim → Metric | measures；度量非质量唯一真值 |
| produces | Step → Artifact/Observation/Evaluation | produced_by；题设不等实际产出 |
| consumes | Step → Artifact/Observation | consumed_by；输入身份/版本绑定 |
| applies_under | Claim/Method/Procedure → Context | applicable_claims；未证条件不放行 |
| has_limitation | Claim/Method/ToolVersion/ModelVersion → Constraint | limitation_of；非否定整个类 |
| contradicts | Claim → Claim | 双向检索、仅重叠范围冲突；不自动判真/假 |
| supported_by | Claim → Evidence | supports；证据资格/定位/适用性，拒绝自支持 |
| supersedes | 同一stable id的新revision → 旧revision | 历史逆查；不继承旧接受、回执或权限 |
| mitigates | Method → FailureMode | mitigated_by；非保证消除风险 |
| derived_from | Artifact/Evaluation → Artifact/Observation/Evaluation | derived_to；DAG，当前性依赖精确输入与内容 |
| references | Claim/Step → Claim | O条件导航，不授依赖满足或真值 |
| alias_of | HistoricalID → 当前D4 | 一对一语义保留仅查找；非事实等价 |
| split_route | HistoricalID → D4（NEW/REUSE/REF） | 各谓词条件、角色和状态；OPEN不得当别名，不反推原整体 |

其他类型/关系仅在G06或后续变更审核后加；因果、统计关联、规范、时间先后分别由claim kind/context表示，不能用requires混淆。对命题的关系不是无条件概念属性。

## 案例、能力与状态
CaseGroup唯一owner；CaseView方向FORWARD/REVERSE、极性POSITIVE/NEGATIVE/BOUNDARY/UNKNOWN；每核心组F+/F-/R+/R-或有审核理由N/A，独立query/input、allowed alternatives、理由、反例/证据，非唯一文本匹配。CaseBinding只存一次：view/claim exact ref、role PRIMARY_TARGET/APPLIES/ILLUSTRATES/MISAPPLIES/REFUTES_WITHIN_SCOPE/OUT_OF_SCOPE/REQUIRES/MEASURES/DIAGNOSES/REVISES、condition、step、evidence，主目标精确D4；反查由同一binding生成。R+是证据检索/候选解释不是逻辑逆；R-拒绝唯一根因。案例组知识输入与评测答案分离；公开训练案例可有解释，但独立评测ID、问题/答案文件不进检索；以allowlist投影并检查实际输出；不能把静态隔离声称防止所有语义泄漏。
A01–07分别知识、流程、工具、状态、评价、可编辑、迭代；每步关联明确主责/支持知识、条件、输入输出、失败及停止。P/S/C/N/A/UNKNOWN是适用性而非权限。流程候选合法替代、必要前置、版本与保护、每事件授权、独立观察/估计/目标、完整报告及复测依赖；未获真实授权不执行，STOP/UNKNOWN不可伪造完成路径。旧revision和报告保持历史，不覆盖原件。真实世界评价与题设分开。
迁移：13一对一历史别名、13保留、28 SPLIT_OPEN；保留精确D4、来源和原语义，L2只定义条件映射和拒绝规则，不执行全量正式迁移。36历史发现/15 issues继续G07准入。
## T05可证伪假设
实际解析人读JSON，验证类型/源/owner/关系/双向绑定/版本和权限边界；三领域K01音分、K05独立参考、K08窗口/FFT，CQ01/06/07/21/25有限子问；使用真实登记来源与合成数据，独立答案文件。实际执行正负例及有限七能力追溯，检验替换证据、错误逆推、过期版本、非法关系、悬空、重复和泄漏。若无法表达必要条件或重建索引则改候选，不以脚本计数替代专业评估。T05不证明实际LLM效果、真实音频、权利、全量迁移、生产数据库、通用图推理或安全系统。
