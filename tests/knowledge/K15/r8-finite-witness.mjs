// Extracted from frozen historical R8 finite witness; synthetic only.
export function runFiniteR8(){
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
 // Fixed LOC-A01 fixture: protected baseline and dependency list refer to these
 // three objects only. A new object requires a new qualified fixture.
 function fixedObjects(c){return c.source===base.source&&c.reference===base.reference&&c.backing===base.backing}
 function requiredRequests(c){return [[c.source,"translate"],[c.reference,"local_inference"],[c.backing,"local_mix"]]}
 function gate(c,q,a){
   if(!validCandidate(c))return "NOT_READY";
   if(!fixedObjects(c))return "STOP_OR_PENDING";
   const required=requiredRequests(c);
   if(!a||!exact(c,a.identity)||a.allNecessaryRights!==true||a.safety!==true||a.releaseActor!=="OP-D"||a.releaseRoleVerified!==true||
      !Array.isArray(a.requests)||a.requests.length!==3||!required.every(([object,action])=>a.requests.some(x=>!!x&&x.object===object&&x.action===action))||
      !a.requests.every(x=>!!x&&x.project===c.project&&x.grantee===c.grantee&&x.actor===c.actor&&x.delegation===c.delegation&&x.epoch===c.grantEpoch&&x.t===50&&x.region==="MM"&&x.audience==="internal")||!Array.isArray(a.grants)||!auth(a.grants,a.requests))return "STOP_OR_PENDING";
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
 ["source baseline retained",eq(base.melody,protectedMelody)&&base.projectArtifact==="P1@1"],
 ["R7 changed work W2 fresh Q and authority old grants",(()=>{const c={...cp(base),source:"W2"};return gate(c,receipt(c),authority(c))===stop})()],
 ["R7 changed reference VREF2 fresh Q and authority old grants",(()=>{const c={...cp(base),reference:"VREF2"};return gate(c,receipt(c),authority(c))===stop})()],
 ["R7 changed backing B2 fresh Q and authority old grants",(()=>{const c={...cp(base),backing:"B2"};return gate(c,receipt(c),authority(c))===stop})()],
 ["changed objects with old Q also stop at rights gate",[["source","W2"],["reference","VREF2"],["backing","B2"]].every(([k,v])=>{const c={...cp(base),[k]:v};return gate(c,q1,authority(c))===stop})],
 ["new objects plus matching new requests/grants still outside fixed fixture",[["source","W2",0],["reference","VREF2",1],["backing","B2",2]].every(([k,v,i])=>{const c={...cp(base),[k]:v},gs=cp(grants),qs=cp(requests);gs[i].object=v;qs[i].object=v;return auth(gs,qs)&&gate(c,receipt(c),authority(c,gs,qs))===stop})],
 ["current candidate requests derived not envelope labels",eq(requiredRequests(base),[["W1","translate"],["VREF1","local_inference"],["B1","local_mix"]])&&[["source","W2",0],["reference","VREF2",1],["backing","B2",2]].every(([k,v,i])=>requiredRequests({...base,[k]:v})[i][0]===v)],
 ["same objects swapped action rejects",(()=>{const qs=cp(requests);qs[0].action="local_inference";qs[1].action="translate";return gate(base,q1,authority(base,grants,qs))===stop})()],
 ["same objects duplicated request rejects",gate(base,q1,authority(base,grants,[requests[0],requests[0],requests[2]]))===stop],
 ["null request rejects without throw",gate(base,q1,authority(base,grants,[requests[0],null,requests[2]]))===stop],
 ["same objects fresh receipt still require matching grant",[0,1,2].every(i=>gate(base,receipt(base),authority(base,grants.filter((_,j)=>j!==i),requests))===stop)]
 ];
 return tests
}
