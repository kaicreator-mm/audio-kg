# G02 158主目标案例核对矩阵
实际读取七份案例文件与184槽主索引，逐组检查主目标、原条件和四视角字段。为避免复制题目与预期答案，下表仅保存原文件、行号及资格；文件Blob锁定于此次读回，不因索引升级证据。历史主案例可能只覆盖宽目标的子集。S编号交集不是专业充分性证明，额外来源以原资格文档核对。本轮未逐一重读全部外部原文；四视角字段存在不是语义验收。独立审核应主动检查实际内容，不只复述表格。正式CaseBinding和答案隔离留L2。

| 原案例文件 | 本次读回Blob | 组数 |
|---|---|---:|
| [theory-depth-cases.md](theory-depth-cases.md) | 56461f869faed05680db2b29da2364dbcf636b5d | 13 |
| [theory-fundamentals-cases.md](theory-fundamentals-cases.md) | 4f482da733981d21504cb50a06e12c14bbb6a1f5 | 15 |
| [theory-advanced-cases.md](theory-advanced-cases.md) | 29c843a4583f808e2df76ede64f9ce86402ecd49 | 13 |
| [theory-consolidation-cases.md](theory-consolidation-cases.md) | ad6175d8966390a260dfb0e1df4a3b01d28c1811 | 8 |
| [theory-case-batch.md](theory-case-batch.md) | 7b73f6d3a7b990fbfa2f60c9d7c25444a6b5d547 | 44 |
| [theory-evidence-batch-cases.md](theory-evidence-batch-cases.md) | 2c1b8badd53e8b31a38453b58d68abd22a618923 | 27 |
| [theory-legacy-cq-cases.md](theory-legacy-cq-cases.md) | 9dfad90b035e314d4aecb9715cb3f487a25217d8 | 38 |

