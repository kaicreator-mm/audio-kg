const finite=x=>Number.isFinite(x);
export function cents(a,b){return a>0&&b>0?1200*Math.log2(a/b):null;}
function chromaDistance(a,b){const c=cents(a,b);if(c===null)return null;const x=((c%1200)+1200)%1200;return Math.min(x,1200-x);}
export function f0Metrics(ref,est,rv,ev,mask,tol=50){
 const n=ref.length;if([est,rv,ev,mask].some(x=>x.length!==n))return null;
 const valid=ref.map((x,i)=>mask[i]===true&&x!==null&&est[i]!==null&&finite(x)&&finite(est[i]));
 const r=valid.map((v,i)=>v&&rv[i]===true&&ref[i]>0),e=valid.map((v,i)=>v&&ev[i]===true);
 const p=valid.map((v,i)=>r[i]&&Math.abs(est[i])>0&&Math.abs(cents(Math.abs(ref[i]),Math.abs(est[i])))<=tol);
 const c=valid.map((v,i)=>r[i]&&Math.abs(est[i])>0&&chromaDistance(Math.abs(ref[i]),Math.abs(est[i]))<=tol);
 const nrv=r.filter(Boolean).length,nuv=valid.filter((v,i)=>v&&!r[i]).length,nvalid=valid.filter(Boolean).length;
 const count=x=>x.filter(Boolean).length;
 return {validFrames:nvalid,referenceVoicedFrames:nrv,rawPitchAccuracy:nrv?count(p)/nrv:null,rawChromaAccuracy:nrv?count(c)/nrv:null,voicingRecall:nrv?count(r.map((v,i)=>v&&e[i]))/nrv:null,voicingFalseAlarm:nuv?count(e.map((v,i)=>v&&!r[i]))/nuv:null,overallAccuracy:nvalid?count(valid.map((v,i)=>v&&((r[i]&&e[i]&&p[i])||(!r[i]&&!e[i]))))/nvalid:null};
}
export function maximumMatching(a,b,ok){
 const match=Array(b.length).fill(-1);
 function visit(i,seen){for(let j=0;j<b.length;j++){if(seen[j]||!ok(a[i],b[j]))continue;seen[j]=true;if(match[j]<0||visit(match[j],seen)){match[j]=i;return true;}}return false;}
 let count=0;for(let i=0;i<a.length;i++)if(visit(i,Array(b.length).fill(false)))count++;
 return {count,pairs:match.map((i,j)=>i<0?null:[i,j]).filter(Boolean)};
}
export function beatMetrics(ref,est,tol){const x=maximumMatching(ref,est,(a,b)=>Math.abs(a-b)<=tol);return {matched:x.count,precision:est.length?x.count/est.length:null,recall:ref.length?x.count/ref.length:null};}
export function noteMatch(ref,est,{onsetTolerance=.05,offsetTolerance=.1,pitchTolerance=50}={}){return maximumMatching(ref,est,(a,b)=>Math.abs(a.onset-b.onset)<=onsetTolerance&&Math.abs(a.onset+a.duration-b.onset-b.duration)<=offsetTolerance&&Math.abs(cents(a.pitch,b.pitch))<=pitchTolerance&&(a.voice==null||b.voice==null||a.voice===b.voice));}
export function durationWeightedAccuracy(rows){const v=rows.filter(x=>finite(x.duration)&&x.duration>0&&x.correct!==null),d=v.reduce((s,x)=>s+x.duration,0);return d?v.reduce((s,x)=>s+x.duration*(x.correct?1:0),0)/d:null;}
export function pairedSummary(xs){const v=xs.filter(finite);if(v.length<2)return null;const mean=v.reduce((a,b)=>a+b,0)/v.length,variance=v.reduce((s,x)=>s+(x-mean)**2,0)/(v.length-1);return {n:v.length,mean,variance,standardError:Math.sqrt(variance/v.length)};}
export function protocolFor(t){return t==='small_impairment'?'ITU-R BS.1116-3':t==='intermediate_quality'?'ITU-R BS.1534-3_MUSHRA':['open_preference','cultural_fit'].includes(t)?'CUSTOM_PROTOCOL_REQUIRED':'TASK_SCOPE_UNRESOLVED';}
export function sourceLeakage(a,b){return a.some(x=>b.includes(x));}
export function reportIdentityValid(a,b){return ['task','inputHash','referenceId','referenceVersion','candidateId','candidateVersion','sourceGroup','metricVersion','maskId','tolerance','splitId','implementationVersion','protocolVersion'].every(k=>a?.[k]!==undefined&&a[k]===b[k]);}
export function hardGate(g){const k=['technical','music','rights','safety','delivery','review'];if(k.some(x=>g?.[x]==='FAIL'))return 'STOP';if(k.some(x=>g?.[x]!=='PASS'))return 'HOLD_UNKNOWN';return 'PASS';}
export const checks=[
 ['octave interval is 1200 cents',Math.abs(cents(440,220)-1200)<1e-9],
 ['zero F0 has no pitch interval',cents(0,220)===null],
 ['F0 denominators match finite reference witness',(()=>{const x=f0Metrics([220,220,220,0,null],[220,440,0,220,440],[true,true,true,false,false],[true,true,false,true,true],[true,true,true,true,false]);return x.rawPitchAccuracy===1/3&&x.rawChromaAccuracy===2/3&&x.voicingRecall===2/3&&x.voicingFalseAlarm===1&&x.overallAccuracy===1/4;})()],
 ['unknown reference frame is excluded',f0Metrics([220,null],[220,0],[true,false],[true,false],[true,false]).validFrames===1],
 ['pitch candidate and voicing decision remain separate',(()=>{const x=f0Metrics([220],[-220],[true],[false],[true]);return x.rawPitchAccuracy===1&&x.voicingRecall===0&&x.overallAccuracy===0;})()],
 ['one estimate cannot satisfy two beat references',beatMetrics([1],[.99,1.01],.03).matched===1],
 ['beat precision and recall use separate denominators',(()=>{const x=beatMetrics([1,2],[1.01],.03);return x.precision===1&&x.recall===.5;})()],
 ['maximum matching avoids greedy undercount',maximumMatching([0,.1],[.04,-.05],(a,b)=>Math.abs(a-b)<=.061).count===2],
 ['note matching includes onset/offset/pitch/voice',noteMatch([{onset:0,duration:1,pitch:440,voice:'A'}],[{onset:.01,duration:.99,pitch:440,voice:'A'}]).count===1],
 ['wrong voice identity is not matched',noteMatch([{onset:0,duration:1,pitch:440,voice:'A'}],[{onset:0,duration:1,pitch:440,voice:'B'}]).count===0],
 ['duration weighting uses duration denominator',durationWeightedAccuracy([{duration:9,correct:true},{duration:1,correct:false}])===.9],
 ['unknown segment is excluded from weighted denominator',durationWeightedAccuracy([{duration:9,correct:true},{duration:1,correct:null}])===1],
 ['small impairment selects BS.1116',protocolFor('small_impairment')==='ITU-R BS.1116-3'],
 ['intermediate quality selects MUSHRA BS.1534',protocolFor('intermediate_quality')==='ITU-R BS.1534-3_MUSHRA'],
 ['open preference needs a separate protocol',protocolFor('open_preference')==='CUSTOM_PROTOCOL_REQUIRED'],
 ['cultural fit is not silently scored by MUSHRA',protocolFor('cultural_fit')==='CUSTOM_PROTOCOL_REQUIRED'],
 ['paired summary uses sample variance',(()=>{const x=pairedSummary([1,2,-1,2]);return x.n===4&&x.mean===1&&x.variance===2&&Math.abs(x.standardError-Math.sqrt(.5))<1e-9;})()],
 ['one paired sample cannot estimate variance',pairedSummary([1])===null],
 ['same source group across train/test is leakage',sourceLeakage(['g1','g2'],['g2'])],
 ['disjoint source groups have no overlap',!sourceLeakage(['g1'],['g2'])],
 ['report identity binds every versioned dimension',reportIdentityValid({task:'f',inputHash:'h',referenceId:'r',referenceVersion:'1',candidateId:'c',candidateVersion:'1',sourceGroup:'g',metricVersion:'m',maskId:'x',tolerance:50,splitId:'s',implementationVersion:'i',protocolVersion:'p'},{task:'f',inputHash:'h',referenceId:'r',referenceVersion:'1',candidateId:'c',candidateVersion:'1',sourceGroup:'g',metricVersion:'m',maskId:'x',tolerance:50,splitId:'s',implementationVersion:'i',protocolVersion:'p'})],
 ['changed metric version invalidates report',!reportIdentityValid({task:'f',inputHash:'h',referenceId:'r',referenceVersion:'1',candidateId:'c',candidateVersion:'1',sourceGroup:'g',metricVersion:'m',maskId:'x',tolerance:50,splitId:'s',implementationVersion:'i',protocolVersion:'p'},{task:'f',inputHash:'h',referenceId:'r',referenceVersion:'1',candidateId:'c',candidateVersion:'1',sourceGroup:'g',metricVersion:'m2',maskId:'x',tolerance:50,splitId:'s',implementationVersion:'i',protocolVersion:'p'})],
 ['rights UNKNOWN blocks a high technical score',hardGate({technical:'PASS',music:'PASS',rights:'UNKNOWN',safety:'PASS',delivery:'PASS',review:'PASS'})==='HOLD_UNKNOWN'],
 ['rights FAIL cannot be compensated by score',hardGate({technical:'PASS',music:'PASS',rights:'FAIL',safety:'PASS',delivery:'PASS',review:'PASS',score:100})==='STOP'],
 ['all independent gates must pass',hardGate({technical:'PASS',music:'PASS',rights:'PASS',safety:'PASS',delivery:'PASS',review:'PASS'})==='PASS'],
 ['missing gate never defaults to PASS',hardGate({technical:'PASS',music:'PASS',rights:'PASS',safety:'PASS',delivery:'PASS'})==='HOLD_UNKNOWN']
];
export const hardRubric={denominators:'reference voiced / unvoiced / all valid separate',matching:'one-to-one maximum matching',protocols:'BS.1116 small impairment; BS.1534 MUSHRA intermediate quality',evidence:'no real audio or listening executed',reportIdentity:'task/input/reference/candidate/source/metric/mask/tolerance/split/implementation/protocol',gates:'rights and safety are non-compensable'};
