/**
 * @模块 complex_number.js
 * @描述 复数运算模块，提供复数的绝对值、共轭、加减乘除运算
 */

/**
 * 复数定义（占位函数，未实现）
 */
function complex_define() {}

/**
 * 复数绝对值（模）
 * @param {Array} c_a - 复数 [实部, 虚部]
 * @returns {number} 复数的模
 */
function complex_abs(c_a) {
return (c_a[0] * c_a[0] + c_a[1] * c_a[1]) ** (1 / 2);
}

/**
 * 复数共轭
 * @param {Array} c_a - 复数 [实部, 虚部]
 * @returns {Array} 共轭复数 [实部, -虚部]
 */
function complex_conjugate(c_a) {
return [c_a[0], -c_a[1]];
}

/**
 * 复数加法
 * @param {Array} c_a - 复数 [实部, 虚部]
 * @param {Array} c_b - 复数 [实部, 虚部]
 * @returns {Array} 和复数
 */
function complex_add(c_a, c_b) {
return [c_a[0] + c_b[0], c_a[1] + c_b[1]];
}

/**
 * 复数减法
 * @param {Array} c_a - 复数 [实部, 虚部]
 * @param {Array} c_b - 复数 [实部, 虚部]
 * @returns {Array} 差复数
 */
function complex_minus(c_a, c_b) {
return [c_a[0] - c_b[0], c_a[1] - c_b[1]];
}

/**
 * 复数乘法
 * @param {Array} c_a - 复数 [实部, 虚部]
 * @param {Array} c_b - 复数 [实部, 虚部]
 * @returns {Array} 积复数
 */
function complex_multiply(c_a, c_b) {
return [c_a[0] * c_b[0] - c_a[1] * c_b[1], c_a[0] * c_b[1] + c_a[1] * c_b[0]];
}

/**
 * 复数除法
 * @param {Array} c_a - 被除复数 [实部, 虚部]
 * @param {Array} c_b - 除数复数 [实部, 虚部]
 * @returns {Array} 商复数
 */
function complex_divide(c_a, c_b) {
return complex_multiply([1 / complex_abs(c_b), 0], complex_multiply(c_a, complex_conjugate(c_b)));
}