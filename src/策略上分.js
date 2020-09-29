function 策略上分(accounts, max_score, possitivity) {
	let this_fen = random(possitivity - max_score, possitivity + max_score);
	let change_account = 0;
	if (accounts[0] <= accounts[1]) {
		change_account = 1;
		if (accounts[0] + this_fen < 0)
			accounts[0] = 0;
		else
			accounts[0] += this_fen;
	}
	else {
		change_account = 2;
		if (accounts[1] + this_fen < 0)
			accounts[1] = 0;
		else
			accounts[1] += this_fen;
	}
	return "account_" + change_account + "上了" + this_fen + "分~";
}

function 上分时间(target, possitivity = 0, max_score = 100) {
	let times = 0;
	let accounts = [0, 0];
	while (accounts[0] < target && accounts[1] < target && times < 100000000) {
		策略上分(accounts, max_score, possitivity);
		++times;
	}
	if (times >= 100000000)
		return "按照两个号只打低分号原则，每次分数最大变化" + max_score + "分，正和" + possitivity + "分上分到" + target + "分要超过100000000次~";
	return "按照两个号只打低分号原则，每次分数最大变化" + max_score + "分，正和" + possitivity + "分上分到" + target + "分需要" + times + "次~";
}

function 上分分析(order_string) {
	let target = "";
	let possitivity = "";
	let max_score = "";
	let i = 0;
	for (i = 0; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " ")
			break;
		else
			target += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " ")
			break;
		else
			possitivity += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " ")
			break;
		else
			max_score += order_string[i];
	target = parse_if_number(target);
	if (typeof (target) != "number")
		return "目标不对~";
	if (possitivity == "")
		return 上分时间(target);
	possitivity = parse_if_number(possitivity);
	if (typeof (possitivity) != "number")
		return "最大分值不对~";
	if (max_score == "")
		return 上分时间(target, possitivity);
	max_score = parse_if_number(max_score);
	if (typeof (max_score) != "number")
		return "最大分值不对~";
	return 上分时间(target, possitivity, max_score);
}

function 没策略上分(accounts, max_score, possitivity) {
	let this_fen = random(possitivity - max_score, possitivity + max_score);
	let change_account = 0;
	if (accounts[0] + this_fen < 0)
		accounts[0] = 0;
	else
		accounts[0] += this_fen;
	return "account_1上了" + this_fen + "分~";
}

function low上分时间(target, possitivity = 0, max_score = 100) {
	let times = 0;
	let accounts = [0, 0];
	while (accounts[0] < target && accounts[1] < target && times < 100000000) {
		没策略上分(accounts, max_score, possitivity);
		++times;
	}
	if (times >= 100000000)
		return "只打一个账号，每次分数最大变化" + max_score + "分，正和" + possitivity + "分上分到" + target + "分要超过100000000次~";
	return "只打一个账号，每次分数最大变化" + max_score + "分，正和" + possitivity + "分上分到" + target + "分需要" + times + "次~";
}

function low上分分析(order_string) {

	let target = "";
	let possitivity = "";
	let max_score = "";
	let i = 0;
	for (i = 0; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " ")
			break;
		else
			target += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " ")
			break;
		else
			possitivity += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " ")
			break;
		else
			max_score += order_string[i];
	target = parse_if_number(target);
	if (typeof (target) != "number")
		return "目标不对~";
	if (possitivity == "")
		return low上分时间(target);
	possitivity = parse_if_number(possitivity);
	if (typeof (possitivity) != "number")
		return "最大分值不对~";
	if (max_score == "")
		return low上分时间(target, possitivity);
	max_score = parse_if_number(max_score);
	if (typeof (max_score) != "number")
		return "最大分值不对~";
	return low上分时间(target, possitivity, max_score);
}