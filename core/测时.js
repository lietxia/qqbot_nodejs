/**
 * @模块 测时.js
 * @描述 函数执行计时工具，测量函数运行耗时
 */

/**
 * 计算函数执行时间并返回结果和耗时
 * @param {Function} func - 待测量的函数
 * @param {...*} arg - 传递给函数的参数
 * @returns {string} 函数结果的JSON字符串及耗时信息
 */
function count_func_time(func, ...arg) {
	let start = Date.now();
	return JSON.stringify(func(...arg)) + " (" + (Date.now() - start) + "ms)";
}