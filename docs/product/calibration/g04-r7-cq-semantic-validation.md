# G04 R7c — CQ01–26 实际有限语义推演

基准 4703f01ca630aff23eda94b84f32cadfbbbbf4f8。R7b逐CQ人工限定查询、专业推理、正负未知及缺口与以下可复现子例互补。按题定数据、已有专业条件及显式项目合同执行，不是实际检索/LLM或完整自动推理器；不因固定fixture通过宣布任意输入正确。CQ16/19/21等从当前R7a exact blob 8681265f523b47ffd49d8f21b1503e40f6b53abd 实际提取执行60/60，再读取其指定结果，不把重用结果算独立专业覆盖。其他计算/分支仅验证所列有限子例；包括证据拒答、状态传播、角色不升级和真实语种未知。源与专业定位见R7b与原案例回读。测试语言为JS，不要求产品代码或运行时。

复现：先从 [R7a](g04-r7-xc01-protection-remediation.md) 提取完整runXC02函数执行，传其返回值给runCQ。

```js
function runCQ(xc){
 const out=[];const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);const ok=(q,n,a,b)=>{if(!eq(a,b))throw Error(q+" "+n+" "+JSON.stringify(a)+" != "+JSON.stringify(b));out.push([q,n,JSON.stringify(a)])};
 const r6=x=>Math.round(x*1e6)/1e6,valid=x=>typeof x==="number"&&Number.isFinite(x)&&x>0;
 const cents=(a,b)=>valid(a)&&valid(b)?r6(1200*Math.log2(a/b)):null;
 const q1=(a,b,context,rawName)=>({cents:cents(a,b),absolute:valid(b)?a:null,culturalName:context==="documented-exact"&&rawName?rawName:"UNKNOWN"});
 ok("CQ01","non-12TET ratio",q1(330,220,"unknown",null),{cents:701.955001,absolute:330,culturalName:"UNKNOWN"});
 ok("CQ01","invalid ratio",cents(0,220),null);
 ok("CQ01","19EDO approximate mapping collision",[1,2,3].map(n=>Math.round(12*n/19)),[1,1,2]);
 const q2=(chord,key,context)=>chord!=="D7"?"OUT_OF_SCOPE":key==="G"&&context==="tonic-confirmed"?"V7":key==="C"&&context==="tonicize-G-return-C"?"V7/V_CANDIDATE":"UNKNOWN";
 ok("CQ02","C vs G context",[q2("D7","C","tonicize-G-return-C"),q2("D7","G","tonic-confirmed")],["V7/V_CANDIDATE","V7"]);
 ok("CQ02","isolated chord",q2("D7",null,null),"UNKNOWN");
 const q3=(type,w)=>type==="Bb"?w.map(n=>n-2):type==="A"?w.map(n=>n-3):null;
 ok("CQ03","ordinary Bb sounding unison",q3("Bb",[74,76,78,81]),[72,74,76,79]);
 ok("CQ03","written same fails",eq(q3("Bb",[72,74,76,79]),[72,74,76,79]),false);
 ok("CQ03","unknown instrument",q3(null,[74]),null);
 const q4=(bpm,notes,groups)=>valid(bpm)&&groups.flat().length===notes.length&&eq(groups.flat(),notes)?{seconds:r6(60/bpm*notes.length),groups:groups.length}:null;
 ok("CQ04","4 beats 3 syllables",q4(120,["n1","n2","n3","n4"],[["n1"],["n2"],["n3","n4"]]),{seconds:2,groups:3});
 ok("CQ04","wrong binding/unknown time",[q4(120,["n1","n2"],[["n1"],["n1"]]),q4(null,["n1"],[["n1"]])],[null,null]);
 ok("CQ04","NFC does not erase raw order",["\u1000\u103a\u1037".normalize("NFC")==="\u1000\u1037\u103a".normalize("NFC"),"\u1000\u103a\u1037"==="\u1000\u1037\u103a"],[true,false]);
 const q5=(f0,h,validWindow)=>({harmonics:validWindow&&valid(f0)&&Array.isArray(h)?h.map(v=>r6(v/f0)):null,physiology:"UNKNOWN"});
 ok("CQ05","harmonics not physiology",q5(200,[200,400,600],true),{harmonics:[1,2,3],physiology:"UNKNOWN"});
 ok("CQ05","invalid observation",q5(200,[200],false),{harmonics:null,physiology:"UNKNOWN"});
 const q6=(truth,est,goal,match,symptom)=>symptom?"STOP":!match?"UNKNOWN":{estError:cents(est,truth),trueGoal:cents(truth,goal),estimatedGoal:cents(est,goal)};
 ok("CQ06","estimate vs actual target",q6(220,220,200,true,false),{estError:0,trueGoal:165.004228,estimatedGoal:165.004228});
 ok("CQ06","target-matching wrong estimate",q6(220,200,200,true,false),{estError:-165.004228,trueGoal:165.004228,estimatedGoal:0});
 ok("CQ06","missing truth",q6(null,200,200,true,false),{estError:null,trueGoal:null,estimatedGoal:0});
 ok("CQ06","clock mismatch and symptom",[q6(220,220,200,false,false),q6(220,220,200,true,true)],["UNKNOWN","STOP"]);
 const q7=(fs,w,n)=>[fs,w,n].every(valid)&&n>=w?{winMs:r6(1000*w/fs),grid:r6(fs/n)}:null;
 ok("CQ07","zero padding grid only",[q7(48000,480,960),q7(48000,480,1920)],[{winMs:10,grid:50},{winMs:10,grid:25}]);
 ok("CQ07","unknown observation window",q7(48000,null,960),null);
 const q8=blocks=>{if(!Array.isArray(blocks))return null;let a=blocks.filter(x=>x.complete&&x.l>-70).map(x=>x.l);if(!a.length)return null;let mean=10*Math.log10(a.reduce((s,v)=>s+10**(v/10),0)/a.length);return a.filter(x=>x>mean-10)};
 ok("CQ08","absolute and relative strict gate",q8([-70,-69,-20].map(l=>({complete:true,l}))),[-20]);
 ok("CQ08","no eligible complete blocks",q8([{complete:true,l:-70},{complete:false,l:-10}]),null);
 ok("CQ08","valid bits != container bytes",48000*2*3,288000);
 const q9=x=>x.text&&x.score&&x.goal==="singing"?"SVS_CANDIDATE":x.source&&x.goal==="timbre"?"SVC_CANDIDATE":x.text&&x.goal==="speech"?"TTS_CANDIDATE":x.text&&x.goal==="song"?"SONG_CONDITIONED_CANDIDATE":"UNKNOWN";
 ok("CQ09","task classes",[q9({text:true,score:true,goal:"singing"}),q9({source:true,goal:"timbre"}),q9({text:true,goal:"speech"}),q9({text:true,goal:"song"})],["SVS_CANDIDATE","SVC_CANDIDATE","TTS_CANDIDATE","SONG_CONDITIONED_CANDIDATE"]);
 ok("CQ09","text alone not score-controlled singing",q9({text:true,goal:"singing"}),"UNKNOWN");
 const q10=(target,estimate,aligned)=>aligned&&eq(target,[1,0])&&Array.isArray(estimate)?[r6(target[0]-estimate[0]),estimate[1]]:null;
 ok("CQ10","attenuation and leak",q10([1,0],[.8,.1],true),[.2,.1]);
 ok("CQ10","no reference or no alignment",[q10(null,[.8,.1],true),q10([1,0],[.8,.1],false)],[null,null]);
 const fad=(m,v)=>m*m+1+v-2*Math.sqrt(v);
 ok("CQ11","same squared distance distinct distributions",[fad(1,1),fad(0,4)],[1,1]);
 const comparable=(a,b)=>a.ref&&a.embedding&&a.protocol&&b.ref===a.ref&&b.embedding===a.embedding&&b.protocol===a.protocol;
 ok("CQ11","missing/mismatched protocols",[!!comparable({ref:"R",embedding:"E",protocol:"P"},{ref:"R",embedding:"E",protocol:"Q"}),!!comparable({ref:"R"},{ref:"R"})],[false,false]);
 const q12=x=>x.permission==="revoked"?"STOP":x.permission!=="confirmed"?"UNKNOWN":!x.meaning||!x.melody?"REJECT":!x.languageEvidence?"OFFLINE_DRAFT_ONLY":"SCOPED_ADAPTATION_CANDIDATE";
 ok("CQ12","adaptation constraints and authorization",[q12({permission:"confirmed",meaning:true,melody:true,languageEvidence:true}),q12({permission:"confirmed",meaning:false,melody:true,languageEvidence:true}),q12({permission:"confirmed",meaning:true,melody:true}),q12({permission:"unknown"})],["SCOPED_ADAPTATION_CANDIDATE","REJECT","OFFLINE_DRAFT_ONLY","UNKNOWN"]);
 const q13=x=>!x.locator||!x.version?"UNKNOWN":x.kind==="programme"?"PLAN_ONLY":x.kind==="recollection"?"RECOLLECTION_ONLY":x.kind==="research"?"INTERPRETATION_ONLY":"UNKNOWN";
 ok("CQ13","source kinds",["programme","recollection","research"].map(kind=>q13({kind,locator:"p1",version:"v1"})),["PLAN_ONLY","RECOLLECTION_ONLY","INTERPRETATION_ONLY"]);
 ok("CQ13","missing original locator",q13({kind:"programme",version:"v1"}),"UNKNOWN");
 const q14=x=>!x.version||!x.receiptVersion||!x.hard?"UNKNOWN":x.version!==x.receiptVersion?"PENDING_REVALIDATION":x.hard==="verified"?"SCOPED_CANDIDATE":"REJECT";
 ok("CQ14","H1 vs H2 and unknown capability",[q14({version:"H1",receiptVersion:"H1",hard:"verified"}),q14({version:"H2",receiptVersion:"H1",hard:"verified"}),q14({version:"H2",receiptVersion:"H2"})],["SCOPED_CANDIDATE","PENDING_REVALIDATION","UNKNOWN"]);
 const q15=x=>!x.lineage||x.exposed==null||x.equalContent==null?"UNKNOWN":x.exposed||x.equalContent?"EXPOSED":"LIMITED_UNSEEN_CANDIDATE";
 ok("CQ15","new item versus preview and alias",[q15({lineage:"L1",exposed:false,equalContent:false}),q15({lineage:"L1",exposed:true,equalContent:false}),q15({lineage:"L1",exposed:false,equalContent:true}),q15({lineage:"L1",equalContent:false})],["LIMITED_UNSEEN_CANDIDATE","EXPOSED","EXPOSED","UNKNOWN"]);
 const lookup=n=>xc.fixtures.find(x=>x[0]===n)?.[1];
 ok("CQ16","actual XC01-R2 protection regression",[lookup("stipulated baseline"),lookup("same note ID different pitch"),lookup("duration 3000 and fresh report"),lookup("cue independence unknown"),lookup("outside curve changed")],["STATIC_CANDIDATE_ONLY","REJECT_PROTECTION","REJECT_PROTECTION","UNKNOWN","REJECT_PROTECTION"]);
 const q17=x=>x.state==="EVIDENCE_OPEN"?"UNKNOWN":x.kind==="definition"&&x.conditions===true?"SCOPED_CALCULATION":x.kind==="conditional"&&x.conditions===true?"SCOPED_CANDIDATE":"NOT_UNCONDITIONAL_RULE";
 ok("CQ17","relationship typing",[{kind:"definition",conditions:true},{kind:"conditional",conditions:true},{kind:"empirical",conditions:true},{kind:"cultural",state:"EVIDENCE_OPEN"}].map(q17),["SCOPED_CALCULATION","SCOPED_CANDIDATE","NOT_UNCONDITIONAL_RULE","UNKNOWN"]);
 const q18=x=>!x.source||!x.performer||!x.context?"UNKNOWN":x.scope==="instance"?"SCOPED_INSTANCE":"REJECT_GENERALIZATION";
 ok("CQ18","source-specific tradition",[q18({source:"S577",performer:"example",context:"harp",scope:"instance"}),q18({source:"S577",performer:"example",context:"harp",scope:"all-Myanmar"}),q18({source:"S585"})],["SCOPED_INSTANCE","REJECT_GENERALIZATION","UNKNOWN"]);
 ok("CQ19","workflow stops and permits only bounded candidate",[lookup("stipulated baseline"),lookup("unknown permission"),lookup("event revoked after B"),lookup("changed binding host")],["STATIC_CANDIDATE_ONLY","UNKNOWN","STOP","PENDING_REVALIDATION"]);
 const q20=x=>x.permission==="revoked"?"STOP":x.permission!=="confirmed"||!x.version||x.capability==null?"UNKNOWN":!x.capability?"REJECT":"SCOPED_CANDIDATE";
 ok("CQ20","hard gates independent of preference score",[q20({permission:"confirmed",version:"H1",capability:true,score:7}),q20({permission:"confirmed",version:"H1",score:9}),q20({permission:"confirmed",version:"H1",capability:false,score:10}),q20({permission:"revoked",version:"H1",capability:true})],["SCOPED_CANDIDATE","UNKNOWN","REJECT","STOP"]);
 ok("CQ21","same ID changed content and stale report",[lookup("unchanged ID new candidate content stale report"),lookup("fresh report on allowed edit"),lookup("same lyric ID changed binding"),lookup("both versions absent")],["PENDING_REVALIDATION","STATIC_CANDIDATE_ONLY","REJECT_PROTECTION","PENDING_REVALIDATION"]);
 const q22=(ref,est,tol)=>valid(ref)&&valid(est)&&valid(tol)?Math.abs(ref-est)<=tol?1:0:null;
 ok("CQ22","per-reference F1 singleton",[q22(10,10.2,.5),q22(15,10.2,.5)],[1,0]);
 ok("CQ22","missing reference",q22(null,10.2,.5),null);
 const q23=(original,output,known)=>!known?"UNKNOWN":eq(original,output)?"SCOPED_PRESERVED":"LOSS";
 const original={note:"N",voice:"A",word:"W",binding:"N-W"};
 ok("CQ23","explicit identity loss despite same text/pitch",[q23(original,{...original},true),q23(original,{note:"N",word:"W"},true),q23(original,null,false)],["SCOPED_PRESERVED","LOSS","UNKNOWN"]);
 const q24=(flags,version,siteSafety)=>siteSafety!==true?"STOP":version!=="v19"||!Number.isInteger(flags)?"UNKNOWN":[["inputUnderflow",1],["inputOverflow",2],["outputUnderflow",4],["outputOverflow",8],["primingOutput",16]].filter(([_,v])=>(flags&v)!==0).map(x=>x[0]);
 ok("CQ24","multibit flags not root cause",[q24(6,"v19",true),q24(16,"v19",true),q24(6,null,true),q24(6,"v19",null)],[["inputOverflow","outputUnderflow"],["primingOutput"],"UNKNOWN","STOP"]);
 const q25=x=>!x.caseId||!x.sourceId||!x.inputId||!x.role||!x.reportBinding?"UNKNOWN":x.reportBinding!==x.inputId?"PENDING_REVALIDATION":"SCOPED_TRACE";
 ok("CQ25","traceable chain",[q25({caseId:"X",sourceId:"S",inputId:"c2",role:"K09",reportBinding:"c2"}),q25({caseId:"X",sourceId:"S",inputId:"c2",role:"K09",reportBinding:"c1"}),q25({caseId:"X",inputId:"c2",role:"K09",reportBinding:"c2"})],["SCOPED_TRACE","PENDING_REVALIDATION","UNKNOWN"]);
 const q26=(a,b)=>a&&b&&a.n>0&&b.n>0?{overall:r6((a.k+b.k)/(a.n+b.n)),b:r6(b.k/b.n),unseen:"UNKNOWN"}:null;
 ok("CQ26","stratified outcome",q26({n:90,k:81},{n:10,k:3}),{overall:.84,b:.3,unseen:"UNKNOWN"});
 ok("CQ26","zero group denominator",q26({n:90,k:81},{n:0,k:0}),null);
 return out;
}
console.log(runCQ(runXC02()));
```

