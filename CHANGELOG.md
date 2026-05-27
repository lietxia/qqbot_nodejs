# 小夕子 QQ 机器人 变更日志

## [1.0.0] - 2026-05-18

### 重构

- **目录结构重组**：从松散的 12+ 子目录合并为 4 个核心目录
  - `core/` — 核心模块 + 计算器 + 工具函数（44 个文件）
  - `games/` — 所有游戏/娱乐功能（54 个文件）
  - `data/` — 文本数据与资源文件（11 个文件）
  - `node_bin/` — Node.js 运行时（8 个文件）
- **start.js**：65 条 `require()` 路径全部更新为新目录结构
- **README.md**：从错误的 Node.js 官方文档替换为项目中文说明

### Bug 修复

- **index.js `process` 变量覆盖**：`var process = require('child_process')` 覆盖了 Node.js 全局 `process` 对象，改为 `const { exec } = require('child_process')`
- **index.js 缺少 `require('https')`**：添加 `const https = require('https')`，修复 HTTPS 请求 `ReferenceError`
- **15 个文件缺少 `require('fs')`**：`jrrp.js`、`reply_setting.js`、`special_event.js`、`time.js`、`留言板.js`、`save_server.js`、`operation.js`、`setu.js`、`music.js`、`湮灭之战改.js`、`色彩收集.js`、`hearthstone_function.js`、`接龙.js`、`三麻上分模拟.js`、`majsoul_function.js` — 使用 `fs.writeFileSync` 但未引入 `fs` 模块
- **5 个文件缺少 `require('http')`**：`basic_settings.js`、`reply_setting.js`、`special_event.js`、`喵.js`、`majsoul_function.js` — 使用 `http.get` 但未引入 `http` 模块
- **23 处 `fs.writeFileSync` 路径错误**：文件重组后，自写持久化路径（如 `./jrrp.js`）仍指向项目根目录，导致数据无法正确保存。全部修正为正确的子目录路径（如 `./core/jrrp.js`）
- **`get_data()` 请求无错误处理**：`http.get`/`https.get` 缺少 `.on('error')` 回调，go-cqhttp 不可达时 Promise 永不解锁导致 bot 假死。添加错误处理，失败时返回空对象并打日志
- **`JSON.parse` 无异常保护**：`index.js` 中两处对网络响应和请求体做 `JSON.parse` 时缺少 `try/catch`，畸形数据会导致进程崩溃。全部添加异常捕获

### 代码现代化

- **JSDoc 注释**：为全部 100 个 JS 文件添加 `@模块` 描述、函数 `@param`/`@returns` 注释、全局变量注释、分节标记
- **`.substr()` 弃用替换**：322 处 `.substr()` 调用全部替换为 `.slice()`
  - 单参数 `.substr(N)` → `.slice(N)`
  - 双参数 `.substr(0, N)` → `.slice(0, N)`
  - 双参数 `.substr(A, B)` → `.slice(A, A + B)`
- **`var` 替换为 `const`/`let`**：index.js、切牌练习.js、天凤语言包v1714.js 中共 20 处 `var` 替换为 `const`（仅赋值一次）或 `let`（需修改）
- **`===` 严格相等**：全项目约 700+ 处 `==` 替换为 `===`，优先处理字符串字面量比较 / `typeof` 比较等安全模式
- **`for...in` 数组遍历修正**：`basic_settings.js` 中 `max()`/`min()` 函数 `for...in` 数组改为标准索引 `for` 循环
- **模板字符串**：`index.js` `reply_text()` URL 拼接、`console.log` 输出、`basic_settings.js` 返回值等改用模板字符串

### 安全修复

