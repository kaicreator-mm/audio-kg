"""Exact frozen module projection; no external access or execution."""
from pathlib import Path
import json, re, hashlib, posixpath, subprocess, collections
ROOT=Path(__file__).resolve().parents[3]
F=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text())
M=Path(__file__).parent.name; P='docs/product/calibration/'; STEM,PREFIX,COUNT,HIST={'K13':('localization','LA',20,60),'K18':('sound-design','SD',44,74),'K19':('live-sound','LS',40,77)}[M]
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
  m=re.fullmatch(rf'({PREFIX}\d{{2}})/({M}\.\d{{2}}\.\d{{2}}\.\d{{2}})',l['label'])
  if m:
   a=target(f,l);c=cols(a['row']);assert c[0]==m[1] and c[1]==m[2]
   r.append(dict(caseId=m[1],d4=m[2],**l))
 return r
def save(f,j):
 p=ROOT/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n')
case={}
for f in [md('r1-knowledge-cases'),md('r2-knowledge-cases')]:
 for n,line in enumerate(read(f),1):
  if not re.match(rf'^\| {PREFIX}\d{{2}} \|',line):continue
  id,d,src,fp,fn,rp,rn=cols(line);assert id not in case
  case[id]=dict(caseId=id,d4=d,caseAnchor=anchor(f,n),forwardExpected=fp,forwardNegative=fn,reverseWitness=rp,reverseBoundary=rn,caseSourceLabel=src)
disc=md('r3-discovery-cq');rows=[];direct=collections.defaultdict(list);support=collections.defaultdict(list);localmap=collections.defaultdict(list);cq=[];local=[]
for n,line in enumerate(read(disc),1):
 if line.startswith('| '+M+'.'):
  d,entry,src,pred=cols(line);cl=case_links(disc,entry);assert len(cl)==1 and cl[0]['d4']==d;id=cl[0]['caseId'];assert case[id]['d4']==d
  routes=[]
  for l in links(src):
   if not re.fullmatch(r'S\d{3}',l['label']):continue
   a=target(disc,l);assert re.match(r'^\| '+l['label']+r'(?:（原ID）)? \|',a['row']),a
   reg=[v for v in links(a['row']) if v['uri'].startswith('https://')]
   if not reg:reg=[dict(label=l['label']+' frozen locator',uri=u) for u in re.findall(r'https://[^\s；，|]+',a['row'])]
   search=l['label'] in ('S142','S631')
   routes.append(dict(sourceId=l['label'],anchor=a,registeredLinks=[] if search else reg,navigationLinks=reg if search else [],role='SEARCH_LEAD_NAVIGATION_ONLY' if search else 'FROZEN_LOCATOR_ONLY'))
  assert routes and any(r['registeredLinks'] for r in routes),(id,routes)
  rows.append(dict(**case[id],predicate=pred,discovery=anchor(disc,n),sourceRoutes=routes))
 elif re.match(r'^\| CQ\d{2} \|',line):
  q,role,x,y=cols(line);entry,scope=(x,y) if M=='K13' else (y,x)
  cl=case_links(disc,entry);ids=[v['caseId'] for v in cl]
  if '上表全部20' in entry:
   assert M=='K13' and role=='S' and not ids;ids=list(case)
  if role=='O':assert not ids
  else:assert ids and len(set(ids))==len(ids),(M,q)
  for id in ids:(direct if role=='D' else support)[id].append(q)
  cq.append(dict(id=q,type=role,question=scope,scope=scope,caseIds=ids,anchor=anchor(disc,n),navigationOnly=role=='O'))
 elif re.match(rf'^\| CQ-{M}-\d{{2}} \|',line):
  q,question,entry,decision=cols(line);ids=[x['caseId'] for x in case_links(disc,entry)];assert ids
  for id in ids:localmap[id].append(q)
  local.append(dict(id=q,question=question,caseIds=ids,decision=decision,anchor=anchor(disc,n)))
assert len(rows)==len(case)==COUNT and len(cq)==26 and len(local)==12
for r in rows:
 id=r['caseId'];r.update(directCQ=sorted(set(direct[id])),supportCQ=sorted(set(support[id])),localCQ=sorted(set(localmap[id])))
