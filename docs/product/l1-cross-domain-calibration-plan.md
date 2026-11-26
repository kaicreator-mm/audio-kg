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

当前[184槽统一发现与CQ](calibration/theory-all-atom-discovery-cq.md)、[26问范围及9条发现试题](calibration/theory-cq-scope-calibration.md)替代仅历史102槽作为当前入口。35旧槽/123深化槽有158个精确主目标样稿；19旧INDEX以路由处理，7广义待证缺直接样稿。D/S区分全局子问题和支持；9局部问题仍为候选，未增加正式CQ。逐条源版本、权利、实测及专业缺口仍待整批审核，不宣称CAL06全域完成。

## K01来源资格与静态发现链集中核对
[逐原子资格交叉索引](../research/theory-source-atom-qualification.md)连接184槽和96个显式来源编号，保留历史正文/检索等级、同谱系与原条件；MusicXML 4.0日期和FSA声明已直接读取，Hutchinson与OMT许可仍仅线索。 [静态发现核验](calibration/theory-static-discovery-check.md)实际检查158组唯一主目标绑定、23次预期ID查找及有限数学反例，非实际LLM/数据库检索。七项广义待证未升级，逐谓词专业去重和来源充分性/权利仍未闭合；G02 OPEN，D25 recommended SKIP。下一波单独处理28项混合迁移，不将路由当等价。

## K01来源谱系与重大缺口校准
[权利与谱系](../research/source-qualification-theory-qualification.md)追踪S174–272全部99记录，新增S273/274专业定位；[重大缺口与限定案例](calibration/theory-material-gap-qualification.md)补术语及感知边界，不增加原子数量或宣称七广义缺口关闭。继续跨域28个混合迁移和未证专业问题；G02 OPEN，D25不派发普通增量独立审核。

## D25 混合迁移集中研究
[逐谓词登记](calibration/domain-mixed-migration-predicate-batch.md)、[组合案例需求](calibration/domain-mixed-migration-case-demands.md)覆盖28旧槽、28新D4候选、51既有D4限定复用及16参考入口；28组112视角需求尚未执行。所有旧槽SPLIT_PROPOSED_PENDING_REVIEW，保留历史证据及残余专业谓词，不等于正式迁移关闭。相关G02/G03/G04累计审核；无新增accepted claim或G02关闭。

## D25 K01专业与语义收敛
[七来源资格](../research/source-qualification-theory-convergence.md)、[九组限定案例](calibration/theory-convergence-scoped-cases.md)、[语义收敛](calibration/theory-semantic-convergence.md)：184唯一槽、130深化、54旧槽；15组高重叠语义及16残余复核，7广义缺口保持开放。未达到G02完整模块验收准备条件。下一有限批对全部深化谓词及158主目标案例按主题专业证据复查，明确缺口L1范围裁决；不自动启动G03、L2。D25 recommended SKIP。

## G02累计独立审核候选（required）
以历史CAL02深化前基线96b321a8a11fa927e4ac3e01b95e05e928f0dd50至本候选全量K01研究为累计审核范围，非仅最近增量。[130深化谓词](calibration/theory-g02-predicate-audit.md)、[158主案例](calibration/theory-g02-case-audit.md)、[63格能力](calibration/theory-g02-capability-audit.md)、[实质发现/有限见证/7项HOLD范围裁决](calibration/theory-g02-builder-findings.md)为收口入口。54旧槽、源谱系/资格、26 CQ、9局部发现题、跨域迁移及G01两P2累计核验保留。7广义缺口全部未证；Reviewer必须判断缺口是否阻断完整K01示范，不能将其默认延后。required PR不得提前合入；G02未通过不启动G03正式标准，不提前L1冻结/L2/accepted claim。25个JS数学/符号见证不等于真实工具、LLM或专业验收。

## D26 完整模块推进
G02累计独立审核实际FAIL（0P0/2P1/2P2，#3 7176330929）；在原PR26修正并保留历史。Owner确认后续按一个完整专业模块建设、自检、独立审核、必要修订、关闭的节奏，模块中间增量不独立审核。详见[D26门禁](calibration/stage-review-gates.md)。[R1修正](calibration/theory-g02-r1-remediation.md)继续补齐全部K01核心阻断及全谓词案例，未完成不派下一次审核。G03按D1逐模块、保留依赖及G04跨域综合，不提前启动。

