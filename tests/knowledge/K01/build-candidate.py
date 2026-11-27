"""Offline authoring reproduction; F00 remains externally pinned consumer."""
from pathlib import Path
import json,re,hashlib,collections,subprocess
ROOT=Path(__file__).resolve().parents[3]; CAL='docs/product/calibration/'; F=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text()); FROZEN=F['commit']
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def write(path,x):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);b=(json.dumps(x,ensure_ascii=False,indent=2)+'\n').encode();p.write_bytes(b);return blob(b)
def anchor(path,n):
 b=(ROOT/path).read_bytes();assert F['paths'][path]==blob(b),path;return dict(commit=FROZEN,file=path,blob=F['paths'][path],line=n,row=b.decode().splitlines()[n-1])
def verify(a):assert anchor(a['file'],a['line'])==a
rows=json.loads((ROOT/'cases/K01/frozen-input-ledger.json').read_text())['rows'];by={r['d4']:r for r in rows}; assert len(by)==184
auth={}
for l in (ROOT/'knowledge/K01/claim-authoring.tsv').read_text().splitlines():
 d,k,s=l.split('\t');assert d not in auth and s!=by[d]['originalPredicate'];auth[d]=(k,s)
assert set(auth)=={r['d4'] for r in rows if r['proposedDisposition']=='AUTHORING_CANDIDATE'}
def suffix(d):return d.removeprefix('K01.').replace('.','-')
def cid(d):return 'K01-CL-'+suffix(d)+'@1'
def ctx(d):return 'K01-CTX-'+suffix(d)+'@1'
def rec(typ,id,**v):return dict(id=id,revision=1,type=typ,**({'owner':'K01'} if typ!='Source' else {}),**v)
records=[];edges=[];bindings=[];sq=[];eq=[];ob=[];inventory=[];provenance=[];allSource={};sourceUses=collections.defaultdict(list);withheld=collections.defaultdict(list)
for r in rows:
 for s in r['unlocatedSources']:withheld[s['sourceId']].append(dict(d4=r['d4'],**s))
 if r['d4'] not in auth:continue
 for route in r['sourceRoutes']:
  s=route['sourceId'];a=route['sourceAnchor'];verify(a);verify(route['predicateAnchor']);assert s not in allSource or allSource[s]==a;allSource[s]=a;sourceUses[s].append(dict(d4=r['d4'],scope=route['routeScope'],predicateAnchor=route['predicateAnchor']))
other={r['id'] for r in json.loads((ROOT/'knowledge/K07/candidate.json').read_text())['records'] if r['type']=='Source'};assert not set(allSource)&other
# Source-specific exact frozen row scope, not a newly read publication. Tool/format evidence is not musicological evidence.
for s,a in sorted(allSource.items()):
 cols=[c.strip() for c in a['row'].split('|')[1:-1]]; links=re.findall(r'\[([^]]+)\]\((https?://[^)\s]+)\)',a['row']);assert links
 title,uri=links[0];locator=cols[2] if len(cols)>3 else cols[1];raw=cols[-1]
 grade='READ_LOCATOR' if re.search(r'READ_LOCATOR|重读|已读|实际阅读',a['row']) else 'REGISTERED_LIMITED'
 if 'ABSTRACT_READ' in a['row']:grade='ABSTRACT_READ'
 limits=raw+'；仅继承冻结已定位资格，无本轮外部重读或许可提升。'
 if s=='S179':limits+=' 原访问失败保留；冻结同文件L25记录后续正文重读成功，范围仅大调借用同主音小调候选。'
 if s=='S022':limits+=' 冻结R3定向重读记录音分公式；不冒称本轮外部原文重读。'
 if s in ['S028','S029','S030','S078','S199','S200','S201','S202','S203','S255','S270','S271','S272']:limits+=' 工具/格式语义或表示参考，不是实际宿主执行或一般理论的独立证明。'
 records.append(rec('Source',s,sourceId=s,title=title,author='UNKNOWN_NOT_PINNED',version='UNKNOWN_NOT_PINNED',publicationDate='UNKNOWN_NOT_PINNED',accessDate='UNKNOWN_EXACT_ACCESS_DATE (frozen historical record)',uri=uri,locator=locator,grade=grade,rights='UNKNOWN_NO_IMPORT',anchor=a))
 sq.append(dict(source=s+'@1',scope='冻结来源定位：'+locator+'；'+raw,limits=limits,locatorKind='FROZEN_QUALIFICATION_LOCATOR',accessedUri=uri))
 provenance.append(dict(sourceId=s,anchor=a,allRegisteredLinks=[dict(title=t,uri=u) for t,u in links],sourceSpecificLimits=limits,formalUse='QUALIFIED_CANDIDATE_LOCATOR',predicateUses=sourceUses[s],samePublicationNotIndependent=True,accessHistory='frozen historical; no new outside read'))
