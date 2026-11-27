# G04 R2c — 余7项原知识修订、跨批影响和来源复核
#78 / PR79；起点 c7413aa3b40548c7f60dfcc8a566957e15f0a990；实际案例修改阶段 d4489ee2a7d2b4835d3b3f9c02489b1e2ae45bf3。BUILDER_CHECKPOINT，不是独立PASS。36项均已进入修订，R1 9项完整候选，余27仍须按影响路径逐项收敛。
| 发现 | 实际原文修订/组合定位 | 本轮判别 |
|---|---|---|
| #28 RV05 | [TB-K01.05.06.02](theory-case-batch.md#L7) | D7在C主音化G候选V7/V，已确认G调内为V7；保留上下文。 |
| #28 RV06 | [H2](theory-g02-r1-species.md#L7) / [R2-SP-01](theory-g02-r2-counterpoint.md#L6) | 原误写第一半拍，改第一二分音符；4/4普通2:1小节前半，3:1例外不套；局部五度与运动见证不变。 |
| #32 RV01 | [AR14](arrangement-r2-knowledge-cases.md#L9)、[发现](arrangement-r5-discovery-cq.md#L18) | 普通B♭单簧管，S339/S074/S075，写音/实音2半音、型号UNKNOWN。 |
| #32 RV02 | [AR31](arrangement-r2-knowledge-cases.md#L26)、[旧槽](arrangement-r4-legacy-convergence.md#L43)、[发现](arrangement-r5-discovery-cq.md#L35) | 背景G3→G4，保持低于主线C5，节奏织体和音区区别，听感未知。 |
| #35 RV02 | [KC-P04](performance-r5-integrated-closure.md#L11) | 1500ms两个不同cue；独立通道仅限题设，共享保护、只改早一拍或新授权。 |
| #41 RV02 | [VT16](vocal-training-r1-knowledge-cases.md#L20)、[VT44](vocal-training-r2-knowledge-cases.md#L18)、[旧槽](vocal-training-r3-legacy-convergence.md#L31) | 明确平滑与有意对比目标，匹配听评/缺证据/症状停止。 |
| #41 RV03 | [KC-V06](vocal-training-r4-integrated-closure.md#L10) L26 | 逐事件计划/许可epoch/模态/撤回，现场听辨不自动授予视觉处理与采录。 |
本批额外同步PF39/VS64/VT39/DA04/08/27/32/54发现、VS64 KC-V05补例、DA35观察窗、LA05独立对照与F+，原来源ID不改。历史报告（含case audit历史Blob）不覆盖，当前关联须重新核对；当前未标全部27项完整修复。

