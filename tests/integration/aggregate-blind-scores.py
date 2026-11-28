"""Deterministic aggregation only; independent evaluator must author and seal all scores first."""
import argparse,collections,hashlib,json,pathlib,statistics
from fractions import Fraction
PACKET_FORMAT='audio-kg-t07-blind-grade/1'
def read(p):return json.loads(p.read_bytes())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def require_keys(x,keys):assert set(x)==set(keys.split())
def avg(xs):
 return None if not xs else float(sum(xs,Fraction(0))/len(xs))
def main(packet_path,grades_path,mapping_path,expected_packet,expected_grades,expected_mapping,output):
 assert sha(packet_path)==expected_packet and sha(grades_path)==expected_grades and sha(mapping_path)==expected_mapping
 packet,grades,hidden=map(read,[packet_path,grades_path,mapping_path])
 assert packet['format']==PACKET_FORMAT and packet['status']=='UNSCORED'
 assert grades['format']=='audio-kg-t07-independent-grades/1' and grades['packetSha256']==expected_packet
 assert grades['rubricSha256']=='14db520d4768b9c07f333c4955b46f9a4e4b55a8f19bc562a3b85f92ff96ad58'
 assert grades['blindBeforeSeal'] is True and grades['gradedWithoutExternalLLM'] is True
 byid={x['responseId']:x for x in packet['records']}
 m={x['responseId']:x for x in hidden['mapping']}
 assert len(byid)==len(packet['records'])==len(m)==len(hidden['mapping'])
 assert set(byid)==set(m)
 scores={}
 for g in grades['grades']:
  require_keys(g,'responseId taskId criteria hardFailures hardFailureAssessment')
  oid=g['responseId'];assert oid in byid and oid not in scores
  r=byid[oid];assert r['taskId']==g['taskId']==m[oid]['taskId']
  assert len(g['criteria'])==5 and [c['index'] for c in g['criteria']]==list(range(1,6))
  for c in g['criteria']:
   require_keys(c,'index score reason evidence')
   assert type(c['score']) is int and 0<=c['score']<=2
   assert isinstance(c['reason'],str) and c['reason'].strip()
   assert isinstance(c['evidence'],str) and (not c['evidence'] or c['evidence'] in r['answer'])
  assert isinstance(g['hardFailureAssessment'],str) and g['hardFailureAssessment'].strip()
  assert isinstance(g['hardFailures'],list)
  assert all(isinstance(v,str) and v.strip() for v in g['hardFailures'])
  points=sum(c['score'] for c in g['criteria'])
  scores[oid]=dict(taskId=g['taskId'],slot=m[oid]['slot'],arm=m[oid]['arm'],criteriaScores=[c['score'] for c in g['criteria']],points=points,maxPoints=10,hardFailure=bool(g['hardFailures']),hardFailureCount=len(g['hardFailures']),responseSha256=m[oid]['responseSha256'])
 assert set(scores)==set(byid)
 rows=[*scores.values()];rows.sort(key=lambda x:x['slot'])
 excluded=hidden['excluded']
 assert sorted([r['slot'] for r in rows]+[r['slot'] for r in excluded])==list(range(1,105))
 assert {(r['taskId'],r['arm']) for r in rows+excluded}=={(f'E01-{i:02}',a) for i in range(1,27) for a in 'ABCD'}
 per={}
 for arm in 'ABCD':
  rs=[r for r in rows if r['arm']==arm];ex=[r for r in excluded if r['arm']==arm]
  per[arm]=dict(valid=len(rs),excludedByStatus=dict(collections.Counter(r['status'] for r in ex)),meanNormalized=avg([Fraction(r['points'],10) for r in rs]),hardFailureResponses=sum(r['hardFailure'] for r in rs),hardFailureFlags=sum(r['hardFailureCount'] for r in rs),criterionMeans=[avg([Fraction(r['criteriaScores'][i],2) for r in rs]) for i in range(5)])
 paired={}
 for a,b in [('B','A'),('C','B'),('D','C'),('D','A')]:
  left={r['taskId']:r for r in rows if r['arm']==a};right={r['taskId']:r for r in rows if r['arm']==b}
  ids=sorted(set(left)&set(right));d=[Fraction(left[i]['points']-right[i]['points'],10) for i in ids]
  paired[a+'-'+b]=dict(matched=len(ids),meanNormalizedDifference=avg(d),wins=sum(x>0 for x in d),ties=sum(x==0 for x in d),losses=sum(x<0 for x in d),hardFailureDifference=sum(int(left[i]['hardFailure'])-int(right[i]['hardFailure']) for i in ids),taskIds=ids)
 out=dict(format='audio-kg-t07-independent-score-summary/1',status='ACTUAL_INDEPENDENT_GRADES_AGGREGATED',packetSha256=expected_packet,gradesSha256=expected_grades,mappingSha256=expected_mapping,rubricSha256=grades['rubricSha256'],actualSummarySha256=hidden['actualSummarySha256'],bundleSha256=hidden['bundleSha256'],totalSlots=104,validGraded=len(rows),excluded=len(excluded),perArm=per,paired=paired,perTask=rows,excludedSlots=excluded,limitations=['Five eligible criteria per task; 0/1/2 each; hard failures separate.','Valid substantively wrong responses are scored, not excluded. No imputation, no automatic claim of improvement.','Randomized opaque response IDs, no explicit arm labels until grade seal; content may reveal arm.','Finite synthetic sample only; no population, real audio, rights or product-quality inference.'])
 with output.open('x') as f:json.dump(out,f,ensure_ascii=False,indent=2);f.write('\n')
 print(json.dumps({k:v for k,v in out.items() if k not in ('perTask','excludedSlots')},ensure_ascii=False))
if __name__=='__main__':
 a=argparse.ArgumentParser()
 for n in ('packet','grades','mapping','output'):a.add_argument('--'+n,type=pathlib.Path,required=True)
 for n in ('packet-sha','grades-sha','mapping-sha'):a.add_argument('--'+n,required=True)
 x=a.parse_args();main(x.packet,x.grades,x.mapping,x.packet_sha,x.grades_sha,x.mapping_sha,x.output)
