# K19 R3 — D24/D25迁移与现场归属
DRAFT #75。K19无D24一对一MIGRATE；保留D25六个拆分候选及六条入向SPLIT_OPEN，未晋升正式主张或关闭拆分。原D24 516ea2e35f527e05778c9a32316cba887b4896ac、D25 dbc1a0d71d8314186f51e4d6a5893bfaf03c1c9a；原K09.07为历史入口，旧槽与来源完整保留。
| 候选D4 | 原候选语义 | 原源/旧ID | 当前案例 |
|---|---|---|---|
| [K19.07.01.01](domain-mixed-migration-predicate-batch.md#L29) | 给定现场拓扑的反馈诊断及排除证据；禁止危险复现 | S096/S092/S033；K09.07.01.01 | [LS25/K19.07.01.01](live-sound-r2-knowledge-cases.md#L9) |
| [K19.07.01.02](domain-mixed-migration-predicate-batch.md#L30) | 现场增益、布置、电气噪声候选及安全限制；不唯一归因 | S096/S092/S033；K09.07.01.02 | [LS26/K19.07.01.02](live-sound-r2-knowledge-cases.md#L10) |
| [K19.05.01.01](domain-mixed-migration-predicate-batch.md#L31) | 现场主扩、舞台监听的服务对象、用途及各自路由 | S096/S092/S165；K09.07.02.01 | [LS17/K19.05.01.01](live-sound-r1-knowledge-cases.md#L21) |
| [K19.03.01.01](domain-mixed-migration-predicate-batch.md#L32) | 在权限和安全条件下核对现场路由、电平记录 | S096/S092/S165；K09.07.02.02 | [LS09/K19.03.01.01](live-sound-r1-knowledge-cases.md#L13) |
| [K19.04.01.01](domain-mixed-migration-predicate-batch.md#L33) | 现场覆盖、清晰度、稳定性分别验收，绑定位置、条件和实测证据 | S096/S092/S033/S165；K09.07.03.01 | [LS13/K19.04.01.01](live-sound-r1-knowledge-cases.md#L17) |
| [K19.09.01.01](domain-mixed-migration-predicate-batch.md#L34) | 场地约束、声级与权限下停止、修订及复测条件 | S096/S092/S033/S165；K09.07.03.02 | [LS33/K19.09.01.01](live-sound-r2-knowledge-cases.md#L17) |
| 旧D4 | 原状态 | 原路由（逐字） | D25谓词路由 | K19候选案例 |
|---|---|---|---|---|
| [K09.07.01.01](domain-migration-implementation.md#L53) | SPLIT / — / SPLIT_OPEN | K07.06/K07.07=物理传播与测量；K19.07=现场反馈路径诊断；K08.04 REF通用路由 | [K09.07.01.01](domain-mixed-migration-predicate-batch.md#L61)：K07.06.04.01 K19.07.01.01；K07.07.02.01；K08.04 | [LS25/K19.07.01.01](live-sound-r2-knowledge-cases.md#L9) |
| [K09.07.01.02](domain-migration-implementation.md#L54) | SPLIT / — / SPLIT_OPEN | K19.07=现场候选及处置；K08.04/K08.05=通用增益拾音；K07.06 REF环境；K15.04 REF安全门禁 | [K09.07.01.02](domain-mixed-migration-predicate-batch.md#L62)：K19.07.01.02；K08.04.03.02 K08.05.02.01 K08.05.03.01；K07.06 K15.04 | [LS26/K19.07.01.02](live-sound-r2-knowledge-cases.md#L10) |
| [K09.07.02.01](domain-migration-implementation.md#L55) | SPLIT / — / SPLIT_OPEN | K19.05=现场主扩声与舞台监听；K08.04=通用路由；K04.06=音乐协作监听目标；K12.01 REF具体宿主 | [K09.07.02.01](domain-mixed-migration-predicate-batch.md#L63)：K19.05.01.01；K08.04.01.01 K08.04.03.01 K04.06.02.01；K12.01 | [LS17/K19.05.01.01](live-sound-r1-knowledge-cases.md#L21) |
| [K09.07.02.02](domain-migration-implementation.md#L56) | SPLIT / — / SPLIT_OPEN | K19.03=现场安全核对；K15.01/K15.04=权限与验收责任；K07.08=听音安全；K12.06 REF工具权限 | [K09.07.02.02](domain-mixed-migration-predicate-batch.md#L64)：K19.03.01.01；K15.01.02.01 K15.04.03.02 K07.08.02.01；K12.06 | [LS09/K19.03.01.01](live-sound-r1-knowledge-cases.md#L13) |
| [K09.07.03.01](domain-migration-implementation.md#L57) | SPLIT / — / SPLIT_OPEN | K19.04=场地覆盖清晰度稳定性验收；K07.06/K07.07/K07.08=传播测量与暴露条件；K10.07 REF音质评价 | [K09.07.03.01](domain-mixed-migration-predicate-batch.md#L65)：K19.04.01.01；K07.06.01.01 K07.07.02.01 K07.08.02.01；K10.07 | [LS13/K19.04.01.01](live-sound-r1-knowledge-cases.md#L17) |
| [K09.07.03.02](domain-migration-implementation.md#L58) | SPLIT / — / SPLIT_OPEN | K19.09=现场停止复测和安全修订；K15.04=治理放行责任；K07.08 REF安全依据 | [K09.07.03.02](domain-mixed-migration-predicate-batch.md#L66)：K19.09.01.01；K15.04.02.02 K15.04.03.02；K07.08 | [LS33/K19.09.01.01](live-sound-r2-knowledge-cases.md#L17) |
K07主责物理传播、测量/暴露依据，K08通用路由与信号处理，K04表演协作目标，K09工程交付与历史入口，K10评价，K12工具执行，K15权限治理；K19主责现场服务对象、场地验收与故障安全停止/复盘，不复制原子、不给真实操作授权。原28 SPLIT_OPEN均保持，G04跨域共同裁决。