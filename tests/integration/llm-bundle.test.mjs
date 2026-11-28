import fs from 'node:fs';
import assert from 'node:assert/strict';
import {loadKG,assemble,composeTask,sha,pointer,KG_BASE,KG_TREE,DIRECT} from './prepare-llm-bundle.mjs';
const kg=loadKG(process.cwd()),results=[];
const t=(n,f)=>{f();results.push([n,true]);};
const ref=r=>r.id+'@'+r.revision;
const answer=v=>['expectedResult','viewSpecificWitness','scenario'].map(k=>v.example?.[k]).find(s=>typeof s==='string'&&s.trim());
const groups=new Map(),claimGroups=new Map(),required=new Map();
for(const r of kg.records.values()){
 if(r.type==='CaseGroup'){groups.set(ref(r),[]);if(!claimGroups.has(r.claim))claimGroups.set(r.claim,[]);claimGroups.get(r.claim).push(ref(r));}
}
for(const r of kg.records.values())if(r.type==='CaseView')groups.get(r.group).push(r);
for(const e of kg.edges)if(e.type==='requires'){if(!required.has(e.from))required.set(e.from,[]);required.get(e.from).push(e.to);}
function closure(roots){const s=new Set();function add(id){if(s.has(id))return;s.add(id);for(const x of required.get(id)??[])add(x);}roots.forEach(add);return [...s];}
const claimsFor=roots=>closure(roots).map(id=>{const r=kg.records.get(id);return {ref:id,statement:r.statement,condition:kg.records.get(r.context).condition,limits:r.limits};});
const examplesFor=root=>{
 const valid=(claimGroups.get(root)??[]).map(g=>groups.get(g)).filter(v=>v.length===4&&v.every(x=>answer(x)&&['POSITIVE','NEGATIVE'].includes(x.polarity)));
 assert.ok(valid.length,root);
 return valid[0].map(v=>({ref:ref(v),question:v.question,answer:answer(v),explanation:v.explanation}));
};
const inputs={tasks:[]},protocol={schedule:[],budget:{maxRequests:104,maxInputPerRequest:8192,maxOutputPerRequest:1024,maxTotalInput:851968,maxTotalOutput:106496,maxTotalTokens:958464,maxUSD:10}},tasks=[],schedule=[];
for(let i=1;i<=26;i++){
 const id='E01-'+String(i).padStart(2,'0'),cq='CQ'+id.slice(-2);
 // Non-oracle synthetic smoke text, explicitly not a held-out evaluation.
 const task='公开测试夹具 '+id+'：只验证上下文组装与边界，不评价音乐专业效果。';
 inputs.tasks.push({id,primaryCQ:cq,task,discovery:{query:cq,directOwnerFilters:DIRECT[i-1]}});
 const roots=DIRECT[i-1].map(owner=>{
  const opts=kg.cov.cq.find(x=>x.id===cq).roots.filter(x=>kg.records.get(x).owner===owner);
  opts.sort((a,b)=>closure([a]).length-closure([b]).length||kg.records.get(a).statement.length-kg.records.get(b).statement.length||a.localeCompare(b));
  assert.ok(opts.length,owner+' '+cq);return opts[0];
 });
 const claims=claimsFor(roots);
 const candidates=roots.map(examplesFor).sort((a,b)=>JSON.stringify(a).length-JSON.stringify(b).length);
 const examples=candidates[0],prefix='/tasks/'+(i-1);
 tasks.push({idPointer:prefix+'/id',cqPointer:prefix+'/primaryCQ',textPointer:prefix+'/task',roots,claims,examples});
 for(const arm of 'ABCD'){
  const j=protocol.schedule.length;protocol.schedule.push({slot:j+1,id,arm});schedule.push({idPointer:'/schedule/'+j+'/id',armPointer:'/schedule/'+j+'/arm'});
 }
}
const ib=Buffer.from(JSON.stringify(inputs)),pb=Buffer.from(JSON.stringify(protocol)),sealed={inputs:sha(ib),protocol:sha(pb)};
const plan={format:'audio-kg-t07-selection/1',kgBase:KG_BASE,kgTree:KG_TREE,inputSha256:sealed.inputs,protocolSha256:sealed.protocol,tasks,schedule};
const bundle=assemble(kg,ib,pb,plan,sealed);
t('104 exact paired slots across 26 CQ with real integrated root/required closure',()=>{
 assert.equal(bundle.slots.length,104);assert.equal(bundle.metadata.length,26);
 assert.equal(new Set(bundle.metadata.flatMap(m=>m.roots.map(id=>kg.records.get(id).owner))).size,19);
 assert.ok(bundle.metadata.some(x=>x.feasible));
 for(const m of bundle.metadata){
  assert.deepEqual([...m.claimRefs].sort(),closure(m.roots).sort());
  const rows=bundle.slots.filter(s=>s.id===m.id);
  assert.equal(new Set(rows.map(s=>s.status)).size,1);
  if(m.feasible){
   const [a,b,c,d]=rows.map(s=>s.body.messages[1].content);
   assert.ok(b.startsWith(a+'\n\n'));assert.ok(c.startsWith(b+'\n\n'));assert.ok(d.startsWith(c+'\n\n'));
   assert.ok(!a.includes('候选知识'));assert.ok(!b.includes('SCOPED_POSITIVE_SYNTHETIC'));assert.ok(!c.includes('REJECTED_OR_UNSUPPORTED_NOT_FACT'));assert.ok(d.includes('REJECTED_OR_UNSUPPORTED_NOT_FACT'));
   assert.ok(rows.every(s=>s.inputBound<=8192));
  }else assert.ok(rows.every(s=>s.body===null));
 }
});
const mutate=(f)=>{const p=structuredClone(plan);f(p);assert.throws(()=>assemble(kg,ib,pb,p,sealed));};
t('sealed input and comparison bytes reject replacement',()=>{
 assert.throws(()=>assemble(kg,Buffer.concat([ib,Buffer.from(' ')]),pb,plan,sealed));
 assert.throws(()=>assemble(kg,ib,Buffer.concat([pb,Buffer.from(' ')]),plan,sealed));
});
t('exact pointers refuse missing or prototype traversal',()=>{assert.throws(()=>pointer(inputs,'/tasks/0/missing'));assert.throws(()=>pointer(inputs,'/__proto__/tasks'));});
t('missing direct owner and out-of-CQ claim rejected',()=>{
 mutate(p=>p.tasks[0].roots.pop());
 mutate(p=>p.tasks[0].roots[0]=kg.cov.cq[25].roots.find(x=>!kg.cov.cq[0].roots.includes(x)));
});
t('missing H closure and optional invention refused',()=>{
 const task=tasks.find(x=>x.claims.length>x.roots.length);assert.ok(task);
 mutate(p=>{const q=p.tasks.find(x=>x.idPointer===task.idPointer);q.claims=q.claims.filter(x=>q.roots.includes(x.ref));});
 mutate(p=>p.tasks[0].claims.push(p.tasks[0].claims[0]));
});
t('summary and example cannot inject fabricated held-out answers',()=>{
 mutate(p=>p.tasks[0].claims[0].statement='不存在于候选文本的答案');
 mutate(p=>p.tasks[0].examples[0].answer='不存在于公开案例的答案');
 mutate(p=>p.tasks[0].examples.pop());
 mutate(p=>p.tasks[0].examples[0].ref=p.tasks[0].examples[1].ref);
});
t('duplicate or missing schedule slot rejected',()=>{
 mutate(p=>p.schedule[0]=p.schedule[1]);
 mutate(p=>p.schedule.pop());
});
t('all arms become infeasible together under common cap',()=>{
 const x=tasks[0];const r=composeTask(kg,'测'.repeat(8192),x.roots,x.claims,x.examples,DIRECT[0]);
 assert.equal(r.feasible,false);assert.equal(r.bodies,null);assert.ok(r.bounds.every(x=>x>8192));
});
t('no rubric-shaped extra input fields accepted',()=>mutate(p=>p.rubric='forbidden'));
t('exact schedule and source pointer order cannot be swapped',()=>{
 mutate(p=>[p.schedule[0],p.schedule[1]]=[p.schedule[1],p.schedule[0]]);
 mutate(p=>[p.tasks[0],p.tasks[1]]=[p.tasks[1],p.tasks[0]]);
});
t('proposed principle paraphrase must bind exact source basis and remain draft',()=>{
 const p=structuredClone(plan),s=p.tasks[0].claims[0];
 s.statement={mode:'PROPOSED_ORIGINAL_SUMMARY_REQUIRES_EVALUATOR',basis:s.statement,summary:'仅为公开夹具模拟摘要，语义未审批。'};
 assert.equal(assemble(kg,ib,pb,p,sealed).approvalState,'DRAFT_REQUIRES_INDEPENDENT_EVALUATOR_APPROVAL');
 s.statement.basis='not in original candidate';assert.throws(()=>assemble(kg,ib,pb,p,sealed));
});

if(process.env.MOCK_BUNDLE_OUTPUT){
 // Test artifact only; pinned production hashes differ; never submit to API.
 fs.writeFileSync(process.env.MOCK_BUNDLE_OUTPUT,JSON.stringify(bundle),{flag:'wx',mode:0o600});
}
console.log(JSON.stringify({status:'MOCK_ONLY_NO_MODEL',passed:results.length,results,feasibleSmokeTasks:bundle.metadata.filter(x=>x.feasible).length}));
