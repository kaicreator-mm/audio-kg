import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openCandidateReader,gitBlob} from '../../../tools/validate-knowledge.mjs';
import {checks as methodChecks,hardRubric as methodRubric} from './domain-witness.mjs';

const m=process.env.KG_MODULE || (process.argv[1].includes('/K10/')?'K10':'K15');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const eq=(a,b)=>assert.deepEqual(a,b);
const ref=r=>r.id+'@'+r.revision;
const ledger=read('cases/'+m+'/frozen-input-ledger.json');
const input=read('knowledge/'+m+'/controller-input.json');
const packEntry=input.entries.find(e=>e.pack==='knowledge/'+m+'/candidate.json');
const pack=read(packEntry.pack),manifest=read(packEntry.manifest);
const frozen=read('ontology/l1-anchor-tree.json');
const roles=read('queries/'+m+'/capability-index.json');
const legacy=read('queries/'+m+'/legacy-routes.json');
const migration=read('queries/'+m+'/migration-routes.json');
const discovery=read('queries/'+m+'/discovery-index.json');
const provenance=read('sources/'+m+'/provenance.json');
const workflows=read('knowledge/'+m+'/domain-workflows.json');
const integrated=read('cases/'+m+'/integrated-cases.json');
const reader=openCandidateReader(process.cwd(),input.entries,{allowFixture:false,priorRegistry:null});
const allRecords=new Map(pack.records.map(r=>[ref(r),r]));
const claimRefs=new Set(pack.records.filter(r=>r.type==='Claim').map(ref));
const results=[];
const t=(name,fn)=>{try{fn();results.push([name,true]);}catch(e){throw new Error(name+': '+e.message,{cause:e});}};
const anchor=a=>{
 assert.ok(a&&a.commit===frozen.commit,'frozen commit');
 assert.equal(frozen.paths[a.file],a.blob,'path pinned in L1 tree');
 const bytes=fs.readFileSync(a.file);
 assert.equal(gitBlob(bytes),a.blob,'exact Git blob');
 assert.equal(bytes.toString('utf8').split('\n')[a.line-1],a.row,'exact source row');
};
const expected={
 K10:{claims:54,views:216,sources:27,legacy:54,migration:16,splits:12,roles:63,roleCounts:{P:45,S:18},local:12,integrated:3,workflows:9,H:54,O:66,assessments:13,dispositions:{ROUTER_CANDIDATE:27,BOUNDED_COMPOSITION:27},historical:52},
 K15:{claims:48,views:192,sources:7,legacy:48,migration:8,splits:8,roles:56,roleCounts:{P:54,S:2},local:12,integrated:3,workflows:8,H:60,O:18,assessments:17,dispositions:{ROUTER_CANDIDATE:24,BOUNDED_COMPOSITION:24},historical:null}
}[m];

