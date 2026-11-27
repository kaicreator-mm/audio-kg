# G04 R4a — CAL04 六类本体资产与标准的限定复用研究
Builder候选；不冻结L2架构，不导入第三方本体、不生成accepted claim。实际读三份序列化本体及PON v1.0 README、W3C三份规范；原始地址/版本/Blob及访问差异见下。Git blob固定所读文本，未锁定完整外部导入闭包，未运行OWL reasoner、SHACL processor或SPARQL端点。

| 资产 | 实际读取与版本 | 许可与限制 | 候选语义及项目问题 | 不得推断/替代 |
|---|---|---|---|---|
| MTO | [ont/mto.ttl](https://github.com/tetherless-world/MusicTheory/blob/master/ont/mto.ttl)，blob 1ee5ca33a5eca0d496fd7d0e66fcaeb911a93787，1226行，versionIRI mto/0.9 L19–29；raw URL失败，GitHub实际读取成功 | L28 Apache-2.0声明；L27 imports被注释；外部命名空间的完整依赖及权利未核 | Note/Pitch/Duration L807–824、Scale L1115–1129、Interval/Chord L229–247、hasTonic L54–57、hasDegree L100–109、hasDurationLength L127–131；CQ01/02/03、K01 | hasTonic等价hasRootNote只属该模型，不能混同调性功能；hasDegree为Note整数属性，需项目独立音符/和弦/音阶上下文，不能跨上下文继承；Duration单位为1/16 beat，不能与秒或1/16全音符直接等价；Chord定义与Monad子类范围冲突需限定。 |
| Music Ontology | [rdf/musicontology.n3](https://github.com/motools/musicontology/blob/master/rdf/musicontology.n3)，blob e738bd269525f9c18877bb316f1f3e46e558d743，2794行，L33 Revision 2.1.5，L23日期2013-07-22；raw URL失败，GitHub实际读取 | 文件头L21–41未声明明确本体许可，外部许可未核，LICENSE_UNKNOWN，先只参考语义 | MusicalWork L455起、Performance L486–498、Signal L640–649、Track L712–719；performed L1877–1887，recorded_as L2238–2252；CQ19/21/23、K09/K15/K16 | 作品、表演事件、信号、发行轨不是同一实体；recorded_as捷径不替代设备、事件或证据；performed标unstable；不推出录音可复制或所有权。 |
| Polifonia PON / Music Representation | [PON release v1.0](https://github.com/polifonia-project/ontology-network/releases/tag/v1.0) (release页面短commit 0aaaf91)，[tag README](https://github.com/polifonia-project/ontology-network/blob/v1.0/README.md) blob 1b9e704ed94c646cc5786381833b4fb2c8eb54a8 L52–53；实际[MR owl](https://github.com/polifonia-project/music-representation-ontology/blob/main/ontology/music-representation.owl) blob a3df856528b8df9e747ec73bf138be0a13b45341，919行，L44 versionInfo1.0 | PON README L10 CC BY4.0，MR README blob 9f40a6e951a51de54d6b51b8bfbbaf7cfb8e1051 L8 CC BY4.0；MR OWL L19/30/32却CC BY-SA4.0；LICENSE_CONFLICT，禁止直接复制/导入直到资产级核对；MR main与PON tag的精确版本对应未证 | MR Annotation→Observation→MusicProjection L248–269，Fragment→MusicTimeInterval L275–281，具体理论与标注者语境 L23–26；CQ04/11/22/24、K01/K10/K16 | MR hasObservation同时functional/inverse-functional，不宜不加检查直接映射多标注、多观察；区间functional，不能合并不同时间基准；缺少项目证据等级及许可状态，不能据其证明知识真伪。 |
| SKOS | [2009-08-18 Recommendation](https://www.w3.org/TR/2009/REC-skos-reference-20090818/)，实际HTML §10.3–10.6（当前页面L1208–1430） | W3C文档使用规则，页面版权L17；RDF文件web读取不支持application/rdf+xml；未复制 | 概念词表/映射，CQ18/23/26、D24/25历史槽；exactMatch对称且传递，closeMatch不是传递关系；可参考broader/narrower | 28个旧槽复合需求不得直接sameAs或exactMatch单一目标；NEW/REUSE/REF保留自有带条件关系，不能因字符串相似建等价。 |
| PROV-O | [2013-04-30 Recommendation](https://www.w3.org/TR/2013/REC-prov-o-20130430/)，§3与wasDerivedFrom L873–915、qualifiedDerivation L2550–2614 | W3C规范参考，ns/prov-o.ttl读取不支持text/turtle；机器可读资产的完整许可/导入仍待核 | Entity/Activity/Agent，used/wasGeneratedBy/wasDerivedFrom；qualified derivation可关联活动；CQ19/21/24/25/26、K09/K12/K15、回执版本 | 派生链仅表示来源/转换，不证明事实真实、作者同意、当前许可或证据等级。 |
| SHACL | [2017-07-20 Recommendation](https://www.w3.org/TR/2017/REC-shacl-20170720/) §1.3、§3.4–3.6、§4.2.1，minCount L1128–1144 | W3C规范参考；ns/shacl.ttl读取不支持text/turtle；未复制、未运行 | 形状图与数据图分离；minCount/maxCount、数据类型、枚举及报告，CQ21/24/26 | 缺字段时违反项目规定，不等于RDF开放世界下该事实为假；结构通过不等于科学真理、安全或实际运行。 |

## 候选对接判别（静态案例，不是外部本体导入）
1. MTO：题设同一音高对象在C大调与A小调有不同音级，degree记录绑上下文，保留两个独立断言；16个duration unit=1个题设beat，缺tempo和beat单位则秒UNKNOWN。反例直接将hasDegree当全局属性、直接等于16分音符。 
2. MO：W1抽象作品，P1演出，S1录音信号，T1发行轨四个ID；P1 recorded_as S1仅元数据关系。反例使用W1版权登记证明T1发行许可。
3. PON：同一音频片段可有分析者A与B的独立annotation、同版本时域片段，Observation单独建ID，不强行将两观察或理论合并。当前许可冲突阻塞复制，不阻塞项目自建有出处的候选表示。
4. SKOS：旧槽K09.07.01.01分物理路径和现场诊断，不生成exactMatch；相似术语仅带来源条件，未知保持UNKNOWN。
5. PROV：候选C2由C1修订，回执R1针对C1；记录revision activity/agent/target，R1不自动验C2，来源链不授许可。
6. SHACL：题设候选主张需id、精确来源与定位、状态、owner、边界；无来源则结构验证失败，齐全也仅为结构候选，不能自动接受。真实SHACL引擎待L2选型。

## 开放事项
- MTO本体需进一步核查导入和具体规则推导覆盖；MO机器可读许可待查；PON许可声明不一致需资产级复核，独立记录不是项目级许可判决。
- W3C三份规范的语义已定位，机器可读资产下载/许可及引擎兼容未测试。不得把本轮静态参考登记当完成导入。
- 六种资源只是不同层候选：专业理论、音乐元数据、音乐标注、概念关系、来源、结构校验。L2仍待决策；音频、教育、生理、认知、实际工具及跨文化事实不由外部本体填空。
