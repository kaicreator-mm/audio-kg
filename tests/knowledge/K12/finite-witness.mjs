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
 return Array.isArray(c.voice)&&c.voice.length===b.voice.length&&Array.from(c.voice).every((v,i)=>Number.isFinite(v)&&(i>=1&&i<3||v===b.voice[i]));
}
export function maskGate(s,mask,ids,voice){
 const b=s.baseline.voice;
 return obj(mask)&&eq(mask,s.mask)&&Number.isInteger(mask.start)&&Number.isInteger(mask.end)&&mask.start>=0&&mask.start<mask.end&&mask.end<=b.length&&eq(ids,s.voiceIds)&&Array.isArray(voice)&&voice.length===b.length&&Array.from(voice).every((v,i)=>Number.isFinite(v)&&(i>=mask.start&&i<mask.end||v===b[i]));
}
export function receiptGate(s,actual,report){
 return eq(actual,s.reportIdentity)&&eq(report,s.reportIdentity);
}
export function finiteGate(s,c,identity,report,flags){
 if(!flags||flags.permission!==true||flags.epoch!=='E1'||flags.local!==true)return 'STOP_PERMISSION';
 // Actual evidence must come from the candidate envelope, never from the expected scenario.
 if(!protection(s,c)||!maskGate(s,flags.mask,flags.voiceIds,c.voice))return 'REJECT_PROTECTION';
 if(!receiptGate(s,identity,report)||['tool','version','resources','quality','protection'].some(k=>flags[k]!==true))return 'PENDING_EVIDENCE';
 if(flags.realAuditionRequested===true||(flags.auditionRequested===true&&flags.playbackSafety!==true))return 'STOP_AUDITION';
 if(flags.realExecutionRequested===true||flags.realDeliveryRequested===true)return 'PENDING_EVIDENCE';
 return 'SCOPED_SYNTHETIC_CANDIDATE';
}
// RV01: frozen documentary subject, not runtime capability or rights.
const fixedCards={
 'MC-MG':{id:'MC-MG',model:'facebook/musicgen-melody',cardRevision:'4326add9aea0fdd07d62c7bbf789493fc99547f6',source:'S550',documentedMode:'TEXT_CHROMA',weightHash:'UNKNOWN',runtime:'UNKNOWN',referenceUse:'UNKNOWN',lyricsControl:'NOT_DOCUMENTED',realVocal:'DOCUMENTED_LIMITATION'},
 'MC-DS':{id:'MC-DS',model:'DiffSinger MIDI SVS B',codeCommit:'4662c53a27a5ac662821eae23a7d71cfcff7356d',package:'0228_opencpop_ds100_rel.zip',source:'S551',documentedMode:'CHINESE_SCORE',weightHash:'UNKNOWN',runtime:'UNKNOWN',referenceUse:'UNKNOWN',myanmar:'UNKNOWN'}
};
const taskFields=new Set(['phase','language','referenceAuthorized','melodyReference','researchUse','commercial','realVocal','lyricsRequired','targetVoiceRequired','referenceRequired','exactDurationRequired','remote','exactNoteRequired','text','notes','durations','aligned']);
const boolFields=['referenceAuthorized','melodyReference','researchUse','commercial','realVocal','lyricsRequired','targetVoiceRequired','referenceRequired','exactDurationRequired','remote','exactNoteRequired','aligned'];
export function modelCardGate(card,task){
 if(!obj(task)||task.phase!=='DOCUMENTED_ONLY')return 'PENDING_REAL_EVIDENCE';
 if(!obj(card)||!Object.hasOwn(fixedCards,card.id)||!eq(card,fixedCards[card.id]))return 'DOCUMENTED_PENDING';
 if(Object.keys(task).some(k=>!taskFields.has(k))||boolFields.some(k=>Object.hasOwn(task,k)&&typeof task[k]!=='boolean'))return 'DOCUMENTED_PENDING';
 if(card.id==='MC-MG'&&(task.realVocal===true||task.lyricsRequired===true))return 'DOCUMENTED_REJECT';
 if(task.commercial===true||task.remote===true||task.targetVoiceRequired===true||task.exactDurationRequired===true||task.exactNoteRequired===true)return 'DOCUMENTED_PENDING';
 if(card.id==='MC-MG'){
  if(task.language!=='en'||task.referenceAuthorized!==true||task.melodyReference!==true||task.researchUse!==true)return 'DOCUMENTED_PENDING';
  return 'DOCUMENTED_CANDIDATE';
 }
 if(card.id==='MC-DS'){
  if(task.language!=='zh'||task.referenceRequired===true||task.melodyReference===true)return 'DOCUMENTED_PENDING';
  // Bounded synthetic score: integer MIDI notes 0..127, finite positive durations, equal arrays and explicit alignment.
  // No claim about parsing native DiffSinger word/phoneme syntax.
  if(typeof task.text!=='string'||!task.text.trim()||!Array.isArray(task.notes)||!task.notes.length||!Array.from(task.notes).every(n=>Number.isInteger(n)&&n>=0&&n<=127)||!Array.isArray(task.durations)||task.durations.length!==task.notes.length||!Array.from(task.durations).every(x=>Number.isFinite(x)&&x>0)||task.aligned!==true)return 'DOCUMENTED_PENDING';
  return 'DOCUMENTED_CANDIDATE';
 }
 return 'DOCUMENTED_PENDING';
}
export function lessonGate(lesson,current){
 const keys=['task','source','target','format','plugin','field','scope','permission','evidence'];
 if(!current||lesson.status!=='REVIEW_PENDING'||keys.some(k=>!Object.hasOwn(current,k)||current[k]!==lesson[k])||current.evidenceCurrent!==true||current.permissionCurrent!==true)return 'REQUALIFY';
 return 'CONDITIONAL_RISK_CLUE_ONLY';
}
