/**
 * @模块 basic_settings.js
 * @描述 全局基础变量定义，包含消息状态、游戏数据、随机函数、工具函数等核心配置
 */

const http = require('http');

/* ==== 基本变量定义 ==== */
id = 0;
nickname = "";
card = "";
message = "";
type = "";
group = 0;
time = 0;
blacklist = [1714318050];
ownerlist = [3142898153, 2894344902];
send_message_to_id = 1035756811;
myid = 1302733669;
last_message_time = 0;
restart_time = Date.now();
//send_message_to_id=701548657;
const month_general = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_special = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
poker_colors = ["\u2661", "\u2662", "\u2664", "\u2667"];
poker_numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
jmm_bad = false;
random_validity = true;
Max_cal_time = 10000;
Max_fys_time = 10000;

try_time = 5000;
max_try_turns = 8;
turn_weights = 1.41;
tspl_lasttime = 0;

func_use_data = {}

rgbcUserData = {}

spaceRadius = 10
annihilateWarUserDate = {}
annihilateWarRubbishDate = []
annihilateWarLog = []
annihilateWarMatterDate = {}
annihilatedMatterDate = {}

total_amount = 0;
cell_health_list = [];
cell_status = [];
user_dict = {};
cell_dict = {};
miss_chance = 1;
damage_decrease_ratio = 3;
damage_decrease_trend = 0.4;
miss_chance_trend = 0.6;
reproduce_rate = 9;
reproduce_rate_trend = 0.6;
restore_rate = 10;
restore_rate_trend = 0.6;
environment_talent = 0;
random_record = false;

px_dict = {};
max_turns = 18;
max_possible_turns = 120;
面粉袋子 = false;
姬萌萌 = false;
setu_status = false;

group_question_list = { "groups": {}, "privates": {} }
waiting_group_list = [];

const z_crr = ["東", "南", "西", "北", "白", "發", "中", "未知"]
sex = { "male": "汉子", "female": "妹子", "unknown": "未知" }

const 役满列表 = ["天和", "地和", "大四喜", "小四喜", "大三元", "字一色", "清老頭", "綠一色", "四暗刻", "四暗刻單騎", "四槓子", "國士無雙", "國士無雙十三面", "九蓮寶燈", "純正九蓮寶燈"]
const 役满倍数 = [1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2];
const 役种列表 = ["立直", "兩立直", "一発", "門前清自摸和", "斷幺九", "平和", "一盃口", "自風東", "自風南", "自風西", "自風北", "場風東", "場風南", "場風西", "場風北", "役牌白", "役牌發", "役牌中", "七對子", "一氣通貫", "三色同順", "三色同刻", "三暗刻", "三槓子", "對對和", "混全帶幺九", "混老頭", "小三元", "二盃口", "純全帶幺九", "混一色", "清一色", "嶺上開花", "海底摸月", "河底撈魚", "槍槓"]
const 门清役种翻数 = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 6, 1, 1, 1, 1]
const 食下役种翻数 = [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 0, 2, 2, 5, 1, 1, 1, 1]
雀魂人物 = ["一姬", "二阶堂美树", "三上千织", "藤田佳奈", "相原舞", "抚子", "八木唯", "九条璃雨", "泽尼娅", "卡维", "轻库娘", "莎拉", "二之宫花", "白石奈奈", "小鸟游雏田", "五十岚阳菜", "凉宫杏树", "北见纱和子", "雏桃", "四宫夏生", "汪次郎", "一之濑空", "明智英树", "斋藤治", "约瑟夫", "艾因", "月见山", "辉夜姬", "藤本绮罗", "如月莲", "石原碓海"]

