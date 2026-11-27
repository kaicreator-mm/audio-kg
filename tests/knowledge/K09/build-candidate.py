from pathlib import Path
import json,hashlib,re,collections,subprocess
ROOT=Path(__file__).resolve().parents[3];m=Path(__file__).parent.name;F=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text());commit=F['commit']
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def write(f,x):
 p=ROOT/f;p.parent.mkdir(parents=True,exist_ok=True);b=(json.dumps(x,ensure_ascii=False,indent=2)+'\n').encode();p.write_bytes(b);return blob(b)
def verify(a):
 b=(ROOT/a['file']).read_bytes();h=F['paths'].get(a['file'])
 if h is None:h=subprocess.check_output(['git','rev-parse',commit+':'+a['file']],cwd=ROOT,text=True).strip()
 assert a['commit']==commit and h==a['blob']==blob(b) and b.decode().splitlines()[a['line']-1]==a['row'],a['file']
def anchor(f,i):
 b=(ROOT/f).read_bytes();a=dict(commit=commit,file=f,blob=blob(b),line=i,row=b.decode().splitlines()[i-1]);verify(a);return a
ledger=json.loads((ROOT/('cases/'+m+'/frozen-input-ledger.json')).read_text());rows=ledger['rows'];by={r['caseId']:r for r in rows};byD={r['d4']:r for r in rows}
auth={}
for l in (ROOT/('knowledge/'+m+'/authoring.tsv')).read_text().splitlines():
 id,*v=l.split('\t');assert id not in auth and len(v)==9 and all(v), (id,len(v));auth[id]=v
assert set(auth)==set(by),(set(by)-set(auth),set(auth)-set(by))
def cid(id):return id if '@' in id else m+'-CL-'+id+'@1'
def ctx(id):return m+'-CTX-'+id+'@1'
def ref(r):return r['id']+'@'+str(r['revision'])
def rec(t,id,**x):return dict(id=id,revision=1,type=t,**({'owner':m} if t!='Source' else {}),**x)
ext={};sourceProviders={};entries=[]
for owner in ['K01','K07','K04','K05','K08','K02','K03','K06']:
 pp='knowledge/'+owner+'/candidate.json';mp='knowledge/'+owner+'/qualification.json';pack=json.loads((ROOT/pp).read_text());qual=json.loads((ROOT/mp).read_text())
 entries.append(dict(pack=pp,manifest=mp,manifestBlob=blob((ROOT/mp).read_bytes())))
 for r in pack['records']:
  if r['type']=='Claim':ext[ref(r)]=r
  if r['type']=='Source':
   if r['id'] not in sourceProviders:sourceProviders[r['id']]=dict(owner=owner,record=r)
   else:assert sourceProviders[r['id']]['record'].get('uri')==r.get('uri'),r['id']
rels=collections.defaultdict(list)
for l in (ROOT/('knowledge/'+m+'/relation-authoring.tsv')).read_text().splitlines():
 a,k,b,why=l.split('\t');assert a in by and (b in by or b in ext) and a!=b and k in ('H','O') and (k,b) not in [(x[0],x[1]) for x in rels[a]];rels[a].append((k,b,why))
records=[];edges=[];bindings=[];sq=[];eq=[];ob=[];inv=[];provenance=[];src={};formal={}
for r in rows:
 verify(r['discovery']);verify(r['caseAnchor']);ids=[]
 for route in r['sourceRoutes']:
  verify(route['anchor']);sid=route['sourceId'];a=route['anchor'];links=route['registeredLinks'];provider=sourceProviders.get(sid)
  if provider:
   p=provider['record'];verify(p['anchor'])
   if links:assert p['uri'] in [u['uri'] for u in links],(m,sid,p['uri'],links)
   ids.append(sid+'@1')
   provenance.append(dict(sourceId=sid,anchor=a,d4=r['d4'],formalUse='REUSE_EXACT_CANONICAL_PROVIDER' if links else 'REUSE_CANONICAL_PROVIDER_NO_LOCAL_URI_LINK',provider=provider['owner'],canonicalAnchor=p['anchor'],uri=p['uri'],localUriLinkPresent=bool(links)))
   continue
  if not links:
   provenance.append(dict(sourceId=sid,anchor=a,d4=r['d4'],formalUse='NAVIGATION_ONLY_NO_QUALIFIED_URI'))
   continue
  assert sid not in src or src[sid]['anchor']==a,(sid,a)
  if sid not in src:src[sid]=dict(anchor=a,links=links,uses=[])
  src[sid]['uses'].append(dict(d4=r['d4'],discovery=r['discovery']))
  ids.append(sid+'@1')
 formal[r['caseId']]=ids
