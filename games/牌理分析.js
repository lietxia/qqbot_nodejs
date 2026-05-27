/**
 * @模块 牌理分析.js
 * @描述 日本麻将牌理分析，计算13张手牌的进张枚数和14张手牌的切牌优劣排序
 */

/**
 * 计算13张手牌的进张（摸哪张牌能减少向听数）
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @returns {number[][]} 各牌进张枚数
 */
function paili_13(hand) {
	let add_choice = JSON.parse(JSON.stringify(basic_hand));
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < (i === 3 ? 7 : 9); ++j) {
			if (hand[i][j] === 4)
				continue;
			let draw_test = JSON.parse(JSON.stringify(hand));
			++draw_test[i][j];
			if (santen(draw_test) < santen(hand))
				add_choice[i][j] += 4 - hand[i][j];
		}
	return add_choice;
}

/**
 * 计算14张手牌的有效切牌（切哪张牌向听数不增加）
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @returns {number[]} 可切牌编码列表（花色×10+位置）
 */
function paili_14(hand) {
	let minus_choice = [];
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < (i === 3 ? 7 : 9); ++j) {
			if (hand[i][j] === 0)
				continue;
			let draw_test = JSON.parse(JSON.stringify(hand));
			--draw_test[i][j];
			if (santen(draw_test) <= santen(hand))
				minus_choice.push(i * 10 + j);
		}
	return minus_choice;
}

/**
 * 牌理分析主函数，根据手牌张数自动选择进张或切牌分析
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @returns {string} 牌理分析结果文本
 */
function paili(hand) {
	let try_hand = JSON.parse(JSON.stringify(hand));
	if (hand_amount(hand) % 3 === 0)
		return "";
	if (hand_amount(hand) % 3 === 1) {
		let add_choice = paili_13(hand);
		return "摸" + what_cards(add_choice) + " —— 共" + hand_amount(add_choice) + "枚";
	}
	if (hand_amount(hand) % 3 === 2) {
		let minus_choice = paili_14(hand);
		let sort_minus_choice = [];
		let paili_string = "";
		for (let i = 0; i < minus_choice.length; ++i) {
			let qiechu_hand = JSON.parse(JSON.stringify(hand));
			--qiechu_hand[Math.floor(minus_choice[i] / 10)][minus_choice[i] % 10];
			let add_choice = paili_13(qiechu_hand);
			let add_amount = hand_amount(add_choice);
			sort_minus_choice[i] = [add_amount * 100 + (99 - minus_choice[i]), Math.floor(minus_choice[i] / 10), minus_choice[i] % 10, "摸" + what_cards(add_choice) + " —— 共" + add_amount + "枚"];
		}
		sort_minus_choice.sort((a, b) => (b[0] - a[0]));
		for (let i = 0; i < sort_minus_choice.length; ++i)
			paili_string += "切" + (sort_minus_choice[i][2] + 1) + mpsz[sort_minus_choice[i][1]] + ", " + sort_minus_choice[i][3] + (i === minus_choice.length - 1 ? "." : ";\n");
		return paili_string;
	}
}

/**
 * 将手牌数组转换为手牌字符串表示（含赤宝牌标记）
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @param {boolean[]} [red_dora=[false,false,false]] - 各花色是否有赤宝牌
 * @returns {string} 手牌字符串（如"123m456p789s11z"）
 */
function convert_to_handcard(hand, red_dora = [false, false, false]) {
	let card_string = "";
	for (let i = 0; i < 4; ++i) {
		let card_length = card_string.length;
		for (let j = 0; j < (i === 3 ? 7 : 9); ++j)
			for (let k = 0; k < hand[i][j]; ++k)
				if (i < 3 && j === 4 && k === 0 && red_dora[i])
					card_string += 0;
				else
					card_string += (j + 1);
		if (card_string.length > card_length)
			card_string += mpsz[i];
	}
	return card_string;
}

/**
 * 将进张枚数数组转换为可读的牌面字符串
 * @param {number[][]} hand - 进张枚数数组（4花色×9/7）
 * @returns {string} 牌面字符串（如"258m36p147s"）
 */
function what_cards(hand) {
	let card_string = "";
	for (let i = 0; i < 4; ++i) {
		let card_length = card_string.length;
		for (let j = 0; j < (i === 3 ? 7 : 9); ++j)
			if (hand[i][j] > 0)
				card_string += (j + 1);
		if (card_string.length > card_length)
			card_string += mpsz[i];
	}
	return card_string;
}