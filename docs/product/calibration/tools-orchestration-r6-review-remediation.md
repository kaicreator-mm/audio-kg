# K12 R6 RV01–RV04 有限修订
DRAFT #56/PR57；审查FAIL 210070897f736b4479311edfaef907903d91a90e，#56 7197902796 / PR57 7197907532。以下是已有54原子补强，不增加主D4或改原库存。来源见[补证](../../research/source-qualification-tools-orchestration-r6.md)；模型机制K11、质量K10、实际许可K15、语言K13。所有实际运行及权利均未验证。

## RV01 — 具名真实候选能力卡
| 字段 | MC-MG：facebook/musicgen-melody | MC-DS：DiffSinger MIDI SVS B版 |
|---|---|---|
| 来源身份 | S550 固定卡revision4326add9aea0fdd07d62c7bbf789493fc99547f6；作者v1/1.5B；不等运行时权重哈希 | S551 固定代码commit4662c53a27a5ac662821eae23a7d71cfcff7356d；作者发布名0228_opencpop_ds100_rel.zip；包内容/哈希UNKNOWN |
| 接口及条件 | 本地AudioCraft MusicGen melody入口；文本描述，旋律音频及采样率传给chroma条件生成；可无条件/文本生成；不是MIDI音符时值硬约束 | 本地inference/svs/ds_e2e.py；usr/configs/midi/e2e/opencpop/ds100_adj_rel.yaml；experiment名0228_opencpop_ds100_rel；word模式text/notes/notes_duration，phoneme模式ph_seq/note_seq/note_dur_seq/is_slur_seq，输入字段对齐按作者文档；不是任意参考音色转换 |
| 输出及长度 | waveform并示例写WAV；duration=8秒为作者示例参数，实际长度/最大长度/精确音符保持UNKNOWN | 作者文档默认infer_out，源码调用vocoder产生波形；歌声时值由词谱条件控制，实际输出时长/上限/对齐精度UNKNOWN；不能对重复逐音素的note_dur_seq直接求和作全曲时长 |
| 环境和资源 | audiocraft、torchaudio、ffmpeg；依赖revision/设备/峰值/配额及远程服务可用性UNKNOWN | 作者历史Python3.8/Torch1.9.0、2080Ti CUDA10.2及3090 CUDA11.4环境说明；关联0109_hifigan_bigpopcs_hop128及配置pe_ckpt 0102_xiaoma_pe；实际组合、显存/速度/平台/配额UNKNOWN |
| 语言和目标限制 | 卡明确真实歌声限制，英文描述训练、风格文化表现非均一；不具有已证歌词控制 | 中文词/音素、音符和时值的文档路径；作者提醒Opencpop相对vocoder训练域差异可影响质量；缅甸语、任意目标音色/声库选择、实际自然度、精确F0保护UNKNOWN |
| 权利及服务 | S550报告代码MIT、权重CC-BY-NC4.0；权重使用条款适用性/训练数据权利、参考音频、服务及输出用途分别核验 | S551仓库LICENSE MIT仅代码；README明确Opencpop访问不能由作者授予；权重/vocoder/数据/参考/服务及输出权利UNKNOWN，不能将代码MIT继承给发布包 |
| 实际资格 | DOCUMENTED_CANDIDATE或DOCUMENTED_REJECT，不是运行PASS | DOCUMENTED_CANDIDATE或DOCUMENTED_PENDING，不是运行PASS |

选择题（仅文档阶段）：Q1 研究性英文描述+已获准的旋律音频条件、无需真实歌唱，MC-MG文档候选；Q2 明确歌词和真实歌唱为硬项，MC-MG拒绝，不能通过调整prompt推导能力；Q3 中文词谱/音符/时值输入齐全，MC-DS文档候选，仍需权重/vocoder/版本/资源/许可及真实产物评价；Q4 无notes/duration或音素对齐缺失，MC-DS待补前置，不凭文本冒充词谱；Q5 缅甸语歌词或授权参考声线的目标匹配未证，MC-DS待证而不是否定或肯定；Q6 8s示例不等最大值，45s请求不能从卡判定直接/分段等价；远程接口、作业、配额未知，不能认为本地示例证明服务成功。Q7 商业使用/参考上传需K15依据当前用途分别核验；即使两卡的技术候选命中，未证实际许可和运行资格均STOP/PENDING；不因MIT而自动批准。所需原子：TO13/40能力条件，TO14/41接口资源，TO15/42权利；CQ09/14/20/23/26与A01–07按职责引用。