雀魂人物图 = ["https://img.moegirl.org.cn/common/thumb/9/93/%E4%B8%80%E5%A7%AC.png/510px-%E4%B8%80%E5%A7%AC.png", "https://img.moegirl.org.cn/common/thumb/d/de/%E9%9B%80%E9%AD%82_%E4%BA%8C%E9%98%B6%E5%A0%82%E5%A4%A7.png/490px-%E9%9B%80%E9%AD%82_%E4%BA%8C%E9%98%B6%E5%A0%82%E5%A4%A7.png", "https://img.moegirl.org.cn/common/thumb/c/ca/%E5%8D%83%E7%BB%87%E5%A4%A7.png/448px-%E5%8D%83%E7%BB%87%E5%A4%A7.png", "https://img.moegirl.org.cn/common/thumb/2/2b/%E8%97%A4%E7%94%B0%E4%BD%B3%E5%A5%88.png/328px-%E8%97%A4%E7%94%B0%E4%BD%B3%E5%A5%88.png", "https://img.moegirl.org.cn/common/thumb/c/c7/%E7%9B%B8%E5%8E%9F%E8%88%9E.png/297px-%E7%9B%B8%E5%8E%9F%E8%88%9E.png", "https://img.moegirl.org.cn/common/thumb/7/7c/%E6%8A%9A%E5%AD%90%E5%A4%A7.png/486px-%E6%8A%9A%E5%AD%90%E5%A4%A7.png", "https://img.moegirl.org.cn/common/thumb/c/c4/%E5%85%AB%E6%9C%A8%E5%94%AF%E7%AB%8B%E7%BB%98.png/330px-%E5%85%AB%E6%9C%A8%E5%94%AF%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/4/49/%E4%B9%9D%E6%9D%A1%E7%92%83%E9%9B%A8%E7%AB%8B%E7%BB%98.png/455px-%E4%B9%9D%E6%9D%A1%E7%92%83%E9%9B%A8%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/a/ae/%E6%B3%BD%E5%B0%BC%E5%A8%85%E7%AB%8B%E7%BB%98.png/283px-%E6%B3%BD%E5%B0%BC%E5%A8%85%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/b/b5/%E5%8D%A1%E7%BB%B4%E7%AB%8B%E7%BB%98.png/478px-%E5%8D%A1%E7%BB%B4%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/c/cf/%E8%BD%BB%E5%BA%93%E5%A8%98_%E7%AB%8B%E7%BB%98.png/391px-%E8%BD%BB%E5%BA%93%E5%A8%98_%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/7/72/%E8%8E%8E%E6%8B%89%E7%AB%8B%E7%BB%98.png/506px-%E8%8E%8E%E6%8B%89%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/d/d1/%E4%BA%8C%E4%B9%8B%E5%AE%AB%E8%8A%B1.png/272px-%E4%BA%8C%E4%B9%8B%E5%AE%AB%E8%8A%B1.png", "https://img.moegirl.org.cn/common/thumb/a/a4/%E7%99%BD%E7%9F%B3%E5%A5%88%E5%A5%88%E7%AB%8B%E7%BB%98.png/404px-%E7%99%BD%E7%9F%B3%E5%A5%88%E5%A5%88%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/4/48/%E5%B0%8F%E9%B8%9F%E6%B8%B8%E9%9B%8F%E7%94%B0%E7%AB%8B%E7%BB%98.png/541px-%E5%B0%8F%E9%B8%9F%E6%B8%B8%E9%9B%8F%E7%94%B0%E7%AB%8B%E7%BB%98.png", "https://img.moegirl.org.cn/common/thumb/8/83/%E4%BA%94%E5%8D%81%E5%B2%9A%E9%98%B3%E8%8F%9C.png/500px-%E4%BA%94%E5%8D%81%E5%B2%9A%E9%98%B3%E8%8F%9C.png", "https://img.moegirl.org.cn/common/thumb/3/30/%E5%87%89%E5%AE%AB%E6%9D%8F%E6%A0%91.png/562px-%E5%87%89%E5%AE%AB%E6%9D%8F%E6%A0%91.png", "https://img.moegirl.org.cn/common/thumb/d/d1/%E5%8C%97%E8%A7%81%E7%BA%B1%E5%92%8C%E5%AD%90.png/532px-%E5%8C%97%E8%A7%81%E7%BA%B1%E5%92%8C%E5%AD%90.png", "https://img.moegirl.org.cn/common/8/88/%E9%9B%8F%E6%A1%83.png", "https://img.moegirl.org.cn/common/thumb/f/f1/%E5%9B%9B%E5%AE%AB%E5%A4%8F%E7%94%9F.png/265px-%E5%9B%9B%E5%AE%AB%E5%A4%8F%E7%94%9F.png", "https://img.moegirl.org.cn/common/thumb/1/1a/%E6%B1%AA%E6%AC%A1%E9%83%8E.png/468px-%E6%B1%AA%E6%AC%A1%E9%83%8E.png", "https://img.moegirl.org.cn/common/thumb/8/8b/%E4%B8%80%E4%B9%8B%E6%BF%91%E7%A9%BA.png/243px-%E4%B8%80%E4%B9%8B%E6%BF%91%E7%A9%BA.png", "https://img.moegirl.org.cn/common/thumb/1/10/%E6%98%8E%E6%99%BA%E8%8B%B1%E6%A0%91.png/240px-%E6%98%8E%E6%99%BA%E8%8B%B1%E6%A0%91.png", "https://img.moegirl.org.cn/common/thumb/f/fe/%E6%96%8B%E8%97%A4%E6%B2%BB.png/343px-%E6%96%8B%E8%97%A4%E6%B2%BB.png", "https://img.moegirl.org.cn/common/thumb/a/ac/%E7%BA%A6%E7%91%9F%E5%A4%AB.png/367px-%E7%BA%A6%E7%91%9F%E5%A4%AB.png", "https://img.moegirl.org.cn/common/thumb/6/67/%E8%89%BE%E5%9B%A0%28%E9%9B%80%E9%AD%82%29.png/461px-%E8%89%BE%E5%9B%A0%28%E9%9B%80%E9%AD%82%29.png", "https://img.moegirl.org.cn/common/thumb/f/f8/%E6%9C%88%E8%A7%81%E5%B1%B1.png/457px-%E6%9C%88%E8%A7%81%E5%B1%B1.png", "https://img.moegirl.org.cn/common/thumb/d/d9/%E8%BE%89%E5%A4%9C%E5%A7%AC%28%E9%9B%80%E9%AD%82%29.png/750px-%E8%BE%89%E5%A4%9C%E5%A7%AC%28%E9%9B%80%E9%AD%82%29.png", "https://img.moegirl.org.cn/common/thumb/3/3d/%E8%97%A4%E6%9C%AC%E7%BB%AE%E7%BD%97.png/367px-%E8%97%A4%E6%9C%AC%E7%BB%AE%E7%BD%97.png", "https://img.moegirl.org.cn/common/thumb/7/73/%E5%A6%82%E6%9C%88%E8%8E%B2.png/255px-%E5%A6%82%E6%9C%88%E8%8E%B2.png", "https://img.moegirl.org.cn/common/thumb/2/2e/%E7%9F%B3%E5%8E%9F%E7%A2%93%E6%B5%B7.png/351px-%E7%9F%B3%E5%8E%9F%E7%A2%93%E6%B5%B7.png"]

