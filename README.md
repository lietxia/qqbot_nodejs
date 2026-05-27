# 小夕子 QQ 机器人

基于 Node.js 的 QQ 机器人，通过 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 的 HTTP API 接收和发送消息。

## 功能

### 基础功能
- 问候、报时、每日人品 (jrrp)
- 自定义表情 (setu)
- 复读、留言板
- 自定义词条 (abb)

### 计算器
- 精确代数计算器（支持单扩张代数数域）
- 矩阵计算、斐波那契数列
- 大整数、有理数、多项式运算

### 游戏
- 日本麻将相关：向听判断、牌理分析、切牌练习、和牌牌理
- 雀魂角色管理
- 24 点游戏
- 细胞战争（已停运）
- 调色板（已停运）
- 三麻上分模拟（已停运）

### 炉石传说
- 卡牌查询、昵称索引
- 随从 DIY 生成

### 古诗词文
- 疯狂背古诗
- 古诗词搜索

## 快速开始

### 前置要求
- Node.js (>= 10)
- [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)

### 启动

1. 配置 `config.json`（go-cqhttp 配置文件）
2. 启动 go-cqhttp，HTTP 端口设为 5700
3. 启动机器人：

```bash
node index.js
```

机器人默认监听 `8082` 端口接收 go-cqhttp 的 POST 消息，go-cqhttp 的 `post_url` 需指向 `http://127.0.0.1:8082`。

## 项目结构

```
qqbot_nodejs/
├── index.js          # 主入口（HTTP 服务器）
├── start.js          # 模块加载入口
├── config.json       # go-cqhttp 配置
├── package.json
├── README.md
│
├── core/             # 核心模块 + 计算器 + 工具函数（44模块）
│   ├── basic_settings.js  # 全局变量
│   ├── reply_setting.js   # 回复框架
│   ├── help.js / abb.js / blacklist.js / welcome.js
│   ├── calculator_base.js / algebraic_calculator.js
│   ├── linear_algebra.js / integer_calculator.js
│   ├── jrrp.js / time.js / translate.js
│   └── ...
│
├── games/            # 所有游戏/娱乐模块（54模块）
│   ├── 培养皿.js / 色彩收集.js / 24dot.js
│   ├── 向听判断.js / 牌理分析.js（麻将）
│   ├── hearthstone_card.js / hearthstone_function.js（炉石）
│   ├── music.js / setu.js
│   ├── 疯狂背古诗.js / 古文献.js
│   └── ...
│
├── data/             # 数据与资源（11个文件）
│   ├── SourceHanSansSC-Regular.ttf
│   ├── 屏蔽词库.txt / 小夕夕.txt / pids.txt
│   ├── Suphx.pdf / 迷室之主.jpg
│   └── ...
│
└── node_bin/         # Node.js 运行时文件（Windows）
```

## 技术说明

- 纯 Node.js 实现，无外部框架依赖
- 基于 HTTP 与 go-cqhttp 通信
- 全局变量架构（`core/basic_settings.js` 中定义），各模块通过 `start.js` 的 `require` 加载

