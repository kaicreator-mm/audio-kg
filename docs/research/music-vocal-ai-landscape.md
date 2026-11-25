# 音乐与声乐 AI 生态及理论分析

状态 DRAFT；研究截点 2026-11-26。目的：保留项目发起前的两轮分析并为 L1 领域范围和来源发现提供输入，不把聊天判断当作专业证据。

## 1. 生成理论与技术地图
- 符号创作（MIDI、ABC、乐谱）、音频生成（codec token、AR/NAR、扩散、DiT、Flow Matching）、混合符号-声学模型是可组合路线；不主张线性代际替代。
- 结构化音乐规划（旋律、和弦、曲式）与声学渲染解耦；多时间尺度（歌曲、段落、乐句、音符、帧）；语义与声学表征；音乐思维链；模型蒸馏、LoRA、MoE；参考音频、局部编辑及音轨级控制。
- 音乐理解、审美与偏好模型、RL/DPO/GRPO、候选筛选、世界模型、迭代反馈是待研究路线。不能把主观偏好或代理指标当作普遍客观真理，不能把论文实验外推为产品成熟度。
- 模型候选：YuE/YuE2、Qwen-Music、StepAudio 3 Music、MiniMax Music 3、ACE-Step、Stable Audio、MusicGen、Suno、Udio、Lyria、Eleven Music、Mureka、AIVA。记录各版本、模态、条件控制、语言、权重/代码许可、数据、指标、硬件、复现实验；未验证的新版本与数字不进入 accepted 图谱。
- 论文候选：YuE2 (2609.33757)、Qwen-Music (2607.11699)、StepAudio 3 Music (2609.16034)、MIDI-REPA (2610.20967)、MuseCritic (2608.11755)、music world model (2608.04378)、MusicFlux (2611.13834)、Structured Captions (2611.00685)、Stable Audio 3 (2605.17991)、music audio generation tutorial (2610.38252)。均为前序讨论线索，题名/ID/结果需独立核验，不将数值、发布日期、开放程度或性能排行作为事实。本次不重复不可靠的 benchmark 数字。

## 2. Agent / Harness / DAW
层次：foundation model → 专项模型 → 专业工具 → MCP/Skill → Agent → domain harness → AI-native DAW。不是严格依赖层级；DAW 是工作环境，Agent 是编排角色，Harness 是知识/工具/状态/流程/约束/验证体系。
- 已发现 Microsoft Muzic/MusicAgent 项目页 https://microsoft.github.io/muzic/ （音乐理解与生成工具调度）；music21-mcp https://github.com/SimonsonM/music21-mcp （乐理与符号操作接口）。这里只确认公开描述，未运行。
- 候选开源项目（待核验存在、版本与实现）：Setloom appautomaton/setloom、OpenStudio vizvasanlya/OpenStudio、ATRI Tz-WIND/ATRI_AGENT、MAGDA Conceptual-Machines/magda-core、AURA knobo/aura-daw、daw-ai hrubiian/daw-ai、K.G.Studio KGAudioLab/K.G.Studio、Producer Pal adamjmurray/producer-pal、Ableton MCP ahujasid/ableton-mcp、Orpheus mal0ware/Orpheus、Droplets simply-audio/droplets、mcp-music-studio linxule/mcp-music-studio。
- 候选研究：CoComposer、Loop Copilot、MixAgent、MuseAgent-1、MIRA、ComposerBench；候选商业工作站：Google Flow Music、Suno Studio、Soundverse Agent One、Logic Pro、BandLab。不能依据 README 宣称完整实现；按知识、工作流、工具、状态、评价、可编辑产物、反馈分别核验。

## 3. 专项能力目录（来源发现而非准入）
- 歌声合成：Synthesizer V、ACE Studio、VOCALOID、OpenUtau、DiffSinger、NNSVS、SoulX-Singer、YingMusic-Singer-Plus。区分 SVS 与 TTS；记录歌词、音符、音素、时值、F0、音色与语言约束。
- 歌声转换：RVC、Applio、so-vits-svc、DDSP-SVC、Kits AI、Audimee；区分转换与重新演唱，记录授权。
- 音轨分离：Demucs、BS-RoFormer、Mel-Band RoFormer、MDX-Net、UVR、python-audio-separator、Moises、LALAL.AI、Inworld Voice Isolator；记录输入混合类型、stem、泄漏、伪影。
- 音乐理解与转录：MOSS-Music、Music Flamingo、MERT、Basic Pitch、MT3、SheetSage、CREPE、RMVPE、Chordino、Whisper；区分音高检测、复音转录、歌词识别、乐理推断及置信度。
- 后期：Melodyne、Auto-Tune、Waves Tune、Nectar、Neutron、Ozone、RX、sonible smart 系列、LANDR、RoEx、Auphonic。AI/DSP/规则不是同义词。
- 声乐教学/评价：Yousician、Sing Sharp、Singing Carrots、Simply Sing、Vocal Image、Moises、SingMOS-Pro、SoulX-Singer-Eval；声学观测不能替代声带或健康诊断。
- 确定性与通用基础工具：music21、librosa、Essentia、pretty_midi、Mido、Tone.js、Strudel、SuperCollider、Csound、FluidSynth、JUCE、DawDreamer、Pedalboard、Rubber Band、Praat/Parselmouth、FFmpeg。

## 4. 现有图谱与语义标准（新检索）
- Music Ontology https://github.com/motools/musicontology 描述作品、录音、演奏等实体，需检查本体边界。
- Music Theory Ontology https://ora.ox.ac.uk/objects/uuid%3A2301db2f-da56-4a25-a715-7771fcdaa607 扩展理论知识与推理。
- Polifonia https://zenodo.org/records/7134763 聚焦音乐对象、标注及理论；Music Meta https://github.com/polifonia-project/music-meta-ontology 面向互操作；Music Representation https://github.com/polifonia-project/music-representation-ontology 支持基于理论的分析表达。
- 这些为本项目可复用或映射的先例，不是已经完成的语义兼容证明。不能把 MusicBrainz/艺人歌曲目录误认为专业操作知识完整图谱。

## 5. 项目机会（判断）
将系统性乐理、声乐科学、创作/制作实践、音频工程、音乐理解与 AI 能力连接起来，覆盖“何时选什么方法、如何验证、失败后怎么办”。未来可支撑音乐工作室、声乐教练、翻唱本地化、混音、模型实验，但本项目不实现这些应用。缅甸语作为有价值的跨文化案例，研究声调/音节/歌词旋律适配及本地风格，不将西方十二平均律或单一审美视为普遍原则。

## 6. 第五波证据校准（2026-11-26）
[模型工具证据专项](model-tool-evidence.md) 记录已读取的原始论文、模型卡/协议、十个历史论文ID逐项复核及UNKNOWN。三条历史线索摘要已确认，七条原始入口cache miss；其他项目线索未逐版本检查。不要将上文发现线索当现行能力目录。
