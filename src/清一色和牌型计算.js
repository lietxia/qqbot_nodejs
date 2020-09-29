const mpsz = ['m', 'p', 's', 'z'];
const basic_hand = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

mianzi_single_colored = [[3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 3], [1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1]];
mianzi_single_worded = [[3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0]];
quetou_colored = [[2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2]];
quetou_worded = [[2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0]];

function composible(cards_1, cards_2) {
	for (let i = 0; i < 9; ++i)
		if (cards_1[i] + cards_2[i] > 4)
			return false;
	return true;
}

function composite(cards_1, cards_2) {
	let cards = [];
	for (let i = 0; i < 9; ++i)
		cards[i] = cards_1[i] + cards_2[i];
	return cards;
}

function index_of(group, element) {
	let ELEMENT = JSON.stringify(element);
	for (let i = 0; i < group.length; ++i)
		if (ELEMENT == JSON.stringify(group[i]))
			return i;
	return -1;
}

function create_mix(cards_1, cards_2) {
	let mix_cards = [];
	for (let i = 0; i < cards_1.length; ++i)
		for (let j = 0; j < cards_2.length; ++j)
			if (composible(cards_1[i], cards_2[j]) && index_of(mix_cards, composite(cards_1[i], cards_2[j])) < 0)
				mix_cards.push(composite(cards_1[i], cards_2[j]));
	return mix_cards;
}

function mianzi_sort(mianzi_a, mianzi_b) {
	for (let i = 0; i < 9; ++i)
		if (mianzi_a[i] != mianzi_b[i])
			return mianzi_b[i] - mianzi_a[i];
	return 0;
}

mianzi_double_colored = create_mix(mianzi_single_colored, mianzi_single_colored);
mianzi_triple_colored = create_mix(mianzi_single_colored, mianzi_double_colored);
mianzi_quadruple_colored = create_mix(mianzi_single_colored, mianzi_triple_colored);
mianzi_double_worded = create_mix(mianzi_single_worded, mianzi_single_worded);
mianzi_triple_worded = create_mix(mianzi_single_worded, mianzi_double_worded);
mianzi_quadruple_worded = create_mix(mianzi_single_worded, mianzi_triple_worded);
mianzi_single_colored_with_quetou = create_mix(mianzi_single_colored, quetou_colored);
mianzi_double_colored_with_quetou = create_mix(mianzi_double_colored, quetou_colored);
mianzi_triple_colored_with_quetou = create_mix(mianzi_triple_colored, quetou_colored);
mianzi_quadruple_colored_with_quetou = create_mix(mianzi_quadruple_colored, quetou_colored);
mianzi_single_worded_with_quetou = create_mix(mianzi_single_worded, quetou_worded);
mianzi_double_worded_with_quetou = create_mix(mianzi_double_worded, quetou_worded);
mianzi_triple_worded_with_quetou = create_mix(mianzi_triple_worded, quetou_worded);
mianzi_quadruple_worded_with_quetou = create_mix(mianzi_quadruple_worded, quetou_worded);

fs.writeFileSync('./清一色和牌型.txt', "mianzi_double_colored=" + JSON.stringify(mianzi_double_colored) + ";\n" + "mianzi_triple_colored=" + JSON.stringify(mianzi_triple_colored) + ";\n" + "mianzi_quadruple_colored=" + JSON.stringify(mianzi_quadruple_colored) + ";\n" + "mianzi_double_worded=" + JSON.stringify(mianzi_double_worded) + ";\n" + "mianzi_triple_worded=" + JSON.stringify(mianzi_triple_worded) + ";\n" + "mianzi_quadruple_worded=" + JSON.stringify(mianzi_quadruple_worded) + ";\n" + "mianzi_single_colored_with_quetou=" + JSON.stringify(mianzi_single_colored_with_quetou) + ";\n" + "mianzi_double_colored_with_quetou=" + JSON.stringify(mianzi_double_colored_with_quetou) + ";\n" + "mianzi_triple_colored_with_quetou=" + JSON.stringify(mianzi_triple_colored_with_quetou) + ";\n" + "mianzi_quadruple_colored_with_quetou=" + JSON.stringify(mianzi_quadruple_colored_with_quetou) + ";\n" + "mianzi_single_worded_with_quetou=" + JSON.stringify(mianzi_single_worded_with_quetou) + ";\n" + "mianzi_double_worded_with_quetou=" + JSON.stringify(mianzi_double_worded_with_quetou) + ";\n" + "mianzi_triple_worded_with_quetou=" + JSON.stringify(mianzi_triple_worded_with_quetou) + ";\n" + "mianzi_quadruple_worded_with_quetou=" + JSON.stringify(mianzi_quadruple_worded_with_quetou) + ";");