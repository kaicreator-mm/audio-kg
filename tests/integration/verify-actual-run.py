"""Read exact private evidence, emit public metadata only; no model call or scoring."""
import argparse,collections,hashlib,json,pathlib,stat
from decimal import Decimal
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_bytes())
def check(r,output):
 approved=r/'approved'
 bundle_path=approved/'bundle.json';approval_path=approved/'approval.json'
 bundle=read(bundle_path);approval=read(approval_path)
 assert sha(bundle_path.read_bytes())=='f96ea4b17433c9e89415628ea0454b95ff4d1493a93225b72747987033eda54a'
 assert sha(approval_path.read_bytes())=='456fc1193ac120b9652ecf00ea1c6641571120ee111a42dcbda3abb72aa1f920'
 assert approval['reviewComment']==7244606699 and approval['bundleSha256']==sha(bundle_path.read_bytes())
 p=r/'work/actual-run';summary=read(p/'summary.json');start=read(p/'start.json')
 assert start['bundleSha256']==approval['bundleSha256'] and start['noRetries'] is True
 assert len(summary['results'])==len(bundle['slots'])==104
 rows=[];attempts=valid=0;tokens_in=tokens_out=0;fps=set();durations=[]
 files={'start.json':sha((p/'start.json').read_bytes()),'summary.json':sha((p/'summary.json').read_bytes())}
 expected_files={'start.json','summary.json'}
 for i,(slot,row) in enumerate(zip(bundle['slots'],summary['results']),1):
  assert (slot['slot'],row['slot'])==(i,i)
  assert (slot['id'],slot['arm'],slot['inputBound'])==(row['id'],row['arm'],row['inputBound'])
  name=f'{i:03}-status.json';f=p/name
  assert read(f)==row
  files[name]=sha(f.read_bytes());expected_files.add(name)
  state=row['status']
  meta={k:row[k] for k in ('slot','id','arm','status','inputBound')}
  if state in ('CONTEXT_INFEASIBLE','UNATTEMPTED_AFTER_STOP'):
   assert (state=='CONTEXT_INFEASIBLE')==(slot['status']=='CONTEXT_INFEASIBLE')
  else:
   assert slot['status']=='READY';attempts+=1
   for suffix in ('request.json','attempt.json'):
    name=f'{i:03}-{suffix}';f=p/name;expected_files.add(name);files[name]=sha(f.read_bytes())
   req=p/f'{i:03}-request.json';att=read(p/f'{i:03}-attempt.json')
   assert read(req)==slot['body'] and att['slot']==i and att['requestSha256']==sha(req.read_bytes())
   meta['requestSha256']=files[req.name]
   if 'requestSha256' in row:assert row['requestSha256']==files[req.name]
   resp=p/f'{i:03}-response.bin'
   if resp.exists():
    expected_files.add(resp.name);files[resp.name]=sha(resp.read_bytes());meta['responseSha256']=files[resp.name]
    assert row['responseSha256']==files[resp.name]
   if state in ('VALID_RESPONSE','FAILED_COMPLETION'):
    assert row['httpStatus']==200 and resp.exists()
    obj=read(resp);u=obj['usage'];ch=obj['choices'][0]
    assert obj['model']==approval['model'] and obj['system_fingerprint']==row['fingerprint']
    assert u['prompt_tokens']==row['promptTokens'] and u['completion_tokens']==row['completionTokens']
    assert u['total_tokens']==u['prompt_tokens']+u['completion_tokens']
    assert 0<=u['prompt_tokens']<=8192 and 0<=u['completion_tokens']<=1024
    assert len(obj['choices'])==1 and row['finishReason']==ch['finish_reason']
    assert (state=='VALID_RESPONSE')==(ch['finish_reason']=='stop' and isinstance(ch['message'].get('content'),str) and bool(ch['message']['content'].strip()))
    fps.add(row['fingerprint']);tokens_in+=row['promptTokens'];tokens_out+=row['completionTokens'];valid+=state=='VALID_RESPONSE'
    for k in ('promptTokens','completionTokens','finishReason','fingerprint'):meta[k]=row[k]
   if 'durationMs' in row:durations.append(row['durationMs']);meta['durationMs']=row['durationMs']
   if 'httpStatus' in row:meta['httpStatus']=row['httpStatus']
  rows.append(meta)
 assert expected_files=={f.name for f in p.iterdir() if f.is_file()}
 assert attempts==summary['attempts'] and valid==summary['valid']
 assert tokens_in==summary['observedPromptTokens'] and tokens_out==summary['observedCompletionTokens']
 assert len(fps)<=1
 cost=(Decimal(tokens_in)*Decimal('.30')+Decimal(tokens_out)*Decimal('1.20'))/Decimal(1000000)
 assert cost==Decimal(summary['observedCostUpperUSD'])
 assert attempts<=100 and len(rows)==104
 byarm={a:dict(collections.Counter(x['status'] for x in rows if x['arm']==a)) for a in 'ABCD'}
 doc=dict(status=summary['status'],reviewedCodeHead=approval['reviewedCodeHead'],reviewedCodeTree=approval['reviewedCodeTree'],kgBase=approval['kgBase'],kgTree=approval['kgTree'],presealComment=7244130072,executionReviewComment=7244606699,approvalReceiptComment=7244614171,bundleSha256=approval['bundleSha256'],approvalSha256=sha(approval_path.read_bytes()),attempts=attempts,valid=valid,slots=104,byArm=byarm,observedPromptTokens=tokens_in,observedCompletionTokens=tokens_out,observedCostUpperUSD=str(cost),billingCompleteness=summary['billingCompleteness'],reservedWorstCaseUSD=summary['reservedWorstCaseUSD'],model=summary['model'],documentedVersion=summary['documentedVersion'],fingerprint=summary['fingerprint'],stop=summary['stop'],totalRequestDurationMs=sum(durations),statusRows=rows,privateEvidenceFileSha256=files,actualScores=0,acceptedClaims=0,scope='Actual response/request bytes retained in restricted runner; metadata only, no text or rubric. Observed charges upper bound is not invoice. No scoring or efficacy conclusion.')
 output.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({k:v for k,v in doc.items() if k not in ('statusRows','privateEvidenceFileSha256')},ensure_ascii=False))
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('runner',type=pathlib.Path);parser.add_argument('output',type=pathlib.Path);a=parser.parse_args()
 check(a.runner,a.output)