relations=collections.defaultdict(list)
for l in (ROOT/'knowledge/K01/relation-authoring.tsv').read_text().splitlines():
 if l.startswith('#'):continue
 d,k,p,reason=l.split('\t');assert d in auth and p in auth and d!=p and k in ['H','O'];assert (k,p) not in [(x[0],x[1]) for x in relations[d]];relations[d].append((k,p,reason))
def edge(d,k,to,scope,limits):
 e='K01-E-'+suffix(d)+'-'+k.upper().replace('_','-')+'-'+to.split('@')[0];edges.append({'id':e,'type':k,'from':cid(d),'to':to,'condition':ctx(d)});eq.append(dict(edge=e,scope=scope,limits=limits));return e
for r in rows:
 d=r['d4'];verify(r['discoveryAnchor']);a=r['primaryCase'];prior=r['proposedDisposition']
 if d not in auth:
  disposition='ROUTED' if prior in ('HISTORICAL_ROUTE','PROJECT_CONTRACT_ROUTE') else 'UNKNOWN'
  reason=('历史入口仅条件路由，不与具体深化谓词等价；'+r['scope'] if prior=='HISTORICAL_ROUTE' else '项目分析/修订流程契约由有类型sidecar承载，不以不相关来源伪造专业Claim。' if prior=='PROJECT_CONTRACT_ROUTE' else '广义需求/历史残余仍开放；仅使用明确的局部补证及已有精确候选，不能由少数样例证明完整需求。'+r['scope'])
  inventory.append(dict(line=r['discoveryAnchor']['line'],d4=d,disposition=disposition,claimRefs=[],reason=reason));continue
 assert a and r['sourceRoutes'];verify(a['anchor']);kind,statement=auth[d];suf=suffix(d)
 # Frozen predicate scope plus exact current qualification limitations. Keep example-specific input separate.
 route_limit=r['sourceRoutes'][0]['routeScope'];limits=r['scope']+'；'+route_limit+'；仅声明的符号/理论或研究范围，不作真实测量、实际工具权限、普遍风格或自动接受。'
 if r['unlocatedSources']:limits+=' 额外补证入口仍在源路由账本，非F00直接边；本命题不以未绑定来源证明更强命题。'
 condition='适用谓词：'+r['originalPredicate']+'；'+r['scope']+'；按明确规则、参考和输入检验；案例的具体条件独立列出。'
 records.append(rec('Context',ctx(d).split('@')[0],condition=condition));records.append(rec('Claim',cid(d).split('@')[0],d4=d,kind=kind,statement=statement,context=ctx(d),status='CANDIDATE',limits=limits,cq=sorted(r['directCQ'])))
 inventory.append(dict(line=r['discoveryAnchor']['line'],d4=d,disposition='CANDIDATE',claimRefs=[cid(d)],reason='独立作者命题、限定条件及精确冻结来源/四视角；候选非准入。'))
 edge(d,'applies_under',ctx(d),'检验声明条件，而非检索自动证实。',limits)
 # Evidence uses one or more exact D4 and source token locations; no invented anchor or transitive source ID.
 grouped=collections.defaultdict(list);anchors={}
 for sr in r['sourceRoutes']:
  x=sr['predicateAnchor'];k=(x['file'],x['line']);anchors[k]=x;grouped[k].append(sr['sourceId'])
 for j,(k,srcs) in enumerate(sorted(grouped.items()),1):
  ev='K01-EV-'+suf+'-'+str(j);records.append(rec('Evidence',ev,kind='L1_RESEARCH_LOCATOR',sources=sorted(set(s+'@1' for s in srcs)),anchor=anchors[k],limits='精确原谓词及来源定位；源支持仅限所列资格，数学推导及项目表示要求不等外部实测。'+limits));edge(d,'supported_by',ev+'@1','冻结研究定位对限定候选的支撑，不等充分真值证明。',limits)
 # Primary group plus distinct reviewed supplemental O-branch case, when exact own D4.
 groups=[('MAIN',a['id'],a['condition'],[a['forwardPositive'],a['forwardNegative'],a['reversePositive'],a['reverseNegative']],a['anchor'])]
 if r['branchSupplement']:
  x=r['branchSupplement'];verify(x);c=[v.strip() for v in x['row'].split('|')[1:-1]];assert len(c)==6 and c[0].endswith('/ '+d);groups.append(('SUP',c[0].split(' / ')[0],c[1],c[2:],x))
 for j,sr in enumerate(r['scopedR3Cases'],1):
  x=sr['anchor'];verify(x);groups.append(('R3-'+str(j),sr['id'],sr['condition'],[sr['forwardPositive'],sr['forwardNegative'],sr['reversePositive'],sr['reverseNegative']],x))
 hard=[]
 for role,target,reason in relations[d]:
  e=edge(d,'requires' if role=='H' else 'references',cid(target),reason,'限定命题所需的知识支持，供给方条件仍待核。' if role=='H' else '可选导航，不参与H闭包，不作等价或逆推。')
  if role=='H':hard.append((target,e))
 for label,caseid,casecondition,views,x in groups:
  g='K01-GR-'+suf+'-'+label;records.append(rec('CaseGroup',g,d4=d,claim=cid(d),kind='SYNTHETIC'))
  for target,e in hard:ob.append(dict(edge=e,consumer=cid(d),provider=cid(target),condition=ctx(d),providerContext=ctx(target),group=g+'@1'))
  for i,(direction,polarity,key) in enumerate([('FORWARD','POSITIVE','FP'),('FORWARD','NEGATIVE','FN'),('REVERSE','POSITIVE','RP'),('REVERSE','NEGATIVE','RN')]):
   v='K01-V-'+suf+'-'+label+'-'+key
   q=[f'在明确题设下构造或判断：{r["originalPredicate"]}',f'指出反例违反的具体条件：{r["originalPredicate"]}',f'从给定候选结果回查输入、规则及可能多解：{r["originalPredicate"]}',f'在反向信息缺失或多解时拒绝强推：{r["originalPredicate"]}'][i]
   records.append(rec('CaseView',v,group=g+'@1',direction=direction,polarity=polarity,context=ctx(d),question=q,example=dict(frozenCase=caseid,caseCondition=casecondition,viewSpecificWitness=views[i],anchor=x,observationStatus='SYNTHETIC_EXPECTED_NOT_OBSERVED'),explanation=views[i],limits=limits,evidenceKind='SYNTHETIC_EXPECTED_NOT_OBSERVED'))
   bindings.append(dict(id='K01-B-'+suf+'-'+label+'-'+key+'-PRIMARY',view=v+'@1',claim=cid(d),role='PRIMARY_TARGET',condition=ctx(d)))
   for target,e in hard:bindings.append(dict(id='K01-B-'+suf+'-'+label+'-'+key+'-H-'+suffix(target),view=v+'@1',claim=cid(target),role='REQUIRES',condition=ctx(d)))
