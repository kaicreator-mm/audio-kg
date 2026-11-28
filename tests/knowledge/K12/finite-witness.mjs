// Finite synthetic knowledge-case discriminators; never execute tools or authorize actual work.
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const eq=(a,b)=>{
 if(Array.isArray(b))return Array.isArray(a)&&a.length===b.length&&b.every((v,i)=>eq(a[i],v));
 if(obj(b))return obj(a)&&Object.keys(a).length===Object.keys(b).length&&Object.keys(b).every(k=>Object.hasOwn(a,k)&&eq(a[k],b[k]));
 return a===b;
};
export function protection(s,c){
 const b=s.baseline,expected=s.candidate;
 if(!obj(c)||Object.keys(c).length!==Object.keys(b).length||Object.keys(b).some(k=>!Object.hasOwn(c,k)))return false;
 if(Object.keys(b).filter(k=>k!=='voice').some(k=>!eq(c[k],expected[k])))return false;
 return Array.isArray(c.voice)&&c.voice.length===b.voice.length&&c.voice.every((v,i)=>Number.isFinite(v)&&(i>=1&&i<3||v===b.voice[i]));
}
export function maskGate(s,mask,ids,voice){
 const b=s.baseline.voice;
 return obj(mask)&&eq(mask,s.mask)&&Number.isInteger(mask.start)&&Number.isInteger(mask.end)&&mask.start>=0&&mask.start<mask.end&&mask.end<=b.length&&eq(ids,s.voiceIds)&&Array.isArray(voice)&&voice.length===b.length&&voice.every((v,i)=>Number.isFinite(v)&&(i>=mask.start&&i<mask.end||v===b[i]));
}
export function receiptGate(s,actual,report){
 return eq(actual,s.reportIdentity)&&eq(report,s.reportIdentity);
}
export function finiteGate(s,c,identity,report,flags){
 if(!flags||flags.permission!==true||flags.epoch!=='E1'||flags.local!==true)return 'STOP_PERMISSION';
 if(!protection(s,c))return 'REJECT_PROTECTION';
 if(!receiptGate(s,identity,report)||['tool','version','resources','quality','protection'].some(k=>flags[k]!==true))return 'PENDING_EVIDENCE';
 if(flags.auditionRequested===true&&flags.playbackSafety!==true)return 'STOP_AUDITION';
 return 'SCOPED_SYNTHETIC_CANDIDATE';
}
export function modelCardGate(card,task){
 if(!task||task.phase!=='DOCUMENTED_ONLY')return 'PENDING_REAL_EVIDENCE';
 if(card.id==='MC-MG'){
  if(task.realVocal||task.lyricsRequired)return 'DOCUMENTED_REJECT';
  if(task.language!=='en'||task.referenceAuthorized!==true||task.melodyReference!==true||task.researchUse!==true||task.commercial===true||task.exactDurationRequired||task.remote||task.exactNoteRequired)return 'DOCUMENTED_PENDING';
  return 'DOCUMENTED_CANDIDATE';
 }
 if(card.id==='MC-DS'){
  if(task.language!=='zh'||task.targetVoiceRequired||task.remote||task.exactDurationRequired||task.commercial===true)return 'DOCUMENTED_PENDING';
  if(typeof task.text!=='string'||!task.text.trim()||!Array.isArray(task.notes)||!task.notes.length||!Array.isArray(task.durations)||task.durations.length!==task.notes.length||!task.durations.every(x=>Number.isFinite(x)&&x>0)||task.aligned!==true)return 'DOCUMENTED_PENDING';
  return 'DOCUMENTED_CANDIDATE';
 }
 return 'DOCUMENTED_PENDING';
}
export function lessonGate(lesson,current){
 const keys=['task','source','target','format','plugin','field','scope','permission','evidence'];
 if(!current||lesson.status!=='REVIEW_PENDING'||keys.some(k=>!Object.hasOwn(current,k)||current[k]!==lesson[k])||current.evidenceCurrent!==true||current.permissionCurrent!==true)return 'REQUALIFY';
 return 'CONDITIONAL_RISK_CLUE_ONLY';
}
