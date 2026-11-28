const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const dense=x=>Array.isArray(x)&&Array.from({length:x.length},(_,i)=>Object.hasOwn(x,i)).every(Boolean);
export const same=(a,b)=>{
 if(Array.isArray(b))return dense(a)&&dense(b)&&a.length===b.length&&b.every((v,i)=>same(a[i],v));
 if(obj(b))return obj(a)&&Object.keys(a).length===Object.keys(b).length&&Object.keys(b).every(k=>Object.hasOwn(a,k)&&same(a[k],b[k]));
 return a===b;
};
export function aligned(noteIds,syllables,groups){
 return dense(noteIds)&&dense(syllables)&&dense(groups)&&syllables.length>0&&syllables.length===groups.length&&syllables.every(v=>typeof v==='string'&&v.length>0)&&new Set(syllables).size===syllables.length&&groups.every(g=>dense(g)&&g.length>0&&g.every(v=>typeof v==='string'))&&same(groups.flat(),noteIds);
}
export function gate(s,c,actual,report,flags){
 if(!obj(flags)||flags.permission!==true||flags.epoch!=='E1')return 'STOP_PERMISSION';
 if(!obj(c)||!same(Object.keys(c).sort(),['alignment','baseline','groups','syllables','translation'])||!same(c.baseline,s.baseline)||!same(c.translation,s.candidate.translation)||!same(c.alignment,s.candidate.alignment)||!aligned(s.baseline.noteIds,c.syllables,c.groups))return 'REJECT_HARD';
 // The only current symbolic candidate is the frozen placeholder version.
 if(!same(c.syllables,s.candidate.syllables)||!same(c.groups,s.candidate.groups))return 'PENDING_EVIDENCE';
 if(!same(actual,s.receipt)||!same(report,s.receipt)||['nativeUnderstanding','pronunciation','meaningVerified','musicProtected','toolQualified','independentObservation','safety','syntheticOnly'].some(k=>flags[k]!==true)||flags.actualOutput!==false||['realExecutionRequested','realAuditionRequested','realDeliveryRequested'].some(k=>Object.hasOwn(flags,k)&&flags[k]!==false))return 'PENDING_EVIDENCE';
 return 'SYNTHETIC_CANDIDATE_ONLY';
}
export function rhymeJaccard(a,b){
 if(!dense(a)||!dense(b)||[...a,...b].some(v=>typeof v!=='string'))return null;
 const x=new Set(a),y=new Set(b),u=new Set([...x,...y]);return u.size?[...x].filter(v=>y.has(v)).length/u.size:null;
}
export function syllableDistance(a,b){
 return [a,b].every(n=>Number.isSafeInteger(n)&&n>0)?Math.abs(a-b)/2*(1/a+1/b):null;
}
export function independentRate(r,expected){
 if(!obj(r)||!obj(expected)||['stimulus','population','protocol'].some(k=>typeof expected[k]!=='string'||!expected[k].trim()||!Object.hasOwn(r,k))||r.kind!=='INDEPENDENT_AUDIO_RECOGNITION'||!same(r.stimulus,expected.stimulus)||!same(r.population,expected.population)||!same(r.protocol,expected.protocol)||![r.correct,r.validResponses].every(Number.isSafeInteger)||r.validResponses<=0||r.correct<0||r.correct>r.validResponses)return null;
 return r.correct/r.validResponses;
}
