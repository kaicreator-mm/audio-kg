# K09 R3 历史需求收敛及迁移保留
原[库存](../production-evaluation/fine-grained-production-evaluation.md)54旧槽文字/ID/次序保持；48活跃槽24路由/24限定组合；6历史现场槽原D24 SPLIT_OPEN，引用[迁移账本](domain-migration-implementation.md)，无新增K09.07权威D4、不关闭迁移、不以引用代替目标域证据。不是已接受主张。
| 原D4 | 原需求 | 处置 | 精确入口 | 限定 |
|---|---|---|---|---|
| K09.01.01.01 | 区分工程、轨道、总线、region、素材及渲染产物 | ROUTER_CANDIDATE | [MP01/K09.01.01.03](production-r1-knowledge-cases.md#L5)；[MP25/K09.01.01.04](production-r2-knowledge-cases.md#L5) | 工程/轨/总线/region/素材/渲染身份及引用 |
| K09.01.01.02 | 记录稳定对象ID、素材路径、时间基准及依赖 | BOUNDED_COMPOSITION | [MP01/K09.01.01.03](production-r1-knowledge-cases.md#L5)；[MP25/K09.01.01.04](production-r2-knowledge-cases.md#L5) | 稳定ID与内容、源/工程偏移、依赖和报告版本 |
| K09.01.02.01 | 区分轨道输入输出、发送、返回及处理顺序 | ROUTER_CANDIDATE | [MP02/K09.01.02.03](production-r1-knowledge-cases.md#L6)；[MP26/K09.01.02.04](production-r2-knowledge-cases.md#L6) | 主路径、tap/发送/返回/侧链及处理顺序 |
| K09.01.02.02 | 验证通道类型、侧链及路由变化的影响范围 | BOUNDED_COMPOSITION | [MP02/K09.01.02.03](production-r1-knowledge-cases.md#L6)；[MP26/K09.01.02.04](production-r2-knowledge-cases.md#L6) | 前后置发送、通道端口、控制信号与后继影响 |
| K09.01.03.01 | 区分保存、快照、独立备份与渲染 | ROUTER_CANDIDATE | [MP03/K09.01.03.03](production-r1-knowledge-cases.md#L7)；[MP27/K09.01.03.04](production-r2-knowledge-cases.md#L7) | 保存/快照/独立备份/渲染分别 |
| K09.01.03.02 | 定义共享素材、版本基线及派生产物失效 | BOUNDED_COMPOSITION | [MP03/K09.01.03.03](production-r1-knowledge-cases.md#L7)；[MP27/K09.01.03.04](production-r2-knowledge-cases.md#L7) | 共享/外部/未用素材、历史、精度与派生失效 |
| K09.02.01.01 | 区分非破坏性region操作与样本重写 | ROUTER_CANDIDATE | [MP04/K09.02.01.03](production-r1-knowledge-cases.md#L8)；[MP28/K09.02.01.04](production-r2-knowledge-cases.md#L8) | 非破坏region区间与MIDI内容写入区别 |
| K09.02.01.02 | 记录剪辑范围、淡入淡出及边界连续性 | BOUNDED_COMPOSITION | [MP04/K09.02.01.03](production-r1-knowledge-cases.md#L8)；[MP28/K09.02.01.04](production-r2-knowledge-cases.md#L8) | 源和工程区间、交叉淡化/相位/保护边界 |
| K09.02.02.01 | 区分音频时长、MIDI事件、拍位置和绝对时间 | ROUTER_CANDIDATE | [MP05/K09.02.02.03](production-r1-knowledge-cases.md#L9)；[MP29/K09.02.02.04](production-r2-knowledge-cases.md#L9) | 拍/绝对时间/音频锁定/事件与实际声学时间 |
| K09.02.02.02 | 定义对齐目标及速度变化对依赖的影响 | BOUNDED_COMPOSITION | [MP05/K09.02.02.03](production-r1-knowledge-cases.md#L9)；[MP29/K09.02.02.04](production-r2-knowledge-cases.md#L9) | 分段tempo、拉伸/延迟及下游事件身份 |
| K09.02.03.01 | 区分静态参数与随时间变化曲线 | ROUTER_CANDIDATE | [MP06/K09.02.03.03](production-r1-knowledge-cases.md#L10)；[MP30/K09.02.03.04](production-r2-knowledge-cases.md#L10) | 静态/线性/离散自动化与启用状态 |
| K09.02.03.02 | 核验插值、作用区间、渲染和参数保留 | BOUNDED_COMPOSITION | [MP06/K09.02.03.03](production-r1-knowledge-cases.md#L10)；[MP30/K09.02.03.04](production-r2-knowledge-cases.md#L10) | 全域曲线、边界、渲染及保护依赖 |
| K09.03.01.01 | 建立原始take、候选片段与合成轨之间的关系 | ROUTER_CANDIDATE | [MP07/K09.03.01.03](production-r1-knowledge-cases.md#L11)；[MP31/K09.03.01.04](production-r2-knowledge-cases.md#L11) | 原take/选段/comp身份与映射 |
| K09.03.01.02 | 记录拼接与选段依据及原始素材保留 | BOUNDED_COMPOSITION | [MP07/K09.03.01.03](production-r1-knowledge-cases.md#L11)；[MP31/K09.03.01.04](production-r2-knowledge-cases.md#L11) | 源偏移、选段依据、重叠及表现连续性 |
| K09.03.02.01 | 区分参考音高、实际演唱、修音目标与艺术变化 | ROUTER_CANDIDATE | [MP08/K09.03.02.03](production-r1-knowledge-cases.md#L12)；[MP32/K09.03.02.04](production-r2-knowledge-cases.md#L12) | 参考/检测/原唱/音高时值及和声目标 |
| K09.03.02.02 | 记录修音区间、保持项及伪影验证 | BOUNDED_COMPOSITION | [MP08/K09.03.02.03](production-r1-knowledge-cases.md#L12)；[MP32/K09.03.02.04](production-r2-knowledge-cases.md#L12) | 中心/颤音/滑音/连接/辅音/共振峰及局部目标和伪影 |
| K09.03.03.01 | 区分齿音处理、均衡、动态及原始发音 | ROUTER_CANDIDATE | [MP09/K09.03.03.03](production-r1-knowledge-cases.md#L13)；[MP33/K09.03.03.04](production-r2-knowledge-cases.md#L13) | 齿音事件、静态EQ与检测动态、原发音 |
| K09.03.03.02 | 按目标和信号条件选择并验证副作用 | BOUNDED_COMPOSITION | [MP09/K09.03.03.03](production-r1-knowledge-cases.md#L13)；[MP33/K09.03.03.04](production-r2-knowledge-cases.md#L13) | 条件触发/误检、时间/频带、非目标与实际听评 |
| K09.04.01.01 | 区分频谱处理与电平相关处理 | ROUTER_CANDIDATE | [MP10/K09.04.01.03](production-r1-knowledge-cases.md#L14)；[MP34/K09.04.01.04](production-r2-knowledge-cases.md#L14) | 频谱/电平相关映射分离 |
| K09.04.01.02 | 记录频带、阈值、比率、时间参数和条件 | BOUNDED_COMPOSITION | [MP10/K09.04.01.03](production-r1-knowledge-cases.md#L14)；[MP34/K09.04.01.04](production-r2-knowledge-cases.md#L14) | 静态阈值/比率/补偿与检测及时间参数 |
| K09.04.02.01 | 区分混响、延迟与干湿比例 | ROUTER_CANDIDATE | [MP11/K09.04.02.03](production-r1-knowledge-cases.md#L15)；[MP35/K09.04.02.04](production-r2-knowledge-cases.md#L15) | 直接声、延迟/混响/预延迟/干湿 |
| K09.04.02.02 | 记录尾音、声道、同步和相位影响 | BOUNDED_COMPOSITION | [MP11/K09.04.02.03](production-r1-knowledge-cases.md#L15)；[MP35/K09.04.02.04](production-r2-knowledge-cases.md#L15) | 同步节拍、反馈尾/声道/相位及导出 |
| K09.04.03.01 | 记录效果有序组合、处理节点及侧链信号 | ROUTER_CANDIDATE | [MP12/K09.04.03.03](production-r1-knowledge-cases.md#L16)；[MP36/K09.04.03.04](production-r2-knowledge-cases.md#L16) | 有序效果/主与侧链控制信号 |
| K09.04.03.02 | 检查重排对电平、延迟及声道布局的影响 | BOUNDED_COMPOSITION | [MP12/K09.04.03.03](production-r1-knowledge-cases.md#L16)；[MP36/K09.04.03.04](production-r2-knowledge-cases.md#L16) | 处理顺序、延迟补偿、控制路由和依赖影响 |
| K09.05.01.01 | 区分配器层次、轨道电平及频谱遮蔽 | ROUTER_CANDIDATE | [MP13/K09.05.01.03](production-r1-knowledge-cases.md#L17)；[MP37/K09.05.01.04](production-r2-knowledge-cases.md#L17) | 电平、配器、掩蔽、监听条件 |
| K09.05.01.02 | 根据参考与目标选择增益/配器等候选 | BOUNDED_COMPOSITION | [MP13/K09.05.01.03](production-r1-knowledge-cases.md#L17)；[MP37/K09.05.01.04](production-r2-knowledge-cases.md#L17) | 独立候选改变不同字段，实际感知和授权另证 |
| K09.05.02.01 | 区分声像、声道布局、总线路由和空间效果 | ROUTER_CANDIDATE | [MP14/K09.05.02.03](production-r1-knowledge-cases.md#L18)；[MP38/K09.05.02.04](production-r2-knowledge-cases.md#L18) | 声像、balance、声道、总线和空间效果 |
| K09.05.02.02 | 记录监听条件及单声道兼容需求 | BOUNDED_COMPOSITION | [MP14/K09.05.02.03](production-r1-knowledge-cases.md#L18)；[MP38/K09.05.02.04](production-r2-knowledge-cases.md#L18) | pan law、相位/下混、监听条件及兼容目标 |
| K09.05.03.01 | 区别静态平衡、局部动态及总线处理 | ROUTER_CANDIDATE | [MP15/K09.05.03.03](production-r1-knowledge-cases.md#L19)；[MP39/K09.05.03.04](production-r2-knowledge-cases.md#L19) | 静态增益/局部曲线/总线动态 |
| K09.05.03.02 | 核验关键段落的自动化曲线和混音变化 | BOUNDED_COMPOSITION | [MP15/K09.05.03.03](production-r1-knowledge-cases.md#L19)；[MP39/K09.05.03.04](production-r2-knowledge-cases.md#L19) | 区间外和未编辑轨派生影响、下游保护 |
| K09.06.01.01 | 区分节目综合响度、真峰值、样本峰值及LRA | ROUTER_CANDIDATE | [MP16/K09.06.01.03](production-r1-knowledge-cases.md#L20)；[MP40/K09.06.01.04](production-r2-knowledge-cases.md#L20) | 综合响度/样本峰/真峰/LRA及算法差异 |
| K09.06.01.02 | 记录测量算法、版本、单位和条件 | BOUNDED_COMPOSITION | [MP16/K09.06.01.03](production-r1-knowledge-cases.md#L20)；[MP40/K09.06.01.04](production-r2-knowledge-cases.md#L20) | 版本、门控、布局、单位、容差/例外及报告 |
| K09.06.02.01 | 区分母带处理、格式转换和播放归一化 | ROUTER_CANDIDATE | [MP17/K09.06.02.03](production-r1-knowledge-cases.md#L21)；[MP41/K09.06.02.04](production-r2-knowledge-cases.md#L21) | 母带动态/格式转换/播放归一化区分 |
| K09.06.02.02 | 记录限制器、编码及峰值复测条件 | BOUNDED_COMPOSITION | [MP17/K09.06.02.03](production-r1-knowledge-cases.md#L21)；[MP41/K09.06.02.04](production-r2-knowledge-cases.md#L21) | 输出独立报告、编码峰值复测与实际增益 |
| K09.06.03.01 | 区分广播标准、平台说明及用户约束 | ROUTER_CANDIDATE | [MP18/K09.06.03.03](production-r1-knowledge-cases.md#L22)；[MP42/K09.06.03.04](production-r2-knowledge-cases.md#L22) | 广播/平台播放/客户交付条件分离；[MP40](production-r2-knowledge-cases.md#L20) 仪表容差不放宽交付上限 |
| K09.06.03.02 | 核对适用版本、渠道与交付要求 | BOUNDED_COMPOSITION | [MP18/K09.06.03.03](production-r1-knowledge-cases.md#L22)；[MP42/K09.06.03.04](production-r2-knowledge-cases.md#L22) | 版本/节目类型/渠道/冲突及验收条件；[MP40](production-r2-knowledge-cases.md#L20) R128及BS.1770限定门控，其他规范另查 |
| K09.07.01.01 | 识别扬声器到拾音器的声学反馈环路 | SPLIT_OPEN | [K09.07.01.01](domain-migration-implementation.md#L53) | K07.06/K07.07=物理传播与测量；K19.07=现场反馈路径诊断；K08.04 REF通用路由；原槽开放，K19/目标域证据及审核待后续，不算K09活跃覆盖。 |
| K09.07.01.02 | 区分增益、布置与电气噪声候选 | SPLIT_OPEN | [K09.07.01.02](domain-migration-implementation.md#L54) | K19.07=现场候选及处置；K08.04/K08.05=通用增益拾音；K07.06 REF环境；K15.04 REF安全门禁；原槽开放，K19/目标域证据及审核待后续，不算K09活跃覆盖。 |
| K09.07.02.01 | 区分主扩声、舞台监听、总线及发送 | SPLIT_OPEN | [K09.07.02.01](domain-migration-implementation.md#L55) | K19.05=现场主扩声与舞台监听；K08.04=通用路由；K04.06=音乐协作监听目标；K12.01 REF具体宿主；原槽开放，K19/目标域证据及审核待后续，不算K09活跃覆盖。 |
| K09.07.02.02 | 在权限与安全边界下核对路由及电平 | SPLIT_OPEN | [K09.07.02.02](domain-migration-implementation.md#L56) | K19.03=现场安全核对；K15.01/K15.04=权限与验收责任；K07.08=听音安全；K12.06 REF工具权限；原槽开放，K19/目标域证据及审核待后续，不算K09活跃覆盖。 |
| K09.07.03.01 | 区分声场覆盖、清晰度、听音暴露及稳定性 | SPLIT_OPEN | [K09.07.03.01](domain-migration-implementation.md#L57) | K19.04=场地覆盖清晰度稳定性验收；K07.06/K07.07/K07.08=传播测量与暴露条件；K10.07 REF音质评价；原槽开放，K19/目标域证据及审核待后续，不算K09活跃覆盖。 |
| K09.07.03.02 | 按场地约束和安全条件复核修正 | SPLIT_OPEN | [K09.07.03.02](domain-migration-implementation.md#L58) | K19.09=现场停止复测和安全修订；K15.04=治理放行责任；K07.08 REF安全依据；原槽开放，K19/目标域证据及审核待后续，不算K09活跃覆盖。 |
| K09.08.01.01 | 区分立体声成品、处理后stem、原始分轨及可编辑工程 | ROUTER_CANDIDATE | [MP19/K09.08.01.03](production-r1-knowledge-cases.md#L23)；[MP43/K09.08.01.04](production-r2-knowledge-cases.md#L23) | 成品/处理stem/原始分轨/工程能力层级 |
| K09.08.01.02 | 按任务定义每类产物可编辑能力及损失 | BOUNDED_COMPOSITION | [MP19/K09.08.01.03](production-r1-knowledge-cases.md#L23)；[MP43/K09.08.01.04](production-r2-knowledge-cases.md#L23) | 客户修改目标及原始依赖/可编辑性/损失 |
| K09.08.02.01 | 统一起点、时基、采样率、声道及导出区间 | ROUTER_CANDIDATE | [MP20/K09.08.02.03](production-r1-knowledge-cases.md#L24)；[MP44/K09.08.02.04](production-r2-knowledge-cases.md#L24) | 共同起点、时基/声道/区间与事件 |
| K09.08.02.02 | 记录导出是否应用轨道/总线处理及尾音 | BOUNDED_COMPOSITION | [MP20/K09.08.02.03](production-r1-knowledge-cases.md#L24)；[MP44/K09.08.02.04](production-r2-knowledge-cases.md#L24) | 前导静音、尾音、处理/总线及补偿条件 |
| K09.08.03.01 | 记录工程、素材、插件版本、配置和授权 | ROUTER_CANDIDATE | [MP21/K09.08.03.03](production-r1-knowledge-cases.md#L25)；[MP45/K09.08.03.04](production-r2-knowledge-cases.md#L25) | 工程/媒体/插件/参数/授权依赖 |
| K09.08.03.02 | 定义独立重开及重渲染的验收要求 | BOUNDED_COMPOSITION | [MP21/K09.08.03.03](production-r1-knowledge-cases.md#L25)；[MP45/K09.08.03.04](production-r2-knowledge-cases.md#L25) | 独立重开/渲染和降级条件，验收容差与失败 |
| K09.09.01.01 | 保存原始素材与独立候选、修改范围 | ROUTER_CANDIDATE | [MP22/K09.09.01.03](production-r1-knowledge-cases.md#L26)；[MP46/K09.09.01.04](production-r2-knowledge-cases.md#L26) | 原始只读/独立候选及局部范围 |
| K09.09.01.02 | 核验共享数据及原件保护 | BOUNDED_COMPOSITION | [MP22/K09.09.01.03](production-r1-knowledge-cases.md#L26)；[MP46/K09.09.01.04](production-r2-knowledge-cases.md#L26) | 共享源保护、依赖与授权版本、备份 |
| K09.09.02.01 | 控制听音条件并检查改动外的保护区 | ROUTER_CANDIDATE | [MP23/K09.09.02.03](production-r1-knowledge-cases.md#L27)；[MP47/K09.09.02.04](production-r2-knowledge-cases.md#L27) | 受控增益/听音与保护区评价；[MP30](production-r2-knowledge-cases.md#L10) 区外线性/离散反例为局部保护前置 |
| K09.09.02.02 | 记录客观指标及人类偏好、复测结果 | BOUNDED_COMPOSITION | [MP23/K09.09.02.03](production-r1-knowledge-cases.md#L27)；[MP47/K09.09.02.04](production-r2-knowledge-cases.md#L27) | 客观与主观报告独立，增益数学非实际等响 |
| K09.09.03.01 | 定义局部修订验收、回滚及失败停止条件 | ROUTER_CANDIDATE | [MP24/K09.09.03.03](production-r1-knowledge-cases.md#L28)；[MP48/K09.09.03.04](production-r2-knowledge-cases.md#L28) | 采纳/拒绝/回滚/停止状态；[XC01-R2](g04-r7-xc01-protection-remediation.md) 新报告不绕过实际内容/区外保护 |
| K09.09.03.02 | 保存原因、结果、依赖失效和人工确认 | BOUNDED_COMPOSITION | [MP24/K09.09.03.03](production-r1-knowledge-cases.md#L28)；[MP48/K09.09.03.04](production-r2-knowledge-cases.md#L28) | 依赖失效、失败证据、人工确认和撤回停止；[MP30](production-r2-knowledge-cases.md#L10) 回执须绑定实际曲线、模式、单位、时间域和版本 |

## 24活跃限定组合
- K09.01.01.02：SUFFICIENT_SCOPED_CANDIDATE；稳定ID与内容、源/工程偏移、依赖和报告版本。[MP01/K09.01.01.03](production-r1-knowledge-cases.md#L5)；[MP25/K09.01.01.04](production-r2-knowledge-cases.md#L5)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.01.02.02：SUFFICIENT_SCOPED_CANDIDATE；前后置发送、通道端口、控制信号与后继影响。[MP02/K09.01.02.03](production-r1-knowledge-cases.md#L6)；[MP26/K09.01.02.04](production-r2-knowledge-cases.md#L6)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.01.03.02：SUFFICIENT_SCOPED_CANDIDATE；共享/外部/未用素材、历史、精度与派生失效。[MP03/K09.01.03.03](production-r1-knowledge-cases.md#L7)；[MP27/K09.01.03.04](production-r2-knowledge-cases.md#L7)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.02.01.02：SUFFICIENT_SCOPED_CANDIDATE；源和工程区间、交叉淡化/相位/保护边界。[MP04/K09.02.01.03](production-r1-knowledge-cases.md#L8)；[MP28/K09.02.01.04](production-r2-knowledge-cases.md#L8)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.02.02.02：SUFFICIENT_SCOPED_CANDIDATE；分段tempo、拉伸/延迟及下游事件身份。[MP05/K09.02.02.03](production-r1-knowledge-cases.md#L9)；[MP29/K09.02.02.04](production-r2-knowledge-cases.md#L9)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.02.03.02：SUFFICIENT_SCOPED_CANDIDATE；全域曲线、边界、渲染及保护依赖。[MP06/K09.02.03.03](production-r1-knowledge-cases.md#L10)；[MP30/K09.02.03.04](production-r2-knowledge-cases.md#L10)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.03.01.02：SUFFICIENT_SCOPED_CANDIDATE；源偏移、选段依据、重叠及表现连续性。[MP07/K09.03.01.03](production-r1-knowledge-cases.md#L11)；[MP31/K09.03.01.04](production-r2-knowledge-cases.md#L11)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.03.02.02：SUFFICIENT_SCOPED_CANDIDATE；中心/颤音/滑音/连接/辅音/共振峰及局部目标和伪影。[MP08/K09.03.02.03](production-r1-knowledge-cases.md#L12)；[MP32/K09.03.02.04](production-r2-knowledge-cases.md#L12)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.03.03.02：SUFFICIENT_SCOPED_CANDIDATE；条件触发/误检、时间/频带、非目标与实际听评。[MP09/K09.03.03.03](production-r1-knowledge-cases.md#L13)；[MP33/K09.03.03.04](production-r2-knowledge-cases.md#L13)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.04.01.02：SUFFICIENT_SCOPED_CANDIDATE；静态阈值/比率/补偿与检测及时间参数。[MP10/K09.04.01.03](production-r1-knowledge-cases.md#L14)；[MP34/K09.04.01.04](production-r2-knowledge-cases.md#L14)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.04.02.02：SUFFICIENT_SCOPED_CANDIDATE；同步节拍、反馈尾/声道/相位及导出。[MP11/K09.04.02.03](production-r1-knowledge-cases.md#L15)；[MP35/K09.04.02.04](production-r2-knowledge-cases.md#L15)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.04.03.02：SUFFICIENT_SCOPED_CANDIDATE；处理顺序、延迟补偿、控制路由和依赖影响。[MP12/K09.04.03.03](production-r1-knowledge-cases.md#L16)；[MP36/K09.04.03.04](production-r2-knowledge-cases.md#L16)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.05.01.02：SUFFICIENT_SCOPED_CANDIDATE；独立候选改变不同字段，实际感知和授权另证。[MP13/K09.05.01.03](production-r1-knowledge-cases.md#L17)；[MP37/K09.05.01.04](production-r2-knowledge-cases.md#L17)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.05.02.02：SUFFICIENT_SCOPED_CANDIDATE；pan law、相位/下混、监听条件及兼容目标。[MP14/K09.05.02.03](production-r1-knowledge-cases.md#L18)；[MP38/K09.05.02.04](production-r2-knowledge-cases.md#L18)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.05.03.02：SUFFICIENT_SCOPED_CANDIDATE；区间外和未编辑轨派生影响、下游保护。[MP15/K09.05.03.03](production-r1-knowledge-cases.md#L19)；[MP39/K09.05.03.04](production-r2-knowledge-cases.md#L19)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.06.01.02：SUFFICIENT_SCOPED_CANDIDATE；版本、门控、布局、单位、容差/例外及报告。[MP16/K09.06.01.03](production-r1-knowledge-cases.md#L20)；[MP40/K09.06.01.04](production-r2-knowledge-cases.md#L20)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.06.02.02：SUFFICIENT_SCOPED_CANDIDATE；输出独立报告、编码峰值复测与实际增益。[MP17/K09.06.02.03](production-r1-knowledge-cases.md#L21)；[MP41/K09.06.02.04](production-r2-knowledge-cases.md#L21)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.06.03.02：SUFFICIENT_SCOPED_CANDIDATE；版本/节目类型/渠道/冲突及验收条件。[MP18/K09.06.03.03](production-r1-knowledge-cases.md#L22)；[MP42/K09.06.03.04](production-r2-knowledge-cases.md#L22)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.08.01.02：SUFFICIENT_SCOPED_CANDIDATE；客户修改目标及原始依赖/可编辑性/损失。[MP19/K09.08.01.03](production-r1-knowledge-cases.md#L23)；[MP43/K09.08.01.04](production-r2-knowledge-cases.md#L23)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.08.02.02：SUFFICIENT_SCOPED_CANDIDATE；前导静音、尾音、处理/总线及补偿条件。[MP20/K09.08.02.03](production-r1-knowledge-cases.md#L24)；[MP44/K09.08.02.04](production-r2-knowledge-cases.md#L24)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.08.03.02：SUFFICIENT_SCOPED_CANDIDATE；独立重开/渲染和降级条件，验收容差与失败。[MP21/K09.08.03.03](production-r1-knowledge-cases.md#L25)；[MP45/K09.08.03.04](production-r2-knowledge-cases.md#L25)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.09.01.02：SUFFICIENT_SCOPED_CANDIDATE；共享源保护、依赖与授权版本、备份。[MP22/K09.09.01.03](production-r1-knowledge-cases.md#L26)；[MP46/K09.09.01.04](production-r2-knowledge-cases.md#L26)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.09.02.02：SUFFICIENT_SCOPED_CANDIDATE；客观与主观报告独立，增益数学非实际等响。[MP23/K09.09.02.03](production-r1-knowledge-cases.md#L27)；[MP47/K09.09.02.04](production-r2-knowledge-cases.md#L27)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。
- K09.09.03.02：SUFFICIENT_SCOPED_CANDIDATE；依赖失效、失败证据、人工确认和撤回停止。[MP24/K09.09.03.03](production-r1-knowledge-cases.md#L28)；[MP48/K09.09.03.04](production-r2-knowledge-cases.md#L28)。仅题设与来源限定，不是实际工程、工具、听评或权限验证。

组合补证：[PX01](production-r4-integrated-closure.md#L5) K09.01–03；[PX02](production-r4-integrated-closure.md#L6) K09.03–06；[KC-P09](production-r4-integrated-closure.md#L7) K09.01–06/.08–09；不新增主D4、旧槽或关闭迁移。