# K08 R3 54历史需求收敛
原[库存](../vocal-digital/fine-grained-vocal-digital.md)原ID/文字/次序保持；27路由/27限定组合，非同义、非已接受主张。具体方法/证据见各主案例。K07/09/10/11/12/15/19边界保留。
| 原D4 | 原需求 | 处置候选 | 精确入口 | 限定 |
|---|---|---|---|---|
| K08.01.01.01 | 采样率与带宽 | ROUTER_CANDIDATE | [DA01/K08.01.01.03](digital-audio-r1-knowledge-cases.md#L5)；[DA28/K08.01.01.04](digital-audio-r2-knowledge-cases.md#L5) | 采样频率、Nyquist与真实带宽，严格带限条件 |
| K08.01.01.02 | 抗混叠及信息损失 | BOUNDED_COMPOSITION | [DA01/K08.01.01.03](digital-audio-r1-knowledge-cases.md#L5)；[DA28/K08.01.01.04](digital-audio-r2-knowledge-cases.md#L5) | 直接抽取的混叠多解及滤波先于抽取，不能恢复旧损失 |
| K08.01.02.01 | 离散时间与离散幅度 | ROUTER_CANDIDATE | [DA02/K08.01.02.03](digital-audio-r1-knowledge-cases.md#L6)；[DA29/K08.01.02.04](digital-audio-r2-knowledge-cases.md#L6) | 时间离散、幅度离散及明确量化映射 |
| K08.01.02.02 | 整数浮点及量化误差 | BOUNDED_COMPOSITION | [DA02/K08.01.02.03](digital-audio-r1-knowledge-cases.md#L6)；[DA29/K08.01.02.04](digital-audio-r2-knowledge-cases.md#L6) | 整数/浮点/有效位深与量化误差、非减法扰动并非普遍无偏 |
| K08.01.03.01 | 声道布局帧采样时钟 | ROUTER_CANDIDATE | [DA03/K08.01.03.03](digital-audio-r1-knowledge-cases.md#L7)；[DA30/K08.01.03.04](digital-audio-r2-knowledge-cases.md#L7) | 帧、声道位置与采样时钟分离 |
| K08.01.03.02 | 时钟差异与同步 | BOUNDED_COMPOSITION | [DA03/K08.01.03.03](digital-audio-r1-knowledge-cases.md#L7)；[DA30/K08.01.03.04](digital-audio-r2-knowledge-cases.md#L7) | 时钟差异、独立事件/布局、同标称速率非同步 |
| K08.02.01.01 | PCM无损有损区别 | ROUTER_CANDIDATE | [DA04/K08.02.01.03](digital-audio-r1-knowledge-cases.md#L8)；[DA31/K08.02.01.04](digital-audio-r2-knowledge-cases.md#L8) | PCM样本表示与无损/有损编码分离 |
| K08.02.01.02 | 编码参数与转码限制 | BOUNDED_COMPOSITION | [DA04/K08.02.01.03](digital-audio-r1-knowledge-cases.md#L8)；[DA31/K08.02.01.04](digital-audio-r2-knowledge-cases.md#L8) | 逐样本等价、参数/元数据、既往有损损失不恢复 |
| K08.02.02.01 | 容器流扩展名区别 | ROUTER_CANDIDATE | [DA05/K08.02.02.03](digital-audio-r1-knowledge-cases.md#L9)；[DA32/K08.02.02.04](digital-audio-r2-knowledge-cases.md#L9) | 容器、流、扩展名和有效位深各自独立 |
| K08.02.02.02 | 验证元数据与解码能力 | BOUNDED_COMPOSITION | [DA05/K08.02.02.03](digital-audio-r1-knowledge-cases.md#L9)；[DA32/K08.02.02.04](digital-audio-r2-knowledge-cases.md#L9) | RIFF边界、奇数填充、fmt/data、blockAlign和解码证据 |
| K08.02.03.01 | 重采样与重解释采样率区别 | ROUTER_CANDIDATE | [DA06/K08.02.03.03](digital-audio-r1-knowledge-cases.md#L10)；[DA33/K08.02.03.04](digital-audio-r2-knowledge-cases.md#L10) | 时长保持重采样与头部速率重解释 |
| K08.02.03.02 | 抗混叠声道映射条件 | BOUNDED_COMPOSITION | [DA06/K08.02.03.03](digital-audio-r1-knowledge-cases.md#L10)；[DA33/K08.02.03.04](digital-audio-r2-knowledge-cases.md#L10) | 比例、低通、边界、声道映射和延迟条件 |
| K08.03.01.01 | 响应与输入输出关系 | ROUTER_CANDIDATE | [DA07/K08.03.01.03](digital-audio-r1-knowledge-cases.md#L11)；[DA34/K08.03.01.04](digital-audio-r2-knowledge-cases.md#L11) | 有限卷积、冲激响应与输出长度 |
| K08.03.01.02 | 相位边界副作用 | BOUNDED_COMPOSITION | [DA07/K08.03.01.03](digital-audio-r1-knowledge-cases.md#L11)；[DA34/K08.03.01.04](digital-audio-r2-knowledge-cases.md#L11) | 循环卷积折叠、相位/边界/目标频带保护 |
| K08.03.02.01 | 全局变换与局部窗口 | ROUTER_CANDIDATE | [DA08/K08.03.02.03](digital-audio-r1-knowledge-cases.md#L12)；[DA35/K08.03.02.04](digital-audio-r2-knowledge-cases.md#L12) | 全局复谱与局部窗口/时间定位 |
| K08.03.02.02 | FFT长度窗长步幅单位 | BOUNDED_COMPOSITION | [DA08/K08.03.02.03](digital-audio-r1-knowledge-cases.md#L12)；[DA35/K08.03.02.04](digital-audio-r2-knowledge-cases.md#L12) | FFT长度、窗长、hop、单位、覆盖及NOLA逆变换 |
| K08.03.03.01 | 变速保调拉伸与变调区别 | ROUTER_CANDIDATE | [DA09/K08.03.03.03](digital-audio-r1-knowledge-cases.md#L13)；[DA36/K08.03.03.04](digital-audio-r2-knowledge-cases.md#L13) | 变速/保调/独立变调三目标 |
| K08.03.03.02 | 算法假设与伪影 | BOUNDED_COMPOSITION | [DA09/K08.03.03.03](digital-audio-r1-knowledge-cases.md#L13)；[DA36/K08.03.03.04](digital-audio-r2-knowledge-cases.md#L13) | 目标时间轴、F0、瞬态和多声道相位保护 |
| K08.04.01.01 | 输入增益路由输出 | ROUTER_CANDIDATE | [DA10/K08.04.01.03](digital-audio-r1-knowledge-cases.md#L14)；[DA37/K08.04.01.04](digital-audio-r2-knowledge-cases.md#L14) | 输入增益/路由/ADC/数字/输出监测点 |
| K08.04.01.02 | 模拟数字节点区别 | BOUNDED_COMPOSITION | [DA10/K08.04.01.03](digital-audio-r1-knowledge-cases.md#L14)；[DA37/K08.04.01.04](digital-audio-r2-knowledge-cases.md#L14) | 模拟过载与数字削波不同，后级增益不恢复上游 |
| K08.04.02.01 | 峰值平均值参考单位 | ROUTER_CANDIDATE | [DA11/K08.04.02.03](digital-audio-r1-knowledge-cases.md#L15)；[DA38/K08.04.02.04](digital-audio-r2-knowledge-cases.md#L15) | 样本峰、RMS、重建峰和满刻度参照 |
| K08.04.02.02 | 固定点浮点条件 | BOUNDED_COMPOSITION | [DA11/K08.04.02.03](digital-audio-r1-knowledge-cases.md#L15)；[DA38/K08.04.02.04](digital-audio-r2-knowledge-cases.md#L15) | 固定点范围、浮点中间余量及后级量程，真峰数学反例 |
| K08.04.03.01 | 通道及监测点 | ROUTER_CANDIDATE | [DA12/K08.04.03.03](digital-audio-r1-knowledge-cases.md#L16)；[DA39/K08.04.03.04](digital-audio-r2-knowledge-cases.md#L16) | 独立通道标记、矩阵及监测点 |
| K08.04.03.02 | 错误路由与增益故障 | BOUNDED_COMPOSITION | [DA12/K08.04.03.03](digital-audio-r1-knowledge-cases.md#L16)；[DA39/K08.04.03.04](digital-audio-r2-knowledge-cases.md#L16) | 极性抵消、交换/静音/增益故障候选，不唯一诊断 |
| K08.05.01.01 | 传感器与指向响应 | ROUTER_CANDIDATE | [DA13/K08.05.01.03](digital-audio-r1-knowledge-cases.md#L17)；[DA40/K08.05.01.04](digital-audio-r2-knowledge-cases.md#L17) | 传感器方向响应、全向/心形/8字极性 |
| K08.05.01.02 | 频率角度型号条件 | BOUNDED_COMPOSITION | [DA13/K08.05.01.03](digital-audio-r1-knowledge-cases.md#L17)；[DA40/K08.05.01.04](digital-audio-r2-knowledge-cases.md#L17) | 频率角度、实际型号、反射与相位证据 |
| K08.05.02.01 | 距离角度与近讲效应 | ROUTER_CANDIDATE | [DA14/K08.05.02.03](digital-audio-r1-knowledge-cases.md#L18)；[DA41/K08.05.02.04](digital-audio-r2-knowledge-cases.md#L18) | 距离与角度、近讲和自由场区别 |
| K08.05.02.02 | 空间与拾音条件 | BOUNDED_COMPOSITION | [DA14/K08.05.02.03](digital-audio-r1-knowledge-cases.md#L18)；[DA41/K08.05.02.04](digital-audio-r2-knowledge-cases.md#L18) | 源/房间/位置/链路单因素对照，真实拾音另证 |
| K08.05.03.01 | 环境声电气机械噪声 | ROUTER_CANDIDATE | [DA15/K08.05.03.03](digital-audio-r1-knowledge-cases.md#L19)；[DA42/K08.05.03.04](digital-audio-r2-knowledge-cases.md#L19) | 环境/机械/电气干扰与周期噪声候选 |
| K08.05.03.02 | 对照记录及试听 | BOUNDED_COMPOSITION | [DA15/K08.05.03.03](digital-audio-r1-knowledge-cases.md#L19)；[DA42/K08.05.03.04](digital-audio-r2-knowledge-cases.md#L19) | 独立环境/链路记录、目标保护，试听须授权安全 |
| K08.06.01.01 | 设备采样率声道电平 | ROUTER_CANDIDATE | [DA16/K08.06.01.03](digital-audio-r1-knowledge-cases.md#L20)；[DA43/K08.06.01.04](digital-audio-r2-knowledge-cases.md#L20) | 设备配置、声道速率、量程与帧边界 |
| K08.06.01.02 | 试录及监听状态 | BOUNDED_COMPOSITION | [DA16/K08.06.01.03](digital-audio-r1-knowledge-cases.md#L20)；[DA43/K08.06.01.04](digital-audio-r2-knowledge-cases.md#L20) | 启动/监听与实际文件写入验证分离 |
| K08.06.02.01 | 时间基准对齐延迟补偿 | ROUTER_CANDIDATE | [DA17/K08.06.02.03](digital-audio-r1-knowledge-cases.md#L21)；[DA44/K08.06.02.04](digital-audio-r2-knowledge-cases.md#L21) | 独立时基、偏移与漂移候选 |
| K08.06.02.02 | 时钟漂移候选 | BOUNDED_COMPOSITION | [DA17/K08.06.02.03](digital-audio-r1-knowledge-cases.md#L21)；[DA44/K08.06.02.04](digital-audio-r2-knowledge-cases.md#L21) | 多事件身份、三点残差及非线性/丢帧拒绝 |
| K08.06.03.01 | take原始素材及设置 | ROUTER_CANDIDATE | [DA18/K08.06.03.03](digital-audio-r1-knowledge-cases.md#L22)；[DA45/K08.06.03.04](digital-audio-r2-knowledge-cases.md#L22) | take原件、配置与故障记录 |
| K08.06.03.02 | 故障观测与修正证据 | BOUNDED_COMPOSITION | [DA18/K08.06.03.03](digital-audio-r1-knowledge-cases.md#L22)；[DA45/K08.06.03.04](digital-audio-r2-knowledge-cases.md#L22) | 日志缺失/实际帧缺失与估计补值分离，保留证据 |
| K08.07.01.01 | 持续与瞬态干扰 | ROUTER_CANDIDATE | [DA19/K08.07.01.03](digital-audio-r1-knowledge-cases.md#L23)；[DA46/K08.07.01.04](digital-audio-r2-knowledge-cases.md#L23) | 持续干扰/瞬态点击，方法按证据选 |
| K08.07.01.02 | 方法选择及目标损伤 | BOUNDED_COMPOSITION | [DA19/K08.07.01.03](digital-audio-r1-knowledge-cases.md#L23)；[DA46/K08.07.01.04](digital-audio-r2-knowledge-cases.md#L23) | 纯噪声条件、独立残差/目标损伤、保护原件 |
| K08.07.02.01 | 削波及估计重建区别 | ROUTER_CANDIDATE | [DA20/K08.07.02.03](digital-audio-r1-knowledge-cases.md#L24)；[DA47/K08.07.02.04](digital-audio-r2-knowledge-cases.md#L24) | 截幅多对一及插值估计 |
| K08.07.02.02 | 信息损失及重录替代 | BOUNDED_COMPOSITION | [DA20/K08.07.02.03](digital-audio-r1-knowledge-cases.md#L24)；[DA47/K08.07.02.04](digital-audio-r2-knowledge-cases.md#L24) | 原峰未知、mask、独立参考/授权重录是新记录 |
| K08.07.03.01 | 房间响应与干声估计 | ROUTER_CANDIDATE | [DA21/K08.07.03.03](digital-audio-r1-knowledge-cases.md#L25)；[DA48/K08.07.03.04](digital-audio-r2-knowledge-cases.md#L25) | 房间卷积、干声/直达及早反射目标 |
| K08.07.03.02 | 盲恢复不确定及伪影 | BOUNDED_COMPOSITION | [DA21/K08.07.03.03](digital-audio-r1-knowledge-cases.md#L25)；[DA48/K08.07.03.04](digital-audio-r2-knowledge-cases.md#L25) | 盲反演多解、延迟预测假设及音乐目标损伤 |
| K08.08.01.01 | mixture stem源关系 | ROUTER_CANDIDATE | [DA22/K08.08.01.03](digital-audio-r1-knowledge-cases.md#L26)；[DA49/K08.08.01.04](digital-audio-r2-knowledge-cases.md#L26) | 混合/源图像/stem类别和版本 |
| K08.08.01.02 | 类别及混合假设 | BOUNDED_COMPOSITION | [DA22/K08.08.01.03](digital-audio-r1-knowledge-cases.md#L26)；[DA49/K08.08.01.04](digital-audio-r2-knowledge-cases.md#L26) | 线性模型与编码、混合一致不等源正确 |
| K08.08.02.01 | 串音目标损失伪影区别 | ROUTER_CANDIDATE | [DA23/K08.08.02.03](digital-audio-r1-knowledge-cases.md#L27)；[DA50/K08.08.02.04](digital-audio-r2-knowledge-cases.md#L27) | 目标损失、泄漏与额外残差分别 |
| K08.08.02.02 | 参考和听评条件 | BOUNDED_COMPOSITION | [DA23/K08.08.02.03](digital-audio-r1-knowledge-cases.md#L27)；[DA50/K08.08.02.04](digital-audio-r2-knowledge-cases.md#L27) | 指定正交参考、投影和听评限制 |
| K08.08.03.01 | 参考指标与无参考听评 | ROUTER_CANDIDATE | [DA24/K08.08.03.03](digital-audio-r1-knowledge-cases.md#L28)；[DA51/K08.08.03.04](digital-audio-r2-knowledge-cases.md#L28) | 参考SI-SDR与无参考评价分开 |
| K08.08.03.02 | 基准协议授权及产物 | BOUNDED_COMPOSITION | [DA24/K08.08.03.03](digital-audio-r1-knowledge-cases.md#L28)；[DA51/K08.08.03.04](digital-audio-r2-knowledge-cases.md#L28) | 对齐、尺度/退化策略、版本/划分/权限及产物 |
| K08.09.01.01 | 帧数采样率计算缓冲时间 | ROUTER_CANDIDATE | [DA25/K08.09.01.03](digital-audio-r1-knowledge-cases.md#L29)；[DA52/K08.09.01.04](digital-audio-r2-knowledge-cases.md#L29) | 帧数/速率名义时长 |
| K08.09.01.02 | 缓冲与端到端延迟 | BOUNDED_COMPOSITION | [DA25/K08.09.01.03](digital-audio-r1-knowledge-cases.md#L29)；[DA52/K08.09.01.04](digital-audio-r2-knowledge-cases.md#L29) | 可靠时间戳、队列及端到端延迟不唯一 |
| K08.09.02.01 | 时间预算及不确定阻塞 | ROUTER_CANDIDATE | [DA26/K08.09.02.03](digital-audio-r1-knowledge-cases.md#L30)；[DA53/K08.09.02.04](digital-audio-r2-knowledge-cases.md#L30) | 逐次期限、阻塞和回调预算 |
| K08.09.02.02 | 实时线程离线任务边界 | BOUNDED_COMPOSITION | [DA26/K08.09.02.03](digital-audio-r1-knowledge-cases.md#L30)；[DA53/K08.09.02.04](digital-audio-r2-knowledge-cases.md#L30) | 有界非阻塞队列、满时策略/记录、离线任务 |
| K08.09.03.01 | 输入输出缓冲事件及观测 | ROUTER_CANDIDATE | [DA27/K08.09.03.03](digital-audio-r1-knowledge-cases.md#L31)；[DA54/K08.09.03.04](digital-audio-r2-knowledge-cases.md#L31) | 输入溢出与输出欠载方向/事件 |
| K08.09.03.02 | 日志复现配置回归 | BOUNDED_COMPOSITION | [DA27/K08.09.03.03](digital-audio-r1-knowledge-cases.md#L31)；[DA54/K08.09.03.04](digital-audio-r2-knowledge-cases.md#L31) | 保留日志、配置单变量及复测，补值非真值 |

## 27限定组合
- K08.01.01.02：SUFFICIENT_SCOPED_CANDIDATE；直接抽取的混叠多解及滤波先于抽取，不能恢复旧损失。[DA01/K08.01.01.03](digital-audio-r1-knowledge-cases.md#L5)；[DA28/K08.01.01.04](digital-audio-r2-knowledge-cases.md#L5)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.01.02.02：SUFFICIENT_SCOPED_CANDIDATE；整数/浮点/有效位深与量化误差、非减法扰动并非普遍无偏。[DA02/K08.01.02.03](digital-audio-r1-knowledge-cases.md#L6)；[DA29/K08.01.02.04](digital-audio-r2-knowledge-cases.md#L6)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.01.03.02：SUFFICIENT_SCOPED_CANDIDATE；时钟差异、独立事件/布局、同标称速率非同步。[DA03/K08.01.03.03](digital-audio-r1-knowledge-cases.md#L7)；[DA30/K08.01.03.04](digital-audio-r2-knowledge-cases.md#L7)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.02.01.02：SUFFICIENT_SCOPED_CANDIDATE；逐样本等价、参数/元数据、既往有损损失不恢复。[DA04/K08.02.01.03](digital-audio-r1-knowledge-cases.md#L8)；[DA31/K08.02.01.04](digital-audio-r2-knowledge-cases.md#L8)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.02.02.02：SUFFICIENT_SCOPED_CANDIDATE；RIFF边界、奇数填充、fmt/data、blockAlign和解码证据。[DA05/K08.02.02.03](digital-audio-r1-knowledge-cases.md#L9)；[DA32/K08.02.02.04](digital-audio-r2-knowledge-cases.md#L9)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.02.03.02：SUFFICIENT_SCOPED_CANDIDATE；比例、低通、边界、声道映射和延迟条件。[DA06/K08.02.03.03](digital-audio-r1-knowledge-cases.md#L10)；[DA33/K08.02.03.04](digital-audio-r2-knowledge-cases.md#L10)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.03.01.02：SUFFICIENT_SCOPED_CANDIDATE；循环卷积折叠、相位/边界/目标频带保护。[DA07/K08.03.01.03](digital-audio-r1-knowledge-cases.md#L11)；[DA34/K08.03.01.04](digital-audio-r2-knowledge-cases.md#L11)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.03.02.02：SUFFICIENT_SCOPED_CANDIDATE；FFT长度、窗长、hop、单位、覆盖及NOLA逆变换。[DA08/K08.03.02.03](digital-audio-r1-knowledge-cases.md#L12)；[DA35/K08.03.02.04](digital-audio-r2-knowledge-cases.md#L12)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.03.03.02：SUFFICIENT_SCOPED_CANDIDATE；目标时间轴、F0、瞬态和多声道相位保护。[DA09/K08.03.03.03](digital-audio-r1-knowledge-cases.md#L13)；[DA36/K08.03.03.04](digital-audio-r2-knowledge-cases.md#L13)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.04.01.02：SUFFICIENT_SCOPED_CANDIDATE；模拟过载与数字削波不同，后级增益不恢复上游。[DA10/K08.04.01.03](digital-audio-r1-knowledge-cases.md#L14)；[DA37/K08.04.01.04](digital-audio-r2-knowledge-cases.md#L14)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.04.02.02：SUFFICIENT_SCOPED_CANDIDATE；固定点范围、浮点中间余量及后级量程，真峰数学反例。[DA11/K08.04.02.03](digital-audio-r1-knowledge-cases.md#L15)；[DA38/K08.04.02.04](digital-audio-r2-knowledge-cases.md#L15)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.04.03.02：SUFFICIENT_SCOPED_CANDIDATE；极性抵消、交换/静音/增益故障候选，不唯一诊断。[DA12/K08.04.03.03](digital-audio-r1-knowledge-cases.md#L16)；[DA39/K08.04.03.04](digital-audio-r2-knowledge-cases.md#L16)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.05.01.02：SUFFICIENT_SCOPED_CANDIDATE；频率角度、实际型号、反射与相位证据。[DA13/K08.05.01.03](digital-audio-r1-knowledge-cases.md#L17)；[DA40/K08.05.01.04](digital-audio-r2-knowledge-cases.md#L17)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.05.02.02：SUFFICIENT_SCOPED_CANDIDATE；源/房间/位置/链路单因素对照，真实拾音另证。[DA14/K08.05.02.03](digital-audio-r1-knowledge-cases.md#L18)；[DA41/K08.05.02.04](digital-audio-r2-knowledge-cases.md#L18)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.05.03.02：SUFFICIENT_SCOPED_CANDIDATE；独立环境/链路记录、目标保护，试听须授权安全。[DA15/K08.05.03.03](digital-audio-r1-knowledge-cases.md#L19)；[DA42/K08.05.03.04](digital-audio-r2-knowledge-cases.md#L19)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.06.01.02：SUFFICIENT_SCOPED_CANDIDATE；启动/监听与实际文件写入验证分离。[DA16/K08.06.01.03](digital-audio-r1-knowledge-cases.md#L20)；[DA43/K08.06.01.04](digital-audio-r2-knowledge-cases.md#L20)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.06.02.02：SUFFICIENT_SCOPED_CANDIDATE；多事件身份、三点残差及非线性/丢帧拒绝。[DA17/K08.06.02.03](digital-audio-r1-knowledge-cases.md#L21)；[DA44/K08.06.02.04](digital-audio-r2-knowledge-cases.md#L21)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.06.03.02：SUFFICIENT_SCOPED_CANDIDATE；日志缺失/实际帧缺失与估计补值分离，保留证据。[DA18/K08.06.03.03](digital-audio-r1-knowledge-cases.md#L22)；[DA45/K08.06.03.04](digital-audio-r2-knowledge-cases.md#L22)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.07.01.02：SUFFICIENT_SCOPED_CANDIDATE；纯噪声条件、独立残差/目标损伤、保护原件。[DA19/K08.07.01.03](digital-audio-r1-knowledge-cases.md#L23)；[DA46/K08.07.01.04](digital-audio-r2-knowledge-cases.md#L23)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.07.02.02：SUFFICIENT_SCOPED_CANDIDATE；原峰未知、mask、独立参考/授权重录是新记录。[DA20/K08.07.02.03](digital-audio-r1-knowledge-cases.md#L24)；[DA47/K08.07.02.04](digital-audio-r2-knowledge-cases.md#L24)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.07.03.02：SUFFICIENT_SCOPED_CANDIDATE；盲反演多解、延迟预测假设及音乐目标损伤。[DA21/K08.07.03.03](digital-audio-r1-knowledge-cases.md#L25)；[DA48/K08.07.03.04](digital-audio-r2-knowledge-cases.md#L25)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.08.01.02：SUFFICIENT_SCOPED_CANDIDATE；线性模型与编码、混合一致不等源正确。[DA22/K08.08.01.03](digital-audio-r1-knowledge-cases.md#L26)；[DA49/K08.08.01.04](digital-audio-r2-knowledge-cases.md#L26)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.08.02.02：SUFFICIENT_SCOPED_CANDIDATE；指定正交参考、投影和听评限制。[DA23/K08.08.02.03](digital-audio-r1-knowledge-cases.md#L27)；[DA50/K08.08.02.04](digital-audio-r2-knowledge-cases.md#L27)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.08.03.02：SUFFICIENT_SCOPED_CANDIDATE；对齐、尺度/退化策略、版本/划分/权限及产物。[DA24/K08.08.03.03](digital-audio-r1-knowledge-cases.md#L28)；[DA51/K08.08.03.04](digital-audio-r2-knowledge-cases.md#L28)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.09.01.02：SUFFICIENT_SCOPED_CANDIDATE；可靠时间戳、队列及端到端延迟不唯一。[DA25/K08.09.01.03](digital-audio-r1-knowledge-cases.md#L29)；[DA52/K08.09.01.04](digital-audio-r2-knowledge-cases.md#L29)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.09.02.02：SUFFICIENT_SCOPED_CANDIDATE；有界非阻塞队列、满时策略/记录、离线任务。[DA26/K08.09.02.03](digital-audio-r1-knowledge-cases.md#L30)；[DA53/K08.09.02.04](digital-audio-r2-knowledge-cases.md#L30)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。
- K08.09.03.02：SUFFICIENT_SCOPED_CANDIDATE；保留日志、配置单变量及复测，补值非真值。[DA27/K08.09.03.03](digital-audio-r1-knowledge-cases.md#L31)；[DA54/K08.09.03.04](digital-audio-r2-knowledge-cases.md#L31)。仅题设和来源条件，不是实际产品/工具/听评/许可验证。

组合补证：[DX01](digital-audio-r4-integrated-closure.md#L5)覆盖K08.01–03；[DX02](digital-audio-r4-integrated-closure.md#L6)覆盖K08.04–06/.09；[KC-D08](digital-audio-r4-integrated-closure.md#L7)覆盖K08.02/.03/.06–08；不新增旧槽或接受主张。