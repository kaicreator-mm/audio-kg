// Finite synthetic production-domain witnesses. No host, audio or rights execution.
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),close=(a,b,e=1e-9)=>Math.abs(a-b)<=e;
export function regionMap({sourceStart,sourceEnd,projectStart,projectEnd}={}){
 if(![sourceStart,sourceEnd,projectStart,projectEnd].every(Number.isFinite)||sourceEnd<sourceStart||projectEnd<projectStart)return null;
 return {sourceLength:sourceEnd-sourceStart,projectLength:projectEnd-projectStart,sourceStart,sourceEnd,projectStart,projectEnd};
}
export function routeGraph({nodes,edges,source,master}={}){if(!Array.isArray(nodes)||!Array.isArray(edges)||!source||!master)return 'UNKNOWN';const ids=new Set(nodes);if(ids.size!==nodes.length||!ids.has(source)||!ids.has(master)||edges.some(e=>!ids.has(e.from)||!ids.has(e.to)||!['AUDIO','SIDECHAIN'].includes(e.kind)))return 'INVALID';const seen=new Set([source]);let changed=true;while(changed){changed=false;for(const e of edges)if(e.kind==='AUDIO'&&seen.has(e.from)&&!seen.has(e.to)){seen.add(e.to);changed=true;}}return seen.has(master)?'AUDIO_CONNECTED':'NO_AUDIO_PATH';}
export function sendLevel(input,fader,send,pre){if(![input,fader,send].every(Number.isFinite))return null;return input*send*(pre?1:fader);}
export function panMono(x,theta){if(!Number.isFinite(x)||!Number.isFinite(theta)||theta<0||theta>Math.PI/2)return null;return [x*Math.cos(theta),x*Math.sin(theta)];}
export function downmix(stereo,weights=[.5,.5]){if(!Array.isArray(stereo)||stereo.length!==2||!Array.isArray(weights)||weights.length!==2||!stereo.concat(weights).every(Number.isFinite))return null;return stereo[0]*weights[0]+stereo[1]*weights[1];}
export function compressStatic(x,threshold,ratio,makeup=0){if(![x,threshold,ratio,makeup].every(Number.isFinite)||ratio<1)return null;const y=x>threshold?threshold+(x-threshold)/ratio:x;return y+makeup;}
export function envelope(points,t,mode='LINEAR'){
 if(!Array.isArray(points)||!Number.isFinite(t)||!['LINEAR','HOLD'].includes(mode)||points.length<2||points.some(x=>!x||typeof x!=='object'||Array.isArray(x)||!Number.isFinite(x.t)||!Number.isFinite(x.v)))return null;
 const p=points.slice().sort((a,b)=>a.t-b.t);
 if(new Set(p.map(x=>x.t)).size!==p.length||t<p[0].t||t>p.at(-1).t)return null;
 // A control point takes effect when its timestamp is reached, including the terminal point.
 let i=0;while(i+1<p.length&&t>=p[i+1].t)i++;
 if(mode==='HOLD'||i===p.length-1)return p[i].v;
 const a=p[i],b=p[i+1],u=(t-a.t)/(b.t-a.t);
 return a.v+(b.v-a.v)*u;
}
export function tempoTime(segments,beat){
 if(!Array.isArray(segments)||segments.length===0||!Number.isFinite(beat)||beat<0)return null;
 let previousEnd=0;
 for(let i=0;i<segments.length;i++){
  const s=segments[i];
  if(!s||typeof s!=='object'||Array.isArray(s)||!Number.isFinite(s.startBeat)||!Number.isFinite(s.endBeat)||!Number.isFinite(s.bpm)||s.startBeat<0||s.bpm<=0||s.endBeat<=s.startBeat)return null;
  if(i===0?s.startBeat!==0:s.startBeat!==previousEnd)return null;
  previousEnd=s.endBeat;
 }
 if(beat>previousEnd)return null;
 let total=0;
 for(const s of segments){
  if(beat<=s.startBeat)break;
  const stop=Math.min(beat,s.endBeat);
  if(stop>s.startBeat)total+=(stop-s.startBeat)*60/s.bpm;
  if(beat<=s.endBeat)break;
 }
 return Number.isFinite(total)?total:null;
}
export function effectChain(input,ops){if(!Number.isFinite(input)||!Array.isArray(ops))return null;let x=input;for(const o of ops){if(o.type==='GAIN')x*=o.value;else if(o.type==='COMPRESS')x=compressStatic(x,o.threshold,o.ratio);else return null;}return Number.isFinite(x)?x:null;}
export function compareVersions(a,b,{sameSource=true,matched=false}={}){if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length||!a.every(Number.isFinite)||!b.every(Number.isFinite))return 'UNKNOWN';return sameSource&&matched&&eq(a,b)?'MODEL_MATCH_ONLY':'LISTENING_REQUIRED';}
export function auditDelivery({master,stems,project,rawTakes,dependencies,requiredEdits}={}){if(!Array.isArray(requiredEdits)||!Array.isArray(dependencies))return 'UNKNOWN';if(requiredEdits.includes('EDIT_TAKE')&&!rawTakes)return 'INSUFFICIENT';if(requiredEdits.includes('EDIT_PLUGIN')&&!project)return 'INSUFFICIENT';if(requiredEdits.includes('EDIT_MIX')&&!stems&&!project)return 'INSUFFICIENT';return master?'CANDIDATE':'UNKNOWN';}
export function backupComplete({required,available,independent}={}){if(!Array.isArray(required)||!Array.isArray(available)||typeof independent!=='boolean')return 'UNKNOWN';return independent&&required.every(x=>available.includes(x))?'COMPLETE_CANDIDATE':'INCOMPLETE';}
export function reviseState({permission,scopeValid,protectedValid,validation,approved}={}){if(permission!=='GRANTED')return 'STOP';if(scopeValid!==true||protectedValid!==true||validation!==true)return 'REJECTED';return approved===true?'ACCEPT_CANDIDATE':'WAIT_CONFIRMATION';}
export function gatedBlocks(blocks,absoluteGate=-70,relativeOffset=-10){if(!Array.isArray(blocks)||!blocks.length||!blocks.every(Number.isFinite)||!Number.isFinite(absoluteGate)||!Number.isFinite(relativeOffset))return null;const abs=blocks.filter(x=>x>absoluteGate);if(!abs.length)return [];const mean=10*Math.log10(abs.reduce((s,x)=>s+10**(x/10),0)/abs.length);const threshold=mean+relativeOffset;return abs.filter(x=>x>threshold);}
export function reproducibility({sourceHashes,plugins,route,environment,tolerance}={}){if(!Array.isArray(sourceHashes)||!Array.isArray(plugins)||!Array.isArray(route)||!environment||!tolerance)return 'UNKNOWN';if(!sourceHashes.length||sourceHashes.some(x=>!x)||plugins.some(x=>!x.available))return 'DEGRADED_NOT_EDITABLE';return 'CANDIDATE_NOT_EXECUTED';}
export function validateLoudness(x){if(!x||typeof x.standard!=='string'||!Number.isFinite(x.integrated)||!Number.isFinite(x.samplePeak)||!Number.isFinite(x.truePeak)||!Number.isFinite(x.lra))return 'UNKNOWN';if(x.standard==='R128'&&x.programme==='ORDINARY_LINEAR'&&x.truePeak> -1)return 'FAIL_TRUE_PEAK';return 'MEASUREMENTS_SEPARATE';}
export function checks(t){
 const r=regionMap({sourceStart:100,sourceEnd:500,projectStart:9600,projectEnd:9980});
 t('MP01/25 stable source hash differs from path and project position',r.sourceLength===400&&r.projectLength===380&&regionMap({sourceStart:100,sourceEnd:500,projectStart:0,projectEnd:400}).sourceStart===100);
 t('MP02 route graph distinguishes audio and sidechain control edges',routeGraph({nodes:['T1','FX','BUS','MASTER','D'],edges:[{from:'T1',to:'FX',kind:'AUDIO'},{from:'FX',to:'BUS',kind:'AUDIO'},{from:'BUS',to:'MASTER',kind:'AUDIO'},{from:'D',to:'FX',kind:'SIDECHAIN'}],source:'T1',master:'MASTER'})==='AUDIO_CONNECTED'&&routeGraph({nodes:['D','FX','MASTER'],edges:[{from:'D',to:'FX',kind:'SIDECHAIN'}],source:'D',master:'MASTER'})==='NO_AUDIO_PATH'&&routeGraph({nodes:['T1','FX'],edges:[{from:'T1',to:'MISSING',kind:'AUDIO'}],source:'T1',master:'FX'})==='INVALID');
 t('MP03 snapshot is not an independent complete backup',backupComplete({required:['M1','M2','plugin-v1'],available:['M1'],independent:false})==='INCOMPLETE'&&backupComplete({required:['M1','M2','plugin-v1'],available:['M1','M2','plugin-v1'],independent:true})==='COMPLETE_CANDIDATE');
 t('MP04 non-destructive region length',r.sourceLength===400&&r.projectLength===380);
 t('MP05 absolute and musical locks differ',4*60/120===2&&4*60/60===4);
 t('MP06 envelope interpolation and hold',close(envelope([{t:0,v:0},{t:2,v:1}],1),.5)&&envelope([{t:0,v:0},{t:2,v:1}],1,'HOLD')===0);
 t('MP07 take comp retains independent sources',eq([{take:'A',from:0,to:4},{take:'B',from:4,to:8}].map(x=>x.take),['A','B']));
 t('MP08 pitch centre correction preserves relative cents',close(430*(440/430),440)&&close(1200*Math.log2(1.01/1),17.23,.02));
 t('MP09 dynamic de-ess leaves non-target region',1*.5===.5&&.4===.4);
 t('MP10 static compression only above threshold',compressStatic(-11,-10,10)===-11&&compressStatic(0,-10,10)===-9);
 t('MP11 dry wet and tail remain separate',eq([1*.75,1*.25],[.75,.25])&&eq([0,1,0],[0,1,0]));
 t('MP12 effect order noncommutative',compressStatic(-6,-10,2)!==compressStatic(-12,-10,2)+6);
 t('MP13 multi-factor clarity not one SNR',new Set(['level','frequency','timing','monitoring']).size===4);
 t('MP14 anti-phase mono cancellation',downmix([1,-1],[.5,.5])===0);
 t('MP15 local automation can alter downstream bus',compressStatic(.4+.5,-.6,2)!==compressStatic(.6+.5,-.6,2));
 t('MP16 LUFS peak and LRA are independent fields',validateLoudness({standard:'R128',programme:'ORDINARY_LINEAR',integrated:-23,samplePeak:-2,truePeak:-.5,lra:7})==='FAIL_TRUE_PEAK');
 t('MP17 playback gain does not mutate source version',-10-4===-14&&'M1'!=='PLAYBACK_GAIN_M1');
 t('MP18 channel policy must bind standard and mode',validateLoudness({standard:'STREAMING_NORMAL',programme:'PLAYBACK',integrated:-14,samplePeak:-1,truePeak:-.8,lra:4})==='MEASUREMENTS_SEPARATE');
 t('MP19 delivery edit capability must match requested edits',auditDelivery({master:true,stems:true,project:false,rawTakes:false,dependencies:[],requiredEdits:['EDIT_TAKE']})==='INSUFFICIENT');
 t('MP20 common origin is independent from equal file length',4800!==9600&&r.projectLength===380);
 t('MP21 reproducibility requires environment and dependencies',auditDelivery({master:true,stems:true,project:true,rawTakes:true,dependencies:['plugin-v1','media-h1'],requiredEdits:['EDIT_PLUGIN']})==='CANDIDATE');
 t('MP22 shared source mutation violates protected region',regionMap({sourceStart:0,sourceEnd:100,projectStart:0,projectEnd:100}).sourceLength===100);
 t('MP23 amplitude match is not listening evidence',compareVersions([.2,.4],[.2,.4],{sameSource:true,matched:true})==='MODEL_MATCH_ONLY'&&compareVersions([.2,.4],[.2,.4],{sameSource:true,matched:false})==='LISTENING_REQUIRED');
 t('MP24 reject rollback stop and confirmation are distinct',reviseState({permission:'REVOKED',scopeValid:true,protectedValid:true,validation:true,approved:true})==='STOP'&&reviseState({permission:'GRANTED',scopeValid:false,protectedValid:true,validation:true,approved:true})==='REJECTED'&&reviseState({permission:'GRANTED',scopeValid:true,protectedValid:true,validation:true,approved:false})==='WAIT_CONFIRMATION'&&reviseState({permission:'GRANTED',scopeValid:true,protectedValid:true,validation:true,approved:true})==='ACCEPT_CANDIDATE');
 t('MP25 same path different hash is content change',({path:'a.wav',hash:'H1'}).path===({path:'a.wav',hash:'H2'}).path&&'H1'!=='H2');
 t('MP26 pre/post send tap differ',sendLevel(1,.5,.2,true)===.2&&sendLevel(1,.5,.2,false)===.1);
 t('MP27 backup closure includes external media and plugin dependencies',backupComplete({required:['M1','M2','plugin-v1'],available:['M1','M2'],independent:true})==='INCOMPLETE'&&backupComplete({required:['M1','M2','plugin-v1'],available:['M1','M2','plugin-v1'],independent:true})==='COMPLETE_CANDIDATE');
 t('MP28 crossfade can cancel anti-phase material',close((1-1/2)*1+(1/2)*-1,0));
 t('MP29 tempo map piecewise integration',close(tempoTime([{startBeat:0,endBeat:4,bpm:120},{startBeat:4,endBeat:8,bpm:60}],6),4));
 t('K09-RV01 HOLD switches at exact keyframes and terminal point',envelope([{t:0,v:0},{t:2,v:1},{t:4,v:2}],0,'HOLD')===0&&envelope([{t:0,v:0},{t:2,v:1},{t:4,v:2}],1,'HOLD')===0&&envelope([{t:0,v:0},{t:2,v:1},{t:4,v:2}],2,'HOLD')===1&&envelope([{t:0,v:0},{t:2,v:1},{t:4,v:2}],3,'HOLD')===1&&envelope([{t:0,v:0},{t:2,v:1},{t:4,v:2}],4,'HOLD')===2);
 t('K09-RV01 LINEAR returns exact terminal control-point value',envelope([{t:0,v:0},{t:2,v:1},{t:4,v:2}],4,'LINEAR')===2);
 t('K09-RV01 malformed control points fail closed',envelope([null,{t:1,v:2}],1,'HOLD')===null&&envelope([{t:0,v:0},{t:0,v:1}],0,'HOLD')===null);
 t('K09-RV02 tempo maps reject gaps overlaps unsorted and incomplete origin',tempoTime([{startBeat:0,endBeat:4,bpm:120},{startBeat:5,endBeat:8,bpm:60}],6)===null&&tempoTime([{startBeat:0,endBeat:5,bpm:120},{startBeat:4,endBeat:8,bpm:60}],6)===null&&tempoTime([{startBeat:4,endBeat:8,bpm:60},{startBeat:0,endBeat:4,bpm:120}],6)===null&&tempoTime([{startBeat:1,endBeat:4,bpm:120}],2)===null);
 t('K09-RV02 tempo map validates the full segment list before partial integration',tempoTime([{startBeat:0,endBeat:4,bpm:120},{startBeat:4,endBeat:8,bpm:60},{startBeat:7,endBeat:9,bpm:90}],2)===null&&tempoTime([{startBeat:0,endBeat:4,bpm:120},{startBeat:4,endBeat:8,bpm:60}],4)===2&&tempoTime([{startBeat:0,endBeat:4,bpm:120},{startBeat:4,endBeat:8,bpm:60}],8)===6);
 t('MP30 envelope local point must preserve full curve',envelope([{t:0,v:0},{t:4,v:4},{t:10,v:0},{t:20,v:0}],2)===2&&envelope([{t:0,v:0},{t:10,v:0},{t:20,v:0}],2)===0);
 t('MP31 comp boundary retains source identity',eq(['A','B'].map((take,i)=>({take,from:i*4,to:(i+1)*4})).map(x=>x.to-x.from),[4,4]));
 t('MP32 music onset and acoustic onset distinct',.2-.14===.06&&.5-.2===.3);
 t('MP33 de-ess false positive requires non-target witness',new Set(['target-sibilant','protected-fricative']).size===2);
 t('MP34 static curve and time response differ',compressStatic(0,-10,2)===-5&&0!==-5);
 t('MP35 tempo delay and reverb are not identical',.25===60/120/2&&'DELAY'!=='REVERB');
 t('MP36 sidechain does not enter audio sum by default',sendLevel(1,1,.5,true)===.5);
 t('MP37 frequency overlap is not global loudness',([1,.5]).length===2&&([1,2]).length===2);
 t('MP38 pan law and balance are different operations',eq(panMono(1,Math.PI/4).map(x=>Number(x.toFixed(4))),[.7071,.7071])&&eq([.4,.8],[.4,.8]));
 t('MP39 bus compression can change unedited bus contribution',compressStatic(.4+.5,.6,2)!==compressStatic(.6+.5,.6,2));
 t('MP40 absolute and relative loudness gates are distinct',eq(gatedBlocks([-70,-69,-20]),[-20])&&gatedBlocks([-80,-75])?.length===0);
 t('MP41 encoded true peak is version-specific',validateLoudness({standard:'R128',programme:'ORDINARY_LINEAR',integrated:-23,samplePeak:-2,truePeak:-.7,lra:5})==='FAIL_TRUE_PEAK');
 t('MP42 versioned channel policy unknown stays separate',validateLoudness({standard:'CUSTOM',programme:'UNKNOWN',integrated:-14,samplePeak:-2,truePeak:-1,lra:3})==='MEASUREMENTS_SEPARATE');
 t('MP43 processed stem cannot satisfy original-take edit',auditDelivery({master:true,stems:true,project:false,rawTakes:false,dependencies:[],requiredEdits:['EDIT_TAKE']})==='INSUFFICIENT');
 t('MP44 equal stem length does not imply event alignment',48000===48000&&4800!==9600);
 t('MP45 reproducibility depends on source plugins route environment and tolerance',reproducibility({sourceHashes:['H1'],plugins:[{available:true}],route:['T1>FX>BUS'],environment:'E1',tolerance:'DECLARED'})==='CANDIDATE_NOT_EXECUTED'&&reproducibility({sourceHashes:['H1'],plugins:[{available:false}],route:['T1>FX>BUS'],environment:'E1',tolerance:'DECLARED'})==='DEGRADED_NOT_EDITABLE');
 t('MP46 shared source is protected across snapshots',regionMap({sourceStart:0,sourceEnd:100,projectStart:0,projectEnd:100}).sourceLength===100);
 t('MP47 louder candidate is not automatically preferred',compareVersions([.4,.8],[.2,.4],{sameSource:true,matched:false})==='LISTENING_REQUIRED');
 t('MP48 permission revoke must stop, not retry',reviseState({permission:'REVOKED',scopeValid:true,protectedValid:true,validation:true,approved:false})==='STOP');
}
