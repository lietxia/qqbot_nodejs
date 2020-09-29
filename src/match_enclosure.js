function match_enclosure(order_string, n = 30) {
	let small_enclosure_amount = 0, medium_enclosure_amount = 0, large_enclosure_amount = 0;
	for (let i = 0; i < order_string.length; ++i)
		switch (order_string[i]) {
			case "(": ++small_enclosure_amount; break;
			case ")": --small_enclosure_amount; if (small_enclosure_amount < 0) return "missing: ( at place " + i + ".\n" + order_string.substr(i - n, i); break;
			case "[": ++medium_enclosure_amount; break;
			case "]": --medium_enclosure_amount; if (medium_enclosure_amount < 0) return "missing: [ at place " + i + ".\n" + order_string.substr(i - n, i); break;
			case "{": ++large_enclosure_amount; break;
			case "}": --large_enclosure_amount; if (medium_enclosure_amount < 0) return "missing: { at place " + i + ".\n" + order_string.substr(i - n, i); break;
		}
	if (small_enclosure_amount > 0)
		return "missing: )";
	if (medium_enclosure_amount > 0)
		return "missing: ]";
	if (large_enclosure_amount > 0)
		return "missing: }";
	return "perfect matched.";
}