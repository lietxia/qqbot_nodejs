/**
 * @模块 multipolynomial.js
 * @描述 多元多项式运算模块（部分实现）
 */

/**
 * 多元多项式加法（仅实现有理数系数情况）
 * @param {Array} pol_a - 多项式
 * @param {Array} pol_b - 多项式
 * @returns {Array} 和多项式
 */
/**
 * @模块 multipolynomial.js
 * @描述 多元多项式运算模块（部分实现）
 */

/**
 * 多元多项式加法（仅实现了一元多项式的情况）
 * @param {Array} pol_a - 多项式
 * @param {Array} pol_b - 多项式
 * @returns {Array} 和多项式
 */
/**
 * @模块 multipolynomial.js
 * @描述 多元多项式运算模块（开发中），支持有理数系数多项式加法
 */

/**
 * 多元多项式加法
 * @param {Array<Array<string>>} pol_a - 多项式系数数组（有理数表示）
 * @param {Array<Array<string>>} pol_b - 多项式系数数组（有理数表示）
 * @returns {Array<Array<string>>} - 和多项式
 */
function multi_polynomial_add(pol_a, pol_b) {
if (is_rational(pol_a[0]))
return polynomial_add(pol_a, pol_b);

for (let i = 0; i < 1;) { }
}