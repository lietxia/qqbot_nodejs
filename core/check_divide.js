/**
 * @模块 check_divide.js
 * @描述 除法测试模块，随机生成大整数除法并验证结果
 */

/**
 * 随机生成大整数除法并计算结果
 * @param {number} a - 被除数位数
 * @param {number} b - 除数位数
 * @returns {string} 除法算式及结果字符串
 */
function random_division(a, b) {
start = Date.now();
let division = JSON.stringify(Math.floor(Math.random() * 9) + 1);
for (let i = 0; i < a - 1; ++i)
division += Math.floor(Math.random() * 10);
let divisor = JSON.stringify(Math.floor(Math.random() * 9) + 1);
for (let i = 0; i < b - 1; ++i)
divisor += Math.floor(Math.random() * 10);
return division + "/" + divisor + "=" + JSON.stringify(positive_divide(division, divisor)) + "(" + (Date.now() - start) + "ms)";
}