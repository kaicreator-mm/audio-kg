# G04 R5a — CAL05 七能力全域矩阵结构回读

基准 `e86065a576c1877c584c8ca6f45fb9d798dac4c8`。直接读取19份原矩阵；以 D2+A01–A07 为键检查重复、遗漏及角色枚举。所有矩阵保留原语义，不将支持角色升为owner，P仅专业知识职责，不授运行权限。历史K09.07、K13.01–.04独立计数，不计活跃。

| 域 | 登记D2 | 活跃D2 | 登记角色行 | 活跃角色行 | P/S/C/N/A/UNKNOWN | 精确矩阵 |
|---|---:|---:|---:|---:|---|---|
| K01 | 9 | 9 | 63 | 63 | 33/9/21/0/0 | [矩阵](theory-g02-capability-audit.md) blob `36b00bd9f9d7a451d7e83327fd6899a1a89bab68` |
| K02 | 8 | 8 | 56 | 56 | 48/8/0/0/0 | [矩阵](composition-r3-capability-calibration.md) blob `2f8089f3216be1031e64130748bb99e43ef2b518` |
| K03 | 8 | 8 | 56 | 56 | 48/8/0/0/0 | [矩阵](arrangement-r5-capability-calibration.md) blob `a5d24f39ccb8a5dc4f8eaabba9bc00abd41199f1` |
| K04 | 8 | 8 | 56 | 56 | 42/14/0/0/0 | [矩阵](performance-r4-capability-calibration.md) blob `afa4d08faaf9a186aeed5530c5e34255033957cc` |
| K05 | 9 | 9 | 63 | 63 | 27/18/18/0/0 | [矩阵](vocal-science-r4-capability-calibration.md) blob `0b71c3683a087ece794595fc0b60c965853f9eda` |
| K06 | 9 | 9 | 63 | 63 | 48/15/0/0/0 | [矩阵](vocal-training-r3-capability-calibration.md) blob `e005b583f20b5e4f97fab6d20bf9da6a65203bb2` |
| K07 | 8 | 8 | 56 | 56 | 27/14/15/0/0 | [矩阵](acoustics-r3-capability-calibration.md) blob `e9cbd1891f347bab70cca5bd30a447161684d4c6` |
| K08 | 9 | 9 | 63 | 63 | 59/4/0/0/0 | [矩阵](digital-audio-r3-capability-calibration.md) blob `2eeaadc6ae3ce77ba615ec599ff9c1dbe93ec700` |
| K09 | 9 | 8 | 63 | 56 | 56/0/0/0/0 | [矩阵](production-r3-capability-calibration.md) blob `4a98b224eda2e62da3052be7df5cd465d1a6b122` |
| K10 | 9 | 9 | 63 | 63 | 45/18/0/0/0 | [矩阵](evaluation-r3-capability-calibration.md) blob `8490192c0e756384e9d9438187c468c904eef81b` |
| K11 | 10 | 10 | 70 | 70 | 68/2/0/0/0 | [矩阵](ai-models-r3-capability-calibration.md) blob `f060909119a0376f945d322a130297053b621670` |
| K12 | 9 | 9 | 63 | 63 | 63/0/0/0/0 | [矩阵](tools-orchestration-r3-capability-calibration.md) blob `e9a363e09f924b6f8101966f2fe4fa46ce3f354a` |
| K13 | 8 | 4 | 56 | 28 | 22/6/0/0/0 | [矩阵](localization-r3-capability-calibration.md) blob `86292af43298f731ff72fe75a369c0bd546cef46` |
| K14 | 8 | 8 | 56 | 56 | 46/10/0/0/0 | [矩阵](music-education-r3-capability-calibration.md) blob `06fc9299f6135b4be834eb72f9fc71c49a7a2b8b` |
| K15 | 8 | 8 | 56 | 56 | 54/2/0/0/0 | [矩阵](production-governance-r3-capability-calibration.md) blob `9fdbf65d2dff58996dbfd28a60eb75e7aa7dd96d` |
| K16 | 7 | 7 | 49 | 49 | 35/7/7/0/0 | [矩阵](musicology-r3-capability-calibration.md) blob `c4fcd56d523a06df7817be6591d3e518c220793f` |
| K17 | 7 | 7 | 49 | 49 | 35/7/7/0/0 | [矩阵](music-cognition-r3-capability-calibration.md) blob `42d1a1f6167b25b468ce67ec736c1854fd9f0861` |
| K18 | 11 | 11 | 77 | 77 | 66/11/0/0/0 | [矩阵](sound-design-r3-capability-calibration.md) blob `ad401924bf8067b519d02519c2545ece3a02053d` |
| K19 | 10 | 10 | 70 | 70 | 60/10/0/0/0 | [矩阵](live-sound-r3-capability-calibration.md) blob `7b7e605316f8ccf66a982b1cc34578b6860e1739` |

登记 1148；活跃 1113；活跃角色分布 {"P":882,"S":163,"C":68}。重复/缺位/枚举检查：0异常。

## 使用边界
- A01知识、A02工作流、A03工具、A04状态、A05评估、A06可编辑对象、A07迭代均为已有局部角色矩阵；不是全任务通用自动权限。跨域复合任务逐条件选择主责及支持，禁止仅按P计数自动编排。
- 源限定、精确案例反链与复合任务语义需分别核验；本记录验证角色结构而非所有案例内容或实际执行；原历史入口继续受D24/25与SPLIT_OPEN约束。
