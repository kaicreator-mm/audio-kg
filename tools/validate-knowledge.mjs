// F00 bounded candidate knowledge validator and read-only discovery. No automatic accepted claims.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {pathToFileURL} from "node:url";

const fail=(ok,msg)=>{if(!ok)throw Error(msg)};
const token=s=>typeof s==="string"&&s.trim().length>0;
const list=x=>Array.isArray(x);
const obj=x=>x&&typeof x==="object"&&!list(x);
const sha=/^[0-9a-f]{40}$/;
const rid=/^[A-Z][A-Z0-9-]*@\d+$/;
const d4=/^K(?:0[1-9]|1[0-9])\.\d\d\.\d\d\.\d\d$/;
const ownerRe=/^K(?:0[1-9]|1[0-9])$/;
const ref=x=>x.id+"@"+x.revision;
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const keys=(x,expected,msg)=>fail(obj(x)&&equal(Object.keys(x).sort(),[...expected].sort()),msg);
const unique=(xs,msg)=>fail(new Set(xs).size===xs.length,msg);
export function gitBlob(bytes){const b=Buffer.isBuffer(bytes)?bytes:Buffer.from(bytes);return crypto.createHash("sha1").update("blob "+b.length+"\0").update(b).digest("hex")}
const copy=structuredClone;
function canonical(x){return x===null?"null":Array.isArray(x)?"["+x.map(canonical).join(",")+"]":typeof x==="object"?"{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canonical(x[k])).join(",")+"}":JSON.stringify(x)}
const recordDigest=x=>crypto.createHash("sha256").update(canonical(x)).digest("hex");
function freeze(x){if(x&&typeof x==="object"&&!Object.isFrozen(x)){for(const v of Object.values(x))freeze(v);Object.freeze(x)}return x;}
const PROFILE_BLOB="efee38b8ca57d453a4c3073f848939bde581899c";
// Independent portable projection of actual frozen Git tree (not candidate-generated).
const L1_TREE_BLOB="a72360e348f00e82a74809e6acc056f05b311b1f";
const L1_TREE="96ae7e9a2ee5c000b63f001faeee4a6a4be69396";
function safeRead(root,rel){
 fail(typeof rel==="string"&&/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/.test(rel)&&!rel.split("/").some(s=>s===".."||s==="."),"unsafe path");
 const f=fs.realpathSync(path.resolve(root,rel));fail(f.startsWith(root+path.sep)&&fs.statSync(f).isFile(),"path escapes repository");
 return fs.readFileSync(f);
}
function pinned(root,file,expected){
 fail(sha.test(expected||""),"missing external expected blob "+file);
 const b=safeRead(root,file);fail(gitBlob(b)===expected,"exact blob mismatch "+file);return JSON.parse(b.toString("utf8"));
}
// Caller must bind manifest identities from the actual review/task authority.
// No function to calculate/reseal qualification from incoming data, no auto-accept.
export function openCandidateReader(rootPath,entries,{allowFixture=false,priorRegistry=null}={}){
 const root=fs.realpathSync(rootPath),p=freeze(pinned(root,"ontology/knowledge-profile.json",PROFILE_BLOB));
 fail(p.format==="audio-kg-knowledge-profile/1"&&p.status==="F00_CANDIDATE_VALIDATION_PROFILE","profile");
 fail(list(entries)&&entries.length>0&&typeof allowFixture==="boolean","input entries");
 const ledger=safeRead(root,p.authority.ledgerFile);fail(gitBlob(ledger)===p.authority.ledgerBlob,"frozen L1 ledger");
 const discovery=new Map();
 for(const line of ledger.toString("utf8").split("\n")){
  const m=line.match(/^\| (K\d\d) .*?\[发现\]\(([^)]+)\) \| ([0-9a-f]{40}) \| (\d+) \|/);
  if(m)discovery.set(m[1],{file:"docs/product/calibration/"+m[2],blob:m[3],count:Number(m[4])});
 }
 fail(discovery.size===19,"L1 ledger owner count");
 const frozenTree=freeze(pinned(root,"ontology/l1-anchor-tree.json",L1_TREE_BLOB));
 keys(frozenTree,["format","commit","tree","paths"],"frozen L1 tree shape");
 fail(frozenTree.format==="audio-kg-frozen-anchor-tree/1"&&frozenTree.commit===p.authority.l1Commit&&frozenTree.tree===L1_TREE&&obj(frozenTree.paths),"frozen L1 tree identity");
 const anchorCache=new Map();
 function anchor(a,kind){
  keys(a,["commit","file","blob","line","row"],"anchor shape");
  fail(a.commit===p.authority.l1Commit&&sha.test(a.blob)&&Number.isSafeInteger(a.line)&&a.line>0&&token(a.row),"anchor identity");
  if(kind==="source")fail(/^docs\/research\/source-qualification-[a-z0-9-]+\.md$/.test(a.file),"source path");
  else fail(/^docs\/product\/calibration\/[a-z0-9-]+\.md$/.test(a.file),"case/discovery path");
  fail(Object.hasOwn(frozenTree.paths,a.file)&&frozenTree.paths[a.file]===a.blob,"anchor not in frozen L1 tree "+a.file);
  const k=a.file+"@"+a.blob;let lines=anchorCache.get(k);
  if(!lines){const bytes=safeRead(root,a.file);fail(gitBlob(bytes)===a.blob,"anchor blob "+a.file);lines=bytes.toString("utf8").split("\n");anchorCache.set(k,lines)}
  fail(lines[a.line-1]===a.row,"anchor row "+a.file+":"+a.line);
 }
 const history=new Map(),maxRevision=new Map(),priorSubjects=new Map(),priorSubjectOwners=new Map();
 if(priorRegistry!==null){
  keys(priorRegistry,["file","blob"],"prior registry descriptor");
  fail(/^(?:knowledge\/|tests\/knowledge\/fixtures\/)[A-Za-z0-9_.\/-]+\.json$/.test(priorRegistry.file),"prior registry path");
  const h=pinned(root,priorRegistry.file,priorRegistry.blob);
  keys(h,["format","status","records","subjects"],"prior registry shape");
  fail(h.format==="audio-kg-prior-identities/2"&&h.status==="EXTERNAL_IDENTITY_CHECKPOINT"&&obj(h.records)&&obj(h.subjects),"prior registry authority");
  for(const [id,digest] of Object.entries(h.records)){
   fail(rid.test(id)&&/^[a-f0-9]{64}$/.test(digest),"prior registry identity");
   const [stable,v]=id.split("@"),revision=Number(v);fail(Number.isSafeInteger(revision)&&revision>0,"prior revision");
   history.set(id,digest);maxRevision.set(stable,Math.max(maxRevision.get(stable)||0,revision));
  }
  for(const [id,q] of Object.entries(h.subjects)){
   keys(q,["kind","owner","digest"],"prior qualified subject shape");
   fail(history.has(id)&&["Source","Claim"].includes(q.kind)&&ownerRe.test(q.owner)&&/^[a-f0-9]{64}$/.test(q.digest),"prior qualified subject identity");
   const stable=id.split("@")[0],old=priorSubjectOwners.get(stable);
   fail(!old||(old.kind===q.kind&&old.owner===q.owner),"prior subject owner/type drift");
   priorSubjectOwners.set(stable,{kind:q.kind,owner:q.owner});
   priorSubjects.set(id,q);
  }
 }
 const records=new Map(),packs=[],allEdges=[],allBindings=[],sourceQual=new Map(),edgeQual=new Map(),obligations=[],inventory=[];
 const owned=new Map(),recordOwners=new Map(),formalK01Direct=new Map(),formalK02Direct=new Map();
 for(const e of entries){
  keys(e,["pack","manifest","manifestBlob"],"entry shape");
  fail(/^((knowledge\/K\d\d\/)|(tests\/knowledge\/fixtures\/))[A-Za-z0-9_.\/-]+\.json$/.test(e.pack),"pack path");
  fail(/^((knowledge\/K\d\d\/)|(tests\/knowledge\/fixtures\/))[A-Za-z0-9_.\/-]+\.json$/.test(e.manifest),"manifest path");
  const m=pinned(root,e.manifest,e.manifestBlob);
  keys(m,["format","owner","status","packBlob","sourceQualifications","edgeQualifications","obligations"],"qualification shape");
  fail(m.format==="audio-kg-qualification/1"&&m.status==="CANDIDATE_QUALIFICATION_ONLY"&&list(m.sourceQualifications)&&list(m.edgeQualifications)&&list(m.obligations),"qualification status/collections");
  const k=pinned(root,e.pack,m.packBlob);
  keys(k,["format","owner","coverageMode","inventory","records","edges","bindings"],"pack shape");
  fail(k.format==="audio-kg-candidate/1"&&ownerRe.test(k.owner)&&m.owner===k.owner&&!owned.has(k.owner),"owner authority");
  fail(k.coverageMode==="MODULE"||k.coverageMode==="FIXTURE_SUBSET"&&allowFixture,"fixture not formal module");
  if(k.coverageMode==="MODULE")fail(e.pack.startsWith("knowledge/"+k.owner+"/")&&e.manifest.startsWith("knowledge/"+k.owner+"/"),"formal owner path");
  if(k.coverageMode==="FIXTURE_SUBSET")fail(e.pack.startsWith("tests/knowledge/fixtures/")&&e.manifest.startsWith("tests/knowledge/fixtures/"),"fixture path");
  owned.set(k.owner,k);packs.push({owner:k.owner,coverageMode:k.coverageMode,packBlob:m.packBlob,manifestBlob:e.manifestBlob});
  fail(list(k.records)&&list(k.edges)&&list(k.bindings)&&list(k.inventory)&&k.inventory.length>0,"pack collections");
  for(const r of k.records){
   fail(obj(r)&&Object.hasOwn(p.recordFields,r.type),"record type");keys(r,p.recordFields[r.type],"record shape "+r.type);
   fail(/^[A-Z][A-Z0-9-]*$/.test(r.id)&&Number.isSafeInteger(r.revision)&&r.revision>0&&!records.has(ref(r)),"record identity");
   // Current finite profile has one selected revision per stable identity, no silent latest.
   fail(![...records.values()].some(v=>v.id===r.id),"multiple current revisions "+r.id);
   if(r.type!=="Source")fail(r.owner===k.owner&&r.id.startsWith(k.owner+"-"),"record owner");
   if(history.has(ref(r)))fail(history.get(ref(r))===recordDigest(r),"changed immutable prior revision "+ref(r));
   if(maxRevision.has(r.id))fail(r.revision>=maxRevision.get(r.id),"stale prior revision "+ref(r));
   records.set(ref(r),r);recordOwners.set(ref(r),k.owner);
  }
  for(const s of m.sourceQualifications){
   keys(s,["source","scope","limits","locatorKind","accessedUri"],"source qualification shape");
   fail(rid.test(s.source)&&token(s.scope)&&token(s.limits)&&token(s.locatorKind)&&token(s.accessedUri)&&!sourceQual.has(s.source),"source qualification identity");
   fail(k.records.some(r=>r.type==="Source"&&ref(r)===s.source),"source qualification not owned");
   sourceQual.set(s.source,s);
  }
  for(const q of m.edgeQualifications){
   keys(q,["edge","scope","limits"],"edge qualification shape");
   fail(token(q.edge)&&token(q.scope)&&token(q.limits)&&!edgeQual.has(q.edge)&&k.edges.some(e=>e.id===q.edge),"edge qualification identity");
   edgeQual.set(q.edge,q);
  }
  for(const o of m.obligations){
   keys(o,["edge","consumer","provider","condition","providerContext","group"],"H obligation shape");
   fail(k.edges.some(e=>e.id===o.edge)&&k.records.some(r=>r.type==="Claim"&&ref(r)===o.consumer),"required H obligation absent/owner");
   obligations.push(o);
  }
  const disc=discovery.get(k.owner);const bytes=safeRead(root,disc.file);
  fail(gitBlob(bytes)===disc.blob,"discovery frozen blob "+k.owner);
  const actual=new Map();bytes.toString("utf8").split("\n").forEach((row,i)=>{
   const m=row.match(/^\| (K\d\d\.\d\d\.\d\d\.\d\d) \|/);if(!m)return;
   actual.set(i+1,m[1]);
   // Only K01 formal MODULE has the qualified frozen mixed 6/7-column role shape.
   // A support role never becomes a direct CQ root, even under fresh candidate pins.
   if(k.owner==="K01"&&k.coverageMode==="MODULE"){
    const cols=row.split("|").slice(1,-1).map(x=>x.trim()),roles=cols[3];
    fail((cols.length===6||cols.length===7)&&/^CQ(?:0[1-9]|1[0-9]|2[0-6]) [DS](?:；CQ(?:0[1-9]|1[0-9]|2[0-6]) [DS])*$/.test(roles),"frozen K01 CQ role shape");
    const pairs=roles.split("；").map(x=>x.split(" "));unique(pairs.map(x=>x[0]),"duplicate frozen K01 CQ role");
    formalK01Direct.set(i+1,pairs.filter(x=>x[1]==="D").map(x=>x[0]).sort());
   }
   // K02 alone uses separate direct/support columns; em dash is the explicit no-D marker.
   // No inferred roles or generalized parsing for another owner's frozen format.
   if(k.owner==="K02"&&k.coverageMode==="MODULE"){
    const cols=row.split("|").slice(1,-1).map(x=>x.trim());
    fail(cols.length===5,"frozen K02 CQ role shape");
    const role=/^CQ(?:0[1-9]|1[0-9]|2[0-6])(?:\/CQ(?:0[1-9]|1[0-9]|2[0-6]))*$/;
    fail((cols[3]==="—"||role.test(cols[3]))&&(cols[4]==="—"||role.test(cols[4])),"frozen K02 CQ role shape");
    const d=cols[3]==="—"?[]:cols[3].split("/"),support=cols[4]==="—"?[]:cols[4].split("/");
    unique([...d,...support],"duplicate frozen K02 CQ role");fail(d.length+support.length>0,"empty frozen K02 roles");
    formalK02Direct.set(i+1,d.sort());
   }
  });
  fail(actual.size===disc.count,"discovery row count "+k.owner);
  const seen=new Set();
  for(const row of k.inventory){
   keys(row,["line","d4","disposition","claimRefs","reason"],"inventory row shape");
   fail(actual.get(row.line)===row.d4&&row.d4.startsWith(k.owner+".")&&!seen.has(row.line)&&p.dispositions.includes(row.disposition)&&list(row.claimRefs)&&token(row.reason),"inventory disposition identity");
   seen.add(row.line);unique(row.claimRefs,"duplicate inventory ref");
   fail(row.disposition==="CANDIDATE"?row.claimRefs.length>0:row.claimRefs.length===0,"unresolved row cannot admit claim");
   inventory.push({...row,owner:k.owner,discovery:{file:disc.file,blob:disc.blob,line:row.line}});
  }
  if(k.coverageMode==="MODULE")fail(seen.size===actual.size,"incomplete formal inventory "+k.owner);
  for(const edge of k.edges){keys(edge,["id","type","from","to","condition"],"edge shape");fail(token(edge.id)&&edge.id.startsWith(k.owner+"-")&&k.records.some(r=>r.type==="Claim"&&ref(r)===edge.from),"edge owner");allEdges.push(edge)}
  for(const binding of k.bindings){keys(binding,["id","view","claim","role","condition"],"binding shape");fail(token(binding.id)&&binding.id.startsWith(k.owner+"-")&&k.records.some(r=>r.type==="CaseView"&&ref(r)===binding.view),"binding owner");allBindings.push(binding)}
 }
 const get=(id,type)=>{const r=records.get(id);fail(r?.type===type,"missing or wrong exact ref "+id+" "+type);return r};
 const rowsByClaim=new Map();
 for(const row of inventory){
  for(const id of row.claimRefs){const c=get(id,"Claim");fail(c.owner===row.owner&&c.d4===row.d4,"inventory owner/claim mismatch");rowsByClaim.set(id,true);}
  if(row.owner==="K01"&&owned.get("K01").coverageMode==="MODULE"&&row.disposition==="CANDIDATE"){
   const expected=formalK01Direct.get(row.line),actual=new Set();
   fail(list(expected),"missing frozen K01 CQ role");
   for(const id of row.claimRefs){const cq=get(id,"Claim").cq;fail(list(cq)&&cq.every(x=>expected.includes(x)),"K01 CQ not frozen direct role "+id);for(const x of cq)actual.add(x);}
   fail(equal([...actual].sort(),expected),"K01 candidate row missing frozen direct CQ "+row.d4);
  }
  if(row.owner==="K02"&&owned.get("K02").coverageMode==="MODULE"&&row.disposition==="CANDIDATE"){
   const expected=formalK02Direct.get(row.line),actual=new Set();
   fail(list(expected),"missing frozen K02 CQ role");
   for(const id of row.claimRefs){const cq=get(id,"Claim").cq;fail(list(cq)&&cq.every(x=>expected.includes(x)),"K02 CQ not frozen direct role "+id);for(const x of cq)actual.add(x);}
   fail(equal([...actual].sort(),expected),"K02 candidate row missing frozen direct CQ "+row.d4);
  }
 }
 for(const [id,r] of records){
  if(r.type==="Source"){
   fail(/^S\d+$/.test(r.sourceId)&&r.id===r.sourceId&&[r.title,r.author,r.version,r.publicationDate,r.accessDate,r.uri,r.locator].every(token)&&p.sourceGrades.includes(r.grade)&&r.rights==="UNKNOWN_NO_IMPORT","source metadata");
   anchor(r.anchor,"source");fail(new RegExp("(^|[^A-Z0-9])"+r.sourceId+"([^0-9]|$)").test(r.anchor.row),"source anchor id");
   const urls=[...r.anchor.row.matchAll(/\((https?:\/\/[^)\s]+)\)/g)].map(m=>m[1]);
   const q=sourceQual.get(id);fail(q&&urls.includes(r.uri)&&(q.accessedUri==="UNKNOWN"||urls.includes(q.accessedUri)),"source exact URI/qualification");
   if(r.grade==="READ_LOCATOR")fail(/READ_LOCATOR|重读|已读|实际阅读/.test(r.anchor.row),"unsupported source grade");
  }else if(r.type==="Context")fail(token(r.condition),"context");
  else if(r.type==="Claim"){
   fail(d4.test(r.d4)&&r.d4.startsWith(r.owner+".")&&r.status==="CANDIDATE"&&p.claimKinds.includes(r.kind)&&token(r.statement)&&token(r.limits)&&list(r.cq)&&(r.cq.length>0||(["K01","K02"].includes(r.owner)&&owned.get(r.owner).coverageMode==="MODULE"))&&r.cq.every(x=>/^CQ(?:0[1-9]|1[0-9]|2[0-6])$/.test(x))&&rowsByClaim.has(id),"claim scope/status");
   unique(r.cq,"duplicate CQ");fail(get(r.context,"Context").owner===r.owner,"claim context owner");
  }else if(r.type==="Evidence"){
   fail(r.kind==="L1_RESEARCH_LOCATOR"&&token(r.limits)&&list(r.sources)&&r.sources.length>0,"evidence kind");
   anchor(r.anchor,"case");unique(r.sources,"duplicate source refs");
   for(const s of r.sources){const sr=get(s,"Source");fail(new RegExp("(^|[^A-Z0-9])"+sr.sourceId+"([^0-9]|$)").test(r.anchor.row),"evidence-source locator mismatch")}
  }else if(r.type==="CaseGroup"){
   const c=get(r.claim,"Claim");fail(r.kind==="SYNTHETIC"&&c.owner===r.owner&&c.d4===r.d4,"group target");
  }else if(r.type==="CaseView"){
   const g=get(r.group,"CaseGroup"),c=get(g.claim,"Claim");fail(g.owner===r.owner&&r.context===c.context&&["FORWARD","REVERSE"].includes(r.direction)&&["POSITIVE","NEGATIVE","BOUNDARY","UNKNOWN"].includes(r.polarity)&&token(r.question)&&obj(r.example)&&token(r.explanation)&&token(r.limits)&&r.evidenceKind==="SYNTHETIC_EXPECTED_NOT_OBSERVED","case view");
  }
 }
 unique(allEdges.map(e=>e.id),"duplicate edge id");unique(allEdges.map(e=>JSON.stringify([e.type,e.from,e.to,e.condition])),"duplicate relation");
 const deps=new Map(),byClaim=new Map(),byView=new Map(),groupByClaim=new Map();
 for(const [id,r] of records)if(r.type==="CaseGroup"){if(!groupByClaim.has(r.claim))groupByClaim.set(r.claim,[]);groupByClaim.get(r.claim).push(id)}
 for(const e of allEdges){
  const rule=p.relations[e.type];fail(Object.hasOwn(p.relations,e.type)&&rule,"unsupported relation");
  const from=get(e.from,rule.from),to=get(e.to,rule.to);get(e.condition,"Context");
  fail(e.from!==e.to&&e.condition===from.context&&edgeQual.has(e.id),"relation scope/self");
  if(e.type==="applies_under")fail(e.to===from.context,"applicability context");
  if(e.type==="supported_by")fail(to.owner===from.owner&&to.anchor.row.split(/[^A-Z0-9.]+/).includes(from.d4),"support predicate/owner");
  if(e.type==="requires"){if(!deps.has(e.from))deps.set(e.from,[]);deps.get(e.from).push(e);}
 }
 for(const [id,r] of records)if(r.type==="Claim"){
  const es=allEdges.filter(e=>e.from===id);fail(es.some(e=>e.type==="supported_by")&&es.filter(e=>e.type==="applies_under").length===1&&groupByClaim.has(id),"required claim support/context/case");
 }
 const seen=new Set(),active=new Set();
 function cycle(id){fail(!active.has(id),"required dependency cycle");if(seen.has(id))return;active.add(id);for(const e of deps.get(id)||[])cycle(e.to);active.delete(id);seen.add(id);}
 for(const id of deps.keys())cycle(id);
 unique(allBindings.map(b=>b.id),"duplicate binding id");unique(allBindings.map(b=>JSON.stringify([b.view,b.claim,b.role,b.condition])),"duplicate binding");
 for(const b of allBindings){
  const v=get(b.view,"CaseView"),c=get(b.claim,"Claim"),g=get(v.group,"CaseGroup");get(b.condition,"Context");
  fail(p.bindingRoles.includes(b.role)&&b.condition===v.context,"binding role/condition");
  if(b.role==="PRIMARY_TARGET")fail(g.claim===b.claim&&g.d4===c.d4&&g.owner===c.owner,"primary binding target");
  else fail((deps.get(g.claim)||[]).some(e=>e.to===b.claim&&e.condition===b.condition),"unqualified supporting binding");
  for(const [idx,id] of [[byClaim,b.claim],[byView,b.view]]){if(!idx.has(id))idx.set(id,[]);idx.get(id).push(b)}
 }
 for(const [id,r] of records){
  if(r.type==="CaseView")fail((byView.get(id)||[]).filter(b=>b.role==="PRIMARY_TARGET").length===1,"missing/duplicate primary");
  if(r.type==="CaseGroup"){
   const views=[...records.values()].filter(v=>v.type==="CaseView"&&v.group===id);
   for(const [d,q] of p.coreViews)fail(views.some(v=>v.direction===d&&v.polarity===q),"missing core case view "+id);
  }
 }
 unique(obligations.map(o=>JSON.stringify([o.edge,o.group])),"duplicate H obligation");
 for(const e of allEdges.filter(e=>e.type==="requires")){
  for(const group of groupByClaim.get(e.from)||[])fail(obligations.some(o=>o.edge===e.id&&o.group===group),"H without scoped obligation");
 }
 for(const o of obligations){
  const e=allEdges.find(e=>e.id===o.edge);
  const a=get(o.consumer,"Claim"),b=get(o.provider,"Claim"),g=get(o.group,"CaseGroup");
  fail(e?.type==="requires"&&e.from===o.consumer&&e.to===o.provider&&e.condition===o.condition&&a.context===o.condition&&b.context===o.providerContext&&g.claim===o.consumer,"H obligation mismatch");
  const vs=[...records.values()].filter(v=>v.type==="CaseView"&&v.group===o.group);
  fail(vs.length>0&&vs.every(v=>(byView.get(ref(v))||[]).some(x=>x.claim===o.provider&&x.role==="REQUIRES"&&x.condition===o.condition)),"mandatory supporting view missing");
 }
 // Bind semantic qualification to the exact subject revision, independently of the
 // freshly pinned candidate manifest. Stable records alone are insufficient.
 // Incoming navigation is derived and does not mutate a provider's outgoing identity.
 // Sorted sets make semantically irrelevant input ordering independent of qualification.
 const sorted=xs=>[...xs].sort((a,b)=>{const x=canonical(a),y=canonical(b);return x<y?-1:x>y?1:0});
 function subjectIdentity(id,r){
  if(r.type==="Source")return {kind:"Source",owner:recordOwners.get(id),digest:recordDigest({subject:id,qualification:sourceQual.get(id)})};
  const groups=groupByClaim.get(id)||[],groupSet=new Set(groups);
  const views=[...records.entries()].filter(([,v])=>v.type==="CaseView"&&groupSet.has(v.group)).map(([v])=>v);
  const viewSet=new Set(views);
  const semantic={subject:id,edges:sorted(allEdges.filter(e=>e.from===id).map(e=>({edge:e,qualification:edgeQual.get(e.id)}))),groups:sorted(groups),views:sorted(views),bindings:sorted(allBindings.filter(b=>viewSet.has(b.view))),obligations:sorted(obligations.filter(o=>o.consumer===id))};
  return {kind:"Claim",owner:r.owner,digest:recordDigest(semantic)};
 }
 const currentSubjects=new Map();
 for(const [id,r] of records){
  if(r.type!=="Source"&&r.type!=="Claim")continue;
  const q=subjectIdentity(id,r),previous=priorSubjects.get(id),stable=priorSubjectOwners.get(r.id);
  if(maxRevision.has(r.id))fail(stable,"missing prior qualified subject checkpoint "+r.id);
  if(stable)fail(q.kind===stable.kind&&q.owner===stable.owner,"qualified subject owner/type changed "+id);
  if(history.has(id))fail(previous&&q.kind===previous.kind&&q.owner===previous.owner&&q.digest===previous.digest,"changed immutable prior qualification/relationship subject "+id);
  currentSubjects.set(r.id,id);
 }
 // No disappearance of previously qualified subjects in a selected owner scope.
 // An explicit retirement/invalidation contract is not implemented by this finite profile.
 // A scoped reader may omit other owner packs, but not hide subjects in loaded owners.
 for(const [stable,q] of priorSubjectOwners){
  if(owned.has(q.owner))fail(currentSubjects.has(stable),"missing prior qualified subject "+stable);
  const latest=stable+"@"+maxRevision.get(stable);
  fail(priorSubjects.has(latest),"incomplete prior qualified subject checkpoint "+latest);
 }
 const ctx=id=>({ref:id,condition:get(id,"Context").condition});
 const describeEdge=(e,direction)=>({...e,direction,condition:ctx(e.condition),...(records.get(e.to)?.type==="Claim"?{targetContext:ctx(records.get(e.to).context)}:{}),required:e.type==="requires",logicalConverse:false,meaning:p.relations[e.type].meaning,qualification:edgeQual.get(e.id)});
 const describeSource=id=>({...get(id,"Source"),qualification:sourceQual.get(id)});
 const describeClaim=(id,rootIds)=>{
  const c=get(id,"Claim");
  return {...c,ref:id,selection:rootIds.includes(id)?"QUERY_ROOT":"REQUIRED_SUPPORT",context:ctx(c.context),applicability:"CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL",
   evidence:allEdges.filter(e=>e.type==="supported_by"&&e.from===id).map(e=>{const x=get(e.to,"Evidence");return {...x,relation:describeEdge(e,"OUTGOING"),sources:x.sources.map(describeSource)}}),
   relations:allEdges.filter(e=>e.from===id).map(e=>describeEdge(e,"OUTGOING")),
   incomingNavigation:allEdges.filter(e=>e.to===id&&["requires","references"].includes(e.type)).map(e=>describeEdge(e,"INCOMING_LOOKUP_ONLY")),
   cases:(byClaim.get(id)||[]).map(b=>({binding:{...b,condition:ctx(b.condition)},view:get(b.view,"CaseView")}))
  };
 };
 const summary=freeze({status:"CANDIDATE_STRUCTURE_ONLY",packs,counts:{records:records.size,claims:[...records.values()].filter(x=>x.type==="Claim").length,edges:allEdges.length,bindings:allBindings.length,inventory:inventory.length},unresolved:inventory.filter(x=>x.disposition!=="CANDIDATE"),acceptedClaims:0});
 // Expose only detached JSON values. No Map, mutable profile, manifest or internal input references.
 return Object.freeze({
  summary:()=>copy(summary),
  retrieve(query){
   fail(token(query),"query");
   const roots=[...records.values()].filter(x=>x.type==="Claim"&&(ref(x)===query||x.d4===query||x.cq.includes(query))).map(ref);
   const selected=new Set();function walk(id){if(selected.has(id))return;selected.add(id);for(const e of deps.get(id)||[])walk(e.to);}
   roots.forEach(walk);
   return copy({status:"CANDIDATE_STRUCTURE_ONLY",dependencyState:roots.length?"QUALIFIED_STRUCTURE_ONLY":"UNKNOWN_NO_MATCH",rootIds:roots,claims:[...selected].map(id=>describeClaim(id,roots)),unresolved:inventory.filter(r=>r.disposition!=="CANDIDATE"&&r.d4===query),acceptedClaims:0});
  },
  caseToClaims(viewRef){get(viewRef,"CaseView");return copy((byView.get(viewRef)||[]).map(b=>({...b,condition:ctx(b.condition)})))}
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{
  // CLI receives trusted expected manifest blobs as explicit task/review inputs. No discovery of trust from data.
  const [indexPath,expectedIndexBlob,query]=process.argv.slice(2);fail(indexPath&&sha.test(expectedIndexBlob||"")&&process.argv.length<=5,"usage: node tools/validate-knowledge.mjs <controller-input.json> <expected-controller-blob> [exact query]");
  const root=fs.realpathSync(process.cwd()), index=pinned(root,indexPath,expectedIndexBlob);
  keys(index,["entries","allowFixture","priorRegistry"],"controller input shape");
  const reader=openCandidateReader(root,index.entries,{allowFixture:index.allowFixture,priorRegistry:index.priorRegistry});
  console.log(JSON.stringify(query?reader.retrieve(query):reader.summary(),null,2));
 }catch(e){console.error("REJECTED: "+e.message);process.exitCode=1;}
}
