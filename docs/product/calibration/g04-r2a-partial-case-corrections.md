# G04 R2a — 第一批原专业案例修订与有限自检

#78 / PR79，BUILDER_PARTIAL，不是完整 R2，非独立审核。基线 63a7df2e55ad79149a3eddf0937605f3c14f4280；案例实际回读 afe7e9551b1387e085ebb604364c752c74621c19。只改原主案例行，不重写历史审核，原发现链接行号及ID保持不变。以既有审核合同与已登记来源为依据；本批未重新访问原始出版物，未提升来源资格。尚须同步影响范围（发现/legacy/能力/CQ/综合案例/来源）后才能登记完整修订候选。

| Issue/发现 | 原案例实际变化 | 尚未完成 |
|---|---|---|
| #35 RV01 | PF39 明确共享时基、端点与符号，拒绝身份/链路不符 | 发现、能力、legacy与综合检查 |
| #38 RV01 | VS35 /p/闭塞限定、平衡、零口流、相邻峰插值及反例 | 源条目原文核对、发现/能力/legacy、协议有限检查 |
| #38 RV02 | VS64 参考/估计/音乐目标三分 | KC-V05、发现及能力/legacy |
| #41 RV01 | VT39 不可变事件、独立时钟、可信连接及反例 | 发现/能力/综合影响复查 |
| #46 RV01 | DA04/DA32 有效位与容器字节 | 其余指定案例/旧槽/能力/CQ |
| #46 RV02 | DA08 同FFT观察窗及零填充对照 | DA35、旧槽/能力/CQ及源核对 |
| #46 RV03 | DA27/DA54 状态位及实时边界 | 实际文档重核、旧槽/能力/CQ、完整位掩码见证 |

实际回读逐行差异（相对于R1），6文件行数与变更表格列数不变：
- [performance-r2-knowledge-cases.md](performance-r2-knowledge-cases.md) 908a1f7899cf76d7d1ce30c5675d6626d1ee8c00；PF39 L25
- [vocal-science-r2-knowledge-cases.md](vocal-science-r2-knowledge-cases.md) 7c28a54003d1f559aeac5926b72370b30f61cf59；VS35 L9
- [vocal-science-r3-knowledge-cases.md](vocal-science-r3-knowledge-cases.md) 08208a28e1ea95edb2ec83210e97542c3623298b；VS64 L8
- [vocal-training-r2-knowledge-cases.md](vocal-training-r2-knowledge-cases.md) 34483d1ed788c9252f4ca033d9b919aa48c343a2；VT39 L13
- [digital-audio-r1-knowledge-cases.md](digital-audio-r1-knowledge-cases.md) de9a96646714c5d3ffa372d81c085981c2f96aa5；DA04 L8、DA08 L12、DA27 L31
- [digital-audio-r2-knowledge-cases.md](digital-audio-r2-knowledge-cases.md) 152119a9bf910f46152aff7b4fd051a0bdcbc796；DA32 L9、DA54 L31

## 本轮实际有限计算/谓词探针
1. PF39 +10ms — true
2. PF39 mismatched identity rejected — true
3. PF39 inconsistent link rejected — true
4. VS64 reference and target distinct — true
5. VS64 target match cannot replace actual reference — true
6. VT39 trusted reordered display — true
7. VT39 true mismatch preserved — true
8. VT39 duplicate rejected — true
9. VT39 time mismatch rejected — true
10. DA04 16-bit — true
11. DA04 24 container — true
12. DA04 20 valid not 20 container — true
13. DA08 observation changes only — true
14. DA08 padding changes grid not window — true
15. DA54 combined flags — true

上述 15/15 是本轮 JS 合成算例实际断言，非现有R4重放、标准符合测试、人体或实际设备实验。VS35 只做知识文本修订，未运行协议探针。DA54 掩码使用题设合成位2和4，不宣称真实API运行。全部15个P2 Issue继续OPEN；R1的9个候选保持，R2a另外7项仅局部改动，不增加完整修订计数；余27项中20项尚无本轮主案例变更，7项需完成影响路径。保持全部28 SPLIT_OPEN。R2b继续余项，R3–R6未开始，G04完整候选前不派独立审核，不合入或关闭Issue。
