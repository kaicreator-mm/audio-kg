import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

import assert from 'node:assert/strict';
import {gitBlob,openCandidateReader} from '../../../tools/validate-knowledge.mjs';
const m="K19";
const expected={"rows": 40, "sources": 13, "empty": 17, "legacy": 6, "splits": 6, "roles": 70};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const ledger=read('cases/'+m+'/frozen-input-ledger.json');
const pack=read('knowledge/'+m+'/candidate.json');
const manifest=read('knowledge/'+m+'/qualification.json');
const frozen=read('ontology/l1-anchor-tree.json');
const input=read('knowledge/'+m+'/controller-input.json');
const reader=openCandidateReader(process.cwd(),input.entries,{allowFixture:false,priorRegistry:null});
const ref=r=>r.id+'@'+r.revision;
const id=r=>m+'-CL-'+r.caseId+'@1';
const results=[];
const t=(name,fn)=>{fn();results.push([name,true]);};
const anchor=a=>{
 assert.equal(a.commit,frozen.commit);
 assert.equal(frozen.paths[a.file]??execFileSync('git',['rev-parse',frozen.commit+':'+a.file],{encoding:'utf8'}).trim(),a.blob);
 const b=fs.readFileSync(a.file);
 assert.equal(gitBlob(b),a.blob);
 assert.equal(b.toString('utf8').split('\n')[a.line-1],a.row);
};
t('exact candidate module counts and non-admission',()=>{
 assert.equal(reader.summary().acceptedClaims,0);
 assert.equal(ledger.rows.length,expected.rows);
 assert.equal(pack.records.filter(r=>r.type==='Claim').length,expected.rows);
 assert.equal(pack.records.filter(r=>r.type==='CaseView').length,expected.rows*4);
 assert.equal(pack.records.filter(r=>r.type==='Source').length,expected.sources);
 assert.equal(manifest.sourceQualifications.length,expected.sources);
 assert.equal(ledger.rows.filter(r=>!r.directCQ.length).length,expected.empty);
 assert.equal(new Set(ledger.rows.map(r=>r.d4)).size,expected.rows);
 assert.ok(pack.records.filter(r=>r.type==='Claim').every(r=>r.status==='CANDIDATE'));
});
for(const r of ledger.rows){
 t(r.caseId+' exact frozen anchors and query/view bindings',()=>{
  anchor(r.discovery);anchor(r.caseAnchor);
  assert.ok(r.sourceRoutes.length);
  for(const s of r.sourceRoutes)anchor(s.anchor);
  const q=reader.retrieve(r.d4);
  assert.ok(q.rootIds.includes(id(r)));
  const c=q.claims.find(x=>x.ref===id(r));
  assert.deepEqual([...c.cq].sort(),[...r.directCQ].sort());
  assert.ok(c.evidence.length&&c.evidence.every(e=>e.sources.length&&e.sources.every(s=>s.rights==='UNKNOWN_NO_IMPORT')));
  const views=c.cases.filter(x=>x.binding.role==='PRIMARY_TARGET').map(x=>x.view);
  assert.equal(views.length,4);
  assert.equal(new Set(views.map(x=>x.direction+'-'+x.polarity)).size,4);
  for(const v of views){
   anchor(v.example.anchor);
   assert.equal(v.example.frozenCase,r.caseId);
   assert.equal(v.example.observationStatus,'SYNTHETIC_EXPECTED_NOT_OBSERVED');
   assert.notEqual(v.question,v.example.expectedResult);
   assert.ok(!v.question.includes(v.example.expectedResult),r.caseId+' answer leaked into question');
   assert.ok(!v.question.startsWith('如何依据该案例判断'),r.caseId+' generic seeded prompt');
   assert.ok(reader.caseToClaims(ref(v)).some(b=>b.claim===id(r)&&b.role==='PRIMARY_TARGET'));
   if(v.polarity==='NEGATIVE')assert.ok(v.example.expectedResult.startsWith('REJECT'));
  }
 });
}
for(let n=1;n<=26;n++){
 const cq='CQ'+String(n).padStart(2,'0');
 t(cq+' direct roots match frozen role, support-only excluded',()=>{
  assert.deepEqual(reader.retrieve(cq).rootIds.filter(x=>x.startsWith(m+'-')).sort(),ledger.rows.filter(r=>r.directCQ.includes(cq)).map(id).sort());
 });
}
t('source qualification rights and historical route states',()=>{
 const src=pack.records.filter(r=>r.type==='Source');
 for(const s of src){anchor(s.anchor);assert.equal(s.rights,'UNKNOWN_NO_IMPORT');}
 const legacy=read('queries/'+m+'/legacy-routes.json');
 const migration=read('queries/'+m+'/migration-routes.json');
 assert.equal(legacy.routes.length,expected.legacy);assert.equal(migration.splitOpenCount,expected.splits);
 assert.equal(migration.noClaimAdmission,true);
 for(const r of legacy.routes){anchor(r.anchor);assert.equal(r.equivalence,false);assert.ok(r.claimRefs.every(x=>pack.records.some(y=>y.type==='Claim'&&ref(y)===x)));}
});
t('capability matrix and local CQ exact anchors',()=>{
 const cap=read('queries/'+m+'/capability-index.json');
 assert.equal(cap.roles.length,expected.roles);
 assert.equal(new Set(cap.roles.map(x=>x.d2+':'+x.ability)).size,expected.roles);
 for(const r of cap.roles){anchor(r.anchor);assert.equal(r.externalStatus,'UNKNOWN_NOT_EXECUTED');assert.ok(r.d4Targets.length||r.historicalTargets.length);assert.equal(r.d4Targets.length,r.claimRefs.length);}
 assert.equal(ledger.localQuestions.length,12);
 for(const q of ledger.localQuestions){anchor(q.anchor);assert.ok(q.caseIds.length);assert.ok(q.caseIds.every(x=>ledger.rows.some(y=>y.caseId===x)));}
});
t('returned candidate structures detached from subsequent queries',()=>{
 const r=ledger.rows[0],a=reader.retrieve(id(r));const original=structuredClone(a);
 a.rootIds.length=0;a.claims.length=0;
 assert.deepEqual(reader.retrieve(id(r)),original);
});
const view=(caseId,key)=>pack.records.find(r=>r.id===m+'-V-'+caseId+'-'+key).example;
const verify=(caseId,key,part)=>assert.ok(view(caseId,key).expectedResult.includes(part),caseId+' '+key+' bound result');

