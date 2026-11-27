import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {openCandidateReader,gitBlob} from '../../../tools/validate-knowledge.mjs';
import * as w from './performance-witness.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),results=[];
const t=(name,ok)=>{if(!ok)throw Error(name);results.push([name,true]);};
const ref=r=>r.id+'@'+r.revision,root=process.cwd();
const cp='knowledge/K04/controller-input.json',pin='30bf9b44905bd1f0c4e9121261da389293d3adbb';
const input=read(cp),pack=read(input.entries[1].pack),manifest=read(input.entries[1].manifest),ledger=read('cases/K04/frozen-input-ledger.json'),domain=read('knowledge/K04/domain-workflows.json'),roles=read('queries/K04/capability-index.json'),legacy=read('queries/K04/legacy-routes.json'),provenance=read('sources/K04/provenance.json'),frozen=read('ontology/l1-anchor-tree.json'),reader=openCandidateReader(root,input.entries),records=new Map(pack.records.map(r=>[ref(r),r]));
for(const [p,h] of [[cp,pin],['cases/K04/frozen-input-ledger.json','a0d019977ff8a29c91c7cfb751a1f75cef114db9'],['knowledge/K04/domain-workflows.json','a651ceef612b017477abab1ca5898cf9c6c53e62']])t('exact pin '+p,gitBlob(fs.readFileSync(p))===h);
const cache=new Map();function anchor(a){if(!a||a.commit!==frozen.commit)return false;if(!cache.has(a.file)){const b=fs.readFileSync(a.file),h=frozen.paths[a.file]||spawnSync('git',['rev-parse',frozen.commit+':'+a.file],{encoding:'utf8'}).stdout.trim();if(gitBlob(b)!==h)throw Error('frozen '+a.file);cache.set(a.file,{h,lines:b.toString().split('\n')});}const p=cache.get(a.file);return p.h===a.blob&&p.lines[a.line-1]===a.row;}
const byD=new Map(ledger.rows.map(r=>[r.d4,r]));
t('60 primary candidate rows, no acceptance',pack.inventory.length===60&&pack.records.length===514&&reader.summary().acceptedClaims===0&&reader.summary().counts.claims===192);
for(const row of ledger.rows){
 const inv=pack.inventory.find(i=>i.d4===row.d4),id='K04-CL-'+row.caseId+'@1',out=reader.retrieve(row.d4),c=out.claims.find(x=>x.ref===id);
 t('exact frozen row and source anchors '+row.caseId,anchor(row.discovery)&&anchor(row.caseAnchor)&&row.sourceRoutes.every(s=>anchor(s.anchor)&&anchor(s.qualifiedSourceAnchor)));
 t('exact query and direct roles '+row.caseId,inv?.disposition==='CANDIDATE'&&eq(out.rootIds,[id])&&eq(reader.retrieve(id).rootIds,[id])&&eq([...c.cq].sort(),[...row.directCQ].sort())&&c.statement!==row.predicate&&c.applicability==='CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL');
 t('qualified source and H closure '+row.caseId,c.evidence.length>0&&c.evidence.every(e=>anchor(e.anchor)&&e.sources.every(s=>anchor(s.anchor)&&s.rights==='UNKNOWN_NO_IMPORT'&&s.qualification.scope&&s.qualification.limits))&&c.relations.filter(e=>e.type==='requires').every(e=>e.required&&!e.logicalConverse&&out.claims.some(x=>x.ref===e.to)));
 const views=c.cases.filter(v=>v.binding.role==='PRIMARY_TARGET'&&v.view.example.frozenCase===row.caseId);
 t('four distinct cases '+row.caseId,views.length===4&&new Set(views.map(v=>v.view.question)).size===4&&new Set(views.map(v=>v.view.direction+'_'+v.view.polarity)).size===4);
 for(const v of views){const x=v.view,e=x.example;const expected=row[{FORWARD_POSITIVE:'forwardExpected',FORWARD_NEGATIVE:'forwardNegative',REVERSE_POSITIVE:'reverseWitness',REVERSE_NEGATIVE:'reverseBoundary'}[x.direction+'_'+x.polarity]];
 t('actual direction-specific case '+x.id,anchor(e.anchor)&&e.frozenWitness===expected&&e.directionSpecificProblem===x.question&&e.expectedResult!==x.question&&e.reasoningBasis&&x.explanation!==expected&&x.evidenceKind==='SYNTHETIC_EXPECTED_NOT_OBSERVED'&&(x.polarity==='NEGATIVE'?e.witnessRole==='NEGATIVE_INPUT_OR_BOUNDARY_NOT_FACT'&&e.expectedResult.startsWith('REJECT')&&e.reasoningBasis!==expected:x.explanation.includes(e.expectedResult))&&reader.caseToClaims(ref(x)).some(b=>b.claim===id&&b.role==='PRIMARY_TARGET'));
 }
}
for(let n=1;n<=26;n++){const cq='CQ'+String(n).padStart(2,'0'),expected=ledger.rows.filter(r=>r.directCQ.includes(cq)).map(r=>'K04-CL-'+r.caseId+'@1');t('direct-only '+cq,eq(reader.retrieve(cq).rootIds.filter(id=>id.startsWith('K04-')).sort(),expected.sort()));}
t('legacy/split preserved, not equivalence',legacy.routes.length===48&&legacy.splitRoutes.length===3&&legacy.routes.every(r=>anchor(r.anchor)&&!r.equivalence&&r.claimRefs.every(id=>records.has(id)))&&legacy.splitRoutes.every(r=>anchor(r.anchor)&&r.status==='SPLIT_OPEN_NAVIGATION_ONLY'));
t('exact 56 capability cells',roles.roles.length===56&&new Set(roles.roles.map(r=>r.d2+r.ability)).size===56&&roles.roles.every(r=>anchor(r.anchor)&&r.externalStatus==='UNKNOWN_NOT_EXECUTED'&&r.claimRefs.every(id=>records.has(id))&&r.localWitnesses.every(v=>records.has(v.claim)&&v.problem&&v.reject)));
t('34 source qualifications no imported rights',provenance.sources.length===34&&manifest.sourceQualifications.length===34&&provenance.sources.every(s=>anchor(s.anchor)&&records.get(s.sourceId+'@1')?.rights==='UNKNOWN_NO_IMPORT'&&s.uses.every(u=>anchor(u.discovery)&&anchor(u.originalQualification))));
t('18 H 29 O four actual K01 dependencies',pack.edges.filter(e=>e.type==='requires').length===18&&pack.edges.filter(e=>e.type==='references').length===29&&pack.edges.filter(e=>e.type==='requires'&&e.to.startsWith('K01-')).length===4&&manifest.obligations.length===18);
const known=x=>x.state==='KNOWN_VALID',unknown=x=>x.state==='MISSING_EVIDENCE',reject=x=>x.state==='INVALID_CONSTRAINT';
const times=a=>a.map((ms,i)=>({id:'e'+i,ms}));
const a=times([0,500,1000,1500,2000,2500,3000,3500]),v1=times([20,520,1040,1580,2020,2520,3020,3520]),v2=times([20,520,1025,1528,2020,2520,3020,3520]);
const path={calibrated:true,sameClock:true,pathDirection:'B_TO_A',receiver:'A',eventA:'e3',eventB:'e3',receivedEvent:'e3',a:1000,b:1010,received:1060,delay:50,target:10,tolerance:5};
const health={symptom:false,hearingRisk:false},capacity={bpm:120,attacksPerBeat:4,confirmedRate:10,sameConditions:true};
const events=[{id:'n1',pitch:'C5',start:0,duration:1,mark:'pizz'},{id:'n2',pitch:'D5',start:1,duration:1,mark:'arco'},{id:'n3',pitch:'E5',start:2,duration:1}];
t('PF01 actual action switching keeps score',eq(w.actionState(events).value.map(e=>e.action),['PLUCK','BOW','BOW'])&&eq(w.actionState(events).value.map(e=>e.pitch),['C5','D5','E5'])&&unknown(w.actionState(events.slice(2))));
t('PF03 finite attacks and capacity',w.capacity(capacity).value===8&&reject(w.capacity({...capacity,confirmedRate:6}))&&unknown(w.capacity({...capacity,sameConditions:false})));
t('PF19/PF48 symptom stop dominates missing inputs',w.healthGate({symptom:true}).state==='KNOWN_HEALTH_RISK'&&w.healthGate({hearingRisk:true}).state==='KNOWN_HEALTH_RISK'&&unknown(w.healthGate({symptom:false})));
t('PF05 actual tempo and declared beat unit',eq(w.beatRate([500,600,750],'quarter').value.rates,[120,100,80])&&unknown(w.beatRate([500],undefined)));
t('PF06 shared tempo drift not local offset',eq(w.roleResidual(times([0,500,1100,1800]),times([0,500,1100,1800]),0,0).value.differences,[0,0,0,0]));
t('PF09/PF22 residuals exact synthetic before and after',eq(w.roleResidual(a,v1,20,15).value.residual,[0,0,20,60,0,0,0,0])&&!w.roleResidual(a,v1,20,15).value.all&&eq(w.roleResidual(a,v2,20,15).value.residual,[0,0,5,8,0,0,0,0])&&w.roleResidual(a,v2,20,15).value.all);
t('PF22 mismatched or duplicate identity no inference',unknown(w.roleResidual(a,v2.map((x,i)=>i===2?{...x,id:'wrong'}:x),20,15))&&unknown(w.roleResidual([{id:'a',ms:0},{id:'a',ms:1}],[{id:'a',ms:0},{id:'a',ms:1}],0,0)));
t('PF11 gain preserves relative not actual performance',eq(w.gainCompare({sameTake:true,clipped:false,a:[1,2,4],b:[2,4,8]}).value,{gain:2,relative:[2,2],performanceChanged:'UNKNOWN_NOT_INFERRED'})&&unknown(w.gainCompare({sameTake:false,clipped:false,a:[1,2],b:[2,4]})));
t('PF26 monotonic only when stipulated',reject(w.dynamicTrajectory({amplitudes:[1,3,2],monotonic:true,sameChain:true}))&&known(w.dynamicTrajectory({amplitudes:[1,3,2],monotonic:false,sameChain:true})));
t('PF12 distinct duration and gap',w.articulation({ioi:500,duration:200}).value.gap===300&&reject(w.articulation({ioi:500,duration:200,maxDuration:150})));
t('PF29/PF41 exact release time',w.release({bpm:120,onset:1000,beats:2,unit:'quarter',extraBeats:1}).value===2500);
const motif={original:[{pitch:'C',duration:1},{pitch:'D',duration:1}],candidate:[{pitch:'E',duration:1},{pitch:'F',duration:1}],requireRhythm:true,requirePitchChange:true};
t('PF32/PF55 rhythm preserved and pitch changed',known(w.motif(motif))&&reject(w.motif({...motif,candidate:motif.original}))&&reject(w.motif({...motif,candidate:[{pitch:'E',duration:2},{pitch:'F',duration:1}]})));
const preference={ratings:['a','b','c'],required:3,tradeoff:'stated local task'};
t('PF35 preferences require full conditions',known(w.preference(preference))&&unknown(w.preference({...preference,ratings:['a','b']})));
const shared={leader:times([0,500]),follower:[{id:'e0',ms:0,kind:'MAIN'},{id:'sub',ms:250,kind:'SUB'},{id:'e1',ms:500,kind:'MAIN'}]};
t('PF57 matched main IDs allow additional subevent',w.sharedIDs(shared).value.all&&reject(w.sharedIDs({...shared,follower:shared.follower.slice(0,2)})));
t('PF39 exact calibrated source and receive difference',eq(w.pathSeparation(path).value,{source:10,arrival:60,residual:0,sourcePass:true,technicalRepair:'NOT_EXECUTED'}));
for(const [k,v] of Object.entries({calibrated:false,sameClock:false,pathDirection:'A_TO_B',receiver:'B',eventB:'other',receivedEvent:'other',delay:undefined}))t('PF39 missing/mismatched evidence '+k,unknown(w.pathSeparation({...path,[k]:v})));
t('PF39 inconsistent independently measured path rejects',reject(w.pathSeparation({...path,delay:40})));
const budget={budget:23,minutes:[5,10,8],includesRetest:true};t('PF43 real budget 23 vs 28',w.rehearsalBudget(budget).value===23&&reject(w.rehearsalBudget({...budget,minutes:[10,10,8]}))&&unknown(w.rehearsalBudget({...budget,includesRetest:false})));
const prior={scoreVersion:'v3',bpm:120,eventIdentity:'e',reference:'r',capture:'c'},retest={prior,current:{...prior},actualRetest:true};
t('PF44 old evidence invalid after tempo change',known(w.retest(retest))&&reject(w.retest({...retest,current:{...prior,bpm:80}}))&&unknown(w.retest({...retest,actualRetest:false})));
const base=structuredClone(w.baseline),candidate=structuredClone(base);candidate.cues[0].payload='revised-beat3';candidate.cues[1].payload='revised-beat4';
const edit={baseline:base,candidate,authorization:true,independentlyRealizable:true},before=JSON.stringify(base);
t('KC-P04 coincident timestamps distinct cue objects',base.cues[1].ms===base.cues[2].ms&&eq(w.protectedCue(edit).value.changed,['c13','c14'])&&JSON.stringify(base)===before);
for(const [name,mutate] of [['protected prep',c=>c.cues[2].payload='wrong'],['cross cue payload',c=>c.cues[0].payload='revised-beat4'],['score',c=>c.score[4].p2='D3'],['entry',c=>c.protectedEntry.ms=1990],['metadata',c=>c.monitorVersion='v2'],['duplicate id',c=>c.cues[2].id='c14'],['extra field',c=>c.cues[0].newField=true]]){const c=structuredClone(candidate);mutate(c);t('KC-P04 rejects '+name,reject(w.protectedCue({...edit,candidate:c})));}
const local=structuredClone(candidate);local.cues[1]=structuredClone(base.cues[1]);
t('KC-P04 nonseparable fallback only beat3',reject(w.protectedCue({...edit,independentlyRealizable:false}))&&eq(w.protectedCue({...edit,candidate:local,independentlyRealizable:false}).value.changed,['c13'])&&unknown(w.protectedCue({...edit,authorization:false})));
const monitor={oldVersion:'v1',newVersion:'v2',sourceIdentity:'take1',responsibleConfirmed:true};
t('PF60 monitor revision invalidates only old monitor evidence',eq(w.monitorRevision(monitor).value,{sourceHistory:'take1',oldMonitorEvidence:'INVALIDATED',currentActualEvidence:'UNKNOWN_NOT_EXECUTED'}));
const live={authorization:true,monitor:true,scoreVersionConfirmed:true,visible:true};
const wfInputs={ACTION:{health,capacity,events},TIME:{ioi:[500,600],unit:'quarter',a,b:v2,target:20,tol:15},DYNAMICS:{gain:{sameTake:true,clipped:false,a:[1,2],b:[2,4]},dynamic:{amplitudes:[1,2],monotonic:true,sameChain:true}},ARTICULATION:{articulation:{ioi:500,duration:200},release:{bpm:120,onset:0,beats:2,unit:'quarter',extraBeats:0}},IMPROVISE:{motif,preference},ENSEMBLE:{shared,path},REHEARSE:{budget,retest},LIVE:{health,live,edit,monitor}};
t('eight bounded workflows all linked',domain.workflows.length===8&&domain.workflows.every(f=>f.steps.length&&f.steps.every(s=>s.claims.every(id=>records.has(id)))));
for(const [id,x] of Object.entries(wfInputs)){const out=w.replay(domain,'K04-WF-'+id,x);t('actual workflow '+id,out.outcome==='BOUNDED_CANDIDATE'&&out.actual==='UNKNOWN_NOT_EXECUTED');for(const key of Object.keys(x)){const o=w.replay(domain,'K04-WF-'+id,{...x,[key]:undefined});t('missing workflow '+id+' '+key,o.outcome!=='BOUNDED_CANDIDATE');}}
t('health stop first even absent later inputs',w.replay(domain,'K04-WF-LIVE',{health:{hearingRisk:true}}).outcome==='STOP_AND_REFER');
for(const r of domain.stateRules)t('state rule '+r.from+' '+r.event,w.transition(domain,r.from,r.event)===r.to);
t('unsupported state transition remains unknown',w.transition(domain,'DRAFT','ADOPT')==='UNKNOWN_UNSUPPORTED_TRANSITION');
const cli=spawnSync('node',['tools/validate-knowledge.mjs',cp,pin,'K04-CL-PF39@1'],{encoding:'utf8'});t('actual public CLI',cli.status===0&&JSON.parse(cli.stdout).rootIds.includes('K04-CL-PF39@1'));
console.log(JSON.stringify({checks:results.length,passed:results.length,results,limits:'Finite offline candidate witnesses; no actual performance, permission, clinical or device result; no independent verdict.'},null,2));
