# G04 R2b — 五域批量修订、发现入口和综合案例
#78 / PR79；BUILDER_PARTIAL，非独立审核。起点 b091df764fd8df413d5b45cd691c64fda11b5550；精确回读 16632da728212082363aeb7ee33cca0cac69cbae。
九份主案例文档实际20行更新、另S537源登记1行；五份发现表同步20条（K09/K10更新区分语义标签，K11/K13/K14同步F+），五份R4综合文档补充。实际精确回读19份文件，20/20发现→主案例的D4/ID/行号一致，20/20综合补充链接一致，K11/K13/K14共10条F+一致。既有ID、主案例行号与源ID不变；原R4历史检查未冒充本轮重跑。R2b源核验范围仅S537 [arXiv v2 HTML](https://arxiv.org/html/2311.01616v2) 2024-03-05 §2 Eq1 L59–63、§3.1–3.3 L65–90，平方Fréchet约定及参考集、嵌入、样本规模限制；其他源沿既有登记和独立审核合同，尚待原文复核。
| Issue | 本批修订范围 | 现状 |
|---|---|---|
| #49 | MP30/MP11/35/MP40；[KC-P09](production-r4-integrated-closure.md) | 3项部分修订 |
| #52 | EV11/38/12/39/15/42；[KC-E10](evaluation-r4-integrated-closure.md) | 3项部分修订 |
| #55 | AM05/35、S537/AM58、[KC-A11](ai-models-r4-integrated-closure.md) | 3项部分修订 |
| #60 | LA01/11/05/15/08/18；[KC-L13](localization-r4-integrated-closure.md) | 3项部分修订 |
| #63 | ED47、[KC-ED14](music-education-r4-integrated-closure.md) | 1项部分修订 |

## 本轮实际有限探针
1. MP30 baseline outside — true
2. MP30 authorized insertion retains probes — true
3. MP30 changed interpolation rejected — true
4. MP30 removed external point rejected — true
5. MP11/35 A finite mix — true
6. MP11/35 B different tail — true
7. MP11 protected dry onset/tail distinct — true
8. MP40 strict absolute and relative gate — true
9. MP40 relative equality excluded — true
10. MP40 absent eligible blocks not numeric — true
11. EV11 pitch/time unchanged — true
12. EV11 identity distinguishes — true
13. EV38 no single consistent permutation — true
14. EV12/39 editable positive — true
15. EV12/39 flattened loss — true
16. EV12/39 word identity mismatch — true
17. EV15/42 per-reference scores — true
18. EV42 explicit mean only — true
19. AM05/35 fixed decoder q0 — true
20. AM05/35 fixed decoder q.5 — true
21. AM05/35 different decoder — true
22. AM58 equal squared distance different distributions — true
23. KC-A11 bound positive — true
24. KC-A11 duration rejected with fresh report — true
25. KC-A11 clock rejected with fresh report — true
26. KC-A11 target rejected with fresh report — true
27. KC-A11 stale model report — true
28. KC-A11 withdrawal — true
29. KC-A11 unknown safety — true
30. KC-A11 unknown readiness — true
31. LA01/11 canonical equivalence but raw distinct — true
32. LA01 visual order not canonical — true
33. LA05 same count different grouping — true
34. LA15 empty rhyme N/A — true
35. LA15 valid and invalid denominators — true
36. LA08/18 independent matched recognition — true
37. LA08/18 informed/assisted rejected — true
38. LA08/18 unmatched/missing unknown — true
39. ED47 new item familiar skill — true
40. ED47 preview without answers — true
41. ED47 practice or answer exposure — true
42. ED47 alias content — true
43. ED47 unknown exposure and mismatched learner — true
实际执行 43/43；代码如下为实际执行函数，非真实模型、设备、音频、教学、母语听评、权利、标准符合或独立审核。只验证具体合成条件；不声称完整权限策略、真实测量、连续包络或统计效度。

```js
function replay(){
 const checks=[];const ok=(name,value)=>{if(!value)throw Error(name);checks.push(name)};const near=(a,b)=>Math.abs(a-b)<1e-8;const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const pts=[[0,0],[4,4],[10,0],[12,0],[20,0]], updated=[...pts.slice(0,3),[11,2],...pts.slice(3)];
 const val=(p,t,mode="linear")=>{let i=p.findIndex(x=>x[0]>t);if(i===-1)return p.at(-1)[1];if(i===0)return p[0][1];let [x,y]=p[i-1],[x2,y2]=p[i];return mode==="hold"?y:y+(y2-y)*(t-x)/(x2-x)};
 const outside=p=>[2,6,15].map(t=>val(p,t));
 ok("MP30 baseline outside",eq(outside(pts),[2,8/3,0])||outside(pts).every((v,i)=>near(v,[2,8/3,0][i])));
 ok("MP30 authorized insertion retains probes",eq(outside(pts),outside(updated))&&val(updated,11)===2&&val(updated,10)===0&&val(updated,12)===0);
 ok("MP30 changed interpolation rejected",!eq([2,6,15].map(t=>val(updated,t,"hold")),outside(pts)));
 ok("MP30 removed external point rejected",!eq(outside(updated.filter(x=>x[0]!==4)),outside(pts)));
 const dry=[.75,0,0,0],mix=w=>w.map((v,i)=>dry[i]+.25*v);
 ok("MP11/35 A finite mix",eq(mix([0,1,0,0]),[.75,.25,0,0]));
 ok("MP11/35 B different tail",eq(mix([0,1,.5,.25]),[.75,.25,.125,.0625]));
 ok("MP11 protected dry onset/tail distinct",!eq(mix([0,1,.5,.25]),mix([0,1,0,0]))&&!eq(dry,[0,.75,0,0]));
 const strictGate=(v,t)=>v.filter(x=>x>t);const agg=v=>10*Math.log10(v.reduce((a,b)=>a+10**(b/10),0)/v.length);const loud=v=>{let a=strictGate(v,-70);return a.length?strictGate(a,agg(a)-10):null};
 ok("MP40 strict absolute and relative gate",eq(loud([-70,-69,-20]),[-20]));
 ok("MP40 relative equality excluded",eq(strictGate([-30,-29.99],-30),[-29.99]));
 ok("MP40 absent eligible blocks not numeric",loud([-80,-70])===null&&loud([])===null);
 const ref=[{id:"e1",v:"A",f:440,t:[0,1]},{id:"e2",v:"B",f:660,t:[0,1]}];const swapped=ref.map(x=>({...x,v:x.v==="A"?"B":"A"}));const score=(a,b,voice)=>a.filter(x=>b.some(y=>x.id===y.id&&x.f===y.f&&eq(x.t,y.t)&&(!voice||x.v===y.v))).length;
 ok("EV11 pitch/time unchanged",score(ref,ref,false)===2&&score(ref,swapped,false)===2);
 ok("EV11 identity distinguishes",score(ref,ref,true)===2&&score(ref,swapped,true)===0);
 ok("EV38 no single consistent permutation",!["identity","swap"].some(m=>[ref,swapped].every(seg=>score(ref,seg.map(x=>({...x,v:m==="swap"?(x.v==="A"?"B":"A"):x.v})),true)===2)));
 const editable={note:"n1",word:"w1",voice:"A",time:[0,1],beat:[0,2],f:440,link:["s1","n1"]};const protectedFields=Object.keys(editable);const intact=x=>protectedFields.every(k=>eq(x[k],editable[k]));
 ok("EV12/39 editable positive",intact({...editable}));
 ok("EV12/39 flattened loss",!intact({f:440,time:[0,1],text:"a"}));
 ok("EV12/39 word identity mismatch",!intact({...editable,word:"w2"}));
 const scores=[10,15].map(t=>Math.abs(t-10.2)<=.5?1:0);ok("EV15/42 per-reference scores",eq(scores,[1,0]));
 ok("EV42 explicit mean only",scores.reduce((a,b)=>a+b,0)/2===.5);
 const sse=x=>x.reduce((a,b,i)=>a+(b-[.4,.8][i])**2,0);
 ok("AM05/35 fixed decoder q0",near(sse([0,0]),.8));
 ok("AM05/35 fixed decoder q.5",near(sse([.5,1]),.05));
 ok("AM05/35 different decoder",near(sse([.5,-1]),3.25));
 const f=(m,v)=>(m-0)**2+(Math.sqrt(v)-1)**2;ok("AM58 equal squared distance different distributions",near(f(1,1),1)&&near(f(0,4),1));
 const request={source:"S1",condition:"P1",model:"W1",target:"T1",permissionEpoch:"E1",mask:[1,3],clock:"tm1",duration:2,output:"Y1",protocol:"Q1"};
 const gate=(c,r,perm,safety,ready)=>{if(perm!==true)return "STOP";if(["target","mask","clock","duration"].some(k=>!eq(c[k],request[k])))return "REJECT_PROTECTION";if(Object.keys(request).some(k=>!eq(c[k],r[k])))return "PENDING_REVALIDATION";if(safety!==true)return "NO_AUDITION";if(!ready)return "PENDING";return "SYNTHETIC_ONLY"};
 ok("KC-A11 bound positive",gate(request,request,true,true,true)==="SYNTHETIC_ONLY");
 for(const [k,v] of [["duration",3],["clock","tm2"],["target","T2"]]){const c={...request,[k]:v};ok("KC-A11 "+k+" rejected with fresh report",gate(c,c,true,true,true)==="REJECT_PROTECTION")}
 ok("KC-A11 stale model report",gate({...request,model:"W2"},request,true,true,true)==="PENDING_REVALIDATION");
 ok("KC-A11 withdrawal",gate(request,request,false,true,true)==="STOP");
 ok("KC-A11 unknown safety",gate(request,request,true,null,true)==="NO_AUDITION");
 ok("KC-A11 unknown readiness",gate(request,request,true,true,false)==="PENDING");
 const a="\u1000\u103a\u1037",b="\u1000\u1037\u103a";ok("LA01/11 canonical equivalence but raw distinct",a!==b&&a.normalize("NFC")===b.normalize("NFC"));
 ok("LA01 visual order not canonical", "\u1031\u1000".normalize("NFC")!=="\u1000\u1031".normalize("NFC"));
 const dur=g=>g.map(x=>x.length*.25);ok("LA05 same count different grouping",eq(dur([[1,2],[3],[4]]),[.5,.25,.25])&&eq(dur([[1],[2,3],[4]]),[.25,.5,.25]));
 const jac=(a,b)=>{let u=new Set([...a,...b]);return u.size?a.filter(x=>b.includes(x)).length/u.size:null};ok("LA15 empty rhyme N/A",jac([],[])===null);
 const sd=(a,b)=>Number.isFinite(a)&&Number.isFinite(b)&&a>0&&b>0?.5*Math.abs(a-b)*(1/a+1/b):null;ok("LA15 valid and invalid denominators",near(sd(4,5),.225)&&sd(0,5)===null&&sd(undefined,5)===null);
 const recognition=(r)=>r?.mode==="independent-audio"&&r.stimulus==="Y1"&&r.group==="G1"&&r.den>0?r.correct/r.den:null;const obs={mode:"independent-audio",stimulus:"Y1",group:"G1",correct:8,den:10};
 ok("LA08/18 independent matched recognition",recognition(obs)===.8);
 ok("LA08/18 informed/assisted rejected",recognition({...obs,mode:"informed"})===null&&recognition({...obs,mode:"assisted"})===null);
 ok("LA08/18 unmatched/missing unknown",recognition({...obs,group:"G2"})===null&&recognition(null)===null);
 const transfer=x=>x.learner==="L1"&&x.attempt==="A3"&&x.content==="B-content"&&x.exposures!==null&&Array.isArray(x.exposures)&&x.exposures.every(e=>!["presented","practiced","answer"].includes(e))?"SCOPED":"NO";
 const x={learner:"L1",attempt:"A3",content:"B-content",exposures:[],knownSkill:true};
 ok("ED47 new item familiar skill",transfer(x)==="SCOPED");
 ok("ED47 preview without answers",transfer({...x,exposures:["presented"]})==="NO");
 ok("ED47 practice or answer exposure",transfer({...x,exposures:["practiced"]})==="NO"&&transfer({...x,exposures:["answer"]})==="NO");
 ok("ED47 alias content",transfer({...x,id:"B-alias",content:"A-content"})==="NO");
 ok("ED47 unknown exposure and mismatched learner",transfer({...x,exposures:null})==="NO"&&transfer({...x,learner:"L2"})==="NO");
 return checks;
}
console.log(replay());
```

## 剩余
R1 9/36建设方完整候选，R2a 7项部分，R2b 13项部分，合计20部分、7尚未开始（#28 2、#32 2、#35 RV02、#41 RV02/03）。全部15 Issue OPEN，全部28 SPLIT_OPEN 保持。R2c须继续7项并同步旧案例槽、能力、CQ/源资格、综合谓词和精确证据；R2a仍须完成影响路径。R2b尚未全量核旧槽/能力/来源及重新运行历史见证；不得提前计完整修复或独立PASS。R3–R6未开始；无审核派发、合入或正式知识提升。
