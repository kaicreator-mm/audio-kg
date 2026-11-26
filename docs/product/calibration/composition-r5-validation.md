# R5定向实际有限检查
执行于Builder JS环境；以下是声明的语言模型/词语与旋律预筛、条件与状态合同的计算，并非自动语音识别、真实歌唱、母语判断或独立审核。S328双音节规则在本题限定域内使用，未推广复杂三声串、轻声或真实说话人；S330声明粤语六调，未运行TTS/ASR。语义/语用标记来自明确题设与S329/S331词语定位，而非程序识别。实际执行28/28项。
| 检查 | 实际 | 预期 | 结果 |
|---|---|---|---|
| M lexical-to-surface | [["21","55"],["35","213"],["35","213"]] | [["21","55"],["35","213"],["35","213"]] | PASS |
| Y lexical-to-contour | [["25","21"],["23","25"],["23","55"],["55","25"],["55","33"]] | [["25","21"],["23","25"],["23","55"],["55","25"],["55","33"]] | PASS |
| M tail pairs | [[1,5],[5,3],[5,3]] | [[1,5],[5,3],[5,3]] | PASS |
| Y tail pairs | [[5,1],[3,5],[3,5],[5,5],[5,3]] | [[5,1],[3,5],[3,5],[5,5],[5,3]] | PASS |
| actual note direction | [1,-1] | [1,-1] | PASS |
| both melody spans | [4,4] | [4,4] | PASS |
| M↑ all classes | ["same","contrary","contrary","contrary","same","same","oblique","contrary"] | ["same","contrary","contrary","contrary","same","same","oblique","contrary"] | PASS |
| M↓ all classes | ["contrary","same","same","same","contrary","contrary","oblique","same"] | ["contrary","same","same","same","contrary","contrary","oblique","same"] | PASS |
| M B final-T3 sensitivity | ["contrary","contrary","contrary"] | ["contrary","contrary","contrary"] | PASS |
| M B lexical-only failure | "oblique" | "oblique" | PASS |
| M↑ greeting selection | ["A"] | ["A"] | PASS |
| Y↑ greeting selection with semantic reject F | ["E"] | ["E"] | PASS |
| Y↑ morning-specific no finite solution | [] | [] | PASS |
| Y↓ morning-specific alternative | ["D"] | ["D"] | PASS |
| M↑ respectful hard no finite solution | [] | [] | PASS |
| M↓ respectful alternative | ["C"] | ["C"] | PASS |
| M↓ multiple general/polite choices | ["B","C"] | ["B","C"] | PASS |
| Y E/F same endpoints different semantics | [[3,5],[3,5],null,false] | [[3,5],[3,5],null,false] | PASS |
| Y 5→2 tone numbers not endpoints | [-1,1] | [-1,1] | PASS |
| Y G two readings | ["oblique","contrary"] | ["oblique","contrary"] | PASS |
| M protected notes unchanged | [] | [] | PASS |
| M changed lyric fields | ["n1","n2"] | ["n1","n2"] | PASS |
| Y protected notes unchanged | [{"id":"n1","p":60,"t":0,"d":2},{"id":"n2","p":64,"t":2,"d":2}] | [{"id":"n1","p":60,"t":0,"d":2},{"id":"n2","p":64,"t":2,"d":2}] | PASS |
| no silent melody edit | [true,true] | [true,true] | PASS |
| declared dependency invalidation | ["alignment","voice","scoreWithLyrics"] | ["alignment","voice","scoreWithLyrics"] | PASS |
| fail closed unknown review | [false,false,true] | [false,false,true] | PASS |
| X02 phrase length | 5 | 5 | PASS |
| X05 stipulated assignment counts | [4,3] | [4,3] | PASS |
计算方法：对普通话前T3在后T3时设35、后T1时设21，末T3声明213；粤语按S330调号映射。提取每轮廓末位数字并与MIDI音符差取sign，相同(含双平)/反向/单平斜向；M↑为60/64，M↓为64/60，均0/2起点、2/2时值。筛选先语境、称谓、正式性及词表，然后按本题选定的同向预筛；无解不自动放宽，真实采用需母语/用户确认。M↓方案只有改曲授权后才可提交。X02/X05有限计数不等专业或实际音频通过。