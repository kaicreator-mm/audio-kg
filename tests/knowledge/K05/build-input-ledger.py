"""Exact current frozen input extraction for K05/K08/K04; no professional admission."""
from pathlib import Path
import json,hashlib,re,functools,collections,subprocess
ROOT=Path(__file__).resolve().parents[3];cal='docs/product/calibration/';res='docs/research/';m=Path(__file__).parent.name
prefix,rev,n,legacyCount,hist={'K05':('vocal-science',4,66,66,38),'K08':('digital-audio',3,54,54,46),'K04':('performance',4,60,60,35)}[m]
frozen=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text());commit=frozen['commit']
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def pinned(file):
 if file in frozen['paths']:return frozen['paths'][file]
 # Historical closure not part of formal F00 projection is exact Git provenance only.
 return subprocess.check_output(['git','rev-parse',commit+':'+file],cwd=ROOT,text=True).strip()
@functools.lru_cache(None)
def lines(file):
 b=(ROOT/file).read_bytes();assert pinned(file)==blob(b),file;return b.decode().splitlines()
def anc(file,i):
 return dict(commit=commit,file=file,blob=pinned(file),line=i,row=lines(file)[i-1])
def cols(l):return [x.strip() for x in l.split('|')[1:-1]]
def sid(s):return list(dict.fromkeys(re.findall(r'\bS\d{3}\b',s)))
def write(file,x):
 p=ROOT/file;p.parent.mkdir(exist_ok=True,parents=True);p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
sourceProviders={}
for owner in ['K01','K07']:
 pack=json.loads((ROOT/('knowledge/'+owner+'/candidate.json')).read_text());qual=json.loads((ROOT/('knowledge/'+owner+'/qualification.json')).read_text())
 for s in pack['records']:
  if s['type']=='Source':sourceProviders[s['id']]=dict(owner=owner,record=s,qualification=next(q for q in qual['sourceQualifications'] if q['source']==s['id']+'@'+str(s['revision'])))
disc=cal+prefix+'-r'+str(rev)+'-discovery-cq.md';items=[];sourceUse=collections.defaultdict(list)
for i,l in enumerate(lines(disc),1):
 if not re.match(r'^\| '+m+r'\.\d\d\.\d\d\.\d\d \|',l):continue
 c=cols(l);assert len(c)==6;d,caselabel,predicate,sourceLinks,ds,ss=c
 cm=re.fullmatch(r'\[([^]]+)\]\(([^)#]+)#L(\d+)\)',caselabel);assert cm,c
 caseid,casefile,ln=cm.groups();a=anc(cal+casefile,int(ln));cc=cols(a['row']);assert cc[:2]==[caseid,d] and len(cc)==7,cc
 droles=ds.split('/');sroles=ss.split('/');assert all(re.fullmatch('CQ(?:0[1-9]|1[0-9]|2[0-6])',x) for x in droles+sroles);assert len(droles+sroles)==len(set(droles+sroles)),(d,droles,sroles)
 refs=[];no=[]
 for sid_,file,line in re.findall(r'\[(S\d{3})\]\(\.\./\.\./research/([^)#]+)#L(\d+)\)',sourceLinks):
  sf=res+file;sa=anc(sf,int(line));assert re.search(r'\b'+sid_+r'\b',sa['row']),(d,sid_,sa);urls=re.findall(r'\[([^]]+)\]\((https?://[^)\s]+)\)',sa['row']);provider=sourceProviders.get(sid_)
  # Record exact original qualification; no assumed same-publication identity if URIs differ.
  route=dict(sourceId=sid_,anchor=sa,registeredLinks=[dict(title=t,uri=u) for t,u in urls],sharedProvider=provider,role='FROZEN_LOCATOR_ONLY')
  refs.append(route);sourceUse[sid_].append((d,sa['file'],sa['line']))
 assert {r['sourceId'] for r in refs}==set(sid(sourceLinks)),(d,sourceLinks)
 items.append(dict(d4=d,caseId=caseid,predicate=predicate,discovery=anc(disc,i),caseAnchor=a,caseSourceLabel=cc[2],forwardExpected=cc[3],forwardNegative=cc[4],reverseWitness=cc[5],reverseBoundary=cc[6],directCQ=droles,supportCQ=sroles,sourceRoutes=refs))
assert len(items)==n and len({x['d4'] for x in items})==n and len({x['caseId'] for x in items})==n
byD={x['d4']:x for x in items}
leg=cal+prefix+'-r'+str(rev)+'-legacy-convergence.md';legacy=[]
for i,l in enumerate(lines(leg),1):
 if not re.match(r'^\| '+m+r'\.\d\d\.\d\d\.\d\d \|',l):continue
 c=cols(l);targets=list(dict.fromkeys(re.findall(m+r'\.\d\d\.\d\d\.\d\d',c[3])));legacy.append(dict(d4=c[0],historicalRequirement=c[1],disposition=c[2],routes=targets,unresolved=[d for d in targets if d not in byD],limits=c[-1],anchor=anc(leg,i),equivalence=False))
cap=cal+prefix+'-r'+str(rev)+'-capability-calibration.md';roles=[]
for i,l in enumerate(lines(cap),1):
 if not re.match(r'^\| '+m+r'\.\d\d \| A0[1-7] \|',l):continue
 c=cols(l);assert len(c)==6,c
 targets=list(dict.fromkeys(re.findall(m+r'\.\d\d\.\d\d\.\d\d',c[4])));assert targets and all(d in byD for d in targets),(m,c,targets)
 roles.append(dict(d2=c[0],ability=c[1],role=c[2],task=c[3],d4Targets=targets,limits=c[-1],anchor=anc(cap,i),externalStatus='UNKNOWN_NOT_EXECUTED'))
assert len({(r['d2'],r['ability']) for r in roles})==len(roles)
closure=cal+prefix+'-r'+str(rev+1)+'-integrated-closure.md'
spl=cal+'g05-r3-split-disposition-candidate.md';splits=[]
for i,l in enumerate(lines(spl),1):
 if re.match(r'^\| K\d\d\.\d\d\.\d\d\.\d\d \|',l) and re.search(r'\b'+m+r'(?:\.|\s|\|)',l):splits.append(dict(anchor=anc(spl,i),status='SPLIT_OPEN_NAVIGATION_ONLY'))
write('cases/'+m+'/frozen-input-ledger.json',dict(format='audio-kg-'+m+'-frozen-input/1',status='AUTHORING_INPUT_ONLY_NOT_ADMITTED',frozenCommit=commit,rows=items,legacyRoutes=legacy,roles=roles,splitRoutes=splits,integratedClosure=dict(file=closure,blob=pinned(closure),commit=commit),historicalFinding=hist))
print(m,len(items),len(legacy),len(roles),len(splits),'source IDs',len(sourceUse),'shared',[s for s in sourceUse if s in sourceProviders])
for sid_,uses in sourceUse.items():
 xs=[r for x in items for r in x['sourceRoutes'] if r['sourceId']==sid_];anchors={(r['anchor']['file'],r['anchor']['line']) for r in xs};urls={u['uri'] for r in xs for u in r['registeredLinks']}
 if len(anchors)!=1 or not urls or sid_ in sourceProviders:print(sid_,'anchors',len(anchors),'urls',len(urls),'provider',sourceProviders.get(sid_,{}).get('owner'),'provider-uri-matched',not sid_ in sourceProviders or sourceProviders[sid_]['record']['uri'] in urls)
