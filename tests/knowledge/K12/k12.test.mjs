import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {protection,maskGate,receiptGate,finiteGate,modelCardGate,lessonGate} from './finite-witness.mjs';
import assert from 'node:assert/strict';
import {gitBlob,openCandidateReader} from '../../../tools/validate-knowledge.mjs';
const m="K12";
const expected={"rows": 54, "sources": 17, "empty": 0, "legacy": 54, "splits": 8, "roles": 63};
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

const integ=read('cases/K12/integrated-cases.json'),s=integ.scenario,base=s.baseline,positive=s.candidate,identity=s.reportIdentity;
const flags={permission:true,epoch:'E1',local:true,tool:true,version:true,resources:true,quality:true,protection:true,auditionRequested:false,playbackSafety:null,mask:structuredClone(s.mask),voiceIds:[...s.voiceIds]};
const f=(c=positive,actual=identity,report=identity,fl=flags)=>finiteGate(s,c,actual,report,fl);
t('K12 independent exact CQ roles, no support promotion',()=>{
 const direct=new Map(ledger.rows.map(r=>[r.caseId,[]])),support=new Map(ledger.rows.map(r=>[r.caseId,[]]));
 const rows=fs.readFileSync('docs/product/calibration/tools-orchestration-r3-discovery-cq.md','utf8').split('\n');let count=0;
 for(const l of rows){
  if(!/^\| CQ\d{2} \|/.test(l))continue;
  const [q,role,target]=l.split('|').slice(1,-1).map(x=>x.trim());count++;
  const ids=[...target.matchAll(/\[(TO\d{2})\/(K12\.\d{2}\.\d{2}\.\d{2})\]\(/g)].map(x=>{assert.equal(ledger.rows.find(r=>r.caseId===x[1]).d4,x[2]);return x[1]});
  if(role==='O'){assert.equal(ids.length,0);continue;}
  if(target.includes('上表全部54条')){assert.equal(role,'S');assert.equal(ids.length,0);ids.push(...direct.keys());}
  assert.ok(ids.length);
  for(const i of ids)(role==='D'?direct:support).get(i).push(q);
 }
 assert.equal(count,26);
 for(const r of ledger.rows){assert.deepEqual(r.directCQ,direct.get(r.caseId).sort());assert.deepEqual(r.supportCQ,support.get(r.caseId).sort());}
 for(const q of ['CQ13','CQ25'])assert.equal(reader.retrieve(q).rootIds.filter(x=>x.startsWith('K12-')).length,0);
});
t('K12 search leads navigation-only, canonical provenance not promoted',()=>{
 const pr=read('sources/K12/provenance.json').sources;
 const leads=pr.filter(x=>x.formalUse==='SEARCH_LEAD_NAVIGATION_ONLY');
 assert.equal(leads.length,4);
 for(const id of ['S539','S547']){
  assert.ok(leads.some(x=>x.sourceId===id));assert.ok(!pack.records.some(r=>r.type==='Source'&&r.sourceId===id));
  assert.ok(!pack.records.some(r=>r.type==='Evidence'&&r.sources.includes(id+'@1')));
 }
});
t('K12 exact legacy and mixed slot boundaries',()=>{
 assert.equal(ledger.migrationRows.length,62);assert.equal(ledger.splitRoutes.length,8);
 for(const r of ledger.splitRoutes){
  for(const a of [r.anchor,r.g05Anchor,r.originalMigrationAnchor])anchor(a);
  assert.equal(r.status,'SPLIT_OPEN_NAVIGATION_ONLY');assert.equal(r.equivalence,false);
  assert.ok(r.g05Anchor.row.startsWith('| '+r.sourceD4+' |'));
  assert.ok(r.originalMigrationAnchor.row.includes('SPLIT_OPEN'));
  assert.ok(r.routes.length&&r.routes.every(d=>ledger.rows.some(x=>x.d4===d)));
 }
});
t('K12 exact necessary obligations and reference-only edges',()=>{
 const rows=fs.readFileSync('knowledge/K12/relation-authoring.tsv','utf8').trim().split('\n').map(x=>x.split('\t'));
 const edges=pack.edges.filter(e=>['requires','references'].includes(e.type));assert.equal(edges.length,85);
 for(const [caseId,role,target,scope] of rows){
  const to=target.includes('@')?target:'K12-CL-'+target+'@1',from='K12-CL-'+caseId+'@1',type=role==='H'?'requires':'references';
  const e=edges.find(e=>e.from===from&&e.to===to&&e.type===type);assert.ok(e);
  assert.equal(manifest.edgeQualifications.find(q=>q.edge===e.id).scope,scope);
  assert.equal(pack.bindings.filter(b=>b.claim===to&&b.role==='REQUIRES'&&b.view.startsWith('K12-V-'+caseId+'-')).length,role==='H'?4:0);
  assert.equal(manifest.obligations.filter(o=>o.edge===e.id).length,role==='H'?1:0);
 }
 assert.equal(manifest.obligations.length,24);
});
t('K12 full exact integrated sections and source navigation',()=>{
 assert.deepEqual(integ.cases,ledger.integratedCases);assert.deepEqual(s,ledger.integratedScenario);
 assert.deepEqual(integ.cases.map(c=>c.caseId),['EX01','EX02','KC-TO12','RV01','RV02','RV03','RV04']);
 const links=[];
 for(const c of integ.cases){anchor(c.headingAnchor);assert.ok(c.body.length);
  for(const b of c.body){anchor(b.anchor);assert.equal(b.text,b.anchor.row);
   for(const match of b.text.matchAll(/\[(TO\d{2})\/(K12\.\d{2}\.\d{2}\.\d{2})\]\(([^()\s]+)\)/g)){
    const x={caseId:match[1],d4:match[2],label:match[1]+'/'+match[2],uri:match[3]};
    if(!links.some(y=>JSON.stringify(y)===JSON.stringify(x)))links.push(x);
   }
  }
 }
 assert.deepEqual(s.entryLinks,links);
 assert.ok(links.length>0);
 for(const l of links){const r=ledger.rows.find(r=>r.caseId===l.caseId);assert.equal(r.d4,l.d4);assert.equal(l.uri,r.caseAnchor.file.split('/').at(-1)+'#L'+r.caseAnchor.line);}
 for(const a of s.anchors)anchor(a);
});
t('KC-TO12 exact baseline, source, protection and synthetic boundaries',()=>{
 assert.deepEqual(base,{project:'P0',source:'S0',clock:'PPQ480_T120',note:[60,64,67,60],dur:[480,480,480,480],lyrics:['a','b','c','d'],backing:[1,2,3,4],voice:[10,20,30,40],target:'T0',automation:[.4,.6],plugin:'P1/state-A'});
 assert.deepEqual(positive,{...base,project:'P1',target:'T1',voice:[10,71,72,40]});
 assert.deepEqual(s.mask,{source:'S0@rev7',clock:'clk0',coordinate:'SOURCE_INDEX',start:1,end:3});
 assert.deepEqual(s.voiceIds,['u0','u1','u2','u3']);
 assert.deepEqual(identity,{source:'S0',condition:'C0',model:'M1',tool:'G1',host:'H1',format:'F1',permission:'E1',mask:'1:3',clock:'PPQ480_T120',target:'T1',output:'Y1',protocol:'Q1',config:{seed:11,gain:.8,schema:'sch1'},outputDigest:'digestA',outputRev:1});
 assert.equal(s.realRights,'UNKNOWN');assert.equal(s.realExecutionAllowed,false);assert.equal(s.realAuditionAllowed,false);
 assert.equal(f(),'SCOPED_SYNTHETIC_CANDIDATE');
 assert.deepEqual(s.expectedCases.map(c=>c.id),Array.from({length:12},(_,i)=>'C'+(i+1)));
});
for(const c of s.expectedCases)t('KC-TO12 exact bounded candidate '+c.id,()=>{
 const candidate={...positive,...c.change};
 assert.equal(f(candidate),c.expected);assert.equal(protection(s,candidate),c.id==='C1');
 if(c.id!=='C1')assert.equal(f(candidate,identity,identity,{...flags,quality:true}),'REJECT_PROTECTION');
});
t('KC-TO12 permission, evidence and audition distinct gates',()=>{
 for(const change of [{permission:null},{permission:false},{epoch:'E2'},{local:false}])assert.equal(f(positive,identity,identity,{...flags,...change}),'STOP_PERMISSION');
 for(const k of ['tool','version','resources','quality','protection'])assert.equal(f(positive,identity,identity,{...flags,[k]:null}),'PENDING_EVIDENCE');
 assert.equal(f(positive,identity,identity,{...flags,auditionRequested:true,playbackSafety:null}),'STOP_AUDITION');
});
for(const key of Object.keys(identity))t('RV04 report identity changed/missing/replacement '+key,()=>{
 const changed={...identity,[key]:key==='config'?{...identity.config,seed:12}:'changed'};
 const missing={...identity};delete missing[key];
 assert.equal(receiptGate(s,identity,changed),false);assert.equal(receiptGate(s,changed,changed),false);assert.equal(receiptGate(s,identity,missing),false);
 assert.equal(f(positive,identity,changed),'PENDING_EVIDENCE');
});
t('RV04 changed configuration fields and output identity cannot reuse report',()=>{
 for(const [k,v] of Object.entries({seed:12,gain:.7,schema:'sch2'}))assert.equal(receiptGate(s,identity,{...identity,config:{...identity.config,[k]:v}}),false);
 assert.equal(receiptGate(s,identity,{...identity,outputDigest:'digestB'}),false);assert.equal(receiptGate(s,identity,{...identity,outputRev:2}),false);
 assert.equal(receiptGate(s,identity,identity),true);
});
t('RV04 source mask shape, coordinates, identity and outside changes',()=>{
 assert.equal(maskGate(s,s.mask,s.voiceIds,positive.voice),true);
 for(const m of [{start:-1},{end:5},{end:1},{start:1.5},{coordinate:'OUTPUT_INDEX'},{source:'S0@rev8'},{clock:'clk1'}])assert.equal(maskGate(s,{...s.mask,...m},s.voiceIds,positive.voice),false);
 for(const v of [[10,71,72,40,999],[10,71,72],[99,71,72,40],[10,71,72,99]])assert.equal(maskGate(s,s.mask,s.voiceIds,v),false);
 assert.equal(maskGate(s,s.mask,['u0','u2','u1','u3'],positive.voice),false);
});
t('RV01 documented cards have exact frozen identities and seven evidence fields',()=>{
 const cards=s.modelCards;
 assert.equal(cards.musicgen.cardRevision,'4326add9aea0fdd07d62c7bbf789493fc99547f6');
 assert.equal(cards.diffsinger.codeCommit,'4662c53a27a5ac662821eae23a7d71cfcff7356d');assert.equal(cards.diffsinger.package,'0228_opencpop_ds100_rel.zip');
 assert.equal(cards.rows.length,7);for(const r of cards.rows){anchor(r.anchor);assert.ok(r.anchor.row.includes(r.musicgen)&&r.anchor.row.includes(r.diffsinger));}
 anchor(cards.selectionAnchor);assert.equal(cards.musicgen.weightHash,'UNKNOWN');assert.equal(cards.diffsinger.runtime,'UNKNOWN');
 assert.ok(cards.rows.some(r=>r.musicgen.includes('CC-BY-NC4.0')&&r.diffsinger.includes('Opencpop')));
});
t('RV01 bounded documentary selection never actual execution',()=>{
 const {musicgen:mg,diffsinger:ds}=s.modelCards;
 const a={phase:'DOCUMENTED_ONLY',language:'en',referenceAuthorized:true,melodyReference:true,researchUse:true};
 const b={phase:'DOCUMENTED_ONLY',language:'zh',text:'synthetic',notes:[60],durations:[1],aligned:true};
 assert.equal(modelCardGate(mg,a),'DOCUMENTED_CANDIDATE');
 for(const x of [{realVocal:true},{lyricsRequired:true}])assert.equal(modelCardGate(mg,{...a,...x}),'DOCUMENTED_REJECT');
 assert.equal(modelCardGate(ds,b),'DOCUMENTED_CANDIDATE');
 for(const x of [{language:'my'},{targetVoiceRequired:true},{notes:null},{notes:[]},{durations:null},{durations:[]},{durations:[0]},{durations:[1,1]},{aligned:false},{remote:true},{commercial:true}])assert.equal(modelCardGate(ds,{...b,...x}),'DOCUMENTED_PENDING');
 for(const x of [{exactDurationRequired:true},{referenceAuthorized:false},{melodyReference:false},{researchUse:false},{commercial:true},{remote:true}])assert.equal(modelCardGate(mg,{...a,...x}),'DOCUMENTED_PENDING');
 assert.equal(modelCardGate(mg,{...a,phase:'REAL_EXECUTION'}),'PENDING_REAL_EVIDENCE');assert.equal(modelCardGate(ds,{...b,phase:'REAL_EXECUTION'}),'PENDING_REAL_EVIDENCE');
});
t('RV02 PPQ, per-track timeline, format2 and SMPTE drop-frame',()=>{
 const total=480/480*.5+240/480*1;assert.equal(total,1);
 assert.equal(480/(25*40),.48);
 const tracks=[[480],[480]].map(t=>{let n=0;return t.map(x=>(n+=x)/480*.5)});assert.deepEqual(tracks,[[.5],[.5]]);
 const independent=tracks.map((t,i)=>({pattern:'pattern'+i,events:t}));assert.notEqual(independent[0].pattern,independent[1].pattern);
 assert.ok(Math.abs(1200/(30000/1001*40)-1.001)<1e-12);assert.ok(Math.abs(1200/(29*40)-1.001)>.03);
 verify('TO37','FP','1.001s');
});
t('RV03 failure lesson is bounded risk evidence not authorization',()=>{
 const l=s.lesson;anchor(l.anchor);
 assert.deepEqual([l.id,l.status,l.evidence,l.outcome],['L1','REVIEW_PENDING','EV1','STATE_MISSING']);
 const current={...l,evidenceCurrent:true,permissionCurrent:true};assert.equal(lessonGate(l,current),'CONDITIONAL_RISK_CLUE_ONLY');
 for(const k of ['task','source','target','format','plugin','field','scope','permission','evidence'])assert.equal(lessonGate(l,{...current,[k]:'changed'}),'REQUALIFY');
 assert.equal(lessonGate(l,{...current,evidenceCurrent:false}),'REQUALIFY');assert.equal(lessonGate(l,{...current,permissionCurrent:false}),'REQUALIFY');
});
t('TO05/TO32 separate callback block budget and actual runtime',()=>{
 assert.ok(Math.abs(256/48000*1000-5.333333333333333)<1e-9);assert.ok(20>256/48000*1000);
 assert.ok(.7+1.1+1.2>128/48000*1000);
 verify('TO05','FP','5.333ms');verify('TO32','FP','3ms');
});
t('TO12/TO39 preserve source origin and conversion delay',()=>{
 assert.equal(24000/48000*44100,22050);assert.ok(Math.abs((24000/44100-.5)*1000-44.217687)<1e-5);
 assert.equal(2400/48000,.05);assert.equal(120/48000,.0025);
 verify('TO12','FP','22050');verify('TO39','FP','2.5ms');
});
t('TO33/TO34 block offset and stream identity discrimination',()=>{
 assert.deepEqual([0,128,255,256].filter(x=>x>=0&&x<256),[0,128,255]);
 const streams=[{type:'video',i:0},{type:'audio',i:1},{type:'audio',i:2}];
 assert.equal(streams.filter(x=>x.type==='audio')[0].i,1);assert.notEqual(streams[0].i,1);
 verify('TO33','FP','256越界');verify('TO34','FP','index1');
});
t('TO22/TO49 onset vs duration, explicit tempo and units',()=>{
 assert.equal(1.5*480,720);assert.equal(480/480*.5,.5);assert.equal(240/480*.5,.25);
 verify('TO22','FP','onset');verify('TO49','FP','duration=.25');
});
t('TO06 physical gain mapping not same parameter identity',()=>{
 assert.ok(Math.abs(20*Math.log10(.5)-(-6.020599913))<1e-8);verify('TO06','FP','-6.02dB');
});

// W7-R1 adversarial gates: bind actual evidence to final finite verdict.
const modelTaskMG={phase:'DOCUMENTED_ONLY',language:'en',referenceAuthorized:true,melodyReference:true,researchUse:true};
const modelTaskDS={phase:'DOCUMENTED_ONLY',language:'zh',text:'synthetic',notes:[60],durations:[1],aligned:true};
for(const [key,task] of [['musicgen',modelTaskMG],['diffsinger',modelTaskDS]]){
 const card=s.modelCards[key];
 t('R1 RV01 exact '+key+' positive and replacement envelope',()=>{
  assert.equal(modelCardGate(structuredClone(card),task),'DOCUMENTED_CANDIDATE');
  for(const bad of [{...card,extra:'unqualified'},null,{id:card.id}])assert.equal(modelCardGate(bad,task),'DOCUMENTED_PENDING');
 });
 for(const field of Object.keys(card))t('R1 RV01 '+key+' changed/missing identity '+field,()=>{
  const changed={...card,[field]:'other'},missing={...card};delete missing[field];
  assert.equal(modelCardGate(changed,task),'DOCUMENTED_PENDING');
  assert.equal(modelCardGate(missing,task),'DOCUMENTED_PENDING');
  assert.equal(modelCardGate({...changed},structuredClone(task)),'DOCUMENTED_PENDING');
 });
}
t('R1 RV01 DS rejects invalid score-note representation and missing alignment',()=>{
 const card=s.modelCards.diffsinger;
 for(const notes of [[null],[{}],['60'],[NaN],[Infinity],[-1],[128],[60.5],[],null])assert.equal(modelCardGate(card,{...modelTaskDS,notes}),'DOCUMENTED_PENDING');
 for(const delta of [{aligned:false},{aligned:undefined},{durations:[0]},{durations:[Infinity]},{durations:[1,2]},{text:' '},{text:null}])assert.equal(modelCardGate(card,{...modelTaskDS,...delta}),'DOCUMENTED_PENDING');
 const missing={...modelTaskDS};delete missing.aligned;
 assert.equal(modelCardGate(card,missing),'DOCUMENTED_PENDING');
 assert.equal(modelCardGate(card,{...modelTaskDS,notes:[0,127],durations:[1,2]}),'DOCUMENTED_CANDIDATE');
});
t('R1 RV01 documentary hard controls and reference qualification do not inherit',()=>{
 const mg=s.modelCards.musicgen,ds=s.modelCards.diffsinger;
 for(const x of [{targetVoiceRequired:true},{exactNoteRequired:true},{remote:true},{commercial:true},{exactDurationRequired:true},{unknownHardRequirement:true},{referenceAuthorized:null},{targetVoiceRequired:'true'}])assert.equal(modelCardGate(mg,{...modelTaskMG,...x}),'DOCUMENTED_PENDING');
 for(const x of [{referenceRequired:true,referenceAuthorized:false},{referenceRequired:true,referenceAuthorized:true},{referenceRequired:true},{melodyReference:true},{targetVoiceRequired:true},{language:'my'},{exactNoteRequired:true},{exactDurationRequired:true},{commercial:true},{unknownHardRequirement:true}])assert.equal(modelCardGate(ds,{...modelTaskDS,...x}),'DOCUMENTED_PENDING');
 assert.equal(modelCardGate(ds,{...modelTaskDS,referenceAuthorized:false}),'DOCUMENTED_CANDIDATE');
 assert.equal(modelCardGate(mg,{...modelTaskMG,realVocal:true,lyricsRequired:true}),'DOCUMENTED_REJECT');
 for(const [card,task] of [[mg,modelTaskMG],[ds,modelTaskDS]])assert.equal(modelCardGate(card,{...task,phase:'REAL_EXECUTION'}),'PENDING_REAL_EVIDENCE');
});
t('R1 RV04 final verdict binds actual source coordinate and stable IDs',()=>{
 assert.equal(f(),'SCOPED_SYNTHETIC_CANDIDATE');
 const variants=[
  {mask:{...s.mask,source:'S0@rev8'}},{mask:{...s.mask,clock:'clk1'}},{mask:{...s.mask,coordinate:'OUTPUT_INDEX'}},
  {mask:{...s.mask,start:-1}},{mask:{...s.mask,end:5}},{mask:{...s.mask,end:1}},{mask:{...s.mask,start:1.5}},
  {mask:null},{mask:{}},{mask:undefined},{voiceIds:['u0','u2','u1','u3']},{voiceIds:['u0','u1','u2']},
  {voiceIds:['u0','u1','u2','u3','u4']},{voiceIds:['u0','u1','u1','u3']},{voiceIds:null},{voiceIds:undefined}
 ];
 for(const delta of variants){
  const actualFlags={...flags,...delta};
  assert.equal(f(positive,identity,identity,actualFlags),'REJECT_PROTECTION');
  const replacement={...identity,outputDigest:'replacement'};
  assert.equal(f(positive,replacement,replacement,actualFlags),'REJECT_PROTECTION');
  assert.equal(f(positive,identity,identity,{...actualFlags,permission:false}),'STOP_PERMISSION');
 }
 for(const key of ['mask','voiceIds']){
  const missing={...flags};delete missing[key];assert.equal(f(positive,identity,identity,missing),'REJECT_PROTECTION');
 }
 for(const voice of [[10,71,72],[10,71,72,40,999],[99,71,72,40],[10,71,72,99],[10,NaN,72,40]])assert.equal(f({...positive,voice},identity,identity,flags),'REJECT_PROTECTION');
 assert.equal(f(positive,identity,{...identity,outputRev:2},flags),'PENDING_EVIDENCE');
 assert.equal(f(positive,identity,identity,{...flags,auditionRequested:true,playbackSafety:null}),'STOP_AUDITION');
});

t('R1 dense finite inputs and real requests cannot bypass synthetic scope',()=>{
 const ds=s.modelCards.diffsinger,notes=Array(1),durations=Array(1);
 assert.equal(modelCardGate(ds,{...modelTaskDS,notes}),'DOCUMENTED_PENDING');
 assert.equal(modelCardGate(ds,{...modelTaskDS,durations}),'DOCUMENTED_PENDING');
 const voice=[...positive.voice];delete voice[1];
 assert.equal(f({...positive,voice}),'REJECT_PROTECTION');
 assert.equal(maskGate(s,s.mask,s.voiceIds,voice),false);
 assert.equal(f(positive,identity,identity,{...flags,realExecutionRequested:true}),'PENDING_EVIDENCE');
 assert.equal(f(positive,identity,identity,{...flags,realDeliveryRequested:true}),'PENDING_EVIDENCE');
 assert.equal(f(positive,identity,identity,{...flags,realAuditionRequested:true,playbackSafety:true}),'STOP_AUDITION');
});
console.log(JSON.stringify({module:m,passed:results.length,results},null,2));
