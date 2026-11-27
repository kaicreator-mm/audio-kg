# G04 R8c — CQ06/08/10/15/19/21/25 专业分问与当前合成推演

> R9当前性说明：R8独立审核确认CQ25有剩余P1。此处原CQ25为历史有限主路径见证，完整当前追溯见 [R9 CQ25](g04-r9-cq25-full-evidence-trace.md)；其他CQ与原R8a证据边界不变。R9尚待required独立复审。

基准 d72658ca5941df6809ec1551074c42eda4abf8f7。采用当前 [XC01-R3](g04-r8-xc01-independent-evidence.md) 及[实际七能力案例/来源记录](g04-r8-seven-role-evidence.md)（blob 1326f94277d09281075f2423116f515334ea72bc）。对照CQ正式文字（knowledge-scope blob bd6ca221041cb77227a1d7327ca34435ae96b434；capability-coverage blob 906f34aa321c2b85f78fc74975464819f37308e1）。原R7c保留为历史子例，不以排练的权限冒充离线授权。以下新增是**有限子问判定**而非普适推理器或实际检索。

- CQ06：[VS64](vocal-science-r3-knowledge-cases.md#L8)、[VT39](vocal-training-r2-knowledge-cases.md#L13)、[VT28](vocal-training-r1-knowledge-cases.md#L32)区分真实目标偏差、测量错位及估计误差；持续音乐困难可由教师审查，疼痛等异常暂停求专业评估、严重呼吸困难立即求紧急帮助；不由频率诊断病因。当前观察固定且独立。
- CQ08：[DA10](digital-audio-r1-knowledge-cases.md#L14)、[DA20](digital-audio-r1-knowledge-cases.md#L24)、[MP16](production-r1-knowledge-cases.md#L20)、[MP40](production-r2-knowledge-cases.md#L20)削波多对一，后级衰减不恢复；题设同单位峰/噪底幅度比的60dB只是该定义，不等节目LRA、峰均比、实际ADC动态范围或响度。R128普通线性制作名义目标与峰限独立，不泛化平台/特殊节目，所列条件非整体合规。
- CQ10：[DA19](digital-audio-r1-knowledge-cases.md#L23)、[DA46](digital-audio-r2-knowledge-cases.md#L23)、[DA20](digital-audio-r1-knowledge-cases.md#L24)、[DA22/23](digital-audio-r1-knowledge-cases.md#L26)依据源轨、持续窄带背景/瞬态/削波选择；有原轨优先（仍核适用/许可），未知或目标污染的纯噪声窗不自动减噪。比较目标损失与泄漏而非静音最优；真实修复算法/听感仍缺证。
- CQ15：[ED01/02](music-education-r1-knowledge-cases.md#L5)、[ED13/14](music-education-r1-knowledge-cases.md#L17)、[VT01](vocal-training-r1-knowledge-cases.md#L5)目标决定观察及练习；节奏第3事件提前.5拍用对应细分反馈、复测局部再全句，连接问题包含跨小节边界；不同经验、风格、可达性、许可及安全再选择，不规定普适剂量。迁移另按ED47。
- CQ19：O1/F0仅B，P未授权不执行；H1题设可核时允许符号草案，测量NOT_PERFORMED。E1/F1是不同题设排练分支，不能替代。未知宿主不执行；停、替代、证据缺口分开。
- CQ21：[MP01](production-r1-knowledge-cases.md#L5)、[MP25](production-r2-knowledge-cases.md#L5)明确依赖图M1→R1/R2→B1/B2→Q1/Q2及Mix→MasterReport；只改R1失效B1/Q1/Mix/MasterReport，R2/B2/Q2保持；覆盖源M1影响两支而且违反保护；同内容移路径只在重新连接成功时保持身份，不能当文件可用证明。
- CQ25：从A07结果沿前置回访A05/A06至A01，实际七角色矩阵、原案例和源记录见R8b；每条边携带R8a c2/R2题设实际输入输出、保护字段与独立观测结果，缺少角色/来源/主责、边断裂或实际值变化则UNKNOWN；不同c3结果不能沿用c2历史。路径结构通过不证明外部源事实或真实业务效果；其他失败/离线流程需各自证据，不能复制排练结果。

```js
function runR8CQ(xc,route){
 const out=[],eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),ok=(n,a,b)=>{if(!eq(a,b))throw Error(n+" "+JSON.stringify(a)+" != "+JSON.stringify(b));out.push([n,JSON.stringify(a)])};
 const lookup=n=>xc.fixtures.find(x=>x[0]===n)?.[1];
 ok("CQ06 independent reference substitution",[lookup("reference and estimate both 200"),lookup("reference and estimate both 1"),lookup("missing referenceSource")],["UNKNOWN","UNKNOWN","UNKNOWN"]);
 ok("CQ06 actual goal not estimate target",[Math.round(xc.baseline.actualGoalError*1000)/1000,Math.round(xc.wrong.actualGoalError*1000)/1000,xc.wrong.estimatedGoalError],[165.004,165.004,0]);
 const training=x=>x.emergency?"STOP_URGENT":x.symptom?"STOP_MEDICAL_ASSESSMENT":!x.reference||!x.target?"UNKNOWN":x.persistent?"TEACHER_REVIEW":"SCOPED_FEEDBACK";
 ok("CQ06 feedback vs referral",[{reference:true,target:true},{reference:true,target:true,persistent:true},{symptom:true},{emergency:true},{}].map(training),["SCOPED_FEEDBACK","TEACHER_REVIEW","STOP_MEDICAL_ASSESSMENT","STOP_URGENT","UNKNOWN"]);
 const clip=x=>Math.max(-1,Math.min(1,x)),raw=[.8,1.3],clipped=raw.map(clip);
 ok("CQ08 clipped samples persist despite downstream attenuation",clipped.map(x=>x*.5),[.4,.5]);
 ok("CQ08 noninjective clipping",[1.2,2].map(clip),[1,1]);
 const dr=(peak,floor)=>peak>0&&floor>0?Math.round(20*Math.log10(peak/floor)*1000)/1000:null;
 ok("CQ08 declared amplitude signal range distinct from LRA",[dr(1,.001),dr(1,null),-18-(-30)],[60,null,12]);
 const output=x=>!x.spec||x.integrated==null||x.truePeak==null?"UNKNOWN":x.spec!=="R128-linear-v5"?"CHECK_APPLICABLE_SPEC":x.truePeak>-1?"REJECT_NOMINAL_PEAK":x.integrated===-23?"SCOPED_NUMERIC_TARGETS_ONLY":"CHECK_LOUDNESS_TOLERANCE";
 ok("CQ08 output context",[{spec:"R128-linear-v5",integrated:-23,truePeak:-.5},{spec:"R128-linear-v5",integrated:-23,truePeak:-1.2},{spec:"other",integrated:-23,truePeak:-.5},{integrated:-23,truePeak:-1.2}].map(output),["REJECT_NOMINAL_PEAK","SCOPED_NUMERIC_TARGETS_ONLY","CHECK_APPLICABLE_SPEC","UNKNOWN"]);
 const restore=x=>x.permission!=="confirmed"?"STOP_OR_UNKNOWN":x.originalTrack===true?"USE_ORIGINAL_TRACK":x.originalTrack==null?"UNKNOWN":x.kind==="mix"?"SEPARATION_CANDIDATE":x.kind==="steady"&&x.pureNoise===true?"NOISE_ESTIMATE_CANDIDATE":x.kind==="click"?"LOCAL_CLICK_CANDIDATE":x.kind==="clipped"?"ESTIMATE_NOT_ORIGINAL":"UNKNOWN";
 const rs={permission:"confirmed",originalTrack:false};
 ok("CQ10 task and reference choose distinct routes",[{...rs,originalTrack:true,kind:"mix"},{...rs,kind:"mix"},{...rs,kind:"steady",pureNoise:true},{...rs,kind:"steady",pureNoise:false},{...rs,kind:"click"},{...rs,kind:"clipped"},{...rs,kind:"mix",permission:"unknown"}].map(restore),["USE_ORIGINAL_TRACK","SEPARATION_CANDIDATE","NOISE_ESTIMATE_CANDIDATE","UNKNOWN","LOCAL_CLICK_CANDIDATE","ESTIMATE_NOT_ORIGINAL","STOP_OR_UNKNOWN"]);
 const mixed=[1.2,2.2,1.2],round=x=>Math.round(x*10)/10;
 ok("CQ10 steady vs isolated interference",[mixed.map(x=>round(x-.2)),mixed.map((x,i)=>round(x-[0,2,0][i]))],[[1,2,1],[1.2,.2,1.2]]);
 const practice=x=>x.symptom?"STOP":!x.goal||!x.observed||!x.consent?"UNKNOWN":x.goal==="identify-interval"?"INTERVAL_IDENTIFICATION_WITH_FEEDBACK":x.goal==="perform-connection"&&x.observed==="boundary-only"?"PRACTICE_CROSS_BOUNDARY_THEN_WHOLE":x.goal==="rhythm-onset"?"TARGETED_SUBDIVISION_THEN_RETEST":"UNKNOWN";
 const pr={consent:true,observed:"valid"};
 ok("CQ15 practice choice and observed feedback",[{...pr,goal:"identify-interval"},{...pr,goal:"perform-connection",observed:"boundary-only"},{...pr,goal:"rhythm-onset"},{...pr,goal:"perform-connection"},{...pr,goal:"rhythm-onset",symptom:true},{}].map(practice),["INTERVAL_IDENTIFICATION_WITH_FEEDBACK","PRACTICE_CROSS_BOUNDARY_THEN_WHOLE","TARGETED_SUBDIVISION_THEN_RETEST","UNKNOWN","STOP","UNKNOWN"]);
 ok("CQ19 same offline-only premise",[lookup("offline-only positive"),lookup("offline-only with attempted live-listen"),lookup("exact R7 reviewer offline scope only"),xc.offline.measurement],["OFFLINE_DRAFT_ONLY","STOP","STOP","NOT_PERFORMED"]);
 ok("CQ19 offline missing prerequisite",[lookup("offline missing B"),lookup("offline unknown host"),lookup("offline scope escalation")],["UNKNOWN","PENDING_REVALIDATION","PENDING_REVALIDATION"]);
 // Exact finite dependency graph; source identity is distinct from clip ID and render/report.
 const graph={M1:[],R1:["M1"],R2:["M1"],B1:["R1"],B2:["R2"],Q1:["B1"],Q2:["B2"],Mix:["B1","B2"],MasterReport:["Mix"]};
 function invalidate(changed){const bad=new Set(changed);let again=true;while(again){again=false;for(const [id,deps] of Object.entries(graph))if(!bad.has(id)&&deps.some(d=>bad.has(d))){bad.add(id);again=true}}return [...bad].sort()}
 ok("CQ21 only clip R1 edit invalidates its descendants",invalidate(["R1"]),["B1","MasterReport","Mix","Q1","R1"]);
 ok("CQ21 source content replacement affects both clips",invalidate(["M1"]),["B1","B2","M1","MasterReport","Mix","Q1","Q2","R1","R2"]);
 const state=x=>x.permission==="revoked"?"STOP":x.sharedKnown!==true?"UNKNOWN":x.replaceOriginal?"REJECT_PROTECTION":x.sameContent&&x.relinked===true?"PATH_RELINK_ONLY":x.editR1?"LOCAL_REVISION":"PENDING_REVALIDATION";
 ok("CQ21 preserve source and protected sibling",[{sharedKnown:true,replaceOriginal:true},{sharedKnown:true,sameContent:true,relinked:true},{sharedKnown:true,editR1:true},{sharedKnown:false},{permission:"revoked"}].map(state),["REJECT_PROTECTION","PATH_RELINK_ONLY","LOCAL_REVISION","UNKNOWN","STOP"]);
 ok("CQ21 revision/evidence cannot be self-renewed",[lookup("same c2 same R2 new content rewritten"),lookup("new arbitrary c7 and R7 strings"),lookup("new evidence qualified revision"),lookup("registered revision but old receipt")],["PENDING_REVALIDATION","PENDING_REVALIDATION","STATIC_CANDIDATE_ONLY","PENDING_REVALIDATION"]);
 // Reverse visit from an actual qualified result, using the exact captured route and step data.
 const steps=[["A01",[]],["A02",["A01"]],["A03",["A02"]],["A04",["A01","A03"]],["A05",["A02","A04"]],["A06",["A01","A04"]],["A07",["A05","A06"]]];
 const inp=xc.traceInput;
 const artifacts={
 A01:{source:inp.source,clock:inp.clock,notes:inp.notes,lyrics:inp.lyrics},
 A02:{permission:inp.permission,events:inp.events,plan:inp.plan,version:inp.planVersion},
 A03:{host:inp.host,scope:inp.permission.scope,actualRun:false},
 A04:{candidate:inp.revisionKey,envelope:inp.envelope,protectedCue:inp.protectedCue},
 A05:{candidate:xc.baseline.candidate,report:xc.baseline.report,reference:xc.baseline.referenceId,estimate:xc.baseline.estimateId,actualGoalError:xc.baseline.actualGoalError,estimateError:xc.baseline.estimateError},
 A06:{candidate:inp.revisionKey,notes:inp.notes,lyrics:inp.lyrics,envelope:inp.envelope},
 A07:{candidate:inp.revisionKey,report:inp.reportKey,evidence:inp.evidence.evidenceId,result:xc.baseline.state,release:false}};
 // Each edge carries the predecessor's actual finite artifact, not a free-form ID.
 const history=steps.map(([id,deps])=>({id,output:artifacts[id],inputs:deps.map(d=>({id:d,artifact:artifacts[d]}))}));
 function trace(rows,history,verdict){
  if(!verdict||verdict.state!=="STATIC_CANDIDATE_ONLY"||verdict.candidate!==inp.revisionKey||verdict.report!==inp.reportKey||verdict.estimateId!==inp.evidence.evidenceId)return "PENDING_OR_NOT_APPLICABLE";
  let seen=new Set(),path=[];
  function visit(id){
   if(seen.has(id))return true;
   const s=steps.find(x=>x[0]===id),r=rows.find(x=>x.ability===id),original=route.find(x=>x.ability===id),node=history.find(x=>x.id===id);
   if(!s||!r||!original||!eq(r,original)||r.role!=="P"||!r.input||!r.output||!r.caseBlob||!r.matrixBlob||!r.discoveryBlob||!r.caseRecord?.includes(r.d4)||!r.caseRecord.includes(r.caseId)||!r.sourceRecords?.length||r.sourceRecords.length!==r.sources.length||r.sourceRecords.some((v,i)=>v.id!==r.sources[i].id||v.file!==r.sources[i].file||v.line!==r.sources[i].line||!v.blob||!v.record.includes(v.id)))return false;
   if(!node||!eq(node.output,artifacts[id])||!eq(node.inputs.map(v=>v.id),s[1])||node.inputs.some(v=>!eq(v.artifact,history.find(n=>n.id===v.id)?.output)))return false;
   for(const dep of s[1])if(!visit(dep))return false;
   seen.add(id);path.push(id);return true
  }
  return visit("A07")?path:"UNKNOWN";
 }
 ok("CQ25 actual seven-role reverse trace",trace(route,history,xc.baseline),["A01","A02","A03","A04","A05","A06","A07"]);
 ok("CQ25 missing role",trace(route.filter(x=>x.ability!=="A05"),history,xc.baseline),"UNKNOWN");
 ok("CQ25 missing source record",trace(route.map(x=>x.ability==="A03"?{...x,sourceRecords:[]}:x),history,xc.baseline),"UNKNOWN");
 ok("CQ25 support not primary",trace(route.map(x=>x.ability==="A01"?{...x,role:"S"}:x),history,xc.baseline),"UNKNOWN");
 ok("CQ25 changed actual upstream output",trace(route,history.map(x=>x.id==="A04"?{...x,output:{...x.output,candidate:"C/c3"}}:x),xc.baseline),"UNKNOWN");
 ok("CQ25 missing actual predecessor edge",trace(route,history.map(x=>x.id==="A07"?{...x,inputs:x.inputs.slice(0,1)}:x),xc.baseline),"UNKNOWN");
 ok("CQ25 changed reference value",trace(route,history.map(x=>x.id==="A05"?{...x,output:{...x.output,actualGoalError:0}}:x),xc.baseline),"UNKNOWN");
 ok("CQ25 wrong estimate or offline or newer revision is not old rehearsal evidence",[trace(route,history,xc.wrong),trace(route,history,xc.offline),trace(route,history,xc.revised)],["PENDING_OR_NOT_APPLICABLE","PENDING_OR_NOT_APPLICABLE","PENDING_OR_NOT_APPLICABLE"]);
 return out;
}
console.log(runR8CQ(runXC03(), route));
```

复现：先从R8a提取runXC03、从R8b-2 JSON读取route，执行本函数。实际 24/24 条：

| 检查 | 实际输出 |
|---|---|
| CQ06 independent reference substitution | ["UNKNOWN","UNKNOWN","UNKNOWN"] |
| CQ06 actual goal not estimate target | [165.004,165.004,0] |
| CQ06 feedback vs referral | ["SCOPED_FEEDBACK","TEACHER_REVIEW","STOP_MEDICAL_ASSESSMENT","STOP_URGENT","UNKNOWN"] |
| CQ08 clipped samples persist despite downstream attenuation | [0.4,0.5] |
| CQ08 noninjective clipping | [1,1] |
| CQ08 declared amplitude signal range distinct from LRA | [60,null,12] |
| CQ08 output context | ["REJECT_NOMINAL_PEAK","SCOPED_NUMERIC_TARGETS_ONLY","CHECK_APPLICABLE_SPEC","UNKNOWN"] |
| CQ10 task and reference choose distinct routes | ["USE_ORIGINAL_TRACK","SEPARATION_CANDIDATE","NOISE_ESTIMATE_CANDIDATE","UNKNOWN","LOCAL_CLICK_CANDIDATE","ESTIMATE_NOT_ORIGINAL","STOP_OR_UNKNOWN"] |
| CQ10 steady vs isolated interference | [[1,2,1],[1.2,0.2,1.2]] |
| CQ15 practice choice and observed feedback | ["INTERVAL_IDENTIFICATION_WITH_FEEDBACK","PRACTICE_CROSS_BOUNDARY_THEN_WHOLE","TARGETED_SUBDIVISION_THEN_RETEST","UNKNOWN","STOP","UNKNOWN"] |
| CQ19 same offline-only premise | ["OFFLINE_DRAFT_ONLY","STOP","STOP","NOT_PERFORMED"] |
| CQ19 offline missing prerequisite | ["UNKNOWN","PENDING_REVALIDATION","PENDING_REVALIDATION"] |
| CQ21 only clip R1 edit invalidates its descendants | ["B1","MasterReport","Mix","Q1","R1"] |
| CQ21 source content replacement affects both clips | ["B1","B2","M1","MasterReport","Mix","Q1","Q2","R1","R2"] |
| CQ21 preserve source and protected sibling | ["REJECT_PROTECTION","PATH_RELINK_ONLY","LOCAL_REVISION","UNKNOWN","STOP"] |
| CQ21 revision/evidence cannot be self-renewed | ["PENDING_REVALIDATION","PENDING_REVALIDATION","STATIC_CANDIDATE_ONLY","PENDING_REVALIDATION"] |
| CQ25 actual seven-role reverse trace | ["A01","A02","A03","A04","A05","A06","A07"] |
| CQ25 missing role | "UNKNOWN" |
| CQ25 missing source record | "UNKNOWN" |
| CQ25 support not primary | "UNKNOWN" |
| CQ25 changed actual upstream output | "UNKNOWN" |
| CQ25 missing actual predecessor edge | "UNKNOWN" |
| CQ25 changed reference value | "UNKNOWN" |
| CQ25 wrong estimate or offline or newer revision is not old rehearsal evidence | ["PENDING_OR_NOT_APPLICABLE","PENDING_OR_NOT_APPLICABLE","PENDING_OR_NOT_APPLICABLE"] |
