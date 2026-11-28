function runK19Finite(){
 const close=(x,y)=>Math.abs(x-y)<1e-8, finite=Number.isFinite, cp=x=>JSON.parse(JSON.stringify(x));
 // Fixed JSON-like objects: named map keys unordered, arrays ordered.
 function equal(a,b){if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object"||Array.isArray(a)!==Array.isArray(b))return false;if(Array.isArray(a))return a.length===b.length&&a.every((v,i)=>equal(v,b[i]));const ak=Object.keys(a),bk=Object.keys(b);return ak.length===bk.length&&ak.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]))}
 function pointLoss(a,b){return finite(a)&&finite(b)&&a>0&&b>0?-20*Math.log10(b/a):null}
 function timeMs(d,c){return finite(d)&&finite(c)&&d>=0&&c>0?1000*d/c:null}
 function range(x){return Array.isArray(x)&&x.length>0&&x.every(finite)?Math.max(...x)-Math.min(...x):null}
 // Only identical-location, same-weighting, uninterrupted synthetic segments.
 function energyMean(x){if(!Array.isArray(x)||!x.length||!x.every(z=>z&&finite(z.db)&&z.db>=0&&z.db<=90&&finite(z.seconds)&&z.seconds>0))return null;return 10*Math.log10(x.reduce((s,z)=>s+z.seconds*10**(z.db/10),0)/x.reduce((s,z)=>s+z.seconds,0))}
 function send(input,tap,fader,sendGain){if(![input,fader,sendGain].every(x=>finite(x)&&x>=0&&x<=1)||!["pre","post"].includes(tap))return null;return input*sendGain*(tap==="post"?fader:1)}
 function subscription(tx,rx){return Array.isArray(tx)&&Array.isArray(rx)&&tx.some(x=>rx.includes(x))}
 // Only the named synthetic scene, one allowed change with new version.
 const base={fixture:"LS-J1",venue:"V-A",program:"PG1",scene:"S1",layout:"L1",input:"I1",network:"N1",clock:"C1",protocol:"P1",points:["A","B","C"],reference:"A",audienceProfile:"GENERAL_ADULT_FIXTURE",audiencePolicy:"SYNTHETIC-GENERAL-POLICY-1",peakCriterion:"SYNTHETIC-PEAK-CRITERION-1",peakContext:"SYNTHETIC-PEAK-CONTEXT-1",telemetryWindow:"SYNTHETIC-WINDOW-1",subscription:"SYNTHETIC-SUBSCRIPTION-1",protectedMonitor:"MON-A1",protectedSystem:"SYS1",outputRoute:["CH1","MAIN","OUT1"],params:{eqChoice:"E1",monitorChoice:"M1"},epoch:"T1"};
 const edit={...cp(base),scene:"S2",params:{eqChoice:"E2",monitorChoice:"M1"},epoch:"T2"};
 const allowed=c=>equal(c,base)||equal(c,edit);
 const obs=(c)=>({identity:cp(c),kind:"SYNTHETIC_STIPULATION",actual:false,coverage:[{id:"A",db:-3},{id:"B",db:0},{id:"C",db:-1}],clarity:[{id:"A",ok:true},{id:"B",ok:true},{id:"C",ok:true}],spectral:[{id:"A",ok:true},{id:"B",ok:true},{id:"C",ok:true}],calibration:{instrument:"METER1",before:true,after:true,driftWithinApproved:true},stability:true,clockLocked:true,mediaCurrent:true,latePackets:0,telemetry:{kind:"SYNTHETIC_PACKET_COUNTER",subscription:c.subscription,window:c.telemetryWindow,coverageComplete:true,available:true},exposure:{reference:"A",audienceProfile:c.audienceProfile,audiencePolicy:c.audiencePolicy,policyApplicable:true,peakCriterion:c.peakCriterion,peakContext:c.peakContext,peakKnown:true,peakWithinApproved:true,audienceRule:"WHO-2022",audienceWindow:"moving-15min",audienceKnown:true,audienceWithinApproved:true,workerRule:"NIOSH-REL",workerKnown:true,workerWithinApproved:true,peakReviewed:true},currentStateKnown:true,protectedVerified:true,independentReview:true});
 const g={syntheticOnly:true,actualActuation:false,permission:true,siteSafety:true,localRulesKnown:true,operatorConfirmed:true};
 function rows(rows,points,key){return Array.isArray(rows)&&rows.length===points.length&&rows.every(z=>z&&Object.hasOwn(z,"id")&&Object.hasOwn(z,key))&&new Set(rows.map(z=>z.id)).size===points.length&&points.every(id=>rows.some(z=>z.id===id))}
 function gate(c,o,scope){
   if(!allowed(c))return "OUTSIDE_FIXTURE";
   if(!scope||scope.syntheticOnly!==true||scope.actualActuation!==false||!["permission","siteSafety","localRulesKnown","operatorConfirmed"].every(k=>scope[k]===true))return "STOP_OR_PENDING";
   if(!o||!equal(o.identity,c)||o.kind!=="SYNTHETIC_STIPULATION"||o.actual!==false)return "NOT_READY";
   const cal=o.calibration,e=o.exposure;
   if(!cal||cal.instrument!=="METER1"||!["before","after","driftWithinApproved"].every(k=>cal[k]===true)||!e||e.reference!==c.reference||e.audienceProfile!==c.audienceProfile||e.audiencePolicy!==c.audiencePolicy||e.peakCriterion!==c.peakCriterion||e.peakContext!==c.peakContext||e.audienceRule!=="WHO-2022"||e.audienceWindow!=="moving-15min"||e.workerRule!=="NIOSH-REL"||!["audienceKnown","audienceWithinApproved","workerKnown","workerWithinApproved","peakReviewed","policyApplicable","peakKnown","peakWithinApproved"].every(k=>e[k]===true))return "STOP_OR_PENDING";
   const t=o.telemetry;
   if(!t||t.kind!=="SYNTHETIC_PACKET_COUNTER"||t.subscription!==c.subscription||t.window!==c.telemetryWindow||t.coverageComplete!==true||t.available!==true||!["stability","clockLocked","mediaCurrent","currentStateKnown","protectedVerified","independentReview"].every(k=>o[k]===true)||o.latePackets!==0)return "STOP_OR_PENDING";
   if(!rows(o.coverage,c.points,"db")||!rows(o.clarity,c.points,"ok")||!rows(o.spectral,c.points,"ok")||o.clarity.some(z=>z.ok!==true)||o.spectral.some(z=>z.ok!==true))return "NOT_READY";
   const spread=range(o.coverage.map(z=>z.db));if(spread===null||spread>4)return "NOT_READY";
   return "SYNTHETIC_CANDIDATE_ONLY";
 }
 const tests=[
 ["point-source distance relation",close(pointLoss(2,4),-6.020599913279624)],
 ["point-source invalid distance",pointLoss(0,4)===null&&pointLoss(2,-1)===null],
 ["ideal path delay",close(timeMs(3.43,343),10)],
 ["no invalid sound speed",timeMs(1,0)===null],
 ["coverage spread project statistic",range([-3,0,-1])===3],
 ["missing/invalid spread",range([])===null&&range([0,NaN])===null],
 ["energy mean not arithmetic mean",close(energyMean([{db:70,seconds:1},{db:76,seconds:1}]),73.962927980446),],
 ["constant level unequal time",close(energyMean([{db:70,seconds:3},{db:70,seconds:7}]),70)],
 ["invalid energy inputs refused",energyMean([])===null&&energyMean([{db:70,seconds:0}])===null],
 ["pre/post different tap",close(send(1,"pre",.4,.5),.5)&&close(send(1,"post",.4,.5),.2)],
 ["pre not dependent on fader in fixture",send(1,"pre",0,.5)===.5&&send(1,"post",0,.5)===0],
 ["unsupported tap unknown",send(1,"unknown",.4,.5)===null],
 ["sample duration only",48/48000*1000===1],
 ["common media format",subscription([48000],[48000,96000])&&!subscription([48000],[96000])],
 ["synthetic base candidate",gate(base,obs(base),g)==="SYNTHETIC_CANDIDATE_ONLY"],
 ["synthetic allowed new scene",gate(edit,obs(edit),g)==="SYNTHETIC_CANDIDATE_ONLY"],
 ["stale old scene receipt not current",gate(edit,obs(base),g)==="NOT_READY"],
 ["fresh receipt cannot change fixed fields",Object.keys(base).filter(k=>!["scene","params","epoch"].includes(k)).every(k=>{const c={...cp(edit),[k]:"changed"};return gate(c,obs(c),g)==="OUTSIDE_FIXTURE"})],
 ["ordered route cannot be reversed",(()=>{const c={...cp(edit),outputRoute:[...edit.outputRoute].reverse()};return gate(c,obs(c),g)==="OUTSIDE_FIXTURE"})()],
 ["named parameter order irrelevant",(()=>{const c={...cp(base),params:{monitorChoice:"M1",eqChoice:"E1"}};return gate(c,obs(base),g)==="SYNTHETIC_CANDIDATE_ONLY"})()],
 ["no change cannot claim edit marker",gate({...cp(base),scene:"S2",epoch:"T2"},obs({...cp(base),scene:"S2",epoch:"T2"}),g)==="OUTSIDE_FIXTURE"],
 ["protected monitor choice must remain",(()=>{const c={...cp(edit),params:{eqChoice:"E2",monitorChoice:"M2"}};return gate(c,obs(c),g)==="OUTSIDE_FIXTURE"})()],
 ["permission and local requirements unknown stop",["permission","siteSafety","localRulesKnown","operatorConfirmed","syntheticOnly"].every(k=>gate(edit,obs(edit),{...g,[k]:null})==="STOP_OR_PENDING")],
 ["no real actuation",gate(edit,obs(edit),{...g,actualActuation:true})==="STOP_OR_PENDING"],
 ["real observation outside synthetic fixture",gate(edit,{...obs(edit),actual:true},g)==="NOT_READY"],
 ["each missing measurement point",["coverage","clarity","spectral"].every(k=>{const o=obs(edit);o[k]=o[k].slice(0,2);return gate(edit,o,g)==="NOT_READY"})],
 ["duplicate point cannot substitute missing",(()=>{const o=obs(edit);o.coverage[2]={id:"B",db:-1};return gate(edit,o,g)==="NOT_READY"})()],
 ["spread above project criterion",(()=>{const o=obs(edit);o.coverage[0].db=-5;return gate(edit,o,g)==="NOT_READY"})()],
 ["clarity and spectral independent",["clarity","spectral"].every(k=>{const o=obs(edit);o[k][1].ok=false;return gate(edit,o,g)==="NOT_READY"})],
 ["calibration missing or drift stop",["before","after","driftWithinApproved"].every(k=>{const o=obs(edit);o.calibration[k]=null;return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["reference and window bound",["reference","audienceRule","audienceWindow","workerRule"].every(k=>{const o=obs(edit);o.exposure[k]="other";return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["worker and audience and peak independently required",["audienceKnown","audienceWithinApproved","workerKnown","workerWithinApproved","peakReviewed","policyApplicable","peakKnown","peakWithinApproved"].every(k=>{const o=obs(edit);o.exposure[k]=null;return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["clock/media/stability/current state independent",["clockLocked","mediaCurrent","stability","currentStateKnown","protectedVerified","independentReview"].every(k=>gate(edit,{...obs(edit),[k]:null},g)==="STOP_OR_PENDING")],
 ["late packets and unknown counts stop",gate(edit,{...obs(edit),latePackets:1},g)==="STOP_OR_PENDING"&&gate(edit,{...obs(edit),latePackets:null},g)==="STOP_OR_PENDING"],
 ["wrong receipt identity denied",Object.keys(edit).every(k=>{const o=obs(edit);o.identity[k]="other";return gate(edit,o,g)==="NOT_READY"})],

 ["peak reviewed but failed or unknown or absent stops",[false,null,undefined].every(v=>{const o=obs(edit);if(v===undefined)delete o.exposure.peakWithinApproved;else o.exposure.peakWithinApproved=v;return o.exposure.peakReviewed===true&&gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["peak criterion or measurement context or policy mismatched stops",["peakCriterion","peakContext","audiencePolicy","audienceProfile"].every(k=>{const o=obs(edit);o.exposure[k]="other";return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["missing peak context or policy fields stops",["peakCriterion","peakContext","peakKnown","policyApplicable","audienceProfile","audiencePolicy"].every(k=>{const o=obs(edit);delete o.exposure[k];return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["children or unknown audience cannot use general fixture",["CHILD_TARGETED","YOUNG_CHILD_TARGETED",null].every(v=>{const c={...cp(edit),audienceProfile:v};return gate(c,obs(c),g)==="OUTSIDE_FIXTURE"})],
 ["child or unknown policy under general candidate stops",["CHILD_POLICY","UNKNOWN",null].every(v=>{const o=obs(edit);o.exposure.audiencePolicy=v;return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["interval statistic not a packet counter",(()=>{const o=obs(edit);o.telemetry.kind="LATE_INTERVAL_COUNT";return gate(edit,o,g)==="STOP_OR_PENDING"})()],
 ["missing or incomplete telemetry stops",["coverageComplete","available","subscription","window","kind"].every(k=>{const o=obs(edit);delete o.telemetry[k];return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["unmatched telemetry window and subscription stops",["window","subscription"].every(k=>{const o=obs(edit);o.telemetry[k]="other";return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["all explicit synthetic acceptance still passes",gate(edit,obs(edit),g)==="SYNTHETIC_CANDIDATE_ONLY"]

 ];return {tests,base,edit,g,obs,gate};
}
export { runK19Finite };