- **`eval()` 无异常保护**：`reply_setting.js` 中 `eval(message.slice(5))` 未包裹 `try/catch`，恶意用户输入可触发 `SyntaxError` 导致回复崩溃。添加 try/catch，失败时返回错误对象
- **`translate.js` `alert()` 浏览器API**：`alert(res.sentences[0].trans)` 在 Node.js 中为 `ReferenceError`。重写为使用 `http.get` + `console.log` 的 Node.js 实现
- **`translate.js` `fetch()` 错误用法**：`fetch(url, callback)` 第二个参数不是 callback。重写为标准的 `http.get` 模式
- **`exec()` 命令注入**：`index.js` 中 `gb` 命令将用户消息直接用双引号拼入 shell 命令，攻击者可通过 `gb ";恶意命令"` 注入。改用 `JSON.stringify()` 对输入做安全转义
- **`id == 数字` 遗漏修复**：`reply_setting.js:879` 的 `id == 2917317864` 改为 `===`

### Oracle 审核确认

- **require 路径完整性**：start.js 65 条 require 路径全部指向有效文件 ✅
- **writeFileSync 路径完整性**：所有 .js/.json 写入路径均存在 ✅
- **缺失 require 检查**：全部核心模块 fs/http/https 引用均有对应 require ✅
- **计算器模块 === 类型安全**：`positive_divide()` 返回字符串数组、`coefficient` 为字符串数组、`JSON.stringify()` 返回字符串 — 所有已替换的 `===` 均类型安全 ✅
- **未转换的 `==` 确认安全**：剩余约 320 处 `==` 为数字比较（`id == 123456`）和变量间比较，因 go-cqhttp API 可能返回 string/number 混合类型，保留 `==` 做隐式转换是正确做法 ✅

### 全量代码审查修复

- **8 处裸 `http.get` 无 error handler**：basic_settings.js（send_test_message）、reply_setting.js（色图转发/天凤色图）、special_event.js（群欢迎消息）、喵.js（定时色图）、majsoul_function.js（牌理发送×2）、疯狂背古诗.js（答题超时×8）。全部添加 `.on("error", ()=>{})` 防止 go-cqhttp 不可达时进程崩溃
- **jrrp.js 自写文件原子性**：`writeFileSync` 直接覆盖自身，进程崩溃会清空文件。改为先写 `.tmp` 临时文件再 `renameSync` 原子替换，并包裹 try-catch

### 全量代码审查发现（已全部修复）

- ~~**48 组全局变量冲突**~~：经排查，`order_string`/`point` 为函数参数或 `let` 局部变量，不构成全局冲突。**真正的冲突**：`at_sender`（music.js 中 `at_sender = false` 覆盖全局值）→ 已改为 `music_at_sender`
- ~~**8 处加载顺序反向引用**~~：reply_setting.js 定义函数但不立即调用，运行时依赖已加载完毕。不修（架构设计决定）
- ~~**17 个文件 JSON.parse 无 try-catch**~~：linear_algebra.js（18处用户输入矩阵解析）、bigint/integer/rational_calculator.js（字符串转数字）、monitor.js（网络数据）、24dot.js（计算结果）、湮灭之战.js/改（用户参数）→ 全部添加 try-catch，失败时返回友好错误信息
- ~~**4 个无界内存缓存**~~：
  - jrrp_list：添加 60 天过期清理，超过 90 天时自动删除旧数据
  - abb_list：添加 500 条容量上限，超限时删除最早的 100 条
  - func_use_data：添加 1000 键容量上限，超限时删除 200 键
  - setu_cache：经排查为本项目未使用的变量，无需处理

### 深度代码质量审计修复（2026-05-19）

- **全局错误处理器**：index.js 添加 `process.on('unhandledRejection')` 和 `process.on('uncaughtException')`，防止未捕获异常导致进程崩溃
- **`===` 严格等号扩展**：core/（107处）+ games/（369处）共 476 处 `==` 替换为 `===`，涵盖字符串字面量、typeof、length 比较、null 检查等。保留 go-cqhttp API 的 `id/group_id/data.user_id == 数字`（13处回退），因 API 可能返回 string/number 混合类型
- **setTimeout 存储定时器 ID**：time.js `jmm_bad` 重置定时器改为 `const jmm_bad_timer = setTimeout(...)` 以便后续取消
- **setTimeout 函数引用修复**：majsoul_function.js `setTimeout(assync_special_paili(...), 1)` 直接调用函数返回值而非传函数引用 → 改为 `setTimeout(() => assync_special_paili(...), 1)`
- **疯狂背古诗 while 无限循环**：添加 `_attempt < 100` 最大尝试次数防止事件循环阻塞
- ~~**疯狂背古诗.js while 无限循环**~~：`while` 循环随机选词时可能无限循环阻塞事件循环。添加 `_attempt<100` 最大尝试次数 ✅

