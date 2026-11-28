"""Project frozen K12 inputs; no external access or execution."""
from pathlib import Path
import json, re, hashlib, posixpath, subprocess, collections
ROOT=Path(__file__).resolve().parents[3]
F=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text())
M='K12'; P='docs/product/calibration/'; STEM='tools-orchestration'
def md(s):return P+STEM+'-'+s+'.md'
def read(f):return (ROOT/f).read_text().splitlines()
def anchor(f,n):
 b=(ROOT/f).read_bytes();h=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
 expected=F['paths'].get(f) or subprocess.check_output(['git','rev-parse',F['commit']+':'+f],cwd=ROOT,text=True).strip()
 assert h==expected,(f,h,expected)
 return dict(commit=F['commit'],file=f,blob=h,line=n,row=b.decode().splitlines()[n-1])
def cols(l):return [x.strip() for x in l.strip('|').split('|')]
# Frozen paths and labels; bounded balanced URL parser, excluding literal mask brackets.
def links(s):
 result=[]
 for m in re.finditer(r'\[([^\[\]\r\n]+)\]\(',s):
  start=m.end();depth=1;end=start
  while end<len(s):
   ch=s[end]
   if ch=='\\':end+=2;continue
   if ch=='(':depth+=1
   if ch==')':
    depth-=1
    if depth==0:break
   end+=1
  if depth==0:
   dest=s[start:end].strip()
   if dest and not any(x.isspace() for x in dest):result.append(dict(label=m[1],uri=dest))
 return result
def target(f,l):
 p,frag=l['uri'].split('#',1);assert re.fullmatch(r'L\d+',frag)
 return anchor(posixpath.normpath(posixpath.join(posixpath.dirname(f),p)),int(frag[1:]))
def case_links(f,s):
 r=[]
 for l in links(s):
  m=re.fullmatch(r'(TO\d{2})/(K12\.\d{2}\.\d{2}\.\d{2})',l['label'])
  if m:
   a=target(f,l);c=cols(a['row']);assert c[0]==m[1] and c[1]==m[2]
   r.append(dict(caseId=m[1],d4=m[2],**l))
 return r
def save(f,j):
 p=ROOT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n')
case={}
for f in [md('r1-knowledge-cases'),md('r2-knowledge-cases')]:
 for n,line in enumerate(read(f),1):
  if not re.match(r'^\| TO\d{2} \|',line):continue
  id,d,src,fp,fn,rp,rn=cols(line);assert id not in case
  case[id]=dict(caseId=id,d4=d,caseAnchor=anchor(f,n),forwardExpected=fp,forwardNegative=fn,reverseWitness=rp,reverseBoundary=rn,caseSourceLabel=src)
disc=md('r3-discovery-cq');rows=[];direct=collections.defaultdict(list);support=collections.defaultdict(list);localmap=collections.defaultdict(list);cq=[];local=[]
for n,line in enumerate(read(disc),1):
 if line.startswith('| K12.'):
  d,entry,src,pred=cols(line);cl=case_links(disc,entry);assert len(cl)==1 and cl[0]['d4']==d;id=cl[0]['caseId'];assert case[id]['d4']==d
  routes=[]
  for l in links(src):
   if not re.fullmatch(r'S\d{3}',l['label']):continue
   a=target(disc,l);assert re.match(r'^\| '+l['label']+r' \|',a['row']),a
   reg=[v for v in links(a['row']) if v['uri'].startswith('https://')]
   if not reg:reg=[dict(label=l['label']+' frozen locator',uri=u) for u in re.findall(r'https://[^\s；，|]+',a['row'])]
   # Search-only locators are retained for navigation, not active supporting evidence.
   search=l['label'] in ('S539','S547')
   routes.append(dict(sourceId=l['label'],anchor=a,registeredLinks=[] if search else reg,navigationLinks=reg if search else [],role='SEARCH_LEAD_NAVIGATION_ONLY' if search else 'FROZEN_LOCATOR_ONLY'))
  assert routes and any(r['registeredLinks'] for r in routes),(id,routes)
  rows.append(dict(**case[id],predicate=pred,discovery=anchor(disc,n),sourceRoutes=routes))
 elif re.match(r'^\| CQ\d{2} \|',line):
  q,role,entry,scope=cols(line);cl=case_links(disc,entry)
  ids=[x['caseId'] for x in cl]
  if '上表全部54条' in entry:
   assert role=='S' and not ids;ids=list(case)
  if role=='O':assert not ids
  else:assert ids and len(set(ids))==len(ids)
  for id in ids:(direct if role=='D' else support)[id].append(q)
  cq.append(dict(id=q,type=role,question=scope,scope=scope,caseIds=ids,anchor=anchor(disc,n),navigationOnly=role=='O'))
 elif re.match(r'^\| CQ-K12-\d{2} \|',line):
  q,question,entry,decision=cols(line);ids=[x['caseId'] for x in case_links(disc,entry)];assert ids
  for id in ids:localmap[id].append(q)
  local.append(dict(id=q,question=question,caseIds=ids,decision=decision,anchor=anchor(disc,n)))
