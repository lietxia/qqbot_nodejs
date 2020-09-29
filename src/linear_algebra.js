function matrix_function() {
	if (message.substr(2, 3) == "det")
		return cal_det(catch_content(5));
	if (message.substr(2, 3) == "inv")
		return cal_inverse(catch_content(5));
	if (message.substr(2, 3) == "E**")
		return cal_E_power(catch_content(5));
	if (message.substr(2, 2) == "tr")
		return cal_trace(catch_content(4));
	if (message.substr(2, 2) == "**")
		return cal_mx_power(catch_content(4));
	if (message.substr(2, 2) == "||")
		return cal_norm(catch_content(4));
	if (message.substr(2, 2) == "id")
		return cal_identity(catch_content(4));
	if (message.substr(2, 2) == "zr")
		return cal_zero(catch_content(4));
	if (message.substr(2, 2) == "rd")
		return cal_round(catch_content(4));
	if (message.substr(2, 2) == "ln")
		return cal_ln(catch_content(4));
	if (message.substr(2, 1) == "+")
		return cal_sum(catch_content(3));
	if (message.substr(2, 1) == "*")
		return cal_product(catch_content(3));
	if (message.substr(2, 1) == "T")
		return cal_transpose(catch_content(3));
	return "";
}

function matrix_round(matrix, n = 0) {
	let round_matrix = [];
	for (let i = 0; i < matrix.length; ++i) {
		round_matrix[i] = [];
		for (let j = 0; j < matrix[i].length; ++j)
			round_matrix[i][j] = Math.round(matrix[i][j] * (10 ** n)) / (10 ** n);
	}
	return round_matrix;
}

function cal_round(order_string) {
	let matrix = JSON.parse(order_string);
	if (matrix_type(matrix).length > 2)
		return "NaN";
	else
		return matrix_round(matrix);
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
			if (typeof (matrix[i][j]) != "number")
				return "that is not a matrix";
	}
	return [row_length, column_length];
}

function cofactor(matrix, int_i, int_j) {
	if (matrix_type(matrix) == "that is not a matrix")
		return "that is not a matrix";
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
	let trace = 0;
	for (let i = 0; i < square_matrix.length; ++i)
		trace += square_matrix[i][i];
	return trace;
}

function cal_trace(order_string) {
	let the_matrix = JSON.parse(order_string);
	if (matrix_type(the_matrix)[0] != matrix_type(the_matrix)[1])
		return "NaN";
	else
		return matrix_trace(the_matrix);
}

function matrix_det(square_matrix) {
	if (square_matrix.length == 1)
		return square_matrix[0][0];
	let det = 0;
	for (let i = 0; i < square_matrix.length; ++i)
		det += ((-1) ** i) * square_matrix[i][0] * matrix_det(cofactor(square_matrix, i, 0));
	return det;
}

function cal_det(order_string) {
	let the_matrix = JSON.parse(order_string);
	if (matrix_type(the_matrix)[0] != matrix_type(the_matrix)[1])
		return "NaN";
	else
		return matrix_det(the_matrix);
}

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

function cal_inverse(order_string) {
	let the_matrix = JSON.parse(order_string);
	if (matrix_type(the_matrix)[0] != matrix_type(the_matrix)[1])
		return "NaN";
	else
		return inv_matrix(the_matrix);
}

function identity_matrix(n) {
	let identity = [];
	for (let i = 0; i < n; ++i) {
		identity[i] = [];
		for (let j = 0; j < n; ++j)
			identity[i][j] = ((i == j) ? 1 : 0);
	}
	return identity;
}

function cal_identity(order_string) {
	let n = JSON.parse(order_string);
	if (typeof (n) != "number" || n != Math.floor(n) || n <= 0)
		return "NaN";
	return identity_matrix(n);
}

function zero_matrix(n) {
	let identity = [];
	for (let i = 0; i < n; ++i) {
		identity[i] = [];
		for (let j = 0; j < n; ++j)
			identity[i][j] = 0;
	}
	return identity;
}

