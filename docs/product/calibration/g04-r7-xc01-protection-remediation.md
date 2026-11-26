# G04 R7a — RV01 XC01修订：实际保护与当前证据绑定

原审核 [PR79 #7203270001](https://github.com/kaicreator-mm/audio-kg/pull/79#issuecomment-7203270001) 精确基准 725ce4f83a4f904dab4438f36b1b1c30ee70cc40；原[X C01历史见证](g04-r5-seven-capability-integrated-case.md)不覆盖、不把15/15当修订后证据。以下 XC01-R2 取代原 oracle 的现行用途；原案例保留历史。仅有限合成知识验证，不是产品API、真实许可、声音或设备验收。

## 语义组合
- K02/13 前置：三音节四音符、2秒、明确半开事件窗与目标。K01拍单位、时基不能只看ID。K04 [KC-P04](performance-r5-integrated-closure.md#L10)：同在1500ms的两个cue按身份、目标、payload和通道区分；不可独立时不得改共享cue。K06 [KC-V06](vocal-training-r4-integrated-closure.md#L9)：逐事件当前许可、计划/版本、时点、模态及采录限制；撤回/症状先停止。K15角色不等许可，合成布尔不是实际权利。
- K09 [MP30](production-r3-discovery-cq.md#L34)：区外曲线必须保护；本例固定线性、dB/ms，区间[1000,1200]ms内可改，边界与区外核两曲线断点并集及边界，因分段线性而可证明该有限模型区外相等；不推广到任意插值或连续真实信号。
- K10 [EV12/39](evaluation-r3-discovery-cq.md) 与K13词音绑定：保留音符、声部、起止、原歌词及对应关系内容；ID不证明内容。K05 [VS64](vocal-science-r4-discovery-cq.md#L68)：同窗/声部/时钟独立参考220、估计220、音乐目标200；估计误差0，音乐偏差约+165.004cents；候选仍可作为修订对象，不是音乐达标。K12/11 [KC-A11](ai-models-r4-integrated-closure.md#L56)：报告独立ID和版本必须有效；绑定当前输入、候选ID/版本、内容、时长、时基、目标、条件、宿主/模型、许可epoch、计划及协议、观测。已变版本/证据需再评价；新报告不能覆盖已知保护失败。
- 缺必要证据UNKNOWN/PENDING_REVALIDATION；已知保护失败REJECT_PROTECTION；撤回或明确越权STOP；合法局部变更+新绑定报告才为STATIC_CANDIDATE_ONLY。非本题的真实临床、现场、发布、授权和工具能力仍独立门禁；不能按此固定合成夹具推普适策略。内容比较为有限明确字段的规范化相等，不是签名/真实hash鉴定；音符数组按原定义顺序，非任意表示等价。
- 对#35 RV02/#41 RV03/#49 RV01/#52 RV02/#55 RV02直接影响：以上逐项重新组合并实测下列反例；旧单模块回执仍保留，不能自动关闭。

## 复现
```js
function runXC02(){
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
 const reportFor=x=>({id:"R2",version:"r2",binding:copy(binding(x)),result:"LIMITED_SYNTHETIC_MEASUREMENT"});
 candidate.report=reportFor(candidate);
 function assess(x){
  if(x.emergency===true||x.symptom===true||x.permission?.status==="revoked"||(Array.isArray(x.events)&&x.events.some(e=>e?.revoked===true)))return "STOP";
  if(x.permission?.status!=="confirmed"||x.safety!=="confirmed"||!token(x.permission.epoch)||!Array.isArray(x.permission.scope))return "UNKNOWN";
  if(!Array.isArray(x.events)||x.events.length!==2||!equal(x.events.map(e=>e?.id),["B","P"]))return "UNKNOWN";
  if(x.events.some((e,i)=>!token(e.epoch)||!token(e.plan)||!token(e.version)||!token(e.mode)||typeof e.enabled!=="boolean"||["capture","store","upload"].some(k=>typeof e[k]!=="boolean")))return "UNKNOWN";
  if(x.events.some((e,i)=>e.epoch!==x.permission.epoch||e.plan!==x.plan||e.version!==x.planVersion||!x.permission.scope.includes(e.mode)||e.mode!==["edit-offline","live-listen"][i]||e.timing!==["before","during"][i]||!e.enabled||e.capture||e.store||e.upload))return "STOP";
  if(!finite(x.durationMs)||!known(x.clock)||!known(x.target)||!Array.isArray(x.actualNotes)||!Array.isArray(x.actualLyrics)||!known(x.protectedCue)||!known(x.editableCue)||!known(x.envelope)||typeof x.cueIndependent!=="boolean")return "UNKNOWN";
  if(x.durationMs!==original.durationMs||!equal(x.clock,original.clock)||!equal(x.target,original.target)||!equal(x.actualNotes,original.notes)||!equal(x.actualLyrics,original.lyrics)||!equal(x.protectedCue,original.protectedCue))return "REJECT_PROTECTION";
  const {payload,...rest}=x.editableCue,{payload:oldPayload,...oldRest}=original.editableCue;
  if(!equal(rest,oldRest)||!token(payload)||(!x.cueIndependent&&payload!==oldPayload))return "REJECT_PROTECTION";
  if(!envValid(x.envelope)||!outsideEqual(x.envelope,original.envelope))return "REJECT_PROTECTION";
  if(![x.candidateId,x.candidateVersion,x.report?.id,x.report?.version,x.source,x.condition,x.host,x.model,x.protocol,x.plan,x.planVersion].every(token))return "PENDING_REVALIDATION";
  if(!["source","condition","host","model","protocol","plan","planVersion"].every(k=>x[k]===spec[k])||x.permission.epoch!==permission.epoch)return "PENDING_REVALIDATION";
  if(!x.report.binding||!equal(x.report.binding,binding(x))||x.report.result!=="LIMITED_SYNTHETIC_MEASUREMENT")return "PENDING_REVALIDATION";
  const m=x.measurement;
  if(!m||m.valid!==true||m.voice!=="A"||m.clock!==x.clock.id||!equal(m.window,[0,500])||![m.referenceHz,m.estimatedHz,m.musicHz].every(v=>finite(v)&&v>0)||m.musicHz!==x.target.musicHz)return "UNKNOWN";
  if(Math.abs(1200*Math.log2(m.estimatedHz/m.referenceHz))>1e-9)return "REVIEW_MEASUREMENT";
  // Candidate eligibility only: independently report actual goal error, never call this performance acceptance.
  return "STATIC_CANDIDATE_ONLY";
 }
 const fixtures=[];
 const t=(name,edit,expected,fresh=false)=>{let x=copy(candidate);edit(x);if(fresh)x.report=reportFor(x);const actual=assess(x);if(actual!==expected)throw Error(name+" "+actual+" != "+expected);fixtures.push([name,actual,expected])};
 const noop=()=>{};
 t("stipulated baseline",noop,"STATIC_CANDIDATE_ONLY");
 t("both versions absent",x=>{delete x.candidateVersion;delete x.report.binding.candidateVersion},"PENDING_REVALIDATION");
 for(const v of [null,"","  "])t("both versions "+JSON.stringify(v),x=>{x.candidateVersion=v;x.report.binding.candidateVersion=v},"PENDING_REVALIDATION");
 t("missing candidate ID",x=>delete x.candidateId,"PENDING_REVALIDATION",true);
 t("missing report ID",x=>delete x.report.id,"PENDING_REVALIDATION");
 t("empty report version",x=>x.report.version="","PENDING_REVALIDATION");
 t("duration 3000 and fresh report",x=>x.durationMs=3000,"REJECT_PROTECTION",true);
 t("same note ID different pitch",x=>x.actualNotes[0].pitch=999,"REJECT_PROTECTION",true);
 t("same note ID different onset",x=>x.actualNotes[1].start=501,"REJECT_PROTECTION",true);
 t("same note ID different voice",x=>x.actualNotes[0].voice="B","REJECT_PROTECTION",true);
 t("same lyric ID changed text",x=>x.actualLyrics[0].text="other","REJECT_PROTECTION",true);
 t("same lyric ID changed binding",x=>x.actualLyrics[2].notes=["n4"],"REJECT_PROTECTION",true);
 t("same protected cue ID changed payload",x=>x.protectedCue.payload="changed","REJECT_PROTECTION",true);
 t("same protected cue ID changed target",x=>x.protectedCue.target="m1b4","REJECT_PROTECTION",true);
 t("clock BPM changed with same ID",x=>x.clock.bpm=100,"REJECT_PROTECTION",true);
 t("target value changed with same ID",x=>x.target.musicHz=220,"REJECT_PROTECTION",true);
 t("shared cue cannot change",x=>x.cueIndependent=false,"REJECT_PROTECTION",true);
 t("shared cue unchanged allowed",x=>{x.cueIndependent=false;x.editableCue.payload="beat4"},"STATIC_CANDIDATE_ONLY",true);
 t("cue independence unknown",x=>delete x.cueIndependent,"UNKNOWN");
 t("outside curve changed",x=>x.envelope.points[1][1]=3,"REJECT_PROTECTION",true);
 t("global mode changed",x=>x.envelope.mode="discrete","REJECT_PROTECTION",true);
 t("boundary moved",x=>x.envelope.points[2][1]=1,"REJECT_PROTECTION",true);
 t("missing protected contents",x=>delete x.actualNotes,"UNKNOWN");
 t("unchanged ID new candidate content stale report",x=>x.envelope.points[3][1]=1,"PENDING_REVALIDATION");
 t("fresh report on allowed edit",x=>x.envelope.points[3][1]=1,"STATIC_CANDIDATE_ONLY",true);
 for(const k of ["source","condition","host","model","protocol","plan","planVersion"]){t("changed binding "+k,x=>{x[k]="other";if(k==="plan")x.events.forEach(e=>e.plan="other");if(k==="planVersion")x.events.forEach(e=>e.version="other")},"PENDING_REVALIDATION",true)}
 t("report binding missing",x=>delete x.report.binding,"PENDING_REVALIDATION");
 t("report different candidate version",x=>x.report.binding.candidateVersion="c1","PENDING_REVALIDATION");
 t("report different epoch",x=>x.report.binding.permissionEpoch="E0","PENDING_REVALIDATION");
 t("report different content",x=>x.report.binding.content.durationMs=3000,"PENDING_REVALIDATION");
 t("revocation outranks changed protection",x=>{x.permission.status="revoked";x.durationMs=3000},"STOP",true);
 t("event revoked after B",x=>x.events[1].revoked=true,"STOP",true);
 t("event stale epoch",x=>x.events[1].epoch="E0","STOP",true);
 t("event missing epoch",x=>delete x.events[1].epoch,"UNKNOWN",true);
 t("current renewed epoch needs new qualification",x=>{x.permission.epoch="E2";x.events.forEach(e=>e.epoch="E2")},"PENDING_REVALIDATION",true);
 t("visual not authorized",x=>x.events[1].mode="visual","STOP",true);
 for(const k of ["capture","store","upload"])t("unapproved "+k,x=>x.events[1][k]=true,"STOP",true);
 t("safety unknown",x=>x.safety="unknown","UNKNOWN");
 t("symptom stop",x=>x.symptom=true,"STOP");
 t("missing measurement reference",x=>delete x.measurement.referenceHz,"UNKNOWN",true);
 t("voice mismatch",x=>x.measurement.voice="B","UNKNOWN",true);
 t("clock mismatch",x=>x.measurement.clock="t2","UNKNOWN",true);
 t("target masquerade",x=>x.measurement.musicHz=220,"UNKNOWN",true);
 t("wrong estimate despite goal match",x=>x.measurement.estimatedHz=200,"REVIEW_MEASUREMENT",true);
 t("unknown permission",x=>x.permission.status="unknown","UNKNOWN");
 t("old report cannot authenticate changed measurement",x=>x.measurement.estimatedHz=200,"PENDING_REVALIDATION");
 t("malformed events",x=>x.events="bad","UNKNOWN");
 t("null event",x=>x.events[0]=null,"UNKNOWN");
 t("old scope binding",x=>x.permission.scope.push("unused"),"PENDING_REVALIDATION");
 t("wrong cue independence binding",x=>x.report.binding.cueIndependent=false,"PENDING_REVALIDATION");
 const cents=1200*Math.log2(220/200);
 if(Math.abs(cents-165.0042285)>1e-6)throw Error("music cents");
 return {fixtures,cents};
}
console.log(runXC02());
```

| 试验 | 实际 | 期望 |
|---|---|---|
| stipulated baseline | STATIC_CANDIDATE_ONLY | STATIC_CANDIDATE_ONLY |
| both versions absent | PENDING_REVALIDATION | PENDING_REVALIDATION |
| both versions null | PENDING_REVALIDATION | PENDING_REVALIDATION |
| both versions "" | PENDING_REVALIDATION | PENDING_REVALIDATION |
| both versions "  " | PENDING_REVALIDATION | PENDING_REVALIDATION |
| missing candidate ID | PENDING_REVALIDATION | PENDING_REVALIDATION |
| missing report ID | PENDING_REVALIDATION | PENDING_REVALIDATION |
| empty report version | PENDING_REVALIDATION | PENDING_REVALIDATION |
| duration 3000 and fresh report | REJECT_PROTECTION | REJECT_PROTECTION |
| same note ID different pitch | REJECT_PROTECTION | REJECT_PROTECTION |
| same note ID different onset | REJECT_PROTECTION | REJECT_PROTECTION |
| same note ID different voice | REJECT_PROTECTION | REJECT_PROTECTION |
| same lyric ID changed text | REJECT_PROTECTION | REJECT_PROTECTION |
| same lyric ID changed binding | REJECT_PROTECTION | REJECT_PROTECTION |
| same protected cue ID changed payload | REJECT_PROTECTION | REJECT_PROTECTION |
| same protected cue ID changed target | REJECT_PROTECTION | REJECT_PROTECTION |
| clock BPM changed with same ID | REJECT_PROTECTION | REJECT_PROTECTION |
| target value changed with same ID | REJECT_PROTECTION | REJECT_PROTECTION |
| shared cue cannot change | REJECT_PROTECTION | REJECT_PROTECTION |
| shared cue unchanged allowed | STATIC_CANDIDATE_ONLY | STATIC_CANDIDATE_ONLY |
| cue independence unknown | UNKNOWN | UNKNOWN |
| outside curve changed | REJECT_PROTECTION | REJECT_PROTECTION |
| global mode changed | REJECT_PROTECTION | REJECT_PROTECTION |
| boundary moved | REJECT_PROTECTION | REJECT_PROTECTION |
| missing protected contents | UNKNOWN | UNKNOWN |
| unchanged ID new candidate content stale report | PENDING_REVALIDATION | PENDING_REVALIDATION |
| fresh report on allowed edit | STATIC_CANDIDATE_ONLY | STATIC_CANDIDATE_ONLY |
| changed binding source | PENDING_REVALIDATION | PENDING_REVALIDATION |
| changed binding condition | PENDING_REVALIDATION | PENDING_REVALIDATION |
| changed binding host | PENDING_REVALIDATION | PENDING_REVALIDATION |
| changed binding model | PENDING_REVALIDATION | PENDING_REVALIDATION |
| changed binding protocol | PENDING_REVALIDATION | PENDING_REVALIDATION |
| changed binding plan | PENDING_REVALIDATION | PENDING_REVALIDATION |
| changed binding planVersion | PENDING_REVALIDATION | PENDING_REVALIDATION |
| report binding missing | PENDING_REVALIDATION | PENDING_REVALIDATION |
| report different candidate version | PENDING_REVALIDATION | PENDING_REVALIDATION |
| report different epoch | PENDING_REVALIDATION | PENDING_REVALIDATION |
| report different content | PENDING_REVALIDATION | PENDING_REVALIDATION |
| revocation outranks changed protection | STOP | STOP |
| event revoked after B | STOP | STOP |
| event stale epoch | STOP | STOP |
| event missing epoch | UNKNOWN | UNKNOWN |
| current renewed epoch needs new qualification | PENDING_REVALIDATION | PENDING_REVALIDATION |
| visual not authorized | STOP | STOP |
| unapproved capture | STOP | STOP |
| unapproved store | STOP | STOP |
| unapproved upload | STOP | STOP |
| safety unknown | UNKNOWN | UNKNOWN |
| symptom stop | STOP | STOP |
| missing measurement reference | UNKNOWN | UNKNOWN |
| voice mismatch | UNKNOWN | UNKNOWN |
| clock mismatch | UNKNOWN | UNKNOWN |
| target masquerade | UNKNOWN | UNKNOWN |
| wrong estimate despite goal match | REVIEW_MEASUREMENT | REVIEW_MEASUREMENT |
| unknown permission | UNKNOWN | UNKNOWN |
| old report cannot authenticate changed measurement | PENDING_REVALIDATION | PENDING_REVALIDATION |
| malformed events | UNKNOWN | UNKNOWN |
| null event | UNKNOWN | UNKNOWN |
| old scope binding | PENDING_REVALIDATION | PENDING_REVALIDATION |
| wrong cue independence binding | PENDING_REVALIDATION | PENDING_REVALIDATION |

实际 60/60；目标偏差 165.004228 cents。原始独立审核的3个空/缺身份反例及2个保护内容/时长覆盖反例均有对应回归。其余为扩展边界；不称独立PASS。


## R8 现行替代
R7独立复审FAIL（PR79 #7203815238）：独立参考和版本证据残余。原代码及结果保留历史；现行见[XC01-R3](g04-r8-xc01-independent-evidence.md)，固定独立观察、不可变修订/证据、离线授权替代。不得以原60/60证明R8或独立通过。
