import fs from 'node:fs';
import assert from 'node:assert/strict';
import {gitBlob,openCandidateReader} from '../../../tools/validate-knowledge.mjs';
const m="K16";
const expected={"rows": 42, "sources": 16, "empty": 23, "legacy": 42, "splits": 16, "roles": 49};
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
 assert.equal(frozen.paths[a.file],a.blob);
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
 for(const r of cap.roles){anchor(r.anchor);assert.equal(r.externalStatus,'UNKNOWN_NOT_EXECUTED');assert.ok(r.d4Targets.length);assert.equal(r.d4Targets.length,r.claimRefs.length);}
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

t('MU01 record date and event date are distinct',()=>{
 const e=[{kind:'program',record:1920,event:1920},{kind:'recollection',record:1980,event:1920},{kind:'analysis',record:2003,event:1920}];
 const canProveEvent=x=>x.kind==='direct_observation'&&x.record===x.event;
 assert.equal(e.some(canProveEvent),false);
 assert.equal(canProveEvent({kind:'direct_observation',record:1920,event:1920}),true);
 verify('MU01','FP','证计划');assert.ok(view('MU01','FN').reasoningBasis.includes('证据类别'));
});
t('MU03 similarity is not documented influence',()=>{
 const influence=x=>x.similarity===true&&x.contactEvidence===true&&x.orderedDates===true;
 assert.equal(influence({similarity:true,contactEvidence:false,orderedDates:true}),false);
 assert.equal(influence({similarity:true,contactEvidence:true,orderedDates:true}),true);
 verify('MU03','FP','相似关系');
});
t('MU07 release genre is distinct from reported tradition',()=>{
 const kinds=['RELEASE_GENRE','REPORTED_TRADITION'];
 assert.notEqual(kinds[0],kinds[1]);verify('MU07','FP','发行分类');
 assert.ok(view('MU07','RN').reasoningBasis.includes('未知'));
});
t('MU16 no identity inference from acoustic cues',()=>{
 const identity=x=>x.selfReport===true&&x.scopeKnown===true?'SCOPED_RECORD':'UNKNOWN';
 assert.equal(identity({language:'x',timbre:'y'}),'UNKNOWN');
 assert.equal(identity({selfReport:true,scopeKnown:true}),'SCOPED_RECORD');
 verify('MU16','FP','个人身份、社群自称未知');
});

t('curated hard prerequisites and optional navigation are distinct',()=>{
 const rows=fs.readFileSync('knowledge/'+m+'/relation-authoring.tsv','utf8').trim().split('\n').map(x=>x.split('\t'));
 const edges=pack.edges.filter(e=>['requires','references'].includes(e.type));
 assert.equal(edges.length,rows.length);
 for(const [caseId,role,to,scope] of rows){
  const from=m+'-CL-'+caseId+'@1',type=role==='H'?'requires':'references';
  const e=edges.find(e=>e.from===from&&e.to===to&&e.type===type);
  assert.ok(e,from+' '+to+' '+type);assert.equal(manifest.edgeQualifications.find(q=>q.edge===e.id).scope,scope);
  const bound=pack.bindings.filter(b=>b.claim===to&&b.role==='REQUIRES'&&b.view.startsWith(m+'-V-'+caseId+'-'));
  assert.equal(bound.length,role==='H'?4:0);
  assert.equal(manifest.obligations.filter(o=>o.edge===e.id).length,role==='H'?1:0);
 }
 const inputs=input.entries.map(e=>e.pack);for(const peer of ['K11','K16','K17'])if(peer!==m)assert.ok(!inputs.includes('knowledge/'+peer+'/candidate.json'));
});
t('integrated workflow records retain frozen conditions and stop gates',()=>{
 const w=read('cases/'+m+'/integrated-cases.json');assert.deepEqual(w.cases,ledger.integratedCases);
 for(const c of w.cases){anchor(c.anchor);assert.ok(c.conditions.length&&c.rejectOrStop.length);assert.equal(c.status,'FINITE_SYNTHETIC_OR_RESEARCH_SCOPE_ONLY');}
});
console.log(JSON.stringify({module:m,passed:results.length,results},null,2));
