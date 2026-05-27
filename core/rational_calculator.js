/**
 * @模块 rational_calculator.js
 * @描述 有理数运算模块，提供有理数的定义、化简、加减乘除、比较、阶乘和显示
 */

/* ==== 有理数类型判断与定义 ==== */

/**
 * 判断是否为有理数（长度为2的整数字符串数组）
 * @param {Array} a - 待判断的数组
 * @returns {boolean} 是否为有理数
 */
/**
 * @模块 rational_calculator.js
 * @描述 有理数运算模块，提供有理数的定义、化简、加减乘除、比较、阶乘、显示等运算
 */

/**
 * 判断是否为有理数（长度为2的整数字符串数组）
 * @param {Array} a - 待判断的数组
 * @returns {boolean} 是否为有理数
 */
/**
 * @模块 rational_calculator.js
 * @描述 有理数精确计算器，基于大整数运算实现有理数的加减乘除、比较、幂运算等
 */

/**
 * 判断是否为有理数（[分子, 分母]格式）
 * @param {Array<string>} a - 待检测数组
 * @returns {boolean} - 是否为有理数
 */
function is_rational(a) {
if (a.length > 2)
return false;
if (!is_integer(a[0]))
return false;
if (!is_integer(a[1]))
return false;
return true;
}

/**
 * 最大公约数（欧几里得算法）
 * @param {string} a - 整数字符串
 * @param {string} b - 整数字符串
 * @returns {string} 最大公约数字符串
 */
/**
 * 最大公约数（欧几里得算法）
 * @param {string} a - 整数字符串
 * @param {string} b - 整数字符串
 * @returns {string} - 最大公约数的字符串表示
 */
function gcd(a, b) {
if (!is_integer(a) || !is_integer(b))
return "NaN";
if (a[0] === "-")
a = a.slice(1);
if (b[0] === "-")
b = b.slice(1);
if (b === "0")
return a;
let a_mod_b = positive_divide(a, b)[1];
if (a_mod_b === 0)
return b;
let b_mod_a = positive_divide(b, a)[1];
if (b_mod_a === 0)
return a;
if (positive_greater(a, b))
return gcd(b, a_mod_b);
return gcd(a, b_mod_a);
}

/**
 * 将数字字符串定义为有理数
 * @param {string} number - 数字字符串（支持小数）
 * @returns {Array} 有理数 [分子, 分母]
 */
/**
 * 将数值字符串转换为有理数
 * @param {string} number - 数值字符串（支持小数）
 * @returns {Array<string>} - [分子, 分母]
 */
function rational_define(number) {
if (number.indexOf(".") < 0)
return [integer_simplify(number), "1"];
if (number.replace(".", "").indexOf(".") >= 0)
return ["NaN", "NaN"];
let deci_amount = number.length - number.indexOf(".") - 1;
return rational_simplify([integer_simplify(number.replace(".", "")), power_10(deci_amount)]);
}

/* ==== 有理数化简与运算 ==== */

/**
 * 有理数化简（约分）
 * @param {Array} rat - 有理数 [分子, 分母]
 * @returns {Array} 化简后的有理数
 */
/**
 * 有理数化简（约分）
 * @param {Array<string>} rat - [分子, 分母]
 * @returns {Array<string>} - 化简后的[分子, 分母]
 */
function rational_simplify(rat) {
let g = gcd(rat[0], rat[1]);
if (!is_integer(g))
return ["NaN", "NaN"];
return (rat[1][0] !== "-") ? [integer_divide(rat[0], g)[0], positive_divide(rat[1], g)[0]] : [neg_integer(integer_divide(rat[0], g)[0]), positive_divide(rat[1].slice(1), g)[0]];
}

/**
 * 有理数绝对值
 * @param {Array} rat_a - 有理数 [分子, 分母]
 * @returns {Array} 绝对值有理数
 */
