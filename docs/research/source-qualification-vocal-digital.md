# K05/K06/K08 来源资格增量

DRAFT；2026-11-26；READ_LOCATOR=读到原文 HTML 相关位置，ABSTRACT_READ=摘要已读，SEARCH_ONLY=检索线索。非独立审核/版本或许可冻结。仅原创摘要、链接；原 S023/S024 保持其历史证据范围。

| ID | 来源、定位 | 范围 | 状态与限制 |
|---|---|---|---|
| S045 | Zhang, Mechanics of human voice production and control, 2016, https://pubmed.ncbi.nlm.nih.gov/27794319/ Abstract；全文 https://pmc.ncbi.nlm.nih.gov/articles/PMC5412481/ | K05.01–05/09 | ABSTRACT_READ；PMC reCAPTCHA，具体章节待核 |
| S046 | NIDCD Taking Care of Your Voice https://www.nidcd.nih.gov/health/taking-care-your-voice ，How does our voice work / Healthy habits；March 2021 | K05.01/08 K06.01/02/09 | READ_LOCATOR；一般健康，非个体诊疗或唱法有效性 |
| S047 | ASHA Voice Disorders https://www.asha.org/practice-portal/clinical-topics/voice-disorders/ Assessment / Instrumental Assessment / Acoustic and Aerodynamic Assessment | K05.02/07/08/09 K06.09 | READ_LOCATOR；临床测量与诊断边界，不移植治疗方案 |
| S048 | Roubeau et al., 2009 https://pubmed.ncbi.nlm.nih.gov/18538982/ Abstract；doi:10.1016/j.jvoice.2007.10.014 | K05.05/09 K06.05/07 | ABSTRACT_READ；EGG、机制重叠与术语，不证明通用训练 |
| S049 | International Phonetic Association https://www.internationalphoneticassociation.org/content/chart Quick links / Origin and revisions / Reproduction | K05.06 K06.04 K13 | READ_LOCATOR；IPA Kiel 图 CC BY-SA 4.0；未复制，语种音系另证 |
| S050 | NIDCD Hoarseness https://www.nidcd.nih.gov/health/hoarseness When should I see my doctor | K05.08 K06.02/09 | READ_LOCATOR；风险与转介，不给诊断；严重症状不能等待 |
| S051 | Berglin et al., 2022 https://journals.sagepub.com/doi/10.1177/03057356211026730 Abstract / Participants / Materials and procedure | K06.01/03/08 | READ_LOCATOR；75名纳入分析、三条件、短期前后测；不外推长期效果或普遍剂量 |
| S052 | Effect of Training and Level of External Auditory Feedback on the Singing Voice https://pubmed.ncbi.nlm.nih.gov/26948385/；https://pmc.ncbi.nlm.nih.gov/articles/PMC5010534/ | K06.03/08 | SEARCH_ONLY；reCAPTCHA，结果数字不采纳 |
| S053 | Vibrato rate and extent in soprano voice https://pubmed.ncbi.nlm.nih.gov/21895105/ | K06.06 | SEARCH_ONLY；reCAPTCHA，不定通用颤音阈值 |
| S054 | Application of nonlinear dynamics theory to understanding normal and pathologic voices https://pmc.ncbi.nlm.nih.gov/articles/PMC11966169/；lyric/sertanejo vibrato https://pubmed.ncbi.nlm.nih.gov/19022619/ | K06.06/07 | SEARCH_ONLY；唱法差异线索 |
| S055 | Smith DSP Guide ch3 https://www.dspguide.com/ch3/2.htm Sampling Theorem / aliasing | K08.01 | READ_LOCATOR；带限采样模型，术语约定 |
| S056 | 同书 Quantization https://wap.dspguide.com/ch3/1.htm sampling vs quantization | K08.01 | READ_LOCATOR；ADC理论模型 |
| S057 | Audacity Sample Rates https://manual.audacityteam.org/man/sample_rates.html Bandwidth / 48,000 Hz | K08.01/02 | READ_LOCATOR；工具教学说明，不普遍化采样率建议 |
| S058 | FFmpeg Resampler https://www.ffmpeg.org/ffmpeg-resampler.html Description | K08.02/03 | READ_LOCATOR；重采样、声道及格式转换；版本/运行待验证 |
| S059 | librosa.stft https://librosa.org/doc/main/api/generated/librosa.stft.html STFT description / signature | K08.03 | READ_LOCATOR；页面显示1.0.0rc0，版本未固定 |
| S060 | Audacity Playing and Recording https://manual.audacityteam.org/man/playing_and_recording.html overdubbing / latency correction | K08.04/06 | READ_LOCATOR；具体软件流程，实际硬件待测 |
| S061 | Audacity FAQ Recording https://manual.audacityteam.org/man/faq_recording_troubleshooting.html synchronization / sample rates / resources | K08.04/06/09 | READ_LOCATOR；故障候选非唯一原因 |
| S062 | Shure Microphone Techniques for Recording https://www.shure.com/en-US/docs/education/microphone-techniques-for-recording | K08.05 | SEARCH_ONLY；cache miss，其他大小写页面只有外壳 |
| S063 | Audacity Noise Reduction https://manual.audacityteam.org/man/noise_reduction.html Get Noise Profile / Reduce / Residue | K08.07 | READ_LOCATOR；特定持续噪声方法、目标损伤与伪影，非所有降噪 |
| S064 | SigSep MUSDB18 https://sigsep.github.io/datasets/musdb.html MUSDB18-HQ / SiSEC 2018 | K08.08 K11/K10 | READ_LOCATOR；数据集版本与可比性，未下载，许可和评分协议待核 |
| S065 | PortAudio Writing a Callback https://portaudio.com/docs/v19-doxydocs/writing_a_callback.html callback restrictions | K08.09 | READ_LOCATOR；实时约束，不保证平台延迟 |
| S066 | PortAudio API https://portaudio.com/docs/v19-doxydocs/portaudio_8h.html PaStreamCallback / frameCount / statusFlags | K08.09 | READ_LOCATOR；API 语义和时间预算，未运行 |

缺口：S045/S048 全文、专业声源滤波/语音学/歌唱生理；K06 专项呼吸、声区衔接、技法、教学实践及长期迁移；K08 ADC时钟、编码容器规范、DSP/变速变调、完整话筒指南、去混响及分离评价协议。所有分支的来源入口并非各原子需求的证据。临床指南只用于测量区别及安全界限，教学不能自动推导临床治疗。无个人录音或第三方音乐素材获取，真实案例待授权核验。
