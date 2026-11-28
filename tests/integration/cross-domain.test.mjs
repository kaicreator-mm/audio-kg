import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {gitBlob,openCandidateReader} from '../../tools/validate-knowledge.mjs';
import {loadKG} from './prepare-llm-bundle.mjs';
const kg=loadKG(process.cwd()),results=[];
const t=(n,f)=>{f();results.push([n,true]);};
const get=(p,h)=>{const b=fs.readFileSync('docs/product/calibration/'+p);assert.equal(gitBlob(b),h);return b.toString();};
const fenced=(s,lang)=>[...s.matchAll(new RegExp('^```'+lang+'\\n([\\s\\S]*?)^```$','gm'))].map(x=>x[1]);
const r8=get('g04-r8-xc01-independent-evidence.md','9ce52519372828337ccd19f0af30e12189279719');
const r9=get('g04-r9-cq25-full-evidence-trace.md','3c3f92c3fad4b43dd6884c8c005b59dd90d6b985');
const route=get('g04-r8-seven-role-evidence.md','1326f94277d09281075f2423116f515334ea72bc');
const r8js=fenced(r8,'js')[0].replace('console.log(runXC03());','');
const [adapter,r9js]=fenced(r9,'js'),[support,expected]=fenced(r9,'json');
const out=JSON.parse(vm.runInNewContext(r8js+'\nconst route='+fenced(route,'json')[0]+';\nconst support='+support+';\n'+adapter+'\n'+r9js+'\nJSON.stringify({r8:original,r9:runR9CQ(xc,route,support)})',Object.create(null),{timeout:10000}));
t('exact frozen cross-domain R8 independent reference, permission, version and protection replay',()=>{
 assert.equal(out.r8.fixtures.length,70);
 assert.ok(out.r8.fixtures.every(x=>Array.isArray(x)&&x.length===3&&x[1]===x[2]));
});
t('exact frozen CQ25 complete reverse evidence trace and failure replay',()=>{
 assert.deepEqual(out.r9,JSON.parse(expected));assert.equal(out.r9.checks.length,44);assert.ok(out.r9.checks.every(x=>x[1]===true));
});
t('all cross-owner H are required closure, no optional promotion or logical converse',()=>{
 const by=new Map();for(const e of kg.edges)if(e.type==='requires'){if(!by.has(e.from))by.set(e.from,[]);by.get(e.from).push(e.to);}
 for(const e of kg.cov.crossOwnerRelations){
  const a=kg.records.get(e.from),b=kg.records.get(e.to);assert.notEqual(a.owner,b.owner);
  assert.equal(a.status,'CANDIDATE');assert.equal(b.status,'CANDIDATE');
  const closure=new Set();function visit(id){if(closure.has(id))return;closure.add(id);for(const c of by.get(id)??[])visit(c);}visit(e.from);
  if(e.type==='requires')assert.ok(closure.has(e.to));
 }
 const ids=[...new Set(kg.cov.crossOwnerRelations.map(e=>e.from))];
 for(const id of ids){
  const q=kg.reader.retrieve(id);assert.deepEqual(q.rootIds,[id]);
  const expected=new Set();function add(x){if(expected.has(x))return;expected.add(x);for(const y of by.get(x)??[])add(y);}add(id);
  assert.deepEqual(q.claims.map(x=>x.ref).sort(),[...expected].sort());
  for(const r of q.claims){assert.equal(r.applicability,'CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL');assert.ok(r.relations.every(e=>e.logicalConverse===false));assert.ok(r.incomingNavigation.every(e=>e.direction==='INCOMING_LOOKUP_ONLY'&&e.logicalConverse===false));}
 }
});
t('unknown source rights and historical non-admission preserved in integrated reader',()=>{
 assert.equal(kg.reader.summary().acceptedClaims,0);
 for(const r of kg.records.values())if(r.type==='Source')assert.equal(r.rights,'UNKNOWN_NO_IMPORT');
 assert.equal(kg.cov.historical.length,36);assert.equal(kg.cov.splits.length,28);assert.ok(kg.cov.splits.every(x=>x.equivalence===false&&x.status==='SPLIT_OPEN_NAVIGATION_ONLY'));
 for(const x of kg.cov.splits){const q=kg.reader.retrieve(x.oldD4);assert.equal(q.rootIds.length,0);}
 assert.equal(kg.cov.unresolvedInventory.length,60);
});
t('literal K07 documentation followup query executes and counts reconcile',()=>{
 const r=fs.readFileSync('knowledge/K07/README.md','utf8'),command=r.match(/`node tools\/validate-knowledge\.mjs ([^`]+)`/)[1].split(' ');
 const result=JSON.parse(execFileSync('node',['tools/validate-knowledge.mjs',...command],{encoding:'utf8',maxBuffer:16*1024*1024}));
 assert.equal(result.acceptedClaims,0);assert.ok(result.rootIds.length);
 const p=JSON.parse(fs.readFileSync('knowledge/K07/candidate.json')),w=JSON.parse(fs.readFileSync('knowledge/K07/domain-workflows.json'));
 assert.equal(p.records.length,441);assert.equal(p.edges.length,163);assert.equal(p.bindings.length,244);assert.equal(p.edges.filter(e=>e.type==='requires').length,10);
 assert.equal(p.edges.filter(e=>e.type==='references').length,51);
 assert.equal(w.records.length,68);assert.equal(w.relations.length,74);
});
console.log(JSON.stringify({status:'BUILDER_CROSS_DOMAIN_ONLY',passed:results.length,results,r8:70,r9:44}));
