# G04 R8d — 正式26问与实际可答子集逐问对照

> R9当前性说明：R8独立审核确认CQ25有剩余P1。此处原CQ25为历史有限主路径见证，完整当前追溯见 [R9 CQ25](g04-r9-cq25-full-evidence-trace.md)；其他CQ与原R8a证据边界不变。R9尚待required独立复审。

基准 f46a747c1262e6e267a10d89a18011f773793e13。实际从两份正式需求文档逐行取得CQ01–26并与R7b匹配。以下不是重写CQ或断言所有需求已满足；原始宽问题仍有效，列明本批实际有限回答及未证明的范围，按原精确原子路径继续发现。R8a/R8b/R8c取代R7受影响的见证，原26问D/S分工不改，未证保持UNKNOWN；暂不增正式CQ，因为残余属于原题现有范围，是否进一步拆分在G05裁决。不把真实LLM、工具、听评或现场作为已完成。

| 正式CQ（原文） | 当前有限子问 | 未证/剩余适用条件 | 见证 |
|---|---|---|---|
| [CQ01](../knowledge-scope.md#L30) 给定调律、音高体系与音程，如何解释/计算音高关系？反例：非十二平均律。 | [R7b](g04-r7-cq-semantic-discovery.md#L7)；比值/19EDO映射；独立本土语义拒答 | 不涵盖任意调律、音高参考和历史体系；原生名称未知，不能自动映射 | R7b CQ01；K01 R3-T01/02 |
| [CQ02](../knowledge-scope.md#L31) 给定和弦、调式和曲式，哪些分析合理、哪些条件下不成立？ | [R7b](g04-r7-cq-semantic-discovery.md#L8)；D7调性、局部曲式残余 | 其它和弦/调式、全曲式及风格具体证据另核 | R7b CQ02 |
| [CQ03](../knowledge-scope.md#L32) 给定旋律、乐器音域和表现意图，如何决定配器并检查冲突？ | [R7b](g04-r7-cq-semantic-discovery.md#L9)；普通降B移调及保护主线 | 编制、表现意图、其它乐器/奏法和真实可奏性需具体条件 | R7b CQ03 |
| [CQ04](../knowledge-scope.md#L33) 给定歌词、音节、语种、节拍和旋律，如何找出对齐约束与冲突？ | [R7b](g04-r7-cq-semantic-discovery.md#L10)；三音节四音符与NFC/时基 | 目标语言真实音素、声调、词界、完整旋律条件与听感不据此确定 | R7b CQ04 |
| [CQ05](../knowledge-scope.md#L34) 音高、声区、共鸣、音色之间是什么关系？哪些只能从录音观察而不能诊断？ | [R7b](g04-r7-cq-semantic-discovery.md#L11)；F0/谐波与包络、声区非诊断 | 声道观测、声学条件/生理测量不可混；缺真实观察不诊断 | R7b CQ05 |
| [CQ06](../knowledge-scope.md#L35) 音准不稳时有哪些候选解释、如何测量、何时需教师或专业医疗人员？ | [R7b](g04-r7-cq-semantic-discovery.md#L12)；独立参考、估计和目标；反馈/停止/教师医疗转交 | 实际原因仍候选，真实观察和医疗评估不代办 | R8a/R8c CQ06 |
| [CQ07](../knowledge-scope.md#L36) 从录音中如何区分基频、谐波、共振峰及噪声？哪些输入使检测失败？ | [R7b](g04-r7-cq-semantic-discovery.md#L13)；窗、FFT格点与F0、谐波/噪声条件 | 复杂多F0、噪声检测及共振峰模型需对应独立窗和模型，不由最高峰推出 | R7b CQ07 |
| [CQ08](../knowledge-scope.md#L37) 如何区分采样削波、响度、真峰值、动态范围；如何选择不同输出规范？ | [R7b](g04-r7-cq-semantic-discovery.md#L14)；削波、声明幅度比动态范围、LRA、真峰、响度、R128输出 | 真实波形K权重、真峰仪表与其它输出规范另核，非标准整体合规 | R8c CQ08 |
| [CQ09](../knowledge-scope.md#L38) 什么输入适合 SVS、SVC、TTS 或完整歌曲模型？输出、局限和授权条件？ | [R7b](g04-r7-cq-semantic-discovery.md#L15)；SVS/SVC/TTS/整曲候选输入输出 | 实际模型语言、控制/许可、接口与质量不凭类别保证 | R7b CQ09 |
| [CQ10](../knowledge-scope.md#L39) 如何根据单轨/多轨、失真、噪声选择分离与修复工具并验证副作用？ | [R7b](g04-r7-cq-semantic-discovery.md#L16)；单/多轨、分离/持续噪声/点击/削波修复与副作用 | 真实降噪/分离算法、复杂失真/混响和盲听须独立验证 | R8c CQ10 |
| [CQ11](../knowledge-scope.md#L40) 如何区分模型报告指标、独立听评和审美偏好；何时不能比较？ | [R7b](g04-r7-cq-semantic-discovery.md#L17)；固定FAD平方距离、独立听评与偏好 | 真实模型比较、样本量/嵌入/听者协议未知不排质量榜 | R7b CQ11 |
| [CQ12](../knowledge-scope.md#L41) 一个跨语言翻唱任务如何选择歌词适配、音轨、人声、混音与质量检查步骤？ | [R7b](g04-r7-cq-semantic-discovery.md#L18)；授权词谱、适配及流程选择 | 翻唱涉及目标语听评、人声和混音工具/交付，实际运行许可未证 | R7b CQ12 |
| [CQ13](../knowledge-scope.md#L42) 如何追踪一条主张的来源版本、原文定位、反例、冲突、审核与替代历史？ | [R7b](g04-r7-cq-semantic-discovery.md#L19)；版本、史料定位、回忆/解释、冲突与历史 | 真实源版本/引用链/许可和替代需逐条核，不因PROV推真 | R7b CQ13 |
| [CQ14](../knowledge-scope.md#L43) 如何判定某工具是否真实支持指定版本、接口、语言与控制能力？ | [R7b](g04-r7-cq-semantic-discovery.md#L20)；H1/H2版本与歌词控制硬项 | 未测接口、版本/语种/运行许可不可承诺 | R7b CQ14 |
| [CQ15](../knowledge-scope.md#L44) 如何从教育目标选择练习及可观测反馈，同时保留个体/流派差异？ | [R7b](g04-r7-cq-semantic-discovery.md#L21)；识别/节奏/跨小节练习、反馈、保持与曝光 | 实际个体/流派/无障碍适用、长期效果和剂量未知 | R8c CQ15 |
| [CQ16](../knowledge-scope.md#L45) 当音色、旋律或结构仅需局部修改，如何保持其余工程状态并验证？ | [R7b](g04-r7-cq-semantic-discovery.md#L22)；局部曲线、时长、词谱/提示与实际内容保护 | 音色/结构/任意曲线和真实工程依赖需定义保护集合、格式回读 | R8a CQ16 |
| [CQ17](../knowledge-scope.md#L46) 某种音乐关系是定义、规范、统计规律还是文化习惯？能否用于自动推理？ | [R7b](g04-r7-cq-semantic-discovery.md#L23)；定义、条件规范、实证与文化惯例 | 未证谓词及相关性不自动规则；关系设计留L2 | R7b CQ17 |
| [CQ18](../knowledge-scope.md#L47) 能否给出非西方/缅甸音乐案例中与通用规则不一致的证据，而非强制映射？ | [R7b](g04-r7-cq-semantic-discovery.md#L24)；S577竖琴特定材料、拒绝强映射 | 不代表全缅甸/非西方；原生术语/真实调律、历史证据待核 | R7b CQ18 |
| [CQ19](../capability-coverage.md#L47) 如何根据创作/制作任务和输入状态选择一条可行流程，并说明依赖、替代、失败与停止条件？（A02） | [R7b](g04-r7-cq-semantic-discovery.md#L25)；仅离线O1/F0正例、未授权P STOP、排练另案 | 更多真实任务/宿主/交付条件另定义，未知不能执行 | R8a/R8c CQ19 |
| [CQ20](../capability-coverage.md#L48) 如何依据能力、版本、输入、许可、限制及验证证据选择工具或拒绝调用？（A03） | [R7b](g04-r7-cq-semantic-discovery.md#L26)；硬约束/版本/许可/工具能力 | 实际能力验证、异常恢复与运行结果未执行 | R7b CQ20 |
| [CQ21](../capability-coverage.md#L49) 一次编辑前后有哪些领域对象状态变化，何时应使依赖产物失效，如何保护原始素材？（A04） | [R7b](g04-r7-cq-semantic-discovery.md#L27)；M1/R1/R2及派生闭包、原件保护、注册版本与报告 | 非真实DAW或任意依赖图，未知边不保证保护 | R8a/R8c CQ21 |
| [CQ22](../capability-coverage.md#L50) 如何选择指标和人工听评，并避免把声学分数或审美偏好当作唯一质量真值？（A05） | [R7b](g04-r7-cq-semantic-discovery.md#L28)；多参考F1、技术与偏好/独立听评 | 真实样本、指标选择、主观协议与其它质量维度需独立设计 | R7b CQ22 |
| [CQ23](../capability-coverage.md#L51) 如何区分 WAV、stem、MIDI、乐谱与 DAW 工程可编辑能力及转换损失？（A06） | [R7b](g04-r7-cq-semantic-discovery.md#L29)；WAV/stem/MIDI/谱/工程及词音关系损失 | 具体格式映射、软件版本及往返实测未证 | R7b CQ23 |
| [CQ24](../capability-coverage.md#L52) 如何在失败后定位原因、最小修正、复测、对照/回滚并保存证据，何时停止？（A07） | [R7b](g04-r7-cq-semantic-discovery.md#L30)；事件时钟、状态位、单因素修订与复测 | 真实故障根因、安全、恢复与回滚结果需独立现场证据 | R7b CQ24 |
| [CQ25](../capability-coverage.md#L53) 如何从一个案例追溯各阶段相关知识、证据、输入输出、状态、选择依据及结果？（A01–07） | [R7b](g04-r7-cq-semantic-discovery.md#L31)；七能力实际矩阵→案例→来源资格及有限结果逆向遍历 | 并非任意工作流/图谱实际查询；离线或失败须独立证据路径 | R8b/R8c CQ25 |
| [CQ26](../capability-coverage.md#L54) 不同流派/语言/教学对象/硬件约束如何改变可选流程和评价，并拒绝越界推理？（A01–07） | [R7b](g04-r7-cq-semantic-discovery.md#L32)；语种分层结果、教学/人群及现场条件拒绝外推 | 流派/硬件/无障碍/法律条件须按实际对象核定，不将未测总体化 | R7b CQ26 |

R8现行：[独立参考与版本](g04-r8-xc01-independent-evidence.md)、[七能力实际路径](g04-r8-seven-role-route.md)、[实际案例/源资格](g04-r8-seven-role-evidence.md)、[专业扩展推演](g04-r8-cq-semantic-remediation.md)。R7b/c保留历史；正式全域知识覆盖不能由本有限见证推定。实际26/26原文ID/行号与当前R7b行匹配，专业充分性由独立Reviewer裁决。
