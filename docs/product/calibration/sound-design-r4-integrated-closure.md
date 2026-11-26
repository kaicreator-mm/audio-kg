# K18 R4 — 综合电子音色设计与有限验证
DRAFT #72。11D2/44D3/44D4/176四视角；无迁入，不关闭D24。源[资格](../../research/source-qualification-sound-design-r1-r2.md)、[归属](sound-design-r3-legacy-convergence.md)、[能力](sound-design-r3-capability-calibration.md)、[发现](sound-design-r3-discovery-cq.md)。

## EX01 合成设计中的频率、时间与控制
加法峰值上界为幅度绝对值之和，不等实际峰值；线性定常频响的幅度乘法不能套到非线性共振。理想谐波严格低于Nyquist仅为局部频率筛选，不能证明后续非线性、FM或波表抗混叠。Chowning原1973论文之1977重印（S605封面及印46/47实际截图）提供载波/调制频率/频偏、边带图。正弦定常FM指数I=Δf/fm，fc+n fm是频率候选，权重受Bessel及相位影响，负频率折返与相位合并不能用绝对值后简单重复计数；本见证只计算有符号候选和指数，不求Bessel或真实听觉。S606具体opcode参数另核。波表单周期线性相位插值与帧间morph、guard、抗混叠分开；S608 Live12波表位置与音高控制、RAW以及加/乘法调制为具名文档，不声称帧间线性实现。S609 fog起点轨迹与粒内读取率分开，50ms×40/s=2仅理想稳态平均重叠，不能推出峰值。S610物理模型使用激励/延迟/滤波/反馈，fs/D仅理想延迟频率，wgpluck2特定反射系数严格介于0和1，标量回路衰减不能证明一般模型稳定。[SD01/K18.01.01.01](sound-design-r1-knowledge-cases.md#L5)；[SD02/K18.01.02.01](sound-design-r1-knowledge-cases.md#L6)；[SD04/K18.01.04.01](sound-design-r1-knowledge-cases.md#L8)；[SD05/K18.02.01.01](sound-design-r1-knowledge-cases.md#L9)；[SD06/K18.02.02.01](sound-design-r1-knowledge-cases.md#L10)；[SD07/K18.02.03.01](sound-design-r1-knowledge-cases.md#L11)；[SD09/K18.03.01.01](sound-design-r1-knowledge-cases.md#L13)；[SD10/K18.03.02.01](sound-design-r1-knowledge-cases.md#L14)；[SD11/K18.03.03.01](sound-design-r1-knowledge-cases.md#L15)；[SD13/K18.04.01.01](sound-design-r1-knowledge-cases.md#L17)；[SD14/K18.04.02.01](sound-design-r1-knowledge-cases.md#L18)；[SD15/K18.04.03.01](sound-design-r1-knowledge-cases.md#L19)；[SD17/K18.05.01.01](sound-design-r1-knowledge-cases.md#L21)；[SD18/K18.05.02.01](sound-design-r1-knowledge-cases.md#L22)；[SD19/K18.05.03.01](sound-design-r1-knowledge-cases.md#L23)

## EX02 可编辑乐器、电子表演与评价
S611根音/键域/力度区间与循环分别保存，velocity0是note-off，重叠层非默认唯一；播放器特定循环行为独立。S612 adsr vs madsr特定MIDI释放条件，不能把一般门控线性包络示意当实际opcode。S608加法0中性/乘法1中性，LFO拍或Hz、极性与目标单位明确。S603 Web Audio固定REC的环路排序先处理DelayNode、仍存环路节点静音，render quantum延迟约束；本有限保守拓扑筛选只删除题设已合格延迟节点的瞬时子图，存在任何剩余环则拒绝，不证明反馈稳定或宿主实际运行。S613 Rack的primary polyphony与mono广播/不足多声道补0、1V/oct是Rack约定，不泛化硬件。S614 Rack模块预设不含patch storage文件、版本兼容方向及Max8 client path精确匹配不意味着完整重开。S615 MIDI1.0 14位bend中心8192，范围由接收端配置；All Sound Off和All Notes Off不同，发送非真实静音。S616幅度谱质心与窗/频率、时点绑定；静音分母0本例UNKNOWN，不声称库实际行为；同质心不同谱及动态，技术与审美分开。S617仅规范范围入口，不自称MUSHRA或正式听评。[SD21/K18.06.01.01](sound-design-r2-knowledge-cases.md#L5)；[SD22/K18.06.02.01](sound-design-r2-knowledge-cases.md#L6)；[SD23/K18.06.03.01](sound-design-r2-knowledge-cases.md#L7)；[SD24/K18.06.04.01](sound-design-r2-knowledge-cases.md#L8)；[SD25/K18.07.01.01](sound-design-r2-knowledge-cases.md#L9)；[SD26/K18.07.02.01](sound-design-r2-knowledge-cases.md#L10)；[SD27/K18.07.03.01](sound-design-r2-knowledge-cases.md#L11)；[SD28/K18.07.04.01](sound-design-r2-knowledge-cases.md#L12)；[SD29/K18.08.01.01](sound-design-r2-knowledge-cases.md#L13)；[SD30/K18.08.02.01](sound-design-r2-knowledge-cases.md#L14)；[SD31/K18.08.03.01](sound-design-r2-knowledge-cases.md#L15)；[SD33/K18.09.01.01](sound-design-r2-knowledge-cases.md#L17)；[SD34/K18.09.02.01](sound-design-r2-knowledge-cases.md#L18)；[SD35/K18.09.03.01](sound-design-r2-knowledge-cases.md#L19)；[SD36/K18.09.04.01](sound-design-r2-knowledge-cases.md#L20)；[SD37/K18.10.01.01](sound-design-r2-knowledge-cases.md#L21)；[SD38/K18.10.02.01](sound-design-r2-knowledge-cases.md#L22)；[SD39/K18.10.03.01](sound-design-r2-knowledge-cases.md#L23)；[SD40/K18.10.04.01](sound-design-r2-knowledge-cases.md#L24)；[SD41/K18.11.01.01](sound-design-r2-knowledge-cases.md#L25)；[SD42/K18.11.02.01](sound-design-r2-knowledge-cases.md#L26)；[SD43/K18.11.03.01](sound-design-r2-knowledge-cases.md#L27)

## KC-SD18 — 保护旋律和素材的局部音色修订
原创有限任务SD-J1：保护PPQ480/T120下三事件(pitch,start,dur)=(60,0,480),(62,480,480),(64,960,240)，原表、样本、seed、host/plugin、连线、宏映射、依赖、增益和量规均不可改。本例唯一允许cutoffHz在[200,2000]、depth在[0,1]；基础1000/.2，修订800/.3；变更后patch/output标记从PATCH1/D1到PATCH2/D2，标签仅题设标记非实际hash。非线性/宿主变化、实际导出/重开、测量和权利另证，不由合成回执构造事实。图OSC→FILTER→AMP→OUT固定。固定素材之外的改变需新合格场景，不用新回执绕过。候选不实际渲染；仅验证能否推导合成任务当前接受条件。
| 阶段 | 条件与产物 | 反例/停止 | 入口 |
|---|---|---|---|
| 目标 | 声音设计目标、保护符号旋律、输入版本，选择减法与调制 | 把更亮当更好或以音色相似代旋律保真 | [SD01/K18.01.01.01](sound-design-r1-knowledge-cases.md#L5)；[SD02/K18.01.02.01](sound-design-r1-knowledge-cases.md#L6)；[SD03/K18.01.03.01](sound-design-r1-knowledge-cases.md#L7)；[SD42/K18.11.02.01](sound-design-r2-knowledge-cases.md#L26)；[SD44/K18.11.04.01](sound-design-r2-knowledge-cases.md#L28) |
| 编辑 | 保持固定源、patch图及宏映射，调整两指定参数 | 源替换、图修改、gain变化、越界，即使fresh Q | [SD12/K18.03.04.01](sound-design-r1-knowledge-cases.md#L16)；[SD24/K18.06.04.01](sound-design-r2-knowledge-cases.md#L8)；[SD28/K18.07.04.01](sound-design-r2-knowledge-cases.md#L12)；[SD32/K18.08.04.01](sound-design-r2-knowledge-cases.md#L16)；[SD35/K18.09.03.01](sound-design-r2-knowledge-cases.md#L19)；[SD36/K18.09.04.01](sound-design-r2-knowledge-cases.md#L20) |
| 复核 | 依赖完整及重开/编辑、技术/音乐/保护、当前身份和失效复核均题设合格 | 缺插件、旧报告、输出标记重用、未知复核 | [SD24/K18.06.04.01](sound-design-r2-knowledge-cases.md#L8)；[SD33/K18.09.01.01](sound-design-r2-knowledge-cases.md#L17)；[SD34/K18.09.02.01](sound-design-r2-knowledge-cases.md#L18)；[SD36/K18.09.04.01](sound-design-r2-knowledge-cases.md#L20)；[SD44/K18.11.04.01](sound-design-r2-knowledge-cases.md#L28) |
| 输出 | 当前权利/安全分别题设，合成候选仅SYNTHETIC_CANDIDATE_ONLY，失败保留原始快照 | 把新回执、音频存在、发送MIDI当真实放行或设备安全 | [SD38/K18.10.02.01](sound-design-r2-knowledge-cases.md#L22)；[SD43/K18.11.03.01](sound-design-r2-knowledge-cases.md#L27)；[SD44/K18.11.04.01](sound-design-r2-knowledge-cases.md#L28) |
其他owner：K01/K13真实旋律和适配、K08数字实现、K09工程、K10真实评价、K12工具执行、K15真实权利/治理、K07/K19安全/现场，均未由本模块合成结果获得真实证据。重新合格需按变化重新建立场景而非放宽本验证。实际不执行音频、硬件、MIDI或宿主。

## 实际可重放有限JS见证
以下函数是实际执行的同一函数；固定原创数值及题设标记。数学与条件检查非通用DSP/音频库、通用授权/验收或真实宿主输出。routing的delays输入为题设已声明合格延迟节点，不测延迟大小、环路增益或稳定性；表插值仅一周期示例；SD-J1只允许指定素材和两参数范围，新标记不等实际内容摘要，receipt及g是题设证据、并非真实观察。所有拒绝与合格均限定本例。G04 #74修正：固定JSON型命名映射比较键集合和值，不比较插入顺序；数组（音符/路径等）顺序保留。实际修改仅cutoff/depth值变动。历史44项结果保存在原受审6715ca2b6f177600098bdb2f1c58b87656674334（R4 blob cc9491d905d2bcec05833f395e02f66c1fb9e930），本轮实际重放原44及修订后49（原44+5新增），不累计为93。
```javascript
function runK18Finite(){
 const eq=(a,b)=>{if(a===b)return true;if(a===null||b===null||typeof a!=="object"||typeof b!=="object"||Array.isArray(a)!==Array.isArray(b))return false;if(Array.isArray(a))return a.length===b.length&&a.every((v,i)=>eq(v,b[i]));const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&eq(a[k],b[k]))},cp=x=>JSON.parse(JSON.stringify(x)),close=(a,b)=>Math.abs(a-b)<1e-9,finite=Number.isFinite;
 function harmonicGrid(f,fs,n){if(!finite(f)||f<=0||!finite(fs)||fs<=0||!Number.isSafeInteger(n)||n<1||n>1024)return null;return Array.from({length:n},(_,i)=>f*(i+1)).filter(v=>v<fs/2)}
 function peakBound(a){return Array.isArray(a)&&a.length&&a.every(finite)?a.reduce((s,v)=>s+Math.abs(v),0):null}
 function linearFilter(a,g){return Array.isArray(a)&&Array.isArray(g)&&a.length>0&&a.length===g.length&&a.every(v=>finite(v)&&v>=0)&&g.every(v=>finite(v)&&v>=0)?a.map((v,i)=>v*g[i]):null}
 function fmGrid(fc,fm,dev,n){if(![fc,fm,dev].every(finite)||fc<=0||fm<=0||dev<0||!Number.isSafeInteger(n)||n<0||n>1024)return null;return {index:dev/fm,signedCandidates:dev===0?[fc]:Array.from({length:2*n+1},(_,i)=>fc+(i-n)*fm)}}
 function tableAt(t,phase){if(!Array.isArray(t)||t.length<2||!t.every(finite)||!finite(phase)||phase<0||phase>1)return null;const k=(phase%1)*t.length,i=Math.floor(k),q=k-i;return t[i]*(1-q)+t[(i+1)%t.length]*q}
 function morph(a,b,x){return Array.isArray(a)&&Array.isArray(b)&&a.length>=2&&a.length===b.length&&[...a,...b].every(finite)&&finite(x)&&x>=0&&x<=1?a.map((v,i)=>v*(1-x)+b[i]*x):null}
 function grainOverlap(seconds,density){return [seconds,density].every(finite)&&seconds>0&&density>=0?seconds*density:null}
 // Only positive integer sample step; length is number of read events.
 function grainInBounds(start,count,step,N){return [start,count,step,N].every(Number.isSafeInteger)&&start>=0&&count>0&&step>0&&N>0&&start+(count-1)*step<N}
 function delayHz(fs,D){return finite(fs)&&fs>0&&finite(D)&&D>0?fs/D:null}
 function reflection(x){return finite(x)&&x>0&&x<1}
 function rate(note,root){return [note,root].every(x=>Number.isInteger(x)&&x>=0&&x<=127)?2**((note-root)/12):null}
 const regions=[{id:"LOW",lo:60,hi:63,vlo:1,vhi:63,root:60},{id:"HIGH",lo:60,hi:63,vlo:64,vhi:127,root:60}];
 function regionMatches(n,v){if(![n,v].every(x=>Number.isInteger(x)&&x>=0&&x<=127)||v===0)return [];return regions.filter(r=>n>=r.lo&&n<=r.hi&&v>=r.vlo&&v<=r.vhi).map(r=>r.id)}
 function envEarlyRelease(t,off,attack,release){if(![t,off,attack,release].every(finite)||t<0||off<0||off>attack||attack<=0||release<=0)return null;return t<off?t/attack:(off/attack)*Math.max(0,1-(t-off)/release)}
 function mod(base,sources,mode){if(!finite(base)||!Array.isArray(sources)||!sources.every(finite))return null;if(mode==="add")return base+sources.reduce((a,b)=>a+b,0);if(mode==="multiply"&&sources.every(v=>v>=0))return base*sources.reduce((a,b)=>a*b,1);return null}
 function polySecondary(N,values){if(!Number.isInteger(N)||N<1||N>16||!Array.isArray(values)||values.length<1||values.length>16||!values.every(finite))return null;return Array.from({length:N},(_,i)=>values.length===1?values[0]:values[i]??0)}
 function bend(lsb,msb){return [lsb,msb].every(v=>Number.isInteger(v)&&v>=0&&v<128)?lsb+128*msb:null}
 function centroid(f,a){if(!Array.isArray(f)||!Array.isArray(a)||!f.length||f.length!==a.length||!f.every(v=>finite(v)&&v>=0)||!a.every(v=>finite(v)&&v>=0))return null;const s=a.reduce((x,y)=>x+y,0);return s>0?f.reduce((x,y,i)=>x+y*a[i],0)/s:null}
 // Conservative topology screen, not Web Audio renderer. Remove each declared
 // delay node from the instantaneous subgraph; any residual cycle is rejected.
 function routing(nodes,edges,delays){if(!Array.isArray(nodes)||!nodes.length||new Set(nodes).size!==nodes.length||!Array.isArray(edges)||!Array.isArray(delays)||!delays.every(n=>nodes.includes(n))||!edges.every(e=>Array.isArray(e)&&e.length===2&&e.every(n=>nodes.includes(n))))return "UNKNOWN";const live=nodes.filter(n=>!delays.includes(n)),state=new Map();function visit(n){if(state.get(n)===1)return false;if(state.get(n)===2)return true;state.set(n,1);for(const [u,v] of edges)if(u===n&&live.includes(v)&&!visit(v))return false;state.set(n,2);return true}return live.every(visit)?"TOPOLOGY_CANDIDATE_ONLY":"ZERO_DELAY_CYCLE"}
 const protectedNotes=[{pitch:60,start:0,dur:480},{pitch:62,start:480,dur:480},{pitch:64,start:960,dur:240}];
 const base={fixture:"SD-J1",clock:"PPQ480-T120",notes:cp(protectedNotes),source:"ORIGINAL-SYNTHETIC-TABLE1",waveTable:[0,1,0,-1],sample:"SYNTHETIC-SAMPLE1",seed:17,host:"H1@1",plugin:"P1@1",patch:"PATCH1",graph:[["OSC","FILTER"],["FILTER","AMP"],["AMP","OUT"]],params:{cutoffHz:1000,depth:.2,gain:.5},mapping:"MAP1",deps:["H1@1","P1@1","ORIGINAL-SYNTHETIC-TABLE1","SYNTHETIC-SAMPLE1"],output:"D1",rubric:"Q1"};
 const keys=Object.keys(base),paramKeys=Object.keys(base.params);
 function sameKeys(a,k){return !!a&&typeof a==="object"&&Object.keys(a).length===k.length&&k.every(s=>Object.hasOwn(a,s))}
 function exact(a,b){return sameKeys(a,keys)&&sameKeys(b,keys)&&keys.every(k=>eq(a[k],b[k]))}
 // Only cutoff and depth may change, plus a new patch/output marker after edit.
 function allowedCandidate(c){if(!sameKeys(c,keys)||!sameKeys(c.params,paramKeys))return false;const fixed=keys.filter(k=>!["params","patch","output"].includes(k));if(!fixed.every(k=>eq(c[k],base[k]))||c.params.gain!==base.params.gain||!finite(c.params.cutoffHz)||c.params.cutoffHz<200||c.params.cutoffHz>2000||!finite(c.params.depth)||c.params.depth<0||c.params.depth>1)return false;const changed=c.params.cutoffHz!==base.params.cutoffHz||c.params.depth!==base.params.depth;return changed?c.patch==="PATCH2"&&c.output==="D2":c.patch===base.patch&&c.output===base.output}
 function receipt(c){return {identity:cp(c),kind:"SYNTHETIC_STIPULATION",technical:true,musical:true,protectedContent:true,editable:true,depsVerified:true,reopened:true,reviewCurrent:true}}
 function gate(c,q,g){if(!allowedCandidate(c))return "OUTSIDE_FIXTURE";if(!g||g.syntheticOnly!==true||g.actualOutput!==false||g.rights!==true||g.safety!==true)return "STOP_OR_PENDING";if(!q||!exact(c,q.identity)||q.kind!=="SYNTHETIC_STIPULATION"||!["technical","musical","protectedContent","editable","depsVerified","reopened","reviewCurrent"].every(k=>q[k]===true))return "NOT_READY";return "SYNTHETIC_CANDIDATE_ONLY"}
 const g={syntheticOnly:true,actualOutput:false,rights:true,safety:true};
 const edit={...cp(base),params:{cutoffHz:800,depth:.3,gain:.5},patch:"PATCH2",output:"D2"};
 const tests=[
 ["partial amplitude bound",close(peakBound([.4,.2,.1]),.7)],
 ["linear steady response",linearFilter([.5,.3,.2],[1,.5,.1]).every((v,i)=>close(v,[.5,.15,.02][i]))],
 ["strict Nyquist harmonic screening",eq(harmonicGrid(8000,48000,8),[8000,16000])],
 ["invalid oscillator bounds",harmonicGrid(0,48000,8)===null&&harmonicGrid(440,0,8)===null],
 ["FM index and signed frequency candidates",eq(fmGrid(440,110,220,1),{index:2,signedCandidates:[330,440,550]})],
 ["zero deviation carrier only",eq(fmGrid(440,110,0,3),{index:0,signedCandidates:[440]})],
 ["negative frequencies retained for analysis not discarded",eq(fmGrid(100,300,300,1).signedCandidates,[-200,100,400])],
 ["invalid modulator refused",fmGrid(440,0,220,1)===null],
 ["single-cycle interpolation",tableAt([0,1,0,-1],.125)===.5],
 ["table end wraps",tableAt([0,1,0,-1],.875)===-.5&&tableAt([0,1,0,-1],1)===0],
 ["invalid phase and table",tableAt([0,1],1.1)===null&&tableAt([0],.1)===null],
 ["frame morph",eq(morph([0,1,0,-1],[0,.2,0,-.2],.25),[0,.8,0,-.8])],
 ["misaligned table lengths refuse",morph([0,1],[0,1,0],.5)===null],
 ["ideal average overlap",grainOverlap(.05,40)===2],
 ["grain boundary checks",!grainInBounds(47000,2400,1,48000)&&grainInBounds(45600,2400,1,48000)&&!grainInBounds(45601,2400,1,48000)],
 ["step and endpoints",grainInBounds(0,3,2,5)&&!grainInBounds(0,3,2,4)&&!grainInBounds(0,3,0,5)],
 ["ideal delay pitch",delayHz(48000,100)===480&&close(delayHz(48000,48000/440),440)],
 ["reflection strict bound",reflection(.5)&&!reflection(0)&&!reflection(1)&&!reflection(1.1)],
 ["scalar impulse decay",eq([0,1,2].map(n=>.5**n),[1,.5,.25])],
 ["sample transposition ratio",close(rate(62,60),2**(1/6))&&rate(72,60)===2],
 ["key and velocity boundaries",eq(regionMatches(60,63),["LOW"])&&eq(regionMatches(63,64),["HIGH"])&&eq(regionMatches(64,64),[])&&eq(regionMatches(60,0),[])],
 ["early noteoff no jump to sustain",close(envEarlyRelease(.05,.05,.1,.3),.5)&&close(envEarlyRelease(.2,.05,.1,.3),.25)&&close(envEarlyRelease(.35,.05,.1,.3),0)],
 ["tempo sync 2 beats",120/60/2===1],
 ["additive multiplicative modulation",close(mod(.5,[.2,-.1],"add"),.6)&&close(mod(.5,[.8,1],"multiply"),.4)],
 ["neutral values and zero multiplier",mod(.5,[0],"add")===.5&&mod(.5,[1],"multiply")===.5&&mod(.5,[0],"multiply")===0],
 ["Rack mono and missing channel policy",eq(polySecondary(3,[2]),[2,2,2])&&eq(polySecondary(3,[2,3]),[2,3,0])&&eq(polySecondary(2,[1,2,3]),[1,2])],
 ["voltage octave relation",440*2**1===880&&440*2**-1===220],
 ["routing ordinary DAG",routing(["A","B"],[["A","B"]],[])==="TOPOLOGY_CANDIDATE_ONLY"],
 ["routing delayed cycle only structural",routing(["A","D"],[["A","D"],["D","A"]],["D"])==="TOPOLOGY_CANDIDATE_ONLY"],
 ["residual zero-delay subcycle with delay elsewhere",routing(["A","B","D"],[["A","B"],["B","A"],["A","D"],["D","A"]],["D"])==="ZERO_DELAY_CYCLE"],
 ["self-loop and unknown node",routing(["A"],[["A","A"]],[])==="ZERO_DELAY_CYCLE"&&routing(["A"],[["A","X"]],[])==="UNKNOWN"],
 ["macro mapping",200+(2000-200)*.5===1100&&1-.5*.5===.75],
 ["MIDI 14-bit center and extremes",bend(0,64)===8192&&bend(127,127)===16383&&bend(0,0)===0&&bend(128,0)===null],
 ["spectral centroid and silent unknown",centroid([100,300,500],[1,2,1])===300&&centroid([100,300,500],[0,0,0])===null],
 ["same centroid different spectra",centroid([100,300,500],[1,0,1])===centroid([100,300,500],[0,2,0])],
 ["fixed candidate positive",gate(base,receipt(base),g)==="SYNTHETIC_CANDIDATE_ONLY"],
 ["current allowed edit positive",gate(edit,receipt(edit),g)==="SYNTHETIC_CANDIDATE_ONLY"],
 ["old receipt after edit rejects",gate(edit,receipt(base),g)==="NOT_READY"],
 ["fresh receipt cannot authorize changed source or graph or dependency",["source","sample","waveTable","seed","host","plugin","graph","mapping","deps","notes","clock","rubric","fixture"].every(k=>{const c={...cp(edit),[k]:"changed"};return gate(c,receipt(c),g)==="OUTSIDE_FIXTURE"})],
 ["same content marker after changed patch refuses",gate({...edit,output:"D1"},receipt({...edit,output:"D1"}),g)==="OUTSIDE_FIXTURE"],
 ["protected gain and parameter bounds",[{gain:.7},{cutoffHz:50},{depth:1.1},{extra:1}].every(o=>{const c={...cp(edit),params:{...edit.params,...o}};return gate(c,receipt(c),g)==="OUTSIDE_FIXTURE"})],
 ["missing actual dependency verification or reopen or review refuses",["depsVerified","reopened","reviewCurrent","editable","protectedContent","technical","musical"].every(k=>gate(edit,{...receipt(edit),[k]:null},g)==="NOT_READY")],
 ["synthetic rights safety and output flags independently bound",["syntheticOnly","rights","safety"].every(k=>gate(edit,receipt(edit),{...g,[k]:null})==="STOP_OR_PENDING")&&gate(edit,receipt(edit),{...g,actualOutput:true})==="STOP_OR_PENDING"],
 ["all current receipt identity fields exact",keys.every(k=>gate(edit,{...receipt(edit),identity:{...cp(edit),[k]:"changed"}},g)==="NOT_READY")],

 ["order-only base map same marker accepted",(()=>{const c={...cp(base),params:{gain:.5,depth:.2,cutoffHz:1000}};return gate(c,receipt(c),g)==="SYNTHETIC_CANDIDATE_ONLY"})()],
 ["order-only base map new marker rejected",(()=>{const c={...cp(base),params:{gain:.5,depth:.2,cutoffHz:1000},patch:"PATCH2",output:"D2"};return gate(c,receipt(c),g)==="OUTSIDE_FIXTURE"})()],
 ["same semantic receipt with reordered params and top keys accepted",(()=>{const q=receipt(edit);q.identity=Object.fromEntries(Object.entries(q.identity).reverse());q.identity.params={gain:.5,depth:.3,cutoffHz:800};return gate(edit,q,g)==="SYNTHETIC_CANDIDATE_ONLY"})()],
 ["ordered notes and graph cannot be reversed",["notes","graph"].every(k=>{const c={...cp(edit),[k]:[...edit[k]].reverse()};return gate(c,receipt(c),g)==="OUTSIDE_FIXTURE"})],
 ["receipt ordered arrays still exact",["notes","graph"].every(k=>{const q=receipt(edit);q.identity[k].reverse();return gate(edit,q,g)==="NOT_READY"})]

 ];
 return tests;
}
console.log(runK18Finite());
```
## G04 实际结果
1. partial amplitude bound: true
2. linear steady response: true
3. strict Nyquist harmonic screening: true
4. invalid oscillator bounds: true
5. FM index and signed frequency candidates: true
6. zero deviation carrier only: true
7. negative frequencies retained for analysis not discarded: true
8. invalid modulator refused: true
9. single-cycle interpolation: true
10. table end wraps: true
11. invalid phase and table: true
12. frame morph: true
13. misaligned table lengths refuse: true
14. ideal average overlap: true
15. grain boundary checks: true
16. step and endpoints: true
17. ideal delay pitch: true
18. reflection strict bound: true
19. scalar impulse decay: true
20. sample transposition ratio: true
21. key and velocity boundaries: true
22. early noteoff no jump to sustain: true
23. tempo sync 2 beats: true
24. additive multiplicative modulation: true
25. neutral values and zero multiplier: true
26. Rack mono and missing channel policy: true
27. voltage octave relation: true
28. routing ordinary DAG: true
29. routing delayed cycle only structural: true
30. residual zero-delay subcycle with delay elsewhere: true
31. self-loop and unknown node: true
32. macro mapping: true
33. MIDI 14-bit center and extremes: true
34. spectral centroid and silent unknown: true
35. same centroid different spectra: true
36. fixed candidate positive: true
37. current allowed edit positive: true
38. old receipt after edit rejects: true
39. fresh receipt cannot authorize changed source or graph or dependency: true
40. same content marker after changed patch refuses: true
41. protected gain and parameter bounds: true
42. missing actual dependency verification or reopen or review refuses: true
43. synthetic rights safety and output flags independently bound: true
44. all current receipt identity fields exact: true
45. order-only base map same marker accepted: true
46. order-only base map new marker rejected: true
47. same semantic receipt with reordered params and top keys accepted: true
48. ordered notes and graph cannot be reversed: true
49. receipt ordered arrays still exact: true
49/49 实际有限检查通过，历史审核不改变；当前修订待G04独立核验。非通用JSON canonical hash、真实DSP、宿主、音频、权限或accepted claims。