# 首批来源资格检查与图谱复用研究（L1 增量）

状态 DRAFT。检查日期 2026-11-26。此处为已读取公开 HTML 内容的精确定位、支持范围及限制，不是所有来源已核验或独立专家批准。原 S001–S020 继续保留发现状态；新增精确来源 ID S021–S027，不复制原文大段内容。资料许可未核定时只引用和自行概括，不分发原内容或音频。

| ID | 原始入口/定位 | 支持主题 | 证据类型与限制 |
|---|---|---|---|
| S021 | Open Music Theory v2, [Intervals](https://viva.pressbooks.pub/openmusictheory/chapter/intervals/), “Intervallic Enharmonic Equivalence”, Example 16；“Major Scale” method | K01.01 音程级数/性质/等音异名 | 教材；传统记谱下的音程命名，不适用于所有音乐体系；在线章节版本/许可待固定 |
| S022 | UNSW Music Acoustics, [Note names, MIDI numbers and frequencies](https://newt.phys.unsw.edu.au/jw/notes.html), “In equal temperament” 至 MIDI 转换公式 | K01.02 参考音/十二平均律频率，K07.01 | 大学教学资料；A4=440 为明确假设，不代表所有调律；页面未见稳定版本/许可 |
| S023 | Praat Manual, [how to choose a pitch analysis method](https://praat.org/manual/how_to_choose_a_pitch_analysis_method.html), “Measuring intonation”, unwanted octave drops/rises；“Raw periodicity” | K05.07、K10.01 测量伪影与范围 | 官方工具说明与作者报告；适用所述算法/条件；不能外推所有声乐或模型；页面版本待 pin |
| S024 | Audacity Manual, [Clip Fix](https://www.audacityteam.org/manual/effects/noise-removal-and-repair/clip-fix/), “Controls”, “Notes” （页面标 2026-11-24 更新） | K08.07 削波修复 | 官方工具文档；插值估计而非原始信息恢复；实际工具版本、音频试验待核验 |
| S025 | EBU [R 128 版本页](https://tech.ebu.ch/publications/r128?categoryFilter=presentations), 2023-11-21，v5.0 摘要与版本表 | K09.06、K10.07 广播节目响度 | 标准发布机构摘要；-23 LUFS 与 LRA/Maximum True Peak descriptors；本次未核验正文容差/上限，不推及其他发行平台 |
| S026 | Polifonia, [The Polifonia Ontology Network: Building a Semantic Backbone for Musical Heritage](https://zenodo.org/records/11221402), 摘要 | K12.04 / L2 本体研究 | 论文记录；Music Meta/Representation/Source/Instrument 模块及 CQ 设计；未做 ontology 文件和映射测试 |
| S027 | OMT2 [Digital Workbook](https://viva.pressbooks.pub/openmusictheory/chapter/digital-workbook/) “Intervals” 练习说明（检索摘要） | K01.01、K14.02 | 来源发现，仅搜索摘要，未打开正文；不能作为已校准主张；待核验许可和题目引用 |

## 本体研究增量
- Polifonia（S026；摘要已读）：候选 map/reuse 概念为 metadata、representation、source、instrument；借鉴 CQ-driven engineering；实际类/谓词/IRI/版本、许可、兼容性未验证。不能证明覆盖专业操作、正负案例或 LLM 反向诊断；不先导入。
- Music Theory Ontology（S004）：索引摘要可见其补充理论概念，直接原文请求 403；状态 PARTIAL_ACCESS，后续寻找作者公开版本，暂不裁定复用细节。
- Music Ontology（S006）及 Polifonia 模块（S007/S008）：本轮未重读具体 OWL/版本；继续待逐项验证。
- SKOS/PROV-O/SHACL（S013–S015）：候选术语、来源、验证机制，L2 评估，不预选格式。
- 后续需要以同一组真实 CQ 对候选本体做覆盖、表达损失、命名/约束冲突及许可矩阵；本次只完成首轮来源定位，未完成 T01。

## 覆盖边界
S021–S025 对应五类专业知识来源；当前样稿六组，分布 K01.01/K01.02/K05.07/K10.01（交叉）/K08.07/K09.06（K10.07 交叉）；不是全 129 分支来源资格。其余分支、非西方/缅甸语、声乐教育和真实工程案例来源仍待系统研究。

## S004 后续阅读（2026-11-26）
原先 PARTIAL_ACCESS 是历史记录。Owner 提供的论文 PDF 已成功读取全文文本；见 [MTO 分析](music-theory-ontology-analysis.md)。论文阅读阻塞解除；本体文件、许可、版本、兼容性、图表视觉及推理复现仍待验证。原文不公开再分发。
