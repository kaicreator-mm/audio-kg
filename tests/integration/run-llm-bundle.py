"""Bounded T07 actual execution; never imports evaluator data or rubric."""
import hashlib,json,os,pathlib,sys,time,urllib.request,urllib.error,datetime,math,importlib.util,re
from decimal import Decimal
if not __debug__:raise RuntimeError('optimized execution forbidden')
MODEL='deepseek-flash'
VERSION='DeepSeek-V4.1-Flash-1017'
URL='https://api.deepseek.com/chat/completions'
KG_BASE='7d4068980b750af2beaa97665219e2d950b3cc9e'
KG_TREE='cda3bac9c7b3ee9070dc7cfa610e7ce8f6b58338'
INPUT_SHA='b68cc7d7a63ddb156a7d55934ea912bc93e57d401adacb80e5c8f4aa2b70903f'
PROTOCOL_SHA='c39abe24d5cbae8f638e993205f1f4f19f5c5a26de173add6ae92bef0212533e'
SYSTEM='你是音乐与音频领域的答题者。根据题设给出简明中文答案、适用条件、必要计算或核验步骤；区分事实、题设、候选解释、未知和拒绝边界。若附有候选知识，仅按条件使用；拒绝例不是事实，来源定位不等于权利或真实观察。无足够证据时明确未知，不虚构来源、权限、实际执行或唯一解释。无需声称执行任何工具。'
PARAMS=dict(model=MODEL,thinking={'type':'disabled'},temperature=.2,max_tokens=1024,stream=False,n=1,tool_choice='none',response_format={'type':'text'})
MAX_INPUT=8192;MAX_OUTPUT=1024;MAX_SLOTS=104
INPUT_PEAK=Decimal('0.30');OUTPUT_PEAK=Decimal('1.20');USD_CAP=Decimal('10')
def hash_bytes(b):return hashlib.sha256(b).hexdigest()
def now():return datetime.datetime.now(datetime.timezone.utc).isoformat()
def enc(x):return (json.dumps(x,ensure_ascii=False,sort_keys=True,indent=2)+'\n').encode()
def bound(body):return 512+sum(len(x['content'].encode()) for x in body['messages'])
def worst_cost():return (INPUT_PEAK*MAX_INPUT+OUTPUT_PEAK*MAX_OUTPUT)*MAX_SLOTS/Decimal(1000000)
def tokenizer_module():
 p=pathlib.Path(__file__).with_name('offline-tokenizer.py')
 spec=importlib.util.spec_from_file_location('offline_tokenizer',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def validate_bundle(bundle,seals=(INPUT_SHA,PROTOCOL_SHA),counter=None):
 assert bundle['format']=='audio-kg-t07-request-bundle/1' and bundle['kgBase']==KG_BASE and bundle['kgTree']==KG_TREE
 assert (bundle['inputsSha256'],bundle['protocolSha256'])==seals
 if seals==(INPUT_SHA,PROTOCOL_SHA):
  assert counter is not None and bundle['tokenizer']==tokenizer_module().IDENTITY
 else:assert counter is None and bundle['tokenizer'] is None
 assert bundle['approvalState']=='DRAFT_REQUIRES_INDEPENDENT_EVALUATOR_APPROVAL'
 slots=bundle['slots'];assert len(slots)==MAX_SLOTS
 assert len(bundle['metadata'])==26 and {x['id'] for x in bundle['metadata']}=={f'E01-{i:02}' for i in range(1,27)}
 assert {(s['id'],s['arm']) for s in slots}=={(f'E01-{i:02}',a) for i in range(1,27) for a in 'ABCD'}
 assert [s['slot'] for s in slots]==list(range(1,105))
 common_system=set()
 for i in range(1,27):
  rows={s['arm']:s for s in slots if s['id']==f'E01-{i:02}'}
  states={s['status'] for s in rows.values()};assert len(states)==1
  if states=={'CONTEXT_INFEASIBLE'}:
   assert all(s['body'] is None for s in rows.values()) and any(s['inputBound']>MAX_INPUT for s in rows.values());continue
  assert states=={'READY'}
  users=[]
  for a in 'ABCD':
   s=rows[a];b=s['body'];assert {k:v for k,v in b.items() if k!='messages'}==PARAMS
   assert len(b['messages'])==2 and [m['role'] for m in b['messages']]==['system','user']
   assert all(set(m)=={'role','content'} and isinstance(m['content'],str) and m['content'].strip() for m in b['messages'])
   assert bound(b)==s['byteBound']
   if counter is not None:
    assert counter(b)==s['offlinePromptTokens'] and s['inputBound']==s['offlinePromptTokens']+512
   else:assert s['offlinePromptTokens'] is None and bound(b)==s['inputBound']
   assert s['inputBound']<=MAX_INPUT
   assert b['messages'][0]['content']==SYSTEM
   common_system.add(b['messages'][0]['content']);users.append(b['messages'][1]['content'])
  assert users[0].startswith('题设：\n')
  for x,y,label in zip(users,users[1:],['候选知识（限定条件；非实际观察或授权）：','正向及反向正确应用示例（合成）：','正向及反向拒绝示例（错误输入或越界，不是事实）：']):
   assert y.startswith(x+'\n\n'+label+'\n')
 assert len(common_system)==1 # fail closed if all tasks infeasible
 assert worst_cost()<=USD_CAP
 return slots
def response_check(raw,expected_fp):
 obj=json.loads(raw)
 assert obj.get('model')==MODEL
 fp=obj.get('system_fingerprint');assert isinstance(fp,str) and fp
 assert expected_fp is None or fp==expected_fp
 u=obj['usage'];p,c,t=(u[k] for k in ('prompt_tokens','completion_tokens','total_tokens'))
 assert all(type(x) is int and x>=0 for x in (p,c,t)) and t==p+c and p<=MAX_INPUT and c<=MAX_OUTPUT
 assert not u.get('server_tool_use')
 ch=obj['choices'];assert len(ch)==1
 m=ch[0]['message'];assert not m.get('tool_calls') and not m.get('reasoning_content')
 assert ch[0]['finish_reason'] in ('stop','length','content_filter','insufficient_system_resource','aborted')
 content=m.get('content');valid=ch[0]['finish_reason']=='stop' and isinstance(content,str) and bool(content.strip())
 return fp,p,c,valid,ch[0]['finish_reason']
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
def post(data,key):
 req=urllib.request.Request(URL,data=data,headers={'Content-Type':'application/json','Authorization':'Bearer '+key},method='POST')
 opener=urllib.request.build_opener(urllib.request.ProxyHandler({}),NoRedirect())
 try:
  with opener.open(req,timeout=90) as res:
   raw=res.read(2_000_001);return res.status,raw
 except urllib.error.HTTPError as e:
  return e.code,e.read(2_000_001)
def save(p,data):
 with open(p,'xb') as f:f.write(data);f.flush();os.fsync(f.fileno())
def run(bundle_bytes,expected_hash,out,key,transport=post,seals=(INPUT_SHA,PROTOCOL_SHA),counter=None):
 if transport is post:assert seals==(INPUT_SHA,PROTOCOL_SHA) and counter is not None
 assert hash_bytes(bundle_bytes)==expected_hash
 bundle=json.loads(bundle_bytes);slots=validate_bundle(bundle,seals,counter)
 assert isinstance(key,str) and key
 out.mkdir(mode=0o700,exist_ok=False)
 save(out/'start.json',enc(dict(startedAt=now(),bundleSha256=expected_hash,model=MODEL,documentedVersion=VERSION,worstCaseUSD=str(worst_cost()),inputPeakPerMillion=str(INPUT_PEAK),outputPeakPerMillion=str(OUTPUT_PEAK),noRetries=True)))
 fp=None;used_in=used_out=0;stop=None;attempts=0;results=[]
 for s in slots:
  row={k:s[k] for k in ('slot','id','arm','inputBound')};row['status']=s['status']
  prefix=f"{s['slot']:03}"
  if s['status']!='READY':row['status']='CONTEXT_INFEASIBLE'
  elif stop:row.update(status='UNATTEMPTED_AFTER_STOP',reason=stop)
  else:
   data=enc(s['body']);assert key.encode() not in data
   save(out/(prefix+'-request.json'),data)
   save(out/(prefix+'-attempt.json'),enc(dict(slot=s['slot'],startedAt=now(),requestSha256=hash_bytes(data))))
   attempts+=1;start=time.monotonic();raw=None
   try:
    code,raw=transport(data,key)
    row.update(httpStatus=code,durationMs=round((time.monotonic()-start)*1000),requestSha256=hash_bytes(data))
    if len(raw)>2_000_000 or key.encode() in raw:
     stop='RESPONSE_SIZE_OR_SECRET_GATE';row['status']='FAILED_RESPONSE_GATE'
    else:
     save(out/(prefix+'-response.bin'),raw);row['responseSha256']=hash_bytes(raw)
     if code!=200:
      row['status']='FAILED_HTTP';stop='HTTP_FAILURE_UNCERTAIN_BILLING'
     else:
      try:
       fp,p,c,valid,finish=response_check(raw,fp)
       used_in+=p;used_out+=c
       assert used_in<=MAX_INPUT*MAX_SLOTS and used_out<=MAX_OUTPUT*MAX_SLOTS
       assert (INPUT_PEAK*used_in+OUTPUT_PEAK*used_out)/Decimal(1000000)<=USD_CAP
       row.update(status='VALID_RESPONSE' if valid else 'FAILED_COMPLETION',fingerprint=fp,promptTokens=p,completionTokens=c,finishReason=finish)
      except Exception:
       row['status']='FAILED_MODEL_USAGE_OR_FINGERPRINT';stop='MODEL_USAGE_OR_FINGERPRINT_GATE'
   except Exception as e:
    row.update(status='FAILED_TRANSPORT',errorType=type(e).__name__,durationMs=round((time.monotonic()-start)*1000));stop='TRANSPORT_UNCERTAIN_BILLING'
  row['recordedAt']=now();save(out/(prefix+'-status.json'),enc(row));results.append(row)
 summary=dict(status='RUN_RECORDED_NOT_SCORED' if not stop else 'STOPPED_FAIL_CLOSED',attempts=attempts,valid=sum(r['status']=='VALID_RESPONSE' for r in results),slots=len(results),stop=stop,observedPromptTokens=used_in,observedCompletionTokens=used_out,observedCostUpperUSD=str((INPUT_PEAK*used_in+OUTPUT_PEAK*used_out)/Decimal(1000000)),billingCompleteness='PARTIAL_UNKNOWN' if stop else 'OBSERVED_USAGE_ONLY',reservedWorstCaseUSD=str(worst_cost()),fingerprint=fp,model=MODEL,documentedVersion=VERSION,results=results)
 save(out/'summary.json',enc(summary));return summary
def approval_check(a,bundle_bytes,out):
 expected=set('format verdict presealComment reviewIssue reviewComment reviewedCodeHead reviewedCodeTree runnerSha256 assemblerSha256 tokenizerCounterSha256 bundleSha256 selectionSha256 inputsSha256 protocolSha256 kgBase kgTree model documentedVersion inputPeakPerMillion outputPeakPerMillion maxUSD rightsAndNoLeakage scheduleVerified isolationVerified tokenBudgetVerified outputPath approvedAt'.split())
 assert set(a)==expected
 assert a['format']=='audio-kg-t07-independent-execution-approval/1' and a['verdict']=='ACCEPT_SCOPED_EXECUTION_GATE'
 assert a['presealComment']==7244130072 and type(a['reviewIssue']) is int and type(a['reviewComment']) is int and a['reviewComment']>0
 for k in ('reviewedCodeHead','reviewedCodeTree'):assert re.fullmatch('[0-9a-f]{40}',a[k])
 for k in ('runnerSha256','assemblerSha256','tokenizerCounterSha256','bundleSha256','selectionSha256'):assert re.fullmatch('[0-9a-f]{64}',a[k])
 assert a['runnerSha256']==hash_bytes(pathlib.Path(__file__).read_bytes())
 assert a['assemblerSha256']==hash_bytes(pathlib.Path(__file__).with_name('prepare-llm-bundle.mjs').read_bytes())
 assert a['tokenizerCounterSha256']==hash_bytes(pathlib.Path(__file__).with_name('offline-tokenizer.py').read_bytes())
 assert a['bundleSha256']==hash_bytes(bundle_bytes)
 b=json.loads(bundle_bytes);assert a['selectionSha256']==b['selectionSha256']
 assert (a['inputsSha256'],a['protocolSha256'])==(INPUT_SHA,PROTOCOL_SHA)
 assert (a['kgBase'],a['kgTree'])==(KG_BASE,KG_TREE)
 assert (a['model'],a['documentedVersion'])==(MODEL,VERSION)
 assert Decimal(a['inputPeakPerMillion'])==INPUT_PEAK and Decimal(a['outputPeakPerMillion'])==OUTPUT_PEAK and Decimal(a['maxUSD'])==USD_CAP
 assert all(a[x] is True for x in ('rightsAndNoLeakage','scheduleVerified','isolationVerified','tokenBudgetVerified'))
 assert pathlib.Path(a['outputPath'])==out.resolve() and not out.exists()
 assert datetime.datetime.fromisoformat(a['approvedAt']).tzinfo is not None
 return a['bundleSha256']
def root_pinned(p):
 st=p.lstat();assert not p.is_symlink() and st.st_uid==0 and not st.st_mode&0o022 and p.is_file()
 return p.read_bytes()
def main():
 assert os.geteuid()!=0,'runner must not be root'
 try:os.listdir('/root/.audio-kg-evaluator')
 except PermissionError:pass
 else:raise AssertionError('oracle accessible or missing')
 assert len(sys.argv)==5
 bundle=pathlib.Path(sys.argv[1]);approval_path=pathlib.Path(sys.argv[2]);out=pathlib.Path(sys.argv[3]);tokdir=pathlib.Path(sys.argv[4])
 assert bundle.parent==approval_path.parent and bundle.parent.resolve()==bundle.parent
 assert out.parent.stat().st_uid==os.geteuid() and out.parent.stat().st_mode&0o077==0
 raw=root_pinned(bundle);approval=json.loads(root_pinned(approval_path))
 expected=approval_check(approval,raw,out)
 counter=tokenizer_module().load_counter(tokdir)
 validate_bundle(json.loads(raw),counter=counter)
 key=os.environ.get('DEEPSEEK_API_KEY');assert key
 result=run(raw,expected,out,key,counter=counter)
 print(json.dumps({k:v for k,v in result.items() if k!='results'},ensure_ascii=False))
 return 0 if result['status']=='RUN_RECORDED_NOT_SCORED' else 2
if __name__=='__main__':
 try:sys.exit(main())
 except Exception as e:
  print('EXECUTION_REJECTED',type(e).__name__,file=sys.stderr);sys.exit(1)