setu_adder = []

const level_list = ["初心1★", "初心2★", "初心3★", "雀士1★", "雀士2★", "雀士3★", "雀杰1★", "雀杰2★", "雀杰3★", "雀豪1★", "雀豪2★", "雀豪3★", "雀圣1★", "雀圣2★", "雀圣3★", "魂天"]

const level_up_point = [20, 80, 200, 600, 800, 1000, 1200, 1400, 2000, 2800, 3200, 3600, 4000, 6000, 9000, 10000000]

const level_start_point = [0, 0, 0, 300, 400, 500, 600, 700, 1000, 1400, 1600, 1800, 2000, 3000, 4500, 10000]

const level_down_point = [0, 0, 0, 20, 40, 60, 80, 100, 120, 165, 190, 215, 240, 265, 290, 320]

const room_name = ["铜之间", "银之间", "金之间", "玉之间", "王座之间"]

const room_up_point = [30, 60, 105, 160, 240]

sm_player_status_dict = {}

sm_rank_list = []

sm_match_list = [[], [], [], [], []]

sm_player_log = ""

const fb_root_1 = { "base": { "base": {}, "min_monic_pol": [["1", "1"], ["0", "1"], ["-5", "1"]] }, "coefficient": [["1", "2"], ["1", "2"]] }
const fb_root_2 = { "base": { "base": {}, "min_monic_pol": [["1", "1"], ["0", "1"], ["-5", "1"]] }, "coefficient": [["-1", "2"], ["1", "2"]] }

