/**
 * @模块 linear_algebra.js
 * @描述 线性代数模块，提供浮点数矩阵的行列式、逆矩阵、幂、指数、转置等运算
 */

/* ==== 矩阵功能入口 ==== */

/**
 * 矩阵功能分发入口，根据消息前缀调用对应矩阵运算
 * @returns {string|Array|number} 矩阵运算结果
 */
/**
 * @模块 linear_algebra.js
 * @描述 线性代数模块，提供浮点数矩阵的行列式、逆矩阵、幂、指数、转置、范数等运算
 */

/**
 * 矩阵功能分发函数，根据消息前缀选择对应矩阵运算
 * @returns {string|Array|number} 矩阵运算结果
 */
/**
 * @模块 linear_algebra.js
 * @描述 浮点数矩阵运算模块，支持行列式、逆矩阵、矩阵幂、转置、范数、指数矩阵等运算
 */

/**
 * 矩阵运算入口函数，根据指令前缀分发到对应矩阵运算
 * @param {string} message - 用户输入的指令字符串
 * @returns {string|Array|number} - 运算结果
 */
function matrix_function() {
if (message.slice(2, 2 + 3) === "det")
return cal_det(catch_content(5));
if (message.slice(2, 2 + 3) === "inv")
return cal_inverse(catch_content(5));
if (message.slice(2, 2 + 3) === "E**")
return cal_E_power(catch_content(5));
if (message.slice(2, 2 + 2) === "tr")
return cal_trace(catch_content(4));
if (message.slice(2, 2 + 2) === "**")
return cal_mx_power(catch_content(4));
if (message.slice(2, 2 + 2) === "||")
return cal_norm(catch_content(4));
if (message.slice(2, 2 + 2) === "id")
return cal_identity(catch_content(4));
if (message.slice(2, 2 + 2) === "zr")
return cal_zero(catch_content(4));
if (message.slice(2, 2 + 2) === "rd")
return cal_round(catch_content(4));
if (message.slice(2, 2 + 2) === "ln")
return cal_ln(catch_content(4));
if (message.slice(2, 2 + 1) === "+")
return cal_sum(catch_content(3));
if (message.slice(2, 2 + 1) === "*")
return cal_product(catch_content(3));
if (message.slice(2, 2 + 1) === "T")
return cal_transpose(catch_content(3));
return "";
}

/* ==== 矩阵四舍五入 ==== */

/**
 * 矩阵元素四舍五入到指定小数位
 * @param {Array} matrix - 浮点数矩阵
 * @param {number} n - 小数位数，默认0
 * @returns {Array} 四舍五入后的矩阵
 */
/**
 * 矩阵元素四舍五入到指定小数位
 * @param {Array<Array<number>>} matrix - 二维数值矩阵
 * @param {number} [n=0] - 保留小数位数
 * @returns {Array<Array<number>>} - 四舍五入后的矩阵
 */
function matrix_round(matrix, n = 0) {
let round_matrix = [];
for (let i = 0; i < matrix.length; ++i) {
round_matrix[i] = [];
for (let j = 0; j < matrix[i].length; ++j)
round_matrix[i][j] = Math.round(matrix[i][j] * (10 ** n)) / (10 ** n);
}
return round_matrix;
}

/**
 * 解析并执行矩阵四舍五入
 * @param {string} order_string - JSON格式矩阵字符串
 * @returns {Array|string} 四舍五入后的矩阵或"NaN"
 */
/**
 * 解析并执行矩阵四舍五入指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {Array<Array<number>>|string} - 四舍五入后的矩阵或"NaN"
 */
function cal_round(order_string) {
	let matrix;
	try { matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix).length > 2)
		return "NaN";
	else
		return matrix_round(matrix);
}

/* ==== 矩阵类型检查 ==== */

/**
 * 检查矩阵类型，返回[行数, 列数]或错误信息
 * @param {Array} matrix - 待检查的矩阵
 * @returns {Array|string} [行数, 列数] 或 "that is not a matrix"
 */
