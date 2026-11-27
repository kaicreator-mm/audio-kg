"""Offline authoring reproduction only; never a consumer-side qualification resealer."""
from pathlib import Path
import re,json,hashlib,subprocess
ROOT=Path(__file__).resolve().parents[3]
FROZEN='280d3be584ab717211b9b99925ac07705f2ab64c'
cal='docs/product/calibration/'
research='docs/research/'
proj=json.loads((ROOT/'ontology/l1-anchor-tree.json').read_text())
assert proj['commit']==FROZEN
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def write(f,v):
 p=ROOT/f;p.parent.mkdir(parents=True,exist_ok=True)
 b=(json.dumps(v,ensure_ascii=False,indent=2)+'\n').encode();p.write_bytes(b);return blob(b)
def anchor(f,n):
 b=(ROOT/f).read_bytes();h=blob(b);assert proj['paths'][f]==h,(f,h)
 return dict(commit=FROZEN,file=f,blob=h,line=n,row=b.decode().splitlines()[n-1])
def cells(l):return [c.strip() for c in l.strip().strip('|').split('|')]
def ref(r):return r['id']+'@'+str(r['revision'])
def rec(typ,id,**v):return dict(id=id,revision=1,type=typ,**({'owner':'K07'} if typ!='Source' else {}),**v)
def ids(c):return re.findall(r'CQ\d\d',c)
def source_links(c):return re.findall(r'\[(S\d+)\]\(\.\./\.\./research/([^#]+)#L(\d+)\)',c)
def case_link(c):
 m=re.fullmatch(r'\[(AC\d+)\]\(([^#]+)#L(\d+)\)',c);assert m,c
 return m[1],cal+m[2],int(m[3])
author={}
for l in (ROOT/'knowledge/K07/claim-authoring.tsv').read_text().splitlines():
 v=l.split('\t');assert len(v)==7
 author[v[0]]=v[1:]
assert len(author)==51
rows=[];srcanchors={}
disc=cal+'acoustics-r3-discovery-cq.md'
assert blob((ROOT/disc).read_bytes())=='14dde14b71d479c584a3f619bc4ecbcfcdb89b51'
for ln,l in enumerate((ROOT/disc).read_text().splitlines(),1):
 if not re.match(r'^\| K07\.\d\d\.\d\d\.\d\d \|',l):continue
 d4,cs,predicate,sources,d,s=cells(l)
 ac,cf,cn=case_link(cs);ca=anchor(cf,cn)
 cc=cells(ca['row']);assert len(cc)==7 and cc[0]==ac and cc[1]==d4
 refs=[]
 for sid,f,n in source_links(sources):
  a=anchor(research+f,int(n))
  assert re.search(r'\b'+sid+r'\b',a['row'])
  assert sid not in srcanchors or srcanchors[sid]==a
  srcanchors[sid]=a;refs.append(sid)
 assert refs and set(refs)==set(re.findall(r'S\d+',cc[2])),(ac,refs,cc[2])
 rows.append(dict(line=ln,d4=d4,case=ac,predicate=predicate,anchor=ca,sourceIds=refs,d=ids(d),s=ids(s),views=cc[3:]))
