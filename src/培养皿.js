
/*基础个人设置*/

initial_amount = 25;
initial_attack = 10;
initial_defend = 5;
initial_health = 50;
initial_max_health = 100;
initial_restore = 50;
initial_critical = 0;
initial_critical_chance = 0;
initial_row_aoe_chance = 1;
initial_column_aoe_chance = 0;
initial_points = 100;
initial_attack_chance = 20;
initial_reproduce_chance = 1;
initial_restore_chance = 20;

/*环境变量*/

get_point_chance = 0.1;
change_gap = 0.05;

min_damage_decrease = 1;
max_damage_decrease = 10;
damage_decrease_change_chance = 0.05;
damage_decrease_change_lower = 0.02;
damage_decrease_change_upper = damage_decrease_change_lower + Math.E ** (-total_amount / 2000);

min_miss_chance = 0;
max_miss_chance = 10;
miss_chance_change_chance = 0.02;
miss_chance_change_upper = 0.9;
miss_chance_change_lower = 0.1;

min_reproduce_rate = 5;
max_reproduce_rate = 10;
reproduce_change_chance = 0.1;
reproduce_change_upper = 0.9;
reproduce_change_lower = 0.1;

min_restore_rate = 2;
max_restore_rate = 10;
restore_change_chance = 0.1;
restore_change_upper = 0.8;
restore_change_lower = 0.2;

environment_talent_change_rate = 0.01;

/*环境常量*/

point_ratio = 200;
reproduce_ratio = 35000;
term_max = { "attack_chance": 65, "reproduce_chance": 90, "restore_chance": 80, "critical_chance": 80, "column_aoe_chance": 5, "row_aoe_chance": 5 };

/*基本设置*/

leading_board_amount = 8;
term_list = ["攻击力", "防御力", "最大生命值", "恢复量", "暴击力", "攻击率", "繁殖率", "恢复率", "暴击率", "全体攻击率", "同族攻击率", "天赋", "弱点"];
term_trans_list = ["attack", "defend", "max_health", "restore", "critical", "attack_chance", "reproduce_chance", "restore_chance", "critical_chance", "column_aoe_chance", "row_aoe_chance", "talent", "weakness"];
talent_weakness_list = ["酸", "碱", "光", "磁", "电", "火", "核"]
max_talent_weakness = talent_weakness_list.length;
property_amount = 5;
max_possess = 5;
newborn_amount = 100;
debuff_amount = 100;
max_amount = 200;

function change_invalid_cell() {
	for (let i = 0; i < cell_status.length; ++i)
		for (let j = 0; j < term_list.length; ++j)
			if (cell_status[i][term_trans_list[j]] < 0)
				cell_status[i][term_trans_list[j]] = 0;
	return true;
}