## G02 R2完整模块推进
[158主案例逐谓词审查](calibration/theory-g02-r2-case-branch-review.md)记录110直接候选、33需关联、15具体缺口；[15组补证](calibration/theory-g02-r2-case-branch-fixtures.md)逐项对应原缺口，不是15新原子。[16历史残余](calibration/theory-g02-r2-legacy-residuals.md)、[高阶对位](calibration/theory-g02-r2-counterpoint.md)、[S288–292](../research/source-qualification-theory-g02-r2.md)、[64有限检查](calibration/theory-g02-r2-validation.md)为P1修正证据。下一步集中核对7广义HOLD逐范围证据、全部当前谓词的精确来源资格与关联充分性（含L类依赖及源冲突）；不重复机械点数或已通过有限计算。G02仍OPEN，D26仅在完整候选准备完毕后派一次累计复审，G03不提前启动。

## G02 R3完整模块候选
[七广义需求](calibration/theory-g02-r3-scope-closure.md)逐项专业范围、[33关联](calibration/theory-g02-r3-case-links.md)、[130来源资格](../research/theory-g02-r3-predicate-source-qualification.md)、[实际有限复算](calibration/theory-g02-r3-validation.md)组成R1–R3累计候选。13新局部补证不增加184槽/158主目标；来源登记区分历史67行与有本轮定向63行（非所有原文重读）。Builder判断具备完整模块独立复审的提交条件，并非专业PASS；原G02 FAIL、七历史HOLD保留，由独立Reviewer裁决是否足以解除阻断。按D26只派一次累计required复审；G03未启动。

