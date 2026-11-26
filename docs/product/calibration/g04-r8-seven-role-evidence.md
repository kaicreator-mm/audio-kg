# G04 R8b-2 — 七能力实际案例、来源资格与追溯证据
基准 6d1a82e24370ccb28f0f94a6decba850fe48cc66；从R8b-1的实际矩阵和发现路由逐级读取主案例及源登记。以下原行摘录是当前仓库原文、保留出处及边界，**不是新读取外部出版物或真实业务执行**。本题七能力链中A05主责为K05测量限定，K10另负责跨指标验收，未宣称全质量验收。每项输入输出须沿R8a版本、独立观察及实际保护的限定规则，不是名称匹配即可合格。

## A01 — K13.06
- [实际主案例](localization-r1-knowledge-cases.md#L9) blob f812393bbed00272695fd9f8cffca95ed6ba259f

| LA05 | K13.06.02.03 | S555/S556 | 四拍120BPM、音符时值[1,1,1,1]拍共2秒；题设词音节s1/s2/s3映射n1/n2/(n3,n4)，一音节可跨两音符（melisma），不必强求四音节。若第三音节要求短闭合且该配法拖长，应作为风险重新候选。 另设独立对照（不是前述2秒例）：同为3音节4音符，固定每音符时长.25s及休止区间[1,1.25)，候选s1→n1+n2或s1→n1使首音节.5/.25s；其余按题设s2→n3或n2+n3、s3→n4，词边界策略显式固定。计数一致不等分组/时值一致。 | 音节数等于音符数即对齐；缺音节就插入任意字。 | 逐音节 onset/rime/coda及可延展部分、音符/时值、语调韵律与语义约束；候选比较而非固定语言规则。 | 不指定真实缅语发声或可延长音素，具体由语言/歌唱证据核验。 |

[S555 原登记](../../research/source-qualification-localization-r1-r2.md#L7) blob 4e844b8fc6ff96f0d5e538a85897ad2f2a304553

| S555 | Štěpánková & Rosa 2025 [Song Lyrics Adaptations](https://aclanthology.org/2025.nlp4dh-1.11.pdf) DOI10.18653/v1/2025.nlp4dh-1.11，实际PDF零基0/2/8（印117/119/125），§1,2.2–2.5 Eq2–5,§6/Limitations | READ_LOCATOR；英捷文本到文本，无旋律输入，五维操作化与韵脚Jaccard/音节距离、偏好差异，研究数据许可限制；不证明实唱、缅语或权利。补S143摘要；不下载数据。 |

[S556 原登记](../../research/source-qualification-localization-r1-r2.md#L8) blob 4e844b8fc6ff96f0d5e538a85897ad2f2a304553

| S556 | Guo et al. 2022 [Automatic Song Translation for Tonal Languages](https://aclanthology.org/2022.findings-acl.60/) Abstract, DOI10.18653/v1/2022.findings-acl.60 | ABSTRACT_READ；英汉基准、语义/可唱性/可懂性及音调与旋律关联，作者报告，非全文或缅语实测；具体方法及评价待R3核验。 |

## A02 — K06.03
- [实际主案例](vocal-training-r2-knowledge-cases.md#L13) blob 9136336063ddb0b0a408f4ee5036500b8d593e2f

| VT39 | K06.03.03.04 | S409/S051 | 固定时基C、独立不可变事件n1@[0,500)、n2@[500,1000)，目标及独立参考200/220Hz。显示顺序n2:220、n1:200时，只有可信源ID、原时窗及同钟关联一致才可按n1/n2恢复顺序（误差0/0，原记录保留）。若可信n1确为220、n2确为200，即使标签有效仍为真实错位，禁止交换以提分；缺失/重复ID、时钟或连接证据不确定则UNKNOWN。 | 按数组顺序或最佳匹配擅自更改事件关联。 | 回查时间戳、事件身份与独立参考，拒绝无证重排。 | 合成记录，不是自动对齐算法实测。 |

[S409 原登记](../../research/source-qualification-vocal-science-r1.md#L17) blob be51b7d2da1c88fb039b3a067c3a80b450282f58

| S409 | Praat [how to choose a pitch analysis method](https://praat.org/manual/how_to_choose_a_pitch_analysis_method.html)，Measuring intonation/ unwanted octave drops/rises | 方法/自相似、参数与噪声导致候选错误；实际软件版本/运行未核；不把工具推荐直接套歌唱。 |

[S051 原登记](../../research/source-qualification-vocal-training-r1.md#L5) blob 9797780fd3cf6e338c074f942da6b347aa6d59a9

| S051（重读） | Berglin/Pfordresher/Demorest 2022 [The effect of visual and auditory feedback on adult poor-pitch remediation](https://journals.sagepub.com/doi/full/10.1177/03057356211026730)，Method Participants/Materials, Results/Table1, Discussion | READ_LOCATOR；75名纳入分析、三条件短期前后测，视觉辅助效果对4音模仿较明显，个体差异、纳入阈值分析敏感性、自导练习动机与装置限制；不采纳研究训练时长/评分阈值为通用要求，不宣称长期迁移。 |

## A03 — K12.01
- [实际主案例](tools-orchestration-r1-knowledge-cases.md#L5) blob 5e9931cbc774c44ee58477a2326ca22eb278a909

| TO01 | K12.01.01.03 | S538/S126 | 宿主H提供播放、轨道查询和脚本写入三种不同能力；文档列GetTrackGUID和GetSetMediaTrackInfo_String，不等任意宿主/版本都可调用。 | 能播放音频就可编辑轨道或插件。 | 检查宿主版本、API入口、对象类型、读写权限及回读；未知版本只列候选。 | REAPER动态文档未固定版本，不调用DAW。 |

[S538 原登记](../../research/source-qualification-tools-orchestration-r1.md#L5) blob d7c114ecb7637e65ea352cf3574cf4343f604340

| S538 | [REAPER ReaScript API](https://www.reaper.fm/sdk/reascript/reascripthelp.html) 实际HTML GetTrackGUID、GetSetMediaItemInfo_String、GetSetMediaTrackInfo_String、GetTrackStateChunk/SetTrackStateChunk | READ_LOCATOR；动态文档未固定版本，存在对象和读写接口不证明本机版本、原子事务、授权或持久化。 |

[S126 原登记](../../research/source-qualification-ai-orchestration.md#L25) blob dc5a5152e6c3117461f69ad38922a0263173253b

| S126 | Ardour [Lua Scripting](https://manual.ardour.org/lua-scripting/) introduction / Preface | K12.01/02/08/09 | READ_LOCATOR；脚本自动化、API文档明确未完成且可能变化；实际版本与运行未验证 |

## A04 — K09.02
- [实际主案例](production-r2-knowledge-cases.md#L10) blob 34ff5558676c16c28dd8eb380c3bad6a6d9112df

| MP30 | K09.02.03.04 | S490/S089 | 早期简化线性曲线点(0,0),(10,0),(12,0),(20,0)，只允许[10,12]闭边界内增加中心(11,2dB)，边界0不变；若删(20,0)或改变插值/读取模式，区间外可能改变。 修订判别例使用原线性点(0,0),(4,4),(10,0),(12,0),(20,0)，只新增(11,2)，边界10/12不变；区间外t2=2、t6=8/3、t15=0。全局改离散保持在t2/t6得到0/4，删(4,4)令外部变0，均拒绝。分离Play/Off，时间域/单位/版本及许可须一致；有限点不证明连续全域等价。 | 只比较新增控制点或参数值即认定原包络完整。 | 核曲线全域、边界、模式、时间域、增益单位、派生渲染与依赖，区间外不变须证。 | 不运行Audacity；失效现象按原资格。 |

[S490 原登记](../../research/source-qualification-production-r1.md#L8) blob ed3a79698d16b3703a6ce1635d221fa8fdbbc615

| S490 | [Ardour Automation Curves](https://manual.ardour.org/mixing/automation/automation-curves/) Linear/Discrete/Play mode | READ_LOCATOR；R2c实际HTML L35–38：插值和读取模式；不保证插件参数统一单位或宿主版本。 |

[S089 原登记](../../research/source-qualification-production-evaluation.md#L10) blob 37e563228c793697a9c53ebec22a5826a4822055

| S089 | Audacity [Envelope Tool](https://manual.audacityteam.org/man/envelope_tool.html) Control Points / Envelopes are wrongly removed by the following effects | K09.02/05/09 | READ_LOCATOR；文档报告部分效果使包络丢失，历史/当前实际受影响版本未验证；不得声称所有版本均有此缺陷 |

## A05 — K05.07
- [实际主案例](vocal-science-r3-knowledge-cases.md#L8) blob 08208a28e1ea95edb2ec83210e97542c3623298b

| VS64 | K05.07.01.05 | S409/S413 | 题设目标200Hz，同一有效且身份匹配分析窗独立真实参考220Hz：估计220时估计误差0，真实音乐偏差+165.004 cents；估计200时估计误差−165.004、估计相对目标0，但真实音乐偏差仍+165.004。原参考200、估计198/202的−17.40/+17.23 cents仍成立。缺独立参考则真实音乐偏差和估计误差UNKNOWN，仅可在已知目标时报告估计相对目标；缺目标则仅在独立参考有效时报告估计误差。无声/置信不足/身份不符的窗不计算相关音分。 | 以正负平均抵消个别偏差，或把缺失F0填0再计算对数。 | 检查参考、置信、音高体系与有效窗掩码，输出估计误差和音乐目标偏差分别。 | 合成数值非实际音准、感知或健康标准；K01音程、K10评价另核。 |

[S409 原登记](../../research/source-qualification-vocal-science-r1.md#L17) blob be51b7d2da1c88fb039b3a067c3a80b450282f58

| S409 | Praat [how to choose a pitch analysis method](https://praat.org/manual/how_to_choose_a_pitch_analysis_method.html)，Measuring intonation/ unwanted octave drops/rises | 方法/自相似、参数与噪声导致候选错误；实际软件版本/运行未核；不把工具推荐直接套歌唱。 |

[S413 原登记](../../research/source-qualification-vocal-science-r2.md#L6) blob e5756f278d97ccc943f59eb64ee76125db5708b0

| S413 | Patel et al. 2018 [Recommended Protocols for Instrumental Assessment of Voice](https://pubs.asha.org/doi/10.1044/2018_AJSLP-17-0009)，Acoustic Assessment / Aerodynamic Assessment / Discussion / endoscopic imaging | READ_LOCATOR；专业协议及专家共识，CPP与传统扰动指标适用条件、校准、间接声门下压/平均流量估计的有效前提；R2c实际定向核查：原HTML摘要可见、后续定位403；同论文[PhenX会议存档PDF](https://phenx-portal.s3.amazonaws.com/public/phenx-content/ERP/ERP7/Nov.27.2018_Meeting/06_Patel_et_al-2018-American_Journal_of_Speech-Language_Pathology.pdf)零基11/12截图（印898/899，Signal Criteria、Data Analysis、Fig2，文本L378–386/420–421）。/p/压力稳定、口流近零、相邻闭塞压力峰线性插值，间接平均估计的前提；不宣称与原下载字节相同，不复制人体操作流程或套用临床阈值到歌唱。 |

## A06 — K13.06
- [实际主案例](localization-r1-knowledge-cases.md#L9) blob f812393bbed00272695fd9f8cffca95ed6ba259f

| LA05 | K13.06.02.03 | S555/S556 | 四拍120BPM、音符时值[1,1,1,1]拍共2秒；题设词音节s1/s2/s3映射n1/n2/(n3,n4)，一音节可跨两音符（melisma），不必强求四音节。若第三音节要求短闭合且该配法拖长，应作为风险重新候选。 另设独立对照（不是前述2秒例）：同为3音节4音符，固定每音符时长.25s及休止区间[1,1.25)，候选s1→n1+n2或s1→n1使首音节.5/.25s；其余按题设s2→n3或n2+n3、s3→n4，词边界策略显式固定。计数一致不等分组/时值一致。 | 音节数等于音符数即对齐；缺音节就插入任意字。 | 逐音节 onset/rime/coda及可延展部分、音符/时值、语调韵律与语义约束；候选比较而非固定语言规则。 | 不指定真实缅语发声或可延长音素，具体由语言/歌唱证据核验。 |

[S555 原登记](../../research/source-qualification-localization-r1-r2.md#L7) blob 4e844b8fc6ff96f0d5e538a85897ad2f2a304553

| S555 | Štěpánková & Rosa 2025 [Song Lyrics Adaptations](https://aclanthology.org/2025.nlp4dh-1.11.pdf) DOI10.18653/v1/2025.nlp4dh-1.11，实际PDF零基0/2/8（印117/119/125），§1,2.2–2.5 Eq2–5,§6/Limitations | READ_LOCATOR；英捷文本到文本，无旋律输入，五维操作化与韵脚Jaccard/音节距离、偏好差异，研究数据许可限制；不证明实唱、缅语或权利。补S143摘要；不下载数据。 |

[S556 原登记](../../research/source-qualification-localization-r1-r2.md#L8) blob 4e844b8fc6ff96f0d5e538a85897ad2f2a304553

| S556 | Guo et al. 2022 [Automatic Song Translation for Tonal Languages](https://aclanthology.org/2022.findings-acl.60/) Abstract, DOI10.18653/v1/2022.findings-acl.60 | ABSTRACT_READ；英汉基准、语义/可唱性/可懂性及音调与旋律关联，作者报告，非全文或缅语实测；具体方法及评价待R3核验。 |

## A07 — K09.01
- [实际主案例](production-r2-knowledge-cases.md#L5) blob 34ff5558676c16c28dd8eb380c3bad6a6d9112df

| MP25 | K09.01.01.04 | S086/S487/S499 | 工程P含轨T1/R1与T2/R2同指源M1；R1源偏移1000/工程9600、R2源偏移1000/工程19200，若同一hash搬路径不必改变音频身份，但引用需重连；同路径换hash必须判依赖变化。 | 路径相同即素材相同；只检查文件存在。 | 核工程/轨/region/总线/源/渲染各ID、hash、源与工程时间、依赖图，报告绑定输入版本。 | 合成对象；hash标识题设，不执行文件。 |

[S086 原登记](../../research/source-qualification-production-evaluation.md#L7) blob 37e563228c793697a9c53ebec22a5826a4822055

| S086 | Ardour [What's in a Session?](https://manual.ardour.org/working-with-sessions/whats-in-a-session/) Session folder / routing / version compatibility | K09.01/08 | READ_LOCATOR；工程、素材、快照、输出与依赖区分，旧版本个别数据可能跳过；未固定软件版本 |

[S487 原登记](../../research/source-qualification-production-r1.md#L5) blob ed3a79698d16b3703a6ce1635d221fa8fdbbc615

| S487 | [Ardour Region Properties](https://manual.ardour.org/editing/editing-regions-and-selections/region-properties/) Position/Length/Sync point/File start/Source | READ_LOCATOR；素材偏移、工程位置、region增益独立；非所有DAW或当前运行。 |

[S499 原登记](../../research/source-qualification-production-r2.md#L7) blob d0794c42dc219720f8770dd4887ce1c0e6d62f5b

| S499 | [Ardour Backup and Sharing of Sessions](https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/) external media/archive/options | READ_LOCATOR；外部引用、活动快照、未用素材、浮点转整数FLAC可能损失及归档选项；不保证插件二进制或许可齐全。 |

## 机器回读证据（固定快照，不是图谱schema）
```json
[
  {
    "ability": "A01",
    "owner": "K13.06",
    "role": "P",
    "matrix": "localization-r3-capability-calibration.md#L40",
    "matrixBlob": "86292af43298f731ff72fe75a369c0bd546cef46",
    "d4": "K13.06.02.03",
    "discovery": "localization-r3-discovery-cq.md#L9",
    "discoveryBlob": "4d40c58d20bf31a17dedbdf531f05daa5c850b99",
    "caseId": "LA05",
    "caseFile": "localization-r1-knowledge-cases.md",
    "caseLine": 9,
    "sources": [
      {
        "id": "S555",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 7
      },
      {
        "id": "S556",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 8
      }
    ],
    "input": "original words+score, 120 quarter BPM",
    "output": "three syllables/four notes, 2s; explicit lyric-note bindings",
    "roleMeaning": "理解翻译、可唱改编、重新创作与硬保留",
    "caseBlob": "f812393bbed00272695fd9f8cffca95ed6ba259f",
    "caseRecord": "| LA05 | K13.06.02.03 | S555/S556 | 四拍120BPM、音符时值[1,1,1,1]拍共2秒；题设词音节s1/s2/s3映射n1/n2/(n3,n4)，一音节可跨两音符（melisma），不必强求四音节。若第三音节要求短闭合且该配法拖长，应作为风险重新候选。 另设独立对照（不是前述2秒例）：同为3音节4音符，固定每音符时长.25s及休止区间[1,1.25)，候选s1→n1+n2或s1→n1使首音节.5/.25s；其余按题设s2→n3或n2+n3、s3→n4，词边界策略显式固定。计数一致不等分组/时值一致。 | 音节数等于音符数即对齐；缺音节就插入任意字。 | 逐音节 onset/rime/coda及可延展部分、音符/时值、语调韵律与语义约束；候选比较而非固定语言规则。 | 不指定真实缅语发声或可延长音素，具体由语言/歌唱证据核验。 |",
    "sourceRecords": [
      {
        "id": "S555",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 7,
        "blob": "4e844b8fc6ff96f0d5e538a85897ad2f2a304553",
        "record": "| S555 | Štěpánková & Rosa 2025 [Song Lyrics Adaptations](https://aclanthology.org/2025.nlp4dh-1.11.pdf) DOI10.18653/v1/2025.nlp4dh-1.11，实际PDF零基0/2/8（印117/119/125），§1,2.2–2.5 Eq2–5,§6/Limitations | READ_LOCATOR；英捷文本到文本，无旋律输入，五维操作化与韵脚Jaccard/音节距离、偏好差异，研究数据许可限制；不证明实唱、缅语或权利。补S143摘要；不下载数据。 |"
      },
      {
        "id": "S556",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 8,
        "blob": "4e844b8fc6ff96f0d5e538a85897ad2f2a304553",
        "record": "| S556 | Guo et al. 2022 [Automatic Song Translation for Tonal Languages](https://aclanthology.org/2022.findings-acl.60/) Abstract, DOI10.18653/v1/2022.findings-acl.60 | ABSTRACT_READ；英汉基准、语义/可唱性/可懂性及音调与旋律关联，作者报告，非全文或缅语实测；具体方法及评价待R3核验。 |"
      }
    ]
  },
  {
    "ability": "A02",
    "owner": "K06.03",
    "role": "P",
    "matrix": "vocal-training-r3-capability-calibration.md#L20",
    "matrixBlob": "e005b583f20b5e4f97fab6d20bf9da6a65203bb2",
    "d4": "K06.03.03.04",
    "discovery": "vocal-training-r3-discovery-cq.md#L43",
    "discoveryBlob": "66873fadf5dbf8dad8c76e424f36d8115f460935",
    "caseId": "VT39",
    "caseFile": "vocal-training-r2-knowledge-cases.md",
    "caseLine": 13,
    "sources": [
      {
        "id": "S409",
        "file": "source-qualification-vocal-science-r1.md",
        "line": 17
      },
      {
        "id": "S051",
        "file": "source-qualification-vocal-training-r1.md",
        "line": 5
      }
    ],
    "input": "bound events, permission, plan",
    "output": "B/P for rehearsal only; O1 B-only alternative; trusted time join",
    "roleMeaning": "目标和参考核对→反馈→无辅助复测",
    "caseBlob": "9136336063ddb0b0a408f4ee5036500b8d593e2f",
    "caseRecord": "| VT39 | K06.03.03.04 | S409/S051 | 固定时基C、独立不可变事件n1@[0,500)、n2@[500,1000)，目标及独立参考200/220Hz。显示顺序n2:220、n1:200时，只有可信源ID、原时窗及同钟关联一致才可按n1/n2恢复顺序（误差0/0，原记录保留）。若可信n1确为220、n2确为200，即使标签有效仍为真实错位，禁止交换以提分；缺失/重复ID、时钟或连接证据不确定则UNKNOWN。 | 按数组顺序或最佳匹配擅自更改事件关联。 | 回查时间戳、事件身份与独立参考，拒绝无证重排。 | 合成记录，不是自动对齐算法实测。 |",
    "sourceRecords": [
      {
        "id": "S409",
        "file": "source-qualification-vocal-science-r1.md",
        "line": 17,
        "blob": "be51b7d2da1c88fb039b3a067c3a80b450282f58",
        "record": "| S409 | Praat [how to choose a pitch analysis method](https://praat.org/manual/how_to_choose_a_pitch_analysis_method.html)，Measuring intonation/ unwanted octave drops/rises | 方法/自相似、参数与噪声导致候选错误；实际软件版本/运行未核；不把工具推荐直接套歌唱。 |"
      },
      {
        "id": "S051",
        "file": "source-qualification-vocal-training-r1.md",
        "line": 5,
        "blob": "9797780fd3cf6e338c074f942da6b347aa6d59a9",
        "record": "| S051（重读） | Berglin/Pfordresher/Demorest 2022 [The effect of visual and auditory feedback on adult poor-pitch remediation](https://journals.sagepub.com/doi/full/10.1177/03057356211026730)，Method Participants/Materials, Results/Table1, Discussion | READ_LOCATOR；75名纳入分析、三条件短期前后测，视觉辅助效果对4音模仿较明显，个体差异、纳入阈值分析敏感性、自导练习动机与装置限制；不采纳研究训练时长/评分阈值为通用要求，不宣称长期迁移。 |"
      }
    ]
  },
  {
    "ability": "A03",
    "owner": "K12.01",
    "role": "P",
    "matrix": "tools-orchestration-r3-capability-calibration.md#L7",
    "matrixBlob": "e9a363e09f924b6f8101966f2fe4fa46ce3f354a",
    "d4": "K12.01.01.03",
    "discovery": "tools-orchestration-r3-discovery-cq.md#L5",
    "discoveryBlob": "54d6ee065eff7e2fcb4c6ec205e084f11dd5c24c",
    "caseId": "TO01",
    "caseFile": "tools-orchestration-r1-knowledge-cases.md",
    "caseLine": 5,
    "sources": [
      {
        "id": "S538",
        "file": "source-qualification-tools-orchestration-r1.md",
        "line": 5
      },
      {
        "id": "S126",
        "file": "source-qualification-ai-orchestration.md",
        "line": 25
      }
    ],
    "input": "host H1, operation, grant",
    "output": "stipulated host qualification; no actual host/API action",
    "roleMeaning": "REAPER/Ardour接口证据、实际版本未知",
    "caseBlob": "5e9931cbc774c44ee58477a2326ca22eb278a909",
    "caseRecord": "| TO01 | K12.01.01.03 | S538/S126 | 宿主H提供播放、轨道查询和脚本写入三种不同能力；文档列GetTrackGUID和GetSetMediaTrackInfo_String，不等任意宿主/版本都可调用。 | 能播放音频就可编辑轨道或插件。 | 检查宿主版本、API入口、对象类型、读写权限及回读；未知版本只列候选。 | REAPER动态文档未固定版本，不调用DAW。 |",
    "sourceRecords": [
      {
        "id": "S538",
        "file": "source-qualification-tools-orchestration-r1.md",
        "line": 5,
        "blob": "d7c114ecb7637e65ea352cf3574cf4343f604340",
        "record": "| S538 | [REAPER ReaScript API](https://www.reaper.fm/sdk/reascript/reascripthelp.html) 实际HTML GetTrackGUID、GetSetMediaItemInfo_String、GetSetMediaTrackInfo_String、GetTrackStateChunk/SetTrackStateChunk | READ_LOCATOR；动态文档未固定版本，存在对象和读写接口不证明本机版本、原子事务、授权或持久化。 |"
      },
      {
        "id": "S126",
        "file": "source-qualification-ai-orchestration.md",
        "line": 25,
        "blob": "dc5a5152e6c3117461f69ad38922a0263173253b",
        "record": "| S126 | Ardour [Lua Scripting](https://manual.ardour.org/lua-scripting/) introduction / Preface | K12.01/02/08/09 | READ_LOCATOR；脚本自动化、API文档明确未完成且可能变化；实际版本与运行未验证 |"
      }
    ]
  },
  {
    "ability": "A04",
    "owner": "K09.02",
    "role": "P",
    "matrix": "production-r3-capability-calibration.md#L15",
    "matrixBlob": "4a98b224eda2e62da3052be7df5cd465d1a6b122",
    "d4": "K09.02.03.04",
    "discovery": "production-r3-discovery-cq.md#L34",
    "discoveryBlob": "b160e921f945087bb78085882f79e72d66d44fae",
    "caseId": "MP30",
    "caseFile": "production-r2-knowledge-cases.md",
    "caseLine": 10,
    "sources": [
      {
        "id": "S490",
        "file": "source-qualification-production-r1.md",
        "line": 8
      },
      {
        "id": "S089",
        "file": "source-qualification-production-evaluation.md",
        "line": 10
      }
    ],
    "input": "source S1, c2, permitted span",
    "output": "retain outside piecewise-linear envelope, notes, lyrics, cue; immutable c3 revision",
    "roleMeaning": "原件、源/工程区间、tempo、曲线模式及渲染版本",
    "caseBlob": "34ff5558676c16c28dd8eb380c3bad6a6d9112df",
    "caseRecord": "| MP30 | K09.02.03.04 | S490/S089 | 早期简化线性曲线点(0,0),(10,0),(12,0),(20,0)，只允许[10,12]闭边界内增加中心(11,2dB)，边界0不变；若删(20,0)或改变插值/读取模式，区间外可能改变。 修订判别例使用原线性点(0,0),(4,4),(10,0),(12,0),(20,0)，只新增(11,2)，边界10/12不变；区间外t2=2、t6=8/3、t15=0。全局改离散保持在t2/t6得到0/4，删(4,4)令外部变0，均拒绝。分离Play/Off，时间域/单位/版本及许可须一致；有限点不证明连续全域等价。 | 只比较新增控制点或参数值即认定原包络完整。 | 核曲线全域、边界、模式、时间域、增益单位、派生渲染与依赖，区间外不变须证。 | 不运行Audacity；失效现象按原资格。 |",
    "sourceRecords": [
      {
        "id": "S490",
        "file": "source-qualification-production-r1.md",
        "line": 8,
        "blob": "ed3a79698d16b3703a6ce1635d221fa8fdbbc615",
        "record": "| S490 | [Ardour Automation Curves](https://manual.ardour.org/mixing/automation/automation-curves/) Linear/Discrete/Play mode | READ_LOCATOR；R2c实际HTML L35–38：插值和读取模式；不保证插件参数统一单位或宿主版本。 |"
      },
      {
        "id": "S089",
        "file": "source-qualification-production-evaluation.md",
        "line": 10,
        "blob": "37e563228c793697a9c53ebec22a5826a4822055",
        "record": "| S089 | Audacity [Envelope Tool](https://manual.audacityteam.org/man/envelope_tool.html) Control Points / Envelopes are wrongly removed by the following effects | K09.02/05/09 | READ_LOCATOR；文档报告部分效果使包络丢失，历史/当前实际受影响版本未验证；不得声称所有版本均有此缺陷 |"
      }
    ]
  },
  {
    "ability": "A05",
    "owner": "K05.07",
    "role": "P",
    "matrix": "vocal-science-r4-capability-calibration.md#L51",
    "matrixBlob": "0b71c3683a087ece794595fc0b60c965853f9eda",
    "d4": "K05.07.01.05",
    "discovery": "vocal-science-r4-discovery-cq.md#L68",
    "discoveryBlob": "648b95fd2ebdda6ea72529e67968407877e0e2f4",
    "caseId": "VS64",
    "caseFile": "vocal-science-r3-knowledge-cases.md",
    "caseLine": 8,
    "sources": [
      {
        "id": "S409",
        "file": "source-qualification-vocal-science-r1.md",
        "line": 17
      },
      {
        "id": "S413",
        "file": "source-qualification-vocal-science-r2.md",
        "line": 6
      }
    ],
    "input": "OBS-A-01, EST-2/3/4, target 200",
    "output": "estimation and actual goal error separately; unknown reference refuses",
    "roleMeaning": "主责测量定义、量纲、限制，不作质量/健康唯一判据",
    "caseBlob": "08208a28e1ea95edb2ec83210e97542c3623298b",
    "caseRecord": "| VS64 | K05.07.01.05 | S409/S413 | 题设目标200Hz，同一有效且身份匹配分析窗独立真实参考220Hz：估计220时估计误差0，真实音乐偏差+165.004 cents；估计200时估计误差−165.004、估计相对目标0，但真实音乐偏差仍+165.004。原参考200、估计198/202的−17.40/+17.23 cents仍成立。缺独立参考则真实音乐偏差和估计误差UNKNOWN，仅可在已知目标时报告估计相对目标；缺目标则仅在独立参考有效时报告估计误差。无声/置信不足/身份不符的窗不计算相关音分。 | 以正负平均抵消个别偏差，或把缺失F0填0再计算对数。 | 检查参考、置信、音高体系与有效窗掩码，输出估计误差和音乐目标偏差分别。 | 合成数值非实际音准、感知或健康标准；K01音程、K10评价另核。 |",
    "sourceRecords": [
      {
        "id": "S409",
        "file": "source-qualification-vocal-science-r1.md",
        "line": 17,
        "blob": "be51b7d2da1c88fb039b3a067c3a80b450282f58",
        "record": "| S409 | Praat [how to choose a pitch analysis method](https://praat.org/manual/how_to_choose_a_pitch_analysis_method.html)，Measuring intonation/ unwanted octave drops/rises | 方法/自相似、参数与噪声导致候选错误；实际软件版本/运行未核；不把工具推荐直接套歌唱。 |"
      },
      {
        "id": "S413",
        "file": "source-qualification-vocal-science-r2.md",
        "line": 6,
        "blob": "e5756f278d97ccc943f59eb64ee76125db5708b0",
        "record": "| S413 | Patel et al. 2018 [Recommended Protocols for Instrumental Assessment of Voice](https://pubs.asha.org/doi/10.1044/2018_AJSLP-17-0009)，Acoustic Assessment / Aerodynamic Assessment / Discussion / endoscopic imaging | READ_LOCATOR；专业协议及专家共识，CPP与传统扰动指标适用条件、校准、间接声门下压/平均流量估计的有效前提；R2c实际定向核查：原HTML摘要可见、后续定位403；同论文[PhenX会议存档PDF](https://phenx-portal.s3.amazonaws.com/public/phenx-content/ERP/ERP7/Nov.27.2018_Meeting/06_Patel_et_al-2018-American_Journal_of_Speech-Language_Pathology.pdf)零基11/12截图（印898/899，Signal Criteria、Data Analysis、Fig2，文本L378–386/420–421）。/p/压力稳定、口流近零、相邻闭塞压力峰线性插值，间接平均估计的前提；不宣称与原下载字节相同，不复制人体操作流程或套用临床阈值到歌唱。 |"
      }
    ]
  },
  {
    "ability": "A06",
    "owner": "K13.06",
    "role": "P",
    "matrix": "localization-r3-capability-calibration.md#L45",
    "matrixBlob": "86292af43298f731ff72fe75a369c0bd546cef46",
    "d4": "K13.06.02.03",
    "discovery": "localization-r3-discovery-cq.md#L9",
    "discoveryBlob": "4d40c58d20bf31a17dedbdf531f05daa5c850b99",
    "caseId": "LA05",
    "caseFile": "localization-r1-knowledge-cases.md",
    "caseLine": 9,
    "sources": [
      {
        "id": "S555",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 7
      },
      {
        "id": "S556",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 8
      }
    ],
    "input": "protected score/words and approved edit",
    "output": "editable symbolic bindings, curve; not WAV-to-score reconstruction",
    "roleMeaning": "保留不同词曲候选及可编辑对齐、原稿",
    "caseBlob": "f812393bbed00272695fd9f8cffca95ed6ba259f",
    "caseRecord": "| LA05 | K13.06.02.03 | S555/S556 | 四拍120BPM、音符时值[1,1,1,1]拍共2秒；题设词音节s1/s2/s3映射n1/n2/(n3,n4)，一音节可跨两音符（melisma），不必强求四音节。若第三音节要求短闭合且该配法拖长，应作为风险重新候选。 另设独立对照（不是前述2秒例）：同为3音节4音符，固定每音符时长.25s及休止区间[1,1.25)，候选s1→n1+n2或s1→n1使首音节.5/.25s；其余按题设s2→n3或n2+n3、s3→n4，词边界策略显式固定。计数一致不等分组/时值一致。 | 音节数等于音符数即对齐；缺音节就插入任意字。 | 逐音节 onset/rime/coda及可延展部分、音符/时值、语调韵律与语义约束；候选比较而非固定语言规则。 | 不指定真实缅语发声或可延长音素，具体由语言/歌唱证据核验。 |",
    "sourceRecords": [
      {
        "id": "S555",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 7,
        "blob": "4e844b8fc6ff96f0d5e538a85897ad2f2a304553",
        "record": "| S555 | Štěpánková & Rosa 2025 [Song Lyrics Adaptations](https://aclanthology.org/2025.nlp4dh-1.11.pdf) DOI10.18653/v1/2025.nlp4dh-1.11，实际PDF零基0/2/8（印117/119/125），§1,2.2–2.5 Eq2–5,§6/Limitations | READ_LOCATOR；英捷文本到文本，无旋律输入，五维操作化与韵脚Jaccard/音节距离、偏好差异，研究数据许可限制；不证明实唱、缅语或权利。补S143摘要；不下载数据。 |"
      },
      {
        "id": "S556",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 8,
        "blob": "4e844b8fc6ff96f0d5e538a85897ad2f2a304553",
        "record": "| S556 | Guo et al. 2022 [Automatic Song Translation for Tonal Languages](https://aclanthology.org/2022.findings-acl.60/) Abstract, DOI10.18653/v1/2022.findings-acl.60 | ABSTRACT_READ；英汉基准、语义/可唱性/可懂性及音调与旋律关联，作者报告，非全文或缅语实测；具体方法及评价待R3核验。 |"
      }
    ]
  },
  {
    "ability": "A07",
    "owner": "K09.01",
    "role": "P",
    "matrix": "production-r3-capability-calibration.md#L11",
    "matrixBlob": "4a98b224eda2e62da3052be7df5cd465d1a6b122",
    "d4": "K09.01.01.04",
    "discovery": "production-r3-discovery-cq.md#L29",
    "discoveryBlob": "b160e921f945087bb78085882f79e72d66d44fae",
    "caseId": "MP25",
    "caseFile": "production-r2-knowledge-cases.md",
    "caseLine": 5,
    "sources": [
      {
        "id": "S086",
        "file": "source-qualification-production-evaluation.md",
        "line": 7
      },
      {
        "id": "S487",
        "file": "source-qualification-production-r1.md",
        "line": 5
      },
      {
        "id": "S499",
        "file": "source-qualification-production-r2.md",
        "line": 7
      }
    ],
    "input": "immutable c2/R2 and c3/R3",
    "output": "invalidate old dependent report; new stipulated evidence; rollback/STOP, not release",
    "roleMeaning": "最小变更、依赖闭包复核、旧报告失效和回滚",
    "caseBlob": "34ff5558676c16c28dd8eb380c3bad6a6d9112df",
    "caseRecord": "| MP25 | K09.01.01.04 | S086/S487/S499 | 工程P含轨T1/R1与T2/R2同指源M1；R1源偏移1000/工程9600、R2源偏移1000/工程19200，若同一hash搬路径不必改变音频身份，但引用需重连；同路径换hash必须判依赖变化。 | 路径相同即素材相同；只检查文件存在。 | 核工程/轨/region/总线/源/渲染各ID、hash、源与工程时间、依赖图，报告绑定输入版本。 | 合成对象；hash标识题设，不执行文件。 |",
    "sourceRecords": [
      {
        "id": "S086",
        "file": "source-qualification-production-evaluation.md",
        "line": 7,
        "blob": "37e563228c793697a9c53ebec22a5826a4822055",
        "record": "| S086 | Ardour [What's in a Session?](https://manual.ardour.org/working-with-sessions/whats-in-a-session/) Session folder / routing / version compatibility | K09.01/08 | READ_LOCATOR；工程、素材、快照、输出与依赖区分，旧版本个别数据可能跳过；未固定软件版本 |"
      },
      {
        "id": "S487",
        "file": "source-qualification-production-r1.md",
        "line": 5,
        "blob": "ed3a79698d16b3703a6ce1635d221fa8fdbbc615",
        "record": "| S487 | [Ardour Region Properties](https://manual.ardour.org/editing/editing-regions-and-selections/region-properties/) Position/Length/Sync point/File start/Source | READ_LOCATOR；素材偏移、工程位置、region增益独立；非所有DAW或当前运行。 |"
      },
      {
        "id": "S499",
        "file": "source-qualification-production-r2.md",
        "line": 7,
        "blob": "d0794c42dc219720f8770dd4887ce1c0e6d62f5b",
        "record": "| S499 | [Ardour Backup and Sharing of Sessions](https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/) external media/archive/options | READ_LOCATOR；外部引用、活动快照、未用素材、浮点转整数FLAC可能损失及归档选项；不保证插件二进制或许可齐全。 |"
      }
    ]
  }
]
```
