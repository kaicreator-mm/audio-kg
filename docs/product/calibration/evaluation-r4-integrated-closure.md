# K10 R4 综合音乐理解与评价闭环
Task #50；三个补充组合不是新主D4。原创合成数学和对象；没有真实音频、表演、模型、库、测量、听评、权限、数据集访问或标准符合。K10仅评价方法与证据，实际制作/模型/工具/语言/文化/安全各归对应域。
| ID | 关联 | F+ | F- | R+ | R- |
|---|---|---|---|---|---|
| EX01 识别与结构 | EV01–15/28–42；S099/101–105/508–514/519/520 | 明确参考、估计、任务粒度、mask、时间、词汇、版本，分别评价旋律/节奏/和声/音符/乐器/文本/结构。 | 八度折叠等于绝对音高、BPM等于相位、歌词文本等于对齐、边界等于功能标签。 | 核参考/估计身份和匹配、分母/覆盖及多解。 | 缺参考、语境、版本或词汇不伪报；不从指标自动修改作品。 |
| EX02 表演/音质/音乐性 | EV16–24/43–51；S484/515/516/518/522/497/498/507/483 | 实际参考与估计误差、技术质量/人类听评/艺术目标及权利安全独立。 | 低分即诊断、一个技术分数代表创造性、其它群体代表缅甸。 | 核真实参考/语言/群体/协议/目标与多维权衡、实际证据。 | 缺真实听评/安全/权限不放行，撤回停止。 |
| KC-E10 评价与版本闭环 | EV01–54；S099/101/102/104/105/508/510/515/516/518–522 | 下述有限评价、覆盖/配对/源组及报告身份、人工确认。 | 改容差而复用分数、同源训练测试称独立、未知当负例、技术分数替代人类偏好。 | 核任务协议/参考/候选/指标版本、划分、硬门禁及失效。 | 无真实证据仅研究候选/PENDING；越界拒绝、风险/撤回STOP。 |

## KC-E10：四组独立合成证据
A. 旋律评价：指定同网格二值参考r=[220,220,220,0,null]，null是缺参考，0为已知无主旋律。A=[220,440,0,220,440]，B=[220,220,220,0,0]，只在前4个有效帧比较；50cent严格小于，自建有限函数非mir_eval执行。A的RPA=1/3,RCA=2/3,VR=2/3,VFA=1,OA=1/4；B的RPA/RCA/VR/OA均1、VFA0。第五帧未知不得计误报或正确，分母须记录；另独立[220]对[-220]无显式voicing时RPA1但VR0/OA0（候选频率与voicing分离）；无参考有声帧则本研究策略RPA=null。实际F0、音域、时间对齐、非二值和插值均未执行。B的合成识别更好不证明音乐性/真实唱功。独立节奏最大一对一[1,1.12] vs[1.06,1.18]窗.07得2，单参考[1]对[.97,1.03]只得1；音符两对起点+音高、带offset仅一对。均非真实性能。
B. 独立部分标签参考[1,0,null,0,1,1]、估计[1,1,1,0,1,0]，只核已标5项，TP2 FP1 FN1 TN1。独立和弦时长[2,1,3]比较[1,0,-1]，有效准确2/3，覆盖.5；全部排除null（研究报告政策）。未知参考不能换成负标签或0错误，比较口径不同不得直接排榜。文本/时间分开见EV12/39；结构边界/分组见EV13–15/40–42。旧S103与FG调性版本已纠正：stable0.8.2双参数与latest0.9.0dev第三参数，C→F 0 vs允许下降五度.5；不同协议不是模型改进。
C. 独立人类评价设计：小损伤且有参考用BS1116候选协议，中/较大损伤用MUSHRA候选，开放音乐偏好另定；同一听者/片段A/B配对，匿名码、平衡呈现、实际盲化/环境/安全和授权另证。给四个独立配对单位差值[1,2,-1,2]（假设量表可作差），均值1、样本方差2、SE=.7071；未验证统计假设/样本代表性，不宣称显著。重复片段不是独立听者。技术/表达A=(8,6),B=(6,8)互不支配，不擅设权重；硬保护/权限/安全不能分数补偿。39组15国节奏再现摘要不代表缅甸听评，真实人类证据UNKNOWN。
D. 合成报告绑定task melody-v1、input mix:H1、ref R1、候选A:C1、test:T1、源group G1、toy-eval-v1、网格g1、窗50、mask m1、negative候选规则、offline:v1、protocol p1、report O1；修改参考/候选/容差使旧报告失效并保留旧证据。训练s1与测试s2即使不同ID但同源G1仍泄漏，不能声称独立。实际训练/数据集和许可证未核，模型K11、工具K12、权利K15。门禁：缺当前授权或安全为STOP；保护失败REJECTED；缺绑定/所需参考/真实人工证据PENDING；所有合成条件仅SCOPED_CANDIDATE，不是实际采纳。突然听力下降停止听音并及时寻求医疗评估（K07），数字分数不作诊断或安全放行，不执行真实录音/播放/上传。
A01知识语义；A02协议/参考→识别指标→多维评价→审核反馈；A03专业指标输入输出/参数，实际工具K12；A04 S引用输入/候选/报告身份，不拥有工程状态；A05指标与任务、分母覆盖及真实评价；A06 .04 P可编辑转录候选，其他S引用报告/注释，不生成真实工程；A07失败/重评/停止及独立确认。D24入向迁移仍按原账本OPEN，不能由本候选关闭。
## 实际有限检查
1. masked melody A and B separate pitch/chroma/voicing — true
2. unknown frame not false alarm — true
3. no reference voiced not numeric perfect pitch — true
4. negative estimate retains pitch candidate, not voiced — true
5. maximum one-to-one beat matching — true
6. note offset condition distinguishes candidate — true
7. partial label mask — true
8. valid time and coverage separate — true
9. report exact identity and parameter change — true
10. source group leakage despite distinct sample IDs — true
11. hard gate and absent human evidence — true
12. paired sample mean variance SE — true
上述仅JS合成数学、匹配及对象见证；非实际MIR库、数据、模型、DAW、听评、图谱或LLM执行。

## G04 R2b 累计校准补充
KC-E10 R2b：B按[EV11](evaluation-r1-knowledge-cases.md#L15)/[EV38](evaluation-r2-knowledge-cases.md#L15)区分片段标签、音高/时间与固定事件声部，匿名声部需同一全段置换；[EV12](evaluation-r1-knowledge-cases.md#L16)/[EV39](evaluation-r2-knowledge-cases.md#L16)独立保护音符/词ID、声部、拍/时间、音节音符关系，无损与明确许可降级分开；[EV15](evaluation-r1-knowledge-cases.md#L19)/[EV42](evaluation-r2-knowledge-cases.md#L19)同粒度R1/R2逐参考1/0、事前等权才.5，报告绑定两参考版本/理由与聚合政策。非实际MIR或导出。
原R4有限检查为历史记录，不能替代新条件的独立核验。