assert len(rows)==51 and {r['case'] for r in rows}==set(author)
records=[];edges=[];bindings=[];sq=[];eq=[];ob=[];inventory=[];provenance=[]
# Explicit source-specific scope; preserve source anchor limits and access history.
scope={
'S031':'周期波、频率、周期、波长和波量定义；不证明具体音源或听觉。',
'S032':'介质声速及温度条件；不将空气常数推广到任意介质。',
'S033':'声压、强度、参考量及理想传播模型；非一般声场。',
'S034':'理想振动边界和驻波模态；非真实乐器或房间测量。',
'S035':'理想空气管模态、相干叠加及边界；变量明确。',
'S036':'乐器物理激励与共振、谐波和泛音；不作听评结论。',
'S037':'群体听觉教学、物理级与感知分层；非个体诊断。',
'S038':'一般安全听音风险控制；不提供设备比例到声压换算或个人许可。',
'S045':'嗓音源滤波耦合的边界证据；不是一般LTI模型的独立证明。',
'S096':'厂商对物理反馈闭环的说明；仅可能路径，不支持实际稳定性或操作参数。',
'S424':'谐波复音、缺失基频感知综述；不保证个体听感。',
'S425':'计算声源滤波相互作用的边界；不是人体实证或练习处方。',
'S447':'ISO226公开摘要的连续纯音、人群、自由场及频率覆盖范围；无数值附录。',
'S448':'听觉转导通路科普；非个人临床功能诊断。',
'S449':'突然听力下降的紧急性；不作诊断或治疗指示。',
'S450':'WHO-ITU个人设备公共摘要的适用用途及周参考；不支持完整规范算法、个体许可。',
'S451':'NIOSH职业建议及测量口径；不外推当地法规或休闲许可。',
'S452':'NIST TN1297 §2/§5不确定度评定、协方差和标准合成；同一指南。',
'S453':'ISO3382-2公开摘要的普通房间测量适用范围；不是具体合规方法全文。',
'S454':'理想房间轴向模式、路径/反射及衰减概念；不提供实际场地目标。',
'S455':'有限分析窗、hop、格点和表示权衡；不是FFT执行验收。',
'S456':'公开厂商掩蔽说明中的能量与时序分类；不采具体阈值或工具结果。',
'S457':'矩形有限窗、补零及DFT周期性；不把主瓣宽度当普遍分辨率。',
'S458':'双耳相对时间、级差、耳廓线索及多解；非个体HRTF测量。',
'S459':'历史已读语音掩蔽综述；后续访问受阻，仅历史定位，当前机制证据由S469补。',
'S460':'公开摘要中指定刺激的时序掩蔽研究；不泛化实验条件。',
'S461':'EDT/T20/T30拟合范围的厂商说明；非ISO全文。',
'S462':'NIST公开摘要的麦克风压力场/自由场等校准边界。',
'S463':'物理校准链、场型、频带和前放增益适用性；非实际校准。',
'S464':'扩展不确定度U=kuc及概率解释条件；同NIST TN1297，不双计。',
'S465':'ITU H.870(03/2022)仅官方版本/状态元数据；正文未获。',
'S467':'平稳与WSS模型条件；单一有限样本不证明统计模型。',
'S468':'PSD及期望功率定义；离散有限枚举由项目推导，不套连续单位。',
'S469':'语音能量、包络调制及信息掩蔽候选及控制条件；非音乐普遍阈值。',
'S470':'文档区分物理校准与派生频权；非版本运行或IEC符合。'}
assert set(scope)==set(srcanchors)
authors={'S031':'OpenStax','S032':'OpenStax','S033':'OpenStax','S034':'OpenStax','S035':'OpenStax','S036':'OpenStax','S037':'OpenStax','S038':'WHO','S045':'Zhang','S096':'Shure','S424':'Oxenham','S425':'Zhang','S447':'ISO','S448':'NIDCD','S449':'NIDCD','S450':'WHO / ITU','S451':'CDC / NIOSH','S452':'NIST','S453':'ISO','S454':'MIT OCW','S456':'ANSYS','S457':'Jacobsen','S458':'OpenStax','S460':'Moore et al.','S461':'Ecophon','S462':'Nedzelnitsky','S463':'NIST','S464':'NIST','S465':'ITU','S467':'ProbabilityCourse','S468':'ProbabilityCourse','S470':'MathWorks'}
pub={'S045':'2016','S096':'2013-01-25','S424':'2012','S425':'2023','S447':'2023','S450':'2019','S453':'2008','S454':'2016','S457':'2012','S460':'1987','S462':'2000','S465':'2022-03'}
vers={'S037':'2e','S447':'ISO 226:2023','S453':'ISO 3382-2:2008','S456':'2024 R2','S465':'03/2022','S470':'R2026b'}
excluded={'S459':'历史已读范围保留；R5复访受阻，S469为当前实际可读机制补证；不作为本模块直接支持。','S465':'官方版本状态入口；正文及剂量规范未获；不作为本模块直接支持。'}
for sid,a in sorted(srcanchors.items()):
 c=cells(a['row']);links=re.findall(r'\[([^]]+)\]\((https?://[^)\s]+)\)',a['row']);assert links
 title,uri=links[0]
 if sid in ['S032','S033','S034','S035','S036']:title=title.replace('同书','OpenStax University Physics Vol 1')
 if sid=='S452':title='NIST TN1297 §2 and §5'
 raw_limits=c[-1];qual='ABSTRACT_READ' if sid in ['S447','S453','S460','S462'] else 'REGISTERED_LIMITED' if sid in ['S450','S459','S465'] else 'READ_LOCATOR'
 prov=dict(sourceId=sid,anchor=a,allRegisteredLinks=[dict(title=t,uri=u) for t,u in links],historicalGrade=raw_limits,scope=scope[sid],formalUse='NOT_DIRECT_SUPPORT' if sid in excluded else 'QUALIFIED_CANDIDATE_LOCATOR',reason=excluded.get(sid,'沿用冻结研究已核范围；未重新读取外部正文，许可UNKNOWN_NO_IMPORT。'))
 provenance.append(prov)
 if sid in excluded:continue
 # Date field records only what the frozen document establishes, not new external access.
 header='\n'.join((ROOT/a['file']).read_text().splitlines()[:3])
 date='UNKNOWN_EXACT_ACCESS_DATE (frozen qualification record dated 2026-11-26; inherited)' if '2026-11-26' in header else 'UNKNOWN_EXACT_ACCESS_DATE (frozen record)'
 r=rec('Source',sid,sourceId=sid,title=title,author=authors.get(sid,'UNKNOWN_NOT_PINNED'),version=vers.get(sid,'UNKNOWN_NOT_PINNED'),publicationDate=pub.get(sid,'UNKNOWN_NOT_PINNED'),accessDate=date,uri=uri,locator=re.sub(r'\[([^]]+)\]\([^)]*\)',r'\1',c[1]),grade=qual,rights='UNKNOWN_NO_IMPORT',anchor=a)
 records.append(r)
 sq.append(dict(source=ref(r),scope=scope[sid],limits=raw_limits+'；冻结来源资格继承，未重读或提升许可。',locatorKind='PUBLIC_SUMMARY_ONLY' if sid=='S450' else 'PUBLIC_ABSTRACT_ONLY' if qual=='ABSTRACT_READ' else 'FROZEN_READ_LOCATOR',accessedUri=uri))
