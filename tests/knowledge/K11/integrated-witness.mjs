// Finite KC-A11 discriminator only. No real model, audio, permission or delivery.
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const sameKeys=(x,y)=>object(x)&&Object.keys(x).length===Object.keys(y).length&&Object.keys(y).every(k=>Object.hasOwn(x,k));
export function finiteGate(s,c,identity,report,flags){
 if(!flags||flags.permission==='WITHDRAWN')return flags?.permission==='WITHDRAWN'?'STOP':'PENDING';
 const b=s.baseline;
 if(!sameKeys(c,b)||['work','originalTarget','target','melody','lyrics','noteBeats','bpm','clock','duration','backing','mask'].some(k=>!eq(c[k],b[k]))||
 !Array.isArray(c.voice)||c.voice.length!==b.voice.length||!c.voice.every(Number.isFinite)||
 c.voice.some((v,i)=>(i<b.mask[0]||i>=b.mask[1])&&v!==b.voice[i]))return 'REJECT_PROTECTION';
 const fixed=s.reportIdentity;
 const exact=(x,y)=>sameKeys(x,y)&&Object.keys(y).every(k=>eq(x[k],y[k]));
 if(!exact(identity,fixed)||!report||!exact(report.identity,identity)||report.synthetic!==true||report.complete!==true||report.observed!==false)return 'PENDING_REVALIDATION';
 if(flags.permission!=='CURRENT_SYNTHETIC_ONLY'||flags.version!=='KNOWN_SYNTHETIC'||flags.resources!=='KNOWN_SYNTHETIC'||flags.quality!=='KNOWN_SYNTHETIC')return 'PENDING';
 return 'FINITE_CANDIDATE_ONLY';
}
export function playbackGate(s,flags){
 if(flags?.permission==='WITHDRAWN')return 'STOP';
 return 'REAL_PLAYBACK_NOT_ALLOWED'; // Even stipulated synthetic flags cannot authorize playback.
}