function change_environment() {
	damage_decrease_change_upper = damage_decrease_change_lower + Math.E ** (-total_amount / 2000);
	if (damage_decrease_ratio <= min_damage_decrease)
		damage_decrease_ratio += change_gap;
	else if (damage_decrease_ratio >= max_damage_decrease)
		damage_decrease_ratio -= change_gap;
	else
		damage_decrease_ratio += (random_bool(damage_decrease_trend) ? change_gap : (0 - change_gap));
	if (damage_decrease_ratio <= min_damage_decrease + damage_decrease_change_lower * (max_damage_decrease - min_damage_decrease))
		damage_decrease_trend = 0.5 + damage_decrease_change_chance;
	if (damage_decrease_ratio >= min_damage_decrease + damage_decrease_change_upper * (max_damage_decrease - min_damage_decrease))
		damage_decrease_trend = 0.5 - damage_decrease_change_chance;

	if (miss_chance <= min_miss_chance)
		miss_chance += change_gap;
	else if (miss_chance >= max_miss_chance)
		miss_chance -= change_gap;
	else
		miss_chance += (random_bool(miss_chance_trend) ? change_gap : (0 - change_gap));
	if (miss_chance <= min_miss_chance + miss_chance_change_lower * (max_miss_chance - min_miss_chance))
		miss_chance_trend = 0.5 + miss_chance_change_chance;
	if (miss_chance >= min_miss_chance + miss_chance_change_upper * (max_miss_chance - min_miss_chance))
		miss_chance_trend = 0.5 - miss_chance_change_chance;

	if (reproduce_rate <= min_reproduce_rate)
		reproduce_rate += change_gap;
	else if (reproduce_rate >= max_reproduce_rate)
		reproduce_rate -= change_gap;
	else
		reproduce_rate += (random_bool(reproduce_rate_trend) ? change_gap : (0 - change_gap));
	if (reproduce_rate <= min_reproduce_rate + reproduce_change_lower * (max_reproduce_rate - min_reproduce_rate))
		reproduce_rate_trend = 0.5 + reproduce_change_chance;
	if (reproduce_rate >= min_reproduce_rate + reproduce_change_upper * (max_reproduce_rate - min_reproduce_rate))
		reproduce_rate_trend = 0.5 - reproduce_change_chance;

	if (reproduce_rate <= min_restore_rate)
		restore_rate += change_gap;
	else if (restore_rate >= max_restore_rate)
		restore_rate -= change_gap;
	else
		restore_rate += (random_bool(restore_rate_trend) ? change_gap : (0 - change_gap));
	if (restore_rate <= min_restore_rate + restore_change_lower * (max_restore_rate - min_restore_rate))
		restore_rate_trend = 0.5 + restore_change_chance;
	if (restore_rate >= min_restore_rate + restore_change_upper * (max_restore_rate - min_restore_rate))
		restore_rate_trend = 0.5 - restore_change_chance;

	if (random_bool(environment_talent_change_rate))
		environment_talent = random_decrease(0, max_talent_weakness);
	return true;
}

function reset_cell() {
	total_amount = 0;
	cell_health_list = [];
	cell_status = [];
	user_dict = {};
	cell_dict = {};
	miss_chance = 1;
	damage_decrease_ratio = 3;
	return "服务器已重启~";
}

function environment_cell() {
	return "当前的环境是:\n减伤率:" + Math.floor((1 - 1 / damage_decrease_ratio) * 100) + "%\n闪避率:" + (Math.floor(miss_chance * 100) / 100) + "%\n环境繁殖率:" + Math.floor(reproduce_rate * 10) + "%\n环境恢复率:" + Math.floor(restore_rate * 10) + "%\n环境属性:" + talent_weakness_list[environment_talent] + ".";
}

function possess_cell() {
	if (user_dict[id] == null || user_dict[id]["cells_id"].length == 0)
		return "你还没有培养细胞呢~";
	let possess_string = "你培养了这些细胞哦:\n"
	for (let i = 0; i < user_dict[id]["cells_id"].length; ++i)
		possess_string += cell_status[user_dict[id]["cells_id"][i]]["name"] + "\n";
	return possess_string;
}

function leading_board_cell() {
	let sort_health = [];
	let board_string = "细胞战争排行榜:\n";
	for (let i = 0; i < cell_health_list.length; ++i)
		if (cell_health_list[i].length > 0)
			sort_health.push([cell_health_list[i].length, i]);
	sort_health.sort((a, b) => (b[0] - a[0]));
	for (let i = 0; i < sort_health.length && i < leading_board_amount; ++i)
		board_string += (i + 1) + ". " + cell_status[sort_health[i][1]]["name"] + "(主人:" + user_dict[cell_status[sort_health[i][1]]["user"]]["user_name"] + ")存活" + cell_status[sort_health[i][1]]["amount"] + "个\n";
	board_string += (sort_health.length > leading_board_amount) ? ("...\n最多显示前" + leading_board_amount + "名哦~\n") : "";
	return board_string + "总共" + sort_health.length + "种细胞存活呢~";
}

