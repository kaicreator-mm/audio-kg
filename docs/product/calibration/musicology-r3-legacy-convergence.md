# K16 R3 — D24/D25迁移及边界对照
DRAFT #66。D24已合入的13个唯一需求入口使用原ID、原语义与新四视角候选，不新增主责复制；D25 13个候选入口继续保持SPLIT_PROPOSED_PENDING_REVIEW，16条入向SPLIT_OPEN不得由此模块单独关闭。D24原账本516ea2e35f527e05778c9a32316cba887b4896ac；D25谓词账本dbc1a0d71d8314186f51e4d6a5893bfaf03c1c9a；不改源文。旧源历史资格不提升，具体历史F+/反例见D24原案例需求，L2正式CaseBinding尚未建。
## 13项一对一迁入
| 新D4（D24） | 原语义（逐字） | 旧ID及原来源 | 当前候选案例 |
|---|---|---|---|
| [K16.02.01.01](domain-migration-implementation.md#L62) | 记录时期地域社群与传承方式 | K13.01.01.01；S133/S134/S135/S140 | [MU04/K16.02.01.01](musicology-r1-knowledge-cases.md#L8) |
| [K16.01.01.01](domain-migration-implementation.md#L63) | 区分史料记载口述研究和后世解释 | K13.01.01.02；S133/S134/S135/S140 | [MU01/K16.01.01.01](musicology-r1-knowledge-cases.md#L5) |
| [K16.05.01.01](domain-migration-implementation.md#L64) | 区分仪式娱乐教育及社会功能 | K13.01.02.01；S133/S134/S135/S140 | [MU14/K16.05.01.01](musicology-r1-knowledge-cases.md#L18) |
| [K16.04.01.01](domain-migration-implementation.md#L65) | 记录参与者视角与研究范围 | K13.01.02.02；S133/S134/S135/S140 | [MU12/K16.04.01.01](musicology-r1-knowledge-cases.md#L16) |
| [K16.02.02.01](domain-migration-implementation.md#L66) | 区分交流改编借鉴及历史路径 | K13.01.03.01；S133/S134/S135/S140 | [MU05/K16.02.02.01](musicology-r1-knowledge-cases.md#L9) |
| [K16.01.02.01](domain-migration-implementation.md#L67) | 保存时代变化和研究争议 | K13.01.03.02；S133/S134/S135/S140 | [MU02/K16.01.02.01](musicology-r1-knowledge-cases.md#L6) |
| [K16.02.03.01](domain-migration-implementation.md#L68) | 区分自我命名历史分类及外部标签 | K13.03.01.01；S135/S136/S140 | [MU07/K16.02.03.01](musicology-r1-knowledge-cases.md#L11) |
| [K16.02.03.02](domain-migration-implementation.md#L69) | 允许地域时代和语境多重归类 | K13.03.01.02；S135/S136/S140 | [MU08/K16.02.03.02](musicology-r1-knowledge-cases.md#L12) |
| [K16.02.02.02](domain-migration-implementation.md#L70) | 记录跨风格传播及历史条件 | K13.03.02.01；S135/S136/S140 | [MU06/K16.02.02.02](musicology-r1-knowledge-cases.md#L10) |
| [K16.01.03.01](domain-migration-implementation.md#L71) | 区分相似性与可追溯影响 | K13.03.02.02；S135/S136/S140 | [MU03/K16.01.03.01](musicology-r1-knowledge-cases.md#L7) |
| [K16.05.01.02](domain-migration-implementation.md#L72) | 记录谁在何种场合赋予音乐意义 | K13.04.01.01；S134/S135/S141 | [MU15/K16.05.01.02](musicology-r1-knowledge-cases.md#L19) |
| [K16.06.01.01](domain-migration-implementation.md#L73) | 记录风格真实性认同及争议 | K13.04.02.01；S134/S135/S141 | [MU18/K16.06.01.01](musicology-r1-knowledge-cases.md#L22) |
| [K16.02.04.01](domain-migration-implementation.md#L74) | 记录copy thachin等历史实践及异质评价 | K13.07.02.01；S135历史研究摘要；S140线索；S154权利版本待核 | [MU09/K16.02.04.01](musicology-r1-knowledge-cases.md#L13) |
## 13项D25候选
| 候选D4（D25） | 原候选语义 | 历史源/槽 | 当前候选案例 |
|---|---|---|---|
| [K16.07.01.01](domain-mixed-migration-predicate-batch.md#L7) | 原生术语、出处、社群及社会语境；不从词形推等价 | S133/S134/S136/S141；K13.02.01.01 | [MU21/K16.07.01.01](musicology-r1-knowledge-cases.md#L25) |
| [K16.07.01.02](domain-mixed-migration-predicate-batch.md#L8) | 原生概念对应证据及未对应语义；不以数值等价替代 | S133/S134/S136/S141；K13.02.01.02、K13.02.02.02 | [MU22/K16.07.01.02](musicology-r1-knowledge-cases.md#L26) |
| [K16.07.02.01](domain-mixed-migration-predicate-batch.md#L9) | 具体演奏者、地区、时期及乐器的调律实践差异；不外推 | S133/S134；K13.02.02.01 | [MU23/K16.07.02.01](musicology-r1-knowledge-cases.md#L27) |
| [K16.07.02.02](domain-mixed-migration-predicate-batch.md#L10) | 本土调律名称、原文、历史变体及来源资格；未证名称UNKNOWN | S133/S134；K13.07.01.02 | [MU24/K16.07.02.02](musicology-r1-knowledge-cases.md#L28) |
| [K16.07.03.01](domain-mixed-migration-predicate-batch.md#L11) | 仪式材料的用途、参与者和社群规则；非授权 | S134/S141；K13.02.03.01 | [MU25/K16.07.03.01](musicology-r1-knowledge-cases.md#L29) |
| [K16.07.03.02](domain-mixed-migration-predicate-batch.md#L12) | 社群访问惯例、适用主体及变化条件；非许可 | S134/S141；K13.02.03.02 | [MU26/K16.07.03.02](musicology-r1-knowledge-cases.md#L30) |
| [K16.03.01.01](domain-mixed-migration-predicate-batch.md#L13) | 传统表演实践及变体的时地、来源与观察证据 | S133/S134/S135/S136/S140；K13.03.03.01 | [MU10/K16.03.01.01](musicology-r1-knowledge-cases.md#L14) |
| [K16.03.01.02](domain-mixed-migration-predicate-batch.md#L14) | 分别记录Mahagitá曲目、竖琴实践和hsaing合奏的具体文化场合 | S133/S134；K13.07.01.01 | [MU11/K16.03.01.02](musicology-r1-knowledge-cases.md#L15) |
| [K16.06.02.01](domain-mixed-migration-predicate-batch.md#L15) | 有出处的惯例、规范性解释与艺术选择分别记录 | S135/S136/S140/S141；K13.03.03.02 | [MU19/K16.06.02.01](musicology-r1-knowledge-cases.md#L23) |
| [K16.06.02.02](domain-mixed-migration-predicate-batch.md#L16) | 文化解释、理由、语境及竞争解释；非评价统计或认知因果 | S134/S135/S141；K13.04.03.02、K13.08.02.01 | [MU20/K16.06.02.02](musicology-r1-knowledge-cases.md#L24) |
| [K16.04.02.01](domain-mixed-migration-predicate-batch.md#L17) | 参与者陈述与研究者解释的主体及语境分离 | S134/S135/S141；K13.04.01.02 | [MU13/K16.04.02.01](musicology-r1-knowledge-cases.md#L17) |
| [K16.05.02.01](domain-mixed-migration-predicate-batch.md#L18) | 文化解释不从音色或语言单独推断身份；无证据UNKNOWN | S134/S135/S141；K13.04.02.02 | [MU16/K16.05.02.01](musicology-r1-knowledge-cases.md#L20) |
| [K16.05.02.02](domain-mixed-migration-predicate-batch.md#L19) | 有据受众、场合及文化背景；区分观察与项目假设 | S134/S135/S141；K13.04.03.01 | [MU17/K16.05.02.02](musicology-r1-knowledge-cases.md#L21) |
## 16入向拆分原路由（不修改原状态）
| 旧D4 | 原类型/状态 | 原路由（逐字） | D25谓词路由 | K16案例 |
|---|---|---|---|---|
| [K13.02.01.01](domain-migration-implementation.md#L11) | SPLIT / — / SPLIT_OPEN | K16.07=原生术语及社会语境；K01.03/K01.04/K01.07=抽象音级节奏曲式规则；K13.05 REF语词 | [K13.02.01.01](domain-mixed-migration-predicate-batch.md#L39)：K16.07.01.01；K01.03.01.01 K01.04.05.01 K01.07.03.01；K13.05 | [MU21/K16.07.01.01](musicology-r1-knowledge-cases.md#L25) |
| [K13.02.01.02](domain-migration-implementation.md#L12) | SPLIT / — / SPLIT_OPEN | K16.07=原生概念对应证据；K01.02/K01.03=数值及形式映射；K12.04 REF表示实现 | [K13.02.01.02](domain-mixed-migration-predicate-batch.md#L40)：K16.07.01.02；K01.02.06.01 K01.03.01.01；K12.04 | [MU22/K16.07.01.02](musicology-r1-knowledge-cases.md#L26) |
| [K13.02.02.01](domain-migration-implementation.md#L13) | SPLIT / — / SPLIT_OPEN | K16.07=演奏者与地域调律实践；K01.02=参考音与相对音高；K07.07=测量方法 | [K13.02.02.01](domain-mixed-migration-predicate-batch.md#L41)：K16.07.02.01；K01.02.01.01 K01.02.01.02 K07.07.02.01 K07.07.03.01；— | [MU23/K16.07.02.01](musicology-r1-knowledge-cases.md#L27) |
| [K13.02.02.02](domain-migration-implementation.md#L14) | SPLIT / — / SPLIT_OPEN | K01.02=转换损失计算；K16.07=原生语义保留；K12.04 REF编码 | [K13.02.02.02](domain-mixed-migration-predicate-batch.md#L42)：K16.07.01.02；K01.02.06.01；K12.04 | [MU22/K16.07.01.02](musicology-r1-knowledge-cases.md#L26) |
| [K13.02.03.01](domain-migration-implementation.md#L15) | SPLIT / — / SPLIT_OPEN | K16.07=仪式用途及社群规则；K15.05=具体权利许可 | [K13.02.03.01](domain-mixed-migration-predicate-batch.md#L43)：K16.07.03.01；K15.05.01.01 K15.05.02.01；— | [MU25/K16.07.03.01](musicology-r1-knowledge-cases.md#L29) |
| [K13.02.03.02](domain-migration-implementation.md#L16) | SPLIT / — / SPLIT_OPEN | K16.07=社群访问习惯；K15.05/K15.07=用途许可和数据访问；K12.06 REF执行授权 | [K13.02.03.02](domain-mixed-migration-predicate-batch.md#L44)：K16.07.03.02；K15.05.02.02 K15.07.02.02；K12.06 | [MU26/K16.07.03.02](musicology-r1-knowledge-cases.md#L30) |
| [K13.03.03.01](domain-migration-implementation.md#L21) | SPLIT / — / SPLIT_OPEN | K16.03=传统惯例与来源；K04.04/K06.07=实际演唱演奏技法 | [K13.03.03.01](domain-mixed-migration-predicate-batch.md#L45)：K16.03.01.01；K04.04.02.02 K06.07.01.01；— | [MU10/K16.03.01.01](musicology-r1-knowledge-cases.md#L14) |
| [K13.03.03.02](domain-migration-implementation.md#L22) | SPLIT / — / SPLIT_OPEN | K16.06=惯例及艺术选择解释；K10.08=特定评价协议；K02.07 REF创作 | [K13.03.03.02](domain-mixed-migration-predicate-batch.md#L46)：K16.06.02.01；K10.08.02.02；K02.07 | [MU19/K16.06.02.01](musicology-r1-knowledge-cases.md#L23) |
| [K13.04.01.02](domain-migration-implementation.md#L24) | SPLIT / — / SPLIT_OPEN | K16.04=参与者陈述与研究解释；K10.08=实际偏好评价；K17.06 REF实证机制 | [K13.04.01.02](domain-mixed-migration-predicate-batch.md#L47)：K16.04.02.01；K10.08.02.01 K10.08.02.02；K17.06 | [MU13/K16.04.02.01](musicology-r1-knowledge-cases.md#L17) |
| [K13.04.02.02](domain-migration-implementation.md#L26) | SPLIT / — / SPLIT_OPEN | K16.05=不从风格推身份的文化解释边界；K15.06/K15.07=身份及个人数据权限；K10.08 REF评价 | [K13.04.02.02](domain-mixed-migration-predicate-batch.md#L48)：K16.05.02.01；K15.06.01.01 K15.07.02.01；K10.08 | [MU16/K16.05.02.01](musicology-r1-knowledge-cases.md#L20) |
| [K13.04.03.01](domain-migration-implementation.md#L27) | SPLIT / — / SPLIT_OPEN | K16.05=受众场合文化；K13.08=本地化目标与人群条件；K10.08=作品评价任务 | [K13.04.03.01](domain-mixed-migration-predicate-batch.md#L49)：K16.05.02.02 K13.08.01.03；K10.08.01.02；— | [MU17/K16.05.02.02](musicology-r1-knowledge-cases.md#L21) |
| [K13.04.03.02](domain-migration-implementation.md#L28) | SPLIT / — / SPLIT_OPEN | K10.08/K10.09=评价条件与替代解释；K16.06=文化解释；K17.07 REF实证 | [K13.04.03.02](domain-mixed-migration-predicate-batch.md#L50)：K16.06.02.02；K10.08.03.01 K10.09.02.01；K17.07 | [MU20/K16.06.02.02](musicology-r1-knowledge-cases.md#L24) |
| [K13.07.01.01](domain-migration-implementation.md#L41) | SPLIT / — / SPLIT_OPEN | K16.03=Mahagitá与hsaing文化语境；K03.01=乐器身份和分类；K04.01=实际演奏技法；K13.06 REF本地化 | [K13.07.01.01](domain-mixed-migration-predicate-batch.md#L52)：K16.03.01.02；K03.01.01.01 K03.01.01.02 K04.01.01.01；K13.06 | [MU11/K16.03.01.02](musicology-r1-knowledge-cases.md#L15) |
| [K13.07.01.02](domain-migration-implementation.md#L42) | SPLIT / — / SPLIT_OPEN | K16.07=本土名称与历史变体证据；K01.02.03/K01.02.06=调律原值及映射约束；K07.07 REF测量；未核术语UNKNOWN | [K13.07.01.02](domain-mixed-migration-predicate-batch.md#L53)：K16.07.02.02；K01.02.06.01 K01.02.06.02；K07.07 | [MU24/K16.07.02.02](musicology-r1-knowledge-cases.md#L28) |
| [K13.07.02.02](domain-migration-implementation.md#L44) | SPLIT / — / SPLIT_OPEN | K16.02=描述性文化事实；K15.05=当前具体作品录音改编授权规则；K13.06 REF适配，不能以史实授权 | [K13.07.02.02](domain-mixed-migration-predicate-batch.md#L54)：—；K16.02.04.01 K15.05.01.01 K15.05.02.01 K15.05.01.02；K13.06 | [MU09/K16.02.04.01](musicology-r1-knowledge-cases.md#L13) |
| [K13.08.02.01](domain-migration-implementation.md#L49) | SPLIT / — / SPLIT_OPEN | K16.06=文化解释；K10.09=评审分歧记录；K13.08=本地化原因 | [K13.08.02.01](domain-mixed-migration-predicate-batch.md#L57)：K13.08.02.03 K16.06.02.02；K10.09.02.01；— | [MU20/K16.06.02.02](musicology-r1-knowledge-cases.md#L24) |
K13语言适配、K01形式音级曲式、K03器物能力、K04/K06实际演唱演奏、K07测量、K10评价、K12执行与K15具体权限、K17认知机制分开；K13.05.01.02 KEEP对K16.07 REF（语种转写主责仍K13），不计拆分。所有原迁移状态保持，不自动接受谓词或等价。