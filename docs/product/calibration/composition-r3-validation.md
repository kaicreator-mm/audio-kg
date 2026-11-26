# K02 R3 有限定向见证
实际执行JS 17项，所有结果仅验证声明的合成输入与计算，不是语音、音乐软件、听评、LLM、独立审核。音韵分类使用题定音素特征而非实际发音识别；音节计数核题设拆分而非自动分词；CO57时间值不替代语义分析。
| 检查 | 实际 | 预期 | 结果 |
|---|---|---|---|
| CO54 three types | ["PERFECT","FAMILY","ASSONANCE"] | ["PERFECT","FAMILY","ASSONANCE"] | PASS |
| CO54 identical | "IDENTICAL" | "IDENTICAL" | PASS |
| CO55 stated syllable lengths | [4,5,4,5,4] | [4,5,4,5,4] | PASS |
| CO56 accent evidence | [true,false] | [true,false] | PASS |
| CO56 duration | [true,false] | [true,false] | PASS |
| CO57 musical break vs text boundary | [2,1] | [2,1] | PASS |
| CO57 before second phrase | [3,3] | [3,3] | PASS |
| CO58 durations | [4,4] | [4,4] | PASS |
| CO60 Z duration | 4 | 4 | PASS |
| CO63 seed collisions | [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]] | [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]] | PASS |
| CO63 all seed equivalence classes | [[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15]] | [[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15]] | PASS |
| CO63 distinct seed example | [1,2,3,0] | [1,2,3,0] | PASS |
| CO64 passing directions | [2,2,6,-2] | [2,2,6,-2] | PASS |
| CO64 membership | [[true,false,true],[true,false,true]] | [[true,false,true],[true,false,true]] | PASS |
| CO33 same total time | [4,4] | [4,4] | PASS |
| CO38 crossing strong coordinate | [0,1] | [0,1] | PASS |
| CO52 hard range | [true,false] | [true,false] | PASS |
CO63枚举全部16种seed，确证输出低两位四类各4解；原CO45 seed3→4实际区别保留，但通用说法已修正。CO64只检查成员与指定级进，非和弦音合法性仍受语境和风格限定。