## RV02 — 多轨delta及特殊时钟
S548原资格保持，S552补第三方HTML/Microsoft。format0单track；format1共同时间轴，设tempo map初始500000us/qn、PPQ480，T1 delta480、T2 delta480各自从0累积，所以两个事件同在.5s，不是.5s与1s；format2各独立pattern，保留patternID与各自时间解释，不默认并入同一歌曲；无拼接合同即待证。SMPTE division高字节有符号-29代表30 drop-frame而非29fps；按通常NTSC 30000/1001实际帧率且每帧40ticks的明确题设，1200ticks为1.001s，绝对值29会得到约1.03448s；不是把时间码跳号当丢音频帧。实际实现未支持该模式或不明时钟则UNKNOWN/拒绝转换，不回退PPQ或29fps。原TO37/49算式保持。

## RV03 — 失败经验的证据资格与复用
虚构经验L1：任务editable_exchange、源H1/目标H2、格式F1、插件P1、必需state字段、保护scope preserve_state、授权epoch E1；候选X1实际题设回读state缺失，证据EV1（源/目标身份、版本、字段对照及失败报告），在该条件下结论“不得以打开文件证明该字段保真”。记录状态REVIEW_PENDING，属于限定研究候选经验，非accepted claim。后续同条件检索到L1仅作为风险线索/候选约束，仍核当前权限、对象与执行证据；H2升级、P1变化、格式、保护要求、证据撤回、授权epoch变化任一触发REQUALIFY，不把历史失败推断为其他版本不支持，也不把历史批准当授权。保留原失败记录及经验与证据关联，不删除历史；经过独立证据审核才考虑正式知识准入。绑定TO48、旧K12.07.03.02、A07/CQ24，不设计运行平台。

## RV04 — mask与回执严格绑定
追加独立有限例：源S0@rev7，时钟clk0，voice长度4、稳定ID[u0,u1,u2,u3]；mask以源索引为坐标，半开[1,3)，整数边界且0≤start<end≤4，绑定源版本、时钟；候选声部长度、ID及顺序与源一致，并核区外值。正例[10,71,72,40]；插入尾部999、删除末项、交换u1/u2身份（即使数值不变）、负界/越界/空区间/非整数/输出坐标/过期源版本或时钟均拒绝。保持R4原11变异、其他字段、授权和安全门禁不变；形状/坐标负例仅证明有限规则。真实音频插入/重采样需另定义映射，不直接沿用索引。
回执扩展原12字段，新增明确配置对象（seed=11,gain=.8,schema=sch1）、outputDigest=digestA、outputRev=1；相同model/tool名称但seed、gain或schema变化均拒绝复用；同一output ID内容摘要或版本变化也拒绝。实际digest应按不可变工件内容计算，本题digestA/B为合成标记，不声称已哈希音频。实际配置须完整规范化绑定（此有限例以固定字段对象相等比较，不声称通用canonical hash）。权限/保护/安全仍独立门禁。

## 实际有限JS检查
1. MG melody documented candidate: true
2. MG lyric or realistic vocal reject: true
3. DS Chinese score/lyrics candidate: true
4. DS arbitrary voice reference unknown: true
5. DS missing score condition pending: true
6. DS Myanmar language unknown: true
7. no real execution admission: true
8. per track simultaneous: true
9. format2 independent: true
10. drop frame not abs code: true
11. lesson matching conditional: true
12. lesson version/permission/protection/evidence change: true
13. candidate positive: true
14. insertion deletion: true
15. reindex rejected: true
16. invalid mask: true
17. outside edit rejected: true
18. receipt config only change: true
19. same output ID changed content/version: true
20. receipt positive: true
20/20本轮检查实际执行，仅上述有限对象和算术；历史65项保留，非重跑。全部RV01–04仍待独立复审，不声称修复已接受或K13已解锁。