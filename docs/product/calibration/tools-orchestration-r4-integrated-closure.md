# K12 R4 综合知识任务、有限反例及收口
DRAFT / #56；不是软件/Harness实现或真实生产任务。以下为原创有限对象，所有权限、音符、声部、分数、版本、时钟和回执均虚构；不调用DAW/CLI/MCP/模型，不试听，不以模拟通过替代真实资格。K11机制、K09制作、K10评价、K15实际权利、K07听音安全、K13语言、K19现场各自保留。#55 RV02相关门禁在本任务有限示例体现，不关闭#55或证明K11修复。

## EX01 交换与工具选择
[TO04/K12.02.01.03](tools-orchestration-r1-knowledge-cases.md#L8)；[TO05/K12.02.02.03](tools-orchestration-r1-knowledge-cases.md#L9)；[TO06/K12.02.03.03](tools-orchestration-r1-knowledge-cases.md#L10)；[TO07/K12.03.01.03](tools-orchestration-r1-knowledge-cases.md#L11)；[TO08/K12.03.02.03](tools-orchestration-r1-knowledge-cases.md#L12)；[TO10/K12.04.01.03](tools-orchestration-r1-knowledge-cases.md#L14)；[TO11/K12.04.02.03](tools-orchestration-r1-knowledge-cases.md#L15)；[TO12/K12.04.03.03](tools-orchestration-r1-knowledge-cases.md#L16)；[TO31/K12.02.01.04](tools-orchestration-r2-knowledge-cases.md#L8)；[TO32/K12.02.02.04](tools-orchestration-r2-knowledge-cases.md#L9)；[TO33/K12.02.03.04](tools-orchestration-r2-knowledge-cases.md#L10)；[TO34/K12.03.01.04](tools-orchestration-r2-knowledge-cases.md#L11)；[TO35/K12.03.02.04](tools-orchestration-r2-knowledge-cases.md#L12)；[TO36/K12.03.03.04](tools-orchestration-r2-knowledge-cases.md#L13)；[TO37/K12.04.01.04](tools-orchestration-r2-knowledge-cases.md#L14)；[TO38/K12.04.02.04](tools-orchestration-r2-knowledge-cases.md#L15)；[TO39/K12.04.03.04](tools-orchestration-r2-knowledge-cases.md#L16)；[TO52/K12.09.01.04](tools-orchestration-r2-knowledge-cases.md#L29)；[TO53/K12.09.02.04](tools-orchestration-r2-knowledge-cases.md#L30)；[TO54/K12.09.03.04](tools-orchestration-r2-knowledge-cases.md#L31)
要求保存可编辑的原工程、插件状态和自动化。给定宿主源Bitwig5.0.9、目标Studio One6.5，S543历史FAQ明确CLAP数据及Clip Launcher不读，故要求这些字段的无损交换不成立；不能从已打开文件推导成功。若用户单独允许只交stem，则是新合同，仅验证音频时钟/起点/声道及内容，保留原工程；不视为可编辑工程。反向Studio One→Bitwig的AU数据不读，仅限定该历史FAQ；S547没有AU具体运行正文证据。真实宿主版本和字段回读另验。
有限字段表（题设已证audio，插件未知）：audio=PRESERVED，plugin=UNKNOWN；必须两者时BLOCK；只要求audio且明确新合同时LOSS_GATE_PASS（仅字段门禁）。若目标只给渲染结果，不证明原自动化。PPQ480、tempo120、4个四分音符=2s；48kHz原点4800帧=.1s，目标44.1kHz对应4410帧；保持起点和时钟，而非复制帧数。CLAP 128帧48kHz块预算2.667ms；3ms工作已超过题设预算，LLM规划非实时；不从预算推真实延迟。文档版本与安装版本不同。

## EX02 发现、权限、回读和失效
[TO16/K12.06.01.03](tools-orchestration-r1-knowledge-cases.md#L20)；[TO17/K12.06.02.03](tools-orchestration-r1-knowledge-cases.md#L21)；[TO18/K12.06.03.03](tools-orchestration-r1-knowledge-cases.md#L22)；[TO19/K12.07.01.03](tools-orchestration-r1-knowledge-cases.md#L23)；[TO20/K12.07.02.03](tools-orchestration-r1-knowledge-cases.md#L24)；[TO21/K12.07.03.03](tools-orchestration-r1-knowledge-cases.md#L25)；[TO22/K12.08.01.03](tools-orchestration-r1-knowledge-cases.md#L26)；[TO23/K12.08.02.03](tools-orchestration-r1-knowledge-cases.md#L27)；[TO24/K12.08.03.03](tools-orchestration-r1-knowledge-cases.md#L28)；[TO43/K12.06.01.04](tools-orchestration-r2-knowledge-cases.md#L20)；[TO44/K12.06.02.04](tools-orchestration-r2-knowledge-cases.md#L21)；[TO45/K12.06.03.04](tools-orchestration-r2-knowledge-cases.md#L22)；[TO46/K12.07.01.04](tools-orchestration-r2-knowledge-cases.md#L23)；[TO47/K12.07.02.04](tools-orchestration-r2-knowledge-cases.md#L24)；[TO48/K12.07.03.04](tools-orchestration-r2-knowledge-cases.md#L25)；[TO49/K12.08.01.04](tools-orchestration-r2-knowledge-cases.md#L26)；[TO50/K12.08.02.04](tools-orchestration-r2-knowledge-cases.md#L27)；[TO51/K12.08.03.04](tools-orchestration-r2-knowledge-cases.md#L28)
工具发现页1=read,nextCursor，页2=write，完整后仍须核当前schema/权限。外部文本要求上传未授权T2不改变本地T1合同。MCP协议请求ID不是业务幂等标记；operation E1预期rev7，超时，实际读回E1标记且rev8时ALREADY_APPLIED，不重复添加clip。读失败或rev8但无可信操作标记为UNKNOWN_STOP；只有确认无效果、当前rev7且有明确幂等合同才RETRY_ALLOWED_BY_CONTRACT。对不同写操作分别定义确认条件，回读和重试均受权限。权限撤回或真实安全未知不得继续受影响生成/披露/试听；不把退出码、工具回执或自评当交付。
有限依赖：S0源、B0伴奏、R0参考；P1依赖S0；Y1依赖P1/B0/R0；M1混合依赖Y1/B0；E1评价依赖M1。Y1更新使Y1/M1/E1对新候选失效；S0变化使S0/P1/Y1/M1/E1失效，独立B0/R0可复核后复用；保留原版本/失败候选。A→B→A无法拓扑推进。实际工程/调度器未实现。

## KC-TO12：保留旋律与词谱、仅修订授权目标歌声的局部候选
复用AI-A01/KC-A11，强调工具合同和可观察业务状态而非再次定义模型机制。源P0/S0，时钟PPQ480_T120，note=[60,64,67,60]，dur=[480,480,480,480]，词=[a,b,c,d]，伴奏=[1,2,3,4]，声部=[10,20,30,40]，target=T0，automation=[.4,.6]，plugin=P1/state-A。仅允许候选工程P1内声部索引1、2（半开[1,3)）编辑为target T1；输出candidate voice=[10,71,72,40]，原工程P0及所有其它字段保护；T1是符号标签非真实声线相似度证明。源、权限epoch、时钟、mask及模型/工具/宿主/格式版本需绑定。
| 候选 | 变化 | 有限判断 |
|---|---|---|
| C1 | 仅允许voice索引1/2、candidate P1和目标标签T1 | SCOPED_SYNTHETIC_CANDIDATE（各虚构门禁为真） |
| C2 | clock改PPQ960_T120 | REJECT_PROTECTION |
| C3 | 第二个duration=960 | REJECT_PROTECTION |
| C4 | target=T2 | REJECT_PROTECTION |
| C5 | note第二个65 | REJECT_PROTECTION |
| C6 | 词序a,c,b,d | REJECT_PROTECTION |
| C7 | 伴奏第二值99 | REJECT_PROTECTION |
| C8 | 非目标voice索引0改99 | REJECT_PROTECTION |
| C9 | automation第二值.8 | REJECT_PROTECTION |
| C10 | plugin改P2/state-A | REJECT_PROTECTION |
| C11 | 在原P0写入 | REJECT_PROTECTION |
| C12 | 来源变S1 | REJECT_PROTECTION |

硬门禁：当前授权真、epoch E1、本地允许才进入其余条件；UNKNOWN/撤回/云端越权STOP_PERMISSION。保护失败优先REJECT_PROTECTION；工具/版本/资源/质量/保护任一未证PENDING_EVIDENCE；实际播放暴露安全未知STOP_AUDITION，若急性听力损失停止并按K07及时寻求医疗评估。所有模拟标记真也只SCOPED_SYNTHETIC_CANDIDATE，真实请求仍需真实证据。硬项失败分9不能覆盖硬项通过分7；C1无实际音频/许可/独立听评，非真实合格。
回执身份：source S0/condition C0/model M1/tool G1/host H1/format F1/permission E1/mask 1:3/clock PPQ480_T120/target T1/output Y1/protocol Q1；任一改变旧回执不复用。两次修订预算耗尽停止，保留失败记录；可重新协商新目标，但不自动放宽硬项。
| 能力 | 专业动作 | 精确入口 |
|---|---|---|
| A01 知 | 读对象、时钟、格式、模型卡及权限条件 | [TO01/K12.01.01.03](tools-orchestration-r1-knowledge-cases.md#L5)；[TO10/K12.04.01.03](tools-orchestration-r1-knowledge-cases.md#L14)；[TO13/K12.05.01.03](tools-orchestration-r1-knowledge-cases.md#L17)；[TO28/K12.01.01.04](tools-orchestration-r2-knowledge-cases.md#L5)；[TO37/K12.04.01.04](tools-orchestration-r2-knowledge-cases.md#L14)；[TO40/K12.05.01.04](tools-orchestration-r2-knowledge-cases.md#L17) |
| A02 流 | 权利→分析→发现→选型→转换/候选→回读→评价，依赖与预算 | [TO14/K12.05.02.03](tools-orchestration-r1-knowledge-cases.md#L18)；[TO19/K12.07.01.03](tools-orchestration-r1-knowledge-cases.md#L23)；[TO21/K12.07.03.03](tools-orchestration-r1-knowledge-cases.md#L25)；[TO41/K12.05.02.04](tools-orchestration-r2-knowledge-cases.md#L18)；[TO46/K12.07.01.04](tools-orchestration-r2-knowledge-cases.md#L23)；[TO48/K12.07.03.04](tools-orchestration-r2-knowledge-cases.md#L25) |
| A03 工 | 选择具体版本工具并验证接口、schema、插件与模型证据 | [TO04/K12.02.01.03](tools-orchestration-r1-knowledge-cases.md#L8)；[TO07/K12.03.01.03](tools-orchestration-r1-knowledge-cases.md#L11)；[TO13/K12.05.01.03](tools-orchestration-r1-knowledge-cases.md#L17)；[TO16/K12.06.01.03](tools-orchestration-r1-knowledge-cases.md#L20)；[TO31/K12.02.01.04](tools-orchestration-r2-knowledge-cases.md#L8)；[TO34/K12.03.01.04](tools-orchestration-r2-knowledge-cases.md#L11)；[TO40/K12.05.01.04](tools-orchestration-r2-knowledge-cases.md#L17)；[TO43/K12.06.01.04](tools-orchestration-r2-knowledge-cases.md#L20) |
| A04 态 | 源、计划、候选、operation、版本及失效回执 | [TO02/K12.01.02.03](tools-orchestration-r1-knowledge-cases.md#L6)；[TO03/K12.01.03.03](tools-orchestration-r1-knowledge-cases.md#L7)；[TO23/K12.08.02.03](tools-orchestration-r1-knowledge-cases.md#L27)；[TO24/K12.08.03.03](tools-orchestration-r1-knowledge-cases.md#L28)；[TO29/K12.01.02.04](tools-orchestration-r2-knowledge-cases.md#L6)；[TO30/K12.01.03.04](tools-orchestration-r2-knowledge-cases.md#L7)；[TO50/K12.08.02.04](tools-orchestration-r2-knowledge-cases.md#L27)；[TO51/K12.08.03.04](tools-orchestration-r2-knowledge-cases.md#L28) |
| A05 评 | 硬保护/字段/产物验证、独立任务质量 | [TO08/K12.03.02.03](tools-orchestration-r1-knowledge-cases.md#L12)；[TO11/K12.04.02.03](tools-orchestration-r1-knowledge-cases.md#L15)；[TO17/K12.06.02.03](tools-orchestration-r1-knowledge-cases.md#L21)；[TO21/K12.07.03.03](tools-orchestration-r1-knowledge-cases.md#L25)；[TO35/K12.03.02.04](tools-orchestration-r2-knowledge-cases.md#L12)；[TO38/K12.04.02.04](tools-orchestration-r2-knowledge-cases.md#L15)；[TO44/K12.06.02.04](tools-orchestration-r2-knowledge-cases.md#L21)；[TO48/K12.07.03.04](tools-orchestration-r2-knowledge-cases.md#L25) |
| A06 编 | 可编辑原工程、候选局部mask、声部及自动化不覆盖 | [TO03/K12.01.03.03](tools-orchestration-r1-knowledge-cases.md#L7)；[TO11/K12.04.02.03](tools-orchestration-r1-knowledge-cases.md#L15)；[TO12/K12.04.03.03](tools-orchestration-r1-knowledge-cases.md#L16)；[TO22/K12.08.01.03](tools-orchestration-r1-knowledge-cases.md#L26)；[TO30/K12.01.03.04](tools-orchestration-r2-knowledge-cases.md#L7)；[TO38/K12.04.02.04](tools-orchestration-r2-knowledge-cases.md#L15)；[TO39/K12.04.03.04](tools-orchestration-r2-knowledge-cases.md#L16)；[TO49/K12.08.01.04](tools-orchestration-r2-knowledge-cases.md#L26) |
| A07 循 | 未知副作用回读、最小修订、重验、回滚/停止 | [TO21/K12.07.03.03](tools-orchestration-r1-knowledge-cases.md#L25)；[TO23/K12.08.02.03](tools-orchestration-r1-knowledge-cases.md#L27)；[TO24/K12.08.03.03](tools-orchestration-r1-knowledge-cases.md#L28)；[TO27/K12.09.03.03](tools-orchestration-r1-knowledge-cases.md#L31)；[TO48/K12.07.03.04](tools-orchestration-r2-knowledge-cases.md#L25)；[TO50/K12.08.02.04](tools-orchestration-r2-knowledge-cases.md#L27)；[TO51/K12.08.03.04](tools-orchestration-r2-knowledge-cases.md#L28)；[TO54/K12.09.03.04](tools-orchestration-r2-knowledge-cases.md#L31) |

## 本轮实际有限检查（独立审核待做）
1. 54 actual linked cases: true
2. positive protected comparison: true
3. eleven individual mutations rejected: true
4. source immutable: true
5. duration: true
6. permission denial/withdrawal/local: true
7. protection failure precedence: true
8. tool/version/resource/quality unknown: true
9. audition safety unknown: true
10. synthetic positive not actual: true
11. receipt bound all identities: true
12. lost ACK: true
13. unknown ACK stop: true
14. retry only proven absence contract: true
15. actual dependency closure: true
16. topological valid/invalid: true
17. loss direction: true
18. quality hard priority: true
19. callback budget: true
20. tool pages: true
执行的是原创对象比较、数值、有限依赖闭包及拓扑、门禁分支和回执一致性；不代表真实DAW/MCP操作或许可。R1历史15，R2实际20，R3实际10，R4实际20，共65记录（本轮50）。R2 dependency仅长度检查，R4 actual closure补充。源资格保留S539/S547 SEARCH_LEAD，S548镜像及截图失败；S545固定tag五blob，S546动态VST3、S549 MEI5.1。无CI/accepted claim/L1 freeze。D24八SPLIT_OPEN、历史#28/#32/#35/#38/#41/#46/#49/#52/#55均不关闭。