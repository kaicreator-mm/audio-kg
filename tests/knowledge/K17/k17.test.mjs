import {researchGate} from './integrated-witness.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {gitBlob,openCandidateReader} from '../../../tools/validate-knowledge.mjs';
const m="K17";
const expected={"rows": 30, "sources": 17, "empty": 13, "legacy": 5, "splits": 4, "roles": 49};
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

t('MC01 signed asynchrony from aligned matched timestamps',()=>{
 const t=[0,500,1000],r=[-20,490,980],d=r.map((x,i)=>x-t[i]);
 assert.deepEqual(d,[-20,-10,-20]);assert.ok(Math.abs(d.reduce((s,x)=>s+x,0)/d.length+50/3)<1e-12);
 verify('MC01','FP','-16.67ms');
});
t('MC04 equal bias can have unequal absolute error',()=>{
 const mean=x=>x.reduce((s,v)=>s+v,0)/x.length;
 const a=[-30,30,-30,30],b=[-5,-5,5,5];
 assert.equal(mean(a),0);assert.equal(mean(b),0);
 assert.equal(mean(a.map(Math.abs)),30);assert.equal(mean(b.map(Math.abs)),5);
 verify('MC04','FP','30ms');
});
t('MC05 contour does not imply interval identity',()=>{
 const intervals=x=>x.slice(1).map((v,i)=>v-x[i]);
 const a=intervals([60,62,61,65]),b=intervals([65,67,66,70]),c=intervals([60,64,63,68]);
 assert.deepEqual(a,b);assert.notDeepEqual(a,c);assert.deepEqual(a.map(Math.sign),c.map(Math.sign));
 verify('MC05','FP','[2,-1,4]');
});
t('MC14 event surprisal and distribution entropy are different',()=>{
 const p=[.5,.25,.25],s=p.map(x=>-Math.log2(x));
 assert.deepEqual(s,[1,2,2]);assert.equal(p.reduce((a,x,i)=>a+x*s[i],0),1.5);
 verify('MC14','FP','1.5 bit');
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
const integ=read('cases/K17/integrated-cases.json'),sc=integ.scenario,b=sc.baselineIdentity,r=sc.report,f=sc.conditions;
const gate=(c=b,report=r,flags=f)=>researchGate(sc,c,report,flags);
t('KC-MC17 exact fixed research identity and independent baseline',()=>{
 assert.deepEqual(sc,ledger.integratedScenario);assert.equal(sc.id,'KC-MC17');assert.equal(sc.project,'J');
 assert.deepEqual(b,{task:'old-new',stimulus:'SET-A@1',items:'A-B-C-D',exposure:'EX1',labels:'L1',clock:'T1',instructions:'I1',presentation:'P1',sample:'SYNTHETIC-SAMPLE-1',analysis:'AN1',metric:'SDT-fixed'});
 assert.deepEqual(r,{identity:b,source:'synthetic',observed:false,complete:true});
 assert.deepEqual(f,{syntheticOnly:true,actualParticipants:false,controlMatched:true,currentEvidence:true});
 assert.ok(sc.anchors.some(a=>a.line===10)&&sc.anchors.some(a=>a.line===41)&&sc.anchors.some(a=>a.line===75));
 for(const a of sc.anchors)anchor(a);
 for(const c of integ.cases){assert.equal(c.scenarioId,sc.id);assert.ok(c.entryLinks.length);}
 assert.equal(gate(),'SYNTHETIC_ANALYSIS_ONLY');
 for(const k of ['realParticipantsAllowed','realAudioAllowed','clinicalResearchAllowed','recordingAllowed','dataCollectionAllowed'])assert.equal(sc[k],false);
 assert.equal(sc.realPermission,'UNKNOWN');
});
for(const k of Object.keys(b)){
 t('KC-MC17 fixed candidate and stale envelope reject '+k,()=>{
  const c={...b,[k]:'changed'};
  assert.equal(gate(c,{...r,identity:c}),'PENDING');
  assert.equal(gate(b,{...r,identity:c}),'PENDING');
  const missing={...b};delete missing[k];
  assert.equal(gate(missing,r),'PENDING');
  assert.equal(gate(b,{...r,identity:missing}),'PENDING');
 });
}
t('KC-MC17 unknown conditions and real execution requests refuse',()=>{
 for(const k of Object.keys(f))assert.equal(gate(b,r,{...f,[k]:null}),'PENDING');
 for(const k of ['actualParticipants','realAudio','clinicalResearch','recording','dataCollection'])assert.equal(gate(b,r,{...f,[k]:true}),'PENDING');
 for(const [k,v] of Object.entries({source:'observed',observed:true,complete:false}))assert.equal(gate(b,{...r,[k]:v}),'PENDING');
 assert.equal(gate({...b,extra:'unqualified'},{...r,identity:{...b,extra:'unqualified'}}),'PENDING');
});
console.log(JSON.stringify({module:m,passed:results.length,results},null,2));
