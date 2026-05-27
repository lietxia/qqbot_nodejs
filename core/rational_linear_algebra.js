/**
 * @模块 rational_linear_algebra.js
 * @描述 有理数矩阵运算模块，提供有理数矩阵的行列式、逆矩阵、幂、指数、转置等精确运算
 */

/* ==== 有理数矩阵转换与显示 ==== */

/**
 * 将浮点数矩阵转换为有理数矩阵
 * @param {Array} matrix - 二维数值矩阵
 * @returns {Array|string} 有理数矩阵或"NaN"
 */
/**
 * @模块 rational_linear_algebra.js
 * @描述 有理数矩阵运算模块，基于有理数精确计算实现矩阵的行列式、逆矩阵、幂、转置、指数矩阵等运算
 */

/**
 * 将浮点数矩阵转换为有理数矩阵
 * @param {Array<Array<number>>} matrix - 浮点数矩阵
 * @returns {Array<Array<Array<string>>>|string} - 有理数矩阵或"NaN"
 */
function rational_matrix(matrix) {
let matrix_rational = [];
for (let i = 0; i < matrix.length; ++i) {
matrix_rational[i] = [];
for (let j = 0; j < matrix[i].length; ++j) {
if (typeof (matrix[i][j]) !== "number")
return "NaN";
matrix_rational[i][j] = rational_define(matrix[i][j]);
}
}
return matrix_rational;
}

/**
 * 将有理数矩阵转换为可读字符串矩阵
 * @param {Array} matrix - 有理数矩阵
 * @returns {Array} 字符串矩阵
 */
/**
 * 将有理数矩阵转换为可读字符串矩阵
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
 * @returns {Array<Array<string>>} - 字符串矩阵
 */
function matrix_show(matrix) {
let show_matrix = [];
for (let i = 0; i < matrix.length; ++i) {
show_matrix[i] = [];
for (let j = 0; j < matrix[i].length; ++j)
show_matrix[i][j] = rational_show(matrix[i][j]);
}
return show_matrix;
}

/* ==== 有理数矩阵类型检查 ==== */

/**
 * 检查有理数矩阵类型
 * @param {Array} matrix - 有理数矩阵
 * @returns {Array|string} [行数, 列数] 或 "that is not a matrix"
 */
/**
 * 检测有理数矩阵类型，返回[行宽, 列高]或错误信息
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
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
if (!is_rational(matrix[i][j]))
return "that is not a matrix";
}
return [row_length, column_length];
}

/* ==== 余子式 ==== */

/**
 * 求有理数矩阵的余子式
 * @param {Array} matrix - 有理数矩阵
 * @param {number} int_i - 要删除的行索引
 * @param {number} int_j - 要删除的列索引
 * @returns {Array} 余子式矩阵
 */
/**
 * 求有理数矩阵的余子式
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
 * @param {number} int_i - 要去掉的行索引
 * @param {number} int_j - 要去掉的列索引
 * @returns {Array<Array<Array<string>>>} - 余子式矩阵
 */
