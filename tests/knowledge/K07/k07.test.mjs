import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {openCandidateReader,gitBlob} from "../../../tools/validate-knowledge.mjs";

const root=process.cwd(), checks=[];
const test=(name,ok)=>{if(!ok)throw Error(name);checks.push([name,true])};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const near=(a,b,e=1e-8)=>Math.abs(a-b)<e;
const ref=x=>x.id+"@"+x.revision;
const unique=xs=>new Set(xs).size===xs.length;
const read=(r,f)=>JSON.parse(fs.readFileSync(path.join(r,f),"utf8"));
const pin=(f,b)=>{test("pinned input "+f,gitBlob(fs.readFileSync(f))===b);return read(root,f)};
const ctrl=pin("knowledge/K07/controller-input.json","773e64ff07c864a7439cc523c8c81c502fc2c680");
const roles=pin("queries/K07/capability-index.json","a70feff83c106658e0b955bc09ccc6c37e6fc93a");
const index=pin("queries/K07/discovery-index.json","a6413f5ac05f96e3ad88b317d2edd0354b24352b");
const legacy=pin("queries/K07/legacy-routes.json","bf2958b062bce6f1d366cddadb11597a6c83a259");
const splits=pin("queries/K07/split-routes.json","ab8217d86f3ec7a3161397968e49f9ed2dc76e27");
const sourceProv=pin("sources/K07/provenance.json","feb6162fc998c63fba655547b6fbc175f0aebaa7");
const domain=pin("knowledge/K07/domain-workflows.json","20244147f519a1e8b19e4ebe1d3f85fd0ab61232");
const e=ctrl.entries[0],pack=read(root,e.pack),manifest=read(root,e.manifest);
const reader=openCandidateReader(root,ctrl.entries,{allowFixture:false,priorRegistry:null}),summary=reader.summary();
const records=new Map(pack.records.map(r=>[ref(r),r])),byClaim=new Map(pack.records.filter(r=>r.type==="Claim").map(r=>[ref(r),r]));
const claimsByD4=new Map([...byClaim].map(([id,r])=>[r.d4,id]));
const rowFor=new Map(index.rows.map(r=>[r.claim,r]));
const anchorOk=a=>a.commit==="280d3be584ab717211b9b99925ac07705f2ab64c"&&gitBlob(fs.readFileSync(a.file))===a.blob&&fs.readFileSync(a.file,"utf8").split("\n")[a.line-1]===a.row;
const projection=read(root,"ontology/l1-anchor-tree.json");
test("actual first MODULE, all row identities accounted",same(summary.counts,{records:441,claims:51,edges:161,bindings:236,inventory:51})&&summary.packs.length===1&&summary.packs[0].coverageMode==="MODULE"&&summary.acceptedClaims===0&&summary.unresolved.length===0&&ctrl.priorRegistry===null&&ctrl.allowFixture===false);
test("unique current D4 and candidate identity",claimsByD4.size===51&&unique(index.rows.map(r=>r.line))&&index.rows.every(r=>claimsByD4.get(r.d4)===r.claim));
const actualRows=fs.readFileSync(index.frozenDiscovery,"utf8").split("\n").flatMap((s,i)=>/^\| K07\.\d\d\.\d\d\.\d\d \|/.test(s)?[{line:i+1,d4:s.split("|")[1].trim()}]:[]);
test("frozen 51 discovery rows exactly equal module inventory",gitBlob(fs.readFileSync(index.frozenDiscovery))===index.discoveryBlob&&same(actualRows,pack.inventory.map(r=>({line:r.line,d4:r.d4}))));
const hEdges=pack.edges.filter(x=>x.type==="requires"), oEdges=pack.edges.filter(x=>x.type==="references");
test("actual 8 H obligations and separate O navigation",hEdges.length===8&&manifest.obligations.length===8&&oEdges.length===51&&hEdges.every(h=>manifest.obligations.some(o=>o.edge===h.id&&o.consumer===h.from&&o.provider===h.to)));
for(const row of index.rows){
 const r=reader.retrieve(row.d4),id=row.claim,c=r.claims.find(x=>x.ref===id),own=pack.edges.filter(x=>x.type==="requires"&&x.from===id);
 const expected=new Set([id]);const visit=i=>{for(const h of hEdges.filter(x=>x.from===i)){if(expected.has(h.to))continue;expected.add(h.to);visit(h.to)}};visit(id);
 test(row.case+" exact D4/direct root and bounded H closure",same(r.rootIds,[id])&&r.acceptedClaims===0&&r.claims.length===expected.size&&r.claims.every(x=>expected.has(x.ref)&&x.status==="CANDIDATE"&&x.applicability==="CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL")&&c.context.condition.length>12&&c.limits.length>12&&c.statement.length>25&&c.evidence.every(v=>anchorOk(v.anchor)&&projection.paths[v.anchor.file]===v.anchor.blob&&v.sources.every(s=>anchorOk(s.anchor)&&s.qualification.scope&&s.qualification.limits&&s.rights==="UNKNOWN_NO_IMPORT"))&&c.relations.filter(x=>x.type==="requires").every(x=>x.required&&x.targetContext.ref!==x.condition.ref&&x.logicalConverse===false));
 const primary=c.cases.filter(x=>x.binding.role==="PRIMARY_TARGET");
 test(row.case+" four distinct view directions/polarities and single inverse binding",primary.length===4&&new Set(primary.map(x=>x.view.direction+"/"+x.view.polarity)).size===4&&primary.every(x=>{
  const v=x.view,back=reader.caseToClaims(ref(v));
  return v.question&&v.example.frozenCase===row.case&&v.example.scenario&&v.example.viewSpecificWitness&&v.evidenceKind==="SYNTHETIC_EXPECTED_NOT_OBSERVED"&&v.example.observationStatus===v.evidenceKind&&back.filter(b=>b.role==="PRIMARY_TARGET").length===1&&back.find(b=>b.role==="PRIMARY_TARGET").claim===id&&back.length===1+own.length&&back.every(b=>r.claims.find(z=>z.ref===b.claim).cases.some(y=>y.binding.id===b.id));
 }));
 const expectedSources=row.sourceIds.filter(s=>!row.withheldSourceIds.includes(s)).map(s=>s+"@1");
 test(row.case+" actual source subset, direct/support CQ preserved",same(c.evidence[0].sources.map(s=>ref(s)),expectedSources)&&same([...c.cq].sort(),[...new Set(row.directCQ)].sort())&&row.evidenceAnchor.row.includes(row.d4)&&anchorOk(row.evidenceAnchor));
}
for(let i=1;i<=26;i++){
 const q="CQ"+String(i).padStart(2,"0"),expected=index.rows.filter(x=>x.directCQ.includes(q)).map(x=>x.claim),supports=index.rows.filter(x=>x.supportCQ.includes(q)).map(x=>x.claim),result=reader.retrieve(q);
 test(q+" direct roots only; explicit S navigation index",same(result.rootIds,expected)&&supports.every(id=>byClaim.has(id))&&result.claims.filter(c=>c.selection==="QUERY_ROOT").every(c=>expected.includes(c.ref))&&result.acceptedClaims===0);
}
test("CQ13/CQ25 support-only no false direct root",reader.retrieve("CQ13").rootIds.length===0&&reader.retrieve("CQ25").rootIds.length===0&&index.rows.every(r=>r.supportCQ.includes("CQ13")&&r.supportCQ.includes("CQ25")));
test("CQ18 culture absent not inferred from physics",reader.retrieve("CQ18").dependencyState==="UNKNOWN_NO_MATCH");
const allSources=pack.records.filter(x=>x.type==="Source");
test("33 direct sources plus 2 preserved withheld; no qualification promotion",allSources.length===33&&sourceProv.sources.length===35&&sourceProv.sources.filter(x=>x.formalUse==="NOT_DIRECT_SUPPORT").map(x=>x.sourceId).join(",")==="S459,S465"&&!allSources.some(x=>["S459","S465"].includes(x.id))&&allSources.find(x=>x.id==="S450").grade==="REGISTERED_LIMITED"&&allSources.filter(x=>["S447","S453","S460","S462"].includes(x.id)).every(x=>x.grade==="ABSTRACT_READ")&&sourceProv.sources.every(p=>anchorOk(p.anchor)&&projection.paths[p.anchor.file]===p.anchor.blob));
test("same NIST guide anchors two locators not independent sources",sourceProv.sources.find(x=>x.sourceId==="S452").allRegisteredLinks.length===2&&manifest.sourceQualifications.find(x=>x.source==="S452@1").scope.includes("§2/§5"));
test("role matrix exact 56 / P27 S14 C15",gitBlob(fs.readFileSync(roles.frozenMatrix))===roles.matrixBlob&&roles.roles.length===56&&unique(roles.roles.map(x=>x.id))&&same(["P","S","C"].map(k=>roles.roles.filter(r=>r.role===k).length),[27,14,15]));
for(const role of roles.roles){
 const [d2,a]=role.id.split("/"),c=role.anchor.row.split("|").slice(1,-1).map(s=>s.trim()),allowed=new Set([...role.anchor.row.matchAll(/\[(AC\d+)\/K07\./g)].map(m=>m[1]));
 test(role.id+" actual role-conditioned knowledge retrieval and witness",anchorOk(role.anchor)&&projection.paths[role.anchor.file]===role.anchor.blob&&c[0]===d2&&c[1]===a&&c[2]===role.role&&role.scenario.length>8&&role.expected.length>8&&role.reject.length>8&&role.authority==="DOMAIN_KNOWLEDGE_CANDIDATE_ONLY"&&role.claimRefs.every(id=>{
  const r=reader.retrieve(id),cl=r.claims.find(x=>x.ref===id);
  return cl?.d4.startsWith(d2+".")&&allowed.has(rowFor.get(id).case)&&r.acceptedClaims===0&&cl.cases.filter(x=>x.binding.role==="PRIMARY_TARGET").length===4;
 }));
}
test("48 historical routes preserve original predicate and not equivalence",legacy.routes.length===48&&unique(legacy.routes.map(x=>x.d4))&&legacy.routes.every(r=>anchorOk(r.anchor)&&!r.equivalence&&r.claimRefs.every(c=>byClaim.has(c))&&reader.retrieve(r.d4).dependencyState==="UNKNOWN_NO_MATCH")&&legacy.routes.filter(x=>x.status==="NAVIGATION_ONLY").length===24);
test("7 affected split predicates still open, precise local candidates only",splits.routes.length===7&&splits.routes.every(r=>r.status==="SPLIT_OPEN"&&anchorOk(r.anchor)&&r.local.length>0&&r.local.every(t=>t.status==="LOCAL_PREDICATE_CANDIDATE_ONLY"&&t.candidateClaimRefs.every(x=>byClaim.has(x))))&&splits.routes.some(r=>r.oldD4==="K09.07.01.01"&&r.local.some(t=>t.target==="K07.06.04.01"&&t.kind==="NEW")));
const refuse=(name,fn,pattern)=>{let err;try{fn()}catch(e){err=e}test(name,!!err&&pattern.test(err.message))};
const write=(r,f,o)=>{const s=JSON.stringify(o,null,2)+"\n",p=path.join(r,f);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s);return gitBlob(s)};
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"audio-kg-K07-mutate-"));
try{
 const files=new Set(["ontology/knowledge-profile.json","ontology/l1-anchor-tree.json","docs/product/calibration/g05-r1-module-evidence-reconciliation.md",index.frozenDiscovery,e.pack,e.manifest,"knowledge/K07/controller-input.json","tools/validate-knowledge.mjs",...pack.records.filter(r=>r.anchor).map(r=>r.anchor.file)]);
 for(const f of files){const p=path.join(tmp,f);fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(f,p)}
 const cli=spawnSync(process.execPath,["tools/validate-knowledge.mjs","knowledge/K07/controller-input.json","773e64ff07c864a7439cc523c8c81c502fc2c680","K07-CL-AC31@1"],{cwd:tmp,encoding:"utf8",maxBuffer:8e6});
 test("actual isolated K07 CLI with pinned public inputs and no Git or assessment",cli.status===0&&!fs.existsSync(path.join(tmp,".git"))&&same(JSON.parse(cli.stdout).rootIds,["K07-CL-AC31@1"])&&JSON.parse(cli.stdout).claims.some(c=>c.ref==="K07-CL-AC06@1")&&!fs.existsSync(path.join(tmp,"docs/research/l2-pilot/assessment.json")));
 function mutation(name,fn,regex){
  const p=structuredClone(pack),m=structuredClone(manifest);fn(p,m);
  m.packBlob=write(tmp,e.pack,p);const fresh={...e,manifestBlob:write(tmp,e.manifest,m)};
  refuse(name,()=>openCandidateReader(tmp,[fresh]),regex);
 }
 mutation("actual MODULE missing row rejected",(p,m)=>p.inventory.pop(),/incomplete formal inventory/);
 mutation("actual K07 wrong owner rejected",(p,m)=>p.records.find(x=>x.type==="Claim").owner="K01",/record owner/);
 mutation("actual K07 dangling evidence source rejected",(p,m)=>p.records.find(x=>x.type==="Evidence").sources=["S465@1"],/missing or wrong exact ref/);
 mutation("actual K07 required obligation cannot lose edge and binding",(p,m)=>{const h=p.edges.find(x=>x.type==="requires"&&x.from==="K07-CL-AC31@1");p.edges=p.edges.filter(x=>x.id!==h.id);m.edgeQualifications=m.edgeQualifications.filter(x=>x.edge!==h.id);p.bindings=p.bindings.filter(x=>!(x.view.startsWith("K07-V-AC31-")&&x.role==="REQUIRES"))},/required H obligation absent/);
 mutation("actual K07 missing mandatory support view rejected",(p,m)=>p.bindings=p.bindings.filter(x=>x.id!=="K07-B-AC31-FP-H-AC06"),/mandatory supporting view/);
 mutation("actual K07 cannot self-promote ACCEPTED",(p,m)=>p.records.find(x=>x.type==="Claim").status="ACCEPTED",/claim scope\/status/);
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
const snapshot=reader.retrieve("K07-CL-AC31@1");const external=reader.retrieve("K07-CL-AC31@1");
external.claims[0].evidence[0].sources[0].qualification.scope="FORGED";external.claims[0].cases[0].view.example.scenario="FORGED";
test("actual module repeated query detached",same(reader.retrieve("K07-CL-AC31@1"),snapshot));
test("O optional not required in actual query",reader.retrieve("K07-CL-AC12@1").claims.length===1&&reader.retrieve("K07-CL-AC12@1").claims[0].relations.some(x=>x.type==="references"&&x.to==="K07-CL-AC36@1"&&!x.required&&!x.logicalConverse));
test("H inverse only navigation from provider",reader.retrieve("K07-CL-AC06@1").claims.length===1&&reader.retrieve("K07-CL-AC06@1").claims[0].incomingNavigation.some(x=>x.from==="K07-CL-AC31@1"&&x.direction==="INCOMING_LOOKUP_ONLY"));

// Concrete mathematical/qualitative witness replay, no real audio or device.
const phase=(f,t)=>-360*f*t, mod360=x=>((x%360)+360)%360;
test("AC01/02/27 period and phase family",1/.005===200&&phase(200,.00125)===-90&&near(mod360(phase(200,.00125)),mod360(phase(200,.00625)))&&near(mod360(phase(200,.003)),144));
test("AC03/28 wave speed and particle speed distinct",340/170===2&&near(1500/170,8.823529411764707)&&near(2*Math.PI*170*.001,1.0681415022205298));
const dB=(x)=>20*Math.log10(x);
test("AC04/29 plane wave pressure ratio and standing net flux",near((.04/.02)**2,4)&&near(dB(2),6.020599913279624)&&1+(-1)===0&&2!==0);
const gcd=(a,b)=>b?gcd(b,a%b):a;
test("AC05/30 overtone and mathematical period not perceived pitch",gcd(gcd(200,400),610)===10&&1/10===.1&&610%200!==0&&gcd(400,600)===200&&gcd(400,800)===400&&680/340===2&&510/170===3);
const mag=(a,k,nfft=a.length)=>{let re=0,im=0;for(let n=0;n<a.length;n++){re+=a[n]*Math.cos(-2*Math.PI*k*n/nfft);im+=a[n]*Math.sin(-2*Math.PI*k*n/nfft)}return Math.hypot(re,im)};
test("AC06/31 observation window and FFT grid separation",480/48000===.01&&4800/48000===.1&&48000/480===100&&48000/4800===10&&4800/48===100&&4800/480===10&&near(mag(Array(48).fill(1),10,480),0)&&1/(48/4800)===100);
const pulse=[0,1,0,0,0,0,0,0],shift=[0,0,0,0,1,0,0,0],per=[1,0,-1,0,1,0,-1,0];
test("AC07 same magnitude different time",pulse.indexOf(1)!==shift.indexOf(1)&&pulse.every((_,i)=>near(mag(pulse,i),mag(shift,i))));
const n=8,ens=Array.from({length:2**n},(_,k)=>Array.from({length:n},(_,i)=>(k>>i)&1?1:-1));
const expected=Array.from({length:n},(_,k)=>ens.reduce((s,x)=>s+mag(x,k)**2/n,0)/ens.length);
test("AC08 RV01 exact iid ensemble expected periodogram flat, finite not",expected.every(x=>near(x,1))&&near(mag(ens.at(-1),0)**2/n,8)&&near(mag(ens.at(-1),1)**2/n,0)&&pulse.every((_,i)=>near(mag(pulse,i),1))&&near(mag(per,2),4)&&near(mag(per,6),4));
const scaled=ens.map(x=>x.map((v,i)=>i<4?v:2*v));const variance=i=>scaled.reduce((s,x)=>s+x[i]**2,0)/scaled.length;
const doublePulse=[1,0,0,0,0,1,0,0];
test("AC32 RV01 WSS model distinction, cropped event remains outside window",variance(0)===1&&variance(7)===4&&doublePulse.slice(0,4).reduce((s,x)=>s+x,0)===1&&doublePulse.reduce((s,x)=>s+x,0)===2);
test("AC09/10/33 fixed string and distinct ideal pipe boundary",same([1,2,3].map(n=>n*100/(2*.5)),[100,200,300])&&same([1,2,3].map(n=>(2*n-1)*340/(4*.5)),[170,510,850])&&340/(2*.5)===340&&150!==100);
test("AC11/35 response/known same-phase noise counterexamples",same([1,1,.5].map((x,i)=>x*[1,.5,4][i]),[1,.5,2])&&same([1,1].map((x,i)=>x*[2,1][i]),[2,1])&&same([2,1].map((x,i)=>x+[0,3][i]),[2,4]));
test("AC34 ideal axial modes",same([4,5,2.5].map(l=>340/(2*l)),[42.5,34,68]));
test("AC12/36 ISO scope does not produce a numeric curve",reader.retrieve("K07-CL-AC12@1").claims[0].evidence[0].sources.find(s=>s.sourceId==="S447").grade==="ABSTRACT_READ"&&reader.retrieve("K07-CL-AC36@1").claims[0].limits.includes("不能计算"));
test("AC13/37 same fundamental different harmonic vector and envelope",gcd(200,400)===200&&!same([1,0,0],[1,1,1])&&!same([1,.5],[.5,1]));
const timing=(t,m)=>m[1]<=t[0]?"BEFORE":m[0]>=t[1]?"AFTER":"OVERLAP";
test("AC14 RV02 temporal labels independent of actual masking",same([[100,120],[80,100],[120,140]].map(m=>timing([100,120],m)),["OVERLAP","BEFORE","AFTER"]));
const env=f=>Array.from({length:100},(_,i)=>1+.5*Math.cos(2*Math.PI*f*i/100)),mean=a=>a.reduce((s,x)=>s+x,0)/a.length,meanSq=a=>mean(a.map(x=>x*x));
test("AC38 RV02 matched envelope mean/power different modulation rates",near(mean(env(4)),1)&&near(meanSq(env(4)),1.125)&&near(meanSq(env(13)),1.125)&&mag(env(4).map(v=>v-1),4)>mag(env(4).map(v=>v-1),13)&&mag(env(13).map(v=>v-1),13)>mag(env(13).map(v=>v-1),4));
test("AC15/16/17/39/40/41 hearing scope and urgent stop retained",["AC15","AC16","AC39","AC40"].every(a=>byClaim.get("K07-CL-"+a+"@1").limits.includes("诊断")||byClaim.get("K07-CL-"+a+"@1").limits.includes("个体"))&&["AC17","AC41"].every(a=>byClaim.get("K07-CL-"+a+"@1").statement.includes("立即")));
test("AC18/42 free field distance ratio and multi-path times",near((2/4)**2,.25)&&near(10*Math.log10(.25),-6.020599913279624)&&near(3.4/340,.01)&&near(6.8/340,.02));
test("AC19/43 decay fits not reflection delays",near(60/(10/.2),1.2)&&near(60/(10/.1),.6)&&near(60/(20/.4),1.2)&&near(60/(30/.75),1.5));
test("AC20 coherent equal/opposite and noncoherent mean-square",near(Math.hypot(1+Math.cos(Math.PI),Math.sin(Math.PI)),0)&&near(Math.hypot(1+Math.cos(0),Math.sin(0)),2)&&1**2+1**2===2);
test("AC44 ITD ILD sign and swapped channels",near(10.5-10,.5)&&near(dB(.02/.01),6.020599913279624)&&near(10-10.5,-.5)&&near(dB(.01/.02),-6.020599913279624));
test("AC21/45 referenced dB and energy not arithmetic mean",near(dB(.02/.00002),60)&&near(10*Math.log10(1e-6/1e-12),60)&&near(10*Math.log10((10**6+10**7)/2),67.40362689494245));
const p1=Array.from({length:8},(_,i)=>Math.SQRT2*.02*Math.cos(2*Math.PI*i/8)),p2=Array.from({length:8},(_,i)=>Math.SQRT2*.02*Math.cos(4*Math.PI*i/8));
test("AC22/46 RV04 same unweighted RMS different derived filter outputs",near(.1*.2,.02)&&near(meanSq(p1),meanSq(p2))&&near(dB(Math.sqrt(meanSq(p1.map(x=>x*.5)))/.00002),53.979400086720375)&&near(dB(Math.sqrt(meanSq(p2))/.00002),60));
const reps=[59,60,61],s=Math.sqrt(reps.reduce((r,x)=>r+(x-mean(reps))**2,0)/(reps.length-1));
test("AC23/47 repeat uncertainty and covariance",s===1&&near(Math.sqrt((s/Math.sqrt(3))**2+.8**2),.9865765724632495)&&near(Math.sqrt(1+4+2*.5*1*2),Math.sqrt(7))&&Math.sqrt(5)!==Math.sqrt(7));
test("AC49 relative energy not exposure authorization",near(10*Math.log10(2),3.010299956639812)&&byClaim.get("K07-CL-AC49@1").limits.includes("不提供个人可听时长"));
const reach=(edges,a,b)=>{let q=[a],seen=new Set;while(q.length){const x=q.shift();if(x===b)return true;if(seen.has(x))continue;seen.add(x);for(const [s,t] of edges)if(s===x)q.push(t)}return false};
const topology=[["mic","amp"],["amp","speaker"],["speaker","air"],["air","mic"]];
test("AC51 possible topology not oscillation; abstract stable recurrence",reach(topology,"speaker","mic")&&reach(topology,"mic","speaker")&&!reach(topology.filter(x=>x[0]!=="air"),"speaker","mic")&&same(Array.from({length:4},(_,i)=>.5**i),[1,.5,.25,.125]));

// New logical families are used only in the finite K07 sidecar. Validate actual shapes,
// exact refs and relationship semantics, and enumerate every finite boolean branch.
// This is an offline knowledge witness, not a workflow executor for real operations.
function validateDomain(d){
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
 const map=new Map(d.records.map(r=>[ref(r),r]));
 assert(d.status==="CANDIDATE_PROPOSALS_ONLY"&&map.size===d.records.length&&unique(d.relations.map(r=>r.id)),"domain identity");
 const get=(id,type)=>{const r=map.get(id)||records.get(id);assert(r?.type===type,"wrong domain ref "+id);return r};
 const keys=(r,ks)=>assert(same(Object.keys(r).sort(),ks.sort()),"domain record shape "+r.id);
 const permitted=new Set(["requires","applies_under","prerequisite_for","derived_from","supersedes"]);
 for(const r of d.records){
  assert(r.owner==="K07"&&r.id.startsWith("K07-")&&Number.isInteger(r.revision)&&r.revision>0,"domain owner/revision");
  if(r.type==="Workflow"){
   keys(r,["id","revision","type","owner","d2","task","status","entry","stepRefs","limits"]);
   assert(r.status==="CANDIDATE"&&r.stepRefs.includes(r.entry)&&unique(r.stepRefs)&&r.stepRefs.every(id=>get(id,"Step").workflow===ref(r)),"workflow step ownership");
  }else if(r.type==="Step"){
   keys(r,["id","revision","type","owner","workflow","label","context","inputFields","outputFields","status","failure"]);
   assert(get(r.workflow,"Workflow").stepRefs.includes(ref(r))&&get(r.context,"Context")&&r.status==="CANDIDATE"&&r.inputFields.length&&r.outputFields.length&&unique(r.inputFields),"step contract");
  }else if(r.type==="Transition"){
   keys(r,["id","revision","type","owner","workflow","fromStep","guard","toStep","outcome"]);
   assert(get(r.fromStep,"Step").workflow===r.workflow&&Object.keys(r.guard).length>0&&Object.entries(r.guard).every(([k,v])=>get(r.fromStep,"Step").inputFields.includes(k)&&typeof v==="boolean"),"guard condition");
   if(r.toStep)assert(r.outcome===null&&get(r.toStep,"Step").workflow===r.workflow&&r.toStep!==r.fromStep,"transition owner/self");
   else assert(typeof r.outcome==="string"&&!/^(EXECUTED|ACCEPTED|SAFE|AUTHORIZED|PASS)$/.test(r.outcome),"unsafe terminal");
  }else if(r.type==="Artifact"){
   keys(r,["id","revision","type","owner","kind","status","fields","limits"]);
   assert(r.status==="CANDIDATE"&&r.fields&&r.limits,"artifact scope");
  }else assert(false,"new unsupported type");
 }
 const signature=r=>JSON.stringify([r.type,r.from,r.to,r.condition]);
 assert(unique(d.relations.map(signature)),"duplicate domain relation");
 for(const r of d.relations){
  assert(permitted.has(r.type)&&r.scope&&r.limits&&get(r.condition,"Context"),"domain relation type/qualification");
  if(r.type==="requires"){const s=get(r.from,"Step"),c=get(r.to,"Claim");assert(s.context===r.condition&&c.status==="CANDIDATE","step claim condition");}
  if(r.type==="applies_under")assert(get(r.from,"Step").context===r.to&&r.condition===r.to&&get(r.to,"Context"),"step applicability");
  if(r.type==="prerequisite_for"){const a=get(r.from,"Step"),b=get(r.to,"Step");assert(a.workflow===b.workflow&&r.condition===a.context&&d.records.some(t=>t.type==="Transition"&&t.fromStep===r.from&&t.toStep===r.to),"flow edge not transition");}
  if(r.type==="derived_from"){get(r.from,"Artifact");get(r.to,"Artifact");assert(r.from!==r.to,"self-derived");}
  if(r.type==="supersedes"){const a=get(r.from,"Artifact"),b=get(r.to,"Artifact");assert(a.id===b.id&&a.revision>b.revision,"invalid supersedes");}
 }
 const arts=d.records.filter(r=>r.type==="Artifact"),derived=d.relations.filter(r=>r.type==="derived_from");
 const visiting=new Set(),visited=new Set();
 function visitArtifact(id){assert(!visiting.has(id),"artifact derivation cycle");if(visited.has(id))return;visiting.add(id);for(const r of derived.filter(x=>x.from===id))visitArtifact(r.to);visiting.delete(id);visited.add(id)}
 for(const a of arts)visitArtifact(ref(a));
 for(const a of arts){
  const ds=derived.filter(r=>r.from===ref(a));
  if(a.kind==="SYNTHETIC_PARAMETER_RECORD"){assert(ds.length===0,"original input must not derive from report");continue}
  assert(a.kind==="EDITABLE_SPECTRUM_ANNOTATION"&&ds.length===1&&ds[0].to===a.fields.inputRef,"exact artifact input dependency");
  const inp=get(a.fields.inputRef,"Artifact");assert(inp.kind==="SYNTHETIC_PARAMETER_RECORD"&&a.fields.physicalResolution==="NOT_ESTABLISHED"&&a.fields.nfft>=inp.fields.observedN&&near(a.fields.gridHz,inp.fields.fsHz/a.fields.nfft)&&near(a.fields.windowMs,1000*inp.fields.observedN/inp.fields.fsHz)&&near(a.fields.firstNullHz,inp.fields.fsHz/inp.fields.observedN),"artifact parameter derivation");
 }
 assert(same(Object.keys(d.roleBindings).sort(),roles.roles.filter(r=>r.role==="P"&&(r.id.endsWith("/A02")||r.id.endsWith("/A06"))).map(r=>r.id).sort()),"missing P workflow or editable binding");
 for(const s of d.records.filter(r=>r.type==="Step")){
  const rs=d.relations.filter(r=>r.from===ref(s));
  assert(rs.filter(r=>r.type==="requires").length>0&&rs.filter(r=>r.type==="applies_under").length===1,"missing step condition/claim");
  const ts=d.records.filter(t=>t.type==="Transition"&&t.fromStep===ref(s));
  assert(ts.length>0,"missing transitions");
  for(let i=0;i<2**s.inputFields.length;i++){
   const env=Object.fromEntries(s.inputFields.map((k,j)=>[k,!!((i>>j)&1)]));
   const matches=ts.filter(t=>Object.entries(t.guard).every(([k,v])=>env[k]===v));assert(matches.length===1,"incomplete or ambiguous guards");
  }
  for(const t of ts.filter(t=>t.toStep))assert(rs.some(r=>r.type==="prerequisite_for"&&r.to===t.toStep),"missing prerequisite relation");
 }
 for(const w of d.records.filter(x=>x.type==="Workflow")){
  const visiting=new Set(),seen=new Set();
  function visit(id){assert(!visiting.has(id),"flow cycle");if(seen.has(id))return;visiting.add(id);for(const t of d.records.filter(x=>x.type==="Transition"&&x.fromStep===id&&x.toStep))visit(t.toStep);visiting.delete(id);seen.add(id)}
  visit(w.entry);assert(seen.size===w.stepRefs.length,"unreachable step");
 }
 for(const [role,target] of Object.entries(d.roleBindings)){
  const r=roles.roles.find(x=>x.id===role);assert(r?.role==="P","workflow role");
  const t=get(target,role.endsWith("A06")?"Artifact":"Workflow");
  if(t.type==="Workflow")assert(t.d2===role.split("/")[0],"role owner");
 }
 for(const r of d.stateRules.events){
  assert(r.claimRefs.every(id=>get(id,"Claim"))&&!Object.hasOwn(r.changes,"sourceId")&&r.preserve.includes("sourceId"),"state rule protected identity");
 }
 assert(d.stateRules.initial.action==="OFFLINE_ONLY"&&d.stateRules.initial.permission==="STIPULATED_ONLY","no real permission");
 return map;
}
const wf=validateDomain(domain);
test("K07 actual finite typed workflow/artifact shape, edges, DAG, guards",wf.size===60&&domain.relations.length===69&&domain.records.filter(r=>r.type==="Workflow").length===5&&domain.stateRules.events.length===5);
const replay=(id,env)=>{
 const w=wf.get(id);let cur=w.entry,trace=[];
 while(cur){
  const s=wf.get(cur);trace.push(cur);
  if(trace.length>w.stepRefs.length)throw Error("cycle");
  if(!s.inputFields.every(k=>typeof env[k]==="boolean"))return {outcome:"UNKNOWN_MISSING_CONDITION",trace};
  const t=domain.records.find(t=>t.type==="Transition"&&t.fromStep===cur&&Object.entries(t.guard).every(([k,v])=>env[k]===v));
  if(!t)throw Error("no transition");if(t.toStep)cur=t.toStep;else return {outcome:t.outcome,trace};
 }
};
const wfId=x=>"K07-WF-"+x+"@1";
for(const w of domain.records.filter(r=>r.type==="Workflow")){
 const keys=[...new Set(w.stepRefs.flatMap(id=>wf.get(id).inputFields))],expected=new Set(domain.records.filter(r=>r.type==="Transition"&&r.workflow===ref(w)&&!r.toStep).map(r=>r.outcome)),seen=new Set();
 for(let i=0;i<2**keys.length;i++){
  const env=Object.fromEntries(keys.map((k,j)=>[k,!!((i>>j)&1)]));const r=replay(ref(w),env);
  if(!expected.has(r.outcome)||r.trace.length>w.stepRefs.length)throw Error("invalid workflow outcome");
  seen.add(r.outcome);
 }
 test(w.id+" all finite branches produce only expected bounded outcomes",seen.size===expected.size&&replay(ref(w),{}).outcome==="UNKNOWN_MISSING_CONDITION");
}
test("A02 spectrum no model proof from finite observation",replay(wfId("SPECTRUM"),{inputIdentityKnown:true,windowMetadataKnown:true,generationEvidenceKnown:false}).outcome==="FINITE_OBSERVATION_ONLY_MODEL_UNKNOWN");
test("A02 masking controlled stimuli without perception remains candidate",replay(wfId("MASKING"),{stimulusKnown:true,mechanismControlsKnown:true,perceptualEvidenceProvided:false}).outcome==="MECHANISM_CANDIDATES_ONLY");
test("A02 room unknown fit blocks decay report",replay(wfId("ROOM"),{pathConditionsKnown:true,fitConditionsValid:false,topologyComplete:true}).outcome==="PATH_CANDIDATE_DECAY_UNKNOWN");
test("A02 measurement changed calibration or old aggregate separate",replay(wfId("MEASUREMENT"),{measurandKnown:true,physicalCalibrationCurrent:false,rawWaveformAndFilterValid:true,uncertaintyModelKnown:true}).outcome==="PROPOSE_REVALIDATE_CALIBRATION"&&replay(wfId("MEASUREMENT"),{measurandKnown:true,physicalCalibrationCurrent:true,rawWaveformAndFilterValid:false,uncertaintyModelKnown:true}).outcome==="RETAIN_RAW_IF_VALID_NEW_WEIGHT_UNKNOWN");
const listener={stopRequired:false,conditionsStipulated:true,playbackEvidenceCurrent:true,exposureEvidenceComplete:true,analysisEvidenceCurrent:true};
test("A02 listening all stipulated never plays, stop dominates and unknown risk fail closed",replay(wfId("LISTENING"),listener).outcome==="PROPOSED_OFFLINE_COMPARISON_ONLY"&&replay(wfId("LISTENING"),{...listener,stopRequired:true}).outcome==="STOP_NO_PLAYBACK"&&replay(wfId("LISTENING"),{...listener,conditionsStipulated:false}).outcome==="STOP_OR_UNKNOWN_NO_PLAYBACK"&&replay(wfId("LISTENING"),{...listener,exposureEvidenceComplete:false}).outcome==="EXPOSURE_UNKNOWN_NO_PLAYBACK");
const a1=wf.get("K07-ART-SPECTRUM-ANNOTATION@1"),a2=wf.get("K07-ART-SPECTRUM-ANNOTATION@2"),src=wf.get(a1.fields.inputRef);
test("A06 editable exact artifact identity and derived superseding report",a1.fields.inputRef===a2.fields.inputRef&&src.fields.observedN===48&&src.fields.fsHz===4800&&a1.fields.gridHz===src.fields.fsHz/a1.fields.nfft&&a2.fields.gridHz===src.fields.fsHz/a2.fields.nfft&&a1.fields.firstNullHz===a2.fields.firstNullHz&&a1.fields.windowMs===a2.fields.windowMs&&a1.fields.nfft===48&&a2.fields.nfft===480&&domain.relations.filter(x=>x.type==="derived_from").length===2&&domain.relations.some(x=>x.type==="supersedes"&&x.from===ref(a2)&&x.to===ref(a1)));
const initial=domain.stateRules.initial,transition=(state,event)=>{
 const r=domain.stateRules.events.find(x=>x.event===event);
 if(!r)return {...state,action:state.risk==="URGENT_REPORT"?"STOP_SEEK_IMMEDIATE_MEDICAL_EVALUATION":state.permission==="WITHDRAWN"?"STOP_NO_PLAYBACK":"UNKNOWN_NO_EXECUTION"};
 const next={...state,...r.changes,action:r.action};
 for(const k of r.preserve)if(next[k]!==state[k])throw Error("protected field");
 if(state.risk==="URGENT_REPORT"||next.risk==="URGENT_REPORT")next.action="STOP_SEEK_IMMEDIATE_MEDICAL_EVALUATION";
 else if(state.permission==="WITHDRAWN"||next.permission==="WITHDRAWN")next.action="STOP_NO_PLAYBACK";
 return next;
};
const win=transition(initial,"ANALYSIS_WINDOW_CHANGED"),phys=transition(initial,"PHYSICAL_CHAIN_CHANGED"),play=transition(initial,"PLAYBACK_CHAIN_CHANGED"),revoke=transition(initial,"PERMISSION_WITHDRAWN"),urgent=transition(initial,"SUDDEN_HEARING_LOSS_REPORTED");
test("A04/A07 explicit version-scoped evidence invalidation",win.sourceId===initial.sourceId&&win.rawCalibrationEvidence===initial.rawCalibrationEvidence&&win.spectrumReport==="NEEDS_RECOMPUTE"&&phys.rawCalibrationEvidence==="NEEDS_REVALIDATION"&&play.listeningMatch==="INVALIDATED"&&play.sourceId===initial.sourceId);
test("A04/A07 withdrawal and urgent report dominate later proposal",transition(revoke,"ANALYSIS_WINDOW_CHANGED").action==="STOP_NO_PLAYBACK"&&transition(urgent,"PLAYBACK_CHAIN_CHANGED").action==="STOP_SEEK_IMMEDIATE_MEDICAL_EVALUATION"&&transition(initial,"UNKNOWN_EVENT").action==="UNKNOWN_NO_EXECUTION");
const domainNegative=(name,fn,regex)=>{const d=structuredClone(domain);fn(d);refuse(name,()=>validateDomain(d),regex)};
domainNegative("workflow missing step claim relation rejected",d=>{const s=d.records.find(x=>x.type==="Step");d.relations=d.relations.filter(r=>!(r.from===ref(s)&&r.type==="requires"))},/missing step condition\/claim/);
domainNegative("workflow ambiguous guard rejected",d=>{const t=d.records.find(x=>x.type==="Transition");d.records.push({...t,id:"K07-TR-DUP"})},/ambiguous guards/);
domainNegative("workflow missing guard rejected",d=>{const t=d.records.find(x=>x.type==="Transition"&&!x.toStep);d.records=d.records.filter(x=>x!==t)},/incomplete or ambiguous guards/);
domainNegative("workflow forbidden terminal authorization rejected",d=>{d.records.find(x=>x.type==="Transition"&&!x.toStep).outcome="AUTHORIZED"},/unsafe terminal/);
domainNegative("workflow unsupported relation rejected",d=>{d.relations[0].type="related_to"},/domain relation type/);
domainNegative("workflow wrong artifact supersedes rejected",d=>{const r=d.relations.find(x=>x.type==="supersedes");r.to="K07-ART-SYNTH-SIGNAL@1"},/invalid supersedes/);
test("unknown event never downgrades urgent or withdrawn stop",transition(revoke,"UNKNOWN_EVENT").action==="STOP_NO_PLAYBACK"&&transition(urgent,"UNKNOWN_EVENT").action==="STOP_SEEK_IMMEDIATE_MEDICAL_EVALUATION");
domainNegative("artifact cyclic derivation rejected",d=>{const r=d.relations.find(x=>x.type==="derived_from");d.relations.push({...r,id:"K07-REL-CYCLE",from:r.to,to:r.from})},/artifact derivation cycle/);
domainNegative("artifact missing exact dependency rejected",d=>{d.relations=d.relations.filter(r=>!(r.type==="derived_from"&&r.from==="K07-ART-SPECTRUM-ANNOTATION@2"))},/exact artifact input dependency/);
domainNegative("artifact false frequency grid rejected",d=>{d.records.find(r=>ref(r)==="K07-ART-SPECTRUM-ANNOTATION@2").fields.gridHz=1},/artifact parameter derivation/);
domainNegative("missing primary workflow role binding rejected",d=>{delete d.roleBindings["K07.02/A02"]},/missing P workflow or editable binding/);
domainNegative("state event cannot overwrite original identity",d=>{d.stateRules.events[0].changes.sourceId="FORGED"},/state rule protected identity/);
console.log(JSON.stringify({status:"K07_MODULE_CANDIDATE_ONLY",node:process.version,checks:checks.length,passed:checks.filter(x=>x[1]).length,results:checks,summary,roleCells:56,legacyRoutes:48,splitRoutes:7,sourceCount:33,withheldSourceCount:2,workflowRecords:60,workflowRelations:69,limits:["all actual claims are CANDIDATE; independent professional review and integration separate","finite local domain workflow/annotation/state witnesses; no generalized engine, actual grant, actual audio/clinical/tool execution, production database or LLM efficacy","35 source locator histories; 33 direct sources, S459/S465 withheld, no source import or current external re-read","roles and routes do not authorize actual operations"]},null,2));
