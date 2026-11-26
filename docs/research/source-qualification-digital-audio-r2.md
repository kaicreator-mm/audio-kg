# K08 R2 专项来源资格
2026-11-26；原来源资格不升级；所有案例原创数学/假设，无实际音频/工具或授权验证。
| ID | 来源与定位 | 资格与限制 |
|---|---|---|
| S479 | [Microsoft RIFF](https://learn.microsoft.com/en-us/windows/win32/xaudio2/resource-interchange-file-format--riff-) Chunks | READ_LOCATOR；RIFF/WAVE、fmt/data、chunkSize排除填充和8字节头，WORD对齐；公开说明非全规范，McGill WAVE页超时；本轮仅有限结构验证，非通用解析器。 |
| S480 | [Lipshitz等1992 Quantization and Dither](https://aes.org/publications/elibrary/elibrary-page/?id=7047) Abstract | ABSTRACT_READ；区分无抖动、减法、非减法抖动及误差统计；1991非减法PDF截图超时，不采正文定理或通用SNR；自建有限随机量化见证，不声称标准TPDF实现。 |
| S481 | [SciPy 1.15.1 resample_poly](https://docs.scipy.org/doc/scipy-1.15.1/reference/generated/scipy.signal.resample_poly.html) Description/Notes/padtype | READ_LOCATOR；升采样/低通/降采样、边界及滤波条件；非执行SciPy。 |
| S482 | [SciPy 1.15.1 istft](https://docs.scipy.org/doc/scipy-1.15.1/reference/generated/scipy.signal.istft.html) Notes | READ_LOCATOR；NOLA、窗口平方和归一化、修改谱不保证可实现，最小二乘重建；旧API，非运行。 |
| S483 | [ITU-R BS.1770-5 (2023)](https://www.itu.int/dms_pubrec/itu-r/rec/bs/R-REC-BS.1770-5-202311-I%21%21PDF-E.pdf) Annex2 §1–3，实际截图零基19印刷18 | READ_LOCATOR；连续波形真峰可能超过样本峰，过采样滤波估计；不复制系数或声明合规/实测。 |
| S484 | [Le Roux等 ICASSP2019 SDR—Half-Baked or Well Done?](https://www.jonathanleroux.org/pdf/LeRoux2019ICASSP05sdr.pdf) §2.1–2.3 Eq1–5，实际截图零基1 | READ_LOCATOR；参考投影SI-SDR及不惩罚尺度的限制，BSS_eval不同版本含不同容许变换；本文语音任务，不推广具体排名、评价协议K10。 |
| S485 | [Kinoshita/Nakatani NTT Technical Review 2011](https://ntt-review.jp/archive/ntttechnical.php?contents=ntr201107ra3.html) §2–3 | READ_LOCATOR；多步线性预测以语音短时相关和延迟条件估计晚期混响，目标可保留早反射；不采用论文具体时间阈值或泛化音乐。 |
| S486 | [Audacity Click Removal](https://manual.audacityteam.org/man/click_removal.html) threshold/max spike width与失败说明 | READ_LOCATOR；点击处理特定条件，阈值/宽度可能影响有效瞬态，未验证实际版本和运行。 |
S055/056/058/063/064/065/066原已重读，S472/474/475/476/478继承R1资格。S467/468统计模型及S470校准/频权分层继承K07。未获取完整原始RIFF规范、AES全文、实际工具输出及素材许可。