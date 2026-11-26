# K15 R6 — R5一P1两P2集中修订及可复现有限见证
DRAFT / #64 / PR65。R5受审e36ddfd561b7109b5f29473e2010bad4438fbd80，独立FAIL [Issue 7200034924](https://github.com/kaicreator-mm/audio-kg/issues/64#issuecomment-7200034924) / [PR 7200035927](https://github.com/kaicreator-mm/audio-kg/pull/65#issuecomment-7200035927)。三项均FIX_CANDIDATE，尚未经独立复审。保持48主D4、192四视角、原48槽、56角色、26CQ/12局部、八D24 SPLIT_OPEN；不关闭任何此前非阻断问题。只构造知识条件，非软件实现、真实DAW重开、法律意见、实际权限/制作/发行/CI或accepted claim/L1 freeze。

## K15-RV-01 — P1 保护旋律、可编辑工程和当前验收组合
[GV29/K15.02.02.04](production-governance-r2-knowledge-cases.md#L9)；[GV33/K15.03.03.04](production-governance-r2-knowledge-cases.md#L13)；[GV34/K15.04.01.04](production-governance-r2-knowledge-cases.md#L14)；[GV35/K15.04.02.04](production-governance-r2-knowledge-cases.md#L15)。
原53历史记录不抹去；R5发现旧依赖闭包未覆盖N/P、精确回执未与放行合成。R6在KC-GV15主合同处直接替换组合。N是保护乐谱候选，P是后置可编辑工程，ENV是必要源/插件/预设/宿主环境；内容依赖与验收依赖分别声明，Q受N/P/ENV及其他必交对象影响，D受Q及动态权利安全。N闭包={D,M,N,P,Q,ST,V}；P={D,P,Q}；ENV={D,ENV,P,Q}。B不因N/P修订被删除；重新校验当前资格。P修改不假定已经生成的WAV变化。保护基线使用K13示意PPQ480_T120，[60,62,64,62]、[480,480,240,240]、无休止；仅该有限例的逐事件严格等价，不是一般音乐等价算法。候选明确存四交付物身份及合成内容标记；固定必要依赖源/插件/预设/宿主，声明缺项不可用新报告掩盖；现实配置需实际枚举并验证。Q绑定完整当前候选快照以及实际任务所需的技术/音乐/独立评审、保护旋律、依赖检查、重开/编辑性和失效复核证据。实际摘要必须计算，此处D1等是题设标记，字符串比较非实际哈希。权限证据也绑定同一快照，角色独立，三项有限授权不得替代所有必要授权。任何遗漏或不明不放行。
| 情形 | 新候选音频标记 | 现行放行 |
|---|---|---|
| N2相同保护旋律、旧Q | D1 | NOT_READY |
| N2音高/时基/时值错误、即使新Q | D1 | NOT_READY |
| P1@2同音频、旧Q | D1 | NOT_READY |
| P1@2缺必需插件、即使新Q | D1 | NOT_READY |
| P1@2重开/编辑性未知或失效未复核 | D1 | NOT_READY |
| N2保持基线且全部当前题设证据重新合格 | D1 | SYNTHETIC_CANDIDATE_ONLY |
| P1@2依赖完整、当前题设重开/编辑性及全门禁合格 | D1 | SYNTHETIC_CANDIDATE_ONLY |
上述“新Q”是合成证据记录，不是运行DAW或取得真实评审；不因记录存在推断事实。

## K15-RV-02 — P2 §41(2)/(3)条件与反例
[GV38/K15.05.02.04](production-governance-r2-knowledge-cases.md#L18)；[S566](../../research/source-qualification-production-governance-r1-r2.md#L7)。本轮实际重新读取WIPO Lex英文2019 No.15 §41 L412–417：针对§37–40及42相关权利；第(2)项为专供科学研究的复制；第(3)项为专供面对面教学的复制，排除已经作为教学材料发布的表演和录音制品。末尾共同限制：不得与正常利用冲突，亦不得不合理地损害权利人的合法利益。普通录音/教学目的单独不足以取得权利。合成条件表：普通录音、专为面对面教学、末尾限制均满足→EXCEPTION_CANDIDATE_ONLY；已发布教学录音→第(3)项排除；是否已发布为教学材料未知→PENDING_FACTS；研究兼其他目的→第(2)项不符；仅网课不是面对面；末尾条件冲突/不明拒绝或待核。仅该两款候选筛选，不判断§41其他款、作品权§18及其他例外、合同/隐私、现行完整法律；不能从此确定AI训练、实际复制或发布合法。没有新来源ID或升级法域资格。

## K15-RV-03 — P2 项目、主体、操作者及委托独立绑定
[GV02/K15.01.02.03](production-governance-r1-knowledge-cases.md#L6)；[GV14/K15.05.02.03](production-governance-r1-knowledge-cases.md#L18)；[GV17/K15.06.02.03](production-governance-r1-knowledge-cases.md#L21)；[GV41/K15.06.02.04](production-governance-r2-knowledge-cases.md#L21)。
G-W/G-V/G-B各自绑定授权人且题设已核、project J、grantee ORG-J、actor OP-E、委托记录DEL1且题设有效、MM、internal、E1、各自对象动作、[10,100)。请求还必须核实际操作者身份，时刻50。授权主体与受众、操作能力与权利许可不是同一概念。仅三项范围核验，不包含完整生产所有权利；放行另需题设全部必要权利、当前安全及发行角色OP-D有效。J2、ORG-X、OP-X、不同委托、缺失任一主体字段、身份/委托未知，即使受众/对象同一也拒绝。实际委托的有效性、权利链、期限、执行权限K12另证；不是法律上的充分许可。发布合同/外部状态仍独立。

## 实际有限见证（可重放JS，不是产品代码）
以下函数是本轮实际执行的同一函数，独立对话可复制到JS环境重放。所有输入均为合成，不使用实际素材/个人数据/合同。
```javascript
function runFiniteR6(){
 const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const cp=x=>JSON.parse(JSON.stringify(x));
 const dep={W:[],N:[],VREF:[],B:[],ENV:[],L:["W"],V:["L","N","VREF"],M:["V","B"],ST:["V"],P:["N","L","V","M","ST","B","ENV"],Q:["N","L","M","ST","P","ENV"],D:["Q"]};
 function closure(start){if(!start.every(x=>Object.hasOwn(dep,x)))return null;let s=new Set(start),change=true;while(change){change=false;for(const [n,ds] of Object.entries(dep)){if(!s.has(n)&&ds.some(d=>s.has(d))){s.add(n);change=true}}}return [...s].sort()}
 const scope={project:"J",grantee:"ORG-J",actor:"OP-E",delegation:"DEL1",region:"MM",audience:"internal",epoch:"E1"};
 const grantSpecs=[["G-W","W1","translate","P-W"],["G-V","VREF1","local_inference","P-V"],["G-B","B1","local_mix","P-B"]];
 const grants=grantSpecs.map(([id,object,action,grantor])=>({id,object,action,grantor,...scope,from:10,to:100,grantorVerified:true,delegationVerified:true}));
 const requests=grants.map(g=>({object:g.object,action:g.action,...scope,t:50,actorIdentityVerified:true}));
 const scopeKeys=["object","action","project","grantee","actor","delegation","region","audience","epoch"];
 function permit(g,q){return !!g&&!!q&&g.grantorVerified===true&&typeof g.grantor==="string"&&g.grantor.length>0&&g.delegationVerified===true&&q.actorIdentityVerified===true&&scopeKeys.every(k=>typeof g[k]==="string"&&g[k].length>0&&q[k]===g[k])&&Number.isFinite(q.t)&&q.t>=g.from&&q.t<g.to}
 const auth=(gs,qs)=>Array.isArray(qs)&&qs.length>0&&qs.every(q=>gs.some(g=>permit(g,q)));
 const protectedMelody={clock:"PPQ480_T120",notes:[60,62,64,62],duration:[480,480,240,240],rest:[false,false,false,false]};
 const expectedDeps=["SRC-B1","SRC-V1","PLUGIN-H1@2","PRESET-S1","HOST-H1@3"];
 const docs=["wav","editable","scoreLyrics","rightsEvidence"];
 const base={source:"W1",lyrics:"L1",score:"N1",melody:cp(protectedMelody),protectedBaseline:"N-PROTECTED@1",reference:"VREF1",voice:"V1",backing:"B1",projectArtifact:"P1@1",mix:"M1",stem:"ST1",environment:"ENV1",dependencies:[...expectedDeps],format:"48k-WAV",project:"J",grantee:"ORG-J",actor:"OP-E",delegation:"DEL1",grantEpoch:"E1",config:"C1",rubric:"Q1",outputDigest:"D1",artifacts:{wav:"M1:D1",editable:"P1@1:EP1",scoreLyrics:"N1:L1:SL1",rightsEvidence:"E1:RE1"}};
 const keys=Object.keys(base);
 function validCandidate(c){return !!c&&Object.keys(c).length===keys.length&&keys.every(k=>Object.hasOwn(c,k))&&keys.filter(k=>!["melody","dependencies","artifacts"].includes(k)).every(k=>typeof c[k]==="string"&&c[k].length>0)&&!!c.artifacts&&Object.keys(c.artifacts).length===docs.length&&docs.every(k=>typeof c.artifacts[k]==="string"&&c.artifacts[k].length>0)&&Array.isArray(c.dependencies)&&c.dependencies.every(x=>typeof x==="string")&&!!c.melody}
 function exact(a,b){return validCandidate(a)&&validCandidate(b)&&keys.every(k=>eq(a[k],b[k]))}
 function verifyArtifacts(c){return c.protectedBaseline===base.protectedBaseline&&eq(c.melody,protectedMelody)&&eq([...c.dependencies].sort(),[...expectedDeps].sort())&&c.artifacts.wav===c.mix+":"+c.outputDigest&&c.artifacts.editable.startsWith(c.projectArtifact+":")&&c.artifacts.scoreLyrics.startsWith(c.score+":"+c.lyrics+":")&&c.artifacts.rightsEvidence.startsWith(c.grantEpoch+":")}
 // For this fixed finite fixture, all evidence is stipulated, not observed. Binding
 // the whole snapshot prevents an old PASS being reused after any input changes.
 function receipt(c){return {identity:cp(c),tech:true,music:true,review:true,melody:true,editable:true,reopen:true,dependencyVerified:true,revalidated:true,reviewer:"OP-R"}}
 function authority(c,gs=grants,qs=requests){return {identity:cp(c),grants:cp(gs),requests:cp(qs),allNecessaryRights:true,safety:true,releaseActor:"OP-D",releaseRoleVerified:true}}
 function gate(c,q,a){
   if(!validCandidate(c))return "NOT_READY";
   if(!a||!exact(c,a.identity)||a.allNecessaryRights!==true||a.safety!==true||a.releaseActor!=="OP-D"||a.releaseRoleVerified!==true||
      !Array.isArray(a.requests)||a.requests.length!==3||!grantSpecs.every(([,object,action])=>a.requests.some(x=>x.object===object&&x.action===action))||
      !a.requests.every(x=>x.project===c.project&&x.grantee===c.grantee&&x.actor===c.actor&&x.delegation===c.delegation&&x.epoch===c.grantEpoch&&x.t===50&&x.region==="MM"&&x.audience==="internal")||!Array.isArray(a.grants)||!auth(a.grants,a.requests))return "STOP_OR_PENDING";
   if(!verifyArtifacts(c)||!q||!exact(c,q.identity)||q.reviewer!=="OP-R"||!["tech","music","review","melody","editable","reopen","dependencyVerified","revalidated"].every(k=>q[k]===true))return "NOT_READY";
   return "SYNTHETIC_CANDIDATE_ONLY"
 }
 const ok="SYNTHETIC_CANDIDATE_ONLY",no="NOT_READY",stop="STOP_OR_PENDING";
 const q1=receipt(base),a1=authority(base);
 const n2={...cp(base),score:"N2",artifacts:{...base.artifacts,scoreLyrics:"N2:L1:SL2"}};
 const p2={...cp(base),projectArtifact:"P1@2",artifacts:{...base.artifacts,editable:"P1@2:EP2"}};
 const wrongN={...cp(n2),melody:{...cp(n2.melody),notes:[60,63,64,62]}};
 const missingPlugin={...cp(p2),dependencies:expectedDeps.filter(x=>x!=="PLUGIN-H1@2")};
 const oldReceiptWithNewArtifacts={...q1,identity:{...q1.identity,outputDigest:"D1"}};
 // Only the narrow Sec.41(2)/(3) related-right reproduction exception candidates.
 // Never returns legal permission; other rights, all facts, and current law separate.
 function exceptionCandidate(x){
  if(!x||x.layer!=="related"||x.action!=="reproduction")return "OUT_OF_SCOPE";
  if(!["scientific_research","face_to_face_teaching"].includes(x.purpose))return "OUT_OF_SCOPE";
  if(x.solely===false||x.normalExploitationConflict===true||x.unreasonablePrejudice===true)return "EXCLUDED";
  if(x.purpose==="face_to_face_teaching"&&x.publishedTeachingMaterial===true)return "EXCLUDED";
  if(x.solely!==true||x.normalExploitationConflict!==false||x.unreasonablePrejudice!==false||(x.purpose==="face_to_face_teaching"&&x.publishedTeachingMaterial!==false))return "PENDING_FACTS";
  return "EXCEPTION_CANDIDATE_ONLY"
 }
 const teach={layer:"related",action:"reproduction",purpose:"face_to_face_teaching",solely:true,publishedTeachingMaterial:false,normalExploitationConflict:false,unreasonablePrejudice:false};
 const tests=[
 ["N invalidation",eq(closure(["N"]),["D","M","N","P","Q","ST","V"])],
 ["P invalidation",eq(closure(["P"]),["D","P","Q"])],
 ["ENV invalidation",eq(closure(["ENV"]),["D","ENV","P","Q"])],
 ["VREF invalidation preserved",eq(closure(["VREF"]),["D","M","P","Q","ST","V","VREF"])],
 ["L invalidation preserved",eq(closure(["L"]),["D","L","M","P","Q","ST","V"])],
 ["independent B not deleted",!closure(["N"]).includes("B")&&!closure(["P"]).includes("M")],
 ["unknown node rejected",closure(["unknown"])===null],
 ["original positive composite",gate(base,q1,a1)===ok],
 ["unchanged audio N2 stale Q",n2.outputDigest===base.outputDigest&&gate(n2,q1,authority(n2))===no],
 ["unchanged audio P2 stale Q",p2.outputDigest===base.outputDigest&&gate(p2,oldReceiptWithNewArtifacts,authority(p2))===no],
 ["incorrect protected note fresh receipt",gate(wrongN,receipt(wrongN),authority(wrongN))===no],
 ["incorrect duration fresh receipt",(()=>{const c=cp(n2);c.melody.duration[0]=240;return gate(c,receipt(c),authority(c))===no})()],
 ["incorrect clock/rest fresh receipt",["clock","rest"].every(k=>{const c=cp(n2);c.melody[k]="changed";return gate(c,receipt(c),authority(c))===no})],
 ["missing editable plugin fresh receipt",gate(missingPlugin,receipt(missingPlugin),authority(missingPlugin))===no],
 ["editable/reopen/dependency unknown",["editable","reopen","dependencyVerified"].every(k=>gate(p2,{...receipt(p2),[k]:null},authority(p2))===no)],
 ["unresolved invalidation",gate(p2,{...receipt(p2),revalidated:false},authority(p2))===no],
 ["revalidated same melody N2 positive",gate(n2,receipt(n2),authority(n2))===ok],
 ["revalidated same audio P2 positive",gate(p2,receipt(p2),authority(p2))===ok],
 ["ENV changed stale Q",(()=>{const c={...cp(base),environment:"ENV2"};return gate(c,q1,authority(c))===no})()],
 ["four required artifact identities",docs.every(k=>{const c=cp(base);delete c.artifacts[k];return gate(c,receipt(c),authority(c))===no})],
 ["mismatched project artifact reference",(()=>{const c={...cp(p2),artifacts:{...base.artifacts}};return gate(c,receipt(c),authority(c))===no})()],
 ["all identity single-field mutations stale",keys.every(k=>{const c=cp(base);c[k]="changed";return !exact(c,q1.identity)})],
 ["all hard receipt flags enforced",["tech","music","review","melody","editable","reopen","dependencyVerified","revalidated"].every(k=>gate(base,{...q1,[k]:false},a1)===no)],
 ["rights or safety unknown",["allNecessaryRights","safety"].every(k=>gate(base,q1,{...a1,[k]:null})===stop)],
 ["stale authority evidence",gate(p2,receipt(p2),a1)===stop],
 ["release role independent",gate(base,q1,{...a1,releaseActor:"OP-E"})===stop],
 ["all three scoped requests match",auth(grants,requests)],
 ["project grantee actor delegation mismatch",["project","grantee","actor","delegation"].every(k=>!auth(grants,[{...requests[1],[k]:"other"}]))],
 ["missing/unknown subject evidence",["project","grantee","actor","delegation"].every(k=>{const q={...requests[1]};delete q[k];return !auth(grants,[q])})&&!auth(grants,[{...requests[1],actorIdentityVerified:null}])],
 ["delegation and grantor unknown",["delegationVerified","grantorVerified"].every(k=>!auth(grants.map(g=>g.id==="G-V"?{...g,[k]:null}:g),requests))],
 ["object action region audience epoch mismatch",["object","action","region","audience","epoch"].every(k=>!auth(grants,[{...requests[1],[k]:"other"}]))],
 ["before and expiry denied",!auth(grants,[{...requests[1],t:9}])&&!auth(grants,[{...requests[1],t:100}])],
 ["subset requests not whole candidate gate",gate(base,q1,authority(base,grants,requests.slice(0,2)))===stop],
 ["cross project scope stops composite",(()=>{const c={...cp(base),project:"J2"};return gate(c,receipt(c),authority(c))===stop})()],
 ["three permissions not all necessary rights",gate(base,q1,{...a1,allNecessaryRights:false})===stop],
 ["ordinary face-to-face candidate only",exceptionCandidate(teach)==="EXCEPTION_CANDIDATE_ONLY"],
 ["teaching material exclusion",exceptionCandidate({...teach,publishedTeachingMaterial:true})==="EXCLUDED"],
 ["teaching publication unknown",exceptionCandidate({...teach,publishedTeachingMaterial:null})==="PENDING_FACTS"],
 ["research sole purpose candidate",exceptionCandidate({...teach,purpose:"scientific_research",publishedTeachingMaterial:true})==="EXCEPTION_CANDIDATE_ONLY"],
 ["mixed purpose excluded",exceptionCandidate({...teach,purpose:"scientific_research",solely:false})==="EXCLUDED"],
 ["online not face-to-face",exceptionCandidate({...teach,purpose:"online_teaching"})==="OUT_OF_SCOPE"],
 ["normal exploitation and legitimate interests",exceptionCandidate({...teach,normalExploitationConflict:true})==="EXCLUDED"&&exceptionCandidate({...teach,unreasonablePrejudice:true})==="EXCLUDED"&&exceptionCandidate({...teach,unreasonablePrejudice:null})==="PENDING_FACTS"],
 ["work layer and other action separate",exceptionCandidate({...teach,layer:"work"})==="OUT_OF_SCOPE"&&exceptionCandidate({...teach,action:"publish"})==="OUT_OF_SCOPE"],
 ["source baseline retained",eq(base.melody,protectedMelody)&&base.projectArtifact==="P1@1"]
 ];
 return tests
}
console.log(runFiniteR6());
```

## 实际执行结果
1. N invalidation: true
2. P invalidation: true
3. ENV invalidation: true
4. VREF invalidation preserved: true
5. L invalidation preserved: true
6. independent B not deleted: true
7. unknown node rejected: true
8. original positive composite: true
9. unchanged audio N2 stale Q: true
10. unchanged audio P2 stale Q: true
11. incorrect protected note fresh receipt: true
12. incorrect duration fresh receipt: true
13. incorrect clock/rest fresh receipt: true
14. missing editable plugin fresh receipt: true
15. editable/reopen/dependency unknown: true
16. unresolved invalidation: true
17. revalidated same melody N2 positive: true
18. revalidated same audio P2 positive: true
19. ENV changed stale Q: true
20. four required artifact identities: true
21. mismatched project artifact reference: true
22. all identity single-field mutations stale: true
23. all hard receipt flags enforced: true
24. rights or safety unknown: true
25. stale authority evidence: true
26. release role independent: true
27. all three scoped requests match: true
28. project grantee actor delegation mismatch: true
29. missing/unknown subject evidence: true
30. delegation and grantor unknown: true
31. object action region audience epoch mismatch: true
32. before and expiry denied: true
33. subset requests not whole candidate gate: true
34. cross project scope stops composite: true
35. three permissions not all necessary rights: true
36. ordinary face-to-face candidate only: true
37. teaching material exclusion: true
38. teaching publication unknown: true
39. research sole purpose candidate: true
40. mixed purpose excluded: true
41. online not face-to-face: true
42. normal exploitation and legitimate interests: true
43. work layer and other action separate: true
44. source baseline retained: true
44/44 本轮实际检查通过，历史53记录保留，合计97记录（旧脚本未重跑）。不是实际权限、真实生产、听评或规范符合性。独立限定复审NOT_RUN。