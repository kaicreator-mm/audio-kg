# G04 R7b-2 — CQ选中案例实质回读（下）

精确基准 f2818fa22e6725d1964bdc403543184783ad4ce4，读取15份实际主案例文档，核D4、非空视角及来源（K01案例6格，原源见发现/资格；其他7格）。22匹配，0异常（[]）。抽取F+及R−/边界，不提升专业或证据等级。另对K01音分及两个待证/残余路径作精确回读。

| D4 | 主案例 | 原源 | 原F+ | 原R−/边界 |
|---|---|---|---|---|
| K09.06.01.04 | [MP40](production-r2-knowledge-cases.md#L20) | S497/S498/S483/S507 | 线性制作R128普通节目目标−23、最大真峰−1dBTP；题设报告−23 LUFS但−.5dBTP不满足名义峰限。QC±.2测量容差、实际无法达到时±1例外、±.3dB真峰仪表容差条件分别核，不直接扩大交付上限。Annex1综合响度用K频权、适用通道加权、400ms窗75%重叠和绝对−70/相对−10门控后能量平均，非dB算术平均；LRA对3s短时响度两级门控后P95−P10；给已门控P10=−30/P95=−18则12LU，非最大减最小。 限定R128的±.3dB真峰仪表容差适用于20kHz带限条件，不是峰限交付余量。BS.1770-5 Annex1绝对/相对门均严格大于阈值，只取完整400ms窗；合成块[-70,-69,-20]绝对门排除−70，按能量平均算相对门后仅−20保留；另给定相对门−30，−30不入、−29.99入。全被排除则报告不可用/无有效块，不填0 LUFS；LRA另属Tech3342。 | 正文限定；非仪表、完整标准栈或实际测量合规。 |
| K09.02.03.04 | [MP30](production-r2-knowledge-cases.md#L10) | S490/S089 | 早期简化线性曲线点(0,0),(10,0),(12,0),(20,0)，只允许[10,12]闭边界内增加中心(11,2dB)，边界0不变；若删(20,0)或改变插值/读取模式，区间外可能改变。 修订判别例使用原线性点(0,0),(4,4),(10,0),(12,0),(20,0)，只新增(11,2)，边界10/12不变；区间外t2=2、t6=8/3、t15=0。全局改离散保持在t2/t6得到0/4，删(4,4)令外部变0，均拒绝。分离Play/Off，时间域/单位/版本及许可须一致；有限点不证明连续全域等价。 | 不运行Audacity；失效现象按原资格。 |
| K11.05.01.03 | [AM13](ai-models-r1-knowledge-cases.md#L17) | S124/S523/S526/S527 | 任务要求歌词w1/w2、旋律、伴奏和时长；S124特定melody模型卡仅候选文本/旋律且非真实歌词演唱，YuE/ACE论文的歌声/条件是另一证据类别；须实际版本测试才准入。 | 无版本实测，不推荐实际产品。 |
| K11.06.01.03 | [AM16](ai-models-r1-knowledge-cases.md#L20) | S528 | SVS输入题设note A4一拍+词a，目标音高/时值/语言音素；普通TTS只提供文本并不要求按谱的F0和拍时值，DiffSpeech是另任务。 | 无真实语言或声音生成。 |
| K11.07.01.03 | [AM19](ai-models-r1-knowledge-cases.md#L23) | S529 | 合成任务source e1内容token a、F0=440、时值1s；目标匿名音色T，仅允许改变音色，候选保留a/440/1s才满足这些字段；内容/音高/音色解耦可能有泄漏。 | 不提供真人克隆操作；无声音。 |
| K11.07.02.03 | [AM20](ai-models-r1-knowledge-cases.md#L24) | S118/S064/S484 | 参考人声v=[1,0]、伴奏b=[0,1]，混合[1,1]，估计人声[.8,.1]含目标衰减及串音；模型输出不等原始录音。 | 合成向量，K08机制/K10评价。 |
| K11.10.01.04 | [AM58](ai-models-r2-knowledge-cases.md#L46) | S537/S523 | 一维高斯题设参考均值0方差1、A均值1方差1、B均值0方差4，Fréchet距离平方形式均为1；相同分数不意味着同分布或听感。 S537固定arXiv 2311.01616v2 §2 Eq1与§3.1–3.3，题设为平方Wasserstein-2形式（不再开根）；样本数、嵌入、参考及估计方法均须对齐。 | 只是高斯标量公式，不是实际FAD工具或音频。 |
| K19.04.01.01 | [LS13](live-sound-r1-knowledge-cases.md#L17) | S618/S619/S620/S629 | 覆盖早到达能量、频谱平衡、STI语音清晰度、稳定性、暴露分别有指标与证据。题设同场A/B都有覆盖证据但B的STI缺失，整体验收待核。 | D25原候选；正式标准阈值未知。 |
| K19.01.02.01 | [LS02](live-sound-r1-knowledge-cases.md#L6) | S618/S629/S630 | 观众与工作人员、表演者、邻界是不同对象；观众中儿童针对性活动需独立更保守政策及峰值条件，不以一般观众政策替代。题设观众参考位、工作人员剂量协议分开，年龄/政策及现场法定限制未知停止。 | 无缅甸法规核验；未知停止实际放行。 |
| K10.04.03.04 | [EV39](evaluation-r2-knowledge-cases.md#L16) | S520/S512/S513/S514 | 参考token[a,b,c,d]、预测[a,x,c,y,d]，最小单位代价1替换1插入，WER=.5；删除例[a,c,d] WER=.25；同一文本多次出现按稳定词ID与时间对齐。词级、字符/音节/音素与音乐符号单位不可混用。 EV12的可编辑交付需保留稳定note/word ID、独立音节音符关系、声部、时间、拍及音高；仅同字符串或扁平文本/音高/时间不足，显式有损授权不等无损通过。 | 自建单位代价例不是SCLITE默认代价或真实语种，空参考单列。 |
| K12.09.01.03 | [TO25](tools-orchestration-r1-knowledge-cases.md#L29) | S124/S543/S544 | 候选A质量分9但歌词控制UNKNOWN，B质量分7且文档报告支持但未实测；实际执行门禁都未满足。只在硬项验证后比较软偏好。 | 无实际工具推荐或运行。 |
| K12.09.02.03 | [TO26](tools-orchestration-r1-knowledge-cases.md#L30) | S123/S543/S538 | 虚构宿主升级H1→H2、插件P1不变；旧往返验证绑定H1/P1/格式F1，不自动适用H2，重新核需要保留的字段。 | 未安装任何版本。 |
| K12.01.01.03 | [TO01](tools-orchestration-r1-knowledge-cases.md#L5) | S538/S126 | 宿主H提供播放、轨道查询和脚本写入三种不同能力；文档列GetTrackGUID和GetSetMediaTrackInfo_String，不等任意宿主/版本都可调用。 | REAPER动态文档未固定版本，不调用DAW。 |
| K14.01.01.03 | [ED01](music-education-r1-knowledge-cases.md#L5) | S145/S557 | 目标G1识别上行大三度，G2从谱演奏相应音程，G3在未见乐句找到该关系。题设G1成功4/5且方向/性质均对；只答音名不能满足G2/G3。 | 4/5为示意阈值，不是普遍标准；未测人。 |
| K14.08.02.04 | [ED47](music-education-r2-knowledge-cases.md#L27) | S562/S560 | 同题延迟T1若提前复习仍是有复习的保持条件，未见题T2若看过答案则EXPOSED；若没有T2记录则迁移UNKNOWN。难度改变需重新对照，不得用旧分填空。 未见任务须绑定同一匿名学习者lineage、尝试、材料等价内容及曝光史；B曾呈现/练习/获得答案反馈均不属于未见，改ID但内容与A等价亦非新题，曝光UNKNOWN不通过。允许熟悉领域技能但真正新题且曝光已知无；仅支持此有限任务迁移，不推一般迁移效度。 | 没有真实学习测验。 |
| K18.11.04.01 | [SD44](sound-design-r2-knowledge-cases.md#L28) | S614/S616/S608 | 题设音色修订只允许filter及调制深度；保持音符、素材、时序与其他patch参数，输出需绑定当前版本与复核，旧评分不可直接沿用。 | 不做真实音频/DAW。 |
| K09.01.01.03 | [MP01](production-r1-knowledge-cases.md#L5) | S086/S487 | 工程P1、轨T1、region R1引用素材M1偏移1000帧/长4800、工程起点9600帧，@48k同采样时基；R2可同源不同位置，渲染B1另记依赖。 | 合成对象非真实DAW项目。 |
| K15.01.02.03 | [GV02](production-governance-r1-knowledge-cases.md#L6) | S564/S566 | 题设工程师OP-E可编辑P1，评审OP-R可验收混音，发布负责人OP-D需现行许可及明确授权。项目J、被授权主体ORG-J、实际操作者与受众分别绑定；角色不能代授予或委托证据。 | 虚构责任，非实际授权。 |
| K04.06.03.04 | [PF39](performance-r2-knowledge-cases.md#L25) | S388/S085 | 题定同一事件组及共享毫秒时基：A源事件1000，B源事件1010，A接收该B事件1060，已校准B→A链路50ms；(1060−1000)−50=+10ms，与1010−1000一致（B晚于A）；允许相对源偏差≤20ms，先找技术人员处理监听链而非要求B提早50ms。修复后同源参照重测。 | 若链路时变、时钟不同步、事件身份/接收端不匹配或方向未知，拒绝简单相减并标UNKNOWN；系统工程主责K19/K12。 |
| K19.09.01.01 | [LS33](live-sound-r2-knowledge-cases.md#L17) | S629/S630 | 题设观众声级缺参考位/校准、儿童/一般政策未知、峰值缺适用条件或结果、职业暴露无独立证据、场地权限未知中的任一项即停止；当前合格记录及授权确认才可复核，已复核不等于合格。 | D25原ID；禁止主动制造高声级。 |
| K07.06.04.01 | [AC51](acoustics-g04-feedback-path-case.md#L5) | S033/S096 | 合成有向拓扑mic→amp→speaker→air→mic构成可能回路；删air→mic则所给图没有该回路。闭合结构不证明持续振荡：抽象归一化标量递推y[n]=.5 y[n−1]、y[0]=1得到1,.5,.25,.125（非真实系统参数），仍衰减。 | 图不完整UNKNOWN；图无环仅当前模型，非实际无风险。频率相关环路响应、相位和稳定条件需独立证据；不做危险复现、实际增益设置、现场声级或安全放行。 |
| K01.05.06.02 | [TB-K01.05.06.02 / K01.05.06.02](theory-case-batch.md#L7) | S177/S178 via discovery | 前者可为V7/V，后者为G大调本调属七 V7；实际分析仍查上下文 | 孤立D7不能唯一确定调、功能及转调 |

## 读取Blob
- production-r2-knowledge-cases.md: 34ff5558676c16c28dd8eb380c3bad6a6d9112df
- ai-models-r1-knowledge-cases.md: 1aff0a343c1c690d213e2ad44eda7744b202d3c6
- ai-models-r2-knowledge-cases.md: 688511658593db1d7f38966706a2c8c1847bf468
- live-sound-r1-knowledge-cases.md: 4c13c2ae5a4e32e0d4a957ed2beb0377e9c126d0
- evaluation-r2-knowledge-cases.md: 564f06f0bff3b3856d390fa0e411b32e60ebf177
- tools-orchestration-r1-knowledge-cases.md: 5e9931cbc774c44ee58477a2326ca22eb278a909
- music-education-r1-knowledge-cases.md: b89750420ba68e17d548a0e3a4af55ca93456a95
- music-education-r2-knowledge-cases.md: 069c5fba48ea5a18a676f94dfcad0f7eada9fd4d
- sound-design-r2-knowledge-cases.md: 89678ec87eb7ec8aa0f6e59c6e6efce9ba13c1be
- production-r1-knowledge-cases.md: b71dd8d2181370d5a85b52ff39c1471df27e4775
- production-governance-r1-knowledge-cases.md: 017d5d470766d348a0b16fab355fd9e7d812016e
- performance-r2-knowledge-cases.md: 908a1f7899cf76d7d1ce30c5675d6626d1ee8c00
- live-sound-r2-knowledge-cases.md: fb6301b7e580f7c5cee9b452625c9143d522792d
- acoustics-g04-feedback-path-case.md: 012390b2aacdebfc7b7fa0ee69554234b84be25a
- theory-case-batch.md: 9e17c1d3b6fdabb7a4917f22dc43cec2bba30d86
