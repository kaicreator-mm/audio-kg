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
 return {tests,base,edit,g,receipt,gate};
}
export { runK18Finite };
