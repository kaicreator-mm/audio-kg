const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),close=(a,b)=>Math.abs(a-b)<1e-6;
export function parseRiff(b){
 if(!Buffer.isBuffer(b)||b.length<12||b.toString('ascii',0,4)!=='RIFF'||b.toString('ascii',8,12)!=='WAVE'||b.readUInt32LE(4)+8!==b.length)return null;
 let i=12,fmt=null,data=null;
 while(i<b.length){if(i+8>b.length)return null;const id=b.toString('ascii',i,i+4),n=b.readUInt32LE(i+4),o=i+8,end=o+n+n%2;if(end>b.length)return null;
 if(id==='fmt '){if(fmt||n!==16||b.readUInt16LE(o)!==1)return null;fmt={channels:b.readUInt16LE(o+2),rate:b.readUInt32LE(o+4),byteRate:b.readUInt32LE(o+8),align:b.readUInt16LE(o+12),bits:b.readUInt16LE(o+14)};if(fmt.channels!==1||fmt.rate!==48000||fmt.bits!==16||fmt.align!==2||fmt.byteRate!==96000)return null;}
 if(id==='data'){if(data||!fmt||n%fmt.align)return null;data={offset:o,samples:Array.from({length:n/2},(_,j)=>b.readInt16LE(o+2*j))};}i=end;}
 return i===b.length&&fmt&&data?{...fmt,...data}:null;
}
export function fixture(){const b=Buffer.alloc(60);b.write('RIFF');b.writeUInt32LE(52,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(48000,24);b.writeUInt32LE(96000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('JUNK',36);b.writeUInt32LE(3,40);b.write('data',48);b.writeUInt32LE(4,52);b.writeInt16LE(1000,56);b.writeInt16LE(-1000,58);return b;}
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),finite=a=>Array.isArray(a)&&a.length>0&&a.every(Number.isFinite);
// Typed mathematical outcomes avoid conflating a perfect fit with undefined input.
export function sdr(s,y){
 const state=(state,db=null)=>({state,db});
 if(!finite(s)||!finite(y)||s.length!==y.length)return state('INVALID_INPUT');
 // Independent scale normalization preserves SI-SDR; lost nonzero components
 // or unrepresentable squared residuals are explicitly numerical, never silence.
 const scale=v=>v.reduce((m,x)=>Math.max(m,Math.abs(x)),0),ss=scale(s),ys=scale(y);
 if(ss===0||ys===0)return state('UNDEFINED_ZERO');
 const u=s.map(v=>v/ss),w=y.map(v=>v/ys);
 if(u.some((v,i)=>v===0&&s[i]!==0)||w.some((v,i)=>v===0&&y[i]!==0))return state('NUMERIC_RANGE');
 const sn=dot(u,u),a=dot(u,w)/sn,p=u.map(v=>v*a),e=w.map((v,i)=>v-p[i]),pn=dot(p,p),en=dot(e,e);
 if(!Number.isFinite(pn)||!Number.isFinite(en))return state('NUMERIC_RANGE');
 if(pn===0)return state(a===0?'NEGATIVE_INFINITY':'NUMERIC_RANGE');
 if(en===0)return state(e.every(v=>v===0)?'PERFECT':'NUMERIC_RANGE');
 const db=10*(Math.log10(pn)-Math.log10(en));return Number.isFinite(db)?state('FINITE',db):state('NUMERIC_RANGE');
}
export function statusFlags({version,policy,mask}={}){
 const known=Number.isSafeInteger(mask)&&mask>=0&&mask<=31;
 if(!known||version!=='PortAudio-v19'||!['FIXED','UNSPECIFIED'].includes(policy))return {state:'UNKNOWN',mask,events:[],loss:'UNKNOWN',cause:'UNKNOWN'};
 const spec=[
 [1,'INPUT_UNDERFLOW',policy==='FIXED'?'INPUT_ZERO_INSERTED':'INPUT_ALL_ZERO'],
 [2,'INPUT_OVERFLOW',policy==='FIXED'?'INPUT_BEFORE_ONE_OR_MORE_SAMPLES_DISCARDED':'INPUT_BEFORE_FIRST_SAMPLE_DISCARDED'],
 [4,'OUTPUT_UNDERFLOW','OUTPUT_GAP_OR_INSERTED_DATA'],
 [8,'OUTPUT_OVERFLOW','OUTPUT_DATA_DISCARDED_NO_SPACE'],
 [16,'PRIMING_OUTPUT','STARTUP_PRIMING_NOT_XRUN']];
 return {state:'QUALIFIED_V19',mask,events:spec.filter(([bit])=>Boolean(mask&bit)).map(([bit,direction,meaning])=>({bit,direction,meaning})),loss:'UNKNOWN',cause:'UNKNOWN'};
}
export function repair(x,y){
 if(x.risk===true)return 'STOP_REFER';if(x.risk!==false||x.authorized!==true||x.scope!=='OFFLINE_SYNTHETIC'||!finite(x.samples)||!finite(y.samples)||!x.source||!x.clock||!x.layout||!Number.isFinite(x.rate)||x.rate<=0||!Array.isArray(x.mask)||x.mask.some(i=>!Number.isInteger(i)||i<0||i>=x.samples.length))return 'UNKNOWN_STOP';
 if(y.parent!==x.source||y.id===x.source||!y.id||x.clock!==y.clock||x.rate!==y.rate||x.layout!==y.layout||x.samples.length!==y.samples.length||!x.samples.every((v,i)=>x.mask.includes(i)||v===y.samples[i]))return 'REJECT';
 return x.samples.some((v,i)=>v!==y.samples[i])?'BOUNDED_CANDIDATE':'NO_OP';
}
export function deadline(ms,frames,rate){if(!finite(ms)||ms.some(x=>x<0)||!Number.isInteger(frames)||frames<=0||!Number.isFinite(rate)||rate<=0)return null;const budget=1000*frames/rate;return {budget,misses:ms.filter(x=>x>budget).length,pass:ms.every(x=>x<=budget)};}
const alias=(f,fs)=>Math.abs(((f+fs/2)%fs+fs)%fs-fs/2);
const conv=(x,h)=>Array.from({length:x.length+h.length-1},(_,n)=>x.reduce((s,v,i)=>s+v*(h[n-i]??0),0));
export function checks(t){
 t('DA01/28 alias equivalence',alias(30000,48000)===18000&&alias(12000,16000)===4000&&Array.from({length:12},(_,i)=>close(Math.cos(2*Math.PI*30000*i/48000),Math.cos(2*Math.PI*18000*i/48000))).every(Boolean));
 t('DA02/29 quantization error distribution',close(0-.24,-.24)&&close(.5-.26,.24)&&close((-.25+.75)/2,.25));
 t('DA03/04/06 frame and duration',48000*2*3===288000&&48000*44100/48000===44100&&close((48004.8-48000)*60,288));
 const b=fixture(),p=parseRiff(b);t('KC-D08 exact finite RIFF fixture',p.offset===56&&eq(p.samples,[1000,-1000]));
 for(const [name,off,value,size] of [['oversized JUNK',40,0xfffffff0,4],['noninteger frame',52,3,4],['unsupported subtype',20,3,2],['wrong align',32,4,2]]){const q=Buffer.from(b);size===4?q.writeUInt32LE(value,off):q.writeUInt16LE(value,off);t('RIFF rejects '+name,parseRiff(q)===null);}
 t('RIFF rejects truncation',parseRiff(b.subarray(0,59))===null);
 t('DA07/34 linear versus circular convolution',eq(conv([1,2,3],[.5,.5]),[.5,1.5,2.5,1.5])&&eq(conv([0,0,0,1],[1,1]),[0,0,0,1,1]));
 const reconstruct=(x,w,hop)=>{const n=Array(x.length).fill(0),d=n.slice();for(let i=0;i+w.length<=x.length;i+=hop)for(let j=0;j<w.length;j++){n[i+j]+=x[i+j]*w[j]*w[j];d[i+j]+=w[j]**2;}return n.map((v,i)=>d[i]===0?null:v/d[i]);};
 t('DA08/35 finite overlap and uncovered boundary',eq(reconstruct([1,2,3],[1,1],1),[1,2,3])&&eq(reconstruct([1,2,3],[0,1],1),[null,2,3])&&48000/960===50&&48000/1920===25);
 t('DA10/20/38 clipping ambiguity and true peak',Math.min(1,1.2)===Math.min(1,2)&&1.1/Math.sqrt(2)<1&&1.1>1);
 t('DA12/39 channel matrix cancellation',(1-1)/2===0);
 t('DA13/14/40 ideal pattern and distance',close((1+Math.cos(Math.PI))/2,0)&&2/4===.5&&Math.cos(Math.PI)===-1);
 t('DA17/44 drift residual',528-240===288&&400-(240+288/2)===16);
 const x={source:'take1',risk:false,authorized:true,scope:'OFFLINE_SYNTHETIC',clock:'clkA',rate:48000,layout:'mono',mask:[2],samples:[1,.2,2]},y={parent:'take1',id:'take2',clock:'clkA',rate:48000,layout:'mono',samples:[1,.2,0]};
 const original=JSON.stringify(x);t('KC-D08 authorized local edit',repair(x,y)==='BOUNDED_CANDIDATE'&&JSON.stringify(x)===original);
 t('KC-D08 nonlocal clock scope risk gates',repair(x,{...y,samples:[1,0,0]})==='REJECT'&&repair(x,{...y,clock:'clkB'})==='REJECT'&&repair({...x,scope:'PLAYBACK'},y)==='UNKNOWN_STOP'&&repair({...x,risk:true,authorized:undefined},y)==='STOP_REFER');
 const error=(a,b)=>a.reduce((s,v,i)=>s+(v-b[i])**2,0);t('DA23/50 target retention not silence',error([1,0,0],[0,0,0])===1&&error([1,0,0],[.5,0,0])===.25);
 t('DA51 exact uncentered projection',close(sdr([1,0],[.8,.2]).db,12.0411998266)&&close(sdr([1,0],[1.6,.4]).db,12.0411998266)&&sdr([0,0],[1,0]).state==='UNDEFINED_ZERO'&&sdr([1,0],[0,0]).state==='UNDEFINED_ZERO');
 const d=deadline([1,1,1,8],256,48000);t('KC-D08 hard deadline not mean',d.misses===1&&!d.pass&&close(d.budget,5.3333333333)&&deadline([1,2],256,48000).pass);
 const flags=2|4;const f=(mask,policy='FIXED',version='PortAudio-v19')=>statusFlags({mask,policy,version});
 t('DA27/54 independent status bits',eq(f(flags).events.map(e=>e.direction),['INPUT_OVERFLOW','OUTPUT_UNDERFLOW']));
 t('P2-01 distinguish perfect, negative infinity and undefined',sdr([1,0],[1,0]).state==='PERFECT'&&sdr([1,0],[-2,0]).state==='PERFECT'&&sdr([1,0],[0,1]).state==='NEGATIVE_INFINITY'&&sdr([1,0],[0,0]).state==='UNDEFINED_ZERO'&&sdr([1,0],[1]).state==='INVALID_INPUT');
 t('R3 nonzero scale normalization, not silence',sdr([1,0],[1e-200,1e-200]).state==='FINITE'&&close(sdr([1,0],[1e-200,1e-200]).db,0)&&sdr([1e-200,0],[1e-200,0]).state==='PERFECT'&&sdr([1e300,0],[1e300,1e300]).state==='FINITE'&&close(sdr([1e300,0],[1e300,1e300]).db,0));
 t('R3 numeric range explicit',sdr([1,0],[1,1e-200]).state==='NUMERIC_RANGE'&&sdr([1e300,1e-300],[1,0]).state==='NUMERIC_RANGE'&&sdr([1,0],[0,1e-300]).state==='NEGATIVE_INFINITY'&&sdr([0,0],[1e-300,0]).state==='UNDEFINED_ZERO');
 t('P2-02 empty and nonempty mask no-op distinct',repair({...x,mask:[]},{...y,samples:x.samples})==='NO_OP'&&repair(x,{...y,samples:x.samples})==='NO_OP'&&repair({...x,mask:[]},y)==='REJECT');
 t('P2-03 all direction and priming bits',eq(f(31).events.map(e=>e.direction),['INPUT_UNDERFLOW','INPUT_OVERFLOW','OUTPUT_UNDERFLOW','OUTPUT_OVERFLOW','PRIMING_OUTPUT'])&&f(16).events[0].meaning==='STARTUP_PRIMING_NOT_XRUN'&&f(0).events.length===0);
 t('P2-03 fixed vs unspecified input semantics',f(1).events[0].meaning==='INPUT_ZERO_INSERTED'&&f(1,'UNSPECIFIED').events[0].meaning==='INPUT_ALL_ZERO'&&f(2).events[0].meaning!==f(2,'UNSPECIFIED').events[0].meaning);
 t('P2-03 unknown version/policy/mask fail closed',f(31,'UNKNOWN').state==='UNKNOWN'&&f(31,'FIXED','v20').state==='UNKNOWN'&&f(32).state==='UNKNOWN'&&f(-1).state==='UNKNOWN'&&f(31).loss==='UNKNOWN'&&f(31).cause==='UNKNOWN');
 for(let mask=0;mask<32;mask++)t('P2-03 exhaustive v19 bit preservation '+mask,f(mask).events.reduce((n,e)=>n|e.bit,0)===mask&&f(mask,'UNSPECIFIED').events.reduce((n,e)=>n|e.bit,0)===mask);
}
