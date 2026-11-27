# G04 R9 — CQ25 完整结果及必要证据反向追溯

R8 FAIL exact 8021a8bf2cf929daecb709eafa7a9beade40891e；[独立裁定](https://github.com/kaicreator-mm/audio-kg/pull/79#issuecomment-7212098990)。仅R8-RV01，CAL05/06。R8a独立注册及R8c其余专业子问不改；R8c旧CQ25仅历史主路径导航，不得作为当前完整追溯证明。以下是当前固定c2/R2完整见证，非生产运行、真实授权、全质量或L2 schema。其他候选/STOP/离线必须独立证据。GV02实际主体/委托未知，题设授权非现实许可。

## 必要知识支持（不是七个P节点）

S-V06逐事件权限、撤回；S-GV02角色不授予行动；S-A11当前绑定、保护及许可。以下精确原文回读为固定知识输入；实际合成注册证据另作E-OBS/E-EST/E-RECEIPT。引用证据不授予现实权限。

```json
[
  {
    "id": "S-V06",
    "role": "SUPPORT",
    "caseId": "KC-V06",
    "file": "vocal-training-r4-integrated-closure.md",
    "blob": "be659eb939ac3cd7e8a5a82c9de4a037a8586ece",
    "lines": [
      10,
      26
    ],
    "records": [
      "四音纯数学事件（频率并非指定12TET曲目；题设目标），教师确认当前任务及舒适范围，学员许可仅现场教学，不授权录音、上传、克隆或共享。研究数据均人为给定，不实际发声或录制。目标t1固定、时钟clock1、有效掩码stable-v1、评价rubric1、题设容许±30 cents（非通用音准标准）。s2跨n2/n3，许可其间连接，n4及其歌词/时位受保护。方案v1仅n2/n3实时视觉反馈，v2仅改为任务后反馈；两者均仅候选，视觉处理不由现场听课许可自动授权。逐事件记录B/P/I/D的反馈计划ID、版本、时点、模态、enablement及当前许可epoch与scope。仅现场听辨且不采录/留存/上传是另一有限题设正例，不能替代K08/K12/K15视觉设备证据。不得改目标、音符、音节、评价阈值、时位及保护范围。",
      "风险分支：任意阶段报告严重呼吸困难，立即停止交互并寻求当地紧急医疗，不等待评测。新发声疼痛或明显异常暂停相关练习并求适当医疗评估。上次暂停原因未澄清则不自动继续发声；实际专业建议范围与本人同意须核，不能用分数放行。每事件重新核验当前许可与计划版本；B后撤回则P停止受影响反馈，旧token、新模态或存储上传未经许可均拒绝；仅授权证据可保留，恢复需新同意及适用安全条件，不自动续跑。未获录音/新动作许可拒绝该操作，无相关风险报告不等安全。未实际作医学分诊或检查。"
    ]
  },
  {
    "id": "S-GV02",
    "role": "SUPPORT",
    "caseId": "GV02",
    "file": "production-governance-r1-knowledge-cases.md",
    "blob": "017d5d470766d348a0b16fab355fd9e7d812016e",
    "lines": [
      6
    ],
    "records": [
      "| GV02 | K15.01.02.03 | S564/S566 | 题设工程师OP-E可编辑P1，评审OP-R可验收混音，发布负责人OP-D需现行许可及明确授权。项目J、被授权主体ORG-J、实际操作者与受众分别绑定；角色不能代授予或委托证据。 | 能导出就能公开发布；同角色/内部受众的另一项目或操作者可继承许可。 | 列项目/被授权主体/实际操作者及委托、行动/对象/授权人/证据/时点；必要分权，真实执行K12。 | 虚构责任，非实际授权。 |"
    ]
  },
  {
    "id": "S-A11",
    "role": "SUPPORT",
    "caseId": "KC-A11",
    "file": "ai-models-r4-integrated-closure.md",
    "blob": "6c159bc6778e6c5bbdeb7520c2e164cc9d97a942",
    "lines": [
      56
    ],
    "records": [
      "KC-A11 R2b 当前报告必须绑定 source S1、condition P1、model W1、target T1、permissionEpoch E1、mask [1,3)、clock 120BPM/tm1、duration 2s、output Y1、protocol Q1。C1相同受保护字段与合成候选许可仅作有限资格；单独改变duration、clock、target均REJECT_PROTECTION，不能由新报告绕过；报告任一绑定不一致PENDING_REVALIDATION。当前授权撤回STOP，实际播放安全未知不得试听；模型/资源/版本/真实质量待证为PENDING而非保护失败。参考[AM05](ai-models-r1-knowledge-cases.md#L9)/[AM35](ai-models-r2-knowledge-cases.md#L23)解码重建、[AM58](ai-models-r2-knowledge-cases.md#L46)固定S537版本。"
    ]
  }
]
```

## 当前完整反向追溯

使用[R8a](g04-r8-xc01-independent-evidence.md) blob 9ce52519372828337ccd19f0af30e12189279719 原JS及[R8b-2](g04-r8-seven-role-evidence.md) blob 1326f94277d09281075f2423116f515334ea72bc JSON。提取原函数，执行如下只增加返回数据的适配（不改原评估、注册或断言）；原/导出函数结果除registry严格相同才继续。

```js
const original=runXC03(); const patched=runXC03.toString().replace("return {fixtures,baseline:a,","return {registry:copy({reference,estimate:estimates[candidate.measurement.estimateId],receipt:receipts[reportKey(candidate)],registeredRevision:revisions[revisionKey(candidate)],grant:grants[candidate.permission.epoch],original,assessment:assess(candidate)}),fixtures,baseline:a,"); if(patched===runXC03.toString())throw Error("adapter absent"); const xc=eval("("+patched+")")(); const {registry,...rest}=xc; if(JSON.stringify(rest)!==JSON.stringify(original))throw Error("adapter changed outputs");
```

固定注册中的完整独立观察、估计、receipt、目标、上下文与三误差进入A05/A07；最终被查询结果须完整等于实算结果。S/E节点为必须遍历的前置；丢失/伪造/断边均拒绝。合成许可只在R8a题设。R8a保留实际STOP/UNKNOWN/离线替代。

```js
function runR9CQ(xc,route,support){
 const copy=x=>JSON.parse(JSON.stringify(x));
 const canonical=x=>x===null?"null":Array.isArray(x)?"["+x.map(canonical).join(",")+"]":typeof x==="object"?"{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canonical(x[k])).join(",")+"}":JSON.stringify(x);
 const eq=(a,b)=>a!==undefined&&b!==undefined&&canonical(a)===canonical(b);
 const {reference,estimate,receipt,registeredRevision,grant,original,assessment}=xc.registry;
 const b=receipt.binding,m=receipt.measurement,inp=xc.traceInput,c=(a,b)=>1200*Math.log2(a/b);
 const result={state:Math.abs(c(estimate.hz,reference.hz))>1e-9?"REVIEW_MEASUREMENT":"STATIC_CANDIDATE_ONLY",candidate:receipt.revisionKey,report:receipt.id+"/"+receipt.version,referenceId:reference.id,estimateId:estimate.id,estimateError:c(estimate.hz,reference.hz),actualGoalError:c(reference.hz,original.target.musicHz),estimatedGoalError:c(estimate.hz,original.target.musicHz)};
 if(!eq(result,assessment)||!eq(result,xc.baseline)||!eq(b,registeredRevision)||!eq(receipt,inp.evidence)||!eq(grant,b.permission)||!eq(m.window,reference.window)||!eq(m.window,estimate.window)||m.referenceId!==reference.id||m.referenceRevision!==reference.revision||m.referenceSource!==reference.source||m.referenceHz!==reference.hz||m.estimateId!==estimate.id||m.estimatedHz!==estimate.hz||m.musicHz!==original.target.musicHz||m.voice!==reference.voice||m.voice!==estimate.voice||m.clock!==reference.clock||m.clock!==estimate.clock||reference.sourceMaterial!==b.source||estimate.candidate!==receipt.revisionKey||estimate.reference!==reference.id||!reference.valid||!m.valid||receipt.evidenceId!==estimate.id)throw Error("registry mismatch");
 const context={source:b.source,condition:b.condition,clock:b.content.clock,target:b.content.target,window:m.window,voice:m.voice,protocol:b.protocol};
 const output={
 "S-V06":{knowledge:support[0],events:b.events,plan:b.plan,version:b.planVersion,epoch:grant.epoch},
 "S-GV02":{knowledge:support[1],grant,role:b.role,source:b.source,condition:b.condition,actions:b.events.map(e=>e.mode),realSubject:"UNKNOWN"},
 "S-A11":{knowledge:support[2],registeredRevision,receipt,original,authorizedSpan:b.authorizedSpan},
 "E-OBS":reference,"E-EST":estimate,"E-RECEIPT":receipt,
 A01:{source:b.source,clock:b.content.clock,notes:b.content.notes,lyrics:b.content.lyrics},
 A02:{permission:grant,events:b.events,plan:b.plan,version:b.planVersion,role:b.role,workflow:b.workflow},
 A03:{host:b.host,model:b.model,protocol:b.protocol,scope:grant.scope,actualRun:false},
 A04:{candidate:receipt.revisionKey,content:b.content,authorizedSpan:b.authorizedSpan,cueIndependent:b.cueIndependent},
 A05:{result,reference,estimate,receipt,context},
 A06:{candidate:receipt.revisionKey,notes:b.content.notes,lyrics:b.content.lyrics,envelope:b.content.envelope},
 A07:{result,reference,estimate,receipt,context,release:false}};
 const deps={"S-V06":[],"S-GV02":[],"S-A11":[],"E-OBS":[],"E-EST":["E-OBS"],"E-RECEIPT":["S-A11","E-EST"],A01:[],A02:["A01","S-V06","S-GV02"],A03:["A02","S-GV02"],A04:["A01","A03","S-A11","E-RECEIPT"],A05:["A02","A04","E-OBS","E-EST","E-RECEIPT"],A06:["A01","A04"],A07:["A05","A06","S-A11","E-RECEIPT"]};
 const history=Object.entries(deps).map(([id,ds])=>({id,output:copy(output[id]),inputs:ds.map(d=>({id:d,artifact:copy(output[d])}))}));
 function trace(rows,knowledge,h,verdict){
  if(!verdict||verdict.state!=="STATIC_CANDIDATE_ONLY"||verdict.candidate!==result.candidate||verdict.report!==result.report||verdict.estimateId!==result.estimateId)return "PENDING_OR_NOT_APPLICABLE";
  if(!eq(verdict,result))return "UNKNOWN";
  if(new Set(rows.map(r=>r.ability)).size!==rows.length||new Set(knowledge.map(r=>r.id)).size!==knowledge.length||new Set(h.map(n=>n.id)).size!==h.length)return "UNKNOWN";
  const seen=new Set(),path=[];
  function visit(id){
   if(seen.has(id))return true;
   const n=h.find(x=>x.id===id),ds=deps[id];
   if(!n||!ds||!eq(n.output,output[id])||!Array.isArray(n.inputs)||!eq(n.inputs.map(x=>x.id),ds)||n.inputs.some(x=>!eq(x.artifact,h.find(y=>y.id===x.id)?.output)))return false;
   if(id.startsWith("A")){
    const row=rows.find(x=>x.ability===id),fixed=route.find(x=>x.ability===id);
    if(!row||!eq(row,fixed)||row.role!=="P"||!row.input||!row.output||!row.caseBlob||!row.matrixBlob||!row.discoveryBlob||!row.caseRecord?.includes(row.caseId)||!row.caseRecord.includes(row.d4)||!row.sourceRecords?.length||row.sourceRecords.length!==row.sources.length||row.sourceRecords.some((v,i)=>v.id!==row.sources[i].id||v.file!==row.sources[i].file||v.line!==row.sources[i].line||!v.blob||!v.record.includes(v.id)))return false;
   }else if(id.startsWith("S-")){
    const k=knowledge.find(x=>x.id===id),fixed=support.find(x=>x.id===id);
    if(!k||!eq(k,fixed)||k.role!=="SUPPORT"||!k.blob||!k.records?.length||!eq(n.output.knowledge,k))return false;
   }
   for(const d of ds)if(!visit(d))return false;
   seen.add(id);path.push(id);return true;
  }
  return visit("A07")?{primary:path.filter(id=>id.startsWith("A")),support:path.filter(id=>id.startsWith("S-")),evidence:path.filter(id=>id.startsWith("E-")),result:copy(verdict),context:copy(context),reference:copy(reference),estimate:copy(estimate),receipt:copy(receipt),release:false}:"UNKNOWN";
 }
 const out=[],test=(name,a,e)=>{if(!eq(a,e))throw Error(name+": "+JSON.stringify(a));out.push([name,true]);};
 const v=trace(route,support,history,xc.baseline),T=(v,h=history,k=support,r=route)=>trace(r,k,h,v);
 test("primary",v.primary,["A01","A02","A03","A04","A05","A06","A07"]);
 test("support",v.support.slice().sort(),["S-A11","S-GV02","S-V06"]);
 test("evidence",v.evidence.slice().sort(),["E-EST","E-OBS","E-RECEIPT"]);
 test("exact result/context/evidence",[v.result,v.context,v.reference,v.estimate,v.receipt,v.release],[result,context,reference,estimate,receipt,false]);
 test("R8 exact forged verdict",T({...xc.baseline,actualGoalError:0,estimateError:123,referenceId:"FAKE"}),"UNKNOWN");
 const {state,candidate,report,estimateId}=xc.baseline;
 test("R8 exact incomplete verdict",T({state,candidate,report,estimateId}),"UNKNOWN");
 for(const k of ["referenceId","estimateError","actualGoalError","estimatedGoalError"]){let x=copy(result);delete x[k];test("missing "+k,T(x),"UNKNOWN");x=copy(result);x[k]=k==="referenceId"?"FAKE":123;test("changed "+k,T(x),"UNKNOWN");}
 test("STOP",T({...result,state:"STOP"}),"PENDING_OR_NOT_APPLICABLE");
 for(const x of [xc.wrong,xc.offline,xc.revised])test("not c2/R2 "+x.state,T(x),"PENDING_OR_NOT_APPLICABLE");
 for(const id of ["S-V06","S-GV02","S-A11","E-OBS","E-EST","E-RECEIPT"]){
  test("missing node "+id,T(result,history.filter(n=>n.id!==id)),"UNKNOWN");
  const h=copy(history),n=h.find(n=>n.inputs.some(x=>x.id===id));n.inputs=n.inputs.filter(x=>x.id!==id);test("missing edge "+id,T(result,h),"UNKNOWN");
 }
 for(const id of ["S-V06","S-GV02","S-A11"])test("missing knowledge "+id,T(result,history,support.filter(n=>n.id!==id)),"UNKNOWN");
 for(const [id,k,value] of [["E-OBS","hz",200],["E-OBS","revision","fake"],["E-EST","source","fake"],["E-RECEIPT","evidenceId","EST-4"],["S-GV02","grant",{epoch:"O1",scope:["edit-offline"]}],["S-A11","authorizedSpan",[0,2000]]]){const h=copy(history);h.find(n=>n.id===id).output[k]=value;test("changed "+id+" "+k,T(result,h),"UNKNOWN");}
 for(const id of ["A05","A07"]){const h=copy(history);h.find(n=>n.id===id).output.result.actualGoalError=0;test("changed "+id+" result",T(result,h),"UNKNOWN");}
 test("missing primary",T(result,history,support,route.filter(r=>r.ability!=="A05")),"UNKNOWN");
 test("missing source",T(result,history,support,route.map(r=>r.ability==="A05"?{...r,sourceRecords:[]}:r)),"UNKNOWN");
 test("duplicate history",T(result,[...history,history[0]]),"UNKNOWN");
 return {checks:out,positive:{primary:v.primary,support:v.support,evidence:v.evidence,result:v.result,reference:v.reference,estimate:v.estimate,context:v.context}};
}
```

执行 `runR9CQ(xc, route, support)`。实际服务器Node执行，原R8a 70/70、当前R9 44/44 strict true；原/导出结果等价检查通过。原R8c未在此轮重放，仍属历史证据。实际输出：

```json
{
  "checks": [
    [
      "primary",
      true
    ],
    [
      "support",
      true
    ],
    [
      "evidence",
      true
    ],
    [
      "exact result/context/evidence",
      true
    ],
    [
      "R8 exact forged verdict",
      true
    ],
    [
      "R8 exact incomplete verdict",
      true
    ],
    [
      "missing referenceId",
      true
    ],
    [
      "changed referenceId",
      true
    ],
    [
      "missing estimateError",
      true
    ],
    [
      "changed estimateError",
      true
    ],
    [
      "missing actualGoalError",
      true
    ],
    [
      "changed actualGoalError",
      true
    ],
    [
      "missing estimatedGoalError",
      true
    ],
    [
      "changed estimatedGoalError",
      true
    ],
    [
      "STOP",
      true
    ],
    [
      "not c2/R2 REVIEW_MEASUREMENT",
      true
    ],
    [
      "not c2/R2 OFFLINE_DRAFT_ONLY",
      true
    ],
    [
      "not c2/R2 STATIC_CANDIDATE_ONLY",
      true
    ],
    [
      "missing node S-V06",
      true
    ],
    [
      "missing edge S-V06",
      true
    ],
    [
      "missing node S-GV02",
      true
    ],
    [
      "missing edge S-GV02",
      true
    ],
    [
      "missing node S-A11",
      true
    ],
    [
      "missing edge S-A11",
      true
    ],
    [
      "missing node E-OBS",
      true
    ],
    [
      "missing edge E-OBS",
      true
    ],
    [
      "missing node E-EST",
      true
    ],
    [
      "missing edge E-EST",
      true
    ],
    [
      "missing node E-RECEIPT",
      true
    ],
    [
      "missing edge E-RECEIPT",
      true
    ],
    [
      "missing knowledge S-V06",
      true
    ],
    [
      "missing knowledge S-GV02",
      true
    ],
    [
      "missing knowledge S-A11",
      true
    ],
    [
      "changed E-OBS hz",
      true
    ],
    [
      "changed E-OBS revision",
      true
    ],
    [
      "changed E-EST source",
      true
    ],
    [
      "changed E-RECEIPT evidenceId",
      true
    ],
    [
      "changed S-GV02 grant",
      true
    ],
    [
      "changed S-A11 authorizedSpan",
      true
    ],
    [
      "changed A05 result",
      true
    ],
    [
      "changed A07 result",
      true
    ],
    [
      "missing primary",
      true
    ],
    [
      "missing source",
      true
    ],
    [
      "duplicate history",
      true
    ]
  ],
  "positive": {
    "primary": [
      "A01",
      "A02",
      "A03",
      "A04",
      "A05",
      "A06",
      "A07"
    ],
    "support": [
      "S-V06",
      "S-GV02",
      "S-A11"
    ],
    "evidence": [
      "E-OBS",
      "E-EST",
      "E-RECEIPT"
    ],
    "result": {
      "state": "STATIC_CANDIDATE_ONLY",
      "candidate": "C/c2",
      "report": "R2/r2",
      "referenceId": "OBS-A-01",
      "estimateId": "EST-2",
      "estimateError": 0,
      "actualGoalError": 165.00422849992202,
      "estimatedGoalError": 165.00422849992202
    },
    "reference": {
      "id": "OBS-A-01",
      "source": "INDEPENDENT-SYNTH-REF",
      "revision": "ref-v1",
      "sourceMaterial": "S1",
      "voice": "A",
      "clock": "t1",
      "window": [
        0,
        500
      ],
      "hz": 220,
      "valid": true
    },
    "estimate": {
      "id": "EST-2",
      "revision": "e2",
      "candidate": "C/c2",
      "reference": "OBS-A-01",
      "source": "SYNTH-ESTIMATOR",
      "voice": "A",
      "clock": "t1",
      "window": [
        0,
        500
      ],
      "hz": 220
    },
    "context": {
      "source": "S1",
      "condition": "P1",
      "clock": {
        "id": "t1",
        "bpm": 120,
        "beatUnit": "quarter",
        "originMs": 0
      },
      "target": {
        "id": "v1",
        "musicHz": 200
      },
      "window": [
        0,
        500
      ],
      "voice": "A",
      "protocol": "Q1"
    }
  }
}
```

不宣称全部历史来源或能力格重新独立审核；保留R8限定U/I、15 OPEN、28 SPLIT_OPEN，CAL07/G05/T03/L2仍阻塞。
