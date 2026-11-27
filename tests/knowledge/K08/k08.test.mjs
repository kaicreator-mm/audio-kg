import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {openCandidateReader,gitBlob} from '../../../tools/validate-knowledge.mjs';
import {checks} from './domain-witness.mjs';
const m='K08',read=p=>JSON.parse(fs.readFileSync(p,'utf8')),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),results=[];
const t=(name,ok)=>{if(!ok)throw Error(name);results.push([name,true]);};
const ref=r=>r.id+'@'+r.revision,cp='knowledge/'+m+'/controller-input.json',input=read(cp),entry=input.entries.find(e=>e.pack==='knowledge/'+m+'/candidate.json'),pack=read(entry.pack),manifest=read(entry.manifest),ledger=read('cases/'+m+'/frozen-input-ledger.json'),roles=read('queries/'+m+'/capability-index.json'),legacy=read('queries/'+m+'/legacy-routes.json'),prov=read('sources/'+m+'/provenance.json'),domain=read('knowledge/'+m+'/domain-workflows.json'),frozen=read('ontology/l1-anchor-tree.json'),reader=openCandidateReader(process.cwd(),input.entries),records=new Map(pack.records.map(r=>[ref(r),r])),all=new Map(input.entries.flatMap(e=>read(e.pack).records.map(r=>[ref(r),r]))),cache=new Map();
function anchor(a){if(!a||a.commit!==frozen.commit)return false;if(!cache.has(a.file)){const b=fs.readFileSync(a.file),h=frozen.paths[a.file]||spawnSync('git',['rev-parse',frozen.commit+':'+a.file],{encoding:'utf8'}).stdout.trim();if(gitBlob(b)!==h)throw Error('frozen '+a.file);cache.set(a.file,{h,lines:b.toString().split('\n')});}const p=cache.get(a.file);return p.h===a.blob&&p.lines[a.line-1]===a.row;}
const side=m==='K02'?read('knowledge/K02/project-contracts.json').records:[],byD=new Map(ledger.rows.map(r=>[r.d4,r]));
t('exact frozen inventory',pack.inventory.length===ledger.rows.length&&reader.summary().acceptedClaims===0&&new Set(pack.inventory.map(i=>i.d4)).size===ledger.rows.length);
for(const row of ledger.rows){
 const inv=pack.inventory.find(i=>i.d4===row.d4),id=m+'-CL-'+row.caseId+'@1',out=reader.retrieve(row.d4);
 t('exact row/locator '+row.caseId,anchor(row.discovery)&&anchor(row.caseAnchor)&&row.sourceRoutes.every(s=>anchor(s.anchor)&&(!s.sharedProvider||anchor(s.sharedProvider.record.anchor))));
 let views;
 if(inv.disposition==='ROUTED'){
  const s=side.find(s=>s.id===row.caseId);
  t('project contract not formal claim '+row.caseId,!!s&&!records.has(id)&&!out.rootIds.includes(id)&&inv.claimRefs.length===0);
  views=s.views;
 }else{
  const c=out.claims.find(x=>x.ref===id);
  t('exact claim/direct CQ '+row.caseId,inv.disposition==='CANDIDATE'&&eq(out.rootIds,[id])&&eq(reader.retrieve(id).rootIds,[id])&&eq([...c.cq].sort(),[...row.directCQ].sort())&&c.applicability==='CONDITIONAL_NOT_ESTABLISHED_BY_RETRIEVAL');
  t('qualified source and H closure '+row.caseId,c.evidence.length>0&&c.evidence.every(e=>anchor(e.anchor)&&e.sources.every(s=>anchor(s.anchor)&&s.rights==='UNKNOWN_NO_IMPORT'&&s.qualification.scope&&s.qualification.limits))&&c.relations.filter(e=>e.type==='requires').every(e=>e.required&&!e.logicalConverse&&out.claims.some(x=>x.ref===e.to)));
  views=c.cases.filter(v=>v.binding.role==='PRIMARY_TARGET'&&v.view.example.frozenCase===row.caseId).map(v=>v.view);
  t('primary bindings '+row.caseId,views.every(x=>reader.caseToClaims(ref(x)).some(b=>b.claim===id&&b.role==='PRIMARY_TARGET')));
 }
 t('four distinct directional views '+row.caseId,views.length===4&&new Set(views.map(v=>v.question)).size===4&&new Set(views.map(v=>v.direction+'_'+v.polarity)).size===4);
 for(const x of views){const e=x.example,expected=row[{FORWARD_POSITIVE:'forwardExpected',FORWARD_NEGATIVE:'forwardNegative',REVERSE_POSITIVE:'reverseWitness',REVERSE_NEGATIVE:'reverseBoundary'}[x.direction+'_'+x.polarity]];t('active scenario '+row.caseId+' '+x.direction+' '+x.polarity,anchor(e.anchor)&&e.frozenWitness===expected&&e.directionSpecificProblem===x.question&&e.expectedResult!==x.question&&e.reasoningBasis&&e.observationStatus==='SYNTHETIC_EXPECTED_NOT_OBSERVED'&&(x.polarity==='NEGATIVE'?e.witnessRole==='NEGATIVE_INPUT_OR_BOUNDARY_NOT_FACT'&&e.expectedResult.startsWith('REJECT')&&e.reasoningBasis!==expected:x.explanation.includes(e.expectedResult)));}
}
for(let n=1;n<=26;n++){const cq='CQ'+String(n).padStart(2,'0'),expected=ledger.rows.filter(r=>r.directCQ.includes(cq)&&records.has(m+'-CL-'+r.caseId+'@1')).map(r=>m+'-CL-'+r.caseId+'@1');t('direct-only '+cq,eq(reader.retrieve(cq).rootIds.filter(id=>id.startsWith(m+'-')).sort(),expected.sort()));}
t('legacy split routes',legacy.routes.length===ledger.legacyRoutes.length&&legacy.splitRoutes.length===ledger.splitRoutes.length&&legacy.routes.every(r=>anchor(r.anchor)&&!r.equivalence&&r.claimRefs.every(id=>records.has(id)))&&legacy.splitRoutes.every(r=>anchor(r.anchor)&&r.status==='SPLIT_OPEN_NAVIGATION_ONLY'));
t('exact capability cells',roles.roles.length===ledger.roles.length&&new Set(roles.roles.map(r=>r.d2+r.ability)).size===roles.roles.length&&roles.roles.every(r=>anchor(r.anchor)&&r.externalStatus==='UNKNOWN_NOT_EXECUTED'&&r.claimRefs.every(id=>records.has(id))&&r.localWitnesses.every(v=>(v.claim?records.has(v.claim):side.some(s=>s.id===v.caseId))&&v.problem&&v.reject)));
t('source registry and canonical reuse',prov.sources.every(s=>anchor(s.anchor)&&(!s.canonicalAnchor||anchor(s.canonicalAnchor)))&&pack.records.filter(r=>r.type==='Source').length===manifest.sourceQualifications.length&&pack.records.filter(r=>r.type==='Source').every(r=>r.rights==='UNKNOWN_NO_IMPORT')&&all.size===input.entries.reduce((n,e)=>n+read(e.pack).records.length,0));
t('qualified hard dependency obligations',pack.edges.filter(e=>e.type==='requires').length===manifest.obligations.length&&pack.edges.every(e=>all.has(e.from)&&all.has(e.to)));
t('exact integrated closure bytes',gitBlob(fs.readFileSync(ledger.integratedClosure.file))===ledger.integratedClosure.blob);
t('all domain workflow targets resolved',domain.workflows.length===new Set(ledger.rows.map(r=>r.d4.split('.').slice(0,2).join('.'))).size&&domain.workflows.every(w=>w.status==='SYNTHETIC_ONLY'&&w.steps.length>=3&&w.cases.every(c=>ledger.rows.some(r=>r.caseId===c))&&w.claimRefs.every(c=>records.has(c))&&w.external==='UNKNOWN_NOT_EXECUTED'));
checks(t);
console.log(JSON.stringify({module:m,checks:results.length,passed:results.filter(x=>x[1]).length,results},null,2));
