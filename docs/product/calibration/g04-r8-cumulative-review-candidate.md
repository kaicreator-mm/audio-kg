# G04 R8 — 独立参考与实际CQ修订、累计复审合同

#78 / PR79；G04原基线 51cf7d8cc83d12ad20de0161d3cc6ef16c14d87f；R7 FAIL exact 9066f3fa762c31c934fefca90cf16e047c22c726，[独立回执](https://github.com/kaicreator-mm/audio-kg/pull/79#issuecomment-7203815238)（0 observed P0，2 residual P1，累计部分未完）。R8构建者回读 37d38fabbd6b0d1e5d8d4bc01040ce46cb491d69；最终待审EXACT_HEAD见#78/PR79同一派审回执。未获得新独立PASS，禁止合并/关闭/冻结。

## 修订证据与实际结果

| 项目 | 实际交付、证据及限定 |
|---|---|
| R8a RV01 | [XC01-R3](g04-r8-xc01-independent-evidence.md) 70/70；独立题设观察OBS-A-01/220Hz/素材/身份/时钟/窗；估计EST独立登记；拒绝两个值一起替换、无独立来源、同ID版本改内容或伪造新回执；合法c3/R3及独立证据，c4错误估计输出两个分离的误差。固定注册表是知识夹具，不是鉴权、持久化或L2设计。 |
| R8a/c RV02 | [CQ扩展](g04-r8-cq-semantic-remediation.md) 24/24；O1/F0仅离线B正例及尝试P（含伪造扩大scope）STOP，测量NOT_PERFORMED；新增削波/动态范围、修复/源轨/噪声选择、练习/反馈/转介、共享源与clip失效；[正式26问逐问范围](g04-r8-formal-cq-scope-reconciliation.md)明确宽题未证、不是实际LLM。 |
| CQ25 | [七能力实际矩阵/发现](g04-r8-seven-role-route.md)、[实际主案例/来源资格](g04-r8-seven-role-evidence.md)；7阶段15源引用实际回读，反向遍历实际c2/R2输入输出及前置；缺角色/源/边、内容变化及新版本不得继承旧证据。 |
| CAL05 | [优先4域](g04-r8-role-case-audit-priority.md) 231格、1113活跃格中的另外882格见[其余15域](g04-r8-role-semantics-readback.md)。四域实际矩阵/发现/主案例与4附加修订文档，原1113格的任务和边界均已回读；五列矩阵使用原全表边界。部分D1→D2角色差异按分支语义判断；P不等权限。其他15域未逐个新读全部下游案例/外部来源。 |
| 36历史发现 | 原[R7逐发现工作单](g04-r7-cumulative-findings-docket.md)；[34主原子](g04-r8-affected-source-routes.md)、[原源上](g04-r8-affected-source-qualification-1.md)、[原源下](g04-r8-affected-source-qualification-2.md) 80次显式来源登记引用；[反链上](g04-r8-affected-impact-readback-1.md)、[反链下](g04-r8-affected-impact-readback-2.md) 317/317现行旧槽/能力反链实际回读；[剩余理论/音乐学/认知/现场及学科21源行](g04-r8-supplementary-source-readback.md)。综合缺陷由R8a/c补证；15 issue仍OPEN，不能自动关闭。 |
| CAL01/02 拆分 | [28 NEW](g04-r8-split-new-readback.md) 当前双向主案例与源集合；[REUSE/REF上](g04-r8-split-reuse-ref-readback-1.md)、[下](g04-r8-split-reuse-ref-readback-2.md) 51 REUSE/16 REF的71次实际入口定位，R7独立逐28组合文本和路由核对仍为历史证据；28 SPLIT_OPEN保留。 |
| 见证重放 | [R8h](g04-r8-current-witness-replay.md)：K16/17/18/19原函数实际逐值严格true 40/33/49/44；R8a/c 70/24。历史重叠不作独立覆盖。 |

关键blob：
- g04-r8-xc01-independent-evidence.md: 9ce52519372828337ccd19f0af30e12189279719
- g04-r8-cq-semantic-remediation.md: f5f910a452b26c387b75fe1976e42a1bcdf6d50b
- g04-r8-seven-role-evidence.md: 1326f94277d09281075f2423116f515334ea72bc
- g04-r8-formal-cq-scope-reconciliation.md: 0b42cfce36c94559eb32e8158233f1ef3d9001ec
- g04-r8-current-witness-replay.md: 550ec0970bcc6b78af5ced05303a974ec41ffd91
- g04-r8-split-new-readback.md: b5fac8e6b27f0ce91d69f9ddbb8b77c5963cbf85
- g04-r8-split-reuse-ref-readback-1.md: a4bf1863dde4474f8970bc42156ae15a57bb154b
- g04-r8-split-reuse-ref-readback-2.md: fe9a60350ea2e2ab8c20c13ac83251534c866d7a
- g04-r8-affected-impact-readback-1.md: 7f89209b68271f17924d3753078d5b83499bf300
- g04-r8-affected-impact-readback-2.md: 8f0df654a6379e7b362b2e2e1ab046cca09b2d51

## 独立复审范围及收敛规则

1. 首先验证R7两残余P1（包括Reviewer具体反例及实际当前报告/参考/权限条件），独立检查R8a/c及实际七阶段追溯。不要用旧60/48当新证明。
2. 保持CAL01–06完整阶段门禁，**可继承实际已验证、且对应文件/语义未变的R6/R7及原G02/G03独立证据**，以exact SHA/blob与具体结论建立继承边界，而不是盲目重做十九域所有历史内容或仅凭旧PASS自动通过。R7独立已逐36本地修订方向、28组合需求文本/路由、26问语义读过，保留其S/U/I限制。R8的实际来源/影响/主责回读用于核剩余U/I，独立审查者仍须裁决实质正确性。
3. 对36发现、28拆分、19域专业深度、来源资格/六资产、1113角色与CQ逐项或按有明确共同证据的有界组给出最终当前阶段裁决，标出已继承、实际补核、仍缺证及其是否阻断的理由；不能以单一计数或复现脚本替代专业判断。允许明确限定的L1残余、历史待证和未来验证项保留；如果原阶段合同仍需实质证据而缺失则FAIL/BLOCKED，列出**具体**对象、缺失的证据、风险及可执行最小补救，不以泛泛“未全面复核”冒充完整独立通过。不能为通过而降低G04合同。
4. 审核不要求全量重新取得原本不可访问的外部出版物或真实音频/LLM/设备/DB/CI；必须保持原来源访问、许可证及证据等级，不能提升。CAL04维持MTO/MO/Polifonia/SKOS/PROV/SHACL限定，NO_IMPORT及许可未明继续隔离。真实实施/授权、accepted claims及L1 freeze均未达。
5. 只读Reviewer回写#78及PR79、绑定exact HEAD及原基线，结论PASS/FAIL/BLOCKED、P0/P1/P2，具体独立范围/继承证据/未验证及残余；不修改文件、不合并、不关闭。Builder核验新结论后处理收尾；CAL07/G05/T03/L2在G04通过前继续阻塞。

本次无新增正式CQ或owner范围决策；所有变更为L1候选知识与实际有限见证。未完整重读全部外部原文或重新逐一执行所有历史模块，不宣称专业完备、独立关闭或实际工具运行。尚有原专业缺证项，需审查者明确其适用边界。