/**
 * 检测矩阵类型，返回[行宽, 列高]或错误信息
 * @param {Array<Array<number>>} matrix - 待检测矩阵
 * @returns {Array<number>|string} - [行宽, 列高] 或 "that is not a matrix"
 */
function matrix_type(matrix) {
let check_matrix = JSON.stringify(matrix);
if (check_matrix[0] !== "[" || check_matrix[1] !== "[")
return "that is not a matrix";
let row_length = matrix[0].length, column_length = matrix.length;
for (let i = 0; i < matrix.length; ++i) {
if (matrix[i].length != row_length)
return "that is not a matrix";
for (let j = 0; j < matrix[i].length; ++j)
if (typeof (matrix[i][j]) !== "number")
return "that is not a matrix";
}
return [row_length, column_length];
}

/* ==== 余子式与迹 ==== */

/**
 * 求矩阵的余子式（去掉第i行第j列）
 * @param {Array} matrix - 方阵
 * @param {number} int_i - 去掉的行号
 * @param {number} int_j - 去掉的列号
 * @returns {Array|string} 余子式矩阵或错误信息
 */
/**
 * 求矩阵的余子式（去掉第int_i行第int_j列）
 * @param {Array<Array<number>>} matrix - 原矩阵
 * @param {number} int_i - 要去掉的行索引
 * @param {number} int_j - 要去掉的列索引
 * @returns {Array<Array<number>>|string} - 余子式矩阵或错误信息
 */
function cofactor(matrix, int_i, int_j) {
if (matrix_type(matrix) === "that is not a matrix")
return "that is not a matrix";
let cofactor_matrix = [], x = 0, y = 0;
for (let i = 0; i < matrix.length; ++i)
if (i === int_i)
continue;
else {
cofactor_matrix[x] = [];
for (let j = 0; j < matrix[i].length; ++j)
if (j === int_j)
continue;
else {
cofactor_matrix[x][y] = matrix[i][j];
++y
}
++x;
y = 0;
}
return cofactor_matrix;
}

/**
 * 求方阵的迹（对角线元素之和）
 * @param {Array} square_matrix - 方阵
 * @returns {number} 迹的值
 */
/**
 * 求方阵的迹（对角线元素之和）
 * @param {Array<Array<number>>} square_matrix - 方阵
 * @returns {number} - 迹的值
 */
function matrix_trace(square_matrix) {
let trace = 0;
for (let i = 0; i < square_matrix.length; ++i)
trace += square_matrix[i][i];
return trace;
}

/**
 * 解析并计算方阵的迹
 * @param {string} order_string - JSON格式方阵字符串
 * @returns {number|string} 迹的值或"NaN"
 */
/**
 * 解析并执行矩阵求迹指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {number|string} - 迹的值或"NaN"
 */
function cal_trace(order_string) {
	let the_matrix;
	try { the_matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(the_matrix)[0] != matrix_type(the_matrix)[1])
		return "NaN";
	else
		return matrix_trace(the_matrix);
}

/* ==== 行列式 ==== */

/**
 * 递归计算方阵行列式
 * @param {Array} square_matrix - 方阵
 * @returns {number} 行列式的值
 */
/**
 * 递归计算方阵行列式
 * @param {Array<Array<number>>} square_matrix - 方阵
 * @returns {number} - 行列式的值
 */
function matrix_det(square_matrix) {
if (square_matrix.length === 1)
return square_matrix[0][0];
let det = 0;
for (let i = 0; i < square_matrix.length; ++i)
det += ((-1) ** i) * square_matrix[i][0] * matrix_det(cofactor(square_matrix, i, 0));
return det;
}

/**
 * 解析并计算方阵行列式
 * @param {string} order_string - JSON格式方阵字符串
 * @returns {number|string} 行列式的值或"NaN"
 */
/**
 * 解析并执行矩阵求行列式指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {number|string} - 行列式的值或"NaN"
 */
