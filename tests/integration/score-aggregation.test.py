"""Synthetic metadata-only fixture; no evaluator data or model requests."""
import importlib.util, pathlib, tempfile, json, hashlib, copy
p=pathlib.Path(__file__).with_name('aggregate-blind-scores.py')
spec=importlib.util.spec_from_file_location('agg',p);agg=importlib.util.module_from_spec(spec);spec.loader.exec_module(agg)
def save(p,x):p.write_text(json.dumps(x));return hashlib.sha256(p.read_bytes()).hexdigest()
def expect_fail(f):
 try:f()
 except (AssertionError,KeyError,FileExistsError):return
 raise AssertionError('expected rejection')
with tempfile.TemporaryDirectory() as d:
 d=pathlib.Path(d)
 records=[];mapping=[];excluded=[];grades=[]
 for i in range(1,27):
  for j,a in enumerate('ABCD',1):
   n=(i-1)*4+j;t=f'E01-{i:02}'
   if i==1:
    rid=f'smoke-{n}'
    records.append(dict(responseId=rid,taskId=t,task='public fixture',answer='fixture answer'))
    mapping.append(dict(responseId=rid,slot=n,taskId=t,arm=a,responseSha256='0'*64))
    grades.append(dict(responseId=rid,taskId=t,criteria=[dict(index=k,score=min(j-1,2),reason='mock only',evidence='fixture') for k in range(1,6)],hardFailures=['mock hard failure'] if a=='B' else [],hardFailureAssessment='mock only'))
   else:excluded.append(dict(slot=n,taskId=t,arm=a,status='CONTEXT_INFEASIBLE'))
 packet=dict(format=agg.PACKET_FORMAT,status='UNSCORED',records=records)
 pp=d/'packet';ph=save(pp,packet)
 g=dict(format='audio-kg-t07-independent-grades/1',packetSha256=ph,rubricSha256='14db520d4768b9c07f333c4955b46f9a4e4b55a8f19bc562a3b85f92ff96ad58',blindBeforeSeal=True,gradedWithoutExternalLLM=True,grades=grades)
 gp=d/'grades';gh=save(gp,g)
 hidden=dict(mapping=mapping,excluded=excluded,actualSummarySha256='1'*64,bundleSha256='2'*64)
 mp=d/'map';mh=save(mp,hidden);out=d/'out'
 agg.main(pp,gp,mp,ph,gh,mh,out)
 o=json.loads(out.read_bytes())
 assert o['validGraded']==4 and o['excluded']==100 and o['perArm']['B']['hardFailureResponses']==1
 assert o['paired']['B-A']['matched']==1 and o['paired']['B-A']['meanNormalizedDifference']==.5
 assert o['paired']['D-C']['ties']==1 and o['paired']['D-A']['meanNormalizedDifference']==1
 expect_fail(lambda:agg.main(pp,gp,mp,'wrong',gh,mh,d/'fail'))
 for label,mut in [('missing response',lambda x:x['grades'].pop()),('duplicate response',lambda x:x['grades'].append(x['grades'][0])),('score exceeds 2',lambda x:x['grades'][0]['criteria'][0].update(score=3)),('invented response evidence',lambda x:x['grades'][0]['criteria'][0].update(evidence='not present')),('unsealed blind flag',lambda x:x.update(blindBeforeSeal=False))]:
  x=copy.deepcopy(g);mut(x);h=save(gp,x)
  expect_fail(lambda:agg.main(pp,gp,mp,ph,h,mh,d/'fail'))
 print('SYNTHETIC_AGGREGATION_TESTS PASS 7/7; NO ACTUAL GRADES')
