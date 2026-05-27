/**
 * @模块 向听判断.js
 * @描述 日本麻将向听数计算模块，支持一般牌型、七对子和国士无双的向听判断
 */

/**
 * 将手牌字符串转换为手牌数组
 * @param {string} hand_string - 手牌字符串（如"123m456p789s12z"）
 * @returns {number[][]} 手牌数组，4色×9的二维数组
 */
/**
 * @模块 向听判断.js
 * @描述 麻将向听数计算模块，支持一般形、七对子、国士无双三种牌型的向听判断
 */

/**
 * 将牌面字符串转换为手牌二维数组
 * @param {string} hand_string - 牌面字符串（如"123m456p789s11z"）
 * @returns {number[][]} 手牌二维数组，无效返回basic_hand
 */
function convert_to_card(hand_string) {
	let card_numbers = [];
	let hand = JSON.parse(JSON.stringify(basic_hand));
	for (let i = 0; i < hand_string.length; ++i) {
		switch (hand_string[i]) {
			case 'm': if (!put_card(card_numbers, hand[0], false)) return basic_hand; break;
			case 'p': if (!put_card(card_numbers, hand[1], false)) return basic_hand; break;
			case 's': if (!put_card(card_numbers, hand[2], false)) return basic_hand; break;
			case 'z': if (!put_card(card_numbers, hand[3], true)) return basic_hand; break;
			default: if (!put_number(card_numbers, hand_string[i])) return basic_hand;
		}
	}
	return hand;
}

/**
 * 将牌名转换为牌编号
 * @param {string} card - 牌名（如"1m"、"0p"）
 * @returns {number} 牌编号（0-33）
 */
/**
 * 将牌名转换为编号
 * @param {string} card - 牌名（如"1m"）
 * @returns {number} 牌编号(0-33)
 */
function convert_to_hold(card) {
	return mpsz.indexOf(card[1]) * 9 + ((card[0] === "0" && card[1] !== "z") ? 4 : (card[0] - "1"));
}

/**
 * 将数字牌放入对应花色手牌中
 * @param {number[]} card_numbers - 待放置的数字列表
 * @param {number[]} hand_color - 该花色的手牌数组
 * @param {boolean} worded - 是否为字牌
 * @returns {boolean} 放置是否合法
 */
function put_card(card_numbers, hand_color, worded) {
	if (card_numbers.length === 0)
		return false;
	while (card_numbers.length > 0) {
		let the_number = card_numbers.pop();
		if (worded && the_number >= 7)
			return false;
		if (the_number === 9)
			the_number = 4;
		if (++hand_color[the_number] > 4)
			return false;
	}
	return true;
}

/**
 * 将字符数字转换为内部编号并压入列表
 * @param {number[]} card_numbers - 数字列表
 * @param {string} the_number - 字符数字（'0'-'9'）
 * @returns {boolean} 转换是否合法
 */
function put_number(card_numbers, the_number) {
	switch (the_number) {
		case '0': card_numbers.push(9); return true;
		case '1': card_numbers.push(0); return true;
		case '2': card_numbers.push(1); return true;
		case '3': card_numbers.push(2); return true;
		case '4': card_numbers.push(3); return true;
		case '5': card_numbers.push(4); return true;
		case '6': card_numbers.push(5); return true;
		case '7': card_numbers.push(6); return true;
		case '8': card_numbers.push(7); return true;
		case '9': card_numbers.push(8); return true;
		default: return false;
	}
}

/**
 * 计算手牌总数
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 手牌总数
 */
/**
 * 计算手牌总枚数
 * @param {number[][]} hand - 手牌二维数组
 * @returns {number} 手牌总枚数
 */
function hand_amount(hand) {
	let amount = 0;
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < ((i === 3) ? 7 : 9); ++j)
			amount += hand[i][j];
	return amount;
}

/**
 * 计算目标牌型与手牌在某花色上的距离
 * @param {number[]} compared - 目标牌型数组
 * @param {number} color - 花色索引（0-3）
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 缺少的牌数
 */