# Specific actual local relationships. H only when provider predicate is necessary in the posed consumer case; O is navigation.
hard={
 'AC27':[('AC02','单频相位/延迟模周期推理依赖同频参考与相位约定。')],
 'AC31':[('AC06','格点加密与观察窗独立的判断依赖窗长和NFFT的区分。')],
 'AC30':[('AC05','指定谐波序号与完整泛音系列的判定依赖编号定义。')],
 'AC35':[('AC11','Y=HX+N的分解问题依赖LTI激励与响应区别；仅HX项适用无额外干扰的子模型，不假设整个观测无噪声。')],
 'AC43':[('AC19','三个衰减拟合量都使用有效斜率外推，而非反射峰。')],
 'AC45':[('AC21','能量平均的级值必须先确定dB量定义与共同参考。')],
 'AC46':[('AC22','校准/派生滤波报告失效必须分开物理链与报告。')],
 'AC49':[('AC25','暴露记录适用性需要先区分用途及真实量定义。')],
}
optional={
 'AC01':[('AC02','相位符号的专项解释')],'AC03':[('AC28','传播/质点速度区别')],
 'AC04':[('AC29','驻波反例'),('AC21','物理分贝参考')],
 'AC05':[('AC10','理想闭开管第一泛音'),('AC13','数学周期与感知音高')],
 'AC06':[('AC07','全局幅度的时间信息边界'),('AC32','时间局部窗口')],
 'AC08':[('AC32','统计WSS与有限窗口'),('AC35','任务相对干扰')],
 'AC09':[('AC10','边界模式'),('AC34','房间轴向模式')],
 'AC11':[('AC35','额外干扰模型')],
 'AC12':[('AC36','phon定义'),('AC16','群体与个人')],
 'AC13':[('AC37','包络音色线索')],
 'AC14':[('AC38','三类机制及控制')],
 'AC15':[('AC39','双耳输入')],
 'AC16':[('AC40','人群与个体证据')],
 'AC17':[('AC41','条件/风险处理')],
 'AC18':[('AC42','路径几何多解'),('AC19','衰减 vs 延迟峰')],
 'AC20':[('AC44','双耳定位线索')],
 'AC22':[('AC46','物理校准与派生报告失效'),('AC23','测量不确定度')],
 'AC23':[('AC47','协方差及扩展不确定度')],
 'AC24':[('AC48','播放链变更')],
 'AC25':[('AC49','暴露数据完整性')],
 'AC26':[('AC50','版本与撤回失效')],
 'AC28':[('AC03','介质条件')],
 'AC29':[('AC04','平面渐进波平方律限定')],
 'AC32':[('AC08','生成模型与期望谱')],
 'AC33':[('AC09','固有与驱动'),('AC10','闭开管模式')],
 'AC34':[('AC19','模态与衰减')],
 'AC36':[('AC12','ISO公开人群条件')],
 'AC37':[('AC13','频谱与音色候选')],
 'AC38':[('AC14','独立时序分类')],
 'AC39':[('AC44','ITD/ILD线索')],
 'AC40':[('AC16','标准频率范围')],
 'AC41':[('AC17','突然下降停止医疗评估')],
 'AC42':[('AC18','自由场理想模型')],
 'AC44':[('AC20','相干/非相干及位置')],
 'AC47':[('AC23','独立重复不确定度')],
 'AC48':[('AC24','比较条件'),('AC46','校准链失效')],
 'AC49':[('AC45','相对能量级')],
 'AC50':[('AC46','报告依赖失效'),('AC48','播放链失效')],
 'AC51':[('AC35','响应和干扰候选'),('AC42','返回路径几何条件')]
}
byac={r['case']:r for r in rows}
def claim(ac):return 'K07-CL-'+ac+'@1'
def context(ac):return 'K07-CTX-'+ac+'@1'
def group(ac):return 'K07-GR-'+ac+'@1'
def edge(ac,kind,to,qual,limits):
 eid='K07-E-'+ac+'-'+kind.upper().replace('_','-')+'-'+to.split('@')[0]
 edges.append(dict(id=eid,type=kind,from_=claim(ac),to=to,condition=context(ac)))
 edges[-1]['from']=edges[-1].pop('from_')
 eq.append(dict(edge=eid,scope=qual,limits=limits))
 return eid