assert len(rows)==len(case)==54 and len(cq)==26 and len(local)==12
for r in rows:
 id=r['caseId'];r.update(directCQ=sorted(set(direct[id])),supportCQ=sorted(set(support[id])),localCQ=sorted(set(localmap[id])));assert r['directCQ']
roles=[];f=md('r3-capability-calibration')
for n,l in enumerate(read(f),1):
 if re.match(r'^\| K12\.\d{2} \|',l):
  d,a,role,task,entry,lim=cols(l);targets=[x['d4'] for x in case_links(f,entry)]
  roles.append(dict(d2=d,ability=a,role=role,task=task,d4Targets=targets,historicalTargets=[],status='ACTIVE',limits=lim,anchor=anchor(f,n),externalStatus='UNKNOWN_NOT_EXECUTED'))
assert len(roles)==63 and all(x['role']=='P' for x in roles)
legacy=[];splits=[];f=md('r3-legacy-convergence')
g05=P+'g05-r3-split-disposition-candidate.md'
for n,l in enumerate(read(f),1):
 if l.startswith('| K12.'):
  d,req,src,disp,entry,limits=cols(l);rr=case_links(f,entry)
  legacy.append(dict(sourceD4=d,originalRequirement=req,originalInventory=src,disposition=disp,routes=[x['d4'] for x in rr],routeLinks=rr,unresolved=[],limits=limits,equivalence=False,status=disp,anchor=anchor(f,n)))
 elif re.match(r'^\| \[K(?:13|09)\.',l):
  old,state,scope,entry=cols(l);d=links(old)[0]['label'];rr=case_links(f,entry)
  gg=[i for i,line in enumerate(read(g05),1) if line.startswith('| '+d+' |')];assert len(gg)==1
  splits.append(dict(sourceD4=d,originalState=state,predicateScope=scope,routes=[x['d4'] for x in rr],routeLinks=rr,status='SPLIT_OPEN_NAVIGATION_ONLY',equivalence=False,anchor=anchor(f,n),g05Anchor=anchor(g05,gg[0]),originalMigrationAnchor=target(f,links(old)[0])))
assert len(legacy)==54 and len(splits)==8
# Keep exact historical RV01–04 and the complete integrated case, not verdict rows alone.
f=md('r4-integrated-closure');rv=md('r6-review-remediation')
blocks=[]
for n,l in enumerate(read(f),1):
 if l.startswith(('## EX01','## EX02','## KC-TO12','## R6 ')):
  blocks.append((n,l))
cases=[]
for i,(n,title) in enumerate(blocks):
 end=blocks[i+1][0] if i+1<len(blocks) else len(read(f))+1
 if title.startswith('## KC-TO12'):
  end=next(j for j in range(n+1,end) if read(f)[j-1].startswith('## 本轮实际有限'))
 if title.startswith('## R6 '):continue
 cases.append(dict(caseId=title.split()[1].split('：')[0],headingAnchor=anchor(f,n),body=[dict(text=read(f)[j-1],anchor=anchor(f,j)) for j in range(n+1,end) if read(f)[j-1].strip()],status='FROZEN_FINITE_CONDITIONS_NOT_EXECUTED'))
heads=[(i,l) for i,l in enumerate(read(rv),1) if l.startswith('## RV')]
for k,(n,title) in enumerate(heads):
 end=heads[k+1][0] if k+1<len(heads) else next(i for i,l in enumerate(read(rv),1) if l.startswith('## 实际有限'))
 cases.append(dict(caseId=title.split()[1],headingAnchor=anchor(rv,n),body=[dict(text=read(rv)[j-1],anchor=anchor(rv,j)) for j in range(n+1,end) if read(rv)[j-1].strip()],status='FROZEN_FINITE_CONDITIONS_NOT_EXECUTED'))
