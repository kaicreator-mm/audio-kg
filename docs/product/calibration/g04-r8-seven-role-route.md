# G04 R8b-1 — XC01七能力实际矩阵、原子、案例与来源路由

基准 06b092a96a3a83c4cc19eee68888d1bfb862bf53。逐个读取当前局部矩阵及发现表，核P角色、专业责任、原子、案例ID及S号定位，不把P当权限。本轮选择一条有限七能力链，各阶段有本题输入/产物；K15许可、K04事件、K10评价与K11模型为附加前置/条件支持，非无条件主责。随后R8b-2核实际主案例及原来源行、构造正逆追踪。

| 能力 | 主责D2 | 角色与实际矩阵 | D4及发现 | 原案例 | 来源记录 | 输入 | 输出 |
|---|---|---|---|---|---|---|---|
| A01 | K13.06 | [P 理解翻译、可唱改编、重新创作与硬保留](localization-r3-capability-calibration.md#L40) | [K13.06.02.03](localization-r3-discovery-cq.md#L9) | [LA05](localization-r1-knowledge-cases.md#L9) | [S555](../../research/source-qualification-localization-r1-r2.md#L7)；[S556](../../research/source-qualification-localization-r1-r2.md#L8) | original words+score, 120 quarter BPM | three syllables/four notes, 2s; explicit lyric-note bindings |
| A02 | K06.03 | [P 目标和参考核对→反馈→无辅助复测](vocal-training-r3-capability-calibration.md#L20) | [K06.03.03.04](vocal-training-r3-discovery-cq.md#L43) | [VT39](vocal-training-r2-knowledge-cases.md#L13) | [S409](../../research/source-qualification-vocal-science-r1.md#L17)；[S051](../../research/source-qualification-vocal-training-r1.md#L5) | bound events, permission, plan | B/P for rehearsal only; O1 B-only alternative; trusted time join |
| A03 | K12.01 | [P REAPER/Ardour接口证据、实际版本未知](tools-orchestration-r3-capability-calibration.md#L7) | [K12.01.01.03](tools-orchestration-r3-discovery-cq.md#L5) | [TO01](tools-orchestration-r1-knowledge-cases.md#L5) | [S538](../../research/source-qualification-tools-orchestration-r1.md#L5)；[S126](../../research/source-qualification-ai-orchestration.md#L25) | host H1, operation, grant | stipulated host qualification; no actual host/API action |
| A04 | K09.02 | [P 原件、源/工程区间、tempo、曲线模式及渲染版本](production-r3-capability-calibration.md#L15) | [K09.02.03.04](production-r3-discovery-cq.md#L34) | [MP30](production-r2-knowledge-cases.md#L10) | [S490](../../research/source-qualification-production-r1.md#L8)；[S089](../../research/source-qualification-production-evaluation.md#L10) | source S1, c2, permitted span | retain outside piecewise-linear envelope, notes, lyrics, cue; immutable c3 revision |
| A05 | K05.07 | [P 主责测量定义、量纲、限制，不作质量/健康唯一判据](vocal-science-r4-capability-calibration.md#L51) | [K05.07.01.05](vocal-science-r4-discovery-cq.md#L68) | [VS64](vocal-science-r3-knowledge-cases.md#L8) | [S409](../../research/source-qualification-vocal-science-r1.md#L17)；[S413](../../research/source-qualification-vocal-science-r2.md#L6) | OBS-A-01, EST-2/3/4, target 200 | estimation and actual goal error separately; unknown reference refuses |
| A06 | K13.06 | [P 保留不同词曲候选及可编辑对齐、原稿](localization-r3-capability-calibration.md#L45) | [K13.06.02.03](localization-r3-discovery-cq.md#L9) | [LA05](localization-r1-knowledge-cases.md#L9) | [S555](../../research/source-qualification-localization-r1-r2.md#L7)；[S556](../../research/source-qualification-localization-r1-r2.md#L8) | protected score/words and approved edit | editable symbolic bindings, curve; not WAV-to-score reconstruction |
| A07 | K09.01 | [P 最小变更、依赖闭包复核、旧报告失效和回滚](production-r3-capability-calibration.md#L11) | [K09.01.01.04](production-r3-discovery-cq.md#L29) | [MP25](production-r2-knowledge-cases.md#L5) | [S086](../../research/source-qualification-production-evaluation.md#L7)；[S487](../../research/source-qualification-production-r1.md#L5)；[S499](../../research/source-qualification-production-r2.md#L7) | immutable c2/R2 and c3/R3 | invalidate old dependent report; new stipulated evidence; rollback/STOP, not release |

可机器回读记录（仅有限知识见证，非L2 schema）：

```json
[
  {
    "ability": "A01",
    "owner": "K13.06",
    "role": "P",
    "matrix": "localization-r3-capability-calibration.md#L40",
    "matrixBlob": "86292af43298f731ff72fe75a369c0bd546cef46",
    "d4": "K13.06.02.03",
    "discovery": "localization-r3-discovery-cq.md#L9",
    "discoveryBlob": "4d40c58d20bf31a17dedbdf531f05daa5c850b99",
    "caseId": "LA05",
    "caseFile": "localization-r1-knowledge-cases.md",
    "caseLine": 9,
    "sources": [
      {
        "id": "S555",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 7
      },
      {
        "id": "S556",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 8
      }
    ],
    "input": "original words+score, 120 quarter BPM",
    "output": "three syllables/four notes, 2s; explicit lyric-note bindings",
    "roleMeaning": "理解翻译、可唱改编、重新创作与硬保留"
  },
  {
    "ability": "A02",
    "owner": "K06.03",
    "role": "P",
    "matrix": "vocal-training-r3-capability-calibration.md#L20",
    "matrixBlob": "e005b583f20b5e4f97fab6d20bf9da6a65203bb2",
    "d4": "K06.03.03.04",
    "discovery": "vocal-training-r3-discovery-cq.md#L43",
    "discoveryBlob": "66873fadf5dbf8dad8c76e424f36d8115f460935",
    "caseId": "VT39",
    "caseFile": "vocal-training-r2-knowledge-cases.md",
    "caseLine": 13,
    "sources": [
      {
        "id": "S409",
        "file": "source-qualification-vocal-science-r1.md",
        "line": 17
      },
      {
        "id": "S051",
        "file": "source-qualification-vocal-training-r1.md",
        "line": 5
      }
    ],
    "input": "bound events, permission, plan",
    "output": "B/P for rehearsal only; O1 B-only alternative; trusted time join",
    "roleMeaning": "目标和参考核对→反馈→无辅助复测"
  },
  {
    "ability": "A03",
    "owner": "K12.01",
    "role": "P",
    "matrix": "tools-orchestration-r3-capability-calibration.md#L7",
    "matrixBlob": "e9a363e09f924b6f8101966f2fe4fa46ce3f354a",
    "d4": "K12.01.01.03",
    "discovery": "tools-orchestration-r3-discovery-cq.md#L5",
    "discoveryBlob": "54d6ee065eff7e2fcb4c6ec205e084f11dd5c24c",
    "caseId": "TO01",
    "caseFile": "tools-orchestration-r1-knowledge-cases.md",
    "caseLine": 5,
    "sources": [
      {
        "id": "S538",
        "file": "source-qualification-tools-orchestration-r1.md",
        "line": 5
      },
      {
        "id": "S126",
        "file": "source-qualification-ai-orchestration.md",
        "line": 25
      }
    ],
    "input": "host H1, operation, grant",
    "output": "stipulated host qualification; no actual host/API action",
    "roleMeaning": "REAPER/Ardour接口证据、实际版本未知"
  },
  {
    "ability": "A04",
    "owner": "K09.02",
    "role": "P",
    "matrix": "production-r3-capability-calibration.md#L15",
    "matrixBlob": "4a98b224eda2e62da3052be7df5cd465d1a6b122",
    "d4": "K09.02.03.04",
    "discovery": "production-r3-discovery-cq.md#L34",
    "discoveryBlob": "b160e921f945087bb78085882f79e72d66d44fae",
    "caseId": "MP30",
    "caseFile": "production-r2-knowledge-cases.md",
    "caseLine": 10,
    "sources": [
      {
        "id": "S490",
        "file": "source-qualification-production-r1.md",
        "line": 8
      },
      {
        "id": "S089",
        "file": "source-qualification-production-evaluation.md",
        "line": 10
      }
    ],
    "input": "source S1, c2, permitted span",
    "output": "retain outside piecewise-linear envelope, notes, lyrics, cue; immutable c3 revision",
    "roleMeaning": "原件、源/工程区间、tempo、曲线模式及渲染版本"
  },
  {
    "ability": "A05",
    "owner": "K05.07",
    "role": "P",
    "matrix": "vocal-science-r4-capability-calibration.md#L51",
    "matrixBlob": "0b71c3683a087ece794595fc0b60c965853f9eda",
    "d4": "K05.07.01.05",
    "discovery": "vocal-science-r4-discovery-cq.md#L68",
    "discoveryBlob": "648b95fd2ebdda6ea72529e67968407877e0e2f4",
    "caseId": "VS64",
    "caseFile": "vocal-science-r3-knowledge-cases.md",
    "caseLine": 8,
    "sources": [
      {
        "id": "S409",
        "file": "source-qualification-vocal-science-r1.md",
        "line": 17
      },
      {
        "id": "S413",
        "file": "source-qualification-vocal-science-r2.md",
        "line": 6
      }
    ],
    "input": "OBS-A-01, EST-2/3/4, target 200",
    "output": "estimation and actual goal error separately; unknown reference refuses",
    "roleMeaning": "主责测量定义、量纲、限制，不作质量/健康唯一判据"
  },
  {
    "ability": "A06",
    "owner": "K13.06",
    "role": "P",
    "matrix": "localization-r3-capability-calibration.md#L45",
    "matrixBlob": "86292af43298f731ff72fe75a369c0bd546cef46",
    "d4": "K13.06.02.03",
    "discovery": "localization-r3-discovery-cq.md#L9",
    "discoveryBlob": "4d40c58d20bf31a17dedbdf531f05daa5c850b99",
    "caseId": "LA05",
    "caseFile": "localization-r1-knowledge-cases.md",
    "caseLine": 9,
    "sources": [
      {
        "id": "S555",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 7
      },
      {
        "id": "S556",
        "file": "source-qualification-localization-r1-r2.md",
        "line": 8
      }
    ],
    "input": "protected score/words and approved edit",
    "output": "editable symbolic bindings, curve; not WAV-to-score reconstruction",
    "roleMeaning": "保留不同词曲候选及可编辑对齐、原稿"
  },
  {
    "ability": "A07",
    "owner": "K09.01",
    "role": "P",
    "matrix": "production-r3-capability-calibration.md#L11",
    "matrixBlob": "4a98b224eda2e62da3052be7df5cd465d1a6b122",
    "d4": "K09.01.01.04",
    "discovery": "production-r3-discovery-cq.md#L29",
    "discoveryBlob": "b160e921f945087bb78085882f79e72d66d44fae",
    "caseId": "MP25",
    "caseFile": "production-r2-knowledge-cases.md",
    "caseLine": 5,
    "sources": [
      {
        "id": "S086",
        "file": "source-qualification-production-evaluation.md",
        "line": 7
      },
      {
        "id": "S487",
        "file": "source-qualification-production-r1.md",
        "line": 5
      },
      {
        "id": "S499",
        "file": "source-qualification-production-r2.md",
        "line": 7
      }
    ],
    "input": "immutable c2/R2 and c3/R3",
    "output": "invalidate old dependent report; new stipulated evidence; rollback/STOP, not release",
    "roleMeaning": "最小变更、依赖闭包复核、旧报告失效和回滚"
  }
]
```
