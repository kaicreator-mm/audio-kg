import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {gitBlob,openCandidateReader} from '../../tools/validate-knowledge.mjs';
const base='7d4068980b750af2beaa97665219e2d950b3cc9e',tree='cda3bac9c7b3ee9070dc7cfa610e7ce8f6b58338';
const owners=Array.from({length:19},(_,i)=>'K'+String(i+1).padStart(2,'0'));
const cache=new Map();
const pinned=p=>{if(!cache.has(p)){const b=fs.readFileSync(p),sha=execFileSync('git',['rev-parse',base+':'+p],{encoding:'utf8'}).trim();assert.equal(gitBlob(b),sha,p);cache.set(p,{b,sha});}return cache.get(p);};
assert.equal(execFileSync('git',['rev-parse',base+'^{tree}'],{encoding:'utf8'}).trim(),tree);
const inventoryPath='docs/product/branch-case-inventory.md';
const branches=new Map([...pinned(inventoryPath).b.toString().matchAll(/^\| (K\d\d\.\d\d) \| ([^|]+) \|/gm)].map(x=>[x[1],x[2].includes('TRANSITION_LOOKUP')?'HISTORICAL':'ACTIVE']));
assert.equal(branches.size,164);
assert.equal([...branches.values()].filter(x=>x==='ACTIVE').length,159);
const entries=[],records=new Map(),edges=[],bindings=[],inventory=[],modules=[],capabilities=[],roleRows=[];
const ref=r=>r.id+'@'+r.revision;
for(const owner of owners){
 const p='knowledge/'+owner+'/candidate.json',q='knowledge/'+owner+'/qualification.json',c='queries/'+owner+'/capability-index.json';
 const pack=JSON.parse(pinned(p).b),manifest=JSON.parse(pinned(q).b),roles=JSON.parse(pinned(c).b).roles;
 assert.equal(pack.owner,owner);assert.equal(manifest.owner,owner);assert.equal(manifest.packBlob,pinned(p).sha);
 entries.push({pack:p,manifest:q,manifestBlob:pinned(q).sha});
 modules.push({owner,packBlob:pinned(p).sha,manifestBlob:pinned(q).sha,capabilityBlob:pinned(c).sha,counts:Object.fromEntries([...new Set(pack.records.map(r=>r.type))].sort().map(t=>[t,pack.records.filter(r=>r.type===t).length])),inventory:pack.inventory.length});
 for(const r of pack.records){assert.ok(!records.has(ref(r)),ref(r));records.set(ref(r),r);}
 edges.push(...pack.edges);bindings.push(...pack.bindings);inventory.push(...pack.inventory.map(r=>({...r,owner})));
 for(const role of roles)roleRows.push({owner,role});
}
const reader=openCandidateReader(process.cwd(),entries,{allowFixture:false,priorRegistry:null});
const summary=reader.summary();assert.equal(summary.acceptedClaims,0);
const claims=[...records.values()].filter(r=>r.type==='Claim');
const sources=[...records.values()].filter(r=>r.type==='Source');
const views=[...records.values()].filter(r=>r.type==='CaseView');
assert.ok(claims.every(r=>r.status==='CANDIDATE'));assert.ok(sources.every(r=>r.rights==='UNKNOWN_NO_IMPORT'));
assert.equal(new Set(claims.map(r=>r.d4)).size,claims.length);
const cells=new Set();
for(const {owner,role:r} of roleRows){
 const id=r.id??r.d2+'/'+r.ability,[d2,ability]=id.split('/');
 assert.ok(d2.startsWith(owner+'.')&&branches.has(d2)&&/^A0[1-7]$/.test(ability)&&['P','S','C'].includes(r.role),id);
 assert.ok(!cells.has(id),id);cells.add(id);
 const status=branches.get(d2),refs=r.claimRefs??[];
 for(const k of refs)assert.equal(records.get(k)?.type,'Claim',id+' '+k);
 assert.ok(r.task&&r.limits&&r.anchor?.row,id);
 const a=r.anchor,raw=pinned(a.file);
 assert.equal(raw.sha,a.blob);assert.equal(raw.b.toString().split('\n')[a.line-1],a.row);
 if(status==='HISTORICAL')assert.equal(refs.length,0);
 capabilities.push({id,owner,status,role:r.role,claimRefs:refs,task:r.task,anchor:a,condition:r.limits,qualification:status==='HISTORICAL'?'HISTORICAL_NAVIGATION_ONLY':refs.length?'CANDIDATE_SUPPORT_ONLY':'EXPLICIT_NO_DIRECT_CLAIM_REVIEW_REQUIRED',execution:'UNKNOWN_NOT_EXECUTED',projectContractRefs:r.projectContractRefs??[],historicalTargets:r.historicalTargets??[],d4Targets:r.d4Targets??[]});
}
assert.equal(cells.size,1148);assert.equal(capabilities.filter(x=>x.status==='ACTIVE').length,1113);
for(const d2 of branches.keys())for(let n=1;n<=7;n++)assert.ok(cells.has(d2+'/A0'+n));
const cq=[];
for(let n=1;n<=26;n++){
 const id='CQ'+String(n).padStart(2,'0'),q=reader.retrieve(id);
 const expected=claims.filter(x=>x.cq.includes(id)).map(ref).sort();
 assert.deepEqual([...q.rootIds].sort(),expected);assert.ok(expected.length,id);
 const closure=new Set(expected);let changed=true;
 while(changed){changed=false;for(const e of edges)if(e.type==='requires'&&closure.has(e.from)&&!closure.has(e.to)){closure.add(e.to);changed=true;}}
 assert.deepEqual(q.claims.map(x=>x.ref).sort(),[...closure].sort());
 for(const x of q.claims)assert.equal(x.applicability,'CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL');
 cq.push({id,roots:expected,requiredClosure:[...closure].sort(),owners:[...new Set(q.claims.map(x=>x.owner))].sort(),status:'CONDITIONAL_NOT_ACCEPTED'});
}
const byView=new Map();for(const b of bindings){if(!byView.has(b.view))byView.set(b.view,[]);byView.get(b.view).push(b);}
for(const v of views){
 const actual=reader.caseToClaims(ref(v));const expected=byView.get(ref(v))??[];
 assert.deepEqual(actual.map(b=>b.id).sort(),expected.map(b=>b.id).sort());
 assert.equal(actual.filter(b=>b.role==='PRIMARY_TARGET').length,1);
}
const cross=edges.filter(e=>['requires','references'].includes(e.type)&&records.get(e.from)?.owner!==records.get(e.to)?.owner);
const residualFile='docs/product/calibration/g05-r2-historical-findings-residual-gates.md';
const historical=[...pinned(residualFile).b.toString().matchAll(/^\| \[#(\d+)\]\([^)]*\) (RV\d+) \| (.*)$/gm)].map(x=>({issue:Number(x[1]),finding:x[2],frozenRow:x[0],status:'OPEN_GATE_NOT_CLOSED'}));
assert.equal(historical.length,36);assert.equal(new Set(historical.map(x=>x.issue)).size,15);
const splitFile='docs/product/calibration/g05-r3-split-disposition-candidate.md';
const splits=[...pinned(splitFile).b.toString().matchAll(/^\| (K\d\d\.\d\d\.\d\d\.\d\d) \| (.*)$/gm)].map(x=>({oldD4:x[1],frozenRow:x[0],status:'SPLIT_OPEN_NAVIGATION_ONLY',equivalence:false}));
assert.equal(splits.length,28);
const oldRefs=new Set(splits.map(x=>x.oldD4));
for(const c of claims)assert.ok(!oldRefs.has(c.d4),'old split promoted '+c.d4);
const result={format:'audio-kg-t07-integration-coverage/1',base,tree,status:'BUILDER_COVERAGE_ONLY_NOT_ACCEPTED',counts:{...summary.counts,owners:owners.length,sources:sources.length,views:views.length,activeD2:159,activeCells:1113,historicalCells:35,cq:26,historicalFindings:36,openSplits:28,crossOwnerRequired:cross.filter(e=>e.type==='requires').length,crossOwnerOptional:cross.filter(e=>e.type==='references').length},modules,cq,capabilities,historical,splits,crossOwnerRelations:cross,unresolvedInventory:inventory.filter(r=>r.disposition!=='CANDIDATE'),acceptedClaims:0,actualLLM:'NOT_EXECUTED',actualAudio:'NOT_EXECUTED'};
fs.mkdirSync('queries/integration',{recursive:true});
fs.writeFileSync('queries/integration/controller-input.json',JSON.stringify({entries,allowFixture:false,priorRegistry:null},null,2)+'\n');
fs.writeFileSync('queries/integration/coverage.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.counts,null,2));
