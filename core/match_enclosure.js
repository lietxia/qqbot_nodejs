/**
 * @模块 match_enclosure.js
 * @描述 括号匹配检查工具，检测字符串中括号是否成对匹配
 */

/**
 * 检查字符串中的括号是否匹配
 * @param {string} order_string - 待检查的字符串
 * @param {number} n - 报错时回溯的字符数，默认30
 * @returns {string} 匹配结果："perfect matched." 或 缺失括号的位置信息
 */
function match_enclosure(order_string, n = 30) {
	let small_enclosure_amount = 0, medium_enclosure_amount = 0, large_enclosure_amount = 0;
	for (let i = 0; i < order_string.length; ++i)
		switch (order_string[i]) {
			case "(": ++small_enclosure_amount; break;
			case ")": --small_enclosure_amount; if (small_enclosure_amount < 0) return "missing: ( at place " + i + ".\n" + order_string.slice(i - n, i - n + i); break;
			case "[": ++medium_enclosure_amount; break;
			case "]": --medium_enclosure_amount; if (medium_enclosure_amount < 0) return "missing: [ at place " + i + ".\n" + order_string.slice(i - n, i - n + i); break;
			case "{": ++large_enclosure_amount; break;
			case "}": --large_enclosure_amount; if (large_enclosure_amount < 0) return "missing: { at place " + i + ".\n" + order_string.slice(i - n, i - n + i); break;
		}
	if (small_enclosure_amount > 0)
		return "missing: )";
	if (medium_enclosure_amount > 0)
		return "missing: ]";
	if (large_enclosure_amount > 0)
		return "missing: }";
	return "perfect matched.";
}