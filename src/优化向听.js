function color_santen(color_hand, mianzi, quetou) {
	let card_amount = 0;
	for (let i = 0; i < 3; ++i)
		for (let j = 0; j < 9; ++j)
			card_amount += hand[i][j];
	if (hold >= 0 && hold < 27)
		card_amount += 1;
	let i, j;
	for (i = 0; i < 3; ++i) {
		for (j = 0; j < 9; ++j)
			if (hand[i][j] >= 1)
				break;
		if (hand[i][j] >= 1)
			break;
	}
	if (hand[i][j] >= 3 && (i != last_i || j != last_j || last_step <= 1)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 3;
		let other_mianzi = mianzi_decompose(hand_copy, hold, i, j, 1);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 1) + (j + 1) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (hand[i][j] >= 2 && hold == (i * 9 + j) && (i != last_i || j != last_j || last_step <= 2)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 2;
		let other_mianzi = mianzi_decompose(hand_copy, -1, i, j, 2);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 1) + mpsz[i] + "+" + (j + 1) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (card_amount % 3 == 2 && hand[i][j] >= 2 && (i != last_i || j != last_j || last_step <= 3)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 2;
		let other_mianzi = mianzi_decompose(hand_copy, hold, i, j, 3);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 1) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (card_amount % 3 == 2 && hold == (i * 9 + j) && (i != last_i || j != last_j || last_step <= 4)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 1;
		let other_mianzi = mianzi_decompose(hand_copy, -1, i, j, 4);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + mpsz[i] + "+" + (j + 1) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (i != 3 && j < 7 && hand[i][j + 1] >= 1 && hand[i][j + 2] >= 1 && (i != last_i || j != last_j || last_step <= 5)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 1;
		hand_copy[i][j + 1] -= 1;
		hand_copy[i][j + 2] -= 1;
		let other_mianzi = mianzi_decompose(hand_copy, hold, i, j, 5);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 2) + (j + 3) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (i != 3 && j < 7 && hand[i][j + 1] >= 1 && hold == (i * 9 + (j + 2)) && (i != last_i || j != last_j || last_step <= 6)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 1;
		hand_copy[i][j + 1] -= 1;
		let other_mianzi = mianzi_decompose(hand_copy, -1, i, j, 6);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 2) + mpsz[i] + "+" + (j + 3) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (i != 3 && j < 7 && hand[i][j + 2] >= 1 && hold == (i * 9 + (j + 1)) && (i != last_i || j != last_j || last_step <= 7)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 1;
		hand_copy[i][j + 2] -= 1;
		let other_mianzi = mianzi_decompose(hand_copy, -1, i, j, 7);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 3) + mpsz[i] + "+" + (j + 2) + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
	if (i != 3 && j > 0 && j < 8 && hand[i][j + 1] >= 1 && hold == (i * 9 + (j - 1)) && (i != last_i || j != last_j || last_step <= 8)) {
		let hand_copy = JSON.parse(JSON.stringify(hand));
		hand_copy[i][j] -= 1;
		hand_copy[i][j + 1] -= 1;
		let other_mianzi = mianzi_decompose(hand_copy, -1, i, j, 8);
		if (other_mianzi != "error")
			for (let k = 0; k < other_mianzi.length; ++k) {
				other_mianzi[k].unshift("" + (j + 1) + (j + 2) + mpsz[i] + "+" + j + mpsz[i]);
				mianzi_list.unshift(other_mianzi[k]);
			}
	}
}