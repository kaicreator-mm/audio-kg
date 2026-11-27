// T05 bounded research validator; no production authority or actual tool calls.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
const root=process.cwd(), dir="docs/research/l2-pilot/", cal="docs/product/calibration/";
const read=f=>fs.readFileSync(path.join(root,f),"utf8"), json=f=>JSON.parse(read(f)), clone=x=>structuredClone(x);
const canon=x=>x===null?"null":Array.isArray(x)?"["+x.map(canon).join(",")+"]":typeof x==="object"?"{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canon(x[k])).join(",")+"}":JSON.stringify(x);
const eq=(a,b)=>canon(a)===canon(b);
const blob=t=>crypto.createHash("sha1").update("blob "+Buffer.byteLength(t)+"\0").update(t).digest("hex");
const insist=(x,msg)=>{if(!x)throw Error(msg);};
const nonempty=x=>typeof x==="string"&&x.trim().length>0, list=x=>Array.isArray(x), positive=x=>typeof x==="number"&&Number.isFinite(x)&&x>0;
const idref=x=>x.id+"@"+x.revision, d4=/^K(?:0[1-9]|1[0-9])\.\d\d\.\d\d\.\d\d$/, cq=/^CQ(?:0[1-9]|1[0-9]|2[0-6])$/;
const base="280d3be584ab717211b9b99925ac07705f2ab64c";
function anchor(a){
 insist(a&&a.commit===base&&/^[a-f0-9]{40}$/.test(a.blob)&&Number.isInteger(a.line)&&a.line>0&&/^docs\/(?:product\/calibration|research)\/[a-z0-9-]+\.md$/.test(a.file),"anchor identity");
 const text=read(a.file);insist(blob(text)===a.blob&&text.split("\n")[a.line-1]===a.row,"anchor content "+a.file+":"+a.line);
}
const sourceFields=["id","revision","type","title","version","uri","locator","grade","rights","author","publicationDate","accessDate","registration"];
const recordFields={
 Claim:["id","revision","type","owner","topic","d4","kind","statement","context","status","cq","limits","review"],
 Context:["id","revision","type","condition"],
 Evidence:["id","revision","type","kind","sources","anchor","limits","caseAnchor"],
 CaseGroup:["id","revision","type","owner","topic","d4","kind","status"],
 CaseView:["id","revision","type","group","direction","polarity","question","context","limit","example","explanation","evidenceKind"]
};
function fields(o,allowed,required=allowed){insist(o&&typeof o==="object"&&!Array.isArray(o)&&Object.keys(o).every(k=>allowed.includes(k))&&required.every(k=>Object.hasOwn(o,k)),"unexpected/missing field");}
function validate(p,s){
 fields(p,["format","status","sourceBase","claims","contexts","evidence","groups","views","bindings","edges","migrations"]);
 insist(p.format==="audio-kg-l2-pilot/1"&&p.status==="RESEARCH_ONLY"&&p.sourceBase===base,"pack authority");
 const map=new Map(), types=new Map(), stable=new Map(), targets=new Set();
 function add(o,type){
  insist(o.type===type&&/^[A-Z][A-Z0-9-]+$/.test(o.id)&&Number.isInteger(o.revision)&&o.revision>0&&!map.has(idref(o)),"record identity");
  map.set(idref(o),o); types.set(idref(o),type);
  if(stable.has(o.id))insist(stable.get(o.id)===type,"identity type drift");else stable.set(o.id,type);
 }
 function ref(k,t){insist(map.has(k)&&types.get(k)===t,"wrong/missing "+t+" "+k);return map.get(k);}
 insist(list(s)&&s.length>0,"sources absent");
 for(const o of s){
  fields(o,sourceFields); add(o,"Source");anchor(o.registration);
  insist(o.registration.row.includes(o.id)&&o.registration.row.includes(o.uri)&&["READ_LOCATOR","REGISTERED_LIMITED"].includes(o.grade)&&o.rights==="UNKNOWN_NO_IMPORT"&&nonempty(o.locator)&&nonempty(o.title)&&nonempty(o.version)&&nonempty(o.author)&&nonempty(o.publicationDate)&&nonempty(o.accessDate),"source qualification");
  // Exact source row is preserved. A limited registration cannot be promoted to read locator.
  insist(o.grade==="REGISTERED_LIMITED"||o.registration.row.includes("READ_LOCATOR")||o.registration.row.includes("重读"),"source grade escalation");
 }
 for(const [key,type] of [["claims","Claim"],["contexts","Context"],["evidence","Evidence"],["groups","CaseGroup"],["views","CaseView"]]){
  insist(list(p[key])&&p[key].length>0,"missing collection "+key);
  for(const o of p[key]){fields(o,recordFields[type],recordFields[type].filter(x=>x!=="caseAnchor"));add(o,type);}
 }
 for(const o of p.contexts)insist(nonempty(o.condition),"empty context");
 for(const o of p.evidence){
  anchor(o.anchor);if(o.caseAnchor)anchor(o.caseAnchor);
  insist(o.kind==="L1_RESEARCH_LOCATOR"&&list(o.sources)&&o.sources.length&&new Set(o.sources).size===o.sources.length&&nonempty(o.limits),"evidence qualification");
  for(const x of o.sources){const src=ref(x,"Source");insist(o.anchor.row.includes(src.id)||(o.caseAnchor&&o.caseAnchor.row.includes(src.id))||src.id==="S022"&&o.anchor.row.includes("cents"),"source not linked to predicate");}
 }
 for(const o of p.claims){
  insist(d4.test(o.d4)&&o.owner===o.d4.slice(0,3)&&o.topic===o.d4.slice(0,-3)&&nonempty(o.statement)&&nonempty(o.limits)&&o.status==="CANDIDATE"&&o.review==="L1_SCOPED_RESEARCH_NOT_CLAIM_ADMISSION"&&["definition","norm","empirical","practice","preference","hypothesis"].includes(o.kind)&&list(o.cq)&&o.cq.length&&o.cq.every(x=>cq.test(x))&&!targets.has(o.d4),"claim owner/target/status");
  targets.add(o.d4);ref(o.context,"Context");
 }
 for(const o of p.groups)insist(d4.test(o.d4)&&o.owner===o.d4.slice(0,3)&&o.topic===o.d4.slice(0,-3)&&o.kind==="SYNTHETIC"&&o.status==="CANDIDATE"&&targets.has(o.d4),"case group");
 for(const o of p.views){
  ref(o.group,"CaseGroup");ref(o.context,"Context");
  insist(["FORWARD","REVERSE"].includes(o.direction)&&["POSITIVE","NEGATIVE","BOUNDARY","UNKNOWN"].includes(o.polarity)&&nonempty(o.question)&&nonempty(o.limit)&&nonempty(o.explanation)&&o.example&&typeof o.example==="object"&&o.evidenceKind==="SYNTHETIC_EXPECTED_NOT_OBSERVED","view contract");
 }
 // This pilot implements the relationship subset actually exercised; the rest of the design is not claimed executable.
 const relationship={supported_by:["Claim","Evidence"],applies_under:["Claim","Context"],requires:["Claim","Claim"],references:["Claim","Claim"]};
 const edgeIds=new Set(),edgeKeys=new Set(),deps=new Map();
 for(const e of p.edges){
  fields(e,["id","type","from","to","condition"]);insist(nonempty(e.id)&&!edgeIds.has(e.id)&&Object.hasOwn(relationship,e.type),"edge type/id");
  edgeIds.add(e.id);const k=canon([e.type,e.from,e.to,e.condition]);insist(!edgeKeys.has(k),"duplicate edge");edgeKeys.add(k);
  const [a,b]=relationship[e.type];const from=ref(e.from,a),to=ref(e.to,b);ref(e.condition,"Context");insist(e.condition===from.context&&e.from!==e.to,"edge condition/self");
  if(e.type==="applies_under")insist(e.to===from.context,"condition mismatch");
  if(e.type==="supported_by")insist(to.anchor.row.includes(from.d4)||to.caseAnchor?.row.includes(from.d4),"evidence target mismatch");
  if(e.type==="requires"){if(!deps.has(e.from))deps.set(e.from,[]);deps.get(e.from).push(e.to);}
 }
 function visit(x,stack=new Set()){insist(!stack.has(x),"dependency cycle");let n=new Set(stack);n.add(x);for(const y of deps.get(x)||[])visit(y,n);}
 for(const x of deps.keys())visit(x);
 for(const c of p.claims){const es=p.edges.filter(e=>e.from===idref(c));insist(es.some(e=>e.type==="supported_by")&&es.filter(e=>e.type==="applies_under").length===1,"missing claim evidence/context");}
 const byClaim=new Map(),byView=new Map(),bindIds=new Set(),bindKeys=new Set();
 for(const b of p.bindings){
  fields(b,["id","view","claim","role","condition"]);insist(nonempty(b.id)&&!bindIds.has(b.id)&&["PRIMARY_TARGET","REQUIRES"].includes(b.role),"binding role/id");bindIds.add(b.id);
  const k=canon([b.view,b.claim,b.role,b.condition]);insist(!bindKeys.has(k),"duplicate binding");bindKeys.add(k);
  const v=ref(b.view,"CaseView"),c=ref(b.claim,"Claim"),g=ref(v.group,"CaseGroup");ref(b.condition,"Context");insist(b.condition===v.context,"binding context");
  if(b.role==="PRIMARY_TARGET")insist(g.d4===c.d4&&g.owner===c.owner&&v.context===c.context,"primary mismatch");
  else insist(p.edges.some(e=>e.type==="requires"&&e.to===b.claim&&e.from===idref(p.claims.find(x=>x.d4===g.d4))&&e.condition===v.context),"unsupported cross-binding");
  for(const [idx,x] of [[byClaim,b.claim],[byView,b.view]]){if(!idx.has(x))idx.set(x,[]);idx.get(x).push(b);}
 }
 for(const v of p.views)insist((byView.get(idref(v))||[]).filter(b=>b.role==="PRIMARY_TARGET").length===1,"view must have one primary");
 for(const g of p.groups){const vs=p.views.filter(v=>v.group===idref(g));for(const [d,q] of [["FORWARD","POSITIVE"],["FORWARD","NEGATIVE"],["REVERSE","POSITIVE"],["REVERSE","NEGATIVE"],["REVERSE","BOUNDARY"],["REVERSE","UNKNOWN"]])insist(vs.some(v=>v.direction===d&&v.polarity===q),"missing view "+g.id+" "+d+" "+q);}
 const old=new Set();
 for(const m of p.migrations){
  fields(m,["old","type","targets","state","condition","anchor"]);anchor(m.anchor);insist(d4.test(m.old)&&!old.has(m.old)&&m.anchor.row.startsWith("| "+m.old+" |")&&nonempty(m.condition)&&list(m.targets)&&m.targets.length,"migration identity");old.add(m.old);
  const cols=m.anchor.row.split("|").map(x=>x.trim());
  for(const t of m.targets)fields(t,["d4","role"]);
  if(m.type==="alias_of")insist(m.state==="L1_REQUIREMENT_ALIAS_ONLY"&&cols[3]==="MIGRATE"&&m.targets.length===1&&m.targets[0].role==="ONE_TO_ONE"&&d4.test(m.targets[0].d4)&&cols[4].startsWith(m.targets[0].d4+" /"),"bad alias");
  else {insist(m.type==="split_route"&&m.state==="SPLIT_OPEN"&&cols[8]==="MX-"+m.old,"split state");const want=[];for(const [i,role] of [[4,"NEW"],[5,"REUSE"],[6,"REF"]])for(const d of cols[i].match(/K\d\d(?:\.\d\d){0,3}/g)||[])want.push({d4:d,role});insist(eq(m.targets,want),"split target/role mismatch");}
 }
 return {map,byClaim,byView};
}
const cents=(a,b)=>1200*Math.log2(a/b);
function evaluate(op,x){
 if(op==="cents")return positive(x.reference)&&positive(x.observed)?{state:"VALUE",cents:cents(x.observed,x.reference)}:{state:"UNKNOWN"};
 if(op==="pitch"){
  if(x.valid!==true||!nonempty(x.identity)||x.referenceIdentity!==x.identity||x.estimateIdentity!==x.identity||!positive(x.estimate))return {state:"UNKNOWN_WINDOW"};
  const haveR=positive(x.reference),haveT=positive(x.target);
  return {state:haveR?(haveT?"VALUE":"UNKNOWN_TARGET"):"UNKNOWN_REFERENCE",estimateError:haveR?cents(x.estimate,x.reference):null,actualGoalError:haveR&&haveT?cents(x.reference,x.target):null,estimatedGoalError:haveT?cents(x.estimate,x.target):null};
 }
 if(op==="window")return positive(x.fs)&&Number.isInteger(x.win)&&Number.isInteger(x.nfft)&&x.win>0&&x.nfft>=x.win?{state:"VALUE",seconds:x.win/x.fs,gridHz:x.fs/x.nfft,bins:Math.floor(x.nfft/2)+1}:{state:"UNKNOWN"};
 if(op==="reverseGrid"){const n=x.fs/x.gridHz;return positive(x.fs)&&positive(x.gridHz)&&Number.isInteger(n)&&n>0?{state:"PARTIAL",nfft:n,win:null}:{state:"UNKNOWN"};}
 throw Error("unsupported query");
}
function retrieve(p,s,query){
 const idx=validate(p,s);let cs=p.claims.filter(c=>c.cq.includes(query)||idref(c)===query||c.d4===query);
 const out=cs.map(c=>({id:idref(c),d4:c.d4,owner:c.owner,statement:c.statement,status:c.status,limits:c.limits,context:idx.map.get(c.context).condition,evidence:p.edges.filter(e=>e.from===idref(c)&&e.type==="supported_by").map(e=>{const ev=idx.map.get(e.to);return {anchor:ev.anchor,sources:ev.sources.map(x=>{const t=idx.map.get(x);return {id:idref(t),uri:t.uri,locator:t.locator,grade:t.grade,rights:t.rights};})};}),cases:(idx.byClaim.get(idref(c))||[]).map(b=>{const v=idx.map.get(b.view);return {id:idref(v),role:b.role,direction:v.direction,polarity:v.polarity,question:v.question,example:v.example,explanation:v.explanation,limit:v.limit,evidenceKind:v.evidenceKind};})}));
 return {status:"RESEARCH_ONLY",claims:out};
}
function route(p,old){const m=p.migrations.find(x=>x.old===old);return !m?{state:"UNKNOWN"}:m.type==="alias_of"?{state:"REQUIREMENT_LOOKUP_ONLY",target:m.targets[0].d4}:{state:"SPLIT_OPEN",targets:m.targets,wholeSlotEquivalent:false};}
function close(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=1e-9;if(a&&b&&typeof a==="object"&&typeof b==="object"){let ka=Object.keys(a).sort(),kb=Object.keys(b).sort();return eq(ka,kb)&&ka.every(k=>close(a[k],b[k]));}return a===b;}
const pack=json(dir+"pack.json"),sources=json(dir+"sources.json"),assessment=json(dir+"assessment.json");
const checks=[];function test(name,v){insist(v,name);checks.push([name,true]);}
function reject(name,change){let p=clone(pack),s=clone(sources);change(p,s);let refused=false;try{validate(p,s);}catch(e){refused=true;}test(name,refused);}
const ix=validate(pack,sources);test("actual pack parses and validates",ix.map.size>0);
for(const v of pack.views){const bs=ix.byView.get(idref(v));test("roundtrip "+v.id,bs.every(b=>ix.byClaim.get(b.claim).some(x=>x===b)));}
for(const a of assessment.cases)test("heldout "+a.id,close(evaluate(a.operation,a.input),a.expected));
test("invalid frequency",evaluate("cents",{reference:0,observed:200}).state==="UNKNOWN");
test("wrong event",evaluate("pitch",{reference:220,estimate:220,target:200,valid:true,identity:"A",referenceIdentity:"B",estimateIdentity:"A"}).state==="UNKNOWN_WINDOW");
test("missing musical target",eq(evaluate("pitch",{reference:220,estimate:220,valid:true,identity:"A",referenceIdentity:"A",estimateIdentity:"A"}),{state:"UNKNOWN_TARGET",estimateError:0,actualGoalError:null,estimatedGoalError:null}));
test("same observation different grid",evaluate("window",{fs:48000,win:480,nfft:960}).seconds===evaluate("window",{fs:48000,win:480,nfft:1920}).seconds);
test("invalid fft length",evaluate("window",{fs:48000,win:960,nfft:480}).state==="UNKNOWN");
test("reverse multiple windows",eq(evaluate("reverseGrid",{fs:48000,gridHz:50}),{state:"PARTIAL",nfft:960,win:null}));
test("historical alias",route(pack,"K13.01.01.02").target==="K16.01.01.01");
test("split not equivalent",route(pack,"K13.02.01.01").wholeSlotEquivalent===false);
test("unregistered route unknown",route(pack,"K13.02.99.99").state==="UNKNOWN");
for(const q of ["CQ01","CQ06","CQ07","CQ21","CQ25"]){
 const v=retrieve(pack,sources,q),t=JSON.stringify(v);
 test("retrieval "+q,v.claims.length>0&&v.claims.every(c=>c.status==="CANDIDATE"&&c.evidence.length&&c.cases.some(x=>x.polarity==="NEGATIVE")&&c.cases.some(x=>x.direction==="REVERSE")));
 test("no heldout content "+q,!t.includes(assessment.marker)&&assessment.cases.every(a=>!t.includes(a.id)&&!t.includes(JSON.stringify(a.expected))));
}
test("eval id not retrievable",retrieve(pack,sources,assessment.cases[0].id).claims.length===0);
reject("duplicate record",p=>p.claims.push(clone(p.claims[0])));
reject("wrong owner",p=>p.claims[0].owner="K05");
reject("wrong topic",p=>p.claims[0].topic="K01.03.01");
reject("unsupported accepted",p=>p.claims[0].status="ACCEPTED");
reject("claim missing condition",p=>delete p.claims[0].context);
reject("source row forged",(p,s)=>s[0].registration.row+=" forged");
reject("source blob forged",(p,s)=>s[0].registration.blob="0".repeat(40));
reject("source unauthorized import",(p,s)=>s[0].rights="PERMITTED");
reject("limited source grade promotion",(p,s)=>s[1].grade="READ_LOCATOR");
reject("source dangling",p=>p.evidence[0].sources=["S999@1"]);
reject("evidence wrong predicate",p=>p.edges[0].to="EV-WINDOW@1");
reject("evidence self support",p=>p.edges[0].to=p.edges[0].from);
reject("unsupported inverse edge",p=>p.edges[0].type="supports");
reject("dangling revision",p=>p.edges[0].to="EV-CENTS@2");
reject("duplicate edge",p=>p.edges.push({...p.edges[0],id:"DUPLICATE"}));
reject("dependency cycle",p=>p.edges.push({id:"BACK",type:"requires",from:"CL-CENTS@1",to:"CL-PITCH@1",condition:"CTX-CENTS@1"}));
reject("missing source edge",p=>p.edges=p.edges.filter(e=>e.id!=="SUP-CENTS"));
reject("wrong context",p=>p.edges[0].condition="CTX-PITCH@1");
reject("wrong primary binding",p=>p.bindings[0].claim="CL-WINDOW@1");
reject("generic D2 binding",p=>p.bindings[0].claim="K01.02");
reject("duplicate binding",p=>p.bindings.push({...p.bindings[0],id:"B-DUP"}));
reject("missing reverse negative",p=>{p.views=p.views.filter(v=>v.id!=="CENTS-RN");p.bindings=p.bindings.filter(b=>b.view!=="CENTS-RN@1");});
reject("unverified observed case",p=>p.views[0].evidenceKind="OBSERVED");
reject("private assessment field",p=>p.views[0].rubric=assessment.marker);
reject("illegal whole slot alias",p=>{p.migrations[1].type="alias_of";p.migrations[1].state="L1_REQUIREMENT_ALIAS_ONLY";});
reject("swap migration role",p=>p.migrations[1].targets[0].role="REUSE");
reject("drop migration target",p=>p.migrations[1].targets.pop());
reject("stale migration status",p=>p.migrations[1].state="ACCEPTED");
// Re-execute actual frozen G04 witness, not its logged output. Integrate its result as a bounded CQ25 trace.
function frozenDoc(file,expected){const t=read(cal+file);insist(blob(t)===expected,"frozen witness blob mismatch");return t;}
const old=frozenDoc("g04-r8-xc01-independent-evidence.md","9ce52519372828337ccd19f0af30e12189279719");
const routeDoc=frozenDoc("g04-r8-seven-role-evidence.md","1326f94277d09281075f2423116f515334ea72bc");
const r9=frozenDoc("g04-r9-cq25-full-evidence-trace.md","3c3f92c3fad4b43dd6884c8c005b59dd90d6b985");
const block=(t,k)=>[...t.matchAll(new RegExp("\x60\x60\x60"+k+"\\n([\\s\\S]*?)\\n\x60\x60\x60","g"))].map(x=>x[1]);
const routeData=JSON.parse(block(routeDoc,"json")[0]),support=JSON.parse(block(r9,"json")[0]);
const sandbox={routeData,support,console:{log:()=>{}}};
const js=block(old,"js")[0]+"\n"+block(r9,"js").join("\n")+"\n;({old:original,trace:runR9CQ(xc,routeData,support)})";
const witness=vm.runInNewContext(js,sandbox,{timeout:5000});
test("R8a actual replay",witness.old.checks.length===70&&witness.old.checks.every(x=>x[1]===true));
test("R9 actual replay",witness.trace.checks.length===44&&witness.trace.checks.every(x=>x[1]===true));
const t=witness.trace.positive;
test("CQ25 seven stages",eq(t.primary,["A01","A02","A03","A04","A05","A06","A07"]));
test("CQ25 support/evidence",eq([...t.support].sort(),["S-A11","S-GV02","S-V06"])&&eq([...t.evidence].sort(),["E-EST","E-OBS","E-RECEIPT"]));
const computed=evaluate("pitch",{reference:t.reference.hz,estimate:t.estimate.hz,target:t.context.target.musicHz,valid:t.reference.valid,identity:t.context.voice,referenceIdentity:t.reference.voice,estimateIdentity:t.estimate.voice});
test("pilot calculation matches actual trace",computed.state==="VALUE"&&close(computed.estimateError,t.result.estimateError)&&close(computed.actualGoalError,t.result.actualGoalError)&&close(computed.estimatedGoalError,t.result.estimatedGoalError)&&t.result.state==="STATIC_CANDIDATE_ONLY");
test("CQ25 actual knowledge route",routeData.find(x=>x.ability==="A05").d4===pack.claims.find(x=>x.id==="CL-PITCH").d4&&retrieve(pack,sources,"CQ25").claims.some(x=>x.d4==="K05.07.01.05"));
console.log(JSON.stringify({status:"RESEARCH_ONLY",node:process.version,checks:checks.length,passed:checks.filter(x=>x[1]).length,results:checks,records:ix.map.size,bindings:pack.bindings.length,heldout:assessment.cases.length,replayed:{xc:70,r9:44},trace:{state:t.result.state,primary:t.primary,support:t.support,evidence:t.evidence,result:t.result},limits:["no actual LLM/audio/tool/permission","only exercised relationship subset","no production acceptance/DB","no exhaustive migration"]},null,2));