function mahjong_distance(compared, color, hand) {
	let distance = 0;
	for (let i = 0; i < 9; ++i)
		if (compared[i] > hand[color][i])
			distance += compared[i] - hand[color][i];
	return distance;
}

/**
 * 计算某花色指定面子数的最小听牌距离
 * @param {number[][]} compared_type - 目标面子牌型列表
 * @param {number} color - 花色索引
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 最小距离
 */
function min_tenpai_distance(compared_type, color, hand) {
	let distance = 14;
	let possible_min_distance = 0;
	for (let i = 0; i < 9; ++i)
		possible_min_distance += compared_type[0][i];
	for (let i = 0; i < 9; ++i)
		possible_min_distance -= hand[color][i];
	for (let i = 0; i < compared_type.length; ++i) {
		if (distance === possible_min_distance)
			return possible_min_distance;
		let this_distance = mahjong_distance(compared_type[i], color, hand);
		if (this_distance < distance)
			distance = this_distance;
	}
	return distance;
}

/**
 * 计算某花色指定面子数（无雀头）的最小距离
 * @param {number} color - 花色索引
 * @param {number} type - 面子数量（0-4）
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 最小距离
 */
function min_distance(color, type, hand) {
	switch (type) {
		case 0: return 0;
		case 1: return min_tenpai_distance((color < 3 ? mianzi_single_colored : mianzi_single_worded), color, hand);
		case 2: return min_tenpai_distance((color < 3 ? mianzi_double_colored : mianzi_double_worded), color, hand);
		case 3: return min_tenpai_distance((color < 3 ? mianzi_triple_colored : mianzi_triple_worded), color, hand);
		case 4: return min_tenpai_distance((color < 3 ? mianzi_quadruple_colored : mianzi_quadruple_worded), color, hand);
	}
}

/**
 * 计算某花色指定面子数（含雀头）的最小距离
 * @param {number} color - 花色索引
 * @param {number} type - 面子数量（0-4）
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 最小距离
 */
function min_distance_with_quetou(color, type, hand) {
	switch (type) {
		case 0: return min_tenpai_distance((color < 3 ? quetou_colored : quetou_worded), color, hand);
		case 1: return min_tenpai_distance((color < 3 ? mianzi_single_colored_with_quetou : mianzi_single_worded_with_quetou), color, hand);
		case 2: return min_tenpai_distance((color < 3 ? mianzi_double_colored_with_quetou : mianzi_double_worded_with_quetou), color, hand);
		case 3: return min_tenpai_distance((color < 3 ? mianzi_triple_colored_with_quetou : mianzi_triple_worded_with_quetou), color, hand);
		case 4: return min_tenpai_distance((color < 3 ? mianzi_quadruple_colored_with_quetou : mianzi_quadruple_worded_with_quetou), color, hand);
	}
}

/**
 * 初始化各花色各面子数的无雀头距离矩阵U
 * @param {number[][]} hand - 手牌数组
 * @returns {number[][]} 4×5的距离矩阵
 */
function initialize_santen_U(hand) {
	let U = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < 5; ++j)
			U[i][j] = min_distance(i, j, hand);
	return U;
}

/**
 * 初始化各花色各面子数的含雀头距离矩阵T
 * @param {number[][]} hand - 手牌数组
 * @returns {number[][]} 4×5的距离矩阵
 */
function initialize_santen_T(hand) {
	let T = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < 5; ++j)
			T[i][j] = min_distance_with_quetou(i, j, hand);
	return T;
}

/**
 * 计算一般形向听数（动态规划）
 * @param {number[][]} hand - 手牌二维数组
 * @returns {number} 一般形向听数
 */
/**
 * 计算一般牌型的向听数（动态规划）
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 一般牌型向听数
 */
