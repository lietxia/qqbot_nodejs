operator_list = ["+", "-", "*", "/"];
anti_operator_list = ["-", "+", "/", "*"];

function dot(n = 24, m = 4) {
	if (n < 10 || n > 999)
		return "范围是10-999~";
	if (n > 99)
		m = 5;
	let the_cards = create_cards(m);
	if (m > 5)
		while (!valid_cards(the_cards) || !valid_dot([turn_card_to_number(the_cards[0]), turn_card_to_number(the_cards[1]), turn_card_to_number(the_cards[2]), turn_card_to_number(the_cards[3]), turn_card_to_number(the_cards[4]), turn_card_to_number(the_cards[5])], n))
			the_cards = create_cards(m);
	else if (m > 4)
		while (!valid_cards(the_cards) || !valid_dot([turn_card_to_number(the_cards[0]), turn_card_to_number(the_cards[1]), turn_card_to_number(the_cards[2]), turn_card_to_number(the_cards[3]), turn_card_to_number(the_cards[4])], n))
			the_cards = create_cards(m);
	else
		while (!valid_cards(the_cards) || !valid_dot([turn_card_to_number(the_cards[0]), turn_card_to_number(the_cards[1]), turn_card_to_number(the_cards[2]), turn_card_to_number(the_cards[3])], n))
			the_cards = create_cards(m);
	return the_cards[0] + " " + the_cards[1] + " " + the_cards[2] + " " + the_cards[3] + ((m > 4) ? (" " + the_cards[4] + ((m > 5) ? (" " + the_cards[5]) : "")) : "");
}

function solve_dot(order_string) {
	let order_option = "";
	let order_detail = [""];
	let i = 0, j = 0;
	for (i = 0; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " " || order_string[i] == "\n")
			break;
		else
			order_option += order_string[i];
	++i;
	while (i < order_string.length) {
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；" || order_string[i] == " " || order_string[i] == "\n")
			order_detail[++j] = "";
		else
			order_detail[j] += order_string[i];
		++i;
	}
	order_option = parse_if_number(order_option);
	if (typeof (order_option) != "number" || order_option < 0)
		return "";
	for (let k = 0; k < order_detail.length; ++k) {
		order_detail[k] = turn_card_to_number(order_detail[k]);
		if (order_detail[k] == 0)
			return "";
	}
	if (order_detail.length > 6)
		return "超过6张牌可能会漏解哦~";
	let solve_result = valid_dot(order_detail, order_option);
	return (solve_result) ? solve_result : "无解~";
}

function create_cards(m) {
	let return_cards = [];
	for (let i = 0; i < m; ++i)
		return_cards.push(poker_colors[random(0, poker_colors.length)] + poker_numbers[random(0, poker_numbers.length)]);
	return return_cards;
}

function valid_cards(the_cards) {
	for (let i = 0; i < the_cards.length; ++i)
		for (let j = i + 1; j < the_cards.length; ++j)
			if (the_cards[i] == the_cards[j])
				return false;
	return true;
}

function turn_card_to_number(the_card) {
	switch (the_card[1]) {
		case "A": return 1;
		case "2": return 2;
		case "3": return 3;
		case "4": return 4;
		case "5": return 5;
		case "6": return 6;
		case "7": return 7;
		case "8": return 8;
		case "9": return 9;
		case "1": return 10;
		case "J": return 11;
		case "Q": return 12;
		case "K": return 13;
		default: return 0;
	}
}

function calculate_numbers(number_a, number_b, operator) {
	switch (operator) {
		case "+": return number_a + number_b;
		case "-": return number_a - number_b;
		case "*": return number_a * number_b;
		case "/": return number_a / number_b;
	}
}