pack=dict(format='audio-kg-candidate/1',owner='K01',coverageMode='MODULE',inventory=inventory,records=records,edges=edges,bindings=bindings);pblob=write('knowledge/K01/candidate.json',pack)
manifest=dict(format='audio-kg-qualification/1',owner='K01',status='CANDIDATE_QUALIFICATION_ONLY',packBlob=pblob,sourceQualifications=sq,edgeQualifications=eq,obligations=ob);mblob=write('knowledge/K01/qualification.json',manifest)
controller=dict(entries=[dict(pack='knowledge/K01/candidate.json',manifest='knowledge/K01/qualification.json',manifestBlob=mblob)],allowFixture=False,priorRegistry=None);cblob=write('knowledge/K01/controller-input.json',controller)
write('sources/K01/provenance.json',dict(format='audio-kg-K01-source-provenance/1',status='CANDIDATE_SOURCE_QUALIFICATIONS_NOT_ADMISSION',frozenCommit=FROZEN,canonicalSourceOwner='K01 first formal publication, later owners reuse exact Source revisions; no overlap with K07 candidate Source IDs',sources=provenance,unboundSupplementalSourceRoutes=withheld))
write('queries/K01/discovery-index.json',dict(format='audio-kg-K01-discovery/1',status='CANDIDATE_NOT_ACCEPTED',rows=[dict(d4=r['d4'],line=r['discoveryAnchor']['line'],localQuery=r['localQuery'],directCQ=r['directCQ'],supportCQ=r['supportCQ'],claimRefs=[cid(r['d4'])] if r['d4'] in auth else [],disposition=next(x['disposition'] for x in inventory if x['d4']==r['d4']),primaryCaseId=r['primaryCase']['id'] if r['primaryCase'] else None,sourceIds=[x['sourceId'] for x in r['sourceRoutes']],anchor=r['discoveryAnchor']) for r in rows]))
write('queries/K01/legacy-routes.json',dict(format='audio-kg-K01-legacy-routes/1',status='NO_AUTOMATIC_EQUIVALENCE_OR_CLOSURE',routes=[dict(d4=r['d4'],priorDisposition=r['priorDisposition'],anchor=r['legacyAnchor'],exactCandidateRefs=[cid(d) for d in r['legacyTargets'] if d in auth],unresolvedTargets=[d for d in r['legacyTargets'] if d not in auth],primaryCase=r['primaryCase']['id'] if r['primaryCase'] else None,scope=r['scope'],equivalence=False,formalDisposition=next(x['disposition'] for x in inventory if x['d4']==r['d4'])) for r in rows if r['legacyAnchor']]))
# Preserve original split predicates; use real exact owner targets only, never manufacture resolved edges.
sp=CAL+'g05-r3-split-disposition-candidate.md';splits=[]
for i,l in enumerate((ROOT/sp).read_text().splitlines(),1):
 if re.match(r'^\| K\d\d\.\d\d\.\d\d\.\d\d \|',l) and re.search(r'\bK01(?:\.|\s|\|)',l):
  c=[x.strip() for x in l.split('|')[1:-1]];targets=list(dict.fromkeys(re.findall(r'K\d\d(?:\.\d\d){0,3}',c[2]+' '+c[3]+' '+c[4])));splits.append(dict(oldSlot=c[0],predicate=c[1],status='SPLIT_OPEN',candidateLocalRefs=[cid(d) for d in targets if d in auth],otherOrUnresolvedTargets=[d for d in targets if d not in auth],limits=c[5],anchor=anchor(sp,i),equivalence=False))