const integ=read('cases/'+m+'/integrated-cases.json'),s=integ.scenario;
t(m+' full exact frozen integrated sections and link target identities',()=>{
 assert.deepEqual(integ.cases,ledger.integratedCases);assert.deepEqual(s,ledger.integratedScenario);
 assert.equal(s.realRights,'UNKNOWN');assert.equal(s.realExecutionAllowed,false);assert.equal(s.realAuditionAllowed,false);
 const prefix={K13:'LA',K18:'SD',K19:'LS'}[m],stem={K13:'localization',K18:'sound-design',K19:'live-sound'}[m];
 const lines=fs.readFileSync('docs/product/calibration/'+stem+'-r4-integrated-closure.md','utf8').split('\n');
 const expectedLinks=[];
 for(const c of integ.cases){
  anchor(c.headingAnchor);assert.ok(c.body.length);
  for(const b of c.body){anchor(b.anchor);assert.equal(b.text,b.anchor.row);
   const regex=new RegExp('\\[('+prefix+'\\d{2})(?:/('+m+'\\.\\d{2}\\.\\d{2}\\.\\d{2}))?\\]\\(([^()\\s]+)\\)','g');
   for(const x of b.text.matchAll(regex)){
    const r=ledger.rows.find(r=>r.caseId===x[1]);assert.ok(r);
    if(x[2])assert.equal(x[2],r.d4);
    assert.equal(x[3],r.caseAnchor.file.split('/').at(-1)+'#L'+r.caseAnchor.line);
    const item={label:x[1]+(x[2]?'/'+x[2]:''),uri:x[3],caseId:x[1],d4:r.d4,targetAnchor:r.caseAnchor};
    if(!expectedLinks.some(y=>JSON.stringify(y)===JSON.stringify(item)))expectedLinks.push(item);
   }
  }
 }
 assert.deepEqual(s.allCaseLinks,expectedLinks);
 assert.deepEqual(s.entryLinks.map(x=>[x.caseId,x.d4,x.label,x.uri]),expectedLinks.filter(x=>x.label.includes('/')).map(x=>[x.caseId,x.d4,x.label,x.uri]));
 for(const a of s.anchors)anchor(a);
 for(const item of integ.history){anchor(item.anchor);assert.equal(item.text,item.anchor.row);}
});
t(m+' relation roles, exact qualification and no dual necessary/reference promotion',()=>{
 const rows=fs.readFileSync('knowledge/'+m+'/relation-authoring.tsv','utf8').trim().split('\n').map(x=>x.split('\t'));
 const edges=pack.edges.filter(e=>['requires','references'].includes(e.type));assert.equal(edges.length,rows.length);
 assert.equal(new Set(rows.map(x=>x[0]+'|'+x[2])).size,rows.length);
 for(const [caseId,role,target,scope] of rows){
  const to=target.includes('@')?target:m+'-CL-'+target+'@1',from=m+'-CL-'+caseId+'@1',type=role==='H'?'requires':'references';
  const e=edges.find(e=>e.from===from&&e.to===to&&e.type===type);assert.ok(e);
  assert.equal(manifest.edgeQualifications.find(q=>q.edge===e.id).scope,scope);
  assert.equal(pack.bindings.filter(b=>b.claim===to&&b.role==='REQUIRES'&&b.view.startsWith(m+'-V-'+caseId+'-')).length,role==='H'?4:0);
  assert.equal(manifest.obligations.filter(o=>o.edge===e.id).length,role==='H'?1:0);
 }
});
t(m+' historical and split routing stays open and exact',()=>{
 for(const r of ledger.migrationRows){
  anchor(r.anchor);assert.equal(r.equivalence,false);
  for(const key of ['originalMigrationAnchor','originalCandidateAnchor','originalPredicateAnchor','g05Anchor'])if(r[key])anchor(r[key]);
 }
 for(const r of ledger.splitRoutes){assert.equal(r.status,'SPLIT_OPEN_NAVIGATION_ONLY');assert.ok(r.originalMigrationAnchor.row.includes('SPLIT_OPEN'));assert.ok(r.g05Anchor.row.startsWith('| '+r.sourceD4+' |'));}
 for(const a of ledger.ownershipRoutes)anchor(a);
 assert.equal(ledger.historicalOpenIssues[0].status,'OPEN_NOT_CLOSED_BY_THIS_TASK');
});
t(m+' active vs historical capability cells independently counted',()=>{
 const n=ledger.roles.filter(r=>r.status==='ACTIVE').length;assert.equal(n,{K13:28,K18:77,K19:70}[m]);
 assert.ok(ledger.roles.every(r=>r.externalStatus==='UNKNOWN_NOT_EXECUTED'));
 for(const r of ledger.roles){anchor(r.anchor);assert.equal(r.status==='ACTIVE',r.d4Targets.length>0);}
});
import {checkedGate} from './finite-witness.mjs';
import * as witness from './frozen-witness.mjs';
const run=witness['run'+m+'Finite'](),{tests,base,edit,g:scope,gate:rawGate}=run;
const receipt=m==='K18'?run.receipt:run.obs;
t(m+' exact frozen replay source and structured fixture readback',()=>{
 const name='run'+m+'Finite',exports=m==='K18'?'base,edit,g,receipt,gate':'base,edit,g,obs,gate';
 const expected=s.frozenWitness.source.replace('return tests;','return {tests,'+exports+'};').replace('console.log('+name+'());','export { '+name+' };');
 assert.equal(fs.readFileSync('tests/knowledge/'+m+'/frozen-witness.mjs','utf8'),expected);
 assert.deepEqual(base,s.baseline);assert.deepEqual(edit,s.candidate);assert.deepEqual(scope,s.syntheticScope);assert.deepEqual(receipt(edit),s.receipt);
 assert.deepEqual(tests.map(x=>x[0]),s.frozenExpectedChecks);
});
for(const [name,value] of tests)t('frozen actual replay '+name,()=>assert.equal(value,true));
const f=(c=edit,r=receipt(edit),sc=scope)=>checkedGate(rawGate,c,r,sc);
t(m+' synthetic acceptance only and actual requests never admitted',()=>{
 assert.equal(f(),'SYNTHETIC_CANDIDATE_ONLY');
 for(const k of ['realExecutionRequested','realAuditionRequested','realDeliveryRequested'])assert.equal(f(edit,receipt(edit),{...scope,[k]:true}),'STOP_OR_PENDING');
});
for(const key of Object.keys(edit))t(m+' current receipt identity '+key+' changed/missing',()=>{
 const q=receipt(edit);q.identity[key]='other';assert.equal(f(edit,q),'NOT_READY');
 const missing=receipt(edit);delete missing.identity[key];assert.equal(f(edit,missing),'NOT_READY');
});
t(m+' ordered protected fields reject sparse arrays and replacement envelopes',()=>{
 const keys=m==='K18'?['notes','graph','deps','waveTable']:['points','outputRoute'];
 for(const key of keys){
  const c=structuredClone(edit);delete c[key][0];assert.equal(f(c,receipt(edit)),'OUTSIDE_FIXTURE');
  const r=receipt(edit);delete r.identity[key][0];assert.equal(f(edit,r),'NOT_READY');
  const other=structuredClone(edit);other[key].reverse();if(JSON.stringify(other[key])!==JSON.stringify(edit[key]))assert.equal(f(other,receipt(other)),'OUTSIDE_FIXTURE');
 }
});
t('KC-LS19 whole field and new observation cannot bypass fixed scene',()=>{
 for(const key of Object.keys(edit)){
  const c={...structuredClone(edit),[key]:'other'};assert.equal(f(c,receipt(c)),'OUTSIDE_FIXTURE');
 }
 for(const k of ['coverage','clarity','spectral']){
  const r=receipt(edit);r[k].pop();assert.equal(f(edit,r),'NOT_READY');
  const q=receipt(edit);q[k][2].id=q[k][1].id;assert.equal(f(edit,q),'NOT_READY');
 }
});
t('KC-LS19 audience and peak/telemetry policy gates remain independent',()=>{
 for(const k of ['audiencePolicy','audienceProfile','peakCriterion','peakContext','policyApplicable','peakKnown','peakWithinApproved','workerKnown','workerWithinApproved']){
  const r=receipt(edit);delete r.exposure[k];assert.equal(f(edit,r),'STOP_OR_PENDING');
 }
 for(const k of ['kind','subscription','window','coverageComplete','available']){
  const r=receipt(edit);delete r.telemetry[k];assert.equal(f(edit,r),'STOP_OR_PENDING');
 }
 const r=receipt(edit);r.telemetry.kind='LATE_INTERVAL_COUNT';assert.equal(f(edit,r),'STOP_OR_PENDING');
 for(const v of ['CHILD_TARGETED','UNKNOWN',null]){const c={...structuredClone(edit),audienceProfile:v};assert.equal(f(c,receipt(c)),'OUTSIDE_FIXTURE');}
});
t(m+' explicit unknown real request stays outside finite acceptance',()=>{
 for(const key of ['realExecutionRequested','realAuditionRequested','realDeliveryRequested'])assert.equal(f(edit,receipt(edit),{...scope,[key]:null}),'STOP_OR_PENDING');
});
console.log(JSON.stringify({module:m,passed:results.length,results},null,2));