function cal_zero(order_string) {
	let n = JSON.parse(order_string);
	if (typeof (n) != "number" || n != Math.floor(n) || n <= 0)
		return "NaN";
	return zero_matrix(n);
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

function cal_mx_power(order_string) {
	let matrix_string = "";
	let integer_string = "";
	let i = -1;
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			matrix_string += order_string[i];
	for (++i; i < order_string.length; ++i) {
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			integer_string += order_string[i];
	}
	let matrix = JSON.parse(matrix_string);
	let integer = JSON.parse(integer_string);
	if (matrix_type(matrix)[0] != matrix_type(matrix)[1] || typeof (integer) != "number")
		return "NaN";
	else
		return matrix_power(matrix, integer);
}

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

function cal_product(order_string) {
	let matrix_1_string = "";
	let matrix_2_string = "";
	let i = -1;
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			matrix_1_string += order_string[i];
	for (++i; i < order_string.length; ++i) {
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			matrix_2_string += order_string[i];
	}
	let matrix_1 = JSON.parse(matrix_1_string);
	let matrix_2 = JSON.parse(matrix_2_string);
	if (matrix_type(matrix_1)[1] != matrix_type(matrix_2)[0])
		return "NaN";
	else
		return matrix_product(matrix_1, matrix_2);
}

function matrix_number_product(matrix, number) {
	let product_result = [];
	for (let i = 0; i < matrix.length; ++i) {
		product_result[i] = [];
		for (let j = 0; j < matrix[0].length; ++j)
			product_result[i][j] = matrix[i][j] * number;
	}
	return product_result;
}

function cal_number_product(order_string) {
	let matrix_string = "";
	let integer_string = "";
	let i = -1;
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			matrix_string += order_string[i];
	for (++i; i < order_string.length; ++i) {
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			integer_string += order_string[i];
	}
	let matrix = JSON.parse(matrix_string);
	let integer = JSON.parse(integer_string);
	if (matrix_type(matrix).length > 2 || typeof (integer) != "number")
		return "NaN";
	else
		return matrix_number_product(matrix, integer);
}

function matrix_sum(matrix_1, matrix_2) {
	let sum_result = [];
	for (let i = 0; i < matrix_1.length; ++i) {
		sum_result[i] = [];
		for (let j = 0; j < matrix_1[0].length; ++j)
			sum_result[i][j] = matrix_1[i][j] + matrix_2[i][j];
	}
	return sum_result;
}

function cal_sum(order_string) {
	let matrix_1_string = "";
	let matrix_2_string = "";
	let i = -1;
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			matrix_1_string += order_string[i];
	for (++i; i < order_string.length; ++i) {
		if (order_string[i] == ";" || order_string[i] == "；")
			break;
		else
			matrix_2_string += order_string[i];
	}
	let matrix_1 = JSON.parse(matrix_1_string);
	let matrix_2 = JSON.parse(matrix_2_string);
	if (matrix_type(matrix_1).length > 2 || matrix_type(matrix_2).length > 2 || matrix_type(matrix_1)[0] != matrix_type(matrix_2)[0] || matrix_type(matrix_1)[1] != matrix_type(matrix_2)[1])
		return "NaN";
	else
		return matrix_sum(matrix_1, matrix_2);
}

function matrix_norm(matrix) {
	return matrix_trace(matrix_product(matrix, matrix_transpose(matrix)));
}

function cal_norm(order_string) {
	let matrix = JSON.parse(order_string);
	if (matrix_type(matrix).length > 2)
		return "NaN";
	else
		return matrix_norm(matrix);
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

function cal_transpose(order_string) {
	let matrix = JSON.parse(order_string);
	if (matrix_type(matrix).length > 2)
		return "NaN";
	else
		return matrix_transpose(matrix);
}

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

function cal_E_power(order_string) {
	let matrix = JSON.parse(order_string);
	if (matrix_type(matrix)[0] != matrix_type(matrix)[1])
		return "NaN";
	else
		return E_power(matrix);
}

function matrix_ln(matrix) {

}

function cal_ln(order_string) {
	let matrix = JSON.parse(order_string);
	if (matrix_type(matrix)[0] != matrix_type(matrix)[1])
		return "NaN";
	else
		return matrix_ln(matrix);
}