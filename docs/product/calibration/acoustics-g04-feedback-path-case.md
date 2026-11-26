# G04 R3 — K07声学反馈路径精确候选
D25原候选K07.06.04.01（旧K09.07.01.01），当前K07主责仅物理路径及模型；K19现场诊断/风险，K08信号处理，K15实际许可。不是正式主张接受。
| 案例 | D4 | 来源 | F+ | F− | R+ | R−/边界 |
|---|---|---|---|---|---|---|
| AC51 | K07.06.04.01 | S033/S096 | 合成有向拓扑mic→amp→speaker→air→mic构成可能回路；删air→mic则所给图没有该回路。闭合结构不证明持续振荡：抽象归一化标量递推y[n]=.5 y[n−1]、y[0]=1得到1,.5,.25,.125（非真实系统参数），仍衰减。 | 只见音箱与话筒便断言反馈；把任何闭合路径、峰值或嘶声判为实际振荡；根据自由场公式推真实场地稳定性。 | 从已记录物理拓扑/校准/频响和时窗确认回路是否可达，区分真实声源、环境传输和放大电路；实际持续声的诊断需K19与测量证据。 | 图不完整UNKNOWN；图无环仅当前模型，非实际无风险。频率相关环路响应、相位和稳定条件需独立证据；不做危险复现、实际增益设置、现场声级或安全放行。 |

S033 [OpenStax §17.3](https://openstax.org/books/university-physics-volume-1/pages/17-3-sound-intensity) 实际L34–53及式17.8–17.10，理想传播模型；S096 [Shure](https://www.shure.com/en-GB/insights/how-to-control-feedback-in-a-sound-system) 实际L114–129，厂商对物理闭环的描述，不采操作剂量或实际现场结论。二者不直接证明抽象递推为实际设备模型。原D25 [候选](domain-mixed-migration-predicate-batch.md#L28)、[拆分行](domain-mixed-migration-predicate-batch.md#L61)不改。K19 [LS25](live-sound-r2-knowledge-cases.md#L9)是现场诊断，K07 [旧测量槽](acoustics-r3-legacy-convergence.md#L43)仅校准/条件；K08.04参考非主责。

实际有限计算 6/6：
- closed topology is only possible path — true
- missing return path prevents complete modeled loop — true
- abstract stable recurrence decays despite closed loop — true
- incomplete path evidence unknown — true
- topology alone not oscillation — true
- absent modeled loop not universal absence — true

```js
function feedbackReplay(){
 const check=(s,b)=>{if(!b)throw Error(s);return s};
 const reachable=(edges,a,b)=>{let todo=[a],seen=new Set;while(todo.length){let n=todo.shift();if(n===b)return true;if(seen.has(n))continue;seen.add(n);for(const [x,y] of edges)if(x===n)todo.push(y)}return false};
 const e=[["mic","amp"],["amp","speaker"],["speaker","air"],["air","mic"]];
 const loop=(edges)=>reachable(edges,"speaker","mic")&&reachable(edges,"mic","speaker");
 const r=[];r.push(check("closed topology is only possible path",loop(e)));
 r.push(check("missing return path prevents complete modeled loop",!loop(e.filter(([a,b])=>!(a==="air"&&b==="mic")))));
 const y=Array.from({length:4},(_,i)=>.5**i);
 r.push(check("abstract stable recurrence decays despite closed loop",JSON.stringify(y)==="[1,0.5,0.25,0.125]"));
 const status=(edges,complete,measured)=>!complete?"UNKNOWN":!loop(edges)?"NO_MODELED_LOOP":measured===true?"OBSERVED_UNDER_GIVEN_EVIDENCE":"POSSIBLE_ONLY";
 r.push(check("incomplete path evidence unknown",status(e,false,null)==="UNKNOWN"));
 r.push(check("topology alone not oscillation",status(e,true,null)==="POSSIBLE_ONLY"));
 r.push(check("absent modeled loop not universal absence",status(e.filter(([a,b])=>!(a==="air"&&b==="mic")),true,null)==="NO_MODELED_LOOP"));
 return r;
}
console.log(feedbackReplay());
```