for id,x in sorted(src.items()):
 a=x['anchor'];link=x['links'][0];row=a['row'];last=row.split('|')[-2].strip() if '|' in row else row
 grade='ABSTRACT_READ' if last.startswith('ABSTRACT_READ') else 'READ_LOCATOR' if re.search('READ_LOCATOR|重读|已读|实际阅读',row) else 'REGISTERED_LIMITED'
 if last.startswith('SEARCH_ONLY'):grade='REGISTERED_LIMITED'
 limits=row+'；继承冻结资格定位，未在本轮外部重读；同出版谱系不作为独立重复证据。'
 records.append(rec('Source',id,sourceId=id,title=link['title'],author='UNKNOWN_NOT_PINNED',version='UNKNOWN_EXACT_VERSION',publicationDate='UNKNOWN_NOT_PINNED',accessDate='FROZEN_HISTORICAL_DATE_NOT_EXACT',uri=link['uri'],locator=row,grade=grade,rights='UNKNOWN_NO_IMPORT',anchor=a))
 sq.append(dict(source=id+'@1',scope=row,limits=limits,locatorKind='FROZEN_QUALIFICATION_LOCATOR',accessedUri=link['uri']))
 provenance.append(dict(sourceId=id,anchor=a,allRegisteredLinks=x['links'],uses=x['uses'],scope=limits,formalUse='QUALIFIED_CANDIDATE_LOCATOR_NOT_ADMISSION'))
def edge(id,k,to,scope,limit):
 e=m+'-E-'+id+'-'+k.upper().replace('_','-')+'-'+to.split('@')[0];edges.append(dict(id=e,type=k,**{'from':cid(id)},to=to,condition=ctx(id)));eq.append(dict(edge=e,scope=scope,limits=limit));return e
for r in rows:
 id=r['caseId'];d=r['d4'];statement,fq,fpa,fnq,fnr,rpq,rpa,rnq,rnr=auth[id]
 limit=r['reverseBoundary']+'；仅冻结范围及明确合成题设，不作实际观察、授权、效果、宿主或质量证明。'
 condition='限定专业谓词：'+r['predicate']+'；来源条件：'+r['caseSourceLabel']+'；各方向题设独立。'
 views=[]
 for direction,polarity,q,answer,reason,w in [('FORWARD','POSITIVE',fq,fpa,statement,r['forwardExpected']),('FORWARD','NEGATIVE',fnq,'REJECT_MISAPPLICATION_OR_OUT_OF_SCOPE',fnr,r['forwardNegative']),('REVERSE','POSITIVE',rpq,rpa,statement,r['reverseWitness']),('REVERSE','NEGATIVE',rnq,'REJECT_UNSUPPORTED_INFERENCE_OR_RETAIN_UNKNOWN',rnr,r['reverseBoundary'])]:
  assert q!=answer and q!=reason and len(reason)>3
  exp=('裁定：拒绝错误适用或无证据强推。理由：'+reason if polarity=='NEGATIVE' else '限定核验依据：'+reason+'；本题答案：'+answer)
  views.append(dict(direction=direction,polarity=polarity,context=ctx(id),question=q,example=dict(frozenCase=id,frozenWitness=w,frozenCaseRole='FROZEN_GROUP_PROVENANCE_NOT_ACTIVE_QUESTION',directionSpecificProblem=q,expectedResult=answer,reasoningBasis=reason,witnessRole='NEGATIVE_INPUT_OR_BOUNDARY_NOT_FACT' if polarity=='NEGATIVE' else 'SCOPED_SYNTHETIC_EXPECTED_NOT_OBSERVED',anchor=r['caseAnchor'],observationStatus='SYNTHETIC_EXPECTED_NOT_OBSERVED'),explanation=exp,limits=limit,evidenceKind='SYNTHETIC_EXPECTED_NOT_OBSERVED'))
 assert formal[id],(m,id,'no qualified source for claim')
 records.append(rec('Context',ctx(id).split('@')[0],condition=condition))
 records.append(rec('Claim',cid(id).split('@')[0],d4=d,kind='practice',statement=statement,context=ctx(id),status='CANDIDATE',limits=limit,cq=sorted(r['directCQ'])))
 inv.append(dict(line=r['discovery']['line'],d4=d,disposition='CANDIDATE',claimRefs=[cid(id)],reason='冻结主案例与来源资格；作者限定专业命题；非准入。'))
 ev=m+'-EV-'+id;records.append(rec('Evidence',ev,kind='L1_RESEARCH_LOCATOR',sources=sorted(set(formal[id])),anchor=r['discovery'],limits='冻结资格定位及方法范围，不宣称外部独立复现；'+limit));edge(id,'supported_by',ev+'@1','来源定位及限定专业范围。',limit);edge(id,'applies_under',ctx(id),'明确题设及证据条件。',limit)
 g=m+'-GR-'+id;records.append(rec('CaseGroup',g,d4=d,claim=cid(id),kind='SYNTHETIC'));hard=[]
 for role,target,why in rels[id]:
  dest=cid(target);e=edge(id,'requires' if role=='H' else 'references',dest,why,'限定必要知识，供给方适用性另核。' if role=='H' else '可选导航，非等价或逻辑逆。')
  if role=='H':hard.append(dest);ob.append(dict(edge=e,consumer=cid(id),provider=dest,condition=ctx(id),providerContext=ext[dest]['context'] if dest in ext else ctx(target),group=g+'@1'))
 for v in views:
  key=('F' if v['direction']=='FORWARD' else 'R')+('P' if v['polarity']=='POSITIVE' else 'N');vid=m+'-V-'+id+'-'+key;records.append(rec('CaseView',vid,group=g+'@1',**v));bindings.append(dict(id=m+'-B-'+id+'-'+key+'-PRIMARY',view=vid+'@1',claim=cid(id),role='PRIMARY_TARGET',condition=ctx(id)))
  for dest in hard:bindings.append(dict(id=m+'-B-'+id+'-'+key+'-H-'+dest.split('@')[0],view=vid+'@1',claim=dest,role='REQUIRES',condition=ctx(id)))
