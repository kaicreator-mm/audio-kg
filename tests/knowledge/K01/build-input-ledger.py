"""Offline, exact frozen K01 input extraction. No admission or source upgrade."""
from pathlib import Path
import json,re,hashlib,collections,subprocess,functools
ROOT=Path(__file__).resolve().parents[3]; CAL='docs/product/calibration/'; RES='docs/research/'
frozen=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text()); COMMIT=frozen['commit']
pat=re.compile(r'^\| (K01\.\d\d\.\d\d\.\d\d) \|')
casepat=re.compile(r'^\| ((?:TD[23]?|TC|TB|TE|TL)-K01\.[\d.]+(?:-I)?)\s*/\s*(K01\.\d\d\.\d\d\.\d\d)\s*\|')
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def write(path,value):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);b=(json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode();p.write_bytes(b);return blob(b)
def cells(row):return [x.strip() for x in row.split('|')[1:-1]]
@functools.lru_cache(None)
def pinned_blob(file):
 # Supplemental audit outside F00 source/case projection is historical input only.
 return frozen['paths'].get(file) or subprocess.check_output(['git','rev-parse',COMMIT+':'+file],cwd=ROOT,text=True).strip()
@functools.lru_cache(None)
def lines(file):
 b=(ROOT/file).read_bytes();assert pinned_blob(file)==blob(b),file;return b.decode().splitlines()
def anchor(file,i):
 ls=lines(file);return dict(commit=COMMIT,file=file,blob=pinned_blob(file),line=i,row=ls[i-1])
def table(file):return {cells(l)[0]:(cells(l),anchor(file,i)) for i,l in enumerate(lines(file),1) if pat.match(l)}
def sids(s):return list(dict.fromkeys(re.findall(r'\bS\d{3}\b',s)))
def d4s(s):return list(dict.fromkeys(re.findall(r'K01\.\d\d\.\d\d\.\d\d',s)))
disc=table(CAL+'theory-all-atom-discovery-cq.md');assert len(disc)==184
pred=table(CAL+'theory-g02-predicate-audit.md');qual=table(RES+'theory-g02-r3-predicate-source-qualification.md');audit=table(CAL+'theory-g02-r2-case-branch-review.md');links=table(CAL+'theory-g02-r3-case-links.md');legacy=table(CAL+'theory-legacy-calibration-ledger.md');old=table(CAL+'theory-legacy-consolidation.md');broad=table(CAL+'theory-g02-r3-scope-closure.md');pending=table(CAL+'theory-pending-evidence-disposition.md');assert len(pred)==len(qual)==130 and len(audit)==158 and len(links)==33 and len(legacy)==54 and len(broad)==7
casefiles=['theory-depth-cases.md','theory-fundamentals-cases.md','theory-advanced-cases.md','theory-consolidation-cases.md','theory-case-batch.md','theory-evidence-batch-cases.md','theory-legacy-cq-cases.md']; cases={}
for name in casefiles:
 f=CAL+name
 for i,l in enumerate(lines(f),1):
  m=casepat.match(l)
  if m:
   assert m[1] not in cases; c=cells(l);assert len(c)==6;cases[m[1]]=dict(id=m[1],d4=m[2],condition=c[1],forwardPositive=c[2],forwardNegative=c[3],reversePositive=c[4],reverseNegative=c[5],anchor=anchor(f,i))
# Supplemental case rows from exact referenced locations, not concatenated as equivalent to main cases.
linkedEvidence={}
for d,(c,a) in links.items():
 assert d in audit;linkedEvidence[d]=[]
 for label,f,i in re.findall(r'\[([^]]+)\]\(([^)]+)\) L(\d+)',c[2]):
  assert CAL+f in frozen['paths']; x=anchor(CAL+f,int(i));assert label in x['row'],(d,label,x)
  linkedEvidence[d].append(dict(label=label,anchor=x,role='COMPOSITE_SUPPLEMENT_NOT_PRIMARY_EQUIVALENCE'))
 assert linkedEvidence[d]
# The broad seven remain open for full scope but every actual R3 local case is retained.
broadCases=collections.defaultdict(list)
for i,l in enumerate(lines(CAL+'theory-g02-r3-scope-closure.md'),1):
 m=re.match(r'^\| (R3-[A-Z]\d+) / (K01\.\d\d\.\d\d\.\d\d) \|',l)
 if m:
  c=cells(l);assert len(c)==6; broadCases[m[2]].append(dict(id=m[1],anchor=anchor(CAL+'theory-g02-r3-scope-closure.md',i),condition=c[1],forwardPositive=c[2],forwardNegative=c[3],reversePositive=c[4],reverseNegative=c[5],status='SCOPED_SYNTHETIC_SUPPLEMENT_NOT_FULL_ADMISSION'))
assert set(broad)<=set(broadCases)
# All O findings have explicit R2-Cxx supplements, not inferred from nearby IDs.
branch={}
for i,l in enumerate(lines(CAL+'theory-g02-r2-case-branch-fixtures.md'),1):
 m=re.match(r'^\| (R2-C\d+) / (K01\.\d\d\.\d\d\.\d\d) \|',l)
 if m:branch[m[2]]=anchor(CAL+'theory-g02-r2-case-branch-fixtures.md',i)
assert len(branch)==15 and set(branch)=={d for d,(c,a) in audit.items() if c[3]=='O'}
# Exact frozen source row/link inventory. Preserve ambiguity and historical read status.
sources=collections.defaultdict(list)
for f in sorted(frozen['paths']):
 if not f.startswith(RES+'source-qualification-'):continue
 for i,l in enumerate(lines(f),1):
  m=re.match(r'^\| (S\d{3}) \|',l)
  if m and re.search(r'\(https?://[^)\s]+\)',l):sources[m[1]].append(anchor(f,i))
# Possible evidence locations have actual exact D4 token and actual source token.
locations=collections.defaultdict(list)
for f in sorted(frozen['paths']):
 if not f.startswith(CAL+'theory-'):continue
 for i,l in enumerate(lines(f),1):
  if not l.startswith('|') or not sids(l):continue
  # A row must actually address this D4 as first or case-target column; mere mention is not sufficient.
  c=cells(l);m=re.fullmatch(r'K01\.\d\d\.\d\d\.\d\d',c[0]) if c else None
  target=m[0] if m else (d4s(c[0])[-1] if c and re.search(r'/ K01\.\d\d\.\d\d\.\d\d$',c[0]) else None)
  if target:locations[target].append(anchor(f,i))
# Freeze source route per atom; use R3 declared current routes, legacy exact primary context only.
# Source row occurrence is not itself direct qualification. Exclusions and exact limits preserved.
items=[];used={};missing=[]
for d,(c,a) in disc.items():
 isdeep=len(c)==7; assert isdeep==(d in pred)
 m=re.match(r'((?:TD[23]?|TC|TB|TE|TL)-K01\.[\d.]+(?:-I)?)',c[5]); ca=cases[m[1]] if m else None
 if ca:assert ca['d4']==d and d in audit
 rr=qual[d][0] if isdeep else None
 if rr:decl=[(s,RES+f) for s,f in re.findall(r'\[(S\d{3})\]\(([^)]+)\)',rr[1])]
 else:decl=[(s,None) for s in sids(ca['condition'])] if ca else []
 if d=='K01.03.01.01':decl=[('S029',RES+'source-qualification-foundation.md')] # representation API only; arithmetic derived from stipulated ordered steps
 chosen=[];unlocated=[]
 for sid,f in decl:
  found=[x for x in sources[sid] if f is None or x['file']==f]
  evid=[x for x in locations[d] if sid in sids(x['row'])]
  if not found or not evid:
   unlocated.append(dict(sourceId=sid,declaredPath=f,sourceRows=len(found),predicateEvidenceRows=len(evid),sourceAnchor=found[0] if len(found)==1 else None,reason='no exact source row or same-target F00 evidence row; keep qualification/navigation only'));continue
  if len(found)!=1:
   unlocated.append(dict(sourceId=sid,declaredPath=f,sourceRows=len(found),predicateEvidenceRows=len(evid),sourceAnchor=found[0] if len(found)==1 else None,reason='no exact source row or same-target F00 evidence row; keep qualification/navigation only'));continue
  src=found[0]; row=src['row'];
  if re.search(r'SEARCH_ONLY|METADATA_ONLY|未打开正文|仅搜索摘要|仅检索摘要|正文未获|仅目录',row) and not re.search(r'READ_LOCATOR|实际阅读|实际读取|已读|重读',row):
   unlocated.append(dict(sourceId=sid,declaredPath=f,reason='discovery only, not direct evidence'));continue
  # Prefer primary case, then discovery and actual predicate/qualification audit, then exact supporting row.
  def key(x):return (0 if ca and x==ca['anchor'] else 1 if x==a else 2 if x['file'].endswith('-inventory.md') else 3 if x['file'].endswith('theory-g02-predicate-audit.md') else 4,x['file'],x['line'])
  ev=min(evid,key=key);chosen.append(dict(sourceId=sid,sourceAnchor=src,predicateAnchor=ev,routeScope=rr[4] if rr else '仅该旧RETAIN主案例限定；不由历史入口证明更广目标'))
  used.setdefault(sid,[]).append(d)
 proposed='AUTHORING_CANDIDATE' if (isdeep and ca or not isdeep and c[1]=='RETAIN' and ca) and chosen else ('EVIDENCE_OPEN' if isdeep or c[1] in ('RESIDUAL_OPEN','SPLIT_BOUNDARY_OPEN') else 'HISTORICAL_ROUTE')
 if d in ('K01.09.01.02','K01.09.03.02'):proposed='PROJECT_CONTRACT_ROUTE' # project workflow requirements, no irrelevant literature evidence
 if proposed=='EVIDENCE_OPEN' and ca and (isdeep or c[1]=='RETAIN'):missing.append(d)
 item=dict(d4=d,discoveryAnchor=a,priorDisposition=c[1],localQuery=c[2],directCQ=re.findall(r'(CQ\d\d) D',c[3]),supportCQ=re.findall(r'(CQ\d\d) S',c[3]),scope=c[-1] if isdeep else legacy[d][0][-1],primaryCase=ca,originalPredicate=pred[d][0][1] if isdeep else old[d][0][1],originalKind=pred[d][0][2] if isdeep else '历史保留/路由',predicateAudit=pred[d][1] if isdeep else old[d][1],qualificationRoute=qual[d][1] if isdeep else None,branchAudit=audit[d][1] if d in audit else None,branchSupplement=branch.get(d),linkedSupplements=links[d][1] if d in links else None,linkedEvidence=linkedEvidence.get(d,[]),broadScope=broad[d][1] if d in broad else None,scopedR3Cases=broadCases.get(d,[]),historicalPending=pending[d][1] if d in pending else None,legacyAnchor=legacy[d][1] if d in legacy else None,legacyTargets=d4s(legacy[d][0][3]) if d in legacy else [],sourceRoutes=chosen,unlocatedSources=unlocated,proposedDisposition=proposed)
 items.append(item)
assert len(items)==184 and sum(x['primaryCase'] is not None for x in items)==158
assert len({x['d4'] for x in items})==184
write('cases/K01/frozen-input-ledger.json',dict(format='audio-kg-K01-frozen-input-ledger/1',status='AUTHORING_INPUT_ONLY_NOT_ADMITTED',frozenCommit=COMMIT,rows=items))
print(json.dumps(dict(rows=len(items),cases=sum(x['primaryCase'] is not None for x in items),proposed=dict(collections.Counter(x['proposedDisposition'] for x in items)),sources=len(used),missingCandidateRoute=missing),ensure_ascii=False))
for x in items:
 if x['proposedDisposition']=='AUTHORING_CANDIDATE' and x['unlocatedSources']:print(x['d4'],'unlocated',[(a['sourceId'],a.get('reason',str(a.get('sourceRows'))+'/'+str(a.get('predicateEvidenceRows')))) for a in x['unlocatedSources']])
