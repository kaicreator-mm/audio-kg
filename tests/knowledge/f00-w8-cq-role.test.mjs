import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {openCandidateReader,gitBlob} from '../../tools/validate-knowledge.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const results=[],test=(n,f)=>{f();results.push([n,true]);};
const specs={K12:['tools-orchestration','TO',54,0,0],K13:['localization','LA',20,0,0],K18:['sound-design','SD',44,26,9],K19:['live-sound','LS',40,17,12]};
function matrix(m){
 const [stem,prefix,count]=specs[m],lines=fs.readFileSync('docs/product/calibration/'+stem+'-r3-discovery-cq.md','utf8').split('\n');
 const cases=new Map(),D=new Map(),S=new Map(),O=[],seen=new Set();
 for(const l of lines.filter(x=>x.startsWith('| '+m+'.'))){
  const c=l.split('|').slice(1,-1).map(x=>x.trim()),match=c[1].match(new RegExp('\\[('+prefix+'\\d+)/('+m+'\\.\\d{2}\\.\\d{2}\\.\\d{2})\\]'));
  assert.ok(match);assert.equal(c[0],match[2]);assert.ok(!cases.has(match[1]));cases.set(match[1],match[2]);D.set(match[2],[]);S.set(match[2],[]);
 }
 for(const l of lines.filter(x=>/^\| CQ\d{2} \|/.test(x))){
  const [q,role,a,b]=l.split('|').slice(1,-1).map(x=>x.trim()),targets=['K12','K13'].includes(m)?a:b;
  assert.ok(!seen.has(q));seen.add(q);
  const ids=[...targets.matchAll(new RegExp('\\[('+prefix+'\\d+)/('+m+'\\.\\d{2}\\.\\d{2}\\.\\d{2})\\]\\(([^)]+)\\)','g'))];
  if(role==='O'){assert.equal(ids.length,0);O.push(q);continue;}
  const map=role==='D'?D:S;
  assert.ok(['D','S'].includes(role));
  if(targets.includes('上表全部'+count)){assert.equal(role,'S');assert.equal(ids.length,0);for(const d of cases.values())map.get(d).push(q);continue;}
  assert.ok(ids.length);
  for(const x of ids){
   assert.equal(cases.get(x[1]),x[2]);
   const r=read('cases/'+m+'/frozen-input-ledger.json').rows.find(r=>r.caseId===x[1]);
   assert.equal(x[3],path.basename(r.caseAnchor.file)+'#L'+r.caseAnchor.line);
   assert.ok(!map.get(x[2]).includes(q));map.get(x[2]).push(q);
  }
 }
 assert.equal(cases.size,count);assert.equal(seen.size,26);
 return {D,S,O};
}
for(const m of Object.keys(specs)){
 const maps=matrix(m),l=read('cases/'+m+'/frozen-input-ledger.json'),input=read('knowledge/'+m+'/controller-input.json'),reader=openCandidateReader(process.cwd(),input.entries,{allowFixture:false,priorRegistry:null});
 test(m+' exact direct support optional frozen role map and all query roots',()=>{
  assert.equal(l.rows.length,specs[m][2]);assert.equal(l.rows.filter(r=>!r.directCQ.length).length,specs[m][3]);assert.equal(l.rows.filter(r=>!r.directCQ.length&&r.supportCQ.length).length,specs[m][4]);
  for(const r of l.rows){assert.deepEqual(r.directCQ,maps.D.get(r.d4).sort());assert.deepEqual(r.supportCQ,maps.S.get(r.d4).sort());}
  for(let i=1;i<=26;i++){
   const q='CQ'+String(i).padStart(2,'0');
   assert.deepEqual(reader.retrieve(q).rootIds.filter(x=>x.startsWith(m+'-')).sort(),l.rows.filter(r=>maps.D.get(r.d4).includes(q)).map(r=>m+'-CL-'+r.caseId+'@1').sort());
  }
  assert.deepEqual(read('queries/'+m+'/cq-index.json').questions.filter(q=>q.type==='O').map(q=>q.id).sort(),maps.O.sort());
  assert.equal(reader.summary().acceptedClaims,0);
 });
}
function mutate(m,row,ids){
 const input=read('knowledge/'+m+'/controller-input.json'),entry=input.entries.find(e=>e.pack==='knowledge/'+m+'/candidate.json'),p=read(entry.pack),man=read(entry.manifest);
 p.records.find(r=>r.type==='Claim'&&r.d4===row.d4).cq=ids;
 const dir=fs.mkdtempSync(path.join(process.cwd(),'knowledge',m,'.f00-w8-'));
 try{
  const pp=path.relative(process.cwd(),path.join(dir,'candidate.json')),mp=path.relative(process.cwd(),path.join(dir,'qualification.json'));
  const pb=Buffer.from(JSON.stringify(p,null,2)+'\n');man.packBlob=gitBlob(pb);const mb=Buffer.from(JSON.stringify(man,null,2)+'\n');
  fs.writeFileSync(pp,pb);fs.writeFileSync(mp,mb);
  const entries=input.entries.map(e=>e.pack===entry.pack?{...e,pack:pp,manifest:mp,manifestBlob:gitBlob(mb)}:e);
  assert.throws(()=>openCandidateReader(process.cwd(),entries,{allowFixture:false,priorRegistry:null}),/claim CQ does not match frozen direct role/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
for(const m of Object.keys(specs)){
 const l=read('cases/'+m+'/frozen-input-ledger.json'),nonempty=l.rows.find(r=>r.directCQ.length);
 test(m+' arbitrary empty direct CQ refused',()=>mutate(m,nonempty,[]));
 const row=l.rows.find(r=>!r.directCQ.length&&r.supportCQ.length);
 if(row)test(m+' support-only CQ promotion refused',()=>mutate(m,row,[row.supportCQ[0]]));
 const none=l.rows.find(r=>!r.directCQ.length&&!r.supportCQ.length);
 if(none)test(m+' targetless direct invention refused',()=>mutate(m,none,['CQ01']));
}
console.log(JSON.stringify({passed:results.length,results},null,2));
