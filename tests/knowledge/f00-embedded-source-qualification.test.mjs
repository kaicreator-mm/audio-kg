import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {openCandidateReader,gitBlob,extractMarkdownUrls} from '../../tools/validate-knowledge.mjs';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const checks=[];
const test=(name,fn)=>{fn();checks.push([name,true]);};
const owner='K11';
const input=read('knowledge/K11/controller-input.json');
const entry=input.entries.find(e=>e.pack==='knowledge/K11/candidate.json');
const basePack=read(entry.pack),baseManifest=read(entry.manifest);
const qualification=baseManifest.sourceQualifications;
const sourceIds=['S535','S536','S537'];
const sourceMap=new Map(basePack.records.filter(r=>r.type==='Source').map(r=>[r.sourceId,r]));
const embedded='docs/product/calibration/ai-models-r2-knowledge-cases.md';

test('S535/S536/S537 are the only embedded qualification Source records',()=>{
 const tree=read('ontology/l1-anchor-tree.json');
 for(const id of sourceIds){
  const s=sourceMap.get(id);
  assert.ok(s,id+' Source record');
  assert.equal(s.anchor.file,embedded);
  assert.equal(s.grade,'READ_LOCATOR');
  assert.equal(s.rights,'UNKNOWN_NO_IMPORT');
  assert.equal(s.anchor.commit,tree.commit);
  assert.equal(tree.paths[embedded],s.anchor.blob);
  const bytes=fs.readFileSync(embedded);
  assert.equal(gitBlob(bytes),s.anchor.blob);
  assert.equal(bytes.toString('utf8').split('\n')[s.anchor.line-1],s.anchor.row);
  const cells=s.anchor.row.split('|').slice(1,-1).map(x=>x.trim());
  assert.equal(cells.length,3);
  assert.equal(cells[0],id);
  assert.ok(cells[2].includes('READ_LOCATOR'));
  const urls=extractMarkdownUrls(s.anchor.row);
  assert.ok(urls.length>=1);
  assert.ok(urls.includes(s.uri));
  const label=s.anchor.row.match(/\[([^\]]+)\]\(([^)]+)\)/);
  assert.ok(label);
  assert.equal(s.title,label[1]);
  assert.equal(s.uri,label[2]);
  const q=qualification.find(x=>x.source===id+'@1');
  assert.ok(q,id+' qualification manifest');
  assert.equal(q.accessedUri,s.uri);
  assert.equal(q.locatorKind,'FROZEN_QUALIFICATION_LOCATOR');
  assert.equal(q.scope,s.anchor.row);
  assert.ok(q.limits.includes('未在本轮外部重读'));
 }
 assert.equal([...sourceMap.keys()].filter(x=>sourceIds.includes(x)).length,3);
});

function assertRejected(mutate,pattern){
 const pack=structuredClone(basePack),manifest=structuredClone(baseManifest);
 const record=pack.records.find(r=>r.type==='Source'&&r.sourceId==='S535');
 mutate(record);
 const dir=fs.mkdtempSync(path.join(process.cwd(),'knowledge/K11','.f00-embedded-source-'));
 try{
  const packPath=path.join(dir,'candidate.json'),manifestPath=path.join(dir,'qualification.json');
  const pb=Buffer.from(JSON.stringify(pack,null,2)+'\n');
  manifest.packBlob=gitBlob(pb);
  const mb=Buffer.from(JSON.stringify(manifest,null,2)+'\n');
  fs.writeFileSync(packPath,pb);fs.writeFileSync(manifestPath,mb);
  const relPack=path.relative(process.cwd(),packPath),relManifest=path.relative(process.cwd(),manifestPath);
  const entries=input.entries.map(e=>e.pack===entry.pack?{...e,pack:relPack,manifest:relManifest,manifestBlob:gitBlob(mb)}:e);
  assert.throws(()=>openCandidateReader(process.cwd(),entries,{allowFixture:false,priorRegistry:null}),pattern);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
}

test('case rows cannot be used as embedded source qualification anchors',()=>{
 assertRejected(r=>{r.anchor.file='docs/product/calibration/ai-models-r1-knowledge-cases.md';},/source qualification not owned|source path/);
});
test('unknown source IDs cannot use the embedded qualification exception',()=>{
 assertRejected(r=>{r.id='S999';r.sourceId='S999';},/source qualification not owned|source path/);
});
test('malformed embedded source rows fail before anchor acceptance',()=>{
 assertRejected(r=>{r.anchor.row='| S535 | incomplete |';},/embedded source qualification row/);
});
test('embedded source grade cannot be upgraded or substituted',()=>{
 assertRejected(r=>{r.grade='ABSTRACT_READ';},/embedded source qualification identity\/grade/);
});

console.log(JSON.stringify({suite:'F00_EMBEDDED_SOURCE_QUALIFICATION',checks:checks.length,passed:checks.length,results:checks},null,2));
