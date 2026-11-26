# K09 R2 专项来源资格
2026-11-26。原S487–496资格及S095失败保留；S495为原公开摘要记录，S497是同一规范正文补证，不算独立研究。仅专业知识条件和原创合成见证。
| ID | 来源及实际定位 | 资格和限定 |
|---|---|---|
| S497 | [EBU R128 v5 2023](https://tech.ebu.ch/docs/r/r128.pdf) 实际PDF截图零基2/3（印刷3/4），h–m、n–v及脚注2 | READ_LOCATOR；节目目标−23.0 LUFS，实际不可达场景容差±1 LU，QC测量误差容差±0.2 LU，有意较低目标须标记；线性制作最大真峰−1dBTP，测量容差和分发限制是不同条件；LRA辅助，短节目不足一分钟不推荐。未完成BS.1770/3341仪表合规或测试。 |
| S498 | [EBU Tech3342 2023](https://tech.ebu.ch/docs/tech/tech3342.pdf) 实际PDF截图零基3/4（印刷4/5），§2/3/3.1 | READ_LOCATOR；3秒滑窗、至少2.9秒重叠，绝对−70 LUFS和相对−20 LU门控，门控后P95−P10，单位LU。不是峰均比或综合响度，短节目不稳健；有限已测量级输入算例不等实现仪表。 |
| S499 | [Ardour Backup and Sharing of Sessions](https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/) external media/archive/options | READ_LOCATOR；外部引用、活动快照、未用素材、浮点转整数FLAC可能损失及归档选项；不保证插件二进制或许可齐全。 |
| S500 | [Ardour Aux Sends](https://manual.ardour.org/signal-routing/aux-sends/) tapping point/pre/post fader | READ_LOCATOR；发送复制位置和独立/跟随声像、返回主混音条件；宿主具体能力未执行。 |
| S501 | [Ardour Other Toolbar Items](https://manual.ardour.org/ardours-interface/status-indicators/) PDC and latency | READ_LOCATOR；插件链报告延迟与I/O延迟分开、关闭PDC影响对齐；不保证任意路径自动补偿或真实时间精度。 |
| S502 | [Melodyne5 Assistant note assignment](https://helpcenter.celemony.com/M5/doc/melodyneAssistant5/en/M5tour_NA_Mode_Tools?env=live) Note Assignment/starting point/separation/sibilant range | READ_LOCATOR；检测标注与声音编辑分开，音乐起点不等切片左边，工具内部sibilant广义定义非语言学通用，算法/版本限定。 |
| S503 | [Melodyne5 Studio note separation](https://helpcenter.celemony.com/M5/doc/melodyneStudio5/en/M5tour_ToolSeparations_2?env=live) hard/soft transition | READ_LOCATOR；连接音的音高/共振峰/幅度转移、时长和切分依赖，Studio特定；不保证小版本具备。 |
| S504 | [Melodyne5 Assistant Quick Start](https://helpcenter.celemony.com/M5/doc/melodyneAssistant5/en/M5tour_QuickStart_assistant?env=live) Editing | READ_LOCATOR；音高、位置、时长、调制、共振峰等独立可编辑对象，非真实运行或音质验证。 |
| S505 | [Ardour Panning](https://manual.ardour.org/mixing/panning/) 与 [Mono Panner](https://manual.ardour.org/mixing/panning/mono_panner/) | READ_LOCATOR；单输入双输出和多声道分配、位置与宽度区分；自建等功率算例不宣称Ardour曲线。 |
| S506 | [Ardour Balance Control](https://manual.ardour.org/mixing/panning/balance_control/) centered/linear attenuation | READ_LOCATOR；双通道平衡与单输入声像不同，具体宿主文档；不推听感。 |
S483既有BS.1770-5 Annex2真峰正文资格继承；S098仍LANDING_ONLY，完整听评协议K10。没有下载测试音频、运行DAW/插件、测量仪表或核许可。