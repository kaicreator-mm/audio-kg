# K09/K10 来源资格（第四波）

DRAFT；2026-11-26。READ_LOCATOR 表示读取到官方HTML相关位置；LANDING_ONLY 表示仅核验发布页/版本，未读规范正文；SEARCH_ONLY 表示检索摘要/原文访问失败。不是专业独立审核、许可冻结或实际工具运行。文档类资料仅支持所述版本/能力；原始源码、数据和软件许可证需另验。只提交原创概括和公开链接。

| ID | 来源与定位 | 用途 | 状态与限制 |
|---|---|---|---|
| S086 | Ardour [What's in a Session?](https://manual.ardour.org/working-with-sessions/whats-in-a-session/) Session folder / routing / version compatibility | K09.01/08 | READ_LOCATOR；工程、素材、快照、输出与依赖区分，旧版本个别数据可能跳过；未固定软件版本 |
| S087 | Ardour [Creating Music with Ardour](https://manual.ardour.org/introducing-ardour/creating-music-with-ardour/) stages 2–5 | K09.01/02/05/08/09 | READ_LOCATOR；region编辑与MIDI内容写入区别，混音自动化与输出；不推广到所有DAW |
| S088 | Ardour [Snapshots](https://manual.ardour.org/working-with-sessions/snapshots/) creation/switching | K09.01/09 | READ_LOCATOR；同session快照共享数据，不是独立素材备份 |
| S089 | Audacity [Envelope Tool](https://manual.audacityteam.org/man/envelope_tool.html) Control Points / Envelopes are wrongly removed by the following effects | K09.02/05/09 | READ_LOCATOR；文档报告部分效果使包络丢失，历史/当前实际受影响版本未验证；不得声称所有版本均有此缺陷 |
| S090 | Audacity [Change Tempo](https://manual.audacityteam.org/man/change_tempo.html) Advice / Limitations | K09.02/03 K08.03 | READ_LOCATOR；文档说明对选区应用效果会渲染/拆分变速clip，并警告包络问题；算法和伪影受参数限制；未运行 |
| S091 | Ardour [Playlist Usecases](https://manual.ardour.org/working-with-playlists/playlist_usecases/) Using Playlists for Takes | K09.03 | READ_LOCATOR；多take选择及合成编辑，非修音算法效果证据 |
| S092 | Ardour [Track/Bus Signal Flow](https://manual.ardour.org/signal-routing/signal-flow/) Overview / Strict I/O / Pin Connection | K09.01/04/05/07 | READ_LOCATOR；处理链、灵活I/O及侧链，宿主特定实现 |
| S093 | Audacity [Compressor](https://manual.audacityteam.org/man/compressor.html?source=post_page---------------------------) Compression curve / Controls / Smoothing | K09.04/05 | READ_LOCATOR；静态映射与时间平滑不同，版本/实际运行待证 |
| S094 | EBU [Loudness](https://tech.ebu.ch/loudness/) introduction / accompanying publications / test signals | K09.06 K10.07 | READ_LOCATOR；R128 v5.0、Tech3341/3342/3343等出版物及测试信号入口；不声称读过这些PDF或通过标准测试 |
| S095 | Spotify [Loudness normalization](https://support.spotify.com/ba/artists/article/loudness-normalization/?category=managing-your-music&plain=) | K09.06 | SEARCH_ONLY；检索摘要与原文cache miss；平台版本、适用播放模式及具体数值待核，不提升为通用母带要求 |
| S096 | Shure [How to Control Feedback in a Sound System](https://www.shure.com/en-GB/insights/how-to-control-feedback-in-a-sound-system), Jan 25 2013, What is acoustic feedback / Suggestions | K09.07 | READ_LOCATOR；厂商实践资料，反馈环路与布置/增益候选；不采纳脱离条件的固定频段/增益建议，不在危险声级复现 |
| S097 | Ardour [Stem Exports](https://manual.ardour.org/working-with-sessions/interchange-with-other-daws/stem-exports/) channels / Apply track/bus processing | K09.08 | READ_LOCATOR；独立轨道/总线导出、包含静音保持对齐，可选择应用处理；不能完整传输工程状态；未实测 |
| S098 | ITU-R [BS.1534-3](https://www.itu.int/rec/R-REC-BS.1534-3-201510-I/en) 2015-10 发布页 | K09.09 K10.07/09 | LANDING_ONLY；标题与版本状态核验，未读正文/视觉复核，不声称遵循MUSHRA完整流程 |
| S099 | mir_eval 0.8.2 [melody](https://mir-eval.readthedocs.io/stable/api/melody.html) Metrics / raw_pitch_accuracy / raw_chroma_accuracy | K10.01/06/09 | READ_LOCATOR；voicing及参考估计序列，默认50音分容差与chroma折叠；仅该任务/接口，不是艺术音准通用阈值 |
| S100 | Essentia [Algorithms overview](https://essentia.upf.edu/algorithms_overview.html) Extractors | K10.01–03/07 | READ_LOCATOR；页面2.1-beta6-dev；描述提取器用途，不证明精度或可直接部署 |
| S101 | mir_eval 0.8.2 [beat](https://mir-eval.readthedocs.io/stable/api/beat.html) Metrics / f_measure | K10.02/09 | READ_LOCATOR；默认0.07秒匹配窗，其他指标不同；不视为专业演奏的普遍容差 |
| S102 | mir_eval 0.8.2 [chord](https://mir-eval.readthedocs.io/stable/api/chord.html) root / triads / *_inv / weighted_accuracy examples | K10.03/09 | READ_LOCATOR；不同标签匹配和时长加权，不证明音乐功能或非西方语义 |
| S103 | mir_eval [key](https://mir-eval.readthedocs.io/latest/api/key.html)（历史latest链接；版本纠正见S510） Conventions / validate_key / weighted_score | K10.03 | READ_LOCATOR；major/minor约定及X/other处理须具体核对；下降五度开关仅在含该参数的版本适用；2026-11-26 S510实际重读stable0.8.2无此参数、latest0.9.0dev有此参数；不支持全文化调式评价 |
| S104 | mir_eval 0.8.2 [transcription](https://mir-eval.readthedocs.io/stable/api/transcription.html) onset_precision_recall_f1 signature | K10.04/09 | READ_LOCATOR；onset默认0.05秒，注意不同音符任务定义，不泛化成歌词或复音识别全部指标 |
| S105 | mir_eval 0.8.2 [segment](https://mir-eval.readthedocs.io/stable/api/segment.html) Metrics / detection / deviation / pairwise | K10.05/09 | READ_LOCATOR；区分边界及标签，分区假设和窗口；不能证明音乐结构唯一 |
| S107 | ITU-R [BS系列推荐目录](https://www.itu.int/rec/R-REC-BS) BS.1284、BS.1534 | K10.09 | SEARCH_ONLY；搜索摘要入口；待逐个规范核验，不能作为盲评/随机化详细规则证据 |

## 来源缺口及修正
S106 在草稿中发现与 S098 重复，本轮提交前去重，保留 S106 为未使用编号，不重新分配；BS.1534-3 仅 S098 一个权威来源记录。S095、S107 为发现线索。S098正文与目录未读，后续需核验BS.1534、BS.1116/BS.1284等具体适用范围、版本、评价流程及条件；不可仅根据标题宣称符合标准。
尚需人声修音、齿音、混响/延迟、混音、母带、跨宿主交换及现场扩声的专业资料；MIR实证、参考标注/一致性、复音及歌词转录、多文化审美、听评统计和实验设计需补专门论文/教材。mir_eval 文档只能支持指标语义及接口，不能作为识别算法性能证明。历史 S025 的标准摘要继续有效于限定范围。未实际运行工具、处理声音、下载曲目或获取个人录音。
