# 模型/工具证据专项：规划、控制、可编辑性和准入

DRAFT / T01。与 [第五波来源](source-qualification-ai-orchestration.md) 同步；以下是候选研究路径与作者/厂商描述，不是已准入能力表。原始架构报告、模型卡、代码/接口、实际版本、许可、运行与独立验证分开。每项版本事实必须有适用版本和来源定位；无法访问是UNKNOWN，不是不存在。

## 研究路线对比
| 路线及候选 | 本轮实际证据 | 对 Audio-KG 的意义 | 禁止外推 |
|---|---|---|---|
| MusicGen / EnCodec | S108/S109摘要；S124模型卡 | 音频token与文本/旋律条件，记录codec依赖及语义边界 | 旋律条件不等于真实歌声或音符编辑；S124卡片标NC |
| MuseCoco | S112摘要 | 文本→音乐属性→符号音乐，可先检查属性和事件 | 不证明直接渲染真实人声 |
| YuE | S113 §3.2/3.2.1 | 人声/伴奏分开建模、逐段条件、分阶段渲染，记录声部条件 | 不等于所有轨可单独编辑，不等于YuE2能力 |
| ACE-Step 1.5 | S114 §3.3 | 规划和DiT、source latent/mask条件，建立多任务能力及保护区测试 | 不证明V100运行、目标语种、非目标保真、商业许可或论文质量排名 |
| Qwen-Music | S115摘要 | tokenizer/LLM/render 分工、生成和cover候选 | 不证明可下载权重、可调用API、可编辑乐谱或本地运行 |
| Stable Audio 3 | S116摘要 | 可变长latent生成、inpainting、续写 | 不证明特定歌声、歌词或保留原声音轨 |
| DiffSinger / SaMoye | S111/S117摘要 | 乐谱条件SVS 与来源演唱条件SVC的不同任务 | 不把TTS/SVS/SVC等同，不保证参考声音权利和语种 |
| HT Demucs | S118摘要、S064既有资料 | 分离目标、数据与评估条件、模型机制 | 分离轨不等于真实原始录音 |
| Music Flamingo | S121摘要 | 音乐理解、语义评价、研究奖励候选 | 不能代替专业规则、主观听评或生成能力 |
| 层次音乐世界模型 | S122摘要 | 按时间尺度设计符号表示与候选编辑 | 非完整歌曲波形模型，不能宣称已形成运行Harness |
| MusicAgent / MCP / Ardour | S132摘要、S131协议、S126脚本说明 | 区分Agent规划、工具契约、宿主动作、状态与证据 | 工具发现与成功返回不证明业务质量或权限 |

## 先前十条论文线索的复核
逐一打开原先记录的arXiv ID（2026-11-26）。本轮 3 个标题/摘要相符，7 个 cache miss；后者保留UNKNOWN，不用镜像README或搜索片段冒充原始论文。
| 线索 | 原始 ID | 本轮状态 |
|---|---|---|
| YuE2 | 2609.33757 | UNKNOWN/cache miss；搜索到多个fork描述，不认定官方资产 |
| Qwen-Music | 2607.11699 | ABSTRACT_READ/S115；v2 |
| StepAudio 3 Music | 2609.16034 | UNKNOWN/cache miss |
| MIDI-REPA | 2610.20967 | UNKNOWN/cache miss |
| MuseCritic | 2608.11755 | UNKNOWN/cache miss |
| Music world model | 2608.04378 | ABSTRACT_READ/S122 |
| MusicFlux | 2611.13834 | UNKNOWN/cache miss |
| Structured Captions | 2611.00685 | UNKNOWN/cache miss |
| Stable Audio 3 | 2605.17991 | ABSTRACT_READ/S116 |
| Music audio generation tutorial | 2610.38252 | UNKNOWN/cache miss |

历史项目线索（Setloom/OpenStudio/ATRI/MAGDA/Producer Pal等）仍未逐版本核验；本轮优先已找到原始论文及正式协议的基础能力。不得把未核实候选提升为accepted。

## 能力准入候选合同（非schema）
- identity: tool/model family, exact checkpoint/revision, code/dependency version, provider, accessed date；论文ID不能替代实际权重SHA。文档事实与实测分别记录。
- task: TTS/SVS/SVC/text-to-music/lyrics-to-song/cover/repaint/separation/symbolic/MIR 等；input/output schema、语种、长度、时基、采样率、声部粒度、控制语义、保留项、条件；负例、未知与替代。
- rights: code/weight/data/reference/recording/service licenses and permission independently qualified；未获得授权或未知则禁止自动放行相关操作。
- execution: actual platform/GPU/runtime/precision/model configuration, resource and latency measurement, failure/status/timeout behavior, input/output artifact identity and validation; not merely API success. V100 exact GPU architecture/software compatibility remains UNKNOWN.
- evaluation: defined task and reference, data split, metric protocol and listening panel, uncertainty, protection regression; report differences between claimed and verified capabilities. Any version/input/protocol change requires applicability review.
- discoverability: stable capability ID, aliases, task/input/output/condition/limitation and knowledge IDs; direct vs alternative route, fail-closed if unknown mandatory capability. Prefer exact tool/knowledge selection over generic descriptions; no runtime implementation yet.

## 组合任务的决策边界
针对授权翻唱或局部换人演唱：需要重新生成歌词/音符时优先核对SVS或cover的控制条件；保留来源演唱时考虑SVC候选；来源是混音时先评估分离损伤；无需生成时可用确定性谱面、DAW或DSP编辑。模型家族宣传不是实际接口证据；生成、编辑和评价的证据各有独立身份。当前无真实模型/DAW调用、无性能实测、无版本部署选择。
