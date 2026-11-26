# G04 R7f — R2a 缺失可执行见证的替代复核

基准 bd1444d435f3c1c6b1e79ddb4c6e0516c5441e32。原 [R2a](g04-r2a-partial-case-corrections.md) 有15条实际断言的结果记录，未保存原函数；本次新写、实际运行下方 21 条有限断言，覆盖原15项并补缺证/身份/方向分支。不是重现旧脚本或独立审核，不代表真实设备、临床协议、API、许可、标准符合或任意输入正确。DA54 位值为本题设定，未知版本不推实际 API 语义。VS35 仅文本协议证据审查，不进行人体试验。

现行原案例： [PF39](performance-r2-knowledge-cases.md#L25)、[VS35](vocal-science-r2-knowledge-cases.md#L9)、[VS64](vocal-science-r3-knowledge-cases.md#L8)、[VT39](vocal-training-r2-knowledge-cases.md#L13)、[DA04](digital-audio-r1-knowledge-cases.md#L8)、[DA08](digital-audio-r1-knowledge-cases.md#L12)、[DA54](digital-audio-r2-knowledge-cases.md#L31)。本次读取原案例内容确认题定条件。

```js
function runR2aReplacement(){
 const results=[];const check=(n,v)=>{if(!v)throw Error(n);results.push(n)};
 const pf=(a,b,receive,delay,identity,clock,direction)=>identity&&clock&&direction==="B→A"&&[a,b,receive,delay].every(Number.isFinite)&&receive-b===delay?receive-a-delay:null;
 check("PF39 +10ms",pf(1000,1010,1060,50,true,true,"B→A")===10);
 check("PF39 wrong identity",pf(1000,1010,1060,50,false,true,"B→A")===null);
 check("PF39 inconsistent link",pf(1000,1010,1060,45,true,true,"B→A")===null);
 check("PF39 wrong direction",pf(1000,1010,1060,50,true,true,"A→B")===null);
 const cents=(a,b)=>a>0&&b>0&&Number.isFinite(a)&&Number.isFinite(b)?1200*Math.log2(a/b):null;
 const vs=(est,ref,target,valid)=>valid?{error:cents(est,ref),music:cents(ref,target),estimatedTarget:cents(est,target)}:{error:null,music:null,estimatedTarget:null};
 const a=vs(220,220,200,true),b=vs(200,220,200,true);
 check("VS64 reference distinct from target",a.error===0&&Math.abs(a.music-165.0042285)<0.0001);
 check("VS64 target match not reference match",b.estimatedTarget===0&&b.error<0&&b.music===a.music);
 check("VS64 missing reference",vs(200,null,200,true).music===null&&vs(200,null,200,true).error===null);
 check("VS64 invalid window",vs(220,220,200,false).error===null);
 const expected=[{id:"n1",start:0,end:500,clock:"C",hz:200},{id:"n2",start:500,end:1000,clock:"C",hz:220}];
 const vt=(obs,trusted)=>{if(!trusted||obs.length!==expected.length||new Set(obs.map(x=>x.id)).size!==expected.length)return null;let out=[];for(const e of expected){let o=obs.find(x=>x.id===e.id);if(!o||o.clock!==e.clock||o.start!==e.start||o.end!==e.end||!Number.isFinite(o.hz)||o.hz<=0)return null;out.push(cents(o.hz,e.hz));}return out};
 check("VT39 trusted reordered display",JSON.stringify(vt([...expected].reverse(),true))==="[0,0]");
 check("VT39 actual mismatch preserved",vt([{...expected[0],hz:220},{...expected[1],hz:200}],true).every(x=>x!==0));
 check("VT39 duplicate rejected",vt([expected[0],expected[0]],true)===null);
 check("VT39 time mismatch",vt([{...expected[0],start:1},expected[1]],true)===null);
 check("VT39 untrusted join",vt(expected,false)===null);
 const bytes=(frames,channels,container,valid)=>Number.isInteger(container/8)&&valid>0&&valid<=container?frames*channels*container/8:null;
 check("DA04 16-bit",bytes(48000,2,16,16)===192000);
 check("DA04 24-bit",bytes(48000,2,24,24)===288000);
 check("DA04 20 effective in 24 container",bytes(48000,2,24,20)===288000);
 const stft=(win,nfft)=>[win/48000,48000/nfft,nfft/2+1];
 check("DA08 change observation not grid",JSON.stringify([stft(480,960),stft(960,960)])==="[[0.01,50,481],[0.02,50,481]]");
 check("DA08 padding changes grid not window",JSON.stringify([stft(480,960),stft(480,1920)])==="[[0.01,50,481],[0.01,25,961]]");
 const flags=(n,known)=>known?[...(n&2?["inputOverflow"]:[]),...(n&4?["outputUnderflow"]:[]),...(n&16?["primingOutput"]:[])]:null;
 check("DA54 combined synthetic masks",JSON.stringify(flags(6,true))==='["inputOverflow","outputUnderflow"]');
 check("DA54 unknown mapping",flags(6,false)===null);
 check("DA54 priming separate",JSON.stringify(flags(16,true))==='["primingOutput"]');
 return results;
}
console.log(runR2aReplacement());
```

实际结果 21/21：
- PF39 +10ms — PASS
- PF39 wrong identity — PASS
- PF39 inconsistent link — PASS
- PF39 wrong direction — PASS
- VS64 reference distinct from target — PASS
- VS64 target match not reference match — PASS
- VS64 missing reference — PASS
- VS64 invalid window — PASS
- VT39 trusted reordered display — PASS
- VT39 actual mismatch preserved — PASS
- VT39 duplicate rejected — PASS
- VT39 time mismatch — PASS
- VT39 untrusted join — PASS
- DA04 16-bit — PASS
- DA04 24-bit — PASS
- DA04 20 effective in 24 container — PASS
- DA08 change observation not grid — PASS
- DA08 padding changes grid not window — PASS
- DA54 combined synthetic masks — PASS
- DA54 unknown mapping — PASS
- DA54 priming separate — PASS
