/**
 * @模块 fibonaci.js
 * @描述 斐波那契数列模块，使用2x2矩阵快速幂计算第n项
 */

/** 斐波那契数列结果最大字符串长度 */
max_str_length = 30000

/**
 * 计算斐波那契数列第n项
 * @param {number} n - 项数（从1开始）
 * @returns {string} 第n项的字符串表示
 */
function fibonaci(n) {
if (n === 1)
return "1";
if (n > 10 ** 7)
return "一个非常大的数字~";
let result = mx_pw_22([[1n, 1n], [1n, 0n]], n - 1)[0][0].toString();
if (result.length > max_str_length)
result = result.slice(0, max_str_length) + "…";
return result;
}

/**
 * 2x2矩阵快速幂
 * @param {Array} mx_1 - 2x2 BigInt矩阵
 * @param {number} n - 非负整数指数
 * @returns {Array} 幂运算结果2x2矩阵
 */
function mx_pw_22(mx_1, n) {
if (n === 0)
return [[1n, 0n], [0n, 1n]];
if (n % 2 === 1)
return mx_times_22(mx_pw_22(mx_1, n - 1), mx_1);
return mx_sq_22(mx_pw_22(mx_1, n / 2));
}

/**
 * 2x2矩阵乘法
 * @param {Array} mx_1 - 2x2 BigInt矩阵
 * @param {Array} mx_2 - 2x2 BigInt矩阵
 * @returns {Array} 乘积2x2矩阵
 */
function mx_times_22(mx_1, mx_2) {
return [[mx_1[0][0] * mx_2[0][0] + mx_1[0][1] * mx_2[1][0], mx_1[0][0] * mx_2[0][1] + mx_1[0][1] * mx_2[1][1]], [mx_1[1][0] * mx_2[0][0] + mx_1[1][1] * mx_2[1][0], mx_1[1][0] * mx_2[0][1] + mx_1[1][1] * mx_2[1][1]]];
}

/**
 * 2x2矩阵平方
 * @param {Array} mx_1 - 2x2 BigInt矩阵
 * @returns {Array} 平方结果2x2矩阵
 */
function mx_sq_22(mx_1) {
return mx_times_22(mx_1, mx_1);
}