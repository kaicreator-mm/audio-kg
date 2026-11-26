# K12 R1 来源资格（S538–544）
DRAFT #56；记录具体阅读范围，文档支持不等实际工具安装或运行。未固定版本不冒充确切工具版本。保留原S123–132及早期来源资格。
| ID | 来源及实际定位 | 资格和边界 |
|---|---|---|
| S538 | [REAPER ReaScript API](https://www.reaper.fm/sdk/reascript/reascripthelp.html) 实际HTML GetTrackGUID、GetSetMediaItemInfo_String、GetSetMediaTrackInfo_String、GetTrackStateChunk/SetTrackStateChunk | READ_LOCATOR；动态文档未固定版本，存在对象和读写接口不证明本机版本、原子事务、授权或持久化。 |
| S539 | [CLAP thread-check](https://github.com/free-audio/clap/blob/main/include/clap/ext/thread-check.h)、[params](https://github.com/free-audio/clap/blob/main/include/clap/ext/params.h)、[state](https://github.com/free-audio/clap/blob/main/include/clap/ext/state.h)、[plugin](https://github.com/free-audio/clap/blob/main/include/clap/plugin.h) 搜索结果片段 | SEARCH_LEAD；固定1.2.6 raw地址实际访问失败，未读固定tag正文；插件线程、生命周期/状态具体断言暂不升级，R2补源。 |
| S540 | [FFmpeg CLI docs](https://ffmpeg.org/ffmpeg.html#Stream-selection) 实际HTML §4.1.1–4.1.4/4.2 | READ_LOCATOR；默认选流和显式映射、复杂滤镜例外、选流与编码处理分别确认；动态文档未固定二进制。 |
| S541 | [ffprobe docs](https://ffmpeg.org/ffprobe.html) 实际HTML §2 | READ_LOCATOR；流与容器信息、输出格式、打不开或无法识别时正退出码；不证明完整解码/内容质量。动态文档非固定二进制。 |
| S542 | MusicXML4.0 [divisions](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/divisions/) / [backup](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/backup/) 元素定义 | READ_LOCATOR；四分音符单位、多声部时钟及backup边界；不等SMF/MEI具体语义或宿主实现。 |
| S543 | [Bitwig DAWproject FAQ](https://www.bitwig.com/support/technical_support/dawproject-file-format-faqs-62/) 实际HTML How can I use / Specifics to Bitwig Studio 5.0.9 and Studio One 6.5 | READ_LOCATOR；2024-11-06明确版本和方向性限制；不证明当前版本或实际往返。继承S130，定向重读。 |
| S544 | [MCP 2025-06-18 Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) 实际HTML Error Handling / Security Considerations / output schema；S131此前Listing/Calling资格继承 | READ_LOCATOR；协议错误/工具执行错误、输入/输出验证、访问控制；不是实际工具权限、工作流、幂等或最新协议断言。 |
S539仅线索，不作为有效CLAP具体API证据。R2待固定源码、VST/AU/SMF/MEI和更多实际版本原文、来源许可与资格边界补足；未下载/安装/调用任何软件、插件、模型或音频。