function valid_dot(numbers, target) {
	if (numbers.length == 0)
		return false;
	if (numbers.length == 1)
		return ((numbers[0] - target) < 0.00000001 && (numbers[0] - target) > -0.00000001) ? numbers[0] : false;
	let power_set = [[]];
	let power_set_mark = [];
	for (let i = 0; i < numbers.length; i++)
		for (let j = 0, k = power_set.length; j < k; j++) {
			let new_item = power_set[j].concat(numbers[i]).sort((a, b) => (a - b));
			if (2 * new_item.length > numbers.length)
				continue;
			if (!power_set_mark.includes(JSON.stringify(new_item))) {
				power_set.push(new_item);
				power_set_mark.push(JSON.stringify(new_item));
			}
		}
	power_set.sort((a, b) => (a.length - b.length));
	for (let i = 1; i < power_set.length; ++i) {
		let power_set_result = dot_compose(power_set[i]);
		let remain_numbers = remove_numbers(power_set[i], numbers);
		for (let the_result in power_set_result) {
			if (the_result == "Infinity" || the_result == "0")
				continue;
			the_result = JSON.parse(the_result);
			for (let k = 0; k < operator_list.length; ++k) {
				if (valid_dot(remain_numbers, calculate_numbers(target, the_result, operator_list[k])))
					return "(" + valid_dot(remain_numbers, calculate_numbers(target, the_result, operator_list[k])) + anti_operator_list[k] + power_set_result[the_result] + ")";
				if ((k != 0 && k != 2) && valid_dot(remain_numbers, calculate_numbers(the_result, target, operator_list[k])))
					return "(" + power_set_result[the_result] + operator_list[k] + valid_dot(remain_numbers, calculate_numbers(the_result, target, operator_list[k])) + ")";
			}
		}
	}
	/*for(let i=0;i<numbers.length;++i)
	{
		let new_numbers=JSON.parse(JSON.stringify(numbers));
		new_numbers.splice(i,1);
		for(let k=0;k<operator_list.length;++k)
		{
			if(valid_dot(new_numbers,calculate_numbers(target,numbers[i],operator_list[k])))
				return "("+valid_dot(new_numbers,calculate_numbers(target,numbers[i],operator_list[k]))+anti_operator_list[k]+numbers[i]+")";
			if((k!=0&&k!=2)&&valid_dot(new_numbers,calculate_numbers(numbers[i],target,operator_list[k])))
				return "("+numbers[i]+operator_list[k]+valid_dot(new_numbers,calculate_numbers(numbers[i],target,operator_list[k]))+")";
		}
		for(let j=0;j<new_numbers.length;++j)
		{
			let new_new_numbers=JSON.parse(JSON.stringify(new_numbers));
			new_new_numbers.splice(j,1);
			for(let k=0;k<operator_list.length;++k)
				for(let l=0;l<operator_list.length;++l)
				{
					if(calculate_numbers(numbers[i],new_numbers[j],operator_list[l])==0)
						continue;
					if(valid_dot(new_new_numbers,calculate_numbers(target,calculate_numbers(numbers[i],new_numbers[j],operator_list[l]),operator_list[k])))
						return "("+valid_dot(new_new_numbers,calculate_numbers(target,calculate_numbers(numbers[i],new_numbers[j],operator_list[l]),operator_list[k]))+anti_operator_list[k]+"("+numbers[i]+operator_list[l]+new_numbers[j]+"))";
					if((l!=0&&l!=2)&&valid_dot(new_new_numbers,calculate_numbers(target,calculate_numbers(new_numbers[j],numbers[i],operator_list[l]),operator_list[k])))
						return "("+valid_dot(new_new_numbers,calculate_numbers(target,calculate_numbers(new_numbers[j],numbers[i],operator_list[l]),operator_list[k]))+anti_operator_list[k]+"("+new_numbers[j]+operator_list[l]+numbers[i]+"))";
					if((k!=0&&k!=2)&&valid_dot(new_new_numbers,calculate_numbers(calculate_numbers(numbers[i],new_numbers[j],operator_list[l]),target,operator_list[k])))
						return "(("+numbers[i]+operator_list[l]+new_numbers[j]+")"+operator_list[k]+valid_dot(new_new_numbers,calculate_numbers(calculate_numbers(numbers[i],new_numbers[j],operator_list[l]),target,operator_list[k]))+")";
					if((k!=0&&k!=2)&&(l!=0&&l!=2)&&valid_dot(new_new_numbers,calculate_numbers(calculate_numbers(new_numbers[j],numbers[i],operator_list[l]),target,operator_list[k])))
						return "(("+new_numbers[j]+operator_list[l]+numbers[i]+")"+operator_list[k]+valid_dot(new_new_numbers,calculate_numbers(calculate_numbers(new_numbers[j],numbers[i],operator_list[l]),target,operator_list[k]))+")";
				}
		}
	}
	if(numbers.length>5)
	{
		let possible_results=dot_compose(numbers);
		if(possible_results[target])
			return possible_results[target];
	}*/
	return false;
}

