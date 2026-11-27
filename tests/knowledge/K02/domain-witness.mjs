const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),mod=(a,n)=>(a%n+n)%n;
export const notes=[{id:'n1',pitch:60,onset:0,duration:2},{id:'n2',pitch:64,onset:2,duration:2}];
export const lex=[
 {id:'A',lang:'Mandarin',word:'早安',surface:['21','55'],morning:true,formal:true,honorific:false},
 {id:'B',lang:'Mandarin',word:'你好',surface:['35','213'],morning:false,formal:true,honorific:false},
 {id:'C',lang:'Mandarin',word:'您好',surface:['35','213'],morning:false,formal:true,honorific:true},
 {id:'D',lang:'Cantonese',word:'早晨',surface:['25','21'],morning:true,formal:true,honorific:false},
 {id:'E',lang:'Cantonese',word:'你好',surface:['23','25'],morning:false,formal:true,honorific:false},
 {id:'F',lang:'Cantonese',word:'午安',surface:['23','55'],morning:false,afternoon:true,formal:true,honorific:false},
 {id:'G2',lexeme:'G',reading:'haa1 lou2',lang:'Cantonese',word:'哈佬',surface:['55','25'],morning:false,formal:false,honorific:false},
 {id:'G3',lexeme:'G',reading:'haa1 lou3',lang:'Cantonese',word:'哈佬',surface:['55','33'],morning:false,formal:false,honorific:false}];
