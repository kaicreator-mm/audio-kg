import importlib.util,json,sys,pathlib,tempfile,copy
p=pathlib.Path(__file__).with_name('run-llm-bundle.py')
spec=importlib.util.spec_from_file_location('runner',p);r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
bundle=json.loads(pathlib.Path(sys.argv[1]).read_bytes())
# This fixture has public synthetic smoke inputs; never touch actual network or credentials.
assert len(bundle['slots'])==104
seals=(bundle['inputsSha256'],bundle['protocolSha256'])
assert seals!=(r.INPUT_SHA,r.PROTOCOL_SHA)
passed=[]
def t(n,f):f();passed.append(n)
def reject(f):
 try:f()
 except (AssertionError,KeyError,TypeError,ValueError,FileExistsError):return
 raise AssertionError('expected rejection')
def change(f):
 x=copy.deepcopy(bundle);f(x);reject(lambda:r.validate_bundle(x,seals))
def ready(x):return next(s for s in x['slots'] if s['status']=='READY')
def response(fp='fixture-fingerprint',prompt=20,output=10,model=r.MODEL,finish='stop'):
 return json.dumps(dict(model=model,system_fingerprint=fp,usage=dict(prompt_tokens=prompt,completion_tokens=output,total_tokens=prompt+output),choices=[dict(message=dict(content='公开模拟输出'),finish_reason=finish)])).encode()
def fake_result(tmp,transport):
 b=r.enc(bundle);return r.run(b,r.hash_bytes(b),tmp,'FAKE_KEY_FOR_TEST_ONLY',transport=transport,seals=seals)
t('paired exact shape and budget cap',lambda:r.validate_bundle(bundle,seals))
t('production runner refuses mock input/protocol seal',lambda:reject(lambda:r.validate_bundle(bundle)))
t('duplicate slot rejection',lambda:change(lambda x:x['slots'].__setitem__(0,x['slots'][1])))
t('model request parameter mutation refusal',lambda:change(lambda x:ready(x)['body'].__setitem__('max_tokens',1025)))
t('prompt bound mismatch refusal',lambda:change(lambda x:ready(x).__setitem__('inputBound',1)))
t('common system mutation refusal',lambda:change(lambda x:ready(x)['body']['messages'][0].__setitem__('content','different')))
t('model mismatch refusal',lambda:reject(lambda:r.response_check(response(model='other'),None)))
t('fingerprint mismatch refusal',lambda:reject(lambda:r.response_check(response(fp='other'),'expected')))
t('usage excess refusal',lambda:reject(lambda:r.response_check(response(prompt=8193),None)))
t('max output refusal',lambda:reject(lambda:r.response_check(response(output=1025),None)))
def assert_truncated():assert r.response_check(response(finish='length'),None)[3] is False
t('truncated response is not valid',assert_truncated)
def complete():
 with tempfile.TemporaryDirectory() as d:
  out=pathlib.Path(d)/'run';n=0
  def transport(data,key):
   nonlocal n;n+=1
   assert key=='FAKE_KEY_FOR_TEST_ONLY' and key.encode() not in data
   return 200,response()
  s=fake_result(out,transport);assert s['status']=='RUN_RECORDED_NOT_SCORED'
  assert s['slots']==104 and s['attempts']==s['valid']==n==sum(x['status']=='READY' for x in bundle['slots'])
  assert s['observedPromptTokens']==20*n and s['observedCompletionTokens']==10*n
  assert len(list(out.glob('*-status.json')))==104
  reject(lambda:fake_result(out,transport));assert n==s['attempts']
def stop_test(mode):
 with tempfile.TemporaryDirectory() as d:
  out=pathlib.Path(d)/'run';n=0
  def transport(data,key):
   nonlocal n;n+=1
   if mode=='drift':return 200,response(fp='different' if n==2 else 'fixture')
   if mode=='http':return 429,b'quota'
   if mode=='secret':return 200,key.encode()
   if mode=='timeout':raise TimeoutError()
   if mode=='usage':return 200,response(prompt=8193)
  s=fake_result(out,transport);assert s['status']=='STOPPED_FAIL_CLOSED'
  assert s['attempts']==n==(2 if mode=='drift' else 1)
  assert s['slots']==104 and s['billingCompleteness']=='PARTIAL_UNKNOWN'
  assert all(b'FAKE_KEY_FOR_TEST_ONLY' not in f.read_bytes() for f in out.iterdir())
t('successful mock accounting and repeated run denial',complete)
for mode in ('drift','http','secret','timeout','usage'):
 t('stop and preserve 104 slot statuses on '+mode,lambda mode=mode:stop_test(mode))
print(json.dumps(dict(status='MOCK_ONLY_NO_NETWORK',passed=len(passed),results=passed,worstCaseUSD=str(r.worst_cost()))))
