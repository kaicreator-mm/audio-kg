"""K04 exact frozen, independently authored four-view candidate; no automatic admission."""
from pathlib import Path
import json,hashlib,re,collections
ROOT=Path(__file__).resolve().parents[3];m='K04';F=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text());commit=F['commit']
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def write(f,x):
 p=ROOT/f;p.parent.mkdir(exist_ok=True,parents=True);b=(json.dumps(x,ensure_ascii=False,indent=2)+'\n').encode();p.write_bytes(b);return blob(b)
def verify(a):
 b=(ROOT/a['file']).read_bytes();assert a['commit']==commit and F['paths'][a['file']]==a['blob']==blob(b) and b.decode().splitlines()[a['line']-1]==a['row'],a['file']
ledger=json.loads((ROOT/'cases/K04/frozen-input-ledger.json').read_text());rows=ledger['rows'];by={r['caseId']:r for r in rows};byD={r['d4']:r for r in rows};assert len(by)==60
auth={}
for l in (ROOT/'knowledge/K04/authoring.tsv').read_text().splitlines():
 id,*v=l.split('\t');assert id not in auth and len(v)==9 and all(v);auth[id]=v
assert set(auth)==set(by)
def cid(id):return id if '@' in id else 'K04-CL-'+id+'@1'
def ctx(id):return 'K04-CTX-'+id+'@1'
def ref(r):return r['id']+'@'+str(r['revision'])
def rec(t,id,**x):return dict(id=id,revision=1,type=t,**({'owner':m} if t!='Source' else {}),**x)
provider=json.loads((ROOT/'knowledge/K01/candidate.json').read_text());ext={ref(r):r for r in provider['records'] if r['type']=='Claim'}
rels=collections.defaultdict(list)
for l in (ROOT/'knowledge/K04/relation-authoring.tsv').read_text().splitlines():
 a,k,b,why=l.split('\t');assert a in by and (b in by or b in ext) and a!=b and k in ('H','O') and (k,b) not in [(x[0],x[1]) for x in rels[a]];rels[a].append((k,b,why))
records=[];edges=[];bindings=[];sq=[];eq=[];ob=[];inv=[];provenance=[];src={}
for r in rows:
 verify(r['discovery']);verify(r['caseAnchor'])
 for s in r['sourceRoutes']:
  verify(s['anchor']);verify(s['qualifiedSourceAnchor']);assert not s['sharedProvider'] and s['registeredLinks']
  sid=s['sourceId'];assert sid not in src or src[sid]['anchor']==s['qualifiedSourceAnchor']
  if sid not in src:src[sid]=dict(anchor=s['qualifiedSourceAnchor'],links=s['registeredLinks'],uses=[])
  src[sid]['uses'].append(dict(d4=r['d4'],discovery=r['discovery'],originalQualification=s['anchor']))
assert len(src)==34
for id,x in sorted(src.items()):
 a=x['anchor'];link=x['links'][0];row=a['row'];grade='ABSTRACT_READ' if 'ABSTRACT_READ' in row else 'READ_LOCATOR' if re.search('READ_LOCATOR|重读|已读|实际阅读',row) else 'REGISTERED_LIMITED'
 # A source-specific scope is preserved exactly; no automatic re-read or source grade upgrade.
 limits=row+'；继承冻结定位，未本轮外部重读；同出版谱系不作为独立重复证据。'
 if id=='S359':limits+=' K04发现入口仅旧资格指针；使用K03历史原定位的相对力度范围，未来K03复用此精确身份，非独立新来源。'
 records.append(rec('Source',id,sourceId=id,title=link['title'],author='UNKNOWN_NOT_PINNED',version='UNKNOWN_EXACT_VERSION',publicationDate='UNKNOWN_NOT_PINNED',accessDate='FROZEN_HISTORICAL_DATE_NOT_EXACT',uri=link['uri'],locator=row,grade=grade,rights='UNKNOWN_NO_IMPORT',anchor=a))
 sq.append(dict(source=id+'@1',scope=row,limits=limits,locatorKind='FROZEN_QUALIFICATION_LOCATOR',accessedUri=link['uri']))
 provenance.append(dict(sourceId=id,anchor=a,allRegisteredLinks=x['links'],uses=x['uses'],scope=limits,formalUse='QUALIFIED_CANDIDATE_LOCATOR_NOT_ADMISSION'))
