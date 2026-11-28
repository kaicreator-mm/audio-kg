"""Fixed two-message, no-tools DeepSeek V4 template projection; offline only."""
import hashlib,json,pathlib,sys
TOKENIZER_SHA='89085f12ef79460ac5f66d1119325ddfc694b4ab209d80bbd81d35f081dc9614'
CONFIG_SHA='841f8cf146e3f0ad1082594a31f68ecf7608c20467ef355081333d85bbaeb1cb'
IDENTITY={'model':'DeepSeek-V4.1-Flash-1017','tokenizerSha256':TOKENIZER_SHA,'configSha256':CONFIG_SHA,'library':'tokenizers==0.22.2','framingReserve':512,'method':'PINNED_OFFICIAL_V4_TWO_MESSAGE_TEMPLATE_PLUS_RESERVE'}
def load_counter(directory):
 from tokenizers import Tokenizer
 import tokenizers
 assert tokenizers.__version__=='0.22.2'
 directory=pathlib.Path(directory)
 files=[directory/'tokenizer.json',directory/'tokenizer_config.json']
 for p,h in zip(files,[TOKENIZER_SHA,CONFIG_SHA]):
  assert not p.is_symlink() and hashlib.sha256(p.read_bytes()).hexdigest()==h
 cfg=json.loads(files[1].read_bytes());bos=cfg['bos_token']['content']
 assert bos=='<｜begin▁of▁sentence｜>' and cfg['add_bos_token'] is False
 tok=Tokenizer.from_file(str(files[0]))
 def count(body):
  m=body['messages']
  assert len(m)==2 and [x['role'] for x in m]==['system','user']
  assert all(isinstance(x['content'],str) for x in m)
  # Exact branch of the pinned vendor chat_template for system, user, generation prompt;
  # no tools, no metadata markers, non-thinking. Reserve additional server framing.
  rendered=bos+m[0]['content']+'<｜User｜>'+m[1]['content']+'<｜Assistant｜>'
  return len(tok.encode(rendered,add_special_tokens=False).ids)
 return count
if __name__=='__main__':
 if not __debug__:raise RuntimeError('optimized execution forbidden')
 count=load_counter(sys.argv[1]);bodies=json.load(sys.stdin)
 assert isinstance(bodies,list) and 1<=len(bodies)<=104
 print(json.dumps([count(b) for b in bodies]))