assert len(cases)==7
baseline=dict(project='P0',source='S0',clock='PPQ480_T120',note=[60,64,67,60],dur=[480]*4,lyrics=['a','b','c','d'],backing=[1,2,3,4],voice=[10,20,30,40],target='T0',automation=[.4,.6],plugin='P1/state-A')
candidate={**baseline,'project':'P1','target':'T1','voice':[10,71,72,40]}
receipt=dict(source='S0',condition='C0',model='M1',tool='G1',host='H1',format='F1',permission='E1',mask='1:3',clock='PPQ480_T120',target='T1',output='Y1',protocol='Q1',config=dict(seed=11,gain=.8,schema='sch1'),outputDigest='digestA',outputRev=1)
scenario=dict(id='KC-TO12',baseline=baseline,candidate=candidate,mask=dict(source='S0@rev7',clock='clk0',coordinate='SOURCE_INDEX',start=1,end=3),voiceIds=['u0','u1','u2','u3'],reportIdentity=receipt,realExecutionAllowed=False,realRights='UNKNOWN',realAuditionAllowed=False,anchors=[anchor(f,i) for i in [15,18,19,20,21,22,23,24,25,26,27,28,29,31,32]]+[anchor(rv,i) for i in [23,24,25]])
# RV01 exact documented cards; no actual installation, model or permission.
cardRows=[]
for i,l in enumerate(read(rv),1):
 if 7<=i<=13 and l.startswith('| '):
  col=cols(l)
  assert len(col)==3
  cardRows.append(dict(field=col[0],musicgen=col[1],diffsinger=col[2],anchor=anchor(rv,i)))
assert len(cardRows)==7
scenario['modelCards']=dict(musicgen=dict(id='MC-MG',model='facebook/musicgen-melody',cardRevision='4326add9aea0fdd07d62c7bbf789493fc99547f6',source='S550',documentedMode='TEXT_CHROMA',weightHash='UNKNOWN',runtime='UNKNOWN',referenceUse='UNKNOWN',lyricsControl='NOT_DOCUMENTED',realVocal='DOCUMENTED_LIMITATION'),diffsinger=dict(id='MC-DS',model='DiffSinger MIDI SVS B',codeCommit='4662c53a27a5ac662821eae23a7d71cfcff7356d',package='0228_opencpop_ds100_rel.zip',source='S551',documentedMode='CHINESE_SCORE',weightHash='UNKNOWN',runtime='UNKNOWN',referenceUse='UNKNOWN',myanmar='UNKNOWN'),rows=cardRows,selectionAnchor=anchor(rv,15))
scenario['entryLinks']=[]
for c in cases:
 for b in c['body']:
  for l in case_links(b['anchor']['file'],b['text']):
   if l not in scenario['entryLinks']:scenario['entryLinks'].append(l)
scenario['expectedCases']=[
 dict(id='C1',change={},expected='SCOPED_SYNTHETIC_CANDIDATE'),
 *[dict(id='C'+str(i),change=change,expected='REJECT_PROTECTION') for i,change in enumerate([
  dict(clock='PPQ960_T120'),dict(dur=[480,960,480,480]),dict(target='T2'),dict(note=[60,65,67,60]),dict(lyrics=['a','c','b','d']),dict(backing=[1,99,3,4]),dict(voice=[99,71,72,40]),dict(automation=[.4,.8]),dict(plugin='P2/state-A'),dict(project='P0'),dict(source='S1')],2)]]
scenario['gates']=dict(permissionFailure='STOP_PERMISSION',protectionFailure='REJECT_PROTECTION',evidenceUnknown='PENDING_EVIDENCE',auditionUnknown='STOP_AUDITION',syntheticPass='SCOPED_SYNTHETIC_CANDIDATE')
scenario['lesson']=dict(id='L1',task='editable_exchange',source='H1',target='H2',format='F1',plugin='P1',field='state',scope='preserve_state',permission='E1',candidate='X1',evidence='EV1',status='REVIEW_PENDING',outcome='STATE_MISSING',anchor=anchor(rv,21))
integ=dict(status='KNOWLEDGE_ONLY_NOT_EXECUTED',cases=cases,scenario=scenario,history=[])
ledger=dict(format='audio-kg-frozen-input-ledger/1',status='CANDIDATE_ONLY_NOT_ADMITTED',frozenCommit=F['commit'],rows=rows,legacyRoutes=legacy,roles=roles,migrationRows=legacy+splits,splitRoutes=splits,integratedCases=cases,integratedScenario=scenario,integratedClosure=integ,historicalFinding=None,historicalOpenIssues=[],localQuestions=local,cqInventory=cq)
save('cases/K12/frozen-input-ledger.json',ledger);save('cases/K12/integrated-cases.json',integ)
print('K12 ledger',len(rows),len(roles),len(legacy),len(splits),len(cases))