function cal_det(order_string) {
	let the_matrix;
	try { the_matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(the_matrix)[0] != matrix_type(the_matrix)[1])
		return "NaN";
	else
		return matrix_det(the_matrix);
}

/* ==== 逆矩阵 ==== */

/**
 * 求方阵的逆矩阵
 * @param {Array} square_matrix - 方阵
 * @returns {Array|string} 逆矩阵或"NaN"
 */
/**
 * 求方阵的逆矩阵
 * @param {Array<Array<number>>} square_matrix - 方阵
 * @returns {Array<Array<number>>|string} - 逆矩阵或"NaN"
 */
function inv_matrix(square_matrix) {
let det = matrix_det(square_matrix);
if (det < 10 ** (-5) && det > (0 - 10 ** (-5)))
return "NaN";
let inverse = [];
for (let i = 0; i < square_matrix.length; ++i) {
inverse[i] = [];
for (let j = 0; j < square_matrix.length; ++j)
inverse[i][j] = (-1) ** (i + j) * matrix_det(cofactor(square_matrix, j, i)) / det;
}
return inverse;
}

/**
 * 解析并计算方阵逆矩阵
 * @param {string} order_string - JSON格式方阵字符串
 * @returns {Array|string} 逆矩阵或"NaN"
 */
/**
 * 解析并执行矩阵求逆指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {Array<Array<number>>|string} - 逆矩阵或"NaN"
 */
function cal_inverse(order_string) {
	let the_matrix;
	try { the_matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(the_matrix)[0] != matrix_type(the_matrix)[1])
		return "NaN";
	else
		return inv_matrix(the_matrix);
}

/* ==== 特殊矩阵 ==== */

/**
 * 生成n阶单位矩阵
 * @param {number} n - 阶数
 * @returns {Array} n阶单位矩阵
 */
/**
 * 生成n阶单位矩阵
 * @param {number} n - 矩阵阶数
 * @returns {Array<Array<number>>} - n阶单位矩阵
 */
function identity_matrix(n) {
let identity = [];
for (let i = 0; i < n; ++i) {
identity[i] = [];
for (let j = 0; j < n; ++j)
identity[i][j] = ((i === j) ? 1 : 0);
}
return identity;
}

/**
 * 解析并生成单位矩阵
 * @param {string} order_string - 阶数字符串
 * @returns {Array|string} 单位矩阵或"NaN"
 */
/**
 * 解析并执行生成单位矩阵指令
 * @param {string} order_string - 阶数字符串
 * @returns {Array<Array<number>>|string} - 单位矩阵或"NaN"
 */
