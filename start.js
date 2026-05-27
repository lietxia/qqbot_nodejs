/**
 * @模块 start.js
 * @描述 模块加载入口，按顺序require所有核心模块和游戏模块到全局作用域
 */

/* ==== 核心模块 ==== */
require("./core/basic_settings");
require("./core/reply_setting");
require("./core/special_event");
require("./core/blacklist");
require("./core/welcome");
require("./core/屏蔽词库");
require("./core/help");
require("./core/jrrp");
require("./core/time");
require("./core/留言板");
require("./core/留言内容");

/* ==== 游戏模块 ==== */
require("./games/hearthstone_function");
require("./games/hearthstone_card");
require("./games/hearthstone_card_nickname");
require("./games/hearthstone_card_function");
require("./games/炉石随机DIY数据库_Version_1.5");
require("./games/炉石随机DIY函数库_Version_1.5");
require("./games/majsoul_function");
require("./games/majsoul_character");
require("./games/清一色和牌型");
require("./games/向听判断");
require("./games/牌理分析");
require("./games/切牌练习");
require("./games/和牌牌理");
require("./games/特殊牌型");
require("./games/培养皿");
require("./games/培养皿帮助");
require("./games/培养皿辅助函数");
require("./games/色彩收集");
require("./games/色彩收集帮助");
require("./games/色彩收集颜色名");
require("./games/cell_war_log");
require("./games/rgbc_log");
require("./games/guai");
require("./core/save_server");
require("./games/接龙");
require("./games/接龙词");
require("./games/music");
require("./games/musiclist");
require("./games/musicrecord");

/* ==== 核心模块(续) ==== */
require("./core/masterlist");
require("./core/linear_algebra");
require("./games/hscl_cost2");
require("./games/hscl_cost2_name");
require("./core/calculator_base");
require("./core/integer_calculator");
require("./core/rational_calculator");
require("./core/algebraic_calculator");
require("./core/rational_polynomial_calculator");
require("./core/calculator_function");
require("./games/setu");
require("./games/setu_list");
require("./games/setu_usage");
require("./games/三麻上分模拟");
require("./games/sm_player_status");
require("./games/sm_server_result");
require("./games/姬萌萌破坏");
require("./games/疯狂背古诗");

/* ==== 核心模块(续2) ==== */
require("./core/abb");
require("./games/策略上分");
require("./games/古文献");
require("./games/24dot");
require("./core/fibonaci");
require("./games/置换分类");
require("./core/the_kth_number");