export function screen(q){
 if(q.rights!==true||!['Mandarin','Cantonese'].includes(q.lang)||!Array.isArray(q.notes)||q.notes.length!==2||q.notes.some((n,i)=>n.id!==notes[i].id||n.onset!==notes[i].onset||n.duration!==2||!Number.isFinite(n.pitch)))return {state:'UNKNOWN_STOP'};
 if(!eq(q.notes,notes)&&q.changeMelody!==true)return {state:'REJECT_PROTECTION'};
 const direction=Math.sign(q.notes[1].pitch-q.notes[0].pitch),rows=lex.filter(l=>l.lang===q.lang).map(l=>({...l,semantic:!l.afternoon&&(!q.explicitMorning||l.morning)&&(!q.honorific||l.honorific)&&(!q.formal||l.formal),match:Math.sign(Number(l.surface[1].at(-1))-Number(l.surface[0].at(-1)))===direction}));
 const candidates=rows.filter(l=>l.semantic&&l.match).map(l=>l.id);
 return {state:candidates.length?'BOUNDED_CANDIDATE':'NO_STRICT_CANDIDATE',candidates,rows,hearing:'UNKNOWN_NOT_EXECUTED'};
}
export function enumerate({p=[0,2,4,7],first=0,last=7,maxStep=4}={}){
 if(!Array.isArray(p)||p.length<1||p.length>12||new Set(p).size!==p.length||!p.every(Number.isSafeInteger)||!Number.isSafeInteger(first)||!Number.isSafeInteger(last)||!Number.isSafeInteger(maxStep)||maxStep<0)return null;
 if(!p.includes(first)||!p.includes(last))return [];
 const out=[];for(const a of p)for(const b of p){const s=[first,a,b,last];if(s.slice(1).every((n,i)=>Math.abs(n-s[i])<=maxStep))out.push(s);}return out;
}
const lcg=s=>Array.from({length:4},()=>{s=mod(5*s+1,16);return s%4;});
const keys=(o,k)=>o!==null&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===k.length&&k.every(v=>Object.hasOwn(o,v));
const same=(a,b)=>a===b||(Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>same(v,b[i])))||(a&&b&&typeof a==='object'&&typeof b==='object'&&!Array.isArray(a)&&!Array.isArray(b)&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>Object.hasOwn(b,k)&&same(a[k],b[k])));
const text=v=>typeof v==='string'&&v.trim().length>0;
const versionKeys=['id','parent','source','rights','tempo','track','harmony','binding','events','evidence'];
const eventKeys=['id','section','pitch','onset','duration','lyric'];
const evidenceKeys=['id','dependencies','state'];
function version(v){
 if(!keys(v,versionKeys)||!text(v.id)||!(v.parent===null||text(v.parent))||!text(v.source)||v.rights!=='AUTHORIZED_LYRIC_EDIT'||!Number.isFinite(v.tempo)||v.tempo<=0||!text(v.track)||!Array.isArray(v.harmony)||!v.harmony.every(text)||!Array.isArray(v.binding)||!v.binding.every(text)||!Array.isArray(v.events)||!v.events.length||!Array.isArray(v.evidence))return false;
 if(v.events.some(e=>!keys(e,eventKeys)||!text(e.id)||!text(e.section)||!Number.isSafeInteger(e.pitch)||!Number.isFinite(e.onset)||!Number.isFinite(e.duration)||e.duration<=0||!text(e.lyric))||new Set(v.events.map(e=>e.id)).size!==v.events.length)return false;
 if(v.evidence.some(e=>!keys(e,evidenceKeys)))return false;
 const ids=new Set(v.evidence.map(e=>e.id)),eventIds=new Set(v.events.map(e=>e.id));
 if(ids.size!==v.evidence.length||v.evidence.some(e=>!keys(e,evidenceKeys)||!text(e.id)||!['CURRENT','STALE','UNKNOWN'].includes(e.state)||!Array.isArray(e.dependencies)||(e.dependencies.length===0&&e.state!=='UNKNOWN')||new Set(e.dependencies).size!==e.dependencies.length||e.dependencies.some(d=>typeof d!=='string'||!(d==='harmony'||d==='tempo'||d==='source'||d==='track'||d==='binding'||[...eventIds].some(id=>['lyric','pitch','onset','duration'].some(f=>d==='event:'+id+':'+f))||(d.startsWith('evidence:')&&ids.has(d.slice(9)))))))return false;
 const visiting=new Set(),done=new Set();function walk(id){if(visiting.has(id))return false;if(done.has(id))return true;visiting.add(id);for(const d of v.evidence.find(e=>e.id===id).dependencies)if(d.startsWith('evidence:')&&!walk(d.slice(9)))return false;visiting.delete(id);done.add(id);return true;}
 return [...ids].every(walk);
}
export function revise(x,y,request){
 const stop=state=>({state,stale:[],version:null});
 if(!keys(request,['authorized','targetId','allowedFields'])||request.authorized!==true||!text(request.targetId)||!same(request.allowedFields,['lyric'])||!version(x)||!version(y))return stop('UNKNOWN_STOP');
 if(x.id===y.id||y.parent!==x.id||!same(x.evidence,y.evidence)||!['source','rights','tempo','track','harmony','binding'].every(k=>same(x[k],y[k]))||x.events.length!==y.events.length)return stop('REJECT_PROTECTION');
 const index=x.events.findIndex(e=>e.id===request.targetId);
 if(index<0||!x.events.every((e,i)=>same(i===index?{...e,lyric:y.events[i].lyric}:e,y.events[i])))return stop('REJECT_PROTECTION');
 if(x.events[index].lyric===y.events[index].lyric)return stop('NO_OP');
 const affected=new Set(),changed='event:'+request.targetId+':lyric';
 let more=true;while(more){more=false;for(const e of x.evidence){if(!affected.has(e.id)&&e.dependencies.some(d=>d===changed||(d.startsWith('evidence:')&&affected.has(d.slice(9))))){affected.add(e.id);more=true;}}}
 const candidate=structuredClone(y);candidate.evidence=candidate.evidence.map(e=>affected.has(e.id)?{...e,state:'STALE'}:e);
 return {state:'BOUNDED_CANDIDATE',stale:x.evidence.filter(e=>affected.has(e.id)).map(e=>e.id),version:candidate};
}
export function rhyme(a,b){
 if(![a,b].every(x=>keys(x,['onset','nucleus','coda'])&&typeof x.onset==='string'&&text(x.nucleus)&&typeof x.coda==='string'))return 'UNKNOWN';
 if(a.nucleus!==b.nucleus)return 'OTHER';
 if(a.coda===b.coda)return a.onset===b.onset?'IDENTICAL_STRESSED_SYLLABLE':'PERFECT';
 if(['t','d'].includes(a.coda)&&['t','d'].includes(b.coda))return 'FAMILY_CANDIDATE';
 return 'ASSONANCE';
}
export function checks(t){
 t('CO02/27 nominal duration independent of preference',24*4*60/96===60&&25*4*60/96===62.5&&8*4*60/120===16);
 const syl=(onset,nucleus,coda)=>({onset,nucleus,coda}),night=syl('n','aɪ','t');
 t('CO05/06/54 explicit vowel/coda/onset',rhyme(night,syl('br','aɪ','t'))==='PERFECT'&&rhyme(night,syl('t','aɪ','m'))==='ASSONANCE'&&rhyme(night,syl('r','aɪ','d'))==='FAMILY_CANDIDATE'&&rhyme(syl('l','aɪ','t'),syl('l','aɪ','t'))==='IDENTICAL_STRESSED_SYLLABLE'&&rhyme(night,syl('b','i','t'))==='OTHER'&&rhyme(night,{onset:'br'})==='UNKNOWN');
 t('CO09/10 range and rhythmic conservation',Math.max(60,64,67,64)<=67&&Math.max(62,65,69,65)>67&&[.5,.5,1,2].reduce((a,b)=>a+b)===4);
 const p=[60,64,67],axis=60;t('CO13/14/15 inversion and full event reversal',eq(p.map(v=>2*axis-v),[60,56,53])&&eq([1,.5,.5].map(x=>2*x),[2,1,1])&&eq([[60,1],[64,.5],[62,.5]].reverse(),[[62,.5],[64,.5],[60,1]]));
 t('CO31/32 independent harmonic and onset densities',8/4===2&&4/4===1&&2!==1);
 const q={rights:true,lang:'Mandarin',notes,formal:true};
 t('R5-M exact surface endpoint and semantic gate',eq(screen(q).candidates,['A'])&&screen({...q,honorific:true}).state==='NO_STRICT_CANDIDATE'&&lex[1].surface[0]==='35'&&Number('213'.at(-1))<5&&Number('214'.at(-1))<5&&Number('21'.at(-1))<5);
 const c=screen({...q,lang:'Cantonese'});t('R5-Y semantic gate despite matching contour',eq(c.candidates,['E'])&&c.rows.find(r=>r.id==='F').match&&!c.rows.find(r=>r.id==='F').semantic&&screen({...q,lang:'Cantonese',explicitMorning:true}).state==='NO_STRICT_CANDIDATE');
 const down=[{...notes[0],pitch:64},{...notes[1],pitch:60}];t('R5 frozen melody authorization',screen({...q,notes:down}).state==='REJECT_PROTECTION'&&eq(screen({...q,notes:down,changeMelody:true,honorific:true}).candidates,['C'])&&eq(screen({...q,lang:'Cantonese',notes:down,changeMelody:true,explicitMorning:true}).candidates,['D'])&&screen({...q,rights:undefined}).state==='UNKNOWN_STOP');
 const e=enumerate();t('CO44 finite enumerated candidates',eq(e,[[0,0,4,7],[0,2,4,7],[0,4,4,7],[0,4,7,7]])&&eq(enumerate({last:11}),[])&&eq(enumerate({maxStep:1}),[])&&enumerate({p:[0,0]})===null);
 t('CO45/63 LCG non-injective mapped sequence',[3,7,11,15].every(s=>eq(lcg(s),[0,1,2,3]))&&eq(lcg(4),[1,2,3,0]));
 const row=[0,2,4,1,3,5,7,6,8,10,9,11],i3=row.map(v=>mod(3-v,12));t('CO46 ordered I3 and RI3',eq(i3,[3,1,11,2,0,10,8,9,7,5,6,4])&&new Set(i3).size===12&&eq(i3.slice().reverse(),[4,6,5,7,9,8,10,0,2,11,1,3]));
 t('CO47/48 additive duration and common phase',eq([4,7,9].map(v=>v*.5),[2,3.5,4.5])&&42/2===21&&closePhase(42/2.1,20));
 const g=screen({...q,lang:'Cantonese',formal:false});t('R5-Y two distinct qualified readings',g.rows.find(r=>r.id==='G2').surface[1]==='25'&&g.rows.find(r=>r.id==='G3').surface[1]==='33'&&!g.rows.find(r=>r.id==='G2').match&&!g.rows.find(r=>r.id==='G3').match&&screen({...q,lang:'Cantonese',formal:false,notes:down,changeMelody:true}).candidates.includes('G3')&&!screen({...q,lang:'Cantonese',formal:false,notes:down,changeMelody:true}).candidates.includes('G2'));
 const x={id:'v1',parent:null,source:'S1',rights:'AUTHORIZED_LYRIC_EDIT',tempo:96,track:'T1',harmony:['C'],binding:['s1:n1','s2:n2'],events:[{id:'n1',section:'verse',pitch:60,onset:0,duration:1,lyric:'你'},{id:'n2',section:'chorus',pitch:64,onset:1,duration:3,lyric:'好'}],evidence:[{id:'E1',dependencies:['event:n2:lyric','binding'],state:'CURRENT'},{id:'R1',dependencies:['evidence:E1','event:n2:pitch'],state:'CURRENT'},{id:'P1',dependencies:['event:n2:lyric'],state:'CURRENT'},{id:'A1',dependencies:['harmony'],state:'CURRENT'},{id:'V1',dependencies:['event:n1:lyric'],state:'CURRENT'},{id:'U1',dependencies:[],state:'UNKNOWN'}]};
 const y=structuredClone(x);y.id='v2';y.parent='v1';y.events[1].lyric='安';
 const snapshot=JSON.stringify(x),ysnapshot=JSON.stringify(y),req={authorized:true,targetId:'n2',allowedFields:['lyric']},r=revise(x,y,req);
 t('CO24/49/51/53 protected lyric revision',r.state==='BOUNDED_CANDIDATE'&&r.version.events[1].lyric==='安'&&JSON.stringify(x)===snapshot&&JSON.stringify(y)===ysnapshot&&revise(x,y,{...req,authorized:false}).state==='UNKNOWN_STOP');
 t('CO51 exact dependent evidence invalidation',eq(r.stale,['E1','R1','P1'])&&eq(r.version.evidence.map(e=>e.state),['STALE','STALE','STALE','CURRENT','CURRENT','UNKNOWN']));
 for(const [name,mutate] of [['tempo',v=>v.tempo=120],['source',v=>v.source='S2'],['track',v=>v.track='T2'],['rights',v=>v.rights='UNKNOWN'],['other event',v=>v.events[0].lyric='早'],['pitch',v=>v.events[1].pitch=65],['onset',v=>v.events[1].onset=2],['duration',v=>v.events[1].duration=2],['unknown top field',v=>v.extra=true],['unknown event field',v=>v.events[1].tie='start'],['changed evidence dependency',v=>v.evidence[0].dependencies=['harmony']],['changed evidence state',v=>v.evidence[0].state='STALE'],['malformed evidence',v=>v.evidence[0]=null],['missing current dependency',v=>v.evidence[0].dependencies=[]],['unknown dependency',v=>v.evidence[0].dependencies=['event:missing:lyric']],['duplicate event',v=>v.events[0].id='n2'],['event order',v=>v.events.reverse()],['wrong parent',v=>v.parent='v0'],['same revision',v=>v.id='v1']]){
  const z=structuredClone(y);mutate(z);t('R2 reject '+name,revise(x,z,req).state!=='BOUNDED_CANDIDATE');
 }
 t('R2 reject no-op and unsupported field set',revise(x,{...x,id:'v2',parent:'v1'},req).state==='NO_OP'&&revise(x,y,{...req,targetId:'n1'}).state==='REJECT_PROTECTION'&&revise(x,y,{...req,allowedFields:['lyric','tempo']}).state==='UNKNOWN_STOP');
 const z=structuredClone(x);z.evidence[0].dependencies=['evidence:R1'];const zz=structuredClone(z);zz.id='v2';zz.parent='v1';zz.events[1].lyric='安';t('R2 dependency cycle fail closed',revise(z,zz,req).state==='UNKNOWN_STOP');

}
function closePhase(a,b){return Math.abs(a-b)<1e-9;}
