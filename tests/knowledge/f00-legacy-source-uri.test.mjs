import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {openCandidateReader,gitBlob} from '../../tools/validate-knowledge.mjs';
const root=process.cwd(),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'audio-kg-legacy-src-')),checks=[],test=(n,v)=>{if(!v)throw Error(n);checks.push([n,true]);},read=f=>fs.readFileSync(path.join(root,f)),frozen=JSON.parse(read('ontology/l1-anchor-tree.json')),sf='docs/research/source-qualification-vocal-digital.md';
const targets=['S049','S055','S057','S056','S061','S064','S058','S060','S063','S066','S065'];
const sourceLines=read(sf).toString().split('\n');function anchor(f,line){const b=read(f);if(gitBlob(b)!==frozen.paths[f])throw Error('not frozen');return {commit:frozen.commit,file:f,blob:gitBlob(b),line,row:b.toString().split('\n')[line-1]};}
const files=new Set(['ontology/knowledge-profile.json','ontology/l1-anchor-tree.json','docs/product/calibration/g05-r1-module-evidence-reconciliation.md',sf,'tools/validate-knowledge.mjs']);
const write=(f,x)=>{const p=path.join(tmp,f),b=JSON.stringify(x,null,2)+'\n';fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,b);return gitBlob(b);};
const packs=[];
for(const [owner,disc,ids] of [['K05','vocal-science-r4-discovery-cq.md',['S049']],['K08','digital-audio-r3-discovery-cq.md',targets.slice(1)]]){
 const df='docs/product/calibration/'+disc;files.add(df);const rows=read(df).toString().split('\n').flatMap((l,i)=>l.startsWith('| '+owner+'.')?[{line:i+1,d4:l.split('|')[1].trim(),row:l,direct:l.split('|').at(-3).trim().split('/')}]:[]);
 const pack={format:'audio-kg-candidate/1',owner,coverageMode:'MODULE',inventory:rows.map(r=>({line:r.line,d4:r.d4,disposition:'UNKNOWN',claimRefs:[],reason:'test-only unknown'})),records:[],edges:[],bindings:[]},m={format:'audio-kg-qualification/1',owner,status:'CANDIDATE_QUALIFICATION_ONLY',packBlob:'',sourceQualifications:[],edgeQualifications:[],obligations:[]};
 const rec=(type,id,x)=>{const r={type,id,revision:1,...(type==='Source'?{}:{owner}),...x};pack.records.push(r);return id+'@1';};
 for(const s of ids){const i=sourceLines.findIndex(l=>l.startsWith('| '+s+' |'))+1,a=anchor(sf,i),uri=a.row.split('|')[2].trim().match(/https:\/\/[^\s；，]+/)[0];rec('Source',s,{sourceId:s,title:'Test-only '+s,author:'UNKNOWN',version:'UNKNOWN',publicationDate:'UNKNOWN',accessDate:'FROZEN',uri,locator:a.row.split('|')[2].trim(),grade:'READ_LOCATOR',rights:'UNKNOWN_NO_IMPORT',anchor:a});m.sourceQualifications.push({source:s+'@1',scope:'Frozen qualification test only',limits:'No formal admission or source grade upgrade',locatorKind:'FROZEN_LOCATOR',accessedUri:uri});}
 // Each referenced Source may be validated without asserting that a particular source supports a new claim.
 packs.push({pack,m});
}
function fresh(edit=()=>{}){const p=structuredClone(packs);edit(p);return p.map(({pack,m})=>{const pp='knowledge/'+pack.owner+'/test-legacy.json',mp='knowledge/'+pack.owner+'/test-legacy-qualification.json';m.packBlob=write(pp,pack);return {pack:pp,manifest:mp,manifestBlob:write(mp,m)};});}
function reject(n,edit,re){let e;try{openCandidateReader(tmp,fresh(edit))}catch(x){e=x;}test(n,!!e&&re.test(e.message));}
try{
 for(const f of files){const p=path.join(tmp,f);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,read(f));}
 const r=openCandidateReader(tmp,fresh());test('all 11 actual bare HTTPS source IDs validated at exact frozen row',r.summary().counts.records===11&&r.summary().acceptedClaims===0);
 for(const s of targets)reject('wrong exact URI '+s,ps=>{const {pack,m}=ps.find(x=>x.pack.records.some(y=>y.id===s)),v=pack.records.find(x=>x.id===s);v.uri+='-changed';m.sourceQualifications.find(x=>x.source===s+'@1').accessedUri=v.uri;},/source exact URI/);
 reject('same file wrong source anchor',ps=>{const p=ps[1].pack.records;p[0].anchor=p[1].anchor;},/source anchor id|legacy exact source row identity/);
 reject('URI prefix not accepted',ps=>{const v=ps[1].pack.records[0];v.uri=v.uri.slice(0,-2);},/source exact URI/);
 reject('qualification URI must be exact',ps=>ps[0].m.sourceQualifications[0].accessedUri='https://example.invalid',/source exact URI/);
 reject('source rights cannot be upgraded',ps=>ps[0].pack.records[0].rights='PUBLIC_DOMAIN',/source metadata/);
 reject('tampered row text',ps=>ps[1].pack.records[0].anchor.row+=' https://example.invalid',/anchor row/);
 const ent=fresh();fs.appendFileSync(path.join(tmp,sf),' ');let e;try{openCandidateReader(tmp,ent)}catch(x){e=x;}test('tampered frozen file rejected',/anchor blob/.test(e?.message));
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
console.log(JSON.stringify({status:'LEGACY_URI_FIXTURE_ONLY',checks:checks.length,passed:checks.length,results:checks,limits:['exact legacy table only','no professional source admission or actual external reread']},null,2));
