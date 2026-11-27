# G04 R6 — 全域累计独立审核候选及审查合同

任务 #78，PR #79，基线 `51cf7d8cc83d12ad20de0161d3cc6ef16c14d87f`；实际构建者回读快照 `3cead8b5f2b8f1d3a3c1242e4d7c86a8c4f4c060`。最终待审exact HEAD以PR/Issue同一派审回执为准（本文件自身及导航提交将改变HEAD）。本记录是 BUILDER_REVIEW_CANDIDATE，不是独立审核PASS、合入、知识接受、L1 freeze或T03。按照D26仅在完整G04累计候选发一次required review，内部批次不派微审核。

## 交付和实际自检
| 范围 | 实际结果 | 精确研究入口 |
|---|---|---|
| R1 CAL01 | 19个已合入G02/G03基线，15 OPEN P2 issue共36发现，9优先修订；原40/33/49/44有限见证及740路径为R1实际记录 | [R1](g04-r1-baseline-and-priority-corrections.md) |
| R2 | 余27发现实际改入案例/条件/定位，36/36均有构建者修订；34条修订主原子精确发现/旧槽/能力反链，理论和综合流程另回读。15+43+34次有限检查有重叠，非92个独立覆盖。无P2关闭 | [R2a](g04-r2a-partial-case-corrections.md)；[R2b](g04-r2b-five-domain-corrections.md)；[R2c](g04-r2c-remaining-corrections.md)；[影响1](g04-r2d-affected-path-audit-1.md)；[影响2](g04-r2d-affected-path-audit-2.md)；[理论/综合](g04-r6-theory-integrated-impacts.md) |
| R3 CAL01/02 | 补K07.06.04.01 AC51四视角及6/6有限探针；28 NEW逐案例/源集合，51 REUSE现行入口，16 REF条件入口，28旧槽组合案例8列结构非空；不判旧槽自动等价 | [AC51](acoustics-g04-feedback-path-case.md)；[NEW](g04-r3-new-target-audit.md)；[REUSE](g04-r3-reuse-target-audit.md)；[REF](g04-r3-ref-target-audit.md)；[组合](g04-r3-composite-case-audit.md) |
| R4 CAL02/03 | 159活跃D2、1084发现行（184 K01历史/现行混合，其他900主入口）；K02–19共1929明确S引用回读全部定位（9个初报为列表格式），优先风险资格155行；K01本轮实际读184槽/184资格/130深化谓词资格，184均有对应ID，130均属184集合 | [范围深度](g04-r4-domain-coverage-depth-audit.md)；[优先风险](g04-r4-priority-source-grade-audit.md)；[K02–05](g04-r4-source-route-audit-1.md)；[K06–08](g04-r4-source-route-audit-2.md)；[K09–10](g04-r4-source-route-audit-3a.md)；[K11–12](g04-r4-source-route-audit-3b.md)；[K13–19](g04-r4-source-route-audit-4.md)；[K01资格](../../research/theory-source-atom-qualification.md)；[K01谓词资格](../../research/theory-g02-r3-predicate-source-qualification.md) |
| R4 CAL04 | 六种资产实际版本/语义/许可边界，MTO、MO、Polifonia序列化实读；SKOS/PROV/SHACL规范实读；不导入、不决定L2 | [资产审计](g04-r4-ontology-asset-audit.md) |
| R5 CAL05 | 19份实际角色矩阵164 D2×7=1148登记格，排除35历史格，159×7=1113活跃格：882P/163S/68C，无重复/缺格/角色枚举异常；XC01七能力条件关系，15/15合成分支 | [能力](g04-r5-capability-matrix-audit.md)；[XC01](g04-r5-seven-capability-integrated-case.md) |
| R5 CAL06 | CQ01–26逐项精确D/S反向定位，全部至少一限定D，明确D4引用不存在/编号异常0；10个general条目不虚造原子。仅静态发现 | [CQ](g04-r5-cq-cross-domain-discovery.md) |
| R6 | 8个理论/综合路径回读匹配，28/28组合结构匹配。D24原blob 516ea2e35f527e05778c9a32316cba887b4896ac，D25原blob dbc1a0d71d8314186f51e4d6a5893bfaf03c1c9a，adoption a8a4e6ff0acbe443609902e7cc0f3142c4cdf87c，capability 906f34aa321c2b85f78fc74975464819f37308e1 实际回读保持，28旧SPLIT_OPEN仍在 | [R6a](g04-r6-theory-integrated-impacts.md) |

## 审核者必须核查并裁决
1. 全部15个P2 issue #28/#32/#35/#38/#41/#46/#49/#52/#55/#60/#63/#68/#71/#74/#77 共36发现，逐发现核对应修订、影响路径、定向证据及可重放见证；检查是否存在漏改、新矛盾、需要补做的原见证重放。R1 9个构建者完整修订候选与R2余27均不可自动认定独立关闭。
2. 实质检查28旧槽拆分的正反向、NEW/REUSE/REF关系和owner；区别K01.07.03.01 RESIDUAL_OPEN、K01.02.06.02 EVIDENCE_OPEN、K01.02.01.02 SCOPED_ROUTER。不得以结构匹配裁决真实知识覆盖或sameAs。
3. 核查专业深度、源级别/版本/许可/出处、关系、能力角色与CQ实际适用性；特别是声乐健康、文化/语言外推、真实工具和现场、评估证据、权利条件。MTO/MO/PON及标准不得超读。
4. 核查跨域XC01是否正确区分前置、支持、主责、保护对象/授权/UNKNOWN与复核；独立重跑有实质影响的有限见证，列出实际未运行的范围，不要求为L1凭空实施真实音频或LLM。
5. 核验待审HEAD与上述文档及基线；回写 #78 和 PR79 的独立结论 PASS/FAIL 或具体阻断状态、发现P0/P1/P2、实际验证及未验证、身份、exact SHA。若证据不足以满足G04则FAIL/BLOCKED，不能凭文档齐全PASS。独立通过后由Builder核对，不在本次审核自行合并或关闭。

## 明确保留的残余和未验证
- S177/178本轮仅开页，其他既有外部来源按原等级而非全量新全文；READ_SCOPE_ONLY、ABSTRACT_ONLY、SEARCH_ONLY、标准正文未获取/访问失败、许可未知继续隔离。Polifonia Music Representation README CC BY4.0 与 OWL CC BY-SA4.0 冲突：NO_IMPORT；MO许可未明；W3C机器可读文件未成功取得，不能宣称完整导入。
- 已实际运行的是明确列出的有限合成见证和结构检查；并未全面重跑所有G02/G03历史见证，也未对28组合进行真实执行或实际LLM/DB检索评测。要求审查者判定变更影响及剩余复核是否足以满足本阶段。没有实际音频、设备、人群、临床、法律、安全授权、CI、产品/运行时、accepted claims。 
- 15个P2 OPEN、28 SPLIT_OPEN保持；当前仅派一次G04累计独立审查。CAL07/G05/T03/L2仍阻塞，G04 PASS也不等L1 freeze。