function cal_identity(order_string) {
	let n;
	try { n = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (typeof (n) !== "number" || n !== Math.floor(n) || n <= 0)
		return "NaN";
	return identity_matrix(n);
}

/**
 * 生成n阶零矩阵
 * @param {number} n - 阶数
 * @returns {Array} n阶零矩阵
 */
/**
 * 生成n阶零矩阵
 * @param {number} n - 矩阵阶数
 * @returns {Array<Array<number>>} - n阶零矩阵
 */
function zero_matrix(n) {
let identity = [];
for (let i = 0; i < n; ++i) {
identity[i] = [];
for (let j = 0; j < n; ++j)
identity[i][j] = 0;
}
return identity;
}

/**
 * 解析并生成零矩阵
 * @param {string} order_string - 阶数字符串
 * @returns {Array|string} 零矩阵或"NaN"
 */
/**
 * 解析并执行生成零矩阵指令
 * @param {string} order_string - 阶数字符串
 * @returns {Array<Array<number>>|string} - 零矩阵或"NaN"
 */
function cal_zero(order_string) {
	let n;
	try { n = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (typeof (n) !== "number" || n !== Math.floor(n) || n <= 0)
		return "NaN";
	return zero_matrix(n);
}

/* ==== 矩阵幂运算 ==== */

/**
 * 矩阵整数次幂
 * @param {Array} square_matrix - 方阵
 * @param {number} integer - 整数指数
 * @returns {Array|string} 幂运算结果矩阵或"NaN"
 */
/**
 * 矩阵幂运算（支持负整数幂，即逆矩阵的幂）
 * @param {Array<Array<number>>} square_matrix - 方阵
 * @param {number} integer - 幂次（整数）
 * @returns {Array<Array<number>>|string} - 幂运算结果或"NaN"
 */
function matrix_power(square_matrix, integer) {
if (integer != Math.floor(integer))
return "NaN";
if (integer === 0)
return identity_matrix(square_matrix.length);
if (integer > 0)
return matrix_product(square_matrix, matrix_power(square_matrix, integer - 1));
let inverse = inv_matrix(square_matrix);
if (integer < 0)
return matrix_product(inverse, matrix_power(square_matrix, integer + 1));
}

/**
 * 解析并计算矩阵幂
 * @param {string} order_string - 矩阵和指数，以分号分隔
 * @returns {Array|string} 幂运算结果或"NaN"
 */
/**
 * 解析并执行矩阵幂运算指令
 * @param {string} order_string - 矩阵和幂次，以分号分隔
 * @returns {Array<Array<number>>|string} - 幂运算结果或"NaN"
 */
function cal_mx_power(order_string) {
let matrix_string = "";
let integer_string = "";
let i = -1;
for (++i; i < order_string.length; ++i)
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
matrix_string += order_string[i];
for (++i; i < order_string.length; ++i) {
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
integer_string += order_string[i];
}
	let matrix;
	let integer;
	try { matrix = JSON.parse(matrix_string); } catch (e) { return "矩阵格式错误"; }
	try { integer = JSON.parse(integer_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix)[0] != matrix_type(matrix)[1] || typeof (integer) !== "number")
		return "NaN";
	else
		return matrix_power(matrix, integer);
}

/* ==== 矩阵乘法 ==== */

/**
 * 矩阵乘法
 * @param {Array} matrix_1 - 左矩阵
 * @param {Array} matrix_2 - 右矩阵
 * @returns {Array} 乘积矩阵
 */
/**
 * 矩阵乘法
 * @param {Array<Array<number>>} matrix_1 - 左矩阵
 * @param {Array<Array<number>>} matrix_2 - 右矩阵
 * @returns {Array<Array<number>>} - 乘积矩阵
 */
function matrix_product(matrix_1, matrix_2) {
let product_result = [];
for (let i = 0; i < matrix_1.length; ++i) {
product_result[i] = [];
for (let j = 0; j < matrix_2[0].length; ++j) {
product_result[i][j] = 0;
for (let k = 0; k < matrix_2.length; ++k)
product_result[i][j] += matrix_1[i][k] * matrix_2[k][j];
}
}
return product_result;
}

/**
 * 解析并计算矩阵乘法
 * @param {string} order_string - 两个矩阵JSON，以分号分隔
 * @returns {Array|string} 乘积矩阵或"NaN"
 */
/**
 * 解析并执行矩阵乘法指令
 * @param {string} order_string - 两个矩阵的JSON字符串，以分号分隔
 * @returns {Array<Array<number>>|string} - 乘积矩阵或"NaN"
 */
function cal_product(order_string) {
let matrix_1_string = "";
let matrix_2_string = "";
let i = -1;
for (++i; i < order_string.length; ++i)
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
matrix_1_string += order_string[i];
for (++i; i < order_string.length; ++i) {
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
matrix_2_string += order_string[i];
}
	let matrix_1;
	let matrix_2;
	try { matrix_1 = JSON.parse(matrix_1_string); } catch (e) { return "矩阵格式错误"; }
	try { matrix_2 = JSON.parse(matrix_2_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix_1)[1] != matrix_type(matrix_2)[0])
		return "NaN";
	else
		return matrix_product(matrix_1, matrix_2);
}

/* ==== 矩阵数乘 ==== */

/**
 * 矩阵与数的乘法
 * @param {Array} matrix - 矩阵
 * @param {number} number - 乘数
 * @returns {Array} 数乘结果矩阵
 */
/**
 * 矩阵数乘（每个元素乘以一个数）
 * @param {Array<Array<number>>} matrix - 矩阵
 * @param {number} number - 乘数
 * @returns {Array<Array<number>>} - 数乘后的矩阵
 */
function matrix_number_product(matrix, number) {
let product_result = [];
for (let i = 0; i < matrix.length; ++i) {
product_result[i] = [];
for (let j = 0; j < matrix[0].length; ++j)
product_result[i][j] = matrix[i][j] * number;
}
return product_result;
}

/**
 * 解析并计算矩阵数乘
 * @param {string} order_string - 矩阵和数，以分号分隔
 * @returns {Array|string} 数乘结果或"NaN"
 */
/**
 * 解析并执行矩阵数乘指令
 * @param {string} order_string - 矩阵和数值，以分号分隔
 * @returns {Array<Array<number>>|string} - 数乘结果或"NaN"
 */
function cal_number_product(order_string) {
let matrix_string = "";
let integer_string = "";
let i = -1;
for (++i; i < order_string.length; ++i)
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
matrix_string += order_string[i];
for (++i; i < order_string.length; ++i) {
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
integer_string += order_string[i];
}
	let matrix;
	let integer;
	try { matrix = JSON.parse(matrix_string); } catch (e) { return "矩阵格式错误"; }
	try { integer = JSON.parse(integer_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix).length > 2 || typeof (integer) !== "number")
		return "NaN";
	else
		return matrix_number_product(matrix, integer);
}

/* ==== 矩阵加法 ==== */

/**
 * 矩阵加法
 * @param {Array} matrix_1 - 矩阵
 * @param {Array} matrix_2 - 矩阵
 * @returns {Array} 和矩阵
 */
/**
 * 矩阵加法
 * @param {Array<Array<number>>} matrix_1 - 左矩阵
 * @param {Array<Array<number>>} matrix_2 - 右矩阵
 * @returns {Array<Array<number>>} - 和矩阵
 */
function matrix_sum(matrix_1, matrix_2) {
let sum_result = [];
for (let i = 0; i < matrix_1.length; ++i) {
sum_result[i] = [];
for (let j = 0; j < matrix_1[0].length; ++j)
sum_result[i][j] = matrix_1[i][j] + matrix_2[i][j];
}
return sum_result;
}

/**
 * 解析并计算矩阵加法
 * @param {string} order_string - 两个矩阵JSON，以分号分隔
 * @returns {Array|string} 和矩阵或"NaN"
 */
/**
 * 解析并执行矩阵加法指令
 * @param {string} order_string - 两个矩阵的JSON字符串，以分号分隔
 * @returns {Array<Array<number>>|string} - 和矩阵或"NaN"
 */
function cal_sum(order_string) {
let matrix_1_string = "";
let matrix_2_string = "";
let i = -1;
for (++i; i < order_string.length; ++i)
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
matrix_1_string += order_string[i];
for (++i; i < order_string.length; ++i) {
if (order_string[i] === ";" || order_string[i] === "；")
break;
else
matrix_2_string += order_string[i];
}
	let matrix_1;
	let matrix_2;
	try { matrix_1 = JSON.parse(matrix_1_string); } catch (e) { return "矩阵格式错误"; }
	try { matrix_2 = JSON.parse(matrix_2_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix_1).length > 2 || matrix_type(matrix_2).length > 2 || matrix_type(matrix_1)[0] != matrix_type(matrix_2)[0] || matrix_type(matrix_1)[1] != matrix_type(matrix_2)[1])
return "NaN";
else
return matrix_sum(matrix_1, matrix_2);
}

/* ==== 矩阵范数与转置 ==== */

/**
 * 矩阵F范数（Frobenius范数）
 * @param {Array} matrix - 矩阵
 * @returns {number} 范数值
 */
/**
 * 矩阵Frobenius范数（迹(A*A^T)）
 * @param {Array<Array<number>>} matrix - 矩阵
 * @returns {number} - 范数值
 */
function matrix_norm(matrix) {
return matrix_trace(matrix_product(matrix, matrix_transpose(matrix)));
}

/**
 * 解析并计算矩阵范数
 * @param {string} order_string - JSON格式矩阵字符串
 * @returns {number|string} 范数值或"NaN"
 */
/**
 * 解析并执行矩阵求范数指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {number|string} - 范数值或"NaN"
 */
function cal_norm(order_string) {
	let matrix;
	try { matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix).length > 2)
		return "NaN";
	else
		return matrix_norm(matrix);
}

/**
 * 矩阵转置
 * @param {Array} matrix - 矩阵
 * @returns {Array} 转置矩阵
 */
/**
 * 矩阵转置
 * @param {Array<Array<number>>} matrix - 原矩阵
 * @returns {Array<Array<number>>} - 转置矩阵
 */
function matrix_transpose(matrix) {
let transpose = [];
for (let i = 0; i < matrix[0].length; ++i) {
transpose[i] = [];
for (let j = 0; j < matrix.length; ++j)
transpose[i][j] = matrix[j][i];
}
return transpose;
}

/**
 * 解析并计算矩阵转置
 * @param {string} order_string - JSON格式矩阵字符串
 * @returns {Array|string} 转置矩阵或"NaN"
 */
/**
 * 解析并执行矩阵转置指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {Array<Array<number>>|string} - 转置矩阵或"NaN"
 */
function cal_transpose(order_string) {
	let matrix;
	try { matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix).length > 2)
		return "NaN";
	else
		return matrix_transpose(matrix);
}

