# G07 K01 模块验证入口

- 冻结输入、D/S 角色、原主案例、资格及残余边界均保留精确锚点；命题文本由独立作者表构建，不以标题替代内容。
- `python3 tests/knowledge/K01/build-input-ledger.py`、`python3 tests/knowledge/K01/build-candidate.py`、`python3 tests/knowledge/K01/build-domain-workflows.py` 是离线作者重现步骤，不是消费端授权接口。重现后须无 Git 差异。
- `node tests/knowledge/K01/k01.test.mjs` 验证模块结构、精确根与闭包、角色、来源、历史、视图、九个有限工作流及数学/符号反例。TH-A01 为局部保护及失效的有限见证，不是实际宿主实现。
- 回归：`node docs/research/l2-pilot/validate.mjs`、`node tests/knowledge/f00.test.mjs`、`node tests/knowledge/K07/k07.test.mjs`、`node tests/knowledge/f00-cq-role.test.mjs`。
- #28 RV05/RV06 使用原更正证据并保留门控；不由作者关闭。补充来源未形成同目标可核验来源锚点的保持未绑定。两条项目契约通过有类型的侧车而非专业 Claim 承载。
- 测试通过仅为作者验证，专业命题、来源适用性、深度及范围需完整独立审核。
