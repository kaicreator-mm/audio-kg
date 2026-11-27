import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {read,json,clone,eq,blob,insist,idref,validate,evaluate,retrieve,route,close,dir,profile} from "./knowledge-pilot.mjs";
import {runWorkflowPilot} from "./workflow-pilot.mjs";
import {loadActualWitness} from "./witness-pilot.mjs";
const cal="docs/product/calibration/";
const pack=json(dir+"pack.json"),sources=json(dir+"sources.json"),rubric=json(dir+"assessment.json"),inputs=json(dir+"assessment-input.json");
const assessment={marker:rubric.marker,cases:inputs.cases.map(x=>({...x,expected:rubric.cases.find(y=>y.id===x.id)?.expected}))};
insist(inputs.namespace==="HELD_OUT_INPUTS"&&rubric.namespace==="HELD_OUT_RUBRIC"&&assessment.cases.every(x=>x.expected)&&new Set(assessment.cases.map(x=>x.id)).size===rubric.cases.length,"independent evaluation identity");
const checks=[];function test(name,v){insist(v,name);checks.push([name,true]);}
function reject(name,change){let p=clone(pack),s=clone(sources);change(p,s);let refused=false;try{validate(p,s);}catch(e){refused=true;}test(name,refused);}
const ix=validate(pack,sources);test("actual pack parses and validates",ix.map.size>0);
for(const v of pack.views){const bs=ix.byView.get(idref(v));test("roundtrip "+v.id,bs.every(b=>ix.byClaim.get(b.claim).some(x=>x===b)));}
for(const a of assessment.cases)test("heldout "+a.id,close(evaluate(a.operation,a.input),a.expected));
const view=id=>pack.views.find(x=>x.id===id).example;
test("public F+ cents",close(evaluate("cents",view("CENTS-FP")).cents,701.9550008653874));
const cf=view("CENTS-FN");
test("public F- equal Hz difference unequal ratio",!close(evaluate("cents",cf).cents,evaluate("cents",{reference:cf.comparisonReference,observed:cf.comparisonObserved}).cents));
const cr=view("CENTS-RP");
test("public R+ frequency inverse under given reference",close(cr.reference*2**(cr.cents/1200),880));
test("public R- lacks reference",evaluate("cents",view("CENTS-RN")).state==="UNKNOWN");
for(const [id,exp] of [["PITCH-FP",0],["PITCH-FN",-165.00422849992202],["PITCH-RP",-165.00422849992202]]){const r=evaluate("pitch",view(id));test("public "+id,close(r.estimateError,exp)&&close(r.actualGoalError,165.00422849992202));}
test("public PITCH-RN cannot infer true deviation",evaluate("pitch",view("PITCH-RN")).state==="UNKNOWN_REFERENCE");
test("public WINDOW-FP",close(evaluate("window",view("WINDOW-FP")),{state:"VALUE",seconds:0.01,gridHz:50,bins:481}));
const wa=evaluate("window",view("WINDOW-FN")),wb=evaluate("window",{...view("WINDOW-FN"),nfft:view("WINDOW-FN").previousNfft});
test("public WINDOW-FN no extra observation",wa.seconds===wb.seconds&&wa.gridHz===25&&wb.gridHz===50);
test("public WINDOW-RP partial reverse",eq(evaluate("reverseGrid",view("WINDOW-RP")),{state:"PARTIAL",nfft:960,win:null}));
test("public WINDOW-RN insufficient reverse",evaluate("reverseGrid",view("WINDOW-RN")).state==="UNKNOWN");

