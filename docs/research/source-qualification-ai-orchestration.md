# K11/K12 第五波来源资格

DRAFT；2026-11-26。本轮使用原始论文摘要、HTML原文、官方模型卡、接口规范。ABSTRACT_READ=只核验标题/摘要，不声称全文审阅；READ_LOCATOR=已读取具体原文位置；SEARCH_ONLY=入口或访问失败。未独立审核、未验证代码/权重许可或运行；模型报告指标仅限作者实验。保留链接和原创分析，不导入模型或数据。

| ID | 来源及定位 | 主题 | 状态与限制 |
|---|---|---|---|
| S108 | MusicGen [arXiv:2306.05284v3](https://arxiv.org/abs/2306.05284v3) Abstract | K11.02/03/05/10 | ABSTRACT_READ；离散多流token、单阶段Transformer及文本/旋律条件；非所有checkpoint能力 |
| S109 | EnCodec [arXiv:2210.13438v1](https://arxiv.org/abs/2210.13438v1) Abstract | K11.02 | ABSTRACT_READ；量化latent编码解码，重建质量须具体评价 |
| S110 | Flow Matching [arXiv:2210.02747v2](https://arxiv.org/abs/2210.02747v2) Abstract | K11.03 | ABSTRACT_READ；通用生成建模方法，非音乐质量或速度证明 |
| S111 | DiffSinger [arXiv:2105.02446v6](https://arxiv.org/abs/2105.02446v6) Abstract | K11.03/06 | ABSTRACT_READ；乐谱条件扩散声学模型生成mel特征；具体声库/语言/推理接口另验 |
| S112 | MuseCoco [arXiv:2306.00110](https://arxiv.org/abs/2306.00110) Abstract | K11.04 | ABSTRACT_READ；文本→音乐属性→符号序列；具体控制精度为作者实验 |
| S113 | YuE [arXiv:2503.08638](https://arxiv.org/abs/2503.08638) §3.2/3.2.1及§3.4引用 | K11.01–03/05 | READ_LOCATOR；人声与伴奏分别建模、分阶段token预测；不证明完整DAW轨道或保持所有控制项 |
| S114 | ACE-Step 1.5 [arXiv:2602.00744](https://arxiv.org/abs/2602.00744) Abstract、§3.3 | K11.03/05/08/09/10 K12.05/07 | READ_LOCATOR；LM规划与DiT、mask及source latent多任务；LoRA、速度、资源和语言为作者报告，未验证 |
| S115 | Qwen-Music Technical Report [arXiv:2607.11699v2](https://arxiv.org/abs/2607.11699v2) Abstract | K11.02/03/05 K12.05 | ABSTRACT_READ；文本生成歌曲/cover及tokenizer/LLM/render三组件，接口/权重/支持语种未知 |
| S116 | Stable Audio 3 [arXiv:2605.17991v1](https://arxiv.org/abs/2605.17991v1) Abstract | K11.01–03/05/09 | ABSTRACT_READ；可变长音频latent diffusion、inpainting与语义声学autoencoder；发布范围、资源、许可另核 |
| S117 | SaMoye [arXiv:2407.07728](https://arxiv.org/abs/2407.07728) 历史摘要；2026-11-26重读最新v5撤回状态，见S534 | K11.01/06/07 | WITHDRAWN_STATUS；2024-11-15作者撤回，历史摘要仅用于追踪，不得支持有效技术、性能或能力；S529另有SVC任务机制证据，具体权重/语言/授权待验。 |
| S118 | HT Demucs [arXiv:2211.08553v1](https://arxiv.org/abs/2211.08553v1) Abstract | K11.07/10 | ABSTRACT_READ；时间/频谱混合网络，作者报告额外训练数据改变结果；不混比训练条件 |
| S119 | Music Transformer [Google Research publication](https://research.google/pubs/music-transformer-generating-music-with-long-term-structure/) title / abstract search | K11.04 | SEARCH_ONLY；本次返回页面导航，摘要检索可见；具体架构/长结构实验待核 |
| S120 | LoRA [arXiv:2106.09685v2](https://arxiv.org/abs/2106.09685v2) Abstract | K11.08 | ABSTRACT_READ；冻结基座并注入低秩更新的研究，原论文非音乐模型适配性能证据 |
| S121 | Music Flamingo [arXiv:2511.10289](https://arxiv.org/abs/2511.10289) Abstract | K11.08/10、K10引用 | ABSTRACT_READ；音乐理解与数据、后训练和奖励研究；不视为全文化审美真值或音乐生成能力 |
| S122 | 音乐世界模型 [arXiv:2608.04378v1](https://arxiv.org/abs/2608.04378v1) Abstract | K11.02/04 K12.07 | ABSTRACT_READ；MIDI piano-roll层次自监督、JEPA式目标和条件flow matching，符号实验非波形/完整歌曲或通用Agent验证 |
| S123 | PyTorch 2.13 [Reproducibility](https://docs.pytorch.org/docs/2.13/notes/randomness.html) intro / warning | K11.09 K12.09 | READ_LOCATOR；不同版本、平台和设备不保证完全复现；无具体音乐模型硬件测试 |
| S124 | [facebook/musicgen-melody](https://huggingface.co/facebook/musicgen-melody) Model card / Intended use / Limitations and biases / License metadata | K11.01/05/10 K12.05/09 | READ_LOCATOR；模型卡标记CC-BY-NC-4.0、旋律条件、非真实歌声、英文描述和文化限制；卡片未固定revision，许可正文及权重身份待验 |
| S125 | Stable Audio Open [arXiv:2407.14358](https://arxiv.org/abs/2407.14358) Abstract/§1 | K11.01/02；音频表征参考 | READ_LOCATOR；开权重音频生成和训练数据许可披露；权重许可仍须核验；不证明符号乐谱生成 |
| S126 | Ardour [Lua Scripting](https://manual.ardour.org/lua-scripting/) introduction / Preface | K12.01/02/08/09 | READ_LOCATOR；脚本自动化、API文档明确未完成且可能变化；实际版本与运行未验证 |
| S127 | MIDI Association [Standard MIDI Files](https://midi.org/standard-midi-files) overview / specification index | K12.04 | READ_LOCATOR；带时间戳MIDI事件及轨道、tempo信息；未读PDF正文 |
| S128 | MusicXML 4.0 [Final Community Group Report](https://www.w3.org/2021/06/musicxml40/) intro/index | K12.04/08 | READ_LOCATOR；2021-06-01 版本及schema入口；具体交换语义引用S075/S076/S078，不宣称所有宿主支持 |
| S129 | MEI Guidelines [5.1 index](https://music-encoding.org/guidelines/v5/content/index.html) contents | K12.04 | READ_LOCATOR；不同历史记谱、歌词、分析和学术编辑等章节入口；具体语义尚待逐章节核验 |
| S130 | Bitwig [DAWproject File Format FAQs](https://www.bitwig.com/support/technical_support/dawproject-file-format-faqs-62/) Specifics to Bitwig Studio 5.0.9 and Studio One 6.5 / format | K12.04/08/09 | READ_LOCATOR；2024-11-06页面支持版本说明；特定宿主不互读部分插件/clip launcher数据，不外推当前版本；未执行转换 |
| S131 | MCP [2025-06-18 Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) Listing/Calling / Error Handling / Security Considerations | K12.06/08/09 | READ_LOCATOR；工具schema、协议错误与执行错误、isError及安全边界；不是最新版本声明，不等于领域工作流或权限批准 |
| S132 | MusicAgent [arXiv:2310.11954v2](https://arxiv.org/abs/2310.11954v2) Abstract | K12.06/07 | ABSTRACT_READ；音乐工具集与LLM任务分解、工作流；不证明完整七能力、生产可用、实际运行 |

## 来源缺口
各论文摘要的机制描述不足以冻结原子主张。待核全文、训练/数据许可与权重版本、推理配置、具体模型支持语种、MIR与生成/编辑独立评价、量化/设备兼容性（包括V100）、SVS音素/时值、MoE、蒸馏、偏好/奖励、VST/AU/CLAP、MEI详细语义、SMF正文、跨宿主实测。PEFT adapter文档429、FFmpeg CLI正文timeout、VST3入口不可访问、dawproject.org不可访问；不能据此判定功能不存在。原 S058/S065/S066/S075/S078等仅在已记录范围复用。S117在K11.06仅用于SVS/SVC任务对照，不能作为SVS专属证据；S125仅用于音频表征/数据来源。
