# K08 R4 综合处理知识与有限见证
Task #44。三个补充组合不是新主D4。原创数学/结构见证；没有实际录音、播放、真实文件、设备、第三方库、模型或授权验证。K07物理/安全、K09制作、K10评价、K11模型、K12实际工具、K15权利各保留。
| ID | 关联 | F+ | F- | R+ | R- |
|---|---|---|---|---|---|
| DX01 数字表示与转换 | DA01–09/28–36；S055/056/471–475/479–482 | 采样、位深、容器、转换、窗及复谱分别验证，保留帧/时轴/布局。 | 改后缀等于转码、插值恢复原损失、NFFT等于窗。 | 核实际头/流、输入输出、边界、抗混叠、重建和目标。 | 未知格式/原信号/实际工具能力不得补造。 |
| DX02 采集与实时路径 | DA10–18/25–27/37–45/52–54；S060/061/065/066/476/483 | 逐节点、独立事件时钟、帧、故障方向和回调期限；名义块时间非端到端。 | 平均CPU低就保证实时、录音启动即有效、数字值等于SPL。 | 核设备/时钟/配置/日志/量程、权限和独立观测，限定复测。 | 未实际接设备、录音、部署或试听，不作安全放行。 |
| KC-D08 保护原件的离线修复 | DA04–08/16–24/31–35/43–51；S479/482/484–486 | 核容器身份、目标/参考/干扰及局部mask，原件和副本分离，比较目标损失/泄漏并核权限。 | 同混合即源真值、静音无泄漏即优、修复即原表演、旧评价自动继承。 | 核独立参考、版本、格式/时轴/保护范围、指标适用和回滚。 | 未知参考/权限/风险拒绝越界，不生成真实音频或成绩。 |

## KC-D08：三组独立合成证据
A. 有限字节结构：构造60字节内存RIFF样例，RIFF size52，WAVE；fmt 16字节PCM单声道48kHz、16位、blockAlign2、byteRate96000；JUNK大小3加1字节填充；data大小4在56处开始，两个小端有符号样本1000/−1000。实际JS只接受此约定的有限格式，遍历长度和填充，拒绝截断、JUNK越界、data不整帧和非支持子格式。此处不写文件、不宣称完整RIFF/RF64或解码库。
B. 独立合成序列（任意单位，非PCM样本记录A）：目标t=[1,0,0]、持续干扰此窗n=[0,.2,0]（仅代表已知短窗干扰分量，不由三点推持续统计）、点击c=[0,0,2]，mixture=[1,.2,2]。设授权仅离线合成分析，原take1只读，clkA、48k、mono、mask={2}；候选take2仅减已知c得[1,.2,0]，其它位置保持；并非实际盲修复算法。另两个独立候选去除两已知干扰[1,0,0]、静音[0,0,0]、目标损伤[.5,0,0]，相对参考平方误差0/1/.25；前者不在当前局部mask内，不能以分数较高擅自应用。另用s=[1,0]、y=[.8,.2]及2y对照，未中心化投影定义SI-SDR相同12.0412dB，但平方误差不同；零参考或零估计在本题政策下UNKNOWN，不给伪优分。实际评价协议K10；无参考则不报该指标。不存在真实人声、音乐或训练素材。
C. 独立实时算例：256/48000=5.333ms名义回调块，四次耗时1/1/1/8ms平均2.75ms，第四次超过名义预算；实际调度和时钟路径另测。输入丢失与输出缺供标志分开，不能由平均值/单个xrun唯一定位原因。
A01模型/条件/损失；A02授权/目标→原始头和状态核验→限定离线候选→参考/保护验证→保留或拒绝；A03专业工具前置与输出限制，实际工具K12；A04 take1及其时钟、布局、采样率、授权版本、mask保护，take2派生及引用；A05目标误差、泄漏、时轴、范围和退化指标政策；A06可编辑mask/参数/派生记录，原件不覆盖；A07只修当前mask，若变时钟/布局或越界必须另起任务和条件证据；旧报告随输入/参数变化失效且保留历史。无授权拒绝受影响操作；离线不授权实际录音、播放或上传。风险未知拒绝试听，急性听觉风险按K07立即停止/寻求专业医疗评估，不通过模型分数放行。
## 实际有限检查
1. finite RIFF byte fixture valid offset and samples — true
2. reject truncation/oversized chunk — true
3. reject nonintegral frame and unsupported fixture subtype — true
4. independent reference prevents silence false win — true
5. local click repair protects non-target region — true
6. SI-SDR scale invariance not amplitude preservation — true
7. degenerate zero not scored — true
8. immutable source and localized edit — true
9. reject nonlocal edit or changed clock — true
10. offline scope not playback or collection authorization — true
11. deadline miss despite mean below budget — true
以上仅有限JS字节/数学/对象见证，不是实际软件/设备、实时、临床、音频、图谱或LLM验证。