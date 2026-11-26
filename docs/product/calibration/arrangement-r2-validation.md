# K03 R2 实际有限检查
ChatGPT Web JS，实际 27 项通过；仅有限合成计算/结构判断，非听评、演奏、语义评测或独立审核。
1. unique case/D4 — true
2. four views present — true
3. AR11 octave mapping — true
4. AR12 same pedal conflict — true
5. AR12 different pitch classes — true
6. AR13 glissando conditional span — true
7. AR14 clarinet — true
8. AR15 doubling — true
9. AR16 register — true
10. AR17 same melodic trajectory — true
11. AR18 duration — true
12. AR20 onset rate — true
13. AR20 mean activity — true
14. AR21 slash bass — true
15. AR22 descending bass — true
16. AR23 C9 pitch-class identity — true
17. AR23 close upper span — true
18. AR24 guide lines — true
19. AR25 eight eighths — true
20. AR25 Alberti order — true
21. AR26/27 offbeat phase — true
22. AR26 ends inside bar — true
23. AR28 3+3+2 — true
24. AR29 two valid candidates — true
25. AR30 onset count — true
26. AR31 background note attacks — true
27. AR32 protected time region — true
AR13能力范围为题定；AR25顺序检查仅给定数组一致性，非独立风格识别；AR29选择只按题定反拍特征，不代表完整风格；AR31计的是note-on（同起三音算3），非不同起音时刻数。

R2追加实际校验：
28. AR25 从音高排序构造低-高-中-高索引，正例匹配且替代分解序列被拒绝 — true
29. AR29 对实际A/B/C候选时位数组逐项筛选，得到[A,B] — true
30. 原库存24 D3×2=48唯一旧槽；R1/R2 32唯一案例；全部路由引用由实际读回行生成，目标存在 — true
总计30项有限检查（原27项含低强度见证20/24，追加28/29增强，不计为独立专业验证）。
