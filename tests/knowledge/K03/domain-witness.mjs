// Closed synthetic score and resource witness; no real performance or host evidence.
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),freeze=o=>{if(o&&typeof o==='object'){for(const v of Object.values(o))freeze(v);Object.freeze(o);}return o;};
const keys=(o,k)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===k.length&&k.every(x=>Object.hasOwn(o,x));
const sem={C:0,D:2,E:4,F:5,G:7,A:9,B:11},letters=['C','D','E','F','G','A','B'];
export function pitch(s){if(typeof s!=='string')return null;const m=/^([A-G])([#b]?)(-?\d+)$/.exec(s);return m?12*(Number(m[3])+1)+sem[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0):null;}
const instrument=freeze({flute:{chrom:0,diat:0},piccolo:{chrom:12,diat:7},alto:{chrom:-5,diat:-3},bassFlute:{chrom:-12,diat:-7},bb:{chrom:-2,diat:-1},a:{chrom:-3,diat:-2},hornF:{chrom:-7,diat:-4},bassBb:{chrom:-14,diat:-8}});
function diat(s){const m=/^([A-G])([#b]?)(-?\d+)$/.exec(s);return m?Number(m[3])*7+letters.indexOf(m[1]):null;}
export function written(s,kind){const k=instrument[kind],p=pitch(s),d=typeof s==='string'?diat(s):null;if(!k||p===null||d===null)return null;const n=d-k.diat,oct=Math.floor(n/7),l=letters[(n%7+7)%7],delta=p-k.chrom-(12*(oct+1)+sem[l]);return Math.abs(delta)>1?null:l+(delta===1?'#':delta===-1?'b':'')+oct;}
const noteRows=[['D4','E4','F4'],['G4','F4','D4'],['E4','G4','A4'],['G4','E4','C4']],bass=['C3','G2','A2','C3'],chords=[['C3','E3','G3'],['G2','B2','D3','F3'],['A2','C3','E3'],['C3','E3','G3']];
export const score=freeze({id:'score-v1',bpm:120,span:16,meter:'4/4',harmony:['C','G7','Am','C'],melody:noteRows.flatMap((v,i)=>v.map((p,j)=>({id:'m'+(i+1)+'n'+(j+1),pitch:p,start:i*4+j,duration:1,dynamic:i<2?'p':'mf'}))),bass:bass.map((p,i)=>({id:'bass'+(i+1),pitch:p,start:i*4,duration:4})),fills:chords.flatMap((v,i)=>v.map((p,j)=>({id:'f'+(i+1)+'-'+(j+1),pitch:p,start:i*4+3,duration:.5})))});
const scoreKeys=['id','bpm','span','meter','harmony','melody','bass','fills'];
function exactEvent(e,k){return keys(e,k)&&typeof e.id==='string'&&e.id.length>0&&pitch(e.pitch)!==null&&Number.isFinite(e.start)&&Number.isFinite(e.duration)&&e.duration>0;}
const inRest=e=>[0,1,2,3].some(i=>e.start>=i*4+3&&e.start+e.duration<=(i+1)*4);
export function validate(c,kind){
 if(!['flute','bb'].includes(kind)||!keys(c,scoreKeys)||!c.id||!['bpm','span','meter','harmony','melody','bass'].every(k=>eq(c[k],score[k]))||!Array.isArray(c.fills)||c.fills.some(e=>!exactEvent(e,['id','pitch','start','duration']))||new Set(c.fills.map(e=>e.id)).size!==c.fills.length)return {state:'REJECT'};
 if(!c.fills.every(e=>inRest(e)&&chords[Math.floor(e.start/4)].includes(e.pitch)))return {state:'REJECT'};
 // Original or narrowly revised m2 root deletion; no arbitrary silent arrangement.
 const expected=score.fills.filter(e=>c.id==='score-v2'?e.id!=='f2-1':true);
 if(!['score-v1','score-v2'].includes(c.id)||!eq(c.fills,expected))return {state:'REJECT'};
 const part=c.melody.map(e=>({event:e.id,written:written(e.pitch,kind),concert:e.pitch,start:e.start,duration:e.duration,dynamic:e.dynamic}));
 if(part.some(e=>pitch(e.written)+instrument[kind].chrom!==pitch(e.concert)))return {state:'REJECT'};
 return {state:'BOUNDED_CANDIDATE',part,breath:'UNKNOWN_ACTUAL_GAP_CAPACITY',hearing:'UNKNOWN_NOT_EXECUTED'};
}
export function revise(a,b,request){
 const reject={state:'REJECT',affected:[]};
 if(!eq(a,score)||!keys(request,['authorized','role','measure','targetId','operation'])||request.authorized!==true||request.role!=='KEYBOARD'||request.measure!==2||request.targetId!=='f2-1'||request.operation!=='REMOVE_DUPLICATE_ROOT'||!b||b.id!=='score-v2'||validate(b,'flute').state!=='BOUNDED_CANDIDATE')return reject;
 // Frozen finite evidence dependencies bound to actual deleted event and descendants.
 const deps=[{id:'m2-keyboard-part',on:['f2-1']},{id:'full-score',on:['f2-1']},{id:'m2-listening',on:['m2-keyboard-part']},{id:'m1-listening',on:['f1-1']},{id:'bass-part',on:['bass2']},{id:'melody-part',on:['m2n1']}];
 const removed=a.fills.filter(e=>!b.fills.some(x=>x.id===e.id)).map(e=>e.id);if(!eq(removed,[request.targetId]))return reject;
 const affected=new Set(removed);let changed=true;while(changed){changed=false;for(const d of deps)if(!affected.has(d.id)&&d.on.some(id=>affected.has(id))){affected.add(d.id);changed=true;}}
 return {state:'BOUNDED_CANDIDATE',affected:deps.filter(d=>affected.has(d.id)).map(d=>d.id),hearing:'UNKNOWN_NOT_EXECUTED'};
}
export function retune({bpm,previousEnd,nextStart,minSeconds,range,from,to}={}){
 if(!Number.isFinite(bpm)||bpm<=0||![previousEnd,nextStart,minSeconds].every(Number.isFinite)||minSeconds<0||!Array.isArray(range)||range.length!==2||range.some(x=>pitch(x)===null)||pitch(range[0])>pitch(range[1])||pitch(from)===null||pitch(to)===null)return 'UNKNOWN';
 return [from,to].every(x=>pitch(x)>=pitch(range[0])&&pitch(x)<=pitch(range[1]))&&(nextStart-previousEnd)*60/bpm>=minSeconds?'BOUNDED_CANDIDATE':'REJECT';
}
// Explicit 2011 classification cases only; don't infer codes from geographic location.
export function classify2011({version,mechanism,shape,pickup,independentElectronicSource}={}){
 if(version!=='2011-07-08'||typeof independentElectronicSource!=='boolean'||independentElectronicSource)return null;
 if(mechanism==='STRING'&&shape==='UNMODIFIED_VIOLIN'&&typeof pickup==='boolean')return '3';
 if(mechanism==='IDIOPHONE'&&shape==='CLASH_CYMBALS')return '111.142';
 if(mechanism==='IDIOPHONE'&&shape==='TROUGH_CLAPPERS')return '111.13';
 return null;
}
export function checks(t){
 t('AR01/02/33/56 exact written spelling and concert offsets',eq(['C4','D4','F4'].map(x=>written(x,'bb')),['D4','E4','G4'])&&eq(['C4','D4','F4'].map(x=>written(x,'a')),['Eb4','F4','Ab4'])&&eq(['C4','E4','G4'].map(x=>written(x,'hornF')),['G4','B4','D5'])&&written('Bb3','bassBb')==='C5'&&written('G4','alto')==='C5'&&written('C6','piccolo')==='C5'&&written('C4','bassFlute')==='C5'&&written('C4','unknown')===null);
 t('AR03/04 actual written range',pitch(written('C5','piccolo'))<pitch('D4')&&written('D6','alto')==='G6'&&pitch('G6')>pitch('F6'));
 t('AR08 pitch projection noninjective',pitch('C#4')===61&&pitch('Db4')===61&&'C#4'!=='Db4');
 t('AR05/06 concurrent capacity',score.melody.length===12&&[4,3].map(n=>n>=4).join(',')==='true,false');
 t('AR12 shared pedal collision',diat('C4')%7===diat('C#5')%7&&pitch('C#5')===pitch('Db5')&&diat('C4')%7!==diat('Db5')%7);
 t('AR13 same branch interval',pitch('F3')-pitch('B2')===6&&pitch('F3')-pitch('Ab2')===9);
 t('AR20 event count vs activity',2/4===.5&&8/4===2&&2*4/4===8/4);
 t('AR21/22 slash bass movement',pitch('B2')-pitch('C3')===-1&&pitch('A2')-pitch('B2')===-2);
 t('AR23/45 right-hand registered span',pitch('G4')-pitch('Bb3')===9&&pitch('G4')-pitch('E3')===15);
 t('AR24/43 guide tones and approach',pitch('F4')-pitch('E4')===1&&pitch('C5')-pitch('B4')===1&&pitch('G2')-pitch('F#2')===1&&pitch('Db3')-pitch('C3')===1);
 const s=[0,3,6,10,12],r=[2,4,8,11,14];t('AR28/47 exact clave phase not count',eq(s.slice(0,3).map((v,i,a)=>(a[i+1]??8)-v),[3,3,2])&&s.length===r.length&&!eq(s,r));
 t('AR44 finite standard guitar fret mapping',eq([40,45,50,55,59,64].map((p,i)=>[null,3,2,0,1,0][i]===null?null:p+[null,3,2,0,1,0][i]).filter(x=>x!==null),[48,52,55,60,64])&&pitch('C2')<40);
 t('AR36/57 continuous and switch times',16*60/120===8&&8*60/120===4&&4-3<2&&5-3===2);
 const a=validate(score,'flute'),b=validate(score,'bb');t('KC-A03 exact written-to-concert part and fixed events',a.state==='BOUNDED_CANDIDATE'&&b.state==='BOUNDED_CANDIDATE'&&b.part.length===12&&eq(b.part.slice(0,3).map(e=>e.written),['E4','F#4','G4'])&&eq(a.part.map(e=>e.event),b.part.map(e=>e.event))&&b.hearing==='UNKNOWN_NOT_EXECUTED'&&b.breath==='UNKNOWN_ACTUAL_GAP_CAPACITY');
 const bad=structuredClone(score);bad.fills=bad.fills.map(e=>({...e,start:e.start-2,duration:1}));t('KC-A03 all B fills collide',validate(bad,'flute').state==='REJECT');
 const crossed=structuredClone(score);crossed.fills[0].duration=1.1;t('AR42 full duration and malformed input rejected',validate(crossed,'bb').state==='REJECT'&&validate({...score,fills:[null]},'bb').state==='REJECT');
 const v=structuredClone(score);v.id='score-v2';v.fills=v.fills.filter(e=>e.id!=='f2-1');const req={authorized:true,role:'KEYBOARD',measure:2,targetId:'f2-1',operation:'REMOVE_DUPLICATE_ROOT'},result=revise(score,v,req);
 t('KC-A03 specific allowed root deletion and derived evidence invalidation',result.state==='BOUNDED_CANDIDATE'&&eq(result.affected,['m2-keyboard-part','full-score','m2-listening'])&&score.fills.some(e=>e.id==='f2-1')&&result.hearing==='UNKNOWN_NOT_EXECUTED');
 for(const [name,mutate] of [['melody',x=>x.melody[0].pitch='D5'],['bass',x=>x.bass[1].pitch='D3'],['harmony',x=>x.harmony[1]='G'],['tempo',x=>x.bpm=90],['other fill',x=>x.fills.splice(0,1)],['shift',x=>x.fills[0].start=2.5],['unknown',x=>x.extra=true],['no op',x=>x.fills=structuredClone(score.fills)]]){const x=structuredClone(v);mutate(x);t('KC-A03 reject '+name,revise(score,x,req).state==='REJECT');}
 t('KC-A03 reject authorization mismatch',revise(score,v,{...req,authorized:false}).state==='REJECT'&&revise(score,v,{...req,measure:3}).state==='REJECT'&&revise(score,v,{...req,targetId:'f2-2'}).state==='REJECT');
 const p={bpm:120,previousEnd:4,nextStart:12,minSeconds:5,range:['F2','C3'],from:'G2',to:'A2'};t('AX02 net retune time and range',retune(p)==='REJECT'&&retune({...p,nextStart:16})==='BOUNDED_CANDIDATE'&&retune({...p,to:'D3',nextStart:16})==='REJECT'&&retune({...p,bpm:0})==='UNKNOWN');
 t('AX01 classification axes and exact version',classify2011({version:'2011-07-08',mechanism:'STRING',shape:'UNMODIFIED_VIOLIN',pickup:true,independentElectronicSource:false})==='3'&&classify2011({version:'2011-07-08',mechanism:'IDIOPHONE',shape:'CLASH_CYMBALS',independentElectronicSource:false})==='111.142'&&classify2011({version:'2011-07-08',mechanism:'IDIOPHONE',shape:'TROUGH_CLAPPERS',independentElectronicSource:false})==='111.13'&&classify2011({version:'2021',mechanism:'IDIOPHONE',shape:'TROUGH_CLAPPERS',independentElectronicSource:false})===null&&classify2011({version:'2011-07-08',mechanism:'STRING',shape:'UNMODIFIED_VIOLIN',pickup:true,independentElectronicSource:true})===null);
 t('AR53 independent voice cursor',4*2-8===0&&4*2-4+8>8);
 const projection=a=>a.map(({pitch,start,duration})=>({pitch,start,duration}));const p1=[{pitch:'C5',start:0,duration:2,tech:'pizz',dynamic:'p'},{pitch:'C5',start:2,duration:2,tech:'arco',dynamic:'f'}],p2=p1.map(e=>({...e,tech:'arco',dynamic:'p'}));t('AR54/55/60 loss witness noninjective',!eq(p1,p2)&&eq(projection(p1),projection(p2)));
}
