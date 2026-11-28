import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

import assert from 'node:assert/strict';
import {gitBlob,openCandidateReader} from '../../../tools/validate-knowledge.mjs';
const m="K13";
const expected={"rows": 20, "sources": 6, "empty": 0, "legacy": 48, "splits": 22, "roles": 56};
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
import {same,aligned,gate,rhymeJaccard,syllableDistance,independentRate} from './finite-witness.mjs';
const positive={baseline:structuredClone(s.baseline),...structuredClone(s.candidate)},identity=s.receipt;
const flags={permission:true,epoch:'E1',nativeUnderstanding:true,pronunciation:true,meaningVerified:true,musicProtected:true,toolQualified:true,independentObservation:true,safety:true,syntheticOnly:true,actualOutput:false};
const g=(c=positive,a=identity,r=identity,f=flags)=>gate(s,c,a,r,f);
t('KC-L13 exact original meaning, timebase, alignment and receipt identity',()=>{
 assert.deepEqual(s.baseline,{original:'O1',meaning:['return','tomorrow','positive','promise'],score:'N1',clock:'PPQ480',bpm:120,note:[60,62,64,62],duration:[480,480,240,240],rests:[],noteIds:['n1','n2','n3','n4'],language:'my',dialect:'D1'});
 assert.deepEqual(s.candidate,{translation:'V1',alignment:'A1',syllables:['s1','s2','s3'],groups:[['n1'],['n2'],['n3','n4']]});
 assert.deepEqual(identity,{original:'O1',translation:'V1',score:'N1',alignment:'A1',output:'Y1',language:'my',dialect:'D1',population:'G1',protocol:'Q1',permission:'E1',config:'C1',result:'EV1'});
 assert.equal(s.baseline.duration.reduce((a,b)=>a+b)/480*60/120,1.5);
 assert.equal(g(),'SYNTHETIC_CANDIDATE_ONLY');
});
for(const key of Object.keys(s.baseline))t('KC-L13 hard baseline field '+key+' changed/missing',()=>{
 const c=structuredClone(positive);c.baseline[key]='changed';assert.equal(g(c),'REJECT_HARD');
 const x=structuredClone(positive);delete x.baseline[key];assert.equal(g(x),'REJECT_HARD');
 assert.equal(g(c,{...identity,translation:'V2'},{...identity,translation:'V2'}),'REJECT_HARD');
});
t('KC-L13 incomplete, duplicate, reversed and empty alignment denied',()=>{
 for(const groups of [[['n1'],['n2'],['n3']], [['n1'],['n2'],['n2','n4']], [['n2'],['n1'],['n3','n4']], [['n1'],[],['n2','n3','n4']], [[],['n1'],['n2','n3','n4']]])assert.equal(g({...positive,groups}),'REJECT_HARD');
 assert.equal(g({...positive,syllables:['s1','s1','s3']}),'REJECT_HARD');
 assert.equal(g({...positive,groups:[['n1','n2'],['n3'],['n4']]}),'PENDING_EVIDENCE');
 assert.equal(g({...positive,translation:'V2'}),'REJECT_HARD');
 assert.equal(g({...positive,alignment:'A2'}),'REJECT_HARD');
});
for(const key of Object.keys(identity))t('KC-L13 changed/missing/replacement report '+key,()=>{
 const v={...identity,[key]:'other'},missing={...identity};delete missing[key];
 assert.equal(g(positive,identity,v),'PENDING_EVIDENCE');assert.equal(g(positive,v,v),'PENDING_EVIDENCE');assert.equal(g(positive,identity,missing),'PENDING_EVIDENCE');
});
t('KC-L13 rights and evidence independently bounded',()=>{
 for(const f of [{permission:null},{permission:false},{epoch:'E2'}])assert.equal(g(positive,identity,identity,{...flags,...f}),'STOP_PERMISSION');
 for(const key of ['nativeUnderstanding','pronunciation','meaningVerified','musicProtected','toolQualified','independentObservation','safety','syntheticOnly'])assert.equal(g(positive,identity,identity,{...flags,[key]:null}),'PENDING_EVIDENCE');
 for(const f of [{actualOutput:true},{realExecutionRequested:true},{realAuditionRequested:true},{realDeliveryRequested:true}])assert.equal(g(positive,identity,identity,{...flags,...f}),'PENDING_EVIDENCE');
});
t('LA01 LA11 NFC equality preserves original span and language distinctions',()=>{
 const x='\u1000\u103a\u1037',y='\u1000\u1037\u103a';
 assert.notEqual(x,y);assert.equal(x.normalize('NFC'),y.normalize('NFC'));
 assert.equal(Array.from('\u1000\u1031').length,2);assert.notEqual('\u1031\u1000'.normalize('NFC'),'\u1000\u1031'.normalize('NFC'));
 const a={raw:x,language:'my',dictionary:'D1',id:'R1'},b={raw:y,language:'my',dictionary:'D1',id:'R2'};assert.notDeepEqual(a,b);
});
t('LA05 LA15 independent same-count groups and finite denominator boundaries',()=>{
 assert.ok(aligned(['n1','n2','n3','n4'],['s1','s2','s3'],[['n1','n2'],['n3'],['n4']]));
 assert.equal(2*.25,.5);assert.equal(.25,.25);
 assert.equal(rhymeJaccard(['1-2','3-4'],['1-2','2-3']),1/3);assert.equal(rhymeJaccard([],[]),null);
 assert.equal(syllableDistance(4,5),.225);assert.equal(syllableDistance(0,5),null);assert.equal(syllableDistance(4,null),null);
});
t('LA08 LA18 separate independent audio recognition from assisted or informed response',()=>{
 const ex={stimulus:'Y1',population:'G1',protocol:'Q1'},a={...ex,kind:'INDEPENDENT_AUDIO_RECOGNITION',correct:9,validResponses:10};
 assert.equal(independentRate(a,ex),.9);assert.equal(independentRate({...a,correct:7},ex),.7);
 for(const k of ['PERFORMER_INFORMED','TEXT_ASSISTED'])assert.equal(independentRate({...a,kind:k},ex),null);
 for(const k of Object.keys(ex))assert.equal(independentRate({...a,[k]:'other'},ex),null);
 assert.equal(independentRate({...a,correct:0,validResponses:0},ex),null);
});
t('LA02 LA12 LA13 LA20 study and language bounds',()=>{
 assert.equal(160/180,8/9);assert.equal((81+3)/(90+10),.84);assert.equal(3/10,.3);
 assert.deepEqual([60,62,60].slice(1).map((x,i)=>Math.sign(x-[60,62,60][i])),[1,-1]);
 assert.equal(independentRate({kind:'INDEPENDENT_AUDIO_RECOGNITION',stimulus:'Y1',population:'G1',protocol:'Q1',correct:0,validResponses:0},{stimulus:'Y1',population:'G1',protocol:'Q1'}),null);
 for(const a of s.qualificationExtensions)anchor(a);
});
t('KC-L13 malformed or unbound candidate and observation cannot enter finite success',()=>{
 assert.equal(g({...positive,unqualifiedLyrics:'actual text'}),'REJECT_HARD');
 const c=structuredClone(positive);delete c.groups[1];assert.equal(g(c),'REJECT_HARD');
 assert.equal(g(positive,identity,identity,{...flags,realExecutionRequested:null}),'PENDING_EVIDENCE');
 assert.equal(independentRate({kind:'INDEPENDENT_AUDIO_RECOGNITION',correct:9,validResponses:10},{}),null);
});

