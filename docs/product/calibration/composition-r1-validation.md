# K02 R1 实际有限见证

仅在Builder JS环境计算以下原创符号输入；非专业审核、真实音频、工具/LLM或开放创作质量通过。失败/反例按具体谓词保留。
| 检查 | 实际 | 预期 | 状态 |
|---|---|---|---|
| CO02 24 vs25 measures | [60,62.5] | [60,62.5] | PASS |
| CO04 both length | [4,4] | [4,4] | PASS |
| CO09 direction equality | [[1,1,-1],[1,1,-1]] | [[1,1,-1],[1,1,-1]] | PASS |
| CO09 range | [67,69,67] | [67,69,67] | PASS |
| CO09 unequal interval shift | [2,1,2,1] | [2,1,2,1] | PASS |
| CO10 onset | [[0,1,2,3],[0,0.5,1,2]] | [[0,1,2,3],[0,0.5,1,2]] | PASS |
| CO12 strict T | [2,2,2] | [2,2,2] | PASS |
| CO13 inversion | [[4,3],[-4,-3],[-3,-4]] | [[4,3],[-4,-3],[-3,-4]] | PASS |
| CO14 ratios | [[2,2,2],[0.5,0.5,0.5],[2,1,1]] | [[2,2,2],[0.5,0.5,0.5],[2,1,1]] | PASS |
| CO15 reverse twice | [["C4",1],["E4",0.5],["D4",0.5]] | [["C4",1],["E4",0.5],["D4",0.5]] | PASS |
| CO15 duration order | [0.5,0.5,1] | [0.5,0.5,1] | PASS |
| CO16 duration conservation and extension | [4,4,5,2] | [4,4,5,2] | PASS |
| CO17 total | 12 | 12 | PASS |
| CO21 distinct syllables | 2 | 2 | PASS |
| CO21 s2 duration | 3 | 3 | PASS |
| CO24 allowed diff | ["n2.t"] | ["n2.t"] | PASS |
| CO24 protected mutation | ["n2.p","n2.t"] | ["n2.p","n2.t"] | PASS |

实际 17/17。计算使用明确八度的MIDI整数差、相邻方向、拍数×60/BPM、时值前缀和/比例、事件数组逆序、唯一音节ID及逐字段差异。没有把形式检查推广成语音/音乐审美或真实软件验收。初始24组全部四视角为待审核的L1候选；并非96次实际语义测试。