function is_subnumbers(numbers_a, numbers_b) {
	for (let i = 0; i < numbers_a.length; ++i)
		if (!numbers_b.includes(numbers_a[i]))
			return false;
	return true;
}

function remove_numbers(numbers_a, numbers_b) {
	let new_numbers = JSON.parse(JSON.stringify(numbers_b));
	for (let i = 0; i < numbers_a.length; ++i)
		new_numbers.splice(new_numbers.indexOf(numbers_a[i]), 1);
	return new_numbers;
}

function almost_integer(number) {
	return (number - Math.round(number)) < 0.00000001 && (number - Math.round(number)) > -0.00000001;
}

function dot_compose(numbers) {
	let results = {};
	let power_set = [[]];
	let power_set_mark = [];
	for (let i = 0; i < numbers.length; i++)
		for (let j = 0, k = power_set.length; j < k; j++) {
			let new_item = power_set[j].concat(numbers[i]).sort((a, b) => (a - b));
			if (!power_set_mark.includes(JSON.stringify(new_item))) {
				power_set.push(new_item);
				power_set_mark.push(JSON.stringify(new_item));
			}
		}
	power_set.sort((a, b) => (a.length - b.length));
	for (let i = 1; i < power_set.length; ++i) {
		results[JSON.stringify(power_set[i])] = {};
		if (power_set[i].length == 1) {
			results[JSON.stringify(power_set[i])][power_set[i][0]] = power_set[i][0];
			continue;
		}
		let counted_compose = {};
		counted_compose[JSON.stringify(power_set[i])] = true;
		for (let composition in results) {
			if (counted_compose[composition])
				continue;
			let the_composition = JSON.parse(composition);
			if (is_subnumbers(the_composition, power_set[i])) {
				let the_remain = JSON.stringify(remove_numbers(the_composition, power_set[i]));
				for (let left in results[composition])
					for (let right in results[the_remain])
						for (let j = 0; j < operator_list.length; ++j) {
							if (left == Infinity || right == Infinity)
								continue;
							if (operator_list[j] == "+") {
								left = JSON.parse(left);
								right = JSON.parse(right);
							}
							let the_result = calculate_numbers(left, right, operator_list[j]);
							if (the_result >= 0) {
								if (almost_integer(the_result))
									the_result = Math.round(the_result);
								if (!results[JSON.stringify(power_set[i])][the_result])
									results[JSON.stringify(power_set[i])][the_result] = "(" + results[composition][left] + operator_list[j] + results[the_remain][right] + ")";
							}
							if (j % 2 == 1) {
								let the_result_2 = calculate_numbers(right, left, operator_list[j]);
								if (almost_integer(the_result_2))
									the_result_2 = Math.round(the_result_2);
								if (the_result_2 >= 0) {
									if (almost_integer(the_result_2))
										the_result_2 = Math.round(the_result_2);
									if (!results[JSON.stringify(power_set[i])][the_result_2])
										results[JSON.stringify(power_set[i])][the_result_2] = "(" + results[the_remain][right] + operator_list[j] + results[composition][left] + ")";
								}
							}
						}
				counted_compose[composition] = true;
				counted_compose[the_remain] = true;
			}
		}
	}
	return results[JSON.stringify(numbers.sort((a, b) => (a - b)))];
}