function general_santen(hand) {
	let santen_U = initialize_santen_U(hand);
	let santen_T = initialize_santen_T(hand);
	let santen_u = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
	let santen_t = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
	for (let j = 0; j < 5; ++j) {
		santen_u[0][j] = santen_U[0][j];
		santen_t[0][j] = santen_T[0][j];
	}
	for (let i = 1; i < 4; ++i)
		for (let j = 0; j < 5; ++j) {
			let count_u = 14;
			let count_t = 14;
			for (let l = 0; l <= j; ++l) {
				if (count_u > santen_u[i - 1][l] + santen_U[i][j - l])
					count_u = santen_u[i - 1][l] + santen_U[i][j - l];
				if (count_t > santen_t[i - 1][l] + santen_U[i][j - l])
					count_t = santen_t[i - 1][l] + santen_U[i][j - l];
				if (count_t > santen_u[i - 1][l] + santen_T[i][j - l])
					count_t = santen_u[i - 1][l] + santen_T[i][j - l];
			}
			santen_u[i][j] = count_u;
			santen_t[i][j] = count_t;
		}
	switch (hand_amount(hand)) {
		case 1: return 1;
		case 2: return santen_t[3][0];
		case 4: return santen_t[3][1];
		case 5: return santen_t[3][1];
		case 7: return santen_t[3][2];
		case 8: return santen_t[3][2];
		case 10: return santen_t[3][3];
		case 11: return santen_t[3][3];
		case 13: return santen_t[3][4];
		case 14: return santen_t[3][4];
		default: return Infinity;
	}
}

/**
 * 计算七对子向听数
 * @param {number[][]} hand - 手牌二维数组
 * @returns {number} 七对子向听数
 */
/**
 * 计算七对子向听数
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 七对子向听数
 */
function qidui_santen(hand) {
	let duizishu = 0;
	let paizhongshu = 0;
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < 9; ++j) {
			if (hand[i][j] >= 2)
				++duizishu;
			if (hand[i][j] >= 1)
				++paizhongshu;
		}
	if (paizhongshu > 7)
		paizhongshu = 7;
	return 14 - paizhongshu - duizishu;
}

/**
 * 计算国士无双向听数
 * @param {number[][]} hand - 手牌二维数组
 * @returns {number} 国士无双向听数
 */
/**
 * 计算国士无双向听数
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 国士无双向听数
 */
function kuosi_santen(hand) {
	let yaojiuzhongshu = 0;
	let yaojiushu = 0;
	for (let i = 0; i < 3; ++i) {
		yaojiushu += hand[i][0];
		if (hand[i][0] >= 1)
			++yaojiuzhongshu;
		yaojiushu += hand[i][8];
		if (hand[i][8] >= 1)
			++yaojiuzhongshu;
	}
	for (let j = 0; j < 7; ++j) {
		yaojiushu += hand[3][j];
		if (hand[3][j] >= 1)
			++yaojiuzhongshu;
	}
	return ((yaojiushu > yaojiuzhongshu) ? 13 : 14) - yaojiuzhongshu;
}

/**
 * 计算综合向听数（取一般形、七对子、国士无双最小值）
 * @param {number[][]} hand - 手牌二维数组
 * @returns {number} 综合向听数
 */
/**
 * 计算手牌的综合向听数（取一般、七对子、国士最小值）
 * @param {number[][]} hand - 手牌数组
 * @returns {number} 综合向听数
 */
function santen(hand) {
	return min([(hand_amount(hand) >= 13 ? kuosi_santen(hand) : Infinity), (hand_amount(hand) >= 13 ? qidui_santen(hand) : Infinity), general_santen(hand)]);
}

/**
 * 将向听数转换为可读回复文本
 * @param {number[][]} hand - 手牌二维数组
 * @returns {string} 向听数回复文本（如"听牌~"、"2向听~"）
 */
/**
 * 根据向听数生成回复文本
 * @param {number[][]} hand - 手牌数组
 * @returns {string} 向听数回复文本（如"听牌~"、"2向听~"）
 */
function santen_reply(hand) {
	if (hand_amount(hand) === 0)
		return "牌型有问题呢……";
	let hand_santen = santen(hand);
	switch (hand_santen) {
		case 0: return "和了呢~";
		case 1: return "听牌~";
		default: return (hand_santen - 1) + "向听~";
	}
}