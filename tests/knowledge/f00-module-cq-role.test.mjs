import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import {openCandidateReader,gitBlob,extractMarkdownUrls} from '../../tools/validate-knowledge.mjs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const equal=(a,b)=>assert.deepEqual(a,b);
const results=[];
const test=(name,fn)=>{fn();results.push([name,true]);};
function parseK10(path){
 const direct=new Map(),support=new Map();
 for(const line of fs.readFileSync(path,'utf8').split('\n')){
  if(!line.startsWith('| K10.'))continue;
  const c=line.split('|').slice(1,-1).map(x=>x.trim());
  assert.ok(c.length>=6);
  direct.set(c[0],[...c[4].matchAll(/CQ(?:0[1-9]|1[0-9]|2[0-6])/g)].map(x=>x[0]).sort());
  support.set(c[0],[...c[5].matchAll(/CQ(?:0[1-9]|1[0-9]|2[0-6])/g)].map(x=>x[0]).sort());
 }
 return {direct,support};
}
function parseK15(path){
 const direct=new Map(),support=new Map(),optional=[],d4s=[];
 for(const line of fs.readFileSync(path,'utf8').split('\n')){
  if(line.startsWith('| K15.')){
   const c=line.split('|').slice(1,-1).map(x=>x.trim());
   if(c[0]?.startsWith('K15.'))d4s.push(c[0]);
  }
 }
 for(const d of d4s)direct.set(d,[]);
 for(const line of fs.readFileSync(path,'utf8').split('\n')){
  if(!/^\|\s*CQ(?:0[1-9]|1[0-9]|2[0-6])\s*\|/.test(line))continue;
  const c=line.split('|').slice(1,-1).map(x=>x.trim());
  assert.ok(['D','S','O'].includes(c[1]));
  if(c[1]==='O'){
   assert.equal(c[2],'—','optional CQ must not carry direct/support targets');
   optional.push(c[0]);
   continue;
  }
  const map=c[1]==='D'?direct:support;
  for(const match of c[2].matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)){
   const d=match[1].match(/K15\.\d{2}\.\d{2}\.\d{2}/)?.[0];
   if(!d)continue;
   if(!map.has(d))map.set(d,[]);
   map.get(d).push(c[0]);
  }
 }
 for(const map of [direct,support])for(const [d,ids] of map)map.set(d,[...new Set(ids)].sort());
 return {direct,support,optional:optional.sort()};
}
for(const m of ['K10','K15']){
 const path=m==='K10'?'docs/product/calibration/evaluation-r3-discovery-cq.md':'docs/product/calibration/production-governance-r3-discovery-cq.md';
 const matrix=m==='K10'?parseK10(path):parseK15(path);
 const ledger=read('cases/'+m+'/frozen-input-ledger.json');
 const input=read('knowledge/'+m+'/controller-input.json');
 const reader=openCandidateReader(process.cwd(),input.entries,{allowFixture:false,priorRegistry:null});
 test(m+' frozen D/S role mapping matches all module D4 rows',()=>{
  assert.equal(ledger.rows.length,m==='K10'?54:48);
  for(const r of ledger.rows){
   equal([...r.directCQ].sort(),matrix.direct.get(r.d4)||[]);
   equal([...r.supportCQ].sort(),matrix.support.get(r.d4)||[]);
  }
 });
 test(m+' direct CQ retrieval never promotes support-only assignments',()=>{
  for(const r of ledger.rows){
   const id=m+'-CL-'+r.caseId+'@1';
   const claim=reader.retrieve(id).claims.find(x=>x.ref===id);
   assert.ok(claim);
   equal([...claim.cq].sort(),[...(matrix.direct.get(r.d4)||[])]);
   for(const cq of (matrix.support.get(r.d4)||[])){
    if((matrix.direct.get(r.d4)||[]).includes(cq))continue;
    assert.ok(!reader.retrieve(cq).rootIds.includes(id),id+' leaked through support '+cq);
   }
  }
 });
 test(m+' all 26 CQ result sets equal frozen direct assignments',()=>{
  for(let n=1;n<=26;n++){
   const cq='CQ'+String(n).padStart(2,'0');
   const expected=ledger.rows.filter(r=>(matrix.direct.get(r.d4)||[]).includes(cq)).map(r=>m+'-CL-'+r.caseId+'@1').sort();
   const actual=reader.retrieve(cq).rootIds.filter(x=>x.startsWith(m+'-')).sort();
   equal(actual,expected);
  }
 });
 if(m==='K15')test('K15 optional O rows remain navigation-only and targetless',()=>{
  const index=read('queries/K15/cq-index.json');
  const optional=index.questions.filter(q=>q.type==='O').map(q=>q.id).sort();
  equal(optional,matrix.optional);
  assert.ok(index.questions.filter(q=>q.type==='O').every(q=>q.question==='—'));
 });
}

