# G04 R8a — XC01-R3：独立参考、证据、版本与离线替代

R7失败基准 9066f3fa762c31c934fefca90cf16e047c22c726，[独立回执](https://github.com/kaicreator-mm/audio-kg/pull/79#issuecomment-7203815238)。历史[R7a](g04-r7-xc01-protection-remediation.md)保留并实际重跑60/60，但不可作为现行充分性证据。

本次选择**固定的独立题设登记**而非通用hash或真实证据系统。观察OBS-A-01由题设独立给出220Hz，绑定原素材S1、A、t1、[0,500)及参考来源/版本；候选不能更改。EST-2/3/4分别独立题定估计证据、候选修订及观察关联；估计200与目标一致仍有−165.004c估计误差，实际音乐目标偏差+165.004c。另一个真实或合成参考若发生变化，必须登记独立新观察及上下文后重验，本有限题不允许任意新参考。候选与报告的非空ID/version为**不可变注册键**：c2/c3/c4及R2/R3/R4各自绑定具体内容/上下文/证据，改内容不得沿用旧键；即使重新拼接回执也不会生成观察证据。登记只在题设初始化一次，评判不注册候选或报告；真实系统如何鉴权、签名、持久化、取得独立观测仍非L1实现。保护判断与停止优先于回执。

CQ19选择明确离线替代：授权O1仅edit-offline，F0/p0只要求B，P不属于该计划；生成可编辑符号/局部曲线草案及独立结构核查，禁止live-listen、录制、存储音频、上传与测量结论。若实际尝试P，STOP，不能以“可选”绕过。原排练F1/p1要求B与P，许可E1两模态；它不再被当作仅离线正例。H1只是题设宿主资格，非实际运行。编辑角色不自动给权限。离线报告只绑定STRUCT-5/6，明确未测量，不能继承排练结果。

源语义：K05 [VS64](vocal-science-r3-knowledge-cases.md#L8)、K11 [KC-A11](ai-models-r4-integrated-closure.md#L56)、K06 [KC-V06](vocal-training-r4-integrated-closure.md#L9)、K09 [MP30](production-r2-knowledge-cases.md#L10)、K04 [KC-P04](performance-r5-integrated-closure.md#L11)、K10 [EV39](evaluation-r2-knowledge-cases.md#L16)。原始保护对象/分段线性模型保留R7限定。非真实音频/设备/许可/临床/LLM或生产实现。当前替代见证，不宣称独立PASS。

```js
function runXC03(){
 const copy=x=>JSON.parse(JSON.stringify(x));
 const token=x=>typeof x==="string"&&x.trim().length>0;
 const canonical=x=>x===null?"null":Array.isArray(x)?"["+x.map(canonical).join(",")+"]":typeof x==="object"?"{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canonical(x[k])).join(",")+"}":JSON.stringify(x);
 const equal=(x,y)=>canonical(x)===canonical(y);
 const finite=x=>typeof x==="number"&&Number.isFinite(x);
 const known=x=>x!==undefined&&x!==null;
 const original={durationMs:2000,clock:{id:"t1",bpm:120,beatUnit:"quarter",originMs:0},target:{id:"v1",musicHz:200},notes:[{id:"n1",voice:"A",pitch:60,start:0,end:500},{id:"n2",voice:"A",pitch:62,start:500,end:1000},{id:"n3",voice:"A",pitch:64,start:1000,end:1500},{id:"n4",voice:"A",pitch:67,start:1500,end:2000}],lyrics:[{id:"s1",text:"la",notes:["n1"]},{id:"s2",text:"mi",notes:["n2"]},{id:"s3",text:"na",notes:["n3","n4"]}],protectedCue:{id:"c21prep",target:"m2b1",time:1500,payload:"prepare",channel:"entry"},editableCue:{id:"c14",target:"m1b4",time:1500,payload:"beat4",channel:"count"},envelope:{mode:"linear",unit:"dB",timeUnit:"ms",points:[[0,0],[400,4],[1000,0],[1200,0],[2000,0]]}};
 const permission={status:"confirmed",epoch:"E1",scope:["edit-offline","live-listen"]};
 const spec={source:"S1",condition:"P1",host:"H1",model:"W1",protocol:"Q1",plan:"F1",planVersion:"p1",authorizedSpan:[1000,1200]};
 const interp=(points,t)=>{if(t===points[0][0])return points[0][1];for(let i=1;i<points.length;i++)if(t<=points[i][0]){let [a,u]=points[i-1],[b,v]=points[i];return u+(v-u)*(t-a)/(b-a)}return NaN};
 const envValid=e=>e&&e.mode==="linear"&&e.unit==="dB"&&e.timeUnit==="ms"&&Array.isArray(e.points)&&e.points.length>=2&&e.points.every((p,i)=>Array.isArray(p)&&p.length===2&&p.every(finite)&&(i===0||p[0]>e.points[i-1][0]))&&e.points[0][0]===0&&e.points.at(-1)[0]===2000;
 const outsideEqual=(e,o)=>{let [a,b]=spec.authorizedSpan;let ts=[...new Set([...e.points,...o.points].map(p=>p[0]).concat([a,b]))].filter(t=>t<=a||t>=b);return ts.every(t=>Math.abs(interp(e.points,t)-interp(o.points,t))<1e-10)};
 const content=x=>({durationMs:x.durationMs,clock:x.clock,target:x.target,notes:x.actualNotes,lyrics:x.actualLyrics,protectedCue:x.protectedCue,editableCue:x.editableCue,envelope:x.envelope});
 const binding=x=>({candidateId:x.candidateId,candidateVersion:x.candidateVersion,source:x.source,condition:x.condition,host:x.host,model:x.model,protocol:x.protocol,permissionEpoch:x.permission?.epoch,permissionScope:x.permission?.scope,safety:x.safety,cueIndependent:x.cueIndependent,plan:x.plan,planVersion:x.planVersion,events:x.events,content:content(x),measurement:x.measurement});
 const candidate={...spec,permission:copy(permission),safety:"confirmed",candidateId:"C",candidateVersion:"c2",durationMs:2000,clock:copy(original.clock),target:copy(original.target),actualNotes:copy(original.notes),actualLyrics:copy(original.lyrics),protectedCue:copy(original.protectedCue),editableCue:{...original.editableCue,payload:"revised-beat4"},cueIndependent:true,envelope:{...original.envelope,points:[[0,0],[400,4],[1000,0],[1100,2],[1200,0],[2000,0]]},events:[{id:"B",mode:"edit-offline",epoch:"E1",plan:"F1",version:"p1",timing:"before",enabled:true,capture:false,store:false,upload:false},{id:"P",mode:"live-listen",epoch:"E1",plan:"F1",version:"p1",timing:"during",enabled:true,capture:false,store:false,upload:false}],measurement:{voice:"A",clock:"t1",window:[0,500],referenceHz:220,estimatedHz:220,musicHz:200,valid:true}};

 // Independent stipulations: sealed in this finite evaluation's closure, not candidate-supplied.
 const reference={id:"OBS-A-01",source:"INDEPENDENT-SYNTH-REF",revision:"ref-v1",sourceMaterial:"S1",voice:"A",clock:"t1",window:[0,500],hz:220,valid:true};
 const grants={E1:{status:"confirmed",epoch:"E1",scope:["edit-offline","live-listen"]},O1:{status:"confirmed",epoch:"O1",scope:["edit-offline"]}};
 candidate.workflow="rehearsal";candidate.role="editor";candidate.measurement.referenceId=reference.id;candidate.measurement.referenceRevision=reference.revision;candidate.measurement.referenceSource=reference.source;candidate.measurement.estimateId="EST-2";
 const revision=x=>({workflow:x.workflow,role:x.role,source:x.source,condition:x.condition,host:x.host,model:x.model,protocol:x.protocol,plan:x.plan,planVersion:x.planVersion,authorizedSpan:x.authorizedSpan,permission:x.permission,safety:x.safety,cueIndependent:x.cueIndependent,events:x.events,content:content(x)});
 const revisionKey=x=>x.candidateId+"/"+x.candidateVersion;
 const reportKey=x=>x.report?.id+"/"+x.report?.version;
 // Three separately stipulated observation records; not generated by reading a candidate's asserted Hz.
 const estimates={"EST-2":{id:"EST-2",revision:"e2",candidate:"C/c2",reference:reference.id,source:"SYNTH-ESTIMATOR",voice:"A",clock:"t1",window:[0,500],hz:220},"EST-3":{id:"EST-3",revision:"e3",candidate:"C/c3",reference:reference.id,source:"SYNTH-ESTIMATOR",voice:"A",clock:"t1",window:[0,500],hz:220},"EST-4":{id:"EST-4",revision:"e4",candidate:"C/c4",reference:reference.id,source:"SYNTH-ESTIMATOR",voice:"A",clock:"t1",window:[0,500],hz:200}};
 const revisions={}, receipts={};
 // Registration happens once from examiner-stipulated fixtures, never in assess or the attacker path.
 function register(x,reportId,reportVersion,evidenceId){
  let k=revisionKey(x),rk=reportId+"/"+reportVersion;
  if(revisions[k]||receipts[rk])throw Error("duplicate immutable identity");
  revisions[k]=copy(revision(x));
  const record={id:reportId,version:reportVersion,evidenceId,revisionKey:k,binding:copy(revision(x)),measurement:copy(x.measurement??null),result:x.workflow==="offline"?"OFFLINE_STRUCTURAL_ONLY":"LIMITED_SYNTHETIC_MEASUREMENT"};
  receipts[rk]=copy(record); x.report=copy(record);
 }
 register(candidate,"R2","r2","EST-2");
 const revised=copy(candidate);revised.candidateVersion="c3";revised.envelope.points[3][1]=1;revised.measurement.estimateId="EST-3";register(revised,"R3","r3","EST-3");
 const wrong=copy(candidate);wrong.candidateVersion="c4";wrong.measurement.estimateId="EST-4";wrong.measurement.estimatedHz=200;register(wrong,"R4","r4","EST-4");
 const shared=copy(candidate);shared.candidateVersion="c5";shared.cueIndependent=false;shared.editableCue.payload="beat4";shared.workflow="offline";shared.permission=copy(grants.O1);shared.plan="F0";shared.planVersion="p0";shared.events=[{...shared.events[0],epoch:"O1",plan:"F0",version:"p0"}];shared.measurement=null;register(shared,"R5","r5","STRUCT-5");
 const offline=copy(shared);offline.candidateVersion="c6";offline.cueIndependent=true;offline.editableCue.payload="revised-beat4";register(offline,"R6","r6","STRUCT-6");
 // Stipulated structural inspection evidence for offline-only plans; separate from reports.
 const structural={"STRUCT-5":{candidate:"C/c5",inspector:"SYNTH-STRUCT",scope:"symbolic-protection"},"STRUCT-6":{candidate:"C/c6",inspector:"SYNTH-STRUCT",scope:"symbolic-protection"}};
 function assess(x){
  if(x.emergency===true||x.symptom===true||x.permission?.status==="revoked"||(Array.isArray(x.events)&&x.events.some(e=>e?.revoked===true)))return {state:"STOP"};
  if(x.permission?.status!=="confirmed"||x.safety!=="confirmed"||!token(x.permission.epoch)||!Array.isArray(x.permission.scope))return {state:"UNKNOWN"};
  if(!Array.isArray(x.events)||x.events.some(e=>!e||!token(e.epoch)||!token(e.plan)||!token(e.version)||!token(e.mode)||typeof e.enabled!=="boolean"||["capture","store","upload"].some(k=>typeof e[k]!=="boolean")))return {state:"UNKNOWN"};
  // Known unauthorized attempted operation outranks workflow shape and report validity.
  if(x.events.some(e=>e.epoch!==x.permission.epoch||e.plan!==x.plan||e.version!==x.planVersion||!x.permission.scope.includes(e.mode)||e.capture||e.store||e.upload))return {state:"STOP"};
  const grant=grants[x.permission.epoch];
  if(!grant||!equal(x.permission,grant)||x.role!=="editor")return {state:"PENDING_REVALIDATION"};
  const expected=x.workflow==="offline"?["B"]:x.workflow==="rehearsal"?["B","P"]:null;
  if(!expected||!equal(x.events.map(e=>e.id),expected))return {state:"UNKNOWN"};
  if(x.events.some((e,i)=>e.mode!==["edit-offline","live-listen"][i]||e.timing!==["before","during"][i]||!e.enabled))return {state:"STOP"};
  if(!finite(x.durationMs)||!known(x.clock)||!known(x.target)||!Array.isArray(x.actualNotes)||!Array.isArray(x.actualLyrics)||!known(x.protectedCue)||!known(x.editableCue)||!known(x.envelope)||typeof x.cueIndependent!=="boolean")return {state:"UNKNOWN"};
  if(x.durationMs!==original.durationMs||!equal(x.clock,original.clock)||!equal(x.target,original.target)||!equal(x.actualNotes,original.notes)||!equal(x.actualLyrics,original.lyrics)||!equal(x.protectedCue,original.protectedCue))return {state:"REJECT_PROTECTION"};
  const {payload,...rest}=x.editableCue,{payload:oldPayload,...oldRest}=original.editableCue;
  if(!equal(rest,oldRest)||!token(payload)||(!x.cueIndependent&&payload!==oldPayload)||!envValid(x.envelope)||!outsideEqual(x.envelope,original.envelope))return {state:"REJECT_PROTECTION"};
  if(![x.candidateId,x.candidateVersion,x.report?.id,x.report?.version].every(token))return {state:"PENDING_REVALIDATION"};
  if(!equal(revisions[revisionKey(x)],revision(x)))return {state:"PENDING_REVALIDATION"};
  if(x.workflow==="rehearsal"){
    const m=x.measurement;
    if(!m||m.valid!==true||![m.referenceHz,m.estimatedHz,m.musicHz].every(v=>finite(v)&&v>0)||![m.referenceId,m.referenceRevision,m.referenceSource,m.estimateId].every(token))return {state:"UNKNOWN"};
    if(m.referenceId!==reference.id||m.referenceRevision!==reference.revision||m.referenceSource!==reference.source||m.referenceHz!==reference.hz||m.voice!==reference.voice||m.clock!==reference.clock||!equal(m.window,reference.window)||m.musicHz!==original.target.musicHz||x.source!==reference.sourceMaterial)return {state:"UNKNOWN"};
    const e=estimates[m.estimateId];
    if(!e||e.candidate!==revisionKey(x)||e.reference!==reference.id||e.voice!==m.voice||e.clock!==m.clock||!equal(e.window,m.window)||e.hz!==m.estimatedHz)return {state:"PENDING_REVALIDATION"};
  }else if(x.measurement!==null)return {state:"UNKNOWN"};
  const receipt=receipts[reportKey(x)];
  if(!receipt||!equal(receipt,x.report)||receipt.revisionKey!==revisionKey(x)||!equal(receipt.binding,revision(x))||!equal(receipt.measurement,x.measurement??null))return {state:"PENDING_REVALIDATION"};
  if(x.workflow==="offline"){
    const s=structural[receipt.evidenceId];
    if(!s||s.candidate!==revisionKey(x)||s.scope!=="symbolic-protection")return {state:"PENDING_REVALIDATION"};
    return {state:"OFFLINE_DRAFT_ONLY",measurement:"NOT_PERFORMED"};
  }
  if(receipt.evidenceId!==x.measurement.estimateId)return {state:"PENDING_REVALIDATION"};
  const e=estimates[receipt.evidenceId],c=(a,b)=>1200*Math.log2(a/b);
  return {state:Math.abs(c(e.hz,reference.hz))>1e-9?"REVIEW_MEASUREMENT":"STATIC_CANDIDATE_ONLY",referenceId:reference.id,estimateId:e.id,estimateError:c(e.hz,reference.hz),actualGoalError:c(reference.hz,original.target.musicHz),estimatedGoalError:c(e.hz,original.target.musicHz)};
 }
 // Mutating a report to echo current input does not register evidence.
 function forge(x){if(x.report){x.report.binding=copy(revision(x));x.report.measurement=copy(x.measurement??null);x.report.revisionKey=revisionKey(x)}}
 const fixtures=[]; const t=(n,base,edit,expected,fake=false)=>{let x=copy(base);edit(x);if(fake)forge(x);let actual=assess(x);if(actual.state!==expected)throw Error(n+" "+JSON.stringify(actual)+" != "+expected);fixtures.push([n,actual.state,expected]);return actual};
 const noop=()=>{};
 const a=t("stipulated baseline",candidate,noop,"STATIC_CANDIDATE_ONLY");
 t("reference and estimate both 200",candidate,x=>{x.measurement.referenceHz=200;x.measurement.estimatedHz=200},"UNKNOWN",true);
 t("reference and estimate both 1",candidate,x=>{x.measurement.referenceHz=1;x.measurement.estimatedHz=1},"UNKNOWN",true);
 for(const k of ["referenceId","referenceRevision","referenceSource","referenceHz"])t("missing "+k,candidate,x=>delete x.measurement[k],"UNKNOWN",true);
 t("fabricated reference identity",candidate,x=>x.measurement.referenceId="FAKE","UNKNOWN",true);
 t("wrong observation clock",candidate,x=>x.measurement.clock="t2","UNKNOWN",true);
 t("wrong observation window",candidate,x=>x.measurement.window=[500,1000],"UNKNOWN",true);
 t("wrong observation voice",candidate,x=>x.measurement.voice="B","UNKNOWN",true);
 t("self-asserted estimate",candidate,x=>x.measurement.estimatedHz=200,"PENDING_REVALIDATION",true);
 t("wrong estimator identity",candidate,x=>x.measurement.estimateId="EST-3","PENDING_REVALIDATION",true);
 t("same c2 same R2 new content rewritten",candidate,x=>x.envelope.points[3][1]=1,"PENDING_REVALIDATION",true);
 t("new arbitrary c7 and R7 strings",candidate,x=>{x.candidateVersion="c7";x.report.id="R7";x.report.version="r7"},"PENDING_REVALIDATION",true);
 t("registered revision but old receipt",revised,x=>x.report=copy(candidate.report),"PENDING_REVALIDATION",true);
 t("registered revision but old estimate",revised,x=>x.measurement.estimateId="EST-2","PENDING_REVALIDATION",true);
 t("arbitrary new report identity",candidate,x=>x.report.version="r99","PENDING_REVALIDATION",true);
 t("new evidence qualified revision",revised,noop,"STATIC_CANDIDATE_ONLY");
 const b=t("qualified wrong estimate",wrong,noop,"REVIEW_MEASUREMENT");
 for(const v of [undefined,null,"","  "])t("missing candidate version "+String(v),candidate,x=>x.candidateVersion=v,"PENDING_REVALIDATION",true);
 t("missing report identity",candidate,x=>delete x.report.id,"PENDING_REVALIDATION");
 t("duration change",candidate,x=>x.durationMs=3000,"REJECT_PROTECTION",true);
 t("same note ID pitch",candidate,x=>x.actualNotes[0].pitch=999,"REJECT_PROTECTION",true);
 t("same note ID onset",candidate,x=>x.actualNotes[0].start=1,"REJECT_PROTECTION",true);
 t("same note ID voice",candidate,x=>x.actualNotes[0].voice="B","REJECT_PROTECTION",true);
 t("same lyric ID text",candidate,x=>x.actualLyrics[0].text="other","REJECT_PROTECTION",true);
 t("same lyric ID binding",candidate,x=>x.actualLyrics[2].notes=["n4"],"REJECT_PROTECTION",true);
 t("protected cue payload",candidate,x=>x.protectedCue.payload="other","REJECT_PROTECTION",true);
 t("protected cue target",candidate,x=>x.protectedCue.target="m1b4","REJECT_PROTECTION",true);
 t("clock BPM change",candidate,x=>x.clock.bpm=100,"REJECT_PROTECTION",true);
 t("target change",candidate,x=>x.target.musicHz=220,"REJECT_PROTECTION",true);
 t("shared cue altered",shared,x=>x.editableCue.payload="change","REJECT_PROTECTION",true);
 t("shared cue kept",shared,noop,"OFFLINE_DRAFT_ONLY");
 t("cue independence unknown",candidate,x=>delete x.cueIndependent,"UNKNOWN");
 t("outside change",candidate,x=>x.envelope.points[1][1]=3,"REJECT_PROTECTION",true);
 t("mode changed",candidate,x=>x.envelope.mode="discrete","REJECT_PROTECTION",true);
 t("boundary changed",candidate,x=>x.envelope.points[2][1]=1,"REJECT_PROTECTION",true);
 t("missing notes",candidate,x=>delete x.actualNotes,"UNKNOWN");
 for(const k of ["source","condition","host","model","protocol"])t("unqualified "+k,candidate,x=>x[k]="other","PENDING_REVALIDATION",true);
 t("revocation",candidate,x=>{x.permission.status="revoked";x.durationMs=3000},"STOP",true);
 t("revocation between phases",candidate,x=>x.events[1].revoked=true,"STOP",true);
 t("stale epoch",candidate,x=>x.events[1].epoch="O1","STOP",true);
 t("missing epoch",candidate,x=>delete x.events[1].epoch,"UNKNOWN");
 t("unknown safety",candidate,x=>x.safety="unknown","UNKNOWN");
 t("symptom",candidate,x=>x.symptom=true,"STOP");
 t("unknown permission",candidate,x=>x.permission.status="unknown","UNKNOWN");
 t("role not grant",candidate,x=>x.role="administrator","PENDING_REVALIDATION",true);
 t("malformed events",candidate,x=>x.events="bad","UNKNOWN");
 t("null event",candidate,x=>x.events[0]=null,"UNKNOWN");
 for(const k of ["capture","store","upload"])t("unapproved "+k,candidate,x=>x.events[1][k]=true,"STOP",true);
 t("offline-only positive",offline,noop,"OFFLINE_DRAFT_ONLY");
 t("offline-only with attempted live-listen",offline,x=>x.events.push({...candidate.events[1],epoch:"O1",plan:"F0",version:"p0"}),"STOP",true);
 t("exact R7 reviewer offline scope only",candidate,x=>x.permission.scope=["edit-offline"],"STOP",true);
 t("offline missing B",offline,x=>x.events=[],"UNKNOWN",true);
 t("offline unknown host",offline,x=>x.host="H2","PENDING_REVALIDATION",true);
 t("offline fabricated measurement",offline,x=>x.measurement=copy(candidate.measurement),"UNKNOWN",true);
 t("offline scope escalation",offline,x=>x.permission.scope.push("live-listen"),"PENDING_REVALIDATION",true);
 if(a.estimateError!==0||Math.abs(a.actualGoalError-165.0042285)>1e-6||b.estimatedGoalError!==0||b.actualGoalError!==a.actualGoalError||Math.abs(b.estimateError+a.actualGoalError)>1e-9)throw Error("independent measurement outputs");
 return {fixtures,baseline:a,wrong:b,offline:assess(offline)};
}

console.log(runXC03());
```

| 试验 | 实际 | 期望 |
|---|---|---|
| stipulated baseline | STATIC_CANDIDATE_ONLY | STATIC_CANDIDATE_ONLY |
| reference and estimate both 200 | UNKNOWN | UNKNOWN |
| reference and estimate both 1 | UNKNOWN | UNKNOWN |
| missing referenceId | UNKNOWN | UNKNOWN |
| missing referenceRevision | UNKNOWN | UNKNOWN |
| missing referenceSource | UNKNOWN | UNKNOWN |
| missing referenceHz | UNKNOWN | UNKNOWN |
| fabricated reference identity | UNKNOWN | UNKNOWN |
| wrong observation clock | UNKNOWN | UNKNOWN |
| wrong observation window | UNKNOWN | UNKNOWN |
| wrong observation voice | UNKNOWN | UNKNOWN |
| self-asserted estimate | PENDING_REVALIDATION | PENDING_REVALIDATION |
| wrong estimator identity | PENDING_REVALIDATION | PENDING_REVALIDATION |
| same c2 same R2 new content rewritten | PENDING_REVALIDATION | PENDING_REVALIDATION |
| new arbitrary c7 and R7 strings | PENDING_REVALIDATION | PENDING_REVALIDATION |
| registered revision but old receipt | PENDING_REVALIDATION | PENDING_REVALIDATION |
| registered revision but old estimate | PENDING_REVALIDATION | PENDING_REVALIDATION |
| arbitrary new report identity | PENDING_REVALIDATION | PENDING_REVALIDATION |
| new evidence qualified revision | STATIC_CANDIDATE_ONLY | STATIC_CANDIDATE_ONLY |
| qualified wrong estimate | REVIEW_MEASUREMENT | REVIEW_MEASUREMENT |
| missing candidate version undefined | PENDING_REVALIDATION | PENDING_REVALIDATION |
| missing candidate version null | PENDING_REVALIDATION | PENDING_REVALIDATION |
| missing candidate version  | PENDING_REVALIDATION | PENDING_REVALIDATION |
| missing candidate version    | PENDING_REVALIDATION | PENDING_REVALIDATION |
| missing report identity | PENDING_REVALIDATION | PENDING_REVALIDATION |
| duration change | REJECT_PROTECTION | REJECT_PROTECTION |
| same note ID pitch | REJECT_PROTECTION | REJECT_PROTECTION |
| same note ID onset | REJECT_PROTECTION | REJECT_PROTECTION |
| same note ID voice | REJECT_PROTECTION | REJECT_PROTECTION |
| same lyric ID text | REJECT_PROTECTION | REJECT_PROTECTION |
| same lyric ID binding | REJECT_PROTECTION | REJECT_PROTECTION |
| protected cue payload | REJECT_PROTECTION | REJECT_PROTECTION |
| protected cue target | REJECT_PROTECTION | REJECT_PROTECTION |
| clock BPM change | REJECT_PROTECTION | REJECT_PROTECTION |
| target change | REJECT_PROTECTION | REJECT_PROTECTION |
| shared cue altered | REJECT_PROTECTION | REJECT_PROTECTION |
| shared cue kept | OFFLINE_DRAFT_ONLY | OFFLINE_DRAFT_ONLY |
| cue independence unknown | UNKNOWN | UNKNOWN |
| outside change | REJECT_PROTECTION | REJECT_PROTECTION |
| mode changed | REJECT_PROTECTION | REJECT_PROTECTION |
| boundary changed | REJECT_PROTECTION | REJECT_PROTECTION |
| missing notes | UNKNOWN | UNKNOWN |
| unqualified source | PENDING_REVALIDATION | PENDING_REVALIDATION |
| unqualified condition | PENDING_REVALIDATION | PENDING_REVALIDATION |
| unqualified host | PENDING_REVALIDATION | PENDING_REVALIDATION |
| unqualified model | PENDING_REVALIDATION | PENDING_REVALIDATION |
| unqualified protocol | PENDING_REVALIDATION | PENDING_REVALIDATION |
| revocation | STOP | STOP |
| revocation between phases | STOP | STOP |
| stale epoch | STOP | STOP |
| missing epoch | UNKNOWN | UNKNOWN |
| unknown safety | UNKNOWN | UNKNOWN |
| symptom | STOP | STOP |
| unknown permission | UNKNOWN | UNKNOWN |
| role not grant | PENDING_REVALIDATION | PENDING_REVALIDATION |
| malformed events | UNKNOWN | UNKNOWN |
| null event | UNKNOWN | UNKNOWN |
| unapproved capture | STOP | STOP |
| unapproved store | STOP | STOP |
| unapproved upload | STOP | STOP |
| offline-only positive | OFFLINE_DRAFT_ONLY | OFFLINE_DRAFT_ONLY |
| offline-only with attempted live-listen | STOP | STOP |
| exact R7 reviewer offline scope only | STOP | STOP |
| offline missing B | UNKNOWN | UNKNOWN |
| offline unknown host | PENDING_REVALIDATION | PENDING_REVALIDATION |
| offline fabricated measurement | UNKNOWN | UNKNOWN |
| offline scope escalation | PENDING_REVALIDATION | PENDING_REVALIDATION |

实际 67/67。独立参考相关输出：基准 {"state":"STATIC_CANDIDATE_ONLY","referenceId":"OBS-A-01","estimateId":"EST-2","estimateError":0,"actualGoalError":165.00422849992202,"estimatedGoalError":165.00422849992202}；错误估计 {"state":"REVIEW_MEASUREMENT","referenceId":"OBS-A-01","estimateId":"EST-4","estimateError":-165.00422849992196,"actualGoalError":165.00422849992202,"estimatedGoalError":0}；离线 {"state":"OFFLINE_DRAFT_ONLY","measurement":"NOT_PERFORMED"}。
