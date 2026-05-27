/**
 * @模块 清一色和牌型计算.js
 * @描述 清一色面子组合表的生成脚本，通过组合算法计算各面子组合并输出到文件
 */

const fs = require('fs');
/** 花色标识数组 */
const mpsz = ['m', 'p', 's', 'z'];
/** 空手牌模板 */
const basic_hand = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

/** 数牌单面子组合表 */
mianzi_single_colored = [[3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 3], [1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1]];
/** 字牌单面子组合表 */
mianzi_single_worded = [[3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0]];
/** 数牌雀头组合表 */
quetou_colored = [[2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2]];
/** 字牌雀头组合表 */
quetou_worded = [[2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0]];

/**
 * 判断两组牌是否可组合
 * @param {number[]} cards_1 - 第一组牌
 * @param {number[]} cards_2 - 第二组牌
 * @returns {boolean} 是否可组合
 */
function composible(cards_1, cards_2) {
	for (let i = 0; i < 9; ++i)
		if (cards_1[i] + cards_2[i] > 4)
			return false;
	return true;
}

/**
 * 将两组牌合并为组合牌
 * @param {number[]} cards_1 - 第一组牌
 * @param {number[]} cards_2 - 第二组牌
 * @returns {number[]} 合并后的牌组
 */
function composite(cards_1, cards_2) {
	let cards = [];
	for (let i = 0; i < 9; ++i)
		cards[i] = cards_1[i] + cards_2[i];
	return cards;
}

/**
 * 在数组中查找元素的索引
 * @param {Array} group - 目标数组
 * @param {Array} element - 查找元素
 * @returns {number} 元素索引，未找到返回-1
 */
function index_of(group, element) {
	let ELEMENT = JSON.stringify(element);
	for (let i = 0; i < group.length; ++i)
		if (ELEMENT === JSON.stringify(group[i]))
			return i;
	return -1;
}

/**
 * 生成两组牌的所有合法组合（去重）
 * @param {number[][]} cards_1 - 第一组牌列表
 * @param {number[][]} cards_2 - 第二组牌列表
 * @returns {number[][]} 合法组合列表
 */
function create_mix(cards_1, cards_2) {
	let mix_cards = [];
	for (let i = 0; i < cards_1.length; ++i)
		for (let j = 0; j < cards_2.length; ++j)
			if (composible(cards_1[i], cards_2[j]) && index_of(mix_cards, composite(cards_1[i], cards_2[j])) < 0)
				mix_cards.push(composite(cards_1[i], cards_2[j]));
	return mix_cards;
}

/**
 * 面子排序比较函数
 * @param {number[]} mianzi_a - 面子A
 * @param {number[]} mianzi_b - 面子B
 * @returns {number} 比较结果
 */
function mianzi_sort(mianzi_a, mianzi_b) {
	for (let i = 0; i < 9; ++i)
		if (mianzi_a[i] != mianzi_b[i])
			return mianzi_b[i] - mianzi_a[i];
	return 0;
}

/** 数牌双面子组合（由单面子自组合生成） */
mianzi_double_colored = create_mix(mianzi_single_colored, mianzi_single_colored);
/** 数牌三面子组合 */
mianzi_triple_colored = create_mix(mianzi_single_colored, mianzi_double_colored);
/** 数牌四面子组合 */
mianzi_quadruple_colored = create_mix(mianzi_single_colored, mianzi_triple_colored);
/** 字牌双面子组合 */
mianzi_double_worded = create_mix(mianzi_single_worded, mianzi_single_worded);
/** 字牌三面子组合 */
mianzi_triple_worded = create_mix(mianzi_single_worded, mianzi_double_worded);
/** 字牌四面子组合 */
mianzi_quadruple_worded = create_mix(mianzi_single_worded, mianzi_triple_worded);
/** 数牌单面子+雀头组合 */
mianzi_single_colored_with_quetou = create_mix(mianzi_single_colored, quetou_colored);
/** 数牌双面子+雀头组合 */
mianzi_double_colored_with_quetou = create_mix(mianzi_double_colored, quetou_colored);
/** 数牌三面子+雀头组合 */
mianzi_triple_colored_with_quetou = create_mix(mianzi_triple_colored, quetou_colored);
/** 数牌四面子+雀头组合 */
mianzi_quadruple_colored_with_quetou = create_mix(mianzi_quadruple_colored, quetou_colored);
/** 字牌单面子+雀头组合 */
mianzi_single_worded_with_quetou = create_mix(mianzi_single_worded, quetou_worded);
/** 字牌双面子+雀头组合 */
mianzi_double_worded_with_quetou = create_mix(mianzi_double_worded, quetou_worded);
/** 字牌三面子+雀头组合 */
mianzi_triple_worded_with_quetou = create_mix(mianzi_triple_worded, quetou_worded);
/** 字牌四面子+雀头组合 */
mianzi_quadruple_worded_with_quetou = create_mix(mianzi_quadruple_worded, quetou_worded);

fs.writeFileSync('./data/清一色和牌型.txt', "mianzi_double_colored=" + JSON.stringify(mianzi_double_colored) + ";\n" + "mianzi_triple_colored=" + JSON.stringify(mianzi_triple_colored) + ";\n" + "mianzi_quadruple_colored=" + JSON.stringify(mianzi_quadruple_colored) + ";\n" + "mianzi_double_worded=" + JSON.stringify(mianzi_double_worded) + ";\n" + "mianzi_triple_worded=" + JSON.stringify(mianzi_triple_worded) + ";\n" + "mianzi_quadruple_worded=" + JSON.stringify(mianzi_quadruple_worded) + ";\n" + "mianzi_single_colored_with_quetou=" + JSON.stringify(mianzi_single_colored_with_quetou) + ";\n" + "mianzi_double_colored_with_quetou=" + JSON.stringify(mianzi_double_colored_with_quetou) + ";\n" + "mianzi_triple_colored_with_quetou=" + JSON.stringify(mianzi_triple_colored_with_quetou) + ";\n" + "mianzi_quadruple_colored_with_quetou=" + JSON.stringify(mianzi_quadruple_colored_with_quetou) + ";\n" + "mianzi_single_worded_with_quetou=" + JSON.stringify(mianzi_single_worded_with_quetou) + ";\n" + "mianzi_double_worded_with_quetou=" + JSON.stringify(mianzi_double_worded_with_quetou) + ";\n" + "mianzi_triple_worded_with_quetou=" + JSON.stringify(mianzi_triple_worded_with_quetou) + ";\n" + "mianzi_quadruple_worded_with_quetou=" + JSON.stringify(mianzi_quadruple_worded_with_quetou) + ";");