function create_cell(name) {
	if (cell_dict[name] != null && cell_dict[name] != -1)
		return "这个细胞的名字已经被其它玩家占用了哦~";
	if (name.length > 10)
		return "这个名字太长啦~";
	let cell_id = cell_status.length;
	cell_dict[name] = cell_id;
	if (user_dict[id] == null)
		user_dict[id] = { "user_name": nickname, "cells_id": [] };
	if (user_dict[id]["cells_id"].length > max_possess - 1)
		return "你培养了太多种类的细胞呢~";
	user_dict[id]["cells_id"].push(cell_id);
	cell_status[cell_id] = { "name": name, "user": id, "attack": initial_attack, "defend": initial_defend, "max_health": initial_max_health, "restore": initial_restore, "critical": initial_critical, "critical_chance": initial_critical_chance, "row_aoe_chance": initial_row_aoe_chance, "column_aoe_chance": initial_column_aoe_chance, "points": initial_points, "attack_chance": initial_attack_chance, "reproduce_chance": initial_reproduce_chance, "restore_chance": initial_restore_chance, "amount": initial_amount, "talent": random_decrease(0, max_talent_weakness), "weakness": random_decrease(0, max_talent_weakness), "reproduce_time": 0 };
	cell_health_list[cell_id] = [];
	for (let i = 0; i < initial_amount; ++i)
		cell_health_list[cell_id].push(initial_health);
	total_amount += initial_amount;
	return name + "细胞已经放入培养皿了哦~\n" + show_cell(cell_id);
}

function clear_abandoned_cell() {
	for (let i = 0; i < cell_health_list.length; ++i) {
		if (not_abandoned_cell(i))
			continue;
		let cell_clear_id = i;
		cell_health_list.splice(cell_clear_id, 1);
		cell_status.splice(cell_clear_id, 1);
		for (let j in user_dict)
			for (let k = 0; k < user_dict[j]["cells_id"].length; ++k)
				if (user_dict[j]["cells_id"][k] > cell_clear_id)
					user_dict[j]["cells_id"][k] -= 1;
		i -= 1;
	}
	return true;
}

function not_abandoned_cell(i) {
	for (let name in cell_dict)
		if (cell_dict[name] == i)
			return true;
	return false;
}

function abandon_cell(name) {
	if (cell_dict[name] == null || cell_dict[name] == -1)
		return name + "还没有成为细胞呢~";
	let cell_id = cell_dict[name];
	if (user_dict[id]["cells_id"].indexOf(cell_id) < 0)
		return "这不是你培养的细胞呢~";
	total_amount -= cell_health_list[cell_id].length;
	cell_health_list[cell_id] = [];
	cell_status[cell_id][name] = "已放弃(" + name + ")";
	user_dict[id]["cells_id"].splice(user_dict[id]["cells_id"].indexOf(cell_id), 1);
	cell_dict[name] = -1;
	return name + "细胞已经被你移出培养皿了哦~\n" + show_cell(cell_id);
}

function show_term(cell_id, term_id) {
	if (term_id >= term_list.length)
		return "";
	if (term_id < 5)
		return term_list[term_id] + ":" + cell_status[cell_id][term_trans_list[term_id]];
	if (term_id < 11)
		return term_list[term_id] + ":" + cell_status[cell_id][term_trans_list[term_id]] + "%";
	return term_list[term_id] + ":" + talent_weakness_list[cell_status[cell_id][term_trans_list[term_id]]];
}

function induct_term(cell_id, term_id) {
	if (term_id >= term_list.length)
		return "";
	return show_term(cell_id, term_id) + "\n" + induct_term(cell_id, term_id + 1);
}

function check_cell(name) {
	if (cell_dict[name] == null || cell_dict[name] == -1)
		return name + "还没有成为细胞呢~";
	return show_cell(cell_dict[name]);
}

function show_cell(cell_id) {
	return cell_status[cell_id]["name"] + "细胞的当前状态为:\n" + induct_term(cell_id, 0) + "总数量:" + cell_status[cell_id]["amount"] + "\n繁殖次数:" + cell_status[cell_id]["reproduce_time"] + "\n剩余提升点:" + cell_status[cell_id]["points"];
}

