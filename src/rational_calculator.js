function is_rational(a) {
	if (a.length > 2)
		return false;
	if (!is_integer(a[0]))
		return false;
	if (!is_integer(a[1]))
		return false;
	return true;
}

function gcd(a, b) {
	if (!is_integer(a) || !is_integer(b))
		return "NaN";
	if (a[0] == "-")
		a = a.substr(1);
	if (b[0] == "-")
		b = b.substr(1);
	if (b == "0")
		return a;
	let a_mod_b = positive_divide(a, b)[1];
	if (a_mod_b == 0)
		return b;
	let b_mod_a = positive_divide(b, a)[1];
	if (b_mod_a == 0)
		return a;
	if (positive_greater(a, b))
		return gcd(b, a_mod_b);
	return gcd(a, b_mod_a);
}

function rational_define(number) {
	if (number.indexOf(".") < 0)
		return [integer_simplify(number), "1"];
	if (number.replace(".", "").indexOf(".") >= 0)
		return ["NaN", "NaN"];
	let deci_amount = number.length - number.indexOf(".") - 1;
	return rational_simplify([integer_simplify(number.replace(".", "")), power_10(deci_amount)]);
}

function rational_simplify(rat) {
	let g = gcd(rat[0], rat[1]);
	if (!is_integer(g))
		return ["NaN", "NaN"];
	return (rat[1][0] != "-") ? [integer_divide(rat[0], g)[0], positive_divide(rat[1], g)[0]] : [neg_integer(integer_divide(rat[0], g)[0]), positive_divide(rat[1].substr(1), g)[0]];
}

function rational_absolute(rat_a) {
	if (rat_a[0][0] == "-")
		return [rat_a[0].substr(1), rat_a[1]];
	return rat_a;
}

function rational_add(rat_a, rat_b) {
	return rational_simplify([integer_add(integer_multiply(rat_a[0], rat_b[1]), integer_multiply(rat_a[1], rat_b[0])), integer_multiply(rat_a[1], rat_b[1])]);
}

function rational_minus(rat_a, rat_b) {
	return rational_simplify([integer_minus(integer_multiply(rat_a[0], rat_b[1]), integer_multiply(rat_a[1], rat_b[0])), integer_multiply(rat_a[1], rat_b[1])]);
}

function rational_multiply(rat_a, rat_b) {
	return rational_simplify([integer_multiply(rat_a[0], rat_b[0]), integer_multiply(rat_a[1], rat_b[1])]);
}

function rational_divide(rat_a, rat_b) {
	return rational_simplify([integer_multiply(rat_a[0], rat_b[1]), integer_multiply(rat_a[1], rat_b[0])]);
}

function rational_greater(rat_a, rat_b) {
	let sim_a = rational_simplify(rat_a);
	let sim_b = rational_simplify(rat_b);
	return integer_greater(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

function rational_smaller(rat_a, rat_b) {
	let sim_a = rational_simplify(rat_a);
	let sim_b = rational_simplify(rat_b);
	return integer_smaller(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

function rational_equal_or_greater(rat_a, rat_b) {
	let sim_a = rational_simplify(rat_a);
	let sim_b = rational_simplify(rat_b);
	return integer_equal_or_greater(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

function rational_equal_or_smaller(rat_a, rat_b) {
	let sim_a = rational_simplify(rat_a);
	let sim_b = rational_simplify(rat_b);
	return integer_equal_or_smaller(integer_multiply(sim_a[0], sim_b[1]), integer_multiply(sim_a[1], sim_b[0]));
}

function rational_factorial(rat_a) {
	if (rat_a[1] != "1")
		return ["NaN", "NaN"];
	if (positive_greater(rat_a[0], "250"))
		return ["1", "0"];
	return [integer_factorial(rat_a[0]), "1"];
}

function rational_floor(rat_a) {
	return [integer_divide(rat_a[0], rat_a[1])[0], "1"];
}

function neg_rational(rat_a) {
	return [neg_integer(rat_a[0]), rat_a[1]];
}

function rational_int_power(rat_a, int_b) {
	if (int_b[0] == "-")
		return rational_int_power(rational_simplify([rat_a[1], rat_a[0]]), int_b.substr(1));
	if (rat_a[0][0] == "-")
		if (positive_divide(int_b, "2")[1] == "0")
			return [positive_power(rat_a[0].substr(1), int_b), positive_power(rat_a[1], int_b)];
		else
			return ["-" + positive_power(rat_a[0].substr(1), int_b), positive_power(rat_a[1], int_b)];
	return [positive_power(rat_a[0], int_b), positive_power(rat_a[1], int_b)];
}

/* function exact_root(int_a,int_b)
{
	let itt_r=[];
	let itt_f="0";
	let itt_b=int_a.substr(0,Math.ceil(int_a.length/JSON.parse(int_b)))+"0";
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


function rational_show(rat, precision = 14) {
	if (!is_integer(rat[0]) || !is_integer(rat[1]))
		return "NaN";
	if (rat[1] == "0")
		if (rat[0][0] == "-")
			return "-Infinity";
		else
			return "Infinity";
	if (rat[1] == "1")
		return rat[0];
	return rat[0] + "/" + rat[1];
}