for row in rows:
 ac=row['case'];d4=row['d4'];kind,statement,cond,limit,fq,rq=author[ac]
 records.append(rec('Context','K07-CTX-'+ac,condition=cond))
 records.append(rec('Claim','K07-CL-'+ac,d4=d4,kind=kind,statement=statement,context=context(ac),status='CANDIDATE',limits=limit,cq=sorted(set(row['d']))))
 records.append(rec('Evidence','K07-EV-'+ac,kind='L1_RESEARCH_LOCATOR',sources=[s+'@1' for s in row['sourceIds'] if s not in excluded],anchor=row['anchor'],limits='冻结L1原创研究案例及所列来源定位；支持仅限各来源资格与题设，不是实际测量/听评。'+limit))
 records.append(rec('CaseGroup','K07-GR-'+ac,d4=d4,claim=claim(ac),kind='SYNTHETIC'))
 inventory.append(dict(line=row['line'],d4=d4,disposition='CANDIDATE',claimRefs=[claim(ac)],reason='限定命题、条件、来源定位与四视角均明确；真实观察、许可、标准全文和个体结论不作准入。'))
 edge(ac,'supported_by','K07-EV-'+ac+'@1','限定命题由冻结L1研究定位支撑；数学题设与来源资格分开。',limit)
 edge(ac,'applies_under',context(ac),'使用该命题须验证其条件，而非由检索自动确认。',limit)
 for target,reason in hard.get(ac,[]):
  eid=edge(ac,'requires',claim(target),reason,'仅该推理必要支持，必须同时核供给方条件，不等真实前提满足。')
  ob.append(dict(edge=eid,consumer=claim(ac),provider=claim(target),condition=context(ac),providerContext=context(target),group=group(ac)))
 for target,reason in optional.get(ac,[]):
  edge(ac,'references',claim(target),reason,'可选导航，不参与必要闭包；非等价或逻辑逆命题。')
 for i,(direction,polarity,q,v,explain) in enumerate([
 ('FORWARD','POSITIVE',fq,row['views'][0],statement),
 ('FORWARD','NEGATIVE','审查推断是否成立：'+fq,row['views'][1],'拒绝此误用。'+limit),
 ('REVERSE','POSITIVE',rq,row['views'][2],'由候选观察回查模型、条件及独立证据，不自动得逻辑逆命题。'+cond),
 ('REVERSE','NEGATIVE','缺少条件或逆推不唯一时：'+rq,row['views'][3],'拒绝超范围逆推。'+limit)]):
  suffix=['FP','FN','RP','RN'][i]
  vid='K07-V-'+ac+'-'+suffix
  records.append(rec('CaseView',vid,group=group(ac),direction=direction,polarity=polarity,context=context(ac),question=q,example=dict(frozenCase=ac,scenario=row['views'][0],viewSpecificWitness=v,observationStatus='SYNTHETIC_EXPECTED_NOT_OBSERVED'),explanation=explain,limits=limit,evidenceKind='SYNTHETIC_EXPECTED_NOT_OBSERVED'))
  bindings.append(dict(id='K07-B-'+ac+'-'+suffix+'-PRIMARY',view=vid+'@1',claim=claim(ac),role='PRIMARY_TARGET',condition=context(ac)))
  for target,_ in hard.get(ac,[]):
   bindings.append(dict(id='K07-B-'+ac+'-'+suffix+'-H-'+target,view=vid+'@1',claim=claim(target),role='REQUIRES',condition=context(ac)))