write('queries/K01/split-routes.json',dict(format='audio-kg-K01-split-routes/1',status='SPLIT_OPEN_NAVIGATION',routes=splits))
# Exact capability audit, including project-contract routes, case-specific witness and unresolved external owners.
cap=CAL+'theory-g02-capability-audit.md';matrix=CAL+'theory-capability-calibration.md';roles=[]
for i,l in enumerate((ROOT/cap).read_text().splitlines(),1):
 if not re.match(r'^\| K01\.\d\d \| A0[1-7] \|',l):continue
 d2,ability,role,task,routes,limits=[x.strip() for x in l.split('|')[1:-1]];targets=list(dict.fromkeys(re.findall(r'K01\.\d\d\.\d\d\.\d\d',routes)));external=list(dict.fromkeys(re.findall(r'K(?:0[2-9]|1[0-9])(?:\.\d\d){0,3}',task+' '+limits)));w=[]
 for d in targets:
  rr=by[d];ca=rr['primaryCase'];w.append(dict(d4=d,claimRef=cid(d) if d in auth else None,projectContract=d in ('K01.09.01.02','K01.09.03.02'),caseId=ca['id'] if ca else None,condition=ca['condition'] if ca else rr['scope'],expected=ca['forwardPositive'] if ca else 'UNKNOWN until precise evidence',reject=ca['forwardNegative'] if ca else 'No inferred evidence or authority'))
 roles.append(dict(id=d2+'/'+ability,role=role,task=task,claimRefs=[cid(d) for d in targets if d in auth],projectContractRefs=[d for d in targets if d in ('K01.09.01.02','K01.09.03.02')],localWitnesses=w,externalDiscovery=external,limits=limits,anchor=anchor(cap,i),authority='DOMAIN_KNOWLEDGE_CANDIDATE_ONLY',externalStatus='UNKNOWN_NOT_EXECUTED' if external or ability=='A03' else 'NOT_REQUESTED'))
assert len(roles)==63 and all(x['role']=='S' for x in roles if x['id'].endswith('/A03'))
write('queries/K01/capability-index.json',dict(format='audio-kg-K01-role-candidate/1',status='CANDIDATE_NOT_PERMISSION',frozenMatrix=matrix,matrixBlob=F['paths'][matrix],roles=roles))
# Exact K07 links remain optional contextual navigation, not formal H because these K01 cases specify their frequency inputs.
write('queries/K01/cross-domain-navigation.json',dict(format='audio-kg-K01-cross-domain-navigation/1',status='CONDITIONAL_NAVIGATION_ONLY',links=[dict(fromClaim=cid('K01.02.04.01'),toClaim='K07-CL-AC01@1',reason='若输入由已知稳定周期推得频率，可参考T→f；K01公式自身不证明实际周期或感知。',role='O',logicalConverse=False),dict(fromClaim=cid('K01.02.06.01'),toClaim='K07-CL-AC23@1',reason='实际测量与不确定度另由声学处理；匿名频率映射本身不需要真实测量。',role='O',logicalConverse=False)],unresolvedOwners=['K02','K03','K04','K09','K10','K12','K16','K17']))
print(json.dumps(dict(rows=len(rows),claims=len(auth),records=len(records),edges=len(edges),bindings=len(bindings),sourceCount=len(allSource),H=sum(e['type']=='requires' for e in edges),O=sum(e['type']=='references' for e in edges),obligations=len(ob),groups=sum(r['type']=='CaseGroup' for r in records),views=sum(r['type']=='CaseView' for r in records),roles=len(roles),split=len(splits),dispositions=dict(collections.Counter(x['disposition'] for x in inventory)),packBlob=pblob,manifestBlob=mblob,controllerBlob=cblob),ensure_ascii=False))
