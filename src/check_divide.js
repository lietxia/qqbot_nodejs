function random_division(a, b) {
	start = Date.now();
	let division = JSON.stringify(Math.floor(Math.random() * 9) + 1);
	for (let i = 0; i < a - 1; ++i)
		division += Math.floor(Math.random() * 10);
	let divisor = JSON.stringify(Math.floor(Math.random() * 9) + 1);
	for (let i = 0; i < b - 1; ++i)
		divisor += Math.floor(Math.random() * 10);
	return division + "/" + divisor + "=" + JSON.stringify(positive_divide(division, divisor)) + "(" + (Date.now() - start) + "ms)";
}