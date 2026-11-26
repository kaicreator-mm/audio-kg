# K08 R1 数字音频专业来源资格
2026-11-26。S055/056采样量化、S058重采样、S063降噪、S064数据集、S065/066 PortAudio本轮实际重新打开并读取相关段；S057/059/060/061原资格保留；S062旧访问失败不升级。K07已审物理/频谱/校准/安全、S467/468随机过程继承。新增来源：
| ID | 来源及实际定位 | 资格与限制 |
|---|---|---|
| S471 | [RFC9639 FLAC](https://datatracker.ietf.org/doc/html/rfc9639) §1 | READ_LOCATOR；2024-12 RFC，指定整数PCM无损编码范围、格式及streamable subset；不保证每个编码器全部范围、容器元数据或恢复既往有损信息。未执行编解码。 |
| S472 | [Microsoft WAVEFORMATEXTENSIBLE](https://learn.microsoft.com/en-us/windows/win32/api/mmreg/ns-mmreg-waveformatextensible) Members/Remarks | READ_LOCATOR；有效位深与字节容器宽度不同，SubFormat和声道mask及交错顺序；是Windows格式描述结构，不是完整RIFF/WAVE文件规范，不证明任意解码器兼容。 |
| S473 | [Smith DSP Guide ch6 Convolution](https://www.dspguide.com/ch6/2.htm) 卷积正文 | READ_LOCATOR；线性卷积及输入/冲激响应、长度/索引条件，有限算例自建；不当实际库运行。 |
| S474 | [librosa 0.11.0 STFT](https://librosa.org/doc/0.11.0/generated/librosa.stft.html) 参数和输出说明 | READ_LOCATOR；复谱、n_fft、win_length、hop、center/pad条件；固定文档版本，未安装运行，不采用默认值作通用最佳。 |
| S475 | [librosa 0.11.0 phase_vocoder](https://librosa.org/doc/0.11.0/generated/librosa.phase_vocoder.html) 简化实现及rate | READ_LOCATOR；速度参数、STFT输入，明确未处理瞬态及可能伪影；不承诺商用质量或工具可用。 |
| S476 | [Shure Microphone Directionality and Polar Pattern Basics](https://www.shure.com/en-US/insights/microphone-directionality-polar-pattern-basics) 2026-06-25，directionality/unidirectional/proximity/off-axis/consistency | READ_LOCATOR；角度及频率相关、近讲效应、指向型不同；厂商教学资料不当型号实测或普遍保证。S062旧失败保留。 |
| S477 | [Audacity Change Speed and Pitch](https://manual.audacityteam.org/man/change_speed.html) speed multiplier/selection length | READ_LOCATOR；变速同时变调和时长，保调/变调为不同任务，开发版页面未固定实际安装。 |
| S478 | [Audacity Clip Fix](https://manual.audacityteam.org/man/clip_fix.html) 开头方法限制 | READ_LOCATOR；轻度削波插值估计，非恢复原始真值或全部削波适用。 |
S064实际MUSDB18网页：150曲100训练/50测试，44.1kHz立体声，AAC五流含独立编码mixture，和各stem相加有差；HQ WAV版本及errata、访问/权利限制，未下载、未核每首授权、未跑评分。S065/066实际callback限制和input overflow文档，线程与API约束随平台，非实测性能。S058可做重采样/声道矩阵/格式转换的文档描述，具体版本未验。后续专项补RIFF规范、量化/dither、滤波与重采样算法、同步时钟、分离评价、去混响方法。未获取真实音频或运行第三方音频工具。