| CQ | 断言 | 实际结果（与预期一致） |
|---|---|---|
| CQ01 | non-12TET ratio | {"cents":701.955001,"absolute":330,"culturalName":"UNKNOWN"} |
| CQ01 | invalid ratio | null |
| CQ01 | 19EDO approximate mapping collision | [1,1,2] |
| CQ02 | C vs G context | ["V7/V_CANDIDATE","V7"] |
| CQ02 | isolated chord | "UNKNOWN" |
| CQ03 | ordinary Bb sounding unison | [72,74,76,79] |
| CQ03 | written same fails | false |
| CQ03 | unknown instrument | null |
| CQ04 | 4 beats 3 syllables | {"seconds":2,"groups":3} |
| CQ04 | wrong binding/unknown time | [null,null] |
| CQ04 | NFC does not erase raw order | [true,false] |
| CQ05 | harmonics not physiology | {"harmonics":[1,2,3],"physiology":"UNKNOWN"} |
| CQ05 | invalid observation | {"harmonics":null,"physiology":"UNKNOWN"} |
| CQ06 | estimate vs actual target | {"estError":0,"trueGoal":165.004228,"estimatedGoal":165.004228} |
| CQ06 | target-matching wrong estimate | {"estError":-165.004228,"trueGoal":165.004228,"estimatedGoal":0} |
| CQ06 | missing truth | {"estError":null,"trueGoal":null,"estimatedGoal":0} |
| CQ06 | clock mismatch and symptom | ["UNKNOWN","STOP"] |
| CQ07 | zero padding grid only | [{"winMs":10,"grid":50},{"winMs":10,"grid":25}] |
| CQ07 | unknown observation window | null |
| CQ08 | absolute and relative strict gate | [-20] |
| CQ08 | no eligible complete blocks | null |
| CQ08 | valid bits != container bytes | 288000 |
| CQ09 | task classes | ["SVS_CANDIDATE","SVC_CANDIDATE","TTS_CANDIDATE","SONG_CONDITIONED_CANDIDATE"] |
| CQ09 | text alone not score-controlled singing | "UNKNOWN" |
| CQ10 | attenuation and leak | [0.2,0.1] |
| CQ10 | no reference or no alignment | [null,null] |
| CQ11 | same squared distance distinct distributions | [1,1] |
| CQ11 | missing/mismatched protocols | [false,false] |
| CQ12 | adaptation constraints and authorization | ["SCOPED_ADAPTATION_CANDIDATE","REJECT","OFFLINE_DRAFT_ONLY","UNKNOWN"] |
| CQ13 | source kinds | ["PLAN_ONLY","RECOLLECTION_ONLY","INTERPRETATION_ONLY"] |
| CQ13 | missing original locator | "UNKNOWN" |
| CQ14 | H1 vs H2 and unknown capability | ["SCOPED_CANDIDATE","PENDING_REVALIDATION","UNKNOWN"] |
| CQ15 | new item versus preview and alias | ["LIMITED_UNSEEN_CANDIDATE","EXPOSED","EXPOSED","UNKNOWN"] |
| CQ16 | actual XC01-R2 protection regression | ["STATIC_CANDIDATE_ONLY","REJECT_PROTECTION","REJECT_PROTECTION","UNKNOWN","REJECT_PROTECTION"] |
| CQ17 | relationship typing | ["SCOPED_CALCULATION","SCOPED_CANDIDATE","NOT_UNCONDITIONAL_RULE","UNKNOWN"] |
| CQ18 | source-specific tradition | ["SCOPED_INSTANCE","REJECT_GENERALIZATION","UNKNOWN"] |
| CQ19 | workflow stops and permits only bounded candidate | ["STATIC_CANDIDATE_ONLY","UNKNOWN","STOP","PENDING_REVALIDATION"] |
| CQ20 | hard gates independent of preference score | ["SCOPED_CANDIDATE","UNKNOWN","REJECT","STOP"] |
| CQ21 | same ID changed content and stale report | ["PENDING_REVALIDATION","STATIC_CANDIDATE_ONLY","REJECT_PROTECTION","PENDING_REVALIDATION"] |
| CQ22 | per-reference F1 singleton | [1,0] |
| CQ22 | missing reference | null |
| CQ23 | explicit identity loss despite same text/pitch | ["SCOPED_PRESERVED","LOSS","UNKNOWN"] |
| CQ24 | multibit flags not root cause | [["inputOverflow","outputUnderflow"],["primingOutput"],"UNKNOWN","STOP"] |
| CQ25 | traceable chain | ["SCOPED_TRACE","PENDING_REVALIDATION","UNKNOWN"] |
| CQ26 | stratified outcome | {"overall":0.84,"b":0.3,"unseen":"UNKNOWN"} |
| CQ26 | zero group denominator | null |

实际 46/46，覆盖26个CQ的至少一个可计算或可判别分支；原60项复用不累加为独立覆盖。本轮不是独立PASS。