function improve_cell(name, detail) {
	let term = "";
	let point = 0;
	let i = 0;
	for (i = 0; i < detail.length; ++i)
		if (detail[i] >= "0" && detail[i] <= "9")
			break;
		else
			term += detail[i];
	for (; i < detail.length; ++i)
		if (detail[i] < "0" || detail[i] > "9")
			return "命令有问题呢……";
		else
			point = 10 * point + (detail[i] - "0");
	return allocate_cell(name, term, point);
}

function deprove_cell(name, detail) {
	let term = "";
	let point = 0;
	let i = 0;
	for (i = 0; i < detail.length; ++i)
		if (detail[i] >= "0" && detail[i] <= "9")
			break;
		else
			term += detail[i];
	for (; i < detail.length; ++i)
		if (detail[i] < "0" || detail[i] > "9")
			return "命令有问题呢……";
		else
			point = 10 * point + (detail[i] - "0");
	return allocate_cell(name, term, 0 - point);
}

function allocate_cell(name, term, point) {
	if (cell_dict[name] == null || cell_dict[name] == -1)
		return name + "还没有成为细胞呢~";
	let cell_id = cell_dict[name];
	if (user_dict[id]["cells_id"].indexOf(cell_id) < 0)
		return "这不是你培养的细胞呢~";
	let term_id = term_list.indexOf(term);
	if (term_id < 0)
		return "没有这种属性呢~";
	if (cell_status[cell_id]["points"] < point)
		return "提升点不够呢~";
	if (term_id >= property_amount && point < 0)
		return "这种属性不能降低呢~";
	if (term_id < property_amount)
		cell_status[cell_id][term_trans_list[term_id]] += point;
	else {
		if (cell_status[cell_id][term_trans_list[term_id]] >= term_max[term_trans_list[term_id]])
			cell_status[cell_id][term_trans_list[term_id]] = term_max[term_trans_list[term_id]];
		else
			cell_status[cell_id][term_trans_list[term_id]] = Math.floor((term_max[term_trans_list[term_id]] - term_max[term_trans_list[term_id]] * (Math.E ** (Math.log((term_max[term_trans_list[term_id]] - cell_status[cell_id][term_trans_list[term_id]]) / term_max[term_trans_list[term_id]]) - point / point_ratio))) * 100) / 100;
	}
	if (point > 0)
		cell_status[cell_id]["points"] -= point;
	return cell_status[cell_id]["name"] + "细胞的" + term_list[term_id] + "改变了呢,现在是:" + cell_status[cell_id][term_trans_list[term_id]] + (term_id >= 5 ? "%" : "");
}

function do_turn_cell() {
	do_cell_damage_list = determine_all_attack();
	do_cell_reproduce_list = determine_reproduce();
	do_cell_restore_list = determine_restore();
	change_invalid_cell();
	do_catastrophe();
	do_attack(do_cell_damage_list, do_cell_reproduce_list);
	do_restore(do_cell_restore_list);
	do_reproduce(do_cell_reproduce_list);
	clear_death();
	//clear_abandoned_cell();
	get_point();
	change_environment();
	return true;
}

function do_catastrophe() {
	for (let i = 0; i < cell_health_list.length; ++i)
		if (cell_health_list[i].length > 0 && cell_status[i]["weakness"] == environment_talent)
			for (let j = 0; j < cell_health_list[i].length; ++j)
				if (random_bool(1 - Math.E ** (0 - cell_status[i]["reproduce_time"] / 3000)) && random_bool(cell_status[i]["reproduce_chance"]) && random_bool(cell_status[i]["restore_chance"]) && random_bool(Math.E ** (0 - cell_status[i]["defend"] / 3000)))
					cell_health_list[i][j] = Math.floor(cell_health_list[i][j] * (Math.E ** (0 - cell_status[i]["max_health"] / 300))) + 1;
	return true;
}

