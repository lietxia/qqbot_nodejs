/**
 * @模块 prime_list.js
 * @描述 素数列表计算模块，基于素因数分解表生成素数判定列表
 */

/**
 * 根据素因数分解表计算1到n的素数判定列表
 * @param {number} n - 上界
 * @returns {Array} 素数判定布尔数组
 */
/**
 * @模块 prime_list.js
 * @描述 素数列表计算模块，根据素因数分解表生成素数判定列表
 */

/**
 * 根据素因数分解表计算素数列表
 * @param {number} n - 计算范围上限
 * @returns {Array} 素数判定布尔数组
 */
/**
 * @模块 prime_list.js
 * @描述 根据素因数分解表计算素数判定列表
 */

/**
 * 计算素数判定列表
 * @param {number} n - 上界
 * @returns {Array<boolean>} - 素数判定列表
 */
function calculate_prime(n) {
let prime_list = [false, false];
for (let i = 2; i <= n; ++i) {
if (prime_decompose[i].length === 1 && prime_decompose[i] === i)
prime_list.push(true);
else
prime_list.push(false);
}
return prime_list;
}