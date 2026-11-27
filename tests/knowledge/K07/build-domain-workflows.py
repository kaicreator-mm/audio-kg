"""K07 finite authored workflow projection; not a general runtime or authority issuer."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[3]
pack=json.loads((root/'knowledge/K07/candidate.json').read_text())
claim={r['id'].split('-')[-1]:r for r in pack['records'] if r['type']=='Claim'}
def cref(ac):return claim[ac]['id']+'@1'
def ctx(ac):return claim[ac]['context']
records=[];relations=[]
def rec(type,id,**args):
 r=dict(id='K07-'+id,revision=1,type=type,owner='K07',**args);records.append(r);return r['id']+'@1'
def rel(kind,a,b,condition,scope):
 relations.append(dict(id='K07-WR-'+str(len(relations)+1),type=kind,from_=a,to=b,condition=condition,scope=scope,limits='限定离线领域候选，无实际执行/权限/观察。'))
def workflow(code,d2,task,steps,transitions):
 ids={}
 w=rec('Workflow','WF-'+code,d2=d2,task=task,status='CANDIDATE',entry='K07-ST-'+code+'-'+steps[0][0]+'@1',stepRefs=['K07-ST-'+code+'-'+s[0]+'@1' for s in steps],limits='只生成知识条件及候选报告；不执行真实工具、音频、医疗或权限操作。')
 for sid,label,refs,inputs,outputs in steps:
  sr=rec('Step','ST-'+code+'-'+sid,workflow=w,label=label,context=ctx(refs[0]),inputFields=inputs,outputFields=outputs,status='CANDIDATE',failure='UNKNOWN_OR_STOP; no implicit real execution')
  ids[sid]=sr
  for a in refs:rel('requires',sr,cref(a),ctx(refs[0]),'该步骤核验领域谓词及其适用范围；必要不充分，检索不证明条件成立。')
  rel('applies_under',sr,ctx(refs[0]),ctx(refs[0]),'主要专业条件；其他引用各自条件亦需核。')
 for idx,(src,guard,dest,outcome) in enumerate(transitions,1):
  t=rec('Transition','TR-'+code+'-'+str(idx),workflow=w,fromStep=ids[src],guard=guard,toStep=ids[dest] if dest else None,outcome=outcome)
  if dest:rel('prerequisite_for',ids[src],ids[dest],ctx(next(s[2][0] for s in steps if s[0]==src)),'有界分析步骤先后；非物理因果。')
 return w
# Guards are explicit mutually exclusive boolean cases, complete for each finite declared input.
# Safety entry stops on a known positive risk even when unrelated inputs are unknown.
# Actual witness examines every compatible completion; known urgent report retains its medical-stop classification.
risk_inputs=['urgentReported','permissionWithdrawn','stopRequired','conditionsStipulated']
def risk_transitions(next_step):
 return [('RISK',{'urgentReported':True},None,'STOP_SEEK_IMMEDIATE_MEDICAL_EVALUATION'),
 ('RISK',{'urgentReported':False,'permissionWithdrawn':True},None,'STOP_NO_PLAYBACK'),
 ('RISK',{'urgentReported':False,'permissionWithdrawn':False,'stopRequired':True},None,'STOP_NO_PLAYBACK'),
 ('RISK',{'urgentReported':False,'permissionWithdrawn':False,'stopRequired':False,'conditionsStipulated':False},None,'STOP_OR_UNKNOWN_NO_PLAYBACK'),
 ('RISK',{'urgentReported':False,'permissionWithdrawn':False,'stopRequired':False,'conditionsStipulated':True},next_step,None)]
# No hidden defaults or authorization inference. Outcome is always a proposal/unknown/stop.
w2=workflow('SPECTRUM','K07.02','源事件→有限观察→谱解释',[
 ('INPUT','核源、事件、原始序列及时间支持',['AC08','AC32'],['inputIdentityKnown'],['sourceEventRecord']),
 ('WINDOW','核实际窗、NFFT和表示单位',['AC06','AC31','AC07'],['windowMetadataKnown'],['annotationCandidate']),
 ('INTERPRET','区分生成模型、有限谱及谐波序号',['AC05','AC08','AC30'],['generationEvidenceKnown'],['boundedSpectrumInterpretation'])
],[
 ('INPUT',{'inputIdentityKnown':True},'WINDOW',None),('INPUT',{'inputIdentityKnown':False},None,'UNKNOWN_INPUT'),
 ('WINDOW',{'windowMetadataKnown':True},'INTERPRET',None),('WINDOW',{'windowMetadataKnown':False},None,'UNKNOWN_WINDOW'),
 ('INTERPRET',{'generationEvidenceKnown':True},None,'PROPOSED_BOUNDED_ANALYSIS'),('INTERPRET',{'generationEvidenceKnown':False},None,'FINITE_OBSERVATION_ONLY_MODEL_UNKNOWN')])
w4=workflow('MASKING','K07.04','风险与撤回→刺激→控制→机制候选→感知证据',[
 ('RISK','先核风险、撤回和突发听力下降；已知停止优先',['AC41','AC26'],risk_inputs,['riskDisposition']),
 ('STIMULUS','核刺激、参照及目标身份',['AC12','AC14'],['stimulusKnown'],['stimulusCondition']),
 ('CONTROL','分轴能量/包络/目标选择及时间条件',['AC38','AC36'],['mechanismControlsKnown'],['mechanismCandidates']),
 ('EVIDENCE','仅检查既有感知证据，前置风险守卫必须通过；离线候选不播放',['AC38','AC14'],['perceptualEvidenceProvided'],['boundedComparison'])
],risk_transitions('STIMULUS')+[
 ('STIMULUS',{'stimulusKnown':True},'CONTROL',None),('STIMULUS',{'stimulusKnown':False},None,'UNKNOWN_STIMULUS'),
 ('CONTROL',{'mechanismControlsKnown':True},'EVIDENCE',None),('CONTROL',{'mechanismControlsKnown':False},None,'UNKNOWN_MECHANISM'),
 ('EVIDENCE',{'perceptualEvidenceProvided':True},None,'PROPOSED_CONDITIONAL_COMPARISON'),('EVIDENCE',{'perceptualEvidenceProvided':False},None,'MECHANISM_CANDIDATES_ONLY')])
w6=workflow('ROOM','K07.06','场型与路径→有效衰减→拓扑与有限结论',[
 ('GEOMETRY','核几何、时钟、场型及路径',['AC18','AC42','AC44'],['pathConditionsKnown'],['pathCandidates']),
 ('DECAY','核频带、拟合区间及噪声',['AC19','AC43'],['fitConditionsValid'],['decayCandidate']),
 ('TOPOLOGY','核模型完整性及反馈路径',['AC51'],['topologyComplete'],['boundedPathAndDecay'])
],[
 ('GEOMETRY',{'pathConditionsKnown':True},'DECAY',None),('GEOMETRY',{'pathConditionsKnown':False},None,'UNKNOWN_PATH'),
 ('DECAY',{'fitConditionsValid':True},'TOPOLOGY',None),('DECAY',{'fitConditionsValid':False},None,'PATH_CANDIDATE_DECAY_UNKNOWN'),
 ('TOPOLOGY',{'topologyComplete':True},None,'PROPOSED_MODEL_ONLY_NOT_OSCILLATION'),('TOPOLOGY',{'topologyComplete':False},None,'TOPOLOGY_UNKNOWN')])
w7=workflow('MEASUREMENT','K07.07','量定义→校准→派生滤波→不确定度',[
 ('MEASURAND','核量定义、参考、频权及时间',['AC21','AC45'],['measurandKnown'],['measurandSpec']),
 ('CALIBRATION','核物理链校准当前性',['AC22','AC46'],['physicalCalibrationCurrent'],['calibrationScope']),
 ('FILTER','核原始校准波形、滤波与边界',['AC22','AC46'],['rawWaveformAndFilterValid'],['derivedReportCandidate']),
 ('UNCERTAINTY','核不确定度模型、相关性及用途',['AC23','AC47'],['uncertaintyModelKnown'],['boundedMeasurementReport'])
],[
 ('MEASURAND',{'measurandKnown':True},'CALIBRATION',None),('MEASURAND',{'measurandKnown':False},None,'UNKNOWN_MEASURAND'),
 ('CALIBRATION',{'physicalCalibrationCurrent':True},'FILTER',None),('CALIBRATION',{'physicalCalibrationCurrent':False},None,'PROPOSE_REVALIDATE_CALIBRATION'),
 ('FILTER',{'rawWaveformAndFilterValid':True},'UNCERTAINTY',None),('FILTER',{'rawWaveformAndFilterValid':False},None,'RETAIN_RAW_IF_VALID_NEW_WEIGHT_UNKNOWN'),
 ('UNCERTAINTY',{'uncertaintyModelKnown':True},None,'PROPOSED_MEASUREMENT_REPORT'),('UNCERTAINTY',{'uncertaintyModelKnown':False},None,'UNCERTAINTY_UNKNOWN')])
w8=workflow('LISTENING','K07.08','风险与许可→播放链→暴露记录→候选比较',[
 ('RISK','风险、撤回和突然听力下降优先',['AC26','AC49','AC50','AC41'],risk_inputs,['riskDisposition']),
 ('CHAIN','核播放链身份和有效电平条件',['AC24','AC48'],['playbackEvidenceCurrent'],['chainConditions']),
 ('EXPOSURE','核用途、时间和完整校准暴露数据',['AC25','AC49'],['exposureEvidenceComplete'],['exposureConditions']),
 ('COMPARE','只提出离线对照候选，保护原件',['AC26','AC50'],['analysisEvidenceCurrent'],['comparisonProposal'])
],risk_transitions('CHAIN')+[
 ('CHAIN',{'playbackEvidenceCurrent':True},'EXPOSURE',None),('CHAIN',{'playbackEvidenceCurrent':False},None,'CHAIN_EVIDENCE_INVALID_NO_PLAYBACK'),
 ('EXPOSURE',{'exposureEvidenceComplete':True},'COMPARE',None),('EXPOSURE',{'exposureEvidenceComplete':False},None,'EXPOSURE_UNKNOWN_NO_PLAYBACK'),
 ('COMPARE',{'analysisEvidenceCurrent':True},None,'PROPOSED_OFFLINE_COMPARISON_ONLY'),('COMPARE',{'analysisEvidenceCurrent':False},None,'PROPOSE_RECOMPUTE_OFFLINE_ONLY')])
# A06 P: actual editable synthetic annotation example, distinct exact input and report revisions.
signal=rec('Artifact','ART-SYNTH-SIGNAL',kind='SYNTHETIC_PARAMETER_RECORD',status='CANDIDATE',fields=dict(signalRef='SYNTH-AC31',fsHz=4800,observedN=48,window='RECTANGULAR',hopSamples=48,timeOriginSamples=0,spectrumKind='COMPLEX_DFT',unit='ARBITRARY_AMPLITUDE'),limits='合成参数记录，不是实际音频或文件处理。')
a1=rec('Artifact','ART-SPECTRUM-ANNOTATION',kind='EDITABLE_SPECTRUM_ANNOTATION',status='CANDIDATE',fields=dict(inputRef=signal,nfft=48,gridHz=100,windowMs=10,firstNullHz=100,physicalResolution='NOT_ESTABLISHED'),limits='仅矩形单复指数示例。')
a2=next(r for r in records if r['id']+'@1'==a1).copy();a2['revision']=2;a2['fields']={**a2['fields'],'nfft':480,'gridHz':10};records.append(a2);a2ref=a2['id']+'@2'
for a in (a1,a2ref):rel('derived_from',a,signal,ctx('AC31'),'保留原输入；新NFFT仅派生新格点标注，实际窗不变。')
rel('supersedes',a2ref,a1,ctx('AC31'),'新标注版本替换当前选择，旧历史保留；不继承接受或权限。')
for r in relations:r['from']=r.pop('from_')
# A04/A07 actual condition/version witnesses; no real Grant record, no real action.
stateRules={
 'scope':'AC22/46 + AC48/50; synthetic evidence state only, not permission service',
 'initial':{'sourceId':'SYNTH-ORIGINAL@1','analysisVersion':'w1','physicalChain':'cal1','playbackChain':'play1','permission':'STIPULATED_ONLY','risk':'UNKNOWN_NOT_REAL','rawCalibrationEvidence':'CURRENT_IN_FIXTURE','spectrumReport':'CURRENT_IN_FIXTURE','listeningMatch':'CURRENT_IN_FIXTURE','action':'OFFLINE_ONLY'},
 'events':[
  {'event':'ANALYSIS_WINDOW_CHANGED','claimRefs':[cref('AC50'),cref('AC31')],'changes':{'analysisVersion':'w2','spectrumReport':'NEEDS_RECOMPUTE'},'preserve':['sourceId','physicalChain','rawCalibrationEvidence','playbackChain','listeningMatch'],'action':'OFFLINE_RECOMPUTE_PROPOSAL'},
  {'event':'PHYSICAL_CHAIN_CHANGED','claimRefs':[cref('AC46'),cref('AC22')],'changes':{'physicalChain':'cal2','rawCalibrationEvidence':'NEEDS_REVALIDATION','spectrumReport':'NEEDS_RECOMPUTE'},'preserve':['sourceId'],'action':'REVALIDATION_PROPOSAL'},
  {'event':'PLAYBACK_CHAIN_CHANGED','claimRefs':[cref('AC48'),cref('AC50')],'changes':{'playbackChain':'play2','listeningMatch':'INVALIDATED'},'preserve':['sourceId','rawCalibrationEvidence'],'action':'NO_PLAYBACK'},
  {'event':'PERMISSION_WITHDRAWN','claimRefs':[cref('AC26'),cref('AC50')],'changes':{'permission':'WITHDRAWN'},'preserve':['sourceId'],'action':'STOP_NO_PLAYBACK'},
  {'event':'SUDDEN_HEARING_LOSS_REPORTED','claimRefs':[cref('AC17'),cref('AC41')],'changes':{'risk':'URGENT_REPORT'},'preserve':['sourceId'],'action':'STOP_SEEK_IMMEDIATE_MEDICAL_EVALUATION'}
 ],
 'rules':['Stop dominates subsequent proposed reanalysis or comparison after withdrawal/urgent report; never infer permission from role, state or prior result.','Source identity protected across all events.','Only known explicit event kinds supported; unknown event is UNKNOWN/no execution.','MASKING and LISTENING entry RISK: known urgent report, withdrawal or stop cannot be demoted by missing conditions; unknown risk never authorizes comparison. Partial input may return only a stop if all compatible complete guard assignments terminate stop; medical classification only with explicit urgent report.']
}
out=dict(format='audio-kg-K07-domain-workflow-candidate/1',status='CANDIDATE_PROPOSALS_ONLY',records=records,relations=relations,roleBindings={'K07.02/A02':w2,'K07.04/A02':w4,'K07.06/A02':w6,'K07.07/A02':w7,'K07.08/A02':w8,'K07.02/A06':a2ref},stateRules=stateRules,limits='Finite local domain-specific shape and tests only; no common schema change, no arbitrary execution, real grants, audio, actual clinical observation or production DB.')
(root/'knowledge/K07/domain-workflows.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'workflowRecords':len(records),'workflowRelations':len(relations),'workflowCount':5,'stateEvents':len(stateRules['events'])}))
