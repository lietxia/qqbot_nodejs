function rational_matrix(matrix) {
	let matrix_rational = [];
	for (let i = 0; i < matrix.length; ++i) {
		matrix_rational[i] = [];
		for (let j = 0; j < matrix[i].length; ++j) {
			if (typeof (matrix[i][j]) != "number")
				return "NaN";
			matrix_rational[i][j] = rational_define(matrix[i][j]);
		}
	}
	return matrix_rational;
}

function matrix_show(matrix) {
	let show_matrix = [];
	for (let i = 0; i < matrix.length; ++i) {
		show_matrix[i] = [];
		for (let j = 0; j < matrix[i].length; ++j)
			show_matrix[i][j] = rational_show(matrix[i][j]);
	}
	return show_matrix;
}

function matrix_type(matrix) {
	let check_matrix = JSON.stringify(matrix);
	if (check_matrix[0] != "[" || check_matrix[1] != "[")
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

function cofactor(matrix, int_i, int_j) {
	let cofactor_matrix = [], x = 0, y = 0;
	for (let i = 0; i < matrix.length; ++i)
		if (i == int_i)
			continue;
		else {
			cofactor_matrix[x] = [];
			for (let j = 0; j < matrix[i].length; ++j)
				if (j == int_j)
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

function matrix_trace(square_matrix) {
	let trace = rational_define(0);
	for (let i = 0; i < square_matrix.length; ++i)
		trace = rational_add(trace, square_matrix[i][i]);
	return trace;
}

function matrix_det(square_matrix) {
	if (square_matrix.length == 1)
		return square_matrix[0][0];
	let det = rational_define(0);
	for (let i = 0; i < square_matrix.length; ++i)
		det = rational_add(det, rational_multiply(rational_define((-1) ** i), rational_multiply(square_matrix[i][0], matrix_det(cofactor(square_matrix, i, 0)))));
	return det;
}

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

function identity_matrix(n) {
	let identity = [];
	for (let i = 0; i < n; ++i) {
		identity[i] = [];
		for (let j = 0; j < n; ++j)
			identity[i][j] = ((i == j) ? rational_define(1) : rational_define(0));
	}
	return identity;
}


function zero_matrix(n) {
	let identity = [];
	for (let i = 0; i < n; ++i) {
		identity[i] = [];
		for (let j = 0; j < n; ++j)
			identity[i][j] = rational_define(0);
	}
	return identity;
}


function matrix_power(square_matrix, integer) {
	if (integer != Math.floor(integer))
		return "NaN";
	if (integer == 0)
		return identity_matrix(square_matrix.length);
	if (integer > 0)
		return matrix_product(square_matrix, matrix_power(square_matrix, integer - 1));
	let inverse = inv_matrix(square_matrix);
	if (integer < 0)
		return matrix_product(inverse, matrix_power(square_matrix, integer + 1));
}

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

function matrix_sum(matrix_1, matrix_2) {
	let sum_result = [];
	for (let i = 0; i < matrix_1.length; ++i) {
		sum_result[i] = [];
		for (let j = 0; j < matrix_1[0].length; ++j)
			sum_result[i][j] = rational_add(matrix_1[i][j], matrix_2[i][j]);
	}
	return sum_result;
}

function matrix_norm(matrix) {
	return matrix_trace(matrix_product(matrix, matrix_transpose(matrix)));
}

function matrix_transpose(matrix) {
	let transpose = [];
	for (let i = 0; i < matrix[0].length; ++i) {
		transpose[i] = [];
		for (let j = 0; j < matrix.length; ++j)
			transpose[i][j] = matrix[j][i];
	}
	return transpose;
}

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