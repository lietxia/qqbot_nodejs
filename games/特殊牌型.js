/**
 * @模块 特殊牌型.js
 * @描述 日本麻将特殊役满牌型计分：国士无双、九莲宝灯、七对子
 */

/**
 * 计算国士无双（十三幺）的役满得分
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @param {boolean} tsumo - 是否自摸
 * @param {number} seat - 座位编号（0=亲家）
 * @param {number} ground_wind - 场风编号
 * @param {boolean} first_turn - 是否第一巡
 * @returns {string} 役满得分详情文本
 */
function kuosi_count(hand, tsumo, seat, ground_wind, first_turn) {
	let yiman_string = "", beiyiman = 0;
	if (first_turn) {
		let is_tian = ((seat === 0) ? 0 : 1);
		yiman_string += 役满列表[is_tian];
		for (let k = 0; k < 7 - 役满列表[is_tian].length; ++k)
			yiman_string += `　`;
		yiman_string += `	` + ((役满倍数[is_tian] === 1) ? "役滿" : "两倍役滿") + "\n";
		beiyiman += 役满倍数[is_tian];
	}
	if ((JSON.stringify(hand) === "[[1,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,0,0]]") || (JSON.stringify(hand) === "[[1,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1]]")) {
		let kuosi_place = 役满列表.indexOf("國士無雙十三面");
		yiman_string += 役满列表[kuosi_place];
		for (let k = 0; k < 7 - 役满列表[kuosi_place].length; ++k)
			yiman_string += `　`;
		yiman_string += `	` + ((役满倍数[kuosi_place] === 1) ? "役滿" : "两倍役滿") + "\n";
		beiyiman += 役满倍数[kuosi_place];
	}
	else {
		let kuosi_place = 役满列表.indexOf("國士無雙");
		yiman_string += 役满列表[kuosi_place];
		for (let k = 0; k < 7 - 役满列表[kuosi_place].length; ++k)
			yiman_string += `　`;
		yiman_string += `	` + ((役满倍数[kuosi_place] === 1) ? "役滿" : "两倍役滿") + "\n";
		beiyiman += 役满倍数[kuosi_place];
	}
	yiman_string += 25 + "符" + (beiyiman * 13) + "翻" + `	` + beiyiman + "倍役滿\n";
	yiman_string += "(" + z_crr[ground_wind] + "場" + z_crr[seat] + "家)" + `	`;
	if (seat === 0)
		yiman_string += tsumo ? ((16000 * beiyiman) + "點all") : ("銃和" + (48000 * beiyiman) + "點");
	else
		yiman_string += tsumo ? ("闲家" + (8000 * beiyiman) + "點，亲家" + (16000 * beiyiman) + "點") : ("銃和" + (32000 * beiyiman) + "點");
	return yiman_string;
}

/**
 * 计算九莲宝灯的役满得分（含纯正九莲宝灯判定和符计算）
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @param {number} hold - 和牌位置编码
 * @param {boolean} tsumo - 是否自摸
 * @param {number} seat - 座位编号（0=亲家）
 * @param {number} ground_wind - 场风编号
 * @param {boolean} first_turn - 是否第一巡
 * @returns {string} 役满得分详情文本
 */
function jiulian_count(hand, hold, tsumo, seat, ground_wind, first_turn) {
	let yiman_string = "", beiyiman = 0, fu = 20;
	if (first_turn) {
		let is_tian = ((seat === 0) ? 0 : 1);
		yiman_string += 役满列表[is_tian];
		for (let k = 0; k < 6 - 役满列表[is_tian].length; ++k)
			yiman_string += `　`;
		yiman_string += `	` + ((役满倍数[is_tian] === 1) ? "役滿" : "两倍役滿") + "\n";
		beiyiman += 役满倍数[is_tian];
	}
	if ((JSON.stringify(hand[0]) === "[3,1,1,1,1,1,1,1,3]") || (JSON.stringify(hand[1]) === "[3,1,1,1,1,1,1,1,3]") || (JSON.stringify(hand[2]) === "[3,1,1,1,1,1,1,1,3]")) {
		let jiulian_place = 役满列表.indexOf("純正九蓮寶燈");
		yiman_string += 役满列表[jiulian_place];
		for (let k = 0; k < 6 - 役满列表[jiulian_place].length; ++k)
			yiman_string += `　`;
		yiman_string += `	` + ((役满倍数[jiulian_place] === 1) ? "役滿" : "两倍役滿") + "\n";
		beiyiman += 役满倍数[jiulian_place];
		switch (hold % 9) {
			case 0:
			case 2:
			case 3:
			case 5:
			case 6:
			case 8: fu = (tsumo ? 30 : 40); break;
			case 1:
			case 4:
			case 7: fu = (tsumo ? 40 : 50); break;
		}
	}
	else {
		let jiulian_place = 役满列表.indexOf("九蓮寶燈");
		yiman_string += 役满列表[jiulian_place];
		for (let k = 0; k < 6 - 役满列表[jiulian_place].length; ++k)
			yiman_string += `　`;
		yiman_string += `	` + ((役满倍数[jiulian_place] === 1) ? "役滿" : "两倍役滿") + "\n";
		beiyiman += 役满倍数[jiulian_place];
		let the_paixing = mianzi_decompose(hand, hold)[0];
		for (let i = 0; i < the_paixing.length; ++i)
			switch (the_paixing[i].length) {
				case 5: fu += 2;
				case 3: break;
				case 4: if ((the_paixing[i].slice(0, 3) === "111") || (the_paixing[i].slice(0, 3) === "999")) fu += 8; break;
				case 6: switch (the_paixing[i].slice(0, 2)) {
						case "12":
						case "13":
						case "24":
						case "35":
						case "46":
						case "57":
						case "68":
						case "79":
						case "89": fu += 2; break;
						case "11":
						case "99": fu += (tsumo ? 8 : 4); break;
					}
			}
		if (!tsumo)
			fu += 10;
		fu = Math.ceil(fu / 10) * 10;
	}
	yiman_string += fu + "符" + (beiyiman * 13) + "翻" + `	` + beiyiman + "倍役滿\n";
	yiman_string += "(" + z_crr[ground_wind] + "場" + z_crr[seat] + "家)" + `	`;
	if (seat === 0)
		yiman_string += tsumo ? ((16000 * beiyiman) + "點all") : ("銃和" + (48000 * beiyiman) + "點");
	else
		yiman_string += tsumo ? ("闲家" + (8000 * beiyiman) + "點，亲家" + (16000 * beiyiman) + "點") : ("銃和" + (32000 * beiyiman) + "點");
	return yiman_string;
}