def edge(id,k,to,scope,limit):
 e='K04-E-'+id+'-'+k.upper().replace('_','-')+'-'+to.split('@')[0];edges.append(dict(id=e,type=k,from_=cid(id),to=to,condition=ctx(id)));edges[-1]['from']=edges[-1].pop('from_');eq.append(dict(edge=e,scope=scope,limits=limit));return e
for r in rows:
 id=r['caseId'];d=r['d4'];kind,statement,fq,fnq,fnr,rpq,rpa,rnq,rnr=auth[id]
 assert statement!=r['predicate'] and len(statement)>20
 limit=r['reverseBoundary']+'；仅该冻结范围及合成题设，不作真实演奏、诊断、权限、实际软件/设备或艺术质量证明。'
 condition='限定专业谓词：'+r['predicate']+'；来源条件：'+r['caseSourceLabel']+'；每个视图独立声明其题设和实际证据缺失。'
 records.append(rec('Context',ctx(id).split('@')[0],condition=condition));records.append(rec('Claim',cid(id).split('@')[0],d4=d,kind=kind,statement=statement,context=ctx(id),status='CANDIDATE',limits=limit,cq=sorted(r['directCQ'])))
 inv.append(dict(line=r['discovery']['line'],d4=d,disposition='CANDIDATE',claimRefs=[cid(id)],reason='冻结原子精确主案例及来源资格，独立作者专业命题；候选非准入。'))
 ev='K04-EV-'+id;records.append(rec('Evidence',ev,kind='L1_RESEARCH_LOCATOR',sources=sorted(s['sourceId']+'@1' for s in r['sourceRoutes']),anchor=r['discovery'],limits='按发现入口精确定位，来源各自条件、原研究限度与合成任务独立；'+limit))
 edge(id,'supported_by',ev+'@1','精确来源定位限定谓词，不等独立证明所有更强结论。',limit);edge(id,'applies_under',ctx(id),'明确题设范围及证据条件。',limit)
 g='K04-GR-'+id;records.append(rec('CaseGroup',g,d4=d,claim=cid(id),kind='SYNTHETIC'))
 hard=[]
 for role,target,why in rels[id]:
  dest=cid(target);e=edge(id,'requires' if role=='H' else 'references',dest,why,'必要知识条件，供给方适用性仍待核。' if role=='H' else '仅可选导航，不产生逆向等价。')
  if role=='H':
   hard.append(dest);ob.append(dict(edge=e,consumer=cid(id),provider=dest,condition=ctx(id),providerContext=ext[dest]['context'] if dest in ext else ctx(target),group=g+'@1'))
 for direction,polarity,key,q,answer,reason,w in [
  ('FORWARD','POSITIVE','FP',fq,r['forwardExpected'],statement,r['forwardExpected']),
  ('FORWARD','NEGATIVE','FN',fnq,'REJECT_MISAPPLICATION_OR_OUT_OF_SCOPE',fnr,r['forwardNegative']),
  ('REVERSE','POSITIVE','RP',rpq,rpa,statement,r['reverseWitness']),
  ('REVERSE','NEGATIVE','RN',rnq,'REJECT_UNSUPPORTED_INFERENCE_OR_RETAIN_UNKNOWN',rnr,r['reverseBoundary'])]:
  v='K04-V-'+id+'-'+key;assert q!=answer and q!=reason
  exp=('裁定：拒绝错误适用或无证据强推。理由：'+reason if polarity=='NEGATIVE' else '限定核验依据：'+reason+'；本题答案：'+answer)
  records.append(rec('CaseView',v,group=g+'@1',direction=direction,polarity=polarity,context=ctx(id),question=q,example=dict(frozenCase=id,frozenWitness=w,frozenCaseRole='FROZEN_GROUP_PROVENANCE_NOT_ACTIVE_QUESTION',directionSpecificProblem=q,expectedResult=answer,reasoningBasis=reason,witnessRole='NEGATIVE_INPUT_OR_BOUNDARY_NOT_FACT' if polarity=='NEGATIVE' else 'SCOPED_SYNTHETIC_EXPECTED_NOT_OBSERVED',anchor=r['caseAnchor'],observationStatus='SYNTHETIC_EXPECTED_NOT_OBSERVED'),explanation=exp,limits=limit,evidenceKind='SYNTHETIC_EXPECTED_NOT_OBSERVED'))
  bindings.append(dict(id='K04-B-'+id+'-'+key+'-PRIMARY',view=v+'@1',claim=cid(id),role='PRIMARY_TARGET',condition=ctx(id)))
  for dest in hard:bindings.append(dict(id='K04-B-'+id+'-'+key+'-H-'+dest.split('@')[0],view=v+'@1',claim=dest,role='REQUIRES',condition=ctx(id)))