function cell_write_file() {
	return "total_amount=" + total_amount + ";\n" + "cell_health_list=" + JSON.stringify(cell_health_list) + ";\n" + "cell_status=" + JSON.stringify(cell_status) + ";\n" + "do_cell_damage_list=" + JSON.stringify(do_cell_damage_list) + ";\n" + "do_cell_reproduce_list=" + JSON.stringify(do_cell_reproduce_list) + ";\n" + "do_cell_restore_list=" + JSON.stringify(do_cell_restore_list) + ";\n" + "cell_status=" + JSON.stringify(cell_status) + ";\n" + "cell_status=" + JSON.stringify(cell_status) + ";\n" + "cell_status=" + JSON.stringify(cell_status) + ";\n" + "user_dict=" + JSON.stringify(user_dict) + ";\n" + "cell_dict=" + JSON.stringify(cell_dict) + ";\n" + "miss_chance=" + miss_chance + ";\n" + "damage_decrease_ratio=" + damage_decrease_ratio + ";\n" + "damage_decrease_trend=" + damage_decrease_trend + ";\n" + "miss_chance_trend=" + miss_chance_trend + ";\n" + "reproduce_rate=" + reproduce_rate + ";\n" + "reproduce_rate_trend=" + reproduce_rate_trend + ";\n" + "restore_rate=" + restore_rate + ";\n" + "restore_rate_trend=" + restore_rate_trend + ";\n" + "environment_talent=" + environment_talent + ";";
}

function determine_reproduce() {
	let cell_reproduce_list = [];
	for (let i = 0; i < cell_health_list.length; ++i) {
		cell_reproduce_list[i] = [];
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if (cell_health_list[i][j] == cell_status[i]["max_health"] && !cell_overload(i) && random_bool(reproduce_rate / 10) && random_bool(cell_status[i]["reproduce_chance"] / 100) && random_bool(Math.E ** (0 - cell_status[i]["reproduce_time"] / reproduce_ratio)))
				cell_reproduce_list[i][j] = true;
			else
				cell_reproduce_list[i][j] = false;
	}
	return cell_reproduce_list;
}

function cell_newborn(cell_id) {
	return cell_status[cell_id]["reproduce_time"] < newborn_amount;
}

function cell_debuff(cell_id) {
	return cell_status[cell_id]["amount"] >= debuff_amount;
}

function cell_overload(cell_id) {
	return cell_status[cell_id]["amount"] >= max_amount;
}

function initialize_damage_list() {
	let cell_damage_list = [];
	for (let i = 0; i < cell_health_list.length; ++i) {
		cell_damage_list[i] = [];
		for (let j = 0; j < cell_health_list[i].length; ++j)
			cell_damage_list[i][j] = 0;
	}
	return cell_damage_list;
}

function determine_damage(cell_id, cell_body, attack_id, attack_target, damage_list) {
	let cell_damage_list = JSON.parse(JSON.stringify(damage_list));
	let damage = Math.floor((random(cell_status[cell_id]["attack"] / 2, cell_status[cell_id]["attack"]) - cell_status[attack_id]["defend"]) / damage_decrease_ratio);
	if (cell_newborn(attack_id) && damage > 0)
		damage = 1;
	if (cell_debuff(attack_id))
		damage = damage * damage;
	if (cell_status[cell_id]["talent"] == cell_status[attack_id]["weakness"])
		damage = damage * damage;
	if (damage < 0 || random_bool(miss_chance / 100))
		damage = 0;
	if (random_bool(cell_status[cell_id]["critical_chance"] / 100))
		cell_damage_list[attack_id][attack_target] += damage + random_decrease(1, 2 + cell_status[cell_id]["critical"]) * damage;
	else
		cell_damage_list[attack_id][attack_target] += damage;
	return cell_damage_list;
}

