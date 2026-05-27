/**
 * @模块 logarithm.js
 * @描述 自然对数模块，使用级数展开计算自然对数
 */

/**
 * 计算自然对数ln(a)
 * @param {number} a - 正实数
 * @returns {number} ln(a)的近似值
 */
/**
 * @模块 logarithm.js
 * @描述 自然对数计算模块，使用级数展开法计算ln(a)
 */

/**
 * 计算自然对数ln(a)
 * @param {number} a - 正实数
 * @returns {number} ln(a)的值
 */
/**
 * @模块 logarithm.js
 * @描述 自然对数计算模块，通过级数展开近似计算ln(a)
 */

/**
 * 计算自然对数ln(a)
 * @param {number} a - 正实数
 * @returns {number} - ln(a)的近似值
 */
function ln(a) {
if (a < 1)
return -log(1 / a);
let inte = 0;
while (a >= Math.E) {
a /= Math.E;
++inte;
}
let deci = 0;
let x = 1;
for (let i = 1; i < 60; ++i) {
x *= (a - 1) / a;
deci += x / i;
}
return inte + deci;
}