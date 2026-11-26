# K02 R4 实际有限核查
Builder JS环境执行16项实际断言。初始稿扩展VC的16小节计数在提交后复核时发现有误，修正为17小节；turnaround末和弦改G7时同步换B4，原C5非成员作为负例保留。非听觉、真实语音、宿主、图谱或独立专业审核。X05/07的单位计数仅题定拆分或字数，不是语音识别。
| 检查 | 实际 | 预期 | 结果 |
|---|---|---|---|
| X01 baseline members | [true,true,true,true,true,true,true,true,true,true,true,true] | [true,true,true,true,true,true,true,true,true,true,true,true] | PASS |
| X01 turnaround members | [true,true,true,true,true,true,true,true,true,true,true,true] | [true,true,true,true,true,true,true,true,true,true,true,true] | PASS |
| X01 unchanged melody negative | false | false | PASS |
| X01 chord groups | 12 | 12 | PASS |
| X03 expanded bars | 17 | 17 | PASS |
| X03 nominal seconds | [15,20,20,42.5] | [15,20,20,42.5] | PASS |
| X04 durations | [4,4,4,4] | [4,4,4,4] | PASS |
| X04 total | 32 | 32 | PASS |
| X05 declared counts | [4,3] | [4,3] | PASS |
| X05 duration | [4,4] | [4,4] | PASS |
| X06 transition classes | [["same","same","same"],["same","oblique","oblique"],["contrary","oblique","contrary"]] | [["same","same","same"],["same","oblique","oblique"],["contrary","oblique","contrary"]] | PASS |
| X06 source counts | 3545 | 3545 | PASS |
| X06 source rounded percent | [77,4,19] | [77,4,19] | PASS |
| X07 text counts | [3,3,5] | [3,3,5] | PASS |
| X07 strict one-to-one candidate | [true,true,false] | [true,true,false] | PASS |
| X02 phrase closure D total | 5 | 5 | PASS |
实际16/16。S326统计仅复算论文所报计数与舍入，不重跑20首语料，不以比例设语言通用阈值。