const d25file='docs/product/calibration/domain-mixed-migration-predicate-batch.md';
const d25lines=fs.readFileSync(d25file,'utf8').split('\n');
const col25=l=>l.split('|').slice(1,-1).map(x=>x.trim());
const pred25=new Map(),cand25=new Map();
for(const [i,l] of d25lines.entries()){
 if(!/^\| K13\.\d{2}\.\d{2}\.\d{2} \|/.test(l))continue;
 const c=col25(l),map=c.length===8?pred25:c.length===4?cand25:null;
 if(map){assert.ok(!map.has(c[0]));map.set(c[0],{c,line:i+1});}
}
function exactD25(rows){
 assert.equal(rows.length,22);
 assert.equal(new Set(rows.map(r=>r.sourceD4)).size,22);
 const pairs=[];
 for(const r of rows){
  const p=pred25.get(r.sourceD4);assert.ok(p);
  assert.equal(r.status,'SPLIT_OPEN_NAVIGATION_ONLY');assert.equal(r.equivalence,false);
  anchor(r.originalPredicateAnchor);assert.equal(r.originalPredicateAnchor.file,d25file);assert.equal(r.originalPredicateAnchor.line,p.line);
  assert.deepEqual(r.d25Predicate,{predicate:p.c[2],new:p.c[3],reuse:p.c[4],ref:p.c[5],historicalEvidence:p.c[6],compositionCase:p.c[7]});
  assert.equal(r.originalRequirement,p.c[1]);
  const expected=[...cand25].filter(([k,v])=>v.c[3].split('、').includes(r.sourceD4));
  assert.deepEqual(r.originalCandidateBindings.map(b=>b.candidateD4).sort(),expected.map(([k])=>k).sort());
  for(const b of r.originalCandidateBindings){
   const q=cand25.get(b.candidateD4);assert.equal(b.sourceD4,r.sourceD4);
   assert.ok(p.c[3].split(' ').includes(b.candidateD4));
   assert.deepEqual(b.originalSourceD4s,q.c[3].split('、'));assert.deepEqual(b.originalSourceIds,q.c[2].split('/'));assert.equal(b.originalRequirement,q.c[1]);
   assert.equal(b.originalCandidateAnchor.file,d25file);assert.equal(b.originalCandidateAnchor.line,q.line);anchor(b.originalCandidateAnchor);
   pairs.push(b.candidateD4+'|'+b.sourceD4);
  }
 }
 assert.equal(cand25.size,7);assert.equal(pairs.length,8);assert.equal(new Set(pairs).size,8);
}
t('R1 K13 complete 22 D25 predicates and 7 candidate identities in 8 bindings',()=>{
 const q=read('queries/K13/legacy-routes.json'),v=read('queries/K13/migration-routes.json');
 assert.equal(pred25.size,22);
 for(const rows of [ledger.splitRoutes,ledger.legacyRoutes.filter(r=>r.status==='SPLIT_OPEN_NAVIGATION_ONLY'),ledger.migrationRows.filter(r=>r.status==='SPLIT_OPEN_NAVIGATION_ONLY'),q.splitRoutes,q.routes.filter(r=>r.status==='SPLIT_OPEN_NAVIGATION_ONLY'),v.rows.filter(r=>r.status==='SPLIT_OPEN_NAVIGATION_ONLY')])exactD25(rows);
 assert.deepEqual(v.rows,ledger.migrationRows);assert.deepEqual(q.splitRoutes,ledger.splitRoutes);
 assert.deepEqual(q.routes.map(({claimRefs,...r})=>r),ledger.legacyRoutes);
});
t('R1 K13 missing swapped or invented D25 routes fail the exact check',()=>{
 for(const change of [
  r=>delete r[0].originalPredicateAnchor,
  r=>r[0].originalPredicateAnchor=r[1].originalPredicateAnchor,
  r=>r[0].d25Predicate.new='K13.08.03.03',
  r=>r.find(x=>x.originalCandidateBindings.length).originalCandidateBindings.pop(),
  r=>r.find(x=>x.originalCandidateBindings.length).originalCandidateBindings[0].sourceD4='K13.02.01.01',
  r=>r[0].equivalence=true
 ]){const r=structuredClone(ledger.splitRoutes);change(r);assert.throws(()=>exactD25(r));}
});
t('R1 four reverse answers explicitly preserve R2b fixed rest and independent denominator conditions',()=>{
 const cases={
 LA05:['.25s','.5s','s1→n1+n2','s1→n1','s2→n3或n2+n3','s3→n4','[1,1.25)','词界策略不变'],
 LA08:['独立音频词识别','表演者自评','文字辅助理解','有效响应分母','不可替代独立音频识别','UNKNOWN'],
 LA15:['空韵边并集','Jaccard=N/A','不默认1','分母为0','单位不可比','UNKNOWN','不能填0'],
 LA18:['不能。','知情表演者评分','文字辅助回答','不得替代独立音频识别','理解指标UNKNOWN','有效响应分母','零分母UNKNOWN']
 };
 for(const [id,parts] of Object.entries(cases)){
  const a=pack.records.find(r=>r.id==='K13-V-'+id+'-RP');assert.ok(a);
  const ans=a.example.expectedResult;
  for(const p of parts)assert.ok(ans.includes(p),id+' RP missing '+p);
  assert.ok(a.explanation.endsWith('本题答案：'+ans));
  const old=ledger.rows.find(r=>r.caseId===id).reverseWitness;
  assert.notEqual(ans,old);
  assert.equal(a.example.frozenWitness,old);
 }
});
console.log(JSON.stringify({module:m,passed:results.length,results},null,2));
