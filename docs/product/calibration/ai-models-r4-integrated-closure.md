# K11 R4 综合保护任务及闭环

DRAFT / #53 / PR54；复用原AI-A01，不新增主D4。所有数据、候选、授权标志均为虚构有限对象，非模型执行、真实权限或音频。真实授权UNKNOWN禁止执行；实际能力、语言、质量、设备另证。

## EX01 模型路径选择
已有合格授权源演唱且只需改变音色目标，比较SVC任务；有词谱无合格演唱，比较SVS任务；需要新词曲伴奏时才比较全曲生成及分阶段方案。TTS朗读不是SVS，文本/chroma条件非歌词硬保证，分离结果非原始独立录音。歌词、旋律、分轨、局部编辑若为硬项，逐项确认实际版本、输入输出及保护条件；任一必需项UNKNOWN拒绝准入。无合格路径则停止/转人工，不擅自改变需求。[AM13/K11.05.01.03](ai-models-r1-knowledge-cases.md#L17)；[AM16/K11.06.01.03](ai-models-r1-knowledge-cases.md#L20)；[AM19/K11.07.01.03](ai-models-r1-knowledge-cases.md#L23)；[AM20/K11.07.02.03](ai-models-r1-knowledge-cases.md#L24)；[AM21/K11.07.03.03](ai-models-r1-knowledge-cases.md#L25)；[AM43/K11.05.01.04](ai-models-r2-knowledge-cases.md#L31)；[AM46/K11.06.01.04](ai-models-r2-knowledge-cases.md#L34)；[AM49/K11.07.01.04](ai-models-r2-knowledge-cases.md#L37)；[AM50/K11.07.02.04](ai-models-r2-knowledge-cases.md#L38)；[AM51/K11.07.03.04](ai-models-r2-knowledge-cases.md#L39)。K12实际版本及接口，K15权利，K13语言，K09制作，K10评价分别提供证据。

## EX02 训练与推理实验
W0/W1×C0/C1四格控制权重适配与参考条件，给定3/5/4/8时参考效应2/4、交互2；只比较两端不能归因。按作品簇/歌手留出，泄漏或未知身份阻断相应泛化；不同权重不得继承旧报告。权重/KV是限定预算，设备、长度、batch、kernel、真实峰值和速度另核；FAD/奖励不等艺术质量，参考、嵌入、样本量不一致不直接排行。[AM01/K11.01.01.03](ai-models-r1-knowledge-cases.md#L5)；[AM22/K11.08.01.03](ai-models-r1-knowledge-cases.md#L26)；[AM23/K11.08.02.03](ai-models-r1-knowledge-cases.md#L27)；[AM24/K11.08.03.03](ai-models-r1-knowledge-cases.md#L28)；[AM25/K11.09.01.03](ai-models-r1-knowledge-cases.md#L29)；[AM26/K11.09.02.03](ai-models-r1-knowledge-cases.md#L30)；[AM28/K11.10.01.03](ai-models-r1-knowledge-cases.md#L32)；[AM29/K11.10.02.03](ai-models-r1-knowledge-cases.md#L33)；[AM30/K11.10.03.03](ai-models-r1-knowledge-cases.md#L34)；[AM31/K11.01.01.04](ai-models-r2-knowledge-cases.md#L19)；[AM52/K11.08.01.04](ai-models-r2-knowledge-cases.md#L40)；[AM53/K11.08.02.04](ai-models-r2-knowledge-cases.md#L41)；[AM54/K11.08.03.04](ai-models-r2-knowledge-cases.md#L42)；[AM55/K11.09.01.04](ai-models-r2-knowledge-cases.md#L43)；[AM56/K11.09.02.04](ai-models-r2-knowledge-cases.md#L44)；[AM58/K11.10.01.04](ai-models-r2-knowledge-cases.md#L46)；[AM59/K11.10.02.04](ai-models-r2-knowledge-cases.md#L47)；[AM60/K11.10.03.04](ai-models-r2-knowledge-cases.md#L48)。

## KC-A11 保护旋律、歌词、伴奏和局部音色修改
原W0、T0，目标T1，只允许编辑离散人声索引[1,3)。四个1拍音符60/64/67/60、词a/b/c/d，120四分音符每分，总2s；原伴奏[1,2,3,4]、人声[10,20,30,40]仅有限对象而非音频。保护音符、词序、时值、时钟、全部伴奏及人声索引0/3；目标T1只是标签，不能证明声学音色或真人身份。

| 候选 | 有限检查 | 处置 |
|---|---|---|
| C1 保护字段不变，人声[10,71,72,40]，目标T1 | 有限对象通过 | 保留候选；真实权利/实际版本/资源/独立质量仍UNKNOWN，不得正式执行或交付 |
| C2 第二音改65，其余同C1 | 旋律保护失败 | 拒绝 |
| C3 词顺序a/c/b/d，其余同C1 | 词序保护失败 | 拒绝 |
| C4 伴奏改[1,2,4,4]，其余同C1 | 伴奏保护失败 | 拒绝 |
| C5 人声[11,71,72,40]，其余同C1 | 区域外保护失败 | 拒绝 |

七能力贯穿：
- A01 知：区分SVC/SVS/cover、分离与渲染、离散保护与连续F0/风格语义；任务来源分别确认。[AM15/K11.05.03.03](ai-models-r1-knowledge-cases.md#L19)；[AM16/K11.06.01.03](ai-models-r1-knowledge-cases.md#L20)；[AM19/K11.07.01.03](ai-models-r1-knowledge-cases.md#L23)；[AM20/K11.07.02.03](ai-models-r1-knowledge-cases.md#L24)；[AM45/K11.05.03.04](ai-models-r2-knowledge-cases.md#L33)；[AM46/K11.06.01.04](ai-models-r2-knowledge-cases.md#L34)；[AM49/K11.07.01.04](ai-models-r2-knowledge-cases.md#L37)；[AM50/K11.07.02.04](ai-models-r2-knowledge-cases.md#L38)。
- A02 流：权限及目标→源分析→候选路径→保留原件→生成副本（计划）→独立保护/质量→授权修订或停止；分离失败可在合法授权下改干净来源或重录，不自行改词/旋律。[AM13/K11.05.01.03](ai-models-r1-knowledge-cases.md#L17)；[AM15/K11.05.03.03](ai-models-r1-knowledge-cases.md#L19)；[AM21/K11.07.03.03](ai-models-r1-knowledge-cases.md#L25)；[AM43/K11.05.01.04](ai-models-r2-knowledge-cases.md#L31)；[AM45/K11.05.03.04](ai-models-r2-knowledge-cases.md#L33)；[AM51/K11.07.03.04](ai-models-r2-knowledge-cases.md#L39)。
- A03 工：模型机制仅用于候选筛选，实际权重、接口、语言、mask域、资源及权利由K12/K15确认。[AM13/K11.05.01.03](ai-models-r1-knowledge-cases.md#L17)；[AM25/K11.09.01.03](ai-models-r1-knowledge-cases.md#L29)；[AM30/K11.10.03.03](ai-models-r1-knowledge-cases.md#L34)；[AM43/K11.05.01.04](ai-models-r2-knowledge-cases.md#L31)；[AM55/K11.09.01.04](ai-models-r2-knowledge-cases.md#L43)；[AM60/K11.10.03.04](ai-models-r2-knowledge-cases.md#L48)。
- A04 态：B0不可覆盖，C1绑定源S1、条件P1、模型W1，报告E1绑定S1/W1/Y1；S2或W2使报告不适用。超时先回读，UNKNOWN不盲重试。[AM21/K11.07.03.03](ai-models-r1-knowledge-cases.md#L25)；[AM26/K11.09.02.03](ai-models-r1-knowledge-cases.md#L30)；[AM27/K11.09.03.03](ai-models-r1-knowledge-cases.md#L31)；[AM30/K11.10.03.03](ai-models-r1-knowledge-cases.md#L34)；[AM51/K11.07.03.04](ai-models-r2-knowledge-cases.md#L39)；[AM56/K11.09.02.04](ai-models-r2-knowledge-cases.md#L44)；[AM57/K11.09.03.04](ai-models-r2-knowledge-cases.md#L45)；[AM60/K11.10.03.04](ai-models-r2-knowledge-cases.md#L48)。
- A05 评：硬保护后分别评价词/音高/目标音色/自然度/串音/听评；自评分、混合一致、FAD不证明艺术或保护。[AM17/K11.06.02.03](ai-models-r1-knowledge-cases.md#L21)；[AM18/K11.06.03.03](ai-models-r1-knowledge-cases.md#L22)；[AM20/K11.07.02.03](ai-models-r1-knowledge-cases.md#L24)；[AM24/K11.08.03.03](ai-models-r1-knowledge-cases.md#L28)；[AM28/K11.10.01.03](ai-models-r1-knowledge-cases.md#L32)；[AM47/K11.06.02.04](ai-models-r2-knowledge-cases.md#L35)；[AM48/K11.06.03.04](ai-models-r2-knowledge-cases.md#L36)；[AM50/K11.07.02.04](ai-models-r2-knowledge-cases.md#L38)；[AM54/K11.08.03.04](ai-models-r2-knowledge-cases.md#L42)；[AM58/K11.10.01.04](ai-models-r2-knowledge-cases.md#L46)。
- A06 编：保存词谱、tempo map、原轨（如真实可用）、条件与副本，latent不能替代可编辑乐谱；格式K12、工程K09。[AM04/K11.02.01.03](ai-models-r1-knowledge-cases.md#L8)；[AM05/K11.02.02.03](ai-models-r1-knowledge-cases.md#L9)；[AM12/K11.04.03.03](ai-models-r1-knowledge-cases.md#L16)；[AM15/K11.05.03.03](ai-models-r1-knowledge-cases.md#L19)；[AM34/K11.02.01.04](ai-models-r2-knowledge-cases.md#L22)；[AM35/K11.02.02.04](ai-models-r2-knowledge-cases.md#L23)；[AM42/K11.04.03.04](ai-models-r2-knowledge-cases.md#L30)；[AM45/K11.05.03.04](ai-models-r2-knowledge-cases.md#L33)。
- A07 循：记录负例，定位失败、最小授权修订、复核或停止；降精度/重试次数不代替质量。[AM21/K11.07.03.03](ai-models-r1-knowledge-cases.md#L25)；[AM27/K11.09.03.03](ai-models-r1-knowledge-cases.md#L31)；[AM51/K11.07.03.04](ai-models-r2-knowledge-cases.md#L39)；[AM57/K11.09.03.04](ai-models-r2-knowledge-cases.md#L45)；[AM60/K11.10.03.04](ai-models-r2-knowledge-cases.md#L48)。

## R4 实际有限检查
JS有限对象、门禁、时间、报告身份和数据分组；非真实权限/音频/模型。
1. finite positive — true
2. changed melody — true
3. changed lyric order — true
4. changed accompaniment — true
5. changed outside voice — true
6. unknown rights — true
7. unknown version — true
8. unknown resources — true
9. unknown quality — true
10. all finite gate flags — true
11. baseline retained — true
12. clock — true
13. report identity and invalidation — true
14. joint holdout — true

## 限定与遗留
R1历史14、R2本轮20、R3本轮10、R4本轮14，累计58有限检查，本轮44。S535进一步实际HTML补读§2 Eq4及§3.4 Eq14；公式不推全部扩散模型。S117撤回，S534状态、S528 SVS、S529/S536 SVC限定证据，历史库存引用仅追踪。两项K13.08.03.01/.02 SPLIT_OPEN不关闭；#28/#32/#35/#38/#41/#46/#49/#52 OPEN。无真实训练、下载、推理、声音、听评、人体、语言、文化、权利、硬件、标准合规、CI、accepted claims或L1 freeze。G04仍required。

## 累计引用检查
首次预检正则错误地跨行捕获4处含方括号的普通文本；改用不跨行、不嵌套方括号的链接模式后，实际核对R3/R4 1150个精确逐行链接目标ID，0错配。最终提交后再回读。不是专业语义审核。


## G04 R2b 累计校准补充
KC-A11 R2b 当前报告必须绑定 source S1、condition P1、model W1、target T1、permissionEpoch E1、mask [1,3)、clock 120BPM/tm1、duration 2s、output Y1、protocol Q1。C1相同受保护字段与合成候选许可仅作有限资格；单独改变duration、clock、target均REJECT_PROTECTION，不能由新报告绕过；报告任一绑定不一致PENDING_REVALIDATION。当前授权撤回STOP，实际播放安全未知不得试听；模型/资源/版本/真实质量待证为PENDING而非保护失败。参考[AM05](ai-models-r1-knowledge-cases.md#L9)/[AM35](ai-models-r2-knowledge-cases.md#L23)解码重建、[AM58](ai-models-r2-knowledge-cases.md#L46)固定S537版本。
原R4有限检查为历史记录，不能替代新条件的独立核验。
