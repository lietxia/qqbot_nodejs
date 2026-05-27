/**
 * @模块 hearthstone_function.js
 * @描述 炉石传说功能入口函数，处理炉石相关指令（写随从、查卡牌、添加绰号等）
 */
const fs = require('fs');

/**
 * 炉石传说功能入口，根据消息内容分发到对应处理函数
 * @returns {string} 回复内容
 */
function hearthstone_function() {
	if (message.slice(2, 2 + 2) === "写个") {
		if (message.slice(4, 4 + 2) === "随从") {
			let minion_result = reply_hs_minion();
			if (random_validity === false) {
				random_validity = true;
				return ((at_sender && type === "group") ? "\n" : "") + "这个随从被炸掉了……";
			}
			return ((at_sender && type === "group") ? "\n" : "") + minion_result;
		}
		if (message.slice(4, 4 + 2) === "领主")
			return ((at_sender && type === "group") ? "\n" : "") + new_lord_minion();
	}
	if (message.slice(2, 2 + 8) === "查看当前随从类型")
		return ((at_sender && type === "group") ? "\n" : "") + 查看当前种族();
	if (message.slice(2, 2 + 8) === "开启全部随从类型")
		return ((at_sender && type === "group") ? "\n" : "") + 开启全部种族();
	if (message.slice(2, 2 + 6) === "关闭随从类型")
		return ((at_sender && type === "group") ? "\n" : "") + close_hs_minion_type();
	if (message.slice(2, 2 + 4) === "查询卡牌")
		return ((at_sender && type === "group") ? "\n" : "") + 炉石卡牌(catch_content(6));
	if (message.slice(2, 2 + 4) === "添加绰号")
		return ((at_sender && type === "group") ? "\n" : "") + 添加绰号(catch_content(6));
	return "";
}

/**
 * 解析添加绰号指令
 * @param {string} order_string - 指令内容（卡牌名+绰号）
 * @returns {string} 添加结果
 */
function 添加绰号(order_string) {
	let order_name = "";
	let order_detail = "";
	let i = 0;
	for (i = 0; i < order_string.length; ++i)
		if (order_string[i] === "," || order_string[i] === ";" || order_string[i] === "，" || order_string[i] === "；")
			break;
		else
			order_name += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] === "," || order_string[i] === ";" || order_string[i] === "，" || order_string[i] === "；")
			break;
		else
			order_detail += order_string[i];
	return add_hscnn(order_name, order_detail);
}

/**
 * 添加炉石卡牌绰号并持久化到文件
 * @param {string} new_name - 卡牌正式名称
 * @param {string} new_nickname - 绰号
 * @returns {string} 添加结果提示
 */
function add_hscnn(new_name, new_nickname) {
	if (hscnn[new_nickname]) {
		if (!hscnn[new_nickname].includes(new_name))
			hscnn[new_nickname].push(new_name);
		else
			return new_name + "已经叫做" + new_nickname + "了！";
	}
	else
		hscnn[new_nickname] = [new_name];
	fs.writeFileSync('./games/hearthstone_card_nickname.js', "hscnn=" + JSON.stringify(hscnn));
	return "现在" + new_name + "又叫做" + new_nickname + "了！";
}

/**
 * 生成或指定名称创建随机随从DIY
 * @returns {string} 随从DIY结果
 */
function reply_hs_minion() {
	let minion_name = catch_content(6);
	if (minion_name === "")
		return random_bool(0.3) ? new_lord_minion() : create_new_minion("小夕子写的随从");
	return create_new_minion(minion_name);
}

/**
 * 关闭指定随从类型
 * @returns {string} 关闭结果
 */
function close_hs_minion_type() {
	let minion_type_name = catch_content(8);
	return 关闭种族(minion_type_name);
}