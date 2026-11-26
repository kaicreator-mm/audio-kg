# K02 R2：实际有限计算记录
2026-11-26。Builder JS环境实际执行31项断言，以下为实际值与相同预期，非专业独立审核。采用12TET MIDI整数、模12成员关系、四分拍时值、明确时间起点、确定性规则和有限数组比较。CO44/45是原创数学见证，不是音乐软件或AI模型运行；不把符号符合等同审美、可唱性或真实音频通过。
| 检查 | 实际（与预期一致） | 结果 |
|---|---|---|
| CO25 phrase rest | 15+1=16 | PASS |
| CO26 pickup end | [0,1,2,4] | PASS |
| CO26 shifted accent | .5 | PASS |
| CO27 duration | [16,18] seconds | PASS |
| CO27 range | E5>D5 true | PASS |
| CO28 A/B/C membership | [[true,false,true,true],[true,true,true,true],[true,true,false,true]] | PASS |
| CO31 m4 length | 4 | PASS |
| CO31 harmonic count | [1,1,2,1]（声明输入计数） | PASS |
| CO32 event density | [1,2] per beat | PASS |
| CO34 intervals | [4,3] semitones | PASS |
| CO35 directions | [[-1,0],[-1,0],[1,0]] | PASS |
| CO37 fixed note count | [true,false] | PASS |
| CO39 membership | [[true,true,true,true],[true,true,true,true]] | PASS |
| CO40 single tone membership | [true,true,true,true] | PASS |
| CO41 grid end | [.5,1,4,5.5,6,8] | PASS |
| CO41 membership/range | [[true,true,true,true,true,true],[true,true,true,true,true,true],true] | PASS |
| CO42 membership | [[true,true,true,true],[true,true,true,true]] | PASS |
| CO42 duplicate pattern | 2 distinct among 3 | PASS |
| CO43 cycle membership | [[true,true,true,true],[true,true,true,true]] | PASS |
| CO44 enumeration | [[0,0,4,7],[0,2,4,7],[0,4,4,7],[0,4,7,7]] | PASS |
| CO44 impossible target | 11 not in set | PASS |
| CO45 fixed seed | [0,1,2,3] | PASS |
| CO45 changed seed | [1,2,3,0] | PASS |
| CO45 extra draw | [0,2,3,0] | PASS |
| CO46 inversion | [3,1,11,2,0,10,8,9,7,5,6,4] | PASS |
| CO46 RI end/cardinality | [3,3,12] | PASS |
| CO47 counts/durations | [[4,7,9],[2,3.5,4.5]] | PASS |
| CO48 rotation four steps | [60,62,64,67]（独立四事件轮转数组验证） | PASS |
| CO48 common period | 42 s | PASS |
| CO51 invalidation | [E1,R1,P1] | PASS |
| CO52 hard filter | [true,false] | PASS |
CO48原第一次轮转检查复用CO47的音序数组，证明通用四项轮转但未绑定CO48具体音列；后续单独以CO48真实音列复算并记录，避免把测试对象混同。CO31和声数是声明输入直接核对，不是实际和声识别。CO44用两个内部位置各四候选的笛卡尔积16组，筛相邻绝对差≤4；固定首0/末7，4可行；末11不在集合。CO45按声明LCG逐步计算，输出索引；小模数仅教学，非良好随机数发生器或实际工具。未执行听评、MusicXML宿主、DAW、SuperCollider、实际语音、LLM/数据库。

CO48绑定修正：实际独立重新运行原例M=[60,64,62,67]，五轮输出 [[60,64,62,67],[64,62,67,60],[62,67,60,64],[67,60,64,62],[60,64,62,67]]；前四轮唯一，第四次位移回原。该额外绑定检查PASS；原31断言计数保留，另加1个定向检查，不重复计数。
