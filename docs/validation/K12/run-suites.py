from pathlib import Path
import json,subprocess,hashlib,concurrent.futures,sys,os
root=Path.cwd();out=root/'.agent/execution/G07-W7-K12/results';out.mkdir(parents=True,exist_ok=True)
suites={'pilot':'docs/research/l2-pilot/validate.mjs'}
for p in sorted(Path('tests/knowledge').rglob('*.test.mjs')): suites[p.stem.removesuffix('.test')]=str(p)
assert len(suites)==24,(len(suites),suites)
# Syntax validation before suite execution.
paths=[Path('tools/validate-knowledge.mjs'),*Path('tests/knowledge').rglob('*.mjs'),*Path('docs/research/l2-pilot').glob('*.mjs')]
for p in paths:subprocess.run(['node','--check',str(p)],check=True,stdout=subprocess.DEVNULL)
print('syntax PASS',len(paths),flush=True)
def run(item):
 name,path=item
 p=subprocess.run(['node',path],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
 (out/(name+'.json')).write_bytes(p.stdout);(out/(name+'.err')).write_bytes(p.stderr)
 try:
  j=json.loads(p.stdout);checks=j.get('checks',len(j.get('results',[])));passed=j.get('passed');assert isinstance(checks,int) and checks>0 and checks==passed
  ok=p.returncode==0
 except Exception:checks=passed=0;ok=False
 r=dict(suite=name,command=['node',path],exitCode=p.returncode,checks=checks,passed=passed,sha256=hashlib.sha256(p.stdout).hexdigest(),status='PASS' if ok else 'FAIL')
 print(json.dumps(r),flush=True)
 if not ok:print(p.stderr.decode(errors='replace')[:900],flush=True)
 return r
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as e:results=list(e.map(run,suites.items()))
summary=dict(status='BUILDER_PASS_ONLY' if all(x['status']=='PASS' for x in results) else 'FAIL',node=subprocess.check_output(['node','--version'],text=True).strip(),suiteCount=len(results),passedSuites=sum(x['status']=='PASS' for x in results),checks=sum(x['checks'] for x in results),passed=sum(x['passed'] for x in results),results=results)
(out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps({k:v for k,v in summary.items() if k!='results'}),flush=True);sys.exit(summary['status']=='FAIL')
