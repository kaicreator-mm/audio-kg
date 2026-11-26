# G04 R7 — P1修订及完整累计独立复审合同

#78 / PR79；原基线 51cf7d8cc83d12ad20de0161d3cc6ef16c14d87f；R6失败HEAD 725ce4f83a4f904dab4438f36b1b1c30ee70cc40，[原独立FAIL](https://github.com/kaicreator-mm/audio-kg/pull/79#issuecomment-7203270001)（0已发现P0、2P1，累计范围未完成）。构建者回读快照 4627be424fbb8d198ac81ae18089f1e4134176dd。最终待审HEAD由本次#78/PR79同一派审回执绑定；本合同及导航写入会推进HEAD。BUILDER_REVIEW_CANDIDATE；不得冒用旧审核，不提前合并、关闭或冻结。

## 修订交付及实际自检

| 项目 | 实际证据 | 结果与限制 |
|---|---|---|
| RV01 | [R7a XC01-R2](g04-r7-xc01-protection-remediation.md) | 60/60有限探针；非空候选/报告身份版本，实际音符歌词内容、时长、目标、时基、cue及区外曲线，逐事件许可/撤回/计划、报告绑定与重验；原15/15仅历史 |
| RV02 | [R7b](g04-r7-cq-semantic-discovery.md)、[案例上](g04-r7-cq-case-readback-1.md)、[案例下](g04-r7-cq-case-readback-2.md)、[R7c](g04-r7-cq-semantic-validation.md) | 26限定查询、专业推理、正负未知及缺口；118引用/50不同D4/18索引精确回读，49主案例（含另读K01音分），1 EVIDENCE_OPEN，另显式保留形式残余；48/48有限推演，部分复用XC01结果；不是实际LLM检索 |
| 受影响历史入口 | [逐发现工作单](g04-r7-cumulative-findings-docket.md)及R2d/R6a | R7d相对失败HEAD 12文档44行逐行回读，原ID、行数、列数不变，修订局部案例、旧槽、发现及CQ条件 |
| 拆分语义 | [组合](g04-r3-composite-case-audit.md)、[D25](domain-mixed-migration-predicate-batch.md)、[原需求](domain-mixed-migration-case-demands.md) | 28组合逐行对照原需求及D25，12组补强；28/51/16不同NEW/REUSE/REF路由匹配且目标入口存在。旧28 SPLIT_OPEN保持；不宣布语义自动等价 |
| R2a证据补强 | [R7f](g04-r7-r2a-reproducible-recheck.md) | 21/21新可执行有限断言覆盖原15记录；原函数未保存，不称历史原脚本重放 |
| 累计再读 | [36项工作单](g04-r7-cumulative-findings-docket.md)、[19域工作单](g04-r7-domain-review-docket.md)、[原R6完整范围](g04-r6-cumulative-review-candidate.md) | 实际读回36行/19行；R2b/R2c旧保存函数再执行 43/43、34/34。所有有限计数有交叉，不加总为独立知识覆盖 |

## 必须独立完成的范围（不是两项窄复审）

1. 独立重现R6失败反例，重跑现行R7a，检查当前内容、身份版本、授权和报告不绕过保护的条件及新的反例；不能仅按60个样本宣布普适实现。
2. 逐CQ01–26实际核对问题语义、必要D与支持S、原专业案例及来源资格、正负/未知/拒答、前置/别名、遗漏和新CQ判断。K01.02.06.02 EVIDENCE_OPEN、K01.07.03.01 RESIDUAL_OPEN不得当作确定知识；重跑R7c并检查有限模型边界。
3. **补完R6尚未完成的累计审核**：36项逐发现实质核对（15 OPEN issue，逐项结论及源/影响/必要见证）；28组合逐谓词核四视角、owner、NEW/REUSE/REF条件与剩余需求；19域逐专业课程/教材/标准/职业实践对照实际案例、深度和来源边界；CAL03/04来源资格、版本、许可、复用矩阵，CAL05角色语义和跨域关系。使用两个新工作单和R6完整合同，检查实际源记录与案例，不以存在性、旧模块PASS、数目或抽样代替累计裁决。
4. 逐项记录真实检查范围、未验证项及理由；给出P0/P1/P2及准确证据，若未完成应明确FAIL/BLOCKED而非PASS。只读Reviewer把结论同时写回#78及PR79，绑定exact HEAD、基线、角色，不改文件、不合并、不关闭。
5. 合入与后续阶段由Builder在有效独立结论后核实。G04未通过时CAL07/G05/T03/L2阻塞。

## 保留限制

19域159活跃D2/1084发现行、1113能力格及R6的1929定位引用不等accepted claims；15 P2 issue全部OPEN，28 SPLIT_OPEN保持。R7未新做全量外部全文读取、真实音频、临床、职业现场、法律/授权、LLM/DB或CI；未全面重跑19域所有历史见证。保留R6来源访问和资产许可限制（特别是Polifonia NO_IMPORT）及全部专业残余。独立审查者须判断这些限制是否影响当前阶段充分性；不得伪造缺失证据。