test("invalid frequency",evaluate("cents",{reference:0,observed:200}).state==="UNKNOWN");
const qualified=pack.views.find(x=>x.id==="PITCH-FP").example;
test("wrong event",evaluate("pitch",{...qualified,referenceIdentity:"B"}).state==="UNKNOWN_WINDOW");
test("wrong independent clock",evaluate("pitch",{...qualified,referenceClock:"other"}).state==="UNKNOWN_WINDOW");
test("wrong estimate window",evaluate("pitch",{...qualified,estimateWindow:[1,501]}).state==="UNKNOWN_WINDOW");
test("wrong reference kind",evaluate("pitch",{...qualified,referenceKind:"ESTIMATOR"}).state==="UNKNOWN_WINDOW");
test("missing musical target",eq(evaluate("pitch",{...qualified,target:null}),{state:"UNKNOWN_TARGET",estimateError:0,actualGoalError:null,estimatedGoalError:null}));
test("same observation different grid",evaluate("window",{fs:48000,win:480,nfft:960,realInput:true,oneSided:true}).seconds===evaluate("window",{fs:48000,win:480,nfft:1920,realInput:true,oneSided:true}).seconds);
test("complex or unqualified one-sided bins",evaluate("window",{fs:48000,win:480,nfft:960,realInput:false,oneSided:true}).state==="UNKNOWN");
test("invalid fft length",evaluate("window",{fs:48000,win:960,nfft:480,realInput:true,oneSided:true}).state==="UNKNOWN");
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
test("unmatched query explicitly unknown",retrieve(pack,sources,"CL-NOT-FOUND@1").dependencyState==="UNKNOWN_NO_MATCH");
const publicTree=fs.mkdtempSync(path.join(os.tmpdir(),"audio-kg-public-query-"));
try{
 const paths=[dir+"pack.json",dir+"sources.json",dir+"semantic-profile.json",dir+"qualification-manifest.json",dir+"knowledge-pilot.mjs",dir+"retrieve.mjs",dir+"workflow-pilot.mjs",dir+"witness-pilot.mjs",...["g04-r8-xc01-independent-evidence.md","g04-r8-seven-role-evidence.md","g04-r9-cq25-full-evidence-trace.md"].map(x=>cal+x),...sources.map(x=>x.registration.file),...pack.evidence.flatMap(x=>[x.anchor.file,...(x.caseAnchor?[x.caseAnchor.file]:[])]),...pack.migrations.map(x=>x.anchor.file)];
 for(const f of new Set(paths)){const dest=path.join(publicTree,f);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(f,dest);}
 test("public-only tree excludes input/rubric",!fs.existsSync(path.join(publicTree,dir+"assessment.json"))&&!fs.existsSync(path.join(publicTree,dir+"assessment-input.json")));
 for(const q of ["CQ01","CQ06","CQ07","CQ21","CQ25","K05.07.01.05","CL-PITCH@1","CL-WINDOW@1",assessment.cases[0].id]){
  const proc=spawnSync(process.execPath,[dir+"retrieve.mjs",q],{cwd:publicTree,encoding:"utf8",timeout:10000});
  const result=proc.status===0?JSON.parse(proc.stdout):null;
  test("public process "+q,proc.status===0&&eq(result.knowledge,retrieve(pack,sources,q))&&!proc.stdout.includes(assessment.marker)&&assessment.cases.every(x=>!proc.stdout.includes(x.id)&&!proc.stdout.includes(JSON.stringify(x.expected))));
  if(q==="CQ21"||q==="CQ25")test("public typed workflow "+q,result.workflow?.state==="STATIC_CANDIDATE_ONLY"&&result.workflow.release===false&&result.workflow.trace.primary.length===7&&result.workflow.graph.records.length===21&&result.workflow.graph.edges.length===42&&result.workflow.affectedIfCandidateChanges.includes("E-RECEIPT@2"));
  else test("no unrelated workflow "+q,result.workflow===null);
  if(q==="CQ21"||q==="CQ25"){const {witness,routeData,support}=loadActualWitness();const again=runWorkflowPilot(witness,routeData,support,{graph:result.workflow.graph,verdict:result.workflow.trace.result});test("actual public exported graph requery "+q,eq(again.replay,result.workflow.trace)&&again.graphDigest===result.workflow.graphDigest&&result.workflow.graphKind==="COMPLETE_SYNTHETIC_REPLAY_ENVELOPE");}
 }

 // Exercise file-level pinning rather than just testing in-memory mutated records.
 for(const file of ["qualification-manifest.json","semantic-profile.json"]){
  const target=path.join(publicTree,dir+file),original=fs.readFileSync(target,"utf8");
  try{fs.writeFileSync(target,original+" ");const failed=spawnSync(process.execPath,[dir+"retrieve.mjs","CQ01"],{cwd:publicTree,encoding:"utf8",timeout:10000});test("reject tampered authority file "+file,failed.status!==0&&failed.stdout.trim()==="");}finally{fs.writeFileSync(target,original);}
 }
}finally{fs.rmSync(publicTree,{recursive:true,force:true});}

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
// Actual independent G06 counterexamples and additional coordinated mutations.
reject("RV01 fabricated locator version and author",(p,s)=>Object.assign(s.find(x=>x.id==="S022"),{locator:"Nonexistent section 999: frequency subtraction",version:"FABRICATED-2099",author:"FABRICATED"}));
reject("RV01 substring URI",(p,s)=>s.find(x=>x.id==="S022").uri="https://newt.phys.unsw.edu.au");
reject("RV01 false statement same revision",p=>p.claims.find(x=>x.id==="CL-CENTS").statement="音分等于两个频率的Hz差，不需要参考音。");
reject("RV01 false context same revision",p=>p.contexts.find(x=>x.id==="CTX-CENTS").condition="负频率或零频率同样适用，无需参考频率。");
reject("RV01 false case same revision",p=>p.views.find(x=>x.id==="CENTS-FP").explanation="正比频率升高也不改变音分。");
reject("RV01 coordinated statement condition case",p=>{p.claims[0].statement="Hz subtraction";p.contexts[0].condition="Any frequency";p.views[0].explanation="Subtraction";});
reject("RV01 unqualified new claim revision",p=>{p.claims[0].revision=2;for(const e of p.edges){if(e.from==="CL-CENTS@1")e.from="CL-CENTS@2";if(e.to==="CL-CENTS@1")e.to="CL-CENTS@2";}for(const b of p.bindings)if(b.claim==="CL-CENTS@1")b.claim="CL-CENTS@2";});
reject("RV01 same-revision evidence scope drift",p=>p.evidence[0].limits="All tuning systems proven");
reject("RV01 stale source revision", (p,s)=>{s.find(x=>x.id==="S413").revision=1;for(const e of p.evidence)e.sources=e.sources.map(x=>x==="S413@2"?"S413@1":x);});
reject("RV01 fabricate date while locator unchanged",(p,s)=>s.find(x=>x.id==="S022").publicationDate="2099");
reject("RV01 changed case input same revision",p=>p.views[0].example.observed=0);
reject("RV02 both H edges and all support bindings deleted",p=>{p.edges=p.edges.filter(e=>!["REQ-MATH","REQ-WINDOW"].includes(e.id));p.bindings=p.bindings.filter(b=>b.role==="PRIMARY_TARGET");});
reject("RV02 window H edge and support bindings deleted",p=>{p.edges=p.edges.filter(e=>e.id!=="REQ-WINDOW");p.bindings=p.bindings.filter(b=>!(b.role==="REQUIRES"&&b.claim==="CL-WINDOW@1"));});
reject("RV02 one view missing support",p=>p.bindings=p.bindings.filter(b=>b.id!=="B-PITCH-RN-WINDOW"));
reject("RV02 downgrade H to O",p=>{p.edges.find(e=>e.id==="REQ-WINDOW").type="references";p.bindings=p.bindings.filter(b=>!(b.role==="REQUIRES"&&b.claim==="CL-WINDOW@1"));});
reject("RV02 stale provider ref",p=>p.edges.find(e=>e.id==="REQ-WINDOW").to="CL-WINDOW@2");
reject("RV02 dependency condition mismatch",p=>p.edges.find(e=>e.id==="REQ-MATH").condition="CTX-CENTS@1");
reject("RV02 binding condition mismatch",p=>p.bindings.find(b=>b.id==="B-PITCH-FP-WINDOW").condition="CTX-WINDOW@1");
for(const q of ["K05.07.01.05","CL-PITCH@1","CQ06","CQ25"]){
 const p=retrieve(pack,sources,q),x=p.claims.find(c=>c.id==="CL-PITCH@1");
 test("RV02 precise H closure "+q,x&&["CL-CENTS@1","CL-WINDOW@1"].every(id=>p.claims.some(c=>c.id===id&&c.status==="CANDIDATE")&&x.relations.some(e=>e.to===id&&e.type==="requires"&&e.required===true&&e.condition.id==="CTX-PITCH@1"&&e.targetContext.id===p.claims.find(c=>c.id===id).contextRef&&e.logicalConverse===false&&e.qualification.limits)));
 test("RV02 scoped support evidence "+q,p.claims.every(c=>c.applicability==="CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL"&&c.evidence.every(e=>e.limits&&e.relation.qualification.limits&&e.sources.every(s=>s.qualification.scope&&s.qualification.limits&&s.registration.blob)))&&p.claims.filter(c=>c.id!=="CL-PITCH@1").every(c=>c.cases.filter(v=>v.id.startsWith("PITCH-")).length===6&&c.cases.filter(v=>v.id.startsWith("PITCH-")).every(v=>v.role==="REQUIRES"&&v.condition.id==="CTX-PITCH@1")));
}
const windowOnly=retrieve(pack,sources,"CL-WINDOW@1");
test("RV02 O does not expand closure",eq(windowOnly.claims.map(c=>c.id),["CL-WINDOW@1"])&&windowOnly.claims[0].relations.some(e=>e.id==="REF-PITCH-USE"&&!e.required&&e.logicalConverse===false)&&windowOnly.claims[0].incomingNavigation.some(e=>e.id==="REQ-WINDOW"&&e.direction==="INCOMING_LOOKUP_ONLY"));
const withoutO=clone(pack);withoutO.edges=withoutO.edges.filter(e=>e.id!=="REF-PITCH-USE");
test("RV02 optional navigation removal not mandatory failure",validate(withoutO,sources).map.size===35&&retrieve(withoutO,sources,"CL-WINDOW@1").claims.length===1);
const src=retrieve(pack,sources,"CL-PITCH@1").claims[0].evidence.flatMap(e=>e.sources).find(s=>s.id==="S413@2");
test("RV01 alternate PDF provenance distinct from original publisher",src.author==="Patel et al."&&src.publicationDate==="2018"&&src.version==="UNKNOWN"&&src.qualification.accessedUri!==src.uri&&src.qualification.locatorKind==="L1_ALTERNATE_PDF_LOCATOR");
test("RV01 positive qualified S022",retrieve(pack,sources,"CL-CENTS@1").claims[0].evidence[0].sources[0].uri==="https://newt.phys.unsw.edu.au/jw/notes.html");
// G06-R2-RV04: reproduce actual independent mutation, plus adjacent result aliases.
const beforeInput=clone({pack,sources}), first=retrieve(pack,sources,"CL-CENTS@1"), pristine=clone(first);
first.claims[0].evidence[0].sources[0].qualification.scope="FORGED_SCOPE";
first.claims[0].evidence[0].relation.qualification.limits="FORGED_EDGE";
first.claims[0].evidence[0].anchor.row="FORGED_ROW";
first.claims[0].cases[0].example.reference=-1;
first.claims[0].cases[0].condition.condition="FORGED_CONDITION";
test("RV04 detached prior result cannot mutate next source/edge/anchor/case projection",eq(retrieve(pack,sources,"CL-CENTS@1"),pristine));
test("RV04 caller pack and sources preserved",eq({pack,sources},beforeInput));
let profileRejected=false;
try{profile.knowledge.relationshipTypes.requires.meaning="FORGED_PROFILE";}catch{profileRejected=true;}
test("RV04 exported type profile deeply frozen",profileRejected&&Object.isFrozen(profile.knowledge.relationshipTypes.requires)&&profile.knowledge.relationshipTypes.requires.meaning!=="FORGED_PROFILE");
const pitchBefore=retrieve(pack,sources,"CL-PITCH@1"),pitchNext=clone(pitchBefore);
pitchBefore.claims[0].relations.find(r=>r.type==="requires").qualification.scope="FORGED_DEPENDENCY";
pitchBefore.claims[0].relations.find(r=>r.type==="requires").targetContext.condition="FORGED_PROVIDER_CONTEXT";
test("RV04 second in-process precise H retrieval immutable",eq(retrieve(pack,sources,"CL-PITCH@1"),pitchNext));
// Re-execute actual frozen G04 witness, not its logged output. Integrate its result as a bounded CQ25 trace.
const {witness,routeData,support}=loadActualWitness();
test("R8a actual replay",witness.old.fixtures.length===70&&witness.old.fixtures.every(x=>x[1]===x[2]));
test("R9 actual replay",witness.trace.checks.length===44&&witness.trace.checks.every(x=>x[1]===true));
const t=witness.trace.positive;
const historic=(name,state)=>witness.old.fixtures.some(x=>x[0]===name&&x[1]===state&&x[2]===state);
test("bounded offline alternative",historic("offline-only positive","OFFLINE_DRAFT_ONLY")&&historic("offline-only with attempted live-listen","STOP")&&witness.old.offline.measurement==="NOT_PERFORMED");
test("bounded revision failure and revalidation",historic("registered revision but old receipt","PENDING_REVALIDATION")&&historic("registered revision but old estimate","PENDING_REVALIDATION")&&historic("new evidence qualified revision","STATIC_CANDIDATE_ONLY"));
test("bounded failure prohibits release",historic("qualified wrong estimate","REVIEW_MEASUREMENT")&&historic("protected cue payload","REJECT_PROTECTION")&&historic("revocation between phases","STOP"));
test("CQ25 seven stages",eq(t.primary,["A01","A02","A03","A04","A05","A06","A07"]));
test("CQ25 support/evidence",eq([...t.support].sort(),["S-A11","S-GV02","S-V06"])&&eq([...t.evidence].sort(),["E-EST","E-OBS","E-RECEIPT"]));
const computed=evaluate("pitch",{reference:t.reference.hz,estimate:t.estimate.hz,target:t.context.target.musicHz,valid:t.reference.valid,identity:t.context.voice,referenceIdentity:t.reference.voice,estimateIdentity:t.estimate.voice,clock:t.context.clock.id,referenceClock:t.reference.clock,estimateClock:t.estimate.clock,window:t.context.window,referenceWindow:t.reference.window,estimateWindow:t.estimate.window,referenceKind:t.reference.source,estimateKind:t.estimate.source});
test("pilot calculation matches actual trace",computed.state==="VALUE"&&close(computed.estimateError,t.result.estimateError)&&close(computed.actualGoalError,t.result.actualGoalError)&&close(computed.estimatedGoalError,t.result.estimatedGoalError)&&t.result.state==="STATIC_CANDIDATE_ONLY");
test("CQ25 actual knowledge route",routeData.find(x=>x.ability==="A05").d4===pack.claims.find(x=>x.id==="CL-PITCH").d4&&retrieve(pack,sources,"CQ25").claims.some(x=>x.d4==="K05.07.01.05"));
const wf=runWorkflowPilot(witness,routeData,support);
for(const [name,v] of wf.tests)test("workflow: "+name,v===true);
console.log(JSON.stringify({workflow:{records:wf.records,edges:wf.edges,checks:wf.tests.length,affected:wf.affected,trace:wf.trace,graphDigest:wf.graphDigest,boundedResolution:wf.boundedResolution,limits:wf.limits},status:"RESEARCH_ONLY",node:process.version,checks:checks.length,passed:checks.filter(x=>x[1]).length,results:checks,records:ix.map.size,bindings:pack.bindings.length,heldout:assessment.cases.length,replayed:{xc:70,r9:44},trace:{state:t.result.state,primary:t.primary,support:t.support,evidence:t.evidence,result:t.result},limits:["no actual LLM/audio/tool/permission","only exercised relationship subset","no production acceptance/DB","no exhaustive migration"]},null,2));
