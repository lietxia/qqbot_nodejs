tree_prize_record_dict = {};

tree_upgrade_variety_list = { "树苗": ["三叶苗", "莲子苗", "松子苗"], "三叶苗": ["新草苗", "长草苗"], "莲子苗": [""] }

function create_tree_prize(id) {
	tree_prize_record_dict[id] = { "nickname": nickname, "current_height": 10, "max_prize": 2, "current_tools": [], "disposition": {}, "last_prize_time": Date.now(), "heart_amount": 0, "variety": "树苗" };
	return true;
}

function show_prize(n) {
	if (n == 0)
		return "[CQ:face,id=66]";
	else
		return n;
}

function check_prize(a, b, c) {
	if (a == b && b == c && a == 0)
		return Infinity;
	if (a == b && b == c)
		return -a;
	if (a == b)
		return a;
	if (b == c)
		return b;
	if (c == a)
		return c;
	return 0;
}

function make_prize(id) {
	if (!tree_prize_record_dict[id])
		create_tree_prize(id);
	tree_prize_record_dict[id]["last_prize_time"] = Date.now();
	let prize_table = [[], [], []];
	let prize_result = [];
	let prize_string = tree_prize_record_dict[id]["nickname"] + "的本次抽奖结果是:\n"
	for (let i = 0; i < 3; ++i)
		for (let j = 0; j < 3; ++j)
			prize_table[i][j] = random_decrease(0, tree_prize_record_dict[id]["max_prize"] + 1);
	prize_string += show_prize(prize_table[0][0]) + "—" + show_prize(prize_table[0][1]) + "—" + show_prize(prize_table[0][2]) + "\n | \\  |  / |\n" + show_prize(prize_table[1][0]) + "—" + show_prize(prize_table[1][1]) + "—" + show_prize(prize_table[1][2]) + "\n | /  |  \\ |\n" + show_prize(prize_table[2][0]) + "—" + show_prize(prize_table[2][1]) + "—" + show_prize(prize_table[2][2]) + "\n";
	prize_result.push(check_prize(prize_table[0][0], prize_table[0][1], prize_table[0][2]));
	prize_result.push(check_prize(prize_table[1][0], prize_table[1][1], prize_table[1][2]));
	prize_result.push(check_prize(prize_table[2][0], prize_table[2][1], prize_table[2][2]));
	prize_result.push(check_prize(prize_table[0][0], prize_table[1][0], prize_table[2][0]));
	prize_result.push(check_prize(prize_table[0][1], prize_table[1][1], prize_table[2][1]));
	prize_result.push(check_prize(prize_table[0][2], prize_table[1][2], prize_table[2][2]));
	prize_result.push(check_prize(prize_table[0][0], prize_table[1][1], prize_table[2][2]));
	prize_result.push(check_prize(prize_table[0][2], prize_table[1][1], prize_table[2][0]));
	prize_string += "你获得了:\n";
	let nothing = true;
	for (let i = 0; i < prize_result.length; ++i) {
		if (prize_result[i] == 0)
			continue;
		nothing = false;
		if (prize_result[i] == Infinity) {
			tree_prize_record_dict[id]["heart_amount"] += 1;
			prize_string += "一颗友谊之心[CQ:face,id=66]\n";
			continue;
		}
		tree_prize_record_dict[id]["current_tools"].push(prize_result[i]);
		prize_string += "一份" + (prize_result[i] > 0 ? "+" : "*") + (prize_result[i] ** 2 + 1) + "肥料\n";
	}
	if (nothing)
		prize_string += "运气不好，什么也没有……";
	return prize_string;
}

function upgrade_tree(id) {
	if (tree_prize_record_dict[id]["current_height"] < Math.floor(((3 * tree_prize_record_dict[id]["max_prize"]) ** (3 * tree_prize_record_dict[id]["max_prize"])) / 100))
		return "高度不够，不能升级~(下一等级需要高度:" + Math.floor(((3 * tree_prize_record_dict[id]["max_prize"]) ** (3 * tree_prize_record_dict[id]["max_prize"])) / 100) + ")";
	tree_prize_record_dict[id]["max_prize"] += 1;

	return "升级完成，现在你的小树高度是:" + tree_prize_record_dict[id]["current_height"] + "品种是:"
}