/**
 * 有理数取绝对值
 * @param {Array<string>} rat_a - [分子, 分母]
 * @returns {Array<string>} - 绝对值有理数
 */
function rational_absolute(rat_a) {
if (rat_a[0][0] === "-")
return [rat_a[0].slice(1), rat_a[1]];
return rat_a;
}

/**
 * 有理数加法
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {Array} 和有理数
 */
/**
 * 有理数加法
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {Array<string>} - 和的[分子, 分母]
 */
function rational_add(rat_a, rat_b) {
return rational_simplify([integer_add(integer_multiply(rat_a[0], rat_b[1]), integer_multiply(rat_a[1], rat_b[0])), integer_multiply(rat_a[1], rat_b[1])]);
}

/**
 * 有理数减法
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {Array} 差有理数
 */
/**
 * 有理数减法
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {Array<string>} - 差的[分子, 分母]
 */
function rational_minus(rat_a, rat_b) {
return rational_simplify([integer_minus(integer_multiply(rat_a[0], rat_b[1]), integer_multiply(rat_a[1], rat_b[0])), integer_multiply(rat_a[1], rat_b[1])]);
}

/**
 * 有理数乘法
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {Array} 积有理数
 */
/**
 * 有理数乘法
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {Array<string>} - 积的[分子, 分母]
 */
function rational_multiply(rat_a, rat_b) {
return rational_simplify([integer_multiply(rat_a[0], rat_b[0]), integer_multiply(rat_a[1], rat_b[1])]);
}

/**
 * 有理数除法
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {Array} 商有理数
 */
/**
 * 有理数除法
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {Array<string>} - 商的[分子, 分母]
 */
function rational_divide(rat_a, rat_b) {
return rational_simplify([integer_multiply(rat_a[0], rat_b[1]), integer_multiply(rat_a[1], rat_b[0])]);
}

/* ==== 有理数比较运算 ==== */

/**
 * 有理数大于比较
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {boolean} rat_a > rat_b
 */
/**
 * 判断有理数rat_a是否大于rat_b
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {boolean} - rat_a > rat_b
 */