function cofactor(matrix, int_i, int_j) {
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

/* ==== 有理数矩阵迹与行列式 ==== */

/**
 * 求有理数方阵的迹
 * @param {Array} square_matrix - 有理数方阵
 * @returns {Array} 迹的有理数
 */
/**
 * 求有理数方阵的迹
 * @param {Array<Array<Array<string>>>} square_matrix - 有理数方阵
 * @returns {Array<string>} - 迹的有理数表示
 */
function matrix_trace(square_matrix) {
let trace = rational_define(0);
for (let i = 0; i < square_matrix.length; ++i)
trace = rational_add(trace, square_matrix[i][i]);
return trace;
}

/**
 * 递归计算有理数方阵行列式
 * @param {Array} square_matrix - 有理数方阵
 * @returns {Array} 行列式的有理数值
 */
/**
 * 递归计算有理数方阵行列式
 * @param {Array<Array<Array<string>>>} square_matrix - 有理数方阵
 * @returns {Array<string>} - 行列式的有理数表示
 */
function matrix_det(square_matrix) {
if (square_matrix.length === 1)
return square_matrix[0][0];
let det = rational_define(0);
for (let i = 0; i < square_matrix.length; ++i)
det = rational_add(det, rational_multiply(rational_define((-1) ** i), rational_multiply(square_matrix[i][0], matrix_det(cofactor(square_matrix, i, 0)))));
return det;
}

/* ==== 有理数逆矩阵 ==== */

/**
 * 求有理数方阵的逆矩阵
 * @param {Array} square_matrix - 有理数方阵
 * @returns {Array|string} 逆矩阵或"NaN"
 */
/**
 * 求有理数方阵的逆矩阵
 * @param {Array<Array<Array<string>>>} square_matrix - 有理数方阵
 * @returns {Array<Array<Array<string>>>|string} - 逆矩阵或"NaN"
 */
function inv_matrix(square_matrix) {
let det = matrix_det(square_matrix);
if (det < 10 ** (-5) && det > (0 - 10 ** (-5)))
return "NaN";
let inverse = [];
for (let i = 0; i < square_matrix.length; ++i) {
inverse[i] = [];
for (let j = 0; j < square_matrix.length; ++j)
inverse[i][j] = rational_multiply(rational_define((-1) ** (i + j)), rational_divide(matrix_det(cofactor(square_matrix, j, i)), det));
}
return inverse;
}

/* ==== 单位矩阵与零矩阵 ==== */

/**
 * 生成有理数n阶单位矩阵
 * @param {number} n - 矩阵阶数
 * @returns {Array} 有理数单位矩阵
 */
/**
 * 生成n阶有理数单位矩阵
 * @param {number} n - 矩阵阶数
 * @returns {Array<Array<Array<string>>>} - 有理数单位矩阵
 */
function identity_matrix(n) {
let identity = [];
for (let i = 0; i < n; ++i) {
identity[i] = [];
for (let j = 0; j < n; ++j)
identity[i][j] = ((i === j) ? rational_define(1) : rational_define(0));
}
return identity;
}


/**
 * 生成有理数n阶零矩阵
 * @param {number} n - 矩阵阶数
 * @returns {Array} 有理数零矩阵
 */
/**
 * 生成n阶有理数零矩阵
 * @param {number} n - 矩阵阶数
 * @returns {Array<Array<Array<string>>>} - 有理数零矩阵
 */
function zero_matrix(n) {
let identity = [];
for (let i = 0; i < n; ++i) {
identity[i] = [];
for (let j = 0; j < n; ++j)
identity[i][j] = rational_define(0);
}
return identity;
}


/* ==== 有理数矩阵幂与乘法 ==== */

/**
 * 有理数方阵的整数次幂
 * @param {Array} square_matrix - 有理数方阵
 * @param {number} integer - 整数指数
 * @returns {Array|string} 幂运算结果或"NaN"
 */
/**
 * 有理数矩阵幂运算
 * @param {Array<Array<Array<string>>>} square_matrix - 有理数方阵
 * @param {number} integer - 幂次（整数）
 * @returns {Array<Array<Array<string>>>|string} - 幂运算结果或"NaN"
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
 * 有理数矩阵乘法
 * @param {Array} matrix_1 - 左矩阵
 * @param {Array} matrix_2 - 右矩阵
 * @returns {Array} 乘积矩阵
 */
/**
 * 有理数矩阵乘法
 * @param {Array<Array<Array<string>>>} matrix_1 - 左矩阵
 * @param {Array<Array<Array<string>>>} matrix_2 - 右矩阵
 * @returns {Array<Array<Array<string>>>} - 乘积矩阵
 */
function matrix_product(matrix_1, matrix_2) {
let product_result = [];
for (let i = 0; i < matrix_1.length; ++i) {
product_result[i] = [];
for (let j = 0; j < matrix_2[0].length; ++j) {
product_result[i][j] = rational_define(0);
for (let k = 0; k < matrix_2.length; ++k)
product_result[i][j] = rational_add(product_result[i][j], rational_multiply(matrix_1[i][k], matrix_2[k][j]));
}
}
return product_result;
}

/**
 * 有理数矩阵与数的乘法
 * @param {Array} matrix - 有理数矩阵
 * @param {number} number - 乘数
 * @returns {Array} 数乘结果矩阵
 */
/**
 * 有理数矩阵数乘
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
 * @param {number} number - 乘数
 * @returns {Array<Array<Array<string>>>} - 数乘后的矩阵
 */
function matrix_number_product(matrix, number) {
let product_result = [];
let number_rational = rational_define(number);
for (let i = 0; i < matrix.length; ++i) {
product_result[i] = [];
for (let j = 0; j < matrix[0].length; ++j)
product_result[i][j] = rational_multiply(matrix[i][j], number_rational);
}
return product_result;
}

/**
 * 有理数矩阵与数的除法
 * @param {Array} matrix - 有理数矩阵
 * @param {number} number - 除数
 * @returns {Array} 数除结果矩阵
 */
/**
 * 有理数矩阵数除
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
 * @param {number} number - 除数
 * @returns {Array<Array<Array<string>>>} - 数除后的矩阵
 */
function matrix_number_divide(matrix, number) {
let product_result = [];
let number_rational = rational_define(number);
for (let i = 0; i < matrix.length; ++i) {
product_result[i] = [];
for (let j = 0; j < matrix[0].length; ++j)
product_result[i][j] = rational_divide(matrix[i][j], number_rational);
}
return product_result;
}

/* ==== 有理数矩阵加法与范数 ==== */

/**
 * 有理数矩阵加法
 * @param {Array} matrix_1 - 有理数矩阵
 * @param {Array} matrix_2 - 有理数矩阵
 * @returns {Array} 和矩阵
 */
/**
 * 有理数矩阵加法
 * @param {Array<Array<Array<string>>>} matrix_1 - 左矩阵
 * @param {Array<Array<Array<string>>>} matrix_2 - 右矩阵
 * @returns {Array<Array<Array<string>>>} - 和矩阵
 */
function matrix_sum(matrix_1, matrix_2) {
let sum_result = [];
for (let i = 0; i < matrix_1.length; ++i) {
sum_result[i] = [];
for (let j = 0; j < matrix_1[0].length; ++j)
sum_result[i][j] = rational_add(matrix_1[i][j], matrix_2[i][j]);
}
return sum_result;
}

/**
 * 有理数矩阵Frobenius范数
 * @param {Array} matrix - 有理数矩阵
 * @returns {Array} 范数的有理数值
 */
/**
 * 有理数矩阵Frobenius范数
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
 * @returns {Array<string>} - 范数的有理数表示
 */
function matrix_norm(matrix) {
return matrix_trace(matrix_product(matrix, matrix_transpose(matrix)));
}

/**
 * 有理数矩阵转置
 * @param {Array} matrix - 有理数矩阵
 * @returns {Array} 转置矩阵
 */
/**
 * 有理数矩阵转置
 * @param {Array<Array<Array<string>>>} matrix - 有理数矩阵
 * @returns {Array<Array<Array<string>>>} - 转置矩阵
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

/* ==== 有理数矩阵指数 ==== */

/**
 * 计算有理数矩阵的指数（e^A，泰勒展开）
 * @param {Array} matrix - 有理数方阵
 * @returns {Array} 指数矩阵
 */
/**
 * 有理数矩阵指数（e^A），通过泰勒展开近似计算
 * @param {Array<Array<Array<string>>>} matrix - 有理数方阵
 * @returns {Array<Array<Array<string>>>} - 指数矩阵
 */
function E_power(matrix) {
let power_result = identity_matrix(matrix.length);
let power_index = identity_matrix(matrix.length);
let factorial = 1;
for (let n = 1; rational_bigger(rational_divide(matrix_norm(power_index), rational_define(factorial)), [1, 10 ** 14]); ++n) {
factorial = factorial * n;
power_index = matrix_product(power_index, matrix);
power_result = matrix_sum(power_result, matrix_number_divide(power_index, factorial));
}
return power_result;
}