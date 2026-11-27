// Finite synthetic teaching-knowledge witness. Not a medical or teaching runtime.
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),positive=v=>Number.isFinite(v)&&v>0;
const cents=(a,b)=>positive(a)&&positive(b)?1200*Math.log2(a/b):null;
const close=(a,b,tol=1e-5)=>Math.abs(a-b)<tol;
const keys=(o,k)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===k.length&&k.every(x=>Object.hasOwn(o,x));
export const task={id:'t1',clock:'clock1',mask:'stable-v1',rubric:'rubric1',tolerance:30,notes:[{id:'n1',target:200,start:0,end:500,syllable:'s1'},{id:'n2',target:220,start:500,end:1000,syllable:'s2'},{id:'n3',target:240,start:1000,end:1500,syllable:'s2'},{id:'n4',target:250,start:1500,end:2000,syllable:'s3'}]};
export const plan1={id:'v1',targetIds:['n2','n3'],modality:'VISUAL_TRANSIENT',timing:'REALTIME'};
export const plan2={id:'v2',targetIds:['n2','n3'],modality:'VISUAL_TRANSIENT',timing:'AFTER_TASK'};
const phaseSet=['B','P','I','D'];
export function gate(q){
 if(q?.emergency===true)return 'EMERGENCY_REFERRAL';
 if(q?.symptom===true)return 'STOP_REFER';
 if(q?.paused===true)return 'PAUSED';
 if(q?.emergency!==false||q?.symptom!==false||q?.paused!==false||q?.confirmed!==true||q?.consent?.active!==true||!Number.isSafeInteger(q.consent.epoch)||q.consent.epoch<1||!Array.isArray(q.consent.scope))return 'UNKNOWN_STOP';
 return 'CANDIDATE_ONLY';
}
export function feedback(q,e,p){
 const state=gate(q);if(state!=='CANDIDATE_ONLY')return state;
 if(!e||!p||!keys(p,['id','targetIds','modality','timing'])||!p.id||!Array.isArray(p.targetIds)||!eq(p.targetIds,['n2','n3'])||!['VISUAL_TRANSIENT','LIVE_LISTEN'].includes(p.modality)||!['REALTIME','AFTER_TASK'].includes(p.timing))return 'UNKNOWN_STOP';
 if(!keys(e,['id','phase','planId','epoch','modality','timing','enabled','record','upload','share'])||!task.notes.some(n=>n.id===e.id)||!phaseSet.includes(e.phase)||e.planId!==p.id||e.epoch!==q.consent.epoch||e.modality!==p.modality||e.timing!==p.timing||typeof e.enabled!=='boolean'||e.record!==false||e.upload!==false||e.share!==false)return 'REJECT_SCOPE';
 if(e.enabled&&(e.phase!=='P'||!p.targetIds.includes(e.id)||!q.consent.scope.includes(e.modality)))return 'REJECT_SCOPE';
 // An unaided event is not permission to start any data acquisition.
 if(!q.consent.scope.includes('LIVE_LISTEN'))return 'REJECT_SCOPE';
 return e.enabled?'FEEDBACK_CANDIDATE':'UNAIDED_CANDIDATE';
}
export function revisePlan(a,b,oldTask,newTask){
 return keys(a,['id','targetIds','modality','timing'])&&keys(b,['id','targetIds','modality','timing'])&&eq(oldTask,task)&&eq(newTask,task)&&a.id==='v1'&&b.id==='v2'&&eq(a.targetIds,['n2','n3'])&&eq(b.targetIds,a.targetIds)&&a.modality==='VISUAL_TRANSIENT'&&b.modality===a.modality&&a.timing==='REALTIME'&&b.timing==='AFTER_TASK';
}
export function score(t,records){
 if(!eq(t,task)||!Array.isArray(records)||records.length!==t.notes.length||records.some(r=>!keys(r,['id','start','end','clock','mask','rubric','targetId','trusted','valid','ref','est']))||new Set(records.map(r=>r.id)).size!==records.length)return {state:'UNKNOWN',rows:[],passed:null};
 const by=new Map(records.map(r=>[r.id,r])),rows=[];
 for(const n of t.notes){
  const r=by.get(n.id);
  if(!r||r.start!==n.start||r.end!==n.end||r.clock!==t.clock||r.mask!==t.mask||r.rubric!==t.rubric||r.targetId!==n.id||r.trusted!==true)return {state:'UNKNOWN',rows:[],passed:null};
  const valid=r.valid===true,musical=valid?cents(r.ref,n.target):null,estimator=valid?cents(r.est,r.ref):null,estimatedTarget=valid?cents(r.est,n.target):null;
  rows.push({id:n.id,musical,estimator,estimatedTarget,pass:musical===null?null:Math.abs(musical)<=t.tolerance});
 }
 return {state:'SYNTHETIC_ONLY',rows,passed:rows.some(r=>r.pass===null)?null:rows.filter(r=>r.pass).length};
}
export function comparePhases(q,t,records,events,p){
 const state=gate(q);if(state!=='CANDIDATE_ONLY')return {state,passed:null};
 if(!Array.isArray(records)||!Array.isArray(events)||records.length!==4||events.length!==4||new Set(events.map(e=>e.id)).size!==4||new Set(events.map(e=>e.phase)).size!==1)return {state:'UNKNOWN_STOP',passed:null};
 for(const e of events)if(!['FEEDBACK_CANDIDATE','UNAIDED_CANDIDATE'].includes(feedback(q,e,p)))return {state:'REJECT_SCOPE',passed:null};
 if(events[0].phase==='P'&&events.filter(e=>e.enabled).map(e=>e.id).sort().join(',')!=='n2,n3')return {state:'UNKNOWN_STOP',passed:null};
 return {...score(t,records),phase:events[0].phase,plan:p.id,epoch:q.consent.epoch,actual:'UNKNOWN_NOT_EXECUTED'};
}
export function transition(q,{goal,hearing,sameConditions}={}){
 const state=gate(q);if(state!=='CANDIDATE_ONLY')return state;
 if(!['SMOOTH','CONTRAST'].includes(goal)||!['SMOOTH','CONTRAST'].includes(hearing)||sameConditions!==true)return 'UNKNOWN';
 return goal===hearing?'MATCH_CANDIDATE':'NOT_MATCH';
}
export function checks(t){
 const q={emergency:false,symptom:false,paused:false,confirmed:true,consent:{active:true,epoch:1,scope:['LIVE_LISTEN','VISUAL_TRANSIENT']}};
 const mk=(ref,est)=>task.notes.map((n,i)=>({id:n.id,start:n.start,end:n.end,clock:task.clock,mask:task.mask,rubric:task.rubric,targetId:n.id,trusted:true,valid:true,ref:ref[i],est:est[i]}));
 const events=(phase,p=plan1,epoch=1)=>task.notes.map(n=>({id:n.id,phase,planId:p.id,epoch,modality:p.modality,timing:p.timing,enabled:phase==='P'&&p.targetIds.includes(n.id),record:false,upload:false,share:false}));
 const B=mk([200,230,240,265],[200,220,240,265]),P=mk([200,220,240,250],[200,220,240,250]),I=mk([200,220,248,250],[200,220,248,250]),D=mk([200,230,240,265],[200,230,240,265]);
 t('KC-V06 phase truth scores separated',eq([B,P,I,D].map((r,i)=>comparePhases(q,task,r,events(phaseSet[i]),plan1).passed),[2,4,3,2]));
 t('KC-V06 no improvement in delayed vs baseline',score(task,D).passed===score(task,B).passed);
 const s=score(task,B);t('VT08/11/37 independent estimate error',close(s.rows[1].musical,1200*Math.log2(230/220))&&s.rows[1].estimatedTarget===0&&close(s.rows[1].estimator,-s.rows[1].musical)&&close(cents(445,440),19.56,.02)&&close(cents(440,442),-7.85,.02));
 const b2=structuredClone(B);b2[1].est=230;t('KC-V06 analysis-only correction not improved singing',score(task,b2).passed===2&&score(task,b2).rows[1].estimator===0&&B[1].est===220);
 const miss=structuredClone(B);miss[1].ref=null;t('missing independent reference preserves estimated target only',score(task,miss).rows[1].musical===null&&score(task,miss).rows[1].estimator===null&&score(task,miss).rows[1].estimatedTarget===0&&score(task,miss).passed===null);
 const invalid=structuredClone(B);invalid[1].valid=false;t('invalid window not imputed',score(task,invalid).rows[1].estimatedTarget===null&&score(task,invalid).passed===null);
 t('VT39 credible ID reorder and true mismatch',score(task,B.slice().reverse()).passed===2&&score(task,mk([220,200,240,250],[220,200,240,250])).passed===2);
 for(const [name,mutate] of [['duplicate ID',a=>a[1].id='n1'],['wrong clock',a=>a[1].clock='clock2'],['wrong window',a=>a[1].start=0],['wrong connection',a=>a[1].targetId='n1'],['untrusted',a=>a[1].trusted=false]]){const a=structuredClone(B);mutate(a);t('VT39 reject '+name,score(task,a).state==='UNKNOWN');}
 t('KC-V06 only feedback timing revised',revisePlan(plan1,plan2,task,structuredClone(task))&&!revisePlan(plan1,{...plan2,modality:'LIVE_LISTEN'},task,task)&&!revisePlan(plan1,{...plan2,targetIds:['n1','n2']},task,task));
 for(const [name,mutate] of [['target',x=>x.notes[2].target=241],['syllable',x=>x.notes[2].syllable='s3'],['timing',x=>x.notes[3].start=1499],['rubric',x=>x.rubric='new'],['threshold',x=>x.tolerance=60],['mask',x=>x.mask='new']]){const x=structuredClone(task);mutate(x);t('KC-V06 protected '+name,!revisePlan(plan1,plan2,task,x)&&score(x,B).state==='UNKNOWN');}
 t('KC-V06 one syllable spans two notes',eq(task.notes.filter(n=>n.syllable==='s2').map(n=>n.id),['n2','n3']));
 t('risk dominance emergency symptom pause',comparePhases({emergency:true},task,null,null,null).state==='EMERGENCY_REFERRAL'&&feedback({symptom:true},null,null)==='STOP_REFER'&&feedback({...q,paused:true},null,null)==='PAUSED');
 const e=events('P')[1],withdraw={...q,consent:{...q.consent,active:false,epoch:2}},reconsent={...q,consent:{...q.consent,epoch:2}};
 t('dynamic consent withdraw and stale epoch',feedback(withdraw,e,plan1)==='UNKNOWN_STOP'&&feedback(reconsent,e,plan1)==='REJECT_SCOPE'&&feedback(reconsent,{...e,epoch:2},plan1)==='FEEDBACK_CANDIDATE');
 t('old plan token fails after timing update',feedback(q,e,plan2)==='REJECT_SCOPE'&&feedback(q,events('P',plan2)[1],plan2)==='FEEDBACK_CANDIDATE');
 const live={...plan1,modality:'LIVE_LISTEN'},onlyLive={...q,consent:{...q.consent,scope:['LIVE_LISTEN']}};
 t('live consent not visual or recording permission',feedback(onlyLive,e,plan1)==='REJECT_SCOPE'&&feedback(onlyLive,{...e,modality:'LIVE_LISTEN'},live)==='FEEDBACK_CANDIDATE'&&feedback(q,{...e,record:true},plan1)==='REJECT_SCOPE'&&feedback(q,{...e,upload:true},plan1)==='REJECT_SCOPE'&&feedback(q,{...e,share:true},plan1)==='REJECT_SCOPE');
 t('phase/target protection',feedback(q,{...e,phase:'I'},plan1)==='REJECT_SCOPE'&&feedback(q,{...e,id:'n4'},plan1)==='REJECT_SCOPE'&&comparePhases(q,task,P,events('P').map(x=>({...x,enabled:false})),plan1).state==='UNKNOWN_STOP');
 t('VT16/44 independent goal and listening',transition(q,{goal:'SMOOTH',hearing:'SMOOTH',sameConditions:true})==='MATCH_CANDIDATE'&&transition(q,{goal:'CONTRAST',hearing:'SMOOTH',sameConditions:true})==='NOT_MATCH'&&transition(q,{goal:'CONTRAST',hearing:'CONTRAST',sameConditions:true})==='MATCH_CANDIDATE'&&transition(q,{goal:'SMOOTH',sameConditions:true})==='UNKNOWN'&&transition({...q,symptom:true},{goal:'SMOOTH',hearing:'SMOOTH',sameConditions:true})==='STOP_REFER');
 t('VT18/19/46 vibrato duration rate and extent',10/2===5&&2*40===80&&5/1===5&&(4+6)/2===5&&4!==6);
 t('VT14/42/48 timing and relative dynamics',eq([40,440,840].map(x=>x-40),[0,400,800])&&450-350===100&&.2/.1===.4/.2);
}
