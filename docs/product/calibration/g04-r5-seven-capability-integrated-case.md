# G04 R5c — 七能力跨域组合与有限负面验证

基准 `39905b03b323c36c503836be0f0923999302d861`。本例只用原创合成对象，作为 LLM 发现及专业知识组合候选。无真实歌唱、录音、权利、工具运行、模型训练/推理或现场操作；所有题定值不是对真实人的测量。与 R5a 角色矩阵、R5b CQ 精确入口互证，不能把所有19域强塞入同一任务。

## XC01：带约束词谱适配与排练反馈候选
任务目标：四拍120BPM，两秒，三音节四音符，原音符/词身份及 m2 预备 cue 不变，仅允许局部工程候选；素材S1、词谱 v1、时钟 t1、宿主 h1、受保护对象 n1/l1/cue2，评估报告绑定候选版本。若另有真实发布、真人反馈或现场扩声需求，必须先确认独立许可与适用安全条件，否则停止/UNKNOWN。此为模拟的当前许可/安全布尔字段，绝非许可证明。

| 能力 | 主责/支持关系（本题限定） | 输入→输出及不可替代条件 |
|---|---|---|
| A01 | K13 词谱；K01/K03 支持 | [LA05 K13.06.02.03](localization-r3-discovery-cq.md#L9) S555/556：三音节并非必需四音节，绑定词与音符及休止；[K01.05.06.02](theory-all-atom-discovery-cq.md#L66) S177/178：调性上下文先于D7解释；[AR14 K03.03.01.03](arrangement-r5-discovery-cq.md#L18) S339/074/075：书写移调需乐器身份，仅如任务包含单簧管使用。 |
| A02 | K02 约束与K15权限为前置；K04/K06反馈流程 | [CO-03](composition-r3-discovery-cq.md#L7) 项目合同；[GV01](production-governance-r3-discovery-cq.md#L5) S564/566：角色非授权；[PF39](performance-r4-discovery-cq.md#L43) S388/085、[VT39](vocal-training-r3-discovery-cq.md#L43) S409/051。事件身份/时钟核对后才评估；同时间不同 cue 不互换；撤回即STOP。 |
| A03 | K12工具边界，K08/K11条件支持 | [TO01](tools-orchestration-r3-discovery-cq.md#L5) S538/126：已文档化的能力不保证目标宿主版本；[DA04](digital-audio-r3-discovery-cq.md#L8) S471/472：容器与有效位分离；[AM05](ai-models-r3-discovery-cq.md#L9) S523/524：仅在调用模型且解码器身份绑定时适用。未运行不报告成功。 |
| A04 | K09版本、保护；K04时间事件 | [MP30](production-r3-discovery-cq.md#L34) S490/089：局部包络变更需区外保护；[KC-P04](performance-r5-integrated-closure.md#L10) 提示共享时先保护；[KC-A11](ai-models-r4-integrated-closure.md#L56) 版本、时钟、目标、权限/源绑定为比较前提，旧报告失效。 |
| A05 | K10评估、K05测量 | [EV11](evaluation-r3-discovery-cq.md#L15) S511/508/514：固定事件声部身份；[VS64](vocal-science-r4-discovery-cq.md#L68) S409/413：题定音乐目标200Hz、独立参考220Hz、估计220Hz，估计误差0，但对音乐目标约+165 cents；不是演唱能力结论。身份/窗未知不能用总分补空。 |
| A06 | K09对象编辑、K13词谱表示；K12回读支持 | 仅输出候选 c2，保存 n1/l1/cue2、原始工程hash、时钟、区外曲线和词音对齐；不将有损渲染当可逆编辑对象。[MP30](production-r3-discovery-cq.md#L34)、[LA05](localization-r3-discovery-cq.md#L9)、[TO01](tools-orchestration-r3-discovery-cq.md#L5)。 |
| A07 | K09/K10局部复测，K15撤回；K14迁移限定 | 按实际变更重新核验，不给新版本旧分；[ED47](music-education-r3-discovery-cq.md#L51) S562/560：若另做学习迁移，曝光未知不判通过；[KC-V06](vocal-training-r4-integrated-closure.md#L9) 逐事件许可与保护条件。 |

## 不强制组合的支路
[K07 AC51](acoustics-r3-discovery-cq.md#L106) S033/096：物理回路可达不等振荡；只有出现声场问题才调用，真实安全另交[K19 LS02](live-sound-r3-discovery-cq.md#L6) S618/629/630。文化出处问题才引入[K16 MU01](musicology-r3-discovery-cq.md#L5) S571/572/576；实验节律才引入[K17 MC01](music-cognition-r3-discovery-cq.md#L5) S587/588且保留摘要/有限级；声音合成才调用[K18 SD01](sound-design-r3-discovery-cq.md#L5) S603，峰值上界不是实测。禁止无条件 dependsOn、sameAs 或假造事实。

## 实际有限分支测试
题设静态 oracle，采用 fail-closed 优先级：撤回→许可与安全缺证→保护失败→报告/源/工具变更→测量缺证→待复核→静态候选。只验证这15种合成状态，不证明一般正确或LLM效果。

```js
function assess(x){if(x.permission==="revoked")return "STOP";if(x.permission!=="confirmed"||x.safety!=="confirmed")return "UNKNOWN";if(x.clock!=="t1"||x.target!=="v1"||x.protectedNotes!=="n1"||x.protectedLyrics!=="l1"||x.protectedCue!=="cue2")return "REJECT_PROTECTION";if(x.hostVersion!=="h1"||x.sourceHash!=="s1"||x.reportVersion!==x.candidateVersion)return "PENDING_REVALIDATION";if(x.voiceIdentity!=="bound"||x.measurement!=="valid")return "UNKNOWN";if(x.referenceHz!==220||x.estimatedHz!==220)return "REVIEW_MEASUREMENT";return "STATIC_CANDIDATE_ONLY";}
const base={"permission":"confirmed","safety":"confirmed","clock":"t1","target":"v1","protectedNotes":"n1","protectedLyrics":"l1","protectedCue":"cue2","hostVersion":"h1","sourceHash":"s1","reportVersion":"c2","candidateVersion":"c2","voiceIdentity":"bound","measurement":"valid","referenceHz":220,"estimatedHz":220};
const fixtures=[["all stipulated conditions",{},"STATIC_CANDIDATE_ONLY"],["revocation",{"permission":"revoked"},"STOP"],["permission unknown",{"permission":"unknown"},"UNKNOWN"],["site safety unknown",{"safety":"unknown"},"UNKNOWN"],["clock changed",{"clock":"t2"},"REJECT_PROTECTION"],["goal drift",{"target":"v2"},"REJECT_PROTECTION"],["note changed",{"protectedNotes":"n2"},"REJECT_PROTECTION"],["lyric changed",{"protectedLyrics":"l2"},"REJECT_PROTECTION"],["protected cue changed",{"protectedCue":"cue3"},"REJECT_PROTECTION"],["host changed",{"hostVersion":"h2"},"PENDING_REVALIDATION"],["source changed",{"sourceHash":"s2"},"PENDING_REVALIDATION"],["stale report",{"reportVersion":"c1"},"PENDING_REVALIDATION"],["voice ambiguous",{"voiceIdentity":"unknown"},"UNKNOWN"],["invalid measurement",{"measurement":"invalid"},"UNKNOWN"],["different estimate",{"estimatedHz":200},"REVIEW_MEASUREMENT"]];
for(const [name,patch,expected] of fixtures) {
  const actual=assess({...base,...patch});
  if(actual!==expected) throw Error(name+": "+actual+" != "+expected);
}
```

| 试验 | 实际 | 期望 |
|---|---|---|
| all stipulated conditions | STATIC_CANDIDATE_ONLY | STATIC_CANDIDATE_ONLY |
| revocation | STOP | STOP |
| permission unknown | UNKNOWN | UNKNOWN |
| site safety unknown | UNKNOWN | UNKNOWN |
| clock changed | REJECT_PROTECTION | REJECT_PROTECTION |
| goal drift | REJECT_PROTECTION | REJECT_PROTECTION |
| note changed | REJECT_PROTECTION | REJECT_PROTECTION |
| lyric changed | REJECT_PROTECTION | REJECT_PROTECTION |
| protected cue changed | REJECT_PROTECTION | REJECT_PROTECTION |
| host changed | PENDING_REVALIDATION | PENDING_REVALIDATION |
| source changed | PENDING_REVALIDATION | PENDING_REVALIDATION |
| stale report | PENDING_REVALIDATION | PENDING_REVALIDATION |
| voice ambiguous | UNKNOWN | UNKNOWN |
| invalid measurement | UNKNOWN | UNKNOWN |
| different estimate | REVIEW_MEASUREMENT | REVIEW_MEASUREMENT |
实际 15/15。正面候选仍为STATIC_CANDIDATE_ONLY；禁止转为执行授权或accepted claim。CQ04/06/13/16/19–26可由各D4发现入口进入，不测真实LLM。全部28旧槽复合候选另见R3d，不声称28项真实回放。