/* ==== 矩阵指数与对数 ==== */

/**
 * 矩阵指数（e的矩阵次方），泰勒展开近似
 * @param {Array} matrix - 方阵
 * @returns {Array} 指数矩阵
 */
/**
 * 矩阵指数（e^A），通过泰勒展开近似计算
 * @param {Array<Array<number>>} matrix - 方阵
 * @returns {Array<Array<number>>} - 指数矩阵
 */
function E_power(matrix) {
let power_result = identity_matrix(matrix.length);
let power_index = identity_matrix(matrix.length);
let factorial = 1;
for (let n = 1; matrix_norm(power_index) / factorial > (10 ** (-8)); ++n) {
factorial = factorial * n;
power_index = matrix_product(power_index, matrix);
power_result = matrix_sum(power_result, matrix_number_product(power_index, 1 / factorial));
}
return power_result;
}

/**
 * 解析并计算矩阵指数
 * @param {string} order_string - JSON格式方阵字符串
 * @returns {Array|string} 指数矩阵或"NaN"
 */
/**
 * 解析并执行矩阵指数运算指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {Array<Array<number>>|string} - 指数矩阵或"NaN"
 */
function cal_E_power(order_string) {
	let matrix;
	try { matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix)[0] != matrix_type(matrix)[1])
		return "NaN";
	else
		return E_power(matrix);
}

/**
 * 矩阵对数（未实现）
 * @param {Array} matrix - 方阵
 * @returns {void}
 */
/**
 * 矩阵对数（未实现）
 * @param {Array<Array<number>>} matrix - 方阵
 * @returns {undefined}
 */
function matrix_ln(matrix) {

}

/**
 * 解析并计算矩阵对数
 * @param {string} order_string - JSON格式方阵字符串
 * @returns {void|string} 对数矩阵或"NaN"
 */
/**
 * 解析并执行矩阵对数运算指令
 * @param {string} order_string - JSON格式的矩阵字符串
 * @returns {undefined|string} - 对数矩阵或"NaN"
 */
function cal_ln(order_string) {
	let matrix;
	try { matrix = JSON.parse(order_string); } catch (e) { return "矩阵格式错误"; }
	if (matrix_type(matrix)[0] != matrix_type(matrix)[1])
		return "NaN";
	else
		return matrix_ln(matrix);
}