const w6Specs={
 K11:{path:'docs/product/calibration/ai-models-r3-discovery-cq.md',prefix:'AM',rows:60,empty:1,supportOnly:1,roles:70,roleCounts:{P:68,S:2},sources:24,H:30,O:57,legacy:60,migration:60,splits:0,integrated:5,historical:55,records:504,bindings:360},
 K16:{path:'docs/product/calibration/musicology-r3-discovery-cq.md',prefix:'MU',rows:42,empty:23,supportOnly:12,roles:49,roleCounts:{P:35,S:7,C:7},sources:16,H:4,O:40,legacy:42,migration:42,splits:16,integrated:6,historical:68,records:352,bindings:184},
 K17:{path:'docs/product/calibration/music-cognition-r3-discovery-cq.md',prefix:'MC',rows:30,empty:13,supportOnly:12,roles:49,roleCounts:{P:35,S:7,C:7},sources:17,H:6,O:27,legacy:5,migration:5,splits:4,integrated:5,historical:71,records:257,bindings:144}
};
function parseW6(m,pathName){
 const lines=fs.readFileSync(pathName,'utf8').split('\n');
 const prefix=w6Specs[m].prefix,caseToD4=new Map(),direct=new Map(),support=new Map(),optional=[],targets=[];
 for(const line of lines){
  if(!line.startsWith('| '+m+'.'))continue;
  const c=line.split('|').slice(1,-1).map(x=>x.trim());
  if(c.length!==4)continue;
  const link=c[1].match(/\[([^\]]+)\]\(([^)]+)\)/);
  assert.ok(link,m+' D4 case link');
  const pair=link[1].match(new RegExp('^('+prefix+'\\d+)/('+m+'\\.\\d{2}\\.\\d{2}\\.\\d{2})$'));
  assert.ok(pair,m+' D4/case identity');
  assert.equal(pair[2],c[0]);
  assert.ok(!caseToD4.has(pair[1]),m+' duplicate case identity');
  caseToD4.set(pair[1],c[0]);
  direct.set(c[0],[]);
  support.set(c[0],[]);
 }
 const seenCQ=[];
 for(const line of lines){
  if(!/^\|\s*CQ\d+\s*\|/.test(line))continue;
  const c=line.split('|').slice(1,-1).map(x=>x.trim());
  assert.equal(c.length,4,m+' CQ row shape');
  const [cq,role]=c;
  assert.match(cq,/^CQ(?:0[1-9]|1[0-9]|2[0-6])$/);
  assert.ok(!seenCQ.includes(cq),m+' duplicate CQ row');
  seenCQ.push(cq);
  assert.ok(['D','S','O'].includes(role),m+' role');
  const target=m==='K11'?c[2]:c[3];
  if(role==='O'){
   assert.ok(!/\[[^\]]+\]\(/.test(target),m+' O row has no direct/support targets');
   assert.equal(target,m==='K11'?'—':'无'+m+'主答案');
   optional.push(cq);
   continue;
  }
  const map=role==='D'?direct:support;
  if(m==='K11'&&role==='S'&&target==='上表全部60条（逐行精确定位）'){
   for(const d4 of support.keys())support.get(d4).push(cq);
   continue;
  }
  const links=[...target.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  assert.ok(links.length>0,m+' D/S requires explicit targets '+cq);
  assert.equal(links.length,(target.match(/\[[^\]]+\]\(/g)||[]).length,m+' malformed target link');
  for(const link of links){
   const pair=link[1].match(new RegExp('^('+prefix+'\\d+)/('+m+'\\.\\d{2}\\.\\d{2}\\.\\d{2})$'));
   assert.ok(pair,m+' malformed/unknown target '+link[1]);
   assert.equal(caseToD4.get(pair[1]),pair[2],m+' target case/D4 mismatch '+link[1]);
   assert.ok(map.has(pair[2]),m+' unknown D4 '+pair[2]);
   const ledger=read('cases/'+m+'/frozen-input-ledger.json');
   const row=ledger.rows.find(r=>r.caseId===pair[1]);
   assert.ok(row,m+' target case missing from ledger');
   assert.equal(link[2],path.basename(row.caseAnchor.file)+'#L'+row.caseAnchor.line,m+' target line is not exact frozen case row');
   map.get(pair[2]).push(cq);
   targets.push({cq,role,caseId:pair[1],d4:pair[2]});
  }
 }
 assert.equal(caseToD4.size,w6Specs[m].rows,m+' D4 coverage');
 assert.equal(seenCQ.length,26,m+' CQ coverage');
 assert.deepEqual([...seenCQ].sort(),Array.from({length:26},(_,i)=>'CQ'+String(i+1).padStart(2,'0')));
 for(const map of [direct,support])for(const [d4,cqs] of map){
  assert.equal(new Set(cqs).size,cqs.length,m+' duplicate D/S assignment '+d4);
  map.set(d4,cqs.sort());
 }
 return {direct,support,optional:optional.sort(),caseToD4,targets};
}
for(const m of ['K11','K16','K17']){
 const spec=w6Specs[m],matrix=parseW6(m,spec.path),ledger=read('cases/'+m+'/frozen-input-ledger.json');
 const input=read('knowledge/'+m+'/controller-input.json');
 const reader=openCandidateReader(process.cwd(),input.entries,{allowFixture:false,priorRegistry:null});
 const pack=read('knowledge/'+m+'/candidate.json'),manifest=read('knowledge/'+m+'/qualification.json');
 const records=pack.records,claims=records.filter(r=>r.type==='Claim'),views=records.filter(r=>r.type==='CaseView');
 const sources=records.filter(r=>r.type==='Source');
 test(m+' exact frozen D/S/O matrix and all 26 direct-query result sets',()=>{
  assert.equal(ledger.rows.length,spec.rows);
  assert.equal(claims.length,spec.rows);
  assert.equal(views.length,spec.rows*4);
  assert.equal(reader.summary().status,'CANDIDATE_STRUCTURE_ONLY');
  assert.equal(reader.summary().acceptedClaims,0);
  for(const row of ledger.rows){
   assert.deepEqual([...row.directCQ].sort(),matrix.direct.get(row.d4)||[]);
   assert.deepEqual([...row.supportCQ].sort(),matrix.support.get(row.d4)||[]);
   const id=m+'-CL-'+row.caseId+'@1';
   const claim=reader.retrieve(id).claims.find(x=>x.ref===id);
   assert.ok(claim,m+' exact claim '+id);
   assert.deepEqual([...claim.cq].sort(),matrix.direct.get(row.d4)||[]);
   for(const cq of (matrix.support.get(row.d4)||[])){
    if((matrix.direct.get(row.d4)||[]).includes(cq))continue;
    assert.ok(!reader.retrieve(cq).rootIds.includes(id),id+' leaked through support '+cq);
   }
  }
  for(let n=1;n<=26;n++){
   const cq='CQ'+String(n).padStart(2,'0');
   const expected=ledger.rows.filter(r=>(matrix.direct.get(r.d4)||[]).includes(cq)).map(r=>m+'-CL-'+r.caseId+'@1').sort();
   const actual=reader.retrieve(cq).rootIds.filter(x=>x.startsWith(m+'-')).sort();
   assert.deepEqual(actual,expected,m+' exact direct result '+cq);
  }
  const empty=ledger.rows.filter(r=>r.directCQ.length===0);
  const supportOnly=empty.filter(r=>r.supportCQ.length>0);
  assert.equal(empty.length,spec.empty,m+' empty direct count');
  assert.equal(supportOnly.length,spec.supportOnly,m+' support-only count');
  assert.deepEqual(matrix.optional,read('queries/'+m+'/cq-index.json').questions.filter(q=>q.type==='O').map(q=>q.id).sort());
 });
 test(m+' candidate graph, source qualifications, history and capability boundaries',()=>{
  assert.equal(pack.records.length,spec.records);
  assert.equal(pack.bindings.length,spec.bindings);
  assert.equal(pack.edges.filter(e=>e.type==='requires').length,spec.H);
  assert.equal(pack.edges.filter(e=>e.type==='references').length,spec.O);
  assert.equal(manifest.obligations.length,spec.H);
  assert.equal(sources.length,spec.sources);
  assert.ok(claims.every(c=>c.status==='CANDIDATE'&&c.owner===m));
  assert.ok(views.every(v=>v.evidenceKind==='SYNTHETIC_EXPECTED_NOT_OBSERVED'&&v.example.observationStatus==='SYNTHETIC_EXPECTED_NOT_OBSERVED'));
  assert.ok(sources.every(s=>s.rights==='UNKNOWN_NO_IMPORT'));
  const tree=read('ontology/l1-anchor-tree.json');
  const anchor=a=>{
   assert.equal(a.commit,tree.commit);
   assert.equal(tree.paths[a.file],a.blob);
   const bytes=fs.readFileSync(a.file);
   assert.equal(gitBlob(bytes),a.blob);
   assert.equal(bytes.toString('utf8').split('\n')[a.line-1],a.row);
  };
  for(const r of ledger.rows){anchor(r.discovery);anchor(r.caseAnchor);}
  for(const s of sources){anchor(s.anchor);assert.ok(extractMarkdownUrls(s.anchor.row).includes(s.uri));}
  assert.equal(ledger.roles.length,spec.roles);
  const roleCounts=Object.fromEntries(['P','S','C'].map(role=>[role,ledger.roles.filter(x=>x.role===role).length]).filter(x=>x[1]));
  assert.deepEqual(roleCounts,spec.roleCounts);
  assert.ok(ledger.roles.every(r=>r.externalStatus==='UNKNOWN_NOT_EXECUTED'&&r.d4Targets.length>0&&r.d4Targets.every(d=>matrix.direct.has(d))));
  assert.equal(ledger.legacyRoutes.length,spec.legacy);
  assert.equal(ledger.migrationRows.length,spec.migration);
  assert.equal(ledger.splitRoutes.length,spec.splits);
  assert.equal(ledger.historicalFinding,spec.historical);
  assert.ok(ledger.historicalOpenIssues.some(x=>x.number===spec.historical&&x.status==='OPEN_NOT_CLOSED_BY_THIS_TASK'));
  assert.equal(ledger.localQuestions.length,12);
  assert.ok(ledger.localQuestions.every(q=>q.caseIds.length>0&&q.caseIds.every(id=>ledger.rows.some(r=>r.caseId===id))));
  assert.equal(ledger.integratedCases.length,spec.integrated);
  assert.ok(ledger.migrationRows.every(r=>r.equivalence===false));
  assert.ok(ledger.splitRoutes.every(r=>r.status==='SPLIT_OPEN_NAVIGATION_ONLY'));
  assert.ok(manifest.sourceQualifications.every(s=>s.source.endsWith('@1')));
  assert.equal(reader.summary().acceptedClaims,0);
 });
}
test('F00 R2 arbitrary empty direct CQ is rejected',()=>{
 const m='K16',input=read('knowledge/'+m+'/controller-input.json'),ledger=read('cases/'+m+'/frozen-input-ledger.json');
 const entry=input.entries.find(e=>e.pack==='knowledge/'+m+'/candidate.json');
 const pack=read(entry.pack),manifest=read(entry.manifest);
 const row=ledger.rows.find(r=>r.directCQ.length>0);
 const claim=pack.records.find(r=>r.type==='Claim'&&r.d4===row.d4);
 claim.cq=[];
 const dir=fs.mkdtempSync(path.join(process.cwd(),'knowledge',m,'.f00-cq-role-'));
 try{
  const pp=path.relative(process.cwd(),path.join(dir,'candidate.json'));
  const mp=path.relative(process.cwd(),path.join(dir,'qualification.json'));
  const pb=Buffer.from(JSON.stringify(pack,null,2)+'\n');
  manifest.packBlob=gitBlob(pb);
  const mb=Buffer.from(JSON.stringify(manifest,null,2)+'\n');
  fs.writeFileSync(path.join(process.cwd(),pp),pb);
  fs.writeFileSync(path.join(process.cwd(),mp),mb);
  const entries=input.entries.map(e=>e.pack===entry.pack?{...e,pack:pp,manifest:mp,manifestBlob:gitBlob(mb)}:e);
  assert.throws(()=>openCandidateReader(process.cwd(),entries,{allowFixture:false,priorRegistry:null}),/claim CQ does not match frozen direct role/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('F00 R2 support-only CQ cannot be promoted into direct Claim.cq',()=>{
 const m='K17',input=read('knowledge/'+m+'/controller-input.json'),ledger=read('cases/'+m+'/frozen-input-ledger.json');
 const entry=input.entries.find(e=>e.pack==='knowledge/'+m+'/candidate.json');
 const pack=read(entry.pack),manifest=read(entry.manifest);
 const row=ledger.rows.find(r=>r.directCQ.length===0&&r.supportCQ.length>0);
 const claim=pack.records.find(r=>r.type==='Claim'&&r.d4===row.d4);
 claim.cq=[row.supportCQ[0]];
 const dir=fs.mkdtempSync(path.join(process.cwd(),'knowledge',m,'.f00-cq-role-'));
 try{
  const pp=path.relative(process.cwd(),path.join(dir,'candidate.json'));
  const mp=path.relative(process.cwd(),path.join(dir,'qualification.json'));
  const pb=Buffer.from(JSON.stringify(pack,null,2)+'\n');
  manifest.packBlob=gitBlob(pb);
  const mb=Buffer.from(JSON.stringify(manifest,null,2)+'\n');
  fs.writeFileSync(path.join(process.cwd(),pp),pb);
  fs.writeFileSync(path.join(process.cwd(),mp),mb);
  const entries=input.entries.map(e=>e.pack===entry.pack?{...e,pack:pp,manifest:mp,manifestBlob:gitBlob(mb)}:e);
  assert.throws(()=>openCandidateReader(process.cwd(),entries,{allowFixture:false,priorRegistry:null}),/claim CQ does not match frozen direct role/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
console.log(JSON.stringify({suite:'F00_MODULE_CQ_ROLE',checks:results.length,passed:results.length,results},null,2));
