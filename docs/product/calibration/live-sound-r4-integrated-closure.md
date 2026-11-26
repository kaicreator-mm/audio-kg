# K19 R4 — 综合现场音频验收、停止与复盘
DRAFT #75；10D2/39D3/40D4/160四视角，6 D25原候选及34新增；六入向SPLIT_OPEN原样保留。[来源](../../research/source-qualification-live-sound-r1-r2.md)、[归属](live-sound-r3-legacy-convergence.md)、[能力](live-sound-r3-capability-calibration.md)、[发现](live-sound-r3-discovery-cq.md)。
## EX01 场地、覆盖、测量、独立总线
观众A/B/C与舞台MON-A各有目标，控制位不等完整覆盖。S618标准公开范围为早到达能量均匀性，S619为传递函数频响；后者页面状态有冲突，均未读正文，项目极差4dB是合成阈值而非标准容差。S620 IEC60268-16:2020与2025勘误入口仅范围，STI为语音清晰度，波动噪声限制，不代音乐偏好、覆盖或安全。理想点源2→4m差−6.02dB，仅自由场/同方向，路径差3.43m/343m/s=10ms，不据此设真实延迟。覆盖记录必须有预先点集和场景，频响/清晰度、稳定性独立证据。S629/S630校准前后、仪器/位置/条件；未证停止。S621 pre/post在限定tap下数学不同，不保证输入gain/mute隔离，S622 CUE/PFL/AFL不代实际输出；S625舞台漏声与IEM选择不是耳道安全证据。dBFS不同于实际SPL。[LS01/K19.01.01.01](live-sound-r1-knowledge-cases.md#L5)；[LS02/K19.01.02.01](live-sound-r1-knowledge-cases.md#L6)；[LS03/K19.01.03.01](live-sound-r1-knowledge-cases.md#L7)；[LS04/K19.01.04.01](live-sound-r1-knowledge-cases.md#L8)；[LS05/K19.02.01.01](live-sound-r1-knowledge-cases.md#L9)；[LS06/K19.02.02.01](live-sound-r1-knowledge-cases.md#L10)；[LS07/K19.02.03.01](live-sound-r1-knowledge-cases.md#L11)；[LS08/K19.02.04.01](live-sound-r1-knowledge-cases.md#L12)；[LS09/K19.03.01.01](live-sound-r1-knowledge-cases.md#L13)；[LS10/K19.03.02.01](live-sound-r1-knowledge-cases.md#L14)；[LS11/K19.03.03.01](live-sound-r1-knowledge-cases.md#L15)；[LS13/K19.04.01.01](live-sound-r1-knowledge-cases.md#L17)；[LS14/K19.04.02.01](live-sound-r1-knowledge-cases.md#L18)；[LS15/K19.04.03.01](live-sound-r1-knowledge-cases.md#L19)；[LS16/K19.04.04.01](live-sound-r1-knowledge-cases.md#L20)；[LS17/K19.05.01.01](live-sound-r1-knowledge-cases.md#L21)；[LS18/K19.05.02.01](live-sound-r1-knowledge-cases.md#L22)；[LS19/K19.05.03.01](live-sound-r1-knowledge-cases.md#L23)；[LS20/K19.05.04.01](live-sound-r1-knowledge-cases.md#L24)
## EX02 安全与故障
S624麦克风与扬声器声学路径存在不证明振荡；嗡声/断续/日志同时发生不唯一归因，停止、授权专业人只读已存在记录，不复现高声级、断地、拆机、断网。S626 Dante标准网络PTP选举及失锁事件，锁定不等订阅/媒体；S627协商有效延迟与端到端延迟分开，迟到/日志时窗需核；S628格式及独立冗余、同链速，双口不等保证切换。S629 WHO 2022正文文本定位但截图403/timeout；官方2024 HTML六项措施及上限佐证，移动窗口和参考位来自受限文本，100 dB LAeq,15min是观众风险降低上限而非目标或无风险、非个体耳道或职业剂量。S630 NIOSH职业85 dBA/8h、3dB交换及dosimeter阈值80dBA，不当缅甸法律，不以观众参考点替代职业测量。仅合成70/76等时能量平均约73.96dB；必须同位置/连续/计权且不代真实移动窗口算法、峰值或剂量。任何当地要求、人员安全、设备/场地审批未知均停止。[LS25/K19.07.01.01](live-sound-r2-knowledge-cases.md#L9)；[LS26/K19.07.01.02](live-sound-r2-knowledge-cases.md#L10)；[LS27/K19.07.02.01](live-sound-r2-knowledge-cases.md#L11)；[LS28/K19.07.03.01](live-sound-r2-knowledge-cases.md#L12)；[LS29/K19.08.01.01](live-sound-r2-knowledge-cases.md#L13)；[LS30/K19.08.02.01](live-sound-r2-knowledge-cases.md#L14)；[LS31/K19.08.03.01](live-sound-r2-knowledge-cases.md#L15)；[LS32/K19.08.04.01](live-sound-r2-knowledge-cases.md#L16)；[LS33/K19.09.01.01](live-sound-r2-knowledge-cases.md#L17)；[LS34/K19.09.02.01](live-sound-r2-knowledge-cases.md#L18)；[LS35/K19.09.03.01](live-sound-r2-knowledge-cases.md#L19)；[LS36/K19.09.04.01](live-sound-r2-knowledge-cases.md#L20)
## KC-LS19 — 固定合成场地验收与修订
虚构LS-J1，V-A、PG1、L1、I1、N1、C1、P1，A/B/C为预定点，A为题设参考点，保护MON-A1/SYS1及有序CH1→MAIN→OUT1；S1/T1参数E1/M1。唯一允许修订E2/M1及S2/T2标记；不是真实EQ值、声级或可操作命令。named map无序、数组有序；相同参数不得声称新版本。项目覆盖极差≤4dB仅合成规则，清晰度/频谱布尔值、曝光合格、时钟锁定、稳定、权限、独立复核均是题设输入而非实际测量/授权或标准符合。每次修订需当前身份和全点记录，不假定旧状态安全。
| 阶段 | 条件/产物 | 反例/停止 | 入口 |
|---|---|---|---|
| 方案 | 场地/节目/目标、保护对象、点和参考位置、独立安全与当地要求 | 真实场地/权限未知不得执行 | [LS01/K19.01.01.01](live-sound-r1-knowledge-cases.md#L5)；[LS02/K19.01.02.01](live-sound-r1-knowledge-cases.md#L6)；[LS03/K19.01.03.01](live-sound-r1-knowledge-cases.md#L7)；[LS04/K19.01.04.01](live-sound-r1-knowledge-cases.md#L8)；[LS09/K19.03.01.01](live-sound-r1-knowledge-cases.md#L13)；[LS33/K19.09.01.01](live-sound-r2-knowledge-cases.md#L17) |
| 现状 | 独立覆盖/清晰度/频响点、校准、稳定、锁定/媒体记录、个人/观众暴露 | 缺点、重复点、旧scene、缺校准、失锁、迟到、未知状态 | [LS13/K19.04.01.01](live-sound-r1-knowledge-cases.md#L17)；[LS14/K19.04.02.01](live-sound-r1-knowledge-cases.md#L18)；[LS16/K19.04.04.01](live-sound-r1-knowledge-cases.md#L20)；[LS24/K19.06.04.01](live-sound-r2-knowledge-cases.md#L8)；[LS29/K19.08.01.01](live-sound-r2-knowledge-cases.md#L13)；[LS30/K19.08.02.01](live-sound-r2-knowledge-cases.md#L14)；[LS34/K19.09.02.01](live-sound-r2-knowledge-cases.md#L18)；[LS35/K19.09.03.01](live-sound-r2-knowledge-cases.md#L19) |
| 修订 | 仅E1→E2且保护MON/SYS/路由等固定对象，记录新版本 | 属性顺序变化不算修订；新回执不放宽场景 | [LS21/K19.06.01.01](live-sound-r2-knowledge-cases.md#L5)；[LS22/K19.06.02.01](live-sound-r2-knowledge-cases.md#L6)；[LS23/K19.06.03.01](live-sound-r2-knowledge-cases.md#L7)；[LS39/K19.10.03.01](live-sound-r2-knowledge-cases.md#L23) |
| 复核 | 所有当前条件、独立确认与安全均题设成立才返回SYNTHETIC_CANDIDATE_ONLY | 安全/权限/实际状态未知、旧报告、异常立即停止；不盲重发或真实回滚 | [LS24/K19.06.04.01](live-sound-r2-knowledge-cases.md#L8)；[LS25/K19.07.01.01](live-sound-r2-knowledge-cases.md#L9)；[LS28/K19.07.03.01](live-sound-r2-knowledge-cases.md#L12)；[LS33/K19.09.01.01](live-sound-r2-knowledge-cases.md#L17)；[LS37/K19.10.01.01](live-sound-r2-knowledge-cases.md#L21)；[LS38/K19.10.02.01](live-sound-r2-knowledge-cases.md#L22)；[LS39/K19.10.03.01](live-sound-r2-knowledge-cases.md#L23)；[LS40/K19.10.04.01](live-sound-r2-knowledge-cases.md#L24) |
仅知识推理验证；真实工程须授权专业人员另行确认，K07物理/听音安全、K08通用DSP、K09工程、K10实际评价、K12设备执行、K15治理保留。任何实际人员、输出、吊挂、电气、网络、现场审批、法规或标准符合均未验证。
## 实际有限JS见证
同一函数实际执行；所有测点/布尔值及观察均明确合成，不是通用测量工具、WHO/NIOSH正式算法、权限系统或运行控制。energyMean只演示同位置同计权完整合成时间段的能量平均，限定输入范围非安全建议；不实现移动窗口及剂量。候选gate不从实际值估计安全或证明真值，仅核固定标记、题设字段及项目极差。实际操作禁止。
```javascript
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
 const base={fixture:"LS-J1",venue:"V-A",program:"PG1",scene:"S1",layout:"L1",input:"I1",network:"N1",clock:"C1",protocol:"P1",points:["A","B","C"],reference:"A",protectedMonitor:"MON-A1",protectedSystem:"SYS1",outputRoute:["CH1","MAIN","OUT1"],params:{eqChoice:"E1",monitorChoice:"M1"},epoch:"T1"};
 const edit={...cp(base),scene:"S2",params:{eqChoice:"E2",monitorChoice:"M1"},epoch:"T2"};
 const allowed=c=>equal(c,base)||equal(c,edit);
 const obs=(c)=>({identity:cp(c),kind:"SYNTHETIC_STIPULATION",actual:false,coverage:[{id:"A",db:-3},{id:"B",db:0},{id:"C",db:-1}],clarity:[{id:"A",ok:true},{id:"B",ok:true},{id:"C",ok:true}],spectral:[{id:"A",ok:true},{id:"B",ok:true},{id:"C",ok:true}],calibration:{instrument:"METER1",before:true,after:true,driftWithinApproved:true},stability:true,clockLocked:true,mediaCurrent:true,latePackets:0,exposure:{reference:"A",audienceRule:"WHO-2022",audienceWindow:"moving-15min",audienceKnown:true,audienceWithinApproved:true,workerRule:"NIOSH-REL",workerKnown:true,workerWithinApproved:true,peakReviewed:true},currentStateKnown:true,protectedVerified:true,independentReview:true});
 const g={syntheticOnly:true,actualActuation:false,permission:true,siteSafety:true,localRulesKnown:true,operatorConfirmed:true};
 function rows(rows,points,key){return Array.isArray(rows)&&rows.length===points.length&&rows.every(z=>z&&Object.hasOwn(z,"id")&&Object.hasOwn(z,key))&&new Set(rows.map(z=>z.id)).size===points.length&&points.every(id=>rows.some(z=>z.id===id))}
 function gate(c,o,scope){
   if(!allowed(c))return "OUTSIDE_FIXTURE";
   if(!scope||scope.syntheticOnly!==true||scope.actualActuation!==false||!["permission","siteSafety","localRulesKnown","operatorConfirmed"].every(k=>scope[k]===true))return "STOP_OR_PENDING";
   if(!o||!equal(o.identity,c)||o.kind!=="SYNTHETIC_STIPULATION"||o.actual!==false)return "NOT_READY";
   const cal=o.calibration,e=o.exposure;
   if(!cal||cal.instrument!=="METER1"||!["before","after","driftWithinApproved"].every(k=>cal[k]===true)||!e||e.reference!==c.reference||e.audienceRule!=="WHO-2022"||e.audienceWindow!=="moving-15min"||e.workerRule!=="NIOSH-REL"||!["audienceKnown","audienceWithinApproved","workerKnown","workerWithinApproved","peakReviewed"].every(k=>e[k]===true))return "STOP_OR_PENDING";
   if(!["stability","clockLocked","mediaCurrent","currentStateKnown","protectedVerified","independentReview"].every(k=>o[k]===true)||o.latePackets!==0)return "STOP_OR_PENDING";
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
 ["worker and audience and peak independently required",["audienceKnown","audienceWithinApproved","workerKnown","workerWithinApproved","peakReviewed"].every(k=>{const o=obs(edit);o.exposure[k]=null;return gate(edit,o,g)==="STOP_OR_PENDING"})],
 ["clock/media/stability/current state independent",["clockLocked","mediaCurrent","stability","currentStateKnown","protectedVerified","independentReview"].every(k=>gate(edit,{...obs(edit),[k]:null},g)==="STOP_OR_PENDING")],
 ["late packets and unknown counts stop",gate(edit,{...obs(edit),latePackets:1},g)==="STOP_OR_PENDING"&&gate(edit,{...obs(edit),latePackets:null},g)==="STOP_OR_PENDING"],
 ["wrong receipt identity denied",Object.keys(edit).every(k=>{const o=obs(edit);o.identity[k]="other";return gate(edit,o,g)==="NOT_READY"})]
 ];return tests;
}
console.log(runK19Finite());
```
## 实际结果
1. point-source distance relation: true
2. point-source invalid distance: true
3. ideal path delay: true
4. no invalid sound speed: true
5. coverage spread project statistic: true
6. missing/invalid spread: true
7. energy mean not arithmetic mean: true
8. constant level unequal time: true
9. invalid energy inputs refused: true
10. pre/post different tap: true
11. pre not dependent on fader in fixture: true
12. unsupported tap unknown: true
13. sample duration only: true
14. common media format: true
15. synthetic base candidate: true
16. synthetic allowed new scene: true
17. stale old scene receipt not current: true
18. fresh receipt cannot change fixed fields: true
19. ordered route cannot be reversed: true
20. named parameter order irrelevant: true
21. no change cannot claim edit marker: true
22. protected monitor choice must remain: true
23. permission and local requirements unknown stop: true
24. no real actuation: true
25. real observation outside synthetic fixture: true
26. each missing measurement point: true
27. duplicate point cannot substitute missing: true
28. spread above project criterion: true
29. clarity and spectral independent: true
30. calibration missing or drift stop: true
31. reference and window bound: true
32. worker and audience and peak independently required: true
33. clock/media/stability/current state independent: true
34. late packets and unknown counts stop: true
35. wrong receipt identity denied: true
35/35 实际有限检查通过，不以断言数代知识审核。无实际音频、现场测量/人员、硬件/网络/安全许可、CI、accepted claims/L1 freeze。