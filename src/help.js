help_file = "小夕子帮助 -> 查看此帮助\n输入以下关键词查看小夕子的具体功能~\n----基础功能----\n----群聊设置(已停运)----\n----计算器----\n----古诗词文----\n----炉石传说----\n----日本麻将----\n----小游戏(已停运)----"

mj_px_file = `输入"mj开始练习切牌"开始, "mj重新练习切牌"换起手, "mj结束练习切牌"结束。
"mj切牌+牌名"切出不需要的牌, 字牌对应为东南西北白发中->1234567z。
"mj摸切"可摸切, "mj杠+牌名"来切出不需要的牌立直, "mj立直+牌名"来切出不需要的牌立直, "mj自摸"完成和牌。
"mj继续+牌名"可在流局后继续切出不需要的牌,"mj继续摸切"可在流局后继续摸切。
注：以上全部关键词都可以用首字母缩写表示，如mjmq表示mj摸切，mjqp 4z表示切出北~
现在可以查看和牌点数啦！`

基础功能 = "你好 -> 来问好\n晚安 -> 来道晚安\n小夕子真乖 -> 夸赞小夕子\n小夕子今天有多乖 -> 查看小夕子今天被夸了多少次\n小夕子爬 -> 让小夕子爬 (但是如果小夕子是管理员的话，你有可能被禁言)\n报时 -> 报时\njrrp -> 今日人品\ncxrp@目标 -> 目标的今日人品\nsetu -> 清口味好看的二次元图片(每天每群有次数上限)\n色图 -> 色图功能暂时关闭\n高山呢 -> 和机器人高山的联动\n姬萌萌 -> 和机器人姬萌萌的联动\nabb=cde -> 以后群聊里出现abb会自动回答cde\n[例]定义义=三个字\nabbx -> 以后群聊里出现abb不再会自动回答\n[例]定义义x\nabb定义者 -> 查看这个abb词条是谁定义的\n[例]定义义定义者\n音乐 -> 一首好听的音乐(已停用)\n音乐 网易云音乐id -> 音乐的链接(已停用)\n[例]音乐 22780410(已停用)\nfs 内容 -> 让小夕子复述你的内容\n[例]fs 蓝铃儿是钢板！\n留言 内容 -> 在小夕子的留言板上留下你的声音(小夕子的主人会阅读和定期清理，欢迎提出修改建议)\n[例]留言 小夕子真可爱~"

群聊设置 = `设置本群欢迎 欢迎内容 -> 新成员入群时会用欢迎内容来欢迎(不想欢迎可以设置为空字符)
恢复默认欢迎 -> 恢复到默认的欢迎方式`

计算器 = "js 算式 -> 计算当前算式(具体输入js帮助查看说明)\nmx 矩阵计算 -> 计算给定矩阵(正在完成输入输出端)\nfb数字 -> 计算斐波那契数列的第那么多项"

古诗词文 = "疯狂背古诗 -> 疯狂背古诗原视频\n疯狂背古诗 编号 -> 编号对应的疯狂背古诗里的古诗词\n疯狂背古诗 关键字 -> 包含关键字的古诗词或编号列表\n疯狂背古诗 韵律 -> 包含目标韵律的一首随机古诗词\ns随机古诗题 -> 一道从疯狂背古诗里选的随机完形填空题"

炉石传说 = "hs查询卡牌 名称 -> 查询现有炉石传说全部模式的牌(支持部分模糊查询)\n[例]hs查询卡牌 了不起的杰弗里斯(该功能缺乏维护，建议使用@Hearthbot或@面粉袋子的相关功能)\nhs添加绰号 卡牌名，昵称名 -> 为现有炉石传说的牌添加模糊查询索引\n[例]hs添加绰号 防护改装师，异灵术\nhs写个随从 名称 -> diy一个名字为名称的随从\n[例]hs写个随从 钢板蓝铃儿\nhs写个领主 -> 写个领主随从(你可以试试看哦~)\nhs开启全部随从类型 -> 随从diy中可以使用全部随从类型\nhs关闭随从类型 名称 -> 随从diy中将不会出现名称所描述的随从类型\nhs查看当前随从类型 -> 查看随从diy中全部可能出现的随从类型\n[注]不能添加自定义随从类型哦"

日本麻将 = "mj向听 牌型 -> 查询一个牌型的向听数\nmj牌理 牌型 -> 查询一个牌型的切牌效率(可能会刷屏)\n[例]mj牌理 6666789999m4444z\n切牌练习器:输入\"mj切牌帮助\"查看具体说明\nmj特殊牌理 牌型 -> 查询一个牌型的最佳进攻策略(试用功能，不一定准确)\n雀魂相关输入\"qh帮助\"查询"

qh帮助 = "qh今天玩谁 -> 随机抽取一个可选人物作为今天的使用角色\nqh添加人物 -> 添加非初始的人物进入使用范围\nqh删除人物 -> 去掉自己不想玩的人物\nqh我的人物 -> 查看自己能够使用哪些角色"

小游戏 = "1. 细胞战争(输入\"cw帮助\"查看具体游戏帮助)(已停运);\n2. 调色板(输入\"rgbc帮助\"查看具体游戏帮助)(已停运);\n3. 雀魂三麻上分模拟(输入\"sm帮助\"查看具体游戏帮助)(已停运);\n4. 24点(24点 -> 24点小游戏; 97点-> 97点小游戏; 可类比其它10-999的数字; 解24 牌面 ->获得答案);\n未完待续……"

js_help = `小夕子计算器使用说明:
输入"js帮助"查看本帮助~
小夕子的计算器是精确的代数型计算器，目前只能计算单扩张代数数~
单扩张代数数的定义(simple extension):单代数变元的扩张形成的数域~
[例]2^(1/3)+2^(2/3)是单扩张，3^(1/4)+3^(1/2)不是单扩张~
[例]i是单扩张，i^(1/2)不是单扩张~
所有算式的最前方要加"js"表示"计算"哦~
[例]0.1+0.2
输出的结果一定是分数或者扩张代数元的多项式的形式~
加法:+
减法:+
乘法:*
除法:/
乘方:^
开方:请用乘方表示开方~
阶乘:!
根号负一:i`