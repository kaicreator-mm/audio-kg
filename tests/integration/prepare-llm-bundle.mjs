import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {gitBlob,openCandidateReader} from '../../tools/validate-knowledge.mjs';
export const KG_BASE='7d4068980b750af2beaa97665219e2d950b3cc9e';
export const KG_TREE='cda3bac9c7b3ee9070dc7cfa610e7ce8f6b58338';
export const SEALED=Object.freeze({inputs:'b68cc7d7a63ddb156a7d55934ea912bc93e57d401adacb80e5c8f4aa2b70903f',protocol:'c39abe24d5cbae8f638e993205f1f4f19f5c5a26de173add6ae92bef0212533e'});
export const SYSTEM='你是音乐与音频领域的答题者。根据题设给出简明中文答案、适用条件、必要计算或核验步骤；区分事实、题设、候选解释、未知和拒绝边界。若附有候选知识，仅按条件使用；拒绝例不是事实，来源定位不等于权利或真实观察。无足够证据时明确未知，不虚构来源、权限、实际执行或唯一解释。无需声称执行任何工具。';
export const TOKENIZER_ID=Object.freeze({model:'DeepSeek-V4.1-Flash-1017',tokenizerSha256:'89085f12ef79460ac5f66d1119325ddfc694b4ab209d80bbd81d35f081dc9614',configSha256:'841f8cf146e3f0ad1082594a31f68ecf7608c20467ef355081333d85bbaeb1cb',library:'tokenizers==0.22.2',framingReserve:512,method:'PINNED_OFFICIAL_V4_TWO_MESSAGE_TEMPLATE_PLUS_RESERVE'});
export function officialCounter(python,dir){
 const script=fileURLToPath(new URL('./offline-tokenizer.py',import.meta.url));
 return bodies=>{
  const n=JSON.parse(execFileSync(python,[script,dir],{input:JSON.stringify(bodies),encoding:'utf8',maxBuffer:1024*1024}));
  assert.equal(n.length,bodies.length);assert.ok(n.every(x=>Number.isSafeInteger(x)&&x>0));return n;
 };
}
export const PARAMS=Object.freeze({model:'deepseek-flash',thinking:{type:'disabled'},temperature:0.2,max_tokens:1024,stream:false,n:1,tool_choice:'none',response_format:{type:'text'}});
export const DIRECT=['K01 K07','K01 K02 K03','K03 K04','K02 K13 K05','K05 K07','K05 K06 K10','K07 K08 K05','K08 K09 K10','K11','K08 K09 K11','K10 K11 K17','K13','K16 K17 K18','K12','K06 K14','K18 K09','K01 K16 K17','K16 K13','K02 K09 K12 K15','K08 K12','K09 K12 K15','K10 K17 K19','K01 K08 K09 K12','K19 K07 K12','K16 K17 K18 K19','K13 K14 K16 K17 K06'].map(s=>s.split(' ').sort());
export const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
const keys=(x,expected)=>{assert.ok(obj(x));assert.deepEqual(Object.keys(x).sort(),[...expected].sort());};
const text=x=>typeof x==='string'&&x.trim().length>0;
const uniq=a=>{assert.equal(new Set(a).size,a.length);return a;};
export function pointer(doc,p){
 assert.ok(typeof p==='string'&&p.startsWith('/')&&p.length<1024);
 let v=doc;
 for(const k of p.slice(1).split('/').map(x=>x.replace(/~1/g,'/').replace(/~0/g,'~'))){
  assert.ok(v!==null&&typeof v==='object'&&Object.hasOwn(v,k),'sealed pointer');
  v=v[k];
 }
 return v;
}
function excerpt(raw,chosen){
 assert.ok(text(raw)&&text(chosen)&&raw.includes(chosen),'not an exact candidate text excerpt');
 return chosen;
}
// For knowledge-only B, a candidate may embed numerical examples in its statement.
// A proposed original principle summary can be tied to exact candidate basis text,
// but semantic fidelity, removal of examples and no leakage require evaluator approval.
function knowledgePiece(raw,chosen){
 if(typeof chosen==='string')return excerpt(raw,chosen);
 keys(chosen,['mode','basis','summary']);
 assert.equal(chosen.mode,'PROPOSED_ORIGINAL_SUMMARY_REQUIRES_EVALUATOR');
 excerpt(raw,chosen.basis);assert.ok(text(chosen.summary));
 return chosen.summary;
}
function answerField(v){
 for(const k of ['expectedResult','viewSpecificWitness','scenario']){
  if(text(v.example?.[k]))return v.example[k];
 }
 throw Error('missing view answer witness');
}
export function loadKG(root){
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 const index=read('queries/integration/controller-input.json'),cov=read('queries/integration/coverage.json');
 assert.equal(cov.base,KG_BASE);assert.equal(cov.tree,KG_TREE);
 assert.equal(index.entries.length,19);assert.equal(index.allowFixture,false);assert.equal(index.priorRegistry,null);
 const reader=openCandidateReader(root,index.entries,{allowFixture:false,priorRegistry:null});
 assert.equal(reader.summary().acceptedClaims,0);
 const records=new Map(),edges=[],bindings=[];
 for(const e of index.entries){
  const manifestBytes=fs.readFileSync(path.join(root,e.manifest));assert.equal(gitBlob(manifestBytes),e.manifestBlob);
  const m=JSON.parse(manifestBytes),b=fs.readFileSync(path.join(root,e.pack));
  assert.equal(gitBlob(b),m.packBlob);
  const pack=JSON.parse(b),expected=cov.modules.find(x=>x.owner===pack.owner);
  assert.equal(expected.packBlob,m.packBlob);assert.equal(expected.manifestBlob,e.manifestBlob);
  for(const r of pack.records){const id=r.id+'@'+r.revision;assert.ok(!records.has(id));records.set(id,r);}
  edges.push(...pack.edges);bindings.push(...pack.bindings);
 }
 return {reader,records,edges,bindings,cov};
}
export function composeTask(kg,task,roots,claimSelection,caseSelection,requiredOwners,counter=null){
 assert.ok(text(task)&&text(roots?.[0]));
 uniq(roots);assert.ok(roots.every(x=>typeof x==='string'));
 const selected=new Set(),walk=id=>{
  if(selected.has(id))return;
  const r=kg.records.get(id);assert.equal(r?.type,'Claim');assert.equal(r.status,'CANDIDATE');selected.add(id);
  for(const e of kg.edges)if(e.from===id&&e.type==='requires')walk(e.to);
 };
 for(const r of roots)walk(r);
 assert.deepEqual([...new Set(roots.map(x=>kg.records.get(x).owner))].sort(),[...requiredOwners].sort(),'direct owner selection');
 assert.ok(Array.isArray(claimSelection));
 assert.deepEqual(uniq(claimSelection.map(x=>x.ref)).sort(),[...selected].sort(),'required closure exact');
 const claims=claimSelection.map(s=>{
  keys(s,['ref','statement','condition','limits']);
  const r=kg.records.get(s.ref),ctx=kg.records.get(r.context);assert.equal(ctx.type,'Context');
  const src=new Map();
  for(const e of kg.edges.filter(e=>e.from===s.ref&&e.type==='supported_by')){
   const ev=kg.records.get(e.to);assert.equal(ev.type,'Evidence');
   for(const id of ev.sources){const a=kg.records.get(id);assert.equal(a.type,'Source');assert.equal(a.rights,'UNKNOWN_NO_IMPORT');src.set(id,{ref:id,grade:a.grade,version:a.version,rights:a.rights,locator:a.anchor.file+":"+a.anchor.line});}
  }
  assert.ok(src.size);
  return {ref:s.ref,d4:r.d4,role:roots.includes(s.ref)?'DIRECT':'REQUIRED_SUPPORT',statement:knowledgePiece(r.statement,s.statement),condition:knowledgePiece(ctx.condition,s.condition),limits:knowledgePiece(r.limits,s.limits),sources:[...src.values()],requires:kg.edges.filter(e=>e.from===s.ref&&e.type==='requires').map(e=>e.to).sort()};
 });
 assert.ok(Array.isArray(caseSelection)&&caseSelection.length>=4);
 uniq(caseSelection.map(s=>s.ref));
 const groups=new Map(),examples=caseSelection.map(s=>{
  keys(s,['ref','question','answer','explanation']);
  const v=kg.records.get(s.ref);assert.equal(v?.type,'CaseView');assert.equal(v.evidenceKind,'SYNTHETIC_EXPECTED_NOT_OBSERVED');
  const g=kg.records.get(v.group);assert.equal(g.type,'CaseGroup');assert.ok(roots.includes(g.claim),'examples must belong to selected direct roots');
  const primary=kg.bindings.filter(b=>b.view===s.ref&&b.role==='PRIMARY_TARGET');
  assert.equal(primary.length,1);assert.equal(primary[0].claim,g.claim);
  assert.ok(['FORWARD','REVERSE'].includes(v.direction)&&['POSITIVE','NEGATIVE'].includes(v.polarity));
  if(!groups.has(v.group))groups.set(v.group,[]);
  groups.get(v.group).push(v.direction+'/'+v.polarity);
  return {ref:s.ref,claim:g.claim,direction:v.direction,role:v.polarity==='NEGATIVE'?'REJECTED_OR_UNSUPPORTED_NOT_FACT':'SCOPED_POSITIVE_SYNTHETIC',question:excerpt(v.question,s.question),answer:excerpt(answerField(v),s.answer),explanation:excerpt(v.explanation,s.explanation)};
 });
 for(const v of groups.values())assert.deepEqual(v.sort(),['FORWARD/NEGATIVE','FORWARD/POSITIVE','REVERSE/NEGATIVE','REVERSE/POSITIVE']);
 const pos=examples.filter(v=>v.role==='SCOPED_POSITIVE_SYNTHETIC'),neg=examples.filter(v=>v.role==='REJECTED_OR_UNSUPPORTED_NOT_FACT');
 const common='题设：\n'+task;
 const b=common+'\n\n候选知识（限定条件；非实际观察或授权）：\n'+JSON.stringify(claims);
 const c=b+'\n\n正向及反向正确应用示例（合成）：\n'+JSON.stringify(pos);
 const d=c+'\n\n正向及反向拒绝示例（错误输入或越界，不是事实）：\n'+JSON.stringify(neg);
 const bodies=[common,b,c,d].map(content=>({...PARAMS,messages:[{role:'system',content:SYSTEM},{role:'user',content}]}));
 // Conservative byte ceiling plus framing reserve; actual billed prompt tokens checked on every response.
 const byteBounds=bodies.map(x=>x.messages.reduce((a,m)=>a+Buffer.byteLength(m.content,'utf8'),512));
 const offlineTokens=counter?counter(bodies):null;
 const bounds=offlineTokens?offlineTokens.map(n=>n+512):byteBounds;
 const feasible=bounds.every(n=>n<=8192);
 return {claims:claims.map(x=>x.ref),examples:examples.map(x=>x.ref),bounds,byteBounds,offlineTokens,feasible,bodies:feasible?bodies:null};
}
export function assemble(kg,inputBytes,protocolBytes,plan,sealed=SEALED,counter=null){
 assert.equal(sha(inputBytes),sealed.inputs);assert.equal(sha(protocolBytes),sealed.protocol);
 const inputs=JSON.parse(inputBytes),protocol=JSON.parse(protocolBytes);
 keys(plan,['format','kgBase','kgTree','inputSha256','protocolSha256','tasks','schedule']);
 assert.equal(plan.format,'audio-kg-t07-selection/1');assert.equal(plan.kgBase,KG_BASE);assert.equal(plan.kgTree,KG_TREE);
 assert.equal(plan.inputSha256,sealed.inputs);assert.equal(plan.protocolSha256,sealed.protocol);
 assert.equal(plan.tasks.length,26);assert.equal(plan.schedule.length,104);
 assert.equal(inputs.tasks.length,26);assert.equal(protocol.schedule.length,104);
 assert.deepEqual(Object.fromEntries(Object.entries(protocol.budget).filter(([k])=>k!=='gate')),{maxRequests:104,maxInputPerRequest:8192,maxOutputPerRequest:1024,maxTotalInput:851968,maxTotalOutput:106496,maxTotalTokens:958464,maxUSD:10});
 const byTask=new Map(),metadata=[];
 for(const [i,t] of plan.tasks.entries()){
  keys(t,['idPointer','cqPointer','textPointer','roots','claims','examples']);
  assert.equal(t.idPointer,'/tasks/'+i+'/id');assert.equal(t.cqPointer,'/tasks/'+i+'/primaryCQ');assert.equal(t.textPointer,'/tasks/'+i+'/task');
  const id=pointer(inputs,t.idPointer),cq=pointer(inputs,t.cqPointer),task=pointer(inputs,t.textPointer);
  assert.equal(inputs.tasks[i].discovery.query,cq);
  assert.deepEqual([...inputs.tasks[i].discovery.directOwnerFilters].sort(),DIRECT[Number(id.slice(-2))-1]);
  assert.match(id,/^E01-(0[1-9]|1[0-9]|2[0-6])$/);assert.equal(cq,'CQ'+id.slice(-2));assert.ok(!byTask.has(id));
  const q=kg.reader.retrieve(cq);assert.ok(t.roots.every(x=>q.rootIds.includes(x)),'root outside sealed CQ');
  const result=composeTask(kg,task,t.roots,t.claims,t.examples,DIRECT[Number(id.slice(-2))-1],counter);
  byTask.set(id,result);metadata.push({id,cq,roots:t.roots,claimRefs:result.claims,exampleRefs:result.examples,inputBounds:result.bounds,byteBounds:result.byteBounds,offlineTokens:result.offlineTokens,feasible:result.feasible});
 }
 const used=new Set(),pointers=new Set(),slots=[];
 for(const [i,s] of plan.schedule.entries()){
  keys(s,['idPointer','armPointer']);
  assert.equal(s.idPointer,'/schedule/'+i+'/id');assert.equal(s.armPointer,'/schedule/'+i+'/arm');assert.equal(protocol.schedule[i].slot,i+1);
  const id=pointer(protocol,s.idPointer),arm=pointer(protocol,s.armPointer);
  assert.ok(byTask.has(id)&&['A','B','C','D'].includes(arm));const k=id+'/'+arm;
  assert.ok(!used.has(k)&&!pointers.has(s.idPointer+'|'+s.armPointer));used.add(k);pointers.add(s.idPointer+'|'+s.armPointer);
  const r=byTask.get(id),j='ABCD'.indexOf(arm);
  slots.push({slot:i+1,id,arm,status:r.feasible?'READY':'CONTEXT_INFEASIBLE',inputBound:r.bounds[j],byteBound:r.byteBounds[j],offlinePromptTokens:r.offlineTokens?.[j]??null,body:r.feasible?r.bodies[j]:null});
 }
 assert.equal(used.size,104);
 return {format:'audio-kg-t07-request-bundle/1',approvalState:'DRAFT_REQUIRES_INDEPENDENT_EVALUATOR_APPROVAL',tokenizer:counter?TOKENIZER_ID:null,kgBase:KG_BASE,kgTree:KG_TREE,inputsSha256:sealed.inputs,protocolSha256:sealed.protocol,selectionSha256:sha(Buffer.from(JSON.stringify(plan))),metadata,slots};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{
  const [root,stage,out,tokenizerDir,python]=process.argv.slice(2);assert.ok(root&&stage&&out&&tokenizerDir&&python&&process.argv.length===7);
  assert.notEqual(process.getuid?.(),0,'assembler must be non-root');
  // Explicit denial of evaluator storage; never read rubric content.
  const oracle='/root/.audio-kg-evaluator';
  assert.throws(()=>fs.readdirSync(oracle),e=>['EACCES','EPERM'].includes(e.code));
  assert.deepEqual(fs.readdirSync(stage).sort(),['comparison-protocol.json','inputs.json','selection.json']);
  const read=n=>fs.readFileSync(path.join(stage,n),{flag:fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW});
  const result=assemble(loadKG(root),read('inputs.json'),read('comparison-protocol.json'),JSON.parse(read('selection.json')),SEALED,officialCounter(python,tokenizerDir));
  const bytes=Buffer.from(JSON.stringify(result,null,2)+'\n');fs.writeFileSync(out,bytes,{flag:'wx',mode:0o600});
  console.log(JSON.stringify({status:'PREPARED_NOT_EXECUTED',tasks:26,slots:104,feasible:result.metadata.filter(x=>x.feasible).length,bundleSha256:sha(bytes),maxInputBound:Math.max(...result.slots.filter(x=>x.status==='READY').map(x=>x.inputBound),0)}));
 }catch(e){console.error('PREPARATION_REJECTED',e.name);process.exitCode=1;}
}