pack=dict(format='audio-kg-candidate/1',owner=m,coverageMode='MODULE',inventory=inv,records=records,edges=edges,bindings=bindings);pb=write('knowledge/K04/candidate.json',pack)
manifest=dict(format='audio-kg-qualification/1',owner=m,status='CANDIDATE_QUALIFICATION_ONLY',packBlob=pb,sourceQualifications=sq,edgeQualifications=eq,obligations=ob);mb=write('knowledge/K04/qualification.json',manifest)
# Explicit exact predecessor entry provides cross-domain H; K01 revision is not duplicated.
k01=json.loads((ROOT/'knowledge/K01/controller-input.json').read_text())['entries']
cb=write('knowledge/K04/controller-input.json',dict(entries=[*k01,dict(pack='knowledge/K04/candidate.json',manifest='knowledge/K04/qualification.json',manifestBlob=mb)],allowFixture=False,priorRegistry=None))
write('sources/K04/provenance.json',dict(format='audio-kg-K04-provenance/1',status='CANDIDATE_NOT_ADMITTED',frozenCommit=commit,sources=provenance))
write('queries/K04/discovery-index.json',dict(status='CANDIDATE_NOT_ADMITTED',rows=[dict(d4=r['d4'],claim=cid(r['caseId']),directCQ=r['directCQ'],supportCQ=r['supportCQ'],caseId=r['caseId'],anchor=r['discovery']) for r in rows]))
write('queries/K04/legacy-routes.json',dict(status='CONDITIONAL_NAVIGATION_NO_EQUIVALENCE',routes=[dict(**r,claimRefs=[cid(byD[d]['caseId']) for d in r['routes'] if d in byD]) for r in ledger['legacyRoutes']],splitRoutes=ledger['splitRoutes'],historicalFinding=35,historicalStatus='OPEN_GATE_NOT_CLOSED_BY_AUTHOR'))
write('queries/K04/capability-index.json',dict(status='KNOWLEDGE_ONLY_NOT_PERMISSION',roles=[dict(**r,claimRefs=[cid(byD[d]['caseId']) for d in r['d4Targets']],localWitnesses=[dict(caseId=byD[d]['caseId'],claim=cid(byD[d]['caseId']),problem=auth[byD[d]['caseId']][2],reject=auth[byD[d]['caseId']][4]) for d in r['d4Targets']]) for r in ledger['roles']]))
print(json.dumps(dict(rows=len(rows),claims=60,records=len(records),edges=len(edges),bindings=len(bindings),sources=len(src),H=sum(e['type']=='requires' for e in edges),O=sum(e['type']=='references' for e in edges),obligations=len(ob),views=240,roles=len(ledger['roles']),legacy=len(ledger['legacyRoutes']),splits=len(ledger['splitRoutes']),packBlob=pb,manifestBlob=mb,controllerBlob=cb)))
