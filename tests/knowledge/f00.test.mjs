import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {openCandidateReader,gitBlob} from "../../tools/validate-knowledge.mjs";
const root=process.cwd(), dir="tests/knowledge/fixtures/", indexPath=dir+"controller-input.json";
const expectedIndex="356965a306773c4a555c8768d96cecad03d54972";
const read=(r,f)=>JSON.parse(fs.readFileSync(path.join(r,f),"utf8"));
const write=(r,f,x)=>{const p=path.join(r,f);fs.mkdirSync(path.dirname(p),{recursive:true});const t=JSON.stringify(x,null,2)+"\n";fs.writeFileSync(p,t);return gitBlob(t)};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const checks=[],test=(name,ok)=>{if(!ok)throw Error(name);checks.push([name,true])};
const refuse=(name,fn,pattern)=>{let err=null;try{fn()}catch(e){err=e}test(name,err!==null&&(!pattern||pattern.test(err.message)))};
const input=read(root,indexPath);
test("fixed controller identity",gitBlob(fs.readFileSync(indexPath))===expectedIndex);
const frozen=read(root,"ontology/l1-anchor-tree.json");
const actualTree=spawnSync("git",["rev-parse",frozen.commit+"^{tree}"],{cwd:root,encoding:"utf8"});
const actualPaths=spawnSync("git",["ls-tree","-r","-z",frozen.commit,"--","docs/research","docs/product/calibration"],{cwd:root,encoding:"utf8"});
const expectedPaths=Object.fromEntries(actualPaths.stdout.split("\0").filter(Boolean).map(row=>{const [meta,f]=row.split("\t");return [f,meta.split(" ")[2]]}).filter(([f])=>/^docs\/research\/source-qualification-[a-z0-9-]+\.md$|^docs\/product\/calibration\/[a-z0-9-]+\.md$/.test(f)));
test("RV01 exact frozen Git tree and complete eligible path/blob projection",actualTree.status===0&&actualTree.stdout.trim()===frozen.tree&&actualPaths.status===0&&Object.keys(expectedPaths).length===316&&Object.keys(frozen.paths).length===316&&Object.entries(expectedPaths).every(([f,b])=>frozen.paths[f]===b));
const entries=input.entries,opts={allowFixture:true,priorRegistry:input.priorRegistry};
const reader=openCandidateReader(root,entries,opts),summary=reader.summary();
test("two actual anchored fixture packs",same(summary.counts,{records:42,claims:4,edges:12,bindings:42,inventory:5})&&summary.acceptedClaims===0&&summary.packs.every(p=>p.coverageMode==="FIXTURE_SUBSET"));
refuse("fixture not silently formal",()=>openCandidateReader(root,entries),/fixture not formal/);
const out=reader.retrieve("K01-PERIOD-CENTS@1");
test("precise actual cross-owner H closure",same(out.claims.map(c=>c.ref),["K01-PERIOD-CENTS@1","K01-CENTS@1","K07-FREQ@1"])&&same(out.rootIds,["K01-PERIOD-CENTS@1"]));
test("provider contexts and limits explicit",out.claims[0].relations.filter(e=>e.type==="requires").every(e=>e.condition.ref==="K01-CTX-PERIOD-CENTS@1"&&e.targetContext.ref!==e.condition.ref&&e.qualification.limits&&e.logicalConverse===false));
test("all evidence and source qualification exposed",out.claims.every(c=>c.status==="CANDIDATE"&&c.applicability==="CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL"&&c.evidence.every(e=>e.limits&&e.anchor.blob&&e.sources.every(s=>s.qualification.scope&&s.qualification.limits&&s.anchor.blob&&s.rights==="UNKNOWN_NO_IMPORT"))));
test("O navigation does not expand or infer converse",same(reader.retrieve("K07-FREQ@1").claims.map(c=>c.ref),["K07-FREQ@1"])&&reader.retrieve("K07-FREQ@1").claims[0].relations.some(e=>e.type==="references"&&!e.required&&e.logicalConverse===false));
test("D4 multiple distinct conditional claims",same(reader.retrieve("K01.02.04.01").rootIds,["K01-CENTS@1","K01-PERIOD-CENTS@1"]));
test("CQ roots distinct from H support",reader.retrieve("CQ07").rootIds.includes("K01-PERIOD-CENTS@1")&&reader.retrieve("CQ07").claims.some(c=>c.ref==="K01-CENTS@1"&&c.selection==="REQUIRED_SUPPORT"));
const back=reader.caseToClaims("K01-VIEW-PERIOD-CENTS-FP@1");
test("single authority dual case binding",back.length===3&&back.filter(b=>b.role==="PRIMARY_TARGET").length===1&&back.every(b=>out.claims.find(c=>c.ref===b.claim).cases.some(x=>x.binding.id===b.id)));
test("actual unknown L1 slots not promoted",reader.retrieve("K01.02.06.02").claims.length===0&&reader.retrieve("K01.02.06.02").unresolved[0].disposition==="UNKNOWN"&&reader.retrieve("K01.07.03.01").unresolved[0].disposition==="UNKNOWN");
test("unknown exact query",reader.retrieve("NOT-FOUND@1").dependencyState==="UNKNOWN_NO_MATCH");
const old=reader.retrieve("K01-PERIOD-CENTS@1"),snapshot=structuredClone(old);
old.claims[0].relations.find(e=>e.type==="requires").qualification.scope="FORGED";
old.claims[0].evidence[0].sources[0].qualification.scope="FORGED";
old.claims[0].cases[0].view.example.referencePeriodMs=-1;
old.claims[0].evidence[0].anchor.row="FORGED";
const ss=reader.summary();ss.unresolved[0].reason="FORGED";
const bb=reader.caseToClaims("K01-VIEW-PERIOD-CENTS-FP@1");bb[0].condition.condition="FORGED";
test("mutable consumer projections cannot change authority",same(reader.retrieve("K01-PERIOD-CENTS@1"),snapshot)&&same(reader.summary(),summary)&&same(reader.caseToClaims("K01-VIEW-PERIOD-CENTS-FP@1"),back)&&Object.isFrozen(reader));
const c=1200*Math.log2(330/220),phase=-360*200*.00125;
test("actual cents and period composition arithmetic",Math.abs(c-701.9550008653874)<1e-9&&1200*Math.log2((1/.0025)/(1/.005))===1200&&1200*Math.log2((1/.01)/(1/.005))===-1200);
test("actual phase and reverse family",phase===-90&&[.00125,.00625].every(t=>Math.abs(((-360*200*t+90)%360))<1e-9));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"audio-kg-f00-negative-"));
const files=new Set(["ontology/knowledge-profile.json","ontology/l1-anchor-tree.json","docs/product/calibration/g05-r1-module-evidence-reconciliation.md","docs/product/calibration/theory-all-atom-discovery-cq.md","docs/product/calibration/acoustics-r3-discovery-cq.md","tools/validate-knowledge.mjs",indexPath,input.priorRegistry.file]);
for(const e of entries){files.add(e.pack);files.add(e.manifest);for(const r of read(root,e.pack).records)if(r.anchor)files.add(r.anchor.file)}
function restore(){for(const f of files){const target=path.join(tmp,f);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,f),target);}}
function cli(index=indexPath,expected=expectedIndex,query){return spawnSync(process.execPath,["tools/validate-knowledge.mjs",index,expected,...(query?[query]:[])],{cwd:tmp,encoding:"utf8",timeout:10000})}
function caseMutation(name,edit,pattern,{prior=false}={}){
 restore();
 const ps=entries.map(e=>read(tmp,e.pack)),ms=entries.map(e=>read(tmp,e.manifest));
 edit(ps,ms);
 // A deliberately newly stipulated test-only qualification subject exercises structural checks.
 // This is NOT a production admission or a runtime resealing function.
 const altered=entries.map((e,i)=>{ms[i].packBlob=write(tmp,e.pack,ps[i]);return {...e,manifestBlob:write(tmp,e.manifest,ms[i])}});
 refuse(name,()=>openCandidateReader(tmp,altered,{allowFixture:true,priorRegistry:prior?input.priorRegistry:null}),pattern);
}
try{
 restore();const proc=cli(indexPath,expectedIndex,"K01-PERIOD-CENTS@1");
 test("actual allowlisted CLI on separate tree",proc.status===0&&same(JSON.parse(proc.stdout),snapshot)&&!fs.existsSync(path.join(tmp,"docs/research/l2-pilot/assessment.json"))&&!fs.existsSync(path.join(tmp,"docs/research/l2-pilot/assessment-input.json")));
 test("heldout namespace not queryable",JSON.parse(cli(indexPath,expectedIndex,"eval-r1").stdout).claims.length===0);
 test("wrong controller expected hash rejected",cli(indexPath,"0".repeat(40)).status!==0);
 const idx=read(tmp,indexPath);idx.entries[0].manifestBlob="0".repeat(40);write(tmp,indexPath,idx);
 test("changed controller index rejected before input",cli().status!==0);
 restore();let k=read(tmp,entries[0].pack);k.records.find(x=>x.type==="Claim").statement="forged";write(tmp,entries[0].pack,k);
 refuse("changed pack with same qualification",()=>openCandidateReader(tmp,entries,opts),/exact blob mismatch/);
 restore();let m=read(tmp,entries[0].manifest);m.sourceQualifications[0].scope="forged";write(tmp,entries[0].manifest,m);
 refuse("changed qualification same controller pin",()=>openCandidateReader(tmp,entries,opts),/exact blob mismatch/);
 restore();let history=read(tmp,input.priorRegistry.file);history.records["K01-CENTS@1"]="0".repeat(64);write(tmp,input.priorRegistry.file,history);
 refuse("changed prior registry same pin",()=>openCandidateReader(tmp,entries,opts),/exact blob mismatch/);
 restore();fs.appendFileSync(path.join(tmp,"ontology/knowledge-profile.json")," ");refuse("profile tamper",()=>openCandidateReader(tmp,entries,opts),/exact blob mismatch/);
 restore();fs.appendFileSync(path.join(tmp,"docs/research/source-qualification-theory-evidence-batch.md")," ");refuse("frozen source bytes tamper",()=>openCandidateReader(tmp,entries,opts),/anchor blob/);
 restore();fs.appendFileSync(path.join(tmp,"docs/product/calibration/theory-all-atom-discovery-cq.md")," ");refuse("frozen discovery bytes tamper",()=>openCandidateReader(tmp,entries,opts),/discovery frozen blob/);
 // RV01: reproduce the exact independent frozen-tree falsifiers with a fresh test-only
 // manifest and the genuine prior qualified subject checkpoint.
 restore();fs.appendFileSync(path.join(tmp,"ontology/l1-anchor-tree.json")," ");
 refuse("RV01 portable frozen tree projection tamper",()=>openCandidateReader(tmp,entries,opts),/exact blob mismatch/);
 const makeAnchor=(file,line)=>{const bytes=fs.readFileSync(path.join(tmp,file));return {commit:frozen.commit,file,blob:gitBlob(bytes),line,row:bytes.toString("utf8").split("\n")[line-1]}};
 const invented="docs/research/source-qualification-f00-invented.md",fakeUri="https://example.invalid/fake";
 function freshSource(p,m,anchor){
  const s=p[0].records[0];s.revision=2;s.title="Fake Source";s.uri=fakeUri;s.locator="invented locator";s.anchor=anchor;
  m[0].sourceQualifications[0].source="S022@2";m[0].sourceQualifications[0].accessedUri=fakeUri;
  for(const r of p[0].records.filter(r=>r.type==="Evidence")){const old=r.id+"@1";r.revision=2;r.sources=["S022@2"];for(const e of p[0].edges)if(e.to===old)e.to=r.id+"@2";}
 }
 caseMutation("RV01 invented L1 source path with matching bytes and revised source", (p,m)=>{
  fs.writeFileSync(path.join(tmp,invented),"| S022 | [Fake Source]("+fakeUri+") | READ_LOCATOR; invented source |\n");
  freshSource(p,m,makeAnchor(invented,1));
 },/anchor not in frozen L1 tree/,{prior:true});
 caseMutation("RV01 modified frozen source path with candidate-supplied blob", (p,m)=>{
  const f=p[0].records[0].anchor.file,line=p[0].records[0].anchor.line,file=path.join(tmp,f),rows=fs.readFileSync(file,"utf8").split("\n");
  rows[line-1]="| S022 | [Fake Source]("+fakeUri+") | READ_LOCATOR; invented source |";fs.writeFileSync(file,rows.join("\n"));
  freshSource(p,m,makeAnchor(f,line));
 },/anchor not in frozen L1 tree/,{prior:true});
 function freshEvidence(p,file,line){
  const ev=p[0].records.find(r=>r.type==="Evidence"),old=ev.id+"@1";ev.revision=2;ev.anchor=makeAnchor(file,line);
  for(const e of p[0].edges)if(e.to===old)e.to=ev.id+"@2";
 }
 caseMutation("RV01 invented L1 evidence path with matching row",(p,m)=>{
  const f="docs/product/calibration/f00-invented-evidence.md";fs.writeFileSync(path.join(tmp,f),"| K01.02.04.01 | S022 | invented evidence |\n");freshEvidence(p,f,1);
 },/anchor not in frozen L1 tree/,{prior:true});
 caseMutation("RV01 modified frozen evidence file and matching new blob",(p,m)=>{
  const ev=p[0].records.find(r=>r.type==="Evidence"),f=ev.anchor.file,line=ev.anchor.line,fp=path.join(tmp,f),rows=fs.readFileSync(fp,"utf8").split("\n");rows[line-1]+=" fabricated qualifier";fs.writeFileSync(fp,rows.join("\n"));freshEvidence(p,f,line);
 },/anchor not in frozen L1 tree/,{prior:true});
 caseMutation("RV02 freshly pinned source qualification same prior subject",(p,m)=>{m[0].sourceQualifications[0].scope="FORGED_SCOPE: universal measured musical truth";},/changed immutable prior qualification\/relationship subject S022@1/,{prior:true});
 caseMutation("RV02 freshly pinned edge qualification same prior subject",(p,m)=>{m[0].edgeQualifications[0].limits="FORGED_LIMITS";},/changed immutable prior qualification\/relationship subject K01-CENTS@1/,{prior:true});
 function dropWindow(p,m,downgrade=false){
  const e=p[0].edges.find(e=>e.type==="requires"&&e.to==="K07-FREQ@1");
  if(downgrade)e.type="references";else{p[0].edges=p[0].edges.filter(x=>x.id!==e.id);m[0].edgeQualifications=m[0].edgeQualifications.filter(q=>q.edge!==e.id);}
  p[0].bindings=p[0].bindings.filter(b=>b.claim!=="K07-FREQ@1");m[0].obligations=m[0].obligations.filter(o=>o.edge!==e.id);
 }
 caseMutation("RV02 coordinated H edge binding qualification and obligation deletion",(p,m)=>dropWindow(p,m),/changed immutable prior qualification\/relationship subject K01-PERIOD-CENTS@1/,{prior:true});
 caseMutation("RV02 coordinated H to O downgrade including obligation removal",(p,m)=>dropWindow(p,m,true),/changed immutable prior qualification\/relationship subject K01-PERIOD-CENTS@1/,{prior:true});
 caseMutation("RV02 optional O removal under unchanged prior qualified subject",(p,m)=>{
  const e=p[1].edges.find(x=>x.type==="references");p[1].edges=p[1].edges.filter(x=>x.id!==e.id);m[1].edgeQualifications=m[1].edgeQualifications.filter(q=>q.edge!==e.id);
 },/changed immutable prior qualification\/relationship subject K07-FREQ@1/,{prior:true});
 caseMutation("RV02 binding identity change under unchanged prior claim",(p,m)=>p[0].bindings[0].id="K01-B-REPLACED",/changed immutable prior qualification\/relationship subject K01-CENTS@1/,{prior:true});
 caseMutation("RV02 remove prior claim and all its owned relationships from selected owner",(p,m)=>{
  const cl="K07-PHASE@1",group=p[1].records.find(r=>r.type==="CaseGroup"&&r.claim===cl),g=group.id+"@1";
  const views=p[1].records.filter(r=>r.type==="CaseView"&&r.group===g).map(r=>r.id+"@1");
  const edges=p[1].edges.filter(e=>e.from===cl).map(e=>e.id);
  p[1].records=p[1].records.filter(r=>![cl,g,...views].includes(r.id+"@"+r.revision));
  p[1].edges=p[1].edges.filter(e=>!edges.includes(e.id));m[1].edgeQualifications=m[1].edgeQualifications.filter(q=>!edges.includes(q.edge));m[1].obligations=m[1].obligations.filter(o=>o.consumer!==cl);
  p[1].bindings=p[1].bindings.filter(b=>!views.includes(b.view));const row=p[1].inventory.find(r=>r.claimRefs.includes(cl));row.claimRefs=[];row.disposition="UNKNOWN";row.reason="test-only removed subject";
 },/missing prior qualified subject K07-PHASE/,{prior:true});
 restore();const incomplete=read(tmp,input.priorRegistry.file);delete incomplete.subjects["S022@1"];const incompleteBlob=write(tmp,input.priorRegistry.file,incomplete);
 refuse("RV02 record-only history cannot omit known qualified source subject",()=>openCandidateReader(tmp,entries,{allowFixture:true,priorRegistry:{file:input.priorRegistry.file,blob:incompleteBlob}}),/missing prior qualified subject checkpoint/);
 restore();const legacy=read(tmp,input.priorRegistry.file);legacy.format="audio-kg-prior-identities/1";delete legacy.subjects;const legacyBlob=write(tmp,input.priorRegistry.file,legacy);
 refuse("RV02 obsolete record-only checkpoint not silently accepted",()=>openCandidateReader(tmp,entries,{allowFixture:true,priorRegistry:{file:input.priorRegistry.file,blob:legacyBlob}}),/prior registry shape/);
 // Reordering only the collections is immaterial to their identity.
 restore();const reorder=entries.map(e=>{const p=read(tmp,e.pack),m=read(tmp,e.manifest);p.edges.reverse();p.bindings.reverse();m.edgeQualifications.reverse();m.obligations.reverse();m.packBlob=write(tmp,e.pack,p);return {...e,manifestBlob:write(tmp,e.manifest,m)}});
 test("RV02 semantic set order independent identity",openCandidateReader(tmp,reorder,opts).summary().counts.edges===12);
 caseMutation("exact source URI not substring",p=>p[0].records[0].uri="https://newt.phys.unsw.edu.au",/source exact URI/);
 caseMutation("forged alternate access URL",(p,m)=>m[0].sourceQualifications[0].accessedUri="https://example.invalid/",/source exact URI/);
 caseMutation("forged source anchor row",p=>p[0].records[0].anchor.row+=" fake",/anchor row/);
 caseMutation("unregistered source license",p=>p[0].records[0].rights="PERMITTED",/source metadata/);
 caseMutation("source metadata same immutable revision",p=>p[0].records[0].locator="invented locator",/changed immutable prior revision/,{prior:true});
 caseMutation("coordinated same revision statement context case",p=>{p[0].records.find(r=>r.type==="Claim").statement="false";p[0].records.find(r=>r.type==="Context").condition="false";p[0].records.find(r=>r.type==="CaseView").explanation="false"},/changed immutable prior revision/,{prior:true});
 caseMutation("changed evidence limits same immutable revision",p=>p[0].records.find(r=>r.type==="Evidence").limits="all real measurements",/changed immutable prior revision/,{prior:true});
 caseMutation("claim cannot self-promote accepted",p=>p[0].records.find(r=>r.type==="Claim").status="ACCEPTED",/claim scope/);
 caseMutation("wrong professional owner",p=>p[0].records.find(r=>r.type==="Claim").owner="K07",/record owner/);
 caseMutation("duplicate stable current identity",p=>p[0].records.push({...p[0].records[1],revision:2}),/multiple current revisions/);
 caseMutation("duplicate exact identity",p=>p[0].records.push({...p[0].records[1]}),/record identity/);
 caseMutation("unknown disposition cannot admit claim",p=>p[0].inventory[0].disposition="UNKNOWN",/unresolved row cannot admit/);
 caseMutation("wrong discovery row",p=>p[0].inventory[0].line=30,/inventory disposition/);
 caseMutation("duplicate inventory row",p=>p[0].inventory.push({...p[0].inventory[0]}),/inventory disposition/);
 caseMutation("missing inventory claim",p=>p[0].inventory[0].claimRefs.pop(),/claim scope/);
 caseMutation("wrong source ref",p=>p[0].records.find(r=>r.type==="Evidence").sources=["S022@2"],/missing or wrong exact ref/);
 caseMutation("unsupported source linked to evidence",p=>p[0].records.find(r=>r.type==="Evidence").sources=["S031@1"],/evidence-source locator mismatch/);
 caseMutation("wrong required context",p=>p[0].edges.find(e=>e.type==="requires").condition="K01-CTX-CENTS@1",/relation scope/);
 caseMutation("wrong provider revision",p=>p[0].edges.find(e=>e.to==="K07-FREQ@1").to="K07-FREQ@2",/missing or wrong exact ref/);
 caseMutation("coordinated mandatory edge and binding deletion",(p,m)=>{const e=p[0].edges.find(e=>e.to==="K07-FREQ@1");p[0].edges=p[0].edges.filter(x=>x.id!==e.id);p[0].bindings=p[0].bindings.filter(b=>b.claim!=="K07-FREQ@1");m[0].edgeQualifications=m[0].edgeQualifications.filter(q=>q.edge!==e.id)},/required H obligation absent/);
 caseMutation("mandatory support binding deletion",p=>p[0].bindings=p[0].bindings.filter(b=>b.id!=="K01-B-PERIOD-CENTS-0-H1"),/mandatory supporting view/);
 caseMutation("H downgraded to O",(p,m)=>{const e=p[0].edges.find(e=>e.to==="K07-FREQ@1");e.type="references";p[0].bindings=p[0].bindings.filter(b=>b.claim!=="K07-FREQ@1")},/H obligation mismatch/);
 caseMutation("H missing explicit scoped obligation",(p,m)=>m[0].obligations.pop(),/H without scoped obligation/);
 caseMutation("invalid inverse edge",p=>p[0].edges[0].type="supports",/unsupported relation/);
 caseMutation("self support",p=>p[0].edges[0].to=p[0].edges[0].from,/missing or wrong exact ref/);
 caseMutation("H cycle",(p,m)=>{p[1].edges.push({id:"K07-BACK",type:"requires",from:"K07-FREQ@1",to:"K01-PERIOD-CENTS@1",condition:"K07-CTX-FREQ@1"});m[1].edgeQualifications.push({edge:"K07-BACK",scope:"test",limits:"test"});},/required dependency cycle/);
 caseMutation("missing source support",(p,m)=>{const e=p[0].edges[0];p[0].edges.shift();m[0].edgeQualifications=m[0].edgeQualifications.filter(x=>x.edge!==e.id)},/required claim support/);
 caseMutation("duplicate edge",(p,m)=>{p[0].edges.push({...p[0].edges[0],id:"K01-DUP"});m[0].edgeQualifications.push({edge:"K01-DUP",scope:"test",limits:"test"})},/duplicate relation/);
 caseMutation("missing reverse negative view",p=>{const id="K01-VIEW-CENTS-RN@1";p[0].records=p[0].records.filter(r=>r.id+"@"+r.revision!==id);p[0].bindings=p[0].bindings.filter(b=>b.view!==id)},/missing core case view/);
 caseMutation("wrong primary target",p=>p[0].bindings[0].claim="K01-PERIOD-CENTS@1",/primary binding target/);
 caseMutation("duplicate primary binding",p=>p[0].bindings.push({...p[0].bindings[0],id:"K01-DUP"}),/duplicate binding/);
 caseMutation("binding condition mismatch",p=>p[0].bindings[0].condition="K01-CTX-PERIOD-CENTS@1",/binding role\/condition/);
 caseMutation("actual observation not synthetic",p=>p[0].records.find(r=>r.type==="CaseView").evidenceKind="OBSERVED",/case view/);
 caseMutation("private rubric outer field rejected",p=>p[0].records.find(r=>r.type==="CaseView").assessmentRubric="EVAL_PRIVATE",/record shape/);
 // Test actual 184+51 frozen row identities in temporary formal-shaped packs only.
 restore();const moduleEntries=entries.map((e,i)=>{
  const p=read(tmp,e.pack),m=read(tmp,e.manifest),owner=p.owner,discovery=owner==="K01"?"theory-all-atom-discovery-cq.md":"acoustics-r3-discovery-cq.md";
  p.coverageMode="MODULE";const selected=new Map(p.inventory.map(x=>[x.line,x]));
  p.inventory=fs.readFileSync(path.join(tmp,"docs/product/calibration/"+discovery),"utf8").split("\n").flatMap((row,i)=>{const match=row.match(/^\| (K\d\d\.\d\d\.\d\d\.\d\d) \|/);return match?[selected.get(i+1)||{line:i+1,d4:match[1],disposition:"UNKNOWN",claimRefs:[],reason:"TEST_ONLY row accounting; no professional adjudication"}]:[]});
  const pack="knowledge/"+owner+"/test-only.json",manifest="knowledge/"+owner+"/test-only-qualification.json";m.packBlob=write(tmp,pack,p);return {pack,manifest,manifestBlob:write(tmp,manifest,m)};
 });
 // Test-only explicit non-admission dispositions on actual discovered rows.
 const statePack=read(tmp,moduleEntries[0].pack),stateManifest=read(tmp,moduleEntries[0].manifest);
 const distinct=statePack.inventory.filter(x=>x.disposition==="UNKNOWN"&&![30,193].includes(x.line)&&x.d4!=="K01.02.04.01").slice(0,3);
 for(const [i,st] of ["DISPUTED","HISTORICAL","ROUTED"].entries()){distinct[i].disposition=st;distinct[i].reason="TEST_ONLY explicit non-admission "+st+"; not an L1 factual adjudication or equality";}
 stateManifest.packBlob=write(tmp,moduleEntries[0].pack,statePack);moduleEntries[0].manifestBlob=write(tmp,moduleEntries[0].manifest,stateManifest);
 // Legacy FIXTURE_SUBSET deliberately used synthetic CQ07 direct assignment.
 // It is not a valid formal K01 role mapping. Preserve fixture bytes and prior
 // identity; reject this temporary unnormalized MODULE before normalizing it.
 refuse("legacy synthetic CQ07 cannot silently become formal K01 root",()=>openCandidateReader(tmp,moduleEntries),/K01 CQ not frozen direct role/);
 for(const r of statePack.records.filter(r=>r.type==="Claim")){
  const slot=statePack.inventory.find(x=>x.claimRefs.includes(r.id+"@"+r.revision));
  const line=fs.readFileSync(path.join(tmp,"docs/product/calibration/theory-all-atom-discovery-cq.md"),"utf8").split("\n")[slot.line-1];
  r.cq=line.split("|")[4].trim().split("；").filter(x=>x.endsWith(" D")).map(x=>x.slice(0,4));
 }
 stateManifest.packBlob=write(tmp,moduleEntries[0].pack,statePack);moduleEntries[0].manifestBlob=write(tmp,moduleEntries[0].manifest,stateManifest);
 const dispositionReader=openCandidateReader(tmp,moduleEntries);
 test("explicit disputed historical routed rows not admitted",distinct.every(row=>dispositionReader.retrieve(row.d4).unresolved.some(x=>x.line===row.line&&x.disposition===row.disposition&&x.claimRefs.length===0))&&dispositionReader.summary().acceptedClaims===0);
 const full=dispositionReader.summary();
 test("actual full L1 inventory row accounting in isolated test only",full.counts.inventory===235&&full.acceptedClaims===0&&full.packs.every(x=>x.coverageMode==="MODULE"));
 let missingRowPack=read(tmp,moduleEntries[0].pack),missingRowManifest=read(tmp,moduleEntries[0].manifest);missingRowPack.inventory.pop();missingRowManifest.packBlob=write(tmp,moduleEntries[0].pack,missingRowPack);moduleEntries[0].manifestBlob=write(tmp,moduleEntries[0].manifest,missingRowManifest);
 refuse("formal module missing actual row",()=>openCandidateReader(tmp,moduleEntries),/incomplete formal inventory/);
 // Positive new exact candidate revision with explicit prior registry and updated references.
 restore();const ps=entries.map(e=>read(tmp,e.pack)),ms=entries.map(e=>read(tmp,e.manifest));
 const oldRef="K01-CENTS@1",newRef="K01-CENTS@2",claim=ps[0].records.find(r=>r.id==="K01-CENTS");
 claim.revision=2;claim.limits+="；新候选版本明确不作实体测量。";
 function replaceRefs(x){if(typeof x==="string")return x===oldRef?newRef:x;if(Array.isArray(x))return x.map(replaceRefs);if(x&&typeof x==="object")return Object.fromEntries(Object.entries(x).map(([k,v])=>[k,replaceRefs(v)]));return x}
 const successor=entries.map((e,i)=>{const p=replaceRefs(ps[i]),m=replaceRefs(ms[i]);m.packBlob=write(tmp,e.pack,p);return {...e,manifestBlob:write(tmp,e.manifest,m)}});
 // The CaseGroup record changes its exact claim reference; immutable identity requires a new group revision and view refs.
 refuse("rewiring prior group without new revision rejected",()=>openCandidateReader(tmp,successor,opts),/changed immutable prior revision/);
 // Source change invalidates dependent evidence and claims, including case refs and downstream H/O targets.
 restore();const sp=entries.map(e=>read(tmp,e.pack)),sm=entries.map(e=>read(tmp,e.manifest));const src=sp[0].records[0];src.revision=2;src.locator+=" (explicit candidate clarification)";
 sm[0].sourceQualifications[0].source="S022@2";sm[0].sourceQualifications[0].scope+=" Revised candidate clarification; no wider measurement claim.";
 for(const r of sp[0].records.filter(r=>r.type==="Evidence")){const old=r.id+"@1";r.revision=2;r.sources=["S022@2"];for(const e of sp[0].edges)if(e.to===old)e.to=r.id+"@2";}
 // Former positive test now requires all affected semantic subject revisions.
 const staleClaims=entries.map((e,i)=>{sm[i].packBlob=write(tmp,e.pack,sp[i]);return {...e,manifestBlob:write(tmp,e.manifest,sm[i])}});
 refuse("RV02 source and evidence changed without claim revision",()=>openCandidateReader(tmp,staleClaims,opts),/changed immutable prior qualification\/relationship subject/);
 // Revise exactly the four dependent claims (including the O link target change and H downstream),
 // their associated groups and views. Contexts and independent S031/evidence remain unchanged.
 const revisionMap=new Map();
 for(const r of sp.flatMap(p=>p.records))if(["Claim","CaseGroup","CaseView"].includes(r.type)){
  const prev=r.id+"@"+r.revision;r.revision++;revisionMap.set(prev,r.id+"@"+r.revision);
 }
 function rewire(x){if(typeof x==="string")return revisionMap.get(x)||x;if(Array.isArray(x))return x.map(rewire);if(x&&typeof x==="object")return Object.fromEntries(Object.entries(x).map(([k,v])=>[k,rewire(v)]));return x}
 const revEntries=entries.map((e,i)=>{const p=rewire(sp[i]),m=rewire(sm[i]);m.packBlob=write(tmp,e.pack,p);return {...e,manifestBlob:write(tmp,e.manifest,m)}});
 const revised=openCandidateReader(tmp,revEntries,opts);
 test("explicit new source and evidence revisions remain candidate only",revised.retrieve("K01-CENTS@2").claims[0].evidence[0].sources[0].revision===2&&revised.summary().acceptedClaims===0);
 test("RV02 explicit affected successor closure uses exact revised subjects",same(revised.retrieve("K01-PERIOD-CENTS@2").claims.map(c=>c.ref),["K01-PERIOD-CENTS@2","K01-CENTS@2","K07-FREQ@2"])&&revised.retrieve("K01-CENTS@1").claims.length===0&&revised.retrieve("K07-PHASE@2").claims.some(c=>c.ref==="K07-FREQ@2"));
 restore();const hist=read(tmp,input.priorRegistry.file);hist.records["S022@2"]="0".repeat(64);const historyBlob=write(tmp,input.priorRegistry.file,hist);
 refuse("stale older source revision",()=>openCandidateReader(tmp,entries,{allowFixture:true,priorRegistry:{file:input.priorRegistry.file,blob:historyBlob}}),/stale prior revision/);
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
console.log(JSON.stringify({status:"CANDIDATE_STRUCTURE_ONLY",node:process.version,checks:checks.length,passed:checks.filter(x=>x[1]).length,results:checks,summary,limits:["test-only candidate fixtures, no formal population","externally pinned identity is not automated truth or independent admission","prior identities require controller-supplied current checkpoint when revisions exist","only implemented W1 relation/type subset","no LLM, real audio, permission, production database/runtime"]},null,2));