assert sum(not r['directCQ'] for r in rows)=={'K13':0,'K18':26,'K19':17}[M]
roles=[];f=md('r3-capability-calibration')
for n,l in enumerate(read(f),1):
 if re.match(rf'^\| {M}\.\d{{2}} \|',l):
  c=cols(l);d,a,role,task,entry=c[:5];lim=c[5] if len(c)==6 else '原域职责及冻结专业任务；非真实执行或权限'
  targets=[x['d4'] for x in case_links(f,entry)]
  historical=[x['label'] for x in links(entry) if re.fullmatch(r'K\d{2}\.\d{2}\.\d{2}\.\d{2}',x['label'])]
  if historical:
   for link in links(entry):
    if link['label'] in historical:assert link['label'] in target(f,link)['row']
  assert targets or historical,(M,d,a)
  roles.append(dict(d2=d,ability=a,role=role,task=task,d4Targets=targets,historicalTargets=historical,status='ACTIVE' if targets else 'HISTORICAL_ROUTE_ONLY',limits=lim,anchor=anchor(f,n),externalStatus='UNKNOWN_NOT_EXECUTED'))
assert len(roles)=={'K13':56,'K18':77,'K19':70}[M]
assert sum(r['status']=='ACTIVE' for r in roles)=={'K13':28,'K18':77,'K19':70}[M]
legacy=[];splits=[];migration=[];f=md('r3-legacy-convergence');g05=P+'g05-r3-split-disposition-candidate.md'
def g05anchor(d):
 gg=[i for i,line in enumerate(read(g05),1) if line.startswith('| '+d+' |')];assert len(gg)==1,(d,gg);return anchor(g05,gg[0])
if M=='K13':
 for n,l in enumerate(read(f),1):
  if not re.match(r'^\| K13\.\d{2}\.\d{2}\.\d{2} \|',l):continue
  d,req,src,oldstate,oldroute,disp,entry=cols(l);rr=case_links(f,entry);al=next(x for x in links(src) if x['label']==d);orig=target(f,al)
  assert orig['row'].startswith('| '+d+' |')
  item=dict(sourceD4=d,originalRequirement=req,originalInventory=src,originalState=oldstate,originalRoute=oldroute,disposition=disp,routes=[x['d4'] for x in rr],routeLinks=rr,equivalence=False,status='SPLIT_OPEN_NAVIGATION_ONLY' if oldstate.startswith('SPLIT') else disp,anchor=anchor(f,n),originalMigrationAnchor=orig)
  if oldstate.startswith('SPLIT'):item['g05Anchor']=g05anchor(d);splits.append(item)
  legacy.append(item);migration.append(item)
 assert len(legacy)==48 and len(splits)==22
elif M=='K19':
 for n,l in enumerate(read(f),1):
  if l.startswith('| [K19.'):
   c=cols(l);d=links(c[0])[0]['label'];rr=case_links(f,c[3]);assert [x['d4'] for x in rr]==[d]
   item=dict(sourceD4=c[2],originalRequirement=c[1],routes=[d],routeLinks=rr,equivalence=False,status='D25_CANDIDATE_NAVIGATION_ONLY',anchor=anchor(f,n),originalCandidateAnchor=target(f,links(c[0])[0]))
   legacy.append(item);migration.append(item)
  elif l.startswith('| [K09.'):
   old,state,route,predicate,entry=cols(l);d=links(old)[0]['label'];rr=case_links(f,entry)
   item=dict(sourceD4=d,originalState=state,originalRoute=route,predicateRoute=predicate,routes=[x['d4'] for x in rr],routeLinks=rr,status='SPLIT_OPEN_NAVIGATION_ONLY',equivalence=False,anchor=anchor(f,n),g05Anchor=g05anchor(d),originalMigrationAnchor=target(f,links(old)[0]),originalPredicateAnchor=target(f,links(predicate)[0]))
   splits.append(item);migration.append(item)
 assert len(legacy)==len(splits)==6
else:
 assert M=='K18'