/* ==== 随机函数 ==== */

/**
 * 重置姬萌萌坏标记
 */
function jmm_bad_func() {
	jmm_bad = false;
}

/**
 * 将数字转换为对应的Unicode码点字符
 * @param {number} num - 数字
 * @returns {string} 对应的字符
 */
function number_record(num) {
	return String.fromCodePoint(num + 48);
}

/**
 * 生成[a,b)范围内的随机整数（均匀分布）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let random_result = Math.floor(a + Math.random() * (b - a));
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 生成[a,b)范围内的随机整数（偏大分布，平方根变换）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random_increase(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let rand = Math.random();
	let random_result = Math.floor(a + (rand ** (1 / 2)) * (b - a));
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 生成[a,b)范围内的随机整数（更偏大分布，立方根变换）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random_inincrease(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let rand = Math.random();
	let random_result = Math.floor(a + (rand ** (1 / 3)) * (b - a));
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 生成[a,b)范围内的随机整数（偏小分布，平方根变换）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random_decrease(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let rand = Math.random();
	let random_result = Math.floor(b - (rand ** (1 / 2)) * (b - a));
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 生成[a,b)范围内的随机整数（更偏小分布，立方根变换）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random_dedecrease(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let rand = Math.random();
	let random_result = Math.floor(b - (rand ** (1 / 3)) * (b - a));
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 生成[a,b)范围内的随机整数（中间偏大分布，双随机平均）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random_convex(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let random_result = Math.floor(a + (Math.random() + Math.random()) * (b - a) / 2);
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 生成[a,b)范围内的随机整数（中间偏小分布，双随机平均）
 * @param {number} a - 下界（含）
 * @param {number} b - 上界（不含）
 * @returns {number} 随机整数
 */
function random_anticonvex(a, b) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return Math.floor(a);
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < Math.floor(a) || random_result > Math.floor(b)) {
			random_validity = false;
			return Math.floor(a);
		}
		return random_result;
	}
	let random_result = Math.floor(b - (Math.random() + Math.random()) * (b - a) / 2);
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 以给定概率生成布尔值
 * @param {number} rate - 为true的概率(0-1)
 * @returns {number} 0或1
 */
function random_bool(rate) {
	if (typeof (random_target) === "string") {
		if (random_place >= random_target.length) {
			random_validity = false;
			return 0;
		}
		let random_result = random_target[random_place++].codePointAt(0) - 48;
		if (random_result < 0 || random_result > 1) {
			random_validity = false;
			return 0;
		}
		return random_result;
	}
	let random_result = (Math.random() < rate);
	if (typeof (random_record) === "string")
		random_record += number_record(random_result);
	return random_result;
}

/**
 * 使用指定随机函数进行多次采样统计
 * @param {Function} random - 随机函数
 * @param {number} m - 采样范围上限
 * @param {number} n - 采样次数
 * @returns {number[]} 各值的出现次数
 */
function possibility(random, m, n) {
	let count = [];
	for (let i = 0; i < m; ++i)
		count[i] = 0;
	for (let i = 0; i < n; ++i)
		++count[random(0, m)];
	return count;
}

/* ==== 工具函数 ==== */

/**
 * 求数组中的最大值
 * @param {number[]} number_set - 数字集合
 * @returns {number} 最大值
 */