## 重新查证的来源
- S218 [教材§30.3](https://musictheory.pugetsound.edu/mt21c/SecondSpecies.html) L733–735/770/783/789/799，普通2:1及作者例外；S177/S178原网页已打开，细节仍沿原定位。
- S074/S075 实际HTML Yamaha L8–15、MusicXML4.0 L52–65；[来源登记](../../research/source-qualification-creative-performance.md#L14)。
- S413 原HTML初读可见摘要，进一步查找403；同论文[PhenX存档](https://phenx-portal.s3.amazonaws.com/public/phenx-content/ERP/ERP7/Nov.27.2018_Meeting/06_Patel_et_al-2018-American_Journal_of_Speech-Language_Pathology.pdf) 零基11/12真实截图（印898/899），L378–386/420–421；限定协议、非实际测量，不宣称字节相同。[登记](../../research/source-qualification-vocal-science-r2.md#L6)。
- S066 v19 HTML L76–83/255–270/343–358/376–383/482–502。[登记](../../research/source-qualification-vocal-digital.md#L28)；S472 L46–57，S474 L8–41，S482 L31–51重新阅读参数，NOLA沿原Notes。[S472/474](../../research/source-qualification-digital-audio-r1.md#L6)。
- S490 HTML L35–38，S494 L9–21；S497 EBU R128-2023 零基2/3及S507 ITU BS.1770-5零基7/8真实截图，明确两门严格>、完整块、20kHz带限容差。[来源](../../research/source-qualification-production-r2.md#L5)。
- S537 v2 实际重读§2 Eq1与3.1–3.3 HTML L59–90（2024-03-05），不等实际FAD工具。
其余合成案例以既有登记与审核限定为基础，不虚称全面逐源复查。

## 实际新增有限断言
1. K01 RV05 D7 in C vs G — true
2. K01 RV06 half-note fills half measure not half beat — true
3. H2 unchanged local fifth/contrary motions — true
4. H2 wrong leap does not qualify — true
5. AR14 ordinary Bb sounding pitch — true
6. AR14 written-unison negative — true
7. AR14 A clarinet distinct — true
8. AR31 actual register shift — true
9. AR31 separate event structure — true
10. KC-P04 same-time distinct object positive — true
11. KC-P04 protected prep rejected — true
12. KC-P04 shared cue fails closed — true
13. KC-P04 shared cue allows only earlier authorized beat — true
14. VT16 contrast/smooth differ — true
15. VT16 missing goal/listening — true
16. VT44 symptom overrides goal — true
17. KC-V06 live listen no capture positive — true
18. KC-V06 mid-task revocation — true
19. KC-V06 stale token — true
20. KC-V06 modality escalation — true
21. KC-V06 no retention/upload — true
22. KC-V06 phase/plan version or timing mismatch — true
23. KC-V06 emergency first — true
24. VS35 proxy eligibility known — true
25. VS35 voiced/non-equilibrated plateau rejected — true
26. VS35 missing or failed seal/flow — true
27. VS64 distinct target and reference — true
28. VS64 wrong estimate-to-target zero — true
29. VS64 missing independent reference — true
30. VS64 missing target — true
31. VS64 invalid or unmatched observation — true
32. DA54 actual v19 combined bitmask — true
33. DA54 priming distinct — true
34. DA54 version unknown — true
共 34/34；以下函数实际执行，仅有限合成语义，非真实健康、音频、设备、权限、标准合规及完整实现。

```js
function replayR2c(){
const o=[];const ok=(n,x)=>{if(!x)throw Error(n);o.push(n)};const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const dominant=(root,key)=>root===(key+7)%12?"V7":root===(key+14)%12?"V7/V":"OTHER";
ok("K01 RV05 D7 in C vs G",dominant(2,0)==="V7/V"&&dominant(2,7)==="V7");
const h2={measure:4,note:2,starts:[0,2],cf:[60,62],cp:[[67,72],[69,71]]};
ok("K01 RV06 half-note fills half measure not half beat",h2.note===h2.measure/2&&h2.note!==.5&&eq(h2.starts,[0,2]));
ok("H2 unchanged local fifth/contrary motions",eq(h2.cp.map((v,i)=>v[0]-h2.cf[i]),[7,7])&&h2.cp[0][1]-h2.cp[0][0]===5&&h2.cp[1][0]-h2.cp[0][1]===-3&&h2.cf[1]-h2.cf[0]===2);
ok("H2 wrong leap does not qualify",69-67!==5);
const main=[72,74,76,79],written=[74,76,78,81];
ok("AR14 ordinary Bb sounding pitch",eq(written.map(n=>n-2),main));
ok("AR14 written-unison negative",!eq(main.map(n=>n-2),main));
ok("AR14 A clarinet distinct",!eq(written.map(n=>n-3),main));
const bgA=[48,52,55],bgB=[60,67,64,67];
ok("AR31 actual register shift",Math.min(...main)-Math.max(...bgA)===17&&Math.min(...main)-Math.max(...bgB)===5);
ok("AR31 separate event structure",bgA.length===3&&bgB.length===4&&Math.max(...bgB)<Math.min(...main));
const cues=[{id:"c13",target:"m1b3",time:1000,payload:"beat3",channel:"count"},{id:"c14",target:"m1b4",time:1500,payload:"beat4",channel:"count"},{id:"c21prep",target:"m2b1",time:1500,payload:"prepare",channel:"entry"}];
const validCue=(candidate,independent)=>candidate.length===cues.length&&candidate.every((c,i)=>c.id===cues[i].id&&c.target===cues[i].target&&c.time===cues[i].time&&c.channel===cues[i].channel)&&eq(candidate[2],cues[2])&&(independent||eq(candidate[1],cues[1]));
const edited=cues.map((c,i)=>i===1?{...c,payload:"revised-beat4"}:{...c});
ok("KC-P04 same-time distinct object positive",validCue(edited,true));
ok("KC-P04 protected prep rejected",!validCue(edited.map((c,i)=>i===2?{...c,payload:"changed"}:c),true));
ok("KC-P04 shared cue fails closed",!validCue(edited,false));
ok("KC-P04 shared cue allows only earlier authorized beat",validCue(cues.map((c,i)=>i===0?{...c,payload:"revised"}:c),false));
const observe=(target,audible,consent,comfortable,symptom)=>symptom?"STOP":consent!==true||comfortable!==true||!target||!audible?"UNKNOWN":target===audible?"SCOPED":"MISMATCH";
ok("VT16 contrast/smooth differ",observe("contrast","contrast",true,true,false)==="SCOPED"&&observe("smooth","contrast",true,true,false)==="MISMATCH"&&observe("smooth","smooth",true,true,false)==="SCOPED");
ok("VT16 missing goal/listening",observe(null,"contrast",true,true,false)==="UNKNOWN"&&observe("smooth",null,true,true,false)==="UNKNOWN");
ok("VT44 symptom overrides goal",observe("smooth","smooth",true,true,true)==="STOP");
const gate=(event,permission,expected)=>{if(event.emergency)return "EMERGENCY";if(event.symptom)return "STOP";if(!permission||permission.active!==true||event.epoch!==permission.epoch||event.plan!==expected.plan||event.version!==expected.version||event.timing!==expected.timing||event.enabled!==true||!permission.scope.includes(event.mode)||event.capture||event.store||event.upload)return "STOP";return "SCOPED"};
const event={phase:"P",epoch:"E1",plan:"F1",version:1,timing:"during",enabled:true,mode:"live-listen",capture:false,store:false,upload:false};
const permission={active:true,epoch:"E1",scope:["live-listen"]},expected={plan:"F1",version:1,timing:"during"};
ok("KC-V06 live listen no capture positive",gate(event,permission,expected)==="SCOPED");
ok("KC-V06 mid-task revocation",gate({...event,phase:"B"},permission,expected)==="SCOPED"&&gate(event,{...permission,active:false,epoch:"E2"},expected)==="STOP");
ok("KC-V06 stale token",gate(event,{...permission,epoch:"E2"},expected)==="STOP");
ok("KC-V06 modality escalation",gate({...event,mode:"visual"},permission,expected)==="STOP");
ok("KC-V06 no retention/upload",["capture","store","upload"].every(k=>gate({...event,[k]:true},permission,expected)==="STOP"));
ok("KC-V06 phase/plan version or timing mismatch",gate({...event,version:2},permission,expected)==="STOP"&&gate({...event,timing:"after"},permission,expected)==="STOP"&&gate({...event,enabled:false},permission,expected)==="STOP");
ok("KC-V06 emergency first",gate({...event,emergency:true},null,expected)==="EMERGENCY");
const pressure=x=>x.stop==="p"&&x.seal===true&&x.equilibrated===true&&x.plateau===true&&x.nearZeroFlow===true&&x.vowelSteady===true?"PROXY_CANDIDATE":"INVALID";
const q={stop:"p",seal:true,equilibrated:true,plateau:true,nearZeroFlow:true,vowelSteady:true};
ok("VS35 proxy eligibility known",pressure(q)==="PROXY_CANDIDATE");
ok("VS35 voiced/non-equilibrated plateau rejected",pressure({...q,stop:"b"})==="INVALID"&&pressure({...q,equilibrated:false})==="INVALID");
ok("VS35 missing or failed seal/flow",pressure({...q,seal:null})==="INVALID"&&pressure({...q,nearZeroFlow:false})==="INVALID");
const cents=(a,b)=>1200*Math.log2(a/b);const metric=(ref,est,target,valid,identity)=>{const good=x=>Number.isFinite(x)&&x>0;if(!valid||!identity)return [null,null,null];return [good(est)&&good(ref)?cents(est,ref):null,good(ref)&&good(target)?cents(ref,target):null,good(est)&&good(target)?cents(est,target):null]};
ok("VS64 distinct target and reference",Math.abs(metric(220,220,200,true,true)[1]-165.004)<.001&&metric(220,220,200,true,true)[0]===0);
ok("VS64 wrong estimate-to-target zero",metric(220,200,200,true,true)[2]===0&&Math.abs(metric(220,200,200,true,true)[0]+165.004)<.001);
ok("VS64 missing independent reference",eq(metric(null,200,200,true,true),[null,null,0]));
ok("VS64 missing target",eq(metric(220,220,null,true,true),[0,null,null]));
ok("VS64 invalid or unmatched observation",eq(metric(220,220,200,false,true),[null,null,null])&&eq(metric(220,220,200,true,false),[null,null,null]));
const names=["inputUnderflow","inputOverflow","outputUnderflow","outputOverflow","primingOutput"];const flags=(x,known)=>known?names.filter((_,i)=>(x&(1<<i))!==0):null;
ok("DA54 actual v19 combined bitmask",eq(flags(0x06,true),["inputOverflow","outputUnderflow"]));
ok("DA54 priming distinct",eq(flags(0x10,true),["primingOutput"]));
ok("DA54 version unknown",flags(0x06,false)===null);
return o;
}
console.log(replayR2c());
```

保留所有15个P2 Issue OPEN和28个SPLIT_OPEN，G04-R2c内部不派审核。下一步精确旧槽/能力/CQ/发现/源证据影响矩阵和R3拆分候选；保留真正缺证据的残余，不强制PASS。
