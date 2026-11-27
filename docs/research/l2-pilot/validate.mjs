import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {read,json,clone,eq,blob,insist,idref,validate,evaluate,retrieve,route,close,dir} from "./knowledge-pilot.mjs";
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
const publicTree=fs.mkdtempSync(path.join(os.tmpdir(),"audio-kg-public-query-"));
try{
 const paths=[dir+"pack.json",dir+"sources.json",dir+"knowledge-pilot.mjs",dir+"retrieve.mjs",dir+"workflow-pilot.mjs",dir+"witness-pilot.mjs",...["g04-r8-xc01-independent-evidence.md","g04-r8-seven-role-evidence.md","g04-r9-cq25-full-evidence-trace.md"].map(x=>cal+x),...sources.map(x=>x.registration.file),...pack.evidence.flatMap(x=>[x.anchor.file,...(x.caseAnchor?[x.caseAnchor.file]:[])]),...pack.migrations.map(x=>x.anchor.file)];
 for(const f of new Set(paths)){const dest=path.join(publicTree,f);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(f,dest);}
 test("public-only tree excludes input/rubric",!fs.existsSync(path.join(publicTree,dir+"assessment.json"))&&!fs.existsSync(path.join(publicTree,dir+"assessment-input.json")));
 for(const q of ["CQ01","CQ06","CQ07","CQ21","CQ25",assessment.cases[0].id]){
  const proc=spawnSync(process.execPath,[dir+"retrieve.mjs",q],{cwd:publicTree,encoding:"utf8",timeout:10000});
  const result=proc.status===0?JSON.parse(proc.stdout):null;
  test("public process "+q,proc.status===0&&eq(result.knowledge,retrieve(pack,sources,q))&&!proc.stdout.includes(assessment.marker)&&assessment.cases.every(x=>!proc.stdout.includes(x.id)&&!proc.stdout.includes(JSON.stringify(x.expected))));
  if(q==="CQ21"||q==="CQ25")test("public typed workflow "+q,result.workflow?.state==="STATIC_CANDIDATE_ONLY"&&result.workflow.release===false&&result.workflow.trace.primary.length===7&&result.workflow.graph.records.length===21&&result.workflow.graph.edges.length===42&&result.workflow.affectedIfCandidateChanges.includes("E-RECEIPT@2"));
  else test("no unrelated workflow "+q,result.workflow===null);
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
// Re-execute actual frozen G04 witness, not its logged output. Integrate its result as a bounded CQ25 trace.
const {witness,routeData,support}=loadActualWitness();
test("R8a actual replay",witness.old.fixtures.length===70&&witness.old.fixtures.every(x=>x[1]===x[2]));
test("R9 actual replay",witness.trace.checks.length===44&&witness.trace.checks.every(x=>x[1]===true));
const t=witness.trace.positive;
test("CQ25 seven stages",eq(t.primary,["A01","A02","A03","A04","A05","A06","A07"]));
test("CQ25 support/evidence",eq([...t.support].sort(),["S-A11","S-GV02","S-V06"])&&eq([...t.evidence].sort(),["E-EST","E-OBS","E-RECEIPT"]));
const computed=evaluate("pitch",{reference:t.reference.hz,estimate:t.estimate.hz,target:t.context.target.musicHz,valid:t.reference.valid,identity:t.context.voice,referenceIdentity:t.reference.voice,estimateIdentity:t.estimate.voice});
test("pilot calculation matches actual trace",computed.state==="VALUE"&&close(computed.estimateError,t.result.estimateError)&&close(computed.actualGoalError,t.result.actualGoalError)&&close(computed.estimatedGoalError,t.result.estimatedGoalError)&&t.result.state==="STATIC_CANDIDATE_ONLY");
test("CQ25 actual knowledge route",routeData.find(x=>x.ability==="A05").d4===pack.claims.find(x=>x.id==="CL-PITCH").d4&&retrieve(pack,sources,"CQ25").claims.some(x=>x.d4==="K05.07.01.05"));
const wf=runWorkflowPilot(witness,routeData,support);
for(const [name,v] of wf.tests)test("workflow: "+name,v===true);
console.log(JSON.stringify({workflow:{records:wf.records,edges:wf.edges,checks:wf.tests.length,affected:wf.affected,trace:wf.trace,graphDigest:wf.graphDigest,limits:wf.limits},status:"RESEARCH_ONLY",node:process.version,checks:checks.length,passed:checks.filter(x=>x[1]).length,results:checks,records:ix.map.size,bindings:pack.bindings.length,heldout:assessment.cases.length,replayed:{xc:70,r9:44},trace:{state:t.result.state,primary:t.primary,support:t.support,evidence:t.evidence,result:t.result},limits:["no actual LLM/audio/tool/permission","only exercised relationship subset","no production acceptance/DB","no exhaustive migration"]},null,2));
