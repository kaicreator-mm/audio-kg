# K07 模块验证入口
- 范围：G07 K07, issue #88，51/51 当前发现入口、56/56 能力格、48 历史入口与 7 条开放拆分路由。
- 从仓库根运行 `node tests/knowledge/K07/k07.test.mjs`，使用精确冻结锚点、候选资格、所有发现和角色见证。模块局部流程测试枚举有限守卫、验证精确关系与输入记录，检验数学计算及专业边界；拒绝伪造授权、证据覆盖、缺少条件、虚假来源和错误闭包。
- `python3 tests/knowledge/K07/build-candidate.py` 与 `python3 tests/knowledge/K07/build-domain-workflows.py` 仅用于离线作者表重现，禁止消费端用于自封印。重现后应无 Git 差异。
- 回归：`node docs/research/l2-pilot/validate.mjs`、`node tests/knowledge/f00.test.mjs`；不得把测试通过当独立专业验收。
- 具体 clean-tree receipt 与审核契约由测试提交产生后记录；审核保持全模块，一次必要门控，而非反复细节审核。