## G02完整示范通过与G03首模块
独立审核 [#3 7185749616](https://github.com/kaicreator-mm/audio-kg/issues/3#issuecomment-7185749616) / [PR26 7185750647](https://github.com/kaicreator-mm/audio-kg/pull/26#issuecomment-7185750647) PASS exact 71ad9338d199961635505f548557a156a4ceb1ef，合并 1461b7b0e1c84bcc7f98c8662806d00a8bed479c；compare files0。0P0/0P1/2非阻断P2，七广义SUFFICIENT_SCOPED，RV01–04 CLOSE_SCOPED。RV05/06单独登记#28并在相关有限批次前于正式主张准入前修订，不挪用旧PASS。G02关闭范围仅完整K01 L1 demonstrator；不是L1冻结。#3仍为L1父任务。
按stage-review-gates D26以完整D1为审核单位，首先[ #27 K02音乐创作](https://github.com/kaicreator-mm/audio-kg/issues/27)。R1已提交[24个细化知识与案例](calibration/composition-r1-knowledge-cases.md)、[48旧槽路由](calibration/composition-r1-legacy-routing.md)（35 PARTIAL_LINK/13 OPEN）、[8来源定位](../research/source-qualification-composition-r1.md)、[17有限断言](calibration/composition-r1-validation.md)。不以计数验收，余下声调语言/创作方法/迭代/关联语义/七能力/CQ仍需完整专业建设。本PR只服务K02完整模块；不发中间独立审，不启动K03。无native dependency write，文字依赖不等于DAG冻结。

## G03-K02 R2深化检查点
[29新知识与案例](calibration/composition-r2-knowledge-cases.md)覆盖原13 OPEN，累计53候选主案例；[旧48槽](calibration/composition-r2-legacy-routing.md)逐行关联并保留历史语义；[S307–319及S144](../research/source-qualification-composition-r2.md)实际正文定位；[56能力格](calibration/composition-r2-capability-calibration.md)、[全26 CQ及8局部发现题](calibration/composition-r2-discovery-cq.md)、[31有限断言及CO48定向补验](calibration/composition-r2-validation.md)。下一批按八分支逐专业深度及具体案例源资格、重叠谓词/旧槽剩余、CQ D/S/能力的实质关联收敛；当前不视为完整模块验收，K02 OPEN，K03未启动。D26不派小复审。

## G03-K02 R3收敛检查点
本轮[11个专业补证](calibration/composition-r3-knowledge-cases.md)，原53逐项与新增11一并形成[64谓词来源/条件审查](calibration/composition-r3-predicate-audit.md)（35P专业限定候选/16L组合或缺口/13C项目合同，不是通过数）。[48旧槽语义收敛](calibration/composition-r3-legacy-convergence.md)41路由/7残余，原ID不删。[现行64索引及26CQ](calibration/composition-r3-discovery-cq.md)和[56能力格](calibration/composition-r3-capability-calibration.md)修正直接与支持关系；[17实际有限验证](calibration/composition-r3-validation.md)含全16种seed的4类碰撞。S320–322实际正文，S144/S307–309及S067/S070/S302–305定向重读，不冒称历史全文齐备。下一批集中7残余：风格具体条件、非英语韵律及重音、不同终止策略、完整歌曲大型结构、声调语言取舍与母语证据边界；核16L实际补证，整模块达标才派一次required累计审核。无L1冻结、accepted claim、真实音频/工具/LLM或K03启动。

## G03-K02 R4完整模块收口候选
[七残余范围与9组补证](calibration/composition-r4-scope-closure.md)及[16 L/7残余精确组合](calibration/composition-r4-closure-links.md)在不新增主ID的条件下补足风格、完整短型形式、非英语音拍、声调、词曲适配及评价设计。[S323–327](../research/source-qualification-composition-r4.md)含专业教材及跨语言研究正文，S325截图访问拒绝但PDF文本可读；[16实际有限核查](calibration/composition-r4-validation.md)保留修正及边界。累计64深化候选/48历史需求/56七能力格/26全域CQ/14局部题。R3历史35P/16L/13C与41路由/7残余不改写成通过数；R4提供逐项范围裁决候选，由独立Reviewer决定完整专业充分性。现代缅语母语、真实演唱/音频/软件/LLM、资产许可未验证；K02自身创作构造、取舍、修改及停止条件不得移出。本轮完成完整候选的自检后按D26派一次required审核；K03仍未启动，无accepted claim或L1冻结。

## G03-K02 R5审核修正候选
R4完整模块独立审核FAIL（0P0/1P1/2P2），七分支限定充分、K02.06声调语言具体创作应用HOLD。按Reviewer范围修复RV01–03：[R5普通话/粤语实际词汇及声明表层规则、M↑/M↓、冻结/改词/授权/拒绝、多解](calibration/composition-r5-tone-language-remediation.md)，[精确修正记录](calibration/composition-r5-remediation-record.md)，[S328–331及原来源](../research/source-qualification-composition-r5.md)，[28有限检查](calibration/composition-r5-validation.md)。不重做已证无影响分支，64/48/56/26/14保持。R5为Builder修复候选，实际现代缅语、母语评价、音频、宿主和LLM未运行；不提前合并、关闭或启动K03。新Exact HEAD仅按RV01–03及受影响路径required复审。

## G04 R1 内部检查点（十九域均已审核合入后）
#78，起点51cf7d8cc83d12ad20de0161d3cc6ef16c14d87f；[R1当前基线及优先修订](calibration/g04-r1-baseline-and-priority-corrections.md)。R1已读取19个合并PR和19份发现入口，15个OPEN Issue/36项P2，修订#68/#71/#74/#77共9项Builder候选待累计独立核验；剩余27项仍OPEN。28项旧拆分原ID/语义一致，27/28 NEW索引可定位，K07.06.04.01缺主入口待补。不得以初步静态核对宣布CAL01/06完成。R2修订剩余27项及引用/影响路径；R3逐28项NEW/REUSE/REF语义与组合判定、补缺；R4全域深度/来源和本体复用；R5全域七能力/CQ/关系和源限定综合案例、静态发现；R6完整CAL01–06累计回读及required独立G04审核。无中间微审核，非native DAG；CAL07/G05/T03及L2继续阻塞。


## G04 R6 全域累计审核候选（Builder）
[#78](https://github.com/kaicreator-mm/audio-kg/issues/78) / [PR79](https://github.com/kaicreator-mm/audio-kg/pull/79)；[累计交付与独立审查合同](calibration/g04-r6-cumulative-review-candidate.md)。36个P2发现均进入实际修订，15 Issue仍OPEN；28 NEW/51 REUSE/16 REF目标核对和28组合候选，全部旧SPLIT_OPEN保持；19域159活跃D2/1084发现行、1929明确来源引用定位、1113活跃能力格、26CQ精确映射、七能力XC01有限合成验证。源访问、许可冲突、专业外推、历史见证未全面重跑等限制见累计合同；没有真实音频/LLM/DB/CI/权限/accepted claims或L1 freeze。G04须一次完整required独立审核，最终exact HEAD见#78/PR79同一派审回执；CAL07/G05/T03/L2仍阻塞。
