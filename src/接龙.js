function jielong_function() {
	if (message.substr(2, 2) == "创建")
		return create_new_jielong(catch_content(4));
	if (message.substr(2, 2) == "删除")
		return clear_jielong(catch_content(4));
	let jielong_name = message.substr(2, 2);
	if (!jielong_dict[jielong_name])
		return "这串接龙不存在呢~";
	return do_new_jielong(jielong_name, catch_content(4));
}

function clear_jielong(jielong_name) {
	if (!jielong_dict[jielong_name])
		return "这串接龙不存在呢~";
	delete jielong_dict[jielong_name];
	return jielong_name + "接龙词已经不存在啦~";
}

function create_new_jielong(order_string) {
	let order_name = "";
	let order_detail = "";
	let i = -1;
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；")
			break;
		else
			order_name += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；")
			break;
		else
			order_detail += order_string[i];
	if (order_name == "创建")
		return "创建关键词不能作为接龙词哦~";
	if (order_name == "删除")
		return "删除关键词不能作为接龙词哦~";
	if (order_name.length != 2)
		return "接龙词一定是两个汉字的哦~";
	if (jielong_dict[order_name])
		return "这串接龙已经被定义过了呢~";
	jielong_dict[order_name] = order_detail;
	fs.writeFileSync('./接龙词.js', "jielong_dict=" + JSON.stringify(jielong_dict));
	return "新的接龙词:" + order_name + "，创建成功！";
}

function do_new_jielong(jielong_name, str) {
	let i = jielong_dict[jielong_name].indexOf(str);
	if (i < jielong_dict[jielong_name].length - 1)
		return "kou执行js \"jl" + jielong_name + " " + jielong_dict[jielong_name][i + 1] + "\"";
	else
		return "接龙大成功！"
}