/**
 * 计算七对子的得分（含断幺九、混一色、清一色等役判定）
 * @param {number[][]} hand - 手牌数组（4花色×9/7）
 * @param {number} dora - 宝牌数量
 * @param {number} red_dora - 赤宝牌数量
 * @param {number} li_dora - 里宝牌数量
 * @param {number} bei_dora - 北宝牌数量
 * @param {boolean} tsumo - 是否自摸
 * @param {number} seat - 座位编号（0=亲家）
 * @param {number} ground_wind - 场风编号
 * @param {boolean} reached - 是否立直
 * @param {boolean} wreached - 是否两立直
 * @param {boolean} yifa - 是否一发
 * @param {boolean} last_turn - 是否最后巡
 * @param {boolean} first_turn - 是否第一巡
 * @param {boolean} linshang - 是否岭上开花
 * @returns {string} 得分详情文本
 */
function qidui_count(hand, dora, red_dora, li_dora, bei_dora, tsumo, seat, ground_wind, reached, wreached, yifa, last_turn, first_turn, linshang) {
	let yaojiu_amount = 0, zi_amount = 0, color_list = [false, false, false, false], menqing = true;
	for (let i = 0; i < 4; ++i)
		for (let j = 0; j < ((i === 3) ? 7 : 9); ++j)
			if (hand[i][j] > 0) {
				if (i === 3)
					zi_amount += hand[i][j];
				else if (j === 0 || j === 8)
					yaojiu_amount += hand[i][j];
				color_list[i] = true;
			}
	let yizhong_list = ["七對子"], yiman_list = [], fu = 25, fan = 2 + dora + red_dora + li_dora + bei_dora, beiyiman = 0;
	if (reached) { yizhong_list.push("立直"); fan += 1; }
	if (yifa) { yizhong_list.push("一発"); fan += 1; }
	if (menqing && tsumo) { yizhong_list.push("門前清自摸和"); fan += 1; }
	if (yaojiu_amount === 0 && zi_amount === 0) { yizhong_list.push("斷幺九"); fan += 1; }
	if (linshang) { yizhong_list.push("嶺上開花"); fan += 1; }
	if (last_turn && tsumo) { yizhong_list.push("海底摸月"); fan += 1; }
	if (last_turn && !tsumo) { yizhong_list.push("河底撈魚"); fan += 1; }
	if (wreached) { yizhong_list.push("兩立直"); fan += 2; }
	if ((yaojiu_amount + zi_amount) === 14 && zi_amount > 0) { yizhong_list.push("混老頭"); fan += 2; }
	if (color_list[3] && (((!color_list[0]) && (!color_list[1])) || ((!color_list[1]) && (!color_list[2])) || ((!color_list[2]) && (!color_list[0])))) { yizhong_list.push("混一色"); fan += ((menqing) ? 3 : 2); }
	if ((!color_list[3]) && (((!color_list[0]) && (!color_list[1])) || ((!color_list[1]) && (!color_list[2])) || ((!color_list[2]) && (!color_list[0])))) { yizhong_list.push("清一色"); fan += ((menqing) ? 6 : 5); }
	if (first_turn && tsumo && (seat === 0)) { yiman_list.push("天和"); beiyiman += 1; }
	if (first_turn && tsumo && (seat != 0)) { yiman_list.push("地和"); beiyiman += 1; }
	if (zi_amount === 14) { yiman_list.push("字一色"); beiyiman += 1; }
	let jizhundian = fu * (2 ** (2 + fan));
	if (yiman_list.length > 0)
		return yiman_result(yiman_list, beiyiman, fu, seat, ground_wind, tsumo);
	else
		return yizhong_result(yizhong_list, fan, fu, jizhundian, dora, red_dora, li_dora, bei_dora, seat, ground_wind, tsumo, menqing);
}