pack=dict(format='audio-kg-candidate/1',owner='K07',coverageMode='MODULE',inventory=inventory,records=records,edges=edges,bindings=bindings)
packPath='knowledge/K07/candidate.json'
pblob=write(packPath,pack)
m=dict(format='audio-kg-qualification/1',owner='K07',status='CANDIDATE_QUALIFICATION_ONLY',packBlob=pblob,sourceQualifications=sq,edgeQualifications=eq,obligations=ob)
mPath='knowledge/K07/qualification.json'
mblob=write(mPath,m)
controller=dict(allowFixture=False,priorRegistry=None,entries=[dict(pack=packPath,manifest=mPath,manifestBlob=mblob)])
# Exact controller shape is inherited from accepted F00 (not runtime-generated).
fixture=json.loads((ROOT/'tests/knowledge/fixtures/controller-input.json').read_text())
assert set(controller)==set(fixture),(controller.keys(),fixture.keys())
cblob=write('knowledge/K07/controller-input.json',controller)
write('sources/K07/provenance.json',dict(format='audio-kg-K07-source-provenance/1',frozenCommit=FROZEN,status='CANDIDATE_SOURCE_QUALIFICATIONS_NOT_ADMISSION',canonicalSourceOwner='K07 (first formal publication; later consumers reuse exact Source refs, content responsibility remains original domain)',sources=provenance))
# Discovery CQ roles are separated from the simple union in the finite Claim field.
write('queries/K07/discovery-index.json',dict(format='audio-kg-K07-discovery/1',status='CANDIDATE_NOT_ACCEPTED',frozenDiscovery=disc,discoveryBlob='14dde14b71d479c584a3f619bc4ecbcfcdb89b51',rows=[dict(line=r['line'],d4=r['d4'],case=r['case'],claim=claim(r['case']),directCQ=r['d'],supportCQ=r['s'],sourceIds=r['sourceIds'],withheldSourceIds=[s for s in r['sourceIds'] if s in excluded],evidenceAnchor=r['anchor']) for r in rows]))
# Retain 48 historical entry predicates, never make equivalent or automatically close split.
legacy=cal+'acoustics-r3-legacy-convergence.md'
history=[]
for ln,l in enumerate((ROOT/legacy).read_text().splitlines(),1):
 if re.match(r'^\| K07\.\d\d\.\d\d\.\d\d \|',l):
  d4,req,st,links,limits=cells(l)
  acs=re.findall(r'\[(AC\d+)/K07\.',links)
  assert acs and all(a in byac for a in acs)
  history.append(dict(d4=d4,requirement=req,priorDisposition=st,status='NAVIGATION_ONLY' if st=='ROUTER_CANDIDATE' else 'BOUNDED_COMPOSITION_CANDIDATE',claimRefs=[claim(a) for a in acs],limits=limits,anchor=anchor(legacy,ln),equivalence=False))