ownership=[anchor(f,n) for n,l in enumerate(read(f),1) if re.match(r'^\| K18\.\d{2} \|',l)]
f=md('r4-integrated-closure');lines=read(f);heads=[(n,l) for n,l in enumerate(lines,1) if l.startswith('## ')];cases=[];history=[]
for i,(n,title) in enumerate(heads):
 end=heads[i+1][0] if i+1<len(heads) else len(lines)+1
 if title.startswith(('## 实际','## G04 实际')):
  history.extend(dict(text=lines[j-1],anchor=anchor(f,j)) for j in range(n,end) if lines[j-1].strip());continue
 id=title.split()[1].split('：')[0]
 if title.startswith('## G04 R2b'):id='G04-R2b'
 cases.append(dict(caseId=id,headingAnchor=anchor(f,n),body=[dict(text=lines[j-1],anchor=anchor(f,j)) for j in range(n+1,end) if lines[j-1].strip()],status='FROZEN_FINITE_CONDITIONS_NOT_EXECUTED'))
scenario=dict(id={'K13':'KC-L13','K18':'KC-SD18','K19':'KC-LS19'}[M],realExecutionAllowed=False,realRights='UNKNOWN',realAuditionAllowed=False,anchors=[c['headingAnchor'] for c in cases])
scenario['entryLinks']=[]
scenario['allCaseLinks']=[]
for c in cases:
 for b in c['body']:
  for l in case_links(b['anchor']['file'],b['text']):
   if l not in scenario['entryLinks']:scenario['entryLinks'].append(l)
  for l in links(b['text']):
   if re.fullmatch(rf'{PREFIX}\d{{2}}(?:/{M}\.\d{{2}}\.\d{{2}}\.\d{{2}})?',l['label']):
    a=target(b['anchor']['file'],l);c=cols(a['row']);assert c[0]==l['label'].split('/')[0]
    item=dict(**l,caseId=c[0],d4=c[1],targetAnchor=a)
    if item not in scenario['allCaseLinks']:scenario['allCaseLinks'].append(item)
# Include source qualification extension (not a new Source record or promotion of old qualification).
if M=='K13':
 src='docs/research/source-qualification-localization-r1-r2.md'
 scenario['qualificationExtensions']=[anchor(src,n) for n,l in enumerate(read(src),1) if l.startswith(('既有S144','S137 Watkins'))]
 scenario['anchors']+=scenario['qualificationExtensions']
 scenario.update(baseline=dict(original='O1',meaning=['return','tomorrow','positive','promise'],score='N1',clock='PPQ480',bpm=120,note=[60,62,64,62],duration=[480,480,240,240],rests=[],noteIds=['n1','n2','n3','n4'],language='my',dialect='D1'),candidate=dict(translation='V1',alignment='A1',syllables=['s1','s2','s3'],groups=[['n1'],['n2'],['n3','n4']]),receipt=dict(original='O1',translation='V1',score='N1',alignment='A1',output='Y1',language='my',dialect='D1',population='G1',protocol='Q1',permission='E1',config='C1',result='EV1'),casesExpected=[dict(id='C'+str(i),expected=e) for i,e in enumerate(['PENDING_EVIDENCE','REJECT_HARD','REJECT_HARD','REJECT_HARD','STOP_PERMISSION','PENDING_EVIDENCE','PENDING_EVIDENCE'],1)])
else:
 # Exact executable frozen JS is also projected as source text (not counted as present execution).
 start=next(i for i,l in enumerate(lines,1) if l=='```javascript');end=next(i for i,l in enumerate(lines,1) if i>start and l=='```')
 scenario['frozenWitness']=dict(start=anchor(f,start),end=anchor(f,end),source='\n'.join(lines[start:end-1])+'\n')
 scenario['anchors'] += [anchor(f,n) for n in range(start+1,end)]
integ=dict(status='KNOWLEDGE_ONLY_NOT_EXECUTED',cases=cases,scenario=scenario,history=history)
ledger=dict(format='audio-kg-frozen-input-ledger/1',status='CANDIDATE_ONLY_NOT_ADMITTED',frozenCommit=F['commit'],rows=rows,legacyRoutes=legacy,roles=roles,migrationRows=migration,splitRoutes=splits,ownershipRoutes=ownership,integratedCases=cases,integratedScenario=scenario,integratedClosure=integ,historicalFinding=HIST,historicalOpenIssues=[dict(number=HIST,status='OPEN_NOT_CLOSED_BY_THIS_TASK')],localQuestions=local,cqInventory=cq)
save('cases/'+M+'/frozen-input-ledger.json',ledger);save('cases/'+M+'/integrated-cases.json',integ)
print(M,len(rows),len(roles),len(legacy),len(splits),len(cases),len(scenario['entryLinks']))
