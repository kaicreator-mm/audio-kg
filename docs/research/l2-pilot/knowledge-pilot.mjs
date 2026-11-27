// T05 bounded research validator; no production authority or actual tool calls.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const root=process.cwd(), dir="docs/research/l2-pilot/";
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
const profile=json(dir+"semantic-profile.json");
insist(profile.version==="audio-kg-l2-profile/1"&&profile.status==="CANDIDATE_RESEARCH_ONLY","schema profile identity");
const sourceFields=profile.knowledge.records.Source.required;
const recordFields=Object.fromEntries(Object.entries(profile.knowledge.records).filter(([k])=>k!=="Source").map(([k,v])=>[k,[...v.required,...v.optional]]));
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
  insist(o.registration.row.includes(o.id)&&o.registration.row.includes(o.uri)&&profile.knowledge.sourceGrades.includes(o.grade)&&o.rights===profile.knowledge.rights&&nonempty(o.locator)&&nonempty(o.title)&&nonempty(o.version)&&nonempty(o.author)&&nonempty(o.publicationDate)&&nonempty(o.accessDate),"source qualification");
  // Exact source row is preserved. A limited registration cannot be promoted to read locator.
  insist(o.grade==="REGISTERED_LIMITED"||o.registration.row.includes("READ_LOCATOR")||o.registration.row.includes("重读"),"source grade escalation");
 }
 for(const [key,type] of Object.entries(profile.knowledge.collections)){
  insist(list(p[key])&&p[key].length>0,"missing collection "+key);
  for(const o of p[key]){fields(o,recordFields[type],profile.knowledge.records[type].required);add(o,type);}
 }
 for(const o of p.contexts)insist(nonempty(o.condition),"empty context");
 for(const o of p.evidence){
  anchor(o.anchor);if(o.caseAnchor)anchor(o.caseAnchor);
  insist(o.kind==="L1_RESEARCH_LOCATOR"&&list(o.sources)&&o.sources.length&&new Set(o.sources).size===o.sources.length&&nonempty(o.limits),"evidence qualification");
  for(const x of o.sources){const src=ref(x,"Source");insist(o.anchor.row.includes(src.id)||(o.caseAnchor&&o.caseAnchor.row.includes(src.id)),"source not linked to predicate");}
 }
 for(const o of p.claims){
  insist(d4.test(o.d4)&&o.owner===o.d4.slice(0,3)&&o.topic===o.d4.slice(0,-3)&&nonempty(o.statement)&&nonempty(o.limits)&&o.status==="CANDIDATE"&&o.review==="L1_SCOPED_RESEARCH_NOT_CLAIM_ADMISSION"&&profile.knowledge.claimKinds.includes(o.kind)&&list(o.cq)&&o.cq.length&&o.cq.every(x=>cq.test(x))&&!targets.has(o.d4),"claim owner/target/status");
  targets.add(o.d4);ref(o.context,"Context");
 }
 for(const o of p.groups)insist(d4.test(o.d4)&&o.owner===o.d4.slice(0,3)&&o.topic===o.d4.slice(0,-3)&&o.kind==="SYNTHETIC"&&o.status==="CANDIDATE"&&targets.has(o.d4),"case group");
 for(const o of p.views){
  ref(o.group,"CaseGroup");ref(o.context,"Context");
  insist(["FORWARD","REVERSE"].includes(o.direction)&&["POSITIVE","NEGATIVE","BOUNDARY","UNKNOWN"].includes(o.polarity)&&nonempty(o.question)&&nonempty(o.limit)&&nonempty(o.explanation)&&o.example&&typeof o.example==="object"&&o.evidenceKind==="SYNTHETIC_EXPECTED_NOT_OBSERVED","view contract");
 }
 // This pilot implements the relationship subset actually exercised; the rest of the design is not claimed executable.
 const relationship=Object.fromEntries(Object.entries(profile.knowledge.relationshipTypes).map(([k,v])=>[k,[v.from,v.to]]));
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
  fields(b,["id","view","claim","role","condition"]);insist(nonempty(b.id)&&!bindIds.has(b.id)&&profile.knowledge.binding.roles.includes(b.role),"binding role/id");bindIds.add(b.id);
  const k=canon([b.view,b.claim,b.role,b.condition]);insist(!bindKeys.has(k),"duplicate binding");bindKeys.add(k);
  const v=ref(b.view,"CaseView"),c=ref(b.claim,"Claim"),g=ref(v.group,"CaseGroup");ref(b.condition,"Context");insist(b.condition===v.context,"binding context");
  if(b.role==="PRIMARY_TARGET")insist(g.d4===c.d4&&g.owner===c.owner&&v.context===c.context,"primary mismatch");
  else insist(p.edges.some(e=>e.type==="requires"&&e.to===b.claim&&e.from===idref(p.claims.find(x=>x.d4===g.d4))&&e.condition===v.context),"unsupported cross-binding");
  for(const [idx,x] of [[byClaim,b.claim],[byView,b.view]]){if(!idx.has(x))idx.set(x,[]);idx.get(x).push(b);}
 }
 for(const v of p.views)insist((byView.get(idref(v))||[]).filter(b=>b.role==="PRIMARY_TARGET").length===profile.knowledge.binding.primaryPerView,"view must have one primary");
 for(const g of p.groups){const vs=p.views.filter(v=>v.group===idref(g));for(const [d,q] of profile.knowledge.binding.views)insist(vs.some(v=>v.direction===d&&v.polarity===q),"missing view "+g.id+" "+d+" "+q);}
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
const cents=(a,b)=>1200*(Math.log2(a)-Math.log2(b));
function evaluate(op,x){
 if(op==="cents")return positive(x.reference)&&positive(x.observed)?{state:"VALUE",cents:cents(x.observed,x.reference)}:{state:"UNKNOWN"};
 if(op==="pitch"){
  const interval=x=>Array.isArray(x)&&x.length===2&&x.every(Number.isFinite)&&x[1]>x[0];
  if(x.valid!==true||!nonempty(x.identity)||x.estimateIdentity!==x.identity||!positive(x.estimate)||!nonempty(x.clock)||x.estimateClock!==x.clock||!interval(x.window)||!eq(x.estimateWindow,x.window)||x.estimateKind!=="SYNTH-ESTIMATOR")return {state:"UNKNOWN_WINDOW"};
  if(positive(x.reference)&&(x.referenceIdentity!==x.identity||x.referenceClock!==x.clock||!eq(x.referenceWindow,x.window)||x.referenceKind!=="INDEPENDENT-SYNTH-REF"))return {state:"UNKNOWN_WINDOW"};
  const haveR=positive(x.reference),haveT=positive(x.target);
  return {state:haveR?(haveT?"VALUE":"UNKNOWN_TARGET"):"UNKNOWN_REFERENCE",estimateError:haveR?cents(x.estimate,x.reference):null,actualGoalError:haveR&&haveT?cents(x.reference,x.target):null,estimatedGoalError:haveT?cents(x.estimate,x.target):null};
 }
 if(op==="window")return x.realInput===true&&x.oneSided===true&&positive(x.fs)&&Number.isSafeInteger(x.win)&&Number.isSafeInteger(x.nfft)&&x.win>0&&x.nfft>=x.win?{state:"VALUE",seconds:x.win/x.fs,gridHz:x.fs/x.nfft,bins:Math.floor(x.nfft/2)+1}:{state:"UNKNOWN"};
 if(op==="reverseGrid"){const n=x.fs/x.gridHz;return positive(x.fs)&&positive(x.gridHz)&&Number.isSafeInteger(n)&&n>0?{state:"PARTIAL",nfft:n,win:null}:{state:"UNKNOWN"};}
 throw Error("unsupported query");
}
function retrieve(p,s,query){
 const idx=validate(p,s);let cs=p.claims.filter(c=>c.cq.includes(query)||idref(c)===query||c.d4===query);
 const out=cs.map(c=>({id:idref(c),d4:c.d4,owner:c.owner,statement:c.statement,status:c.status,limits:c.limits,context:idx.map.get(c.context).condition,evidence:p.edges.filter(e=>e.from===idref(c)&&e.type==="supported_by").map(e=>{const ev=idx.map.get(e.to);return {anchor:ev.anchor,sources:ev.sources.map(x=>{const t=idx.map.get(x);return {id:idref(t),uri:t.uri,locator:t.locator,grade:t.grade,rights:t.rights};})};}),cases:(idx.byClaim.get(idref(c))||[]).map(b=>{const v=idx.map.get(b.view);return {id:idref(v),role:b.role,direction:v.direction,polarity:v.polarity,question:v.question,example:v.example,explanation:v.explanation,limit:v.limit,evidenceKind:v.evidenceKind};})}));
 return {status:"RESEARCH_ONLY",claims:out};
}
function route(p,old){const m=p.migrations.find(x=>x.old===old);return !m?{state:"UNKNOWN"}:m.type==="alias_of"?{state:"REQUIREMENT_LOOKUP_ONLY",target:m.targets[0].d4}:{state:"SPLIT_OPEN",targets:m.targets,wholeSlotEquivalent:false};}
function close(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=1e-9;if(a&&b&&typeof a==="object"&&typeof b==="object"){let ka=Object.keys(a).sort(),kb=Object.keys(b).sort();return eq(ka,kb)&&ka.every(k=>close(a[k],b[k]));}return a===b;}

export {read,json,clone,canon,eq,blob,insist,idref,validate,evaluate,retrieve,route,close,dir,profile};
