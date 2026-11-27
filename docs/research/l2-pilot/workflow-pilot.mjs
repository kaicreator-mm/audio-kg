// Typed state/trace projection of the actual frozen synthetic XC01 witness.
// Not a workflow engine, authorization service, or accepted knowledge.
import crypto from "node:crypto";
const clone=x=>structuredClone(x);
const canon=x=>x===null?"null":Array.isArray(x)?"["+x.map(canon).join(",")+"]":typeof x==="object"?"{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canon(x[k])).join(",")+"}":JSON.stringify(x);
const eq=(a,b)=>a!==undefined&&b!==undefined&&canon(a)===canon(b);
const hash=x=>crypto.createHash("sha256").update(canon(x)).digest("hex");
const check=(x,m)=>{if(!x)throw Error(m)};
import {profile} from "./knowledge-pilot.mjs";
const kinds=Object.fromEntries(Object.entries(profile.workflow.relationships).map(([k,v])=>[k,[v.from,v.to]]));
export function runWorkflowPilot(w,route,support,replayInput=null){
 const {registry,trace,history}=w;
 const actual=trace.positive.result, context=trace.positive.context;
 const records=[],edges=[],ref=id=>id.startsWith("A")?id+"@1":id==="E-RECEIPT"?id+"@2":id==="E-EST"?id+"@2":id+"@1";
 function add(id,type,payload){const rec={ref:id,type,payload:clone(payload),classification:"SYNTHETIC_RESEARCH",digest:hash(payload)};records.push(rec);return rec;}
 function edge(type,from,to){edges.push({id:type+":"+from+":"+to,type,from,to,condition:"CTX@1"});}
 // Exact history from an output-only adapter, not a hand-transcribed expected result.
 for(const n of history){
  const a=route.find(x=>x.ability===n.id),s=support.find(x=>x.id===n.id);
  const type=a?"Step":s?"Constraint":n.id==="E-RECEIPT"?"Evaluation":"Observation";
  add(ref(n.id),type,{id:n.id,output:n.output,...(a?{knowledge:a}:s?{knowledge:s}:{})});
 }
 add("CTX@1","Context",context);
 add("C@2","Artifact",{candidate:actual.candidate,registeredRevision:registry.registeredRevision});
 add("ORIGINAL@1","Artifact",registry.original);
 add("GRANT@1","Grant",{grant:registry.grant,realSubject:"UNKNOWN",actualAuthority:false});
 const a03=history.find(x=>x.id==="A03").output;
 add("HOST@1","ToolVersion",{host:a03.host,actualRun:false,qualification:"STIPULATED"});
 add("MODEL@1","ModelVersion",{model:a03.model,actualRun:false,qualification:"STIPULATED"});
 add("EDITABLE@1","Artifact",history.find(x=>x.id==="A06").output);
 add("RESULT@1","Evaluation",actual);
 const map=new Map(records.map(n=>[n.ref,n]));
 for(const n of history){
  const to=ref(n.id),t=map.get(to).type;
  for(const d of n.inputs){
   const from=ref(d.id),s=map.get(from).type;
   check(eq(d.artifact,map.get(from).payload.output),"original actual edge content mismatch");
   if(t==="Step"&&s==="Step")edge("prerequisite_for",from,to);
   else if(t==="Step"&&s==="Constraint")edge("requires",to,from);
   else if(t==="Step")edge("consumes",to,from);
   else edge("validates_against",to,from);
  }
 }
 for(const id of ["A02","A03","A04","A07"])edge("governed_by",ref(id),"GRANT@1");
 edge("qualifies_tool","A03@1","HOST@1");edge("qualifies_model","A03@1","MODEL@1");
 edge("consumes","A04@1","ORIGINAL@1");edge("consumes","A04@1","C@2");
 edge("consumes","A07@1","C@2");edge("validates_against","E-RECEIPT@2","C@2");
 for(const id of ["A05@1","E-OBS@1","E-EST@2","E-RECEIPT@2","RESULT@1"])edge("applies_under",id,"CTX@1");
 edge("produces","A05@1","RESULT@1");edge("produces","A06@1","EDITABLE@1");
 edge("consumes","A07@1","RESULT@1");edge("consumes","A07@1","EDITABLE@1");
 const trusted={format:"typed-workflow-projection/1",records,edges,active:"C@2",permissionEpoch:registry.grant.epoch,permissionStatus:registry.grant.status,release:false};
 // In a bounded witness the independent examiner registry is the authority.
 // Hashes alone do not establish validity: exact actual outputs/conditions and required edges are checked.
 const trustedNodes=new Map(records.map(n=>[n.ref,n])),trustedEdges=new Map(edges.map(e=>[e.id,e]));
 function indexes(g){
  check(g.format===trusted.format&&g.release===false&&Array.isArray(g.records)&&Array.isArray(g.edges),"projection shape");
  const ns=new Map(),es=new Map(),needs=new Map(),dependents=new Map();
  for(const n of g.records){
   check(/^[A-Z0-9-]+@\d+$/.test(n.ref)&&!ns.has(n.ref)&&profile.workflow.recordTypes.includes(n.type)&&n.classification==="SYNTHETIC_RESEARCH"&&n.digest===hash(n.payload)&&eq(n,trustedNodes.get(n.ref)),"record/immutable payload "+n.ref);
   ns.set(n.ref,n);
  }
  check(ns.size===trustedNodes.size,"missing required record");
  function dep(consumer,provider){if(!needs.has(consumer))needs.set(consumer,[]);if(!dependents.has(provider))dependents.set(provider,[]);needs.get(consumer).push(provider);dependents.get(provider).push(consumer);}
  for(const e of g.edges){
   const k=kinds[e.type],a=ns.get(e.from),b=ns.get(e.to);
   check(k&&a&&b&&k[0].includes(a.type)&&k[1].includes(b.type)&&e.from!==e.to&&e.condition==="CTX@1"&&!es.has(e.id)&&eq(e,trustedEdges.get(e.id)),"typed/required edge "+e.id);
   es.set(e.id,e);
   if(profile.workflow.relationships[e.type].dependency==="to_depends_on_from")dep(e.to,e.from);else dep(e.from,e.to);
  }
  check(es.size===trustedEdges.size,"missing required edge");
  const visited=new Set(),active=new Set();
  function cycle(n){check(!active.has(n),"dependency cycle");if(visited.has(n))return;active.add(n);for(const d of needs.get(n)||[])cycle(d);active.delete(n);visited.add(n);}
  for(const n of ns.keys())cycle(n);
  return {ns,needs,dependents};
 }
 function traceQuery(g,verdict){
  if(g.permissionStatus==="revoked")return {state:"STOP",release:false};
  if(g.permissionStatus!==trusted.permissionStatus||g.permissionEpoch!==trusted.permissionEpoch)return {state:"UNKNOWN",release:false};
  if(g.active!=="C@2")return {state:"PENDING_REVALIDATION",release:false};
  if(!eq(verdict,actual))return {state:"UNKNOWN",release:false};
  try{
   const ix=indexes(g),seen=new Set(),order=[];
   function walk(n){if(seen.has(n))return;seen.add(n);for(const d of ix.needs.get(n)||[])walk(d);order.push(n);}
   walk("A07@1");
   const primary=order.filter(x=>ix.ns.get(x).type==="Step").map(x=>x.split("@")[0]);
   const supports=order.filter(x=>ix.ns.get(x).type==="Constraint").map(x=>x.split("@")[0]).sort();
   const evidence=order.filter(x=>x.startsWith("E-")).map(x=>x.split("@")[0]).sort();
   check(eq(primary,["A01","A02","A03","A04","A05","A06","A07"])&&eq(supports,["S-A11","S-GV02","S-V06"])&&eq(evidence,["E-EST","E-OBS","E-RECEIPT"]),"complete typed path");
   const report=ix.ns.get("E-RECEIPT@2").payload.output;
   check(eq(report,registry.receipt)&&eq(ix.ns.get("RESULT@1").payload,verdict)&&eq(ix.ns.get("C@2").payload.registeredRevision,registry.registeredRevision),"actual report/result/revision");
   return {state:"STATIC_CANDIDATE_ONLY",primary,supports,evidence,result:clone(verdict),refs:order,release:false};
  }catch{return {state:"UNKNOWN",release:false};}
 }
 function affected(g,changed){
  const ix=indexes(g);check(ix.ns.has(changed),"unknown changed identity");
  const seen=new Set(),q=[changed];while(q.length){const v=q.shift();for(const n of ix.dependents.get(v)||[])if(!seen.has(n)){seen.add(n);q.push(n);}}
  return [...seen].sort();
 }
 const graph=JSON.parse(JSON.stringify(trusted)),tests=[],test=(name,v)=>{check(v,name);tests.push([name,true]);};
 const v=traceQuery(graph,actual);
 const projection=clone(graph); // Full synthetic replay envelope; digest refers to exactly this object.
 test("complete exported graph roundtrip",eq(traceQuery(JSON.parse(JSON.stringify(projection)),actual),v)&&hash(projection)===hash(graph));
 test("export without permission epoch refuses",traceQuery({...projection,permissionEpoch:undefined},actual).state==="UNKNOWN");
 test("export without permission status refuses",traceQuery({...projection,permissionStatus:undefined},actual).state==="UNKNOWN");
 test("revocation precedes stale revision",traceQuery({...projection,active:"C@3",permissionStatus:"revoked"},actual).state==="STOP");
 test("typed graph roundtrip full route",v.state==="STATIC_CANDIDATE_ONLY"&&v.release===false);
 test("primary and support reverse discovery",v.refs.includes("GRANT@1")&&v.refs.includes("HOST@1")&&v.refs.includes("MODEL@1")&&v.refs.includes("EDITABLE@1")&&v.refs.includes("RESULT@1"));
 const stale=affected(graph,"C@2");
 test("CQ21 actual dependent invalidation",["E-RECEIPT@2","A04@1","A05@1","A06@1","A07@1","RESULT@1","EDITABLE@1"].every(x=>stale.includes(x))&&!stale.includes("A01@1")&&!stale.includes("ORIGINAL@1"));
 test("old receipt cannot qualify new candidate",traceQuery({...graph,active:"C@3"},actual).state==="PENDING_REVALIDATION");
 test("grant revoked stops",traceQuery({...graph,permissionStatus:"revoked"},actual).state==="STOP");
 test("grant epoch not role authority",traceQuery({...graph,permissionEpoch:"FORGED"},actual).state==="UNKNOWN");
 test("unknown authority not allowed",traceQuery({...graph,permissionStatus:"unknown"},actual).state==="UNKNOWN");
 test("wrong complete result",traceQuery(graph,{...actual,actualGoalError:0}).state==="UNKNOWN");
 const bad=clone(actual);delete bad.referenceId;test("partial result",traceQuery(graph,bad).state==="UNKNOWN");
 const reject=(name,mutate)=>{let g=clone(graph);mutate(g);test(name,traceQuery(g,actual).state==="UNKNOWN");};
 reject("missing observation node",g=>g.records=g.records.filter(n=>n.ref!=="E-OBS@1"));
 reject("missing receipt dependency",g=>g.edges=g.edges.filter(e=>e.id!=="validates_against:E-RECEIPT@2:C@2"));
 reject("missing per-event grant",g=>g.edges=g.edges.filter(e=>e.id!=="governed_by:A02@1:GRANT@1"));
 reject("role as grant",g=>{const n=g.records.find(n=>n.ref==="GRANT@1");n.type="Constraint";});
 reject("forged observation with recalculated digest",g=>{const n=g.records.find(n=>n.ref==="E-OBS@1");n.payload.output.hz=200;n.digest=hash(n.payload);});
 reject("forged candidate with recalculated digest",g=>{const n=g.records.find(n=>n.ref==="C@2");n.payload.registeredRevision.extra="forged";n.digest=hash(n.payload);});
 reject("wrong version edge",g=>g.edges.find(e=>e.id==="consumes:A07@1:C@2").to="C@3");
 reject("wrong relation direction",g=>{const e=g.edges.find(e=>e.type==="prerequisite_for");[e.from,e.to]=[e.to,e.from];});
 reject("duplicate typed edge",g=>g.edges.push(clone(g.edges[0])));
 reject("extra unregistered authority",g=>g.records.push({ref:"GRANT@2",type:"Grant",classification:"SYNTHETIC_RESEARCH",payload:{realSubject:"APPROVED"},digest:hash({realSubject:"APPROVED"})}));
 reject("forged support case",g=>{const n=g.records.find(n=>n.ref==="S-GV02@1");n.payload.knowledge.caseId="FAKE";n.digest=hash(n.payload);});
 return {tests,records:graph.records.length,edges:graph.edges.length,affected:stale,trace:v,projection,graphDigest:hash(projection),replay:replayInput===null?null:traceQuery(replayInput.graph,replayInput.verdict),limits:"fixed actual witness projection; not general runtime or actual authorization"};
}
