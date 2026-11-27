import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openCandidateReader} from '../../tools/validate-knowledge.mjs';

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
console.log(JSON.stringify({suite:'F00_MODULE_CQ_ROLE',checks:results.length,passed:results.length,results},null,2));
