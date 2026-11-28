// Input-only deterministic proposal; no rubric, no API, no approval authority.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {loadKG,composeTask,sha,KG_BASE,KG_TREE,SEALED,DIRECT} from './prepare-llm-bundle.mjs';
const [root,stage,out]=process.argv.slice(2);
assert.notEqual(process.getuid(),0);
assert.throws(()=>fs.readdirSync('/root/.audio-kg-evaluator'),e=>['EACCES','EPERM'].includes(e.code));
const ib=fs.readFileSync(path.join(stage,'inputs.json')),pb=fs.readFileSync(path.join(stage,'comparison-protocol.json'));
assert.equal(sha(ib),SEALED.inputs);assert.equal(sha(pb),SEALED.protocol);
const inputs=JSON.parse(ib),protocol=JSON.parse(pb),kg=loadKG(root);
assert.equal(inputs.tasks.length,26);assert.equal(protocol.schedule.length,104);
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ');
function grams(s){
 const a=new Set();for(const w of normalize(s).split(' ').filter(Boolean)){
  if(/^[a-z0-9]+$/.test(w))a.add(w);
  else for(let i=0;i<w.length-1;i++)a.add(w.slice(i,i+2));
 }return a;
}
const ref=r=>r.id+'@'+r.revision,groups=new Map(),byClaim=new Map(),req=new Map(),claims=new Map(),terms=new Map();
for(const r of kg.records.values()){
 if(r.type==='CaseGroup'){groups.set(ref(r),[]);if(!byClaim.has(r.claim))byClaim.set(r.claim,[]);byClaim.get(r.claim).push(ref(r));}
 if(r.type==='Claim'){claims.set(ref(r),r);terms.set(ref(r),grams(r.statement+' '+kg.records.get(r.context).condition+' '+r.limits));}
}
for(const r of kg.records.values())if(r.type==='CaseView')groups.get(r.group).push(r);
for(const e of kg.edges)if(e.type==='requires'){if(!req.has(e.from))req.set(e.from,[]);req.get(e.from).push(e.to);}
function closure(roots){const s=new Set();function add(x){if(s.has(x))return;s.add(x);for(const y of req.get(x)??[])add(y);}roots.forEach(add);return [...s];}
const answer=v=>['expectedResult','viewSpecificWitness','scenario'].map(k=>v.example?.[k]).find(s=>typeof s==='string'&&s.trim());
function choices(id){
 return (byClaim.get(id)??[]).map(g=>groups.get(g)).filter(a=>a.length===4&&a.every(v=>answer(v)&&['POSITIVE','NEGATIVE'].includes(v.polarity))).map(a=>a.map(v=>({ref:ref(v),question:v.question,answer:answer(v),explanation:v.explanation})));
}
const tasks=[],privateDiagnostics=[];
for(const [i,t] of inputs.tasks.entries()){
 assert.equal(t.id,'E01-'+String(i+1).padStart(2,'0'));assert.equal(t.primaryCQ,'CQ'+t.id.slice(-2));
 assert.deepEqual([...t.discovery.directOwnerFilters].sort(),DIRECT[i]);
 assert.ok(Array.isArray(t.discoveryQueryTerms)&&t.discoveryQueryTerms.every(x=>typeof x==='string'));
 const taskGrams=grams(t.task),discoveryGrams=grams(t.discoveryQueryTerms.join(' '));
 const relevance=(g)=>[...g].reduce((sum,x)=>sum+(taskGrams.has(x)?1:0)+(discoveryGrams.has(x)?3:0),0);
 const score=id=>relevance(terms.get(id));
 const candidates=DIRECT[i].map(owner=>{
  const options=kg.cov.cq.find(x=>x.id===t.primaryCQ).roots.filter(x=>claims.get(x).owner===owner&&choices(x).length);
  assert.ok(options.length);
  options.sort((a,b)=>score(b)-score(a)||closure([a]).length-closure([b]).length||a.localeCompare(b));
  return {owner,top:options.slice(0,8).map(id=>({id,score:score(id),closureCount:closure([id]).length}))};
 });
 const roots=candidates.map(x=>x.top[0].id);
 const selected=closure(roots).map(id=>{const r=claims.get(id);return {ref:id,statement:r.statement,condition:kg.records.get(r.context).condition,limits:r.limits};});
 const options=roots.flatMap(id=>choices(id).map(examples=>({id,examples,score:relevance(grams(examples.map(e=>e.question).join(' ')))})));
 options.sort((a,b)=>b.score-a.score||JSON.stringify(a.examples).length-JSON.stringify(b.examples).length||a.id.localeCompare(b.id));
 assert.ok(options.length);
 let winner=options[0],result=composeTask(kg,t.task,roots,selected,winner.examples,DIRECT[i]);
 for(const alt of options){
  const r=composeTask(kg,t.task,roots,selected,alt.examples,DIRECT[i]);
  if(r.feasible){winner=alt;result=r;break;}
 }
 const prefix='/tasks/'+i;
 tasks.push({idPointer:prefix+'/id',cqPointer:prefix+'/primaryCQ',textPointer:prefix+'/task',roots,claims:selected,examples:winner.examples});
 privateDiagnostics.push({id:t.id,cq:t.primaryCQ,candidateRanks:candidates,rootRefs:roots,requiredClosure:closure(roots),caseRefs:winner.examples.map(x=>x.ref),inputBounds:result.bounds,feasible:result.feasible,knowledgeOnlySemanticStatus:'NOT_APPROVED_MAY_CONTAIN_EMBEDDED_EXAMPLE',relevanceStatus:'LEXICAL_DRAFT_NOT_INDEPENDENTLY_APPROVED'});
}
const plan={format:'audio-kg-t07-selection/1',kgBase:KG_BASE,kgTree:KG_TREE,inputSha256:SEALED.inputs,protocolSha256:SEALED.protocol,tasks,schedule:protocol.schedule.map((_,i)=>({idPointer:'/schedule/'+i+'/id',armPointer:'/schedule/'+i+'/arm'}))};
const b=Buffer.from(JSON.stringify(plan,null,2)+'\n');
fs.writeFileSync(path.join(out,'draft-selection.json'),b,{flag:'wx',mode:0o600});
fs.writeFileSync(path.join(out,'draft-diagnostics.json'),JSON.stringify(privateDiagnostics,null,2)+'\n',{flag:'wx',mode:0o600});
console.log(JSON.stringify({status:'DRAFT_SELECTION_ONLY',tasks:26,feasible:privateDiagnostics.filter(x=>x.feasible).length,infeasible:privateDiagnostics.filter(x=>!x.feasible).length,draftPlanSha256:sha(b),actualRequests:0}));