assert len(history)==48
write('queries/K07/legacy-routes.json',dict(format='audio-kg-K07-legacy-routes/1',status='NO_AUTOMATIC_EQUIVALENCE_OR_CLOSURE',routes=history))
print(json.dumps(dict(rows=len(rows),sources=len(sq),withheld=len(excluded),records=len(records),claims=len(rows),edges=len(edges),bindings=len(bindings),H=len(ob),packBlob=pblob,manifestBlob=mblob,controllerBlob=cblob)))
# Exact current D2 x ability coverage, not domain role inheritance.
matrix=cal+'acoustics-r3-capability-calibration.md'
roleauth={}
for l in (ROOT/'queries/K07/role-authoring.tsv').read_text().splitlines():
 d2,ability,aclist,scenario,expected,reject=l.split('\t')
 key=('K07.'+d2,ability);assert key not in roleauth
 roleauth[key]=(aclist.split(','),scenario,expected,reject)
roles=[]
for ln,l in enumerate((ROOT/matrix).read_text().splitlines(),1):
 if not re.match(r'^\| K07\.\d\d \| A0[1-7] \|',l):continue
 d2,ability,role,task,links,limits=cells(l)
 acs,scenario,expected,reject=roleauth[(d2,ability)]
 allowed=set(re.findall(r'\[(AC\d+)/K07\.',links))
 assert acs and set(acs)<=allowed and all(byac[a]['d4'].startswith(d2+'.') for a in acs),(d2,ability,acs,allowed)
 roles.append(dict(id=d2+'/'+ability,role=role,task=task,claimRefs=[claim(a) for a in acs],scenario=scenario,expected=expected,reject=reject,limits=limits,anchor=anchor(matrix,ln),authority='DOMAIN_KNOWLEDGE_CANDIDATE_ONLY'))
assert len(roles)==len(roleauth)==56
assert {x:sum(r['role']==x for r in roles) for x in ['P','S','C']}=={'P':27,'S':14,'C':15}
write('queries/K07/capability-index.json',dict(format='audio-kg-K07-role-candidate/1',status='CANDIDATE_NOT_PERMISSION',frozenMatrix=matrix,matrixBlob=proj['paths'][matrix],roles=roles))
# Retain split predicates and cross-owner routing separate from local exact H closure.
split=cal+'g05-r3-split-disposition-candidate.md'
routes=[]
for ln,l in enumerate((ROOT/split).read_text().splitlines(),1):
 if l.startswith('| K') and 'K07' in l:
  c=cells(l)
  if len(c)!=7:continue
  old,pred,new,reuse,refs,gate,demand=c
  if not re.match(r'^K\d\d\.\d\d\.\d\d\.\d\d$',old):continue
  local=[]
  for kind,field in [('NEW',new),('REUSE',reuse),('REF',refs)]:
   for dest in re.findall(r'K07(?:\.\d\d){1,3}',field):
    matches=[claim(r['case']) for r in rows if r['d4']==dest or (len(dest.split('.'))<4 and r['d4'].startswith(dest+'.'))]
    if not matches:
     matches=next((x['claimRefs'] for x in history if x['d4']==dest),[])
    assert matches,(old,dest)
    local.append(dict(kind=kind,target=dest,candidateClaimRefs=matches,status='LOCAL_PREDICATE_CANDIDATE_ONLY'))
  if local:routes.append(dict(oldD4=old,predicate=pred,local=local,gate=gate,externalTargets=dict(new=new,reuse=reuse,ref=refs),demand=demand,status='SPLIT_OPEN',anchor=anchor(split,ln)))
write('queries/K07/split-routes.json',dict(format='audio-kg-K07-split-routes/1',status='SPLIT_OPEN_NO_ALIAS_OR_AUTOMATIC_CLOSURE',routes=routes))