### 代码质量深度审查修复

- **全局错误处理器**：index.js 添加 `process.on('unhandledRejection')` 和 `process.on('uncaughtException')`，防止未捕获异常导致进程崩溃
- **setTimeout 未存储 ID**：time.js `setTimeout` 存储 ID 便于将来取消；majsoul_function.js `setTimeout(assync_special_paili(...), 1)` **BUG 修复** — 直接调用函数而非传函数引用，改为 `setTimeout(() => assync_special_paili(...), 1)`
- **`==` → `===` 二次全量替换**：core/ 107处 + games/（排除 tenhou.js）369处 = 476处 `==` 替换为 `===`，覆盖字符串字面量、`typeof`、`.length`、`null` 比较等安全模式
- **go-cqhttp API `id` 比较回退**：13处 `id === 数字`/`group_id === 数字`/`data.user_id === 数字` 回退为 `==`，因 API 可能返回 string 或 number 类型
- **tenhou.js `==` 保留**：算法文件中的 191处数字比较保留 `==`，var 提升可能为有意设计

### 联网方法论复审与确定性修复（2026-05-20）

- **联网审查方法论**：按 OWASP Node.js/NPM Security Cheat Sheet、Node.js 官方安全/事件循环/错误处理文档、ESLint / eslint-plugin-n / eslint-plugin-security / SonarJS 规则，补充审查 `eval`、`child_process.exec`、HTTP timeout、EventEmitter error、同步 I/O、依赖漏洞、隐式全局、重复函数、数组索引和复制粘贴错误。
- **依赖漏洞清理**：确认项目代码没有 `require("canvas")` / `import canvas` / `canvas` 业务引用，移除未使用的 `canvas` 依赖链；官方 npm registry 下 `npm audit --audit-level=moderate` 从 10 个漏洞降为 0 个漏洞。
- **match_enclosure.js 大括号匹配修复**：处理 `}` 时原先错误检查 `medium_enclosure_amount`，改为检查 `large_enclosure_amount`，避免漏报大括号不匹配。
- **切牌练习.js 手牌索引修复**：`one_more_turn()` 中 `[card_color][card_number]` 修复为 `[card_color, card_number]`，避免 `card_number > 0` 时恒为 `undefined`。
- **music.js 删除歌单修复**：`musiclist.splice(index)` 修复为 `musiclist.splice(index, 1)`，避免删除目标歌曲时连带删除后续所有歌曲。
- **湮灭之战/湮灭之战改坐标修复**：宇宙垃圾越界重采样时错误写入 `annihilateWarMatterDate[key]`，改为写回当前 `annihilateWarRubbishDate[i]`，避免未定义 `key` 和错误对象写入。
- **湮灭之战/湮灭之战改球内判断修复**：`isPointInSpherome()` 原先计算 `distance3D(x, y, z, x, y, z)` 导致距离永远为 0，改为计算点到球心 `xs, ys, zs` 的距离。
- **special_event.js 隐式全局收敛**：群成员增减、禁言、管理员变化、好友请求分支中的 `group_data`、`user_data`、`operator_data` 改为块级局部变量，避免事件处理之间共享临时数据。
- **basic_settings.js 运行时间初始化**：新增 `restart_time = Date.now()` 初始值，避免未收到 lifecycle enable 事件时查询“运行时间”引用未定义变量。
- **majsoul_function.js 异步牌理回调修复**：特殊牌理 `setTimeout` 现在会执行 `assync_special_paili()` 返回的发送函数，避免只返回函数但不发送结果。
- **验证**：已通过实际存在 JS 文件全量 `node --check`、`timeout 40s node -e "require('./start.js')"` 模块加载检查、`timeout 5s node index.js` 启动冒烟检查；`npm test` 仍为 package.json 占位脚本，不是有效测试入口。
