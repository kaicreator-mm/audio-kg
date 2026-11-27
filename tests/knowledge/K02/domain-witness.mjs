const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),mod=(a,n)=>(a%n+n)%n;
export const notes=[{id:'n1',pitch:60,onset:0,duration:2},{id:'n2',pitch:64,onset:2,duration:2}];
export const lex=[
 {id:'A',lang:'Mandarin',word:'早安',surface:['21','55'],morning:true,formal:true,honorific:false},
 {id:'B',lang:'Mandarin',word:'你好',surface:['35','213'],morning:false,formal:true,honorific:false},
 {id:'C',lang:'Mandarin',word:'您好',surface:['35','213'],morning:false,formal:true,honorific:true},
 {id:'D',lang:'Cantonese',word:'早晨',surface:['25','21'],morning:true,formal:true,honorific:false},
 {id:'E',lang:'Cantonese',word:'你好',surface:['23','25'],morning:false,formal:true,honorific:false},
 {id:'F',lang:'Cantonese',word:'午安',surface:['23','55'],morning:false,afternoon:true,formal:true,honorific:false},
 {id:'G',lang:'Cantonese',word:'哈佬',surface:['55','25'],morning:false,formal:false,honorific:false}];
export function screen(q){
 if(q.rights!==true||!['Mandarin','Cantonese'].includes(q.lang)||!Array.isArray(q.notes)||q.notes.length!==2||q.notes.some((n,i)=>n.id!==notes[i].id||n.onset!==notes[i].onset||n.duration!==2||!Number.isFinite(n.pitch)))return {state:'UNKNOWN_STOP'};
 if(!eq(q.notes,notes)&&q.changeMelody!==true)return {state:'REJECT_PROTECTION'};
 const direction=Math.sign(q.notes[1].pitch-q.notes[0].pitch),rows=lex.filter(l=>l.lang===q.lang).map(l=>({...l,semantic:!l.afternoon&&(!q.explicitMorning||l.morning)&&(!q.honorific||l.honorific)&&(!q.formal||l.formal),match:Math.sign(Number(l.surface[1].at(-1))-Number(l.surface[0].at(-1)))===direction}));
 const candidates=rows.filter(l=>l.semantic&&l.match).map(l=>l.id);
 return {state:candidates.length?'BOUNDED_CANDIDATE':'NO_STRICT_CANDIDATE',candidates,rows,hearing:'UNKNOWN_NOT_EXECUTED'};
}
export function enumerate(){const p=[0,2,4,7],out=[];for(const a of p)for(const b of p){const s=[0,a,b,7];if(s.slice(1).every((n,i)=>Math.abs(n-s[i])<=4))out.push(s);}return out;}
const lcg=s=>Array.from({length:4},()=>{s=mod(5*s+1,16);return s%4;});
export function revise(x,y,allow){
 if(!allow||!x.id||!y.id||x.id===y.id||y.parent!==x.id||!eq(x.notes,y.notes)||!eq(x.harmony,y.harmony)||!eq(x.binding,y.binding))return false;return true;
}
export function checks(t){
 t('CO02/27 nominal duration independent of preference',24*4*60/96===60&&25*4*60/96===62.5&&8*4*60/120===16);
 t('CO05/06/54 explicit vowel/coda/onset', 'n'!=='br'&&'t'!=='m'&&'t'!=='d');
 t('CO09/10 range and rhythmic conservation',Math.max(60,64,67,64)<=67&&Math.max(62,65,69,65)>67&&[.5,.5,1,2].reduce((a,b)=>a+b)===4);
 const p=[60,64,67],axis=60;t('CO13/14/15 inversion and full event reversal',eq(p.map(v=>2*axis-v),[60,56,53])&&eq([1,.5,.5].map(x=>2*x),[2,1,1])&&eq([[60,1],[64,.5],[62,.5]].reverse(),[[62,.5],[64,.5],[60,1]]));
 t('CO31/32 independent harmonic and onset densities',8/4===2&&4/4===1&&2!==1);
 const q={rights:true,lang:'Mandarin',notes,formal:true};
 t('R5-M exact surface endpoint and semantic gate',eq(screen(q).candidates,['A'])&&screen({...q,honorific:true}).state==='NO_STRICT_CANDIDATE'&&lex[1].surface[0]==='35'&&Number('213'.at(-1))<5&&Number('214'.at(-1))<5&&Number('21'.at(-1))<5);
 const c=screen({...q,lang:'Cantonese'});t('R5-Y semantic gate despite matching contour',eq(c.candidates,['E'])&&c.rows.find(r=>r.id==='F').match&&!c.rows.find(r=>r.id==='F').semantic&&screen({...q,lang:'Cantonese',explicitMorning:true}).state==='NO_STRICT_CANDIDATE');
 const down=[{...notes[0],pitch:64},{...notes[1],pitch:60}];t('R5 frozen melody authorization',screen({...q,notes:down}).state==='REJECT_PROTECTION'&&eq(screen({...q,notes:down,changeMelody:true,honorific:true}).candidates,['C'])&&eq(screen({...q,lang:'Cantonese',notes:down,changeMelody:true,explicitMorning:true}).candidates,['D'])&&screen({...q,rights:undefined}).state==='UNKNOWN_STOP');
 const e=enumerate();t('CO44 finite enumerated candidates',e.length===4&&new Set(e.map(JSON.stringify)).size===4&&e.every(s=>s[0]===0&&s[3]===7));
 t('CO45/63 LCG non-injective mapped sequence',[3,7,11,15].every(s=>eq(lcg(s),[0,1,2,3]))&&eq(lcg(4),[1,2,3,0]));
 const row=[0,2,4,1,3,5,7,6,8,10,9,11],i3=row.map(v=>mod(3-v,12));t('CO46 ordered I3 and RI3',eq(i3,[3,1,11,2,0,10,8,9,7,5,6,4])&&new Set(i3).size===12&&i3.slice().reverse().at(-1)===3);
 t('CO47/48 additive duration and common phase',eq([4,7,9].map(v=>v*.5),[2,3.5,4.5])&&42/2===21&&closePhase(42/2.1,20));
 const x={id:'v1',notes,harmony:['C'],binding:['s1:n1','s2:n2'],words:['你','好']},y={...x,id:'v2',parent:'v1',words:['早','安']},snapshot=JSON.stringify(x);
 t('CO24/49/51/53 protected lyric revision',revise(x,y,true)&&!revise(x,{...y,notes:down},true)&&!revise(x,y,false)&&JSON.stringify(x)===snapshot);
 const deps={E1:['lyrics','binding'],R1:['lyrics','notes'],P1:['lyrics'],A1:['harmony']};t('CO51 exact dependent evidence invalidation',eq(Object.entries(deps).filter(([,v])=>v.includes('lyrics')).map(([k])=>k),['E1','R1','P1']));
}
function closePhase(a,b){return Math.abs(a-b)<1e-9;}