t('candidate-only status and exact cardinalities',()=>{
 assert.equal(reader.summary().status,'CANDIDATE_STRUCTURE_ONLY');
 assert.equal(reader.summary().acceptedClaims,0);
 assert.equal(pack.coverageMode,'MODULE');
 assert.equal(ledger.status,'CANDIDATE_ONLY_NOT_ADMITTED');
 assert.equal(pack.inventory.length,expected.claims);
 assert.equal(pack.records.filter(r=>r.type==='Claim').length,expected.claims);
 assert.equal(pack.records.filter(r=>r.type==='CaseView').length,expected.views);
 assert.equal(new Set(pack.records.filter(r=>r.type==='Claim').map(r=>r.d4)).size,expected.claims);
 assert.ok(pack.records.filter(r=>r.type==='Claim').every(r=>r.status==='CANDIDATE'));
});
t('all frozen discovery, case and source anchors',()=>{
 assert.equal(ledger.rows.length,expected.claims);
 for(const r of ledger.rows){
  anchor(r.discovery);anchor(r.caseAnchor);
  assert.ok(r.sourceRoutes.length>0,r.caseId+' qualified source');
  for(const s of r.sourceRoutes)anchor(s.anchor);
 }
 assert.equal(new Set(ledger.rows.map(r=>r.caseAnchor.file+':'+r.caseAnchor.line)).size,expected.claims);
});
t('all claims preserve frozen direct-CQ roles and evidence',()=>{
 for(const r of ledger.rows){
  const id=m+'-CL-'+r.caseId+'@1';
  const out=reader.retrieve(r.d4);
  assert.ok(out.rootIds.includes(id),r.caseId+' root');
  const q=reader.retrieve(id);
  const c=q.claims.find(x=>x.ref===id);
  assert.ok(c,r.caseId+' exact claim');
  eq([...c.cq].sort(),[...r.directCQ].sort());
  assert.ok(c.evidence.length>0,r.caseId+' evidence');
  assert.ok(c.evidence.every(e=>e.sources.length>0&&e.sources.every(s=>s.rights==='UNKNOWN_NO_IMPORT')));
  assert.ok(c.relations.some(e=>e.type==='supported_by'));
  assert.equal(c.relations.filter(e=>e.type==='applies_under').length,1);
  assert.ok(c.relations.every(e=>e.logicalConverse===false));
  assert.ok(c.relations.filter(e=>e.type==='requires').every(e=>e.required===true));
  assert.ok(c.relations.filter(e=>e.type==='references').every(e=>e.required===false));
 }
});
t('four independently bound forward/reverse positive/negative views per claim',()=>{
 for(const r of ledger.rows){
  const id=m+'-CL-'+r.caseId+'@1';
  const c=reader.retrieve(id).claims.find(x=>x.ref===id);
  const views=c.cases.filter(x=>x.binding.role==='PRIMARY_TARGET').map(x=>x.view);
  assert.equal(views.length,4,r.caseId+' primary views');
  eq(new Set(views.map(v=>v.direction+'_'+v.polarity)).size,4);
  eq(new Set(views.map(v=>v.question)).size,4);
  for(const v of views){
   const e=v.example;anchor(e.anchor);
   assert.equal(e.frozenCase,r.caseId);
   assert.equal(e.observationStatus,'SYNTHETIC_EXPECTED_NOT_OBSERVED');
   assert.ok(e.directionSpecificProblem&&e.expectedResult&&e.reasoningBasis);
   assert.notEqual(e.expectedResult,v.question);
   assert.ok(reader.caseToClaims(ref(v)).some(b=>b.claim===id&&b.role==='PRIMARY_TARGET'));
   if(v.polarity==='NEGATIVE'){
    assert.equal(e.witnessRole,'NEGATIVE_INPUT_OR_BOUNDARY_NOT_FACT');
    assert.ok(e.expectedResult.startsWith('REJECT'));
   }else assert.equal(e.witnessRole,'SCOPED_SYNTHETIC_EXPECTED_NOT_OBSERVED');
  }
 }
});
t('direct CQ queries exclude support-only assignments',()=>{
 for(let n=1;n<=26;n++){
  const cq='CQ'+String(n).padStart(2,'0');
  const expectedIds=ledger.rows.filter(r=>r.directCQ.includes(cq)).map(r=>m+'-CL-'+r.caseId+'@1').sort();
  const actual=reader.retrieve(cq).rootIds.filter(x=>x.startsWith(m+'-')).sort();
  eq(actual,expectedIds);
 }
 for(const r of ledger.rows){
  for(const cq of r.supportCQ.filter(x=>!r.directCQ.includes(x))){
   const ids=reader.retrieve(cq).rootIds;
   assert.ok(!ids.includes(m+'-CL-'+r.caseId+'@1'),r.caseId+' support CQ not direct '+cq);
  }
 }
});
t('all source qualifications and provenance remain non-admitting',()=>{
 const sourceIds=new Set(ledger.rows.flatMap(r=>r.sourceRoutes.map(s=>s.sourceId)));
 assert.equal(sourceIds.size,expected.sources);
 const localSources=pack.records.filter(r=>r.type==='Source');
 assert.ok(localSources.length>0);
 assert.ok(localSources.every(s=>s.rights==='UNKNOWN_NO_IMPORT'&&s.uri&&s.locator));
 assert.equal(localSources.length,manifest.sourceQualifications.length);
 for(const s of localSources)anchor(s.anchor);
 const provenanceIds=new Set(provenance.sources.map(s=>s.sourceId));
 eq([...provenanceIds].sort(),[...sourceIds].sort());
 assert.ok(provenance.sources.every(s=>s.anchor&&s.formalUse));
});
t('legacy routing and migration state are preserved',()=>{
 assert.equal(legacy.routes.length,expected.legacy);
 for(const r of legacy.routes){
  anchor(r.anchor);
  assert.equal(r.equivalence,false);
  assert.equal(r.routes.length,2);
  assert.equal(new Set(r.routes).size,2);
  assert.equal(r.claimRefs.length,2);
  assert.ok(r.claimRefs.every(x=>claimRefs.has(x)));
  assert.ok(r.limits);
 }
 assert.equal(migration.rows.length,expected.migration);
 assert.equal(migration.splitOpenCount,expected.splits);
 assert.equal(migration.noClaimAdmission,true);
 assert.ok(migration.rows.every(r=>{anchor(r.anchor);return r.status==='SPLIT_OPEN_NAVIGATION_ONLY'||r.status==='RETAIN_ORIGINAL_OWNER'}));
 assert.equal(ledger.splitRoutes.length,expected.splits);
 assert.ok(ledger.splitRoutes.every(r=>r.status==='SPLIT_OPEN_NAVIGATION_ONLY'));
});
t('capability matrix preserves exact P/S roles without execution permission',()=>{
 assert.equal(roles.roles.length,expected.roles);
 const counts=Object.fromEntries(['P','S'].map(x=>[x,roles.roles.filter(r=>r.role===x).length]));
 eq(counts,expected.roleCounts);
 assert.ok(roles.roles.every(r=>r.status==='ACTIVE'&&r.externalStatus==='UNKNOWN_NOT_EXECUTED'&&r.d4Targets.length===6&&r.claimRefs.length===6));
 for(const r of roles.roles){anchor(r.anchor);assert.ok(r.claimRefs.every(x=>claimRefs.has(x)));assert.ok(r.localWitnesses.every(x=>x.problem&&x.reject));}
});
t('local discovery questions remain separately addressable',()=>{
 assert.equal(ledger.localQuestions.length,expected.local);
 const qids=new Set(ledger.localQuestions.map(q=>q.id));
 assert.equal(qids.size,expected.local);
 for(const q of ledger.localQuestions){
  anchor(q.anchor);
  assert.ok(q.question);
  assert.ok(q.caseIds.length>0);
  assert.ok(q.caseIds.every(id=>ledger.rows.some(r=>r.caseId===id)));
 }
});
t('domain workflows are sequential, bounded and knowledge-only',()=>{
 assert.equal(workflows.workflows.length,expected.workflows);
 assert.equal(workflows.status,'KNOWLEDGE_ONLY_NOT_EXECUTED');
 for(const w of workflows.workflows){
  assert.equal(w.status,'KNOWLEDGE_ONLY_NOT_EXECUTED');
  assert.equal(w.output,'CANDIDATE_ONLY_NOT_ADMITTED');
  assert.equal(w.rights,'UNKNOWN_NO_IMPORT');
  assert.equal(w.externalExecution,'UNKNOWN_NOT_EXECUTED');
  assert.equal(w.claimRefs.length,6);
  assert.ok(w.claimRefs.every(x=>claimRefs.has(x)));
  assert.ok(w.steps.length>=5&&w.stopConditions.length>=5);
  assert.ok(w.steps.every(s=>s.id&&s.action&&s.requires.length&&s.produces.length));
 }
});
t('integrated closure and historical obligations remain pinned',()=>{
 assert.equal(integrated.cases.length,expected.integrated);
 if(m==='K10'){
  for(const x of integrated.cases)anchor(x.anchor);
  assert.equal(ledger.historicalFinding,52);
  assert.ok(ledger.historicalOpenIssues.some(x=>x.number===52&&x.status==='OPEN_NOT_CLOSED_BY_THIS_TASK'));
 }else{
  for(const x of integrated.cases){anchor(x.headingAnchor);for(const b of x.body)anchor(b.anchor);}
  for(const x of integrated.history)anchor(x.anchor);
  eq(ledger.historicalOpenIssues.map(x=>x.number),[28,32,35,38,41,46,49,52,55,60,63]);
 }
});
t('exact H/O graph and scoped obligations',()=>{
 assert.equal(pack.edges.filter(e=>e.type==='requires').length,expected.H);
 assert.equal(pack.edges.filter(e=>e.type==='references').length,expected.O);
 assert.equal(manifest.obligations.length,expected.H);
 assert.ok(manifest.obligations.every(o=>o.consumer&&o.provider&&o.condition&&o.providerContext&&o.group));
});
t('domain-specific adversarial assessment witnesses',()=>{
 const claims=pack.records.filter(r=>r.type==='Claim');
 const assessed=pack.records.filter(r=>r.type==='CaseView'&&r.direction==='FORWARD'&&r.polarity==='POSITIVE'&&r.example.assessment);
 assert.equal(assessed.length,expected.assessments);
 if(m==='K10'){
  const map=new Map(assessed.map(v=>[v.example.frozenCase,v.example.assessment]));
  assert.equal(map.get('EV01').missingReference,'UNKNOWN_NOT_ZERO');
  assert.ok(map.get('EV02').matching.includes('bipartite'));
  assert.ok(map.get('EV21').standard.includes('BS.1534'));
  assert.ok(map.get('EV48').smallImpairments.includes('BS.1116'));
  assert.ok(map.get('EV27').required.includes('reference'));
  assert.ok(map.get('EV54').rule.includes('leakage'));
 }else{
  const map=new Map(assessed.map(v=>[v.example.frozenCase,v.example.assessment]));
  assert.ok(map.get('GV07').separate.includes('sound_recording'));
  assert.ok(map.get('GV17').separate.includes('voice_synthesis'));
  assert.ok(map.get('GV22').limits.includes('do not prove'));
  assert.ok(map.get('GV33').fixedObjects.includes('W1'));
  assert.ok(map.get('GV38').limits.includes('NOT_A_LEGAL_DECISION'));
 }
});
if(m==='K15'){
 const {runFiniteR8}=await import('./r8-finite-witness.mjs');
 const witness=runFiniteR8();
 t('historical R8 54/54 finite object-binding assertions replay',()=>{
  assert.equal(witness.length,54);
  assert.ok(witness.every(x=>Array.isArray(x)&&x[1]===true));
 });
}
for(const [name,ok] of methodChecks)t('finite domain witness: '+name,()=>assert.ok(ok));
t('P2-W5-01 DDEX balanced-parenthesis source URLs round-trip exactly',()=>{
 const rin='https://kb.ddex.net/implementing-each-standard/recording-information-notification-(rin)/rin-explained/structure-of-rin/';
 const ern='https://kb.ddex.net/implementing-each-standard/electronic-release-notification-message-suite-(ern)/ern-4-explained/ern-4-structure/';
 const sourceMap=new Map(pack.records.filter(r=>r.type==='Source').map(r=>[r.id,r]));
 assert.equal(sourceMap.get('S564').uri,'https://rin.ddex.net/recording-information-notification/');
 assert.equal(sourceMap.get('S565').uri,ern);
 const pmap=new Map(provenance.sources.map(r=>[r.sourceId,r]));
 assert.ok(pmap.get('S564').allRegisteredLinks.some(x=>x.uri===rin));
 assert.ok(pmap.get('S565').allRegisteredLinks.some(x=>x.uri===ern));
 const qmap=new Map(manifest.sourceQualifications.map(r=>[r.source,r]));
 assert.equal(qmap.get('S565@1').accessedUri,ern);
 const register=fs.readFileSync('sources/K15/source-register.md','utf8');
 assert.ok(register.includes(ern)&&register.includes(rin));
 for(const r of ledger.rows.flatMap(x=>x.sourceRoutes).filter(x=>['S564','S565'].includes(x.sourceId)))assert.ok(r.registeredLinks.some(x=>x.uri===(r.sourceId==='S564'?rin:ern)));
 assert.ok(!register.includes('message-suite-(ern |'));
});
console.log(JSON.stringify({module:m,checks:results.length,passed:results.length,results},null,2));
