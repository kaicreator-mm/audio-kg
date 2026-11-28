// Finite KC-MC17 fixed proposal. Not a general research or authorization gate.
const exact=(x,y)=>!!x&&!!y&&typeof x==='object'&&typeof y==='object'&&!Array.isArray(x)&&!Array.isArray(y)&&Object.keys(x).length===Object.keys(y).length&&Object.keys(y).every(k=>Object.hasOwn(x,k)&&typeof x[k]==='string'&&x[k].length>0&&x[k]===y[k]);
export function researchGate(s,c,r,flags){
 if(!exact(c,s.baselineIdentity)||!r||!exact(r.identity,c)||r.source!=='synthetic'||r.observed!==false||r.complete!==true)return 'PENDING';
 if(!flags||flags.syntheticOnly!==true||flags.actualParticipants!==false||flags.controlMatched!==true||flags.currentEvidence!==true)return 'PENDING';
 if(['realAudio','clinicalResearch','recording','dataCollection','actualParticipants'].some(k=>Object.hasOwn(flags,k)&&flags[k]!==false))return 'PENDING';
 return 'SYNTHETIC_ANALYSIS_ONLY';
}