function determine_attack(cell_id, cell_body, damage_list) {
	let cell_damage_list = JSON.parse(JSON.stringify(damage_list));
	if (!random_bool(cell_status[cell_id]["attack_chance"] / 100) || !random_bool(Math.E ** (0 - cell_status[cell_id]["reproduce_time"] / reproduce_ratio)))
		return cell_damage_list;
	let attack_target = random(0, total_amount);
	let attack_id = 0;
	for (attack_id = 0; attack_target >= cell_health_list[attack_id].length; ++attack_id)
		attack_target -= cell_health_list[attack_id].length;
	if (attack_id == cell_id)
		return cell_damage_list;
	if (random_bool(cell_status[cell_id]["row_aoe_chance"] / 100)) {
		for (let i = 0; i < cell_health_list[attack_id].length; ++i)
			cell_damage_list = determine_damage(cell_id, cell_body, attack_id, i, cell_damage_list);
	}
	else if (random_bool(cell_status[cell_id]["column_aoe_chance"] / 100)) {
		for (let i = 0; i < cell_health_list.length; ++i)
			if (i != cell_id && cell_health_list[i].length > 0)
				cell_damage_list = determine_damage(cell_id, cell_body, i, 0, cell_damage_list);
	}
	else
		cell_damage_list = determine_damage(cell_id, cell_body, attack_id, attack_target, cell_damage_list);
	return cell_damage_list;
}

function determine_all_attack() {
	let cell_damage_list = initialize_damage_list();
	for (let i = 0; i < cell_health_list.length; ++i)
		for (let j = 0; j < cell_health_list[i].length; ++j)
			cell_damage_list = determine_attack(i, j, cell_damage_list);
	return cell_damage_list;
}

function determine_restore() {
	let cell_restore_list = [];
	for (let i = 0; i < cell_health_list.length; ++i) {
		cell_restore_list[i] = [];
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if (cell_health_list[i][j] < cell_status[i]["max_health"] && !cell_overload(i) && random_bool(restore_rate / 10) && random_bool(cell_status[i]["restore_chance"] / 100))
				cell_restore_list[i][j] = (cell_newborn(i)) ? Math.floor(cell_status[i]["max_health"] / 2) : Math.floor((cell_debuff(i) ? (1 / 5) : 1) * cell_status[i]["restore"]);
			else
				cell_restore_list[i][j] = 0;
	}
	return cell_restore_list;
}

function do_attack(cell_damage_list, cell_reproduce_list) {
	for (let i = 0; i < cell_health_list.length; ++i)
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if (!cell_reproduce_list[i][j])
				cell_health_list[i][j] -= cell_damage_list[i][j];
	return true;
}

function do_restore(cell_restore_list) {
	for (let i = 0; i < cell_health_list.length; ++i)
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if (cell_health_list[i][j] > 0) {
				cell_health_list[i][j] += cell_restore_list[i][j];
				if (cell_health_list[i][j] > cell_status[i]["max_health"])
					cell_health_list[i][j] = cell_status[i]["max_health"];
			}
	return true;
}

function do_reproduce(cell_reproduce_list) {
	for (let i = 0; i < cell_health_list.length; ++i)
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if (cell_reproduce_list[i][j]) {
				cell_health_list[i][j] = Math.ceil(cell_health_list[i][j] / 2);
				cell_health_list[i].push(cell_health_list[i][j]);
				++cell_status[i]["amount"];
				++total_amount;
				++cell_status[i]["reproduce_time"];
			}
	return true;
}

function clear_death() {
	for (let i = 0; i < cell_health_list.length; ++i) {
		let cell_death = [];
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if (cell_health_list[i][j] <= 4)
				cell_death.push(j);
		let dead_amount = cell_death.length;
		for (let k = 0; k < cell_death.length; ++k)
			cell_health_list[i].splice(cell_death[dead_amount - k - 1], 1);
		cell_status[i]["amount"] -= dead_amount;
		total_amount -= dead_amount;
	}
	return true;
}

function get_point() {
	for (let i = 0; i < cell_health_list.length; ++i) {
		if (cell_status[i]["reproduce_time"] <= 2)
			cell_status[i]["points"] += 5;
		for (let j = 0; j < cell_health_list[i].length; ++j)
			if ((cell_health_list[i][j] >= (cell_status[i]["max_health"] * 2 / 3)) && random_bool(get_point_chance / (10 + cell_status[i]["attack"])))
				++cell_status[i]["points"];
	}
	return true;
}