pack=dict(format='audio-kg-candidate/1',owner=m,coverageMode='MODULE',inventory=inv,records=records,edges=edges,bindings=bindings);pp='knowledge/'+m+'/candidate.json';pb=write(pp,pack);mp='knowledge/'+m+'/qualification.json';mb=write(mp,dict(format='audio-kg-qualification/1',owner=m,status='CANDIDATE_QUALIFICATION_ONLY',packBlob=pb,sourceQualifications=sq,edgeQualifications=eq,obligations=ob))
cb=write('knowledge/'+m+'/controller-input.json',dict(entries=[*entries,dict(pack=pp,manifest=mp,manifestBlob=mb)],allowFixture=False,priorRegistry=None))
write('sources/'+m+'/provenance.json',dict(format='audio-kg-'+m+'-provenance/1',status='CANDIDATE_NOT_ADMITTED',frozenCommit=commit,sources=provenance))
write('queries/'+m+'/discovery-index.json',dict(status='CANDIDATE_NOT_ADMITTED',rows=[dict(d4=r['d4'],claim=cid(r['caseId']),directCQ=r['directCQ'],supportCQ=r['supportCQ'],caseId=r['caseId'],anchor=r['discovery']) for r in rows]))
write('queries/'+m+'/legacy-routes.json',dict(status='CONDITIONAL_NAVIGATION_NO_EQUIVALENCE',routes=[dict(**r,claimRefs=[cid(byD[d]['caseId']) for d in r['routes'] if d in byD]) for r in ledger['legacyRoutes']],splitRoutes=ledger['splitRoutes'],historicalFinding=ledger['historicalFinding'],historicalStatus='OPEN_GATE_NOT_CLOSED_BY_AUTHOR'))
write('queries/'+m+'/capability-index.json',dict(status='KNOWLEDGE_ONLY_NOT_PERMISSION',roles=[dict(**r,claimRefs=[cid(byD[d]['caseId']) for d in r['d4Targets']],localWitnesses=[dict(caseId=byD[d]['caseId'],claim=cid(byD[d]['caseId']),problem=auth[byD[d]['caseId']][1],reject=auth[byD[d]['caseId']][4]) for d in r['d4Targets']]) for r in ledger['roles']]))
print(json.dumps(dict(module=m,rows=len(rows),claims=len(inv),records=len(records),edges=len(edges),bindings=len(bindings),sources=len(src),reused=sum(1 for x in provenance if x['formalUse'].startswith('REUSE_')),H=sum(e['type']=='requires' for e in edges),O=sum(e['type']=='references' for e in edges),obligations=len(ob),views=sum(r['type']=='CaseView' for r in records),roles=len(ledger['roles']),activeRoleTargets=sum(len(r['d4Targets']) for r in ledger['roles']),historicalRoles=sum(1 for r in ledger['roles'] if r['historicalTargets']),legacy=len(ledger['legacyRoutes']),splits=len(ledger['splitRoutes']),packBlob=pb,manifestBlob=mb,controllerBlob=cb)))
