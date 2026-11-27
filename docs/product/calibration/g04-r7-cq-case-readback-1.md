# G04 R7b-1 — CQ选中案例实质回读（上）

精确基准 403643a8c4d27d93ea6ad42acc668c8c1cf98057，R7b选择的直接/支持角色共50唯一D4，118次引用。已实际读取18份发现索引，50个精确D4行匹配，K01历史/残余路径另核。此处读取14份实际主案例文档，核D4、7列、四视角及原来源；抽取当前F+及R−/边界供审查，不视为专业独立证据或新来源升级。26匹配，0异常（[]）。

| D4 | 主案例 | 原源 | 原F+ | 原R−/边界 |
|---|---|---|---|---|
| K16.07.01.02 | [MU22](musicology-r1-knowledge-cases.md#L26) | S577/S585 | S577以西方音名加偏移描述竖琴示例，固定音高乐器选用不同音；S585文字仅提示athan语义需按使用场合核。映射为近似表示不是原生概念等价。 | S585截图失败，仅待核线索；不用其证明具体术语。 |
| K16.07.02.01 | [MU23](musicology-r1-knowledge-cases.md#L27) | S577 | S577明确同一演奏者不同曲目、不同演奏者和地区可异，所列最高G为记谱参考，实际可移；Hnyìnloùn例E约低56 cents、B约低62 cents仅该琴师示例。 | 不重新测音，频率与转换K01/K07。 |
| K16.01.01.01 | [MU01](musicology-r1-knowledge-cases.md#L5) | S571/S572/S576 | 题设1920节目单记演出、1980口述回忆1920、2003研究者据二者解释；分别记证据身份、作者、记录日和所指事件日。节目单只证计划非实际发生。 | 口述可为回忆与记忆研究一手，不自动否定或等同同期。 |
| K10.05.03.03 | [EV15](evaluation-r1-knowledge-cases.md#L19) | S509/S105 | 30s作品候选粗层[0,15,30]、细层[0,5,10,15,20,25,30]；另一粗层[0,10,30]而细层相同；相同细边界不证明层级相同。 同一30s粗层协议允许两参考R1内部边界10、R2内部边界15；估计10.2，容差.5s且排除首尾，按单参考匹配F1分别1、0；保留两参考身份/版本/理由及逐参考报告，不选有利参考。 | 自建区间非真实音乐或层级评分。 |
| K10.04.02.03 | [EV11](evaluation-r1-knowledge-cases.md#L15) | S511/S508/S514 | 参考某片段已标钢琴存在、鼓不存在、小提琴未知；估计钢琴和小提琴存在。已标两类钢琴TP/鼓TN，小提琴不得计FP；片段标签不代表每帧声部身份。 同窗[0,1)两事件e1声部A/钢琴440Hz、e2声部B/弦乐660Hz；正确与交换声部身份的候选均有音高/起止2/2、片段标签相同，但固定身份逐事件2/2与0/2。独立逐事件参考缺失则声部分数UNKNOWN。 | 不下载OpenMIC或运行识别，示例类名非实际样本。 |
| K10.04.03.03 | [EV12](evaluation-r1-knowledge-cases.md#L16) | S512/S513/S514 | 原创占位词token a,b,c，文本预测完全一致WER=0；参考词起点[0,1,2]s、估计[.4,1.4,2.4]s，平均绝对起点误差.4s；文本与时间指标分开，音素/音节与词级另核。 另设120BPM四分音符拍0/时值2，稳定n1/n2、w1/w2（同文本也不同ID）、声部A/B、源与[0,1)时间，440Hz为题定A4；扁平导出可保留文本、音高与时间却丢失声部/歌词音符关系，WER0不证明可编辑。保护字段精确绑定才允许无损候选，声明且获授权的有损降级另立任务，不猜恢复。 | 无真实歌词/录音/语种推断；镜像协议待原站复核。 |
| K03.03.01.03 | [AR14](arrangement-r2-knowledge-cases.md#L9) | S339/S074/S075 | 4拍实音旋律C5 D5 E5 G5各1拍；长笛负责主线，普通B♭单簧管（非A管、低音或未知型号；具体型号未核）复制实音时写D5 E5 F♯5 A5；大提琴另奏C3持续4拍（各演奏者范围题定已确认）。 | 同度或八度配器不是必然融合、也非必然更响；真实音色和听评未知。 |
| K03.07.02.03 | [AR31](arrangement-r2-knowledge-cases.md#L26) | S340/S348 | 两个4拍段落共享M=C5 D5 E5 G5各1拍；第一段C3/E3/G3同时起音并持续4拍，第二段仍C和弦但改C4/G4/E4/G4在0/1/2/3拍各1拍；最高背景音由G3升至G4，仍低于主线最低C5（分别17/5半音），背景音区及同时发声数亦改变。保持主题/和声，改变伴奏音区、节奏及织体，背景起音3→4（按音符计）。 | 没有听评，不能断言对比更好或更明显。 |
| K13.05.01.03 | [LA01](localization-r1-knowledge-cases.md#L5) | S553/S137 | Unicode17.0 §16.3.1 Myanmar U+1000与U+1031组成的序列 ကေ；e符号编码在辅音后、显示在前。2个码点不等2个音节或两个音符。书写、音节、音素、词、实际发音分别标注；同一Myanmar文字也用于不同语言。 NFC反例：原始1000 103A 1037与1000 1037 103A在Unicode规范化下等价，原始ID/码点span仍不同，须记录映射；视觉前置1031与标准逻辑顺序非自动等价。U+200B仅断行线索，不是词身份；词典ID、语言/方言和查找结果独立，未知不猜。 | 仅编码示例，不判实际歌词发音；Unicode正字法非歌唱规则。 |
| K13.06.02.03 | [LA05](localization-r1-knowledge-cases.md#L9) | S555/S556 | 四拍120BPM、音符时值[1,1,1,1]拍共2秒；题设词音节s1/s2/s3映射n1/n2/(n3,n4)，一音节可跨两音符（melisma），不必强求四音节。若第三音节要求短闭合且该配法拖长，应作为风险重新候选。 另设独立对照（不是前述2秒例）：同为3音节4音符，固定每音符时长.25s及休止区间[1,1.25)，候选s1→n1+n2或s1→n1使首音节.5/.25s；其余按题设s2→n3或n2+n3、s3→n4，词边界策略显式固定。计数一致不等分组/时值一致。 | 不指定真实缅语发声或可延长音素，具体由语言/歌唱证据核验。 |
| K13.08.03.03 | [LA10](localization-r1-knowledge-cases.md#L14) | S550/S551/S555/S554 | 语种能力限定：K12具体DiffSinger Opencpop B文档为中文词谱，MusicGen Melody卡英文描述及真实歌声限制；都不是缅语歌唱实测。假设评估A语言90例正确81，B语言10例正确3，整体84%，B仅30%。 | 合成数值非真实基准；K13负责适配结论，不重复模型能力或评价方法。 |
| K13.08.01.03 | [LA08](localization-r1-knowledge-cases.md#L12) | S555/S554 | 题设听者组A熟悉目标语言及曲种、组B熟悉语言不熟曲种；同一候选A组理解8/10、B组6/10，不能仅归因为发音。语义辨识、自然度/文化适合、喜好及技术质量分开。 听者音频独立词识别与知晓目标词的表演者自评、文字辅助理解分别登记条件及分母。即使同刺激同群体，后两者不能充当独立音频识别；缺独立音频观察则该指标UNKNOWN，不把反应数当独立受试数。 | 数字为合成组计数，不是缅语人群结果或显著性。 |
| K13.08.02.03 | [LA09](localization-r1-knowledge-cases.md#L13) | S555/S144 | 目标合同仅保留语义核心M与旋律N，允许韵脚取舍；候选A保留M/N且不同押韵，B押韵好但将肯定改否定。A可能为许可变体，B是硬项错误；不同听者对A偏好分歧可并存。 | 原创抽象例，不评现实文化真实性。 |
| K12.04.01.04 | [TO37](tools-orchestration-r2-knowledge-cases.md#L14) | S548/S549/S542/S552 | SMF1.0 metrical PPQ480，delta[0,480,240]累计ticks[0,480,720]，前480 ticks tempo500000us/qn，后240 ticks tempo1000000us/qn，总1s。SMPTE25fps×40ticks/frame=1000ticks/s，480ticks=.48s。SMF1.0缺tempo默认120；未知来源的非SMF数值不套默认。MEI5.1 §14.5.3 dur.ges/pnum记录演奏信息而非全谱。 format1各track delta独立累积后同轴，format2独立pattern，-29为30 drop非29fps，见[RV02](tools-orchestration-r6-review-remediation.md#L17)。 | SMF镜像PDF正文定位，MEI5.1章节；非解析实测。 |
| K05.01.01.03 | [VS01](vocal-science-r1-knowledge-cases.md#L5) | S045/S046/S403 | 给定普通有声元音模型：肺/呼吸肌提供气动能量，喉内声带振动调制声门气流，咽口鼻声道改变输出频谱；声门是两声带之间的开口。 | 不能凭声音确定声带组织形态或疾病。 |
| K05.04.02.05 | [VS41](vocal-science-r2-knowledge-cases.md#L15) | S408 | 合成不同条件：F0=300Hz、R1=600Hz，与F0=600Hz、R1=600Hz；共振分别近2F0和F0。相同R1并非相同歌声频谱；调谐策略需实际共振测量。 | 依已读S408，数值非真实样本。 |
| K06.05.02.03 | [VT16](vocal-training-r1-knowledge-cases.md#L20) | S048/S440/S436/S046 | 题设已确认舒适区间内的短句，两种互斥题设目标：相邻两音听感平滑衔接G-smooth，或经本人同意的舒适短句中有意可听音区标签/音色对比G-contrast；各自按同目标及独立听感证据比较，不把另一目标候选一概判错，允许教师选择不同候选；合成take A有明显突变，take B未报告突变但未听评，B仅平滑候选；另给已知合成听评的C清楚对比/D平滑，C符合G-contrast，D符合G-smooth，目标或听评缺失则UNKNOWN；有疼痛或不适则停止。 | 不提供具体发声肌肉动作、训练剂量或医学恢复。 |
| K18.01.01.01 | [SD01](sound-design-r1-knowledge-cases.md#L5) | S603 | 以基频200Hz与部分音400/600Hz、幅度.4/.2/.1构造加法候选；同相时峰值上界.7，不等实际峰值或响度。 | 有限理论，不声明渲染结果。 |
| K05.07.01.05 | [VS64](vocal-science-r3-knowledge-cases.md#L8) | S409/S413 | 题设目标200Hz，同一有效且身份匹配分析窗独立真实参考220Hz：估计220时估计误差0，真实音乐偏差+165.004 cents；估计200时估计误差−165.004、估计相对目标0，但真实音乐偏差仍+165.004。原参考200、估计198/202的−17.40/+17.23 cents仍成立。缺独立参考则真实音乐偏差和估计误差UNKNOWN，仅可在已知目标时报告估计相对目标；缺目标则仅在独立参考有效时报告估计误差。无声/置信不足/身份不符的窗不计算相关音分。 | 合成数值非实际音准、感知或健康标准；K01音程、K10评价另核。 |
| K06.03.03.04 | [VT39](vocal-training-r2-knowledge-cases.md#L13) | S409/S051 | 固定时基C、独立不可变事件n1@[0,500)、n2@[500,1000)，目标及独立参考200/220Hz。显示顺序n2:220、n1:200时，只有可信源ID、原时窗及同钟关联一致才可按n1/n2恢复顺序（误差0/0，原记录保留）。若可信n1确为220、n2确为200，即使标签有效仍为真实错位，禁止交换以提分；缺失/重复ID、时钟或连接证据不确定则UNKNOWN。 | 合成记录，不是自动对齐算法实测。 |
| K17.01.01.01 | [MC01](music-cognition-r1-knowledge-cases.md#L5) | S587/S588 | 外部事件t=[0,500,1000]ms，敲击r=[-20,490,980]ms，已配对同钟，异步r−t=[-20,-10,-20]ms，均值−16.67ms；负号表示提前。 | 合成时间戳非听觉或运动诊断。 |
| K07.02.03.03 | [AC08](acoustics-r1-knowledge-cases.md#L12) | S031/S455/S467/S468 | 孤立脉冲I=[0,1,0,0,0,0,0,0]为确定性局部事件，DFT幅度各1；周期模型P=[1,0,-1,0,1,0,-1,0]为四样本周期截段；独立等概率±1的WSS噪声模型N，期望归一化周期图各1但有限实现未必平坦；见R5 RV01枚举。 | 单段有限序列不能证明随机性或平稳性；周期音也可能是任务不需要的噪声。未播放。 |
| K08.03.02.03 | [DA08](digital-audio-r1-knowledge-cases.md#L12) | S474/S457 | 同一合成信号、48kHz、相同窗族、hop=240与对齐，win480/960、共同nfft960分别10/20ms观察窗，同为50Hz格点和481个单边复谱格点；固定win480、nfft960→1920仅格点50→25Hz、481→961，观察窗仍10ms。实际分辨能力还依窗响应、边界及信号平稳性，不由零填充保证。 | 固定文档语义与数学，不是运行librosa。 |
| K08.02.01.03 | [DA04](digital-audio-r1-knowledge-cases.md#L8) | S471/S472 | 48kHz双声道一秒48000帧，紧密16位PCM=192000字节，24位=288000（1.5倍），20有效位存24位容器仍288000，不是240000；头部/chunk/压缩大小另计；FLAC无损编码的是输入PCM样本，压缩后大小依数据。先有损解码为PCM再FLAC只保留该解码结果。 | 未编码/解码实际文件，不保证实现支持全部RFC范围。 |
| K08.08.02.03 | [DA23](digital-audio-r1-knowledge-cases.md#L27) | S064/S467 | 题设目标s=[1,0]、干扰n=[0,1]，估计A=[.8,.2]同时有目标衰减及泄漏；B=[0,0]无泄漏但目标完全丢失；额外不在源线性组合中的分量需独立定义伪影。 | 二维合成向量仅说明关系，非实际BSS指标。 |
| K08.09.03.03 | [DA27](digital-audio-r1-knowledge-cases.md#L31) | S066/S061 | 限定S066 PortAudio状态位：paInputUnderflow在不同frame策略下表示插入零或输入全零，paInputOverflow为输入丢弃；paOutputOverflow为无空间而输出丢弃，paOutputUnderflow为输出缺供/插入；primingOutput独立启动状态。状态可同时出现，记录版本、方向、时间、bitmask、固定/未指定frame策略；不推出确切丢失位置、数量或根因。 | 只读API文档和合成事件；未运行PortAudio。 |

## 读取Blob
- musicology-r1-knowledge-cases.md: 07a9b17691f84f5abac60e401988ca61fd26ede7
- evaluation-r1-knowledge-cases.md: 07f9efe872ae70233fa64c8bfb8658f12c221bb0
- arrangement-r2-knowledge-cases.md: 1b1af7b3f536a2c637e548e55f514f7c5d80cab4
- localization-r1-knowledge-cases.md: f812393bbed00272695fd9f8cffca95ed6ba259f
- tools-orchestration-r2-knowledge-cases.md: 4edf64cd597ce075b40a2f4bfc05c99cec50f6ca
- vocal-science-r1-knowledge-cases.md: 974befc27cce10d0f6fb87ed8a7e7dfa13852dcb
- vocal-science-r2-knowledge-cases.md: 7c28a54003d1f559aeac5926b72370b30f61cf59
- vocal-training-r1-knowledge-cases.md: beb706a2fc6b679d92532bfa0f05fabdecd4b785
- sound-design-r1-knowledge-cases.md: c8ba52f0b732d00db07d7b5cdbb36e95456b8ab3
- vocal-science-r3-knowledge-cases.md: 08208a28e1ea95edb2ec83210e97542c3623298b
- vocal-training-r2-knowledge-cases.md: 9136336063ddb0b0a408f4ee5036500b8d593e2f
- music-cognition-r1-knowledge-cases.md: f5bd5f0b4957303f19f2eb757f8b80dbb2031553
- acoustics-r1-knowledge-cases.md: 31f1c0894f1491ef52ee5530c6892fc4bca7a4ae
- digital-audio-r1-knowledge-cases.md: de9a96646714c5d3ffa372d81c085981c2f96aa5
