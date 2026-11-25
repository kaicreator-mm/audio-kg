# G02 R2 有限可复算核查

在本轮工具执行环境直接运行独立JS算术断言；下列实际值由运行输出生成。不是仓库运行时代码、独立专业审核或完整作曲规则验证。人工条件语义与原始材料资格另行核查。

| 断言 | 实际 | 预期 | 结果 |
|---|---|---|---|
| H1 intervals | `[12,7,3,9,12]` | `[12,7,3,9,12]` | PASS |
| H1 parallel | `[]` | `[]` | PASS |
| H1 last contrary | `[-2,1]` | `[-2,1]` | PASS |
| H1 start mutation | `7` | `7` | PASS |
| H2 downbeat fifths | `[7,7]` | `[7,7]` | PASS |
| H2 exception motions | `[5,-3,2]` | `[5,-3,2]` | PASS |
| H2 mutated leap | `2` | `2` | PASS |
| H3 cambiata intervals | `[12,10,7,9]` | `[12,10,7,9]` | PASS |
| H3 mutation | `5` | `5` | PASS |
| A5 positive vertical | `[12,3,5,7,3,12,9,12]` | `[12,3,5,7,3,12,9,12]` | PASS |
| A5 positive dissonant indices | `[2]` | `[2]` | PASS |
| A5 motion at passing | `[2,2]` | `[2,2]` | PASS |
| A5 durations | `[4,4,4,4]` | `[4,4,4,4]` | PASS |
| A5 max leap | `7` | `7` | PASS |
| A5 unordered pairs unique | `7` | `7` | PASS |
| A5 turning interval tritone | `false` | `false` | PASS |
| A5 parallel | `[]` | `[]` | PASS |
| A5 eighth pair | `4` | `4` | PASS |
| A5 suspension insert | `[10,7,9]` | `[10,7,9]` | PASS |
| A5 repeat negative | `true` | `true` | PASS |
| IC10 original | `[12,7,3,7,12]` | `[12,7,3,7,12]` | PASS |
| IC10 exchanged | `[4,8,12,8,4]` | `[4,8,12,8,4]` | PASS |
| IC10 shift | `[16,15,15,15,16]` | `[16,15,15,15,16]` | PASS |
| IC10 parallels original | `[]` | `[]` | PASS |
| IC10 parallels exchanged | `[]` | `[]` | PASS |
| IC10 mutation parallel octave | `[2]` | `[2]` | PASS |
| IM imitation | `[7,7,7,7,7]` | `[7,7,7,7,7]` | PASS |
| IM bass consonance | `true` | `true` | PASS |
| IM upper fourth support | `[[4,9,5],[4,9,5]]` | `[[4,9,5],[4,9,5]]` | PASS |
| IM no crossing | `true` | `true` | PASS |
| IM three pair parallels | `[[],[],[]]` | `[[],[],[]]` | PASS |
| IM mutated bass parallel | `[5]` | `[5]` | PASS |
| IM altered answer | `8` | `8` | PASS |
| L01 quantization | `[0,0]` | `[0,0]` | PASS |
| L01 residual | `[19.562,38.906]` | `[19.562,38.906]` | PASS |
| L01 full residual inversion | `[true,true]` | `[true,true]` | PASS |
| L02 Lydian | `[2,2,2,1,2,2,1]` | `[2,2,2,1,2,2,1]` | PASS |
| L03 group lengths | `[[0,3,5],[0,2,5],[0,3,6]]` | `[[0,3,5],[0,2,5],[0,3,6]]` | PASS |
| L04 durations | `[2.772589,2.666667]` | `[2.772589,2.666667]` | PASS |
| L05 stacks | `[[4,3],[5,5],[7,7],[2,2]]` | `[[4,3],[5,5],[7,7],[2,2]]` | PASS |
| L06 upper spacing | `true` | `true` | PASS |
| L06 overlap | `[true,true]` | `[true,true]` | PASS |
| L06 crossing | `true` | `true` | PASS |
| L07 pedal membership | `[[true,false,true],[true,true,true]]` | `[[true,false,true],[true,true,true]]` | PASS |
| L09 accidentals midi | `[65,65,78,65,65,66,65,65]` | `[65,65,78,65,65,66,65,65]` | PASS |
| L10 meter | `[4,4]` | `[4,4]` | PASS |
| L11 enharmonic same midi | `[61,61]` | `[61,61]` | PASS |
| L11 pc set | `[1,4]` | `[1,4]` | PASS |
| C01 compound | `[19,7]` | `[19,7]` | PASS |
| C02 directed | `[16,-3,6]` | `[16,-3,6]` | PASS |
| C03 spans | `[true,true,true]` | `[true,true,true]` | PASS |
| C04 lower suspension | `[4,2,3]` | `[4,2,3]` | PASS |
| C05 spacing | `[[16,3,5],[16,3,21],[16,15,5]]` | `[[16,3,5],[16,3,21],[16,15,5]]` | PASS |
| C06 roots doubled | `[2,1,2,2,2]` | `[2,1,2,2,2]` | PASS |
| C07 parallel fifth | `[1]` | `[1]` | PASS |
| C07 parallel oct | `[1]` | `[1]` | PASS |
| C07 compound fifth | `[1]` | `[1]` | PASS |
| C07 thirds | `[]` | `[]` | PASS |
| C07 contrary octave | `[]` | `[]` | PASS |
| C09 distinct motif | `[2,5,-3]` | `[2,5,-3]` | PASS |
| C09 P differs from S | `false` | `false` | PASS |
| C11 countersubject | `[5,5,5,5]` | `[5,5,5,5]` | PASS |
| C13 triplet | `480` | `480` | PASS |
| C12 overlap | `true` | `true` | PASS |

合计 64/64。A5此前固定结构有限搜索未找到满足所编码全部条件的正例，另一候选出现三全音轮廓而弃用；新候选仅通过此处所列检查，含重复建议违例的分支例仍作局部见证/反例。IM与IC10按实际音高验证，不将任意模仿当严格卡农。未执行音频、MusicXML宿主、图数据库或LLM测试。R1的196560次集合验证为历史记录，本轮未重复计数。
