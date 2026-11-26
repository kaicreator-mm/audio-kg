# K11 R1 AI音乐与歌声生成来源资格
2026-11-26。原S108–125保留历史编号；本轮对下列特定版本补证。S117 SaMoye最新v5在2024-11-15撤回，禁止用其支持有效能力或性能，历史摘要仅追踪；本轮纠正原来源行，不从撤回推断其它SVC研究失效。原S119搜索线索保留，S531补摘要。S124模型卡旧记录非当前固定revision；S123/S125/S115/S116/S121/S122原资格继承，后续专项核实，不推已部署能力。
| ID | 来源及定位 | 资格和限制 |
|---|---|---|
| S523 | [MusicGen 2306.05284v3](https://arxiv.org/pdf/2306.05284v3) 实际截图零基2/3/4（印刷3/4/5）§2.1–2.4/3.1–3.2 | READ_LOCATOR；RVQ、码本间依赖/交错、文本及chroma条件、特定32kHz mono stride640/50Hz/4×2048码本；作者训练/测试条件非所有版本或实际速度。HTML访问失败，PDF补证。 |
| S524 | [EnCodec 2210.13438](https://arxiv.org/abs/2210.13438) 网页实际呈现正文引言/摘要 | READ_LOCATOR；量化latent编解码、感知损失及24k mono/48k stereo作者实验；PDF/HTML路径访问失败，不冒充读过全正文，不证明无损。 |
| S525 | [Flow Matching 2210.02747v2](https://arxiv.org/html/2210.02747) §3/3.2 Eq5/9 | READ_LOCATOR；给定概率路径向量场回归、条件目标及ODE推理，扩散路径可包含于其框架；原实验图像非音乐效果保证。 |
| S526 | [YuE 2503.08638v1](https://arxiv.org/html/2503.08638v1) §3.2.2/3.2.3及结构图目录 | READ_LOCATOR；分轨条件与分段歌词、参考音频上下文；特定报告机制不保证对齐/真正独立原始分轨或任意语言。非固定部署。 |
| S527 | [ACE-Step 1.5 2602.00744v3](https://arxiv.org/html/2602.00744) §2/2.1/3.3、摘要 | READ_LOCATOR；模型标注管线/过滤、LM规划与DiT、局部任务与作者蒸馏报告；速度/语言/资源/质量仅作者声称，实际权重/许可/掩码保护未知。 |
| S528 | [DiffSinger AAAI 2022](https://cdn.aaai.org/ojs/21350/21350-13-25363-1-2-20220628.pdf) 实际截图零基0/1印刷11020/11021，引言/§2 | READ_LOCATOR；乐谱歌词/音高/时值→mel声学模型→vocoder，浅层扩散从预测mel加噪起点；中文作者实验和DiffSpeech独立扩展，非声库/语种兼容。原arXiv路径失败。 |
| S529 | [SVCC2023 T02 2310.05118](https://arxiv.org/abs/2310.05118) 页面实际正文摘要/§1 | READ_LOCATOR；SVC内容/F0/音色条件与解耦误差、VITS和后处理、目标适配；作者比赛结果不支持无训练任意目标音色、权利或泛化。替代S117有效任务语义。 |
| S530 | [LoRA 2106.09685v2](https://arxiv.org/html/2106.09685) §4/4.1及摘要 | READ_LOCATOR；冻结基座与低秩更新、可合并线性权重的条件；原LLM实验非音乐适配质量或通用加载。 |
| S531 | [Music Transformer 1809.04281v3](https://arxiv.org/abs/1809.04281v3)（实际打开无版本URL显示v3）摘要 | ABSTRACT_READ；相对时序、多尺度重复及符号序列研究；相对位置中间表示内存降低不等全部注意力线性，不证明任意长全曲结构。 |
| S532 | [Sparsely-Gated MoE 1701.06538](https://arxiv.org/abs/1701.06538) 摘要 | ABSTRACT_READ；门控稀疏专家模型，非外部多模型流水线、实际专家路由/显存另核。 |
| S533 | [Distilling the Knowledge in a Neural Network 1503.02531](https://arxiv.org/abs/1503.02531) 摘要 | ABSTRACT_READ；教师学生知识迁移，原分类研究非音乐生成/扩散步数无损证明。 |
| S534 | [SaMoye 2407.07728 最新v5](https://arxiv.org/abs/2407.07728) withdrawal与submission history | WITHDRAWN_STATUS；作者2024-11-15撤回，说明需大改重投；不得作为有效技术/性能/能力证据。原S117历史引用纠正，后续逐槽检查。 |
S112 MuseCoco摘要、S118 HT Demucs v1摘要实际重读；S118额外训练歌曲条件不得省略。无训练/下载权重/推理/实际音频/人体/许可/硬件测试。