/**
 * @模块 algebraic_polynomial_calculator.js
 * @描述 代数数域上的多项式运算模块，提供多项式加减乘除和求逆
 */

/* ==== 多项式数乘与首一化 ==== */

/**
 * 多项式与有理数的数乘
 * @param {Array} pol_a - 有理数系数多项式
 * @param {Array} rat_b - 有理数 [分子, 分母]
 * @returns {Array} 数乘结果多项式
 */
function polynomial_number_product(pol_a, rat_b) {
let product = [];
for (let i = 0; i < pol_a.length; ++i)
product[i] = rational_multiply(pol_a[i], rat_b);
return product;
}

/**
 * 多项式与有理数的数除
 * @param {Array} pol_a - 有理数系数多项式
 * @param {Array} rat_b - 有理数 [分子, 分母]
 * @returns {Array} 数除结果多项式
 */
function polynomial_number_quotient(pol_a, rat_b) {
let quotient = [];
for (let i = 0; i < pol_a.length; ++i)
quotient[i] = rational_divide(pol_a[i], rat_b);
return quotient;
}

/**
 * 将多项式首一化
 * @param {Array} pol_a - 有理数系数多项式
 * @returns {Array} 首一化后的多项式
 */
function polynomial_monic(pol_a) {
if (pol_a.length === 1 && pol_a[0][0] === "0" && pol_a[0][1] === "1")
return pol_a;
return polynomial_number_quotient(pal_a, pal_a[0]);
}

/* ==== 多项式化简与反转 ==== */

/**
 * 化简多项式，去除前导零系数
 * @param {Array} pol_a - 有理数系数多项式
 * @returns {Array} 化简后的多项式
 */
function polynomial_simplify(pol_a) {
let sim_a = [];
let i = 0;
while (i < pol_a.length && pol_a[i][0] === "0" && pol_a[i][1] === "1")
++i;
for (j = 0; j < pol_a.length - i; ++j)
sim_a.push(pol_a[i + j]);
return (sim_a.length === 0) ? [["0", "1"]] : sim_a;
}

/**
 * 反转多项式系数顺序
 * @param {Array} pol_a - 有理数系数多项式
 * @returns {Array} 反转后的多项式
 */
function polynomial_anti(pol_a) {
let anti_a = [];
for (let i = 0; i < pol_a.length; ++i)
anti_a.push(pol_a[pol_a.length - i - 1]);
return anti_a;
}

/* ==== 多项式四则运算 ==== */

/**
 * 多项式加法
 * @param {Array} pol_a - 有理数系数多项式
 * @param {Array} pol_b - 有理数系数多项式
 * @returns {Array} 和多项式
 */
function polynomial_add(pol_a, pol_b) {
let anti_sum = [];
let anti_a = polynomial_anti(pol_a);
let anti_b = polynomial_anti(pol_b);
for (let i = 0; i < anti_a.length || i < anti_b.length; ++i)
anti_sum[i] = rational_add((i >= anti_a.length) ? ["0", "1"] : anti_a[i], (i >= anti_b.length) ? ["0", "1"] : anti_b[i]);
return polynomial_simplify(polynomial_anti(anti_sum));
}

/**
 * 多项式减法
 * @param {Array} pol_a - 有理数系数多项式
 * @param {Array} pol_b - 有理数系数多项式
 * @returns {Array} 差多项式
 */
function polynomial_minus(pol_a, pol_b) {
let anti_difference = [];
let anti_a = polynomial_anti(pol_a);
let anti_b = polynomial_anti(pol_b);
for (let i = 0; i < anti_a.length || i < anti_b.length; ++i)
anti_difference[i] = rational_minus((i >= anti_a.length) ? ["0", "1"] : anti_a[i], (i >= anti_b.length) ? ["0", "1"] : anti_b[i]);
return polynomial_simplify(polynomial_anti(anti_difference));
}

/**
 * 多项式乘法
 * @param {Array} pol_a - 有理数系数多项式
 * @param {Array} pol_b - 有理数系数多项式
 * @returns {Array} 积多项式
 */
function polynomial_multiply(pol_a, pol_b) {
let pol_product = [];
for (let i = 0; i < pol_a.length + pol_b.length - 1; ++i) {
pol_product[i] = ["0", "1"];
for (let j = 0; j <= i; ++j)
pol_product[i] = rational_add(pol_product[i], rational_multiply((j >= pol_a.length) ? ["0", "1"] : pol_a[j], (i >= (pol_b.length + j)) ? ["0", "1"] : pol_b[i - j]));
}
return polynomial_simplify(pol_product);
}

/**
 * 多项式带余除法
 * @param {Array} pol_a - 被除多项式
 * @param {Array} pol_b - 除数多项式
 * @returns {Array} [商多项式, 余数多项式]
 */
function polynomial_divide(pol_a, pol_b) {
if (pol_a.length === 1 && pol_a[0][0] === "0" && pol_a[0][1] === "1")
return [[["0", "1"]], [["0", "1"]]];
if (pol_a.length < pol_b.length)
return [[["0", "1"]], pol_a];
let divisor = rational_divide(pol_a[0], pol_b[0]);
let quotient = polynomial_number_product(pol_b, divisor);
let add_quotient = [divisor];
for (let i = 0; i < (pol_a.length - pol_b.length); ++i) {
quotient.push(["0", "1"]);
add_quotient.push(["0", "1"]);
}
let next_division = polynomial_minus(pol_a, quotient);
let next_result = polynomial_divide(next_division, pol_b);
return [polynomial_add(add_quotient, next_result[0]), next_result[1]];
}

/**
 * 多项式在不可约多项式下的逆元（未实现）
 * @param {Array} pol_irr - 不可约多项式
 * @param {Array} pol_a - 待求逆的多项式
 * @returns {Array} 逆元多项式
 */
function polynomial_inverse(pol_irr, pol_a) {

}