| 主D4 | 精确主案例 | 行号 | 处置范围 | 条件内显式来源及历史资格 | 本次核对 |
|---|---|---|---|---|---|
| K01.01.01.01 | [TE-K01.01.01.01](theory-evidence-batch-cases.md) | L5 | RETAIN | S242:OTHER_ORIGINAL_QUALIFICATION、S250:OTHER_ORIGINAL_QUALIFICATION、S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.01.01.02 | [TL-K01.01.01.02](theory-legacy-cq-cases.md) | L5 | SCOPED_ROUTER | S209:READ_LOCATOR、S258:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.01.02.01 | [TL-K01.01.02.01](theory-legacy-cq-cases.md) | L6 | SCOPED_ROUTER | S258:READ_LOCATOR、S209:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.01.03.01 | [TE-K01.01.03.01](theory-evidence-batch-cases.md) | L6 | RETAIN | S209:READ_LOCATOR、S255:OTHER_ORIGINAL_QUALIFICATION；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.01.04.01 | [TD2-K01.01.04.01](theory-fundamentals-cases.md) | L5 | SCOPED_MAIN_SAMPLE | S191:READ_LOCATOR；与主索引显式S交集S191 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.01.04.02 | [TB-K01.01.04.02](theory-case-batch.md) | L23 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.01.05.01 | [TB-K01.01.05.01](theory-case-batch.md) | L24 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.01.06.01 | [TL-K01.01.06.01](theory-legacy-cq-cases.md) | L29 | SCOPED_MAIN_SAMPLE | S258:READ_LOCATOR、S209:READ_LOCATOR；与主索引显式S交集S258、S209 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.01.01 | [TE-K01.02.01.01](theory-evidence-batch-cases.md) | L7 | RETAIN | S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集S022 | 四视角齐全；不升级旧宽目标覆盖 |
| K01.02.03.01 | [TL-K01.02.03.01](theory-legacy-cq-cases.md) | L7 | SPLIT_BOUNDARY_OPEN | S133:READ_LOCATOR、S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集S133 | 四视角齐全；不升级旧宽目标覆盖 |
| K01.02.04.01 | [TD2-K01.02.04.01](theory-fundamentals-cases.md) | L6 | SCOPED_MAIN_SAMPLE | S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集S022 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.04.02 | [TC-K01.02.04.02](theory-consolidation-cases.md) | L5 | SCOPED_MAIN_SAMPLE | S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集S022 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.04.03 | [TB-K01.02.04.03](theory-case-batch.md) | L25 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.05.01 | [TB-K01.02.05.01](theory-case-batch.md) | L26 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.05.02 | [TD2-K01.02.05.02](theory-fundamentals-cases.md) | L7 | SCOPED_MAIN_SAMPLE | S192:READ_LOCATOR、S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集S192、S022 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.05.03 | [TB-K01.02.05.03](theory-case-batch.md) | L27 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.06.01 | [TD2-K01.02.06.01](theory-fundamentals-cases.md) | L8 | SCOPED_MAIN_SAMPLE | S133:READ_LOCATOR、S022:READ_LOCATOR_HISTORICAL；与主索引显式S交集S133、S022 | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.02.07.01 | [TE-K01.02.07.01](theory-evidence-batch-cases.md) | L24 | SCOPED_MAIN_SAMPLE | S244:READ_LOCATOR；与主索引显式S交集S244 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.02.07.02 | [TE-K01.02.07.02](theory-evidence-batch-cases.md) | L25 | SCOPED_MAIN_SAMPLE | S244:READ_LOCATOR；与主索引显式S交集S244 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.01.01 | [TE-K01.03.01.01](theory-evidence-batch-cases.md) | L8 | RETAIN | S004:TEXT_READ_HISTORICAL；与主索引显式S交集S004 | 四视角齐全；不升级旧宽目标覆盖 |
| K01.03.01.02 | [TL-K01.03.01.02](theory-legacy-cq-cases.md) | L8 | RESIDUAL_OPEN | S259:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.03.03.02 | [TL-K01.03.03.02](theory-legacy-cq-cases.md) | L9 | RESIDUAL_OPEN | S178:READ_LOCATOR、S179:READ_LOCATOR、S234:READ_LOCATOR、S268:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.03.04.01 | [TD-K01.03.04](theory-depth-cases.md) | L8 | SCOPED_MAIN_SAMPLE | S178:READ_LOCATOR；与主索引显式S交集S178 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.04.02 | [TB-K01.03.04.02](theory-case-batch.md) | L8 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.04.03 | [TB-K01.03.04.03](theory-case-batch.md) | L9 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.05.01 | [TD2-K01.03.05.01](theory-fundamentals-cases.md) | L9 | SCOPED_MAIN_SAMPLE | S193:READ_LOCATOR、S194:READ_LOCATOR；与主索引显式S交集S193、S194 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.05.02 | [TB-K01.03.05.02](theory-case-batch.md) | L28 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.06.01 | [TD2-K01.03.06.01](theory-fundamentals-cases.md) | L10 | SCOPED_MAIN_SAMPLE | S194:READ_LOCATOR、S195:READ_LOCATOR；与主索引显式S交集S194 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.06.02 | [TB-K01.03.06.02](theory-case-batch.md) | L29 | SCOPED_MAIN_SAMPLE | S195:READ_LOCATOR、S194:READ_LOCATOR；与主索引显式S交集S195、S194 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.07.01 | [TD2-K01.03.07.01](theory-fundamentals-cases.md) | L11 | SCOPED_MAIN_SAMPLE | S195:READ_LOCATOR；与主索引显式S交集S195 | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.03.07.02 | [TC-K01.03.07.02](theory-consolidation-cases.md) | L6 | SCOPED_MAIN_SAMPLE | S195:READ_LOCATOR、S193:READ_LOCATOR；与主索引显式S交集S195、S193 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.08.01 | [TB-K01.03.08.01](theory-case-batch.md) | L30 | SCOPED_MAIN_SAMPLE | S195:READ_LOCATOR；与主索引显式S交集S195 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.08.02 | [TD2-K01.03.08.02](theory-fundamentals-cases.md) | L12 | SCOPED_MAIN_SAMPLE | S195:READ_LOCATOR；与主索引显式S交集S195 | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.03.08.03 | [TB-K01.03.08.03](theory-case-batch.md) | L31 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.03.09.01 | [TL-K01.03.09.01](theory-legacy-cq-cases.md) | L30 | SCOPED_MAIN_SAMPLE | S259:READ_LOCATOR；与主索引显式S交集S259 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.01.02 | [TL-K01.04.01.02](theory-legacy-cq-cases.md) | L10 | RESIDUAL_OPEN | S196:READ_LOCATOR、S199:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.04.02.01 | [TL-K01.04.02.01](theory-legacy-cq-cases.md) | L11 | SCOPED_ROUTER | S251:READ_LOCATOR、S252:READ_LOCATOR、S198:READ_LOCATOR、S197:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.04.03.02 | [TL-K01.04.03.02](theory-legacy-cq-cases.md) | L12 | RESIDUAL_OPEN | S270:READ_LOCATOR、S271:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.04.04.01 | [TD2-K01.04.04.01](theory-fundamentals-cases.md) | L13 | SCOPED_MAIN_SAMPLE | S196:READ_LOCATOR；与主索引显式S交集S196 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.04.02 | [TB-K01.04.04.02](theory-case-batch.md) | L32 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.05.01 | [TB-K01.04.05.01](theory-case-batch.md) | L33 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.05.02 | [TD2-K01.04.05.02](theory-fundamentals-cases.md) | L14 | SCOPED_MAIN_SAMPLE | S202:READ_LOCATOR；与主索引显式S交集S202 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.06.01 | [TD2-K01.04.06.01](theory-fundamentals-cases.md) | L15 | SCOPED_MAIN_SAMPLE | S198:READ_LOCATOR、S201:READ_LOCATOR；与主索引显式S交集S198、S201 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.06.02 | [TC-K01.04.06.02](theory-consolidation-cases.md) | L7 | SCOPED_MAIN_SAMPLE | S198:READ_LOCATOR；与主索引显式S交集S198 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.06.03 | [TB-K01.04.06.03](theory-case-batch.md) | L34 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.07.01 | [TD2-K01.04.07.01](theory-fundamentals-cases.md) | L16 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.08.01 | [TE-K01.04.08.01](theory-evidence-batch-cases.md) | L28 | SCOPED_MAIN_SAMPLE | S251:READ_LOCATOR；与主索引显式S交集S251 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.08.02 | [TE-K01.04.08.02](theory-evidence-batch-cases.md) | L29 | SCOPED_MAIN_SAMPLE | S252:READ_LOCATOR；与主索引显式S交集S252 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.09.01 | [TE-K01.04.09.01](theory-evidence-batch-cases.md) | L30 | SCOPED_MAIN_SAMPLE | S249:READ_LOCATOR；与主索引显式S交集S249 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.04.10.01 | [TL-K01.04.10.01](theory-legacy-cq-cases.md) | L31 | SCOPED_MAIN_SAMPLE | S270:READ_LOCATOR、S271:READ_LOCATOR；与主索引显式S交集S270、S271 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.01.01 | [TL-K01.05.01.01](theory-legacy-cq-cases.md) | L13 | SCOPED_ROUTER | S210:READ_LOCATOR、S184:READ_LOCATOR、S258:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.05.01.02 | [TL-K01.05.01.02](theory-legacy-cq-cases.md) | L14 | RESIDUAL_OPEN | S184:READ_LOCATOR、S181:READ_LOCATOR、S267:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.05.03.02 | [TL-K01.05.03.02](theory-legacy-cq-cases.md) | L15 | SCOPED_ROUTER | S174:READ_LOCATOR、S178:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.05.04.01 | [TB-K01.05.04.01](theory-case-batch.md) | L5 | SCOPED_MAIN_SAMPLE | S184:READ_LOCATOR；与主索引显式S交集S184 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.04.02 | [TC-K01.05.04.02](theory-consolidation-cases.md) | L8 | SCOPED_MAIN_SAMPLE | S184:READ_LOCATOR；与主索引显式S交集S184 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.04.03 | [TD-K01.05.04](theory-depth-cases.md) | L5 | SCOPED_MAIN_SAMPLE | S184:READ_LOCATOR；与主索引显式S交集S184 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.05.01 | [TB-K01.05.05.01](theory-case-batch.md) | L6 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.05.02 | [TD-K01.05.05](theory-depth-cases.md) | L6 | SCOPED_MAIN_SAMPLE | S174:READ_LOCATOR；与主索引显式S交集S174 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.06.01 | [TD-K01.05.06](theory-depth-cases.md) | L7 | SCOPED_MAIN_SAMPLE | S177:READ_LOCATOR；与主索引显式S交集S177 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.06.02 | [TB-K01.05.06.02](theory-case-batch.md) | L7 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.07.01 | [TB-K01.05.07.01](theory-case-batch.md) | L10 | SCOPED_MAIN_SAMPLE | S179:READ_LOCATOR；与主索引显式S交集S179 | 四视角齐全；S179重读并修正条件 |
| K01.05.08.01 | [TB-K01.05.08.01](theory-case-batch.md) | L11 | SCOPED_MAIN_SAMPLE | S180:READ_LOCATOR、S214:READ_LOCATOR、S215:READ_LOCATOR；与主索引显式S交集S180 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.09.01 | [TD-K01.05.09](theory-depth-cases.md) | L9 | SCOPED_MAIN_SAMPLE | S181:READ_LOCATOR；与主索引显式S交集S181 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.09.02 | [TB-K01.05.09.02](theory-case-batch.md) | L12 | SCOPED_MAIN_SAMPLE | S181:READ_LOCATOR；与主索引显式S交集S181 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.10.01 | [TB-K01.05.10.01](theory-case-batch.md) | L13 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.10.02 | [TD-K01.05.10](theory-depth-cases.md) | L10 | SCOPED_MAIN_SAMPLE | S182:READ_LOCATOR；与主索引显式S交集S182 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.10.03 | [TB-K01.05.10.03](theory-case-batch.md) | L14 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.11.01 | [TB-K01.05.11.01](theory-case-batch.md) | L39 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.11.02 | [TB-K01.05.11.02](theory-case-batch.md) | L40 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.12.01 | [TD3-K01.05.12.01](theory-advanced-cases.md) | L5 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.12.02 | [TB-K01.05.12.02](theory-case-batch.md) | L41 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.13.01 | [TD3-K01.05.13.01](theory-advanced-cases.md) | L6 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.14.01 | [TD3-K01.05.14.01](theory-advanced-cases.md) | L7 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.14.02 | [TB-K01.05.14.02](theory-case-batch.md) | L42 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.15.01 | [TE-K01.05.15.01](theory-evidence-batch-cases.md) | L18 | SCOPED_MAIN_SAMPLE | S234:READ_LOCATOR；与主索引显式S交集S234 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.15.02 | [TL-K01.05.15.02](theory-legacy-cq-cases.md) | L33 | SCOPED_MAIN_SAMPLE | S268:READ_LOCATOR；与主索引显式S交集S268 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.05.16.01 | [TL-K01.05.16.01](theory-legacy-cq-cases.md) | L32 | SCOPED_MAIN_SAMPLE | S267:READ_LOCATOR；与主索引显式S交集S267 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.01.01 | [TE-K01.06.01.01](theory-evidence-batch-cases.md) | L9 | RETAIN | S240:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.06.02.01 | [TL-K01.06.02.01](theory-legacy-cq-cases.md) | L16 | RESIDUAL_OPEN | S217:READ_LOCATOR、S245:OTHER_ORIGINAL_QUALIFICATION、S262:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.06.02.02 | [TE-K01.06.02.02](theory-evidence-batch-cases.md) | L10 | RETAIN | S217:READ_LOCATOR、S245:OTHER_ORIGINAL_QUALIFICATION；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.06.03.01 | [TL-K01.06.03.01](theory-legacy-cq-cases.md) | L17 | RESIDUAL_OPEN | S260:READ_LOCATOR、S261:READ_LOCATOR、S263:READ_LOCATOR、S262:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.06.03.02 | [TL-K01.06.03.02](theory-legacy-cq-cases.md) | L18 | RESIDUAL_OPEN | S176:READ_LOCATOR、S264:READ_LOCATOR、S265:READ_LOCATOR、S266:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.06.04.01 | [TB-K01.06.04.01](theory-case-batch.md) | L15 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.04.02 | [TB-K01.06.04.02](theory-case-batch.md) | L16 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.05.01 | [TD-K01.06.05](theory-depth-cases.md) | L11 | SCOPED_MAIN_SAMPLE | S176:READ_LOCATOR；与主索引显式S交集S176 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.06.01 | [TB-K01.06.06.01](theory-case-batch.md) | L17 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.06.02 | [TB-K01.06.06.02](theory-case-batch.md) | L18 | SCOPED_MAIN_SAMPLE | S176:READ_LOCATOR；与主索引显式S交集S176 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.07.01 | [TE-K01.06.07.01](theory-evidence-batch-cases.md) | L16 | LIMITED_CANDIDATE | S217:READ_LOCATOR、S245:OTHER_ORIGINAL_QUALIFICATION；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；仅限局部证据 |
| K01.06.08.01 | [TB-K01.06.08.01](theory-case-batch.md) | L43 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.08.02 | [TC-K01.06.08.02](theory-consolidation-cases.md) | L9 | SCOPED_MAIN_SAMPLE | S212:READ_LOCATOR；与主索引显式S交集S212 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.08.03 | [TC-K01.06.08.03](theory-consolidation-cases.md) | L10 | SCOPED_MAIN_SAMPLE | S212:READ_LOCATOR；与主索引显式S交集S212 | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.06.09.01 | [TD3-K01.06.09.01](theory-advanced-cases.md) | L8 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.09.02 | [TB-K01.06.09.02](theory-case-batch.md) | L44 | SCOPED_MAIN_SAMPLE | S213:READ_LOCATOR；与主索引显式S交集S213 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.10.01 | [TD3-K01.06.10.01](theory-advanced-cases.md) | L9 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.11.01 | [TD3-K01.06.11.01](theory-advanced-cases.md) | L10 | SCOPED_MAIN_SAMPLE | S217:READ_LOCATOR；与主索引显式S交集S217 | 四视角齐全；已修正正负对照 |
| K01.06.11.02 | [TB-K01.06.11.02](theory-case-batch.md) | L45 | SCOPED_MAIN_SAMPLE | S217:READ_LOCATOR；与主索引显式S交集S217 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.12.01 | [TD3-K01.06.12.01](theory-advanced-cases.md) | L11 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.13.01 | [TE-K01.06.13.01](theory-evidence-batch-cases.md) | L19 | SCOPED_MAIN_SAMPLE | S235:READ_LOCATOR、S247:READ_LOCATOR；与主索引显式S交集S235、S247 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.13.02 | [TE-K01.06.13.02](theory-evidence-batch-cases.md) | L20 | SCOPED_MAIN_SAMPLE | S235:READ_LOCATOR、S247:READ_LOCATOR；与主索引显式S交集S235、S247 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.14.01 | [TE-K01.06.14.01](theory-evidence-batch-cases.md) | L21 | SCOPED_MAIN_SAMPLE | S236:READ_LOCATOR、S248:READ_LOCATOR；与主索引显式S交集S236、S248 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.14.02 | [TE-K01.06.14.02](theory-evidence-batch-cases.md) | L22 | SCOPED_MAIN_SAMPLE | S236:READ_LOCATOR、S248:READ_LOCATOR；与主索引显式S交集S236、S248 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.15.01 | [TE-K01.06.15.01](theory-evidence-batch-cases.md) | L23 | SCOPED_MAIN_SAMPLE | S237:READ_LOCATOR；与主索引显式S交集S237 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.16.01 | [TL-K01.06.16.01](theory-legacy-cq-cases.md) | L34 | SCOPED_MAIN_SAMPLE | S260:READ_LOCATOR；与主索引显式S交集S260 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.16.02 | [TL-K01.06.16.02](theory-legacy-cq-cases.md) | L35 | SCOPED_MAIN_SAMPLE | S261:READ_LOCATOR；与主索引显式S交集S261 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.16.03 | [TL-K01.06.16.03](theory-legacy-cq-cases.md) | L36 | SCOPED_MAIN_SAMPLE | S263:READ_LOCATOR；与主索引显式S交集S263 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.16.04 | [TL-K01.06.16.04](theory-legacy-cq-cases.md) | L37 | SCOPED_MAIN_SAMPLE | S262:READ_LOCATOR、S240:READ_LOCATOR；与主索引显式S交集S262、S240 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.17.01 | [TL-K01.06.17.01](theory-legacy-cq-cases.md) | L38 | SCOPED_MAIN_SAMPLE | S264:READ_LOCATOR、S265:READ_LOCATOR；与主索引显式S交集S264、S265 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.17.02 | [TL-K01.06.17.02](theory-legacy-cq-cases.md) | L39 | SCOPED_MAIN_SAMPLE | S266:READ_LOCATOR；与主索引显式S交集S266 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.06.18.01 | [TL-K01.06.18.01](theory-legacy-cq-cases.md) | L40 | SCOPED_MAIN_SAMPLE | S269:READ_LOCATOR；与主索引显式S交集S269 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.01.01 | [TE-K01.07.01.01](theory-evidence-batch-cases.md) | L11 | RETAIN | S069:OTHER_ORIGINAL_QUALIFICATION、S239:OTHER_ORIGINAL_QUALIFICATION；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.07.01.02 | [TL-K01.07.01.02](theory-legacy-cq-cases.md) | L19 | SCOPED_ROUTER | S069:OTHER_ORIGINAL_QUALIFICATION、S239:OTHER_ORIGINAL_QUALIFICATION、S220:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.07.02.01 | [TL-K01.07.02.01](theory-legacy-cq-cases.md) | L20 | SCOPED_ROUTER | S175:READ_LOCATOR、S238:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.07.03.01 | [TL-K01.07.03.01](theory-legacy-cq-cases.md) | L21 | RESIDUAL_OPEN | S219:READ_LOCATOR、S221:READ_LOCATOR、S269:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.07.03.02 | [TL-K01.07.03.02](theory-legacy-cq-cases.md) | L22 | SCOPED_ROUTER | S185:READ_LOCATOR、S219:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.07.04.01 | [TD-K01.07.04](theory-depth-cases.md) | L12 | SCOPED_MAIN_SAMPLE | S175:READ_LOCATOR；与主索引显式S交集S175 | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.07.04.02 | [TB-K01.07.04.02](theory-case-batch.md) | L19 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.05.01 | [TD-K01.07.05](theory-depth-cases.md) | L13 | SCOPED_MAIN_SAMPLE | S185:READ_LOCATOR；与主索引显式S交集S185 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.05.02 | [TB-K01.07.05.02](theory-case-batch.md) | L20 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.06.01 | [TB-K01.07.06.01](theory-case-batch.md) | L46 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.06.02 | [TD3-K01.07.06.02](theory-advanced-cases.md) | L12 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.07.01 | [TB-K01.07.07.01](theory-case-batch.md) | L47 | SCOPED_MAIN_SAMPLE | S220:READ_LOCATOR；与主索引显式S交集S220 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.07.02 | [TD3-K01.07.07.02](theory-advanced-cases.md) | L13 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；R1被点名分支具体化，专业复核待定 |
| K01.07.08.01 | [TE-K01.07.08.01](theory-evidence-batch-cases.md) | L26 | SCOPED_MAIN_SAMPLE | S238:READ_LOCATOR、S175:READ_LOCATOR；与主索引显式S交集S238、S175 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.08.02 | [TE-K01.07.08.02](theory-evidence-batch-cases.md) | L27 | SCOPED_MAIN_SAMPLE | S238:READ_LOCATOR；与主索引显式S交集S238 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.07.09.01 | [TL-K01.07.09.01](theory-legacy-cq-cases.md) | L41 | SCOPED_MAIN_SAMPLE | S269:READ_LOCATOR；与主索引显式S交集S269 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.01.01 | [TL-K01.08.01.01](theory-legacy-cq-cases.md) | L23 | RESIDUAL_OPEN | S242:OTHER_ORIGINAL_QUALIFICATION、S243:OTHER_ORIGINAL_QUALIFICATION、S241:OTHER_ORIGINAL_QUALIFICATION、S201:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.08.01.02 | [TE-K01.08.01.02](theory-evidence-batch-cases.md) | L12 | RETAIN | S241:OTHER_ORIGINAL_QUALIFICATION、S242:OTHER_ORIGINAL_QUALIFICATION、S243:OTHER_ORIGINAL_QUALIFICATION、S250:OTHER_ORIGINAL_QUALIFICATION；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.08.02.01 | [TL-K01.08.02.01](theory-legacy-cq-cases.md) | L24 | SCOPED_ROUTER | S197:READ_LOCATOR、S201:READ_LOCATOR、S252:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.08.03.01 | [TE-K01.08.03.01](theory-evidence-batch-cases.md) | L13 | RETAIN | S253:READ_LOCATOR、S201:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.08.04.01 | [TD2-K01.08.04.01](theory-fundamentals-cases.md) | L17 | SCOPED_MAIN_SAMPLE | S197:READ_LOCATOR；与主索引显式S交集S197 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.04.02 | [TB-K01.08.04.02](theory-case-batch.md) | L35 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.05.01 | [TD2-K01.08.05.01](theory-fundamentals-cases.md) | L18 | SCOPED_MAIN_SAMPLE | S203:READ_LOCATOR、S201:READ_LOCATOR；与主索引显式S交集S203、S201 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.05.02 | [TB-K01.08.05.02](theory-case-batch.md) | L36 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.06.01 | [TB-K01.08.06.01](theory-case-batch.md) | L37 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.06.02 | [TD2-K01.08.06.02](theory-fundamentals-cases.md) | L19 | SCOPED_MAIN_SAMPLE | S200:READ_LOCATOR、S201:READ_LOCATOR；与主索引显式S交集S200、S201 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.06.03 | [TB-K01.08.06.03](theory-case-batch.md) | L38 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.08.07.01 | [TL-K01.08.07.01](theory-legacy-cq-cases.md) | L42 | SCOPED_MAIN_SAMPLE | S272:READ_LOCATOR；与主索引显式S交集S272 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.01.01 | [TL-K01.09.01.01](theory-legacy-cq-cases.md) | L25 | RESIDUAL_OPEN | S186:READ_LOCATOR、S201:READ_LOCATOR、S078:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.09.01.02 | [TE-K01.09.01.02](theory-evidence-batch-cases.md) | L14 | RETAIN | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.09.02.01 | [TL-K01.09.02.01](theory-legacy-cq-cases.md) | L26 | SCOPED_ROUTER | S187:READ_LOCATOR、S224:READ_LOCATOR、S220:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.09.02.02 | [TL-K01.09.02.02](theory-legacy-cq-cases.md) | L27 | RESIDUAL_OPEN | S224:READ_LOCATOR、S225:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.09.03.01 | [TL-K01.09.03.01](theory-legacy-cq-cases.md) | L28 | RESIDUAL_OPEN | S178:READ_LOCATOR、S185:READ_LOCATOR、S220:READ_LOCATOR；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.09.03.02 | [TE-K01.09.03.02](theory-evidence-batch-cases.md) | L15 | RETAIN | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；不升级旧宽目标覆盖 |
| K01.09.04.01 | [TB-K01.09.04.01](theory-case-batch.md) | L21 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.04.02 | [TD-K01.09.04](theory-depth-cases.md) | L14 | SCOPED_MAIN_SAMPLE | S186:READ_LOCATOR；与主索引显式S交集S186 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.05.01 | [TD-K01.09.05](theory-depth-cases.md) | L15 | SCOPED_MAIN_SAMPLE | S187:READ_LOCATOR；与主索引显式S交集S187 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.05.02 | [TD-K01.09.05-I](theory-depth-cases.md) | L16 | SCOPED_MAIN_SAMPLE | S188:READ_LOCATOR；与主索引显式S交集S188 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.05.03 | [TB-K01.09.05.03](theory-case-batch.md) | L22 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.06.01 | [TD-K01.09.06](theory-depth-cases.md) | L17 | SCOPED_MAIN_SAMPLE | S183:READ_LOCATOR；与主索引显式S交集S183 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.06.02 | [TE-K01.09.06.02](theory-evidence-batch-cases.md) | L17 | LIMITED_CANDIDATE | S183:READ_LOCATOR、S225:READ_LOCATOR；与主索引显式S交集S183 | 四视角齐全；仅限局部证据 |
| K01.09.07.01 | [TD3-K01.09.07.01](theory-advanced-cases.md) | L14 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.07.02 | [TB-K01.09.07.02](theory-case-batch.md) | L48 | SCOPED_MAIN_SAMPLE | S222:READ_LOCATOR、S223:READ_LOCATOR；与主索引显式S交集S222、S223 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.08.01 | [TD3-K01.09.08.01](theory-advanced-cases.md) | L15 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.08.02 | [TC-K01.09.08.02](theory-consolidation-cases.md) | L11 | SCOPED_MAIN_SAMPLE | S224:READ_LOCATOR；与主索引显式S交集S224 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.08.03 | [TD3-K01.09.08.03](theory-advanced-cases.md) | L16 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.09.01 | [TD3-K01.09.09.01](theory-advanced-cases.md) | L17 | SCOPED_MAIN_SAMPLE | 无显式S编号，沿用主目标定位/题定数学/项目合同；与主索引显式S交集无（需查原登记/补证） | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.09.02 | [TC-K01.09.09.02](theory-consolidation-cases.md) | L12 | SCOPED_MAIN_SAMPLE | S225:READ_LOCATOR、S183:READ_LOCATOR；与主索引显式S交集S225、S183 | 四视角齐全；限明确条件、原文待独立复核 |
| K01.09.10.01 | [TE-K01.09.10.01](theory-evidence-batch-cases.md) | L31 | SCOPED_MAIN_SAMPLE | S222:READ_LOCATOR；与主索引显式S交集S222 | 四视角齐全；限明确条件、原文待独立复核 |

158组绑定唯一，123深化/35旧，632个四视角字段齐全；19旧索引无精确主案例，7广义HOLD无精确主案例。实质核查见[发现与有限验证](theory-g02-builder-findings.md)。此派生矩阵无答案复制，不视作新知识或新案例。

R1：G02 FAIL后七组被点名主案例改原文件；本表更新全部7个Blob及158精确行号。原字段齐全不等于专业覆盖；仍须按每个主谓词逐分支实质核对，不能以此次点名修复判RV-02关闭。

R2：七份实际当前Blob重新绑定（158原主ID/行号不变）；[逐谓词分支审查](theory-g02-r2-case-branch-review.md)解释A/L/O及剩余，替代仅以字段齐全判断覆盖。R1历史记录保留。

R2初检的15个具体缺口均有[对应补充见证](theory-g02-r2-case-branch-fixtures.md)，非新主案例，未证明全部专业条件充分。
