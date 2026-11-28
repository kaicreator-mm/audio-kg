"""Actual GitHub merged-review and first-parent delta reconciliation; no external model."""
import hashlib,json,pathlib,subprocess,re,datetime
BASE='7d4068980b750af2beaa97665219e2d950b3cc9e'
TREE='cda3bac9c7b3ee9070dc7cfa610e7ce8f6b58338'
REVIEW={
108:7215509808,109:7217267252,111:7217378675,113:7217725299,114:7219002404,117:7219681423,
118:7220117443,119:7220119503,120:7221233735,121:7221236368,122:7222304298,124:7222306767,
125:7223253213,127:7223255299,128:7223257570,130:7224812495,136:7227050884,138:7229609238,
143:7241128961,144:7241955681,146:7243515414}
def git(*a):return subprocess.check_output(['git',*a],text=True).strip()
def api(p):return json.loads(subprocess.check_output(['gh','api','repos/kaicreator-mm/audio-kg/'+p]))
def paths(a,b):return set(subprocess.check_output(['git','diff','--name-only','-z',a,b]).decode().strip('\0').split('\0'))-set([''])
def blob(commit,p):
 r=subprocess.run(['git','rev-parse',commit+':'+p],stdout=subprocess.PIPE,stderr=subprocess.DEVNULL,text=True)
 return r.stdout.strip() if r.returncode==0 else None
assert git('rev-parse',BASE+'^{tree}')==TREE
first=git('rev-list','--first-parent',BASE,'^48459608548ee13c330641b20cca2d585cc290f3').splitlines()
receipts=[]
for n,cid in REVIEW.items():
 pr=api('pulls/'+str(n));c=api('issues/comments/'+str(cid))
 h=pr['head']['sha'];m=pr['merge_commit_sha'];b=c['body']
 assert pr['merged'] and m in first and h in b and c['issue_url'].endswith('/issues/'+str(n)),(n,'review/merge')
 assert re.search(r'ACCEPT_SCOPED|\bPASS\b',b),(n,'positive review missing')
 parent=git('rev-parse',m+'^1');mergebase=git('merge-base',parent,h)
 reviewed=paths(mergebase,h);actual=paths(parent,m)
 # For concurrent disjoint integration, exact PR contribution, not full tree identity.
 assert reviewed==actual,(n,'scope mismatch',sorted(reviewed-actual),sorted(actual-reviewed))
 mismatch=[p for p in actual if blob(h,p)!=blob(m,p)]
 assert not mismatch,(n,'changed reviewed bytes',mismatch)
 if n==111:
  assert actual=={'knowledge/K07/README.md'} and '"decision": "skipped"' in b and '"status": "NOT_RUN"' in b,(n,'doc-only scope')
 else:
  assert 'reviewer' in b.lower() or 'INDEPENDENT_NON_WRITER' in b or 'independent' in b.lower(),n
 receipts.append(dict(pr=n,reviewComment=cid,reviewCommentUrl=c['html_url'],reviewBodySha256=hashlib.sha256(b.encode()).hexdigest(),reviewedHead=h,reviewedTree=git('rev-parse',h+'^{tree}'),merge=m,mergeTree=git('rev-parse',m+'^{tree}'),mergeParent=parent,deltaBase=mergebase,exactReviewedDelta=True,treeEqual=git('rev-parse',h+'^{tree}')==git('rev-parse',m+'^{tree}'),changedPaths=sorted(actual),reviewType='DOCUMENTATION_ONLY_SKIP' if n==111 else 'INDEPENDENT_SCOPED_REVIEW',reviewText=b))
 print(n,'delta',len(actual),'treeEqual',receipts[-1]['treeEqual'],flush=True)
# All code/data changes since first G07 foundation must be covered by an actual reviewed contribution.
bymerge={x['merge']:x for x in receipts}
uncovered=[]
for m in first:
 changed=paths(git('rev-parse',m+'^1'),m)
 active=[p for p in changed if p.startswith(('knowledge/','queries/','cases/','sources/','tests/knowledge/','tools/','ontology/'))]
 if active and m not in bymerge:uncovered.append(dict(commit=m,paths=active))
assert not uncovered,uncovered
# Reconcile every current owning module path with last integrated contribution.
latest={}
for m in reversed(first):
 if m in bymerge:
  for p in bymerge[m]['changedPaths']:latest[p]=(m,bymerge[m]['pr'])
for p,(m,n) in latest.items():
 assert blob(BASE,p)==blob(m,p),(p,n,'unreviewed subsequent change')
doc=dict(status='BUILDER_EXACT_DELTA_READBACK_NOT_FINAL_REVIEW',base=BASE,tree=TREE,checkedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),reviewedMerges=receipts,uncoveredActivePaths=uncovered,currentReviewedPaths=len(latest),fullTreeMatches=sum(x['treeEqual'] for x in receipts),concurrentDeltaMatches=sum(not x['treeEqual'] for x in receipts))
pathlib.Path('docs/validation/integration/review-chain-readback.json').write_text(json.dumps(doc,ensure_ascii=False,indent=2)+'\n')
print('exact reviewed deltas',len(receipts),'full tree',doc['fullTreeMatches'],'disjoint concurrent',doc['concurrentDeltaMatches'],'latest paths',len(latest))