function max(number_set) {
	let minimum = -Infinity;
	for (let i = 0; i < number_set.length; i++)
		if (minimum < number_set[i])
			minimum = number_set[i];
	return minimum;
}

/**
 * 求数组中的最小值
 * @param {number[]} number_set - 数字集合
 * @returns {number} 最小值
 */
function min(number_set) {
	let minimum = Infinity;
	for (let i = 0; i < number_set.length; i++)
		if (minimum > number_set[i])
			minimum = number_set[i];
	return minimum;
}

/**
 * 尝试将字符串解析为数字
 * @param {string} order_string - 输入字符串
 * @returns {number|string} 解析成功返回数字，否则返回原字符串
 */
function parse_if_number(order_string) {
	if (order_string[0] === "-")
		return 0 - parse_if_number(order_string.slice(1));
	let value = 0;
	for (let i = 0; i < order_string.length; ++i)
		if (order_string[i] < "0" || order_string[i] > "9")
			return order_string;
		else
			value = 10 * value + (order_string[i] - "0");
	return value;
}

/**
 * 计算子串在母串中出现的次数
 * @param {string} mother_string - 母串
 * @param {string} substr - 子串
 * @returns {number} 出现次数
 */
function substr_amount(mother_string, substr) {
	let count_amount = 0;
	for (let new_string = mother_string; new_string != new_string.replace(substr, ""); new_string = new_string.replace(substr, ""))
		++count_amount;
	return count_amount;
}

/**
 * 计算百分比
 * @param {number} term - 部分值
 * @param {number} total - 总值
 * @returns {string} 百分比字符串
 */
function cal_percent(term, total) {
	return (term === 0) ? "0%" : (Math.floor(term * 10000 / total) / 100 + "%");
}

/**
 * 计算平均值（保留两位小数）
 * @param {number} term - 部分值
 * @param {number} total - 总值
 * @returns {number} 平均值
 */
function cal_average(term, total) {
	return (term === 0) ? 0 : (Math.floor(term * 100 / total) / 100);
}

/**
 * 将字符串重复指定次数
 * @param {string} string - 原字符串
 * @param {number} times - 重复次数
 * @returns {string} 重复后的字符串
 */
function string_multiply(string, times) {
	let result = "";
	for (let i = 0; i < times; ++i)
		result += string;
	return result;
}

/**
 * 执行函数并测量耗时
 * @param {Function} func - 待执行函数
 * @param {...*} arg - 函数参数
 * @returns {string} 函数结果及耗时信息
 */
function count_func_time(func, ...arg) {
	let start = Date.now(), func_result = func(...arg);
	if (func_result === "")
		return "";
	if (typeof (func_result) === "string")
		return `${func_result} (${Date.now() - start}ms)`;
	else
		return `${func_result} (${Date.now() - start}ms)`;
}

/**
 * 设置当前群/私聊的答题答案
 * @param {string} the_answer - 正确答案
 * @returns {boolean} 始终返回true
 */
function set_answer(the_answer) {
	if (type === "group")
		group_question_list["groups"][group_id] = the_answer;
	if (type === "private")
		group_question_list["privates"][id] = the_answer;
	return true;
}

/**
 * 将分数形式字符串转换为小数
 * @param {string} string - 可能包含"/"的字符串
 * @returns {string} 转换后的字符串
 */
function ratio_to_deci(string) {
	if (!string.includes("/"))
		return string;
	if (string.includes("("))
		return string;
	if (string.includes("i"))
		return string;
	let ratio = string.split("/");
	if (ratio.length > 2)
		return string;
	return JSON.stringify(ratio[0] / ratio[1]);
}

/**
 * 发送测试消息到指定群聊
 * @param {string} the_message - 消息内容
 * @returns {boolean} 始终返回true
 */
function send_test_message(the_message) {
	http.get("http://127.0.0.1:5700/send_group_msg?group_id=701548657&message=" + JSON.stringify(the_message)).on("error", ()=>{});
	return true;
}