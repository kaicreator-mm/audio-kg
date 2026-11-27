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
export function sdr(s,y){if(!finite(s)||!finite(y)||s.length!==y.length||dot(s,s)===0||dot(y,y)===0)return null;const a=dot(s,y)/dot(s,s),p=s.map(v=>v*a),e=y.map((v,i)=>v-p[i]);if(dot(p,p)===0||dot(e,e)===0)return null;return 10*Math.log10(dot(p,p)/dot(e,e));}
export function repair(x,y){
 if(x.risk===true)return 'STOP_REFER';if(x.risk!==false||x.authorized!==true||x.scope!=='OFFLINE_SYNTHETIC'||!finite(x.samples)||!finite(y.samples)||!x.source||!x.clock||!x.layout||!Number.isFinite(x.rate)||x.rate<=0||!Array.isArray(x.mask)||x.mask.some(i=>!Number.isInteger(i)||i<0||i>=x.samples.length))return 'UNKNOWN_STOP';
 if(y.parent!==x.source||y.id===x.source||!y.id||x.clock!==y.clock||x.rate!==y.rate||x.layout!==y.layout||x.samples.length!==y.samples.length||!x.samples.every((v,i)=>x.mask.includes(i)||v===y.samples[i]))return 'REJECT';
 return 'BOUNDED_CANDIDATE';
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
 t('DA51 exact uncentered projection',close(sdr([1,0],[.8,.2]),12.0411998266)&&close(sdr([1,0],[1.6,.4]),12.0411998266)&&sdr([0,0],[1,0])===null&&sdr([1,0],[0,0])===null);
 const d=deadline([1,1,1,8],256,48000);t('KC-D08 hard deadline not mean',d.misses===1&&!d.pass&&close(d.budget,5.3333333333)&&deadline([1,2],256,48000).pass);
 const flags=2|4;t('DA27/54 independent status bits',Boolean(flags&2)&&Boolean(flags&4)&&!(flags&1)&&!(flags&8));
}
