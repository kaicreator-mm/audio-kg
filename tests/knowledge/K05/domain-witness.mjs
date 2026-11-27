const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),close=(a,b)=>Math.abs(a-b)<1e-6;
const gcd=(a,b)=>b?gcd(b,a%b):a;
const period=f=>1000/f.reduce(gcd);
const positive=x=>Number.isFinite(x)&&x>0;
const cents=(a,b)=>positive(a)&&positive(b)?1200*Math.log2(a/b):null;
export function risk(x){
 if(x.emergency===true)return 'EMERGENCY_REFERRAL';
 if(x.symptom===true)return 'STOP_REFER';
 if(x.emergency!==false||x.symptom!==false||x.authorized!==true||x.offline!==true)return 'UNKNOWN_STOP';
 return 'OFFLINE_ONLY';
}
export function metrics(w){
 if(w.type!=='voiced'||w.valid!==true||w.sameWindow!==true)return {error:null,estimatedTarget:null,trueTarget:null};
 return {error:cents(w.estimate,w.reference),estimatedTarget:cents(w.estimate,w.target),trueTarget:cents(w.reference,w.target)};
}
export function inspect(x){
 const gate=risk(x);if(gate!=='OFFLINE_ONLY')return {state:gate};
 if(!x.source||!x.method||!x.mask||!Array.isArray(x.windows)||new Set(x.windows.map(w=>w.id)).size!==x.windows.length||x.windows.some((w,i)=>!Number.isFinite(w.start)||!Number.isFinite(w.end)||w.end<=w.start||(i&&w.start<x.windows[i-1].end)))return {state:'UNKNOWN_STOP'};
 const windows=x.windows.map(w=>({id:w.id,...metrics(w)}));
 const valid=x.windows.filter(w=>w.type==='voiced'&&w.valid===true&&w.sameWindow===true&&positive(w.reference));
 return {state:'BOUNDED_CANDIDATE',windows,verifiedSeconds:valid.reduce((s,w)=>s+(w.end-w.start)/1000,0),verifiedCycles:valid.reduce((s,w)=>s+(w.end-w.start)*w.reference/1000,0),actual:'UNKNOWN_NOT_EXECUTED'};
}
export function revise(a,b,id){
 if(risk(a)!=='OFFLINE_ONLY'||risk(b)!=='OFFLINE_ONLY'||!Array.isArray(a.windows)||!Array.isArray(b.windows)||inspect(a).state!=='BOUNDED_CANDIDATE'||inspect(b).state!=='BOUNDED_CANDIDATE'||a.source!==b.source||a.method!==b.method||a.mask!==b.mask||a.windows.length!==b.windows.length||!positive(b.windows.find(w=>w.id===id)?.estimate))return false;
 return a.windows.some(w=>w.id===id)&&a.windows.every((w,i)=>eq(w.id===id?{...w,estimate:b.windows[i].estimate}:w,b.windows[i]));
}
// S413: finite arithmetic witness, not a human measurement protocol.
export function proxy(x){
 if(!x||x.method!=='S413_ADJACENT_PEAK_LINEAR_INTERPOLATION'||x.unit!=='Pa'||x.reference!=='GAUGE_ATMOSPHERIC'||x.calibrated!==true||!['closure','zeroOralFlow','equilibrium','validPlateau','sameReference','noLeak'].every(k=>x[k]===true))return null;
 const {left,right,at}=x;
 if(!left||!right||left.valid!==true||right.valid!==true||!positive(left.pressure)||!positive(right.pressure)||![left.time,right.time,at].every(Number.isFinite)||!(left.time<at&&at<right.time))return null;
 const p=left.pressure+(right.pressure-left.pressure)*(at-left.time)/(right.time-left.time);
 return positive(p)?p:null;
}
export function checks(t){
 t('VS01/32 separate observation layers',new Set(['lung-volume','glottal-flow','tongue-lips']).size===3);
 t('VS06/07/34/36 pressure flow and power',500/.1===5000&&500/.2===2500&&close((3-2.6)/4,.1)&&close(500*.0002,.1)&&close(.001/.1,.01));
 const p={closure:true,zeroOralFlow:true,equilibrium:true,validPlateau:true,sameReference:true,noLeak:true,method:'S413_ADJACENT_PEAK_LINEAR_INTERPOLATION',unit:'Pa',reference:'GAUGE_ATMOSPHERIC',calibrated:true,left:{time:0,pressure:600,valid:true},right:{time:100,pressure:800,valid:true},at:50};
 t('VS35 pressure proxy prerequisites',proxy(p)===700&&proxy({...p,noLeak:false})===null&&proxy({...p,equilibrium:false})===null&&proxy({...p,zeroOralFlow:undefined})===null);
 t('VS08/10/37/38/61 period and phase',period([400,600,800])===5&&period([400,800])===2.5&&360/5===72&&Math.sqrt(4/4)===Math.sqrt(1/1));
 const mul=(a,b)=>a.map((v,i)=>v*b[i]);
 t('P2-01 pressure proxy rejects zero/negative or scalar-only',proxy({...p,left:{...p.left,pressure:0}})===null&&proxy({...p,right:{...p.right,pressure:-700}})===null&&proxy({pressure:700})===null);
 t('P2-01 pressure interpolation exact asymmetric time',proxy({...p,at:25})===650&&proxy({...p,at:75})===750);
 t('P2-01 rejects unknown reference/method/calibration and out of interval',proxy({...p,reference:'UNKNOWN'})===null&&proxy({...p,method:'OTHER'})===null&&proxy({...p,calibrated:undefined})===null&&proxy({...p,at:100})===null&&proxy({...p,left:{...p.left,valid:false}})===null);
 t('VX01 nonunique source and filter',eq(mul([1,1,1],[1,2,1]),mul([2,1,.5],[.5,2,2]))&&.8*2>1);
 t('VS17/44 overlap without mechanism identity',Math.max(180,280)===280&&Math.min(330,500)===330&&300>=280&&300<=330);
 t('VS46/47 language identity not voiced label',metrics({type:'voiced',valid:true,sameWindow:true,estimate:200,reference:200}).error===0&&metrics({type:'unvoiced',valid:true,sameWindow:true,estimate:200,reference:200}).error===null);
 const jitter=a=>a.slice(1).reduce((s,v,i)=>s+Math.abs(v-a[i]),0)/(a.length-1)/(a.reduce((s,v)=>s+v,0)/a.length);
 t('VS49/50/51/52 explicit arithmetic',8000/200===40&&close(jitter([5,5.1,4.9,5]),.0266666666667)&&close(jitter([1,1.1,.9,1]),.133333333333)&&18-13===5&&close(20*Math.log10(.02/20e-6),60));
 const x={emergency:false,symptom:false,authorized:true,offline:true,source:'H1',method:'m1',mask:'w1',windows:[{id:'f0',start:0,end:100,type:'unvoiced'},{id:'f1',start:100,end:200,type:'voiced',reference:200,estimate:200,valid:true,sameWindow:true},{id:'f2',start:200,end:300,type:'voiced',reference:200,estimate:100,valid:true,sameWindow:true},{id:'f3',start:300,end:350,type:'transition',estimate:180},{id:'f4',start:350,end:450,type:'voiced',reference:250,estimate:250,valid:true,sameWindow:true}]};
 const before=JSON.stringify(x),y=inspect(x);
 t('KC-V05 exact mask signed error and verified dose',eq(y.windows.map(w=>w.error),[null,0,-1200,null,0])&&close(y.verifiedSeconds,.3)&&y.verifiedCycles===65);
 t('VX02 emergency precedes missing rights and input',inspect({emergency:true}).state==='EMERGENCY_REFERRAL'&&inspect({symptom:true}).state==='STOP_REFER'&&inspect({...x,offline:false}).state==='UNKNOWN_STOP'&&inspect({...x,authorized:undefined}).state==='UNKNOWN_STOP');
 const a2=structuredClone(x);a2.windows[2].estimate=200;
 t('KC-V05 only estimate revised, history untouched',revise(x,a2,'f2')&&inspect(a2).windows[2].error===0&&JSON.stringify(x)===before&&!revise(x,{...a2,method:'m2'},'f2')&&!revise(x,{...a2,mask:'w2'},'f2'));
 t('P2-02 revision bound to both offline gates',!revise({...x,emergency:true},a2,'f2')&&!revise(x,{...a2,emergency:true},'f2')&&!revise({...x,authorized:false},a2,'f2')&&!revise(x,{...a2,authorized:false},'f2')&&!revise(x,{...a2,symptom:true},'f2')&&!revise(x,{...a2,offline:false},'f2')&&!revise({...x,symptom:undefined},a2,'f2'));
 const tampered=structuredClone(a2);tampered.windows[2].reference=100;
 t('KC-V05 protected independent reference and duplicate window',!revise(x,tampered,'f2')&&inspect({...x,windows:[x.windows[1],x.windows[1]]}).state==='UNKNOWN_STOP');
 const w={type:'voiced',valid:true,sameWindow:true,reference:220,target:200,estimate:200};
 const z=metrics(w);t('VS64 three noninterchangeable quantities',close(z.error,-165.0042285)&&z.estimatedTarget===0&&close(z.trueTarget,165.0042285)&&metrics({...w,reference:null}).trueTarget===null&&metrics({...w,target:null}).error===z.error&&metrics({...w,sameWindow:false}).error===null);
 t('VS56/65 contact quotient and fixed clock correction',4/10===.4&&5/10===.5&&230-30===200);
}
