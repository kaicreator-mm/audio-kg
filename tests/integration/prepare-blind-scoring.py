"""Create a private randomized blind grading packet, without displaying any model or task text."""
import argparse,hashlib,json,pathlib,secrets,random,os
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_bytes())
def write(p,x):
 b=(json.dumps(x,ensure_ascii=False,indent=2)+'\n').encode()
 with p.open('xb') as f:f.write(b)
 os.chmod(p,0o400)
 return sha(b)
def main(r,output):
 assert os.geteuid()==0
 assert not output.exists()
 os.umask(0o077)
 approved=r/'approved';run=r/'work/actual-run'
 bundle=read(approved/'bundle.json');summary=read(run/'summary.json')
 assert sha((approved/'bundle.json').read_bytes())=='f96ea4b17433c9e89415628ea0454b95ff4d1493a93225b72747987033eda54a'
 assert sha((r/'stage/inputs.json').read_bytes())=='b68cc7d7a63ddb156a7d55934ea912bc93e57d401adacb80e5c8f4aa2b70903f'
 inp=read(r/'stage/inputs.json')
 tasks={t['id']:t['task'] for t in inp['tasks']};assert len(tasks)==26
 assert len(summary['results'])==104
 records=[];mapping=[];excluded=[]
 for row in summary['results']:
  n=row['slot'];slot=bundle['slots'][n-1]
  assert (row['id'],row['arm'],n)==(slot['id'],slot['arm'],slot['slot'])
  if row['status']!='VALID_RESPONSE':
   excluded.append(dict(slot=n,taskId=row['id'],arm=row['arm'],status=row['status']))
   continue
  p=run/f'{n:03}-response.bin';raw=p.read_bytes()
  assert sha(raw)==row['responseSha256']
  body=json.loads(raw);answer=body['choices'][0]['message']['content']
  assert isinstance(answer,str) and answer.strip()
  opaque=secrets.token_hex(16)
  records.append(dict(responseId=opaque,taskId=row['id'],task=tasks[row['id']],answer=answer))
  mapping.append(dict(responseId=opaque,slot=n,taskId=row['id'],arm=row['arm'],responseSha256=sha(raw)))
 assert len(records)==summary['valid']
 assert len({x['responseId'] for x in records})==len(records)
 random.SystemRandom().shuffle(records)
 # Scoring order and response IDs deliberately conceal arm and slot; model text may reveal hints.
 output.mkdir(mode=0o700)
 (output/'grade').mkdir(mode=0o700);(output/'unblind-after-seal').mkdir(mode=0o700)
 packet=dict(format='audio-kg-t07-blind-grade/1',status='UNSCORED',records=records)
 hidden=dict(format='audio-kg-t07-blind-mapping/1',bundleSha256=sha((approved/'bundle.json').read_bytes()),actualSummarySha256=sha((run/'summary.json').read_bytes()),mapping=mapping,excluded=excluded)
 p=write(output/'grade/packet.json',packet)
 m=write(output/'unblind-after-seal/mapping.json',hidden)
 print(json.dumps(dict(status='BLIND_PACKET_PREPARED_NOT_SCORED',valid=len(records),excluded=len(excluded),packetSha256=p,mappingSha256=m,actualSummarySha256=hidden['actualSummarySha256'])))
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('runner',type=pathlib.Path);a.add_argument('output',type=pathlib.Path);x=a.parse_args();main(x.runner,x.output)
