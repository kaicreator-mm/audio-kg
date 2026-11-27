// Test-only full K01 inventory, no real formal K01 publication or source admission.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {openCandidateReader,gitBlob} from '../../tools/validate-knowledge.mjs';
const root=process.cwd(),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'audio-kg-f00-cq-'));
const checks=[],test=(n,v)=>{if(!v)throw Error(n);checks.push([n,true]);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),ref=r=>r.id+'@'+r.revision;
const read=f=>fs.readFileSync(path.join(root,f));
const frozen=JSON.parse(read('ontology/l1-anchor-tree.json')),disc='docs/product/calibration/theory-all-atom-discovery-cq.md',sourceFile='docs/research/source-qualification-theory-fundamentals.md';
const sourceLines=read(sourceFile).toString().split('\n'),discLines=read(disc).toString().split('\n');
const rows=discLines.flatMap((row,i)=>/^\| K01\.\d\d\.\d\d\.\d\d \|/.test(row)?[{line:i+1,d4:row.split('|')[1].trim(),roles:row.split('|')[4].trim(),case:row.split('|')[6].trim()}]:[]);
const direct=r=>r.roles.split('；').filter(s=>s.endsWith(' D')).map(s=>s.slice(0,4));
test('actual frozen K01 184 rows, 59 S-only and 54 among 158 precise primary cases',rows.length===184&&rows.filter(r=>!direct(r).length).length===59&&rows.filter(r=>/^(?:TD[23]?|TC|TB|TE|TL)-K01\./.test(r.case)).length===158&&rows.filter(r=>/^(?:TD[23]?|TC|TB|TE|TL)-K01\./.test(r.case)&&!direct(r).length).length===54);
const anchor=(f,line)=>{const b=read(f);if(frozen.paths[f]!==gitBlob(b))throw Error('not frozen');return {commit:frozen.commit,file:f,blob:gitBlob(b),line,row:b.toString().split('\n')[line-1]};};
const files=['ontology/knowledge-profile.json','ontology/l1-anchor-tree.json','docs/product/calibration/g05-r1-module-evidence-reconciliation.md',disc,sourceFile,'tools/validate-knowledge.mjs'];
const copy=f=>{const target=path.join(tmp,f);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,read(f));};
const write=(f,x)=>{const target=path.join(tmp,f);fs.mkdirSync(path.dirname(target),{recursive:true});const b=JSON.stringify(x,null,2)+'\n';fs.writeFileSync(target,b);return gitBlob(b);};
const pack={format:'audio-kg-candidate/1',owner:'K01',coverageMode:'MODULE',inventory:rows.map(r=>({line:r.line,d4:r.d4,disposition:'UNKNOWN',claimRefs:[],reason:'Test-only unused row; no formal knowledge admission'})),records:[],edges:[],bindings:[]};
const m={format:'audio-kg-qualification/1',owner:'K01',status:'CANDIDATE_QUALIFICATION_ONLY',packBlob:'',sourceQualifications:[],edgeQualifications:[],obligations:[]};
function record(type,id,fields){const r={id,revision:1,type,...(type==='Source'?{}:{owner:'K01'}),...fields};pack.records.push(r);return ref(r);}
for(const sid of ['S198','S200','S201','S022']){
 const sf=sid==='S022'?'docs/research/source-qualification-wave1.md':sourceFile;
 const lines=read(sf).toString().split('\n');const idx=lines.findIndex(l=>new RegExp('^\\| '+sid+' \\|').test(l)&&/\(https?:/.test(l));if(idx<0)throw Error('source '+sid);
 if(!files.includes(sf))files.push(sf);
 const a=anchor(sf,idx+1),u=a.row.match(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/);const c=a.row.split('|').slice(1,-1).map(x=>x.trim());
 const r=record('Source',sid,{sourceId:sid,title:u[1],author:'UNKNOWN_NOT_PINNED',version:'UNKNOWN_NOT_PINNED',publicationDate:'UNKNOWN_NOT_PINNED',accessDate:'UNKNOWN_EXACT_ACCESS_DATE (frozen record)',uri:u[2],locator:c[2]||c[1],grade:/READ_LOCATOR|重读|已读|实际阅读/.test(a.row)?'READ_LOCATOR':'REGISTERED_LIMITED',rights:'UNKNOWN_NO_IMPORT',anchor:a});
 m.sourceQualifications.push({source:r,scope:'Test-only frozen '+sid+' source locator; exact limited content only',limits:c.at(-1),locatorKind:'FROZEN_READ_LOCATOR',accessedUri:u[2]});
}
function edge(type,from,to,condition){const id='K01-E-'+pack.edges.length;pack.edges.push({id,type,from,to,condition});m.edgeQualifications.push({edge:id,scope:'Test-only scoped role witness',limits:'Not formal evidence admission'});return id;}
function claim(suffix,d4,cq,sources,statement,provider){
 const r=rows.find(x=>x.d4===d4),inv=pack.inventory.find(x=>x.d4===d4),base='K01-'+suffix,ctx=record('Context',base+'-CTX',{condition:'Stipulated symbolic input and documented conditions only'}),id=record('Claim',base,{d4,kind:'practice',statement,context:ctx,status:'CANDIDATE',limits:'Test-only limited symbolic example; no measured truth or admission',cq}),ev=record('Evidence',base+'-EV',{kind:'L1_RESEARCH_LOCATOR',sources:sources.map(x=>x+'@1'),anchor:anchor(disc,r.line),limits:'Frozen discovery locator, only test scope'}),g=record('CaseGroup',base+'-GROUP',{d4,claim:id,kind:'SYNTHETIC'});
 inv.disposition='CANDIDATE';inv.claimRefs.push(id);inv.reason='Test-only role example';edge('supported_by',id,ev,ctx);edge('applies_under',id,ctx,ctx);
 if(provider){const e=edge('requires',id,provider.id,ctx);m.obligations.push({edge:e,consumer:id,provider:provider.id,condition:ctx,providerContext:provider.ctx,group:g});}
 for(const [direction,polarity,key] of [['FORWARD','POSITIVE','FP'],['FORWARD','NEGATIVE','FN'],['REVERSE','POSITIVE','RP'],['REVERSE','NEGATIVE','RN']]){
  const v=record('CaseView',base+'-VIEW-'+key,{group:g,direction,polarity,context:ctx,question:'Test-only precise '+key+' role witness',example:{synthetic:true},explanation:'Test-only direction and polarity; no actual observation',limits:'Not a formal module assertion',evidenceKind:'SYNTHETIC_EXPECTED_NOT_OBSERVED'});
  pack.bindings.push({id:'K01-B-'+pack.bindings.length,view:v,claim:id,role:'PRIMARY_TARGET',condition:ctx});if(provider)pack.bindings.push({id:'K01-B-'+pack.bindings.length,view:v,claim:provider.id,role:'REQUIRES',condition:ctx});
 }
 return {id,ctx};
}
const support=claim('TUPLET-SUPPORT','K01.04.06.01',[],['S198','S201'],'Three written eighth-note triplets under 3:2 total one quarter note.');
const consumer=claim('NESTED-DIRECT','K01.04.06.03',['CQ23'],['S200','S201'],'Nested 3:2 ratios multiply duration but final duration does not recover grouping.',support);
// A real D4 with two frozen direct roles is split between two distinct candidate claims.
const d4='K01.02.06.01',rd=rows.find(r=>r.d4===d4);test('real multi-direct role fixture uses actual CQ01, CQ17, CQ23',same(direct(rd),['CQ01','CQ17','CQ23']));
const a=claim('MAP-DIRECT-A',d4,['CQ01','CQ17'],['S022'],'Stipulated reference and positive frequency determine logarithmic cents.');
const b=claim('MAP-DIRECT-B',d4,['CQ23'],['S022'],'Keep source frequency and mapping metadata separate from derived pitch label.');
const packPath='knowledge/K01/test-candidate.json',manifestPath='knowledge/K01/test-qualification.json',ctrlPath='knowledge/K01/test-controller.json';
function fresh(edit=()=>{}){const p=structuredClone(pack),q=structuredClone(m);edit(p,q);q.packBlob=write(packPath,p);const e={pack:packPath,manifest:manifestPath,manifestBlob:write(manifestPath,q)};return [e];}
const get=(p,id)=>p.records.find(r=>ref(r)===id);
function reject(name,edit,re){let err;try{openCandidateReader(tmp,fresh(edit));}catch(e){err=e;}test(name,!!err&&re.test(err.message));}
try{
 files.forEach(copy);const entries=fresh(),reader=openCandidateReader(tmp,entries);
 test('empty direct CQ accepted only within actual formal role context',reader.summary().counts.claims===4&&reader.summary().unresolved.length===181&&reader.summary().acceptedClaims===0);
 test('S-only exact D4 and revision retrieval independent of CQ roots',same(reader.retrieve('K01.04.06.01').rootIds,[support.id])&&same(reader.retrieve(support.id).rootIds,[support.id])&&reader.retrieve('CQ04').dependencyState==='UNKNOWN_NO_MATCH'&&reader.retrieve('CQ04').rootIds.length===0);
 const result=reader.retrieve('CQ23');test('H closure includes support-only but not root',result.rootIds.includes(consumer.id)&&!result.rootIds.includes(support.id)&&result.claims.find(c=>c.ref===support.id).selection==='REQUIRED_SUPPORT'&&result.claims.find(c=>c.ref===support.id).cq.length===0);
 test('direct role split union with individual exact direct root selection',same(reader.retrieve('CQ01').rootIds,[a.id])&&same(reader.retrieve('CQ17').rootIds,[a.id])&&result.rootIds.includes(b.id)&&!result.rootIds.includes(a.id));
 test('support inverse binding stays necessary not primary for consumer view',reader.caseToClaims('K01-NESTED-DIRECT-VIEW-FP@1').some(x=>x.role==='REQUIRES'&&x.claim===support.id));
 const ctrl={entries,allowFixture:false,priorRegistry:null},pin=write(ctrlPath,ctrl);const cli=spawnSync(process.execPath,['tools/validate-knowledge.mjs',ctrlPath,pin,'CQ23'],{cwd:tmp,encoding:'utf8'});test('actual isolated public CLI preserves H without S promotion',cli.status===0&&same(JSON.parse(cli.stdout),result)&&!fs.existsSync(path.join(tmp,'.git')));
 reject('freshly pinned support-only claim promoted to S as D',(p)=>get(p,support.id).cq=['CQ04'],/K01 CQ not frozen direct role/);
 reject('freshly pinned mixed D/S claim promotes S',(p)=>get(p,consumer.id).cq=['CQ23','CQ04'],/K01 CQ not frozen direct role/);
 reject('freshly pinned direct claim loses all direct coverage',(p)=>get(p,consumer.id).cq=[],/K01 candidate row missing frozen direct CQ/);
 reject('split direct role missing from aggregate',(p)=>get(p,a.id).cq=['CQ01'],/K01 candidate row missing frozen direct CQ/);
 reject('duplicate valid direct IDs still rejected',(p)=>get(p,a.id).cq=['CQ01','CQ17','CQ01'],/duplicate CQ/);
 reject('non-CQ or malformed direct IDs rejected',(p)=>get(p,b.id).cq=['CQ27'],/K01 CQ not frozen direct role/);
 reject('non-array CQ rejected',(p)=>get(p,b.id).cq='CQ23',/K01 CQ not frozen direct role/);
 reject('wrong owner direct role cannot transfer',(p)=>get(p,support.id).cq=['CQ23'],/K01 CQ not frozen direct role/);
 reject('support H edge lost under fresh pins',(p,q)=>{const e=p.edges.find(x=>x.type==='requires');p.edges=p.edges.filter(x=>x!==e);q.edgeQualifications=q.edgeQualifications.filter(x=>x.edge!==e.id);p.bindings=p.bindings.filter(x=>x.role!=='REQUIRES');},/required H obligation absent/);
 reject('support case binding lost under fresh pins',(p)=>p.bindings=p.bindings.filter(x=>!(x.view==='K01-NESTED-DIRECT-VIEW-FP@1'&&x.role==='REQUIRES')),/mandatory supporting view/);
 const emptySplit=openCandidateReader(tmp,fresh(p=>{get(p,a.id).cq=[];get(p,b.id).cq=['CQ01','CQ17','CQ23'];}));test('same-row narrow claim may have no direct role if sibling covers exact union',same(emptySplit.retrieve('CQ01').rootIds,[b.id])&&emptySplit.retrieve(a.id).rootIds.includes(a.id));
 const pinned=fresh();fs.appendFileSync(path.join(tmp,manifestPath),' ');let err;try{openCandidateReader(tmp,pinned)}catch(e){err=e;}test('tampered manifest still fail closed',/exact blob mismatch/.test(err?.message));
 const x=fresh();fs.appendFileSync(path.join(tmp,disc),' ');err=null;try{openCandidateReader(tmp,x)}catch(e){err=e;}test('tampered frozen role ledger still fail closed',/discovery frozen blob/.test(err?.message));copy(disc);
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
console.log(JSON.stringify({status:'CQ_ROLE_TEST_ONLY',checks:checks.length,passed:checks.filter(x=>x[1]).length,results:checks,limits:['no formal K01 knowledge admission','formal K01 D/S only; other owner formats unchanged']},null,2));