function rational_greater(rat_a, rat_b) {
let sim_a = rational_simplify(rat_a);
let sim_b = rational_simplify(rat_b);
return integer_greater(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

/**
 * 有理数小于比较
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {boolean} rat_a < rat_b
 */
/**
 * 判断有理数rat_a是否小于rat_b
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {boolean} - rat_a < rat_b
 */
function rational_smaller(rat_a, rat_b) {
let sim_a = rational_simplify(rat_a);
let sim_b = rational_simplify(rat_b);
return integer_smaller(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

/**
 * 有理数大于等于比较
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {boolean} rat_a >= rat_b
 */
/**
 * 判断有理数rat_a是否大于等于rat_b
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {boolean} - rat_a >= rat_b
 */
function rational_equal_or_greater(rat_a, rat_b) {
let sim_a = rational_simplify(rat_a);
let sim_b = rational_simplify(rat_b);
return integer_equal_or_greater(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

/**
 * 有理数小于等于比较
 * @param {Array} rat_a - 有理数
 * @param {Array} rat_b - 有理数
 * @returns {boolean} rat_a <= rat_b
 */
/**
 * 判断有理数rat_a是否小于等于rat_b
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {Array<string>} rat_b - [分子, 分母]
 * @returns {boolean} - rat_a <= rat_b
 */
function rational_equal_or_smaller(rat_a, rat_b) {
let sim_a = rational_simplify(rat_a);
let sim_b = rational_simplify(rat_b);
return integer_equal_or_smaller(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

/* ==== 有理数辅助运算 ==== */

/**
 * 有理数阶乘
 * @param {Array} rat_a - 有理数 [分子, 分母]
 * @returns {Array} 阶乘结果有理数
 */
/**
 * 有理数阶乘
 * @param {Array<string>} rat_a - [分子, 分母]，分母须为1
 * @returns {Array<string>} - 阶乘结果的[分子, 分母]
 */
function rational_factorial(rat_a) {
if (rat_a[1] !== "1")
return ["NaN", "NaN"];
if (positive_greater(rat_a[0], "250"))
return ["1", "0"];
return [integer_factorial(rat_a[0]), "1"];
}

/**
 * 有理数取整（向下取整）
 * @param {Array} rat_a - 有理数
 * @returns {Array} 取整后的有理数
 */
/**
 * 有理数取整（向下取整）
 * @param {Array<string>} rat_a - [分子, 分母]
 * @returns {Array<string>} - 取整后的[分子, "1"]
 */
function rational_floor(rat_a) {
return [integer_divide(rat_a[0], rat_a[1])[0], "1"];
}

/**
 * 有理数取负
 * @param {Array} rat_a - 有理数
 * @returns {Array} 取负后的有理数
 */
/**
 * 有理数取负
 * @param {Array<string>} rat_a - [分子, 分母]
 * @returns {Array<string>} - 相反数的[分子, 分母]
 */
function neg_rational(rat_a) {
return [neg_integer(rat_a[0]), rat_a[1]];
}

/**
 * 有理数整数次幂
 * @param {Array} rat_a - 有理数 [分子, 分母]
 * @param {string} int_b - 整数指数字符串
 * @returns {Array} 幂运算结果有理数
 */
/**
 * 有理数整数幂运算
 * @param {Array<string>} rat_a - [分子, 分母]
 * @param {string} int_b - 整数指数字符串
 * @returns {Array<string>} - 幂的[分子, 分母]
 */
function rational_int_power(rat_a, int_b) {
if (int_b[0] === "-")
return rational_int_power(rational_simplify([rat_a[1], rat_a[0]]), int_b.slice(1));
if (rat_a[0][0] === "-")
if (positive_divide(int_b, "2")[1] === "0")
return [positive_power(rat_a[0].slice(1), int_b), positive_power(rat_a[1], int_b)];
else
return ["-" + positive_power(rat_a[0].slice(1), int_b), positive_power(rat_a[1], int_b)];
return [positive_power(rat_a[0], int_b), positive_power(rat_a[1], int_b)];
}

/* function exact_root(int_a,int_b)
{
let itt_r=[];
let itt_f="0";
let itt_b=int_a.slice(0, Math.ceil(int_a.length/(function(){try{return JSON.parse(int_b)}catch(e){return NaN}})()))+"0";
let itt_times=0;
while(itt_r.indexOf(itt_b)<0)
{
itt_r.push(itt_f);
itt_f=itt_b;
console.log(itt_b);
itt_b=rational_floor(rational_add(rational_multiply([positive_difference(int_b,"1"),int_b],[itt_f,"1"]),rational_multiply([int_a,int_b],["1",positive_power(itt_f,positive_difference(int_b,"1"))])))[0];
++itt_times;
}
console.log(itt_b);
if(itt_f!=itt_b)
return "NaN";
if(positive_power(itt_b,int_b)==int_a)
return itt_b;
else
return "NaN";
} */


/**
 * 将有理数转换为可读字符串
 * @param {Array} rat - 有理数 [分子, 分母]
 * @param {number} precision - 精度（未使用），默认14
 * @returns {string} 有理数的字符串表示
 */
/**
 * 将有理数转换为可读字符串
 * @param {Array<string>} rat - [分子, 分母]
 * @param {number} [precision=14] - 显示精度（未使用）
 * @returns {string} - 有理数的字符串表示
 */
function rational_show(rat, precision = 14) {
if (!is_integer(rat[0]) || !is_integer(rat[1]))
return "NaN";
if (rat[1] === "0")
if (rat[0][0] === "-")
return "-Infinity";
else
return "Infinity";
if (rat[1] === "1")
return rat[0];
return rat[0] + "/" + rat[1];
}